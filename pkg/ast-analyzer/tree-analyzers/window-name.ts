import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";

export const WINDOW_NAME_ANALYZER_NAME = "window-name";

const windowNameAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    AssignmentExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check if this is a window.name assignment
      if (
        node.left.type === "MemberExpression" &&
        node.left.object.type === "Identifier" &&
        node.left.object.name === "window" &&
        node.left.property.type === "Identifier" &&
        node.left.property.name === "name"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: WINDOW_NAME_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "window-name-assignment": true,
          },
        };

        matchesReturn.push(match);
      }
    },
    MemberExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check if this is a window.name read
      if (
        node.object.type === "Identifier" &&
        node.object.name === "window" &&
        node.property.type === "Identifier" &&
        node.property.name === "name" &&
        // Only count as a read if it's not part of an assignment
        !ancestors.some(
          (ancestor) =>
            ancestor.type === "AssignmentExpression" && ancestor.left === node
        )
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: WINDOW_NAME_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "window-name-read": true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { windowNameAnalyzerBuilder };
