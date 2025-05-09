import path from "path";
import { expect, it } from "vitest";
import { analyzeFile, AnalyzerType } from "../analyzer";
import { AnalyzerMatch } from "../types";
import fs from "fs";

export interface BaseTestCase {
  jsFileName: string;
  expectedResults: AnalyzerMatch[];
}

export function createBaseTest(
  testType: string,
  testCase: BaseTestCase,
  analyzerType: AnalyzerType,
  number: number
) {
  it(`${testType} ${number} - $jsFileName`, () => {
    const { jsFileName, expectedResults } = testCase;
    const filePath = path.join(__dirname, testType, "files", jsFileName);
    const results = analyzeFile(filePath, [analyzerType]);

    // Sort both arrays by value to ensure consistent comparison
    const sortedResults = results.sort((a, b) =>
      a.value.localeCompare(b.value)
    );
    const sortedExpected = expectedResults.sort((a, b) =>
      a.value.localeCompare(b.value)
    );

    const expectedPath = path.join(
      __dirname,
      testType,
      `expected${number}.json`
    );

    if (!fs.existsSync(expectedPath)) {
      const outputPath = path.join(
        __dirname,
        testType,
        `expected${number}.json`
      );
      fs.writeFileSync(outputPath, JSON.stringify(sortedResults, null, 2));
    }

    expect(sortedResults).toEqual(sortedExpected);
  });
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
