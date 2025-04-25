# jxscout

**jxscout** is a tool designed to help security researchers analyze and find vulnerabilities in JavaScript code. It works with your favorite proxy (Burp or Caido), capturing requests and saving optimized versions locally for easy analysis in your preferred code editor.

> Work in Progress 🏗️ jxscout is currently under active development. As it continues to be improved and features expanded there may be breaking changes in future updates.

## Key Features

- **Asset Organization**: Automatically saves and organizes relevant static assets (HTML, JavaScript) into an intuitive folder structure.
- **Chunks Pre-Fetching**: Detects and pre-fetches Webpack and Vite chunks for comprehensive analysis.
- **Code Beautification**: Automatically beautifies JavaScript files, making them easier to read and analyze.
- **Source Map Discovery**: Automatically reverses application source code if .map files are available.

## Requirements

- **golang**: https://go.dev/doc/install - jxscout is written in golang
- **bun**: https://bun.sh/docs/installation - used for the chunk discovery script

## Installation & Setup

To install, just run the below command or download pre-compiled binary from [release page](https://github.com/francisconeves97/jxscout/releases).

```
go install github.com/francisconeves97/jxscout/cmd/jxscout@latest
```

You can then run the `install` command to get all the necessary dependencies (bun and prettier)

![jxscout](docs/jxscout.png)

### Proxy Setup

To get started with jxscout, you'll need to set up a proxy to forward requests to it. Here's how:

- For Caido users: Check out https://github.com/francisconeves97/jxscout-caido for installation instructions
- For Burp users: Head over to https://github.com/francisconeves97/jxscout-burp for setup details

## Usage

```bash
jxscout
```

Once jxscout is running, you can:

- Run the `guide` command for a quick walkthrough
- Watch the video tutorial for a visual guide on configuring and using jxscout

### Demo

Watch the demo movie to see jxscout in action:

https://github.com/user-attachments/assets/64f161c3-46b0-41a9-8b34-706cc795a034

### Available Commands

```
Available commands:

assets (la) - List assets for the current project with pagination and search
  Usage: assets [page=<page_number>] [page-size=<page_size>] [search=<search_term>]

caido-auth (ca) - Authenticate with Caido (token is stored in memory and will reset on server restart)
  Usage: caido-auth

clear (c) - Clears the output
  Usage: clear

config (cf) - View or update jxscout configuration options
  Usage: config [options] | Use 'config' without arguments to view current configuration

config-reset (cfr) - Reset all configuration options to default values
  Usage: config-reset

exit (q) - Exits the application
  Usage: exit

guide (g) - Show a guide on how to use jxscout
  Usage: guide

help (h) - Shows help information for commands
  Usage: help [command]

install (i) - Install jxscout dependencies (npm, bun, prettier)
  Usage: install

loaded (ldd) - Show assets that loaded a specific JavaScript asset
  Usage: loaded <asset_url> [page=<page_number>] [page-size=<page_size>]

loads (lds) - Show JavaScript assets loaded by a specific HTML page
  Usage: loads <html_url> [page=<page_number>] [page-size=<page_size>]

logs (l) - Toggle logs panel
  Usage: logs

override (o) - Toggle local override for a specific URL (only available for Caido).
This will override the content of an asset when you visit it in your browser.
When overriding an HTML file keep the (index).html suffix.
The `assets` command will give you the right URL to use.
  Usage: override <url>

overrides (lo) - List overrides
  Usage: overrides [page=<page_number>] [page-size=<page_size>]

truncate-tables (tt) - Delete all data tracked in jxscout database (requires confirmation)
  Usage: truncate-tables

version (v) - Show the current version and checks for updates
  Usage: version
```

### CLI Options

```bash
jxscout | static files downloader for vulnerability analysis

Usage:
  /Users/francisconeves/Library/Caches/go-build/21/21578004e7aa83d51489155574a36feb8d7489e75edcd2938bd8a3d392f13c9a-d/main [flags]

Flags:
SERVER CONFIGURATION:
   -hostname string  the hostname where jxscout will listen for requests (default "localhost")
   -port int         the port where jxscout will listen for requests (default 3333)

JXSCOUT CONFIGURATION:
   -project-name string  name of your project folder where downloaded files will be stored (default "default")
   -scope string[]       comma-separated list of patterns to filter requests (e.g. *google*,*youtube*)
   -debug                turn on detailed logs for troubleshooting

CONCURRENCY CONFIGURATION:
   -fetch-concurrency int             how many files to download at once (for chunks and source maps) (default 5)
   -save-concurrency int              how many files to save to disk at once (default 5)
   -beautifier-concurrency int        how many files to beautify at once (default 5)
   -chunk-discoverer-concurrency int  how many chunk discovery processes to run at once (default 5)

CHUNK DISCOVERY CONFIGURATION:
   -chunk-discoverer-bruteforce-limit int  how many potential chunks to bruteforce when automatic discovery fails (default 3000)

CACHE CONFIGURATION:
   -js-requests-cache-ttl value    how long to wait before re-downloading the same JS file (default 1h0m0s)
   -html-requests-cache-ttl value  how long to wait before re-downloading the same HTML page (default 1h0m0s)

GIT COMMITER CONFIGURATION:
   -git-commit-interval value  how often commits are made to the working directory (default 5m0s)

RATE LIMITING CONFIGURATION:
   -rate-limiter-max-requests-per-second int  max requests per second for source maps and chunk discovery (0 = unlimited) (default 2)
   -rate-limiter-max-requests-per-minute int  max requests per minute for source maps and chunk discovery (0 = unlimited)

JS INGESTION CONFIGURATION:
   -download-refered-js  download JS files from out-of-scope domains if they're linked from in-scope pages

LOGGING CONFIGURATION:
   -log-buffer-size int       how many log lines to show in the logs panel (default 10000)
   -log-file-max-size-mb int  max size of the log file in MB (default 10)

OVERRIDES CONFIGURATION:
   -caido-hostname string                  hostname where Caido is running (default "localhost")
   -caido-port int                         port where Caido is running (default 8080)
   -override-content-check-interval value  interval at which to check for changes in override content and update match/replace rules (default 5s)
```

## Building locally

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
./dist/jxscout
```

- Or directly with Go

```bash
go run cmd/jxscout/main.go
```

4. Setup your proxy to ingest requests into jxscout

### Chunk Discovery Script

The chunk discovery script is written in TypeScript and can be used standalone outside of jxscout. You can use any JS runtime to run it (jxscout uses bun).

You can check the script here: https://github.com/francisconeves97/jxscout/blob/main/pkg/chunk-discoverer/index.ts

The script expects two args:

- The path to the JS file to analyze for webpack chunks
- A bruteforce limit, used when the Webpack chunk loading function can create an unlimited number of valid chunk names.

Example:

```
bun run pkg/chunk-discoverer/index.ts /path/to/the/js/file 10
```

## Contributing

Feel free to leave suggestions and open pull requests, all contributions are welcome!

## Support

Happy hunting! 🐛 If jxscout helped you find cool bugs, [consider buying me a coffee](https://ko-fi.com/francisconeves97)! ☕

## License

This project is licensed under the GNU General Public License. See the COPYING file for the full license text.
