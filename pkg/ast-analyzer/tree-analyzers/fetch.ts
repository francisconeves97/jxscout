import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";

export const FETCH_ANALYZER_NAME = "fetch";

const fetchAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    CallExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check if this is a fetch call
      if (
        node.callee.type === "Identifier" &&
        node.callee.name === "fetch" &&
        node.arguments.length >= 1
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: FETCH_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "fetch-call": true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { fetchAnalyzerBuilder };
