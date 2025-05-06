package gitcommiter

import (
	"os"
	"os/exec"
	"path/filepath"
	"strings"

	"github.com/francisconeves97/jxscout/internal/core/errutil"
)

type gitService struct {
	repoPath string
}

func newGitService(repoPath string) *gitService {
	return &gitService{
		repoPath: repoPath,
	}
}

func (g *gitService) ensureGitRepo() error {
	// Create directory if it doesn't exist
	if err := os.MkdirAll(g.repoPath, 0755); err != nil {
		return errutil.Wrap(err, "failed to create repository directory")
	}

	_, err := os.Stat(filepath.Join(g.repoPath, ".git"))
	if os.IsNotExist(err) {
		cmd := exec.Command("git", "init")
		cmd.Dir = g.repoPath
		if err := cmd.Run(); err != nil {
			return errutil.Wrap(err, "failed to initialize git repository")
		}

		return nil
	}

	return errutil.Wrap(err, "failed to ensure git repo exists")
}

func (g *gitService) add(path string) error {
	cmd := exec.Command("git", "add", path)
	cmd.Dir = g.repoPath
	return cmd.Run()
}

func (g *gitService) commit(message string) error {
	statusCmd := exec.Command("git", "status", "--porcelain")
	statusCmd.Dir = g.repoPath

	output, err := statusCmd.Output()
	if err != nil {
		return errutil.Wrap(err, "failed to get git status")
	}

	// If there are no changes, don't create an empty commit
	if len(strings.TrimSpace(string(output))) == 0 {
		return nil
	}

	cmd := exec.Command("git", "commit", "-m", message)
	cmd.Dir = g.repoPath

	return cmd.Run()
}

func (g *gitService) hasChanges() (bool, error) {
	statusCmd := exec.Command("git", "status", "--porcelain")
	statusCmd.Dir = g.repoPath

	output, err := statusCmd.Output()
	if err != nil {
		return false, errutil.Wrap(err, "failed to get git status")
	}

	return len(strings.TrimSpace(string(output))) > 0, nil
}
