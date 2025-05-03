package astanalyzer

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestFormatMatchesV1(t *testing.T) {
	tests := []struct {
		name     string
		matches  []AnalyzerMatch
		expected ASTAnalyzerTreeNode
	}{
		{
			name:     "empty matches returns empty node",
			matches:  []AnalyzerMatch{},
			expected: ASTAnalyzerTreeNode{},
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
			expected: ASTAnalyzerTreeNode{
				Children: []ASTAnalyzerTreeNode{
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
			expected: ASTAnalyzerTreeNode{
				Children: []ASTAnalyzerTreeNode{
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
			expected: ASTAnalyzerTreeNode{
				Children: []ASTAnalyzerTreeNode{
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
			expected: ASTAnalyzerTreeNode{
				Children: []ASTAnalyzerTreeNode{
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
			expected: ASTAnalyzerTreeNode{
				Children: []ASTAnalyzerTreeNode{
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
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := formatMatchesV1(tt.matches)
			assert.Equal(t, tt.expected, result)
		})
	}
}
