import { createRegexAnalyzer } from "./regex-analyzer";

// Regex pattern for file extensions
// This pattern matches common file extensions with optional version numbers and query parameters
const FILE_EXTENSION_REGEX =
  /\.(js|ts|jsx|tsx|html|htm|css|scss|sass|json|md|yaml|yml|py|go|java|rb|php|sh|conf|config|xml|sql)(\?.*)?$/i;

export const FILE_EXTENSIONS_ANALYZER_NAME = "file-extensions";

const fileExtensionsAnalyzerBuilder = createRegexAnalyzer({
  analyzerName: FILE_EXTENSIONS_ANALYZER_NAME,
  regex: FILE_EXTENSION_REGEX,
  tags: (value: string) => {
    const extensionMatch = value.match(FILE_EXTENSION_REGEX);
    if (!extensionMatch) return {};

    if (extensionMatch.length < 2) {
      return {};
    }

    return { [extensionMatch[1].toLowerCase()]: true };
  },
});

export { fileExtensionsAnalyzerBuilder };
