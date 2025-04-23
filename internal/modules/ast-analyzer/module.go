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
	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"
)

var enabledAnalyzers = map[string]string{
	"paths":  "0.2.1",
	"emails": "0.2.0",
}

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
	module.wsServer = newWSServer(module)
	return module
}

func (m *astAnalyzerModule) Initialize(sdk *jxscouttypes.ModuleSDK) error {
	m.sdk = sdk

	repo, err := newAstAnalyzerRepository(sdk.Database)
	if err != nil {
		return errutil.Wrap(err, "failed to create ast analyzer repository")
	}
	m.repo = repo

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

	// Setup WebSocket endpoint
	m.sdk.Router.HandleFunc("/ast-analyzer/ws", m.wsServer.handleWebSocket)

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

		asset, err := m.sdk.AssetService.GetAssetByID(ctx, event.AssetID)
		if err != nil {
			return dbeventbus.NewRetriableError(errutil.Wrap(err, "failed to get asset"))
		}

		if !isJavaScriptAsset(asset) {
			return nil
		}

		return m.analyzeAsset(asset)
	}, dbeventbus.Options{
		Concurrency: m.concurrency,
		MaxRetries:  3,
		Backoff: func(retry int) time.Duration {
			return time.Duration(retry) * time.Second
		},
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

func (m *astAnalyzerModule) analyzeAsset(asset assetservice.Asset) error {
	// Get existing analyses for this asset
	existingAnalyses, err := m.repo.getAnalysesByAssetID(m.sdk.Ctx, asset.ID)
	if err != nil {
		return dbeventbus.NewRetriableError(errutil.Wrap(err, "failed to get existing analyses"))
	}

	// Determine which analyzers need to run
	var analyzersToRun []string
	for analyzerName, version := range enabledAnalyzers {
		existing, exists := existingAnalyses[analyzerName]
		if !exists || existing.AnalyzerVersion != version {
			analyzersToRun = append(analyzersToRun, analyzerName)
		}
	}

	// If no analyzers need to run, we're done
	if len(analyzersToRun) == 0 {
		m.sdk.Logger.Debug("all analyzers are up to date", "asset_id", asset.ID)
		return nil
	}

	// Run the AST analyzer script with specific analyzers
	results, err := m.execASTAnalyzer(asset, analyzersToRun)
	if err != nil {
		return errutil.Wrap(err, "failed to execute ast analyzer")
	}

	// Parse the results to get analyzer name and results
	var output map[string]interface{}
	if err := json.Unmarshal([]byte(results), &output); err != nil {
		return errutil.Wrap(err, "failed to parse ast analyzer output")
	}

	for analyzerName, analyzerResults := range output {
		resultsJSON, err := json.Marshal(analyzerResults)
		if err != nil {
			m.sdk.Logger.Error("failed to marshal analyzer results", "err", err, "asset_id", asset.ID, "analyzer", analyzerName)
			continue
		}

		analysis := &astAnalysis{
			AssetID:         asset.ID,
			Analyzer:        analyzerName,
			AnalyzerVersion: enabledAnalyzers[analyzerName],
			Results:         string(resultsJSON),
		}

		// Store the results in the database
		if err := m.repo.createAnalysis(m.sdk.Ctx, analysis); err != nil {
			return dbeventbus.NewRetriableError(errutil.Wrap(err, "failed to store ast analysis results"))
		}
	}

	return nil
}

func (m *astAnalyzerModule) execASTAnalyzer(asset assetservice.Asset, analyzers []string) (string, error) {
	// Get the absolute path of the asset
	absPath, err := filepath.Abs(asset.Path)
	if err != nil {
		return "", errutil.Wrap(err, "failed to get absolute path of asset")
	}

	// Join analyzers with commas
	analyzersArg := strings.Join(analyzers, ",")

	// Run the AST analyzer script with Node.js
	cmd := exec.Command("bun", "run", m.astAnalyzerBinaryPath, absPath, analyzersArg)

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

	// Parse the output to ensure it's valid JSON
	var results interface{}
	if err := json.Unmarshal(outputBytes, &results); err != nil {
		return "", errutil.Wrap(err, "failed to parse ast analyzer output as JSON")
	}

	return string(outputBytes), nil
}
