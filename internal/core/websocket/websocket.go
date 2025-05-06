package websocket

import (
	"context"
	"encoding/json"
	"fmt"
	"log/slog"
	"net/http"
	"sync"
	"time"

	"github.com/go-chi/chi"
	"github.com/gorilla/websocket"
)

type WebsocketServer struct {
	router       chi.Router
	upgrader     websocket.Upgrader
	clients      map[*websocket.Conn]bool
	clientsMutex sync.RWMutex
	log          *slog.Logger

	handlersMutex sync.RWMutex
	handlers      map[string]WebsocketHandler

	ctx    context.Context
	cancel context.CancelFunc
}

func NewWebsocketServer(r chi.Router, logger *slog.Logger) *WebsocketServer {
	ctx, cancel := context.WithCancel(context.Background())
	wsServer := &WebsocketServer{
		router: r,
		upgrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				return true
			},
		},
		clients:  make(map[*websocket.Conn]bool),
		log:      logger,
		handlers: make(map[string]WebsocketHandler),
		ctx:      ctx,
		cancel:   cancel,
	}

	r.HandleFunc("/ws", wsServer.handleWebsocket)

	return wsServer
}

// Shutdown gracefully shuts down the websocket server
func (s *WebsocketServer) Shutdown(timeout time.Duration) error {
	s.cancel() // Signal all goroutines to stop

	// Create a channel to signal when shutdown is complete
	done := make(chan struct{})

	// Start a goroutine to close all client connections
	go func() {
		s.clientsMutex.Lock()
		for conn := range s.clients {
			conn.WriteMessage(websocket.CloseMessage, websocket.FormatCloseMessage(websocket.CloseNormalClosure, "server shutting down"))
			conn.Close()
		}
		s.clientsMutex.Unlock()
		close(done)
	}()

	// Wait for either timeout or completion
	select {
	case <-done:
		return nil
	case <-time.After(timeout):
		return fmt.Errorf("shutdown timed out after %v", timeout)
	}
}

func (s *WebsocketServer) handleWebsocket(w http.ResponseWriter, r *http.Request) {
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

	// Set read deadline
	conn.SetReadDeadline(time.Now().Add(60 * time.Second))
	conn.SetPongHandler(func(string) error {
		conn.SetReadDeadline(time.Now().Add(60 * time.Second))
		return nil
	})

	// Start ping ticker
	ticker := time.NewTicker(30 * time.Second)
	defer ticker.Stop()

	// Start a goroutine to handle pings
	go func() {
		for {
			select {
			case <-ticker.C:
				if err := conn.WriteMessage(websocket.PingMessage, nil); err != nil {
					return
				}
			case <-s.ctx.Done():
				return
			}
		}
	}()

	for {
		select {
		case <-s.ctx.Done():
			return
		default:
			var msg WebsocketMessage
			err := conn.ReadJSON(&msg)
			if err != nil {
				if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
					s.log.Error("websocket read error", "err", err)
				}
				return
			}

			s.log.Debug("received websocket message", "msg_type", msg.Type, "msg_id", msg.ID)

			handler, found := s.handlers[msg.Type]
			if !found {
				s.SendGenericError(conn, msg.ID, "unknown message type")
				continue
			}

			handler(msg, conn)
		}
	}
}

func (s *WebsocketServer) SendGenericError(conn *websocket.Conn, msgID string, errorMsg string) {
	response := WebsocketMessage{
		Type:  MsgTypeError,
		ID:    msgID,
		Error: &ErrorResponse{Message: errorMsg},
	}

	if err := conn.WriteJSON(response); err != nil {
		s.log.Error("failed to send error response", "err", err)
	}
}

func (s *WebsocketServer) SendErrorResponse(conn *websocket.Conn, msgID string, msgType string, errorMessage string) {
	response := WebsocketMessage{
		Type:  msgType,
		ID:    msgID,
		Error: &ErrorResponse{Message: errorMessage},
	}

	if err := conn.WriteJSON(response); err != nil {
		s.log.Error("failed to send error response", "err", err)
	}
}

func (s *WebsocketServer) SendResponse(conn *websocket.Conn, msgID string, msgType string, payload interface{}) {
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

func (s *WebsocketServer) RegisterHandler(msgType string, handler WebsocketHandler) {
	s.handlersMutex.Lock()
	defer s.handlersMutex.Unlock()
	s.handlers[msgType] = handler
}
