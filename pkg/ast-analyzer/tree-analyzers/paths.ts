import { Node } from "acorn";
import { Analyzer, AnalyzerMatch, AnalyzerParams } from "../types";
import { Visitor } from "../walker";

export const PATHS_ANALYZER_NAME = "paths";

// This regex matches potential API paths and URLs
// It allows:
// - Full URLs with http/https protocol (must have at least one path segment)
// - Paths starting with or without a leading slash
// - Paths with segments separated by slashes
// - Paths with placeholders in curly braces or with colons
// - Paths with query parameters
// - Alphanumeric characters, hyphens, underscores, dots, and other URL-safe characters
const PATH_REGEX =
  /^(?:(?:https?:\/\/[^\/]+)(?:\/[A-Za-z0-9\-._~!$&'()*+,;=:@{}]+)+(?:\?[^#]*)?(?:#[^]*)?|(?:\/)?(?:[A-Za-z0-9\-._~!$&'()*+,;=:@{}]+\/)*[A-Za-z0-9\-._~!$&'()*+,;=:@{}]+(?:\?[^#]*)?(?:#[^]*)?)$/;

// Common MIME types that should be excluded
export const COMMON_MIME_TYPES = new Set([
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

// Common static asset extensions that should be excluded
const STATIC_ASSET_EXTENSIONS = new Set([
  // Web files
  ".css",
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".svg",
  // Image files
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".bmp",
  ".webp",
  ".ico",
  ".tiff",
  ".tif",
  ".svg",
  // Font files
  ".ttf",
  ".otf",
  ".woff",
  ".woff2",
  ".eot",
  // Media files
  ".mp3",
  ".wav",
  ".ogg",
  ".mp4",
  ".avi",
  ".mov",
  ".wmv",
  ".flv",
  ".mkv",
  ".webm",
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

// Checks if a string is a known MIME type
function isMimeType(str: string): boolean {
  return (
    COMMON_MIME_TYPES.has(str) || str.toLowerCase().endsWith(";charset=utf-8")
  );
}

// Checks if a path contains only special characters (no alphanumeric)
function containsOnlySpecialChars(path: string): boolean {
  const withoutSlashes = path.replace(/\//g, "");
  return withoutSlashes.length > 0 && /^[^a-zA-Z0-9]+$/.test(withoutSlashes);
}

// Checks if a path has only short segments (all segments are 1-2 characters)
function hasOnlyShortSegments(path: string): boolean {
  const segments = path.split("/").filter((segment) => segment.length > 0);
  return (
    segments.length > 0 && segments.every((segment) => segment.length <= 2)
  );
}

// Checks if a path ends with a static asset extension
function hasFileExtension(path: string): boolean {
  const lastSegment = path.split("/").pop() || "";
  return Array.from(STATIC_ASSET_EXTENSIONS).some((ext) =>
    lastSegment.toLowerCase().endsWith(ext)
  );
}

function isValidPath(value: string, ancestors: Node[]): boolean {
  if (!value.includes("/")) {
    return false;
  }

  // Exclude paths with special prefixes
  if (/^[@.~]/.test(value)) {
    return false;
  }

  // Skip if it's a MIME type
  if (isMimeType(value)) {
    return false;
  }

  // Skip if it has high entropy
  if (isHighEntropy(value)) {
    return false;
  }

  // Skip if it contains only special characters
  if (containsOnlySpecialChars(value)) {
    return false;
  }

  // Skip if it has only short segments
  if (hasOnlyShortSegments(value)) {
    return false;
  }

  // Skip if it's an import statement
  if (ancestors.some((ancestor) => ancestor.type === "ImportDeclaration")) {
    return false;
  }

  return PATH_REGEX.test(value);
}

function createPathMatch(
  args: AnalyzerParams,
  node: Node,
  value: string,
  isTemplate = false
): AnalyzerMatch {
  const isUrl = value.includes("http") && value.includes("://");

  return {
    filePath: args.filePath,
    analyzerName: PATHS_ANALYZER_NAME,
    value: isTemplate ? value : args.source.slice(node.start, node.end),
    start: node.loc!.start,
    end: node.loc!.end,
    tags: {
      path: true,
      ...(isTemplate && { template: true }),
      ...(isUrl && { "is-url": true }),
      ...(!isUrl && { "is-path-only": true }),
      ...(value.includes("api") && { api: true }),
      ...(value.includes("?") && { query: true }),
      ...(value.includes("#") && { fragment: true }),
    },
  };
}

const pathsAnalyzerBuilder = (
  args: AnalyzerParams,
  matchesReturn: AnalyzerMatch[]
): Visitor => {
  return {
    Literal(node, ancestors) {
      if (!node.loc || typeof node.value !== "string") {
        return;
      }

      const value = node.value;
      if (isValidPath(value, ancestors)) {
        matchesReturn.push(createPathMatch(args, node, value));
      }
    },

    TemplateLiteral(node, ancestors) {
      if (!node.loc) {
        return;
      }

      // Skip if it's an import statement
      if (ancestors.some((ancestor) => ancestor.type === "ImportDeclaration")) {
        return;
      }

      // Get the raw template literal value
      const rawValue = args.source
        .slice(node.start, node.end)
        .replaceAll("`", "");

      // Check if any of the quasis (static parts) contain a path-like pattern
      const hasPathLikeQuasis = node.quasis.some((quasi) => {
        const value = quasi.value.raw;
        return (
          value.includes("/") && !isMimeType(value) && !hasFileExtension(value)
        );
      });

      if (hasPathLikeQuasis) {
        matchesReturn.push(createPathMatch(args, node, rawValue, true));
      }
    },
  };
};

export { pathsAnalyzerBuilder };
