package gitcommiter

import (
	"fmt"
	"time"

	"github.com/francisconeves97/jxscout/internal/core/common"
	"github.com/francisconeves97/jxscout/internal/core/errutil"
	jxscouttypes "github.com/francisconeves97/jxscout/pkg/types"
)

type gitCommiterModule struct {
	sdk            *jxscouttypes.ModuleSDK
	commitInterval time.Duration
	gitService     *gitService
	stopChan       chan struct{}
}

func NewGitCommiter(commitInterval time.Duration) jxscouttypes.Module {
	return &gitCommiterModule{
		commitInterval: commitInterval,
		stopChan:       make(chan struct{}),
	}
}

func (m *gitCommiterModule) Initialize(sdk *jxscouttypes.ModuleSDK) error {
	m.sdk = sdk
	m.gitService = newGitService(common.GetWorkingDirectory(sdk.Options.ProjectName))

	// Ensure git repository exists
	if err := m.gitService.ensureGitRepo(); err != nil {
		return errutil.Wrap(err, "failed to ensure git repository exists")
	}

	go func() {
		err := m.startGitCommiterTask()
		if err != nil {
			m.sdk.Logger.Error("failed to start git commiter task", "err", err)
			return
		}
	}()

	return nil
}

func (m *gitCommiterModule) startGitCommiterTask() error {
	ticker := time.NewTicker(m.commitInterval)
	defer ticker.Stop()

	for {
		select {
		case <-ticker.C:
			err := m.commit()
			if err != nil {
				m.sdk.Logger.Error("failed to create snapshot", "err", err)
			}
		case <-m.stopChan:
			return nil
		}
	}
}

func (m *gitCommiterModule) commit() error {
	// Check for changes before doing anything
	hasChanges, err := m.gitService.hasChanges()
	if err != nil {
		return errutil.Wrap(err, "failed to check for changes")
	}

	if !hasChanges {
		return nil
	}

	// Add all changes
	if err := m.gitService.addAll(); err != nil {
		return errutil.Wrap(err, "failed to add changes to git")
	}

	// Double-check for changes after adding
	// This catches scenarios where all changes are ignored by .gitignore
	hasChanges, err = m.gitService.hasChanges()
	if err != nil {
		return errutil.Wrap(err, "failed to check for changes after add")
	}

	if !hasChanges {
		return nil
	}

	now := time.Now()
	commitMessage := fmt.Sprintf("Snapshot %s", now.Format("02-01-2006 15:04"))

	// Create commit
	if err := m.gitService.commit(commitMessage); err != nil {
		return errutil.Wrap(err, "failed to create snapshot commit")
	}

	m.sdk.Logger.Info("created snapshot commit 💾", "message", commitMessage)
	return nil
}
