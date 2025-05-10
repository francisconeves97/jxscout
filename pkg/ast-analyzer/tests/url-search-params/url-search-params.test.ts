import { BaseTestCase, createBaseTest, loadExpectedResults } from "../base";

const testCases: BaseTestCase[] = [
  {
    jsFileName: "1.js",
    expectedResults: loadExpectedResults("url-search-params", 1),
  },
];

for (let i = 1; i <= testCases.length; i++) {
  createBaseTest("url-search-params", testCases[i - 1], "url-search-params", i);
}
