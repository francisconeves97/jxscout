import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "./types";

export const OPEN_REDIRECTION_ANALYZER_NAME = "open-redirection";

const openRedirectionAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
) => {
  return {
    CallExpression(node: any, _state: any, ancestors: Node[]) {
      if (!node.loc) {
        return;
      }

      // Check for XMLHttpRequest methods
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.property.type === "Identifier" &&
        (node.callee.property.name === "open" ||
          node.callee.property.name === "send") &&
        // Check for XMLHttpRequest instance
        ((node.callee.object.type === "Identifier" &&
          node.callee.object.name === "xhr") ||
          // Check for new XMLHttpRequest()
          (node.callee.object.type === "NewExpression" &&
            node.callee.object.callee.type === "Identifier" &&
            node.callee.object.callee.name === "XMLHttpRequest"))
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: OPEN_REDIRECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "open-redirection": true,
          },
        };

        matchesReturn.push(match);
      }

      // Check for jQuery.ajax and $.ajax
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.property.type === "Identifier" &&
        node.callee.property.name === "ajax" &&
        node.callee.object.type === "Identifier" &&
        (node.callee.object.name === "jQuery" ||
          node.callee.object.name === "$")
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: OPEN_REDIRECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "open-redirection": true,
          },
        };

        matchesReturn.push(match);
      }

      // Check for location methods
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.object.type === "Identifier" &&
        node.callee.object.name === "location" &&
        node.callee.property.type === "Identifier" &&
        (node.callee.property.name === "assign" ||
          node.callee.property.name === "replace")
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: OPEN_REDIRECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "open-redirection": true,
          },
        };

        matchesReturn.push(match);
      }

      // Check for window.open
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.object.type === "Identifier" &&
        node.callee.object.name === "window" &&
        node.callee.property.type === "Identifier" &&
        node.callee.property.name === "open"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: OPEN_REDIRECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "open-redirection": true,
          },
        };

        matchesReturn.push(match);
      }
    },

    MemberExpression(node: any, _state: any, ancestors: Node[]) {
      if (!node.loc) {
        return;
      }

      // Check for location properties
      if (
        node.object.type === "Identifier" &&
        node.object.name === "location" &&
        node.property.type === "Identifier" &&
        ["host", "hostname", "href", "pathname", "search", "protocol"].includes(
          node.property.name
        )
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: OPEN_REDIRECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "open-redirection": true,
          },
        };

        matchesReturn.push(match);
      }

      // Check for element.srcdoc
      if (
        node.property.type === "Identifier" &&
        node.property.name === "srcdoc"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: OPEN_REDIRECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "open-redirection": true,
          },
        };

        matchesReturn.push(match);
      }
    },

    AssignmentExpression(node: any, _state: any, ancestors: Node[]) {
      if (!node.loc) {
        return;
      }

      // Check for location properties
      if (
        node.left.type === "MemberExpression" &&
        node.left.object.type === "Identifier" &&
        node.left.object.name === "location" &&
        node.left.property.type === "Identifier" &&
        ["host", "hostname", "href", "pathname", "search", "protocol"].includes(
          node.left.property.name
        )
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: OPEN_REDIRECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "open-redirection": true,
          },
        };

        matchesReturn.push(match);
      }

      // Check for element.srcdoc
      if (
        node.left.type === "MemberExpression" &&
        node.left.property.type === "Identifier" &&
        node.left.property.name === "srcdoc"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: OPEN_REDIRECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "open-redirection": true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { openRedirectionAnalyzerBuilder };
