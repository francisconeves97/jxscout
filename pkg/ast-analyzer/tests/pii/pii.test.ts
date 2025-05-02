import path from "path";
import { expect, test } from "vitest";
import { analyzeFile } from "../../index";
import { AnalyzerMatch } from "../../types";
import fs from "fs";

interface PiiTestCase {
  jsFileName: string;
  expectedCalls: AnalyzerMatch[];
}

const testCases: PiiTestCase[] = [
  {
    jsFileName: "1.js",
    expectedCalls: JSON.parse(
      fs.readFileSync(path.join(__dirname, "expected.json"), "utf-8")
    ),
  },
];

test.each(testCases)("pii - $jsFileName", ({ jsFileName, expectedCalls }) => {
  const filePath = path.join(__dirname, "files", jsFileName);
  const results = analyzeFile(filePath, ["pii"]);

  // Sort both arrays by value to ensure consistent comparison
  const sortedCalls = results.sort((a, b) => a.value.localeCompare(b.value));
  const sortedExpected = expectedCalls.sort((a, b) =>
    a.value.localeCompare(b.value)
  );

  // Save results to a file
  // const outputPath = path.join(__dirname, "expected.json");
  // fs.writeFileSync(outputPath, JSON.stringify(sortedCalls, null, 2));

  expect(sortedCalls).toEqual(sortedExpected);
});
