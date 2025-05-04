import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";

export const HOSTNAME_ANALYZER_NAME = "hostname";

const hostnameAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    MemberExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check for hostname access
      if (
        node.property.type === "Identifier" &&
        node.property.name === "hostname" &&
        ((node.object.type === "Identifier" &&
          node.object.name === "location") ||
          (node.object.type === "NewExpression" &&
            node.object.callee.type === "Identifier" &&
            node.object.callee.name === "URL"))
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: HOSTNAME_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "hostname-access": true,
            ...(node.object.type === "Identifier"
              ? { "location-hostname": true }
              : { "url-hostname": true }),
          },
        };

        matchesReturn.push(match);
      }
    },
    AssignmentExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check for hostname assignments
      if (
        node.left.type === "MemberExpression" &&
        node.left.property.type === "Identifier" &&
        node.left.property.name === "hostname" &&
        node.left.object.type === "Identifier" &&
        node.left.object.name === "location"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: HOSTNAME_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "hostname-assignment": true,
            "location-hostname": true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { hostnameAnalyzerBuilder };
