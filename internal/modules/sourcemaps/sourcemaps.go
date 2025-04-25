package sourcemaps

import (
	"context"
	"encoding/json"
	"fmt"
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

	err := initializeDatabase(m.sdk.Database)
	if err != nil {
		return errutil.Wrap(err, "failed to initialize database")
	}

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
		return errutil.Wrap(err, "failed to subscribe to ingestion request topic")
	}

	return nil
}

func (m *sourceMapsModule) handleAssetSavedEvent(ctx context.Context, asset assetservice.Asset) error {
	if asset.IsInlineJS {
		return nil
	}

	if isValid, ok := validsourceMapsContentTypes[asset.ContentType]; !ok || !isValid {
		return nil
	}

	return m.sourceMapDiscover(ctx, asset)
}

func (s *sourceMapsModule) sourceMapDiscover(ctx context.Context, asset assetservice.Asset) error {
	sourceMap, found, err := getSourceMapForAsset(ctx, asset, s.sdk)
	if err != nil {
		return errutil.Wrap(err, "failed to get source map for asset")
	}
	if !found {
		return nil
	}

	urlToSave := common.NormalizeURL(sourceMap.URL.String())
	if sourceMap.URL.Scheme == "data" {
		urlToSave = fmt.Sprintf("%s.map", asset.URL)
	}

	filePath, err := s.sdk.FileService.SaveInSubfolder(ctx, sourceMapsFolder, assetservice.SaveFileRequest{
		PathURL: urlToSave,
		Content: sourceMap.OriginalContent,
	})
	if err != nil {
		return dbeventbus.NewRetriableError(errors.Wrapf(err, "failed to save source map for asset %s", asset.URL))
	}

	s.sdk.Logger.Info("discovered source map 💼", "path", filePath, "asset_url", asset.URL, "sourcemap_url", urlToSave)

	dbSourceMap := &Sourcemap{
		AssetID: asset.ID,
		URL:     common.NormalizeURL(sourceMap.URL.String()),
		Getter:  sourceMap.GetterName,
		Path:    filePath,
		Hash:    common.Hash(sourceMap.OriginalContent),
	}

	sourceMapID, err := SaveSourcemap(ctx, s.sdk.Database, dbSourceMap)
	if err != nil {
		return dbeventbus.NewRetriableError(errutil.Wrap(err, "failed to save source map"))
	}

	reversedSourceMapsDir := filepath.Join(common.GetWorkingDirectory(), s.sdk.Options.ProjectName, sourceMapsFolder, sourceMapsReversed)

	for i, sourcePath := range sourceMap.Sources {
		sourcePath = "/" + sourcePath // path.Clean will ignore a leading '..', must be a '/..'

		scriptPath, scriptData := filepath.Join(reversedSourceMapsDir, filepath.Clean(sourcePath)), sourceMap.SourcesContent[i]

		filePath, err := s.sdk.FileService.SimpleSave(scriptPath, scriptData)
		if err != nil {
			return dbeventbus.NewRetriableError(errors.Wrapf(err, "failed to save source map for asset %s", asset.URL))
		}

		reversedSourceMap := &ReversedSourcemap{
			SourcemapID: sourceMapID,
			Path:        filePath,
		}

		_, err = SaveReversedSourcemap(ctx, s.sdk.Database, reversedSourceMap)
		if err != nil {
			return dbeventbus.NewRetriableError(errutil.Wrap(err, "failed to save reversed source map"))
		}
	}

	return nil
}
