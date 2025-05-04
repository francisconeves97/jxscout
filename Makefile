install:
	go mod vendor
	bun install --frozen-lockfile
	bun install -g prettier

clean:
	rm -rf dist/

build:
	make clean
	bun build pkg/chunk-discoverer/index.ts --outfile internal/modules/chunk-discoverer/chunk-discoverer.js --target bun --minify
	bun build pkg/ast-analyzer/index.ts --outfile internal/modules/ast-analyzer/ast-analyzer.js --target bun --minify --external @oxc-parser/binding-android-arm64 --external @oxc-parser/binding-android-arm-eabi --external @oxc-parser/binding-win32-x64-msvc --external @oxc-parser/binding-win32-ia32-msvc --external @oxc-parser/binding-win32-arm64-msvc --external @oxc-parser/binding-darwin-universal --external @oxc-parser/binding-darwin-x64 --external @oxc-parser/binding-darwin-arm64 --external @oxc-parser/binding-freebsd-x64 --external @oxc-parser/binding-freebsd-arm64 --external @oxc-parser/binding-linux-x64-musl --external @oxc-parser/binding-linux-x64-gnu --external @oxc-parser/binding-linux-arm64-musl --external @oxc-parser/binding-linux-arm64-gnu --external @oxc-parser/binding-linux-arm-musleabihf --external @oxc-parser/binding-linux-arm-gnueabihf --external @oxc-parser/binding-linux-riscv64-musl --external @oxc-parser/binding-linux-riscv64-gnu --external @oxc-parser/binding-linux-ppc64-gnu --external @oxc-parser/binding-linux-s390x-gnu --external @oxc-parser/binding-wasm32-wasi
	bun build pkg/sourcemap-reverse/index.ts --outfile internal/modules/sourcemaps/sourcemaps.js --target bun --minify
	go build -o dist/jxscout cmd/jxscout/main.go