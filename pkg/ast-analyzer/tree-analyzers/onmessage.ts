import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";

export const ONMESSAGE_ANALYZER_NAME = "onmessage";

const onmessageAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    AssignmentExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check if this is an onmessage assignment
      if (
        node.left.type === "MemberExpression" &&
        node.left.property.type === "Identifier" &&
        node.left.property.name === "onmessage"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: ONMESSAGE_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "message-handler": true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { onmessageAnalyzerBuilder };
