import path from "path";
import { expect, test } from "vitest";
import { fileExtensionsAnalyzerBuilder } from "../../extensions";
import { parseFile } from "../../index";
import { AnalyzerMatch } from "../../types";
import { ancestor as traverse } from "acorn-walk";

interface ExtensionsTestCase {
  jsFileName: string;
  expectedExtensions: AnalyzerMatch[];
}

const testCases: ExtensionsTestCase[] = [
  {
    jsFileName: "1.js",
    expectedExtensions: [
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "./file.js",
        start: { line: 29, column: 21 },
        end: { line: 29, column: 32 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: ".file.js",
        start: { line: 34, column: 19 },
        end: { line: 34, column: 29 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "/path/to/file.js",
        start: { line: 30, column: 21 },
        end: { line: 30, column: 39 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "app.js",
        start: { line: 2, column: 15 },
        end: { line: 2, column: 23 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "App.jsx",
        start: { line: 8, column: 16 },
        end: { line: 8, column: 25 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "app.py",
        start: { line: 14, column: 15 },
        end: { line: 14, column: 23 },
        tags: { py: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "app.rb",
        start: { line: 17, column: 15 },
        end: { line: 17, column: 23 },
        tags: { rb: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "App.tsx",
        start: { line: 7, column: 16 },
        end: { line: 7, column: 25 },
        tags: { ts: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "config.conf",
        start: { line: 19, column: 17 },
        end: { line: 19, column: 30 },
        tags: { conf: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "config.config",
        start: { line: 20, column: 19 },
        end: { line: 20, column: 34 },
        tags: { conf: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "config.json",
        start: { line: 5, column: 17 },
        end: { line: 5, column: 30 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "config.yaml",
        start: { line: 10, column: 17 },
        end: { line: 10, column: 30 },
        tags: { yaml: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "config.yml",
        start: { line: 9, column: 16 },
        end: { line: 9, column: 28 },
        tags: { yml: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "data.xml",
        start: { line: 12, column: 16 },
        end: { line: 12, column: 26 },
        tags: { xml: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.asm.js",
        start: { line: 56, column: 16 },
        end: { line: 56, column: 29 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.asm.js",
        start: { line: 91, column: 17 },
        end: { line: 91, column: 30 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.browser.js",
        start: { line: 60, column: 20 },
        end: { line: 60, column: 37 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.browser.js",
        start: { line: 95, column: 21 },
        end: { line: 95, column: 38 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.bundle.js",
        start: { line: 47, column: 19 },
        end: { line: 47, column: 35 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.bundle.js",
        start: { line: 82, column: 20 },
        end: { line: 82, column: 36 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.chunk.js",
        start: { line: 48, column: 18 },
        end: { line: 48, column: 33 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.chunk.js",
        start: { line: 83, column: 19 },
        end: { line: 83, column: 34 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.client.js",
        start: { line: 64, column: 19 },
        end: { line: 64, column: 35 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.client.js",
        start: { line: 99, column: 20 },
        end: { line: 99, column: 36 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.common.js",
        start: { line: 50, column: 19 },
        end: { line: 50, column: 35 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.common.js",
        start: { line: 85, column: 20 },
        end: { line: 85, column: 36 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.config.js",
        start: { line: 70, column: 20 },
        end: { line: 70, column: 36 },
        tags: { conf: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.config.js",
        start: { line: 105, column: 20 },
        end: { line: 105, column: 36 },
        tags: { conf: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.constant.js",
        start: { line: 69, column: 21 },
        end: { line: 69, column: 39 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.constant.js",
        start: { line: 104, column: 22 },
        end: { line: 104, column: 40 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.core.js",
        start: { line: 66, column: 17 },
        end: { line: 66, column: 31 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.core.js",
        start: { line: 101, column: 18 },
        end: { line: 101, column: 32 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.coverage.js",
        start: { line: 46, column: 21 },
        end: { line: 46, column: 39 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.coverage.js",
        start: { line: 81, column: 22 },
        end: { line: 81, column: 40 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.dev.js",
        start: { line: 74, column: 16 },
        end: { line: 74, column: 29 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.dev.js",
        start: { line: 109, column: 17 },
        end: { line: 109, column: 30 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.electron.js",
        start: { line: 59, column: 21 },
        end: { line: 59, column: 39 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.electron.js",
        start: { line: 94, column: 22 },
        end: { line: 94, column: 40 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.env.js",
        start: { line: 71, column: 16 },
        end: { line: 71, column: 29 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.env.js",
        start: { line: 106, column: 17 },
        end: { line: 106, column: 30 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.fixture.js",
        start: { line: 44, column: 20 },
        end: { line: 44, column: 37 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.fixture.js",
        start: { line: 79, column: 21 },
        end: { line: 79, column: 38 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.helper.js",
        start: { line: 68, column: 19 },
        end: { line: 68, column: 35 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.helper.js",
        start: { line: 103, column: 20 },
        end: { line: 103, column: 36 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.isomorphic.js",
        start: { line: 62, column: 23 },
        end: { line: 62, column: 43 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.isomorphic.js",
        start: { line: 97, column: 24 },
        end: { line: 97, column: 44 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.js?param=value",
        start: { line: 27, column: 20 },
        end: { line: 27, column: 41 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.js.1.0.0",
        start: { line: 33, column: 16 },
        end: { line: 33, column: 31 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.js.gz",
        start: { line: 37, column: 23 },
        end: { line: 37, column: 35 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.js.map",
        start: { line: 39, column: 18 },
        end: { line: 39, column: 31 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.js.tmp",
        start: { line: 36, column: 17 },
        end: { line: 36, column: 30 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.js#section",
        start: { line: 28, column: 13 },
        end: { line: 28, column: 30 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.js~",
        start: { line: 35, column: 19 },
        end: { line: 35, column: 29 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.local.js",
        start: { line: 72, column: 18 },
        end: { line: 72, column: 33 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.local.js",
        start: { line: 107, column: 19 },
        end: { line: 107, column: 34 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.manifest.js",
        start: { line: 52, column: 21 },
        end: { line: 52, column: 39 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.manifest.js",
        start: { line: 87, column: 22 },
        end: { line: 87, column: 40 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.min.js",
        start: { line: 38, column: 21 },
        end: { line: 38, column: 34 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.mock.js",
        start: { line: 43, column: 17 },
        end: { line: 43, column: 31 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.mock.js",
        start: { line: 78, column: 18 },
        end: { line: 78, column: 32 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.native.js",
        start: { line: 57, column: 19 },
        end: { line: 57, column: 35 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.native.js",
        start: { line: 92, column: 20 },
        end: { line: 92, column: 36 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.node.js",
        start: { line: 58, column: 17 },
        end: { line: 58, column: 31 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.node.js",
        start: { line: 93, column: 18 },
        end: { line: 93, column: 32 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.prod.js",
        start: { line: 73, column: 17 },
        end: { line: 73, column: 31 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.prod.js",
        start: { line: 108, column: 18 },
        end: { line: 108, column: 32 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.runtime.js",
        start: { line: 51, column: 20 },
        end: { line: 51, column: 37 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.runtime.js",
        start: { line: 86, column: 21 },
        end: { line: 86, column: 38 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.server.js",
        start: { line: 63, column: 19 },
        end: { line: 63, column: 35 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.server.js",
        start: { line: 98, column: 20 },
        end: { line: 98, column: 36 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.shared.js",
        start: { line: 65, column: 19 },
        end: { line: 65, column: 35 },
        tags: { sh: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.shared.js",
        start: { line: 100, column: 20 },
        end: { line: 100, column: 36 },
        tags: { sh: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.snap.js",
        start: { line: 45, column: 21 },
        end: { line: 45, column: 35 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.snap.js",
        start: { line: 80, column: 22 },
        end: { line: 80, column: 36 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.spec.js",
        start: { line: 41, column: 17 },
        end: { line: 41, column: 31 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.spec.js",
        start: { line: 76, column: 18 },
        end: { line: 76, column: 32 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.stories.js",
        start: { line: 42, column: 18 },
        end: { line: 42, column: 35 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.stories.js",
        start: { line: 77, column: 19 },
        end: { line: 77, column: 36 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.sw.js",
        start: { line: 53, column: 26 },
        end: { line: 53, column: 38 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.sw.js",
        start: { line: 88, column: 27 },
        end: { line: 88, column: 39 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.test.js",
        start: { line: 40, column: 17 },
        end: { line: 40, column: 31 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.test.js",
        start: { line: 75, column: 18 },
        end: { line: 75, column: 32 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.universal.js",
        start: { line: 61, column: 22 },
        end: { line: 61, column: 41 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.universal.js",
        start: { line: 96, column: 23 },
        end: { line: 96, column: 42 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.util.js",
        start: { line: 67, column: 17 },
        end: { line: 67, column: 31 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.util.js",
        start: { line: 102, column: 18 },
        end: { line: 102, column: 32 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.vendor.js",
        start: { line: 49, column: 19 },
        end: { line: 49, column: 35 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.vendor.js",
        start: { line: 84, column: 20 },
        end: { line: 84, column: 36 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.wasm.js",
        start: { line: 55, column: 17 },
        end: { line: 55, column: 31 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.wasm.js",
        start: { line: 90, column: 18 },
        end: { line: 90, column: 32 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.worker.js",
        start: { line: 54, column: 19 },
        end: { line: 54, column: 35 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "file.worker.js",
        start: { line: 89, column: 20 },
        end: { line: 89, column: 36 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "https://example.com/file.js",
        start: { line: 31, column: 12 },
        end: { line: 31, column: 41 },
        tags: { js: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "index.html",
        start: { line: 4, column: 17 },
        end: { line: 4, column: 29 },
        tags: { html: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "index.php",
        start: { line: 18, column: 16 },
        end: { line: 18, column: 27 },
        tags: { php: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "main.go",
        start: { line: 15, column: 15 },
        end: { line: 15, column: 24 },
        tags: { go: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "Main.java",
        start: { line: 16, column: 17 },
        end: { line: 16, column: 28 },
        tags: { java: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "main.ts",
        start: { line: 6, column: 15 },
        end: { line: 6, column: 24 },
        tags: { ts: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "query.sql",
        start: { line: 13, column: 16 },
        end: { line: 13, column: 27 },
        tags: { sql: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "script.sh",
        start: { line: 11, column: 15 },
        end: { line: 11, column: 26 },
        tags: { sh: true, extension: true },
      },
      {
        filePath:
          "/Users/francisconeves/projects/jxscout/pkg/ast-analyzer/tests/extensions/files/1.js",
        analyzerName: "file-extensions",
        value: "styles.css",
        start: { line: 3, column: 16 },
        end: { line: 3, column: 28 },
        tags: { css: true, extension: true },
      },
    ],
  },
];

test.each(testCases)(
  "extensions - $jsFileName",
  ({ jsFileName, expectedExtensions }) => {
    const filePath = path.join(__dirname, "files", jsFileName);

    const args = parseFile(filePath);
    const results: AnalyzerMatch[] = [];
    const extensionsAnalyzer = fileExtensionsAnalyzerBuilder(args, results);

    traverse(args.ast, {
      Literal(node, state, ancestors) {
        extensionsAnalyzer.Literal?.(node, state, ancestors);
      },
      TemplateLiteral(node, state, ancestors) {
        extensionsAnalyzer.TemplateLiteral?.(node, state, ancestors);
      },
    });

    // Sort both arrays by value to ensure consistent comparison
    const sortedExtensions = results.sort((a, b) =>
      a.value.localeCompare(b.value)
    );
    const sortedExpected = expectedExtensions.sort((a, b) =>
      a.value.localeCompare(b.value)
    );

    expect(sortedExtensions).toEqual(sortedExpected);
  }
);
