package assetservice

import (
	"context"
	"log/slog"

	"github.com/francisconeves97/jxscout/internal/core/common"
	"github.com/francisconeves97/jxscout/internal/core/errutil"
	"github.com/francisconeves97/jxscout/internal/core/eventbus"
	concurrentqueue "github.com/francisconeves97/jxscout/pkg/concurrent-queue"
)

type AsyncFetchAndSaveRequest struct {
	URL         string
	ParentURL   *string
	ContentType string
	Namespace   string
}

type AssetService interface {
	AsyncSaveAsset(ctx context.Context, asset Asset)
	AsyncFetchAndSave(ctx context.Context, req AsyncFetchAndSaveRequest)
}

type Asset struct {
	// URL is the url where this asset was found
	URL string
	// Content is the text content of the asset
	Content string
	// Namespace is the namespace folder where this file should be stored (e.g. raw, optimized, source code)
	Namespace string
	// ContentType is the type of the content of this file
	ContentType string
	// Parent is the asset that loaded the current asset, nil if it doesn't exist. (e.g. html page loading a js script)
	Parent *Asset

	// POPULATED AFTER SAVE

	// Path is the path where this asset was stored
	Path string
}

func (a Asset) GetParentURL() *string {
	if a.Parent == nil {
		return nil
	}

	return &a.Parent.URL
}

type assetService struct {
	eventBus        eventbus.EventBus
	assetSaveQueue  concurrentqueue.Queue[Asset]
	assetFetchQueue concurrentqueue.Queue[AsyncFetchAndSaveRequest]
	log             *slog.Logger
	fileService     fileService
	httpClient      httpClient
}

type AssetServiceConfig struct {
	EventBus         eventbus.EventBus
	SaveConcurrency  int
	FetchConcurrency int
	Logger           *slog.Logger
	FileService      fileService
	HTTPClient       httpClient
}

func NewAssetService(cfg AssetServiceConfig) AssetService {
	s := &assetService{
		eventBus:        cfg.EventBus,
		assetSaveQueue:  concurrentqueue.NewQueue[Asset](cfg.SaveConcurrency),
		assetFetchQueue: concurrentqueue.NewQueue[AsyncFetchAndSaveRequest](cfg.FetchConcurrency),
		log:             cfg.Logger,
		fileService:     cfg.FileService,
		httpClient:      cfg.HTTPClient,
	}

	s.initializeQueueHandlers()

	return s
}

func (s *assetService) initializeQueueHandlers() {
	s.assetSaveQueue.StartConsumers(func(ctx context.Context, asset Asset) {
		err := s.handleSaveAssetRequest(ctx, asset)
		if err != nil {
			s.log.ErrorContext(ctx, "failed to save asset", "err", err)
			return
		}
	})

	s.assetFetchQueue.StartConsumers(func(ctx context.Context, asset AsyncFetchAndSaveRequest) {
		err := s.handleGetAndSaveRequest(ctx, asset)
		if err != nil {
			s.log.ErrorContext(ctx, "failed to get and save asset", "err", err, "asset_url", asset.URL)
			return
		}
	})
}

func (s *assetService) handleSaveAssetRequest(ctx context.Context, asset Asset) error {
	s.log.DebugContext(ctx, "processing request to save asset", "asset_url", asset.URL)

	path, err := s.fileService.Save(ctx, saveFileRequest{
		PathURL:   asset.URL,
		Content:   asset.Content,
		Namespace: asset.Namespace,
	})
	if err != nil {
		return errutil.Wrap(err, "failed to save file")
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

func (s *assetService) handleGetAndSaveRequest(ctx context.Context, req AsyncFetchAndSaveRequest) error {
	content, found, err := s.httpClient.Get(ctx, req.URL)
	if err != nil {
		return errutil.Wrap(err, "failed to perform get request")
	}
	if !found {
		s.log.DebugContext(ctx, "asset not found", "asset_url", req.URL)
		return nil
	}

	asset := Asset{
		URL:         req.URL,
		ContentType: req.ContentType,
		Content:     content,
		Namespace:   req.Namespace,
	}

	if common.StrPtr(req.ParentURL) != "" {
		asset.Parent = &Asset{
			URL: req.URL,
		}
	}

	s.AsyncSaveAsset(ctx, asset)

	return nil
}

func (s *assetService) AsyncFetchAndSave(ctx context.Context, req AsyncFetchAndSaveRequest) {
	s.assetFetchQueue.Produce(ctx, req)
}
