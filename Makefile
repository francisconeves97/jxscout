install:
	go mod vendor
	bun install --frozen-lockfile
	bun install -g prettier reverse-sourcemap

clean:
	rm -rf dist/

build:
	make clean
	bun build pkg/chunk-discoverer/index.ts --outfile internal/modules/chunk-discoverer/chunk-discoverer.js --target bun --minify
	go build -o dist/jxscout cmd/jxscout/main.go