package tui

import (
	"fmt"
	"path"
	"sort"
	"strconv"
	"strings"
	"time"

	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
	"github.com/francisconeves97/jxscout/internal/core/common"
	"github.com/francisconeves97/jxscout/pkg/constants"
)

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
		ShortName:   "cfg",
		Description: "Update jxscout configuration options",
		Usage:       "config [options]",
		Execute: func(args []string) (tea.Cmd, error) {
			if len(args) == 0 {
				// Show current configuration
				t.printCurrentConfig()
				t.writeLineToOutput("\nTo update options, use: config option=value [option=value ...]")
				t.writeLineToOutput("To reset an option to default, use: config option=default")
				t.writeLineToOutput("To manage scope patterns, use: config scope=add:pattern or config scope=remove:pattern")
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

			t.jxscout = newjxscout

			t.writeLineToOutput("jxscout has been restarted with the new configuration! 🎉\n")
			t.printCurrentConfig()
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
	specialCommands := []string{"help", "clear", "exit"}

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
	t.writeLineToOutput("Current configuration:")
	t.writeLineToOutput(fmt.Sprintf("  %s: %d", constants.FlagPort, currentOptions.Port))
	t.writeLineToOutput(fmt.Sprintf("  %s: %s | %s", constants.FlagProjectName, currentOptions.ProjectName, lipgloss.NewStyle().Foreground(lipgloss.Color("241")).Render(path.Join(common.GetWorkingDirectory(), currentOptions.ProjectName))))
	t.writeLineToOutput(fmt.Sprintf("  %s: %v", constants.FlagScope, strings.Join(currentOptions.ScopePatterns, ",")))
	t.writeLineToOutput(fmt.Sprintf("  %s: %v", constants.FlagDebug, currentOptions.Debug))
	t.writeLineToOutput(fmt.Sprintf("  %s: %d", constants.FlagAssetFetchConcurrency, currentOptions.AssetFetchConcurrency))
	t.writeLineToOutput(fmt.Sprintf("  %s: %d", constants.FlagAssetSaveConcurrency, currentOptions.AssetSaveConcurrency))
	t.writeLineToOutput(fmt.Sprintf("  %s: %d", constants.FlagBeautifierConcurrency, currentOptions.BeautifierConcurrency))
	t.writeLineToOutput(fmt.Sprintf("  %s: %d", constants.FlagChunkDiscovererConcurrency, currentOptions.ChunkDiscovererConcurrency))
	t.writeLineToOutput(fmt.Sprintf("  %s: %d", constants.FlagChunkDiscovererBruteForceLimit, currentOptions.ChunkDiscovererBruteForceLimit))
	t.writeLineToOutput(fmt.Sprintf("  %s: %v", constants.FlagJavascriptRequestsCacheTTL, currentOptions.JavascriptRequestsCacheTTL))
	t.writeLineToOutput(fmt.Sprintf("  %s: %v", constants.FlagHTMLRequestsCacheTTL, currentOptions.HTMLRequestsCacheTTL))
	t.writeLineToOutput(fmt.Sprintf("  %s: %v", constants.FlagGitCommitInterval, currentOptions.GitCommitInterval))
	t.writeLineToOutput(fmt.Sprintf("  %s: %d", constants.FlagRateLimitingMaxRequestsPerMinute, currentOptions.RateLimitingMaxRequestsPerMinute))
	t.writeLineToOutput(fmt.Sprintf("  %s: %v", constants.FlagDownloadReferedJS, currentOptions.DownloadReferedJS))
	t.writeLineToOutput(fmt.Sprintf("  %s: %d", constants.FlagLogBufferSize, currentOptions.LogBufferSize))
	t.writeLineToOutput(fmt.Sprintf("  %s: %d", constants.FlagLogFileMaxSizeMB, currentOptions.LogFileMaxSizeMB))
}
