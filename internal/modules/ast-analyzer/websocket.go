package astanalyzer

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sync"

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

	// Get analysis results
	analysis, err := s.module.repo.getAnalysisByAssetID(s.module.sdk.Ctx, asset.ID)
	if err != nil {
		s.sendError(conn, msgID, fmt.Sprintf("failed to get analysis: %v", err))
		return
	}
	if analysis == nil {
		s.sendError(conn, msgID, "analysis not found")
		return
	}

	// Parse results
	var results map[string]interface{}
	if err := json.Unmarshal([]byte(analysis.Results), &results); err != nil {
		s.sendError(conn, msgID, fmt.Sprintf("failed to parse analysis results: %v", err))
		return
	}

	// Send response
	response := analysisResponse{
		FilePath: req.FilePath,
		Results:  results,
	}

	responseMsg := wsMessage{
		Type:    MsgTypeAnalysis,
		ID:      msgID,
		Payload: mustMarshalJSON(response),
	}

	if err := conn.WriteJSON(responseMsg); err != nil {
		s.module.sdk.Logger.Error("failed to send analysis response", "err", err)
	}
}

func (s *wsServer) sendError(conn *websocket.Conn, msgID, message string) {
	response := wsMessage{
		Type:    MsgTypeError,
		ID:      msgID,
		Payload: mustMarshalJSON(errorResponse{Message: message}),
	}

	if err := conn.WriteJSON(response); err != nil {
		s.module.sdk.Logger.Error("failed to send error response", "err", err)
	}
}

func mustMarshalJSON(v interface{}) json.RawMessage {
	data, err := json.Marshal(v)
	if err != nil {
		panic(err)
	}
	return data
}
