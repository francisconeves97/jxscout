package sourcemaps

const (
	TopicSourcemapsReversedSourcemapSaved = "sourcemaps.reversed_sourcemap_saved"
)

type EventSourcemapsReversedSourcemapSaved struct {
	ReversedSourcemapID int64 `json:"reversed_sourcemap_id"`
}
