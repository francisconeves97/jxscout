package ingestion

const (
	TopicIngestionRequestReceived = "ingestion_service.ingestion_request_received"
)

type EventIngestionRequestReceived struct {
	IngestionRequest *IngestionRequest
}
