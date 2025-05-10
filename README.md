# jxscout

**jxscout** is a tool designed to help security researchers analyze and find vulnerabilities in JavaScript code. It works with your favorite proxy (Burp or Caido), capturing requests and saving optimized versions locally for easy analysis in your preferred code editor.

> Work in Progress 🏗️ jxscout is currently under active development. As it continues to be improved and features expanded there may be breaking changes in future updates.

## Key Features

- **Asset Organization**: Automatically saves and organizes relevant static assets (HTML, JavaScript) into an intuitive folder structure.
- **Chunks Pre-Fetching**: Detects and pre-fetches Webpack and Vite chunks for comprehensive analysis.
- **Code Beautification**: Automatically beautifies JavaScript files, making them easier to read and analyze.
- **Source Map Discovery**: Automatically reverses application source code if .map files are available.
- **AST Analysis**: Automatically analyzes JavaScript files finding interesting functionality for vulnerability researchers. See [VSCode Extension](https://github.com/francisconeves97/jxscout-vscode) to learn how to install the extension.

## Demo

Watch the demo movie to see jxscout in action:

https://github.com/user-attachments/assets/64f161c3-46b0-41a9-8b34-706cc795a034

## Installation & Instructions

### Requirements

- **golang**: https://go.dev/doc/install - jxscout is written in golang
- **bun**: https://bun.sh/docs/installation - used for the chunk discovery script

### Part 1. Installing the CLI

The first step to get up and running with jxscout is to install the CLI. To that, just run the below command or download pre-compiled binary from [release page](https://github.com/francisconeves97/jxscout/releases).

```
go install github.com/francisconeves97/jxscout/cmd/jxscout@latest
```

![jxscout](docs/jxscout.png)

The jxscout CLI has a prompt with many commands, one of them is `install` which installs `bun` and `prettier`, which are needed dependencies of jxscout. If you don't have those tools installed, feel free to install them manually or by running the `install` command.

### Part 2. Proxy Setup

jxscout will only start capturing assets after you setup your proxy to forward requests to it. To do that, you should install the right plugin for your proxy:

- For Caido users: Check out https://github.com/francisconeves97/jxscout-caido
- For Burp users: Check out https://github.com/francisconeves97/jxscout-burp

After you installed the proxy plugin, every asset that flows through your proxy should be automatically saved to your `~/jxscout` folder.

One useful thing to do is to organize your assets in projects (like you would do on your proxy). To do that you can run `config project-name=my_project` on jxscout CLI and from that moment on assets will be saved in `~/jxscout/my_project`,

If you don't see assets being saved at this point, you should check the [Troubleshooting](#troubleshooting) section.

### Part 3. (Optional) VSCode Extension

The VSCode extension is a frontend for jxscout. It allows you to visualize the AST Analysis results of jxscout in a useful tree. It also allows you to copy values from there, including paths and query params for bruteforcing.

![jxscout](docs/vscode.png)

To get started with the VSCode Extension head over to https://github.com/francisconeves97/jxscout-vscode for more instructions.

## Troubleshooting

This section should help you troubleshoot problems with jxscout.

1. View logs

jxscout provides a log view, which you can access by inputting `l` into the CLI prompt. However it can also be useful to access the log file directly by opening `~/.jxscout/jxscout.log`.

You can turn on debug logging by using `config debug=true`, which should give you a more verbose output of jxscout.

2. If you don't see any relevant logs

Then probably your proxy plugin is not feeding in requests into jxscout. Check your jxscout proxy plugin settings and verify that it is enabled and working, the configured hostname/port corresponds to the ones where jxscout is running and that you are trying to access an in-scope website if "Filter requests in-scope" option is enabled on the proxy plugin.

3. Understanding jxscout internals

jxscout uses SQLite and also bundles some JS scripts that are run by bun. All of those files will be extracted to your `~/.jxscout/` directory.

4. Opening up a github issue

If you couldn't figure out the issue or if you found a bug, feel free to open up an issue as I am always happy to try and help!

## Usage

```bash
jxscout
```

Once jxscout is running, you can:

- Run the `guide` command for a quick walkthrough
- Run the `help` command for an overview of the available commands
- Watch the video tutorial for a visual guide on configuring and using jxscout

### Available Commands

These are the commands available on the `jxscout` prompt. You can run `help` to get this list.

```
Available commands:

assets (la) - List assets for the current project with pagination and search
  Usage: assets [page=<page_number>] [page-size=<page_size>] [search=<search_term>]

caido-auth (ca) - Authenticate with Caido to use overrides (token is stored in memory and will reset on server restart)
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

You can configure jxscout using the `config` prompt command, but if you can also pass these flags directly to jxscout.

```bash
jxscout | static files downloader for vulnerability analysis

Usage:
  jxscout [flags]

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
   -ast-analyzer-concurrency int      how many AST analysis processes to run at once (default 5)

CHUNK DISCOVERY CONFIGURATION:
   -chunk-discoverer-bruteforce-limit int  how many potential chunks to bruteforce when automatic discovery fails (default 3000)

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

## Contributing

Feel free to leave suggestions and open pull requests, all contributions are welcome!

## Support

Happy hunting! 🐛 If jxscout helped you find cool bugs, [consider buying me a coffee](https://ko-fi.com/francisconeves97)! ☕

## License

This project is licensed under the GNU General Public License. See the COPYING file for the full license text.
