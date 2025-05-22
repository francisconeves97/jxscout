package jxscout

import (
	"bytes"
	"log/slog"
	"os"
	"path/filepath"
	"sync"

	"github.com/francisconeves97/jxscout/internal/core/common"
	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"
	"github.com/phsym/console-slog"
	slogmulti "github.com/samber/slog-multi"
	"gopkg.in/natefinch/lumberjack.v2"
)

// LogBuffer implements a thread-safe buffer for storing logs
type logBuffer struct {
	buffer   *bytes.Buffer
	maxLines int
	mu       sync.RWMutex
}

// NewLogBuffer creates a new log buffer with the specified maximum number of lines
func newLogBuffer(maxLines int) *logBuffer {
	return &logBuffer{
		buffer:   &bytes.Buffer{},
		maxLines: maxLines,
	}
}

// Write implements the io.Writer interface
func (lb *logBuffer) Write(p []byte) (n int, err error) {
	lb.mu.Lock()
	defer lb.mu.Unlock()

	// Write to the buffer
	n, err = lb.buffer.Write(p)
	if err != nil {
		return n, err
	}

	// Trim old lines if we exceed maxLines
	lines := bytes.Split(lb.buffer.Bytes(), []byte("\n"))
	if len(lines) > lb.maxLines {
		lb.buffer.Reset()
		for _, line := range lines[len(lines)-lb.maxLines:] {
			lb.buffer.Write(line)
			lb.buffer.WriteByte('\n')
		}
	}

	return n, nil
}

// String returns the current contents of the buffer
func (lb *logBuffer) String() string {
	lb.mu.RLock()
	defer lb.mu.RUnlock()
	return lb.buffer.String()
}

// Clear clears the buffer
func (lb *logBuffer) Clear() {
	lb.mu.Lock()
	defer lb.mu.Unlock()
	lb.buffer.Reset()
}

func initializeLogger(logBuffer *logBuffer, options jxscouttypes.Options) *slog.Logger {
	var logger *slog.Logger
	workingDir := common.GetPrivateDirectory(options.ProjectName)

	logLevel := slog.LevelInfo
	if options.Debug {
		logLevel = slog.LevelDebug
	}

	// Create log directory if it doesn't exist
	if err := os.MkdirAll(workingDir, 0755); err != nil {
		panic(err)
	}

	// Determine log file name based on debug mode
	logFileName := "jxscout.log"
	logPath := filepath.Join(workingDir, logFileName)

	// Create rotating file writer
	fileWriter := &lumberjack.Logger{
		Filename: logPath,
		MaxSize:  options.LogFileMaxSizeMB, // 1MB
	}

	logger = slog.New(
		slogmulti.Fanout(
			console.NewHandler(logBuffer, &console.HandlerOptions{
				Level: logLevel,
			}),
			slog.NewTextHandler(fileWriter, &slog.HandlerOptions{
				Level: logLevel,
			}),
		),
	)

	return logger
}
