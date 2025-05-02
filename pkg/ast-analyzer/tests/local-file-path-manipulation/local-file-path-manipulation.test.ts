import path from "path";
import { expect, test } from "vitest";
import { analyzeFile } from "../../index";
import { AnalyzerMatch } from "../../types";

interface LocalFilePathManipulationTestCase {
  jsFileName: string;
  expectedCalls: AnalyzerMatch[];
}

const testCases: LocalFilePathManipulationTestCase[] = [
  {
    jsFileName: "1.js",
    expectedCalls: [
      {
        analyzerName: "local-file-path-manipulation",
        value: "FileReader.readAsArrayBuffer(file)",
        start: { line: 1, column: 0 },
        end: { line: 1, column: 34 },
        tags: { "local-file-path-manipulation": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/local-file-path-manipulation/files/1.js",
      },
      {
        analyzerName: "local-file-path-manipulation",
        value: "FileReader.readAsBinaryString(file)",
        start: { line: 2, column: 0 },
        end: { line: 2, column: 35 },
        tags: { "local-file-path-manipulation": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/local-file-path-manipulation/files/1.js",
      },
      {
        analyzerName: "local-file-path-manipulation",
        value: "FileReader.readAsDataURL(file)",
        start: { line: 3, column: 0 },
        end: { line: 3, column: 30 },
        tags: { "local-file-path-manipulation": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/local-file-path-manipulation/files/1.js",
      },
      {
        analyzerName: "local-file-path-manipulation",
        value: "FileReader.readAsFile(file)",
        start: { line: 5, column: 0 },
        end: { line: 5, column: 27 },
        tags: { "local-file-path-manipulation": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/local-file-path-manipulation/files/1.js",
      },
      {
        analyzerName: "local-file-path-manipulation",
        value: "FileReader.readAsText(file)",
        start: { line: 4, column: 0 },
        end: { line: 4, column: 27 },
        tags: { "local-file-path-manipulation": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/local-file-path-manipulation/files/1.js",
      },
      {
        analyzerName: "local-file-path-manipulation",
        value: "FileReader.root.getFile(path)",
        start: { line: 6, column: 0 },
        end: { line: 6, column: 29 },
        tags: { "local-file-path-manipulation": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/local-file-path-manipulation/files/1.js",
      },
    ],
  },
];

test.each(testCases)(
  "local-file-path-manipulation - $jsFileName",
  ({ jsFileName, expectedCalls }) => {
    const filePath = path.join(__dirname, "files", jsFileName);
    const results = analyzeFile(filePath, ["local-file-path-manipulation"]);

    // Sort both arrays by value to ensure consistent comparison
    const sortedCalls = results.sort((a, b) => a.value.localeCompare(b.value));
    const sortedExpected = expectedCalls.sort((a, b) =>
      a.value.localeCompare(b.value)
    );

    expect(sortedCalls).toEqual(sortedExpected);
  }
);
