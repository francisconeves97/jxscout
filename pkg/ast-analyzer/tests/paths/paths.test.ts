import path from "path";
import { expect, test } from "vitest";
import { pathsAnalyzer } from "../../paths";
import { parseFile } from "../../index";

interface PathsTestCase {
  jsFileName: string;
  expectedPaths: Array<{
    value: string;
    start: { line: number; column: number };
    end: { line: number; column: number };
  }>;
}

const testCases: PathsTestCase[] = [
  {
    jsFileName: "1.js",
    expectedPaths: [
      {
        value: "/users",
        start: {
          line: 6,
          column: 25,
        },
        end: {
          line: 6,
          column: 33,
        },
      },
      {
        value: "api/products",
        start: {
          line: 7,
          column: 28,
        },
        end: {
          line: 7,
          column: 42,
        },
      },
      {
        value: "/orders/123",
        start: {
          line: 8,
          column: 26,
        },
        end: {
          line: 8,
          column: 39,
        },
      },
      {
        value:
          "/api/v1/users/123/orders/456/status/and/more/segments/of/users/in/users",
        start: {
          line: 10,
          column: 2,
        },
        end: {
          line: 10,
          column: 75,
        },
      },
      {
        value: "/orders/{orderId}/status",
        start: {
          line: 13,
          column: 33,
        },
        end: {
          line: 13,
          column: 59,
        },
      },
      {
        value: "/orders/:orderId/status",
        start: {
          line: 14,
          column: 32,
        },
        end: {
          line: 14,
          column: 57,
        },
      },
      {
        value: "orders/:orderId/status/456",
        start: {
          line: 15,
          column: 33,
        },
        end: {
          line: 15,
          column: 61,
        },
      },
      {
        value: "/search?q={query}&page={page}",
        start: {
          line: 18,
          column: 34,
        },
        end: {
          line: 18,
          column: 65,
        },
      },
      {
        value: "/filter?category={category}&sort={sort}",
        start: {
          line: 19,
          column: 34,
        },
        end: {
          line: 19,
          column: 75,
        },
      },
      {
        value:
          "/api/v1/users/123/orders/456/status/and/more/segments/of/users/in/users?q={query}&page={page}",
        start: {
          line: 21,
          column: 2,
        },
        end: {
          line: 21,
          column: 97,
        },
      },
      {
        value: "/api/users",
        start: {
          line: 31,
          column: 9,
        },
        end: {
          line: 31,
          column: 21,
        },
      },
      {
        value: "/api/products",
        start: {
          line: 32,
          column: 12,
        },
        end: {
          line: 32,
          column: 27,
        },
      },
      {
        value: "/api/orders",
        start: {
          line: 33,
          column: 10,
        },
        end: {
          line: 33,
          column: 23,
        },
      },
      {
        value: "/api/v1",
        start: {
          line: 41,
          column: 2,
        },
        end: {
          line: 41,
          column: 11,
        },
      },
      {
        value: "/api/v2",
        start: {
          line: 42,
          column: 2,
        },
        end: {
          line: 42,
          column: 11,
        },
      },
      {
        value: "api/v3",
        start: {
          line: 43,
          column: 2,
        },
        end: {
          line: 43,
          column: 10,
        },
      },
      {
        value: "${apiBaseUrl}${userEndpointPath}/${userId}",
        start: {
          line: 48,
          column: 15,
        },
        end: {
          line: 48,
          column: 59,
        },
      },
      {
        value: "${apiBaseUrl}/api/products/${productId}",
        start: {
          line: 52,
          column: 15,
        },
        end: {
          line: 52,
          column: 56,
        },
      },
      {
        value: "${apiBaseUrl}${orderEndpointPath}/${orderId}/status",
        start: {
          line: 56,
          column: 15,
        },
        end: {
          line: 56,
          column: 68,
        },
      },
    ],
  },
];

test.each(testCases)("paths - $jsFileName", ({ jsFileName, expectedPaths }) => {
  const filePath = path.join(__dirname, "files", jsFileName);

  const args = parseFile(filePath);
  const paths = pathsAnalyzer(args);

  // Sort both arrays by value to ensure consistent comparison
  const sortedPaths = paths.sort((a, b) => a.value.localeCompare(b.value));
  const sortedExpected = expectedPaths.sort((a, b) =>
    a.value.localeCompare(b.value)
  );

  expect(sortedPaths).toEqual(sortedExpected);
});
