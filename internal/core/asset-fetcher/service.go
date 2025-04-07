package assetfetcher

import (
	"bytes"
	"compress/gzip"
	"context"
	"crypto/tls"
	"io"
	"net"
	"net/http"
	"strings"
	"time"

	"go.uber.org/ratelimit"

	"github.com/francisconeves97/jxscout/internal/core/errutil"
)

type AssetFetcher interface {
	RateLimitedGet(ctx context.Context, url string, headers map[string]string) (string, bool, error)
	Get(ctx context.Context, url string, headers map[string]string) (string, bool, error)
}

type assetFetcherImpl struct {
	client      *http.Client
	rateLimiter ratelimit.Limiter
}

type AssetFetcherOptions struct {
	RateLimitingMaxRequestsPerMinute int
	RateLimitingMaxRequestsPerSecond int
}

func NewAssetFetcher(options AssetFetcherOptions) *assetFetcherImpl {
	// taken from https://github.com/sweetbbak/go-cloudflare-bypass
	tlsConfig := http.DefaultTransport.(*http.Transport).TLSClientConfig

	c := &http.Client{
		Transport: &http.Transport{
			TLSHandshakeTimeout: 30 * time.Second,
			DisableKeepAlives:   false,

			TLSClientConfig: &tls.Config{
				CipherSuites: []uint16{
					tls.TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,
					tls.TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,
					tls.TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,
					tls.TLS_AES_128_GCM_SHA256,
					tls.VersionTLS13,
					tls.VersionTLS10,
				},
				InsecureSkipVerify: true, // Disable certificate verification
			},
			DialTLS: func(network, addr string) (net.Conn, error) {
				return tls.Dial(network, addr, tlsConfig)
			},
		},
	}

	var rateLimiter ratelimit.Limiter

	if options.RateLimitingMaxRequestsPerMinute != 0 {
		rateLimiter = ratelimit.New(options.RateLimitingMaxRequestsPerMinute, ratelimit.Per(time.Minute))
	} else if options.RateLimitingMaxRequestsPerSecond != 0 {
		rateLimiter = ratelimit.New(options.RateLimitingMaxRequestsPerSecond, ratelimit.Per(time.Second))
	} else {
		rateLimiter = ratelimit.NewUnlimited()
	}

	return &assetFetcherImpl{
		client:      c,
		rateLimiter: rateLimiter,
	}
}

func (s *assetFetcherImpl) RateLimitedGet(ctx context.Context, url string, headers map[string]string) (string, bool, error) {
	s.rateLimiter.Take()

	return s.Get(ctx, url, headers)
}

// Get is a regular HTTP get but handles GZIP and adds headers to avoid being detected as bot.
func (s *assetFetcherImpl) Get(ctx context.Context, url string, headers map[string]string) (string, bool, error) {
	req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
	if err != nil {
		return "", false, errutil.Wrap(err, "failed to create request")
	}

	req.Header.Set("accept", "*/*")
	req.Header.Set("accept-language", "en-GB,en-US;q=0.9,en;q=0.8")
	req.Header.Set("sec-fetch-site", "same-origin")
	req.Header.Set("sec-fetch-mode", "cors")
	req.Header.Set("sec-fetch-dest", "script")
	req.Header.Set("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36")

	for key, value := range headers {
		req.Header.Set(key, value)
	}

	req.Header.Set("accept-encoding", "gzip")

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
