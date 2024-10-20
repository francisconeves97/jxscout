# jxscout

**jxscout** is a tool designed to assist security researchers in analyzing and identifying vulnerabilities in JavaScript code. It integrates with your preferred proxy, capturing requests and storing optimized versions locally for in-depth analysis using your favorite code editor.

> Work in Progress 🏗️ jxscout is currently under active development. As it continues to be improved and features expanded there may be breaking changes in future updates.

## Key Features

- **Asset Organization**: Automatically saves and organizes relevant static assets (HTML, JavaScript) into an intuitive folder structure.
- **Webpack Chunks Pre-Fetching**: Detects and pre-fetches Webpack chunks for comprehensive analysis.
- **Code Beautification**: Automatically beautifies JavaScript files, enhancing readability and facilitating easier vulnerability detection.
- **Future Enhancements (TODO)** 🛠️: code optimization, source map discovery, data extraction, and more.

## Requirements

- **golang**: https://go.dev/doc/install - jxscout is written in golang
- **bun**: https://bun.sh/docs/installation - used for the chunk discovery script

## Installation & Setup

To install, just run the below command or download pre-compiled binary from [release page](https://github.com/francisconeves97/jxscout/releases).

```
go install github.com/francisconeves97/jxscout/cmd/jxscout@latest
```

### Caido Setup

In order to make jxscout work you first need to proxy requests to it. That's what the jxscout-caido plugin does. Head over to https://github.com/francisconeves97/jxscout-caido to get more details on how to install the jxscout-caido plugin.

### Building locally

1. Clone the repository

```bash
git clone https://github.com/francisconeves97/jxscout.git
cd jxscout
```

2. Install dependencies and build the project

```bash
make install
make build
```

3. Run the server

- Using the binary

```bash
./dist/jxscout -working-directory /path/to/save/assets
```

- Or directly with Go

```bash
go run cmd/jxscout/main.go -working-directory /path/to/save/assets
```

4. Setup your proxy to ingest requests into jxscout

## Usage

Basic usage with scope filtering:

```bash
go run cmd/jxscout/main.go -working-directory /path/to/save/assets -scope "*example.com*"
```

All options

```bash
jxscout | static files downloader for vuln analysis

Usage:
  ./jxscout [flags]

Flags:
SERVER CONFIGURATION:
   -port int  port where the server will run (default 3333)

JXSCOUT CONFIGURATION:
   -working-directory string  directory where static files will be downloaded to
   -scope string[]            comma separated list of domains to consider for saving and analyzing html (e.g. "*google.com*,*facebook.com*")
   -verbose                   set to true to output logs (default true)
   -debug                     set to true to output debug logs

CONCURRENCY CONFIGURATION:
   -fetch-concurrency int             max number of simultaneous http requests (default 5)
   -save-concurrency int              max number of simultaneous saves to file system (default 5)
   -beautifier-concurrency int        max number of simultaneous beautifier processes (default 5)
   -chunk-discoverer-concurrency int  max number of simultaneous beautifier processes (default 5)

CHUNK DISCOVERY CONFIGURATION:
   -chunk-discoverer-bruteforce-limit int  max limit for the chunk discoverer to try and bruteforce chunks (default 3000)

CACHE CONFIGURATION:
   -js-requests-cache-ttl value    defines the time to wait until a js file is downloaded and processed again (default 1h0m0s)
   -html-requests-cache-ttl value  defines the time to wait until a html file is downloaded and processed again (default 1h0m0s)
```

### Webpack Chunk Discovery Script

The chunk discovery script is written in Typescript, and can be used as a standalone script outside of jxscout. You can use your favourite JS runtime to run it. jxscout uses bun.

You can check the script here: https://github.com/francisconeves97/jxscout-private/blob/main/pkg/chunk-discoverer/index.ts

The script expects two args:

- The path to the JS file to analyze for webpack chunks
- A bruteforce limit, used when the Webpack chunk loading function can create an unlimited number of valid chunk names.

Example:

```
bun run pkg/chunk-discoverer/index.ts /path/to/the/js/file 10
```

## Contributing

Feel free to leave suggestions and open pull requests, all contributions are welcome!

## License

This project is licensed under the GNU General Public License. See the COPYING file for the full license text.
