import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "./types";

export const MESSAGE_LISTENER_ANALYZER_NAME = "message-listener";

const messageListenerAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
) => {
  return {
    AssignmentExpression(node: any, _state: any, ancestors: Node[]) {
      // Check for window.onmessage assignments and global onmessage assignments
      if (
        (node.left.type === "MemberExpression" &&
          node.left.object.type === "Identifier" &&
          node.left.object.name === "window" &&
          node.left.property.type === "Identifier" &&
          node.left.property.name === "onmessage") ||
        (node.left.type === "Identifier" && node.left.name === "onmessage")
      ) {
        if (!node.loc) {
          return;
        }

        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: MESSAGE_LISTENER_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "message-listener": true,
            "direct-assignment": true,
          },
        };

        matchesReturn.push(match);
      }
    },

    CallExpression(node: any, _state: any, ancestors: Node[]) {
      // Check for addEventListener("message", ...)
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.property.type === "Identifier" &&
        node.callee.property.name === "addEventListener" &&
        node.arguments.length >= 2 &&
        node.arguments[0].type === "Literal" &&
        node.arguments[0].value === "message"
      ) {
        if (!node.loc) {
          return;
        }

        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: MESSAGE_LISTENER_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "message-listener": true,
            "event-listener": true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { messageListenerAnalyzerBuilder };
