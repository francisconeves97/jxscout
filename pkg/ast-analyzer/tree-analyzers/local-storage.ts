import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";

export const LOCAL_STORAGE_ANALYZER_NAME = "local-storage";

const localStorageAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    CallExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check for localStorage method calls
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.object.type === "MemberExpression" &&
        node.callee.object.object.type === "Identifier" &&
        node.callee.object.object.name === "window" &&
        node.callee.object.property.type === "Identifier" &&
        node.callee.object.property.name === "localStorage" &&
        node.callee.property.type === "Identifier" &&
        ["getItem", "setItem", "removeItem", "clear"].includes(
          node.callee.property.name
        )
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: LOCAL_STORAGE_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "local-storage": true,
            [`local-storage-${node.callee.property.name}`]: true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { localStorageAnalyzerBuilder };
