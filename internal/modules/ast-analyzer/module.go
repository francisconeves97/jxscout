package astanalyzer

import (
	"context"
	_ "embed"
	"encoding/json"
	"os"
	"os/exec"
	"path/filepath"

	assetservice "github.com/francisconeves97/jxscout/internal/core/asset-service"
	"github.com/francisconeves97/jxscout/internal/core/common"
	"github.com/francisconeves97/jxscout/internal/core/errutil"
	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"
)

//go:embed ast-analyzer.js
var astAnalyzerBinary []byte

type astAnalyzerModule struct {
	sdk                   *jxscouttypes.ModuleSDK
	repo                  *astAnalyzerRepository
	astAnalyzerBinaryPath string
}

func NewAstAnalyzerModule() *astAnalyzerModule {
	return &astAnalyzerModule{}
}

func (m *astAnalyzerModule) Initialize(sdk *jxscouttypes.ModuleSDK) error {
	m.sdk = sdk

	repo, err := newAstAnalyzerRepository(sdk.Database)
	if err != nil {
		return errutil.Wrap(err, "failed to create ast analyzer repository")
	}
	m.repo = repo

	// Create a temporary file for the ast-analyzer.js script
	tempFile, err := os.CreateTemp("", "ast-analyzer-*.js")
	if err != nil {
		return errutil.Wrap(err, "failed to create temporary file for ast-analyzer.js")
	}
	m.astAnalyzerBinaryPath = tempFile.Name()

	if err := os.WriteFile(m.astAnalyzerBinaryPath, astAnalyzerBinary, 0644); err != nil {
		return errutil.Wrap(err, "failed to write ast-analyzer.js to temporary file")
	}

	go func() {
		err := m.subscribeAssetSavedEvent()
		if err != nil {
			m.sdk.Logger.Error("failed to subscribe to asset saved topic", "err", err)
		}
	}()

	return nil
}

func (m *astAnalyzerModule) subscribeAssetSavedEvent() error {
	messages, err := m.sdk.EventBus.Subscribe(assetservice.TopicAssetSaved)
	if err != nil {
		return errutil.Wrap(err, "failed to subscribe to asset saved topic")
	}

	for msg := range messages {
		event, ok := msg.Data.(assetservice.EventAssetSaved)
		if !ok {
			m.sdk.Logger.Error("expected event EventAssetSaved but event is other type")
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

		if err := m.analyzeAsset(event.Asset); err != nil {
			m.sdk.Logger.Error("failed to analyze asset", "err", err, "asset_id", event.Asset.ID)
		}
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
	// Run the AST analyzer script
	results, err := m.execASTAnalyzer(asset)
	if err != nil {
		return errutil.Wrap(err, "failed to execute ast analyzer")
	}

	// Store the results in the database
	analysis := &astAnalysis{
		AssetID:  asset.ID,
		Analyzer: "paths",
		Results:  results,
	}

	if err := m.repo.createAnalysis(context.Background(), analysis); err != nil {
		return errutil.Wrap(err, "failed to store ast analysis results")
	}

	return nil
}

func (m *astAnalyzerModule) execASTAnalyzer(asset assetservice.Asset) (string, error) {
	// Get the absolute path of the asset
	absPath, err := filepath.Abs(asset.Path)
	if err != nil {
		return "", errutil.Wrap(err, "failed to get absolute path of asset")
	}

	// Run the AST analyzer script with Node.js
	cmd := exec.Command("bun", "run", m.astAnalyzerBinaryPath, absPath, "paths")
	output, err := cmd.CombinedOutput()
	if err != nil {
		return "", errutil.Wrap(err, "failed to run ast analyzer script")
	}

	// Parse the output to ensure it's valid JSON
	var results interface{}
	if err := json.Unmarshal(output, &results); err != nil {
		return "", errutil.Wrap(err, "failed to parse ast analyzer output as JSON")
	}

	return string(output), nil
}
