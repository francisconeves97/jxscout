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
        const pattern = (node as any).regex.pattern;
        const flags = (node as any).regex.flags;

        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: REGEX_PATTERN_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "regex-pattern": true,
            ...(flags ? { "has-flags": true } : {}),
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
            "regex-constructor": true,
            ...(node.arguments.length >= 2 ? { "has-flags": true } : {}),
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { regexPatternAnalyzerBuilder };
