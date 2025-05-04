import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";

export const XHR_ANALYZER_NAME = "xhr";

const xhrAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    NewExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check if this is an XMLHttpRequest constructor call
      if (
        node.callee.type === "Identifier" &&
        node.callee.name === "XMLHttpRequest"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: XHR_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "xhr-creation": true,
          },
        };

        matchesReturn.push(match);
      }
    },
    CallExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check for common XHR method calls
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.property.type === "Identifier" &&
        ["open", "send", "setRequestHeader"].includes(node.callee.property.name)
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: XHR_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "xhr-method": true,
            [`xhr-${node.callee.property.name}`]: true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { xhrAnalyzerBuilder };
