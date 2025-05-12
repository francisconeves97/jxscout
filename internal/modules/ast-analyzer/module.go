package astanalyzer

import (
	"bytes"
	"context"
	_ "embed"
	"encoding/json"
	"fmt"
	"io"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
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

// Constants for asset types, accessible within the 'astanalyzer' package
const (
	AssetTypeOriginalAsset     = "asset"
	AssetTypeReversedSourcemap = "reversed_sourcemap"
)

//go:embed ast-analyzer.js
var astAnalyzerBinary []byte

//go:embed parser.darwin-arm64.node
var parserDarwinArm64 []byte

//go:embed parser.darwin-x64.node
var parserDarwinX64 []byte

//go:embed parser.linux-arm-gnueabihf.node
var parserLinuxArmGnueabihf []byte

//go:embed parser.linux-arm64-gnu.node
var parserLinuxArm64Gnu []byte

//go:embed parser.linux-arm64-musl.node
var parserLinuxArm64Musl []byte

//go:embed parser.linux-x64-gnu.node
var parserLinuxX64Gnu []byte

//go:embed parser.linux-x64-musl.node
var parserLinuxX64Musl []byte

//go:embed parser.win32-arm64-msvc.node
var parserWin32Arm64Msvc []byte

//go:embed parser.win32-x64-msvc.node
var parserWin32X64Msvc []byte

type astAnalyzerModule struct {
	sdk                 *jxscouttypes.ModuleSDK
	repo                *astAnalyzerRepository
	astAnalyzerBinaryPath string
	concurrency         int
	wsServer            *wsServer
	nativeLibraryPath   string
}

func NewAstAnalyzerModule(concurrency int) *astAnalyzerModule {
	module := &astAnalyzerModule{
		concurrency: concurrency,
	}
	return module
}

func (m *astAnalyzerModule) Initialize(sdk *jxscouttypes.ModuleSDK) error {
	m.sdk = sdk

	// Assuming sdk.Database is the *sqlx.DB connection from the ModuleSDK
	// Pass the module's SDK (m.sdk) which is *jxscouttypes.ModuleSDK
	repo, err := newAstAnalyzerRepository(m.sdk, sdk.Database) // <--- MODIFIED CALL
	if err != nil {
		return errutil.Wrap(err, "failed to create ast analyzer repository")
	}
	m.repo = repo

	m.wsServer = newWsServer(sdk, m)

	saveDir := filepath.Join(common.GetPrivateDirectory(), "extracted")

	if err := os.MkdirAll(saveDir, 0755); err != nil {
		return errutil.Wrap(err, "failed to create binaries directory")
	}

	binaryPath := filepath.Join(saveDir, "ast-analyzer.js")
	if err := os.WriteFile(binaryPath, astAnalyzerBinary, 0755); err != nil {
		return errutil.Wrap(err, "failed to write ast analyzer file")
	}

	parserDarwinArm64Path := filepath.Join(saveDir, "parser.darwin-arm64.node")
	if err := os.WriteFile(parserDarwinArm64Path, parserDarwinArm64, 0755); err != nil {
		return errutil.Wrap(err, "failed to write parser darwin arm64 file")
	}

	parserDarwinX64Path := filepath.Join(saveDir, "parser.darwin-x64.node")
	if err := os.WriteFile(parserDarwinX64Path, parserDarwinX64, 0755); err != nil {
		return errutil.Wrap(err, "failed to write parser darwin x64 file")
	}

	parserLinuxArmGnueabihfPath := filepath.Join(saveDir, "parser.linux-arm-gnueabihf.node")
	if err := os.WriteFile(parserLinuxArmGnueabihfPath, parserLinuxArmGnueabihf, 0755); err != nil {
		return errutil.Wrap(err, "failed to write parser linux arm gnueabihf file")
	}

	parserLinuxArm64GnuPath := filepath.Join(saveDir, "parser.linux-arm64-gnu.node")
	if err := os.WriteFile(parserLinuxArm64GnuPath, parserLinuxArm64Gnu, 0755); err != nil {
		return errutil.Wrap(err, "failed to write parser linux arm64 gnu file")
	}

	parserLinuxArm64MuslPath := filepath.Join(saveDir, "parser.linux-arm64-musl.node")
	if err := os.WriteFile(parserLinuxArm64MuslPath, parserLinuxArm64Musl, 0755); err != nil {
		return errutil.Wrap(err, "failed to write parser linux arm64 musl file")
	}

	parserLinuxX64GnuPath := filepath.Join(saveDir, "parser.linux-x64-gnu.node")
	if err := os.WriteFile(parserLinuxX64GnuPath, parserLinuxX64Gnu, 0755); err != nil {
		return errutil.Wrap(err, "failed to write parser linux x64 gnu file")
	}

	parserLinuxX64MuslPath := filepath.Join(saveDir, "parser.linux-x64-musl.node")
	if err := os.WriteFile(parserLinuxX64MuslPath, parserLinuxX64Musl, 0755); err != nil {
		return errutil.Wrap(err, "failed to write parser linux x64 musl file")
	}

	parserWin32Arm64MsvcPath := filepath.Join(saveDir, "parser.win32-arm64-msvc.node")
	if err := os.WriteFile(parserWin32Arm64MsvcPath, parserWin32Arm64Msvc, 0755); err != nil {
		return errutil.Wrap(err, "failed to write parser win32 arm64 msvc file")
	}

	parserWin32X64MsvcPath := filepath.Join(saveDir, "parser.win32-x64-msvc.node")
	if err := os.WriteFile(parserWin32X64MsvcPath, parserWin32X64Msvc, 0755); err != nil {
		return errutil.Wrap(err, "failed to write parser win32 x64 msvc file")
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

		// Use the local 'asset' type defined in repository.go (it's package-private)
		// The constants AssetTypeOriginalAsset and AssetTypeReversedSourcemap are package-level from this file.
		assetForAnalysis := asset{
			ID:        assetServiceAsset.ID,
			Path:      assetServiceAsset.Path, // Ensure this is the correct, absolute path
			AssetType: AssetTypeOriginalAsset, // This should now correctly reference the package-level const
		}

		_, err = m.analyzeAsset(assetForAnalysis)
		if err != nil {
			return errutil.Wrapf(err, "failed to analyze asset: %s", assetForAnalysis.Path)
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

		assetForAnalysis := asset{
			ID:        reversedSourcemap.ID,
			Path:      reversedSourcemap.Path, // Ensure this is the correct, absolute path
			AssetType: AssetTypeReversedSourcemap, // This should now correctly reference the package-level const
		}

		_, err = m.analyzeAsset(assetForAnalysis)
		if err != nil {
			return errutil.Wrapf(err, "failed to analyze asset: %s", assetForAnalysis.Path)
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

// Position struct is defined in format.go, part of the same package.
// type Position struct {
// 	/** 1-based */
// 	Line int64 `json:"line"`
// 	/** 0-based */
// 	Column int64 `json:"column"`
// }

func (m *astAnalyzerModule) analyzeAsset(assetForAnalysis asset) (astAnalysis, error) { // Renamed param 'asset' to 'assetForAnalysis'
	analysis, found, err := m.repo.getASTAnalysisByAssetID(m.sdk.Ctx, assetForAnalysis.ID, assetForAnalysis.AssetType)
	if err != nil {
		return analysis, dbeventbus.NewRetriableError(errutil.Wrap(err, "failed to get existing analyses"))
	}

	if found && analysis.AnalyzerVersion == analyzerVersion {
		m.sdk.Logger.Debug("analysis is up to date, skipping", "asset_id", assetForAnalysis.ID, "analysis_id", analysis.ID)
		return analysis, nil
	}

	results, err := m.execASTAnalyzer(assetForAnalysis)
	if err != nil {
		return analysis, errutil.Wrap(err, "failed to execute ast analyzer")
	}

	var output []AnalyzerMatch // AnalyzerMatch is defined in format.go
	if err := json.Unmarshal([]byte(results), &output); err != nil {
		return analysis, errutil.Wrapf(err, "failed to parse ast analyzer output: %s", results)
	}

	analysisToCreate := astAnalysis{
		AssetID:         assetForAnalysis.ID,
		AnalyzerVersion: analyzerVersion,
		Results:         results,
		AssetType:       assetForAnalysis.AssetType,
		AssetPath:       assetForAnalysis.Path, // This Path must be the one VSCode uses
	}

	if err := m.repo.createAnalysis(m.sdk.Ctx, analysisToCreate); err != nil {
		return analysisToCreate, dbeventbus.NewRetriableError(errutil.Wrap(err, "failed to store ast analysis results"))
	}

	return analysisToCreate, nil
}

func getLibcVariant() (string, error) {
	if runtime.GOOS != "linux" { // ldd is typically a Linux utility
		return "gnu", nil // Default or indicate not applicable for non-Linux
	}
	cmd := exec.Command("ldd", "--version")
	var out bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &out // Capture stderr as well, as musl might print to stderr

	err := cmd.Run()
	output := out.String() // Read output even if err is not nil

	if err != nil {
		// If ldd command fails (e.g., not found, or exits with error but still prints version)
		// Check output first. Some systems might exit > 0 but still give version.
		if strings.Contains(strings.ToLower(output), "musl") {
			return "musl", nil
		} else if strings.Contains(strings.ToLower(output), "glibc") || strings.Contains(strings.ToLower(output), "gnu") {
			return "gnu", nil
		}
		// If output is not conclusive and error occurred, return default for Linux.
		return "gnu", nil // Fallback to gnu on Linux if ldd fails or output is unclear
		// return "", errutil.Wrap(err, "failed to run ldd or parse its output")
	}

	if strings.Contains(strings.ToLower(output), "musl") {
		return "musl", nil
	} else if strings.Contains(strings.ToLower(output), "glibc") || strings.Contains(strings.ToLower(output), "gnu") {
		return "gnu", nil
	}

	return "gnu", nil // fallback to gnu
}

func (m *astAnalyzerModule) getNativeLibraryPath() (result string, err error) {
	if m.nativeLibraryPath != "" {
		return m.nativeLibraryPath, nil
	}

	basePath := filepath.Join(common.GetPrivateDirectory(), "extracted")

	switch runtime.GOOS {
	case "darwin":
		switch runtime.GOARCH {
		case "arm64":
			result = filepath.Join(basePath, "parser.darwin-arm64.node")
		case "amd64":
			result = filepath.Join(basePath, "parser.darwin-x64.node")
		}

	case "linux":
		libc, errLibc := getLibcVariant()
		if errLibc != nil { // If getLibcVariant itself returned an error we want to propagate
			return "", errutil.Wrap(errLibc, "failed to determine libc variant")
		}

		switch runtime.GOARCH {
		case "arm": // Typically 32-bit ARM
			result = filepath.Join(basePath, "parser.linux-arm-gnueabihf.node")
		case "arm64":
			result = filepath.Join(basePath, fmt.Sprintf("parser.linux-arm64-%s.node", libc))
		case "amd64":
			result = filepath.Join(basePath, fmt.Sprintf("parser.linux-x64-%s.node", libc))
		}

	case "windows":
		switch runtime.GOARCH {
		case "arm64":
			result = filepath.Join(basePath, "parser.win32-arm64-msvc.node")
		case "amd64":
			result = filepath.Join(basePath, "parser.win32-x64-msvc.node")
		}
	}

	if result == "" {
		return "", fmt.Errorf("unsupported platform for NAPI-RS parser: %s-%s", runtime.GOOS, runtime.GOARCH)
	}

	m.nativeLibraryPath = result
	return result, nil
}

func (m *astAnalyzerModule) execASTAnalyzer(assetForAnalysis asset) (string, error) {
	absPath, err := filepath.Abs(assetForAnalysis.Path)
	if err != nil {
		return "", errutil.Wrap(err, "failed to get absolute path of asset")
	}

	cmd := exec.Command("bun", "run", m.astAnalyzerBinaryPath, absPath)

	nativeLibraryPath, err := m.getNativeLibraryPath()
	if err != nil {
		return "", errutil.Wrap(err, "failed to get native library path")
	}

	cmd.Env = append(os.Environ(), "NAPI_RS_NATIVE_LIBRARY_PATH="+nativeLibraryPath)

	m.sdk.Logger.Debug("executing ast analyzer", "asset_id", assetForAnalysis.ID, "path", absPath, "cmd", cmd.String())

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

	outputBytes, err := io.ReadAll(stdout)
	if err != nil {
		return "", errutil.Wrap(err, "failed to read stdout")
	}

	stderrBytes, err := io.ReadAll(stderr)
	if err != nil {
		// This error is about reading stderr pipe, not script error itself
		m.sdk.Logger.Error("Failed to read stderr from ast analyzer script", "asset_path", absPath, "read_error", err)
		// Continue to cmd.Wait() as the script might have finished successfully despite stderr read issue
	}

	if err := cmd.Wait(); err != nil {
		// Script exited with non-zero status
		scriptErrorOutput := strings.TrimSpace(string(stderrBytes))
		m.sdk.Logger.Error("AST analyzer script execution failed (cmd.Wait)", "asset_path", absPath, "wait_error", err, "stderr", scriptErrorOutput)
		if scriptErrorOutput != "" {
			return "", fmt.Errorf("error running ast analyzer script (exit status: %s): %s", err.Error(), scriptErrorOutput)
		}
		return "", errutil.Wrap(err, "error running ast analyzer script (cmd.Wait)")
	}
	
	// Check stderr even if cmd.Wait() is nil, as some scripts might print warnings/errors to stderr and still exit 0
	if len(stderrBytes) > 0 {
		// Log it as a warning or debug if it's not considered a fatal error for an exit 0
		m.sdk.Logger.Warn("AST analyzer script produced stderr output with exit 0", "asset_path", absPath, "stderr", strings.TrimSpace(string(stderrBytes)))
		// Depending on policy, you might choose to return an error here or just the stdout
		// For now, let's assume stdout is primary if exit code was 0.
	}


	return string(outputBytes), nil
}