package jsingestion

import (
	"errors"
	"net/http"
	"strings"

	assetservice "github.com/francisconeves97/jxscout/internal/core/asset-service"
	"github.com/francisconeves97/jxscout/internal/core/common"
	"github.com/francisconeves97/jxscout/internal/core/errutil"
	"github.com/francisconeves97/jxscout/internal/modules/ingestion"
	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"
)

type jsIngestionModule struct {
	sdk               *jxscouttypes.ModuleSDK
	downloadReferedJS bool
}

func NewJSIngestionModule(downloadReferedJS bool) jxscouttypes.Module {
	return &jsIngestionModule{
		downloadReferedJS: downloadReferedJS,
	}
}

func (m *jsIngestionModule) Initialize(sdk *jxscouttypes.ModuleSDK) error {
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

func (m *jsIngestionModule) subscribeIngestionRequestTopic() error {
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

func (m *jsIngestionModule) handleIngestionRequest(req *ingestion.IngestionRequest) error {
	err := m.validateIngestionRequest(req)
	if err != nil {
		m.sdk.Logger.Debug("request is not valid", "err", err, "req_url", req.Request.URL)
		return nil // request is not valid, skip
	}

	var parentURL string
	referer := m.getReferer(req)
	if referer != "" {
		parentURL, err = common.NormalizeHTMLURL(m.getReferer(req))
		if err != nil {
			m.sdk.Logger.Error("failed to normalize html url", "err", err)
		}
	}

	if parentURL == "" {
		parentURL = common.NormalizeURL(m.getReferer(req))
	}

	m.sdk.AssetService.AsyncSaveAsset(m.sdk.Ctx, &assetservice.Asset{
		URL:            req.Request.URL,
		Content:        &req.Response.Body,
		ContentType:    common.ContentTypeJS,
		Project:        m.sdk.Options.ProjectName,
		RequestHeaders: req.Request.Headers,
		Parent: &assetservice.Asset{
			URL: parentURL,
		},
	})

	return nil
}

func (m *jsIngestionModule) getReferer(req *ingestion.IngestionRequest) string {
	headers := req.Request.Headers

	referer := headers["Referer"]

	return referer
}

func (m *jsIngestionModule) getContentType(req *ingestion.IngestionRequest) string {
	headers := req.Response.Headers

	return headers["Content-Type"]
}

func (m *jsIngestionModule) validateIngestionRequest(req *ingestion.IngestionRequest) error {
	if req == nil {
		return errors.New("received nil request")
	}

	if m.downloadReferedJS {
		if !m.sdk.Scope.IsInScope(req.Request.URL) && !m.sdk.Scope.IsInScope(m.getReferer(req)) {
			return errors.New("request is not in scope")
		}
	} else {
		if !m.sdk.Scope.IsInScope(req.Request.URL) {
			return errors.New("request is not in scope")
		}
	}

	if strings.HasSuffix(req.Request.URL, ".map") {
		return errors.New("should not be a JS map file")
	}

	if strings.ToUpper(req.Request.Method) != http.MethodGet {
		return errors.New("only expecting JS from GET method")
	}

	if req.Response.Status != http.StatusOK {
		return errors.New("response status should be ok")
	}

	if common.IsProbablyHTML([]byte(req.Response.Body)) {
		return errors.New("content type is not JS")
	}

	contentTypeHeader := m.getContentType(req)
	if !strings.Contains(contentTypeHeader, "javascript") {
		// try to detect from the response body
		contentType := common.DetectContentType(&req.Response.Body)

		m.sdk.Logger.Debug("jsingestion - detected content type from response body", "url", req.Request.URL, "content-type", contentType, "content-type-header", contentTypeHeader)

		if contentType != common.ContentTypeJS {
			return errors.New("content type is not JS")
		}
	}

	req.Request.URL = common.NormalizeURL(req.Request.URL)

	return nil
}
