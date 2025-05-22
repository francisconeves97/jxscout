package beautifier

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"os/exec"
	"time"

	assetservice "github.com/francisconeves97/jxscout/internal/core/asset-service"
	"github.com/francisconeves97/jxscout/internal/core/common"
	"github.com/francisconeves97/jxscout/internal/core/dbeventbus"
	"github.com/francisconeves97/jxscout/internal/core/errutil"
	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"
	"github.com/jmoiron/sqlx"
)

type beautifierModule struct {
	sdk         *jxscouttypes.ModuleSDK
	concurrency int
}

func NewBeautifier(concurrency int) *beautifierModule {
	return &beautifierModule{
		concurrency: concurrency,
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

	return nil
}

var validBeautifierContentTypes = map[common.ContentType]bool{
	common.ContentTypeHTML: true,
	common.ContentTypeJS:   true,
}

func (m *beautifierModule) subscribeAssetSavedEvent() error {
	err := m.sdk.DBEventBus.Subscribe(m.sdk.Ctx, assetservice.TopicAssetSaved, "beautifier", func(ctx context.Context, payload []byte) error {
		var event assetservice.EventAssetSaved
		err := json.Unmarshal(payload, &event)
		if err != nil {
			return errutil.Wrap(err, "failed to unmarshal payload")
		}

		asset, err := m.sdk.AssetService.GetAssetByID(ctx, event.AssetID)
		if err != nil {
			return dbeventbus.NewRetriableError(errutil.Wrap(err, "failed to get asset"))
		}

		err = m.handleAssetSavedEvent(ctx, asset)
		if err != nil {
			return errutil.Wrapf(err, "failed to handle asset saved event for asset (%s)", asset.URL)
		}

		return nil
	}, dbeventbus.Options{
		Concurrency:       m.concurrency,
		MaxRetries:        3,
		Backoff:           common.ExponentialBackoff,
		PollInterval:      1 * time.Second,
		HeartbeatInterval: 10 * time.Second,
	})
	if err != nil {
		return errutil.Wrap(err, "failed to subscribe to asset saved topic")
	}

	return nil
}

func (m *beautifierModule) handleAssetSavedEvent(ctx context.Context, asset assetservice.Asset) error {
	if isValid, ok := validBeautifierContentTypes[asset.ContentType]; !ok || !isValid {
		return nil
	}

	err := beautify(asset.Path, asset.ContentType)
	if err != nil {
		return errutil.Wrap(err, "failed to beautify asset")
	}

	err = assetservice.UpdateAssetIsBeautified(ctx, m.sdk.Database, asset.ID, true)
	if err != nil {
		return errutil.Wrap(err, "failed to update asset is beautified")
	}

	err = m.sdk.DBEventBus.Publish(ctx, m.sdk.Database, TopicBeautifierAssetSaved, EventBeautifierAssetSaved{
		AssetID: asset.ID,
	})
	if err != nil {
		return errutil.Wrap(err, "failed to publish asset saved event")
	}

	return nil
}

func BeautifyAsset(ctx context.Context, assetID int64, filePath string, contentType common.ContentType, db *sqlx.DB) error {
	err := beautify(filePath, contentType)
	if err != nil {
		return errutil.Wrap(err, "failed to beautify asset")
	}

	err = assetservice.UpdateAssetIsBeautified(ctx, db, assetID, true)
	if err != nil {
		return errutil.Wrap(err, "failed to update asset is beautified")
	}

	return nil
}

func beautify(filePath string, contentType common.ContentType) error {
	parser := "babel"
	if contentType == common.ContentTypeHTML {
		parser = "html"
	}

	cmd := exec.Command("prettier", filePath, "--write", fmt.Sprintf("--parser=%s", parser))

	var stderr bytes.Buffer
	cmd.Stderr = &stderr

	if err := cmd.Start(); err != nil {
		return errutil.Wrap(err, "error starting command")
	}

	err := cmd.Wait()
	if err != nil {
		return errutil.Wrapf(err, "error waiting for command: %s", stderr.String())
	}

	return nil
}
