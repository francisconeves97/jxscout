import { BaseTestCase, createBaseTest, loadExpectedResults } from "../base";

const testCases: BaseTestCase[] = [
  {
    jsFileName: "1.js",
    expectedResults: loadExpectedResults("paths", 1),
  },
];

for (let i = 1; i <= testCases.length; i++) {
  createBaseTest("paths", testCases[i - 1], "paths", i);
}
