import path from "path";
import { expect, test } from "vitest";
import { analyzeFile } from "../../index";
import { AnalyzerMatch } from "../../types";

interface CommonSourcesTestCase {
  jsFileName: string;
  expectedCalls: AnalyzerMatch[];
}

const testCases: CommonSourcesTestCase[] = [
  {
    jsFileName: "1.js",
    expectedCalls: [
      {
        analyzerName: "common-sources",
        value: "document.baseURI",
        start: { line: 4, column: 0 },
        end: { line: 4, column: 16 },
        tags: { "common-sources": true },
      },
      {
        analyzerName: "common-sources",
        value: "document.cookie",
        start: { line: 5, column: 0 },
        end: { line: 5, column: 15 },
        tags: { "common-sources": true },
      },
      {
        analyzerName: "common-sources",
        value: "document.documentURI",
        start: { line: 2, column: 0 },
        end: { line: 2, column: 20 },
        tags: { "common-sources": true },
      },
      {
        analyzerName: "common-sources",
        value: "document.referrer",
        start: { line: 6, column: 0 },
        end: { line: 6, column: 17 },
        tags: { "common-sources": true },
      },
      {
        analyzerName: "common-sources",
        value: "document.URL",
        start: { line: 1, column: 0 },
        end: { line: 1, column: 12 },
        tags: { "common-sources": true },
      },
      {
        analyzerName: "common-sources",
        value: "document.URLUnencoded",
        start: { line: 3, column: 0 },
        end: { line: 3, column: 21 },
        tags: { "common-sources": true },
      },
      {
        analyzerName: "common-sources",
        value: 'history.pushState({}, "", "https://example.com")',
        start: { line: 9, column: 0 },
        end: { line: 9, column: 48 },
        tags: { "common-sources": true },
      },
      {
        analyzerName: "common-sources",
        value: 'history.replaceState({}, "", "https://example.com")',
        start: { line: 10, column: 0 },
        end: { line: 10, column: 51 },
        tags: { "common-sources": true },
      },
      {
        analyzerName: "common-sources",
        value: "localStorage.setItem",
        start: { line: 11, column: 0 },
        end: { line: 11, column: 20 },
        tags: { "common-sources": true },
      },
      {
        analyzerName: "common-sources",
        value: 'localStorage.setItem("key", "value")',
        start: { line: 11, column: 0 },
        end: { line: 11, column: 36 },
        tags: { "common-sources": true },
      },
      {
        analyzerName: "common-sources",
        value: "location",
        start: { line: 8, column: 0 },
        end: { line: 8, column: 8 },
        tags: { "common-sources": true },
      },
      {
        analyzerName: "common-sources",
        value: "location",
        start: { line: 17, column: 18 },
        end: { line: 17, column: 26 },
        tags: { "common-sources": true },
      },
      {
        analyzerName: "common-sources",
        value: "location",
        start: { line: 18, column: 18 },
        end: { line: 18, column: 26 },
        tags: { "common-sources": true },
      },
      {
        analyzerName: "common-sources",
        value: "location",
        start: { line: 19, column: 18 },
        end: { line: 19, column: 26 },
        tags: { "common-sources": true },
      },
      {
        analyzerName: "common-sources",
        value: "location",
        start: { line: 20, column: 18 },
        end: { line: 20, column: 26 },
        tags: { "common-sources": true },
      },
      {
        analyzerName: "common-sources",
        value: "location",
        start: { line: 21, column: 18 },
        end: { line: 21, column: 26 },
        tags: { "common-sources": true },
      },
      {
        analyzerName: "common-sources",
        value: "location",
        start: { line: 22, column: 18 },
        end: { line: 22, column: 26 },
        tags: { "common-sources": true },
      },
      {
        analyzerName: "common-sources",
        value: "location.hash",
        start: { line: 18, column: 18 },
        end: { line: 18, column: 31 },
        tags: { "common-sources": true },
      },
      {
        analyzerName: "common-sources",
        value: "location.href",
        start: { line: 20, column: 18 },
        end: { line: 20, column: 31 },
        tags: { "common-sources": true },
      },
      {
        analyzerName: "common-sources",
        value: "location.origin",
        start: { line: 21, column: 18 },
        end: { line: 21, column: 33 },
        tags: { "common-sources": true },
      },
      {
        analyzerName: "common-sources",
        value: "location.pathname",
        start: { line: 19, column: 18 },
        end: { line: 19, column: 35 },
        tags: { "common-sources": true },
      },
      {
        analyzerName: "common-sources",
        value: "location.protocol",
        start: { line: 22, column: 18 },
        end: { line: 22, column: 35 },
        tags: { "common-sources": true },
      },
      {
        analyzerName: "common-sources",
        value: "location.search",
        start: { line: 17, column: 18 },
        end: { line: 17, column: 33 },
        tags: { "common-sources": true },
      },
      {
        analyzerName: "common-sources",
        value: "mozIndexedDB.open",
        start: { line: 13, column: 0 },
        end: { line: 13, column: 17 },
        tags: { "common-sources": true },
      },
      {
        analyzerName: "common-sources",
        value: "msIndexedDB.open",
        start: { line: 15, column: 0 },
        end: { line: 15, column: 16 },
        tags: { "common-sources": true },
      },
      {
        analyzerName: "common-sources",
        value: "sessionStorage.setItem",
        start: { line: 12, column: 0 },
        end: { line: 12, column: 22 },
        tags: { "common-sources": true },
      },
      {
        analyzerName: "common-sources",
        value: 'sessionStorage.setItem("key", "value")',
        start: { line: 12, column: 0 },
        end: { line: 12, column: 38 },
        tags: { "common-sources": true },
      },
      {
        analyzerName: "common-sources",
        value: "webkitIndexedDB.open",
        start: { line: 14, column: 0 },
        end: { line: 14, column: 20 },
        tags: { "common-sources": true },
      },
      {
        analyzerName: "common-sources",
        value: "window.name",
        start: { line: 7, column: 0 },
        end: { line: 7, column: 11 },
        tags: { "common-sources": true },
      },
    ],
  },
];

test.each(testCases)(
  "common-sources - $jsFileName",
  ({ jsFileName, expectedCalls }) => {
    const filePath = path.join(__dirname, "files", jsFileName);
    const results = analyzeFile(filePath, ["common-sources"]);

    // Sort both arrays by value to ensure consistent comparison
    const sortedCalls = results.sort((a, b) => a.value.localeCompare(b.value));
    const sortedExpected = expectedCalls.sort((a, b) =>
      a.value.localeCompare(b.value)
    );

    expect(sortedCalls).toEqual(sortedExpected);
  }
);
