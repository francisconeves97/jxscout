import path from "path";
import { expect, test } from "vitest";
import { analyzeFile } from "../../index";
import { AnalyzerMatch } from "../../types";

interface MessageListenerTestCase {
  jsFileName: string;
  expectedCalls: AnalyzerMatch[];
}

const testCases: MessageListenerTestCase[] = [
  {
    jsFileName: "1.js",
    expectedCalls: [
      {
        analyzerName: "message-listener",
        value:
          'document.addEventListener("message", function(event) {\n  console.log(event.data);\n})',
        start: { line: 9, column: 0 },
        end: { line: 11, column: 2 },
        tags: { "message-listener": true, "event-listener": true },
      },
      {
        analyzerName: "message-listener",
        value: "onmessage = function(event) {\n  console.log(event.data);\n}",
        start: { line: 18, column: 0 },
        end: { line: 20, column: 1 },
        tags: { "message-listener": true, "direct-assignment": true },
      },
      {
        analyzerName: "message-listener",
        value:
          'window.addEventListener("message", function(event) {\n  console.log(event.data);\n})',
        start: { line: 5, column: 0 },
        end: { line: 7, column: 2 },
        tags: { "message-listener": true, "event-listener": true },
      },
      {
        analyzerName: "message-listener",
        value:
          "window.onmessage = function(event) {\n  console.log(event.data);\n}",
        start: { line: 1, column: 0 },
        end: { line: 3, column: 1 },
        tags: { "message-listener": true, "direct-assignment": true },
      },
    ],
  },
];

test.each(testCases)(
  "message-listener - $jsFileName",
  ({ jsFileName, expectedCalls }) => {
    const filePath = path.join(__dirname, "files", jsFileName);
    const results = analyzeFile(filePath, ["message-listener"]);

    // Sort both arrays by value to ensure consistent comparison
    const sortedCalls = results.sort((a, b) => a.value.localeCompare(b.value));
    const sortedExpected = expectedCalls.sort((a, b) =>
      a.value.localeCompare(b.value)
    );

    expect(sortedCalls).toEqual(sortedExpected);
  }
);
