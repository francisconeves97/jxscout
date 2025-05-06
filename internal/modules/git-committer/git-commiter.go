package gitcommiter

import (
	"context"
	"encoding/json"
	"fmt"
	"sync"
	"time"

	"github.com/francisconeves97/jxscout/internal/core/common"
	"github.com/francisconeves97/jxscout/internal/core/dbeventbus"
	"github.com/francisconeves97/jxscout/internal/core/errutil"
	"github.com/francisconeves97/jxscout/internal/modules/beautifier"
	"github.com/francisconeves97/jxscout/internal/modules/sourcemaps"
	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"
)

type gitCommiterModule struct {
	sdk        *jxscouttypes.ModuleSDK
	gitService *gitService
	gitMutex   sync.Mutex
}

func NewGitCommiter() jxscouttypes.Module {
	return &gitCommiterModule{}
}

type asset struct {
	Path string `json:"path"`
}

func (m *gitCommiterModule) Initialize(sdk *jxscouttypes.ModuleSDK) error {
	m.sdk = sdk
	m.gitService = newGitService(common.GetWorkingDirectory())

	// Ensure git repository exists
	if err := m.gitService.ensureGitRepo(); err != nil {
		return errutil.Wrap(err, "failed to ensure git repository exists")
	}

	concurrency := 1
	pollInterval := 5 * time.Second
	heartbeatInterval := 10 * time.Second

	m.sdk.DBEventBus.Subscribe(m.sdk.Ctx, beautifier.TopicBeautifierAssetSaved, "ast-analyzer", func(ctx context.Context, payload []byte) error {
		var event beautifier.EventBeautifierAssetSaved
		err := json.Unmarshal(payload, &event)
		if err != nil {
			return errutil.Wrap(err, "failed to unmarshal payload")
		}

		assetServiceAsset, err := m.sdk.AssetService.GetAssetByID(ctx, event.AssetID)
		if err != nil {
			return dbeventbus.NewRetriableError(errutil.Wrap(err, "failed to get asset"))
		}

		asset := asset{
			Path: assetServiceAsset.Path,
		}

		err = m.commitAsset(asset)
		if err != nil {
			return errutil.Wrapf(err, "failed to commit asset: %s", asset.Path)
		}

		return nil
	}, dbeventbus.Options{
		Concurrency:       concurrency, // save one asset at a time
		MaxRetries:        3,
		Backoff:           common.ExponentialBackoff,
		PollInterval:      pollInterval,
		HeartbeatInterval: heartbeatInterval,
	})

	m.sdk.DBEventBus.Subscribe(m.sdk.Ctx, sourcemaps.TopicSourcemapsReversedSourcemapSaved, "ast-analyzer", func(ctx context.Context, payload []byte) error {
		var event sourcemaps.EventSourcemapsReversedSourcemapSaved
		err := json.Unmarshal(payload, &event)
		if err != nil {
			return errutil.Wrap(err, "failed to unmarshal payload")
		}

		var reversedSourcemap sourcemaps.ReversedSourcemap
		err = m.sdk.Database.GetContext(ctx, &reversedSourcemap, "SELECT * FROM reversed_sourcemaps WHERE id = ?", event.ReversedSourcemapID)
		if err != nil {
			return dbeventbus.NewRetriableError(errutil.Wrap(err, "failed to get reversed sourcemap"))
		}

		asset := asset{
			Path: reversedSourcemap.Path,
		}

		err = m.commitAsset(asset)
		if err != nil {
			return errutil.Wrapf(err, "failed to commit asset: %s", asset.Path)
		}

		return nil
	}, dbeventbus.Options{
		Concurrency:       concurrency, // save one asset at a time
		MaxRetries:        3,
		Backoff:           common.ExponentialBackoff,
		PollInterval:      pollInterval,
		HeartbeatInterval: heartbeatInterval,
	})

	return nil
}

func (m *gitCommiterModule) commitAsset(asset asset) error {
	m.gitMutex.Lock()
	defer m.gitMutex.Unlock()

	hasChanges, err := m.gitService.hasChanges()
	if err != nil {
		return errutil.Wrap(err, "failed to check for changes")
	}

	if !hasChanges {
		return nil
	}

	err = m.gitService.add(asset.Path)
	if err != nil {
		return errutil.Wrap(err, "failed to add asset to git")
	}

	hasChanges, err = m.gitService.hasChanges()
	if err != nil {
		return errutil.Wrap(err, "failed to check for changes after add")
	}

	if !hasChanges {
		return nil
	}

	now := time.Now()
	commitMessage := fmt.Sprintf("Saved update on %s at %s", asset.Path, now.Format("02-01-2006 15:04"))

	if err := m.gitService.commit(commitMessage); err != nil {
		return errutil.Wrap(err, "failed to create snapshot commit")
	}

	return nil
}
