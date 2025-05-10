import { Node, MemberExpression } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";

export const LOCATION_ANALYZER_NAME = "location";

// Common location properties and methods
const LOCATION_PROPERTIES = [
  "href",
  "protocol",
  "host",
  "hostname",
  "port",
  "pathname",
  "search",
  "hash",
  "origin",
];

const locationAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    AssignmentExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Helper function to check if a node is a location access
      const isLocationAccess = (node: Node): boolean => {
        if (node.type !== "MemberExpression") return false;
        const memberNode = node as MemberExpression;

        // Direct location access (e.g., location.href)
        if (
          memberNode.object.type === "Identifier" &&
          memberNode.object.name === "location" &&
          memberNode.property.type === "Identifier" &&
          LOCATION_PROPERTIES.includes(memberNode.property.name)
        ) {
          return true;
        }

        // Window.location access (e.g., window.location.href)
        if (
          memberNode.object.type === "MemberExpression" &&
          memberNode.object.object.type === "Identifier" &&
          memberNode.object.object.name === "window" &&
          memberNode.object.property.type === "Identifier" &&
          memberNode.object.property.name === "location" &&
          memberNode.property.type === "Identifier" &&
          LOCATION_PROPERTIES.includes(memberNode.property.name)
        ) {
          return true;
        }

        return false;
      };

      // Check for location assignments - only on the left side
      if (isLocationAccess(node.left)) {
        const memberNode = node.left as MemberExpression;
        const propertyName =
          memberNode.property.type === "Identifier"
            ? memberNode.property.name
            : "unknown";

        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: LOCATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            location: true,
            "location-assignment": true,
            [`property-${propertyName}`]: true,
          },
        };

        matchesReturn.push(match);
        return; // Return early to prevent double detection
      }
    },

    MemberExpression(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Skip if we're inside an AssignmentExpression (left side)
      const isInAssignment = ancestors.some(
        (ancestor) =>
          ancestor.type === "AssignmentExpression" && ancestor.left === node
      );
      if (isInAssignment) {
        return;
      }

      // Helper function to check if a node is a location access
      const isLocationAccess = (node: Node): boolean => {
        if (node.type !== "MemberExpression") return false;
        const memberNode = node as MemberExpression;

        // Direct location access (e.g., location.href)
        if (
          memberNode.object.type === "Identifier" &&
          memberNode.object.name === "location" &&
          memberNode.property.type === "Identifier" &&
          LOCATION_PROPERTIES.includes(memberNode.property.name)
        ) {
          return true;
        }

        // Window.location access (e.g., window.location.href)
        if (
          memberNode.object.type === "MemberExpression" &&
          memberNode.object.object.type === "Identifier" &&
          memberNode.object.object.name === "window" &&
          memberNode.object.property.type === "Identifier" &&
          memberNode.object.property.name === "location" &&
          memberNode.property.type === "Identifier" &&
          LOCATION_PROPERTIES.includes(memberNode.property.name)
        ) {
          return true;
        }

        return false;
      };

      // Check for location reads
      if (isLocationAccess(node)) {
        const propertyName =
          node.property.type === "Identifier" ? node.property.name : "unknown";

        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: LOCATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            location: true,
            "location-read": true,
            [`property-${propertyName}`]: true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { locationAnalyzerBuilder };
