package astanalyzer

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"time"
	"runtime" // For runtime.GOOS
	"strings" // For strings.ToUpper
	"github.com/francisconeves97/jxscout/internal/core/errutil"
	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types" // For ModuleSDK
	"github.com/jmoiron/sqlx"
)

// Note: AssetTypeOriginalAsset and AssetTypeReversedSourcemap are defined
// at the package level in module.go and are accessible here.

// Note: AnalyzerMatch and Position structs are defined in format.go (or another shared place in this package)
// and are accessible here for methods like astAnalysis.GetMatches() if it were to use them directly.

type astAnalysis struct {
	ID              int64      `db:"id"`
	AssetType       string     `db:"asset_type"`
	AssetID         int64      `db:"asset_id"`
	AssetPath       string     `db:"asset_path"`
	AnalyzerVersion int64      `db:"analyzer_version"`
	Results         string     `db:"results"` // stores raw array of matches
	CreatedAt       time.Time  `db:"created_at"`
	UpdatedAt       time.Time  `db:"updated_at"`
	DeletedAt       *time.Time `db:"deleted_at"`
}

// GetMatches unmarshals the Results string into a slice of AnalyzerMatch.
// AnalyzerMatch struct is assumed to be defined elsewhere in the package (e.g., format.go or module.go)
func (a *astAnalysis) GetMatches() ([]AnalyzerMatch, error) {
	var matches []AnalyzerMatch // This will use the AnalyzerMatch from format.go or module.go
	if err := json.Unmarshal([]byte(a.Results), &matches); err != nil {
		return nil, errutil.Wrap(err, "failed to unmarshal analysis result")
	}
	return matches, nil
}

// asset struct is local to this repository for interacting with its queries
type asset struct {
	ID           int64  `db:"id"`
	Path         string `db:"fs_path"`    // This is the crucial path
	AssetType    string `db:"asset_type"` // 'asset' or 'reversed_sourcemap'
	IsBeautified bool   `db:"is_beautified"`
}

type astAnalyzerRepository struct {
	db  *sqlx.DB
	sdk *jxscouttypes.ModuleSDK // Use the ModuleSDK from pkg/types
}

func newAstAnalyzerRepository(sdk *jxscouttypes.ModuleSDK, db *sqlx.DB) (*astAnalyzerRepository, error) {
	if sdk == nil {
		return nil, errors.New("sdk cannot be nil for astAnalyzerRepository")
	}
	if sdk.Logger == nil { // Explicitly check for logger
		return nil, errors.New("sdk.Logger cannot be nil for astAnalyzerRepository")
	}
	if db == nil {
		return nil, errors.New("db cannot be nil for astAnalyzerRepository")
	}
	repo := &astAnalyzerRepository{
		db:  db,
		sdk: sdk,
	}

	if err := repo.initializeTable(); err != nil {
		return nil, err
	}

	return repo, nil
}

func (r *astAnalyzerRepository) initializeTable() error {
	_, err := r.db.Exec(
		`
		CREATE TABLE IF NOT EXISTS ast_analysis_results (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			asset_id INTEGER NOT NULL,
			asset_type TEXT NOT NULL,
			asset_path TEXT NOT NULL,
			analyzer_version INTEGER NOT NULL,
			results TEXT NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			deleted_at TIMESTAMP,
			UNIQUE(asset_id, asset_type)
		)
		`,
	)
	if err != nil {
		return errutil.Wrap(err, "failed to create ast_analysis_results table schema")
	}
	return nil
}

func (r *astAnalyzerRepository) createAnalysis(ctx context.Context, analysis astAnalysis) error {
	logger := r.sdk.Logger

	query := `
		INSERT INTO ast_analysis_results (asset_id, asset_type, asset_path, analyzer_version, results)
		VALUES (?, ?, ?, ?, ?)
		ON CONFLICT(asset_id, asset_type) DO UPDATE SET
			analyzer_version = excluded.analyzer_version,
			results = excluded.results,
			asset_path = excluded.asset_path, 
			updated_at = CURRENT_TIMESTAMP	
	`
	logger.Debug("Creating/Updating AST analysis in DB", "asset_id", analysis.AssetID, "asset_type", analysis.AssetType, "asset_path", analysis.AssetPath)
	_, err := r.db.ExecContext(ctx, query, analysis.AssetID, analysis.AssetType, analysis.AssetPath, analysis.AnalyzerVersion, analysis.Results)
	if err != nil {
		logger.Error("Failed to create/update ast analysis in DB", "asset_id", analysis.AssetID, "asset_type", analysis.AssetType, "asset_path", analysis.AssetPath, "error", err)
		return errutil.Wrap(err, "failed to create ast analysis")
	}
	logger.Info("Successfully created/updated AST analysis in DB", "asset_id", analysis.AssetID, "asset_type", analysis.AssetType, "asset_path", analysis.AssetPath)
	return nil
}

func (r *astAnalyzerRepository) getAssetByPath(ctx context.Context, filePath string) (*asset, error) {
	logger := r.sdk.Logger
	normalizedFilePathForQuery := filePath
	if runtime.GOOS == "windows" && len(filePath) >= 2 && filePath[1] == ':' {
		// Normalize drive letter to uppercase for comparison, assuming DB stores uppercase
		driveLetter := strings.ToUpper(string(filePath[0]))
		normalizedFilePathForQuery = driveLetter + filePath[1:]
		if filePath != normalizedFilePathForQuery { // Log only if a change was made
			logger.Debug("Normalized Windows drive letter for query", "original_path_from_vscode", filePath, "normalized_path_for_query", normalizedFilePathForQuery)
		}
	}
	logger.Debug("ast-analyzer.Repository.getAssetByPath: Attempting to find asset", "filePath_query", normalizedFilePathForQuery)

	// Using package-level constants AssetTypeOriginalAsset and AssetTypeReversedSourcemap defined in module.go
	query := `
		SELECT id, fs_path, asset_type, is_beautified
		FROM (
			SELECT id, fs_path, '` + AssetTypeOriginalAsset + `' as asset_type, is_beautified
			FROM assets
			WHERE fs_path = ? AND content_type = 'JS' 
			UNION ALL
			SELECT id, path as fs_path, '` + AssetTypeReversedSourcemap + `' as asset_type, true as is_beautified
			FROM reversed_sourcemaps
			WHERE path = ?
		)
		LIMIT 1
	`

	var a asset
	err := r.db.GetContext(ctx, &a, query, normalizedFilePathForQuery, normalizedFilePathForQuery)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			logger.Warn("ast-analyzer.Repository.getAssetByPath: Asset not found by path", "filePath_query", normalizedFilePathForQuery)
			return nil, nil
		}
		logger.Error("ast-analyzer.Repository.getAssetByPath: Error querying asset by path", "filePath_query", normalizedFilePathForQuery, "error", err)
		return nil, errutil.Wrap(err, "failed to get asset by path")
	}

	logger.Debug("ast-analyzer.Repository.getAssetByPath: Asset found", "asset_id", a.ID, "found_path", a.Path, "asset_type", a.AssetType)
	return &a, nil
}

func (r *astAnalyzerRepository) getASTAnalysisByAssetID(ctx context.Context, assetID int64, assetType string) (astAnalysis, bool, error) {
	logger := r.sdk.Logger
	logger.Debug("Getting AST analysis by asset ID and type", "asset_id", assetID, "asset_type", assetType)
	query := `
		SELECT *
		FROM ast_analysis_results
		WHERE asset_id = ? AND asset_type = ? AND deleted_at IS NULL
	`

	var analysis astAnalysis
	if err := r.db.GetContext(ctx, &analysis, query, assetID, assetType); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			logger.Warn("AST analysis not found for asset", "asset_id", assetID, "asset_type", assetType)
			return astAnalysis{}, false, nil
		}
		logger.Error("Failed to get AST analysis by asset ID", "asset_id", assetID, "asset_type", assetType, "error", err)
		return astAnalysis{}, false, errutil.Wrap(err, "failed to get ast analysis by asset ID")
	}

	logger.Debug("AST analysis retrieved for asset", "analysis_id", analysis.ID, "asset_id", assetID)
	return analysis, true, nil
}