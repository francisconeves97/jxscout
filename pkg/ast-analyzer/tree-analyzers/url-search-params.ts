import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";

export const URL_SEARCH_PARAMS_ANALYZER_NAME = "url-search-params";

const urlSearchParamsAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    NewExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check for URLSearchParams constructor
      if (
        node.callee.type === "Identifier" &&
        node.callee.name === "URLSearchParams"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: URL_SEARCH_PARAMS_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "url-search-params-creation": true,
          },
        };

        matchesReturn.push(match);
      }
    },
    CallExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check for URLSearchParams method calls
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.object.type === "NewExpression" &&
        node.callee.object.callee.type === "Identifier" &&
        node.callee.object.callee.name === "URLSearchParams" &&
        node.callee.property.type === "Identifier" &&
        ["append", "delete", "get", "getAll", "has", "set", "sort"].includes(
          node.callee.property.name
        )
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: URL_SEARCH_PARAMS_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "url-search-params": true,
            [`url-search-params-${node.callee.property.name}`]: true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { urlSearchParamsAnalyzerBuilder };
