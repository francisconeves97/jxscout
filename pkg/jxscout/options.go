package jxscout

import (
	"errors"

	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"
)

func validateOptions(options jxscouttypes.Options) error {
	if options.Port == 0 {
		return errors.New("port option is required")
	}

	if options.RateLimitingMaxRequestsPerMinute != 0 && options.RateLimitingMaxRequestsPerSecond != 0 {
		return errors.New("only one of RateLimitingMaxRequestsPerMinute or RateLimitingMaxRequestsPerSecond can be set")
	}

	return nil
}
