import path from "path";
import { expect, test } from "vitest";
import { analyzeFile } from "../../index";
import { AnalyzerMatch } from "../../types";

interface JQueryDomXssTestCase {
  jsFileName: string;
  expectedCalls: AnalyzerMatch[];
}

const testCases: JQueryDomXssTestCase[] = [
  {
    jsFileName: "1.js",
    expectedCalls: [
      {
        analyzerName: "jquery-dom-xss",
        value: '$.parseHTML("<script>alert(1)</script>")',
        start: { line: 4, column: 0 },
        end: { line: 4, column: 40 },
        tags: { "jquery-dom-xss": true },
      },
      {
        analyzerName: "jquery-dom-xss",
        value: '$("#element").append("<script>alert(1)</script>")',
        start: { line: 2, column: 0 },
        end: { line: 2, column: 49 },
        tags: { "jquery-dom-xss": true },
      },
      {
        analyzerName: "jquery-dom-xss",
        value: 'jQuery.parseHTML("<script>alert(1)</script>")',
        start: { line: 3, column: 0 },
        end: { line: 3, column: 45 },
        tags: { "jquery-dom-xss": true },
      },
      {
        analyzerName: "jquery-dom-xss",
        value: 'jQuery("#element").after("<script>alert(1)</script>")',
        start: { line: 5, column: 0 },
        end: { line: 5, column: 53 },
        tags: { "jquery-dom-xss": true },
      },
      {
        analyzerName: "jquery-dom-xss",
        value: 'jQuery("#element").html("<script>alert(1)</script>")',
        start: { line: 1, column: 0 },
        end: { line: 1, column: 52 },
        tags: { "jquery-dom-xss": true },
      },
      {
        analyzerName: "jquery-dom-xss",
        value: 'jQuery("#element").prepend("<script>alert(1)</script>")',
        start: { line: 6, column: 0 },
        end: { line: 6, column: 55 },
        tags: { "jquery-dom-xss": true },
      },
    ],
  },
];

test.each(testCases)(
  "jquery-dom-xss - $jsFileName",
  ({ jsFileName, expectedCalls }) => {
    const filePath = path.join(__dirname, "files", jsFileName);
    const results = analyzeFile(filePath, ["jquery-dom-xss"]);

    // Sort both arrays by value to ensure consistent comparison
    const sortedCalls = results.sort((a, b) => a.value.localeCompare(b.value));
    const sortedExpected = expectedCalls.sort((a, b) =>
      a.value.localeCompare(b.value)
    );

    expect(sortedCalls).toEqual(sortedExpected);
  }
);
