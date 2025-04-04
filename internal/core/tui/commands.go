package tui

import (
	"fmt"
	"sort"
	"strconv"
	"strings"
	"time"

	tea "github.com/charmbracelet/bubbletea"
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
				currentOptions := t.jxscout.GetOptions()
				t.writeLineToOutput("Current configuration:")
				t.writeLineToOutput(fmt.Sprintf("  Port: %d", currentOptions.Port))
				t.writeLineToOutput(fmt.Sprintf("  Project Name: %s", currentOptions.ProjectName))
				t.writeLineToOutput(fmt.Sprintf("  Debug: %v", currentOptions.Debug))
				t.writeLineToOutput(fmt.Sprintf("  Asset Fetch Concurrency: %d", currentOptions.AssetFetchConcurrency))
				t.writeLineToOutput(fmt.Sprintf("  Asset Save Concurrency: %d", currentOptions.AssetSaveConcurrency))
				t.writeLineToOutput(fmt.Sprintf("  Beautifier Concurrency: %d", currentOptions.BeautifierConcurrency))
				t.writeLineToOutput(fmt.Sprintf("  Chunk Discoverer Concurrency: %d", currentOptions.ChunkDiscovererConcurrency))
				t.writeLineToOutput(fmt.Sprintf("  Chunk Discoverer Brute Force Limit: %d", currentOptions.ChunkDiscovererBruteForceLimit))
				t.writeLineToOutput(fmt.Sprintf("  JS Requests Cache TTL: %v", currentOptions.JavascriptRequestsCacheTTL))
				t.writeLineToOutput(fmt.Sprintf("  HTML Requests Cache TTL: %v", currentOptions.HTMLRequestsCacheTTL))
				t.writeLineToOutput(fmt.Sprintf("  Git Commit Interval: %v", currentOptions.GitCommitInterval))
				t.writeLineToOutput(fmt.Sprintf("  Rate Limiting Max Requests Per Minute: %d", currentOptions.RateLimitingMaxRequestsPerMinute))
				t.writeLineToOutput(fmt.Sprintf("  Download Refered JS: %v", currentOptions.DownloadReferedJS))
				t.writeLineToOutput(fmt.Sprintf("  Log Buffer Size: %d", currentOptions.LogBufferSize))
				t.writeLineToOutput(fmt.Sprintf("  Log File Max Size MB: %d", currentOptions.LogFileMaxSizeMB))

				t.writeLineToOutput("\nTo update options, use: config option=value [option=value ...]")
				t.writeLineToOutput("Example: config project-name=netflix debug=true")
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

				// Update the appropriate option
				switch option {
				case "port":
					port, err := strconv.Atoi(value)
					if err != nil {
						return nil, fmt.Errorf("invalid port value: %s", value)
					}
					currentOptions.Port = port
				case "project-name":
					currentOptions.ProjectName = value
				case "debug":
					debug, err := strconv.ParseBool(value)
					if err != nil {
						return nil, fmt.Errorf("invalid debug value: %s", value)
					}
					currentOptions.Debug = debug
				case "fetch-concurrency":
					concurrency, err := strconv.Atoi(value)
					if err != nil {
						return nil, fmt.Errorf("invalid fetch-concurrency value: %s", value)
					}
					currentOptions.AssetFetchConcurrency = concurrency
				case "save-concurrency":
					concurrency, err := strconv.Atoi(value)
					if err != nil {
						return nil, fmt.Errorf("invalid save-concurrency value: %s", value)
					}
					currentOptions.AssetSaveConcurrency = concurrency
				case "beautifier-concurrency":
					concurrency, err := strconv.Atoi(value)
					if err != nil {
						return nil, fmt.Errorf("invalid beautifier-concurrency value: %s", value)
					}
					currentOptions.BeautifierConcurrency = concurrency
				case "chunk-discoverer-concurrency":
					concurrency, err := strconv.Atoi(value)
					if err != nil {
						return nil, fmt.Errorf("invalid chunk-discoverer-concurrency value: %s", value)
					}
					currentOptions.ChunkDiscovererConcurrency = concurrency
				case "chunk-discoverer-bruteforce-limit":
					limit, err := strconv.Atoi(value)
					if err != nil {
						return nil, fmt.Errorf("invalid chunk-discoverer-bruteforce-limit value: %s", value)
					}
					currentOptions.ChunkDiscovererBruteForceLimit = limit
				case "js-requests-cache-ttl":
					duration, err := time.ParseDuration(value)
					if err != nil {
						return nil, fmt.Errorf("invalid js-requests-cache-ttl value: %s", value)
					}
					currentOptions.JavascriptRequestsCacheTTL = duration
				case "html-requests-cache-ttl":
					duration, err := time.ParseDuration(value)
					if err != nil {
						return nil, fmt.Errorf("invalid html-requests-cache-ttl value: %s", value)
					}
					currentOptions.HTMLRequestsCacheTTL = duration
				case "git-commit-interval":
					duration, err := time.ParseDuration(value)
					if err != nil {
						return nil, fmt.Errorf("invalid git-commit-interval value: %s", value)
					}
					currentOptions.GitCommitInterval = duration
				case "rate-limiter-max-requests-per-minute":
					rate, err := strconv.Atoi(value)
					if err != nil {
						return nil, fmt.Errorf("invalid rate-limiter-max-requests-per-minute value: %s", value)
					}
					currentOptions.RateLimitingMaxRequestsPerMinute = rate
				case "download-refered-js":
					download, err := strconv.ParseBool(value)
					if err != nil {
						return nil, fmt.Errorf("invalid download-refered-js value: %s", value)
					}
					currentOptions.DownloadReferedJS = download
				case "log-buffer-size":
					size, err := strconv.Atoi(value)
					if err != nil {
						return nil, fmt.Errorf("invalid log-buffer-size value: %s", value)
					}
					currentOptions.LogBufferSize = size
				case "log-file-max-size-mb":
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

			t.writeLineToOutput("jxscout has been restarted with the new configuration")
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
