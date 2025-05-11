import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";

export const FETCH_OPTIONS_ANALYZER_NAME = "fetch-options";

// Common fetch option properties
const FETCH_OPTION_PROPERTIES = ["method", "headers", "body"];

const fetchOptionsAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    ObjectExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Get all property names in this object
      const propertyNames = new Set(
        node.properties
          .filter(
            (prop) => prop.type === "Property" && prop.key.type === "Identifier"
          )
          .map((prop) => (prop as any).key.name)
      );

      // Check if this object has any fetch option properties
      const hasFetchProperties = FETCH_OPTION_PROPERTIES.some((prop) =>
        propertyNames.has(prop)
      );

      if (hasFetchProperties) {
        const tags: Record<string, true> = {
          "fetch-options": true,
        };

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
