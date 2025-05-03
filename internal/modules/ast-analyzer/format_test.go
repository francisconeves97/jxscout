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
				Label:    "String",
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
				Label:    "String",
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
		// {
		// 	name: "multiple matches with different tags",
		// 	matches: []AnalyzerMatch{
		// 		{
		// 			FilePath:     "test.go",
		// 			AnalyzerName: "test",
		// 			Value:        "/api/users",
		// 			Tags:         map[string]bool{"paths": true},
		// 		},
		// 		{
		// 			FilePath:     "test.go",
		// 			AnalyzerName: "test",
		// 			Value:        "SELECT * FROM users",
		// 			Tags:         map[string]bool{"graphql": true},
		// 		},
		// 		{
		// 			FilePath:     "test.go",
		// 			AnalyzerName: "test",
		// 			Value:        "password123",
		// 			Tags:         map[string]bool{"secret": true, "pii": true},
		// 		},
		// 	},
		// 	expected: ASTAnalyzerTreeNode{
		// 		Label:    "String",
		// 		IconName: "folder",
		// 		Type:     ASTAnalyzerTreeNodeTypeNavigation,
		// 		Children: []ASTAnalyzerTreeNode{
		// 			{
		// 				Label:    "Paths",
		// 				IconName: "folder",
		// 				Type:     ASTAnalyzerTreeNodeTypeNavigation,
		// 				Children: []ASTAnalyzerTreeNode{
		// 					{
		// 						Type:        ASTAnalyzerTreeNodeTypeMatch,
		// 						Label:       "/api/users",
		// 						Description: "test.go",
		// 						Data: AnalyzerMatch{
		// 							FilePath:     "test.go",
		// 							AnalyzerName: "test",
		// 							Value:        "/api/users",
		// 							Tags:         map[string]bool{"paths": true},
		// 						},
		// 					},
		// 				},
		// 			},
		// 			{
		// 				Label:    "Graphql",
		// 				IconName: "folder",
		// 				Type:     ASTAnalyzerTreeNodeTypeNavigation,
		// 				Children: []ASTAnalyzerTreeNode{
		// 					{
		// 						Type:        ASTAnalyzerTreeNodeTypeMatch,
		// 						Label:       "SELECT * FROM users",
		// 						Description: "test.go",
		// 						Data: AnalyzerMatch{
		// 							FilePath:     "test.go",
		// 							AnalyzerName: "test",
		// 							Value:        "SELECT * FROM users",
		// 							Tags:         map[string]bool{"graphql": true},
		// 						},
		// 					},
		// 				},
		// 			},
		// 			{
		// 				Label:    "Secret",
		// 				IconName: "folder",
		// 				Type:     ASTAnalyzerTreeNodeTypeNavigation,
		// 				Children: []ASTAnalyzerTreeNode{
		// 					{
		// 						Label:    "Pii",
		// 						IconName: "folder",
		// 						Type:     ASTAnalyzerTreeNodeTypeNavigation,
		// 						Children: []ASTAnalyzerTreeNode{
		// 							{
		// 								Type:        ASTAnalyzerTreeNodeTypeMatch,
		// 								Label:       "password123",
		// 								Description: "test.go",
		// 								Data: AnalyzerMatch{
		// 									FilePath:     "test.go",
		// 									AnalyzerName: "test",
		// 									Value:        "password123",
		// 									Tags:         map[string]bool{"secret": true, "pii": true},
		// 								},
		// 							},
		// 						},
		// 					},
		// 				},
		// 			},
		// 			{
		// 				Label:    "Pii",
		// 				IconName: "folder",
		// 				Type:     ASTAnalyzerTreeNodeTypeNavigation,
		// 				Children: []ASTAnalyzerTreeNode{
		// 					{
		// 						Label:    "Secret",
		// 						IconName: "folder",
		// 						Type:     ASTAnalyzerTreeNodeTypeNavigation,
		// 						Children: []ASTAnalyzerTreeNode{
		// 							{
		// 								Type:        ASTAnalyzerTreeNodeTypeMatch,
		// 								Label:       "password123",
		// 								Description: "test.go",
		// 								Data: AnalyzerMatch{
		// 									FilePath:     "test.go",
		// 									AnalyzerName: "test",
		// 									Value:        "password123",
		// 									Tags:         map[string]bool{"secret": true, "pii": true},
		// 								},
		// 							},
		// 						},
		// 					},
		// 				},
		// 			},
		// 		},
		// 	},
		// },
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := formatMatchesV1(tt.matches)
			assert.Equal(t, tt.expected, result)
		})
	}
}
