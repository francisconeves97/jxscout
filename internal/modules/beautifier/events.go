package beautifier

import assetservice "github.com/francisconeves97/jxscout/internal/core/asset-service"

const (
	TopicBeautifierAssetSaved = "beautifier.asset_saved"
)

type EventBeautifierAssetSaved struct {
	Asset assetservice.Asset
}
