import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "./types";
import { Visitor } from "./walker";

export const ADD_EVENT_LISTENER_ANALYZER_NAME = "add-event-listener";

const addEventListenerAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    CallExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      if (
        node.callee.type === "MemberExpression" &&
        node.callee.property.type === "Identifier" &&
        node.callee.property.name === "addEventListener" &&
        node.arguments.length >= 2 &&
        node.arguments[0].type === "Literal" &&
        typeof node.arguments[0].value === "string" &&
        ["FunctionExpression", "ArrowFunctionExpression"].includes(
          node.arguments[1].type
        )
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: ADD_EVENT_LISTENER_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "event-listener": true,
            "function-handler": true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export const addEventListenerAnalyzer: Analyzer =
  addEventListenerAnalyzerBuilder;
