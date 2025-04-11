package jxscout

import (
	"context"

	"github.com/francisconeves97/jxscout/internal/core/tui"
	"github.com/francisconeves97/jxscout/internal/modules/overrides"
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

func (t *tuiJXScoutWrapper) GetOverridesModule() overrides.OverridesModule {
	return t.jxscout.overridesModule
}

func (t *tuiJXScoutWrapper) GetAssetService() jxscouttypes.AssetService {
	return t.jxscout.assetService
}

func (t *tuiJXScoutWrapper) Ctx() context.Context {
	return t.jxscout.ctx
}

func (t *tuiJXScoutWrapper) TruncateTables() error {
	return t.jxscout.TruncateTables()
}

func (s *jxscout) runPrompt() {
	t := tui.New(&tuiJXScoutWrapper{jxscout: s})
	t.RegisterDefaultCommands()
	err := t.Run()
	if err != nil {
		s.log.Error("failed to run prompt", "error", err)
	}
}
