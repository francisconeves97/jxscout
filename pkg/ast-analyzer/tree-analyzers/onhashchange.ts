import { AnalyzerMatch, AnalyzerParams } from "../types";
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
            onhashchange: true,
          },
        };

        matchesReturn.push(match);
      }
    },
    CallExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check if this is an addEventListener call with "hashchange" event
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.property.type === "Identifier" &&
        node.callee.property.name === "addEventListener" &&
        node.arguments.length >= 2 &&
        node.arguments[0].type === "Literal" &&
        node.arguments[0].value === "hashchange"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: ONHASHCHANGE_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            onhashchange: true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { onhashchangeAnalyzerBuilder };
