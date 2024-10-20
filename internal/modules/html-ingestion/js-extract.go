package htmlingestion

import (
	"net/url"
	"strings"

	"github.com/francisconeves97/jxscout/internal/core/common"
	"github.com/francisconeves97/jxscout/internal/core/errutil"

	"github.com/PuerkitoBio/goquery"
)

type extractedJS struct {
	scriptURLs    []string // script URLs
	inlineScripts []string // actual scripts that were inlined
}

func extractJS(htmlContent string, baseURLRaw string) (extractedJS, error) {
	doc, err := goquery.NewDocumentFromReader(strings.NewReader(htmlContent))
	if err != nil {
		return extractedJS{}, errutil.Wrap(err, "failed to read document")
	}

	baseURL, err := url.Parse(baseURLRaw)
	if err != nil {
		return extractedJS{}, errutil.Wrap(err, "failed to parse url")
	}

	scriptURLs := extractJavascriptURLs(doc, baseURL)
	inlineScripts := extractInlineJavascript(doc)

	return extractedJS{
		scriptURLs:    scriptURLs,
		inlineScripts: inlineScripts,
	}, nil
}

func extractJavascriptURLs(doc *goquery.Document, baseURL *url.URL) []string {
	urls := []string{}

	basePath := ""

	// base will replace the base href of the page. this is hacky but might work in most cases?
	doc.Find("base").Each(func(i int, s *goquery.Selection) {
		href, exists := s.Attr("href")
		if !exists {
			return
		}

		basePath = href
	})

	doc.Find("script").Each(func(i int, selection *goquery.Selection) {
		src, exists := selection.Attr("src")
		if !exists {
			return
		}

		if common.IsRelativePath(src) {
			path, err := url.JoinPath(basePath, src)
			if err != nil {
				return // TODO: improve error observability
			}

			url := &url.URL{
				Scheme: baseURL.Scheme,
				Host:   baseURL.Hostname(),
				Path:   path,
			}

			urls = append(urls, url.String())
		} else {
			parsedURl, err := url.Parse(src)
			if err != nil {
				return // TODO: improve error observability
			}

			if parsedURl.Scheme == "" {
				parsedURl.Scheme = "https"
			}

			urls = append(urls, parsedURl.String())
		}
	})

	return urls
}

func extractInlineJavascript(doc *goquery.Document) []string {
	inlineJS := []string{}

	doc.Find("script").Each(func(i int, s *goquery.Selection) {
		_, exists := s.Attr("src")
		if exists {
			return
		}

		t, exists := s.Attr("type")
		if exists && (t == "application/ld+json" || t == "application/json") {
			return
		}

		content := s.Text()
		if content == "" {
			return
		}

		inlineJS = append(inlineJS, content)
	})

	return inlineJS
}
