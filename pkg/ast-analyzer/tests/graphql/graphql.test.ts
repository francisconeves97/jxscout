import path from "path";
import { expect, test } from "vitest";
import { graphqlAnalyzerBuilder } from "../../graphql";
import { parseFile } from "../../index";
import { AnalyzerMatch } from "../../types";
import { ancestor as traverse } from "acorn-walk";

interface GraphQLTestCase {
  jsFileName: string;
  expectedQueries: AnalyzerMatch[];
}

const testCases: GraphQLTestCase[] = [
  {
    jsFileName: "1.js",
    expectedQueries: [
      {
        analyzerName: "graphql",
        value:
          '\n    query GetUserWithDirectives {\n        user(id: "123") @include(if: $shouldInclude) {\n            id\n            name @skip(if: $shouldSkip)\n        }\n    }\n',
        start: { line: 37, column: 27 },
        end: { line: 44, column: 1 },
        tags: { query: true, directive: true, variable: true },
      },
      {
        analyzerName: "graphql",
        value:
          "mutation CreateUser($input: CreateUserInput!) {\n  createUser(input: $input) {\n    id\n    name\n    email\n  }\n}",
        start: { line: 11, column: 27 },
        end: { line: 17, column: 2 },
        tags: { mutation: true, variable: true },
      },
      {
        analyzerName: "graphql",
        value:
          "query GetProducts {\n  products {\n    id\n    name\n    price\n    ...ProductDetails\n  }\n}",
        start: { line: 20, column: 25 },
        end: { line: 27, column: 2 },
        tags: { query: true, fragment: true },
      },
      {
        analyzerName: "graphql",
        value:
          "query GetUser($id: ID!) {\n  user(id: $id) {\n    id\n    name\n    email\n  }\n}",
        start: { line: 2, column: 21 },
        end: { line: 8, column: 2 },
        tags: { query: true, variable: true },
      },
      {
        analyzerName: "graphql",
        value:
          'query GetUserWithDirectives {\n  user(id: "123") @include(if: $shouldInclude) {\n    id\n    name @skip(if: $shouldSkip)\n  }\n}',
        start: { line: 30, column: 30 },
        end: { line: 35, column: 2 },
        tags: { query: true, directive: true, variable: true },
      },
      {
        analyzerName: "graphql",
        value: "type User { name: String }",
        start: { line: 46, column: 23 },
        end: { line: 46, column: 51 },
        tags: {},
      },
    ],
  },
];

test.each(testCases)(
  "graphql - $jsFileName",
  ({ jsFileName, expectedQueries }) => {
    const filePath = path.join(__dirname, "files", jsFileName);

    const args = parseFile(filePath);
    const results: AnalyzerMatch[] = [];
    const graphqlAnalyzer = graphqlAnalyzerBuilder(args, results);

    traverse(args.ast, {
      Literal(node, state, ancestors) {
        graphqlAnalyzer.Literal?.(node, state, ancestors);
      },
      TemplateLiteral(node, state, ancestors) {
        graphqlAnalyzer.TemplateLiteral?.(node, state, ancestors);
      },
    });

    // Sort both arrays by value to ensure consistent comparison
    const sortedQueries = results.sort((a, b) =>
      a.value.localeCompare(b.value)
    );
    const sortedExpected = expectedQueries.sort((a, b) =>
      a.value.localeCompare(b.value)
    );

    expect(sortedQueries).toEqual(sortedExpected);
  }
);
