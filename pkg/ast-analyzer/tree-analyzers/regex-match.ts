import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";

export const REGEX_MATCH_ANALYZER_NAME = "regex-match";

const regexMatchAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    CallExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check for regex match operations
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.property.type === "Identifier" &&
        ["match", "matchAll", "search", "test", "exec"].includes(
          node.callee.property.name
        )
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: REGEX_MATCH_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "regex-match": true,
            [`regex-${node.callee.property.name}`]: true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { regexMatchAnalyzerBuilder };
