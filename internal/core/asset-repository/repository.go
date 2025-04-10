package assetrepository

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

type Repository interface {
	SaveAsset(ctx context.Context, asset Asset) (int64, error)
	GetAssetsByProjectName(projectName string) ([]Asset, error)
	GetAssetByURL(ctx context.Context, url string) (Asset, bool, error)
	GetAssets(ctx context.Context, params GetAssetsParams) ([]Asset, int, error)
	GetAssetsThatLoad(ctx context.Context, url string) ([]Asset, error)
}

type GetAssetsParams struct {
	ProjectName string
	SearchTerm  string
	Page        int
	PageSize    int
}

type assetRepository struct {
	db *sqlx.DB
}

func NewAssetRepository(db *sqlx.DB) (Repository, error) {
	db, err := initialize(db)
	if err != nil {
		return nil, errutil.Wrap(err, "failed to initialize db")
	}

	return &assetRepository{
		db: db,
	}, nil
}

func initialize(db *sqlx.DB) (*sqlx.DB, error) {
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
		return nil, errutil.Wrap(err, "failed to create schema")
	}

	return db, nil
}

type Asset struct {
	ID             int64     `db:"id"`
	URL            string    `db:"url"`
	ContentHash    string    `db:"content_hash"`
	ContentType    string    `db:"content_type"`
	FileSystemPath string    `db:"fs_path"`
	Project        string    `db:"project"`
	RequestHeaders string    `db:"request_headers"`
	CreatedAt      time.Time `db:"created_at"`
	UpdatedAt      time.Time `db:"updated_at"`

	Parent *Asset

	Children []Asset
}

type AssetRelationship struct {
	ID       int64 `db:"id"`
	ParentID int64 `db:"parent_id"`
	ChildID  int64 `db:"child_id"`
}

func (r *assetRepository) SaveAsset(ctx context.Context, asset Asset) (int64, error) {
	_, err := r.db.ExecContext(ctx, `
	INSERT INTO assets (url, content_hash, content_type, fs_path, project, request_headers, created_at, updated_at)
	VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
	ON CONFLICT(url) DO UPDATE SET content_hash = ?, content_type = ?, fs_path = ?, project = ?, request_headers = ?, updated_at = CURRENT_TIMESTAMP
	`, asset.URL, asset.ContentHash, asset.ContentType, asset.FileSystemPath, asset.Project, asset.RequestHeaders,
		asset.ContentHash, asset.ContentType, asset.FileSystemPath, asset.Project, asset.RequestHeaders)
	if err != nil {
		return 0, errutil.Wrap(err, "failed to insert the asset")
	}

	var assetID int64
	err = r.db.GetContext(ctx, &assetID, `SELECT id FROM assets WHERE url = ?`, asset.URL)
	if err != nil {
		return 0, errutil.Wrap(err, "failed to get inserted asset")
	}

	if asset.Parent != nil && strings.TrimSpace(asset.Parent.URL) != "" {
		var parentID int64
		err = r.db.GetContext(ctx, &parentID, `SELECT id FROM assets WHERE url = ?`, asset.Parent.URL)
		if err != nil {
			if errors.Is(err, sql.ErrNoRows) {
				parentID, err = r.SaveAsset(ctx, *asset.Parent)
				if err != nil {
					return 0, errutil.Wrap(err, "failed to save parent aset")
				}
			}
			return 0, errutil.Wrap(err, "parent asset not found")
		}

		_, err = r.db.ExecContext(ctx, `
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

func (r *assetRepository) GetAssetsByProjectName(projectName string) ([]Asset, error) {
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

	rows, err := r.db.Queryx(query, projectName)
	if err != nil {
		return nil, errutil.Wrap(err, "failed to query asset tree")
	}
	defer rows.Close()

	assetMap := make(map[int64]*Asset)
	var rootAssets []*Asset

	for rows.Next() {
		var asset Asset
		var parentID sql.NullInt64

		if err := rows.Scan(&asset.ID, &asset.URL, &asset.ContentHash, &asset.ContentType, &asset.FileSystemPath, &asset.Project, &parentID); err != nil {
			return nil, errutil.Wrap(err, "failed to scan row")
		}

		// Add asset to the map
		asset.Children = []Asset{}
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

	assetsReturn := []Asset{}

	for _, asset := range rootAssets {
		if len(asset.Children) != 0 {
			assetsReturn = append(assetsReturn, *asset)
		}
	}

	return assetsReturn, nil
}

func (r *assetRepository) GetAssetByURL(ctx context.Context, url string) (Asset, bool, error) {
	query := `
		SELECT *
		FROM assets
		WHERE url = ?
		`

	var asset Asset
	err := r.db.GetContext(ctx, &asset, query, url)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return Asset{}, false, nil
		}
		return Asset{}, false, errutil.Wrap(err, "failed to query asset by URL")
	}

	return asset, true, nil
}

func (r *assetRepository) GetAssets(ctx context.Context, params GetAssetsParams) ([]Asset, int, error) {
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
	err := r.db.GetContext(ctx, &total, countQuery, args...)
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

	var assets []Asset
	err = r.db.SelectContext(ctx, &assets, query, args...)
	if err != nil {
		return nil, 0, errutil.Wrap(err, "failed to get assets")
	}

	return assets, total, nil
}

func (r *assetRepository) GetAssetsThatLoad(ctx context.Context, url string) ([]Asset, error) {
	// First get the target asset
	targetAsset, exists, err := r.GetAssetByURL(ctx, url)
	if err != nil {
		return nil, errutil.Wrap(err, "failed to get target asset")
	}
	if !exists {
		return nil, errutil.Wrap(errors.New("asset not found"), "failed to get target asset")
	}

	// Get all assets that have this asset as a child
	var assets []Asset
	err = r.db.SelectContext(ctx, &assets, `
		SELECT a.* FROM assets a
		JOIN asset_relationships ar ON a.id = ar.parent_id
		WHERE ar.child_id = ?
	`, targetAsset.ID)
	if err != nil {
		return nil, errutil.Wrap(err, "failed to get assets that load target")
	}

	return assets, nil
}
