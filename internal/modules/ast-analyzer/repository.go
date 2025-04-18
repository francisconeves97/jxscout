package astanalyzer

import (
	"context"
	"database/sql"
	"time"

	"github.com/francisconeves97/jxscout/internal/core/errutil"
	"github.com/jmoiron/sqlx"
)

type astAnalysis struct {
	ID              int64      `db:"id"`
	AssetID         int64      `db:"asset_id"`
	Analyzer        string     `db:"analyzer"`
	AnalyzerVersion string     `db:"analyzer_version"`
	Results         string     `db:"results"`
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
		CREATE TABLE IF NOT EXISTS ast_analysis (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			asset_id INTEGER REFERENCES assets(id),
			analyzer TEXT NOT NULL,
			analyzer_version TEXT NOT NULL,
			results TEXT NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			deleted_at TIMESTAMP,
			UNIQUE(asset_id, analyzer)
		)
		`,
	)
	if err != nil {
		return errutil.Wrap(err, "failed to create ast_analysis table schema")
	}

	return nil
}

func (r *astAnalyzerRepository) createAnalysis(ctx context.Context, analysis *astAnalysis) error {
	query := `
		INSERT INTO ast_analysis (asset_id, analyzer, analyzer_version, results)
		VALUES (?, ?, ?, ?)
		ON CONFLICT(asset_id, analyzer) DO UPDATE SET
			analyzer_version = excluded.analyzer_version,
			results = excluded.results,
			updated_at = CURRENT_TIMESTAMP
	`
	_, err := r.db.ExecContext(ctx, query, analysis.AssetID, analysis.Analyzer, analysis.AnalyzerVersion, analysis.Results)
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

func (r *astAnalyzerRepository) getAnalysesByAssetID(ctx context.Context, assetID int64) (map[string]*astAnalysis, error) {
	query := `
		SELECT id, asset_id, analyzer, analyzer_version, results, created_at, updated_at, deleted_at
		FROM ast_analysis
		WHERE asset_id = ? AND deleted_at IS NULL
	`

	var analyses []*astAnalysis
	if err := r.db.SelectContext(ctx, &analyses, query, assetID); err != nil {
		return nil, errutil.Wrap(err, "failed to get ast analyses by asset ID")
	}

	// Convert to map for easier lookup
	analysisMap := make(map[string]*astAnalysis)
	for _, analysis := range analyses {
		analysisMap[analysis.Analyzer] = analysis
	}

	return analysisMap, nil
}
