import { defineConfig } from "@rsbuild/core";

export default defineConfig({
  source: {
    entry: {
      sourceMaps: "./pkg/sourcemap-reverse/index.ts",
      chunkDiscoverer: "./pkg/chunk-discoverer/index.ts",
      astAnalyzer: "./pkg/ast-analyzer/index.ts",
    },
  },
  output: {
    target: "node",
  },
});
