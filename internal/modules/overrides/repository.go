package overrides

import (
	"context"
	"database/sql"
	"time"

	"github.com/francisconeves97/jxscout/internal/core/errutil"
	"github.com/jmoiron/sqlx"
)

type override struct {
	ID                int64      `db:"id"`
	AssetID           int64      `db:"asset_id"`
	CaidoCollectionID string     `db:"caido_collection_id"`
	CaidoTamperRuleID string     `db:"caido_tamper_rule_id"`
	ContentHash       string     `db:"content_hash"`
	CreatedAt         time.Time  `db:"created_at"`
	DeletedAt         *time.Time `db:"deleted_at"`
}

type overridesRepository struct {
	db *sqlx.DB
}

func newOverridesRepository(db *sqlx.DB) (*overridesRepository, error) {
	repo := &overridesRepository{
		db: db,
	}

	if err := repo.initializeTable(); err != nil {
		return nil, err
	}

	return repo, nil
}

func (r *overridesRepository) initializeTable() error {
	_, err := r.db.Exec(
		`
		CREATE TABLE IF NOT EXISTS overrides (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			asset_id INTEGER REFERENCES assets(id),
			caido_collection_id TEXT,
			caido_tamper_rule_id TEXT,
			content_hash TEXT,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			deleted_at TIMESTAMP
		)
		`,
	)
	if err != nil {
		return errutil.Wrap(err, "failed to create overrides table schema")
	}

	return nil
}

func (r *overridesRepository) getOverrideByAssetID(ctx context.Context, assetID int64) (*override, error) {
	query := `
		SELECT id, asset_id, caido_collection_id, caido_tamper_rule_id, content_hash, created_at, deleted_at
		FROM overrides
		WHERE asset_id = ? AND deleted_at IS NULL
	`

	var o override
	var deletedAt sql.NullTime

	err := r.db.QueryRowContext(ctx, query, assetID).Scan(
		&o.ID,
		&o.AssetID,
		&o.CaidoCollectionID,
		&o.CaidoTamperRuleID,
		&o.ContentHash,
		&o.CreatedAt,
		&deletedAt,
	)

	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, errutil.Wrap(err, "failed to get override by asset ID")
	}

	if deletedAt.Valid {
		o.DeletedAt = &deletedAt.Time
	}

	return &o, nil
}

func (r *overridesRepository) createOverride(ctx context.Context, o *override) error {
	query := `
		INSERT INTO overrides (asset_id, caido_collection_id, caido_tamper_rule_id, content_hash)
		VALUES (?, ?, ?, ?)
	`

	_, err := r.db.ExecContext(ctx, query,
		o.AssetID,
		o.CaidoCollectionID,
		o.CaidoTamperRuleID,
		o.ContentHash,
	)
	if err != nil {
		return errutil.Wrap(err, "failed to create override")
	}

	return nil
}

func (r *overridesRepository) deleteOverride(ctx context.Context, assetID int64) error {
	query := `
		UPDATE overrides
		SET deleted_at = CURRENT_TIMESTAMP
		WHERE asset_id = ? AND deleted_at IS NULL
	`

	_, err := r.db.ExecContext(ctx, query, assetID)
	if err != nil {
		return errutil.Wrap(err, "failed to delete override")
	}

	return nil
}
