import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "./types";
import { Visitor } from "./walker";

export const WEBSOCKET_URL_POISONING_ANALYZER_NAME = "websocket-url-poisoning";

const websocketUrlPoisoningAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    NewExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check for WebSocket constructor
      if (
        node.callee.type === "Identifier" &&
        node.callee.name === "WebSocket"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: WEBSOCKET_URL_POISONING_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "websocket-url-poisoning": true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { websocketUrlPoisoningAnalyzerBuilder };
