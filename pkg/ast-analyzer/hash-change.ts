import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "./types";
import { Visitor } from "./walker";

export const HASH_CHANGE_ANALYZER_NAME = "hash-change";

const hashChangeAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    AssignmentExpression(node, ancestors) {
      // Check for window.onhashchange assignments and global onhashchange assignments
      if (
        (node.left.type === "MemberExpression" &&
          node.left.object.type === "Identifier" &&
          node.left.object.name === "window" &&
          node.left.property.type === "Identifier" &&
          node.left.property.name === "onhashchange") ||
        (node.left.type === "Identifier" && node.left.name === "onhashchange")
      ) {
        if (!node.loc) {
          return;
        }

        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: HASH_CHANGE_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "hash-change": true,
          },
        };

        matchesReturn.push(match);
      }
    },

    CallExpression(node, ancestors) {
      // Check for addEventListener("hashchange", ...)
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.property.type === "Identifier" &&
        node.callee.property.name === "addEventListener" &&
        node.arguments.length >= 2 &&
        node.arguments[0].type === "Literal" &&
        node.arguments[0].value === "hashchange"
      ) {
        if (!node.loc) {
          return;
        }

        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: HASH_CHANGE_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "hash-change": true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { hashChangeAnalyzerBuilder };
