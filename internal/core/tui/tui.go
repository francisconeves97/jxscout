package tui

import (
	"context"
	"encoding/json"
	"fmt"
	"os/exec"
	"strings"
	"time"

	"github.com/charmbracelet/bubbles/textinput"
	"github.com/charmbracelet/bubbles/viewport"
	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
	"github.com/francisconeves97/jxscout/internal/modules/overrides"
	"github.com/francisconeves97/jxscout/pkg/constants"
	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"
	"github.com/muesli/reflow/wordwrap"
)

type Command struct {
	Name        string
	ShortName   string
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
	logsPanelShown         bool
	logsPanelViewport      viewport.Model
	logsPanelViewportReady bool
	autoScroll             bool
	jxscout                JXScout
	hasUpdate              bool
	latestVersion          string
}

type LogBuffer interface {
	String() string
	Clear()
}

type JXScout interface {
	Stop() error
	GetOptions() jxscouttypes.Options
	GetLogBuffer() LogBuffer
	Restart(options jxscouttypes.Options) (JXScout, error)
	GetOverridesModule() overrides.OverridesModule
	Ctx() context.Context
	GetAssetService() jxscouttypes.AssetService
	TruncateTables() error
}

func New(jxscout JXScout) *TUI {
	t := &TUI{
		input:          textinput.New(),
		commands:       map[string]Command{},
		history:        []string{},
		historyIndex:   -1,
		logsPanelShown: false,
		autoScroll:     true,
		jxscout:        jxscout,
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

type LogsTickMsg time.Time

type VersionCheckMsg struct {
	HasUpdate bool
	Version   string
}

func versionCheckCmd() tea.Cmd {
	return func() tea.Msg {
		// Use curl to check the latest release on GitHub
		cmd := exec.Command("curl", "-s", "https://api.github.com/repos/francisconeves97/jxscout/releases/latest")
		output, err := cmd.CombinedOutput()
		if err != nil {
			return VersionCheckMsg{HasUpdate: false}
		}

		// Parse the JSON response to extract the tag_name
		var response struct {
			TagName string `json:"tag_name"`
		}
		if err := json.Unmarshal(output, &response); err != nil {
			return VersionCheckMsg{HasUpdate: false}
		}

		// Remove 'v' prefix if present
		latestVersion := strings.TrimPrefix(response.TagName, "v")
		currentVersion := constants.Version

		// Compare versions
		if latestVersion != currentVersion {
			return VersionCheckMsg{
				HasUpdate: true,
				Version:   latestVersion,
			}
		}

		return VersionCheckMsg{HasUpdate: false}
	}
}

func (t *TUI) Init() tea.Cmd {
	return tea.Batch(textinput.Blink, logsTickerCmd(), versionCheckCmd())
}

func logsTickerCmd() tea.Cmd {
	return tea.Every(530*time.Millisecond, func(t time.Time) tea.Msg {
		return LogsTickMsg(t)
	})
}

func (t *TUI) handlePromptViewUpdate(msg tea.Msg) tea.Cmd {
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
				return nil
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
			return cmd
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
	}

	t.input, cmd = t.input.Update(msg)
	cmds = append(cmds, cmd)

	return tea.Batch(cmds...)
}

func (t *TUI) handleLogsViewUpdate(msg tea.Msg) tea.Cmd {
	var (
		cmd  tea.Cmd
		cmds []tea.Cmd
	)

	switch msg := msg.(type) {
	case tea.KeyMsg:
		switch msg.Type {
		case tea.KeyCtrlC, tea.KeyEsc:
			t.logsPanelShown = false
		case tea.KeyRunes:
			switch string(msg.Runes) {
			case "q":
				t.logsPanelShown = false
			case "s":
				t.autoScroll = !t.autoScroll
			case "c":
				t.jxscout.GetLogBuffer().Clear()
				t.logsPanelViewport.SetContent(wordwrap.String(t.jxscout.GetLogBuffer().String(), t.logsPanelViewport.Width))
			}
		}
	case LogsTickMsg:
		t.logsPanelViewport.SetContent(wordwrap.String(t.jxscout.GetLogBuffer().String(), t.logsPanelViewport.Width))
		if t.autoScroll {
			t.logsPanelViewport.GotoBottom()
		}
	}

	t.logsPanelViewport, cmd = t.logsPanelViewport.Update(msg)
	cmds = append(cmds, cmd)

	return tea.Batch(cmds...)
}

// Update handles the update of the TUI
func (t *TUI) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	var (
		cmd  tea.Cmd
		cmds []tea.Cmd
	)

	switch msg := msg.(type) {
	case VersionCheckMsg:
		t.hasUpdate = msg.HasUpdate
		t.latestVersion = msg.Version
	case tea.KeyMsg:
	case tea.WindowSizeMsg:
		headerHeight := lipgloss.Height(t.logsHeader())
		footerHeight := lipgloss.Height(t.logsFooter())
		verticalMarginHeight := headerHeight + footerHeight

		if !t.logsPanelViewportReady {
			t.logsPanelViewport = viewport.New(msg.Width, msg.Height-verticalMarginHeight)
			t.logsPanelViewport.SetContent(wordwrap.String(t.jxscout.GetLogBuffer().String(), t.logsPanelViewport.Width))
			t.logsPanelViewport.YPosition = headerHeight
			t.logsPanelViewport.Style = lipgloss.NewStyle().
				Border(lipgloss.NormalBorder()).
				BorderForeground(lipgloss.Color("62"))
			t.logsPanelViewportReady = true
		} else {
			t.logsPanelViewport.Width = msg.Width
			t.logsPanelViewport.Height = msg.Height - verticalMarginHeight
		}
	case LogsTickMsg:
		cmds = append(cmds, logsTickerCmd())
	}

	if t.logsPanelShown && t.logsPanelViewportReady {
		cmd = t.handleLogsViewUpdate(msg)
		cmds = append(cmds, cmd)
	} else {
		cmd = t.handlePromptViewUpdate(msg)
		cmds = append(cmds, cmd)
	}

	return t, tea.Batch(cmds...)
}

func (t *TUI) logsHeader() string {
	return fmt.Sprintf("%s\n", lipgloss.NewStyle().
		Bold(true).
		Foreground(lipgloss.Color("205")).
		Padding(0, 1).
		Render("Logs"))
}

func (t *TUI) logsFooter() string {
	autoScrollText := "Auto-scroll: ON"
	if !t.autoScroll {
		autoScrollText = "Auto-scroll: OFF"
	}

	controls := lipgloss.NewStyle().
		Foreground(lipgloss.Color("241")).
		Padding(0, 1).
		Width(t.logsPanelViewport.Width / 2).
		Align(lipgloss.Left).
		Render("q: quit logs | s: toggle auto-scroll | c: clear logs")

	info := lipgloss.NewStyle().
		Foreground(lipgloss.Color("241")).
		Padding(0, 1).
		Width(t.logsPanelViewport.Width / 2).
		Align(lipgloss.Right).
		Render(fmt.Sprintf("%s | Scroll (%.0f%%)", autoScrollText, t.logsPanelViewport.ScrollPercent()*100))

	return fmt.Sprintf("\n%s%s", controls, info)
}

func (t *TUI) renderLogsPanel() string {
	var s strings.Builder

	s.WriteString(t.logsHeader())
	s.WriteString(t.logsPanelViewport.View())
	s.WriteString(t.logsFooter())

	return s.String()
}

// View renders the TUI
func (t *TUI) View() string {
	var s strings.Builder

	if t.logsPanelShown && t.logsPanelViewportReady {
		return t.renderLogsPanel()
	}

	if t.output == "" {
		s.WriteString(staticBanner)
		if t.hasUpdate {
			updateMsg := fmt.Sprintf("\n🔄 A new version (%s) is available!\nVisit https://github.com/francisconeves97/jxscout to check it out.\n", t.latestVersion)
			s.WriteString(lipgloss.NewStyle().
				Foreground(lipgloss.Color("205")).
				Render(updateMsg))
		}
	}

	// Render output
	s.WriteString("\n")
	s.WriteString(t.output)
	s.WriteString("\n")

	// Render prompt and input
	s.WriteString(t.input.View())

	return s.String()
}
