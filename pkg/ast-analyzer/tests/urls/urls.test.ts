import path from "path";
import { expect, test } from "vitest";
import { analyzeFile } from "../../index";
import { AnalyzerMatch } from "../../types";
import fs from "fs";

interface UrlsTestCase {
  jsFileName: string;
  expectedUrls: AnalyzerMatch[];
}

const testCases: UrlsTestCase[] = [
  {
    jsFileName: "1.js",
    expectedUrls: JSON.parse(
      fs.readFileSync(path.join(__dirname, "expected.json"), "utf-8")
    ),
  },
];

test.each(testCases)("urls - $jsFileName", ({ jsFileName, expectedUrls }) => {
  const filePath = path.join(__dirname, "files", jsFileName);
  const results = analyzeFile(filePath, ["urls"]);

  // Sort both arrays by value to ensure consistent comparison
  const sortedUrls = results.sort((a, b) => a.value.localeCompare(b.value));
  const sortedExpected = expectedUrls.sort((a, b) =>
    a.value.localeCompare(b.value)
  );

  // const outputPath = path.join(__dirname, "expected.json");
  // fs.writeFileSync(outputPath, JSON.stringify(sortedUrls, null, 2));

  expect(sortedUrls).toEqual(sortedExpected);
});
