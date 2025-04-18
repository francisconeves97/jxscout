package chunkdiscoverer

import (
	"bufio"
	"context"
	_ "embed"
	"fmt"
	"io"
	"net/url"
	"os"
	"os/exec"
	"path"
	"path/filepath"
	"strings"
	"sync"

	assetservice "github.com/francisconeves97/jxscout/internal/core/asset-service"
	"github.com/francisconeves97/jxscout/internal/core/common"
	"github.com/francisconeves97/jxscout/internal/core/errutil"
	concurrentqueue "github.com/francisconeves97/jxscout/pkg/concurrent-queue"
	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"
)

//go:embed chunk-discoverer.js
var chunkDiscovererBinary []byte

type chunkDiscovererModule struct {
	sdk                       *jxscouttypes.ModuleSDK
	queue                     concurrentqueue.Queue[assetservice.Asset]
	chunkDiscovererBinaryPath string
}

func NewChunkDiscovererModule(concurrency int, chunkBruteForceLimit int) *chunkDiscovererModule {
	return &chunkDiscovererModule{
		queue: concurrentqueue.NewQueue[assetservice.Asset](concurrency),
	}
}

func (m *chunkDiscovererModule) Initialize(sdk *jxscouttypes.ModuleSDK) error {
	m.sdk = sdk

	go func() {
		err := m.subscribeAssetSavedEvent()
		if err != nil {
			m.sdk.Logger.Error("failed to subscribe to asset saved topic", "err", err)
		}
	}()

	m.initializeQueueHandler()

	saveDir := path.Join(common.GetPrivateDirectory(), "extracted")

	// Create the directory if it doesn't exist
	if err := os.MkdirAll(saveDir, 0755); err != nil {
		return errutil.Wrap(err, "failed to create binaries directory")
	}

	// Define the path for the extracted binary
	binaryPath := filepath.Join(saveDir, "chunk-discoverer.js")
	if err := os.WriteFile(binaryPath, chunkDiscovererBinary, 0755); err != nil {
		return errutil.Wrap(err, "failed to write chunk discoverer file")
	}

	m.chunkDiscovererBinaryPath = binaryPath

	return nil
}

var validChunkDiscovererContentTypes = map[common.ContentType]bool{
	common.ContentTypeJS: true,
}

func (m *chunkDiscovererModule) initializeQueueHandler() {
	m.queue.StartConsumers(func(ctx context.Context, asset assetservice.Asset) {
		err := m.discoverPossibleChunks(asset)
		if err != nil {
			m.sdk.Logger.ErrorContext(ctx, "failed to discover chunks", "err", err, "asset_url", asset.URL)
			return
		}
	})
}

func (m *chunkDiscovererModule) subscribeAssetSavedEvent() error {
	messages, err := m.sdk.EventBus.Subscribe(assetservice.TopicAssetSaved)
	if err != nil {
		return errutil.Wrap(err, "failed to subscribe to ingestion request topic")
	}

	for msg := range messages {
		event, ok := msg.Data.(assetservice.EventAssetSaved)
		if !ok {
			m.sdk.Logger.Error("expected event EventAssetSaved but event is other type")
			continue
		}

		if isValid, ok := validChunkDiscovererContentTypes[event.Asset.ContentType]; !ok || !isValid {
			continue
		}

		if !m.sdk.Scope.IsInScope(event.Asset.URL) {
			m.sdk.Logger.Debug("skipping chunk processing because asset is not in scope", "asset_url", event.Asset.URL)
			continue
		}

		m.queue.Produce(m.sdk.Ctx, event.Asset)
	}

	return nil
}

func (s *chunkDiscovererModule) discoverPossibleChunks(asset assetservice.Asset) error {
	chunksRaw, err := s.execChunkDiscoverer(asset)
	if err != nil {
		return errutil.Wrap(err, "failed to exec chunk discoverer")
	}

	chunks := []string{}

	parsedURL, err := url.Parse(asset.URL)
	if err != nil {
		return errutil.Wrap(err, "failed to parse original url")
	}

	for _, chunk := range chunksRaw {
		originalPathParts := strings.Split(parsedURL.Path, "/")
		chunkParts := strings.Split(chunk, "/")

		// Find the common part between the original path and the chunk
		commonIndex := -1
		for i := len(originalPathParts) - 1; i >= 0; i-- {
			firstPart := ""

			for _, part := range chunkParts {
				if strings.TrimSpace(part) != "" {
					firstPart = part
					break
				}
			}

			if len(chunkParts) > 0 && originalPathParts[i] == firstPart && strings.TrimSpace(originalPathParts[i]) != "" && strings.TrimSpace(firstPart) != "" {
				commonIndex = i
				break
			}
		}

		var newPathParts []string
		if commonIndex != -1 {
			// If there's a common part, use the original path up to that point
			newPathParts = originalPathParts[:commonIndex]
		} else {
			// If there's no common part, use the original path except the last segment
			newPathParts = originalPathParts[:len(originalPathParts)-1]
		}

		// Append the chunk parts
		newPathParts = append(newPathParts, chunkParts...)

		newPath := strings.Join(newPathParts, "/")
		newURL := &url.URL{
			Scheme: parsedURL.Scheme,
			Host:   parsedURL.Hostname(),
			Path:   newPath,
		}
		chunks = append(chunks, newURL.String())
	}

	if len(chunks) > 0 {
		s.sdk.Logger.Info("discovered possible chunks 🔎", "chunks", chunks, "asset_url", asset.URL)
	}
	wg := &sync.WaitGroup{}

	for _, chunk := range chunks {
		wg.Add(1)
		go func() {
			defer wg.Done()

			content, found, err := s.sdk.AssetFetcher.RateLimitedGet(s.sdk.Ctx, chunk, asset.RequestHeaders)
			if err != nil {
				s.sdk.Logger.Error("failed to perform get request", "err", err)
				return
			}
			if !found {
				s.sdk.Logger.Debug("asset not found", "asset_url", chunk)
				return
			}

			asset := assetservice.Asset{
				URL:         chunk,
				ContentType: common.ContentTypeJS,
				Content:     content,
			}

			if common.StrPtr(asset.GetParentURL()) != "" {
				asset.Parent = &assetservice.Asset{
					URL: *asset.GetParentURL(),
				}
			}

			s.sdk.AssetService.AsyncSaveAsset(s.sdk.Ctx, asset)
		}()
	}

	return nil
}

func (s *chunkDiscovererModule) execChunkDiscoverer(asset assetservice.Asset) ([]string, error) {
	// Prepare the command to run the JavaScript script with Bun
	cmd := exec.Command("bun", "run", s.chunkDiscovererBinaryPath, asset.Path, fmt.Sprintf("%d", s.sdk.Options.ChunkDiscovererBruteForceLimit))

	stdout, err := cmd.StdoutPipe()
	if err != nil {
		return nil, errutil.Wrap(err, "error creating stdout pipe")
	}
	stderr, err := cmd.StderrPipe()
	if err != nil {
		return nil, errutil.Wrap(err, "error creating stderr pipe")
	}

	if err := cmd.Start(); err != nil {
		return nil, errutil.Wrap(err, "error starting command")
	}

	var chunks []string
	scanner := bufio.NewScanner(stdout)
	for scanner.Scan() {
		chunks = append(chunks, scanner.Text())
	}

	// Check for errors in stderr
	stderrBytes, err := io.ReadAll(stderr)
	if err != nil {
		return nil, errutil.Wrap(err, "failed to read stderr")
	}
	if len(stderrBytes) > 0 {
		return nil, fmt.Errorf("error executing chunk discoverer: %s", strings.TrimSpace(string(stderrBytes)))
	}

	// Wait for the command to finish
	if err := cmd.Wait(); err != nil {
		return nil, errutil.Wrap(err, "error running JavaScript script")
	}

	return chunks, nil
}
