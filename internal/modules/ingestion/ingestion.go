package ingestion

import (
	"encoding/json"
	"net/http"

	"github.com/francisconeves97/jxscout/internal/core/eventbus"
	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"
)

type ingestionModule struct {
	sdk *jxscouttypes.ModuleSDK
}

func NewIngestionModule() jxscouttypes.Module {
	return &ingestionModule{}
}

func (m *ingestionModule) Initialize(sdk *jxscouttypes.ModuleSDK) error {
	m.sdk = sdk

	sdk.Router.Post("/ingest", m.handleIngestionEndpoint)
	sdk.Router.Post("/caido-ingest", m.handleIngestionCaidoIngestionEndpoint)

	return nil
}

type Request struct {
	Method  string            `json:"method"`
	URL     string            `json:"url"`
	Headers map[string]string `json:"headers"`
}

type Response struct {
	Status  int               `json:"status"`
	Headers map[string]string `json:"headers"`
	Body    string            `json:"body"`
}

type IngestionRequest struct {
	Request  Request  `json:"request"`
	Response Response `json:"response"`
}

func (m *ingestionModule) handleIngestionEndpoint(w http.ResponseWriter, r *http.Request) {
	var req IngestionRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		m.sdk.HTTPServer.SendErrorResponse(w, "invalid request body", http.StatusBadRequest)
		return
	}

	m.handleIngestionRequest(req)

	m.sdk.HTTPServer.SendSuccessResponse(w, http.StatusAccepted, nil)
}

type caidoIngestRequest struct {
	RequestURL string `json:"requestUrl"`
	Request    string `json:"request"`
	Response   string `json:"response"`
}

func (m *ingestionModule) handleIngestionCaidoIngestionEndpoint(w http.ResponseWriter, r *http.Request) {
	var req caidoIngestRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		m.sdk.HTTPServer.SendErrorResponse(w, "invalid request body", http.StatusBadRequest)
		return
	}

	ingestionRequest, err := mapCaidoRequest(req)
	if err != nil {
		m.sdk.HTTPServer.SendErrorResponse(w, "failed to map caido request", http.StatusBadRequest)
		return
	}

	m.handleIngestionRequest(ingestionRequest)

	m.sdk.HTTPServer.SendSuccessResponse(w, http.StatusAccepted, nil)
}

func (m *ingestionModule) handleIngestionRequest(req IngestionRequest) {
	m.sdk.InMemoryEventBus.Publish(TopicIngestionRequestReceived, eventbus.Message{
		Data: EventIngestionRequestReceived{
			IngestionRequest: &req,
		},
	})
}
