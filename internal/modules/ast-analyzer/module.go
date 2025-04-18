package chunkdiscoverer

import (
	"context"
	_ "embed"
	"os"
	"path"

	assetservice "github.com/francisconeves97/jxscout/internal/core/asset-service"
	"github.com/francisconeves97/jxscout/internal/core/common"
	"github.com/francisconeves97/jxscout/internal/core/errutil"
	concurrentqueue "github.com/francisconeves97/jxscout/pkg/concurrent-queue"
	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"
)

type astAnalyzer struct {
	sdk   *jxscouttypes.ModuleSDK
	queue concurrentqueue.Queue[assetservice.Asset]
}

func NewASTAnalyzer(concurrency int, chunkBruteForceLimit int) *astAnalyzer {
	return &astAnalyzer{
		queue: concurrentqueue.NewQueue[assetservice.Asset](concurrency),
	}
}

func (m *astAnalyzer) Initialize(sdk *jxscouttypes.ModuleSDK) error {
	m.sdk = sdk

	go func() {
		err := m.subscribeAssetSavedEvent()
		if err != nil {
			m.sdk.Logger.Error("failed to subscribe to asset saved topic", "err", err)
		}
	}()

	m.initializeQueueHandler()

	saveDir := path.Join(common.GetPrivateDirectory(), "extracted")

	// Create the directory if it doesn't exist
	if err := os.MkdirAll(saveDir, 0755); err != nil {
		return errutil.Wrap(err, "failed to create binaries directory")
	}

	// Define the path for the extracted binary
	// binaryPath := filepath.Join(saveDir, "chunk-discoverer.js")
	// if _, err := os.Stat(binaryPath); os.IsNotExist(err) {
	// 	if err := os.WriteFile(binaryPath, chunkDiscovererBinary, 0755); err != nil {
	// 		return errutil.Wrap(err, "failed to write chunk discoverer file")
	// 	}
	// }

	return nil
}

var validASTAnalyzerContentTypes = map[common.ContentType]bool{
	common.ContentTypeJS: true,
}

func (m *astAnalyzer) initializeQueueHandler() {
	m.queue.StartConsumers(func(ctx context.Context, asset assetservice.Asset) {
		// Analyze
	})
}

func (m *astAnalyzer) subscribeAssetSavedEvent() error {
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

		// consume JS and inline JS files
		if isValid, ok := validASTAnalyzerContentTypes[event.Asset.ContentType]; (!ok || !isValid) && !event.Asset.IsInlineJS {
			continue
		}

		if !m.sdk.Scope.IsInScope(event.Asset.URL) {
			m.sdk.Logger.Debug("skipping ast analyzer because asset is not in scope", "asset_url", event.Asset.URL)
			continue
		}

		m.queue.Produce(m.sdk.Ctx, event.Asset)
	}

	return nil
}
