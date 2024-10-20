package jxscout

import (
	"errors"
	"fmt"
	"log/slog"
	"net/http"
	"sync"

	assetservice "github.com/francisconeves97/jxscout/internal/core/asset-service"
	"github.com/francisconeves97/jxscout/internal/core/cache"
	"github.com/francisconeves97/jxscout/internal/core/errutil"
	"github.com/francisconeves97/jxscout/internal/core/eventbus"
	"github.com/francisconeves97/jxscout/internal/modules/beautifier"
	chunkdiscoverer "github.com/francisconeves97/jxscout/internal/modules/chunk-discoverer"
	htmlingestion "github.com/francisconeves97/jxscout/internal/modules/html-ingestion"
	"github.com/francisconeves97/jxscout/internal/modules/ingestion"
	jsingestion "github.com/francisconeves97/jxscout/internal/modules/js-ingestion"
	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
)

type jxscout struct {
	log          *slog.Logger
	eventBus     jxscouttypes.EventBus
	options      jxscouttypes.Options
	assetService jxscouttypes.AssetService
	httpServer   jxscouttypes.HTTPServer
	scopeChecker jxscouttypes.Scope
	cache        jxscouttypes.Cache

	modules      []jxscouttypes.Module
	modulesMutex sync.Mutex

	started bool
}

func NewJXScout(options jxscouttypes.Options) (jxscouttypes.JXScout, error) {
	err := validateOptions(options)
	if err != nil {
		return nil, errutil.Wrap(err, "provided options are not valid")
	}

	logger := initializeLogger(options)

	scopeRegex := initializeScope(options)

	scopeChecker := newScopeChecker(scopeRegex)

	// TODO: save to the DB
	// db, err := dbutil.GetSqliteDB("data.db") // TODO: when we actually use the DB, don't hardcode this
	// if err != nil {
	// 	return nil, errutil.Wrap(err, "failed to initialize DB")
	// }

	// assetRepository := assetservice.NewRepository(db)

	fileService := assetservice.NewFileService(options.WorkingDirectory, logger)

	httpClient := assetservice.NewHTTPClient()

	eventBus := eventbus.NewInMemoryEventBus()

	assetService := assetservice.NewAssetService(assetservice.AssetServiceConfig{
		EventBus:         eventBus,
		SaveConcurrency:  options.AssetSaveConcurrency,
		FetchConcurrency: options.AssetFetchConcurrency,
		Logger:           logger,
		// AssetRepository:  assetRepository,
		FileService: fileService,
		HTTPClient:  httpClient,
	})

	httpServer := newHttpServer(logger)

	cache := cache.NewInMemoryCache()

	jxscout := &jxscout{
		options:      options,
		log:          initializeLogger(options),
		eventBus:     eventBus,
		assetService: assetService,
		modules:      []jxscouttypes.Module{},
		httpServer:   httpServer,
		scopeChecker: scopeChecker,
		cache:        cache,
	}

	jxscout.registerCoreModules()

	return jxscout, nil
}

func (s *jxscout) registerCoreModules() {
	beautifierModule := beautifier.NewBeautifier(s.options.BeautifierConcurrency)
	chunkDiscoverer := chunkdiscoverer.NewChunkDiscovererModule(s.options.ChunkDiscovererConcurrency, s.options.ChunkDiscovererBruteForceLimit)

	coreModules := []jxscouttypes.Module{
		ingestion.NewIngestionModule(),
		htmlingestion.NewHTMLIngestionModule(s.options.HTMLRequestsCacheTTL),
		jsingestion.NewJSIngestionModule(s.options.JavascriptRequestsCacheTTL),
		beautifierModule,
		chunkDiscoverer,
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

	http.ListenAndServe(fmt.Sprintf(":%d", s.options.Port), r)

	return nil
}

func (s *jxscout) initializeModules(r jxscouttypes.Router) error {
	s.modulesMutex.Lock()
	defer s.modulesMutex.Unlock()

	s.started = true

	for _, module := range s.modules {
		err := module.Initialize(jxscouttypes.ModuleSDK{
			EventBus:     s.eventBus,
			Router:       r,
			AssetService: s.assetService,
			Options:      s.options,
			HTTPServer:   s.httpServer,
			Logger:       s.log,
			Scope:        s.scopeChecker,
			Cache:        s.cache,
		})
		if err != nil {
			return errutil.Wrap(err, "failed to initialize module")
		}
	}

	return nil
}
