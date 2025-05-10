export default {
  source: {
    entry: {
      sourceMaps: "./pkg/sourcemap-reverse/index.ts",
      chunkDiscoverer: "./pkg/chunk-discoverer/index.ts",
      astAnalyzer: "./pkg/ast-analyzer/index.ts",
    },
  },
  output: {
    externals: {
      "@oxc-parser/binding-darwin-arm64": "",
    },
    target: "node",
  },
};
