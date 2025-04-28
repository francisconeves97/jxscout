package websocket

import (
	"encoding/json"

	"github.com/gorilla/websocket"
)

const (
	MsgTypeError = "error"
)

type WebsocketHandler = func(msg WebsocketMessage, conn *websocket.Conn)

type WebsocketMessage struct {
	Type    string          `json:"type"`
	ID      string          `json:"id"`
	Payload json.RawMessage `json:"payload"`
}

type ErrorResponse struct {
	Message string `json:"message"`
}
