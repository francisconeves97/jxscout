import path from "path";
import { expect, test } from "vitest";
import { analyzeFile, AnalyzerType } from "../index";
import { AnalyzerMatch } from "../types";
import fs from "fs";

export interface BaseTestCase {
  jsFileName: string;
  expectedResults: AnalyzerMatch[];
}

export function createBaseTest(
  testType: string,
  testCases: BaseTestCase[],
  analyzerType: AnalyzerType
) {
  test.each(testCases)(
    `${testType} - $jsFileName`,
    ({ jsFileName, expectedResults }) => {
      const filePath = path.join(__dirname, testType, "files", jsFileName);
      const results = analyzeFile(filePath, [analyzerType]);

      // Sort both arrays by value to ensure consistent comparison
      const sortedResults = results.sort((a, b) =>
        a.value.localeCompare(b.value)
      );
      const sortedExpected = expectedResults.sort((a, b) =>
        a.value.localeCompare(b.value)
      );

      expect(sortedResults).toEqual(sortedExpected);
    }
  );
}

export function loadExpectedResults(
  testType: string,
  number: number = 1
): AnalyzerMatch[] {
  const expectedPath = path.join(__dirname, testType, `expected${number}.json`);

  try {
    if (!fs.existsSync(expectedPath)) {
      console.warn(`Expected results file not found: ${expectedPath}`);
      return [];
    }

    const content = fs.readFileSync(expectedPath, "utf-8");
    const parsed = JSON.parse(content);

    if (!Array.isArray(parsed)) {
      console.warn(
        `Expected results file ${expectedPath} does not contain an array`
      );
      return [];
    }

    return parsed;
  } catch (error) {
    console.warn(`Error loading expected results from ${expectedPath}:`, error);
    return [];
  }
}
