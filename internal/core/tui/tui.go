package tui

import (
	"fmt"
	"strings"

	"github.com/charmbracelet/bubbles/textinput"
	"github.com/charmbracelet/bubbles/viewport"
	tea "github.com/charmbracelet/bubbletea"
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
}

type LogBuffer interface {
	String() string
}

func New(logBuffer LogBuffer) *TUI {
	t := &TUI{
		input:          textinput.New(),
		commands:       map[string]Command{},
		history:        []string{},
		historyIndex:   -1,
		logBuffer:      logBuffer,
		logsPanelShown: true,
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
			// Since this program is using the full size of the viewport we
			// need to wait until we've received the window dimensions before
			// we can initialize the viewport. The initial dimensions come in
			// quickly, though asynchronously, which is why we wait for them
			// here.
			t.logsPanelViewport = viewport.New(msg.Width/2, msg.Height/2)
			// t.logsPanelViewport.HalfViewUp()
			t.logsPanelViewportReady = true
		} else {
			t.logsPanelViewport.Width = msg.Width / 2
			t.logsPanelViewport.Height = msg.Height / 2
		}

	}

	t.input, cmd = t.input.Update(msg)
	cmds = append(cmds, cmd)

	t.logsPanelViewport.SetContent(t.logBuffer.String())
	t.logsPanelViewport, cmd = t.logsPanelViewport.Update(msg)
	cmds = append(cmds, cmd)

	return t, tea.Batch(cmds...)
}

// View renders the TUI
func (t *TUI) View() string {
	var s strings.Builder

	if t.logsPanelShown && t.logsPanelViewportReady {
		s.WriteString("=== Logs ===\n")
		s.WriteString(t.logsPanelViewport.View())
		s.WriteString("\n=== End Logs ===\n\n")
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
