import path from "path";
import { expect, test } from "vitest";
import { analyzeFile } from "../../index";
import { AnalyzerMatch } from "../../types";

interface RegexMatchTestCase {
  jsFileName: string;
  expectedCalls: AnalyzerMatch[];
}

const testCases: RegexMatchTestCase[] = [
  {
    jsFileName: "1.js",
    expectedCalls: [
      {
        analyzerName: "regex-match",
        value: '"asd".match(/world/)',
        start: { line: 5, column: 0 },
        end: { line: 5, column: 20 },
        tags: { "regex-match": true, "string-match": true },
      },
      {
        analyzerName: "regex-match",
        value: 'regex.exec("hello world")',
        start: { line: 10, column: 16 },
        end: { line: 10, column: 41 },
        tags: { "regex-match": true, "regex-exec": true },
      },
      {
        analyzerName: "regex-match",
        value: 'regex.test("hello world")',
        start: { line: 9, column: 16 },
        end: { line: 9, column: 41 },
        tags: { "regex-match": true, "regex-test": true },
      },
      {
        analyzerName: "regex-match",
        value: 'RegExp.test("hello world")',
        start: { line: 13, column: 16 },
        end: { line: 13, column: 42 },
        tags: { "regex-match": true, "regex-test": true },
      },
      {
        analyzerName: "regex-match",
        value: "str.match(/world/)",
        start: { line: 3, column: 16 },
        end: { line: 3, column: 34 },
        tags: { "regex-match": true, "string-match": true },
      },
    ],
  },
];

test.each(testCases)(
  "regex-match - $jsFileName",
  ({ jsFileName, expectedCalls }) => {
    const filePath = path.join(__dirname, "files", jsFileName);
    const results = analyzeFile(filePath, ["regex-match"]);

    // Sort both arrays by value to ensure consistent comparison
    const sortedCalls = results.sort((a, b) => a.value.localeCompare(b.value));
    const sortedExpected = expectedCalls.sort((a, b) =>
      a.value.localeCompare(b.value)
    );

    expect(sortedCalls).toEqual(sortedExpected);
  }
);
