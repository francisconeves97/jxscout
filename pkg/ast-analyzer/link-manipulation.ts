import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "./types";
import { Visitor } from "./walker";

export const LINK_MANIPULATION_ANALYZER_NAME = "link-manipulation";

const linkManipulationAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    MemberExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check for element.href, element.src, and element.action
      if (
        node.property.type === "Identifier" &&
        ["href", "src", "action"].includes(node.property.name)
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: LINK_MANIPULATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "link-manipulation": true,
          },
        };

        matchesReturn.push(match);
      }
    },

    AssignmentExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check for assignments to element.href, element.src, and element.action
      if (
        node.left.type === "MemberExpression" &&
        node.left.property.type === "Identifier" &&
        ["href", "src", "action"].includes(node.left.property.name)
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: LINK_MANIPULATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "link-manipulation": true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { linkManipulationAnalyzerBuilder };
