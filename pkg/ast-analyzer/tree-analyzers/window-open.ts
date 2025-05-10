import { Node, MemberExpression } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";

export const WINDOW_OPEN_ANALYZER_NAME = "window-open";

const windowOpenAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    CallExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check for window.open method calls
      const isWindowOpenCall = (node: Node) => {
        if (node.type !== "MemberExpression") return false;

        const memberNode = node as MemberExpression;

        // Check for direct window.open usage
        if (
          memberNode.object.type === "Identifier" &&
          memberNode.object.name === "window" &&
          memberNode.property.type === "Identifier" &&
          memberNode.property.name === "open"
        ) {
          return true;
        }

        return false;
      };

      if (isWindowOpenCall(node.callee)) {
        const callee = node.callee as MemberExpression;
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: WINDOW_OPEN_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "window-open": true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { windowOpenAnalyzerBuilder };
