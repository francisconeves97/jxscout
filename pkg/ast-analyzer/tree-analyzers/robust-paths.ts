import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";
import path from "path";

const COMMON_MIME_TYPES = new Set([
  "application/json",
  "application/ld+json",
  "application/xml",
  "application/x-www-form-urlencoded",
  "application/octet-stream",
  "application/pdf",
  "application/zip",
  "application/javascript",
  "application/ecmascript",
  "application/x-httpd-php",
  "application/x-shockwave-flash",
  "application/x-msdownload",
  "application/x-ms-write",
  "application/x-ms-xbap",
  "application/x-msaccess",
  "application/x-msbinder",
  "application/x-mscardfile",
  "application/x-msclip",
  "application/x-ms-msdownload",
  "application/x-msmediaview",
  "application/x-msmetafile",
  "application/x-msmoney",
  "application/x-mspublisher",
  "application/x-msschedule",
  "application/x-msterminal",
  "application/x-mswrite",
  "application/x-netcdf",
  "application/x-perfmon",
  "application/x-pkcs10",
  "application/x-pkcs12",
  "application/x-pkcs7-mime",
  "application/x-pkcs7-signature",
  "application/x-sh",
  "application/x-shar",
  "application/x-silverlight-app",
  "application/x-stuffit",
  "application/x-stuffitx",
  "application/x-sv4cpio",
  "application/x-sv4crc",
  "application/x-tar",
  "application/x-tcl",
  "application/x-tex",
  "application/x-texinfo",
  "application/x-tex-tfm",
  "application/x-tex-xdvi",
  "application/x-troff",
  "application/x-troff-man",
  "application/x-troff-me",
  "application/x-troff-ms",
  "application/x-troff-msvideo",
  "application/x-ustar",
  "application/x-wais-source",
  "application/x-x509-ca-cert",
  "application/x-xfig",
  "application/x-xpinstall",
  "application/x-xz",
  "application/x-zip-compressed",
  "application/x-zip",
  "application/xhtml+xml",
  "application/xml",
  "application/xml-dtd",
  "application/xml-external-parsed-entity",
  "application/zip",
  "audio/midi",
  "audio/mp4",
  "audio/mpeg",
  "audio/ogg",
  "audio/webm",
  "audio/x-aac",
  "audio/x-aiff",
  "audio/x-mpegurl",
  "audio/x-ms-wax",
  "audio/x-ms-wma",
  "audio/x-pn-realaudio",
  "audio/x-pn-realaudio-plugin",
  "audio/x-realaudio",
  "audio/x-wav",
  "chemical/x-cdx",
  "chemical/x-cif",
  "chemical/x-cmdf",
  "chemical/x-cml",
  "chemical/x-csml",
  "chemical/x-xyz",
  "font/collection",
  "font/otf",
  "font/ttf",
  "font/woff",
  "font/woff2",
  "image/bmp",
  "image/cgm",
  "image/g3fax",
  "image/gif",
  "image/ief",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/prs.btif",
  "image/svg+xml",
  "image/tiff",
  "image/vnd.adobe.photoshop",
  "image/vnd.djvu",
  "image/vnd.dwg",
  "image/vnd.dxf",
  "image/vnd.fastbidsheet",
  "image/vnd.fpx",
  "image/vnd.microsoft.icon",
  "image/vnd.ms-modi",
  "image/vnd.net-fpx",
  "image/vnd.wap.wbmp",
  "image/vnd.xiff",
  "image/webp",
  "image/x-cmu-raster",
  "image/x-cmx",
  "image/x-icon",
  "image/x-portable-anymap",
  "image/x-portable-bitmap",
  "image/x-portable-graymap",
  "image/x-portable-pixmap",
  "image/x-rgb",
  "image/x-xbitmap",
  "image/x-xpixmap",
  "image/x-xwindowdump",
  "message/rfc822",
  "model/gltf-binary",
  "model/gltf+json",
  "model/iges",
  "model/mesh",
  "model/vnd.collada+xml",
  "model/vnd.dwf",
  "model/vnd.gdl",
  "model/vnd.gtw",
  "model/vnd.mts",
  "model/vnd.opengex",
  "model/vnd.parasolid.transmit.binary",
  "model/vnd.parasolid.transmit.text",
  "model/vnd.usdz+zip",
  "model/vnd.valve.source.compiled-map",
  "model/vnd.vrml",
  "model/x3d+binary",
  "model/x3d+vrml",
  "model/x3d+xml",
  "multipart/form-data",
  "multipart/mixed",
  "multipart/related",
  "multipart/report",
  "text/calendar",
  "text/css",
  "text/csv",
  "text/html",
  "text/javascript",
  "text/plain",
  "text/richtext",
  "text/sgml",
  "text/tab-separated-values",
  "text/troff",
  "text/vnd.curl",
  "text/vnd.curl.dcurl",
  "text/vnd.curl.mcurl",
  "text/vnd.curl.scurl",
  "text/vnd.dvb.subtitle",
  "text/vnd.fly",
  "text/vnd.fmi.flexstor",
  "text/vnd.graphviz",
  "text/vnd.in3d.3dml",
  "text/vnd.in3d.spot",
  "text/vnd.sun.j2me.app-descriptor",
  "text/vnd.wap.si",
  "text/vnd.wap.sl",
  "text/vnd.wap.wml",
  "text/vnd.wap.wmlscript",
  "text/x-asm",
  "text/x-c",
  "text/x-fortran",
  "text/x-java-source",
  "text/x-nfo",
  "text/x-opml",
  "text/x-pascal",
  "text/x-setext",
  "text/x-uuencode",
  "text/x-vcalendar",
  "text/x-vcard",
  "text/xml",
  "video/3gpp",
  "video/3gpp2",
  "video/h261",
  "video/h263",
  "video/h264",
  "video/jpeg",
  "video/mp4",
  "video/mpeg",
  "video/ogg",
  "video/quicktime",
  "video/vnd.mpegurl",
  "video/vnd.ms-playready.media.pyv",
  "video/vnd.uvvu.mp4",
  "video/vnd.vivo",
  "video/webm",
  "video/x-f4v",
  "video/x-fli",
  "video/x-flv",
  "video/x-m4v",
  "video/x-matroska",
  "video/x-mng",
  "video/x-ms-asf",
  "video/x-ms-vob",
  "video/x-ms-wm",
  "video/x-ms-wmv",
  "video/x-ms-wmx",
  "video/x-ms-wvx",
  "video/x-msvideo",
  "video/x-sgi-movie",
  "x-conference/x-cooltalk",
]);

function isHighEntropy(str: string, threshold = 4.9): boolean {
  const freq: Record<string, number> = {};
  for (const char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }

  let entropy = 0;
  const len = str.length;

  for (const char in freq) {
    const p = freq[char] / len;
    entropy -= p * Math.log2(p);
  }

  return entropy >= threshold;
}

// most logic stolen from https://github.com/BishopFox/jsluice
// all credit to them

export const ROBUST_PATHS_ANALYZER_NAME = "robust-paths";

// Common file extensions that should be tagged as extensions
const FILE_EXTENSIONS = new Set([
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".json",
  ".html",
  ".css",
  ".scss",
  ".less",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".svg",
  ".ico",
  ".webp",
  ".mp3",
  ".mp4",
  ".wav",
  ".ogg",
  ".webm",
  ".pdf",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".ppt",
  ".pptx",
  ".zip",
  ".tar",
  ".gz",
  ".rar",
  ".7z",
  ".md",
  ".txt",
  ".csv",
  ".xml",
  ".yaml",
  ".yml",
  ".env",
  ".config",
  ".conf",
  ".ini",
  ".sh",
  ".bash",
  ".zsh",
  ".fish",
  ".py",
  ".rb",
  ".php",
  ".java",
  ".c",
  ".cpp",
  ".go",
  ".rs",
  ".sql",
  ".db",
  ".sqlite",
  ".sqlite3",
  ".log",
  ".lock",
  ".map",
  ".min",
  ".bundle",
]);

const hostnamesToExclude = new Set(["www.w3.org", "reactjs.org"]);

function containsAny(str: string, chars: string): boolean {
  return chars.split("").some((char) => str.includes(char));
}

function hasPrefix(str: string, prefix: string): boolean {
  return str.startsWith(prefix);
}

function isValidPath(value: string): boolean {
  // Check if path starts with a letter or forward slash
  if (!/^[a-zA-Z/]/.test(value)) {
    return false;
  }

  // Check if path contains at least one letter
  if (!/[a-zA-Z]/.test(value)) {
    return false;
  }

  // Basic path-like check
  if (!value.includes("/")) {
    return false;
  }

  // Exclude strings with special characters
  if (containsAny(value, " ()!<>'\"`{}^$,")) {
    return false;
  }

  // Exclude paths that are just "./" or "../"
  if (/^\.\.?\/?$/.test(value)) {
    return false;
  }

  // Exclude paths that end with a slash and have no actual path content
  if (/^[^/]*\/$/.test(value)) {
    return false;
  }

  // Check if at least one path segment is longer than 3 characters
  const parts = value.split("/").filter(Boolean);
  if (!parts.some((part) => part.length >= 3)) {
    return false;
  }

  // If all parts are just "EXPR", it's not a valid path
  if (
    parts.every(
      (part) =>
        part.startsWith("EXPR") ||
        (part.startsWith("EXPR") && part.endsWith("EXPR"))
    )
  ) {
    return false;
  }

  // Paths starting with slash are likely valid
  if (hasPrefix(value, "/") && !value.startsWith("//")) {
    return true;
  }

  // Try to parse as URL first
  if (value.includes("://") || value.startsWith("//")) {
    try {
      const url = new URL(value.startsWith("//") ? `http:${value}` : value);

      // Check scheme
      const scheme = url.protocol.toLowerCase().replace(":", "");
      if (scheme !== "http" && scheme !== "https") {
        return false;
      }

      if (hostnamesToExclude.has(url.hostname)) {
        return false;
      }

      // Check hostname
      if (url.hostname.split(".").length > 1) {
        return true;
      }

      // Check query parameters
      if (url.searchParams.toString()) {
        return true;
      }

      // Check for file extension
      if (containsAny(url.pathname, ".")) {
        return true;
      }

      return false;
    } catch {
      return false;
    }
  }

  const isHostname =
    value.includes(".") && value.indexOf(".") < value.indexOf("/");

  try {
    let url: URL | null = null;
    if (isHostname) {
      url = new URL(`https://${value}`);
    } else {
      url = new URL(value, "http://randombase.com");
    }

    if (hostnamesToExclude.has(url.hostname)) {
      return false;
    }

    if (
      isHostname &&
      (url.pathname === "" || url.pathname === "/") &&
      url.search === "" &&
      url.hash === ""
    ) {
      return false;
    }
  } catch {}

  // For relative paths, check if they have a valid structure
  if (parts.length === 0) {
    return false;
  }

  // Check if any part contains a dot (potential file extension)
  if (containsAny(value, ".")) {
    return true;
  }

  // Check if it has query parameters
  if (value.includes("?")) {
    return true;
  }

  if (isHighEntropy(value)) {
    return false;
  }

  // If it has multiple segments, it's likely a path
  return true;
}

function getFileExtension(url: URL | null): string | null {
  if (!url) return null;

  const lastDotIndex = url.pathname.lastIndexOf(".");
  if (lastDotIndex === -1) return null;

  const extension = url.pathname.slice(lastDotIndex).toLowerCase();
  return FILE_EXTENSIONS.has(extension) ? extension.replace(".", "") : null;
}

function processTemplateLiteral(template: string): string {
  return template.replace(/\${[^}]+}/g, "EXPR");
}

interface BinaryExpression extends Node {
  type: "BinaryExpression";
  operator: string;
  left: Node;
  right: Node;
}

interface CallExpression extends Node {
  type: "CallExpression";
  callee: {
    type: "MemberExpression";
    property: {
      name: string;
    };
    object: Node;
  };
  arguments: Node[];
}

interface Literal extends Node {
  type: "Literal";
  value: string;
}

function processStringConcatenation(node: Node): string {
  if (
    node.type === "BinaryExpression" &&
    (node as BinaryExpression).operator === "+"
  ) {
    const binaryNode = node as BinaryExpression;
    const left = processStringConcatenation(binaryNode.left);
    const right = processStringConcatenation(binaryNode.right);
    return left + right;
  } else if (node.type === "CallExpression") {
    const callNode = node as CallExpression;
    if (
      callNode.callee.type === "MemberExpression" &&
      callNode.callee.property.name === "concat"
    ) {
      const base = processStringConcatenation(callNode.callee.object);
      const args = callNode.arguments
        .map((arg) =>
          arg.type === "Literal" ? (arg as Literal).value : "EXPR"
        )
        .join("");
      return base + args;
    }
  } else if (
    node.type === "Literal" &&
    typeof (node as Literal).value === "string"
  ) {
    return (node as Literal).value;
  }
  return "EXPR";
}

function createPathMatch(
  args: AnalyzerParams,
  node: Node,
  value: string,
  isTemplate = false,
  processedValue: string
): AnalyzerMatch {
  let isUrl = processedValue.includes("://") || processedValue.startsWith("//");
  let isUrlOnly = false;

  let parsedUrl: URL | null = null;
  try {
    if (isUrl) {
      let url = processedValue;
      if (processedValue.startsWith("//")) {
        url = `http:${processedValue}`;
      }

      parsedUrl = new URL(url);
    } else if (
      processedValue.includes(".") &&
      processedValue.indexOf(".") < processedValue.indexOf("/")
    ) {
      isUrl = true;
      parsedUrl = new URL(`http://${processedValue}`);
    } else {
      parsedUrl = new URL(processedValue, "http://randombase.com");
    }
  } catch {}

  if (
    isUrl &&
    (parsedUrl?.pathname === "" || parsedUrl?.pathname === "/") &&
    parsedUrl?.search === "" &&
    parsedUrl?.hash === ""
  ) {
    isUrlOnly = true;
  }

  const extension = getFileExtension(parsedUrl);
  let isMimeType = false;

  for (const mimeType of COMMON_MIME_TYPES) {
    if (processedValue.includes(mimeType)) {
      isMimeType = true;
      break;
    }
  }

  const isAPIPath =
    processedValue.includes("/api") || processedValue.includes("api/");

  const isAPI = processedValue.includes("api.") || isAPIPath;

  const isPathOnly = !isUrl && !isMimeType;

  const extra: Record<string, any> = {};

  if (parsedUrl) {
    if (isUrl) {
      if (parsedUrl.hostname) {
        extra["hostname"] = parsedUrl.hostname;
      }
      if (parsedUrl.port) {
        extra["port"] = parsedUrl.port;
      }
      if (parsedUrl.pathname) {
        extra["pathname"] = parsedUrl.pathname;
      }
      if (parsedUrl.searchParams.toString()) {
        extra["query-params"] = parsedUrl.searchParams.toString();
      }
      if (parsedUrl.hash) {
        extra["hash"] = parsedUrl.hash;
      }
    } else if (isPathOnly) {
      if (parsedUrl.pathname) {
        extra["pathname"] = parsedUrl.pathname;
      }
      if (parsedUrl.searchParams.toString()) {
        extra["query-params"] = parsedUrl.searchParams.toString();
      }
      if (parsedUrl.hash) {
        extra["hash"] = parsedUrl.hash;
      }
    }
  }

  return {
    filePath: args.filePath,
    analyzerName: ROBUST_PATHS_ANALYZER_NAME,
    value: isTemplate ? value : args.source.slice(node.start, node.end),
    start: node.loc!.start,
    end: node.loc!.end,
    tags: {
      ...(isMimeType && { "mime-type": true }),
      ...(extension && { [`extension-${extension}`]: true }),
      ...(extension && { "is-extension": true }),
      ...(isUrl && !isUrlOnly && { "is-url": true }),
      ...(isUrlOnly && { "is-url-only": true }),
      ...(isPathOnly && { "is-path-only": true }),
      ...(isAPI && { api: true }),
      ...(processedValue.includes("?") && { query: true }),
      ...(processedValue.includes("#") && { fragment: true }),
    },
    extra,
  };
}

const robustPathsAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    Literal(node) {
      if (!node.loc || typeof (node as Literal).value !== "string") {
        return;
      }

      const value = (node as Literal).value;
      if (isValidPath(value)) {
        matchesReturn.push(createPathMatch(args, node, value, false, value));
      }
    },

    TemplateLiteral(node) {
      if (!node.loc) {
        return;
      }

      // Get the raw template literal value and process expressions
      const rawValue = args.source
        .slice(node.start, node.end)
        .replaceAll("`", "");
      const processedValue = processTemplateLiteral(rawValue);

      if (isValidPath(processedValue)) {
        matchesReturn.push(
          createPathMatch(args, node, rawValue, true, processedValue)
        );
      }
    },

    BinaryExpression(node) {
      const binaryNode = node as BinaryExpression;
      if (binaryNode.operator === "+") {
        const processedValue = processStringConcatenation(node);
        if (isValidPath(processedValue)) {
          matchesReturn.push(
            createPathMatch(args, node, processedValue, false, processedValue)
          );
        }
      }
    },

    CallExpression(node) {
      const callNode = node as CallExpression;
      if (
        callNode.callee.type === "MemberExpression" &&
        callNode.callee.property.name === "concat"
      ) {
        const processedValue = processStringConcatenation(node);
        if (isValidPath(processedValue)) {
          matchesReturn.push(
            createPathMatch(args, node, processedValue, false, processedValue)
          );
        }
      }
    },
  };
};

export { robustPathsAnalyzerBuilder };
