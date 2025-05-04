import path from "path";
import { expect, test } from "vitest";
import { analyzeFile } from "../../index";
import { AnalyzerMatch } from "../../types";
import fs from "fs";

interface PathsTestCase {
  jsFileName: string;
  expectedPaths: AnalyzerMatch[];
}

const testCases: PathsTestCase[] = [
  {
    jsFileName: "1.js",
    expectedPaths: JSON.parse(
      fs.readFileSync(path.join(__dirname, "expected.json"), "utf-8")
    ),
  },
];

test.each(testCases)("paths - $jsFileName", ({ jsFileName, expectedPaths }) => {
  const filePath = path.join(__dirname, "files", jsFileName);
  const results = analyzeFile(filePath, ["paths"]);

  // Sort both arrays by value to ensure consistent comparison
  const sortedPaths = results.sort((a, b) => a.value.localeCompare(b.value));
  const sortedExpected = expectedPaths.sort((a, b) =>
    a.value.localeCompare(b.value)
  );

  // const outputPath = path.join(__dirname, "expected.json");
  // fs.writeFileSync(outputPath, JSON.stringify(sortedExpected, null, 2));

  expect(sortedPaths).toEqual(sortedExpected);
});
