import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "./types";

export const REGEX_ANALYZER_NAME = "regex";

// Helper function to check if a string looks like a regex pattern
function looksLikeRegex(str: string): boolean {
  // Skip very short strings as they're unlikely to be regex patterns
  if (str.length < 6) {
    return false;
  }

  // More specific regex patterns that indicate a string might be a regex
  const regexIndicators = [
    /^[^a-zA-Z0-9]*[\\^$.*+?()[\]{}|]/, // Starts with regex special chars
    /[\\^$.*+?()[\]{}|][^a-zA-Z0-9]*$/, // Ends with regex special chars
    /[\\^$.*+?()[\]{}|].*[\\^$.*+?()[\]{}|]/, // Contains multiple regex special chars
    /\\[dDwWsS]/, // Contains regex character classes
    /\(\?[:=!]/, // Contains regex lookahead/lookbehind
    /\[[^\]]*\]/, // Contains character sets
    /{[0-9,]+}/, // Contains quantifiers
  ];

  // Check if the string matches any of the regex patterns
  const matchesPattern = regexIndicators.some((pattern) => pattern.test(str));

  // Additional validation: check if the string contains a reasonable number of regex special characters
  const specialChars = str.match(/[\\^$.*+?()[\]{}|]/g) || [];
  const hasReasonableSpecialChars = specialChars.length >= 2;

  return matchesPattern && hasReasonableSpecialChars;
}

const regexAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
) => {
  return {
    Literal(node: any, _state: any, ancestors: Node[]) {
      if (!node.loc) {
        return;
      }

      // Check if this is a regex literal
      if (node.regex) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: REGEX_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            regex: true,
            "regex-literal": true,
          },
        };

        matchesReturn.push(match);
      }
    },
    NewExpression(node: any, _state: any, ancestors: Node[]) {
      // Check if this is a new RegExp constructor call
      if (node.callee.type === "Identifier" && node.callee.name === "RegExp") {
        if (!node.loc) {
          return;
        }

        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: REGEX_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            regex: true,
            "regex-constructor": true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { regexAnalyzerBuilder };
