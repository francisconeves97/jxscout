import { BaseTestCase, createBaseTest, loadExpectedResults } from "../base";

const testCases: BaseTestCase[] = [
  {
    jsFileName: "1.js",
    expectedResults: loadExpectedResults("urls", 1),
  },
];

createBaseTest("urls", testCases, "urls");
