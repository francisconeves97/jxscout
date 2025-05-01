import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "./types";

export const AJAX_REQUEST_HEADER_MANIPULATION_ANALYZER_NAME =
  "ajax-request-header-manipulation";

const ajaxRequestHeaderManipulationAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
) => {
  return {
    CallExpression(node: any, _state: any, ancestors: Node[]) {
      if (!node.loc) {
        return;
      }

      // Check for XMLHttpRequest methods
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.property.type === "Identifier" &&
        ["setRequestHeader", "open", "send"].includes(
          node.callee.property.name
        ) &&
        // Check for XMLHttpRequest instance
        ((node.callee.object.type === "Identifier" &&
          node.callee.object.name === "xhr") ||
          // Check for new XMLHttpRequest()
          (node.callee.object.type === "NewExpression" &&
            node.callee.object.callee.type === "Identifier" &&
            node.callee.object.callee.name === "XMLHttpRequest"))
      ) {
        const match: AnalyzerMatch = {
          analyzerName: AJAX_REQUEST_HEADER_MANIPULATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "ajax-request-header-manipulation": true,
          },
        };

        matchesReturn.push(match);
      }

      // Check for jQuery.globalEval and $.globalEval
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.property.type === "Identifier" &&
        node.callee.property.name === "globalEval" &&
        node.callee.object.type === "Identifier" &&
        (node.callee.object.name === "jQuery" ||
          node.callee.object.name === "$")
      ) {
        const match: AnalyzerMatch = {
          analyzerName: AJAX_REQUEST_HEADER_MANIPULATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "ajax-request-header-manipulation": true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { ajaxRequestHeaderManipulationAnalyzerBuilder };
