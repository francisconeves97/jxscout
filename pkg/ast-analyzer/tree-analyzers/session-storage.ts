import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";

export const SESSION_STORAGE_ANALYZER_NAME = "session-storage";

const sessionStorageAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    CallExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check for sessionStorage method calls
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.object.type === "MemberExpression" &&
        node.callee.object.object.type === "Identifier" &&
        node.callee.object.object.name === "window" &&
        node.callee.object.property.type === "Identifier" &&
        node.callee.object.property.name === "sessionStorage" &&
        node.callee.property.type === "Identifier" &&
        ["getItem", "setItem", "removeItem", "clear"].includes(
          node.callee.property.name
        )
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: SESSION_STORAGE_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "session-storage": true,
            [`session-storage-${node.callee.property.name}`]: true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { sessionStorageAnalyzerBuilder };
