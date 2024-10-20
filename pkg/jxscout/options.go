package jxscout

import (
	"errors"

	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"
)

func validateOptions(options jxscouttypes.Options) error {
	if options.Port == 0 {
		return errors.New("port option is required")
	}

	if options.WorkingDirectory == "" {
		return errors.New("working directory option is required")
	}

	return nil
}
