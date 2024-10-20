package assetservice

import (
	"bytes"
	"compress/gzip"
	"context"
	"io"
	"net/http"
	"strings"

	"github.com/francisconeves97/jxscout/internal/core/errutil"
)

type httpClient interface {
	Get(ctx context.Context, url string) (string, bool, error)
}

type httpClientImpl struct {
	client *http.Client
}

func NewHTTPClient() *httpClientImpl {
	return &httpClientImpl{
		client: http.DefaultClient,
	}
}

// Get is a regular HTTP get but handles GZIP and adds headers to avoid being detected as bot.
func (s *httpClientImpl) Get(ctx context.Context, url string) (string, bool, error) {
	req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
	if err != nil {
		return "", false, errutil.Wrap(err, "failed to create request")
	}

	req.Header.Set("accept", "*/*")
	req.Header.Set("accept-encoding", "gzip")
	req.Header.Set("accept-language", "en-GB,en-US;q=0.9,en;q=0.8")
	req.Header.Set("sec-fetch-site", "same-origin")
	req.Header.Set("sec-fetch-mode", "cors")
	req.Header.Set("sec-fetch-dest", "script")
	req.Header.Set("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36")

	resp, err := s.client.Do(req)
	if err != nil {
		return "", false, errutil.Wrap(err, "failed to perform request")
	}
	defer resp.Body.Close()

	// Read the entire response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", false, errutil.Wrap(err, "error reading response body")
	}

	// Check if the response is gzipped
	contentEncoding := resp.Header.Get("Content-Encoding")
	isGzipped := strings.Contains(contentEncoding, "gzip")

	// If not marked as gzipped, check for gzip magic number
	if !isGzipped {
		isGzipped = len(body) > 2 && body[0] == 0x1f && body[1] == 0x8b
	}

	// If gzipped, decompress
	if isGzipped {
		reader, err := gzip.NewReader(bytes.NewReader(body))
		if err != nil {
			return "", false, errutil.Wrap(err, "error creating gzip reader")
		}
		defer reader.Close()

		decompressed, err := io.ReadAll(reader)
		if err != nil {
			return "", false, errutil.Wrap(err, "error decompressing response body")
		}
		body = decompressed
	}

	return string(body), resp.StatusCode == http.StatusOK, nil
}
