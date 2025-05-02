import path from "path";
import { expect, test } from "vitest";
import { analyzeFile } from "../../index";
import { AnalyzerMatch } from "../../types";

interface Html5StorageManipulationTestCase {
  jsFileName: string;
  expectedCalls: AnalyzerMatch[];
}

const testCases: Html5StorageManipulationTestCase[] = [
  {
    jsFileName: "1.js",
    expectedCalls: [
      {
        analyzerName: "html5-storage-manipulation",
        value: 'localStorage.setItem("key", "value")',
        start: { line: 1, column: 0 },
        end: { line: 1, column: 36 },
        tags: { "html5-storage-manipulation": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/html5-storage-manipulation/files/1.js",
      },
      {
        analyzerName: "html5-storage-manipulation",
        value: 'sessionStorage.setItem("key", "value")',
        start: { line: 2, column: 0 },
        end: { line: 2, column: 38 },
        tags: { "html5-storage-manipulation": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/html5-storage-manipulation/files/1.js",
      },
    ],
  },
];

test.each(testCases)(
  "html5-storage-manipulation - $jsFileName",
  ({ jsFileName, expectedCalls }) => {
    const filePath = path.join(__dirname, "files", jsFileName);
    const results = analyzeFile(filePath, ["html5-storage-manipulation"]);

    // Sort both arrays by value to ensure consistent comparison
    const sortedCalls = results.sort((a, b) => a.value.localeCompare(b.value));
    const sortedExpected = expectedCalls.sort((a, b) =>
      a.value.localeCompare(b.value)
    );

    expect(sortedCalls).toEqual(sortedExpected);
  }
);
