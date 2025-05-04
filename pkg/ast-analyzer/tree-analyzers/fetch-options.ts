import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";

export const FETCH_OPTIONS_ANALYZER_NAME = "fetch-options";

const fetchOptionsAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    CallExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check if this is a fetch call with options
      if (
        node.callee.type === "Identifier" &&
        node.callee.name === "fetch" &&
        node.arguments.length >= 2 &&
        node.arguments[1].type === "ObjectExpression"
      ) {
        const options = node.arguments[1];
        const tags: Record<string, true> = {
          "fetch-options": true,
        };

        // Check for specific options
        options.properties.forEach((prop) => {
          if (prop.type === "Property" && prop.key.type === "Identifier") {
            tags[`fetch-option-${prop.key.name}`] = true;
          }
        });

        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: FETCH_OPTIONS_ANALYZER_NAME,
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

export { fetchOptionsAnalyzerBuilder };
