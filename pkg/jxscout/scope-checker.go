package jxscout

import (
	"log/slog"
	"regexp"

	"github.com/francisconeves97/jxscout/internal/core/common"
	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"
)

type scopeChecker struct {
	scope []string
	log   *slog.Logger
}

func newScopeChecker(scope []string, log *slog.Logger) jxscouttypes.Scope {
	return &scopeChecker{
		scope: scope,
		log:   log,
	}
}

func (s *scopeChecker) IsInScope(url string) bool {
	if len(s.scope) == 0 {
		return true
	}

	normalizedURL := common.NormalizeURL(url)

	for _, regex := range s.scope {
		match, err := regexp.Match(regex, []byte(normalizedURL))
		if err != nil {
			s.log.Error("failed to match regex", "regex", regex, "url", normalizedURL, "err", err)
			return false
		}

		if match {
			return true
		}

		s.log.Debug("request didn't match regex", "regex", regex, "url", normalizedURL)
	}

	return false
}

func initializeScope(patterns []string) []string {
	scopeRegex := []string{}

	for _, url := range patterns {
		scopeRegex = append(scopeRegex, wildCardToRegexp(url))
	}

	return scopeRegex
}
