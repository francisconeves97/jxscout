import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "./types";

export const LOCAL_FILE_PATH_MANIPULATION_ANALYZER_NAME =
  "local-file-path-manipulation";

const localFilePathManipulationAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
) => {
  return {
    CallExpression(node: any, _state: any, ancestors: Node[]) {
      if (!node.loc) {
        return;
      }

      // Check for FileReader methods
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.object.type === "Identifier" &&
        node.callee.object.name === "FileReader" &&
        node.callee.property.type === "Identifier" &&
        [
          "readAsArrayBuffer",
          "readAsBinaryString",
          "readAsDataURL",
          "readAsText",
          "readAsFile",
        ].includes(node.callee.property.name)
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: LOCAL_FILE_PATH_MANIPULATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "local-file-path-manipulation": true,
          },
        };

        matchesReturn.push(match);
      }

      // Check for FileReader.root.getFile
      if (
        node.callee.type === "MemberExpression" &&
        node.callee.object.type === "MemberExpression" &&
        node.callee.object.object.type === "Identifier" &&
        node.callee.object.object.name === "FileReader" &&
        node.callee.object.property.type === "Identifier" &&
        node.callee.object.property.name === "root" &&
        node.callee.property.type === "Identifier" &&
        node.callee.property.name === "getFile"
      ) {
        const match: AnalyzerMatch = {
          filePath: args.filePath,
          analyzerName: LOCAL_FILE_PATH_MANIPULATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "local-file-path-manipulation": true,
          },
        };

        matchesReturn.push(match);
      }
    },
  };
};

export { localFilePathManipulationAnalyzerBuilder };
