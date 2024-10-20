package jxscout

import (
	"encoding/json"
	"log/slog"
	"net/http"

	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"
)

type httpServer struct {
	log *slog.Logger
}

func newHttpServer(logger *slog.Logger) jxscouttypes.HTTPServer {
	return &httpServer{
		log: logger,
	}
}

type apiResponse struct {
	Success bool   `json:"success,omitempty"`
	Result  any    `json:"result,omitempty"`
	Error   string `json:"error,omitempty"`
}

func (s *httpServer) sendJSONResponse(w http.ResponseWriter, status int, data any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
}

func (s *httpServer) SendSuccessResponse(w http.ResponseWriter, status int, result any) {
	response := apiResponse{
		Success: true,
		Result:  result,
	}
	s.sendJSONResponse(w, status, response)
}

func (s *httpServer) SendErrorResponse(w http.ResponseWriter, message string, status int) {
	response := apiResponse{
		Success: false,
		Error:   message,
	}
	s.sendJSONResponse(w, status, response)
}
