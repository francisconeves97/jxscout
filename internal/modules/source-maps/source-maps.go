package sourcemaps

import (
	"context"
	"encoding/json"
	"fmt"
	"os/exec"
	"path/filepath"
	"time"

	assetservice "github.com/francisconeves97/jxscout/internal/core/asset-service"
	"github.com/francisconeves97/jxscout/internal/core/common"
	"github.com/francisconeves97/jxscout/internal/core/dbeventbus"
	"github.com/francisconeves97/jxscout/internal/core/errutil"
	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"
	"github.com/pkg/errors"
)

const (
	sourceMapsFolder   = "sourcemaps"
	sourceMapsReversed = "reversed"
)

type sourceMapsModule struct {
	sdk         *jxscouttypes.ModuleSDK
	concurrency int
}

func NewSourceMaps(concurrency int) *sourceMapsModule {
	return &sourceMapsModule{
		concurrency: concurrency,
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

	return nil
}

var validsourceMapsContentTypes = map[common.ContentType]bool{
	common.ContentTypeHTML: false,
	common.ContentTypeJS:   true,
}

func (m *sourceMapsModule) subscribeAssetSavedEvent() error {
	err := m.sdk.DBEventBus.Subscribe(m.sdk.Ctx, assetservice.TopicAssetSaved, "sourcemaps", func(ctx context.Context, payload []byte) error {
		// unmarshal payload
		var event assetservice.EventAssetSaved
		err := json.Unmarshal(payload, &event)
		if err != nil {
			return errutil.Wrap(err, "failed to unmarshal payload")
		}

		asset, err := m.sdk.AssetService.GetAssetByID(ctx, event.AssetID)
		if err != nil {
			return dbeventbus.NewRetriableError(errutil.Wrap(err, "failed to get asset"))
		}

		if isValid, ok := validsourceMapsContentTypes[asset.ContentType]; !ok || !isValid {
			return nil
		}

		return m.sourceMapDiscover(ctx, asset)
	}, dbeventbus.Options{
		Concurrency: m.concurrency,
		MaxRetries:  3,
		Backoff: func(retry int) time.Duration {
			return time.Duration(retry) * time.Second
		},
		PollInterval:      1 * time.Second,
		HeartbeatInterval: 10 * time.Second,
	})
	if err != nil {
		return errutil.Wrap(err, "failed to subscribe to ingestion request topic")
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
		return dbeventbus.NewRetriableError(errors.Wrapf(err, "failed to fetch source map for asset %s", asset.URL))
	}
	if !ok {
		return nil // no source map found
	}

	// check if res is a valid json
	var sourceMap map[string]interface{}
	err = json.Unmarshal([]byte(res), &sourceMap)
	if err != nil {
		return errors.Wrapf(err, "failed to unmarshal source map for asset %s", asset.URL)
	}

	filePath, err := s.sdk.FileService.SaveInSubfolder(ctx, sourceMapsFolder, assetservice.SaveFileRequest{
		PathURL: sourceMapPath,
		Content: res,
	})
	if err != nil {
		return dbeventbus.NewRetriableError(errors.Wrapf(err, "failed to save source map for asset %s", asset.URL))
	}

	s.sdk.Logger.Info("discovered source map 💼", "path", filePath, "asset_url", sourceMapPath)

	cmd := exec.Command("reverse-sourcemap", filePath, "--output-dir", filepath.Join(common.GetWorkingDirectory(), s.sdk.Options.ProjectName, sourceMapsFolder, sourceMapsReversed), "--recursive")
	if err := cmd.Start(); err != nil {
		return dbeventbus.NewRetriableError(errutil.Wrap(err, "error starting command"))
	}

	if err := cmd.Wait(); err != nil {
		return dbeventbus.NewRetriableError(errors.Wrapf(err, "error waiting for command to finish"))
	}

	return nil
}
