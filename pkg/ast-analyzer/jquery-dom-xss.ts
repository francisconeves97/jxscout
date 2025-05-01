import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "./types";

export const JQUERY_DOM_XSS_ANALYZER_NAME = "jquery-dom-xss";

const jqueryDomXssAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
) => {
  return {
    CallExpression(node: any, _state: any, ancestors: Node[]) {
      if (!node.loc) {
        return;
      }

      // Check for jQuery methods that are DOM-XSS sinks
      const jquerySinkMethods = [
        "add",
        "after",
        "append",
        "animate",
        "insertAfter",
        "insertBefore",
        "before",
        "html",
        "prepend",
        "replaceAll",
        "replaceWith",
        "wrap",
        "wrapInner",
        "wrapAll",
        "has",
        "constructor",
        "init",
        "index",
        "parseHTML",
      ];

      // Check for direct jQuery method calls
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.property.type === "Identifier" &&
        jquerySinkMethods.includes(node.callee.property.name)
      ) {
        // Check if the object is a jQuery call or result
        let isJQueryObject = false;
        let current = node.callee.object;

        while (current) {
          if (
            current.type === "CallExpression" &&
            current.callee.type === "Identifier" &&
            (current.callee.name === "jQuery" || current.callee.name === "$")
          ) {
            isJQueryObject = true;
            break;
          }

          if (current.type === "MemberExpression") {
            current = current.object;
          } else {
            break;
          }
        }

        if (isJQueryObject) {
          const match: AnalyzerMatch = {
            analyzerName: JQUERY_DOM_XSS_ANALYZER_NAME,
            value: args.source.slice(node.start, node.end),
            start: node.loc.start,
            end: node.loc.end,
            tags: {
              "jquery-dom-xss": true,
            },
          };

          matchesReturn.push(match);
        }
      }

      // Check for jQuery.parseHTML and $.parseHTML
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.property.type === "Identifier" &&
        node.callee.property.name === "parseHTML" &&
        node.callee.object.type === "Identifier" &&
        (node.callee.object.name === "jQuery" ||
          node.callee.object.name === "$")
      ) {
        const match: AnalyzerMatch = {
          analyzerName: JQUERY_DOM_XSS_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "jquery-dom-xss": true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { jqueryDomXssAnalyzerBuilder };
