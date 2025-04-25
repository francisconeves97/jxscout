package sourcemaps

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"net/url"
	"os"
	"regexp"
	"strconv"
	"strings"

	assetservice "github.com/francisconeves97/jxscout/internal/core/asset-service"
	"github.com/francisconeves97/jxscout/internal/core/dbeventbus"
	"github.com/francisconeves97/jxscout/internal/core/errutil"
	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"
)

// mostly based on https://github.com/denandz/sourcemapper/blob/master/main.go

type sourceMap struct {
	URL             *url.URL // parsed URL for the sourcemap
	GetterName      string
	OriginalContent string

	Version        int      `json:"version"`
	Sources        []string `json:"sources"`
	SourcesContent []string `json:"sourcesContent"`
}

func parseSourceMap(sourceMapContent []byte) (sourceMap, error) {
	var sm sourceMap

	err := json.Unmarshal(sourceMapContent, &sm)
	if err != nil {
		return sm, errutil.Wrap(err, "failed to unmarshal source map")
	}

	return sm, nil
}

type sourceMapURLGetter func(ctx context.Context, asset assetservice.Asset, sdk *jxscouttypes.ModuleSDK) (string, error)

type namedSourceMapURLGetter struct {
	name   string
	getter sourceMapURLGetter
}

func getSourceMapForAsset(ctx context.Context, asset assetservice.Asset, sdk *jxscouttypes.ModuleSDK) (sourceMap, bool, error) {
	// Define the priority queue of sourcemap URL getters
	getters := []namedSourceMapURLGetter{
		{
			name: "sourceMappingURL_comment",
			getter: func(ctx context.Context, asset assetservice.Asset, sdk *jxscouttypes.ModuleSDK) (string, error) {
				asset, err := sdk.AssetService.GetAssetByID(ctx, asset.ID)
				if err != nil {
					return "", errutil.Wrap(err, "failed to get asset")
				}

				body, err := os.ReadFile(asset.Path)
				if err != nil {
					return "", errutil.Wrap(err, "failed to read asset")
				}

				re := regexp.MustCompile(`\/\/[@#] sourceMappingURL=(.*)`)
				match := re.FindAllSubmatch(body, -1)

				if len(match) == 0 {
					return "", errors.New("no sourceMappingURL comment found")
				}

				// only the sourcemap at the end of the file should be valid
				return string(match[len(match)-1][1]), nil
			},
		},
		{
			name: "url_dot_map",
			getter: func(ctx context.Context, asset assetservice.Asset, sdk *jxscouttypes.ModuleSDK) (string, error) {
				return fmt.Sprintf("%s.map", asset.URL), nil
			},
		},
		{
			name: "sourcemap_header",
			getter: func(ctx context.Context, asset assetservice.Asset, sdk *jxscouttypes.ModuleSDK) (string, error) {
				if url := asset.RequestHeaders["SourceMap"]; url != "" {
					return url, nil
				}
				return "", errors.New("no SourceMap header found")
			},
		},
		{
			name: "x_sourcemap_header",
			getter: func(ctx context.Context, asset assetservice.Asset, sdk *jxscouttypes.ModuleSDK) (string, error) {
				if url := asset.RequestHeaders["X-SourceMap"]; url != "" {
					return url, nil
				}
				return "", errors.New("no X-SourceMap header found")
			},
		},
	}

	jsURL, err := url.Parse(asset.URL)
	if err != nil {
		return sourceMap{}, false, errutil.Wrap(err, "failed to parse asset URL")
	}

	// Try each getter in sequence
	for _, namedGetter := range getters {
		sourceMapURL, err := namedGetter.getter(ctx, asset, sdk)
		if err != nil {
			sdk.Logger.DebugContext(ctx, "failed to get source map URL", "error", err, "getter_name", namedGetter.name)
			continue // Try next getter
		}

		var sourceMapParsedURL *url.URL
		// handle absolute/relative rules
		sourceMapParsedURL, err = url.ParseRequestURI(sourceMapURL)
		if err != nil {
			sdk.Logger.DebugContext(ctx, "failed to parse source map URL", "error", err, "sourceMapURL", sourceMapURL, "jsURL", jsURL)
			sourceMapParsedURL, err = jsURL.Parse(sourceMapURL)
			if err != nil {
				sdk.Logger.DebugContext(ctx, "failed to parse relative source map URL", "error", err, "sourceMapURL", sourceMapURL, "jsURL", jsURL)
				continue
			}
		}

		if sourceMapParsedURL.Scheme == "data" {
			sourceMapContent, err := getSourceMapContentFromDataURI(sourceMapParsedURL)
			if err != nil {
				sdk.Logger.DebugContext(ctx, "failed to get source map content from data URI", "error", err, "sourceMapURL", sourceMapURL, "jsURL", jsURL)
				continue
			}

			sm, err := parseSourceMap([]byte(sourceMapContent))
			if err != nil {
				sdk.Logger.DebugContext(ctx, "failed to parse source map content from data URI", "error", err, "sourceMapURL", sourceMapURL, "jsURL", jsURL)
				continue
			}

			sm.URL = sourceMapParsedURL
			sm.GetterName = namedGetter.name
			sm.OriginalContent = sourceMapContent

			return sm, true, nil
		}

		res, ok, err := sdk.AssetFetcher.RateLimitedGet(ctx, sourceMapParsedURL.String(), nil)
		if err != nil {
			return sourceMap{}, false, dbeventbus.NewRetriableError(errutil.Wrap(err, "failed to fetch source map"))
		}
		if !ok {
			continue // Try next getter
		}

		sm, err := parseSourceMap([]byte(res))
		if err != nil {
			sdk.Logger.DebugContext(ctx, "failed to parse source map content from data URI", "error", err, "sourceMapURL", sourceMapURL, "jsURL", jsURL)
			continue // Try next getter
		}

		sm.URL = sourceMapParsedURL
		sm.GetterName = namedGetter.name
		sm.OriginalContent = res

		sdk.Logger.DebugContext(ctx, "found source map", "sourceMapURL", sourceMapURL, "jsURL", jsURL, "getter", namedGetter.name)

		return sm, true, nil
	}

	return sourceMap{}, false, nil // All methods failed
}

func getSourceMapContentFromDataURI(sourceMapParsedURL *url.URL) (string, error) {
	urlchunks := strings.Split(sourceMapParsedURL.Opaque, ",")
	if len(urlchunks) < 2 {
		return "", errors.New("failed to parse data URI, expected atleast 2 chunks but got " + strconv.Itoa(len(urlchunks)))
	}

	data, err := base64.StdEncoding.DecodeString(urlchunks[1])
	if err != nil {
		return "", errutil.Wrap(err, "failed to base64 decode data URI")
	}

	body := []byte(data)

	return string(body), nil
}
