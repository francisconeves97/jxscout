package tui

import (
	"fmt"
	"sort"
	"strings"

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
