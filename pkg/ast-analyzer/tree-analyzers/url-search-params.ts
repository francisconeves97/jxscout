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
            "url-search-params": true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { urlSearchParamsAnalyzerBuilder };
