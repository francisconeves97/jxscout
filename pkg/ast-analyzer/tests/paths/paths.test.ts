import { BaseTestCase, createBaseTest, loadExpectedResults } from "../base";

const testCases: BaseTestCase[] = [
  {
    jsFileName: "1.js",
    expectedResults: loadExpectedResults("paths", 1),
  },
];

createBaseTest("paths", testCases, "paths");
