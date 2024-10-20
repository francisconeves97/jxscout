package common

import (
	"net/http"
	"net/url"
	"regexp"
	"strings"
)

func StrPtr(s *string) string {
	if s == nil {
		return ""
	}

	return *s
}

func NormalizeURL(rawURL string) string {
	parsedURL, err := url.Parse(rawURL)
	if err != nil {
		// TODO: we should be logging this
		return rawURL
	}

	parsedURL.Fragment = ""
	parsedURL.RawFragment = ""
	parsedURL.RawQuery = ""
	parsedURL.ForceQuery = false

	parsedURL.Path = strings.TrimSuffix(parsedURL.Path, "/")

	return parsedURL.String()
}

// TODO: make this more robust. e.g. toilet blah blah would match because of let keyword
func isLikelyJavaScript(str string) bool {
	// Common JavaScript keywords and syntax patterns
	jsPatterns := []string{
		`\bfunction\s+\w+\s*\(`,        // function declarations
		`\b(const|let|var)\s+\w+\s*=?`, // variable declarations
		`\bif\s*\(.*\)\s*{`,            // if statements
		`\bfor\s*\(.*\)\s*{`,           // for loops
		`\bwhile\s*\(.*\)\s*{`,         // while loops
		`=>`,                           // arrow functions
		`\${.*}`,                       // template literals
	}

	for _, pattern := range jsPatterns {
		matched, _ := regexp.MatchString(pattern, str)
		if matched {
			return true
		}
	}
	return false
}

type ContentType = string

const (
	ContentTypeHTML = "HTML"
	ContentTypeJS   = "JS"
)

func DetectContentType(content string) ContentType {
	mimeType := http.DetectContentType([]byte(content))

	if strings.Contains(mimeType, "html") {
		return ContentTypeHTML
	}

	if strings.Contains(mimeType, "text/plain") && isLikelyJavaScript(content) {
		return ContentTypeJS
	}

	return ""
}

func IsRelativePath(str string) bool {
	u, err := url.Parse(str)
	if err == nil && u.Host != "" {
		return false
	}

	return true
}
