package astanalyzer

var tagToLabel = map[string]string{
	"add-event-listener":               "addEventListener",
	"onmessage":                        "onmessage",
	"postmessage":                      "postMessage",
	"onhashchange":                     "onhashchange",
	"eval":                             "eval",
	"document-domain":                  "document.domain",
	"window-open":                      "window.open",
	"inner-html":                       "innerHTML",
	"fetch":                            "fetch",
	"url-search-params":                "new URLSearchParams",
	"location":                         "Location",
	"window-name":                      "window.name",
	"fetch-options":                    "Fetch Options",
	"cookie":                           "Cookie",
	"local-storage":                    "localStorage",
	"session-storage":                  "sessionStorage",
	"urls":                             "URLs",
	"path":                             "Path",
	"hostname":                         "Hostname",
	"regex":                            "Regex",
	"secret":                           "Secret",
	"graphql":                          "GraphQL",
	"react-dangerously-set-inner-html": "dangerouslySetInnerHTML",
}

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

func matchToTreeNode(match AnalyzerMatch) ASTAnalyzerTreeNode {
	return ASTAnalyzerTreeNode{
		Type:        ASTAnalyzerTreeNodeTypeMatch,
		Data:        match,
		Label:       match.Value,
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
	if hasClientBehaviorMatches(matchesByTag) {
		behaviorNode := buildClientBehaviorTree(matchesByTag)
		rootNodes = append(rootNodes, behaviorNode)
	}

	// Storage
	if hasStorageMatches(matchesByTag) {
		storageNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label: "Storage",
		})

		// Cookie
		if hasCookieMatches(matchesByTag) {
			cookieNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label: "Cookie",
			})
			addCookieMatches(&cookieNode, matchesByTag)
			storageNode.Children = append(storageNode.Children, cookieNode)
		}

		// Local Storage
		if hasLocalStorageMatches(matchesByTag) {
			localStorageNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label: "localStorage",
			})
			addLocalStorageMatches(&localStorageNode, matchesByTag)
			storageNode.Children = append(storageNode.Children, localStorageNode)
		}

		// Session Storage
		if hasSessionStorageMatches(matchesByTag) {
			sessionStorageNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label: "sessionStorage",
			})
			addSessionStorageMatches(&sessionStorageNode, matchesByTag)
			storageNode.Children = append(storageNode.Children, sessionStorageNode)
		}

		rootNodes = append(rootNodes, storageNode)
	}

	// Data
	if hasDataMatches(matchesByTag) {
		dataNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label: "Data",
		})

		// URLs
		if hasURLMatches(matchesByTag) {
			urlsNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label: "URLs",
			})
			addURLMatches(&urlsNode, matchesByTag)
			dataNode.Children = append(dataNode.Children, urlsNode)
		}

		// Path
		if hasPathMatches(matchesByTag) {
			pathNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label: "Path",
			})
			addPathMatches(&pathNode, matchesByTag)
			dataNode.Children = append(dataNode.Children, pathNode)
		}

		// Hostname
		if hasHostnameMatches(matchesByTag) {
			hostnameNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label: "Hostname",
			})
			addHostnameMatches(&hostnameNode, matchesByTag)
			dataNode.Children = append(dataNode.Children, hostnameNode)
		}

		// Regex
		if hasRegexMatches(matchesByTag) {
			regexNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label: "Regex",
			})
			addRegexMatches(&regexNode, matchesByTag)
			dataNode.Children = append(dataNode.Children, regexNode)
		}

		// Secret
		if hasSecretMatches(matchesByTag) {
			secretNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label: "Secret",
			})
			addSecretMatches(&secretNode, matchesByTag)
			dataNode.Children = append(dataNode.Children, secretNode)
		}

		// GraphQL
		if hasGraphQLMatches(matchesByTag) {
			graphqlNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label: "GraphQL",
			})
			addGraphQLMatches(&graphqlNode, matchesByTag)
			dataNode.Children = append(dataNode.Children, graphqlNode)
		}

		rootNodes = append(rootNodes, dataNode)
	}

	// Frameworks
	if hasFrameworkMatches(matchesByTag) {
		frameworksNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label: "Frameworks",
		})

		// React
		if hasReactMatches(matchesByTag) {
			reactNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label: "React",
			})
			addReactMatches(&reactNode, matchesByTag)
			frameworksNode.Children = append(frameworksNode.Children, reactNode)
		}

		rootNodes = append(rootNodes, frameworksNode)
	}

	return rootNodes
}

var eventTags = []string{"add-event-listener", "onmessage", "postmessage", "onhashchange"}
var addEventListenerTags = []string{"add-event-listener"}

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

		addEventMatches(&eventsNode, matchesByTag)
		behaviorNode.Children = append(behaviorNode.Children, eventsNode)
	}

	// Individual behavior analyzers
	behaviorAnalyzers := []struct {
		tag  string
		name string
	}{
		{"eval", "eval"},
		{"document-domain", "document.domain"},
		{"window-open", "window.open"},
		{"inner-html", "innerHTML"},
		{"fetch", "fetch"},
		{"url-search-params", "URLSearchParams"},
		{"window-name", "window.name"},
	}

	for _, analyzer := range behaviorAnalyzers {
		if matches, exists := matchesByTag[analyzer.tag]; exists && len(matches) > 0 {
			analyzerNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label: analyzer.name,
			})
			for _, match := range matches {
				matchNode := matchToTreeNode(match)
				matchNode.Label = match.Value
				matchNode.Description = match.FilePath
				analyzerNode.Children = append(analyzerNode.Children, matchNode)
			}
			behaviorNode.Children = append(behaviorNode.Children, analyzerNode)
		}
	}

	// Window Location
	if hasLocationMatches(matchesByTag) {
		locationNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label: "Window Location",
		})

		// Assignment
		if hasLocationAssignmentMatches(matchesByTag) {
			assignmentNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label: "Assignment",
			})
			addLocationAssignmentMatches(&assignmentNode, matchesByTag)
			locationNode.Children = append(locationNode.Children, assignmentNode)
		}

		// Read
		if hasLocationReadMatches(matchesByTag) {
			readNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label: "Read",
			})
			addLocationReadMatches(&readNode, matchesByTag)
			locationNode.Children = append(locationNode.Children, readNode)
		}

		behaviorNode.Children = append(behaviorNode.Children, locationNode)
	}

	return behaviorNode
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

// Helper functions for checking matches
func hasClientBehaviorMatches(matchesByTag map[string][]AnalyzerMatch) bool {
	behaviorTags := []string{
		"add-event-listener", "onmessage", "postmessage", "onhashchange",
		"eval", "document-domain", "window-open", "inner-html", "fetch",
		"url-search-params", "location", "window-name",
	}
	return hasAnyMatches(matchesByTag, behaviorTags)
}

func hasEventMatches(matchesByTag map[string][]AnalyzerMatch) bool {
	eventTags := []string{"add-event-listener", "onmessage", "postmessage", "onhashchange"}
	return hasAnyMatches(matchesByTag, eventTags)
}

func hasLocationMatches(matchesByTag map[string][]AnalyzerMatch) bool {
	return hasLocationAssignmentMatches(matchesByTag) || hasLocationReadMatches(matchesByTag)
}

func hasLocationAssignmentMatches(matchesByTag map[string][]AnalyzerMatch) bool {
	return hasAnyMatches(matchesByTag, []string{"location-assignment"})
}

func hasLocationReadMatches(matchesByTag map[string][]AnalyzerMatch) bool {
	return hasAnyMatches(matchesByTag, []string{"location-read"})
}

func hasStorageMatches(matchesByTag map[string][]AnalyzerMatch) bool {
	storageTags := []string{"cookie", "local-storage", "session-storage"}
	return hasAnyMatches(matchesByTag, storageTags)
}

func hasCookieMatches(matchesByTag map[string][]AnalyzerMatch) bool {
	return hasAnyMatches(matchesByTag, []string{"cookie"})
}

func hasLocalStorageMatches(matchesByTag map[string][]AnalyzerMatch) bool {
	return hasAnyMatches(matchesByTag, []string{"local-storage"})
}

func hasSessionStorageMatches(matchesByTag map[string][]AnalyzerMatch) bool {
	return hasAnyMatches(matchesByTag, []string{"session-storage"})
}

func hasDataMatches(matchesByTag map[string][]AnalyzerMatch) bool {
	dataTags := []string{"urls", "path", "hostname", "regex", "secret", "graphql"}
	return hasAnyMatches(matchesByTag, dataTags)
}

func hasURLMatches(matchesByTag map[string][]AnalyzerMatch) bool {
	return hasAnyMatches(matchesByTag, []string{"urls"})
}

func hasPathMatches(matchesByTag map[string][]AnalyzerMatch) bool {
	return hasAnyMatches(matchesByTag, []string{"path"})
}

func hasHostnameMatches(matchesByTag map[string][]AnalyzerMatch) bool {
	return hasAnyMatches(matchesByTag, []string{"hostname"})
}

func hasRegexMatches(matchesByTag map[string][]AnalyzerMatch) bool {
	return hasAnyMatches(matchesByTag, []string{"regex"})
}

func hasSecretMatches(matchesByTag map[string][]AnalyzerMatch) bool {
	return hasAnyMatches(matchesByTag, []string{"secret"})
}

func hasGraphQLMatches(matchesByTag map[string][]AnalyzerMatch) bool {
	return hasAnyMatches(matchesByTag, []string{"graphql"})
}

func hasFrameworkMatches(matchesByTag map[string][]AnalyzerMatch) bool {
	return hasReactMatches(matchesByTag)
}

func hasReactMatches(matchesByTag map[string][]AnalyzerMatch) bool {
	return hasAnyMatches(matchesByTag, []string{"react-dangerously-set-inner-html"})
}

func hasAnyMatches(matchesByTag map[string][]AnalyzerMatch, tags []string) bool {
	for _, tag := range tags {
		if len(matchesByTag[tag]) > 0 {
			return true
		}
	}
	return false
}

// Helper functions for adding matches
func addEventMatches(parent *ASTAnalyzerTreeNode, matchesByTag map[string][]AnalyzerMatch) {
	eventTags := []struct {
		tag  string
		name string
	}{
		{"add-event-listener", "addEventListener"},
		{"onmessage", "onmessage"},
		{"postmessage", "postmessage"},
		{"onhashchange", "onhashchange"},
	}

	for _, eventType := range eventTags {
		if matches, exists := matchesByTag[eventType.tag]; exists && len(matches) > 0 {
			eventNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label: eventType.name,
			})
			for _, match := range matches {
				matchNode := matchToTreeNode(match)
				matchNode.Label = match.Value
				matchNode.Description = match.FilePath
				eventNode.Children = append(eventNode.Children, matchNode)
			}
			parent.Children = append(parent.Children, eventNode)
		}
	}
}

func addLocationAssignmentMatches(parent *ASTAnalyzerTreeNode, matchesByTag map[string][]AnalyzerMatch) {
	locationTypes := []struct {
		tag  string
		name string
	}{
		{"location-search-assignment", "search"},
		{"location-href-assignment", "href"},
		{"location-assignment", "location"},
	}

	for _, locType := range locationTypes {
		if matches, exists := matchesByTag[locType.tag]; exists && len(matches) > 0 {
			locNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label: locType.name,
			})
			for _, match := range matches {
				matchNode := matchToTreeNode(match)
				matchNode.Label = match.Value
				matchNode.Description = match.FilePath
				locNode.Children = append(locNode.Children, matchNode)
			}
			parent.Children = append(parent.Children, locNode)
		}
	}
}

func addLocationReadMatches(parent *ASTAnalyzerTreeNode, matchesByTag map[string][]AnalyzerMatch) {
	locationTypes := []struct {
		tag  string
		name string
	}{
		{"location-search-read", "search"},
		{"location-href-read", "href"},
		{"location-read", "location"},
	}

	for _, locType := range locationTypes {
		if matches, exists := matchesByTag[locType.tag]; exists && len(matches) > 0 {
			locNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label: locType.name,
			})
			for _, match := range matches {
				matchNode := matchToTreeNode(match)
				matchNode.Label = match.Value
				matchNode.Description = match.FilePath
				locNode.Children = append(locNode.Children, matchNode)
			}
			parent.Children = append(parent.Children, locNode)
		}
	}
}

func addCookieMatches(parent *ASTAnalyzerTreeNode, matchesByTag map[string][]AnalyzerMatch) {
	cookieTypes := []struct {
		tag  string
		name string
	}{
		{"cookie-assignment", "Assignment"},
		{"cookie-read", "Read"},
	}

	for _, cookieType := range cookieTypes {
		if matches, exists := matchesByTag[cookieType.tag]; exists && len(matches) > 0 {
			cookieNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label: cookieType.name,
			})
			for _, match := range matches {
				matchNode := matchToTreeNode(match)
				matchNode.Label = match.Value
				matchNode.Description = match.FilePath
				cookieNode.Children = append(cookieNode.Children, matchNode)
			}
			parent.Children = append(parent.Children, cookieNode)
		}
	}
}

func addLocalStorageMatches(parent *ASTAnalyzerTreeNode, matchesByTag map[string][]AnalyzerMatch) {
	storageTypes := []struct {
		tag  string
		name string
	}{
		{"local-storage-get", "getItem"},
		{"local-storage-set", "setItem"},
	}

	for _, storageType := range storageTypes {
		if matches, exists := matchesByTag[storageType.tag]; exists && len(matches) > 0 {
			storageNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label: storageType.name,
			})
			for _, match := range matches {
				matchNode := matchToTreeNode(match)
				matchNode.Label = match.Value
				matchNode.Description = match.FilePath
				storageNode.Children = append(storageNode.Children, matchNode)
			}
			parent.Children = append(parent.Children, storageNode)
		}
	}
}

func addSessionStorageMatches(parent *ASTAnalyzerTreeNode, matchesByTag map[string][]AnalyzerMatch) {
	storageTypes := []struct {
		tag  string
		name string
	}{
		{"session-storage-get", "getItem"},
		{"session-storage-set", "setItem"},
	}

	for _, storageType := range storageTypes {
		if matches, exists := matchesByTag[storageType.tag]; exists && len(matches) > 0 {
			storageNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label: storageType.name,
			})
			for _, match := range matches {
				matchNode := matchToTreeNode(match)
				matchNode.Label = match.Value
				matchNode.Description = match.FilePath
				storageNode.Children = append(storageNode.Children, matchNode)
			}
			parent.Children = append(parent.Children, storageNode)
		}
	}
}

func addURLMatches(parent *ASTAnalyzerTreeNode, matchesByTag map[string][]AnalyzerMatch) {
	if matches, exists := matchesByTag["urls"]; exists && len(matches) > 0 {
		for _, match := range matches {
			matchNode := matchToTreeNode(match)
			matchNode.Label = match.Value
			matchNode.Description = match.FilePath
			parent.Children = append(parent.Children, matchNode)
		}
	}
}

func addPathMatches(parent *ASTAnalyzerTreeNode, matchesByTag map[string][]AnalyzerMatch) {
	pathTypes := []struct {
		tag  string
		name string
	}{
		{"path-api", "API"},
		{"path-path", "Path"},
		{"path-url", "URL"},
		{"path-query", "Query"},
	}

	for _, pathType := range pathTypes {
		if matches, exists := matchesByTag[pathType.tag]; exists && len(matches) > 0 {
			pathNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label: pathType.name,
			})
			for _, match := range matches {
				matchNode := matchToTreeNode(match)
				matchNode.Label = match.Value
				matchNode.Description = match.FilePath
				pathNode.Children = append(pathNode.Children, matchNode)
			}
			parent.Children = append(parent.Children, pathNode)
		}
	}
}

func addHostnameMatches(parent *ASTAnalyzerTreeNode, matchesByTag map[string][]AnalyzerMatch) {
	if matches, exists := matchesByTag["hostname"]; exists && len(matches) > 0 {
		for _, match := range matches {
			matchNode := matchToTreeNode(match)
			matchNode.Label = match.Value
			matchNode.Description = match.FilePath
			parent.Children = append(parent.Children, matchNode)
		}
	}
}

func addRegexMatches(parent *ASTAnalyzerTreeNode, matchesByTag map[string][]AnalyzerMatch) {
	regexTypes := []struct {
		tag  string
		name string
	}{
		{"regex-match", "Match"},
		{"regex-pattern", "Pattern"},
	}

	for _, regexType := range regexTypes {
		if matches, exists := matchesByTag[regexType.tag]; exists && len(matches) > 0 {
			regexNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label: regexType.name,
			})
			for _, match := range matches {
				matchNode := matchToTreeNode(match)
				matchNode.Label = match.Value
				matchNode.Description = match.FilePath
				regexNode.Children = append(regexNode.Children, matchNode)
			}
			parent.Children = append(parent.Children, regexNode)
		}
	}
}

func addSecretMatches(parent *ASTAnalyzerTreeNode, matchesByTag map[string][]AnalyzerMatch) {
	if matches, exists := matchesByTag["secret"]; exists && len(matches) > 0 {
		for _, match := range matches {
			matchNode := matchToTreeNode(match)
			matchNode.Label = match.Value
			matchNode.Description = match.FilePath
			parent.Children = append(parent.Children, matchNode)
		}
	}
}

func addGraphQLMatches(parent *ASTAnalyzerTreeNode, matchesByTag map[string][]AnalyzerMatch) {
	graphqlTypes := []struct {
		tag  string
		name string
	}{
		{"graphql-mutation", "mutation"},
		{"graphql-query", "query"},
		{"graphql-other", "other"},
	}

	for _, graphqlType := range graphqlTypes {
		if matches, exists := matchesByTag[graphqlType.tag]; exists && len(matches) > 0 {
			graphqlNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
				Label: graphqlType.name,
			})
			for _, match := range matches {
				matchNode := matchToTreeNode(match)
				matchNode.Label = match.Value
				matchNode.Description = match.FilePath
				graphqlNode.Children = append(graphqlNode.Children, matchNode)
			}
			parent.Children = append(parent.Children, graphqlNode)
		}
	}
}

func addReactMatches(parent *ASTAnalyzerTreeNode, matchesByTag map[string][]AnalyzerMatch) {
	if matches, exists := matchesByTag["react-dangerously-set-inner-html"]; exists && len(matches) > 0 {
		dangerouslySetInnerHTMLNode := createNavigationTreeNode(ASTAnalyzerTreeNode{
			Label: "dangerouslySetInnerHTML",
		})
		for _, match := range matches {
			matchNode := matchToTreeNode(match)
			matchNode.Label = match.Value
			matchNode.Description = match.FilePath
			dangerouslySetInnerHTMLNode.Children = append(dangerouslySetInnerHTMLNode.Children, matchNode)
		}
		parent.Children = append(parent.Children, dangerouslySetInnerHTMLNode)
	}
}
