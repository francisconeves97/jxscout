import { BaseTestCase, createBaseTest, loadExpectedResults } from "../base";

const testCases: BaseTestCase[] = [
  {
    jsFileName: "1.js",
    expectedResults: loadExpectedResults("local-storage", 1),
  },
];

for (let i = 1; i <= testCases.length; i++) {
  createBaseTest("local-storage", testCases[i - 1], "local-storage", i);
}
