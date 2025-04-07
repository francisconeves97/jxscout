package main

import (
	"log"
	"path"

	"github.com/francisconeves97/jxscout/internal/core/common"
	"github.com/francisconeves97/jxscout/pkg/constants"
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
		flagSet.StringVar(&options.Hostname, constants.FlagHostname, constants.DefaultHostname, constants.DescriptionHostname),
		flagSet.IntVar(&options.Port, constants.FlagPort, constants.DefaultPort, constants.DescriptionPort),
	)

	flagSet.CreateGroup("jxscout", "jxscout configuration",
		flagSet.StringVar(&options.ProjectName, constants.FlagProjectName, constants.DefaultProjectName, constants.DescriptionProjectName),
		flagSet.StringSliceVar(&options.ScopePatterns, constants.FlagScope, nil, constants.DescriptionScope, goflags.FileCommaSeparatedStringSliceOptions),
		flagSet.BoolVar(&options.Debug, constants.FlagDebug, constants.DefaultDebug, constants.DescriptionDebug),
	)

	flagSet.CreateGroup("concurrency", "concurrency configuration",
		flagSet.IntVar(&options.AssetFetchConcurrency, constants.FlagAssetFetchConcurrency, constants.DefaultAssetFetchConcurrency, constants.DescriptionAssetFetchConcurrency),
		flagSet.IntVar(&options.AssetSaveConcurrency, constants.FlagAssetSaveConcurrency, constants.DefaultAssetSaveConcurrency, constants.DescriptionAssetSaveConcurrency),
		flagSet.IntVar(&options.BeautifierConcurrency, constants.FlagBeautifierConcurrency, constants.DefaultBeautifierConcurrency, constants.DescriptionBeautifierConcurrency),
		flagSet.IntVar(&options.ChunkDiscovererConcurrency, constants.FlagChunkDiscovererConcurrency, constants.DefaultChunkDiscovererConcurrency, constants.DescriptionChunkDiscovererConcurrency),
	)

	flagSet.CreateGroup("chunk discovery", "chunk discovery configuration",
		flagSet.IntVar(&options.ChunkDiscovererBruteForceLimit, constants.FlagChunkDiscovererBruteForceLimit, constants.DefaultChunkDiscovererBruteForceLimit, constants.DescriptionChunkDiscovererBruteForceLimit),
	)

	flagSet.CreateGroup("cache", "cache configuration",
		flagSet.DurationVar(&options.JavascriptRequestsCacheTTL, constants.FlagJavascriptRequestsCacheTTL, constants.DefaultJavascriptRequestsCacheTTL, constants.DescriptionJavascriptRequestsCacheTTL),
		flagSet.DurationVar(&options.HTMLRequestsCacheTTL, constants.FlagHTMLRequestsCacheTTL, constants.DefaultHTMLRequestsCacheTTL, constants.DescriptionHTMLRequestsCacheTTL),
	)

	flagSet.CreateGroup("git commiter", "git commiter configuration",
		flagSet.DurationVar(&options.GitCommitInterval, constants.FlagGitCommitInterval, constants.DefaultGitCommitInterval, constants.DescriptionGitCommitInterval),
	)

	flagSet.CreateGroup("rate limiting", "rate limiting configuration",
		flagSet.IntVar(&options.RateLimitingMaxRequestsPerSecond, constants.FlagRateLimitingMaxRequestsPerSecond, constants.DefaultRateLimitingMaxRequestsPerSecond, constants.DescriptionRateLimitingMaxRequestsPerSecond),
		flagSet.IntVar(&options.RateLimitingMaxRequestsPerMinute, constants.FlagRateLimitingMaxRequestsPerMinute, constants.DefaultRateLimitingMaxRequestsPerMinute, constants.DescriptionRateLimitingMaxRequestsPerMinute),
	)

	flagSet.CreateGroup("js ingestion", "js ingestion configuration",
		flagSet.BoolVar(&options.DownloadReferedJS, constants.FlagDownloadReferedJS, constants.DefaultDownloadReferedJS, constants.DescriptionDownloadReferedJS),
	)

	flagSet.CreateGroup("logging", "logging configuration",
		flagSet.IntVar(&options.LogBufferSize, constants.FlagLogBufferSize, constants.DefaultLogBufferSize, constants.DescriptionLogBufferSize),
		flagSet.IntVar(&options.LogFileMaxSizeMB, constants.FlagLogFileMaxSizeMB, constants.DefaultLogFileMaxSizeMB, constants.DescriptionLogFileMaxSizeMB),
	)

	configFileLocation := path.Join(common.GetPrivateDirectory(), constants.ConfigFileName)
	flagSet.SetConfigFilePath(configFileLocation)

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
