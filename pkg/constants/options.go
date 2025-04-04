package constants

import "time"

// Default values for jxscout options
const (
	// Server configuration
	DefaultPort = 3333

	// Jxscout configuration
	DefaultProjectName = "default"
	DefaultDebug       = false

	// Concurrency configuration
	DefaultAssetFetchConcurrency      = 5
	DefaultAssetSaveConcurrency       = 5
	DefaultBeautifierConcurrency      = 5
	DefaultChunkDiscovererConcurrency = 5

	// Chunk discovery configuration
	DefaultChunkDiscovererBruteForceLimit = 3000

	// Cache configuration
	DefaultJavascriptRequestsCacheTTL = time.Hour
	DefaultHTMLRequestsCacheTTL       = time.Hour

	// Git commiter configuration
	DefaultGitCommitInterval = time.Minute * 5

	// Rate limiting configuration
	DefaultRateLimitingMaxRequestsPerMinute = 1200

	// JS ingestion configuration
	DefaultDownloadReferedJS = false

	// Logging configuration
	DefaultLogBufferSize    = 1000
	DefaultLogFileMaxSizeMB = 10
)

// Flag names for jxscout options
const (
	// Server configuration
	FlagPort = "port"

	// Jxscout configuration
	FlagProjectName = "project-name"
	FlagScope       = "scope"
	FlagDebug       = "debug"

	// Concurrency configuration
	FlagAssetFetchConcurrency      = "fetch-concurrency"
	FlagAssetSaveConcurrency       = "save-concurrency"
	FlagBeautifierConcurrency      = "beautifier-concurrency"
	FlagChunkDiscovererConcurrency = "chunk-discoverer-concurrency"

	// Chunk discovery configuration
	FlagChunkDiscovererBruteForceLimit = "chunk-discoverer-bruteforce-limit"

	// Cache configuration
	FlagJavascriptRequestsCacheTTL = "js-requests-cache-ttl"
	FlagHTMLRequestsCacheTTL       = "html-requests-cache-ttl"

	// Git commiter configuration
	FlagGitCommitInterval = "git-commit-interval"

	// Rate limiting configuration
	FlagRateLimitingMaxRequestsPerMinute = "rate-limiter-max-requests-per-minute"

	// JS ingestion configuration
	FlagDownloadReferedJS = "download-refered-js"

	// Logging configuration
	FlagLogBufferSize    = "log-buffer-size"
	FlagLogFileMaxSizeMB = "log-file-max-size-mb"
)
