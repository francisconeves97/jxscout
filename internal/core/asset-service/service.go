package assetservice

import (
	"context"
	"encoding/json"
	"log/slog"

	assetrepository "github.com/francisconeves97/jxscout/internal/core/asset-repository"
	"github.com/francisconeves97/jxscout/internal/core/common"
	"github.com/francisconeves97/jxscout/internal/core/errutil"
	"github.com/francisconeves97/jxscout/internal/core/eventbus"
	concurrentqueue "github.com/francisconeves97/jxscout/pkg/concurrent-queue"
)

type AssetService interface {
	AsyncSaveAsset(ctx context.Context, asset Asset)
	UpdateWorkingDirectory(path string)
	GetProjectAssets(projectName string) ([]Asset, error)
}

type Asset struct {
	// URL is the url where this asset was found
	URL string
	// Content is the text content of the asset
	Content string
	// ContentType is the type of the content of this file
	ContentType string
	// Project is the project name for this asset
	Project string
	// RequestHeaders are the headers that were used to make this request
	RequestHeaders map[string]string
	// Parent is the asset that loaded the current asset, nil if it doesn't exist. (e.g. html page loading a js script)
	Parent *Asset

	// POPULATED AFTER SAVE

	// Path is the path where this asset was stored
	Path string

	// POPULATED WHEN GETTING FROM THE DATABASE
	Children []Asset
}

func (a Asset) GetParentURL() *string {
	if a.Parent == nil {
		return nil
	}

	return &a.Parent.URL
}

type assetService struct {
	eventBus       eventbus.EventBus
	assetSaveQueue concurrentqueue.Queue[Asset]
	log            *slog.Logger
	fileService    FileService
	repository     assetrepository.Repository
}

type AssetServiceConfig struct {
	EventBus         eventbus.EventBus
	SaveConcurrency  int
	FetchConcurrency int
	Logger           *slog.Logger
	FileService      FileService
}

func NewAssetService(cfg AssetServiceConfig) (AssetService, error) {
	repository, err := assetrepository.NewAssetRepository()
	if err != nil {
		return nil, errutil.Wrap(err, "failed to initialize asset repository")
	}

	s := &assetService{
		eventBus:       cfg.EventBus,
		assetSaveQueue: concurrentqueue.NewQueue[Asset](cfg.SaveConcurrency),
		log:            cfg.Logger,
		fileService:    cfg.FileService,
		repository:     repository,
	}

	s.initializeQueueHandlers()

	return s, nil
}

func (s *assetService) initializeQueueHandlers() {
	s.assetSaveQueue.StartConsumers(func(ctx context.Context, asset Asset) {
		err := s.handleSaveAssetRequest(ctx, asset)
		if err != nil {
			s.log.ErrorContext(ctx, "failed to save asset", "err", err)
			return
		}
	})
}

func (s *assetService) handleSaveAssetRequest(ctx context.Context, asset Asset) error {
	s.log.DebugContext(ctx, "processing request to save asset", "asset_url", asset.URL)

	path, err := s.fileService.Save(ctx, SaveFileRequest{
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

	repoAsset := assetrepository.Asset{
		URL:            asset.URL,
		ContentHash:    common.Hash(asset.Content),
		ContentType:    asset.ContentType,
		FileSystemPath: path,
		Project:        asset.Project,
		RequestHeaders: string(headers),
	}

	if asset.Parent != nil {
		headers, err := json.Marshal(asset.Parent.RequestHeaders)
		if err != nil {
			return errutil.Wrap(err, "failed to marshal headers")
		}

		repoAsset.Parent = &assetrepository.Asset{
			URL:            asset.Parent.URL,
			ContentHash:    common.Hash(asset.Parent.Content),
			ContentType:    asset.Parent.ContentType,
			Project:        asset.Parent.Project,
			RequestHeaders: string(headers),
		}
	}

	_, err = s.repository.SaveAsset(ctx, repoAsset)
	if err != nil {
		return errutil.Wrap(err, "failed to save asset to db")
	}

	asset.Path = path

	err = s.eventBus.Publish(TopicAssetSaved, eventbus.Message{
		Data: EventAssetSaved{
			Asset: asset,
		},
	})
	if err != nil {
		return errutil.Wrap(err, "failed to publish asset saved even")
	}

	s.log.DebugContext(ctx, "saved file successfully", "path", path, "asset_url", asset.URL)

	return nil
}

// this method is asynchronous so no error will be returned
func (s *assetService) AsyncSaveAsset(ctx context.Context, asset Asset) {
	s.assetSaveQueue.Produce(ctx, asset)
}

func (s *assetService) UpdateWorkingDirectory(path string) {
	s.fileService.UpdateWorkingDirectory(path)
}

func (s *assetService) mapRepoAssetToAsset(repoAsset assetrepository.Asset) Asset {
	asset := Asset{
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

func (s *assetService) GetProjectAssets(projectName string) ([]Asset, error) {
	repoAssets, err := s.repository.GetAssetsByProjectName(projectName)
	if err != nil {
		return nil, errutil.Wrap(err, "failed to get assets from repo")
	}

	assets := []Asset{}

	for _, repoAsset := range repoAssets {
		assets = append(assets, s.mapRepoAssetToAsset(repoAsset))
	}

	return assets, nil
}
