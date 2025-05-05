import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";
import tlds from "tlds";

export const HOSTNAME_ANALYZER_NAME = "hostname";

// Regex pattern to match hostnames
// Matches:
// - Domain names with subdomains (e.g. sub.example.com)
// - Must end with a valid TLD from the tlds package
// - Allows only letters, numbers, hyphens, and dots
// - Each label must start and end with a letter or number
// - Labels cannot start or end with hyphens
const HOSTNAME_REGEX = new RegExp(
  `^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\\.(${tlds.join("|")})$`,
  "i"
);

const hostnameAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    Literal(node, ancestors) {
      if (!node.loc || typeof node.value !== "string") {
        return;
      }

      // Check if the string literal matches the hostname pattern
      if (HOSTNAME_REGEX.test(node.value)) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: HOSTNAME_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "hostname-string": true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { hostnameAnalyzerBuilder };
