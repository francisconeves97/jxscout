import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";

export const LOCATION_ANALYZER_NAME = "location";

const locationAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    AssignmentExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check for location assignments
      if (
        node.left.type === "MemberExpression" &&
        node.left.object.type === "Identifier" &&
        node.left.object.name === "location" &&
        node.left.property.type === "Identifier"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: LOCATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "location-assignment": true,
            [`location-${node.left.property.name}`]: true,
          },
        };

        matchesReturn.push(match);
      }
    },
    MemberExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check for location reads
      if (
        node.object.type === "Identifier" &&
        node.object.name === "location" &&
        node.property.type === "Identifier"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: LOCATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "location-read": true,
            [`location-${node.property.name}`]: true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { locationAnalyzerBuilder };
