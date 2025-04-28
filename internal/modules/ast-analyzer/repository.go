package astanalyzer

import (
	"context"
	"database/sql"
	"errors"
	"time"

	"github.com/francisconeves97/jxscout/internal/core/errutil"
	"github.com/jmoiron/sqlx"
)

type astAnalysis struct {
	ID              int64      `db:"id"`
	AssetID         int64      `db:"asset_id"`
	AnalyzerVersion int64      `db:"analyzer_version"`
	Results         string     `db:"results"` // stores raw array of matches
	CreatedAt       time.Time  `db:"created_at"`
	UpdatedAt       time.Time  `db:"updated_at"`
	DeletedAt       *time.Time `db:"deleted_at"`
}

type asset struct {
	ID   int64  `db:"id"`
	Path string `db:"fs_path"`
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
			asset_id INTEGER REFERENCES assets(id),
			analyzer_version INTEGER NOT NULL,
			results TEXT NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			deleted_at TIMESTAMP,
			UNIQUE(asset_id)
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
		INSERT INTO ast_analysis_results (asset_id, analyzer_version, results)
		VALUES (?, ?, ?)
		ON CONFLICT(asset_id) DO UPDATE SET
			analyzer_version = excluded.analyzer_version,
			results = excluded.results,
			updated_at = CURRENT_TIMESTAMP
	`
	_, err := r.db.ExecContext(ctx, query, analysis.AssetID, analysis.AnalyzerVersion, analysis.Results)
	if err != nil {
		return errutil.Wrap(err, "failed to create ast analysis")
	}
	return nil
}

func (r *astAnalyzerRepository) getAssetByPath(ctx context.Context, filePath string) (*asset, error) {
	query := `
		SELECT id, fs_path
		FROM assets
		WHERE fs_path = ? AND content_type = 'JS'
		LIMIT 1
	`

	var a asset
	err := r.db.GetContext(ctx, &a, query, filePath)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, errutil.Wrap(err, "failed to get asset by path")
	}

	return &a, nil
}

func (r *astAnalyzerRepository) getASTAnalysisByAssetID(ctx context.Context, assetID int64) (astAnalysis, bool, error) {
	query := `
		SELECT *
		FROM ast_analysis_results
		WHERE asset_id = ? AND deleted_at IS NULL
	`

	var analysis astAnalysis
	if err := r.db.GetContext(ctx, &analysis, query, assetID); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return astAnalysis{}, false, nil
		}
		return astAnalysis{}, false, errutil.Wrap(err, "failed to get ast analysis by asset ID")
	}

	return analysis, true, nil
}
