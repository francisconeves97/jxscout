package astanalyzer

import (
	"context"
	"database/sql"
	"time"

	"github.com/francisconeves97/jxscout/internal/core/errutil"
	"github.com/jmoiron/sqlx"
)

type astAnalysis struct {
	ID        int64      `db:"id"`
	AssetID   int64      `db:"asset_id"`
	Analyzer  string     `db:"analyzer"`
	Results   string     `db:"results"`
	CreatedAt time.Time  `db:"created_at"`
	DeletedAt *time.Time `db:"deleted_at"`
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
			results TEXT NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			deleted_at TIMESTAMP
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
		INSERT INTO ast_analysis (asset_id, analyzer, results)
		VALUES (?, ?, ?)
	`
	_, err := r.db.ExecContext(ctx, query, analysis.AssetID, analysis.Analyzer, analysis.Results)
	if err != nil {
		return errutil.Wrap(err, "failed to create ast analysis")
	}
	return nil
}

func (r *astAnalyzerRepository) getAnalysisByAssetID(ctx context.Context, assetID int64) (*astAnalysis, error) {
	query := `
		SELECT id, asset_id, analyzer, results, created_at, deleted_at
		FROM ast_analysis
		WHERE asset_id = ? AND deleted_at IS NULL
	`

	var a astAnalysis
	var deletedAt sql.NullTime

	err := r.db.QueryRowContext(ctx, query, assetID).Scan(
		&a.ID,
		&a.AssetID,
		&a.Analyzer,
		&a.Results,
		&a.CreatedAt,
		&deletedAt,
	)

	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, errutil.Wrap(err, "failed to get ast analysis by asset ID")
	}

	if deletedAt.Valid {
		a.DeletedAt = &deletedAt.Time
	}

	return &a, nil
}

func (r *astAnalyzerRepository) deleteAnalysis(ctx context.Context, assetID int64) error {
	query := `
		UPDATE ast_analysis
		SET deleted_at = CURRENT_TIMESTAMP
		WHERE asset_id = ? AND deleted_at IS NULL
	`
	_, err := r.db.ExecContext(ctx, query, assetID)
	if err != nil {
		return errutil.Wrap(err, "failed to delete ast analysis")
	}
	return nil
}
