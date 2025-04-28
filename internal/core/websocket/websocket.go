package websocket

import (
	"encoding/json"
	"log/slog"
	"net/http"
	"sync"

	"github.com/go-chi/chi"
	"github.com/gorilla/websocket"
)

type wsServer struct {
	router       chi.Router
	upgrader     websocket.Upgrader
	clients      map[*websocket.Conn]bool
	clientsMutex sync.RWMutex
	log          *slog.Logger

	handlersMutex sync.RWMutex
	handlers      map[string]WebsocketHandler
}

func NewWebsocketServer(r chi.Router, logger *slog.Logger) *wsServer {
	wsServer := &wsServer{
		router: r,
		upgrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				return true // In production, implement proper origin checking
			},
		},
		clients: make(map[*websocket.Conn]bool),
		log:     logger,
	}

	r.HandleFunc("/ws", wsServer.handleWebsocket)

	return wsServer
}

func (s *wsServer) handleWebsocket(w http.ResponseWriter, r *http.Request) {
	conn, err := s.upgrader.Upgrade(w, r, nil)
	if err != nil {
		s.log.Error("failed to upgrade connection to websocket", "err", err)
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
		var msg WebsocketMessage
		err := conn.ReadJSON(&msg)
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				s.log.Error("websocket read error", "err", err)
			}
			break
		}

		handler, found := s.handlers[msg.Type]
		if !found {
			s.SendError(conn, msg.ID, "unknown message type")
			continue
		}

		handler(msg, conn)
	}
}

func (s *wsServer) SendError(conn *websocket.Conn, msgID string, errorMsg string) {
	payload := ErrorResponse{Message: errorMsg}
	data, err := json.Marshal(payload)
	if err != nil {
		s.log.Error("failed to marshal payload", "err", err)
		return
	}

	response := WebsocketMessage{
		Type:    MsgTypeError,
		ID:      msgID,
		Payload: data,
	}

	if err := conn.WriteJSON(response); err != nil {
		s.log.Error("failed to send error response", "err", err)
	}
}

func (s *wsServer) SendResponse(conn *websocket.Conn, msgID string, msgType string, payload interface{}) {
	data, err := json.Marshal(payload)
	if err != nil {
		s.log.Error("failed to marshal payload", "err", err)
		return
	}

	response := WebsocketMessage{
		Type:    msgType,
		ID:      msgID,
		Payload: data,
	}

	if err := conn.WriteJSON(response); err != nil {
		s.log.Error("failed to send response", "err", err)
		return
	}
}

func (s *wsServer) RegisterHandler(msgType string, handler WebsocketHandler) {
	s.handlersMutex.Lock()
	defer s.handlersMutex.Unlock()
	s.handlers[msgType] = handler
}
