package jxscouttypes

import (
	"context"
	"log/slog"
	"net/http"
	"time"

	assetfetcher "github.com/francisconeves97/jxscout/internal/core/asset-fetcher"
	assetservice "github.com/francisconeves97/jxscout/internal/core/asset-service"
	"github.com/francisconeves97/jxscout/internal/core/cache"
	"github.com/francisconeves97/jxscout/internal/core/eventbus"

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
type EventBusMessage = eventbus.Message

// Router interface
type Router = chi.Router

// Scope interface
type Scope interface {
	IsInScope(url string) bool
}

// Cache interface
type Cache = cache.Cache

// JXScout Options
type Options struct {
	Port                             int                 `yaml:"port"`
	Hostname                         string              `yaml:"hostname"`
	ProjectName                      string              `yaml:"project-name"`
	ScopePatterns                    goflags.StringSlice `yaml:"scope-patterns"`
	Debug                            bool                `yaml:"debug"`
	AssetSaveConcurrency             int                 `yaml:"asset-save-concurrency"`
	AssetFetchConcurrency            int                 `yaml:"asset-fetch-concurrency"`
	BeautifierConcurrency            int                 `yaml:"beautifier-concurrency"`
	ChunkDiscovererConcurrency       int                 `yaml:"chunk-discoverer-concurrency"`
	ChunkDiscovererBruteForceLimit   int                 `yaml:"chunk-discoverer-brute-force-limit"`
	JavascriptRequestsCacheTTL       time.Duration       `yaml:"javascript-requests-cache-ttl"`
	HTMLRequestsCacheTTL             time.Duration       `yaml:"html-requests-cache-ttl"`
	GitCommitInterval                time.Duration       `yaml:"git-commit-interval"`
	RateLimitingMaxRequestsPerMinute int                 `yaml:"rate-limiting-max-requests-per-minute"`
	DownloadReferedJS                bool                `yaml:"download-refered-js"`
	LogBufferSize                    int                 `yaml:"log-buffer-size"`
	LogFileMaxSizeMB                 int                 `yaml:"log-file-max-size-mb"`
}

// AssetService interface
type AssetService = assetservice.AssetService
type Asset = assetservice.Asset

// AssetFetcher interface
type AssetFetcher = assetfetcher.AssetFetcher

type FileService = assetservice.FileService

// ModuleSDK are the exposed dependencies that modules can use
type ModuleSDK struct {
	Ctx          context.Context
	EventBus     EventBus
	Router       Router
	AssetService AssetService
	AssetFetcher AssetFetcher
	Options      Options
	HTTPServer   HTTPServer
	Cache        Cache
	Logger       *slog.Logger
	Scope        Scope
	FileService  FileService
}

type Module interface {
	Initialize(sdk *ModuleSDK) error
}

type JXScout interface {
	Start() error
	RegisterModule(Module) error
}
