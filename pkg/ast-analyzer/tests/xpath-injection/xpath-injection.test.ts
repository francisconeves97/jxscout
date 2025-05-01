import path from "path";
import { expect, test } from "vitest";
import { analyzeFile } from "../../index";
import { AnalyzerMatch } from "../../types";

interface XPathInjectionTestCase {
  jsFileName: string;
  expectedCalls: AnalyzerMatch[];
}

const testCases: XPathInjectionTestCase[] = [
  {
    jsFileName: "1.js",
    expectedCalls: [
      {
        analyzerName: "xpath-injection",
        value:
          'document.evaluate("//div", document, null, XPathResult.ANY_TYPE, null)',
        start: { line: 1, column: 0 },
        end: { line: 1, column: 70 },
        tags: { "xpath-injection": true },
      },
      {
        analyzerName: "xpath-injection",
        value:
          'element.evaluate("//div", document, null, XPathResult.ANY_TYPE, null)',
        start: { line: 2, column: 0 },
        end: { line: 2, column: 69 },
        tags: { "xpath-injection": true },
      },
    ],
  },
];

test.each(testCases)(
  "xpath-injection - $jsFileName",
  ({ jsFileName, expectedCalls }) => {
    const filePath = path.join(__dirname, "files", jsFileName);
    const results = analyzeFile(filePath, ["xpath-injection"]);

    // Sort both arrays by value to ensure consistent comparison
    const sortedCalls = results.sort((a, b) => a.value.localeCompare(b.value));
    const sortedExpected = expectedCalls.sort((a, b) =>
      a.value.localeCompare(b.value)
    );

    expect(sortedCalls).toEqual(sortedExpected);
  }
);
