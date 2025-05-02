import path from "path";
import { expect, test } from "vitest";
import { analyzeFile } from "../../index";
import { AnalyzerMatch } from "../../types";

interface OpenRedirectionTestCase {
  jsFileName: string;
  expectedCalls: AnalyzerMatch[];
}

const testCases: OpenRedirectionTestCase[] = [
  {
    jsFileName: "1.js",
    expectedCalls: [
      {
        analyzerName: "open-redirection",
        value: '$.ajax({ url: "https://example.com" })',
        start: { line: 8, column: 0 },
        end: { line: 8, column: 38 },
        tags: { "open-redirection": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/open-redirection/files/1.js",
      },
      {
        analyzerName: "open-redirection",
        value: "element.srcdoc",
        start: { line: 6, column: 0 },
        end: { line: 6, column: 14 },
        tags: { "open-redirection": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/open-redirection/files/1.js",
      },
      {
        analyzerName: "open-redirection",
        value: 'jQuery.ajax({ url: "https://example.com" })',
        start: { line: 9, column: 0 },
        end: { line: 9, column: 43 },
        tags: { "open-redirection": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/open-redirection/files/1.js",
      },
      {
        analyzerName: "open-redirection",
        value: 'location.assign("https://example.com")',
        start: { line: 3, column: 0 },
        end: { line: 3, column: 38 },
        tags: { "open-redirection": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/open-redirection/files/1.js",
      },
      {
        analyzerName: "open-redirection",
        value: "location.host",
        start: { line: 10, column: 0 },
        end: { line: 10, column: 13 },
        tags: { "open-redirection": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/open-redirection/files/1.js",
      },
      {
        analyzerName: "open-redirection",
        value: "location.hostname",
        start: { line: 11, column: 0 },
        end: { line: 11, column: 17 },
        tags: { "open-redirection": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/open-redirection/files/1.js",
      },
      {
        analyzerName: "open-redirection",
        value: "location.href",
        start: { line: 2, column: 0 },
        end: { line: 2, column: 13 },
        tags: { "open-redirection": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/open-redirection/files/1.js",
      },
      {
        analyzerName: "open-redirection",
        value: "location.pathname",
        start: { line: 12, column: 0 },
        end: { line: 12, column: 17 },
        tags: { "open-redirection": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/open-redirection/files/1.js",
      },
      {
        analyzerName: "open-redirection",
        value: "location.protocol",
        start: { line: 14, column: 0 },
        end: { line: 14, column: 17 },
        tags: { "open-redirection": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/open-redirection/files/1.js",
      },
      {
        analyzerName: "open-redirection",
        value: 'location.replace("https://example.com")',
        start: { line: 4, column: 0 },
        end: { line: 4, column: 39 },
        tags: { "open-redirection": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/open-redirection/files/1.js",
      },
      {
        analyzerName: "open-redirection",
        value: "location.search",
        start: { line: 13, column: 0 },
        end: { line: 13, column: 15 },
        tags: { "open-redirection": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/open-redirection/files/1.js",
      },
      {
        analyzerName: "open-redirection",
        value: 'window.open("https://example.com")',
        start: { line: 5, column: 0 },
        end: { line: 5, column: 34 },
        tags: { "open-redirection": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/open-redirection/files/1.js",
      },
      {
        analyzerName: "open-redirection",
        value: 'xhr.open("GET", "https://example.com")',
        start: { line: 7, column: 0 },
        end: { line: 7, column: 38 },
        tags: { "open-redirection": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/open-redirection/files/1.js",
      },
    ],
  },
];

test.each(testCases)(
  "open-redirection - $jsFileName",
  ({ jsFileName, expectedCalls }) => {
    const filePath = path.join(__dirname, "files", jsFileName);
    const results = analyzeFile(filePath, ["open-redirection"]);

    // Sort both arrays by value to ensure consistent comparison
    const sortedCalls = results.sort((a, b) => a.value.localeCompare(b.value));
    const sortedExpected = expectedCalls.sort((a, b) =>
      a.value.localeCompare(b.value)
    );

    expect(sortedCalls).toEqual(sortedExpected);
  }
);
