package jxscout

import (
	"github.com/francisconeves97/jxscout/internal/core/tui"
)

func (s *jxscout) runPrompt() {
	t := tui.New(s.logBuffer)
	t.RegisterDefaultCommands()
	err := t.Run()
	if err != nil {
		s.log.Error("failed to run prompt", "error", err)
	}
}
