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

// Option descriptions
const (
	// Server configuration
	DescriptionPort = "port where jxscout will be listening for requests"

	// Jxscout configuration
	DescriptionProjectName = "name of the project, used to create the directory where assets will be saved"
	DescriptionScope       = "comma separated list of wildcard patterns used for filtering requests"
	DescriptionDebug       = "enable debug logs output"

	// Concurrency configuration
	DescriptionAssetFetchConcurrency      = "max number of simultaneous asset fetches (used for webpack chunk bruteforcing and sourcemap discovery)"
	DescriptionAssetSaveConcurrency       = "max number of simultaneous saves to the file system"
	DescriptionBeautifierConcurrency      = "max number of simultaneous prettier processes"
	DescriptionChunkDiscovererConcurrency = "max number of simultaneous chunk discoverer processes"

	// Chunk discovery configuration
	DescriptionChunkDiscovererBruteForceLimit = "max limit for the chunk discoverer to try and bruteforce chunks when webpack loader function lacks information"

	// Cache configuration
	DescriptionJavascriptRequestsCacheTTL = "time to wait before a particular JS file is downloaded and processed again"
	DescriptionHTMLRequestsCacheTTL       = "time to wait before a particular HTML page is downloaded and processed again"

	// Git commiter configuration
	DescriptionGitCommitInterval = "interval between jxscout automatically commits saved files"

	// Rate limiting configuration
	DescriptionRateLimitingMaxRequestsPerMinute = "max requests per minute jxscout will perform for source maps and chunk discovery"

	// JS ingestion configuration
	DescriptionDownloadReferedJS = "download out of scope JS files if they are referred by a domain in scope"

	// Logging configuration
	DescriptionLogBufferSize    = "size of the log buffer that is displayed in the UI"
	DescriptionLogFileMaxSizeMB = "max size of the log file in MB"
)
