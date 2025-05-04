import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "./types";
import { Visitor } from "./walker";

export const HTML5_STORAGE_MANIPULATION_ANALYZER_NAME =
  "html5-storage-manipulation";

const html5StorageManipulationAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    CallExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check for sessionStorage.setItem
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.object.type === "Identifier" &&
        node.callee.object.name === "sessionStorage" &&
        node.callee.property.type === "Identifier" &&
        node.callee.property.name === "setItem"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: HTML5_STORAGE_MANIPULATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "session-storage": true,
          },
        };

        matchesReturn.push(match);
      }

      // Check for localStorage.setItem
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.object.type === "Identifier" &&
        node.callee.object.name === "localStorage" &&
        node.callee.property.type === "Identifier" &&
        node.callee.property.name === "setItem"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: HTML5_STORAGE_MANIPULATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "local-storage": true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { html5StorageManipulationAnalyzerBuilder };
