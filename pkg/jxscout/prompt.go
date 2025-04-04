package jxscout

import (
	"github.com/francisconeves97/jxscout/internal/core/tui"
	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"
)

type tuiJXScoutWrapper struct {
	jxscout *jxscout
}

func (t *tuiJXScoutWrapper) GetLogBuffer() tui.LogBuffer {
	return t.jxscout.logBuffer
}

func (t *tuiJXScoutWrapper) Stop() error {
	return t.jxscout.Stop()
}

func (t *tuiJXScoutWrapper) GetOptions() jxscouttypes.Options {
	return t.jxscout.options
}

func (t *tuiJXScoutWrapper) Restart(options jxscouttypes.Options) (tui.JXScout, error) {
	jxscout, err := t.jxscout.Restart(options)
	if err != nil {
		return nil, err
	}

	t.jxscout = jxscout

	return &tuiJXScoutWrapper{jxscout: jxscout}, nil
}

func (s *jxscout) runPrompt() {
	t := tui.New(&tuiJXScoutWrapper{jxscout: s})
	t.RegisterDefaultCommands()
	err := t.Run()
	if err != nil {
		s.log.Error("failed to run prompt", "error", err)
	}
}
