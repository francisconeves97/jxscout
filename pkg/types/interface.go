package jxscouttypes

import (
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
	// Port is the port where jxscout will be running
	Port int
	// ProjectName directory where static files will be downloaded to
	ProjectName string
	// ScopePatterns is a list of wildcard patterns used for filtering requests (e.g. {"*google.com*", "*facebook.com*"})
	ScopePatterns goflags.StringSlice
	// Verbose defines if the server should output logs
	Verbose bool
	// Debug defines if the server should output debug logs
	Debug bool
	// CacheTTL defines the ttl for cache entries. caching is used internally to drop requests if they were already processed. Should be in a format compatible with https://pkg.go.dev/time#ParseDuration"
	CacheTTL string
	// AssetSaveConcurrency defines the max concurrency for asset service (handles saves to the file system and to the DB)
	AssetSaveConcurrency int
	// AssetServiceConcurrency defines the max concurrency for the asset fetch service (handles fetching asset URLs)
	AssetFetchConcurrency int
	// BeautifierConcurrency defines the max concurrency for beautifier processes
	BeautifierConcurrency int
	// ChunkDiscovererConcurrency defines the max concurrency for the chunk discoverer process
	ChunkDiscovererConcurrency int
	// ChunkDiscovererBruteForceLimit defines the max limit for the chunk discoverer to try and bruteforce chunks
	ChunkDiscovererBruteForceLimit int
	// JavascriptRequestsCacheTTL defines the time to wait until a js file is downloaded and processed again
	JavascriptRequestsCacheTTL time.Duration
	// HTMLRequestsCacheTTL defines the time to wait until a html file is downloaded and processed again
	HTMLRequestsCacheTTL time.Duration
	// GitCommitInterval defines the interval between commits on the working directory
	GitCommitInterval time.Duration
	// RateLimiterMaxRequestsPerSecond defines the max requests per second for rate limited requests
	RateLimiterMaxRequestsPerSecond int
	// DownloadReferedJS defines if all JS, including out of scope JS, should be downloaded as long as it is refered by a domain in scope
	DownloadReferedJS bool
}

// AssetService interface
type AssetService = assetservice.AssetService
type Asset = assetservice.Asset

// AssetFetcher interface
type AssetFetcher = assetfetcher.AssetFetcher

type FileService = assetservice.FileService

// ModuleSDK are the exposed dependencies that modules can use
type ModuleSDK struct {
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
