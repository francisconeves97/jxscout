package sourcemaps

import (
	"context"
	"fmt"
	"os/exec"
	"path"

	assetservice "github.com/francisconeves97/jxscout/internal/core/asset-service"
	"github.com/francisconeves97/jxscout/internal/core/common"
	"github.com/francisconeves97/jxscout/internal/core/errutil"
	concurrentqueue "github.com/francisconeves97/jxscout/pkg/concurrent-queue"
	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"
	"github.com/pkg/errors"
)

const (
	sourceMapsFolder   = "sourcemaps"
	sourceMapsReversed = "reversed"
)

type sourceMapsModule struct {
	sdk   *jxscouttypes.ModuleSDK
	queue concurrentqueue.Queue[assetservice.Asset]
}

func NewSourceMaps(concurrency int) *sourceMapsModule {
	return &sourceMapsModule{
		queue: concurrentqueue.NewQueue[assetservice.Asset](concurrency),
	}
}

func (m *sourceMapsModule) Initialize(sdk *jxscouttypes.ModuleSDK) error {
	m.sdk = sdk

	go func() {
		err := m.subscribeAssetSavedEvent()
		if err != nil {
			m.sdk.Logger.Error("failed to subscribe to asset saved topic", "err", err)
		}
	}()

	m.initializeQueueHandler()

	return nil
}

var validsourceMapsContentTypes = map[common.ContentType]bool{
	common.ContentTypeHTML: false,
	common.ContentTypeJS:   true,
}

func (m *sourceMapsModule) initializeQueueHandler() {
	m.queue.StartConsumers(func(ctx context.Context, asset assetservice.Asset) {
		err := m.sourceMapDiscover(ctx, asset)
		if err != nil {
			m.sdk.Logger.ErrorContext(ctx, "failed to save asset", "err", err)
			return
		}
	})
}

func (m *sourceMapsModule) subscribeAssetSavedEvent() error {
	messages, err := m.sdk.EventBus.Subscribe(assetservice.TopicAssetSaved)
	if err != nil {
		return errutil.Wrap(err, "failed to subscribe to ingestion request topic")
	}

	for msg := range messages {
		event, ok := msg.Data.(assetservice.EventAssetSaved)
		if !ok {
			m.sdk.Logger.Error("expected event EventAssetSaved but event is other type")
			continue
		}

		if isValid, ok := validsourceMapsContentTypes[event.Asset.ContentType]; !ok || !isValid {
			continue
		}

		m.queue.Produce(m.sdk.Ctx, event.Asset)
	}

	return nil
}

func (s *sourceMapsModule) sourceMapDiscover(ctx context.Context, asset assetservice.Asset) error {
	if asset.IsInlineJS {
		return nil
	}

	sourceMapPath := fmt.Sprintf("%s.map", asset.URL)

	res, ok, err := s.sdk.AssetFetcher.RateLimitedGet(ctx, sourceMapPath, nil)
	if err != nil {
		return errors.Wrapf(err, "failed to fetch source map for asset %s", asset.URL)
	}
	if !ok {
		return nil // no source map found
	}

	filePath, err := s.sdk.FileService.SaveInSubfolder(ctx, sourceMapsFolder, assetservice.SaveFileRequest{
		PathURL: sourceMapPath,
		Content: res,
	})
	if err != nil {
		return errors.Wrapf(err, "failed to save source map for asset %s", asset.URL)
	}

	s.sdk.Logger.Info("discovered source map 💼", "path", filePath, "asset_url", sourceMapPath)

	cmd := exec.Command("reverse-sourcemap", filePath, "--output-dir", path.Join(common.GetWorkingDirectory(), s.sdk.Options.ProjectName, sourceMapsFolder, sourceMapsReversed), "--recursive")
	if err := cmd.Start(); err != nil {
		return errutil.Wrap(err, "error starting command")
	}

	return nil
}
