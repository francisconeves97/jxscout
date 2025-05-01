import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "./types";

export const DOM_XSS_ANALYZER_NAME = "dom-xss";

const domXssAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
) => {
  return {
    AssignmentExpression(node: any, _state: any, ancestors: Node[]) {
      if (!node.loc) {
        return;
      }

      // Check for innerHTML assignments
      if (
        node.left.type === "MemberExpression" &&
        node.left.property.type === "Identifier" &&
        node.left.property.name === "innerHTML"
      ) {
        const match: AnalyzerMatch = {
          analyzerName: DOM_XSS_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "dom-xss": true,
          },
        };

        matchesReturn.push(match);
      }

      // Check for outerHTML assignments
      if (
        node.left.type === "MemberExpression" &&
        node.left.property.type === "Identifier" &&
        node.left.property.name === "outerHTML"
      ) {
        const match: AnalyzerMatch = {
          analyzerName: DOM_XSS_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "dom-xss": true,
          },
        };

        matchesReturn.push(match);
      }

      // Check for document.domain assignments
      if (
        node.left.type === "MemberExpression" &&
        node.left.object.type === "Identifier" &&
        node.left.object.name === "document" &&
        node.left.property.type === "Identifier" &&
        node.left.property.name === "domain"
      ) {
        const match: AnalyzerMatch = {
          analyzerName: DOM_XSS_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "dom-xss": true,
          },
        };

        matchesReturn.push(match);
      }

      // Check for event handler assignments with string values
      if (
        node.left.type === "MemberExpression" &&
        node.left.property.type === "Identifier" &&
        node.left.property.name.startsWith("on") &&
        (node.right.type === "Literal" || node.right.type === "TemplateLiteral")
      ) {
        const match: AnalyzerMatch = {
          analyzerName: DOM_XSS_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "dom-xss": true,
          },
        };

        matchesReturn.push(match);
      }
    },

    CallExpression(node: any, _state: any, ancestors: Node[]) {
      if (!node.loc) {
        return;
      }

      // Check for document.write and document.writeln
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.object.type === "Identifier" &&
        node.callee.object.name === "document" &&
        node.callee.property.type === "Identifier" &&
        (node.callee.property.name === "write" ||
          node.callee.property.name === "writeln")
      ) {
        const match: AnalyzerMatch = {
          analyzerName: DOM_XSS_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "dom-xss": true,
          },
        };

        matchesReturn.push(match);
      }

      // Check for insertAdjacentHTML
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.property.type === "Identifier" &&
        node.callee.property.name === "insertAdjacentHTML"
      ) {
        const match: AnalyzerMatch = {
          analyzerName: DOM_XSS_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "dom-xss": true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { domXssAnalyzerBuilder };
