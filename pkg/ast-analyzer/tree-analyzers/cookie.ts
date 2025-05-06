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
        node.left.object.type === "Identifier" &&
        node.left.object.name === "document" &&
        node.left.property.type === "Identifier" &&
        node.left.property.name === "cookie"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: COOKIE_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            cookie: true,
            "cookie-assignment": true,
          },
        };

        matchesReturn.push(match);
      }
    },
    MemberExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Skip if this is part of an assignment
      for (const ancestor of ancestors) {
        if (
          ancestor.type === "AssignmentExpression" &&
          ancestor.left === node
        ) {
          return;
        }
      }

      // Check for cookie reads
      if (
        node.object.type === "Identifier" &&
        node.object.name === "document" &&
        node.property.type === "Identifier" &&
        node.property.name === "cookie"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: COOKIE_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            cookie: true,
            "cookie-read": true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { cookieAnalyzerBuilder };
