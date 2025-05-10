package astanalyzer

import (
	"encoding/json"
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestFormatMatchesV1(t *testing.T) {
	tests := []struct {
		name     string
		matches  []AnalyzerMatch
		expected []ASTAnalyzerTreeNode
	}{
		{
			name:     "empty matches returns empty list",
			matches:  []AnalyzerMatch{},
			expected: []ASTAnalyzerTreeNode{},
		},
		{
			name: "single path match",
			matches: []AnalyzerMatch{
				{
					FilePath:     "test.go",
					AnalyzerName: "test",
					Value:        "/api/users",
					Tags:         map[string]bool{"paths": true},
				},
			},
			expected: []ASTAnalyzerTreeNode{
				{
					Label:    "Data",
					IconName: "folder",
					Type:     ASTAnalyzerTreeNodeTypeNavigation,
					Children: []ASTAnalyzerTreeNode{
						{
							Label:    "Paths",
							IconName: "folder",
							Type:     ASTAnalyzerTreeNodeTypeNavigation,
							Children: []ASTAnalyzerTreeNode{
								{
									Type:        ASTAnalyzerTreeNodeTypeMatch,
									Label:       "/api/users",
									Description: "test.go",
									Data: AnalyzerMatch{
										FilePath:     "test.go",
										AnalyzerName: "test",
										Value:        "/api/users",
										Tags:         map[string]bool{"paths": true},
									},
								},
							},
						},
					},
				},
			},
		},
		{
			name: "extension with other tag",
			matches: []AnalyzerMatch{
				{
					FilePath:     "test.go",
					AnalyzerName: "test",
					Value:        "asd.js",
					Tags:         map[string]bool{"extension": true, "js": true},
				},
			},
			expected: []ASTAnalyzerTreeNode{
				{
					Label:    "Data",
					IconName: "folder",
					Type:     ASTAnalyzerTreeNodeTypeNavigation,
					Children: []ASTAnalyzerTreeNode{
						{
							Label:    "Extension",
							IconName: "folder",
							Type:     ASTAnalyzerTreeNodeTypeNavigation,
							Children: []ASTAnalyzerTreeNode{
								{
									Label:    "Js",
									IconName: "folder",
									Type:     ASTAnalyzerTreeNodeTypeNavigation,
									Children: []ASTAnalyzerTreeNode{
										{
											Type:        ASTAnalyzerTreeNodeTypeMatch,
											Label:       "asd.js",
											Description: "test.go",
											Data: AnalyzerMatch{
												FilePath:     "test.go",
												AnalyzerName: "test",
												Value:        "asd.js",
												Tags:         map[string]bool{"extension": true, "js": true},
											},
										},
									},
								},
							},
						},
					},
				},
			},
		},
		{
			name: "iframe communication",
			matches: []AnalyzerMatch{
				{
					FilePath:     "test.go",
					AnalyzerName: "test",
					Value:        "window.postMessage",
					Tags:         map[string]bool{"post-message": true},
				},
			},
			expected: []ASTAnalyzerTreeNode{
				{
					Label:    "Iframe Communication",
					IconName: "folder",
					Type:     ASTAnalyzerTreeNodeTypeNavigation,
					Children: []ASTAnalyzerTreeNode{
						{
							Label:    "Post Message",
							IconName: "folder",
							Type:     ASTAnalyzerTreeNodeTypeNavigation,
							Children: []ASTAnalyzerTreeNode{
								{
									Type:        ASTAnalyzerTreeNodeTypeMatch,
									Label:       "window.postMessage",
									Description: "test.go",
									Data: AnalyzerMatch{
										FilePath:     "test.go",
										AnalyzerName: "test",
										Value:        "window.postMessage",
										Tags:         map[string]bool{"post-message": true},
									},
								},
							},
						},
					},
				},
			},
		},
		{
			name: "storage manipulation",
			matches: []AnalyzerMatch{
				{
					FilePath:     "test.go",
					AnalyzerName: "test",
					Value:        "document.cookie",
					Tags:         map[string]bool{"cookie-manipulation": true},
				},
			},
			expected: []ASTAnalyzerTreeNode{
				{
					Label:    "Storage",
					IconName: "folder",
					Type:     ASTAnalyzerTreeNodeTypeNavigation,
					Children: []ASTAnalyzerTreeNode{
						{
							Label:    "Cookie Manipulation",
							IconName: "folder",
							Type:     ASTAnalyzerTreeNodeTypeNavigation,
							Children: []ASTAnalyzerTreeNode{
								{
									Type:        ASTAnalyzerTreeNodeTypeMatch,
									Label:       "document.cookie",
									Description: "test.go",
									Data: AnalyzerMatch{
										FilePath:     "test.go",
										AnalyzerName: "test",
										Value:        "document.cookie",
										Tags:         map[string]bool{"cookie-manipulation": true},
									},
								},
							},
						},
					},
				},
			},
		},
		{
			name: "behavior with misc",
			matches: []AnalyzerMatch{
				{
					FilePath:     "test.go",
					AnalyzerName: "test",
					Value:        "window.location.hash",
					Tags:         map[string]bool{"hash-change": true},
				},
				{
					FilePath:     "test.go",
					AnalyzerName: "test",
					Value:        "document.write",
					Tags:         map[string]bool{"dom-xss": true},
				},
			},
			expected: []ASTAnalyzerTreeNode{
				{
					Label:    "Behavior",
					IconName: "folder",
					Type:     ASTAnalyzerTreeNodeTypeNavigation,
					Children: []ASTAnalyzerTreeNode{
						{
							Label:    "Hash Change",
							IconName: "folder",
							Type:     ASTAnalyzerTreeNodeTypeNavigation,
							Children: []ASTAnalyzerTreeNode{
								{
									Type:        ASTAnalyzerTreeNodeTypeMatch,
									Label:       "window.location.hash",
									Description: "test.go",
									Data: AnalyzerMatch{
										FilePath:     "test.go",
										AnalyzerName: "test",
										Value:        "window.location.hash",
										Tags:         map[string]bool{"hash-change": true},
									},
								},
							},
						},
						{
							Label:    "Misc",
							IconName: "folder",
							Type:     ASTAnalyzerTreeNodeTypeNavigation,
							Children: []ASTAnalyzerTreeNode{
								{
									Type:        ASTAnalyzerTreeNodeTypeMatch,
									Label:       "document.write",
									Description: "test.go",
									Data: AnalyzerMatch{
										FilePath:     "test.go",
										AnalyzerName: "test",
										Value:        "document.write",
										Tags:         map[string]bool{"dom-xss": true},
									},
								},
							},
						},
					},
				},
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := formatMatchesV1(tt.matches)
			assert.Equal(t, tt.expected, result)
		})
	}
}

func TestFormatMatchesV1WithExampleData(t *testing.T) {
	// Read the matches.json file
	matchesJSON, err := os.ReadFile("example/matches.json")
	if err != nil {
		t.Fatalf("Failed to read matches.json: %v", err)
	}

	var matches []AnalyzerMatch
	if err := json.Unmarshal(matchesJSON, &matches); err != nil {
		t.Fatalf("Failed to unmarshal matches.json: %v", err)
	}

	// Format the matches
	result := formatMatchesV1(matches)

	// Basic validation of the result
	assert.NotNil(t, result)
	assert.NotEmpty(t, result)

	// Verify that all matches were processed
	totalMatches := 0
	var countMatches func(node ASTAnalyzerTreeNode)
	countMatches = func(node ASTAnalyzerTreeNode) {
		if node.Type == ASTAnalyzerTreeNodeTypeMatch {
			totalMatches++
		}
		for _, child := range node.Children {
			countMatches(child)
		}
	}
	for _, rootNode := range result {
		countMatches(rootNode)
	}

	assert.Equal(t, 30, totalMatches, "Expected 30 matches in the result")

	// Verify specific categories exist
	categories := make(map[string]bool)
	var collectCategories func(node ASTAnalyzerTreeNode)
	collectCategories = func(node ASTAnalyzerTreeNode) {
		if node.Type == ASTAnalyzerTreeNodeTypeNavigation {
			categories[node.Label] = true
		}
		for _, child := range node.Children {
			collectCategories(child)
		}
	}
	for _, rootNode := range result {
		collectCategories(rootNode)
	}

	// Verify some expected categories are present
	expectedCategories := []string{"Data", "Iframe Communication", "Storage", "Behavior"}
	for _, category := range expectedCategories {
		assert.True(t, categories[category], "Expected category %s to be present", category)
	}
}
