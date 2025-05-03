import { createRegexAnalyzer } from "./regex-analyzer";

// This regex matches the start of GraphQL queries and mutations
// It allows:
// - Queries starting with 'query' or 'mutation'
// - Optional operation names
// - Leading whitespace
const GRAPHQL_REGEX =
  /(query|mutation|type|fragment|subscription|directive|input|enum|interface|union|scalar|object|list|nonnull)/;

// Checks if a string is a valid GraphQL operation
function isValidGraphQLOperation(str: string): boolean {
  // Basic validation of GraphQL structure
  const trimmed = str.trim();

  // Must start with query or mutation
  if (
    !trimmed.startsWith("query") &&
    !trimmed.startsWith("mutation") &&
    !trimmed.startsWith("type") &&
    !trimmed.startsWith("fragment") &&
    !trimmed.startsWith("subscription") &&
    !trimmed.startsWith("input") &&
    !trimmed.startsWith("enum") &&
    !trimmed.startsWith("interface") &&
    !trimmed.startsWith("union") &&
    !trimmed.startsWith("scalar") &&
    !trimmed.startsWith("object") &&
    !trimmed.startsWith("list") &&
    !trimmed.startsWith("nonnull")
  ) {
    return false;
  }

  // Must contain at least one field selection
  if (!trimmed.includes("{") || !trimmed.includes("}")) {
    return false;
  }

  // Check for balanced braces
  let braceCount = 0;
  for (const char of trimmed) {
    if (char === "{") braceCount++;
    if (char === "}") braceCount--;
    if (braceCount < 0) return false;
  }
  return braceCount === 0;
}

export const GRAPHQL_ANALYZER_NAME = "graphql";

const graphqlAnalyzerBuilder = createRegexAnalyzer({
  analyzerName: GRAPHQL_ANALYZER_NAME,
  regex: GRAPHQL_REGEX,
  filter: (match, ancestors) => {
    const value = match.value;

    // Handle template literals by removing the backticks and any leading/trailing whitespace
    const cleanValue = value.replace(/^`|`$/g, "").trim();

    // Exclude if it's not a valid GraphQL operation
    if (!isValidGraphQLOperation(cleanValue)) {
      return false;
    }

    return true;
  },
  tags: (value) => {
    const tags: Record<string, true> = {};
    const cleanValue = value.replace(/^`|`$/g, "").trim();

    tags.graphql = true;

    return tags;
  },
});

export { graphqlAnalyzerBuilder };
