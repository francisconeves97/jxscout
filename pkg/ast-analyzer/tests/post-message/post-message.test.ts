import path from "path";
import { expect, test } from "vitest";
import { postMessageAnalyzerBuilder } from "../../post-message";
import { parseFile } from "../../index";
import { AnalyzerMatch } from "../../types";
import { ancestor as traverse } from "acorn-walk";

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
      },
      {
        analyzerName: "post-message",
        value: 'postMessage({ type: "data", payload: "test" }, "*")',
        start: { line: 3, column: 0 },
        end: { line: 3, column: 51 },
        tags: { "post-message": true },
      },
      {
        analyzerName: "post-message",
        value: 'window.postMessage({ type: "data", payload: "test" }, "*")',
        start: { line: 1, column: 0 },
        end: { line: 1, column: 58 },
        tags: { "post-message": true },
      },
      {
        analyzerName: "post-message",
        value:
          'window.postMessage({ type: "data", payload: "test" }, "https://example.com")',
        start: { line: 2, column: 0 },
        end: { line: 2, column: 76 },
        tags: { "post-message": true, "cross-origin": true },
      },
    ],
  },
];

test.each(testCases)(
  "post-message - $jsFileName",
  ({ jsFileName, expectedCalls }) => {
    const filePath = path.join(__dirname, "files", jsFileName);

    const args = parseFile(filePath);
    const results: AnalyzerMatch[] = [];
    const postMessageAnalyzer = postMessageAnalyzerBuilder(args, results);

    traverse(args.ast, {
      CallExpression(node, state, ancestors) {
        postMessageAnalyzer.CallExpression?.(node, state, ancestors);
      },
    });

    // Sort both arrays by value to ensure consistent comparison
    const sortedCalls = results.sort((a, b) => a.value.localeCompare(b.value));
    const sortedExpected = expectedCalls.sort((a, b) =>
      a.value.localeCompare(b.value)
    );

    expect(sortedCalls).toEqual(sortedExpected);
  }
);
