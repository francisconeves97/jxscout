import path from "path";
import { expect, test } from "vitest";
import { analyzeFile } from "../../index";
import { AnalyzerMatch } from "../../types";

interface WebSocketUrlPoisoningTestCase {
  jsFileName: string;
  expectedCalls: AnalyzerMatch[];
}

const testCases: WebSocketUrlPoisoningTestCase[] = [
  {
    jsFileName: "1.js",
    expectedCalls: [
      {
        analyzerName: "websocket-url-poisoning",
        value: 'new WebSocket("ws://example.com")',
        start: { line: 1, column: 0 },
        end: { line: 1, column: 33 },
        tags: { "websocket-url-poisoning": true },
      },
      {
        analyzerName: "websocket-url-poisoning",
        value: 'new WebSocket("wss://example.com")',
        start: { line: 2, column: 0 },
        end: { line: 2, column: 34 },
        tags: { "websocket-url-poisoning": true },
      },
      {
        analyzerName: "websocket-url-poisoning",
        value: "new WebSocket(asd)",
        start: { line: 3, column: 0 },
        end: { line: 3, column: 18 },
        tags: { "websocket-url-poisoning": true },
      },
    ],
  },
];

test.each(testCases)(
  "websocket-url-poisoning - $jsFileName",
  ({ jsFileName, expectedCalls }) => {
    const filePath = path.join(__dirname, "files", jsFileName);
    const results = analyzeFile(filePath, ["websocket-url-poisoning"]);

    // Sort both arrays by value to ensure consistent comparison
    const sortedCalls = results.sort((a, b) => a.value.localeCompare(b.value));
    const sortedExpected = expectedCalls.sort((a, b) =>
      a.value.localeCompare(b.value)
    );

    expect(sortedCalls).toEqual(sortedExpected);
  }
);
