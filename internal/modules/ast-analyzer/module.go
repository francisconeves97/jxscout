package astanalyzer

import (
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
	"github.com/francisconeves97/jxscout/internal/modules/beautifier"
	"github.com/francisconeves97/jxscout/internal/modules/sourcemaps"
	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"
)

const analyzerVersion = 1

//go:embed ast-analyzer.js
var astAnalyzerBinary []byte

type astAnalyzerModule struct {
	sdk                   *jxscouttypes.ModuleSDK
	repo                  *astAnalyzerRepository
	astAnalyzerBinaryPath string
	concurrency           int
	wsServer              *wsServer
}

func NewAstAnalyzerModule(concurrency int) *astAnalyzerModule {
	module := &astAnalyzerModule{
		concurrency: concurrency,
	}
	return module
}

func (m *astAnalyzerModule) Initialize(sdk *jxscouttypes.ModuleSDK) error {
	m.sdk = sdk

	repo, err := newAstAnalyzerRepository(sdk.Database)
	if err != nil {
		return errutil.Wrap(err, "failed to create ast analyzer repository")
	}
	m.repo = repo

	m.wsServer = newWsServer(sdk, m)

	saveDir := filepath.Join(common.GetPrivateDirectory(), "extracted")

	// Create the directory if it doesn't exist
	if err := os.MkdirAll(saveDir, 0755); err != nil {
		return errutil.Wrap(err, "failed to create binaries directory")
	}

	// Define the path for the extracted binary
	binaryPath := filepath.Join(saveDir, "ast-analyzer.js")
	if err := os.WriteFile(binaryPath, astAnalyzerBinary, 0755); err != nil {
		return errutil.Wrap(err, "failed to write ast analyzer file")
	}

	m.astAnalyzerBinaryPath = binaryPath

	go func() {
		err := m.subscribeAssetBeautified()
		if err != nil {
			m.sdk.Logger.Error("failed to subscribe to asset saved topic", "err", err)
		}
	}()

	return nil
}

func (m *astAnalyzerModule) subscribeAssetBeautified() error {
	m.sdk.DBEventBus.Subscribe(m.sdk.Ctx, beautifier.TopicBeautifierAssetSaved, "ast-analyzer", func(ctx context.Context, payload []byte) error {
		var event beautifier.EventBeautifierAssetSaved
		err := json.Unmarshal(payload, &event)
		if err != nil {
			return errutil.Wrap(err, "failed to unmarshal payload")
		}

		assetServiceAsset, err := m.sdk.AssetService.GetAssetByID(ctx, event.AssetID)
		if err != nil {
			return dbeventbus.NewRetriableError(errutil.Wrap(err, "failed to get asset"))
		}

		if !isJavaScriptAsset(assetServiceAsset) {
			return nil
		}

		asset := asset{
			ID:        assetServiceAsset.ID,
			Path:      assetServiceAsset.Path,
			AssetType: AssetTypeOriginalAsset,
		}

		_, err = m.analyzeAsset(asset)
		if err != nil {
			return errutil.Wrapf(err, "failed to analyze asset: %s", asset.Path)
		}

		return nil
	}, dbeventbus.Options{
		Concurrency:       m.concurrency,
		MaxRetries:        3,
		Backoff:           common.ExponentialBackoff,
		PollInterval:      1 * time.Second,
		HeartbeatInterval: 10 * time.Second,
	})

	m.sdk.DBEventBus.Subscribe(m.sdk.Ctx, sourcemaps.TopicSourcemapsReversedSourcemapSaved, "ast-analyzer", func(ctx context.Context, payload []byte) error {
		var event sourcemaps.EventSourcemapsReversedSourcemapSaved
		err := json.Unmarshal(payload, &event)
		if err != nil {
			return errutil.Wrap(err, "failed to unmarshal payload")
		}

		var reversedSourcemap sourcemaps.ReversedSourcemap
		err = m.sdk.Database.GetContext(ctx, &reversedSourcemap, "SELECT * FROM reversed_sourcemaps WHERE id = ?", event.ReversedSourcemapID)
		if err != nil {
			return dbeventbus.NewRetriableError(errutil.Wrap(err, "failed to get reversed sourcemap"))
		}

		asset := asset{
			ID:        reversedSourcemap.ID,
			Path:      reversedSourcemap.Path,
			AssetType: AssetTypeReversedSourcemap,
		}

		_, err = m.analyzeAsset(asset)
		if err != nil {
			return errutil.Wrapf(err, "failed to analyze asset: %s", asset.Path)
		}

		return nil
	}, dbeventbus.Options{
		Concurrency:       m.concurrency,
		MaxRetries:        3,
		Backoff:           common.ExponentialBackoff,
		PollInterval:      1 * time.Second,
		HeartbeatInterval: 10 * time.Second,
	})

	return nil
}

func isJavaScriptAsset(asset assetservice.Asset) bool {
	if asset.IsInlineJS {
		return true
	}

	if asset.ContentType == common.ContentTypeJS {
		return true
	}

	return false
}

type Position struct {
	/** 1-based */
	Line int64 `json:"line"`
	/** 0-based */
	Column int64 `json:"column"`
}

func (m *astAnalyzerModule) analyzeAsset(asset asset) (astAnalysis, error) {
	// Get existing analyses for this asset
	analysis, found, err := m.repo.getASTAnalysisByAssetID(m.sdk.Ctx, asset.ID, asset.AssetType)
	if err != nil {
		return analysis, dbeventbus.NewRetriableError(errutil.Wrap(err, "failed to get existing analyses"))
	}

	if found && analysis.AnalyzerVersion == analyzerVersion {
		m.sdk.Logger.Debug("analysis is up to date, skipping", "asset_id", asset.ID, "analysis", analysis.ID)
		return analysis, nil
	}

	// Run the AST analyzer script with specific analyzers
	results, err := m.execASTAnalyzer(asset)
	if err != nil {
		return analysis, errutil.Wrap(err, "failed to execute ast analyzer")
	}

	// make sure output is in the correct format
	var output []AnalyzerMatch
	if err := json.Unmarshal([]byte(results), &output); err != nil {
		return analysis, errutil.Wrapf(err, "failed to parse ast analyzer output: %s", results)
	}

	analysis = astAnalysis{
		AssetID:         asset.ID,
		AnalyzerVersion: analyzerVersion,
		Results:         results,
		AssetType:       asset.AssetType,
		AssetPath:       asset.Path,
	}

	// Store the results in the database
	if err := m.repo.createAnalysis(m.sdk.Ctx, analysis); err != nil {
		return analysis, dbeventbus.NewRetriableError(errutil.Wrap(err, "failed to store ast analysis results"))
	}

	return analysis, nil
}

func (m *astAnalyzerModule) execASTAnalyzer(asset asset) (string, error) {
	// Get the absolute path of the asset
	absPath, err := filepath.Abs(asset.Path)
	if err != nil {
		return "", errutil.Wrap(err, "failed to get absolute path of asset")
	}

	// Run the AST analyzer script with Node.js
	cmd := exec.Command("bun", "run", m.astAnalyzerBinaryPath, absPath)

	m.sdk.Logger.Debug("executing ast analyzer", "asset_id", asset.ID, "path", absPath, "cmd", cmd.String())

	stdout, err := cmd.StdoutPipe()
	if err != nil {
		return "", errutil.Wrap(err, "error creating stdout pipe")
	}
	stderr, err := cmd.StderrPipe()
	if err != nil {
		return "", errutil.Wrap(err, "error creating stderr pipe")
	}

	if err := cmd.Start(); err != nil {
		return "", errutil.Wrap(err, "error starting command")
	}

	// Read the output
	outputBytes, err := io.ReadAll(stdout)
	if err != nil {
		return "", errutil.Wrap(err, "failed to read stdout")
	}

	// Check for errors in stderr
	stderrBytes, err := io.ReadAll(stderr)
	if err != nil {
		return "", errutil.Wrap(err, "failed to read stderr")
	}
	if len(stderrBytes) > 0 {
		return "", fmt.Errorf("error executing ast analyzer: %s", strings.TrimSpace(string(stderrBytes)))
	}

	// Wait for the command to finish
	if err := cmd.Wait(); err != nil {
		return "", errutil.Wrap(err, "error running ast analyzer script")
	}

	return string(outputBytes), nil
}
