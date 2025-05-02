import path from "path";
import { expect, test } from "vitest";
import { analyzeFile } from "../../index";
import { AnalyzerMatch } from "../../types";

interface PostMessageTestCase {
  jsFileName: string;
  expectedCalls: AnalyzerMatch[];
}

const testCases: PostMessageTestCase[] = [
  {
    jsFileName: "1.js",
    expectedCalls: [
      {
        analyzerName: "post-message",
        value: 'abc.postMessage({ type: "data", payload: "test" }, "*")',
        start: { line: 4, column: 0 },
        end: { line: 4, column: 55 },
        tags: { "post-message": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/post-message/files/1.js",
      },
      {
        analyzerName: "post-message",
        value: 'postMessage({ type: "data", payload: "test" }, "*")',
        start: { line: 3, column: 0 },
        end: { line: 3, column: 51 },
        tags: { "post-message": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/post-message/files/1.js",
      },
      {
        analyzerName: "post-message",
        value: 'window.postMessage({ type: "data", payload: "test" }, "*")',
        start: { line: 1, column: 0 },
        end: { line: 1, column: 58 },
        tags: { "post-message": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/post-message/files/1.js",
      },
      {
        analyzerName: "post-message",
        value:
          'window.postMessage({ type: "data", payload: "test" }, "https://example.com")',
        start: { line: 2, column: 0 },
        end: { line: 2, column: 76 },
        tags: { "post-message": true, "cross-origin": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/post-message/files/1.js",
      },
    ],
  },
];

test.each(testCases)(
  "post-message - $jsFileName",
  ({ jsFileName, expectedCalls }) => {
    const filePath = path.join(__dirname, "files", jsFileName);
    const results = analyzeFile(filePath, ["post-message"]);

    // Sort both arrays by value to ensure consistent comparison
    const sortedCalls = results.sort((a, b) => a.value.localeCompare(b.value));
    const sortedExpected = expectedCalls.sort((a, b) =>
      a.value.localeCompare(b.value)
    );

    expect(sortedCalls).toEqual(sortedExpected);
  }
);
