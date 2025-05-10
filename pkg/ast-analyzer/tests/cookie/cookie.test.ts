import { BaseTestCase, createBaseTest, loadExpectedResults } from "../base";

const testCases: BaseTestCase[] = [
  {
    jsFileName: "1.js",
    expectedResults: loadExpectedResults("cookie", 1),
  },
];

for (let i = 1; i <= testCases.length; i++) {
  createBaseTest("cookie", testCases[i - 1], "cookie", i);
}
