package jxscout

import (
	"errors"
	"fmt"
	"log/slog"
	"net/http"
	"path"
	"sync"

	assetfetcher "github.com/francisconeves97/jxscout/internal/core/asset-fetcher"
	assetservice "github.com/francisconeves97/jxscout/internal/core/asset-service"
	"github.com/francisconeves97/jxscout/internal/core/cache"
	"github.com/francisconeves97/jxscout/internal/core/common"
	"github.com/francisconeves97/jxscout/internal/core/errutil"
	"github.com/francisconeves97/jxscout/internal/core/eventbus"
	"github.com/francisconeves97/jxscout/internal/modules/beautifier"
	chunkdiscoverer "github.com/francisconeves97/jxscout/internal/modules/chunk-discoverer"
	gitcommiter "github.com/francisconeves97/jxscout/internal/modules/git-committer"
	htmlingestion "github.com/francisconeves97/jxscout/internal/modules/html-ingestion"
	"github.com/francisconeves97/jxscout/internal/modules/ingestion"
	jsingestion "github.com/francisconeves97/jxscout/internal/modules/js-ingestion"
	sourcemaps "github.com/francisconeves97/jxscout/internal/modules/source-maps"
	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
)

type jxscout struct {
	log          *slog.Logger
	eventBus     jxscouttypes.EventBus
	options      jxscouttypes.Options
	assetService jxscouttypes.AssetService
	assetFetcher jxscouttypes.AssetFetcher
	httpServer   jxscouttypes.HTTPServer
	scopeChecker jxscouttypes.Scope
	cache        jxscouttypes.Cache
	fileService  jxscouttypes.FileService

	modules      []jxscouttypes.Module
	modulesMutex sync.Mutex
	modulesSDK   *jxscouttypes.ModuleSDK

	started bool
}

func NewJXScout(options jxscouttypes.Options) (jxscouttypes.JXScout, error) {
	err := validateOptions(options)
	if err != nil {
		return nil, errutil.Wrap(err, "provided options are not valid")
	}

	logger := initializeLogger(options)

	scopeRegex := initializeScope(options.ScopePatterns)

	scopeChecker := newScopeChecker(scopeRegex)

	fileService := assetservice.NewFileService(path.Join(common.GetWorkingDirectory(), options.ProjectName), logger)

	eventBus := eventbus.NewInMemoryEventBus()

	assetService, err := assetservice.NewAssetService(assetservice.AssetServiceConfig{
		EventBus:         eventBus,
		SaveConcurrency:  options.AssetSaveConcurrency,
		FetchConcurrency: options.AssetFetchConcurrency,
		Logger:           logger,
		FileService:      fileService,
	})
	if err != nil {
		return nil, errutil.Wrap(err, "failed to initialize asset service")
	}

	httpServer := newHttpServer(logger)

	cache := cache.NewInMemoryCache()

	assetFetcher := assetfetcher.NewAssetFetcher(assetfetcher.AssetFetcherOptions{
		RateLimitingMaxRequestsPerSecond: options.RateLimiterMaxRequestsPerSecond,
	})

	jxscout := &jxscout{
		options:      options,
		log:          initializeLogger(options),
		eventBus:     eventBus,
		assetService: assetService,
		modules:      []jxscouttypes.Module{},
		httpServer:   httpServer,
		scopeChecker: scopeChecker,
		cache:        cache,
		assetFetcher: assetFetcher,
		fileService:  fileService,
	}

	jxscout.registerCoreModules()

	return jxscout, nil
}

func (s *jxscout) registerCoreModules() {
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

func (s *jxscout) Start() error {
	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.Recoverer)

	err := s.initializeModules(r)
	if err != nil {
		return errutil.Wrap(err, "failed to initialize modules")
	}

	s.log.Info("server listening", "port", s.options.Port)

	go http.ListenAndServe(fmt.Sprintf(":%d", s.options.Port), r)

	s.runPrompt()

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
		Cache:        s.cache,
		AssetFetcher: s.assetFetcher,
		FileService:  s.fileService,
	}

	for _, module := range s.modules {
		err := module.Initialize(s.modulesSDK)
		if err != nil {
			return errutil.Wrap(err, "failed to initialize module")
		}
	}

	return nil
}
