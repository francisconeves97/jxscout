import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "./types";

export const LINK_MANIPULATION_ANALYZER_NAME = "link-manipulation";

const linkManipulationAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
) => {
  return {
    MemberExpression(node: any, _state: any, ancestors: Node[]) {
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

    AssignmentExpression(node: any, _state: any, ancestors: Node[]) {
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
