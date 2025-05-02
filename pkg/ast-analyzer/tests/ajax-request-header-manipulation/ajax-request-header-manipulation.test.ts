import path from "path";
import { expect, test } from "vitest";
import { analyzeFile } from "../../index";
import { AnalyzerMatch } from "../../types";

interface AjaxRequestHeaderManipulationTestCase {
  jsFileName: string;
  expectedCalls: AnalyzerMatch[];
}

const testCases: AjaxRequestHeaderManipulationTestCase[] = [
  {
    jsFileName: "1.js",
    expectedCalls: [
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/ajax-request-header-manipulation/files/1.js",
        analyzerName: "ajax-request-header-manipulation",
        value: "$.globalEval(\"console.log('test')\")",
        start: { line: 5, column: 0 },
        end: { line: 5, column: 35 },
        tags: { "ajax-request-header-manipulation": true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/ajax-request-header-manipulation/files/1.js",
        analyzerName: "ajax-request-header-manipulation",
        value: "jQuery.globalEval(\"console.log('test')\")",
        start: { line: 4, column: 0 },
        end: { line: 4, column: 40 },
        tags: { "ajax-request-header-manipulation": true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/ajax-request-header-manipulation/files/1.js",
        analyzerName: "ajax-request-header-manipulation",
        value: 'xhr.open("GET", "https://example.com")',
        start: { line: 2, column: 0 },
        end: { line: 2, column: 38 },
        tags: { "ajax-request-header-manipulation": true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/ajax-request-header-manipulation/files/1.js",
        analyzerName: "ajax-request-header-manipulation",
        value: "xhr.send()",
        start: { line: 3, column: 0 },
        end: { line: 3, column: 10 },
        tags: { "ajax-request-header-manipulation": true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/ajax-request-header-manipulation/files/1.js",
        analyzerName: "ajax-request-header-manipulation",
        value: 'xhr.setRequestHeader("Content-Type", "application/json")',
        start: { line: 1, column: 0 },
        end: { line: 1, column: 56 },
        tags: { "ajax-request-header-manipulation": true },
      },
    ],
  },
];

test.each(testCases)(
  "ajax-request-header-manipulation - $jsFileName",
  ({ jsFileName, expectedCalls }) => {
    const filePath = path.join(__dirname, "files", jsFileName);
    const results = analyzeFile(filePath, ["ajax-request-header-manipulation"]);

    // Sort both arrays by value to ensure consistent comparison
    const sortedCalls = results.sort((a, b) => a.value.localeCompare(b.value));
    const sortedExpected = expectedCalls.sort((a, b) =>
      a.value.localeCompare(b.value)
    );

    expect(sortedCalls).toEqual(sortedExpected);
  }
);
