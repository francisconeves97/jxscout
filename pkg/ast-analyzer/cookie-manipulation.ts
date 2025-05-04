import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "./types";
import { Visitor } from "./walker";

export const COOKIE_MANIPULATION_ANALYZER_NAME = "cookie-manipulation";

const cookieManipulationAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    AssignmentExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check for document.cookie assignments
      if (
        node.left.type === "MemberExpression" &&
        node.left.object.type === "Identifier" &&
        node.left.object.name === "document" &&
        node.left.property.type === "Identifier" &&
        node.left.property.name === "cookie"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: COOKIE_MANIPULATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "cookie-manipulation": true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { cookieManipulationAnalyzerBuilder };
