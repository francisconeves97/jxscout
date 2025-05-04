import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";

export const ONHASHCHANGE_ANALYZER_NAME = "onhashchange";

const onhashchangeAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    AssignmentExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check if this is an onhashchange assignment
      if (
        node.left.type === "MemberExpression" &&
        node.left.property.type === "Identifier" &&
        node.left.property.name === "onhashchange"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: ONHASHCHANGE_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "hash-change-handler": true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { onhashchangeAnalyzerBuilder };
