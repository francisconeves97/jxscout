export default {
  source: {
    entry: {
      sourceMaps: "./pkg/sourcemap-reverse/index.ts",
      chunkDiscoverer: "./pkg/chunk-discoverer/index.ts",
      astAnalyzer: "./pkg/ast-analyzer/index.ts",
    },
    exclude: ["@oxc-parser/*"],
  },
  output: {
    target: "node",
  },
};
