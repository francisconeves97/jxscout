import path from "path";
import { expect, test } from "vitest";
import { analyzeFile } from "../../index";
import { AnalyzerMatch } from "../../types";

interface JavaScriptInjectionTestCase {
  jsFileName: string;
  expectedCalls: AnalyzerMatch[];
}

const testCases: JavaScriptInjectionTestCase[] = [
  {
    jsFileName: "1.js",
    expectedCalls: [
      {
        analyzerName: "javascript-injection",
        value: 'crypto.generateCRMFRequest("test")',
        start: { line: 9, column: 0 },
        end: { line: 9, column: 34 },
        tags: { "javascript-injection": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/javascript-injection/files/1.js",
      },
      {
        analyzerName: "javascript-injection",
        value:
          'document.execCommand("insertHTML", false, "<script>alert(1)</script>")',
        start: { line: 6, column: 0 },
        end: { line: 6, column: 70 },
        tags: { "javascript-injection": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/javascript-injection/files/1.js",
      },
      {
        analyzerName: "javascript-injection",
        value: "document.execScript(\"console.log('test')\")",
        start: { line: 7, column: 0 },
        end: { line: 7, column: 42 },
        tags: { "javascript-injection": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/javascript-injection/files/1.js",
      },
      {
        analyzerName: "javascript-injection",
        value: "eval(\"console.log('test')\")",
        start: { line: 1, column: 0 },
        end: { line: 1, column: 27 },
        tags: { "javascript-injection": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/javascript-injection/files/1.js",
      },
      {
        analyzerName: "javascript-injection",
        value: "Function(\"console.log('test')\")",
        start: { line: 2, column: 0 },
        end: { line: 2, column: 31 },
        tags: { "javascript-injection": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/javascript-injection/files/1.js",
      },
      {
        analyzerName: "javascript-injection",
        value: 'range.createContextualFragment("<script>alert(1)</script>")',
        start: { line: 10, column: 0 },
        end: { line: 10, column: 59 },
        tags: { "javascript-injection": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/javascript-injection/files/1.js",
      },
      {
        analyzerName: "javascript-injection",
        value: "setImmediate(\"console.log('test')\")",
        start: { line: 5, column: 0 },
        end: { line: 5, column: 35 },
        tags: { "javascript-injection": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/javascript-injection/files/1.js",
      },
      {
        analyzerName: "javascript-injection",
        value: "setInterval(\"console.log('test')\", 1000)",
        start: { line: 4, column: 0 },
        end: { line: 4, column: 40 },
        tags: { "javascript-injection": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/javascript-injection/files/1.js",
      },
      {
        analyzerName: "javascript-injection",
        value: "setTimeout(\"console.log('test')\", 1000)",
        start: { line: 3, column: 0 },
        end: { line: 3, column: 39 },
        tags: { "javascript-injection": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/javascript-injection/files/1.js",
      },
      {
        analyzerName: "javascript-injection",
        value: "window.msSetImmediate(\"console.log('test')\")",
        start: { line: 8, column: 0 },
        end: { line: 8, column: 44 },
        tags: { "javascript-injection": true },
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/javascript-injection/files/1.js",
      },
    ],
  },
];

test.each(testCases)(
  "javascript-injection - $jsFileName",
  ({ jsFileName, expectedCalls }) => {
    const filePath = path.join(__dirname, "files", jsFileName);
    const results = analyzeFile(filePath, ["javascript-injection"]);

    // Sort both arrays by value to ensure consistent comparison
    const sortedCalls = results.sort((a, b) => a.value.localeCompare(b.value));
    const sortedExpected = expectedCalls.sort((a, b) =>
      a.value.localeCompare(b.value)
    );

    expect(sortedCalls).toEqual(sortedExpected);
  }
);
