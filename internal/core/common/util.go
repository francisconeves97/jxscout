package common

import (
	"crypto/sha256"
	"fmt"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"time"
	"unicode"

	"github.com/francisconeves97/jxscout/internal/core/errutil"
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

func NormalizeHTMLURL(rawURL string) (string, error) {
	if strings.TrimSpace(rawURL) == "" {
		return "", nil
	}

	htmlPath, err := url.JoinPath(NormalizeURL(rawURL), "(index).html")
	if err != nil {
		return "", errutil.Wrap(err, "failed to join html path with (index).html")
	}

	return htmlPath, nil
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

func Hash(content string) string {
	hasher := sha256.New()
	hasher.Write([]byte(content))
	return fmt.Sprintf("%x", hasher.Sum(nil))
}

func GetWorkingDirectory() string {
	home := os.Getenv("HOME")

	return filepath.Join(home, "jxscout")
}

func GetPrivateDirectory() string {
	home := os.Getenv("HOME")

	return filepath.Join(home, ".jxscout")
}

func FileExists(filePath string) (bool, error) {
	info, err := os.Stat(filePath)
	if os.IsNotExist(err) {
		return false, nil
	}
	if err != nil {
		return false, errutil.Wrap(err, "failed to check if file exists")
	}
	return !info.IsDir(), nil
}

func ExponentialBackoff(retry int) time.Duration {
	// Base delay of 1 second
	baseDelay := time.Second

	// Calculate exponential delay: base * 2^retry
	// Cap at 1 hour to prevent excessive delays
	maxDelay := time.Hour

	delay := baseDelay * time.Duration(1<<uint(retry))
	if delay > maxDelay {
		return maxDelay
	}

	return delay
}

func AppendAll[T any](slices ...[]T) []T {
	// Calculate total length
	totalLen := 0
	for _, s := range slices {
		totalLen += len(s)
	}

	// Pre-allocate the result slice
	result := make([]T, 0, totalLen)

	// Append all slices
	for _, s := range slices {
		result = append(result, s...)
	}

	return result
}

// stolen from https://github.com/BishopFox/jsluice/blob/main/analyzer.go#L70
func IsProbablyHTML(source []byte) bool {
	for _, b := range source {
		if unicode.IsSpace(rune(b)) {
			continue
		}

		if b == '<' {
			return true
		}
		break
	}

	return false
}
