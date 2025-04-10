package overrides

import (
	"context"

	"github.com/francisconeves97/jxscout/internal/core/errutil"
	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"
)

type OverridesModule interface {
	IsCaidoAuthenticated(ctx context.Context) bool
	AuthenticateCaido(ctx context.Context) (string, error)
	ToggleOverride(ctx context.Context, request ToggleOverrideRequest) error
}

type overridesModule struct {
	sdk         *jxscouttypes.ModuleSDK
	caidoClient *CaidoClient
}

func NewOverridesModule(caidoHostname string, caidoPort int) (*overridesModule, error) {
	caidoClient, err := NewCaidoClient(caidoHostname, caidoPort)
	if err != nil {
		return nil, errutil.Wrap(err, "failed to create Caido client")
	}

	return &overridesModule{
		caidoClient: caidoClient,
	}, nil
}

func (m *overridesModule) Initialize(sdk *jxscouttypes.ModuleSDK) error {
	m.sdk = sdk

	db := m.sdk.Database

	_, err := db.Exec(
		`
		CREATE TABLE IF NOT EXISTS overrides (
			id INTEGER PRIMARY KEY,
			asset_id INTEGER REFERENCES assets(id),
			caido_collection_id TEXT,
			caido_tamper_rule_id TEXT,
			content_hash TEXT,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			deleted_at TIMESTAMP
		)
		`,
	)
	if err != nil {
		return errutil.Wrap(err, "failed to create overrides table schema")
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

func (m *overridesModule) ToggleOverride(ctx context.Context, request ToggleOverrideRequest) error {
	asset, exists, err := m.sdk.AssetService.GetAssetByURL(ctx, request.AssetURL)
	if err != nil {
		return errutil.Wrap(err, "failed to get asset by URL")
	}

	if !exists {
		err := m.createOverride(ctx, asset)
		if err != nil {
			return errutil.Wrap(err, "failed to create override")
		}

		return nil
	}

	err = m.deleteOverride(ctx, asset)
	if err != nil {
		return errutil.Wrap(err, "failed to delete override")
	}

	return nil
}

func (m *overridesModule) createOverride(ctx context.Context, asset jxscouttypes.Asset) error {

	return nil
}

func (m *overridesModule) deleteOverride(ctx context.Context, asset jxscouttypes.Asset) error {
	return nil
}
