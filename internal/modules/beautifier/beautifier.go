package beautifier

import (
	"context"
	"fmt"
	"os/exec"

	assetservice "github.com/francisconeves97/jxscout/internal/core/asset-service"
	"github.com/francisconeves97/jxscout/internal/core/common"
	"github.com/francisconeves97/jxscout/internal/core/errutil"
	"github.com/francisconeves97/jxscout/internal/core/eventbus"
	concurrentqueue "github.com/francisconeves97/jxscout/pkg/concurrent-queue"
	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"
)

type beautifierModule struct {
	sdk   *jxscouttypes.ModuleSDK
	queue concurrentqueue.Queue[assetservice.Asset]
}

func NewBeautifier(concurrency int) *beautifierModule {
	return &beautifierModule{
		queue: concurrentqueue.NewQueue[assetservice.Asset](concurrency),
	}
}

func (m *beautifierModule) Initialize(sdk *jxscouttypes.ModuleSDK) error {
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

var validBeautifierContentTypes = map[common.ContentType]bool{
	common.ContentTypeHTML: true,
	common.ContentTypeJS:   true,
}

func (m *beautifierModule) initializeQueueHandler() {
	m.queue.StartConsumers(func(ctx context.Context, asset assetservice.Asset) {
		err := m.beautify(asset.Path, asset.ContentType)
		if err != nil {
			m.sdk.Logger.ErrorContext(ctx, "failed to save asset", "err", err)
			return
		}

		err = m.sdk.EventBus.Publish(TopicBeautifierAssetSaved, eventbus.Message{
			Data: EventBeautifierAssetSaved{
				Asset: asset,
			},
		})
		if err != nil {
			m.sdk.Logger.ErrorContext(ctx, "failed to publish asset saved event", "err", err)
			return
		}
	})
}

func (m *beautifierModule) subscribeAssetSavedEvent() error {
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

		if isValid, ok := validBeautifierContentTypes[event.Asset.ContentType]; !ok || !isValid {
			continue
		}

		m.queue.Produce(m.sdk.Ctx, event.Asset)
	}

	return nil
}

func (s *beautifierModule) beautify(filePath string, contentType common.ContentType) error {
	parser := "babel"
	if contentType == common.ContentTypeHTML {
		parser = "html"
	}

	cmd := exec.Command("prettier", filePath, "--write", fmt.Sprintf("--parser=%s", parser))

	if err := cmd.Start(); err != nil {
		return errutil.Wrap(err, "error starting command")
	}

	return nil
}
