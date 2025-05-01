import path from "path";
import { expect, test } from "vitest";
import { analyzeFile } from "../../index";
import { AnalyzerMatch } from "../../types";

interface PathsTestCase {
  jsFileName: string;
  expectedPaths: AnalyzerMatch[];
}

const testCases: PathsTestCase[] = [
  {
    jsFileName: "1.js",
    expectedPaths: [
      {
        analyzerName: "paths",
        value: "/api/orders",
        start: { line: 37, column: 10 },
        end: { line: 37, column: 23 },
        tags: { api: true },
      },
      {
        analyzerName: "paths",
        value: "/api/products",
        start: { line: 36, column: 12 },
        end: { line: 36, column: 27 },
        tags: { api: true },
      },
      {
        analyzerName: "paths",
        value: "/api/users",
        start: { line: 35, column: 9 },
        end: { line: 35, column: 21 },
        tags: { api: true },
      },
      {
        analyzerName: "paths",
        value: "/api/v1",
        start: { line: 45, column: 2 },
        end: { line: 45, column: 11 },
        tags: { api: true },
      },
      {
        analyzerName: "paths",
        value:
          "/api/v1/users/123/orders/456/status/and/more/segments/of/users/in/users",
        start: { line: 14, column: 2 },
        end: { line: 14, column: 75 },
        tags: { api: true },
      },
      {
        analyzerName: "paths",
        value:
          "/api/v1/users/123/orders/456/status/and/more/segments/of/users/in/users?q={query}&page={page}",
        start: { line: 25, column: 2 },
        end: { line: 25, column: 97 },
        tags: { api: true, query: true },
      },
      {
        analyzerName: "paths",
        value: "/api/v2",
        start: { line: 46, column: 2 },
        end: { line: 46, column: 11 },
        tags: { api: true },
      },
      {
        analyzerName: "paths",
        value: "/filter?category={category}&sort={sort}",
        start: { line: 23, column: 34 },
        end: { line: 23, column: 75 },
        tags: { query: true },
      },
      {
        analyzerName: "paths",
        value: "/orders/:orderId/status",
        start: { line: 18, column: 32 },
        end: { line: 18, column: 57 },
        tags: {},
      },
      {
        analyzerName: "paths",
        value: "/orders/{orderId}/status",
        start: { line: 17, column: 33 },
        end: { line: 17, column: 59 },
        tags: {},
      },
      {
        analyzerName: "paths",
        value: "/orders/123",
        start: { line: 12, column: 26 },
        end: { line: 12, column: 39 },
        tags: {},
      },
      {
        analyzerName: "paths",
        value: "/search?q={query}&page={page}",
        start: { line: 22, column: 34 },
        end: { line: 22, column: 65 },
        tags: { query: true },
      },
      {
        analyzerName: "paths",
        value: "/users",
        start: { line: 10, column: 25 },
        end: { line: 10, column: 33 },
        tags: {},
      },
      {
        analyzerName: "paths",
        value: "${apiBaseUrl}/api/products/${productId}",
        start: { line: 56, column: 15 },
        end: { line: 56, column: 56 },
        tags: { api: true },
      },
      {
        analyzerName: "paths",
        value: "${apiBaseUrl}${orderEndpointPath}/${orderId}/status",
        start: { line: 60, column: 15 },
        end: { line: 60, column: 68 },
        tags: { api: true },
      },
      {
        analyzerName: "paths",
        value: "${apiBaseUrl}${userEndpointPath}/${userId}",
        start: { line: 52, column: 15 },
        end: { line: 52, column: 59 },
        tags: { api: true },
      },
      {
        analyzerName: "paths",
        value: "api/products#asdasd",
        start: { line: 11, column: 28 },
        end: { line: 11, column: 49 },
        tags: { api: true, fragment: true },
      },
      {
        analyzerName: "paths",
        value: "api/v3",
        start: { line: 47, column: 2 },
        end: { line: 47, column: 10 },
        tags: { api: true },
      },
      {
        analyzerName: "paths",
        value: "asd/asd",
        start: { line: 3, column: 7 },
        end: { line: 3, column: 16 },
        tags: {},
      },
      {
        analyzerName: "paths",
        value: "orders/:orderId/status/456",
        start: { line: 19, column: 33 },
        end: { line: 19, column: 61 },
        tags: {},
      },
    ],
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

  expect(sortedPaths).toEqual(sortedExpected);
});
