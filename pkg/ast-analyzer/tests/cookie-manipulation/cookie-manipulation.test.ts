import path from "path";
import { expect, test } from "vitest";
import { analyzeFile } from "../../index";
import { AnalyzerMatch } from "../../types";

interface CookieManipulationTestCase {
  jsFileName: string;
  expectedCalls: AnalyzerMatch[];
}

const testCases: CookieManipulationTestCase[] = [
  {
    jsFileName: "1.js",
    expectedCalls: [
      {
        analyzerName: "cookie-manipulation",
        value: 'document.cookie = "name=value"',
        start: { line: 1, column: 0 },
        end: { line: 1, column: 30 },
        tags: { "cookie-manipulation": true },
      },
      {
        analyzerName: "cookie-manipulation",
        value: "document.cookie = asd",
        start: { line: 3, column: 0 },
        end: { line: 3, column: 21 },
        tags: { "cookie-manipulation": true },
      },
    ],
  },
];

test.each(testCases)(
  "cookie-manipulation - $jsFileName",
  ({ jsFileName, expectedCalls }) => {
    const filePath = path.join(__dirname, "files", jsFileName);
    const results = analyzeFile(filePath, ["cookie-manipulation"]);

    // Sort both arrays by value to ensure consistent comparison
    const sortedCalls = results.sort((a, b) => a.value.localeCompare(b.value));
    const sortedExpected = expectedCalls.sort((a, b) =>
      a.value.localeCompare(b.value)
    );

    expect(sortedCalls).toEqual(sortedExpected);
  }
);
