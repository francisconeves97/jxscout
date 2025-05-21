package astanalyzer

import (
	"encoding/json"
	"errors"
	"fmt"

	"github.com/francisconeves97/jxscout/internal/core/errutil"
	jxwebsocket "github.com/francisconeves97/jxscout/internal/core/websocket"
	"github.com/francisconeves97/jxscout/internal/modules/beautifier"
	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"
	"github.com/gorilla/websocket"
)

const (
	MsgTypeGetAnalysisRequest  = "getAnalysisRequest"
	MsgTypeGetAnalysisResponse = "getAnalysisResponse"
)

type wsServer struct {
	sdk    *jxscouttypes.ModuleSDK
	module *astAnalyzerModule
}

func newWsServer(sdk *jxscouttypes.ModuleSDK, module *astAnalyzerModule) *wsServer {
	s := &wsServer{
		sdk:    sdk,
		module: module,
	}

	s.initialize()

	return s
}

func (s *wsServer) initialize() {
	s.sdk.WebsocketServer.RegisterHandler(MsgTypeGetAnalysisRequest, s.getAnalysisHandler)
}

type getAnalysisRequest struct {
	FilePath string `json:"filePath"`
}

type getAnalysisResponse struct {
	Results []ASTAnalyzerTreeNode `json:"results"`
}

func (s *wsServer) getAnalysisHandler(msg jxwebsocket.WebsocketMessage, conn *websocket.Conn) {
	var req getAnalysisRequest
	if err := json.Unmarshal(msg.Payload, &req); err != nil {
		s.sdk.WebsocketServer.SendErrorResponse(conn, msg.ID, MsgTypeGetAnalysisResponse, fmt.Sprintf("invalid request payload: %s", err.Error()))
		return
	}

	s.sdk.Logger.Debug("get analysis handler request received", "path", req.FilePath)

	tree, err := s.getAnalysis(req)
	if err != nil {
		s.sdk.WebsocketServer.SendErrorResponse(conn, msg.ID, MsgTypeGetAnalysisResponse, fmt.Sprintf("failed to get analysis: %s", err.Error()))
		return
	}

	s.sdk.WebsocketServer.SendResponse(conn, msg.ID, MsgTypeGetAnalysisResponse, tree)
}

func (s *wsServer) getAnalysis(req getAnalysisRequest) (getAnalysisResponse, error) {
	// Find asset by file path
	asset, err := s.module.repo.getAssetByPath(s.sdk.Ctx, req.FilePath)
	if err != nil {
		return getAnalysisResponse{}, errutil.Wrap(err, "failed to find asset")
	}
	if asset == nil {
		return getAnalysisResponse{}, errors.New("asset not found")
	}

	if !asset.IsBeautified {
		err := beautifier.BeautifyAsset(s.sdk.Ctx, asset.ID, asset.Path, asset.ContentType, s.sdk.Database)
		if err != nil {
			return getAnalysisResponse{}, errutil.Wrap(err, "failed to beautify asset")
		}
	}

	// Trigger analysis
	analysis, err := s.module.analyzeAsset(*asset)
	if err != nil {
		return getAnalysisResponse{}, errutil.Wrap(err, "failed to analyze asset")
	}

	matches, err := analysis.GetMatches()
	if err != nil {
		return getAnalysisResponse{}, errutil.Wrap(err, "failed to get matches")
	}

	// Send response
	response := getAnalysisResponse{
		Results: formatMatchesV1(matches),
	}

	return response, nil
}
