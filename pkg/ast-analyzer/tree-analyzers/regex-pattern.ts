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

      // Check if this is a regex literal
      if ((node as any).regex) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: REGEX_ANALYZER_NAME,
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
      // Check if this is a new RegExp constructor call with literal string arguments
      if (node.callee.type === "Identifier" && node.callee.name === "RegExp") {
        if (!node.loc) {
          return;
        }

        // Check if the first argument is a string literal
        if (
          node.arguments.length > 0 &&
          node.arguments[0].type === "Literal" &&
          typeof node.arguments[0].value === "string"
        ) {
          const match: AnalyzerMatch = {
            filePath: args.filePath,
            analyzerName: REGEX_ANALYZER_NAME,
            value: args.source.slice(node.start, node.end),
            start: node.loc.start,
            end: node.loc.end,
            tags: {
              "regex-pattern": true,
            },
          };

          matchesReturn.push(match);
        }
      }
    },
  };
};

export { regexAnalyzerBuilder };
