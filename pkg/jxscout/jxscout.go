package jxscout

import (
	"context"
	"errors"
	"fmt"
	"log/slog"
	"net/http"
	"path"
	"sync"

	assetfetcher "github.com/francisconeves97/jxscout/internal/core/asset-fetcher"
	assetservice "github.com/francisconeves97/jxscout/internal/core/asset-service"
	"github.com/francisconeves97/jxscout/internal/core/common"
	"github.com/francisconeves97/jxscout/internal/core/database"
	"github.com/francisconeves97/jxscout/internal/core/errutil"
	"github.com/francisconeves97/jxscout/internal/core/eventbus"
	"github.com/francisconeves97/jxscout/internal/modules/beautifier"
	chunkdiscoverer "github.com/francisconeves97/jxscout/internal/modules/chunk-discoverer"
	gitcommiter "github.com/francisconeves97/jxscout/internal/modules/git-committer"
	htmlingestion "github.com/francisconeves97/jxscout/internal/modules/html-ingestion"
	"github.com/francisconeves97/jxscout/internal/modules/ingestion"
	jsingestion "github.com/francisconeves97/jxscout/internal/modules/js-ingestion"
	"github.com/francisconeves97/jxscout/internal/modules/overrides"
	sourcemaps "github.com/francisconeves97/jxscout/internal/modules/source-maps"
	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"
	"github.com/jmoiron/sqlx"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
)

type jxscout struct {
	ctx             context.Context
	cancel          context.CancelFunc
	logBuffer       *logBuffer
	log             *slog.Logger
	eventBus        jxscouttypes.EventBus
	options         jxscouttypes.Options
	assetService    jxscouttypes.AssetService
	assetFetcher    jxscouttypes.AssetFetcher
	httpServer      jxscouttypes.HTTPServer
	scopeChecker    jxscouttypes.Scope
	fileService     jxscouttypes.FileService
	db              *sqlx.DB
	overridesModule overrides.OverridesModule

	modules      []jxscouttypes.Module
	modulesMutex sync.Mutex
	modulesSDK   *jxscouttypes.ModuleSDK

	started bool
	server  *http.Server
}

func NewJXScout(options jxscouttypes.Options) (jxscouttypes.JXScout, error) {
	jxscout, err := initJxscout(options)
	if err != nil {
		return nil, errutil.Wrap(err, "failed to initialize jxscout")
	}

	jxscout.registerCoreModules()

	return jxscout, nil
}

func initJxscout(options jxscouttypes.Options) (*jxscout, error) {
	err := validateOptions(options)
	if err != nil {
		return nil, errutil.Wrap(err, "provided options are not valid")
	}

	// buffer that stores logs to show in the UI
	logBuffer := newLogBuffer(options.LogBufferSize)

	logger := initializeLogger(logBuffer, options)

	scopeRegex := initializeScope(options.ScopePatterns)

	scopeChecker := newScopeChecker(scopeRegex)

	fileService := assetservice.NewFileService(path.Join(common.GetWorkingDirectory(), options.ProjectName), logger)

	eventBus := eventbus.NewInMemoryEventBus()

	db, err := database.GetDatabase()
	if err != nil {
		return nil, errutil.Wrap(err, "failed to initialize database")
	}

	assetService, err := assetservice.NewAssetService(assetservice.AssetServiceConfig{
		EventBus:                   eventBus,
		SaveConcurrency:            options.AssetSaveConcurrency,
		FetchConcurrency:           options.AssetFetchConcurrency,
		Logger:                     logger,
		FileService:                fileService,
		Database:                   db,
		HTMLRequestsCacheTTL:       options.HTMLRequestsCacheTTL,
		JavascriptRequestsCacheTTL: options.JavascriptRequestsCacheTTL,
	})
	if err != nil {
		return nil, errutil.Wrap(err, "failed to initialize asset service")
	}

	httpServer := newHttpServer(logger)

	assetFetcher := assetfetcher.NewAssetFetcher(assetfetcher.AssetFetcherOptions{
		RateLimitingMaxRequestsPerMinute: options.RateLimitingMaxRequestsPerMinute,
		RateLimitingMaxRequestsPerSecond: options.RateLimitingMaxRequestsPerSecond,
	})

	ctx, cancel := context.WithCancel(context.Background())

	jxscout := &jxscout{
		options:      options,
		logBuffer:    logBuffer,
		log:          logger,
		eventBus:     eventBus,
		assetService: assetService,
		modules:      []jxscouttypes.Module{},
		httpServer:   httpServer,
		scopeChecker: scopeChecker,
		assetFetcher: assetFetcher,
		fileService:  fileService,
		db:           db,
		ctx:          ctx,
		cancel:       cancel,
	}

	return jxscout, nil
}

func (s *jxscout) registerCoreModules() {
	overridesModule := overrides.NewOverridesModule(s.options.CaidoHostname, s.options.CaidoPort)
	s.overridesModule = overridesModule

	coreModules := []jxscouttypes.Module{
		ingestion.NewIngestionModule(),
		htmlingestion.NewHTMLIngestionModule(s.options.HTMLRequestsCacheTTL),
		jsingestion.NewJSIngestionModule(s.options.JavascriptRequestsCacheTTL, s.options.DownloadReferedJS),
		beautifier.NewBeautifier(s.options.BeautifierConcurrency),
		chunkdiscoverer.NewChunkDiscovererModule(
			s.options.ChunkDiscovererConcurrency,
			s.options.ChunkDiscovererBruteForceLimit,
		),
		gitcommiter.NewGitCommiter(s.options.GitCommitInterval),
		sourcemaps.NewSourceMaps(s.options.AssetSaveConcurrency),
		overridesModule,
	}

	for _, module := range coreModules {
		s.RegisterModule(module)
	}
}

func (s *jxscout) RegisterModule(module jxscouttypes.Module) error {
	s.modulesMutex.Lock()
	defer s.modulesMutex.Unlock()

	if s.started {
		return errors.New("cant register module after server is started")
	}

	s.modules = append(s.modules, module)

	return nil
}

// Starts the jxscout server with the prompt
func (s *jxscout) Start() error {
	err := s.start()
	if err != nil {
		return errutil.Wrap(err, "failed to start server")
	}

	s.runPrompt()

	return nil
}

func (s *jxscout) start() error {
	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.Recoverer)

	err := s.initializeModules(r)
	if err != nil {
		return errutil.Wrap(err, "failed to initialize modules")
	}

	s.log.Info("starting server", "port", s.options.Port)

	s.server = &http.Server{
		Addr:    fmt.Sprintf("%s:%d", s.options.Hostname, s.options.Port),
		Handler: r,
	}

	go func() {
		err := s.server.ListenAndServe()
		if err != nil && err != http.ErrServerClosed {
			s.log.Error("failed to start server", "port", s.options.Port, "error", err)
			return
		}
	}()

	return nil
}

func (s *jxscout) initializeModules(r jxscouttypes.Router) error {
	s.modulesMutex.Lock()
	defer s.modulesMutex.Unlock()

	s.started = true

	s.modulesSDK = &jxscouttypes.ModuleSDK{
		EventBus:     s.eventBus,
		Router:       r,
		AssetService: s.assetService,
		Options:      s.options,
		HTTPServer:   s.httpServer,
		Logger:       s.log,
		Scope:        s.scopeChecker,
		AssetFetcher: s.assetFetcher,
		FileService:  s.fileService,
		Database:     s.db,
		Ctx:          s.ctx,
	}

	for _, module := range s.modules {
		err := module.Initialize(s.modulesSDK)
		if err != nil {
			return errutil.Wrap(err, "failed to initialize module")
		}
	}

	return nil
}

// Stop gracefully shuts down the JXScout server
func (s *jxscout) Stop() error {
	s.cancel()

	if s.server == nil {
		return nil
	}

	s.log.Info("shutting down server")

	if err := s.server.Shutdown(s.ctx); err != nil {
		s.log.Error("failed to shutdown server gracefully", "error", err)
		return errutil.Wrap(err, "failed to shutdown server gracefully")
	}

	s.log.Info("server stopped successfully")

	return nil
}

func (s *jxscout) Restart(options jxscouttypes.Options) (*jxscout, error) {
	jxscout, err := initJxscout(options)
	if err != nil {
		s.log.Error("failed to restart jxscout", "error", err)
		return nil, errutil.Wrap(err, "failed to restart jxscout")
	}

	s.log.Info("restarting server")

	err = s.Stop()
	if err != nil {
		s.log.Error("failed to stop server", "error", err)
		return nil, errutil.Wrap(err, "failed to stop server")
	}

	s.log.Info("server stopped successfully")

	s.log.Info("starting new server")

	s = jxscout

	s.registerCoreModules()

	go func() {
		// use private method so we don't restart the prompt
		err := s.start()
		if err != nil {
			s.log.Error("failed to restart server", "error", err)
		}
	}()

	return s, nil
}

func (s *jxscout) GetOptions() jxscouttypes.Options {
	return s.options
}

func (s *jxscout) GetOverridesModule() overrides.OverridesModule {
	return s.overridesModule
}

func (s *jxscout) Ctx() context.Context {
	return s.ctx
}

func (s *jxscout) GetAssetService() jxscouttypes.AssetService {
	return s.assetService
}

func (s *jxscout) TruncateTables() error {
	_, err := s.db.Exec(`
		DELETE FROM asset_relationships;
		DELETE FROM overrides;
		DELETE FROM assets;
		DELETE FROM sqlite_sequence;
	`)
	if err != nil {
		return errutil.Wrap(err, "failed to truncate tables")
	}

	return nil
}
