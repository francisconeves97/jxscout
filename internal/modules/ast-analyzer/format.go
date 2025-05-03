package astanalyzer

import (
	"strings"

	"golang.org/x/text/cases"
	"golang.org/x/text/language"
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

	// Define the main categories and their subcategories
	categories := map[string][]string{
		"iframe-communication": {"post-message", "message-listener"},
		"storage":              {"cookie-manipulation", "session-storage", "local-storage", "local-file-path-manipulation"},
		"sources":              {"common-sources"},
		"behavior":             {"hash-change", "open-redirection"},
		"data":                 {"paths", "urls", "extension", "graphql", "secret", "pii"},
	}

	// Create root nodes for each category
	var rootNodes []ASTAnalyzerTreeNode

	// Handle iframe communication
	if hasAnyMatches(matchesByTag, categories["iframe-communication"]) {
		iframeNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label:    "Iframe Communication",
			IconName: "folder",
		})
		addSubcategories(&iframeNode, matchesByTag, categories["iframe-communication"])
		rootNodes = append(rootNodes, iframeNode)
	}

	// Handle storage
	if hasAnyMatches(matchesByTag, categories["storage"]) {
		storageNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label:    "Storage",
			IconName: "folder",
		})
		addSubcategories(&storageNode, matchesByTag, categories["storage"])
		rootNodes = append(rootNodes, storageNode)
	}

	// Handle sources
	if hasAnyMatches(matchesByTag, categories["sources"]) {
		sourcesNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label:    "Sources",
			IconName: "folder",
		})
		addSubcategories(&sourcesNode, matchesByTag, categories["sources"])
		rootNodes = append(rootNodes, sourcesNode)
	}

	// Handle behavior
	if hasAnyMatches(matchesByTag, categories["behavior"]) || hasMiscMatches(matchesByTag) {
		behaviorNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label:    "Behavior",
			IconName: "folder",
		})

		// Add hash-change and location assignment
		addSubcategories(&behaviorNode, matchesByTag, categories["behavior"])

		// Add misc matches directly
		if hasMiscMatches(matchesByTag) {
			miscNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label:    "Misc",
				IconName: "folder",
			})
			addMiscMatches(&miscNode, matchesByTag)
			behaviorNode.Children = append(behaviorNode.Children, miscNode)
		}

		rootNodes = append(rootNodes, behaviorNode)
	}

	// Handle data
	if hasAnyMatches(matchesByTag, categories["data"]) {
		dataNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label:    "Data",
			IconName: "folder",
		})
		addDataSubcategories(&dataNode, matchesByTag, categories["data"])
		rootNodes = append(rootNodes, dataNode)
	}

	// Only return if we have nodes
	if len(rootNodes) > 0 {
		return ASTAnalyzerTreeNode{
			Children: rootNodes,
		}
	}

	return ASTAnalyzerTreeNode{}
}

// Helper functions
func hasAnyMatches(matchesByTag map[string][]AnalyzerMatch, tags []string) bool {
	for _, tag := range tags {
		if len(matchesByTag[tag]) > 0 {
			return true
		}
	}
	return false
}

func hasMatches(matchesByTag map[string][]AnalyzerMatch, tag string) bool {
	return len(matchesByTag[tag]) > 0
}

func hasMiscMatches(matchesByTag map[string][]AnalyzerMatch) bool {
	miscTags := []string{
		"dom-xss", "jquery-dom-xss", "dom-data-manipulation",
		"link-manipulation", "javascript-injection", "websocket-url-poisoning",
		"document-domain-manipulation", "ajax-request-header-manipulation",
		"xpath-injection",
	}
	return hasAnyMatches(matchesByTag, miscTags)
}

func addSubcategories(parent *ASTAnalyzerTreeNode, matchesByTag map[string][]AnalyzerMatch, tags []string) {
	for _, tag := range tags {
		if matches, exists := matchesByTag[tag]; exists && len(matches) > 0 {
			label := strings.ReplaceAll(cases.Title(language.English).String(tag), "-", " ")
			if tag == "open-redirection" {
				label = "Location Assignment"
			}
			subNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label:    label,
				IconName: "folder",
			})
			for _, match := range matches {
				matchNode := matchToTreeNode(match)
				matchNode.Label = match.Value
				matchNode.Description = match.FilePath
				subNode.Children = append(subNode.Children, matchNode)
			}
			parent.Children = append(parent.Children, subNode)
		}
	}
}

func addMiscMatches(parent *ASTAnalyzerTreeNode, matchesByTag map[string][]AnalyzerMatch) {
	miscTags := []string{
		"dom-xss", "jquery-dom-xss", "dom-data-manipulation",
		"link-manipulation", "javascript-injection", "websocket-url-poisoning",
		"document-domain-manipulation", "ajax-request-header-manipulation",
		"xpath-injection",
	}

	for _, tag := range miscTags {
		if matches, exists := matchesByTag[tag]; exists && len(matches) > 0 {
			for _, match := range matches {
				matchNode := matchToTreeNode(match)
				matchNode.Label = match.Value
				matchNode.Description = match.FilePath
				parent.Children = append(parent.Children, matchNode)
			}
		}
	}
}

func addDataSubcategories(parent *ASTAnalyzerTreeNode, matchesByTag map[string][]AnalyzerMatch, tags []string) {
	for _, tag := range tags {
		if matches, exists := matchesByTag[tag]; exists && len(matches) > 0 {
			label := strings.ReplaceAll(cases.Title(language.English).String(tag), "-", " ")
			subNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label:    label,
				IconName: "folder",
			})

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
						otherLabel := strings.ReplaceAll(cases.Title(language.English).String(otherTag), "-", " ")
						otherNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
							Label:    otherLabel,
							IconName: "folder",
						})
						for _, match := range subMatches {
							matchNode := matchToTreeNode(match)
							matchNode.Label = match.Value
							matchNode.Description = match.FilePath
							otherNode.Children = append(otherNode.Children, matchNode)
						}
						subNode.Children = append(subNode.Children, otherNode)
					}
				}
			} else {
				for _, match := range matches {
					matchNode := matchToTreeNode(match)
					matchNode.Label = match.Value
					matchNode.Description = match.FilePath
					subNode.Children = append(subNode.Children, matchNode)
				}
			}

			parent.Children = append(parent.Children, subNode)
		}
	}
}
