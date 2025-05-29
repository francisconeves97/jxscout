package chunkdiscoverer

import (
	"bufio"
	"context"
	_ "embed"
	"encoding/json"
	"fmt"
	"io"
	"net/url"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"sync"
	"time"

	assetservice "github.com/francisconeves97/jxscout/internal/core/asset-service"
	"github.com/francisconeves97/jxscout/internal/core/common"
	"github.com/francisconeves97/jxscout/internal/core/dbeventbus"
	"github.com/francisconeves97/jxscout/internal/core/errutil"
	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"
)

//go:embed chunk-discoverer.js
var chunkDiscovererBinary []byte

type chunkDiscovererModule struct {
	sdk                       *jxscouttypes.ModuleSDK
	concurrency               int
	chunkDiscovererBinaryPath string
}

func NewChunkDiscovererModule(concurrency int, chunkBruteForceLimit int) *chunkDiscovererModule {
	return &chunkDiscovererModule{
		concurrency: concurrency,
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

	saveDir := filepath.Join(common.GetPrivateDirectoryRoot(), "extracted")

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

func (m *chunkDiscovererModule) subscribeAssetSavedEvent() error {
	err := m.sdk.DBEventBus.Subscribe(m.sdk.Ctx, assetservice.TopicAssetSaved, "chunkdiscoverer", func(ctx context.Context, payload []byte) error {
		// unmarshal payload
		var event assetservice.EventAssetSaved
		err := json.Unmarshal(payload, &event)
		if err != nil {
			return errutil.Wrap(err, "failed to unmarshal payload")
		}

		asset, err := m.sdk.AssetService.GetAssetByID(ctx, event.AssetID)
		if err != nil {
			return dbeventbus.NewRetriableError(errutil.Wrap(err, "failed to get asset"))
		}

		err = m.handleAssetSavedEvent(ctx, asset)
		if err != nil {
			return errutil.Wrapf(err, "failed to handle asset saved event for asset (%s)", asset.URL)
		}

		return nil
	}, dbeventbus.Options{
		Concurrency:       m.concurrency,
		MaxRetries:        3,
		Backoff:           common.ExponentialBackoff,
		PollInterval:      1 * time.Second,
		HeartbeatInterval: 10 * time.Second,
	})
	if err != nil {
		return errutil.Wrap(err, "failed to subscribe to ingestion request topic")
	}

	return nil
}

func (m *chunkDiscovererModule) handleAssetSavedEvent(ctx context.Context, asset assetservice.Asset) error {
	if asset.IsInlineJS {
		return nil
	}

	if isValid, ok := validChunkDiscovererContentTypes[asset.ContentType]; !ok || !isValid {
		return nil
	}

	return m.discoverPossibleChunks(ctx, asset)
}

func (s *chunkDiscovererModule) discoverPossibleChunks(ctx context.Context, asset assetservice.Asset) error {
	chunksRaw, err := s.execChunkDiscoverer(ctx, asset)
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
	sem := make(chan struct{}, s.concurrency)

	for _, chunk := range chunks {
		wg.Add(1)
		sem <- struct{}{} // Acquire semaphore
		go func(chunkURL string) {
			defer wg.Done()
			defer func() { <-sem }() // Release semaphore

			content, found, err := s.sdk.AssetFetcher.RateLimitedGet(ctx, chunkURL, asset.RequestHeaders)
			if err != nil {
				s.sdk.Logger.Error("failed to perform get request", "err", err)
				return
			}
			if !found {
				s.sdk.Logger.Debug("asset not found", "asset_url", chunkURL)
				return
			}

			asset := assetservice.Asset{
				URL:               chunkURL,
				ContentType:       common.ContentTypeJS,
				Content:           &content,
				Project:           s.sdk.Options.ProjectName,
				RequestHeaders:    asset.RequestHeaders,
				IsChunkDiscovered: common.ToPtr(true),
				ChunkFromAssetID:  &asset.ID,
			}

			if common.StrPtr(asset.GetParentURL()) != "" {
				asset.Parent = &assetservice.Asset{
					URL: *asset.GetParentURL(),
				}
			}

			s.sdk.AssetService.AsyncSaveAsset(ctx, &asset)
		}(chunk)
	}

	wg.Wait()

	return nil
}

func (s *chunkDiscovererModule) execChunkDiscoverer(ctx context.Context, asset assetservice.Asset) ([]string, error) {
	// Prepare the command to run the JavaScript script with Bun
	cmd := exec.CommandContext(ctx, "bun", "run", s.chunkDiscovererBinaryPath, asset.Path, fmt.Sprintf("%d", s.sdk.Options.ChunkDiscovererBruteForceLimit))

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
