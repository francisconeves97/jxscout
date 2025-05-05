import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";

export const REGEX_PATTERN_ANALYZER_NAME = "regex-pattern";

const regexPatternAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    Literal(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check for regex pattern literals
      if ((node as any).regex) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: REGEX_PATTERN_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "regex-pattern": true,
          },
        };

        matchesReturn.push(match);
      }
    },
    NewExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check for RegExp constructor with pattern
      if (
        node.callee.type === "Identifier" &&
        node.callee.name === "RegExp" &&
        node.arguments.length >= 1
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: REGEX_PATTERN_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "regex-pattern": true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { regexPatternAnalyzerBuilder };
