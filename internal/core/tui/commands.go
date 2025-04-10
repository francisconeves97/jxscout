package tui

import (
	"fmt"
	"os"
	"os/exec"
	"path"
	"sort"
	"strconv"
	"strings"
	"time"

	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
	"github.com/francisconeves97/jxscout/internal/core/common"
	"github.com/francisconeves97/jxscout/pkg/constants"
	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"
	"github.com/muesli/reflow/wordwrap"
	"gopkg.in/yaml.v3"
)

// GuideContent contains the user guide for jxscout
const GuideContent = `
# jxscout guide

## Getting Started

1. Install dependencies:
   Type 'install' in the prompt to get all the tools you need (npm, bun, prettier, reverse-sourcemap)

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
					case constants.FlagGitCommitInterval:
						currentOptions.GitCommitInterval = constants.DefaultGitCommitInterval
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
				case constants.FlagChunkDiscovererBruteForceLimit:
					limit, err := strconv.Atoi(value)
					if err != nil {
						return nil, fmt.Errorf("invalid chunk-discoverer-bruteforce-limit value: %s", value)
					}
					currentOptions.ChunkDiscovererBruteForceLimit = limit
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
				case constants.FlagGitCommitInterval:
					duration, err := time.ParseDuration(value)
					if err != nil {
						return nil, fmt.Errorf("invalid git-commit-interval value: %s", value)
					}
					currentOptions.GitCommitInterval = duration
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
				default:
					return nil, fmt.Errorf("unknown option: %s", option)
				}
			}

			// Restart jxscout with new options
			newjxscout, err := t.jxscout.Restart(currentOptions)
			if err != nil {
				return nil, fmt.Errorf("failed to restart jxscout: %w", err)
			}

			// Persist the current options to a YAML file
			configFileLocation := path.Join(common.GetPrivateDirectory(), constants.ConfigFileName)
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
				ChunkDiscovererConcurrency:       constants.DefaultChunkDiscovererConcurrency,
				ChunkDiscovererBruteForceLimit:   constants.DefaultChunkDiscovererBruteForceLimit,
				JavascriptRequestsCacheTTL:       constants.DefaultJavascriptRequestsCacheTTL,
				HTMLRequestsCacheTTL:             constants.DefaultHTMLRequestsCacheTTL,
				GitCommitInterval:                constants.DefaultGitCommitInterval,
				RateLimitingMaxRequestsPerMinute: constants.DefaultRateLimitingMaxRequestsPerMinute,
				RateLimitingMaxRequestsPerSecond: constants.DefaultRateLimitingMaxRequestsPerSecond,
				DownloadReferedJS:                constants.DefaultDownloadReferedJS,
				LogBufferSize:                    constants.DefaultLogBufferSize,
				LogFileMaxSizeMB:                 constants.DefaultLogFileMaxSizeMB,
			}

			// Restart jxscout with default options
			newjxscout, err := t.jxscout.Restart(defaultOptions)
			if err != nil {
				return nil, fmt.Errorf("failed to restart jxscout: %w", err)
			}

			// Persist the default options to a YAML file
			configFileLocation := path.Join(common.GetPrivateDirectory(), constants.ConfigFileName)
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
		Description: "Install jxscout dependencies (npm, bun, prettier, reverse-sourcemap)",
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

				// Install prettier and reverse-sourcemap using bun
				t.writeLineToOutput("\nInstalling prettier and reverse-sourcemap...")
				cmd = exec.Command("bun", "install", "-g", "prettier", "reverse-sourcemap")
				output, err = cmd.CombinedOutput()
				if err != nil {
					t.writeLineToOutput(fmt.Sprintf("❌ Failed to install prettier and reverse-sourcemap: %v\nOutput: %s", err, string(output)))
					return
				}
				t.writeLineToOutput("✅ prettier and reverse-sourcemap installed successfully")

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
	builder.WriteString(fmt.Sprintf("\n%s", cmd.Name))
	if cmd.ShortName != "" {
		builder.WriteString(fmt.Sprintf(" (%s)", cmd.ShortName))
	}
	builder.WriteString(fmt.Sprintf(" - %s\n", cmd.Description))
	builder.WriteString(fmt.Sprintf("  Usage: %s\n", cmd.Usage))
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
				path.Join(common.GetWorkingDirectory(), currentOptions.ProjectName),
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

	// Chunk discovery configuration
	t.writeLineToOutput(formatLine(
		constants.FlagChunkDiscovererBruteForceLimit,
		fmt.Sprintf("%d", currentOptions.ChunkDiscovererBruteForceLimit),
		descStyle.Render(constants.DescriptionChunkDiscovererBruteForceLimit)))

	// Cache configuration
	t.writeLineToOutput(formatLine(
		constants.FlagJavascriptRequestsCacheTTL,
		fmt.Sprintf("%v", currentOptions.JavascriptRequestsCacheTTL),
		descStyle.Render(constants.DescriptionJavascriptRequestsCacheTTL)))

	t.writeLineToOutput(formatLine(
		constants.FlagHTMLRequestsCacheTTL,
		fmt.Sprintf("%v", currentOptions.HTMLRequestsCacheTTL),
		descStyle.Render(constants.DescriptionHTMLRequestsCacheTTL)))

	// Git commiter configuration
	t.writeLineToOutput(formatLine(
		constants.FlagGitCommitInterval,
		fmt.Sprintf("%v", currentOptions.GitCommitInterval),
		descStyle.Render(constants.DescriptionGitCommitInterval)))

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
}
