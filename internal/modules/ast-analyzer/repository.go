package astanalyzer

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"runtime"
	"strings"
	"time"

	"github.com/francisconeves97/jxscout/internal/core/errutil"
	"github.com/jmoiron/sqlx"
)

const (
	AssetTypeOriginalAsset     = "asset"
	AssetTypeReversedSourcemap = "reversed_sourcemap"
)

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

func (a *astAnalysis) GetMatches() ([]AnalyzerMatch, error) {
	var matches []AnalyzerMatch
	if err := json.Unmarshal([]byte(a.Results), &matches); err != nil {
		return nil, errutil.Wrap(err, "failed to unmarshal analysis result")
	}

	return matches, nil
}

type asset struct {
	ID           int64  `db:"id"`
	Path         string `db:"fs_path"`
	AssetType    string `db:"asset_type"`
	IsBeautified bool   `db:"is_beautified"`
}

type astAnalyzerRepository struct {
	db *sqlx.DB
}

func newAstAnalyzerRepository(db *sqlx.DB) (*astAnalyzerRepository, error) {
	repo := &astAnalyzerRepository{
		db: db,
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
	query := `
		INSERT INTO ast_analysis_results (asset_id, asset_type, asset_path, analyzer_version, results)
		VALUES (?, ?, ?, ?, ?)
		ON CONFLICT(asset_id, asset_type) DO UPDATE SET
			analyzer_version = excluded.analyzer_version,
			results = excluded.results,
			updated_at = CURRENT_TIMESTAMP	
	`
	_, err := r.db.ExecContext(ctx, query, analysis.AssetID, analysis.AssetType, analysis.AssetPath, analysis.AnalyzerVersion, analysis.Results)
	if err != nil {
		return errutil.Wrap(err, "failed to create ast analysis")
	}
	return nil
}

func (r *astAnalyzerRepository) getAssetByPath(ctx context.Context, filePath string) (*asset, error) {
	if runtime.GOOS == "windows" && len(filePath) >= 2 && filePath[1] == ':' {
		// Normalize drive letter to uppercase for comparison, assuming DB stores uppercase
		driveLetter := strings.ToUpper(string(filePath[0]))
		filePath = driveLetter + filePath[1:]
	}

	query := `
		SELECT id, fs_path, asset_type, is_beautified
		FROM (
			SELECT id, fs_path, 'asset' as asset_type, is_beautified
			FROM assets
			WHERE fs_path = ? AND content_type = 'JS'
			UNION
			SELECT id, path as fs_path, 'reversed_sourcemap' as asset_type, true as is_beautified
			FROM reversed_sourcemaps
			WHERE path = ?
		)
		LIMIT 1
	`

	var a asset
	err := r.db.GetContext(ctx, &a, query, filePath, filePath)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, errutil.Wrap(err, "failed to get asset by path")
	}

	return &a, nil
}

func (r *astAnalyzerRepository) getASTAnalysisByAssetID(ctx context.Context, assetID int64, assetType string) (astAnalysis, bool, error) {
	query := `
		SELECT *
		FROM ast_analysis_results
		WHERE asset_id = ? AND asset_type = ? AND deleted_at IS NULL
	`

	var analysis astAnalysis
	if err := r.db.GetContext(ctx, &analysis, query, assetID, assetType); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return astAnalysis{}, false, nil
		}
		return astAnalysis{}, false, errutil.Wrap(err, "failed to get ast analysis by asset ID")
	}

	return analysis, true, nil
}
