package tui

import (
	"fmt"
	"strings"

	"github.com/charmbracelet/bubbles/textinput"
	"github.com/charmbracelet/bubbles/viewport"
	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
)

type Command struct {
	Name        string
	Description string
	Usage       string
	Execute     func(args []string) (tea.Cmd, error)
}

type TUI struct {
	input                  textinput.Model
	output                 string
	commands               map[string]Command
	history                []string
	historyIndex           int
	logBuffer              LogBuffer
	logsPanelShown         bool
	logsPanelViewport      viewport.Model
	logsPanelViewportReady bool
	autoScroll             bool
}

type LogBuffer interface {
	String() string
	Clear()
}

func New(logBuffer LogBuffer) *TUI {
	t := &TUI{
		input:          textinput.New(),
		commands:       map[string]Command{},
		history:        []string{},
		historyIndex:   -1,
		logBuffer:      logBuffer,
		logsPanelShown: true,
		autoScroll:     true,
	}
	t.input.Prompt = "> "
	t.input.Placeholder = "Enter command..."
	t.input.Focus()
	t.RegisterDefaultCommands()
	return t
}

func (t *TUI) writeLineToOutput(line string) {
	outputBuilder := strings.Builder{}

	outputBuilder.WriteString(t.output)
	outputBuilder.WriteString(fmt.Sprintf("%s\n", line))

	t.output = outputBuilder.String()
}

func (t *TUI) addToHistory(cmd string) {
	t.history = append(t.history, cmd)
	t.historyIndex = len(t.history)
}

// Init initializes the TUI
func (t *TUI) Init() tea.Cmd {
	return textinput.Blink
}

// Update handles the update of the TUI
func (t *TUI) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	var (
		cmd  tea.Cmd
		cmds []tea.Cmd
	)

	switch msg := msg.(type) {
	case tea.KeyMsg:
		switch msg.Type {
		case tea.KeyEnter:
			command := t.input.Value()
			if command == "" {
				return t, nil
			}

			t.output = ""
			t.addToHistory(command)

			cmd, err := t.ExecuteCommand(command)
			if err != nil {
				t.writeLineToOutput(fmt.Sprintf("Error: %s", err))
			}

			cmds = append(cmds, cmd)

			t.input.Reset()
		case tea.KeyCtrlC:
			t.output = ""
			cmd, _ := t.ExecuteCommand("exit")
			return t, cmd
		case tea.KeyUp:
			if t.historyIndex > 0 {
				t.historyIndex--
				t.input.SetValue(t.history[t.historyIndex])
			}
		case tea.KeyDown:
			if t.historyIndex < len(t.history)-1 {
				t.historyIndex++
				t.input.SetValue(t.history[t.historyIndex])
			} else {
				t.historyIndex = len(t.history)
				t.input.Reset()
			}
		}
	case tea.WindowSizeMsg:
		if !t.logsPanelViewportReady {
			t.logsPanelViewport = viewport.New(msg.Width, msg.Height/2)
			t.logsPanelViewport.Style = lipgloss.NewStyle().
				Border(lipgloss.NormalBorder()).
				BorderForeground(lipgloss.Color("62"))
			t.logsPanelViewportReady = true
		} else {
			t.logsPanelViewport.Width = msg.Width
			t.logsPanelViewport.Height = msg.Height / 2
		}
	}

	t.input, cmd = t.input.Update(msg)
	cmds = append(cmds, cmd)

	// Update logs panel content and viewport
	str := lipgloss.NewStyle().Width(t.logsPanelViewport.Width).Render(fmt.Sprintf("%s\n\n\n\n\n", t.logBuffer.String()))
	t.logsPanelViewport.SetContent(str)
	if t.autoScroll {
		t.logsPanelViewport.GotoBottom()
	}
	t.logsPanelViewport, cmd = t.logsPanelViewport.Update(msg)
	cmds = append(cmds, cmd)

	return t, tea.Batch(cmds...)
}

// View renders the TUI
func (t *TUI) View() string {
	var s strings.Builder

	if t.logsPanelShown && t.logsPanelViewportReady {
		header := lipgloss.NewStyle().
			Bold(true).
			Foreground(lipgloss.Color("205")).
			Padding(0, 1).
			Render("Logs")

		autoScrollText := "Auto-scroll: ON"
		if !t.autoScroll {
			autoScrollText = "Auto-scroll: OFF"
		}
		footer := lipgloss.NewStyle().
			Foreground(lipgloss.Color("241")).
			Padding(0, 1).
			Width(t.logsPanelViewport.Width).
			Align(lipgloss.Right).
			Render(fmt.Sprintf("%s | Scroll (%.0f%%)", autoScrollText, t.logsPanelViewport.ScrollPercent()*100))

		s.WriteString(header + "\n")
		s.WriteString(t.logsPanelViewport.View())
		s.WriteString("\n" + footer + "\n\n")
	}

	if t.output == "" {
		s.WriteString(staticBanner)
	}

	// Render output
	s.WriteString("\n")
	s.WriteString(t.output)
	s.WriteString("\n")

	// Render prompt and input
	s.WriteString(t.input.View())

	return s.String()
}
