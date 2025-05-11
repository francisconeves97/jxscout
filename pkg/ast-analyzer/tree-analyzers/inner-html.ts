import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";

export const INNER_HTML_ANALYZER_NAME = "inner-html";

const innerHtmlAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    AssignmentExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check if this is an innerHTML assignment
      if (
        node.left.type === "MemberExpression" &&
        node.left.property.type === "Identifier" &&
        node.left.property.name === "innerHTML"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: INNER_HTML_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "inner-html": true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { innerHtmlAnalyzerBuilder };
