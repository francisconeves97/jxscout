package assetservice

import (
	"context"
	"log/slog"
	"net/url"
	"os"
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
	PathURL string
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
	// Log the initial working directory to understand its nature (absolute/relative)
	absWD, err := filepath.Abs(workingDirectory)
	if err != nil {
		log.Warn("FileService: Could not determine absolute path for initial working directory", "input_wd", workingDirectory, "error", err)
	} else {
		log.Info("FileService initialized", "effective_working_directory", absWD)
	}
	return &fileServiceImpl{
		workingDirectory: workingDirectory, // Store as is, but Abs logic in SimpleSave will handle it
		log:              log,
	}
}

func (s *fileServiceImpl) SaveInSubfolder(ctx context.Context, subfolder string, req SaveFileRequest) (string, error) {
	s.log.Debug("FileService.SaveInSubfolder called", "subfolder", subfolder, "path_url", req.PathURL)
	// workingDirectory itself might be relative or absolute.
	// filepath.Join handles this fine initially. The absolutization will happen in SimpleSave.
	filePathParts := []string{
		s.workingDirectory,
		subfolder,
	}
	return s.save(ctx, filePathParts, req)
}

func (s *fileServiceImpl) Save(ctx context.Context, req SaveFileRequest) (string, error) {
	s.log.Debug("FileService.Save called", "path_url", req.PathURL)
	filePathParts := []string{
		s.workingDirectory,
	}
	return s.save(ctx, filePathParts, req)
}

func cleanWindows(p string) string {
	// This regex should ideally only be applied to the filename component, not the whole path.
	// Applying to the whole path might remove valid characters from directory names if they are unusual.
	// However, keeping original logic for now.
	m1 := regexp.MustCompile(`[?%*|:"<>]`)
	return m1.ReplaceAllString(p, "")
}

// save constructs the full path and then calls SimpleSave
func (s *fileServiceImpl) save(ctx context.Context, basePathParts []string, req SaveFileRequest) (string, error) {
	s.log.Debug("FileService.save (internal) called", "base_path_parts", basePathParts, "path_url", req.PathURL)
	parsedURL, err := url.Parse(req.PathURL)
	if err != nil {
		s.log.Error("FileService.save: Failed to parse PathURL", "path_url", req.PathURL, "error", err)
		return "", errutil.Wrap(err, "failed to parse url")
	}

	// Construct path segments
	currentPathSegments := make([]string, len(basePathParts))
	copy(currentPathSegments, basePathParts)

	currentPathSegments = append(currentPathSegments, parsedURL.Host)

	// Split path and append, ensuring empty leading segments from URL path (e.g. /foo/bar) are handled.
	urlPath := strings.TrimPrefix(parsedURL.Path, urlDelimiter) // remove leading / if any
	pathPartsFromURL := strings.Split(urlPath, urlDelimiter)
	for _, part := range pathPartsFromURL {
		if part != "" { // Avoid empty segments from // in path
			currentPathSegments = append(currentPathSegments, part)
		}
	}
	
	// filepath.Join will create an OS-specific path.
	// This path might still be relative if s.workingDirectory was relative.
	targetPath := filepath.Join(currentPathSegments...)
	s.log.Debug("FileService.save: Tentative target path before SimpleSave", "target_path", targetPath)

	// SimpleSave will handle making it absolute, cleaning, and writing.
	savedPath, err := s.SimpleSave(targetPath, req.Content)
	if err != nil {
		// SimpleSave logs its own errors, this wrap is for the caller of save()
		return "", errutil.Wrap(err, "failed to write file via SimpleSave")
	}

	s.log.Info("FileService.save: File processing complete via SimpleSave", "final_saved_path", savedPath, "original_path_url", req.PathURL)
	return savedPath, nil
}

func (s *fileServiceImpl) URLToPath(pathURL string) ([]string, error) {
	var filePath []string // Renamed to avoid conflict with filePath package

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

func (s *fileServiceImpl) SimpleSave(inputFilePath string, content string) (string, error) {
	s.log.Debug("FileService.SimpleSave called", "input_filePath", inputFilePath)
	var processedPath = inputFilePath

	if runtime.GOOS == "windows" {
		// It's generally safer to clean only the filename component for special characters,
		// but adhering to original logic for now.
		// If inputFilePath includes directory parts, this might strip characters from them too.
		base := filepath.Base(processedPath)
		dir := filepath.Dir(processedPath)
		cleanedBase := cleanWindows(base)
		processedPath = filepath.Join(dir, cleanedBase)
		s.log.Debug("FileService.SimpleSave: Path after windows cleaning (if any)", "path", processedPath)
	}

	// CRITICAL: Ensure the path is absolute.
	// If inputFilePath (or processedPath) is already absolute, filepath.Abs does nothing.
	// If it's relative, it's resolved against the current working directory of the jxscout process.
	absFilePath, errAbs := filepath.Abs(processedPath)
	if errAbs != nil {
		s.log.Error("FileService.SimpleSave: Failed to make path absolute", "path_before_abs", processedPath, "error", errAbs)
		// Return the path as is if Abs fails, or handle error more strictly
		return processedPath, errutil.Wrap(errAbs, "failed to make path absolute")
	}
	s.log.Debug("FileService.SimpleSave: Path after filepath.Abs()", "absolute_path", absFilePath)

	// Clean the absolute path (normalizes separators, removes ., ..)
	cleanedAbsFilePath := filepath.Clean(absFilePath)
	s.log.Info("FileService.SimpleSave: Final cleaned absolute path for disk operation", "path_to_be_used", cleanedAbsFilePath)

	dir := filepath.Dir(cleanedAbsFilePath)
	if err := os.MkdirAll(dir, 0755); err != nil {
		s.log.Error("FileService.SimpleSave: Failed to create directory", "directory", dir, "error", err)
		return cleanedAbsFilePath, errutil.Wrap(err, "failed to create directory")
	}

	err := os.WriteFile(cleanedAbsFilePath, []byte(content), 0644)
	if err != nil {
		s.log.Error("FileService.SimpleSave: Failed to write file to disk", "path", cleanedAbsFilePath, "error", err)
		return cleanedAbsFilePath, errutil.Wrap(err, "failed to create file and write content")
	}

	s.log.Info("FileService.SimpleSave: File successfully written to disk", "final_disk_path", cleanedAbsFilePath)
	return cleanedAbsFilePath, nil // Return the cleaned, ABSOLUTE path
}

func (s *fileServiceImpl) UpdateWorkingDirectory(path string) {
	s.log.Info("FileService.UpdateWorkingDirectory called", "old_wd", s.workingDirectory, "new_wd", path)
	s.workingDirectory = path
}