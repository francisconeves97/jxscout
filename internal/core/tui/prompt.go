package tui

import (
	tea "github.com/charmbracelet/bubbletea"
	"github.com/francisconeves97/jxscout/internal/core/errutil"
)

const staticBanner = `
    _                          _   
   (_)                        | |  
    ___  _____  ___ ___  _   _| |_ 
   | \ \/ / __|/ __/ _ \| | | | __|
   | |>  <\__ \ (_| (_) | |_| | |_ 
   | /_/\_\___/\___\___/ \__,_|\__|
  _/ |                             
 |__/   
 
Type 'help' to see available commands
Type 'exit' to quit

Happy hunting! 🐛
`

func (t *TUI) Run() error {
	p := tea.NewProgram(
		t,
		tea.WithAltScreen(),
	)
	if _, err := p.Run(); err != nil {
		return errutil.Wrap(err, "error running program")
	}

	return nil
}
