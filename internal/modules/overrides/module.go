package overrides

import (
	"context"
	"errors"
	"os"

	"github.com/francisconeves97/jxscout/internal/core/errutil"
	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"
)

const (
	JXScoutTamperRuleCollectionName = "jxscout-overrides"
)

type OverridesModule interface {
	IsCaidoAuthenticated(ctx context.Context) bool
	AuthenticateCaido(ctx context.Context) (string, error)
	ToggleOverride(ctx context.Context, request ToggleOverrideRequest) (bool, error)
}

type overridesModule struct {
	sdk           *jxscouttypes.ModuleSDK
	caidoClient   *CaidoClient
	caidoHostname string
	caidoPort     int
	repo          *overridesRepository
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
		return false, errutil.Wrap(err, "asset file no longer exists")
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
	_, err := m.getOrCreateTamperRuleCollection(ctx)
	if err != nil {
		return errutil.Wrap(err, "failed to get or create tamper rule collection")
	}

	// Create a new override record
	// o := &override{
	// 	AssetID: asset.ID,
	// 	// Set other fields as needed based on tamperRuleCollections
	// }

	// if err := m.repo.createOverride(ctx, o); err != nil {
	// 	return errutil.Wrap(err, "failed to save override to database")
	// }

	return nil
}

func (m *overridesModule) deleteOverride(ctx context.Context, asset jxscouttypes.Asset) error {
	// return m.repo.deleteOverride(ctx, asset.ID)
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
