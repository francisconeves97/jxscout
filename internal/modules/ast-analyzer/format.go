package astanalyzer

import (
	"golang.org/x/text/cases"
	"golang.org/x/text/language"
)

const (
	pathsAnalyzer = "paths"
)

type AnalyzerMatch struct {
	FilePath     string          `json:"filePath"`
	AnalyzerName string          `json:"analyzerName"`
	Value        string          `json:"value"`
	Start        Position        `json:"start"`
	End          Position        `json:"end"`
	Tags         map[string]bool `json:"tags"`
}

type TreeNode[T any] struct {
	Label string `json:"label"`
	Icon  string `json:"icon"`
	Value T      `json:"value"`
}

type Paths struct {
	All         TreeNode[[]AnalyzerMatch] `json:"all,omitempty"`
	APIPaths    TreeNode[[]AnalyzerMatch] `json:"apiPaths,omitempty"`
	QueryParams TreeNode[[]AnalyzerMatch] `json:"queryParams,omitempty"`
}

type ASTAnalyzerTreeNodeType string

const (
	ASTAnalyzerTreeNodeTypeNavigation = "navigation"
	ASTAnalyzerTreeNodeTypeMatch      = "match"
)

type ASTAnalyzerTreeNode struct {
	ID          string                  `json:"id,omitempty"`
	Type        ASTAnalyzerTreeNodeType `json:"type,omitempty"`
	Data        any                     `json:"data,omitempty"`
	Label       string                  `json:"label,omitempty"`
	Description string                  `json:"description,omitempty"`
	IconName    string                  `json:"iconName,omitempty"`
	Tooltip     string                  `json:"tooltip,omitempty"`
	Children    []ASTAnalyzerTreeNode   `json:"children,omitempty"`
}

func createNavigationTreeNode(node ASTAnalyzerTreeNode) ASTAnalyzerTreeNode {
	node.Type = ASTAnalyzerTreeNodeTypeNavigation
	return node
}

func matchToTreeNode(match AnalyzerMatch) ASTAnalyzerTreeNode {
	return ASTAnalyzerTreeNode{
		Type: ASTAnalyzerTreeNodeTypeMatch,
		Data: match,
	}
}

func formatMatchesV1(matches []AnalyzerMatch) ASTAnalyzerTreeNode {
	// Group matches by their tags
	matchesByTag := make(map[string][]AnalyzerMatch)
	for _, match := range matches {
		for tag := range match.Tags {
			matchesByTag[tag] = append(matchesByTag[tag], match)
		}
	}

	// Create root node
	root := ASTAnalyzerTreeNode{
		Label:    "String",
		IconName: "folder",
		Type:     ASTAnalyzerTreeNodeTypeNavigation,
	}

	// Define the primary tags that should be at level 2
	primaryTags := []string{"paths", "urls", "extension", "graphql", "secret", "pii"}

	// Build the tree
	for _, tag := range primaryTags {
		if matches, exists := matchesByTag[tag]; exists && len(matches) > 0 {
			primaryNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label:    cases.Title(language.English).String(tag),
				IconName: "folder",
			})

			// For extension, secret, and pii, we need to look for other tags
			if tag == "extension" || tag == "secret" || tag == "pii" {
				// Create a map to group matches by their other tags
				matchesByOtherTag := make(map[string][]AnalyzerMatch)
				for _, match := range matches {
					for otherTag := range match.Tags {
						if otherTag != tag {
							matchesByOtherTag[otherTag] = append(matchesByOtherTag[otherTag], match)
						}
					}
				}

				// Create sub-nodes for each other tag
				for otherTag, subMatches := range matchesByOtherTag {
					if len(subMatches) > 0 {
						subNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
							Label:    cases.Title(language.English).String(otherTag),
							IconName: "folder",
						})

						for _, match := range subMatches {
							treeNode := matchToTreeNode(match)
							treeNode.Label = match.Value
							treeNode.Description = match.FilePath
							subNode.Children = append(subNode.Children, treeNode)
						}

						primaryNode.Children = append(primaryNode.Children, subNode)
					}
				}
			} else {
				// For other tags, add matches directly
				for _, match := range matches {
					treeNode := matchToTreeNode(match)
					treeNode.Label = match.Value
					treeNode.Description = match.FilePath
					primaryNode.Children = append(primaryNode.Children, treeNode)
				}
			}

			root.Children = append(root.Children, primaryNode)
		}
	}

	// Only return the root if it has children
	if len(root.Children) > 0 {
		return root
	}

	return ASTAnalyzerTreeNode{}
}
