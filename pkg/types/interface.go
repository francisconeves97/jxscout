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
	// Port is the port where jxscout will be listening for requests
	Port int
	// ProjectName is the name of the project. This name will be used to create the directory where jxscout will save the assets
	ProjectName string
	// ScopePatterns is a comma separated list of wildcard patterns used for filtering requests (e.g. {"*google.com*", "*facebook.com*"})
	ScopePatterns goflags.StringSlice
	// Debug defines if the server should output debug logs
	Debug bool
	// AssetSaveConcurrency defines the max concurrency for the service that saves files to the file system
	AssetSaveConcurrency int
	// AssetFetchConcurrency defines the max concurrency for simultaneous asset fetches (this is used for webpack chunk bruteforcing and sourcemap discovery for example)
	AssetFetchConcurrency int
	// BeautifierConcurrency defines the max concurrency for prettier processes
	BeautifierConcurrency int
	// ChunkDiscovererConcurrency defines the max concurrency for the chunk discoverer process
	ChunkDiscovererConcurrency int
	// ChunkDiscovererBruteForceLimit defines the max limit for the chunk discoverer to try and bruteforce chunks. Sometimes, the webpack loader function doesn't have all the information needed to discover chunks, so in that case we will bruteforce with chunk numbers.
	ChunkDiscovererBruteForceLimit int
	// JavascriptRequestsCacheTTL defines the time to wait before a particular JS file is downloaded and processed again
	JavascriptRequestsCacheTTL time.Duration
	// HTMLRequestsCacheTTL defines the time to wait before a particular html page is downloaded and processed again
	HTMLRequestsCacheTTL time.Duration
	// GitCommitInterval defines the interval between commits on the working directory
	GitCommitInterval time.Duration
	// RateLimitingMaxRequestsPerMinute defines the max requests per minute jxscout will perform. jxscout performs requests to get source maps and discover chunks.
	RateLimitingMaxRequestsPerMinute int
	// DownloadReferedJS defines if out of scope JS files should be downloaded as long as they are refered by a domain in scope
	DownloadReferedJS bool
	// LogBufferSize defines the size of the log buffer that is displayed in the UI
	LogBufferSize int
	// LogFileMaxSizeMB defines the max size of the log file in MB
	LogFileMaxSizeMB int
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
