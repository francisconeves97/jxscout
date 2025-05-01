import path from "path";
import { expect, test } from "vitest";
import { analyzeFile } from "../../index";
import { AnalyzerMatch } from "../../types";

interface HashChangeTestCase {
  jsFileName: string;
  expectedCalls: AnalyzerMatch[];
}

const testCases: HashChangeTestCase[] = [
  {
    jsFileName: "1.js",
    expectedCalls: [
      {
        analyzerName: "hash-change",
        value:
          'document.addEventListener("hashchange", function(event) {\n  console.log(window.location.hash);\n})',
        start: { line: 12, column: 0 },
        end: { line: 14, column: 2 },
        tags: { "hash-change": true, "event-listener": true },
      },
      {
        analyzerName: "hash-change",
        value:
          "onhashchange = function(event) {\n  console.log(window.location.hash);\n}",
        start: { line: 17, column: 0 },
        end: { line: 19, column: 1 },
        tags: { "hash-change": true, "direct-assignment": true },
      },
      {
        analyzerName: "hash-change",
        value:
          'window.addEventListener("hashchange", function(event) {\n  console.log(window.location.hash);\n})',
        start: { line: 7, column: 0 },
        end: { line: 9, column: 2 },
        tags: { "hash-change": true, "event-listener": true },
      },
      {
        analyzerName: "hash-change",
        value:
          "window.onhashchange = function(event) {\n  console.log(window.location.hash);\n}",
        start: { line: 2, column: 0 },
        end: { line: 4, column: 1 },
        tags: { "hash-change": true, "direct-assignment": true },
      },
    ],
  },
];

test.each(testCases)(
  "hash-change - $jsFileName",
  ({ jsFileName, expectedCalls }) => {
    const filePath = path.join(__dirname, "files", jsFileName);
    const results = analyzeFile(filePath, ["hash-change"]);

    // Sort both arrays by value to ensure consistent comparison
    const sortedCalls = results.sort((a, b) => a.value.localeCompare(b.value));
    const sortedExpected = expectedCalls.sort((a, b) =>
      a.value.localeCompare(b.value)
    );

    expect(sortedCalls).toEqual(sortedExpected);
  }
);
