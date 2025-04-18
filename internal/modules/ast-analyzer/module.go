package astanalyzer

import (
	"context"
	_ "embed"
	"encoding/json"
	"fmt"
	"io"
	"os"
	"os/exec"
	"path"
	"path/filepath"
	"strings"

	assetservice "github.com/francisconeves97/jxscout/internal/core/asset-service"
	"github.com/francisconeves97/jxscout/internal/core/common"
	"github.com/francisconeves97/jxscout/internal/core/errutil"
	"github.com/francisconeves97/jxscout/internal/modules/beautifier"
	concurrentqueue "github.com/francisconeves97/jxscout/pkg/concurrent-queue"
	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"
)

var enabledAnalyzers = map[string]string{
	"paths":  "0.1.0",
	"emails": "0.1.0",
}

//go:embed ast-analyzer.js
var astAnalyzerBinary []byte

type astAnalyzerModule struct {
	sdk                   *jxscouttypes.ModuleSDK
	repo                  *astAnalyzerRepository
	astAnalyzerBinaryPath string
	queue                 concurrentqueue.Queue[assetservice.Asset]
	wsServer              *wsServer
}

func NewAstAnalyzerModule(concurrency int) *astAnalyzerModule {
	module := &astAnalyzerModule{
		queue: concurrentqueue.NewQueue[assetservice.Asset](concurrency),
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

	saveDir := path.Join(common.GetPrivateDirectory(), "extracted")

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

	m.initializeQueueHandler()

	return nil
}

func (m *astAnalyzerModule) initializeQueueHandler() {
	m.queue.StartConsumers(func(ctx context.Context, asset assetservice.Asset) {
		err := m.analyzeAsset(asset)
		if err != nil {
			m.sdk.Logger.ErrorContext(ctx, "failed to analyze asset", "err", err, "asset_url", asset.URL)
			return
		}
	})
}

func (m *astAnalyzerModule) subscribeAssetBeautified() error {
	messages, err := m.sdk.EventBus.Subscribe(beautifier.TopicBeautifierAssetSaved)
	if err != nil {
		return errutil.Wrap(err, "failed to subscribe to asset saved topic")
	}

	for msg := range messages {
		event, ok := msg.Data.(beautifier.EventBeautifierAssetSaved)
		if !ok {
			m.sdk.Logger.Error("expected event EventBeautifierAssetSaved but event is other type")
			continue
		}

		// Check if the asset is a JavaScript file or contains inline JavaScript
		if !isJavaScriptAsset(event.Asset) {
			continue
		}

		if !m.sdk.Scope.IsInScope(event.Asset.URL) {
			m.sdk.Logger.Debug("skipping ast analysis because asset is not in scope", "asset_url", event.Asset.URL)
			continue
		}

		m.queue.Produce(m.sdk.Ctx, event.Asset)
	}

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
		return errutil.Wrap(err, "failed to get existing analyses")
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
			m.sdk.Logger.Error("failed to store ast analysis results", "err", err, "asset_id", asset.ID, "analyzer", analyzerName)
			continue
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
