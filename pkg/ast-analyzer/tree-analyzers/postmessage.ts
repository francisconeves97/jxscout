import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";

export const POSTMESSAGE_ANALYZER_NAME = "postmessage";

const postmessageAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    CallExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check if this is a postMessage call
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.property.type === "Identifier" &&
        node.callee.property.name === "postMessage" &&
        node.arguments.length >= 1
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: POSTMESSAGE_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            postMessage: true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { postmessageAnalyzerBuilder };
