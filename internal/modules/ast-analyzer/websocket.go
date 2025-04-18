package astanalyzer

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sync"

	assetservice "github.com/francisconeves97/jxscout/internal/core/asset-service"
	"github.com/gorilla/websocket"
)

// WebSocket message types
const (
	MsgTypeGetAnalysis = "getAnalysis"
	MsgTypeAnalysis    = "analysis"
	MsgTypeError       = "error"
)

// WebSocket message structures
type wsMessage struct {
	Type    string          `json:"type"`
	ID      string          `json:"id"`
	Payload json.RawMessage `json:"payload"`
}

type getAnalysisRequest struct {
	FilePath string `json:"filePath"`
}

type analysisResponse struct {
	FilePath string                 `json:"filePath"`
	Results  map[string]interface{} `json:"results"`
}

type errorResponse struct {
	Message string `json:"message"`
}

type wsServer struct {
	module       *astAnalyzerModule
	upgrader     websocket.Upgrader
	clients      map[*websocket.Conn]bool
	clientsMutex sync.RWMutex
}

func newWSServer(module *astAnalyzerModule) *wsServer {
	return &wsServer{
		module: module,
		upgrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				return true // In production, implement proper origin checking
			},
		},
		clients: make(map[*websocket.Conn]bool),
	}
}

func (s *wsServer) handleWebSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := s.upgrader.Upgrade(w, r, nil)
	if err != nil {
		s.module.sdk.Logger.Error("failed to upgrade connection to websocket", "err", err)
		return
	}
	defer conn.Close()

	// Register client
	s.clientsMutex.Lock()
	s.clients[conn] = true
	s.clientsMutex.Unlock()

	// Cleanup on disconnect
	defer func() {
		s.clientsMutex.Lock()
		delete(s.clients, conn)
		s.clientsMutex.Unlock()
	}()

	for {
		var msg wsMessage
		err := conn.ReadJSON(&msg)
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				s.module.sdk.Logger.Error("websocket read error", "err", err)
			}
			break
		}

		switch msg.Type {
		case MsgTypeGetAnalysis:
			var req getAnalysisRequest
			if err := json.Unmarshal(msg.Payload, &req); err != nil {
				s.sendError(conn, msg.ID, "invalid request payload")
				continue
			}
			s.handleGetAnalysis(conn, msg.ID, req)
		default:
			s.sendError(conn, msg.ID, "unknown message type")
		}
	}
}

func (s *wsServer) handleGetAnalysis(conn *websocket.Conn, msgID string, req getAnalysisRequest) {
	// Find asset by file path
	asset, err := s.module.repo.getAssetByPath(s.module.sdk.Ctx, req.FilePath)
	if err != nil {
		s.sendError(conn, msgID, fmt.Sprintf("failed to find asset: %v", err))
		return
	}
	if asset == nil {
		s.sendError(conn, msgID, "asset not found")
		return
	}

	assetObj := assetservice.Asset{
		ID:   asset.ID,
		Path: asset.Path,
	}

	// Trigger analysis
	if err := s.module.analyzeAsset(assetObj); err != nil {
		s.sendError(conn, msgID, fmt.Sprintf("failed to analyze asset: %v", err))
		return
	}

	// Get the analyses again after running the analysis
	analyses, err := s.module.repo.getAnalysesByAssetID(s.module.sdk.Ctx, asset.ID)
	if err != nil {
		s.sendError(conn, msgID, fmt.Sprintf("failed to get analyses after running analysis: %v", err))
		return
	}

	// Create a map of results keyed by analyzer name
	results := make(map[string]interface{})
	for _, analysis := range analyses {
		var analyzerResults interface{}
		if err := json.Unmarshal([]byte(analysis.Results), &analyzerResults); err != nil {
			s.module.sdk.Logger.Error("failed to parse analysis results", "err", err, "analyzer", analysis.Analyzer)
			continue
		}
		results[analysis.Analyzer] = analyzerResults
	}

	// Send response
	response := analysisResponse{
		FilePath: req.FilePath,
		Results:  results,
	}

	s.sendResponse(conn, msgID, response)
}

func (s *wsServer) sendError(conn *websocket.Conn, msgID string, errorMsg string) {
	response := wsMessage{
		Type:    MsgTypeError,
		ID:      msgID,
		Payload: mustMarshalJSON(errorResponse{Message: errorMsg}),
	}

	if err := conn.WriteJSON(response); err != nil {
		s.module.sdk.Logger.Error("failed to send error response", "err", err)
	}
}

func (s *wsServer) sendResponse(conn *websocket.Conn, msgID string, payload interface{}) {
	response := wsMessage{
		Type:    MsgTypeAnalysis,
		ID:      msgID,
		Payload: mustMarshalJSON(payload),
	}

	if err := conn.WriteJSON(response); err != nil {
		s.module.sdk.Logger.Error("failed to send response", "err", err)
	}
}

func mustMarshalJSON(v interface{}) json.RawMessage {
	data, err := json.Marshal(v)
	if err != nil {
		panic(err)
	}
	return data
}
