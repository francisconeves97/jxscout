// Dynamic native module loader
const platform = process.platform;
const arch = process.arch;
let modulePath;

if (platform === "darwin") {
  if (arch === "arm64") {
    modulePath = r.join(__dirname, "parser.darwin-arm64.node");
  } else if (arch === "x64") {
    modulePath = r.join(__dirname, "parser.darwin-x64.node");
  }
} else if (platform === "linux") {
  if (arch === "arm64") {
    // Try musl first, then gnu
    try {
      modulePath = r.join(__dirname, "parser.linux-arm64-musl.node");
      require(modulePath);
    } catch {
      modulePath = r.join(__dirname, "parser.linux-arm64-gnu.node");
    }
  } else if (arch === "arm") {
    modulePath = r.join(__dirname, "parser.linux-arm-gnueabihf.node");
  } else if (arch === "x64") {
    // Try musl first, then gnu
    try {
      modulePath = r.join(__dirname, "parser.linux-x64-musl.node");
      require(modulePath);
    } catch {
      modulePath = r.join(__dirname, "parser.linux-x64-gnu.node");
    }
  }
} else if (platform === "win32") {
  if (arch === "arm64") {
    modulePath = r.join(__dirname, "parser.win32-arm64-msvc.node");
  } else if (arch === "x64") {
    modulePath = r.join(__dirname, "parser.win32-x64-msvc.node");
  }
}

if (!modulePath) {
  throw new Error(`Unsupported platform/architecture: ${platform}/${arch}`);
}

process.dlopen(e, modulePath);
