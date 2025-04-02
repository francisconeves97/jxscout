package main

import (
	"log"
	"time"

	"github.com/francisconeves97/jxscout/pkg/jxscout"
	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"

	"github.com/projectdiscovery/goflags"
)

const Version = "0.3.0"

func main() {
	options := jxscouttypes.Options{}

	flagSet := goflags.NewFlagSet()

	flagSet.SetDescription("jxscout | static files downloader for vulnerability analysis")

	flagSet.CreateGroup("server", "server configuration",
		flagSet.IntVar(&options.Port, "port", 3333, "port where jxscout will be listening for requests"),
	)

	flagSet.CreateGroup("jxscout", "jxscout configuration",
		flagSet.StringVar(&options.ProjectName, "project-name", "default", "name of the project, used to create the directory where assets will be saved"),
		flagSet.StringSliceVar(&options.ScopePatterns, "scope", nil, `comma separated list of wildcard patterns used for filtering requests. (e.g. "*google.com*,*facebook.com*")`, goflags.FileCommaSeparatedStringSliceOptions),
		flagSet.BoolVar(&options.Debug, "debug", false, "enable debug logs output"),
	)

	flagSet.CreateGroup("concurrency", "concurrency configuration",
		flagSet.IntVar(&options.AssetFetchConcurrency, "fetch-concurrency", 5, "max number of simultaneous asset fetches (used for webpack chunk bruteforcing and sourcemap discovery)"),
		flagSet.IntVar(&options.AssetSaveConcurrency, "save-concurrency", 5, "max number of simultaneous saves to the file system"),
		flagSet.IntVar(&options.BeautifierConcurrency, "beautifier-concurrency", 5, "max number of simultaneous prettier processes"),
		flagSet.IntVar(&options.ChunkDiscovererConcurrency, "chunk-discoverer-concurrency", 5, "max number of simultaneous chunk discoverer processes"),
	)

	flagSet.CreateGroup("chunk discovery", "chunk discovery configuration",
		flagSet.IntVar(&options.ChunkDiscovererBruteForceLimit, "chunk-discoverer-bruteforce-limit", 3000, "max limit for the chunk discoverer to try and bruteforce chunks when webpack loader function lacks information"),
	)

	flagSet.CreateGroup("cache", "cache configuration",
		flagSet.DurationVar(&options.JavascriptRequestsCacheTTL, "js-requests-cache-ttl", time.Hour, "time to wait before a particular JS file is downloaded and processed again"),
		flagSet.DurationVar(&options.HTMLRequestsCacheTTL, "html-requests-cache-ttl", time.Hour, "time to wait before a particular HTML page is downloaded and processed again"),
	)

	flagSet.CreateGroup("git commiter", "git commiter configuration",
		flagSet.DurationVar(&options.GitCommitInterval, "git-commit-interval", time.Minute*5, "interval between jxscout automatically commits saved files"),
	)

	flagSet.CreateGroup("rate limiting", "rate limiting configuration",
		flagSet.IntVar(&options.RateLimitingMaxRequestsPerMinute, "rate-limiter-max-requests-per-minute", 1200, "max requests per minute jxscout will perform for source maps and chunk discovery"),
	)

	flagSet.CreateGroup("js ingestion", "js ingestion configuration",
		flagSet.BoolVar(&options.DownloadReferedJS, "download-refered-js", false, "download out of scope JS files if they are referred by a domain in scope"),
	)

	flagSet.CreateGroup("logging", "logging configuration",
		flagSet.IntVar(&options.LogBufferSize, "log-buffer-size", 1000, "size of the log buffer that is displayed in the UI"),
		flagSet.IntVar(&options.LogFileMaxSizeMB, "log-file-max-size-mb", 10, "max size of the log file in MB"),
	)

	if err := flagSet.Parse(); err != nil {
		log.Fatalf("could not parse flags: %s", err.Error())
	}

	jxscout, err := jxscout.NewJXScout(options)
	if err != nil {
		flagSet.CommandLine.PrintDefaults()
		log.Fatalf("failed to initialize jxscout: %s", err.Error())
	}

	err = jxscout.Start()
	if err != nil {
		log.Fatalf("failed to start jxscout: %s", err.Error())
	}
}
