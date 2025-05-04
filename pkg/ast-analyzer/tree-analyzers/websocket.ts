import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";

export const WEBSOCKET_ANALYZER_NAME = "websocket";

const websocketAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    NewExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Check if this is a WebSocket constructor call
      if (
        node.callee.type === "Identifier" &&
        node.callee.name === "WebSocket" &&
        node.arguments.length >= 1
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: WEBSOCKET_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "websocket-creation": true,
            ...(node.arguments.length >= 2 ? { "has-protocols": true } : {}),
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { websocketAnalyzerBuilder };
