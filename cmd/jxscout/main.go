package main

import (
	"log"
	"time"

	"github.com/francisconeves97/jxscout/pkg/jxscout"
	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"

	"github.com/projectdiscovery/goflags"
)

const Version = "0.1.0"

func main() {
	options := jxscouttypes.Options{}

	flagSet := goflags.NewFlagSet()

	flagSet.SetDescription("jxscout | static files downloader for vuln analysis")

	flagSet.CreateGroup("server", "server configuration",
		flagSet.IntVar(&options.Port, "port", 3333, "port where the server will run"),
	)

	flagSet.CreateGroup("jxscout", "jxscout configuration",
		flagSet.StringVar(&options.ProjectName, "project-name", "default", "directory where static files will be downloaded to"),
		flagSet.StringSliceVar(&options.ScopePatterns, "scope", nil, `comma separated list of domains to consider for saving and analyzing html (e.g. "*google.com*,*facebook.com*")`, goflags.FileCommaSeparatedStringSliceOptions),
		flagSet.BoolVar(&options.Verbose, "verbose", true, "set to true to output logs"),
		flagSet.BoolVar(&options.Debug, "debug", false, "set to true to output debug logs"),
	)

	flagSet.CreateGroup("concurrency", "concurrency configuration",
		flagSet.IntVar(&options.AssetFetchConcurrency, "fetch-concurrency", 5, "max number of simultaneous http requests"),
		flagSet.IntVar(&options.AssetSaveConcurrency, "save-concurrency", 5, "max number of simultaneous saves to file system"),
		flagSet.IntVar(&options.BeautifierConcurrency, "beautifier-concurrency", 5, "max number of simultaneous beautifier processes"),
		flagSet.IntVar(&options.ChunkDiscovererConcurrency, "chunk-discoverer-concurrency", 5, "max number of simultaneous beautifier processes"),
	)

	flagSet.CreateGroup("chunk discovery", "chunk discovery configuration",
		flagSet.IntVar(&options.ChunkDiscovererBruteForceLimit, "chunk-discoverer-bruteforce-limit", 3000, "max limit for the chunk discoverer to try and bruteforce chunks"),
	)

	flagSet.CreateGroup("cache", "cache configuration",
		flagSet.DurationVar(&options.JavascriptRequestsCacheTTL, "js-requests-cache-ttl", time.Hour, "defines the time to wait until a js file is downloaded and processed again"),
		flagSet.DurationVar(&options.HTMLRequestsCacheTTL, "html-requests-cache-ttl", time.Hour, "defines the time to wait until a html file is downloaded and processed again"),
	)

	flagSet.CreateGroup("git commiter", "git commiter configuration",
		flagSet.DurationVar(&options.GitCommitInterval, "git-commit-interval", time.Minute*5, "defines the interval between jxscout automatically commits saved files"),
	)

	flagSet.CreateGroup("rate limiting", "rate limiting configuration",
		flagSet.IntVar(&options.RateLimiterMaxRequestsPerSecond, "rate-limiter-max-requests-per-second", 20, "defines the max requests per second for rate limited requests"),
	)

	flagSet.CreateGroup("js ingestion", "js ingestion configuration",
		flagSet.BoolVar(&options.DownloadReferedJS, "download-refered-js", false, "defines if all refered JS should be downloaded, even if it's out of scope"),
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
