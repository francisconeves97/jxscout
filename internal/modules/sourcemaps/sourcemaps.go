package sourcemaps

import (
	"bufio"
	"context"
	_ "embed"
	"encoding/json"
	"fmt"
	"io"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"

	assetservice "github.com/francisconeves97/jxscout/internal/core/asset-service"
	"github.com/francisconeves97/jxscout/internal/core/common"
	"github.com/francisconeves97/jxscout/internal/core/dbeventbus"
	"github.com/francisconeves97/jxscout/internal/core/errutil"
	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"
	"github.com/pkg/errors"
)

//go:embed sourcemaps.js
var sourcemapsBinary []byte

//go:embed mappings.wasm
var mappingsWasm []byte

const (
	SourceMapsFolder   = "sourcemaps"
	SourceMapsReversed = "reversed"
)

type sourceMapsModule struct {
	sdk                  *jxscouttypes.ModuleSDK
	concurrency          int
	sourcemapsBinaryPath string
}

func NewSourceMaps(concurrency int) *sourceMapsModule {
	return &sourceMapsModule{
		concurrency: concurrency,
	}
}

func (m *sourceMapsModule) Initialize(sdk *jxscouttypes.ModuleSDK) error {
	m.sdk = sdk

	err := initializeDatabase(m.sdk.Database)
	if err != nil {
		return errutil.Wrap(err, "failed to initialize database")
	}

	go func() {
		err := m.subscribeAssetSavedEvent()
		if err != nil {
			m.sdk.Logger.Error("failed to subscribe to asset saved topic", "err", err)
		}
	}()

	saveDir := filepath.Join(common.GetPrivateDirectoryRoot(), "extracted")

	// Create the directory if it doesn't exist
	if err := os.MkdirAll(saveDir, 0755); err != nil {
		return errutil.Wrap(err, "failed to create binaries directory")
	}

	mappingsWasmPath := filepath.Join(saveDir, "mappings.wasm")
	if err := os.WriteFile(mappingsWasmPath, mappingsWasm, 0755); err != nil {
		return errutil.Wrap(err, "failed to write mappings wasm file")
	}

	// Define the path for the extracted binary
	binaryPath := filepath.Join(saveDir, "sourcemaps.js")
	if err := os.WriteFile(binaryPath, sourcemapsBinary, 0755); err != nil {
		return errutil.Wrap(err, "failed to write sourcemaps file")
	}

	m.sourcemapsBinaryPath = binaryPath

	return nil
}

var validsourceMapsContentTypes = map[common.ContentType]bool{
	common.ContentTypeHTML: false,
	common.ContentTypeJS:   true,
}

func (m *sourceMapsModule) subscribeAssetSavedEvent() error {
	err := m.sdk.DBEventBus.Subscribe(m.sdk.Ctx, assetservice.TopicAssetSaved, "sourcemaps", func(ctx context.Context, payload []byte) error {
		// unmarshal payload
		var event assetservice.EventAssetSaved
		err := json.Unmarshal(payload, &event)
		if err != nil {
			return errutil.Wrap(err, "failed to unmarshal payload")
		}

		asset, err := m.sdk.AssetService.GetAssetByID(ctx, event.AssetID)
		if err != nil {
			return dbeventbus.NewRetriableError(errutil.Wrap(err, "failed to get asset"))
		}

		err = m.handleAssetSavedEvent(ctx, asset)
		if err != nil {
			return errutil.Wrapf(err, "failed to handle asset saved event for asset (%s)", asset.URL)
		}

		return nil
	}, dbeventbus.Options{
		Concurrency:       m.concurrency,
		MaxRetries:        3,
		Backoff:           common.ExponentialBackoff,
		PollInterval:      1 * time.Second,
		HeartbeatInterval: 10 * time.Second,
	})
	if err != nil {
		return errutil.Wrap(err, "failed to subscribe to ingestion request topic")
	}

	return nil
}

func (m *sourceMapsModule) handleAssetSavedEvent(ctx context.Context, asset assetservice.Asset) error {
	if asset.IsInlineJS {
		return nil
	}

	if isValid, ok := validsourceMapsContentTypes[asset.ContentType]; !ok || !isValid {
		return nil
	}

	return m.sourceMapDiscover(ctx, asset)
}

func (s *sourceMapsModule) sourceMapDiscover(ctx context.Context, asset assetservice.Asset) error {
	sourceMap, found, err := getSourceMapForAsset(ctx, asset, s.sdk)
	if err != nil {
		return errutil.Wrap(err, "failed to get source map for asset")
	}
	if !found {
		return nil
	}

	urlToSave := common.NormalizeURL(sourceMap.URL.String())
	if sourceMap.URL.Scheme == "data" {
		urlToSave = fmt.Sprintf("%s.map", asset.URL)
	}

	filePath, err := s.sdk.FileService.SaveInSubfolder(ctx, SourceMapsFolder, assetservice.SaveFileRequest{
		PathURL: urlToSave,
		Content: &sourceMap.OriginalContent,
	})
	if err != nil {
		return dbeventbus.NewRetriableError(errors.Wrapf(err, "failed to save source map for asset %s", asset.URL))
	}

	s.sdk.Logger.Info("discovered source map 💼", "path", filePath, "asset_url", asset.URL, "sourcemap_url", urlToSave)

	dbSourceMap := &Sourcemap{
		AssetID: asset.ID,
		URL:     common.NormalizeURL(sourceMap.URL.String()),
		Getter:  sourceMap.GetterName,
		Path:    filePath,
		Hash:    common.Hash(sourceMap.OriginalContent),
	}

	sourceMapID, err := SaveSourcemap(ctx, s.sdk.Database, dbSourceMap)
	if err != nil {
		return dbeventbus.NewRetriableError(errutil.Wrap(err, "failed to save source map"))
	}

	// assetPath, err := s.sdk.FileService.URLToPath(asset.URL)
	// if err != nil {
	// 	return errutil.Wrap(err, "failed to convert asset url to path")
	// }

	reverseSourceMapsDir := []string{
		common.GetWorkingDirectory(s.sdk.Options.ProjectName),
		SourceMapsFolder,
		SourceMapsReversed,
		sourceMap.URL.Host,
	}

	// reverseSourceMapsDir = append(reverseSourceMapsDir, assetPath...)

	reversedSourceMapsDir := filepath.Join(reverseSourceMapsDir...)

	sourcemaps, err := s.execSourcemapsReverse(filePath, reversedSourceMapsDir)
	if err != nil {
		return errutil.Wrap(err, "failed to execute sourcemaps reverse")
	}

	// tx, err := s.sdk.Database.BeginTxx(ctx, nil)
	// if err != nil {
	// 	return errutil.Wrap(err, "failed to begin transaction")
	// }

	for _, sourcemap := range sourcemaps {
		reversedSourceMap := &ReversedSourcemap{
			SourcemapID: sourceMapID,
			Path:        sourcemap,
		}

		reversedSourceMapID, err := SaveReversedSourcemap(ctx, s.sdk.Database, reversedSourceMap)
		if err != nil {
			return dbeventbus.NewRetriableError(errutil.Wrap(err, "failed to save reversed source map"))
		}

		err = s.sdk.DBEventBus.Publish(ctx, s.sdk.Database, TopicSourcemapsReversedSourcemapSaved, EventSourcemapsReversedSourcemapSaved{
			ReversedSourcemapID: reversedSourceMapID,
		})
		if err != nil {
			return dbeventbus.NewRetriableError(errutil.Wrap(err, "failed to publish reversed source map"))
		}
	}

	// err = tx.Commit()
	// if err != nil {
	// 	return errutil.Wrap(err, "failed to commit transaction")
	// }
	return nil
}

func (s *sourceMapsModule) execSourcemapsReverse(sourcemapPath string, sourcemapOutputDir string) ([]string, error) {
	// Prepare the command to run the JavaScript script with Bun
	cmd := exec.Command("bun", "run", s.sourcemapsBinaryPath, sourcemapPath, sourcemapOutputDir)

	s.sdk.Logger.Debug("executing sourcemaps reverse", "command", cmd.String())

	stdout, err := cmd.StdoutPipe()
	if err != nil {
		return nil, errutil.Wrap(err, "error creating stdout pipe")
	}
	stderr, err := cmd.StderrPipe()
	if err != nil {
		return nil, errutil.Wrap(err, "error creating stderr pipe")
	}

	if err := cmd.Start(); err != nil {
		return nil, errutil.Wrap(err, "error starting command")
	}

	var sourcemaps []string
	scanner := bufio.NewScanner(stdout)
	for scanner.Scan() {
		sourcemaps = append(sourcemaps, scanner.Text())
	}

	// Check for errors in stderr
	stderrBytes, err := io.ReadAll(stderr)
	if err != nil {
		return nil, errutil.Wrap(err, "failed to read stderr")
	}
	if len(stderrBytes) > 0 {
		return nil, fmt.Errorf("error executing sourcemaps reverse: %s", strings.TrimSpace(string(stderrBytes)))
	}

	// Wait for the command to finish
	if err := cmd.Wait(); err != nil {
		return nil, errutil.Wrap(err, "error running JavaScript script")
	}

	return sourcemaps, nil
}
