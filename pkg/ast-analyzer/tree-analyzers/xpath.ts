import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";

export const XPATH_ANALYZER_NAME = "xpath";

const xpathAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    CallExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check if this is an XPath-related call
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.property.type === "Identifier" &&
        (node.callee.property.name === "evaluate" ||
          node.callee.property.name === "createExpression" ||
          node.callee.property.name === "createNSResolver")
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: XPATH_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "xpath-call": true,
            [`xpath-${node.callee.property.name}`]: true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { xpathAnalyzerBuilder };
