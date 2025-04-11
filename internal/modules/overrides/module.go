package overrides

import (
	"context"
	"errors"
	"net/url"
	"os"
	"strings"
	"time"

	"github.com/francisconeves97/jxscout/internal/core/common"
	"github.com/francisconeves97/jxscout/internal/core/errutil"
	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"
	"github.com/google/uuid"
)

const (
	JXScoutTamperRuleCollectionName = "jxscout-overrides"
	JXScoutTamperRuleNamePrefix     = "jxscout-"
)

type OverridesModule interface {
	IsCaidoAuthenticated(ctx context.Context) bool
	AuthenticateCaido(ctx context.Context) (string, error)
	ToggleOverride(ctx context.Context, request ToggleOverrideRequest) (bool, error)
	GetOverrides(ctx context.Context, page, pageSize int) ([]*override, int, error)
}

type overridesModule struct {
	sdk           *jxscouttypes.ModuleSDK
	caidoClient   *CaidoClient
	caidoHostname string
	caidoPort     int
	repo          *overridesRepository
	// goroutine management
	contentCheckCtx    context.Context
	contentCheckCancel context.CancelFunc
}

func NewOverridesModule(caidoHostname string, caidoPort int) *overridesModule {
	return &overridesModule{
		caidoHostname: caidoHostname,
		caidoPort:     caidoPort,
	}
}

func (m *overridesModule) Initialize(sdk *jxscouttypes.ModuleSDK) error {
	m.sdk = sdk

	caidoClient, err := NewCaidoClient(m.caidoHostname, m.caidoPort, m.sdk.Logger)
	if err != nil {
		return errutil.Wrap(err, "failed to create Caido client")
	}
	m.caidoClient = caidoClient

	repo, err := newOverridesRepository(m.sdk.Database)
	if err != nil {
		return errutil.Wrap(err, "failed to create overrides repository")
	}
	m.repo = repo

	// Start the background routine to check for content changes
	go m.checkOverridesContent(sdk.Ctx)

	return nil
}

// checkOverridesContent periodically checks all overrides for content changes
func (m *overridesModule) checkOverridesContent(ctx context.Context) {
	// Create a new context for this goroutine
	m.contentCheckCtx, m.contentCheckCancel = context.WithCancel(ctx)
	defer m.contentCheckCancel()

	ticker := time.NewTicker(m.sdk.Options.OverrideContentCheckInterval)
	defer ticker.Stop()

	for {
		select {
		case <-m.contentCheckCtx.Done():
			return
		case <-ticker.C:
			// Check if we're authenticated
			if !m.caidoClient.IsAuthenticated() {
				m.sdk.Logger.Debug("stopping content check routine - not authenticated with Caido")
				return
			}

			// Check if we have any overrides
			overrides, err := m.repo.getAllOverrides(ctx)
			if err != nil {
				m.sdk.Logger.Error("failed to get all overrides", "error", err)
				continue
			}

			if len(overrides) == 0 {
				m.sdk.Logger.Debug("stopping content check routine - no overrides found")
				return
			}

			if err := m.checkAllOverrides(ctx); err != nil {
				m.sdk.Logger.Error("failed to check overrides content", "error", err)
			}
		}
	}
}

// startContentCheck starts the content check goroutine if it's not already running
func (m *overridesModule) startContentCheck() {
	// If we already have a context, the goroutine is running
	if m.contentCheckCtx != nil {
		return
	}

	// Start a new goroutine
	go m.checkOverridesContent(m.sdk.Ctx)
}

// stopContentCheck stops the content check goroutine if it's running
func (m *overridesModule) stopContentCheck() {
	if m.contentCheckCancel != nil {
		m.sdk.Logger.Debug("stopping content check routine")
		m.contentCheckCancel()
		m.contentCheckCtx = nil
		m.contentCheckCancel = nil
	}
}

// checkAllOverrides checks all overrides for content changes
func (m *overridesModule) checkAllOverrides(ctx context.Context) error {
	overrides, err := m.repo.getAllOverrides(ctx)
	if err != nil {
		return errutil.Wrap(err, "failed to get all overrides")
	}

	for _, o := range overrides {
		if o.AssetPath == nil {
			m.sdk.Logger.Error("asset path is nil", "override", o)
			continue
		}
		if o.AssetURL == nil {
			m.sdk.Logger.Error("asset URL is nil", "override", o)
			continue
		}

		assetPath := *o.AssetPath
		assetURL := *o.AssetURL

		if _, err := os.Stat(assetPath); os.IsNotExist(err) {
			m.sdk.Logger.Error("asset file no longer exists", "url", assetURL)
			continue
		}

		// Read the current content
		content, err := os.ReadFile(assetPath)
		if err != nil {
			m.sdk.Logger.Error("failed to read asset file", "url", assetURL, "error", err)
			continue
		}

		currentHash := common.Hash(string(content))

		if currentHash == o.ContentHash {
			m.sdk.Logger.Debug("no changes to override", "url", assetURL)
			continue
		}

		// If hash has changed, update the tamper rule
		// Parse the URL to get host and path
		parsedURL, err := url.Parse(assetURL)
		if err != nil {
			m.sdk.Logger.Error("failed to parse asset URL", "url", assetURL, "error", err)
			continue
		}

		// Update the tamper rule
		_, err = m.caidoClient.UpdateTamperRule(ctx, o.CaidoTamperRuleID, parsedURL.Path, string(content), parsedURL.Host, strings.TrimSuffix(parsedURL.Path, "/"))
		if err != nil {
			m.sdk.Logger.Error("failed to update tamper rule", "url", assetURL, "error", err)
			continue
		}

		// Update the hash in our database
		o.ContentHash = currentHash
		if err := m.repo.updateOverride(ctx, o); err != nil {
			m.sdk.Logger.Error("failed to update override hash", "url", assetURL, "error", err)
			continue
		}

		m.sdk.Logger.Info("updated match and replace rule with updated content", "url", assetURL)
	}

	return nil
}

type ToggleOverrideRequest struct {
	AssetURL string
}

func (m *overridesModule) IsCaidoAuthenticated(ctx context.Context) bool {
	return m.caidoClient.IsAuthenticated()
}

func (m *overridesModule) AuthenticateCaido(ctx context.Context) (string, error) {
	verificationURL, err := m.caidoClient.Authenticate(ctx)
	if err != nil {
		return "", errutil.Wrap(err, "failed to authenticate with Caido")
	}
	return verificationURL, nil
}

var ErrAssetNotFound = errors.New("asset not found")
var ErrAssetNoLongerExists = errors.New("asset no longer exists")

func (m *overridesModule) ToggleOverride(ctx context.Context, request ToggleOverrideRequest) (bool, error) {
	asset, exists, err := m.sdk.AssetService.GetAssetByURL(ctx, request.AssetURL)
	if err != nil {
		return false, errutil.Wrap(err, "failed to get asset by URL")
	}
	if !exists {
		return false, ErrAssetNotFound
	}

	// Check if the file still exists
	if _, err := os.Stat(asset.Path); os.IsNotExist(err) {
		return false, ErrAssetNoLongerExists
	}

	existingOverride, err := m.repo.getOverrideByAssetID(ctx, asset.ID)
	if err != nil {
		return false, errutil.Wrap(err, "failed to check for existing override")
	}

	if existingOverride == nil {
		err := m.createOverride(ctx, asset)
		if err != nil {
			return false, errutil.Wrap(err, "failed to create override")
		}

		return true, nil
	}

	err = m.deleteOverride(ctx, asset)
	if err != nil {
		return false, errutil.Wrap(err, "failed to delete override")
	}

	return false, nil
}

func (m *overridesModule) createOverride(ctx context.Context, asset jxscouttypes.Asset) error {
	collection, err := m.getOrCreateTamperRuleCollection(ctx)
	if err != nil {
		return errutil.Wrap(err, "failed to get or create tamper rule collection")
	}

	// Read the asset's content
	content, err := os.ReadFile(asset.Path)
	if err != nil {
		return errutil.Wrap(err, "failed to read asset file")
	}

	// Parse the URL to get host and path
	parsedURL, err := url.Parse(asset.URL)
	if err != nil {
		return errutil.Wrap(err, "failed to parse asset URL")
	}

	// Generate a unique name for the rule
	ruleName := JXScoutTamperRuleNamePrefix + uuid.New().String()

	// Create the tamper rule
	rule, err := m.caidoClient.CreateTamperRule(ctx, collection.ID, ruleName, string(content), parsedURL.Host, strings.TrimSuffix(parsedURL.Path, "/"))
	if err != nil {
		return errutil.Wrap(err, "failed to create tamper rule")
	}

	_, err = m.caidoClient.ToggleTamperRule(ctx, rule.ID, true)
	if err != nil {
		return errutil.Wrap(err, "failed to toggle tamper rule")
	}

	// Calculate content hash
	hash := common.Hash(string(content))

	// Create a new override record
	o := &override{
		AssetID:           asset.ID,
		CaidoCollectionID: collection.ID,
		CaidoTamperRuleID: rule.ID,
		ContentHash:       hash,
	}

	if err := m.repo.createOverride(ctx, o); err != nil {
		return errutil.Wrap(err, "failed to save override to database")
	}

	// Start the content check routine since we now have an override
	m.startContentCheck()

	return nil
}

func (m *overridesModule) deleteOverride(ctx context.Context, asset jxscouttypes.Asset) error {
	// Get the existing override
	existingOverride, err := m.repo.getOverrideByAssetID(ctx, asset.ID)
	if err != nil {
		return errutil.Wrap(err, "failed to get existing override")
	}
	if existingOverride == nil {
		return nil // No override exists, nothing to delete
	}

	// Delete the tamper rule from Caido
	_, err = m.caidoClient.DeleteTamperRule(ctx, existingOverride.CaidoTamperRuleID)
	if err != nil {
		return errutil.Wrap(err, "failed to delete tamper rule from Caido")
	}

	// Delete the override from our database
	if err := m.repo.deleteOverride(ctx, asset.ID); err != nil {
		return errutil.Wrap(err, "failed to delete override from database")
	}

	// Check if we have any remaining overrides
	overrides, err := m.repo.getAllOverrides(ctx)
	if err != nil {
		return errutil.Wrap(err, "failed to check remaining overrides")
	}

	// If no overrides remain, stop the content check routine
	if len(overrides) == 0 {
		m.stopContentCheck()
	}

	return nil
}

func (m *overridesModule) getOrCreateTamperRuleCollection(ctx context.Context) (TamperRuleCollection, error) {
	collections, err := m.caidoClient.GetTamperRuleCollections(ctx)
	if err != nil {
		return TamperRuleCollection{}, errutil.Wrap(err, "failed to get tamper rule collections")
	}

	// Check if our collection already exists
	for _, collection := range collections {
		if collection.Name == JXScoutTamperRuleCollectionName {
			return collection, nil
		}
	}

	// Create a new collection if it doesn't exist
	collection, err := m.caidoClient.CreateTamperRuleCollection(ctx, JXScoutTamperRuleCollectionName)
	if err != nil {
		return TamperRuleCollection{}, errutil.Wrap(err, "failed to create tamper rule collection")
	}

	return collection, nil
}

func (m *overridesModule) GetOverrides(ctx context.Context, page, pageSize int) ([]*override, int, error) {
	return m.repo.getOverrides(ctx, page, pageSize)
}
