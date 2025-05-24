package assetservice

import (
	"context"
	"database/sql"
	"errors"
	"strings"
	"time"

	"github.com/francisconeves97/jxscout/internal/core/errutil"
	"github.com/francisconeves97/jxscout/pkg/constants"

	"github.com/jmoiron/sqlx"
	_ "github.com/mattn/go-sqlite3"
)

type queryer interface {
	sqlx.PreparerContext
	sqlx.ExecerContext
	sqlx.QueryerContext
}

type GetAssetsParams struct {
	ProjectName string
	SearchTerm  string
	Page        int
	PageSize    int
}

type DBAsset struct {
	ID                int64     `db:"id"`
	URL               string    `db:"url"`
	ContentHash       string    `db:"content_hash"`
	ContentType       string    `db:"content_type"`
	FileSystemPath    string    `db:"fs_path"`
	Project           string    `db:"project"`
	RequestHeaders    string    `db:"request_headers"`
	CreatedAt         time.Time `db:"created_at"`
	UpdatedAt         time.Time `db:"updated_at"`
	IsInlineJS        bool      `db:"is_inline_js"`
	IsChunkDiscovered *bool     `db:"is_chunk_discovered"`
	ChunkFromAssetID  *int64    `db:"chunk_from_asset_id"`
	IsBeautified      bool      `db:"is_beautified"`
	Parent            *DBAsset

	Children []DBAsset
}

type AssetRelationship struct {
	ID       int64 `db:"id"`
	ParentID int64 `db:"parent_id"`
	ChildID  int64 `db:"child_id"`
}

func initializeRepo(db *sqlx.DB) error {
	_, err := db.Exec(
		`
		CREATE TABLE IF NOT EXISTS assets (
			id INTEGER PRIMARY KEY AUTOINCREMENT, 
			url TEXT NOT NULL UNIQUE,
			content_hash TEXT NOT NULL,
			content_type TEXT NOT NULL,
			fs_path TEXT NOT NULL,
			project TEXT NOT NULL,
			request_headers TEXT,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
		);

		CREATE INDEX IF NOT EXISTS idx_assets_project ON assets(project);

		CREATE TABLE IF NOT EXISTS asset_relationships (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			parent_id INTEGER NOT NULL,
			child_id INTEGER NOT NULL,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			UNIQUE (parent_id, child_id),
			FOREIGN KEY (parent_id) REFERENCES assets (id) ON DELETE CASCADE ON UPDATE CASCADE,
			FOREIGN KEY (child_id) REFERENCES assets (id) ON DELETE CASCADE ON UPDATE CASCADE
		)
		`,
	)
	if err != nil {
		return errutil.Wrap(err, "failed to create schema")
	}

	// Run migrations
	if err := migrateAddIsInlineJS(db); err != nil {
		return errutil.Wrap(err, "failed to run migrations")
	}

	if err := migrateAddIsChunkDiscovered(db); err != nil {
		return errutil.Wrap(err, "failed to run migrations")
	}

	if err := migrateIsBeautified(db); err != nil {
		return errutil.Wrap(err, "failed to run migrations")
	}

	if err := migrateAddChunkFromAssetID(db); err != nil {
		return errutil.Wrap(err, "failed to run migrations")
	}

	return nil
}

// migrateAddIsInlineJS safely adds the is_inline_js column if it doesn't exist
func migrateAddIsInlineJS(db *sqlx.DB) error {
	// Check if column exists
	var count int
	err := db.Get(&count, `
		SELECT COUNT(*) FROM pragma_table_info('assets') 
		WHERE name = 'is_inline_js'
	`)
	if err != nil {
		return errutil.Wrap(err, "failed to check if column exists")
	}

	// If column doesn't exist, add it
	if count == 0 {
		_, err := db.Exec(`
			ALTER TABLE assets 
			ADD COLUMN is_inline_js BOOLEAN DEFAULT FALSE
		`)
		if err != nil {
			return errutil.Wrap(err, "failed to add is_inline_js column")
		}
	}

	return nil
}

// migrateAddIsChunkDiscovered safely adds the is_chunk_discovered column if it doesn't exist
func migrateAddIsChunkDiscovered(db *sqlx.DB) error {
	// Check if column exists
	var count int
	err := db.Get(&count, `
		SELECT COUNT(*) FROM pragma_table_info('assets') 
		WHERE name = 'is_chunk_discovered'
	`)
	if err != nil {
		return errutil.Wrap(err, "failed to check if column exists")
	}

	// If column doesn't exist, add it
	if count == 0 {
		_, err := db.Exec(`
			ALTER TABLE assets 
			ADD COLUMN is_chunk_discovered BOOLEAN DEFAULT FALSE
		`)
		if err != nil {
			return errutil.Wrap(err, "failed to add is_chunk_discovered column")
		}
	}

	return nil
}

// migrateIsBeautified safely adds the is_beautified column if it doesn't exist
func migrateIsBeautified(db *sqlx.DB) error {
	// Check if column exists
	var count int
	err := db.Get(&count, `
		SELECT COUNT(*) FROM pragma_table_info('assets') 
		WHERE name = 'is_beautified'
	`)
	if err != nil {
		return errutil.Wrap(err, "failed to check if column exists")
	}

	// If column doesn't exist, add it
	if count == 0 {
		_, err := db.Exec(`
			ALTER TABLE assets 
			ADD COLUMN is_beautified BOOLEAN DEFAULT FALSE
		`)
		if err != nil {
			return errutil.Wrap(err, "failed to add is_beautified column")
		}
	}

	return nil
}

func migrateAddChunkFromAssetID(db *sqlx.DB) error {
	// Check if column exists
	var count int
	err := db.Get(&count, `
		SELECT COUNT(*) FROM pragma_table_info('assets') 
		WHERE name = 'chunk_from_asset_id'
	`)
	if err != nil {
		return errutil.Wrap(err, "failed to check if column exists")
	}

	// If column doesn't exist, add it
	if count == 0 {
		_, err := db.Exec(`
			ALTER TABLE assets 
			ADD COLUMN chunk_from_asset_id INTEGER
		`)
		if err != nil {
			return errutil.Wrap(err, "failed to add chunk_from_asset_id column")
		}
	}

	return nil
}

func SaveAsset(ctx context.Context, db queryer, asset DBAsset) (int64, error) {
	var assetID int64
	err := sqlx.GetContext(ctx, db, &assetID, `
	INSERT INTO assets (url, content_hash, content_type, fs_path, project, request_headers, is_inline_js, is_chunk_discovered, chunk_from_asset_id, created_at, updated_at)
	VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
	ON CONFLICT(url) DO UPDATE SET content_hash = ?, content_type = ?, fs_path = ?, project = ?, request_headers = ?, is_inline_js = ?, is_chunk_discovered = ?, chunk_from_asset_id = ?, updated_at = CURRENT_TIMESTAMP
	RETURNING id
	`, asset.URL, asset.ContentHash, asset.ContentType, asset.FileSystemPath, asset.Project, asset.RequestHeaders, asset.IsInlineJS, asset.IsChunkDiscovered,
		asset.ChunkFromAssetID, asset.ContentHash, asset.ContentType, asset.FileSystemPath, asset.Project, asset.RequestHeaders, asset.IsInlineJS, asset.IsChunkDiscovered, asset.ChunkFromAssetID)
	if err != nil {
		return 0, errutil.Wrap(err, "failed to insert the asset")
	}

	// Check if we got a valid ID
	if assetID == 0 {
		// Try to get the ID directly to see if the row exists
		var existingID int64
		err = sqlx.GetContext(ctx, db, &existingID, `SELECT id FROM assets WHERE url = ?`, asset.URL)
		if err != nil {
			return 0, errutil.Wrapf(err, "failed to get asset ID after insert (url: %s)", asset.URL)
		}

		if existingID == 0 {
			return 0, errutil.Wrapf(errors.New("no ID returned from INSERT and no row found for URL"), "url: %s", asset.URL)
		}

		// If we found an ID, use it
		assetID = existingID
	}

	if assetID == 0 {
		return 0, errutil.Wrapf(errors.New("asset id is 0 for asset url even after trying to get it: "+asset.URL), "failed to get inserted asset")
	}

	if asset.Parent != nil && strings.TrimSpace(asset.Parent.URL) != "" {
		var parentID int64
		err = sqlx.GetContext(ctx, db, &parentID, `SELECT id FROM assets WHERE url = ?`, asset.Parent.URL)
		if err != nil {
			if errors.Is(err, sql.ErrNoRows) {
				parentID, err = SaveAsset(ctx, db, *asset.Parent)
				if err != nil {
					return 0, errutil.Wrap(err, "failed to save parent asset")
				}
			} else {
				return 0, errutil.Wrap(err, "parent asset not found")
			}
		}

		_, err = db.ExecContext(ctx, `
		INSERT INTO asset_relationships (parent_id, child_id, created_at, updated_at)
		VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
		ON CONFLICT(parent_id, child_id) DO UPDATE SET updated_at = CURRENT_TIMESTAMP
	`, parentID, assetID)
		if err != nil {
			return 0, errutil.Wrap(err, "failed to insert asset relationship")
		}
	}

	return assetID, nil
}

func SaveAssetRelationship(ctx context.Context, db queryer, asset DBAsset) error {
	if asset.Parent == nil || strings.TrimSpace(asset.Parent.URL) == "" {
		return nil
	}

	var parentID int64
	err := sqlx.GetContext(ctx, db, &parentID, `SELECT id FROM assets WHERE url = ?`, asset.Parent.URL)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			parentID, err = SaveAsset(ctx, db, *asset.Parent)
			if err != nil {
				return errutil.Wrap(err, "failed to save parent asset")
			}
		}
		return errutil.Wrap(err, "parent asset not found")
	}

	_, err = db.ExecContext(ctx, `
		INSERT INTO asset_relationships (parent_id, child_id, created_at, updated_at)
		VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
		ON CONFLICT(parent_id, child_id) DO UPDATE SET updated_at = CURRENT_TIMESTAMP
	`, parentID, asset.ID)
	if err != nil {
		return errutil.Wrap(err, "failed to insert asset relationship")
	}

	return nil
}

func GetAssetsByProjectName(ctx context.Context, db queryer, projectName string) ([]DBAsset, error) {
	query := `
	WITH RECURSIVE asset_tree AS (
		SELECT 
			a.id, a.url, a.content_hash, a.content_type, a.fs_path, a.project, NULL AS parent_id
		FROM assets a
		WHERE a.project = ?
		
		UNION ALL
		
		SELECT 
			child.id, child.url, child.content_hash, child.content_type, child.fs_path, child.project, rel.parent_id
		FROM assets child
		JOIN asset_relationships rel ON child.id = rel.child_id
		JOIN asset_tree parent ON parent.id = rel.parent_id
	)
	SELECT * FROM asset_tree ORDER BY parent_id, id;
	`

	rows, err := db.QueryxContext(ctx, query, projectName)
	if err != nil {
		return nil, errutil.Wrap(err, "failed to query asset tree")
	}
	defer rows.Close()

	assetMap := make(map[int64]*DBAsset)
	var rootAssets []*DBAsset

	for rows.Next() {
		var asset DBAsset
		var parentID sql.NullInt64

		if err := rows.Scan(&asset.ID, &asset.URL, &asset.ContentHash, &asset.ContentType, &asset.FileSystemPath, &asset.Project, &parentID); err != nil {
			return nil, errutil.Wrap(err, "failed to scan row")
		}

		// Add asset to the map
		asset.Children = []DBAsset{}
		assetMap[asset.ID] = &asset

		// Add to tree structure
		if parentID.Valid {
			if parent, exists := assetMap[parentID.Int64]; exists {
				parent.Children = append(parent.Children, asset)
			} else {
				return nil, errutil.Wrapf(err, "parent asset %d not found", parentID.Int64)
			}
		} else {
			rootAssets = append(rootAssets, &asset)
		}
	}

	// Check for errors after iteration
	if err := rows.Err(); err != nil {
		return nil, errutil.Wrap(err, "error iterating rows")
	}

	assetsReturn := []DBAsset{}

	for _, asset := range rootAssets {
		if len(asset.Children) != 0 {
			assetsReturn = append(assetsReturn, *asset)
		}
	}

	return assetsReturn, nil
}

func GetAssetByURLAndProjectName(ctx context.Context, db queryer, url string, projectName string) (DBAsset, bool, error) {
	query := `
		SELECT *
		FROM assets
		WHERE url = ? AND project = ?
		`

	var asset DBAsset
	err := sqlx.GetContext(ctx, db, &asset, query, url, projectName)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return DBAsset{}, false, nil
		}
		return DBAsset{}, false, errutil.Wrap(err, "failed to query asset by URL")
	}

	return asset, true, nil
}

func GetAssets(ctx context.Context, db queryer, params GetAssetsParams) ([]DBAsset, int, error) {
	// Build the base query
	baseQuery := "FROM assets WHERE (project = ?"
	args := []interface{}{params.ProjectName}

	if params.ProjectName == constants.DefaultProjectName {
		baseQuery += " OR project = '')"
	} else {
		baseQuery += ")"
	}

	baseQuery += " AND url NOT LIKE '%inline.js'"

	// Add search condition if search term is provided
	if params.SearchTerm != "" {
		baseQuery += " AND url LIKE ?"
		args = append(args, "%"+params.SearchTerm+"%")
	}

	// Get total count
	var total int
	countQuery := "SELECT COUNT(*) " + baseQuery
	err := sqlx.GetContext(ctx, db, &total, countQuery, args...)
	if err != nil {
		return nil, 0, errutil.Wrap(err, "failed to get total count")
	}

	// Calculate offset
	offset := (params.Page - 1) * params.PageSize

	// Get paginated assets
	query := `
		SELECT id, url, content_hash, content_type, fs_path, project, request_headers, created_at, updated_at
		` + baseQuery + `
		ORDER BY created_at DESC
		LIMIT ? OFFSET ?
	`
	args = append(args, params.PageSize, offset)

	var assets []DBAsset
	err = sqlx.SelectContext(ctx, db, &assets, query, args...)
	if err != nil {
		return nil, 0, errutil.Wrap(err, "failed to get assets")
	}

	return assets, total, nil
}

func GetAssetsThatLoad(ctx context.Context, db queryer, url string, projectName string, params GetAssetsParams) ([]DBAsset, int, error) {
	// First get the target asset
	targetAsset, exists, err := GetAssetByURLAndProjectName(ctx, db, url, projectName)
	if err != nil {
		return nil, 0, errutil.Wrap(err, "failed to get target asset")
	}
	if !exists {
		return nil, 0, errutil.Wrap(errors.New("asset not found"), "failed to get target asset")
	}

	// Get total count
	var total int
	countQuery := `
		SELECT COUNT(*) FROM assets a
		JOIN asset_relationships ar ON a.id = ar.parent_id
		WHERE ar.child_id = ?
	`
	err = sqlx.GetContext(ctx, db, &total, countQuery, targetAsset.ID)
	if err != nil {
		return nil, 0, errutil.Wrap(err, "failed to get total count")
	}

	// Calculate offset
	offset := (params.Page - 1) * params.PageSize

	// Get paginated assets
	var assets []DBAsset
	err = sqlx.SelectContext(ctx, db, &assets, `
		SELECT a.* FROM assets a
		JOIN asset_relationships ar ON a.id = ar.parent_id
		WHERE ar.child_id = ?
		ORDER BY a.created_at DESC
		LIMIT ? OFFSET ?
	`, targetAsset.ID, params.PageSize, offset)
	if err != nil {
		return nil, 0, errutil.Wrap(err, "failed to get assets that load target")
	}

	return assets, total, nil
}

func GetAssetsLoadedBy(ctx context.Context, db queryer, url string, projectName string, params GetAssetsParams) ([]DBAsset, int, error) {
	// First get the target asset
	targetAsset, exists, err := GetAssetByURLAndProjectName(ctx, db, url, projectName)
	if err != nil {
		return nil, 0, errutil.Wrap(err, "failed to get target asset")
	}
	if !exists {
		return nil, 0, errutil.Wrap(errors.New("asset not found"), "failed to get target asset")
	}

	// Get total count
	var total int
	countQuery := `
		SELECT COUNT(*) FROM assets a
		JOIN asset_relationships ar ON a.id = ar.child_id
		WHERE ar.parent_id = ?
	`
	err = sqlx.GetContext(ctx, db, &total, countQuery, targetAsset.ID)
	if err != nil {
		return nil, 0, errutil.Wrap(err, "failed to get total count")
	}

	// Calculate offset
	offset := (params.Page - 1) * params.PageSize

	// Get paginated assets
	var assets []DBAsset
	err = sqlx.SelectContext(ctx, db, &assets, `
		SELECT a.* FROM assets a
		JOIN asset_relationships ar ON a.id = ar.child_id
		WHERE ar.parent_id = ?
		ORDER BY a.created_at DESC
		LIMIT ? OFFSET ?
	`, targetAsset.ID, params.PageSize, offset)
	if err != nil {
		return nil, 0, errutil.Wrap(err, "failed to get assets loaded by target")
	}

	return assets, total, nil
}

func OverrideExists(ctx context.Context, db queryer, assetID int64) (bool, error) {
	query := `
		SELECT COUNT(*) 
		FROM overrides
		WHERE asset_id = ? AND deleted_at IS NULL
	`

	var count int
	err := sqlx.GetContext(ctx, db, &count, query, assetID)
	if err != nil {
		return false, errutil.Wrap(err, "failed to check if override exists")
	}

	return count > 0, nil
}

func GetAssetByID(ctx context.Context, db queryer, id int64) (DBAsset, error) {
	query := `
		SELECT * FROM assets WHERE id = ?
	`

	var asset DBAsset
	err := sqlx.GetContext(ctx, db, &asset, query, id)
	if err != nil {
		return DBAsset{}, errutil.Wrap(err, "failed to get asset by ID")
	}

	return asset, nil
}

func UpdateAssetIsBeautified(ctx context.Context, db queryer, assetID int64, isBeautified bool) error {
	query := `
		UPDATE assets
		SET is_beautified = ?
		WHERE id = ?
	`

	_, err := db.ExecContext(ctx, query, isBeautified, assetID)
	if err != nil {
		return errutil.Wrap(err, "failed to update asset is beautified")
	}

	return nil
}
