package assetservice

const (
	TopicAssetSaved = "asset_service.asset_saved"
)

type EventAssetSaved struct {
	AssetID int64 `json:"asset_id"`
}
