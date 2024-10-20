package main

import (
	"context"
	"encoding/base64"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"time"

	"github.com/google/go-github/v39/github"
	"golang.org/x/oauth2"
	limiter "golang.org/x/time/rate"
)

func main() {
	// Get the GitHub token from environment variable
	token := os.Getenv("GITHUB_TOKEN")
	if token == "" {
		log.Fatal("GitHub token not found. Set the GITHUB_TOKEN environment variable.")
	}

	// Create an authenticated GitHub client
	ctx := context.Background()
	ts := oauth2.StaticTokenSource(
		&oauth2.Token{AccessToken: token},
	)
	tc := oauth2.NewClient(ctx, ts)
	client := github.NewClient(tc)

	// Search query
	query := `"Loading chunk " language:javascript -content:"__webpack_require__.u" -filename:webpack -filename:hot-update -filename:JsonpChunkLoadingRuntimeModule -filename:JsonpMainTemplatePlugin`

	// Perform the search
	opts := &github.SearchOptions{
		ListOptions: github.ListOptions{PerPage: 100},
	}

	searchLimiter := limiter.NewLimiter(limiter.Every(time.Minute), 10)
	contentsLimiter := limiter.NewLimiter(limiter.Every(time.Minute), 4000)

	for {
		var allResults []*github.CodeSearchResult
		result, resp, err := client.Search.Code(ctx, query, opts)
		if err != nil {
			log.Fatalf("Error searching GitHub: %s", err.Error())
		}
		allResults = append(allResults, result)
		if resp.NextPage == 0 {
			break
		}
		opts.Page = resp.NextPage

		err = searchLimiter.Wait(ctx)
		if err != nil {
			log.Fatalf("failed to wait for search limiter: %s", err.Error())
		}

		// Process search results
		for _, result := range allResults {
			for _, codeResult := range result.CodeResults {
				fmt.Printf("File: %s\n", *codeResult.Path)
				fmt.Printf("Repository: %s\n", *codeResult.Repository.FullName)

				// Get the content of the file
				fileContent, _, _, err := client.Repositories.GetContents(
					ctx,
					*codeResult.Repository.Owner.Login,
					*codeResult.Repository.Name,
					*codeResult.Path,
					nil,
				)
				if err != nil {
					log.Printf("Error getting file content: %v", err)
					continue
				}

				content, err := base64.StdEncoding.DecodeString(*fileContent.Content)
				if err != nil {
					log.Printf("Error decoding file content: %v", err)
					continue
				}

				localPath := filepath.Join("github_results", *codeResult.Repository.FullName, *codeResult.Path)
				err = os.MkdirAll(filepath.Dir(localPath), 0755)
				if err != nil {
					log.Printf("Error creating directory: %v", err)
					continue
				}

				// Save the file content
				err = os.WriteFile(localPath, content, 0644)
				if err != nil {
					log.Printf("Error writing file: %v", err)
					continue
				}

				fmt.Printf("Saved file to: %s\n", localPath)
				fmt.Println("----------------------------------------")

				err = contentsLimiter.Wait(ctx)
				if err != nil {
					log.Fatalf("failed to wait for contents limiter: %s", err.Error())
				}
			}
		}
	}
}
