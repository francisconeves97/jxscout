import { BaseTestCase, createBaseTest, loadExpectedResults } from "../base";

const testCases: BaseTestCase[] = [
  {
    jsFileName: "1.js",
    expectedResults: loadExpectedResults("graphql", 1),
  },
];

for (let i = 1; i <= testCases.length; i++) {
  createBaseTest("graphql", testCases[i - 1], "graphql", i);
}
