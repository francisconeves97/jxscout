package beautifier

const (
	TopicBeautifierAssetSaved = "beautifier.asset_saved"
)

type EventBeautifierAssetSaved struct {
	AssetID int64 `json:"asset_id"`
}
