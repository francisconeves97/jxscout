package astanalyzer

import "strings"

const (
	pathsAnalyzer = "paths"
)

type AnalyzerMatch struct {
	AnalyzerName string   `json:"analyzerName"`
	Value        string   `json:"value"`
	Start        Position `json:"start"`
	End          Position `json:"end"`
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
	IconPath    string                  `json:"iconPath,omitempty"`
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
	tree := ASTAnalyzerTreeNode{
		Children: []ASTAnalyzerTreeNode{
			formatPaths(matches),
		},
	}

	return tree
}

func formatPaths(matches []AnalyzerMatch) ASTAnalyzerTreeNode {
	paths := []ASTAnalyzerTreeNode{}
	api := []ASTAnalyzerTreeNode{}
	queryParams := []ASTAnalyzerTreeNode{}

	for _, match := range matches {
		if match.AnalyzerName != pathsAnalyzer {
			continue
		}

		treeNode := matchToTreeNode(match)

		paths = append(paths, treeNode)

		if strings.Contains(match.Value, "api") {
			api = append(api, treeNode)
		}

		// really dumb version
		if strings.Contains(match.Value, "?") {
			queryParams = append(queryParams, treeNode)
		}
	}

	return createNavigationTreeNode(ASTAnalyzerTreeNode{
		Label: "Paths",
		Children: []ASTAnalyzerTreeNode{
			createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label:    "All",
				Children: paths,
			}),
			createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label:    "API",
				Children: api,
			}),
			createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label:    "Query Params",
				Children: queryParams,
			}),
		},
	})
}
