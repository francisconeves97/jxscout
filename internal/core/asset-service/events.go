package assetservice

const (
	TopicAssetSaved = "asset_service.asset_saved"
)

type EventAssetSaved struct {
	Asset Asset `json:"asset"`
}
