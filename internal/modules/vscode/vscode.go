package vscode

import (
	"encoding/json"
	"net/http"
	"sync"

	assetservice "github.com/francisconeves97/jxscout/internal/core/asset-service"
	"github.com/francisconeves97/jxscout/internal/core/errutil"
	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"
	"github.com/gorilla/websocket"
)

type AssetTreeNode struct {
	ID       string          `json:"id"`
	Name     string          `json:"name"`
	Type     string          `json:"type"`
	FilePath string          `json:"filePath"`
	Children []AssetTreeNode `json:"children,omitempty"`
}

type vscodeModule struct {
	sdk      *jxscouttypes.ModuleSDK
	upgrader websocket.Upgrader
	clients  map[*websocket.Conn]bool
	mu       sync.RWMutex
}

func NewVSCodeModule(concurrency int) *vscodeModule {
	return &vscodeModule{
		upgrader: websocket.Upgrader{},
		clients:  make(map[*websocket.Conn]bool),
	}
}

func (m *vscodeModule) Initialize(sdk *jxscouttypes.ModuleSDK) error {
	m.sdk = sdk

	sdk.Router.HandleFunc("/vscode/ws", m.handleWebSocket)

	go func() {
		err := m.subscribeAssetSavedEvent()
		if err != nil {
			sdk.Logger.Error("failed to subscribe to asset saved topic", "err", err)
		}
	}()

	return nil
}

func (m *vscodeModule) handleWebSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := m.upgrader.Upgrade(w, r, nil)
	if err != nil {
		m.sdk.Logger.Error("Failed to upgrade connection", "error", err)
		return
	}

	m.mu.Lock()
	m.clients[conn] = true
	m.mu.Unlock()
	defer func() {
		m.mu.Lock()
		delete(m.clients, conn)
		m.mu.Unlock()
		conn.Close()
	}()

	for {
		messageType, _, err := conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				m.sdk.Logger.Error("Error reading message", "error", err)
			}
			break
		}

		if messageType == websocket.CloseMessage {
			break
		}
	}
}

func (m *vscodeModule) subscribeAssetSavedEvent() error {
	messages, err := m.sdk.EventBus.Subscribe(assetservice.TopicAssetSaved)
	if err != nil {
		return errutil.Wrap(err, "failed to subscribe to asset saved topic")
	}

	for msg := range messages {
		_, ok := msg.Data.(assetservice.EventAssetSaved)
		if !ok {
			m.sdk.Logger.Error("expected event EventAssetSaved but event is other type")
			continue
		}

		if err := m.broadcastAssetTree(); err != nil {
			m.sdk.Logger.Error("Failed to broadcast asset tree", "error", err)
		}
	}

	return nil
}

func (m *vscodeModule) broadcastAssetTree() error {
	m.mu.RLock()
	defer m.mu.RUnlock()

	assets, err := m.sdk.AssetService.GetProjectAssets(m.sdk.Options.ProjectName)
	if err != nil {
		return err
	}

	tree := buildAssetTree(assets)

	data, err := json.Marshal(tree)
	if err != nil {
		return err
	}

	for client := range m.clients {
		err := client.WriteMessage(websocket.TextMessage, data)
		if err != nil {
			m.sdk.Logger.Error("Error sending message to client", "error", err)
			client.Close()
			delete(m.clients, client)
		}
	}

	return nil
}

func buildAssetTree(assets []jxscouttypes.Asset) AssetTreeNode {
	assetMap := make(map[string][]jxscouttypes.Asset)

	for _, asset := range assets {
		parentURL := ""
		if asset.Parent != nil {
			parentURL = asset.Parent.URL
		}
		assetMap[parentURL] = append(assetMap[parentURL], asset)
	}

	return buildTreeRecursive("", assetMap)
}

func buildTreeRecursive(parentURL string, assetMap map[string][]jxscouttypes.Asset) AssetTreeNode {
	var node AssetTreeNode

	children := assetMap[parentURL]

	if parentURL == "" {
		node.ID = "root"
		node.Name = "Assets"
		node.Type = "root"
	} else {
		for _, assets := range assetMap {
			for _, asset := range assets {
				if asset.URL == parentURL {
					node.ID = asset.URL
					node.Name = asset.URL
					node.Type = asset.ContentType
					break
				}
			}
		}
	}

	for _, child := range children {
		node.Children = append(node.Children, buildTreeRecursive(child.URL, assetMap))
	}

	return node
}
