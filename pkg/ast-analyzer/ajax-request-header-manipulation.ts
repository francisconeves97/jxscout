import { Node } from "oxc-parser";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "./types";
import { Visitor } from "./walker";

export const AJAX_REQUEST_HEADER_MANIPULATION_ANALYZER_NAME =
  "ajax-request-header-manipulation";

const ajaxRequestHeaderManipulationAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    CallExpression(node) {
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
          filePath: args.filePath,
          analyzerName: AJAX_REQUEST_HEADER_MANIPULATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "ajax-request-header-manipulation-xhr": true,
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
          filePath: args.filePath,
          analyzerName: AJAX_REQUEST_HEADER_MANIPULATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "ajax-request-header-manipulation-jquery": true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { ajaxRequestHeaderManipulationAnalyzerBuilder };
