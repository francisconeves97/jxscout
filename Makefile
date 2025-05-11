install:
	go mod vendor
	bun install --frozen-lockfile
	bun install -g prettier

clean:
	rm -rf dist/

build:
	bun run rsbuild build
	mv dist/sourceMaps.js internal/modules/sourcemaps/sourcemaps.js
	mv dist/astAnalyzer.js internal/modules/ast-analyzer/ast-analyzer.js
	bun run scripts/patch-ast-analyzer-build/patch.ts internal/modules/ast-analyzer/ast-analyzer.js
	mv dist/chunkDiscoverer.js internal/modules/chunk-discoverer/chunk-discoverer.js
	cp node_modules/source-map/lib/mappings.wasm internal/modules/sourcemaps/mappings.wasm
