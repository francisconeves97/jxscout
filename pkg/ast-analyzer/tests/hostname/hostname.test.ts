import { BaseTestCase, createBaseTest, loadExpectedResults } from "../base";

const testCases: BaseTestCase[] = [
  {
    jsFileName: "1.js",
    expectedResults: loadExpectedResults("hostname", 1),
  },
];

for (let i = 1; i <= testCases.length; i++) {
  createBaseTest("hostname", testCases[i - 1], "hostname", i);
}
