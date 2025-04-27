package sourcemaps

import (
	"context"
	"time"

	"github.com/francisconeves97/jxscout/internal/core/errutil"
	"github.com/jmoiron/sqlx"
)

type Sourcemap struct {
	ID        int64     `db:"id"`
	AssetID   int64     `db:"asset_id"`
	URL       string    `db:"url"`
	Path      string    `db:"path"`
	Hash      string    `db:"hash"`
	Getter    string    `db:"getter"`
	CreatedAt time.Time `db:"created_at"`
	UpdatedAt time.Time `db:"updated_at"`
}

type ReversedSourcemap struct {
	ID          int64     `db:"id"`
	SourcemapID int64     `db:"sourcemap_id"`
	Path        string    `db:"path"`
	CreatedAt   time.Time `db:"created_at"`
	UpdatedAt   time.Time `db:"updated_at"`
}

func initializeDatabase(db sqlx.Execer) error {
	_, err := db.Exec(
		`
		CREATE TABLE IF NOT EXISTS sourcemaps (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			asset_id INTEGER NOT NULL,
			url TEXT NOT NULL UNIQUE,
			path TEXT NOT NULL UNIQUE,
			hash TEXT NOT NULL,
			getter TEXT NOT NULL,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (asset_id) REFERENCES assets(id)
		);

		CREATE TABLE IF NOT EXISTS reversed_sourcemaps (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			sourcemap_id INTEGER NOT NULL,
			path TEXT NOT NULL UNIQUE,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (sourcemap_id) REFERENCES sourcemaps(id)
		);
		`,
	)
	if err != nil {
		return errutil.Wrap(err, "failed to create sourcemaps tables schema")
	}

	return nil
}

func SaveSourcemap(ctx context.Context, db sqlx.QueryerContext, sourcemap *Sourcemap) (int64, error) {
	var id int64
	err := sqlx.GetContext(ctx, db, &id,
		`
		INSERT INTO sourcemaps (asset_id, url, path, hash, getter) 
		VALUES (?, ?, ?, ?, ?)
		ON CONFLICT(url) DO UPDATE SET
			path = excluded.path,
			hash = excluded.hash,
			getter = excluded.getter,
			updated_at = CURRENT_TIMESTAMP
		ON CONFLICT(path) DO UPDATE SET
			url = excluded.url,
			hash = excluded.hash,
			getter = excluded.getter,
			updated_at = CURRENT_TIMESTAMP
		RETURNING id
		`,
		sourcemap.AssetID,
		sourcemap.URL,
		sourcemap.Path,
		sourcemap.Hash,
		sourcemap.Getter,
	)
	if err != nil {
		return 0, errutil.Wrap(err, "failed to save sourcemap")
	}

	return id, nil
}

func SaveReversedSourcemap(ctx context.Context, db sqlx.QueryerContext, reversedSourcemap *ReversedSourcemap) (int64, error) {
	var id int64
	err := sqlx.GetContext(ctx, db, &id,
		`
		INSERT INTO reversed_sourcemaps (sourcemap_id, path) 
		VALUES (?, ?)
		ON CONFLICT(path) DO UPDATE SET
			sourcemap_id = excluded.sourcemap_id,
			updated_at = CURRENT_TIMESTAMP
		RETURNING id
		`,
		reversedSourcemap.SourcemapID,
		reversedSourcemap.Path,
	)
	if err != nil {
		return 0, errutil.Wrap(err, "failed to save reversed sourcemap")
	}
	return id, nil
}
