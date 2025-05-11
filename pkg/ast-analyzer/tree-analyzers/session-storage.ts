import { Node, MemberExpression } from "acorn";
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
      const isSessionStorageCall = (node: Node) => {
        if (node.type !== "MemberExpression") return false;

        const memberNode = node as MemberExpression;

        // Check for direct sessionStorage usage
        if (
          memberNode.object.type === "Identifier" &&
          memberNode.object.name === "sessionStorage" &&
          memberNode.property.type === "Identifier" &&
          ["getItem", "setItem"].includes(memberNode.property.name)
        ) {
          return true;
        }

        // Check for window.sessionStorage usage
        if (
          memberNode.object.type === "MemberExpression" &&
          memberNode.object.object.type === "Identifier" &&
          memberNode.object.object.name === "window" &&
          memberNode.object.property.type === "Identifier" &&
          memberNode.object.property.name === "sessionStorage" &&
          memberNode.property.type === "Identifier" &&
          ["getItem", "setItem"].includes(memberNode.property.name)
        ) {
          return true;
        }

        return false;
      };

      if (isSessionStorageCall(node.callee)) {
        const callee = node.callee as MemberExpression;
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: SESSION_STORAGE_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "session-storage": true,
            [`property-${(callee.property as any).name}`]: true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { sessionStorageAnalyzerBuilder };
