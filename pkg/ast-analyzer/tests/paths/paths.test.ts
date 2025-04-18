import fs from "fs";
import path from "path";
import { expect, test } from "vitest";
import { findUrlPaths } from "../../paths.js";

const readFile = (path: string): string => {
  return fs.readFileSync(path, "utf-8");
};

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
          line: 5,
          column: 21,
        },
        end: {
          line: 5,
          column: 29,
        },
      },
      {
        value: "/products",
        start: {
          line: 6,
          column: 24,
        },
        end: {
          line: 6,
          column: 35,
        },
      },
      {
        value: "/orders",
        start: {
          line: 7,
          column: 22,
        },
        end: {
          line: 7,
          column: 31,
        },
      },
      {
        value: "/assets/images",
        start: {
          line: 15,
          column: 19,
        },
        end: {
          line: 15,
          column: 35,
        },
      },
      {
        value: "/static/css",
        start: {
          line: 16,
          column: 19,
        },
        end: {
          line: 16,
          column: 32,
        },
      },
      {
        value: "/media/videos",
        start: {
          line: 17,
          column: 18,
        },
        end: {
          line: 17,
          column: 33,
        },
      },
      {
        value: "/users/{userId}/profile",
        start: {
          line: 20,
          column: 24,
        },
        end: {
          line: 20,
          column: 49,
        },
      },
      {
        value: "/products/{productId}/details",
        start: {
          line: 21,
          column: 27,
        },
        end: {
          line: 21,
          column: 58,
        },
      },
      {
        value: "/orders/{orderId}/status",
        start: {
          line: 22,
          column: 24,
        },
        end: {
          line: 22,
          column: 50,
        },
      },
      {
        value: "/search?q={query}&page={page}",
        start: {
          line: 25,
          column: 19,
        },
        end: {
          line: 25,
          column: 50,
        },
      },
      {
        value: "/filter?category={category}&sort={sort}",
        start: {
          line: 26,
          column: 19,
        },
        end: {
          line: 26,
          column: 60,
        },
      },
      {
        value: "${apiBaseUrl}${userEndpoint}/${userId}",
        start: {
          line: 30,
          column: 15,
        },
        end: {
          line: 30,
          column: 55,
        },
      },
      {
        value: "${apiBaseUrl}${productEndpoint}/${productId}",
        start: {
          line: 34,
          column: 15,
        },
        end: {
          line: 34,
          column: 61,
        },
      },
      {
        value: "${apiBaseUrl}${orderEndpoint}/${orderId}/status",
        start: {
          line: 38,
          column: 15,
        },
        end: {
          line: 38,
          column: 64,
        },
      },
      {
        value: "/api/users",
        start: {
          line: 43,
          column: 9,
        },
        end: {
          line: 43,
          column: 21,
        },
      },
      {
        value: "/api/products",
        start: {
          line: 44,
          column: 12,
        },
        end: {
          line: 44,
          column: 27,
        },
      },
      {
        value: "/api/orders",
        start: {
          line: 45,
          column: 10,
        },
        end: {
          line: 45,
          column: 23,
        },
      },
      {
        value: "/api/v1",
        start: {
          line: 53,
          column: 2,
        },
        end: {
          line: 53,
          column: 11,
        },
      },
      {
        value: "/api/v2",
        start: {
          line: 54,
          column: 2,
        },
        end: {
          line: 54,
          column: 11,
        },
      },
      {
        value: "api/v3",
        start: {
          line: 55,
          column: 2,
        },
        end: {
          line: 55,
          column: 10,
        },
      },
    ],
  },
];

test.each(testCases)("paths - $jsFileName", ({ jsFileName, expectedPaths }) => {
  const filePath = path.join(__dirname, "files", jsFileName);
  const paths = findUrlPaths(filePath);

  console.log(JSON.stringify(paths, null, 2));

  // Sort both arrays by value to ensure consistent comparison
  const sortedPaths = paths.sort((a, b) => a.value.localeCompare(b.value));
  const sortedExpected = expectedPaths.sort((a, b) =>
    a.value.localeCompare(b.value)
  );

  expect(sortedPaths).toEqual(sortedExpected);
});
