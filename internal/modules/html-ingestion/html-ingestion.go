package htmlingestion

import (
	"errors"
	"fmt"
	"net/http"
	"net/url"
	"strings"

	assetservice "github.com/francisconeves97/jxscout/internal/core/asset-service"
	"github.com/francisconeves97/jxscout/internal/core/common"
	"github.com/francisconeves97/jxscout/internal/core/errutil"
	"github.com/francisconeves97/jxscout/internal/modules/ingestion"
	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"
)

type htmlIngestionModule struct {
	sdk *jxscouttypes.ModuleSDK
}

func NewHTMLIngestionModule() jxscouttypes.Module {
	return &htmlIngestionModule{}
}

func (m *htmlIngestionModule) Initialize(sdk *jxscouttypes.ModuleSDK) error {
	m.sdk = sdk

	go func() {
		err := m.subscribeIngestionRequestTopic()
		if err != nil {
			m.sdk.Logger.Error("failed to subscribe to ingestion request topic", "err", err)
			return
		}
	}()

	return nil
}

func (m *htmlIngestionModule) subscribeIngestionRequestTopic() error {
	messages, err := m.sdk.InMemoryEventBus.Subscribe(ingestion.TopicIngestionRequestReceived)
	if err != nil {
		return errutil.Wrap(err, "failed to subscribe to ingestion request topic")
	}

	for msg := range messages {
		event, ok := msg.Data.(ingestion.EventIngestionRequestReceived)
		if !ok {
			m.sdk.Logger.Error("expected event EventIngestionRequestReceived but event is other type")
			continue
		}

		err := m.handleIngestionRequest(event.IngestionRequest)
		if err != nil {
			m.sdk.Logger.Error("error handling ingestion request", "err", err, "request_url", event.IngestionRequest.Request.URL)
			continue
		}
	}

	return nil
}

func (m *htmlIngestionModule) handleIngestionRequest(req ingestion.IngestionRequest) error {
	err := m.validateIngestionRequest(&req)
	if err != nil {
		m.sdk.Logger.Debug("request is not valid", "err", err, "req_url", req.Request.URL)
		return nil // request is not valid, skip
	}

	m.sdk.Logger.Debug("htmlingestion - handling ingestion request", "req_url", req.Request.URL)

	htmlPath, err := common.NormalizeHTMLURL(req.Request.URL)
	if err != nil {
		return errutil.Wrap(err, "failed to join html path with (index).html")
	}

	m.sdk.Logger.Debug("htmlingestion - saving html asset", "html_path", htmlPath)

	m.sdk.AssetService.AsyncSaveAsset(m.sdk.Ctx, assetservice.Asset{
		URL:            htmlPath,
		Content:        req.Response.Body,
		ContentType:    common.ContentTypeHTML,
		Project:        m.sdk.Options.ProjectName,
		RequestHeaders: req.Request.Headers,
	})

	extractedJS, err := extractJS(req.Response.Body, req.Request.URL)
	if err != nil {
		return errutil.Wrap(err, "failed to extract JS")
	}

	for i, content := range extractedJS.inlineScripts {
		inlinePath, err := url.JoinPath(req.Request.URL, fmt.Sprintf("(index).%d.inline.js", i))
		if err != nil {
			return errutil.Wrap(err, "failed to join inline js path")
		}

		m.sdk.AssetService.AsyncSaveAsset(m.sdk.Ctx, assetservice.Asset{
			URL:            inlinePath,
			Content:        content,
			ContentType:    common.ContentTypeJS,
			Project:        m.sdk.Options.ProjectName,
			RequestHeaders: req.Request.Headers,
			IsInlineJS:     true,
			Parent: &assetservice.Asset{
				URL: htmlPath,
			},
		})
	}

	return nil
}

func (m *htmlIngestionModule) getContentType(req ingestion.IngestionRequest) string {
	headers := req.Response.Headers

	return headers["Content-Type"]
}

func (m *htmlIngestionModule) validateIngestionRequest(req *ingestion.IngestionRequest) error {
	if !m.sdk.Scope.IsInScope(req.Request.URL) {
		return errors.New("request is not in scope")
	}

	if req.Response.Status != http.StatusOK {
		return errors.New("response status should be ok")
	}

	contentTypeHeader := m.getContentType(*req)
	if !strings.Contains(contentTypeHeader, "html") {
		// try to detect from the response body
		contentType := common.DetectContentType(req.Response.Body)

		m.sdk.Logger.Debug("htmlingestion - detected content from response body", "url", req.Request.URL, "content-type", contentType, "content-type-header", contentTypeHeader)

		if contentType != common.ContentTypeHTML {
			return errors.New("content type is not HTML")
		}
	}

	req.Request.URL = common.NormalizeURL(req.Request.URL)

	return nil
}
