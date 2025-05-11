package jxscouttypes

import (
	"context"
	"log/slog"
	"net/http"
	"time"

	assetfetcher "github.com/francisconeves97/jxscout/internal/core/asset-fetcher"
	assetservice "github.com/francisconeves97/jxscout/internal/core/asset-service"
	"github.com/francisconeves97/jxscout/internal/core/database"
	dbeventbus "github.com/francisconeves97/jxscout/internal/core/dbeventbus"
	"github.com/francisconeves97/jxscout/internal/core/eventbus"
	"github.com/francisconeves97/jxscout/internal/core/websocket"

	"github.com/go-chi/chi"
	"github.com/projectdiscovery/goflags"
)

// HTTPServer interface
type HTTPServer interface {
	SendSuccessResponse(w http.ResponseWriter, status int, result any)
	SendErrorResponse(w http.ResponseWriter, message string, status int)
}

// EventBus interface
type EventBus = eventbus.EventBus
type DBEventBus = *dbeventbus.EventBus
type EventBusMessage = eventbus.Message

// Router interface
type Router = chi.Router

// Scope interface
type Scope interface {
	IsInScope(url string) bool
}

// Cache interface

// JXScout Options
type Options struct {
	Port                             int                 `yaml:"port"`
	Hostname                         string              `yaml:"hostname"`
	ProjectName                      string              `yaml:"project-name"`
	ScopePatterns                    goflags.StringSlice `yaml:"scope"`
	Debug                            bool                `yaml:"debug"`
	AssetSaveConcurrency             int                 `yaml:"save-concurrency"`
	AssetFetchConcurrency            int                 `yaml:"fetch-concurrency"`
	BeautifierConcurrency            int                 `yaml:"beautifier-concurrency"`
	ChunkDiscovererConcurrency       int                 `yaml:"chunk-discoverer-concurrency"`
	ASTAnalyzerConcurrency           int                 `yaml:"ast-analyzer-concurrency"`
	ChunkDiscovererBruteForceLimit   int                 `yaml:"chunk-discoverer-bruteforce-limit"`
	RateLimitingMaxRequestsPerSecond int                 `yaml:"rate-limiter-max-requests-per-second"`
	RateLimitingMaxRequestsPerMinute int                 `yaml:"rate-limiter-max-requests-per-minute"`
	DownloadReferedJS                bool                `yaml:"download-refered-js"`
	LogBufferSize                    int                 `yaml:"log-buffer-size"`
	LogFileMaxSizeMB                 int                 `yaml:"log-file-max-size-mb"`
	CaidoHostname                    string              `yaml:"caido-hostname"`
	CaidoPort                        int                 `yaml:"caido-port"`
	OverrideContentCheckInterval     time.Duration       `yaml:"override-content-check-interval"`
	Profiling                        bool                `yaml:"profiling"`
}

// AssetService interface
type AssetService = assetservice.AssetService
type Asset = assetservice.Asset

// AssetFetcher interface
type AssetFetcher = assetfetcher.AssetFetcher

type FileService = assetservice.FileService

// ModuleSDK are the exposed dependencies that modules can use
type ModuleSDK struct {
	Ctx              context.Context
	InMemoryEventBus EventBus
	DBEventBus       DBEventBus
	Router           Router
	AssetService     AssetService
	AssetFetcher     AssetFetcher
	Options          Options
	HTTPServer       HTTPServer
	WebsocketServer  *websocket.WebsocketServer // used to communitate with VSCode
	Logger           *slog.Logger
	Scope            Scope
	FileService      FileService
	Database         *database.Database
}

type Module interface {
	Initialize(sdk *ModuleSDK) error
}

type JXScout interface {
	Start() error
	RegisterModule(Module) error
}
