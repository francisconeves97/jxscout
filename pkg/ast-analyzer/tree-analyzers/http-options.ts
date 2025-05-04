import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";

export const HTTP_OPTIONS_ANALYZER_NAME = "http-options";

const httpOptionsAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    ObjectExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check if this object is likely to be HTTP options
      const hasHttpOptions = node.properties.some((prop) => {
        if (prop.type === "Property" && prop.key.type === "Identifier") {
          const key = prop.key.name.toLowerCase();
          return [
            "method",
            "headers",
            "body",
            "credentials",
            "mode",
            "cache",
            "redirect",
            "referrer",
            "integrity",
          ].includes(key);
        }
        return false;
      });

      if (hasHttpOptions) {
        const tags: Record<string, true> = {
          "http-options": true,
        };

        // Add specific option tags
        node.properties.forEach((prop) => {
          if (prop.type === "Property" && prop.key.type === "Identifier") {
            tags[`http-option-${prop.key.name}`] = true;
          }
        });

        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: HTTP_OPTIONS_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags,
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { httpOptionsAnalyzerBuilder };
