import path from "path";
import { expect, test } from "vitest";
import { pathsAnalyzerBuilder } from "../../paths";
import { parseFile } from "../../index";
import { AnalyzerMatch } from "../../types";
import { simple as traverse } from "acorn-walk";

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
        start: {
          line: 33,
          column: 10,
        },
        end: {
          line: 33,
          column: 23,
        },
        tags: {
          api: true,
        },
      },
      {
        analyzerName: "paths",
        value: "/api/products",
        start: {
          line: 32,
          column: 12,
        },
        end: {
          line: 32,
          column: 27,
        },
        tags: {
          api: true,
        },
      },
      {
        analyzerName: "paths",
        value: "/api/users",
        start: {
          line: 31,
          column: 9,
        },
        end: {
          line: 31,
          column: 21,
        },
        tags: {
          api: true,
        },
      },
      {
        analyzerName: "paths",
        value: "/api/v1",
        start: {
          line: 41,
          column: 2,
        },
        end: {
          line: 41,
          column: 11,
        },
        tags: {
          api: true,
        },
      },
      {
        analyzerName: "paths",
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
        tags: {
          api: true,
        },
      },
      {
        analyzerName: "paths",
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
        tags: {
          api: true,
          query: true,
        },
      },
      {
        analyzerName: "paths",
        value: "/api/v2",
        start: {
          line: 42,
          column: 2,
        },
        end: {
          line: 42,
          column: 11,
        },
        tags: {
          api: true,
        },
      },
      {
        analyzerName: "paths",
        value: "/filter?category={category}&sort={sort}",
        start: {
          line: 19,
          column: 34,
        },
        end: {
          line: 19,
          column: 75,
        },
        tags: {
          query: true,
        },
      },
      {
        analyzerName: "paths",
        value: "/orders/:orderId/status",
        start: {
          line: 14,
          column: 32,
        },
        end: {
          line: 14,
          column: 57,
        },
        tags: {},
      },
      {
        analyzerName: "paths",
        value: "/orders/{orderId}/status",
        start: {
          line: 13,
          column: 33,
        },
        end: {
          line: 13,
          column: 59,
        },
        tags: {},
      },
      {
        analyzerName: "paths",
        value: "/orders/123",
        start: {
          line: 8,
          column: 26,
        },
        end: {
          line: 8,
          column: 39,
        },
        tags: {},
      },
      {
        analyzerName: "paths",
        value: "/search?q={query}&page={page}",
        start: {
          line: 18,
          column: 34,
        },
        end: {
          line: 18,
          column: 65,
        },
        tags: {
          query: true,
        },
      },
      {
        analyzerName: "paths",
        value: "/users",
        start: {
          line: 6,
          column: 25,
        },
        end: {
          line: 6,
          column: 33,
        },
        tags: {},
      },
      {
        analyzerName: "paths",
        value: "${apiBaseUrl}/api/products/${productId}",
        start: {
          line: 52,
          column: 15,
        },
        end: {
          line: 52,
          column: 56,
        },
        tags: {
          api: true,
        },
      },
      {
        analyzerName: "paths",
        value: "${apiBaseUrl}${orderEndpointPath}/${orderId}/status",
        start: {
          line: 56,
          column: 15,
        },
        end: {
          line: 56,
          column: 68,
        },
        tags: {
          api: true,
        },
      },
      {
        analyzerName: "paths",
        value: "${apiBaseUrl}${userEndpointPath}/${userId}",
        start: {
          line: 48,
          column: 15,
        },
        end: {
          line: 48,
          column: 59,
        },
        tags: {
          api: true,
        },
      },
      {
        analyzerName: "paths",
        value: "api/products",
        start: {
          line: 7,
          column: 28,
        },
        end: {
          line: 7,
          column: 42,
        },
        tags: {
          api: true,
        },
      },
      {
        analyzerName: "paths",
        value: "api/v3",
        start: {
          line: 43,
          column: 2,
        },
        end: {
          line: 43,
          column: 10,
        },
        tags: {
          api: true,
        },
      },
      {
        analyzerName: "paths",
        value: "orders/:orderId/status/456",
        start: {
          line: 15,
          column: 33,
        },
        end: {
          line: 15,
          column: 61,
        },
        tags: {},
      },
    ],
  },
];

test.each(testCases)("paths - $jsFileName", ({ jsFileName, expectedPaths }) => {
  const filePath = path.join(__dirname, "files", jsFileName);

  const args = parseFile(filePath);
  const results: AnalyzerMatch[] = [];
  const pathsAnalyzer = pathsAnalyzerBuilder(args, results);

  traverse(args.ast, {
    Literal(node, state) {
      pathsAnalyzer.Literal?.(node, state);
    },
    TemplateLiteral(node, state) {
      pathsAnalyzer.TemplateLiteral?.(node, state);
    },
  });

  // Sort both arrays by value to ensure consistent comparison
  const sortedPaths = results.sort((a, b) => a.value.localeCompare(b.value));
  const sortedExpected = expectedPaths.sort((a, b) =>
    a.value.localeCompare(b.value)
  );

  expect(sortedPaths).toEqual(sortedExpected);
});
