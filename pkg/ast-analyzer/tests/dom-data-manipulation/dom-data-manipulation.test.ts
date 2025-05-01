import path from "path";
import { expect, test } from "vitest";
import { analyzeFile } from "../../index";
import { AnalyzerMatch } from "../../types";

interface DomDataManipulationTestCase {
  jsFileName: string;
  expectedCalls: AnalyzerMatch[];
}

const testCases: DomDataManipulationTestCase[] = [
  {
    jsFileName: "1.js",
    expectedCalls: [
      {
        analyzerName: "dom-data-manipulation",
        value: "document.title",
        start: { line: 19, column: 0 },
        end: { line: 19, column: 14 },
        tags: { "dom-data-manipulation": true },
      },
      {
        analyzerName: "dom-data-manipulation",
        value: "element.backgroundImage",
        start: { line: 16, column: 0 },
        end: { line: 16, column: 23 },
        tags: { "dom-data-manipulation": true },
      },
      {
        analyzerName: "dom-data-manipulation",
        value: "element.codebase",
        start: { line: 18, column: 0 },
        end: { line: 18, column: 16 },
        tags: { "dom-data-manipulation": true },
      },
      {
        analyzerName: "dom-data-manipulation",
        value: "element.cssText",
        start: { line: 17, column: 0 },
        end: { line: 17, column: 15 },
        tags: { "dom-data-manipulation": true },
      },
      {
        analyzerName: "dom-data-manipulation",
        value: "element.innerText",
        start: { line: 9, column: 0 },
        end: { line: 9, column: 17 },
        tags: { "dom-data-manipulation": true },
      },
      {
        analyzerName: "dom-data-manipulation",
        value: "element.method",
        start: { line: 14, column: 0 },
        end: { line: 14, column: 14 },
        tags: { "dom-data-manipulation": true },
      },
      {
        analyzerName: "dom-data-manipulation",
        value: "element.name",
        start: { line: 12, column: 0 },
        end: { line: 12, column: 12 },
        tags: { "dom-data-manipulation": true },
      },
      {
        analyzerName: "dom-data-manipulation",
        value: "element.outerText",
        start: { line: 10, column: 0 },
        end: { line: 10, column: 17 },
        tags: { "dom-data-manipulation": true },
      },
      {
        analyzerName: "dom-data-manipulation",
        value: "element.search",
        start: { line: 6, column: 0 },
        end: { line: 6, column: 14 },
        tags: { "dom-data-manipulation": true },
      },
      {
        analyzerName: "dom-data-manipulation",
        value: "element.target",
        start: { line: 13, column: 0 },
        end: { line: 13, column: 14 },
        tags: { "dom-data-manipulation": true },
      },
      {
        analyzerName: "dom-data-manipulation",
        value: "element.text",
        start: { line: 7, column: 0 },
        end: { line: 7, column: 12 },
        tags: { "dom-data-manipulation": true },
      },
      {
        analyzerName: "dom-data-manipulation",
        value: "element.textContent",
        start: { line: 8, column: 0 },
        end: { line: 8, column: 19 },
        tags: { "dom-data-manipulation": true },
      },
      {
        analyzerName: "dom-data-manipulation",
        value: "element.type",
        start: { line: 15, column: 0 },
        end: { line: 15, column: 12 },
        tags: { "dom-data-manipulation": true },
      },
      {
        analyzerName: "dom-data-manipulation",
        value: "element.value",
        start: { line: 11, column: 0 },
        end: { line: 11, column: 13 },
        tags: { "dom-data-manipulation": true },
      },
      {
        analyzerName: "dom-data-manipulation",
        value: "script.innerText",
        start: { line: 5, column: 0 },
        end: { line: 5, column: 16 },
        tags: { "dom-data-manipulation": true },
      },
      {
        analyzerName: "dom-data-manipulation",
        value: "script.innerText",
        start: { line: 5, column: 0 },
        end: { line: 5, column: 16 },
        tags: { "dom-data-manipulation": true },
      },
      {
        analyzerName: "dom-data-manipulation",
        value: "script.src",
        start: { line: 2, column: 0 },
        end: { line: 2, column: 10 },
        tags: { "dom-data-manipulation": true },
      },
      {
        analyzerName: "dom-data-manipulation",
        value: "script.text",
        start: { line: 3, column: 0 },
        end: { line: 3, column: 11 },
        tags: { "dom-data-manipulation": true },
      },
      {
        analyzerName: "dom-data-manipulation",
        value: "script.text",
        start: { line: 3, column: 0 },
        end: { line: 3, column: 11 },
        tags: { "dom-data-manipulation": true },
      },
      {
        analyzerName: "dom-data-manipulation",
        value: "script.textContent",
        start: { line: 4, column: 0 },
        end: { line: 4, column: 18 },
        tags: { "dom-data-manipulation": true },
      },
      {
        analyzerName: "dom-data-manipulation",
        value: "script.textContent",
        start: { line: 4, column: 0 },
        end: { line: 4, column: 18 },
        tags: { "dom-data-manipulation": true },
      },
    ],
  },
];

test.each(testCases)(
  "dom-data-manipulation - $jsFileName",
  ({ jsFileName, expectedCalls }) => {
    const filePath = path.join(__dirname, "files", jsFileName);
    const results = analyzeFile(filePath, ["dom-data-manipulation"]);

    // Sort both arrays by value to ensure consistent comparison
    const sortedCalls = results.sort((a, b) => a.value.localeCompare(b.value));
    const sortedExpected = expectedCalls.sort((a, b) =>
      a.value.localeCompare(b.value)
    );

    expect(sortedCalls).toEqual(sortedExpected);
  }
);
