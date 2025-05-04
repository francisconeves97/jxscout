import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";

export const COOKIE_ANALYZER_NAME = "cookie";

const cookieAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    AssignmentExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check for cookie assignments
      if (
        node.left.type === "MemberExpression" &&
        node.left.object.type === "MemberExpression" &&
        node.left.object.object.type === "Identifier" &&
        node.left.object.object.name === "document" &&
        node.left.object.property.type === "Identifier" &&
        node.left.object.property.name === "cookie"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: COOKIE_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "cookie-assignment": true,
            ...(node.right.type === "Literal"
              ? { "has-literal-value": true }
              : {}),
          },
        };

        matchesReturn.push(match);
      }
    },
    MemberExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check for cookie reads
      if (
        node.object.type === "MemberExpression" &&
        node.object.object.type === "Identifier" &&
        node.object.object.name === "document" &&
        node.object.property.type === "Identifier" &&
        node.object.property.name === "cookie"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: COOKIE_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "cookie-read": true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { cookieAnalyzerBuilder };
