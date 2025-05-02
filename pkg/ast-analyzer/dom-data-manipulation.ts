import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "./types";

export const DOM_DATA_MANIPULATION_ANALYZER_NAME = "dom-data-manipulation";

const domDataManipulationAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
) => {
  return {
    CallExpression(node: any, _state: any, ancestors: Node[]) {
      if (!node.loc) {
        return;
      }

      // Check for element.setAttribute()
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.property.type === "Identifier" &&
        node.callee.property.name === "setAttribute"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: DOM_DATA_MANIPULATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "dom-data-manipulation": true,
          },
        };

        matchesReturn.push(match);
      }

      // Check for document.implementation.createHTMLDocument()
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.object.type === "MemberExpression" &&
        node.callee.object.object.type === "Identifier" &&
        node.callee.object.object.name === "document" &&
        node.callee.object.property.type === "Identifier" &&
        node.callee.object.property.name === "implementation" &&
        node.callee.property.type === "Identifier" &&
        node.callee.property.name === "createHTMLDocument"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: DOM_DATA_MANIPULATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "dom-data-manipulation": true,
          },
        };

        matchesReturn.push(match);
      }

      // Check for history.pushState() and history.replaceState()
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.object.type === "Identifier" &&
        node.callee.object.name === "history" &&
        node.callee.property.type === "Identifier" &&
        (node.callee.property.name === "pushState" ||
          node.callee.property.name === "replaceState")
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: DOM_DATA_MANIPULATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "dom-data-manipulation": true,
          },
        };

        matchesReturn.push(match);
      }
    },

    MemberExpression(node: any, _state: any, ancestors: Node[]) {
      if (!node.loc) {
        return;
      }

      // Check for script properties
      if (
        node.object.type === "Identifier" &&
        node.object.name === "script" &&
        node.property.type === "Identifier" &&
        ["src", "text", "textContent", "innerText"].includes(node.property.name)
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: DOM_DATA_MANIPULATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "dom-data-manipulation": true,
          },
        };

        matchesReturn.push(match);
      }

      // Check for element properties
      if (
        node.property.type === "Identifier" &&
        [
          "search",
          "text",
          "textContent",
          "innerText",
          "outerText",
          "value",
          "name",
          "target",
          "method",
          "type",
          "backgroundImage",
          "cssText",
          "codebase",
        ].includes(node.property.name)
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: DOM_DATA_MANIPULATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "dom-data-manipulation": true,
          },
        };

        matchesReturn.push(match);
      }

      // Check for document.title
      if (
        node.object.type === "Identifier" &&
        node.object.name === "document" &&
        node.property.type === "Identifier" &&
        node.property.name === "title"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: DOM_DATA_MANIPULATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "dom-data-manipulation": true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { domDataManipulationAnalyzerBuilder };
