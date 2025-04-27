package assetservice

import (
	"context"
	"log/slog"
	"net/url"
	"os"
	"path"
	"path/filepath"
	"regexp"
	"runtime"
	"strings"

	"github.com/francisconeves97/jxscout/internal/core/errutil"
)

const (
	urlDelimiter = "/"
)

type SaveFileRequest struct {
	// PathURL is the path structure of the file to be saved, corresponds to a URL that maps into the filesystem.
	// This path should be / separated and internally we will handle the OS filesystem. This is for ease of use
	// because in reality this will be a URL
	PathURL string
	// Content is the file content
	Content string
}

type FileService interface {
	Save(ctx context.Context, req SaveFileRequest) (string, error)
	SimpleSave(path string, content string) (string, error)
	SaveInSubfolder(ctx context.Context, subfolder string, req SaveFileRequest) (string, error)
	UpdateWorkingDirectory(newPath string)
	URLToPath(pathURL string) ([]string, error)
}

type fileServiceImpl struct {
	workingDirectory string
	log              *slog.Logger
}

func NewFileService(workingDirectory string, log *slog.Logger) FileService {
	return &fileServiceImpl{
		workingDirectory: workingDirectory,
		log:              log,
	}
}

func (s *fileServiceImpl) SaveInSubfolder(ctx context.Context, subfolder string, req SaveFileRequest) (string, error) {
	filePath := []string{
		s.workingDirectory,
		subfolder,
	}

	return s.save(ctx, filePath, req)
}

func (s *fileServiceImpl) Save(ctx context.Context, req SaveFileRequest) (string, error) {
	filePath := []string{
		s.workingDirectory,
	}

	return s.save(ctx, filePath, req)
}

func cleanWindows(p string) string {
	m1 := regexp.MustCompile(`[?%*|:"<>]`)
	return m1.ReplaceAllString(p, "")
}

func (s *fileServiceImpl) save(ctx context.Context, filePath []string, req SaveFileRequest) (string, error) {
	parsedURL, err := url.Parse(req.PathURL)
	if err != nil {
		return "", errutil.Wrap(err, "failed to parse url")
	}

	filePath = append(filePath, parsedURL.Host)

	path := parsedURL.Path
	pathParts := strings.Split(path, urlDelimiter)

	filePath = append(filePath, pathParts...)

	targetPath := filepath.Join(filePath...)
	targetPath, err = s.SimpleSave(targetPath, req.Content)
	if err != nil {
		return "", errutil.Wrap(err, "failed to write file")
	}

	return targetPath, nil
}

func (s *fileServiceImpl) URLToPath(pathURL string) ([]string, error) {
	filePath := []string{}

	parsedURL, err := url.Parse(pathURL)
	if err != nil {
		return nil, errutil.Wrap(err, "failed to parse url")
	}

	filePath = append(filePath, parsedURL.Host)

	path := parsedURL.Path
	pathParts := strings.Split(path, urlDelimiter)

	filePath = append(filePath, pathParts...)

	return filePath, nil

}

func (s *fileServiceImpl) SimpleSave(filePath string, content string) (string, error) {
	if runtime.GOOS == "windows" {
		filePath = cleanWindows(filePath)
	}

	filePath = filepath.Clean(filePath)

	dir := path.Dir(filePath)
	if err := os.MkdirAll(dir, 0755); err != nil {
		return filePath, errutil.Wrap(err, "failed to create directory")
	}

	err := os.WriteFile(filePath, []byte(content), 0644)
	if err != nil {
		return filePath, errutil.Wrap(err, "failed to create file and write content")
	}

	return filePath, nil
}

func (s *fileServiceImpl) UpdateWorkingDirectory(path string) {
	s.workingDirectory = path
}
