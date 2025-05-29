package assetservice

import (
	"context"
	"encoding/json"
	"errors"
	"log/slog"
	"time"

	"github.com/jmoiron/sqlx"

	"github.com/francisconeves97/jxscout/internal/core/common"
	"github.com/francisconeves97/jxscout/internal/core/dbeventbus"
	"github.com/francisconeves97/jxscout/internal/core/errutil"
	concurrentqueue "github.com/francisconeves97/jxscout/pkg/concurrent-queue"
	"github.com/francisconeves97/jxscout/pkg/constants"
)

const (
	assetsFolder = "original" // original source code that was received
)

type AssetService interface {
	AsyncSaveAsset(ctx context.Context, asset *Asset)
	UpdateWorkingDirectory(path string)
	GetAssetByURL(ctx context.Context, url string) (Asset, bool, error)
	GetAssetByID(ctx context.Context, id int64) (Asset, error)
	GetAssets(ctx context.Context, params GetAssetsParams) ([]Asset, int, error)
	GetAssetsThatLoad(ctx context.Context, url string, params GetAssetsParams) ([]Asset, int, error)
	GetAssetsLoadedBy(ctx context.Context, url string, params GetAssetsParams) ([]Asset, int, error)
}

type Asset struct {
	// ID is the id of the asset on the database
	ID int64 `json:"id"`
	// URL is the url where this asset was found
	URL string `json:"url"`
	// Content is the original content of the asset
	Content *string `json:"content"`
	// ContentType is the type of the content of this file
	ContentType string `json:"content_type"`
	// Project is the project name for this asset
	Project string `json:"project"`
	// RequestHeaders are the headers that were used to make this request
	RequestHeaders map[string]string `json:"request_headers"`
	// IsInlineJS is true if the asset is an inline js
	IsInlineJS bool `json:"is_inline_js"`
	// IsChunkDiscovered is true if the asset is a chunk
	IsChunkDiscovered *bool `json:"is_chunk_discovered"`
	// ChunkFromAssetID is the id of the asset that this asset was discovered from, nil if it doesn't exist
	ChunkFromAssetID *int64 `json:"chunk_from_asset_id"`
	// IsBeautified is true if the asset has been beautified
	IsBeautified bool `json:"is_beautified"`
	// Parent is the asset that loaded the current asset, nil if it doesn't exist. (e.g. html page loading a js script)
	Parent *Asset `json:"parent"`

	// POPULATED AFTER SAVE

	// Path is the path where this asset was stored
	Path string `json:"path"`

	// POPULATED WHEN GETTING FROM THE DATABASE
	Children []Asset `json:"children"`
}

func (a Asset) GetParentURL() *string {
	if a.Parent == nil {
		return nil
	}

	return &a.Parent.URL
}

type assetService struct {
	db             *sqlx.DB
	eventBus       *dbeventbus.EventBus
	assetSaveQueue concurrentqueue.Queue[*Asset]
	log            *slog.Logger
	fileService    FileService
	projectName    string
	htmlCacheTTL   time.Duration
	jsCacheTTL     time.Duration
}

type AssetServiceConfig struct {
	EventBus         *dbeventbus.EventBus
	SaveConcurrency  int
	FetchConcurrency int
	Logger           *slog.Logger
	FileService      FileService
	Database         *sqlx.DB
	ProjectName      string
	HTMLCacheTTL     time.Duration
	JSAssetCacheTTL  time.Duration
}

func NewAssetService(cfg AssetServiceConfig) (AssetService, error) {
	err := initializeRepo(cfg.Database)
	if err != nil {
		return nil, errutil.Wrap(err, "failed to initialize repo")
	}

	s := &assetService{
		db:             cfg.Database,
		eventBus:       cfg.EventBus,
		assetSaveQueue: concurrentqueue.NewQueue[*Asset](cfg.SaveConcurrency),
		log:            cfg.Logger,
		fileService:    cfg.FileService,
		projectName:    cfg.ProjectName,
		htmlCacheTTL:   cfg.HTMLCacheTTL,
		jsCacheTTL:     cfg.JSAssetCacheTTL,
	}

	s.initializeQueueHandlers()

	return s, nil
}

func (s *assetService) initializeQueueHandlers() {
	s.assetSaveQueue.StartConsumers(func(ctx context.Context, asset *Asset) {
		err := s.handleSaveAssetRequest(ctx, asset)
		if err != nil {
			s.log.ErrorContext(ctx, "failed to save asset", "err", err)
			return
		}
	})
}

func (s *assetService) handleSaveAssetRequest(ctx context.Context, asset *Asset) error {
	s.log.DebugContext(ctx, "processing request to save asset", "asset_url", asset.URL)

	dbAsset, exists, err := GetAssetByURLAndProjectName(ctx, s.db, asset.URL, s.projectName)
	if err != nil {
		return errutil.Wrap(err, "failed to get asset from repo")
	}
	if exists {
		s.log.DebugContext(ctx, "asset already exists", "asset_url", asset.URL)

		if asset.Parent != nil {
			dbAsset.Parent = &DBAsset{
				URL: asset.Parent.URL,
			}

			err = SaveAssetRelationship(ctx, s.db, dbAsset)
			if err != nil {
				return errutil.Wrap(err, "failed to save asset relationship")
			}
		}

		if asset.ContentType == common.ContentTypeJS && asset.Content != nil && dbAsset.ContentHash != common.Hash(*asset.Content) {
			overrideExists, err := OverrideExists(ctx, s.db, dbAsset.ID)
			if err != nil {
				return errutil.Wrap(err, "failed to check if override exists")
			}

			if overrideExists {
				s.log.DebugContext(ctx, "override exists, skipping updating JS file content", "asset_url", asset.URL)
				return nil
			}

			s.log.DebugContext(ctx, "asset content has changed, updating", "asset_url", asset.URL)
		}

		if asset.Content != nil && dbAsset.ContentHash == common.Hash(*asset.Content) && dbAsset.Project == s.projectName {
			s.log.DebugContext(ctx, "asset content has not changed within the same project, skipping", "asset_url", asset.URL)

			exists, err := s.fileService.FileExists(asset.URL, assetsFolder)
			if err != nil {
				return errutil.Wrap(err, "failed to save file")
			}

			// if the file was deleted for some reason, save it again
			if !exists {
				s.log.DebugContext(ctx, "file was deleted, saving again", "asset_url", asset.URL)

				_, err := s.fileService.SaveInSubfolder(ctx, assetsFolder, SaveFileRequest{
					PathURL: asset.URL,
					Content: asset.Content,
				})
				if err != nil {
					return errutil.Wrap(err, "failed to save file")
				}

				// republish the asset event so we rerun other modules
				err = s.eventBus.Publish(ctx, s.db, TopicAssetSaved, EventAssetSaved{
					AssetID: dbAsset.ID,
				})
				if err != nil {
					return errutil.Wrap(err, "failed to publish asset saved even")
				}
			}

			return nil
		}

		if asset.ContentType == common.ContentTypeHTML && dbAsset.UpdatedAt.After(time.Now().Add(-s.htmlCacheTTL)) {
			s.log.DebugContext(ctx, "HTML file is still fresh, skipping", "asset_url", asset.URL)
			return nil
		}

		if asset.ContentType == common.ContentTypeJS && dbAsset.UpdatedAt.After(time.Now().Add(-s.jsCacheTTL)) {
			s.log.DebugContext(ctx, "JS file is still fresh, skipping", "asset_url", asset.URL)
			return nil
		}
	}

	path, err := s.fileService.SaveInSubfolder(ctx, assetsFolder, SaveFileRequest{
		PathURL: asset.URL,
		Content: asset.Content,
	})
	if err != nil {
		return errutil.Wrap(err, "failed to save file")
	}

	headers, err := json.Marshal(asset.RequestHeaders)
	if err != nil {
		return errutil.Wrap(err, "failed to marshal headers")
	}

	if asset.Project == "" {
		asset.Project = constants.DefaultProjectName
	}

	repoAsset := DBAsset{
		URL:               asset.URL,
		ContentHash:       common.Hash(*asset.Content),
		ContentType:       asset.ContentType,
		FileSystemPath:    path,
		Project:           asset.Project,
		RequestHeaders:    string(headers),
		IsInlineJS:        asset.IsInlineJS,
		IsChunkDiscovered: asset.IsChunkDiscovered,
		ChunkFromAssetID:  asset.ChunkFromAssetID,
	}

	if asset.Parent != nil {
		headers, err := json.Marshal(asset.Parent.RequestHeaders)
		if err != nil {
			return errutil.Wrap(err, "failed to marshal headers")
		}

		contentHash := ""
		if asset.Parent.Content != nil {
			contentHash = common.Hash(*asset.Parent.Content)
		}

		repoAsset.Parent = &DBAsset{
			URL:               asset.Parent.URL,
			ContentHash:       contentHash,
			ContentType:       asset.Parent.ContentType,
			Project:           asset.Parent.Project,
			RequestHeaders:    string(headers),
			IsInlineJS:        asset.Parent.IsInlineJS,
			IsChunkDiscovered: asset.Parent.IsChunkDiscovered,
			ChunkFromAssetID:  asset.Parent.ChunkFromAssetID,
		}
	}

	// tx, err := s.db.BeginTxx(ctx, nil)
	// if err != nil {
	// 	return errutil.Wrap(err, "failed to begin transaction")
	// }
	// defer tx.Rollback()

	assetID, err := SaveAsset(ctx, s.db, repoAsset)
	if err != nil {
		return errutil.Wrap(err, "failed to save asset to db")
	}

	if assetID == 0 {
		s.log.ErrorContext(ctx, "asset id is 0. this is a bug, report it please", "asset_url", asset.URL)
		return errutil.Wrap(errors.New("asset id is 0"), "failed to save asset to db")
	}

	err = s.eventBus.Publish(ctx, s.db, TopicAssetSaved, EventAssetSaved{
		AssetID: assetID,
	})
	if err != nil {
		return errutil.Wrap(err, "failed to publish asset saved even")
	}

	s.log.InfoContext(ctx, "saved file successfully", "path", path, "asset_url", asset.URL)

	// return tx.Commit()
	return nil
}

// this method is asynchronous so no error will be returned
func (s *assetService) AsyncSaveAsset(ctx context.Context, asset *Asset) {
	s.assetSaveQueue.Produce(ctx, asset)
}

func (s *assetService) UpdateWorkingDirectory(path string) {
	s.fileService.UpdateWorkingDirectory(path)
}

func (s *assetService) mapRepoAssetToAsset(repoAsset DBAsset) Asset {
	asset := Asset{
		ID:          repoAsset.ID,
		URL:         repoAsset.URL,
		ContentType: repoAsset.ContentType,
		Project:     repoAsset.Project,
		Path:        repoAsset.FileSystemPath,
	}

	children := []Asset{}
	for _, child := range repoAsset.Children {
		children = append(children, s.mapRepoAssetToAsset(child))
	}

	asset.Children = children

	return asset
}

func (s *assetService) GetAssetByURL(ctx context.Context, url string) (Asset, bool, error) {
	cleanURL := common.NormalizeURL(url)

	repoAsset, exists, err := GetAssetByURLAndProjectName(ctx, s.db, cleanURL, s.projectName)
	if err != nil {
		return Asset{}, false, errutil.Wrap(err, "failed to get asset from repo")
	}

	if !exists {
		return Asset{}, false, nil
	}

	return s.mapRepoAssetToAsset(repoAsset), true, nil
}

func (s *assetService) GetAssets(ctx context.Context, params GetAssetsParams) ([]Asset, int, error) {
	repoAssets, total, err := GetAssets(ctx, s.db, params)
	if err != nil {
		return nil, 0, errutil.Wrap(err, "failed to get assets from repo")
	}

	assets := []Asset{}
	for _, repoAsset := range repoAssets {
		assets = append(assets, s.mapRepoAssetToAsset(repoAsset))
	}

	return assets, total, nil
}

func (s *assetService) GetAssetsThatLoad(ctx context.Context, url string, params GetAssetsParams) ([]Asset, int, error) {
	cleanURL := common.NormalizeURL(url)

	repoAssets, total, err := GetAssetsThatLoad(ctx, s.db, cleanURL, s.projectName, params)
	if err != nil {
		return nil, 0, errutil.Wrap(err, "failed to get assets that load from repo")
	}

	assets := []Asset{}
	for _, repoAsset := range repoAssets {
		assets = append(assets, s.mapRepoAssetToAsset(repoAsset))
	}

	return assets, total, nil
}

func (s *assetService) GetAssetsLoadedBy(ctx context.Context, url string, params GetAssetsParams) ([]Asset, int, error) {
	cleanURL := common.NormalizeURL(url)

	repoAssets, total, err := GetAssetsLoadedBy(ctx, s.db, cleanURL, s.projectName, params)
	if err != nil {
		return nil, 0, errutil.Wrap(err, "failed to get assets loaded by from repo")
	}

	assets := []Asset{}
	for _, repoAsset := range repoAssets {
		assets = append(assets, s.mapRepoAssetToAsset(repoAsset))
	}

	return assets, total, nil
}

func (s *assetService) GetAssetByID(ctx context.Context, id int64) (Asset, error) {
	repoAsset, err := GetAssetByID(ctx, s.db, id)
	if err != nil {
		return Asset{}, errutil.Wrap(err, "failed to get asset from repo")
	}

	return s.mapRepoAssetToAsset(repoAsset), nil
}
