import path from "path";
import { expect, test } from "vitest";
import { analyzeFile } from "../../index";
import { AnalyzerMatch } from "../../types";

interface DomDataManipulationTestCase {
  jsFileName: string;
  expectedCalls: AnalyzerMatch[];
}

const testCases: DomDataManipulationTestCase[] = [
  {
    jsFileName: "1.js",
    expectedCalls: [
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/dom-data-manipulation/files/1.js",
        analyzerName: "dom-data-manipulation",
        value: "document.title",
        start: { line: 19, column: 0 },
        end: { line: 19, column: 14 },
        tags: { "dom-data-manipulation": true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/dom-data-manipulation/files/1.js",
        analyzerName: "dom-data-manipulation",
        value: "script.innerText",
        start: { line: 5, column: 0 },
        end: { line: 5, column: 16 },
        tags: { "dom-data-manipulation": true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/dom-data-manipulation/files/1.js",
        analyzerName: "dom-data-manipulation",
        value: "script.src",
        start: { line: 2, column: 0 },
        end: { line: 2, column: 10 },
        tags: { "dom-data-manipulation": true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/dom-data-manipulation/files/1.js",
        analyzerName: "dom-data-manipulation",
        value: "script.text",
        start: { line: 3, column: 0 },
        end: { line: 3, column: 11 },
        tags: { "dom-data-manipulation": true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/dom-data-manipulation/files/1.js",
        analyzerName: "dom-data-manipulation",
        value: "script.textContent",
        start: { line: 4, column: 0 },
        end: { line: 4, column: 18 },
        tags: { "dom-data-manipulation": true },
      },
    ],
  },
];

test.each(testCases)(
  "dom-data-manipulation - $jsFileName",
  ({ jsFileName, expectedCalls }) => {
    const filePath = path.join(__dirname, "files", jsFileName);
    const results = analyzeFile(filePath, ["dom-data-manipulation"]);

    // Sort both arrays by value to ensure consistent comparison
    const sortedCalls = results.sort((a, b) => a.value.localeCompare(b.value));
    const sortedExpected = expectedCalls.sort((a, b) =>
      a.value.localeCompare(b.value)
    );

    expect(sortedCalls).toEqual(sortedExpected);
  }
);
