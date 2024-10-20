package jxscout

import (
	"log/slog"
	"os"

	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"

	"github.com/phsym/console-slog"
)

type nullWriter struct{}

func (nullWriter) Write([]byte) (int, error) { return 0, nil }

func initializeLogger(options jxscouttypes.Options) *slog.Logger {
	var logger *slog.Logger

	if options.Verbose {
		logLevel := slog.LevelInfo
		if options.Debug {
			logLevel = slog.LevelDebug
		}

		logger = slog.New(
			console.NewHandler(os.Stdout, &console.HandlerOptions{Level: logLevel}),
		)
	} else {
		logger = slog.New(slog.NewTextHandler(nullWriter{}, nil))
	}

	return logger
}
