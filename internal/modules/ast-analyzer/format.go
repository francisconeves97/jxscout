package astanalyzer

import (
	"fmt"
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
	Extra        map[string]any  `json:"extra"`
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
	if strings.HasPrefix(s, "\"") && strings.HasSuffix(s, "\"") {
		s = strings.TrimPrefix(s, "\"")
		s = strings.TrimSuffix(s, "\"")
	}
	if strings.HasPrefix(s, "'") && strings.HasSuffix(s, "'") {
		s = strings.TrimPrefix(s, "'")
		s = strings.TrimSuffix(s, "'")
	}
	if strings.HasPrefix(s, "`") && strings.HasSuffix(s, "`") {
		s = strings.TrimPrefix(s, "`")
		s = strings.TrimSuffix(s, "`")
	}
	s = strings.ReplaceAll(s, "\n", " ")

	return strings.Join(strings.Fields(s), " ")
}

func matchToTreeNode(match AnalyzerMatch) ASTAnalyzerTreeNode {
	return ASTAnalyzerTreeNode{
		Type:  ASTAnalyzerTreeNodeTypeMatch,
		Data:  match,
		Label: normalizeLabel(match.Value),
	}
}

func updateNodeDescriptionsWithCounts(node *ASTAnalyzerTreeNode) int {
	if node.Type != ASTAnalyzerTreeNodeTypeNavigation {
		return 1
	}

	totalCount := 0
	for i := range node.Children {
		totalCount += updateNodeDescriptionsWithCounts(&node.Children[i])
	}

	if totalCount > 0 {
		node.Description = fmt.Sprintf("[%d]", totalCount)
	}
	return totalCount
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

	// Data
	if hasAnyMatches(matchesByTag, dataTags) {
		dataNode := buildDataTree(matchesByTag)
		rootNodes = append(rootNodes, dataNode)
	}

	// Frameworks
	if hasAnyMatches(matchesByTag, frameworkTags) {
		frameworksNode := buildFrameworksTree(matchesByTag)
		rootNodes = append(rootNodes, frameworksNode)
	}

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

	// Update descriptions with counts
	for i := range rootNodes {
		updateNodeDescriptionsWithCounts(&rootNodes[i])
	}

	return rootNodes
}

// Data Tags

// path Tags
var pathTags = []string{"is-url", "is-path-only", "api", "query", "fragment"}
var apiTags = []string{"api"}
var isUrlTags = []string{"is-url"}
var isPathOnlyTags = []string{"is-path-only"}
var queryTags = []string{"query"}
var fragmentTags = []string{"fragment"}

// extension Tags
var extensionTags = []string{"is-extension"}

// mime-type Tags
var mimeTypeTags = []string{"mime-type"}

// hostname Tags
var hostnameTags = []string{"hostname-string", "is-url-only"}

// regex Tags
var regexTags = []string{"regex-match", "regex-pattern"}
var regexMatchTags = []string{"regex-match"}
var regexPatternTags = []string{"regex-pattern"}

// secret Tags
var secretTags = []string{"secret"}

// graphql Tags
var graphqlTags = []string{"graphql"}
var graphqlQueryTags = []string{"graphql-query"}
var graphqlMutationTags = []string{"graphql-mutation"}
var graphqlOtherTags = []string{"graphql-other"}

var dataTags = common.AppendAll(
	pathTags,
	hostnameTags,
	regexTags,
	secretTags,
)

func buildDataTree(matchesByTag map[string][]AnalyzerMatch) ASTAnalyzerTreeNode {
	dataNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
		Label:    "Data",
		IconName: "resources:data",
	})

	if hasAnyMatches(matchesByTag, pathTags) {
		pathNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label:    "Paths",
			IconName: "resources:path",
		})

		if hasAnyMatches(matchesByTag, isPathOnlyTags) {
			isPathOnlyNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label:    "Paths",
				IconName: "resources:path",
			})

			addMatchesToNode(&isPathOnlyNode, matchesByTag, isPathOnlyTags)
			pathNode.Children = append(pathNode.Children, isPathOnlyNode)
		}

		if hasAnyMatches(matchesByTag, apiTags) {
			apiNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label:    "API",
				IconName: "resources:api",
			})

			addMatchesToNode(&apiNode, matchesByTag, apiTags)
			pathNode.Children = append(pathNode.Children, apiNode)
		}

		if hasAnyMatches(matchesByTag, isUrlTags) {
			isUrlNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label:    "URL Paths",
				IconName: "resources:http",
			})

			addMatchesToNode(&isUrlNode, matchesByTag, isUrlTags)
			pathNode.Children = append(pathNode.Children, isUrlNode)
		}

		if hasAnyMatches(matchesByTag, queryTags) {
			queryNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label:    "Query",
				IconName: "resources:query",
			})

			addMatchesToNode(&queryNode, matchesByTag, queryTags)
			pathNode.Children = append(pathNode.Children, queryNode)
		}

		if hasAnyMatches(matchesByTag, fragmentTags) {
			fragmentNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label:    "Fragment",
				IconName: "resources:hash",
			})

			addMatchesToNode(&fragmentNode, matchesByTag, fragmentTags)
			pathNode.Children = append(pathNode.Children, fragmentNode)
		}

		dataNode.Children = append(dataNode.Children, pathNode)
	}

	if hasAnyMatches(matchesByTag, hostnameTags) {
		hostnameNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label:    "Hostname",
			IconName: "resources:hostname",
		})

		addMatchesToNode(&hostnameNode, matchesByTag, hostnameTags)
		dataNode.Children = append(dataNode.Children, hostnameNode)
	}

	if hasAnyMatches(matchesByTag, extensionTags) {
		extensionNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label:    "Extensions",
			IconName: "resources:extension",
		})

		matches := getMatchesForTags(matchesByTag, extensionTags)
		for tag, matches := range groupMatchesByTagStartingWith(matches, "extension-") {
			extensionTypeNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label:    tag,
				IconName: "resources:extension",
			})

			addAllMatchesToNode(&extensionTypeNode, matches)
			extensionNode.Children = append(extensionNode.Children, extensionTypeNode)
		}

		dataNode.Children = append(dataNode.Children, extensionNode)
	}

	if hasAnyMatches(matchesByTag, mimeTypeTags) {
		mimeTypeNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label:    "MIME Type",
			IconName: "resources:mime",
		})

		addMatchesToNode(&mimeTypeNode, matchesByTag, mimeTypeTags)
		dataNode.Children = append(dataNode.Children, mimeTypeNode)
	}

	if hasAnyMatches(matchesByTag, regexTags) {
		regexNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label:    "Regex",
			IconName: "resources:regex",
		})

		if hasAnyMatches(matchesByTag, regexMatchTags) {
			regexMatchNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label:    "Regex Match",
				IconName: "resources:regex",
			})

			addMatchesToNode(&regexMatchNode, matchesByTag, regexMatchTags)
			regexNode.Children = append(regexNode.Children, regexMatchNode)
		}

		if hasAnyMatches(matchesByTag, regexPatternTags) {
			regexPatternNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label:    "Regex Pattern",
				IconName: "resources:regex",
			})

			addMatchesToNode(&regexPatternNode, matchesByTag, regexPatternTags)
			regexNode.Children = append(regexNode.Children, regexPatternNode)
		}

		dataNode.Children = append(dataNode.Children, regexNode)
	}

	if hasAnyMatches(matchesByTag, secretTags) {
		secretNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label:    "Secrets",
			IconName: "resources:key",
		})

		matches := getMatchesForTags(matchesByTag, secretTags)
		for tag, matches := range groupMatchesByTagStartingWith(matches, "secret-type-") {
			secretTypeNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label:    tag,
				IconName: "resources:key",
			})

			addAllMatchesToNode(&secretTypeNode, matches)
			secretNode.Children = append(secretNode.Children, secretTypeNode)
		}

		dataNode.Children = append(dataNode.Children, secretNode)
	}

	if hasAnyMatches(matchesByTag, graphqlTags) {
		graphqlNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label:    "GraphQL",
			IconName: "resources:graphql",
		})

		if hasAnyMatches(matchesByTag, graphqlQueryTags) {
			graphqlQueryNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label:    "Query",
				IconName: "resources:graphql",
			})

			addMatchesToNode(&graphqlQueryNode, matchesByTag, graphqlQueryTags)
			graphqlNode.Children = append(graphqlNode.Children, graphqlQueryNode)
		}

		if hasAnyMatches(matchesByTag, graphqlMutationTags) {
			graphqlMutationNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label:    "Mutation",
				IconName: "resources:graphql",
			})

			addMatchesToNode(&graphqlMutationNode, matchesByTag, graphqlMutationTags)
			graphqlNode.Children = append(graphqlNode.Children, graphqlMutationNode)
		}

		if hasAnyMatches(matchesByTag, graphqlOtherTags) {
			graphqlOtherNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label:    "Other",
				IconName: "resources:graphql",
			})

			addMatchesToNode(&graphqlOtherNode, matchesByTag, graphqlOtherTags)
			graphqlNode.Children = append(graphqlNode.Children, graphqlOtherNode)
		}

		dataNode.Children = append(dataNode.Children, graphqlNode)
	}
	return dataNode
}

// Frameworks Tags
var reactTags = []string{"dangerouslySetInnerHTML-jsx", "dangerouslySetInnerHTML-object"}

var frameworkTags = common.AppendAll(
	reactTags,
)

func buildFrameworksTree(matchesByTag map[string][]AnalyzerMatch) ASTAnalyzerTreeNode {
	frameworksNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
		Label:    "Frameworks",
		IconName: "resources:react",
	})

	if hasAnyMatches(matchesByTag, reactTags) {
		reactNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label:    "React",
			IconName: "resources:react",
		})

		dangerouslySetInnerHTMLNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label:    "dangerouslySetInnerHTML",
			IconName: "resources:react",
		})

		addMatchesToNode(&dangerouslySetInnerHTMLNode, matchesByTag, reactTags)

		reactNode.Children = append(reactNode.Children, dangerouslySetInnerHTMLNode)
		frameworksNode.Children = append(frameworksNode.Children, reactNode)
	}

	return frameworksNode
}

// Object Schemas
// fetch options Tags
var fetchOptionsTags = []string{"fetch-options"}

var objectSchemasTags = common.AppendAll(
	fetchOptionsTags,
)

func buildObjectSchemasTree(matchesByTag map[string][]AnalyzerMatch) ASTAnalyzerTreeNode {
	objectSchemasNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
		Label:    "Object Schemas",
		IconName: "resources:schema",
	})

	if hasAnyMatches(matchesByTag, fetchOptionsTags) {
		fetchOptionsNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label:    "Fetch Options",
			IconName: "resources:schema",
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

// Rest Client
var restClientTags = []string{"http-method"}

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
	restClientTags,
	urlSearchParamsTags,
	locationTags,
	storageTags,
)

func buildClientBehaviorTree(matchesByTag map[string][]AnalyzerMatch) ASTAnalyzerTreeNode {
	behaviorNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
		Label:    "Client Behavior",
		IconName: "resources:javascript",
	})

	// Events
	if hasAnyMatches(matchesByTag, eventTags) {
		eventsNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label:    "Events",
			IconName: "resources:event",
		})

		// add event listener matches
		if hasAnyMatches(matchesByTag, addEventListenerTags) {
			eventListenerNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label:    "addEventListener",
				IconName: "resources:event",
			})

			addMatchesToNode(&eventListenerNode, matchesByTag, addEventListenerTags)
			eventsNode.Children = append(eventsNode.Children, eventListenerNode)
		}

		// onmessage
		if hasAnyMatches(matchesByTag, onmessageTags) {
			onmessageNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label:    "onmessage",
				IconName: "resources:onmessage",
			})

			addMatchesToNode(&onmessageNode, matchesByTag, onmessageTags)
			eventsNode.Children = append(eventsNode.Children, onmessageNode)
		}

		// postmessage
		if hasAnyMatches(matchesByTag, postMessageTags) {
			postmessageNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label:    "postMessage",
				IconName: "resources:postmessage",
			})

			addMatchesToNode(&postmessageNode, matchesByTag, postMessageTags)
			eventsNode.Children = append(eventsNode.Children, postmessageNode)
		}

		// onhashchange
		if hasAnyMatches(matchesByTag, onhashchangeTags) {
			onhashchangeNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label:    "onhashchange",
				IconName: "resources:event",
			})

			addMatchesToNode(&onhashchangeNode, matchesByTag, onhashchangeTags)
			eventsNode.Children = append(eventsNode.Children, onhashchangeNode)
		}

		behaviorNode.Children = append(behaviorNode.Children, eventsNode)
	}

	if hasAnyMatches(matchesByTag, locationTags) {
		locationNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label:    "Location",
			IconName: "resources:javascript",
		})

		if hasAnyMatches(matchesByTag, locationAssignmentTags) {
			assignmentNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label:    "Assignment",
				IconName: "resources:javascript",
			})

			matches := getMatchesForTags(matchesByTag, locationAssignmentTags)

			matchesByTag := groupMatchesByTagStartingWith(matches, "property-")
			for tag, matches := range matchesByTag {
				propertyNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
					Label:    tag,
					IconName: "resources:javascript",
				})
				addAllMatchesToNode(&propertyNode, matches)
				assignmentNode.Children = append(assignmentNode.Children, propertyNode)
			}

			locationNode.Children = append(locationNode.Children, assignmentNode)
		}

		if hasAnyMatches(matchesByTag, locationReadTags) {
			readNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label:    "Read",
				IconName: "resources:javascript",
			})

			matches := getMatchesForTags(matchesByTag, locationReadTags)

			matchesByTag := groupMatchesByTagStartingWith(matches, "property-")
			for tag, matches := range matchesByTag {
				propertyNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
					Label:    tag,
					IconName: "resources:javascript",
				})

				addAllMatchesToNode(&propertyNode, matches)
				readNode.Children = append(readNode.Children, propertyNode)
			}

			locationNode.Children = append(locationNode.Children, readNode)
		}

		behaviorNode.Children = append(behaviorNode.Children, locationNode)
	}

	if hasAnyMatches(matchesByTag, storageTags) {
		storageNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label:    "Storage",
			IconName: "resources:storage",
		})

		if hasAnyMatches(matchesByTag, cookieTags) {
			cookieNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label:    "Cookie",
				IconName: "resources:cookie",
			})

			if hasAnyMatches(matchesByTag, cookieAssignmentTags) {
				assignmentNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
					Label:    "Assignment",
					IconName: "resources:cookie",
				})

				addMatchesToNode(&assignmentNode, matchesByTag, cookieAssignmentTags)
				cookieNode.Children = append(cookieNode.Children, assignmentNode)
			}

			if hasAnyMatches(matchesByTag, cookieReadTags) {
				readNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
					Label:    "Read",
					IconName: "resources:cookie",
				})

				addMatchesToNode(&readNode, matchesByTag, cookieReadTags)
				cookieNode.Children = append(cookieNode.Children, readNode)
			}

			storageNode.Children = append(storageNode.Children, cookieNode)
		}

		if hasAnyMatches(matchesByTag, localStorageTags) {
			localStorageNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label:    "localStorage",
				IconName: "resources:storage",
			})

			matches := getMatchesForTags(matchesByTag, localStorageTags)
			for tag, matches := range groupMatchesByTagStartingWith(matches, "property-") {
				propertyNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
					Label:    tag,
					IconName: "resources:storage",
				})

				addAllMatchesToNode(&propertyNode, matches)
				localStorageNode.Children = append(localStorageNode.Children, propertyNode)
			}

			storageNode.Children = append(storageNode.Children, localStorageNode)
		}

		if hasAnyMatches(matchesByTag, sessionStorageTags) {
			sessionStorageNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label:    "sessionStorage",
				IconName: "resources:storage",
			})

			matches := getMatchesForTags(matchesByTag, sessionStorageTags)
			for tag, matches := range groupMatchesByTagStartingWith(matches, "property-") {
				propertyNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
					Label:    tag,
					IconName: "resources:storage",
				})

				addAllMatchesToNode(&propertyNode, matches)
				sessionStorageNode.Children = append(sessionStorageNode.Children, propertyNode)
			}

			storageNode.Children = append(storageNode.Children, sessionStorageNode)
		}

		behaviorNode.Children = append(behaviorNode.Children, storageNode)
	}

	if hasAnyMatches(matchesByTag, evalTags) {
		evalNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label:    "eval",
			IconName: "resources:javascript",
		})

		addMatchesToNode(&evalNode, matchesByTag, evalTags)
		behaviorNode.Children = append(behaviorNode.Children, evalNode)
	}

	if hasAnyMatches(matchesByTag, documentDomainTags) {
		documentDomainNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label:    "document.domain",
			IconName: "resources:javascript",
		})

		if hasAnyMatches(matchesByTag, documentDomainAssignmentTags) {
			assignmentNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label:    "Assignment",
				IconName: "resources:javascript",
			})

			addMatchesToNode(&assignmentNode, matchesByTag, documentDomainAssignmentTags)
			documentDomainNode.Children = append(documentDomainNode.Children, assignmentNode)
		}

		if hasAnyMatches(matchesByTag, documentDomainReadTags) {
			readNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label:    "Read",
				IconName: "resources:javascript",
			})

			addMatchesToNode(&readNode, matchesByTag, documentDomainReadTags)
			documentDomainNode.Children = append(documentDomainNode.Children, readNode)
		}

		behaviorNode.Children = append(behaviorNode.Children, documentDomainNode)
	}

	if hasAnyMatches(matchesByTag, urlSearchParamsTags) {
		urlSearchParamsNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label:    "URLSearchParams",
			IconName: "resources:javascript",
		})

		addMatchesToNode(&urlSearchParamsNode, matchesByTag, urlSearchParamsTags)
		behaviorNode.Children = append(behaviorNode.Children, urlSearchParamsNode)
	}

	if hasAnyMatches(matchesByTag, windowOpenTags) {
		windowOpenNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label:    "window.open",
			IconName: "resources:javascript",
		})

		addMatchesToNode(&windowOpenNode, matchesByTag, windowOpenTags)
		behaviorNode.Children = append(behaviorNode.Children, windowOpenNode)
	}

	if hasAnyMatches(matchesByTag, innerHTMLTags) {
		innerHTMLNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label:    "innerHTML",
			IconName: "resources:javascript",
		})

		addMatchesToNode(&innerHTMLNode, matchesByTag, innerHTMLTags)
		behaviorNode.Children = append(behaviorNode.Children, innerHTMLNode)
	}

	if hasAnyMatches(matchesByTag, fetchTags) {
		fetchNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label:    "fetch",
			IconName: "resources:javascript",
		})

		addMatchesToNode(&fetchNode, matchesByTag, fetchTags)
		behaviorNode.Children = append(behaviorNode.Children, fetchNode)
	}

	if hasAnyMatches(matchesByTag, restClientTags) {
		restClientNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label:    "Possible Rest Client",
			IconName: "resources:javascript",
		})

		matches := getMatchesForTags(matchesByTag, restClientTags)
		for tag, matches := range groupMatchesByTagStartingWith(matches, "method-") {
			methodNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label:    tag,
				IconName: "resources:javascript",
			})

			addAllMatchesToNode(&methodNode, matches)
			restClientNode.Children = append(restClientNode.Children, methodNode)
		}

		behaviorNode.Children = append(behaviorNode.Children, restClientNode)
	}

	if hasAnyMatches(matchesByTag, windowNameTags) {
		windowNameNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label:    "window.name",
			IconName: "resources:javascript",
		})

		if hasAnyMatches(matchesByTag, windowNameAssignmentTags) {
			assignmentNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label:    "Assignment",
				IconName: "resources:javascript",
			})

			addMatchesToNode(&assignmentNode, matchesByTag, windowNameAssignmentTags)
			windowNameNode.Children = append(windowNameNode.Children, assignmentNode)
		}

		if hasAnyMatches(matchesByTag, windowNameReadTags) {
			readNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label:    "Read",
				IconName: "resources:javascript",
			})

			addMatchesToNode(&readNode, matchesByTag, windowNameReadTags)
			windowNameNode.Children = append(windowNameNode.Children, readNode)
		}

		behaviorNode.Children = append(behaviorNode.Children, windowNameNode)
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
		matchNode.IconName = node.IconName
		node.Children = append(node.Children, matchNode)
	}
}

func addMatchesToNode(node *ASTAnalyzerTreeNode, matchesByTag map[string][]AnalyzerMatch, tags []string) {
	for _, tag := range tags {
		if matches, exists := matchesByTag[tag]; exists && len(matches) > 0 {
			for _, match := range matches {
				matchNode := matchToTreeNode(match)
				matchNode.IconName = node.IconName
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
