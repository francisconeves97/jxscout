package errutil

import (
	"fmt"
)

func Wrap(err error, message string) error {
	if err == nil {
		return nil
	}

	return fmt.Errorf("%s: %s", message, err.Error())
}

func Wrapf(err error, message string, args ...any) error {
	if err == nil {
		return nil
	}

	return fmt.Errorf("%s: %s", fmt.Sprintf(message, args...), err.Error())
}
