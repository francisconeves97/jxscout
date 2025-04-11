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
	AssetURL          *string    `db:"asset_url"`
	AssetPath         *string    `db:"fs_path"`
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

func (r *overridesRepository) getAllOverrides(ctx context.Context) ([]*override, error) {
	query := `
		SELECT 
			overrides.id, 
			overrides.asset_id, 
			overrides.caido_collection_id, 
			overrides.caido_tamper_rule_id, 
			overrides.content_hash, 
			overrides.created_at, 
			overrides.deleted_at, 
			assets.url, 
			assets.fs_path
		FROM overrides JOIN assets ON overrides.asset_id = assets.id
		WHERE overrides.deleted_at IS NULL
	`

	rows, err := r.db.QueryContext(ctx, query)
	if err != nil {
		return nil, errutil.Wrap(err, "failed to get all overrides")
	}
	defer rows.Close()

	var overrides []*override
	for rows.Next() {
		var o override
		var deletedAt sql.NullTime

		err := rows.Scan(
			&o.ID,
			&o.AssetID,
			&o.CaidoCollectionID,
			&o.CaidoTamperRuleID,
			&o.ContentHash,
			&o.CreatedAt,
			&deletedAt,
			&o.AssetURL,
			&o.AssetPath,
		)
		if err != nil {
			return nil, errutil.Wrap(err, "failed to scan override")
		}

		if deletedAt.Valid {
			o.DeletedAt = &deletedAt.Time
		}

		overrides = append(overrides, &o)
	}

	if err := rows.Err(); err != nil {
		return nil, errutil.Wrap(err, "error iterating overrides")
	}

	return overrides, nil
}

func (r *overridesRepository) updateOverride(ctx context.Context, o *override) error {
	query := `
		UPDATE overrides
		SET content_hash = ?
		WHERE id = ? AND deleted_at IS NULL
	`

	_, err := r.db.ExecContext(ctx, query, o.ContentHash, o.ID)
	if err != nil {
		return errutil.Wrap(err, "failed to update override")
	}

	return nil
}

func (r *overridesRepository) getOverrides(ctx context.Context, page, pageSize int) ([]*override, int, error) {
	var total int
	err := r.db.GetContext(ctx, &total, `
		SELECT COUNT(*) FROM overrides WHERE deleted_at IS NULL
	`)
	if err != nil {
		return nil, 0, err
	}

	overrides := []*override{}
	err = r.db.SelectContext(ctx, &overrides, `
		SELECT o.*, a.url as asset_url, a.fs_path as fs_path
		FROM overrides o
		LEFT JOIN assets a ON o.asset_id = a.id
		WHERE o.deleted_at IS NULL
		ORDER BY o.created_at DESC
		LIMIT ? OFFSET ?
	`, pageSize, (page-1)*pageSize)
	if err != nil {
		return nil, 0, err
	}

	return overrides, total, nil
}
