package tui

import (
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"sort"
	"strconv"
	"strings"
	"time"

	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
	assetservice "github.com/francisconeves97/jxscout/internal/core/asset-service"
	"github.com/francisconeves97/jxscout/internal/core/common"
	"github.com/francisconeves97/jxscout/internal/modules/overrides"
	"github.com/francisconeves97/jxscout/pkg/constants"
	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"
	"github.com/muesli/reflow/wordwrap"
	"github.com/pkg/browser"
	"gopkg.in/yaml.v3"
)

// GuideContent contains the user guide for jxscout
const GuideContent = `
# jxscout guide

## Getting Started

1. Install dependencies:
   Type 'install' in the prompt to get all the tools you need (npm, bun, prettier)

2. Configure jxscout:
   Type 'config' to view and adjust your settings.
   The defaults work fine, but setting a project name that matches your target
   helps keep your JS files organized.
   You can also set scope patterns to focus on specific parts of your target,
   though your proxy plugin will filter requests in scope by default.

3. Install the jxscout plugin for your proxy:
   - Burp: https://github.com/francisconeves97/jxscout-burp
   - Caido: https://github.com/francisconeves97/jxscout-caido

4. That's it! Visit your target website and watch as HTML and JS files
   magically appear in your target's folder.

   ⚠️ Note: jxscout doesn't automatically parse HTML to find JS files.
   Make sure to disable your browser's cache when visiting your target,
   so JS files pass through your proxy and get captured by jxscout.
`

func (t *TUI) RegisterDefaultCommands() {
	t.RegisterCommand(Command{
		Name:        "clear",
		ShortName:   "c",
		Description: "Clears the output",
		Usage:       "clear",
		Execute: func(args []string) (tea.Cmd, error) {
			t.output = ""
			return nil, nil
		},
	})

	t.RegisterCommand(Command{
		Name:        "help",
		ShortName:   "h",
		Description: "Shows help information for commands",
		Usage:       "help [command]",
		Execute: func(args []string) (tea.Cmd, error) {
			if len(args) == 0 {
				t.writeLineToOutput(t.GetHelp())
				return nil, nil
			}

			help, err := t.GetCommandHelp(args[0])
			if err != nil {
				return nil, err
			}
			t.writeLineToOutput(help)
			return nil, nil
		},
	})

	t.RegisterCommand(Command{
		Name:        "exit",
		ShortName:   "q",
		Description: "Exits the application",
		Usage:       "exit",
		Execute: func(args []string) (tea.Cmd, error) {
			err := t.jxscout.Stop()
			if err != nil {
				return nil, err
			}

			return tea.Quit, nil
		},
	})

	t.RegisterCommand(Command{
		Name:        "logs",
		ShortName:   "l",
		Description: "Toggle logs panel",
		Usage:       "logs",
		Execute: func(args []string) (tea.Cmd, error) {
			t.logsPanelShown = !t.logsPanelShown
			return nil, nil
		},
	})

	t.RegisterCommand(Command{
		Name:        "config",
		ShortName:   "cf",
		Description: "View or update jxscout configuration options",
		Usage:       "config [options] | Use 'config' without arguments to view current configuration",
		Execute: func(args []string) (tea.Cmd, error) {
			if len(args) == 0 {
				// Show current configuration
				t.printCurrentConfig()
				t.writeLineToOutput("\n\nTo update options, use: config option=value [option=value ...]")
				t.writeLineToOutput("To reset an option to default, use: config option=default")
				t.writeLineToOutput("To manage scope patterns, use: config scope=add:pattern or config scope=remove:pattern\n")
				t.writeLineToOutput("Example: config project-name=netflix debug=true scope=add:*google.com*")
				return nil, nil
			}

			// Get current options
			currentOptions := t.jxscout.GetOptions()

			// Parse arguments
			for _, arg := range args {
				parts := strings.SplitN(arg, "=", 2)
				if len(parts) != 2 {
					return nil, fmt.Errorf("invalid option format: %s. Expected format: option=value", arg)
				}

				option := parts[0]
				value := parts[1]

				// Check if we're resetting to default
				if value == "default" {
					switch option {
					case constants.FlagPort:
						currentOptions.Port = constants.DefaultPort
					case constants.FlagHostname:
						currentOptions.Hostname = constants.DefaultHostname
					case constants.FlagProjectName:
						currentOptions.ProjectName = constants.DefaultProjectName
					case constants.FlagScope:
						currentOptions.ScopePatterns = nil
					case constants.FlagDebug:
						currentOptions.Debug = constants.DefaultDebug
					case constants.FlagAssetFetchConcurrency:
						currentOptions.AssetFetchConcurrency = constants.DefaultAssetFetchConcurrency
					case constants.FlagAssetSaveConcurrency:
						currentOptions.AssetSaveConcurrency = constants.DefaultAssetSaveConcurrency
					case constants.FlagBeautifierConcurrency:
						currentOptions.BeautifierConcurrency = constants.DefaultBeautifierConcurrency
					case constants.FlagChunkDiscovererConcurrency:
						currentOptions.ChunkDiscovererConcurrency = constants.DefaultChunkDiscovererConcurrency
					case constants.FlagChunkDiscovererBruteForceLimit:
						currentOptions.ChunkDiscovererBruteForceLimit = constants.DefaultChunkDiscovererBruteForceLimit
					case constants.FlagJavascriptRequestsCacheTTL:
						currentOptions.JavascriptRequestsCacheTTL = constants.DefaultJavascriptRequestsCacheTTL
					case constants.FlagHTMLRequestsCacheTTL:
						currentOptions.HTMLRequestsCacheTTL = constants.DefaultHTMLRequestsCacheTTL
					case constants.FlagRateLimitingMaxRequestsPerMinute:
						currentOptions.RateLimitingMaxRequestsPerMinute = constants.DefaultRateLimitingMaxRequestsPerMinute
					case constants.FlagRateLimitingMaxRequestsPerSecond:
						currentOptions.RateLimitingMaxRequestsPerSecond = constants.DefaultRateLimitingMaxRequestsPerSecond
					case constants.FlagDownloadReferedJS:
						currentOptions.DownloadReferedJS = constants.DefaultDownloadReferedJS
					case constants.FlagLogBufferSize:
						currentOptions.LogBufferSize = constants.DefaultLogBufferSize
					case constants.FlagLogFileMaxSizeMB:
						currentOptions.LogFileMaxSizeMB = constants.DefaultLogFileMaxSizeMB
					case constants.FlagCaidoHostname:
						currentOptions.CaidoHostname = constants.DefaultCaidoHostname
					case constants.FlagCaidoPort:
						currentOptions.CaidoPort = constants.DefaultCaidoPort
					case constants.FlagOverrideContentCheckInterval:
						currentOptions.OverrideContentCheckInterval = constants.DefaultOverrideContentCheckInterval
					case constants.FlagASTAnalyzerConcurrency:
						currentOptions.ASTAnalyzerConcurrency = constants.DefaultASTAnalyzerConcurrency
					default:
						return nil, fmt.Errorf("unknown option: %s", option)
					}
					continue
				}

				// Special handling for scope patterns
				if option == constants.FlagScope {
					if strings.HasPrefix(value, "add:") {
						// Add a new pattern
						pattern := strings.TrimPrefix(value, "add:")
						if pattern == "" {
							return nil, fmt.Errorf("empty scope pattern")
						}
						// Check if pattern already exists
						for _, existing := range currentOptions.ScopePatterns {
							if existing == pattern {
								return nil, fmt.Errorf("scope pattern already exists: %s", pattern)
							}
						}
						currentOptions.ScopePatterns = append(currentOptions.ScopePatterns, pattern)
					} else if strings.HasPrefix(value, "remove:") {
						// Remove a pattern
						pattern := strings.TrimPrefix(value, "remove:")
						if pattern == "" {
							return nil, fmt.Errorf("empty scope pattern")
						}
						// Find and remove the pattern
						found := false
						newPatterns := make([]string, 0, len(currentOptions.ScopePatterns))
						for _, existing := range currentOptions.ScopePatterns {
							if existing == pattern {
								found = true
								continue
							}
							newPatterns = append(newPatterns, existing)
						}
						if !found {
							return nil, fmt.Errorf("scope pattern not found: %s", pattern)
						}
						currentOptions.ScopePatterns = newPatterns
					} else {
						// Replace all patterns (original behavior)
						currentOptions.ScopePatterns = strings.Split(value, ",")
					}
					continue
				}

				// Update the appropriate option
				switch option {
				case constants.FlagPort:
					port, err := strconv.Atoi(value)
					if err != nil {
						return nil, fmt.Errorf("invalid port value: %s", value)
					}
					currentOptions.Port = port
				case constants.FlagHostname:
					currentOptions.Hostname = value
				case constants.FlagProjectName:
					currentOptions.ProjectName = value
				case constants.FlagDebug:
					debug, err := strconv.ParseBool(value)
					if err != nil {
						return nil, fmt.Errorf("invalid debug value: %s", value)
					}
					currentOptions.Debug = debug
				case constants.FlagAssetFetchConcurrency:
					concurrency, err := strconv.Atoi(value)
					if err != nil {
						return nil, fmt.Errorf("invalid fetch-concurrency value: %s", value)
					}
					currentOptions.AssetFetchConcurrency = concurrency
				case constants.FlagAssetSaveConcurrency:
					concurrency, err := strconv.Atoi(value)
					if err != nil {
						return nil, fmt.Errorf("invalid save-concurrency value: %s", value)
					}
					currentOptions.AssetSaveConcurrency = concurrency
				case constants.FlagBeautifierConcurrency:
					concurrency, err := strconv.Atoi(value)
					if err != nil {
						return nil, fmt.Errorf("invalid beautifier-concurrency value: %s", value)
					}
					currentOptions.BeautifierConcurrency = concurrency
				case constants.FlagChunkDiscovererConcurrency:
					concurrency, err := strconv.Atoi(value)
					if err != nil {
						return nil, fmt.Errorf("invalid chunk-discoverer-concurrency value: %s", value)
					}
					currentOptions.ChunkDiscovererConcurrency = concurrency
				case constants.FlagJavascriptRequestsCacheTTL:
					duration, err := time.ParseDuration(value)
					if err != nil {
						return nil, fmt.Errorf("invalid js-requests-cache-ttl value: %s", value)
					}
					currentOptions.JavascriptRequestsCacheTTL = duration
				case constants.FlagHTMLRequestsCacheTTL:
					duration, err := time.ParseDuration(value)
					if err != nil {
						return nil, fmt.Errorf("invalid html-requests-cache-ttl value: %s", value)
					}
					currentOptions.HTMLRequestsCacheTTL = duration
				case constants.FlagASTAnalyzerConcurrency:
					concurrency, err := strconv.Atoi(value)
					if err != nil {
						return nil, fmt.Errorf("invalid ast-analyzer-concurrency value: %s", value)
					}
					currentOptions.ASTAnalyzerConcurrency = concurrency
				case constants.FlagChunkDiscovererBruteForceLimit:
					limit, err := strconv.Atoi(value)
					if err != nil {
						return nil, fmt.Errorf("invalid chunk-discoverer-bruteforce-limit value: %s", value)
					}
					currentOptions.ChunkDiscovererBruteForceLimit = limit
				case constants.FlagRateLimitingMaxRequestsPerMinute:
					rate, err := strconv.Atoi(value)
					if err != nil {
						return nil, fmt.Errorf("invalid rate-limiter-max-requests-per-minute value: %s", value)
					}
					currentOptions.RateLimitingMaxRequestsPerMinute = rate
				case constants.FlagRateLimitingMaxRequestsPerSecond:
					rate, err := strconv.Atoi(value)
					if err != nil {
						return nil, fmt.Errorf("invalid rate-limiter-max-requests-per-second value: %s", value)
					}
					currentOptions.RateLimitingMaxRequestsPerSecond = rate
				case constants.FlagDownloadReferedJS:
					download, err := strconv.ParseBool(value)
					if err != nil {
						return nil, fmt.Errorf("invalid download-refered-js value: %s", value)
					}
					currentOptions.DownloadReferedJS = download
				case constants.FlagLogBufferSize:
					size, err := strconv.Atoi(value)
					if err != nil {
						return nil, fmt.Errorf("invalid log-buffer-size value: %s", value)
					}
					currentOptions.LogBufferSize = size
				case constants.FlagLogFileMaxSizeMB:
					size, err := strconv.Atoi(value)
					if err != nil {
						return nil, fmt.Errorf("invalid log-file-max-size-mb value: %s", value)
					}
					currentOptions.LogFileMaxSizeMB = size
				case constants.FlagCaidoHostname:
					currentOptions.CaidoHostname = value
				case constants.FlagCaidoPort:
					port, err := strconv.Atoi(value)
					if err != nil {
						return nil, fmt.Errorf("invalid caido-port value: %s", value)
					}
					currentOptions.CaidoPort = port
				case constants.FlagOverrideContentCheckInterval:
					duration, err := time.ParseDuration(value)
					if err != nil {
						return nil, fmt.Errorf("invalid override-content-check-interval value: %s", value)
					}
					currentOptions.OverrideContentCheckInterval = duration
				default:
				}
			}

			// Restart jxscout with new options
			newjxscout, err := t.jxscout.Restart(currentOptions)
			if err != nil {
				return nil, fmt.Errorf("failed to restart jxscout: %w", err)
			}

			// Persist the current options to a YAML file
			configFileLocation := filepath.Join(common.GetPrivateDirectory(), constants.ConfigFileName)
			file, err := os.Create(configFileLocation)
			if err != nil {
				return nil, fmt.Errorf("failed to create configuration file: %w", err)
			}
			defer file.Close()

			encoder := yaml.NewEncoder(file)
			defer encoder.Close()

			err = encoder.Encode(currentOptions)
			if err != nil {
				return nil, fmt.Errorf("failed to encode configuration to YAML: %w", err)
			}

			t.jxscout = newjxscout

			t.writeLineToOutput("jxscout has been restarted with the new configuration! 🎉\n")
			t.printCurrentConfig()
			return nil, nil
		},
	})

	t.RegisterCommand(Command{
		Name:        "config-reset",
		ShortName:   "cfr",
		Description: "Reset all configuration options to default values",
		Usage:       "config-reset",
		Execute: func(args []string) (tea.Cmd, error) {
			// Create a new options struct with default values
			defaultOptions := jxscouttypes.Options{
				Port:                             constants.DefaultPort,
				Hostname:                         constants.DefaultHostname,
				ProjectName:                      constants.DefaultProjectName,
				ScopePatterns:                    nil,
				Debug:                            constants.DefaultDebug,
				AssetSaveConcurrency:             constants.DefaultAssetSaveConcurrency,
				AssetFetchConcurrency:            constants.DefaultAssetFetchConcurrency,
				BeautifierConcurrency:            constants.DefaultBeautifierConcurrency,
				JavascriptRequestsCacheTTL:       constants.DefaultJavascriptRequestsCacheTTL,
				HTMLRequestsCacheTTL:             constants.DefaultHTMLRequestsCacheTTL,
				ChunkDiscovererConcurrency:       constants.DefaultChunkDiscovererConcurrency,
				ASTAnalyzerConcurrency:           constants.DefaultASTAnalyzerConcurrency,
				ChunkDiscovererBruteForceLimit:   constants.DefaultChunkDiscovererBruteForceLimit,
				RateLimitingMaxRequestsPerMinute: constants.DefaultRateLimitingMaxRequestsPerMinute,
				RateLimitingMaxRequestsPerSecond: constants.DefaultRateLimitingMaxRequestsPerSecond,
				DownloadReferedJS:                constants.DefaultDownloadReferedJS,
				LogBufferSize:                    constants.DefaultLogBufferSize,
				LogFileMaxSizeMB:                 constants.DefaultLogFileMaxSizeMB,
				CaidoHostname:                    constants.DefaultCaidoHostname,
				CaidoPort:                        constants.DefaultCaidoPort,
				OverrideContentCheckInterval:     constants.DefaultOverrideContentCheckInterval,
			}

			// Restart jxscout with default options
			newjxscout, err := t.jxscout.Restart(defaultOptions)
			if err != nil {
				return nil, fmt.Errorf("failed to restart jxscout: %w", err)
			}

			// Persist the default options to a YAML file
			configFileLocation := filepath.Join(common.GetPrivateDirectory(), constants.ConfigFileName)
			file, err := os.Create(configFileLocation)
			if err != nil {
				return nil, fmt.Errorf("failed to create configuration file: %w", err)
			}
			defer file.Close()

			encoder := yaml.NewEncoder(file)
			defer encoder.Close()

			err = encoder.Encode(defaultOptions)
			if err != nil {
				return nil, fmt.Errorf("failed to encode configuration to YAML: %w", err)
			}

			t.jxscout = newjxscout

			t.writeLineToOutput("All configuration options have been reset to default values! 🔄\n")
			t.printCurrentConfig()
			return nil, nil
		},
	})

	t.RegisterCommand(Command{
		Name:        "install",
		ShortName:   "i",
		Description: "Install jxscout dependencies (npm, bun, prettier)",
		Usage:       "install",
		Execute: func(args []string) (tea.Cmd, error) {
			// Start the installation process in a goroutine
			go func() {
				// Check if npm is installed
				t.writeLineToOutput("Checking if npm is installed...")
				cmd := exec.Command("npm", "--version")
				output, err := cmd.CombinedOutput()
				if err != nil {
					t.writeLineToOutput(fmt.Sprintf("❌ npm is not installed. Please install Node.js and npm first: %v", err))
					return
				}
				npmVersion := strings.TrimSpace(string(output))
				t.writeLineToOutput(fmt.Sprintf("✅ npm is installed (version %s)", npmVersion))

				// Install bun using npm
				t.writeLineToOutput("\nInstalling bun...")
				cmd = exec.Command("npm", "install", "-g", "bun")
				output, err = cmd.CombinedOutput()
				if err != nil {
					t.writeLineToOutput(fmt.Sprintf("❌ Failed to install bun: %v\nOutput: %s", err, string(output)))
					return
				}
				t.writeLineToOutput("✅ bun installed successfully")

				t.writeLineToOutput("\nEnsuring bun is up to date...")
				cmd = exec.Command("bun", "upgrade")
				output, err = cmd.CombinedOutput()
				if err != nil {
					t.writeLineToOutput(fmt.Sprintf("❌ Failed to upgrade bun: %v\nOutput: %s", err, string(output)))
					return
				}

				// Install prettier using bun
				t.writeLineToOutput("\nInstalling prettier...")
				cmd = exec.Command("bun", "install", "-g", "prettier")
				output, err = cmd.CombinedOutput()
				if err != nil {
					t.writeLineToOutput(fmt.Sprintf("❌ Failed to install prettier: %v\nOutput: %s", err, string(output)))
					return
				}
				t.writeLineToOutput("✅ prettier installed successfully")

				t.writeLineToOutput("\n🎉 All jxscout dependencies have been installed successfully!")
			}()

			return nil, nil
		},
	})

	t.RegisterCommand(Command{
		Name:        "guide",
		ShortName:   "g",
		Description: "Show a guide on how to use jxscout",
		Usage:       "guide",
		Execute: func(args []string) (tea.Cmd, error) {
			t.writeLineToOutput(GuideContent)
			return nil, nil
		},
	})

	t.RegisterCommand(Command{
		Name:        "override",
		ShortName:   "o",
		Description: "Toggle local override for a specific URL (only available for Caido). \nThis will override the content of an asset when you visit it in your browser.\nWhen overriding an HTML file keep the (index).html suffix.\nThe `assets` command will give you the right URL to use.",
		Usage:       "override <url>",
		Execute: func(args []string) (tea.Cmd, error) {
			if len(args) == 0 {
				return nil, fmt.Errorf("asset url is required")
			}

			url := args[0]

			// Get the overrides module from jxscout
			overridesModule := t.jxscout.GetOverridesModule()

			if !overridesModule.IsCaidoAuthenticated(t.jxscout.Ctx()) {
				t.writeLineToOutput("Not authenticated with Caido. Starting authentication flow...")

				go func() {
					// Create a channel to signal authentication completion
					authCompleteChan := make(chan bool, 1)

					verificationURL, err := overridesModule.AuthenticateCaido(t.jxscout.Ctx(), authCompleteChan)
					if err != nil {
						t.writeLineToOutput(fmt.Sprintf("Failed to authenticate with Caido: %v", err))
						return
					}

					err = browser.OpenURL(verificationURL)
					if err != nil {
						t.writeLineToOutput(fmt.Sprintf("Failed to open verification URL in your browser: %v", err))
						t.writeLineToOutput(fmt.Sprintf("Please visit %s to complete authentication", verificationURL))
					} else {
						t.writeLineToOutput("Please complete the authentication with Caido on your browser")
						t.writeLineToOutput("Waiting for authentication token...")
					}

					// Wait for authentication to complete
					select {
					case <-authCompleteChan:
						t.writeLineToOutput("Authentication successful! ✅ You can now use the override command.")
					case <-time.After(5 * time.Minute):
						t.writeLineToOutput("Authentication timed out. Please try again.")
					}
				}()

				return nil, nil
			}

			overriden, err := overridesModule.ToggleOverride(t.jxscout.Ctx(), overrides.ToggleOverrideRequest{
				AssetURL: url,
			})
			if errors.Is(err, overrides.ErrAssetNotFound) {
				t.writeLineToOutput(fmt.Sprintf("Asset %s not found. Confirm the URL is correct and that asset is being tracked by jxscout", url))
				return nil, nil
			} else if errors.Is(err, overrides.ErrAssetNoLongerExists) {
				t.writeLineToOutput(fmt.Sprintf("Asset %s no longer exists.\nYou probably deleted it manually from your file system.", url))
				return nil, nil
			} else if errors.Is(err, overrides.ErrAssetContentTypeNotSupported) {
				t.writeLineToOutput("Only HTML or JS files can be overridden.")
				return nil, nil
			}
			if err != nil {
				t.writeLineToOutput(fmt.Sprintf("❌ Failed to toggle override.\nSince the Caido GraphQL API is not stable, this might not work with your current version. It was tested on 0.47.1.\nerr: %v", err))
				return nil, nil
			}

			if overriden {
				t.writeLineToOutput(fmt.Sprintf("Override added for %s", url))
			} else {
				t.writeLineToOutput(fmt.Sprintf("Override removed for %s", url))
			}

			return nil, nil
		},
	})

	t.RegisterCommand(Command{
		Name:        "assets",
		ShortName:   "la",
		Description: "List assets for the current project with pagination and search",
		Usage:       "assets [page=<page_number>] [page-size=<page_size>] [search=<search_term>]",
		Execute: func(args []string) (tea.Cmd, error) {
			params := assetservice.GetAssetsParams{
				ProjectName: t.jxscout.GetOptions().ProjectName,
				Page:        1,
				PageSize:    15,
			}

			// Parse arguments
			for _, arg := range args {
				parts := strings.SplitN(arg, "=", 2)
				if len(parts) != 2 {
					return nil, fmt.Errorf("invalid argument format: %s. Expected format: key=value", arg)
				}

				key := parts[0]
				value := parts[1]

				switch key {
				case "page":
					page, err := strconv.Atoi(value)
					if err != nil {
						return nil, fmt.Errorf("invalid page number: %s", value)
					}
					params.Page = page
				case "page-size":
					pageSize, err := strconv.Atoi(value)
					if err != nil {
						return nil, fmt.Errorf("invalid page size: %s", value)
					}
					params.PageSize = pageSize
				case "search":
					params.SearchTerm = value
				default:
					return nil, fmt.Errorf("unknown argument: %s", key)
				}
			}

			// Get assets from service
			assets, total, err := t.jxscout.GetAssetService().GetAssets(t.jxscout.Ctx(), params)
			if err != nil {
				return nil, fmt.Errorf("failed to get assets: %w", err)
			}

			// Calculate total pages
			totalPages := (total + params.PageSize - 1) / params.PageSize

			// Print header
			t.writeLineToOutput(fmt.Sprintf("\nAssets for project '%s' (page %d of %d):\n",
				params.ProjectName, params.Page, totalPages))

			if params.SearchTerm != "" {
				t.writeLineToOutput(fmt.Sprintf("Search term: '%s'\n", params.SearchTerm))
			}

			// Print assets
			for i, asset := range assets {
				t.writeLineToOutput(fmt.Sprintf("%d. %s", (i+1)+((params.Page-1)*params.PageSize), asset.URL))
			}

			// Print pagination info
			t.writeLineToOutput(fmt.Sprintf("\nTotal assets: %d", total))
			if totalPages > 1 {
				t.writeLineToOutput("Use 'assets page=<number>' to view other pages")
				t.writeLineToOutput("Use 'assets page-size=<page-size>' to change the page size")
			}
			if params.SearchTerm == "" {
				t.writeLineToOutput("Use 'assets search=<term>' to search assets")
			}

			return nil, nil
		},
	})

	t.RegisterCommand(Command{
		Name:        "loaded",
		ShortName:   "ldd",
		Description: "Show assets that loaded a specific JavaScript asset",
		Usage:       "loaded <asset_url> [page=<page_number>] [page-size=<page_size>]",
		Execute: func(args []string) (tea.Cmd, error) {
			if len(args) == 0 {
				return nil, fmt.Errorf("asset url is required")
			}

			url := args[0]
			params := assetservice.GetAssetsParams{
				Page:     1,
				PageSize: 15,
			}

			// Parse arguments
			for i := 1; i < len(args); i++ {
				parts := strings.SplitN(args[i], "=", 2)
				if len(parts) != 2 {
					return nil, fmt.Errorf("invalid argument format: %s. Expected format: key=value", args[i])
				}

				key := parts[0]
				value := parts[1]

				switch key {
				case "page":
					page, err := strconv.Atoi(value)
					if err != nil {
						return nil, fmt.Errorf("invalid page number: %s", value)
					}
					params.Page = page
				case "page-size":
					pageSize, err := strconv.Atoi(value)
					if err != nil {
						return nil, fmt.Errorf("invalid page size: %s", value)
					}
					params.PageSize = pageSize
				default:
					return nil, fmt.Errorf("unknown argument: %s", key)
				}
			}

			// First check if the asset exists and is a JavaScript asset
			asset, exists, err := t.jxscout.GetAssetService().GetAssetByURL(t.jxscout.Ctx(), url)
			if err != nil {
				return nil, fmt.Errorf("failed to get asset: %w", err)
			}
			if !exists {
				return nil, fmt.Errorf("asset not found: %s", url)
			}
			if !strings.Contains(asset.ContentType, common.ContentTypeJS) {
				return nil, fmt.Errorf("asset must be a JS file")
			}

			// Get assets that load this asset
			assets, total, err := t.jxscout.GetAssetService().GetAssetsThatLoad(t.jxscout.Ctx(), url, params)
			if err != nil {
				return nil, fmt.Errorf("failed to get assets that load: %w", err)
			}

			// Calculate total pages
			totalPages := (total + params.PageSize - 1) / params.PageSize

			// Print header
			t.writeLineToOutput(fmt.Sprintf("\nAssets that load '%s' (page %d of %d):\n",
				url, params.Page, totalPages))

			// Print assets
			if len(assets) == 0 {
				t.writeLineToOutput("No assets found that load this JavaScript file.")
			} else {
				for i, asset := range assets {
					t.writeLineToOutput(fmt.Sprintf("%d. %s", (i+1)+((params.Page-1)*params.PageSize), asset.URL))
				}
			}

			// Print pagination info
			t.writeLineToOutput(fmt.Sprintf("\nTotal assets: %d", total))
			if totalPages > 1 {
				t.writeLineToOutput("Use 'loads <asset_url> page=<number>' to view other pages")
				t.writeLineToOutput("Use 'loads <asset_url> page-size=<page-size>' to change the page size")
			}

			return nil, nil
		},
	})

	t.RegisterCommand(Command{
		Name:        "loads",
		ShortName:   "lds",
		Description: "Show JavaScript assets loaded by a specific HTML page",
		Usage:       "loads <html_url> [page=<page_number>] [page-size=<page_size>]",
		Execute: func(args []string) (tea.Cmd, error) {
			if len(args) == 0 {
				return nil, fmt.Errorf("HTML URL is required")
			}

			url := args[0]
			params := assetservice.GetAssetsParams{
				Page:     1,
				PageSize: 15,
			}

			// Parse arguments
			for i := 1; i < len(args); i++ {
				parts := strings.SplitN(args[i], "=", 2)
				if len(parts) != 2 {
					return nil, fmt.Errorf("invalid argument format: %s. Expected format: key=value", args[i])
				}

				key := parts[0]
				value := parts[1]

				switch key {
				case "page":
					page, err := strconv.Atoi(value)
					if err != nil {
						return nil, fmt.Errorf("invalid page number: %s", value)
					}
					params.Page = page
				case "page-size":
					pageSize, err := strconv.Atoi(value)
					if err != nil {
						return nil, fmt.Errorf("invalid page size: %s", value)
					}
					params.PageSize = pageSize
				default:
					return nil, fmt.Errorf("unknown argument: %s", key)
				}
			}

			// First check if the asset exists and is an HTML asset
			asset, exists, err := t.jxscout.GetAssetService().GetAssetByURL(t.jxscout.Ctx(), url)
			if err != nil {
				return nil, fmt.Errorf("failed to get asset: %w", err)
			}
			if !exists {
				return nil, fmt.Errorf("asset not found: %s", url)
			}
			if !strings.Contains(asset.ContentType, common.ContentTypeHTML) {
				return nil, fmt.Errorf("asset must be an HTML file")
			}

			// Get assets loaded by this HTML page
			assets, total, err := t.jxscout.GetAssetService().GetAssetsLoadedBy(t.jxscout.Ctx(), url, params)
			if err != nil {
				return nil, fmt.Errorf("failed to get assets loaded by: %w", err)
			}

			// Calculate total pages
			totalPages := (total + params.PageSize - 1) / params.PageSize

			// Print header
			t.writeLineToOutput(fmt.Sprintf("\nJavaScript assets loaded by '%s' (page %d of %d):\n",
				url, params.Page, totalPages))

			// Print assets
			if len(assets) == 0 {
				t.writeLineToOutput("No JavaScript assets found loaded by this HTML page.")
			} else {
				for i, asset := range assets {
					t.writeLineToOutput(fmt.Sprintf("%d. %s", (i+1)+((params.Page-1)*params.PageSize), asset.URL))
				}
			}

			// Print pagination info
			t.writeLineToOutput(fmt.Sprintf("\nTotal assets: %d", total))
			if totalPages > 1 {
				t.writeLineToOutput("Use 'loads <html_url> page=<number>' to view other pages")
				t.writeLineToOutput("Use 'loads <html_url> page-size=<page-size>' to change the page size")
			}

			return nil, nil
		},
	})

	t.RegisterCommand(Command{
		Name:        "overrides",
		ShortName:   "lo",
		Description: "List overrides",
		Usage:       "overrides [page=<page_number>] [page-size=<page_size>]",
		Execute: func(args []string) (tea.Cmd, error) {
			params := struct {
				Page     int
				PageSize int
			}{
				Page:     1,
				PageSize: 15,
			}

			// Parse arguments
			for _, arg := range args {
				parts := strings.SplitN(arg, "=", 2)
				if len(parts) != 2 {
					return nil, fmt.Errorf("invalid argument format: %s. Expected format: key=value", arg)
				}

				key := parts[0]
				value := parts[1]

				switch key {
				case "page":
					page, err := strconv.Atoi(value)
					if err != nil {
						return nil, fmt.Errorf("invalid page number: %s", value)
					}
					params.Page = page
				case "page-size":
					pageSize, err := strconv.Atoi(value)
					if err != nil {
						return nil, fmt.Errorf("invalid page size: %s", value)
					}
					params.PageSize = pageSize
				default:
					return nil, fmt.Errorf("unknown argument: %s", key)
				}
			}

			// Get overrides from service
			overrides, total, err := t.jxscout.GetOverridesModule().GetOverrides(t.jxscout.Ctx(), params.Page, params.PageSize)
			if err != nil {
				return nil, fmt.Errorf("failed to get overrides: %w", err)
			}

			// Calculate total pages
			totalPages := (total + params.PageSize - 1) / params.PageSize

			// Print header
			t.writeLineToOutput(fmt.Sprintf("\nOverrides (page %d of %d):\n",
				params.Page, totalPages))

			// Print overrides
			if len(overrides) == 0 {
				t.writeLineToOutput("No overrides found.")
			} else {
				for i, override := range overrides {
					t.writeLineToOutput(fmt.Sprintf("%d. %s", (i+1)+((params.Page-1)*params.PageSize), *override.AssetURL))
				}
			}

			// Print pagination info
			t.writeLineToOutput(fmt.Sprintf("\nTotal overrides: %d", total))
			if totalPages > 1 {
				t.writeLineToOutput("Use 'overrides page=<number>' to view other pages")
				t.writeLineToOutput("Use 'overrides page-size=<page-size>' to change the page size")
			}

			// Print authentication note
			if !t.jxscout.GetOverridesModule().IsCaidoAuthenticated(t.jxscout.Ctx()) {
				t.writeLineToOutput("\n⚠️ Note: You are not authenticated with Caido. Overrides content won't be updated automatically.")
				t.writeLineToOutput("Run 'caido-auth' to authenticate with Caido so that overrides are updated.")
			}

			return nil, nil
		},
	})

	t.RegisterCommand(Command{
		Name:        "caido-auth",
		ShortName:   "ca",
		Description: "Authenticate with Caido to use overrides (token is stored in memory and will reset on server restart)",
		Usage:       "caido-auth",
		Execute: func(args []string) (tea.Cmd, error) {
			// Get the overrides module from jxscout
			overridesModule := t.jxscout.GetOverridesModule()

			if overridesModule.IsCaidoAuthenticated(t.jxscout.Ctx()) {
				t.writeLineToOutput("Already authenticated with Caido.")
				return nil, nil
			}

			t.writeLineToOutput("Starting authentication flow with Caido...")

			// Create a channel to signal authentication completion
			authCompleteChan := make(chan bool, 1)

			verificationURL, err := overridesModule.AuthenticateCaido(t.jxscout.Ctx(), authCompleteChan)
			if err != nil {
				return nil, fmt.Errorf("failed to authenticate with Caido: %w", err)
			}

			err = browser.OpenURL(verificationURL)
			if err != nil {
				t.writeLineToOutput(fmt.Sprintf("Failed to open verification URL in your browser: %v", err))
				t.writeLineToOutput(fmt.Sprintf("Please visit %s to complete authentication", verificationURL))
			} else {
				t.writeLineToOutput("Please complete the authentication with Caido on your browser")
				t.writeLineToOutput("Waiting for authentication token...")
			}

			// Wait for authentication to complete
			go func() {
				select {
				case <-authCompleteChan:
					t.writeLineToOutput("Authentication successful! ✅")
					overridesModule.StartContentCheck()
				case <-time.After(5 * time.Minute):
					t.writeLineToOutput("Authentication timed out. Please try again.")
				}
			}()

			return nil, nil
		},
	})

	t.RegisterCommand(Command{
		Name:        "truncate-tables",
		ShortName:   "tt",
		Description: "Delete all data tracked in jxscout database (requires confirmation)",
		Usage:       "truncate-tables",
		Execute: func(args []string) (tea.Cmd, error) {
			if len(args) == 0 {
				t.writeLineToOutput("⚠️  WARNING: This will delete ALL data tracked in the jxscout database!")
				t.writeLineToOutput("This includes all assets, relationships, and overrides.")
				t.writeLineToOutput("This action cannot be undone.")
				t.writeLineToOutput("\nTo confirm, please type: truncate-tables IREALLYWANTTHIS")
				return nil, nil
			}

			if args[0] != "IREALLYWANTTHIS" {
				t.writeLineToOutput("❌ Invalid confirmation. To delete all data, type: truncate-tables IREALLYWANTTHIS")
				return nil, nil
			}

			err := t.jxscout.TruncateTables()
			if err != nil {
				return nil, fmt.Errorf("failed to truncate tables: %w", err)
			}
			t.writeLineToOutput("✅ Database tables have been truncated successfully.")
			return nil, nil
		},
	})

	t.RegisterCommand(Command{
		Name:        "version",
		ShortName:   "v",
		Description: "Show the current version and checks for updates",
		Usage:       "version",
		Execute: func(args []string) (tea.Cmd, error) {
			// Print current version
			t.writeLineToOutput(fmt.Sprintf("Current version: %s", constants.Version))

			// Check for updates in a goroutine to avoid blocking the UI
			go func() {
				// Use curl to check the latest release on GitHub
				cmd := exec.Command("curl", "-s", "https://api.github.com/repos/francisconeves97/jxscout/releases/latest")
				output, err := cmd.CombinedOutput()
				if err != nil {
					t.writeLineToOutput("❌ Failed to check for updates: " + err.Error())
					return
				}

				// Parse the JSON response to extract the tag_name
				var response struct {
					TagName string `json:"tag_name"`
				}
				if err := json.Unmarshal(output, &response); err != nil {
					t.writeLineToOutput("❌ Failed to parse GitHub response: " + err.Error())
					return
				}

				// Remove 'v' prefix if present
				latestVersion := strings.TrimPrefix(response.TagName, "v")
				currentVersion := constants.Version

				// Compare versions
				if latestVersion != currentVersion {
					t.writeLineToOutput(fmt.Sprintf("🔄 A new version is available: %s", latestVersion))
					t.writeLineToOutput("Visit https://github.com/francisconeves97/jxscout to download the latest version.")
				} else {
					t.writeLineToOutput("✅ You are running the latest version.")
				}
			}()

			return nil, nil
		},
	})
}

// RegisterCommand registers a new command with the TUI
func (t *TUI) RegisterCommand(cmd Command) {
	t.commands[cmd.Name] = cmd
	if cmd.ShortName != "" {
		t.commands[cmd.ShortName] = cmd
	}
}

// ExecuteCommand executes a command with the given arguments
func (t *TUI) ExecuteCommand(input string) (tea.Cmd, error) {
	parts := strings.Fields(input)
	if len(parts) == 0 {
		return nil, nil
	}

	cmdName := parts[0]
	args := parts[1:]

	cmd, exists := t.commands[cmdName]
	if !exists {
		return nil, fmt.Errorf("unknown command: %s", cmdName)
	}

	return cmd.Execute(args)
}

// GetHelp returns the help text for all commands
func (t *TUI) GetHelp() string {
	var help strings.Builder
	help.WriteString("Available commands:\n")

	// Define the order for special commands
	specialCommands := []string{}

	// First, display the special commands in the specified order
	for _, name := range specialCommands {
		if cmd, exists := t.commands[name]; exists {
			t.writeCommandHelp(&help, cmd)
		}
	}

	// Get remaining command names and sort them
	cmdNames := make([]string, 0, len(t.commands))
	for name := range t.commands {
		// Skip special commands as they're already displayed
		isSpecial := false
		for _, special := range specialCommands {
			if name == special {
				isSpecial = true
				break
			}
		}
		if !isSpecial {
			cmdNames = append(cmdNames, name)
		}
	}
	sort.Strings(cmdNames)

	// Display remaining commands in alphabetical order
	for _, name := range cmdNames {
		cmd := t.commands[name]
		// Only show the full name version to avoid duplicates
		if cmd.Name == name {
			t.writeCommandHelp(&help, cmd)
		}
	}

	return help.String()
}

// writeCommandHelp writes the help text for a command to the builder
func (t *TUI) writeCommandHelp(builder *strings.Builder, cmd Command) {
	builder.WriteString("\n" + cmd.Name)
	if cmd.ShortName != "" {
		builder.WriteString(" (" + cmd.ShortName + ")")
	}
	builder.WriteString(" - " + cmd.Description + "\n")
	builder.WriteString("  Usage: " + cmd.Usage + "\n")
}

// GetCommandHelp returns the help text for a specific command
func (t *TUI) GetCommandHelp(cmdName string) (string, error) {
	cmd, exists := t.commands[cmdName]
	if !exists {
		return "", fmt.Errorf("unknown command: %s", cmdName)
	}

	var help strings.Builder
	t.writeCommandHelp(&help, cmd)
	return help.String(), nil
}

// printCurrentConfig prints the current configuration to the output
func (t *TUI) printCurrentConfig() {
	currentOptions := t.jxscout.GetOptions()

	// Create a style for descriptions
	descStyle := lipgloss.NewStyle().Foreground(lipgloss.Color("241"))

	// Define the maximum width for wrapping
	maxWidth := t.logsPanelViewport.Width

	t.writeLineToOutput("Current configuration:\n")

	// Helper function to format and wrap a line
	formatLine := func(flag, value, desc string) string {
		return wordwrap.String(fmt.Sprintf("  %s: %s %s %s", flag, value, descStyle.Render("|"), desc), maxWidth)
	}

	// Server configuration
	t.writeLineToOutput(formatLine(
		constants.FlagHostname,
		currentOptions.Hostname,
		descStyle.Render(constants.DescriptionHostname)))

	t.writeLineToOutput(formatLine(
		constants.FlagPort,
		fmt.Sprintf("%d", currentOptions.Port),
		descStyle.Render(constants.DescriptionPort)))

	// Jxscout configuration
	t.writeLineToOutput(formatLine(
		constants.FlagProjectName,
		currentOptions.ProjectName,
		descStyle.Render(
			fmt.Sprintf(
				"%s | %s",
				filepath.Join(common.GetWorkingDirectory(), currentOptions.ProjectName),
				constants.DescriptionProjectName))))

	scopeValue := strings.Join(currentOptions.ScopePatterns, ",")
	if len(scopeValue) == 0 {
		scopeValue = "<empty>"
	}

	t.writeLineToOutput(formatLine(
		constants.FlagScope,
		scopeValue,
		descStyle.Render(constants.DescriptionScope)))

	t.writeLineToOutput(formatLine(
		constants.FlagDebug,
		fmt.Sprintf("%v", currentOptions.Debug),
		descStyle.Render(constants.DescriptionDebug)))

	// Concurrency configuration
	t.writeLineToOutput(formatLine(
		constants.FlagAssetFetchConcurrency,
		fmt.Sprintf("%d", currentOptions.AssetFetchConcurrency),
		descStyle.Render(constants.DescriptionAssetFetchConcurrency)))

	t.writeLineToOutput(formatLine(
		constants.FlagAssetSaveConcurrency,
		fmt.Sprintf("%d", currentOptions.AssetSaveConcurrency),
		descStyle.Render(constants.DescriptionAssetSaveConcurrency)))

	t.writeLineToOutput(formatLine(
		constants.FlagBeautifierConcurrency,
		fmt.Sprintf("%d", currentOptions.BeautifierConcurrency),
		descStyle.Render(constants.DescriptionBeautifierConcurrency)))

	t.writeLineToOutput(formatLine(
		constants.FlagChunkDiscovererConcurrency,
		fmt.Sprintf("%d", currentOptions.ChunkDiscovererConcurrency),
		descStyle.Render(constants.DescriptionChunkDiscovererConcurrency)))

	t.writeLineToOutput(formatLine(
		constants.FlagASTAnalyzerConcurrency,
		fmt.Sprintf("%d", currentOptions.ASTAnalyzerConcurrency),
		descStyle.Render(constants.DescriptionASTAnalyzerConcurrency)))

	t.writeLineToOutput(formatLine(
		constants.FlagChunkDiscovererBruteForceLimit,
		fmt.Sprintf("%d", currentOptions.ChunkDiscovererBruteForceLimit),
		descStyle.Render(constants.DescriptionChunkDiscovererBruteForceLimit)))

	t.writeLineToOutput(formatLine(
		constants.FlagJavascriptRequestsCacheTTL,
		fmt.Sprintf("%v", currentOptions.JavascriptRequestsCacheTTL),
		descStyle.Render(constants.DescriptionJavascriptRequestsCacheTTL)))

	t.writeLineToOutput(formatLine(
		constants.FlagHTMLRequestsCacheTTL,
		fmt.Sprintf("%v", currentOptions.HTMLRequestsCacheTTL),
		descStyle.Render(constants.DescriptionHTMLRequestsCacheTTL)))

	// Rate limiting configuration
	t.writeLineToOutput(formatLine(
		constants.FlagRateLimitingMaxRequestsPerMinute,
		fmt.Sprintf("%d", currentOptions.RateLimitingMaxRequestsPerMinute),
		descStyle.Render(constants.DescriptionRateLimitingMaxRequestsPerMinute)))
	t.writeLineToOutput(formatLine(
		constants.FlagRateLimitingMaxRequestsPerSecond,
		fmt.Sprintf("%d", currentOptions.RateLimitingMaxRequestsPerSecond),
		descStyle.Render(constants.DescriptionRateLimitingMaxRequestsPerSecond)))

	// JS ingestion configuration
	t.writeLineToOutput(formatLine(
		constants.FlagDownloadReferedJS,
		fmt.Sprintf("%v", currentOptions.DownloadReferedJS),
		descStyle.Render(constants.DescriptionDownloadReferedJS)))

	// Logging configuration
	t.writeLineToOutput(formatLine(
		constants.FlagLogBufferSize,
		fmt.Sprintf("%d", currentOptions.LogBufferSize),
		descStyle.Render(constants.DescriptionLogBufferSize)))

	t.writeLineToOutput(formatLine(
		constants.FlagLogFileMaxSizeMB,
		fmt.Sprintf("%d", currentOptions.LogFileMaxSizeMB),
		descStyle.Render(constants.DescriptionLogFileMaxSizeMB)))

	// Overrides configuration
	t.writeLineToOutput(formatLine(
		constants.FlagCaidoHostname,
		currentOptions.CaidoHostname,
		descStyle.Render(constants.DefaultCaidoHostname)))

	t.writeLineToOutput(formatLine(
		constants.FlagCaidoPort,
		fmt.Sprintf("%d", currentOptions.CaidoPort),
		descStyle.Render(constants.DescriptionCaidoPort)))

	t.writeLineToOutput(formatLine(
		constants.FlagOverrideContentCheckInterval,
		fmt.Sprintf("%v", currentOptions.OverrideContentCheckInterval),
		descStyle.Render(constants.DescriptionOverrideContentCheckInterval)))
}
