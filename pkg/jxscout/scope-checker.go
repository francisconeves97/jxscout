package jxscout

import (
	"regexp"

	"github.com/francisconeves97/jxscout/internal/core/common"
	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"
)

type scopeChecker struct {
	scope []string
}

func newScopeChecker(scope []string) jxscouttypes.Scope {
	return &scopeChecker{
		scope: scope,
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
			return false
		}

		if match {
			return true
		}
	}

	return false
}

func initializeScope(options jxscouttypes.Options) []string {
	scopeRegex := []string{}

	for _, url := range options.ScopePatterns {
		scopeRegex = append(scopeRegex, wildCardToRegexp(url))
	}

	return scopeRegex
}
