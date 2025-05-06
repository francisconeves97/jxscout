package astanalyzer

import (
	"strings"

	"github.com/francisconeves97/jxscout/internal/core/common"
)

type AnalyzerMatch struct {
	FilePath     string          `json:"filePath"`
	AnalyzerName string          `json:"analyzerName"`
	Value        string          `json:"value"`
	Start        Position        `json:"start"`
	End          Position        `json:"end"`
	Tags         map[string]bool `json:"tags"`
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

func normalizeLabel(s string) string {
	return strings.Join(strings.Fields(strings.ReplaceAll(s, "\n", " ")), " ")
}

func matchToTreeNode(match AnalyzerMatch) ASTAnalyzerTreeNode {
	return ASTAnalyzerTreeNode{
		Type:        ASTAnalyzerTreeNodeTypeMatch,
		Data:        match,
		Label:       normalizeLabel(match.Value),
		Description: match.FilePath,
	}
}

func formatMatchesV1(matches []AnalyzerMatch) []ASTAnalyzerTreeNode {
	// Group matches by their tags
	matchesByTag := make(map[string][]AnalyzerMatch)
	for _, match := range matches {
		for tag := range match.Tags {
			matchesByTag[tag] = append(matchesByTag[tag], match)
		}
	}

	rootNodes := make([]ASTAnalyzerTreeNode, 0)

	// Client Behavior
	if hasAnyMatches(matchesByTag, clientBehaviorTags) {
		behaviorNode := buildClientBehaviorTree(matchesByTag)
		rootNodes = append(rootNodes, behaviorNode)
	}

	// Object Schemas
	if hasAnyMatches(matchesByTag, objectSchemasTags) {
		objectSchemasNode := buildObjectSchemasTree(matchesByTag)
		rootNodes = append(rootNodes, objectSchemasNode)
	}

	return rootNodes
}

// Object Schemas
// fetch options Tags
var fetchOptionsTags = []string{"fetch-options"}

var objectSchemasTags = common.AppendAll(
	fetchOptionsTags,
)

func buildObjectSchemasTree(matchesByTag map[string][]AnalyzerMatch) ASTAnalyzerTreeNode {
	objectSchemasNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
		Label: "Object Schemas",
	})

	if hasAnyMatches(matchesByTag, fetchOptionsTags) {
		fetchOptionsNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label: "Fetch Options",
		})

		addMatchesToNode(&fetchOptionsNode, matchesByTag, fetchOptionsTags)
		objectSchemasNode.Children = append(objectSchemasNode.Children, fetchOptionsNode)
	}

	return objectSchemasNode
}

// Client Behavior Tags
// Event Tags
var eventTags = []string{"add-event-listener", "onmessage", "postMessage", "onhashchange"}
var addEventListenerTags = []string{"add-event-listener"}
var onmessageTags = []string{"onmessage"}
var postMessageTags = []string{"postMessage"}
var onhashchangeTags = []string{"onhashchange"}

// eval Tags
var evalTags = []string{"eval"}

// document.domain Tags
var documentDomainTags = []string{"domain-assignment", "domain-read"}
var documentDomainAssignmentTags = []string{"domain-assignment"}
var documentDomainReadTags = []string{"domain-read"}

// window.open Tags
var windowOpenTags = []string{"window-open"}

// innerHTML Tags
var innerHTMLTags = []string{"inner-html"}

// fetch Tags
var fetchTags = []string{"fetch-call"}

// URLSearchParams Tags
var urlSearchParamsTags = []string{"url-search-params"}

// location Tags
var locationTags = []string{"location"}
var locationAssignmentTags = []string{"location-assignment"}
var locationReadTags = []string{"location-read"}

// window.name Tags
var windowNameTags = []string{"window-name-assignment", "window-name-read"}
var windowNameAssignmentTags = []string{"window-name-assignment"}
var windowNameReadTags = []string{"window-name-read"}

// Storage tags
var storageTags = []string{"cookie", "local-storage", "session-storage"}

// cookie tags
var cookieTags = []string{"cookie"}
var cookieAssignmentTags = []string{"cookie-assignment"}
var cookieReadTags = []string{"cookie-read"}

// local-storage tags
var localStorageTags = []string{"local-storage"}

// session-storage tags
var sessionStorageTags = []string{"session-storage"}

var clientBehaviorTags = common.AppendAll(
	eventTags,
	evalTags,
	documentDomainTags,
	windowOpenTags,
	innerHTMLTags,
	fetchTags,
	urlSearchParamsTags,
	locationTags,
	storageTags,
)

func buildClientBehaviorTree(matchesByTag map[string][]AnalyzerMatch) ASTAnalyzerTreeNode {
	behaviorNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
		Label: "Client Behavior",
	})

	// Events
	if hasAnyMatches(matchesByTag, eventTags) {
		eventsNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label: "Events",
		})

		// add event listener matches
		if hasAnyMatches(matchesByTag, addEventListenerTags) {
			eventListenerNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label: "addEventListener",
			})

			addMatchesToNode(&eventListenerNode, matchesByTag, addEventListenerTags)
			eventsNode.Children = append(eventsNode.Children, eventListenerNode)
		}

		// onmessage
		if hasAnyMatches(matchesByTag, onmessageTags) {
			onmessageNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label: "onmessage",
			})

			addMatchesToNode(&onmessageNode, matchesByTag, onmessageTags)
			eventsNode.Children = append(eventsNode.Children, onmessageNode)
		}

		// postmessage
		if hasAnyMatches(matchesByTag, postMessageTags) {
			postmessageNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label: "postMessage",
			})

			addMatchesToNode(&postmessageNode, matchesByTag, postMessageTags)
			eventsNode.Children = append(eventsNode.Children, postmessageNode)
		}

		// onhashchange
		if hasAnyMatches(matchesByTag, onhashchangeTags) {
			onhashchangeNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label: "onhashchange",
			})

			addMatchesToNode(&onhashchangeNode, matchesByTag, onhashchangeTags)
			eventsNode.Children = append(eventsNode.Children, onhashchangeNode)
		}

		behaviorNode.Children = append(behaviorNode.Children, eventsNode)
	}

	if hasAnyMatches(matchesByTag, evalTags) {
		evalNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label: "eval",
		})

		addMatchesToNode(&evalNode, matchesByTag, evalTags)
		behaviorNode.Children = append(behaviorNode.Children, evalNode)
	}

	if hasAnyMatches(matchesByTag, documentDomainTags) {
		documentDomainNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label: "document.domain",
		})

		if hasAnyMatches(matchesByTag, documentDomainAssignmentTags) {
			assignmentNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label: "Assignment",
			})

			addMatchesToNode(&assignmentNode, matchesByTag, documentDomainAssignmentTags)
			documentDomainNode.Children = append(documentDomainNode.Children, assignmentNode)
		}

		if hasAnyMatches(matchesByTag, documentDomainReadTags) {
			readNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label: "Read",
			})

			addMatchesToNode(&readNode, matchesByTag, documentDomainReadTags)
			documentDomainNode.Children = append(documentDomainNode.Children, readNode)
		}

		behaviorNode.Children = append(behaviorNode.Children, documentDomainNode)
	}

	if hasAnyMatches(matchesByTag, windowOpenTags) {
		windowOpenNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label: "window.open",
		})

		addMatchesToNode(&windowOpenNode, matchesByTag, windowOpenTags)
		behaviorNode.Children = append(behaviorNode.Children, windowOpenNode)
	}

	if hasAnyMatches(matchesByTag, innerHTMLTags) {
		innerHTMLNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label: "innerHTML",
		})

		addMatchesToNode(&innerHTMLNode, matchesByTag, innerHTMLTags)
		behaviorNode.Children = append(behaviorNode.Children, innerHTMLNode)
	}

	if hasAnyMatches(matchesByTag, fetchTags) {
		fetchNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label: "fetch",
		})

		addMatchesToNode(&fetchNode, matchesByTag, fetchTags)
		behaviorNode.Children = append(behaviorNode.Children, fetchNode)
	}

	if hasAnyMatches(matchesByTag, urlSearchParamsTags) {
		urlSearchParamsNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label: "URLSearchParams",
		})

		addMatchesToNode(&urlSearchParamsNode, matchesByTag, urlSearchParamsTags)
		behaviorNode.Children = append(behaviorNode.Children, urlSearchParamsNode)
	}

	if hasAnyMatches(matchesByTag, locationTags) {
		locationNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label: "Location",
		})

		if hasAnyMatches(matchesByTag, locationAssignmentTags) {
			assignmentNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label: "Assignment",
			})

			matches := getMatchesForTags(matchesByTag, locationAssignmentTags)

			matchesByTag := groupMatchesByTagStartingWith(matches, "property-")
			for tag, matches := range matchesByTag {
				propertyNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
					Label: tag,
				})
				addAllMatchesToNode(&propertyNode, matches)
				assignmentNode.Children = append(assignmentNode.Children, propertyNode)
			}

			locationNode.Children = append(locationNode.Children, assignmentNode)
		}

		if hasAnyMatches(matchesByTag, locationReadTags) {
			readNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label: "Read",
			})

			matches := getMatchesForTags(matchesByTag, locationReadTags)

			matchesByTag := groupMatchesByTagStartingWith(matches, "property-")
			for tag, matches := range matchesByTag {
				propertyNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
					Label: tag,
				})

				addAllMatchesToNode(&propertyNode, matches)
				readNode.Children = append(readNode.Children, propertyNode)
			}

			locationNode.Children = append(locationNode.Children, readNode)
		}

		behaviorNode.Children = append(behaviorNode.Children, locationNode)
	}

	if hasAnyMatches(matchesByTag, windowNameTags) {
		windowNameNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label: "window.name",
		})

		if hasAnyMatches(matchesByTag, windowNameAssignmentTags) {
			assignmentNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label: "Assignment",
			})

			addMatchesToNode(&assignmentNode, matchesByTag, windowNameAssignmentTags)
			windowNameNode.Children = append(windowNameNode.Children, assignmentNode)
		}

		if hasAnyMatches(matchesByTag, windowNameReadTags) {
			readNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label: "Read",
			})

			addMatchesToNode(&readNode, matchesByTag, windowNameReadTags)
			windowNameNode.Children = append(windowNameNode.Children, readNode)
		}

		behaviorNode.Children = append(behaviorNode.Children, windowNameNode)
	}

	if hasAnyMatches(matchesByTag, storageTags) {
		storageNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label: "Storage",
		})

		if hasAnyMatches(matchesByTag, cookieTags) {
			cookieNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label: "Cookie",
			})

			if hasAnyMatches(matchesByTag, cookieAssignmentTags) {
				assignmentNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
					Label: "Assignment",
				})

				addMatchesToNode(&assignmentNode, matchesByTag, cookieAssignmentTags)
				cookieNode.Children = append(cookieNode.Children, assignmentNode)
			}

			if hasAnyMatches(matchesByTag, cookieReadTags) {
				readNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
					Label: "Read",
				})

				addMatchesToNode(&readNode, matchesByTag, cookieReadTags)
				cookieNode.Children = append(cookieNode.Children, readNode)
			}

			storageNode.Children = append(storageNode.Children, cookieNode)
		}

		if hasAnyMatches(matchesByTag, localStorageTags) {
			localStorageNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label: "localStorage",
			})

			matches := getMatchesForTags(matchesByTag, localStorageTags)
			for tag, matches := range groupMatchesByTagStartingWith(matches, "property-") {
				propertyNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
					Label: tag,
				})

				addAllMatchesToNode(&propertyNode, matches)
				localStorageNode.Children = append(localStorageNode.Children, propertyNode)
			}

			storageNode.Children = append(storageNode.Children, localStorageNode)
		}

		if hasAnyMatches(matchesByTag, sessionStorageTags) {
			sessionStorageNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label: "sessionStorage",
			})

			matches := getMatchesForTags(matchesByTag, sessionStorageTags)
			for tag, matches := range groupMatchesByTagStartingWith(matches, "property-") {
				propertyNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
					Label: tag,
				})

				addAllMatchesToNode(&propertyNode, matches)
				sessionStorageNode.Children = append(sessionStorageNode.Children, propertyNode)
			}

			storageNode.Children = append(storageNode.Children, sessionStorageNode)
		}

		behaviorNode.Children = append(behaviorNode.Children, storageNode)
	}

	return behaviorNode
}

func groupMatchesByTagStartingWith(matches []AnalyzerMatch, prefix string) map[string][]AnalyzerMatch {
	matchesByTag := make(map[string][]AnalyzerMatch)

	for _, match := range matches {
		for tag := range match.Tags {
			if strings.HasPrefix(tag, prefix) {
				matchesByTag[strings.TrimPrefix(tag, prefix)] = append(matchesByTag[strings.TrimPrefix(tag, prefix)], match)
			}
		}
	}
	return matchesByTag
}

func addAllMatchesToNode(node *ASTAnalyzerTreeNode, matches []AnalyzerMatch) {
	for _, match := range matches {
		matchNode := matchToTreeNode(match)
		node.Children = append(node.Children, matchNode)
	}
}

func addMatchesToNode(node *ASTAnalyzerTreeNode, matchesByTag map[string][]AnalyzerMatch, tags []string) {
	for _, tag := range tags {
		if matches, exists := matchesByTag[tag]; exists && len(matches) > 0 {
			for _, match := range matches {
				matchNode := matchToTreeNode(match)
				node.Children = append(node.Children, matchNode)
			}
		}
	}
}

func getMatchesForTags(matchesByTag map[string][]AnalyzerMatch, tags []string) []AnalyzerMatch {
	result := make([]AnalyzerMatch, 0)
	for _, tag := range tags {
		if matches, exists := matchesByTag[tag]; exists && len(matches) > 0 {
			result = append(result, matches...)
		}
	}
	return result
}

func hasAnyMatches(matchesByTag map[string][]AnalyzerMatch, tags []string) bool {
	for _, tag := range tags {
		if len(matchesByTag[tag]) > 0 {
			return true
		}
	}
	return false
}
