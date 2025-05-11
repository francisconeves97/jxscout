import { BaseTestCase, createBaseTest, loadExpectedResults } from "../base";

const testCases: BaseTestCase[] = [
  {
    jsFileName: "1.js",
    expectedResults: loadExpectedResults("location", 1),
  },
];

for (let i = 1; i <= testCases.length; i++) {
  createBaseTest("location", testCases[i - 1], "location", i);
}
