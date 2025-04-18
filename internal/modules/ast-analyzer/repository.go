package astanalyzer

import (
	"context"
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
	UpdatedAt time.Time  `db:"updated_at"`
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
		INSERT INTO ast_analysis (asset_id, analyzer, results)
		VALUES (?, ?, ?)
		ON CONFLICT(asset_id, analyzer) DO UPDATE SET
			results = excluded.results,
			updated_at = CURRENT_TIMESTAMP
	`
	_, err := r.db.ExecContext(ctx, query, analysis.AssetID, analysis.Analyzer, analysis.Results)
	if err != nil {
		return errutil.Wrap(err, "failed to create ast analysis")
	}
	return nil
}

// func (r *astAnalyzerRepository) getAnalysisByAssetID(ctx context.Context, assetID int64) (*astAnalysis, error) {
// 	query := `
// 		SELECT id, asset_id, analyzer, results, created_at, updated_at, deleted_at
// 		FROM ast_analysis
// 		WHERE asset_id = ? AND deleted_at IS NULL
// 	`

// 	var a astAnalysis
// 	var deletedAt sql.NullTime

// 	err := r.db.QueryRowContext(ctx, query, assetID).Scan(
// 		&a.ID,
// 		&a.AssetID,
// 		&a.Analyzer,
// 		&a.Results,
// 		&a.CreatedAt,
// 		&a.UpdatedAt,
// 		&deletedAt,
// 	)

// 	if err == sql.ErrNoRows {
// 		return nil, nil
// 	}
// 	if err != nil {
// 		return nil, errutil.Wrap(err, "failed to get ast analysis by asset ID")
// 	}

// 	if deletedAt.Valid {
// 		a.DeletedAt = &deletedAt.Time
// 	}

// 	return &a, nil
// }
