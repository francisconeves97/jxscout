import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";

export const REGEX_ANALYZER_NAME = "regex";

const regexAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    Literal(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check for regex literals
      if ((node as any).regex) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: REGEX_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "regex-literal": true,
          },
        };

        matchesReturn.push(match);
      }
    },
    NewExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check for RegExp constructor
      if (node.callee.type === "Identifier" && node.callee.name === "RegExp") {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: REGEX_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "regex-constructor": true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { regexAnalyzerBuilder };
