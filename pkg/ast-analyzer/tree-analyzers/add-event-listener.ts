import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";

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

      // Check if this is an addEventListener call
      const isAddEventListenerCall =
        (node.callee.type === "MemberExpression" &&
          node.callee.property.type === "Identifier" &&
          node.callee.property.name === "addEventListener") ||
        (node.callee.type === "Identifier" &&
          node.callee.name === "addEventListener");

      if (isAddEventListenerCall && node.arguments.length >= 2) {
        const eventType =
          node.arguments[0].type === "Literal"
            ? String(node.arguments[0].value)
            : "dynamic";

        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: ADD_EVENT_LISTENER_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "event-listener": true,
            [`event-type-${eventType}`]: true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { addEventListenerAnalyzerBuilder };
