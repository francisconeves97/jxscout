import path from "path";
import { expect, test } from "vitest";
import { analyzeFile } from "../../index";
import { AnalyzerMatch } from "../../types";

interface LinkManipulationTestCase {
  jsFileName: string;
  expectedCalls: AnalyzerMatch[];
}

const testCases: LinkManipulationTestCase[] = [
  {
    jsFileName: "1.js",
    expectedCalls: [
      {
        analyzerName: "link-manipulation",
        value: "element.action",
        start: { line: 4, column: 0 },
        end: { line: 4, column: 14 },
        tags: { "link-manipulation": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/link-manipulation/files/1.js",
      },
      {
        analyzerName: "link-manipulation",
        value: "element.action",
        start: { line: 9, column: 0 },
        end: { line: 9, column: 14 },
        tags: { "link-manipulation": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/link-manipulation/files/1.js",
      },
      {
        analyzerName: "link-manipulation",
        value: 'element.action = "/submit"',
        start: { line: 9, column: 0 },
        end: { line: 9, column: 26 },
        tags: { "link-manipulation": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/link-manipulation/files/1.js",
      },
      {
        analyzerName: "link-manipulation",
        value: "element.href",
        start: { line: 2, column: 0 },
        end: { line: 2, column: 12 },
        tags: { "link-manipulation": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/link-manipulation/files/1.js",
      },
      {
        analyzerName: "link-manipulation",
        value: "element.href",
        start: { line: 7, column: 0 },
        end: { line: 7, column: 12 },
        tags: { "link-manipulation": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/link-manipulation/files/1.js",
      },
      {
        analyzerName: "link-manipulation",
        value: 'element.href = "https://example.com"',
        start: { line: 7, column: 0 },
        end: { line: 7, column: 36 },
        tags: { "link-manipulation": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/link-manipulation/files/1.js",
      },
      {
        analyzerName: "link-manipulation",
        value: "element.src",
        start: { line: 3, column: 0 },
        end: { line: 3, column: 11 },
        tags: { "link-manipulation": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/link-manipulation/files/1.js",
      },
      {
        analyzerName: "link-manipulation",
        value: "element.src",
        start: { line: 8, column: 0 },
        end: { line: 8, column: 11 },
        tags: { "link-manipulation": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/link-manipulation/files/1.js",
      },
      {
        analyzerName: "link-manipulation",
        value: 'element.src = "https://example.com/image.jpg"',
        start: { line: 8, column: 0 },
        end: { line: 8, column: 45 },
        tags: { "link-manipulation": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/link-manipulation/files/1.js",
      },
    ],
  },
];

test.each(testCases)(
  "link-manipulation - $jsFileName",
  ({ jsFileName, expectedCalls }) => {
    const filePath = path.join(__dirname, "files", jsFileName);
    const results = analyzeFile(filePath, ["link-manipulation"]);

    // Sort both arrays by value to ensure consistent comparison
    const sortedCalls = results.sort((a, b) => a.value.localeCompare(b.value));
    const sortedExpected = expectedCalls.sort((a, b) =>
      a.value.localeCompare(b.value)
    );

    expect(sortedCalls).toEqual(sortedExpected);
  }
);
