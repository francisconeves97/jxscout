import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "./types";

export const COMMON_SOURCES_ANALYZER_NAME = "common-sources";

const commonSourcesAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
) => {
  return {
    AssignmentExpression(node: any, _state: any, ancestors: Node[]) {
      if (!node.loc) {
        return;
      }

      // Check for direct location assignment
      if (node.left.type === "Identifier" && node.left.name === "location") {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: COMMON_SOURCES_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "common-sources": true,
          },
        };

        matchesReturn.push(match);
      }

      // Check for location property assignments
      if (
        node.left.type === "MemberExpression" &&
        node.left.object.type === "Identifier" &&
        node.left.object.name === "location" &&
        node.left.property.type === "Identifier" &&
        ["href", "pathname", "search", "hash"].includes(node.left.property.name)
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: COMMON_SOURCES_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "common-sources": true,
          },
        };

        matchesReturn.push(match);
      }
    },

    MemberExpression(node: any, _state: any, ancestors: Node[]) {
      if (!node.loc) {
        return;
      }

      // Check for document properties
      if (
        node.object.type === "Identifier" &&
        node.object.name === "document" &&
        node.property.type === "Identifier" &&
        [
          "URL",
          "documentURI",
          "URLUnencoded",
          "baseURI",
          "cookie",
          "referrer",
        ].includes(node.property.name)
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: COMMON_SOURCES_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "common-sources": true,
          },
        };

        matchesReturn.push(match);
      }

      // Check for window.name
      if (
        node.object.type === "Identifier" &&
        node.object.name === "window" &&
        node.property.type === "Identifier" &&
        node.property.name === "name"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: COMMON_SOURCES_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "common-sources": true,
          },
        };

        matchesReturn.push(match);
      }

      // Check for IndexedDB variants
      if (
        node.object.type === "Identifier" &&
        ["mozIndexedDB", "webkitIndexedDB", "msIndexedDB"].includes(
          node.object.name
        )
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: COMMON_SOURCES_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "common-sources": true,
          },
        };

        matchesReturn.push(match);
      }
    },

    CallExpression(node: any, _state: any, ancestors: Node[]) {
      if (!node.loc) {
        return;
      }

      // Check for history methods
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.object.type === "Identifier" &&
        node.callee.object.name === "history" &&
        node.callee.property.type === "Identifier" &&
        ["pushState", "replaceState"].includes(node.callee.property.name)
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: COMMON_SOURCES_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "common-sources": true,
          },
        };

        matchesReturn.push(match);
      }

      // Check for localStorage and sessionStorage getItem
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.object.type === "Identifier" &&
        ["localStorage", "sessionStorage"].includes(node.callee.object.name) &&
        node.callee.property.type === "Identifier" &&
        node.callee.property.name === "getItem"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: COMMON_SOURCES_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "common-sources": true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { commonSourcesAnalyzerBuilder };
