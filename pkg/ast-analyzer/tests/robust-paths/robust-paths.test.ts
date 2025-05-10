import { BaseTestCase, createBaseTest, loadExpectedResults } from "../base";

const testCases: BaseTestCase[] = [
  {
    jsFileName: "1.js",
    expectedResults: loadExpectedResults("robust-paths", 1),
  },
];

for (let i = 1; i <= testCases.length; i++) {
  createBaseTest("robust-paths", testCases[i - 1], "robust-paths", i);
}
