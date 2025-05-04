// @bun
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// pkg/ast-analyzer/index.ts
import fs from "node:fs";

// node_modules/acorn/dist/acorn.mjs
var exports_acorn = {};
__export(exports_acorn, {
  version: () => version,
  tokenizer: () => tokenizer2,
  tokTypes: () => types$1,
  tokContexts: () => types,
  parseExpressionAt: () => parseExpressionAt2,
  parse: () => parse3,
  nonASCIIwhitespace: () => nonASCIIwhitespace,
  lineBreakG: () => lineBreakG,
  lineBreak: () => lineBreak,
  keywordTypes: () => keywords,
  isNewLine: () => isNewLine,
  isIdentifierStart: () => isIdentifierStart,
  isIdentifierChar: () => isIdentifierChar,
  getLineInfo: () => getLineInfo,
  defaultOptions: () => defaultOptions,
  TokenType: () => TokenType,
  Token: () => Token,
  TokContext: () => TokContext,
  SourceLocation: () => SourceLocation,
  Position: () => Position,
  Parser: () => Parser,
  Node: () => Node
});
var astralIdentifierCodes = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 7, 9, 32, 4, 318, 1, 80, 3, 71, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 68, 8, 2, 0, 3, 0, 2, 3, 2, 4, 2, 0, 15, 1, 83, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 7, 19, 58, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 343, 9, 54, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 10, 1, 2, 0, 49, 6, 4, 4, 14, 10, 5350, 0, 7, 14, 11465, 27, 2343, 9, 87, 9, 39, 4, 60, 6, 26, 9, 535, 9, 470, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4178, 9, 519, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10, 9, 357, 0, 62, 13, 499, 13, 245, 1, 2, 9, 726, 6, 110, 6, 6, 9, 4759, 9, 787719, 239];
var astralIdentifierStartCodes = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 4, 51, 13, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 39, 27, 10, 22, 251, 41, 7, 1, 17, 2, 60, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 20, 1, 64, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 31, 9, 2, 0, 3, 0, 2, 37, 2, 0, 26, 0, 2, 0, 45, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 200, 32, 32, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 16, 0, 2, 12, 2, 33, 125, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1071, 18, 5, 26, 3994, 6, 582, 6842, 29, 1763, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 433, 44, 212, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 42, 9, 8936, 3, 2, 6, 2, 1, 2, 290, 16, 0, 30, 2, 3, 0, 15, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 7, 5, 262, 61, 147, 44, 11, 6, 17, 0, 322, 29, 19, 43, 485, 27, 229, 29, 3, 0, 496, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4153, 7, 221, 3, 5761, 15, 7472, 16, 621, 2467, 541, 1507, 4938, 6, 4191];
var nonASCIIidentifierChars = "\u200C\u200D\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0897-\u089F\u08CA-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C04\u0C3C\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0CF3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D81-\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECE\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u180F-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1ABF-\u1ACE\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DFF\u200C\u200D\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\u30FB\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA82C\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA8FF-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F\uFF65";
var nonASCIIidentifierStartChars = "\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC";
var reservedWords = {
  3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
  5: "class enum extends super const export import",
  6: "enum",
  strict: "implements interface let package private protected public static yield",
  strictBind: "eval arguments"
};
var ecma5AndLessKeywords = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this";
var keywords$1 = {
  5: ecma5AndLessKeywords,
  "5module": ecma5AndLessKeywords + " export import",
  6: ecma5AndLessKeywords + " const class extends export import super"
};
var keywordRelationalOperator = /^in(stanceof)?$/;
var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
function isInAstralSet(code, set) {
  var pos = 65536;
  for (var i = 0;i < set.length; i += 2) {
    pos += set[i];
    if (pos > code) {
      return false;
    }
    pos += set[i + 1];
    if (pos >= code) {
      return true;
    }
  }
  return false;
}
function isIdentifierStart(code, astral) {
  if (code < 65) {
    return code === 36;
  }
  if (code < 91) {
    return true;
  }
  if (code < 97) {
    return code === 95;
  }
  if (code < 123) {
    return true;
  }
  if (code <= 65535) {
    return code >= 170 && nonASCIIidentifierStart.test(String.fromCharCode(code));
  }
  if (astral === false) {
    return false;
  }
  return isInAstralSet(code, astralIdentifierStartCodes);
}
function isIdentifierChar(code, astral) {
  if (code < 48) {
    return code === 36;
  }
  if (code < 58) {
    return true;
  }
  if (code < 65) {
    return false;
  }
  if (code < 91) {
    return true;
  }
  if (code < 97) {
    return code === 95;
  }
  if (code < 123) {
    return true;
  }
  if (code <= 65535) {
    return code >= 170 && nonASCIIidentifier.test(String.fromCharCode(code));
  }
  if (astral === false) {
    return false;
  }
  return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes);
}
var TokenType = function TokenType2(label, conf) {
  if (conf === undefined)
    conf = {};
  this.label = label;
  this.keyword = conf.keyword;
  this.beforeExpr = !!conf.beforeExpr;
  this.startsExpr = !!conf.startsExpr;
  this.isLoop = !!conf.isLoop;
  this.isAssign = !!conf.isAssign;
  this.prefix = !!conf.prefix;
  this.postfix = !!conf.postfix;
  this.binop = conf.binop || null;
  this.updateContext = null;
};
function binop(name, prec) {
  return new TokenType(name, { beforeExpr: true, binop: prec });
}
var beforeExpr = { beforeExpr: true };
var startsExpr = { startsExpr: true };
var keywords = {};
function kw(name, options) {
  if (options === undefined)
    options = {};
  options.keyword = name;
  return keywords[name] = new TokenType(name, options);
}
var types$1 = {
  num: new TokenType("num", startsExpr),
  regexp: new TokenType("regexp", startsExpr),
  string: new TokenType("string", startsExpr),
  name: new TokenType("name", startsExpr),
  privateId: new TokenType("privateId", startsExpr),
  eof: new TokenType("eof"),
  bracketL: new TokenType("[", { beforeExpr: true, startsExpr: true }),
  bracketR: new TokenType("]"),
  braceL: new TokenType("{", { beforeExpr: true, startsExpr: true }),
  braceR: new TokenType("}"),
  parenL: new TokenType("(", { beforeExpr: true, startsExpr: true }),
  parenR: new TokenType(")"),
  comma: new TokenType(",", beforeExpr),
  semi: new TokenType(";", beforeExpr),
  colon: new TokenType(":", beforeExpr),
  dot: new TokenType("."),
  question: new TokenType("?", beforeExpr),
  questionDot: new TokenType("?."),
  arrow: new TokenType("=>", beforeExpr),
  template: new TokenType("template"),
  invalidTemplate: new TokenType("invalidTemplate"),
  ellipsis: new TokenType("...", beforeExpr),
  backQuote: new TokenType("`", startsExpr),
  dollarBraceL: new TokenType("${", { beforeExpr: true, startsExpr: true }),
  eq: new TokenType("=", { beforeExpr: true, isAssign: true }),
  assign: new TokenType("_=", { beforeExpr: true, isAssign: true }),
  incDec: new TokenType("++/--", { prefix: true, postfix: true, startsExpr: true }),
  prefix: new TokenType("!/~", { beforeExpr: true, prefix: true, startsExpr: true }),
  logicalOR: binop("||", 1),
  logicalAND: binop("&&", 2),
  bitwiseOR: binop("|", 3),
  bitwiseXOR: binop("^", 4),
  bitwiseAND: binop("&", 5),
  equality: binop("==/!=/===/!==", 6),
  relational: binop("</>/<=/>=", 7),
  bitShift: binop("<</>>/>>>", 8),
  plusMin: new TokenType("+/-", { beforeExpr: true, binop: 9, prefix: true, startsExpr: true }),
  modulo: binop("%", 10),
  star: binop("*", 10),
  slash: binop("/", 10),
  starstar: new TokenType("**", { beforeExpr: true }),
  coalesce: binop("??", 1),
  _break: kw("break"),
  _case: kw("case", beforeExpr),
  _catch: kw("catch"),
  _continue: kw("continue"),
  _debugger: kw("debugger"),
  _default: kw("default", beforeExpr),
  _do: kw("do", { isLoop: true, beforeExpr: true }),
  _else: kw("else", beforeExpr),
  _finally: kw("finally"),
  _for: kw("for", { isLoop: true }),
  _function: kw("function", startsExpr),
  _if: kw("if"),
  _return: kw("return", beforeExpr),
  _switch: kw("switch"),
  _throw: kw("throw", beforeExpr),
  _try: kw("try"),
  _var: kw("var"),
  _const: kw("const"),
  _while: kw("while", { isLoop: true }),
  _with: kw("with"),
  _new: kw("new", { beforeExpr: true, startsExpr: true }),
  _this: kw("this", startsExpr),
  _super: kw("super", startsExpr),
  _class: kw("class", startsExpr),
  _extends: kw("extends", beforeExpr),
  _export: kw("export"),
  _import: kw("import", startsExpr),
  _null: kw("null", startsExpr),
  _true: kw("true", startsExpr),
  _false: kw("false", startsExpr),
  _in: kw("in", { beforeExpr: true, binop: 7 }),
  _instanceof: kw("instanceof", { beforeExpr: true, binop: 7 }),
  _typeof: kw("typeof", { beforeExpr: true, prefix: true, startsExpr: true }),
  _void: kw("void", { beforeExpr: true, prefix: true, startsExpr: true }),
  _delete: kw("delete", { beforeExpr: true, prefix: true, startsExpr: true })
};
var lineBreak = /\r\n?|\n|\u2028|\u2029/;
var lineBreakG = new RegExp(lineBreak.source, "g");
function isNewLine(code) {
  return code === 10 || code === 13 || code === 8232 || code === 8233;
}
function nextLineBreak(code, from, end) {
  if (end === undefined)
    end = code.length;
  for (var i = from;i < end; i++) {
    var next = code.charCodeAt(i);
    if (isNewLine(next)) {
      return i < end - 1 && next === 13 && code.charCodeAt(i + 1) === 10 ? i + 2 : i + 1;
    }
  }
  return -1;
}
var nonASCIIwhitespace = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
var skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;
var ref = Object.prototype;
var hasOwnProperty = ref.hasOwnProperty;
var toString = ref.toString;
var hasOwn = Object.hasOwn || function(obj, propName) {
  return hasOwnProperty.call(obj, propName);
};
var isArray = Array.isArray || function(obj) {
  return toString.call(obj) === "[object Array]";
};
var regexpCache = Object.create(null);
function wordsRegexp(words) {
  return regexpCache[words] || (regexpCache[words] = new RegExp("^(?:" + words.replace(/ /g, "|") + ")$"));
}
function codePointToString(code) {
  if (code <= 65535) {
    return String.fromCharCode(code);
  }
  code -= 65536;
  return String.fromCharCode((code >> 10) + 55296, (code & 1023) + 56320);
}
var loneSurrogate = /(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/;
var Position = function Position2(line, col) {
  this.line = line;
  this.column = col;
};
Position.prototype.offset = function offset(n) {
  return new Position(this.line, this.column + n);
};
var SourceLocation = function SourceLocation2(p, start, end) {
  this.start = start;
  this.end = end;
  if (p.sourceFile !== null) {
    this.source = p.sourceFile;
  }
};
function getLineInfo(input, offset2) {
  for (var line = 1, cur = 0;; ) {
    var nextBreak = nextLineBreak(input, cur, offset2);
    if (nextBreak < 0) {
      return new Position(line, offset2 - cur);
    }
    ++line;
    cur = nextBreak;
  }
}
var defaultOptions = {
  ecmaVersion: null,
  sourceType: "script",
  onInsertedSemicolon: null,
  onTrailingComma: null,
  allowReserved: null,
  allowReturnOutsideFunction: false,
  allowImportExportEverywhere: false,
  allowAwaitOutsideFunction: null,
  allowSuperOutsideMethod: null,
  allowHashBang: false,
  checkPrivateFields: true,
  locations: false,
  onToken: null,
  onComment: null,
  ranges: false,
  program: null,
  sourceFile: null,
  directSourceFile: null,
  preserveParens: false
};
var warnedAboutEcmaVersion = false;
function getOptions(opts) {
  var options = {};
  for (var opt in defaultOptions) {
    options[opt] = opts && hasOwn(opts, opt) ? opts[opt] : defaultOptions[opt];
  }
  if (options.ecmaVersion === "latest") {
    options.ecmaVersion = 1e8;
  } else if (options.ecmaVersion == null) {
    if (!warnedAboutEcmaVersion && typeof console === "object" && console.warn) {
      warnedAboutEcmaVersion = true;
      console.warn(`Since Acorn 8.0.0, options.ecmaVersion is required.
Defaulting to 2020, but this will stop working in the future.`);
    }
    options.ecmaVersion = 11;
  } else if (options.ecmaVersion >= 2015) {
    options.ecmaVersion -= 2009;
  }
  if (options.allowReserved == null) {
    options.allowReserved = options.ecmaVersion < 5;
  }
  if (!opts || opts.allowHashBang == null) {
    options.allowHashBang = options.ecmaVersion >= 14;
  }
  if (isArray(options.onToken)) {
    var tokens = options.onToken;
    options.onToken = function(token) {
      return tokens.push(token);
    };
  }
  if (isArray(options.onComment)) {
    options.onComment = pushComment(options, options.onComment);
  }
  return options;
}
function pushComment(options, array) {
  return function(block, text, start, end, startLoc, endLoc) {
    var comment = {
      type: block ? "Block" : "Line",
      value: text,
      start,
      end
    };
    if (options.locations) {
      comment.loc = new SourceLocation(this, startLoc, endLoc);
    }
    if (options.ranges) {
      comment.range = [start, end];
    }
    array.push(comment);
  };
}
var SCOPE_TOP = 1;
var SCOPE_FUNCTION = 2;
var SCOPE_ASYNC = 4;
var SCOPE_GENERATOR = 8;
var SCOPE_ARROW = 16;
var SCOPE_SIMPLE_CATCH = 32;
var SCOPE_SUPER = 64;
var SCOPE_DIRECT_SUPER = 128;
var SCOPE_CLASS_STATIC_BLOCK = 256;
var SCOPE_CLASS_FIELD_INIT = 512;
var SCOPE_VAR = SCOPE_TOP | SCOPE_FUNCTION | SCOPE_CLASS_STATIC_BLOCK;
function functionFlags(async, generator) {
  return SCOPE_FUNCTION | (async ? SCOPE_ASYNC : 0) | (generator ? SCOPE_GENERATOR : 0);
}
var BIND_NONE = 0;
var BIND_VAR = 1;
var BIND_LEXICAL = 2;
var BIND_FUNCTION = 3;
var BIND_SIMPLE_CATCH = 4;
var BIND_OUTSIDE = 5;
var Parser = function Parser2(options, input, startPos) {
  this.options = options = getOptions(options);
  this.sourceFile = options.sourceFile;
  this.keywords = wordsRegexp(keywords$1[options.ecmaVersion >= 6 ? 6 : options.sourceType === "module" ? "5module" : 5]);
  var reserved = "";
  if (options.allowReserved !== true) {
    reserved = reservedWords[options.ecmaVersion >= 6 ? 6 : options.ecmaVersion === 5 ? 5 : 3];
    if (options.sourceType === "module") {
      reserved += " await";
    }
  }
  this.reservedWords = wordsRegexp(reserved);
  var reservedStrict = (reserved ? reserved + " " : "") + reservedWords.strict;
  this.reservedWordsStrict = wordsRegexp(reservedStrict);
  this.reservedWordsStrictBind = wordsRegexp(reservedStrict + " " + reservedWords.strictBind);
  this.input = String(input);
  this.containsEsc = false;
  if (startPos) {
    this.pos = startPos;
    this.lineStart = this.input.lastIndexOf(`
`, startPos - 1) + 1;
    this.curLine = this.input.slice(0, this.lineStart).split(lineBreak).length;
  } else {
    this.pos = this.lineStart = 0;
    this.curLine = 1;
  }
  this.type = types$1.eof;
  this.value = null;
  this.start = this.end = this.pos;
  this.startLoc = this.endLoc = this.curPosition();
  this.lastTokEndLoc = this.lastTokStartLoc = null;
  this.lastTokStart = this.lastTokEnd = this.pos;
  this.context = this.initialContext();
  this.exprAllowed = true;
  this.inModule = options.sourceType === "module";
  this.strict = this.inModule || this.strictDirective(this.pos);
  this.potentialArrowAt = -1;
  this.potentialArrowInForAwait = false;
  this.yieldPos = this.awaitPos = this.awaitIdentPos = 0;
  this.labels = [];
  this.undefinedExports = Object.create(null);
  if (this.pos === 0 && options.allowHashBang && this.input.slice(0, 2) === "#!") {
    this.skipLineComment(2);
  }
  this.scopeStack = [];
  this.enterScope(SCOPE_TOP);
  this.regexpState = null;
  this.privateNameStack = [];
};
var prototypeAccessors = { inFunction: { configurable: true }, inGenerator: { configurable: true }, inAsync: { configurable: true }, canAwait: { configurable: true }, allowSuper: { configurable: true }, allowDirectSuper: { configurable: true }, treatFunctionsAsVar: { configurable: true }, allowNewDotTarget: { configurable: true }, inClassStaticBlock: { configurable: true } };
Parser.prototype.parse = function parse() {
  var node = this.options.program || this.startNode();
  this.nextToken();
  return this.parseTopLevel(node);
};
prototypeAccessors.inFunction.get = function() {
  return (this.currentVarScope().flags & SCOPE_FUNCTION) > 0;
};
prototypeAccessors.inGenerator.get = function() {
  return (this.currentVarScope().flags & SCOPE_GENERATOR) > 0;
};
prototypeAccessors.inAsync.get = function() {
  return (this.currentVarScope().flags & SCOPE_ASYNC) > 0;
};
prototypeAccessors.canAwait.get = function() {
  for (var i = this.scopeStack.length - 1;i >= 0; i--) {
    var ref2 = this.scopeStack[i];
    var flags = ref2.flags;
    if (flags & (SCOPE_CLASS_STATIC_BLOCK | SCOPE_CLASS_FIELD_INIT)) {
      return false;
    }
    if (flags & SCOPE_FUNCTION) {
      return (flags & SCOPE_ASYNC) > 0;
    }
  }
  return this.inModule && this.options.ecmaVersion >= 13 || this.options.allowAwaitOutsideFunction;
};
prototypeAccessors.allowSuper.get = function() {
  var ref2 = this.currentThisScope();
  var flags = ref2.flags;
  return (flags & SCOPE_SUPER) > 0 || this.options.allowSuperOutsideMethod;
};
prototypeAccessors.allowDirectSuper.get = function() {
  return (this.currentThisScope().flags & SCOPE_DIRECT_SUPER) > 0;
};
prototypeAccessors.treatFunctionsAsVar.get = function() {
  return this.treatFunctionsAsVarInScope(this.currentScope());
};
prototypeAccessors.allowNewDotTarget.get = function() {
  for (var i = this.scopeStack.length - 1;i >= 0; i--) {
    var ref2 = this.scopeStack[i];
    var flags = ref2.flags;
    if (flags & (SCOPE_CLASS_STATIC_BLOCK | SCOPE_CLASS_FIELD_INIT) || flags & SCOPE_FUNCTION && !(flags & SCOPE_ARROW)) {
      return true;
    }
  }
  return false;
};
prototypeAccessors.inClassStaticBlock.get = function() {
  return (this.currentVarScope().flags & SCOPE_CLASS_STATIC_BLOCK) > 0;
};
Parser.extend = function extend() {
  var plugins = [], len = arguments.length;
  while (len--)
    plugins[len] = arguments[len];
  var cls = this;
  for (var i = 0;i < plugins.length; i++) {
    cls = plugins[i](cls);
  }
  return cls;
};
Parser.parse = function parse2(input, options) {
  return new this(options, input).parse();
};
Parser.parseExpressionAt = function parseExpressionAt(input, pos, options) {
  var parser = new this(options, input, pos);
  parser.nextToken();
  return parser.parseExpression();
};
Parser.tokenizer = function tokenizer(input, options) {
  return new this(options, input);
};
Object.defineProperties(Parser.prototype, prototypeAccessors);
var pp$9 = Parser.prototype;
var literal = /^(?:'((?:\\[^]|[^'\\])*?)'|"((?:\\[^]|[^"\\])*?)")/;
pp$9.strictDirective = function(start) {
  if (this.options.ecmaVersion < 5) {
    return false;
  }
  for (;; ) {
    skipWhiteSpace.lastIndex = start;
    start += skipWhiteSpace.exec(this.input)[0].length;
    var match = literal.exec(this.input.slice(start));
    if (!match) {
      return false;
    }
    if ((match[1] || match[2]) === "use strict") {
      skipWhiteSpace.lastIndex = start + match[0].length;
      var spaceAfter = skipWhiteSpace.exec(this.input), end = spaceAfter.index + spaceAfter[0].length;
      var next = this.input.charAt(end);
      return next === ";" || next === "}" || lineBreak.test(spaceAfter[0]) && !(/[(`.[+\-/*%<>=,?^&]/.test(next) || next === "!" && this.input.charAt(end + 1) === "=");
    }
    start += match[0].length;
    skipWhiteSpace.lastIndex = start;
    start += skipWhiteSpace.exec(this.input)[0].length;
    if (this.input[start] === ";") {
      start++;
    }
  }
};
pp$9.eat = function(type) {
  if (this.type === type) {
    this.next();
    return true;
  } else {
    return false;
  }
};
pp$9.isContextual = function(name) {
  return this.type === types$1.name && this.value === name && !this.containsEsc;
};
pp$9.eatContextual = function(name) {
  if (!this.isContextual(name)) {
    return false;
  }
  this.next();
  return true;
};
pp$9.expectContextual = function(name) {
  if (!this.eatContextual(name)) {
    this.unexpected();
  }
};
pp$9.canInsertSemicolon = function() {
  return this.type === types$1.eof || this.type === types$1.braceR || lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
};
pp$9.insertSemicolon = function() {
  if (this.canInsertSemicolon()) {
    if (this.options.onInsertedSemicolon) {
      this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc);
    }
    return true;
  }
};
pp$9.semicolon = function() {
  if (!this.eat(types$1.semi) && !this.insertSemicolon()) {
    this.unexpected();
  }
};
pp$9.afterTrailingComma = function(tokType, notNext) {
  if (this.type === tokType) {
    if (this.options.onTrailingComma) {
      this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc);
    }
    if (!notNext) {
      this.next();
    }
    return true;
  }
};
pp$9.expect = function(type) {
  this.eat(type) || this.unexpected();
};
pp$9.unexpected = function(pos) {
  this.raise(pos != null ? pos : this.start, "Unexpected token");
};
var DestructuringErrors = function DestructuringErrors2() {
  this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;
};
pp$9.checkPatternErrors = function(refDestructuringErrors, isAssign) {
  if (!refDestructuringErrors) {
    return;
  }
  if (refDestructuringErrors.trailingComma > -1) {
    this.raiseRecoverable(refDestructuringErrors.trailingComma, "Comma is not permitted after the rest element");
  }
  var parens = isAssign ? refDestructuringErrors.parenthesizedAssign : refDestructuringErrors.parenthesizedBind;
  if (parens > -1) {
    this.raiseRecoverable(parens, isAssign ? "Assigning to rvalue" : "Parenthesized pattern");
  }
};
pp$9.checkExpressionErrors = function(refDestructuringErrors, andThrow) {
  if (!refDestructuringErrors) {
    return false;
  }
  var shorthandAssign = refDestructuringErrors.shorthandAssign;
  var doubleProto = refDestructuringErrors.doubleProto;
  if (!andThrow) {
    return shorthandAssign >= 0 || doubleProto >= 0;
  }
  if (shorthandAssign >= 0) {
    this.raise(shorthandAssign, "Shorthand property assignments are valid only in destructuring patterns");
  }
  if (doubleProto >= 0) {
    this.raiseRecoverable(doubleProto, "Redefinition of __proto__ property");
  }
};
pp$9.checkYieldAwaitInDefaultParams = function() {
  if (this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos)) {
    this.raise(this.yieldPos, "Yield expression cannot be a default value");
  }
  if (this.awaitPos) {
    this.raise(this.awaitPos, "Await expression cannot be a default value");
  }
};
pp$9.isSimpleAssignTarget = function(expr) {
  if (expr.type === "ParenthesizedExpression") {
    return this.isSimpleAssignTarget(expr.expression);
  }
  return expr.type === "Identifier" || expr.type === "MemberExpression";
};
var pp$8 = Parser.prototype;
pp$8.parseTopLevel = function(node) {
  var exports = Object.create(null);
  if (!node.body) {
    node.body = [];
  }
  while (this.type !== types$1.eof) {
    var stmt = this.parseStatement(null, true, exports);
    node.body.push(stmt);
  }
  if (this.inModule) {
    for (var i = 0, list = Object.keys(this.undefinedExports);i < list.length; i += 1) {
      var name = list[i];
      this.raiseRecoverable(this.undefinedExports[name].start, "Export '" + name + "' is not defined");
    }
  }
  this.adaptDirectivePrologue(node.body);
  this.next();
  node.sourceType = this.options.sourceType;
  return this.finishNode(node, "Program");
};
var loopLabel = { kind: "loop" };
var switchLabel = { kind: "switch" };
pp$8.isLet = function(context) {
  if (this.options.ecmaVersion < 6 || !this.isContextual("let")) {
    return false;
  }
  skipWhiteSpace.lastIndex = this.pos;
  var skip = skipWhiteSpace.exec(this.input);
  var next = this.pos + skip[0].length, nextCh = this.input.charCodeAt(next);
  if (nextCh === 91 || nextCh === 92) {
    return true;
  }
  if (context) {
    return false;
  }
  if (nextCh === 123 || nextCh > 55295 && nextCh < 56320) {
    return true;
  }
  if (isIdentifierStart(nextCh, true)) {
    var pos = next + 1;
    while (isIdentifierChar(nextCh = this.input.charCodeAt(pos), true)) {
      ++pos;
    }
    if (nextCh === 92 || nextCh > 55295 && nextCh < 56320) {
      return true;
    }
    var ident = this.input.slice(next, pos);
    if (!keywordRelationalOperator.test(ident)) {
      return true;
    }
  }
  return false;
};
pp$8.isAsyncFunction = function() {
  if (this.options.ecmaVersion < 8 || !this.isContextual("async")) {
    return false;
  }
  skipWhiteSpace.lastIndex = this.pos;
  var skip = skipWhiteSpace.exec(this.input);
  var next = this.pos + skip[0].length, after;
  return !lineBreak.test(this.input.slice(this.pos, next)) && this.input.slice(next, next + 8) === "function" && (next + 8 === this.input.length || !(isIdentifierChar(after = this.input.charCodeAt(next + 8)) || after > 55295 && after < 56320));
};
pp$8.parseStatement = function(context, topLevel, exports) {
  var starttype = this.type, node = this.startNode(), kind;
  if (this.isLet(context)) {
    starttype = types$1._var;
    kind = "let";
  }
  switch (starttype) {
    case types$1._break:
    case types$1._continue:
      return this.parseBreakContinueStatement(node, starttype.keyword);
    case types$1._debugger:
      return this.parseDebuggerStatement(node);
    case types$1._do:
      return this.parseDoStatement(node);
    case types$1._for:
      return this.parseForStatement(node);
    case types$1._function:
      if (context && (this.strict || context !== "if" && context !== "label") && this.options.ecmaVersion >= 6) {
        this.unexpected();
      }
      return this.parseFunctionStatement(node, false, !context);
    case types$1._class:
      if (context) {
        this.unexpected();
      }
      return this.parseClass(node, true);
    case types$1._if:
      return this.parseIfStatement(node);
    case types$1._return:
      return this.parseReturnStatement(node);
    case types$1._switch:
      return this.parseSwitchStatement(node);
    case types$1._throw:
      return this.parseThrowStatement(node);
    case types$1._try:
      return this.parseTryStatement(node);
    case types$1._const:
    case types$1._var:
      kind = kind || this.value;
      if (context && kind !== "var") {
        this.unexpected();
      }
      return this.parseVarStatement(node, kind);
    case types$1._while:
      return this.parseWhileStatement(node);
    case types$1._with:
      return this.parseWithStatement(node);
    case types$1.braceL:
      return this.parseBlock(true, node);
    case types$1.semi:
      return this.parseEmptyStatement(node);
    case types$1._export:
    case types$1._import:
      if (this.options.ecmaVersion > 10 && starttype === types$1._import) {
        skipWhiteSpace.lastIndex = this.pos;
        var skip = skipWhiteSpace.exec(this.input);
        var next = this.pos + skip[0].length, nextCh = this.input.charCodeAt(next);
        if (nextCh === 40 || nextCh === 46) {
          return this.parseExpressionStatement(node, this.parseExpression());
        }
      }
      if (!this.options.allowImportExportEverywhere) {
        if (!topLevel) {
          this.raise(this.start, "'import' and 'export' may only appear at the top level");
        }
        if (!this.inModule) {
          this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'");
        }
      }
      return starttype === types$1._import ? this.parseImport(node) : this.parseExport(node, exports);
    default:
      if (this.isAsyncFunction()) {
        if (context) {
          this.unexpected();
        }
        this.next();
        return this.parseFunctionStatement(node, true, !context);
      }
      var maybeName = this.value, expr = this.parseExpression();
      if (starttype === types$1.name && expr.type === "Identifier" && this.eat(types$1.colon)) {
        return this.parseLabeledStatement(node, maybeName, expr, context);
      } else {
        return this.parseExpressionStatement(node, expr);
      }
  }
};
pp$8.parseBreakContinueStatement = function(node, keyword) {
  var isBreak = keyword === "break";
  this.next();
  if (this.eat(types$1.semi) || this.insertSemicolon()) {
    node.label = null;
  } else if (this.type !== types$1.name) {
    this.unexpected();
  } else {
    node.label = this.parseIdent();
    this.semicolon();
  }
  var i = 0;
  for (;i < this.labels.length; ++i) {
    var lab = this.labels[i];
    if (node.label == null || lab.name === node.label.name) {
      if (lab.kind != null && (isBreak || lab.kind === "loop")) {
        break;
      }
      if (node.label && isBreak) {
        break;
      }
    }
  }
  if (i === this.labels.length) {
    this.raise(node.start, "Unsyntactic " + keyword);
  }
  return this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement");
};
pp$8.parseDebuggerStatement = function(node) {
  this.next();
  this.semicolon();
  return this.finishNode(node, "DebuggerStatement");
};
pp$8.parseDoStatement = function(node) {
  this.next();
  this.labels.push(loopLabel);
  node.body = this.parseStatement("do");
  this.labels.pop();
  this.expect(types$1._while);
  node.test = this.parseParenExpression();
  if (this.options.ecmaVersion >= 6) {
    this.eat(types$1.semi);
  } else {
    this.semicolon();
  }
  return this.finishNode(node, "DoWhileStatement");
};
pp$8.parseForStatement = function(node) {
  this.next();
  var awaitAt = this.options.ecmaVersion >= 9 && this.canAwait && this.eatContextual("await") ? this.lastTokStart : -1;
  this.labels.push(loopLabel);
  this.enterScope(0);
  this.expect(types$1.parenL);
  if (this.type === types$1.semi) {
    if (awaitAt > -1) {
      this.unexpected(awaitAt);
    }
    return this.parseFor(node, null);
  }
  var isLet = this.isLet();
  if (this.type === types$1._var || this.type === types$1._const || isLet) {
    var init$1 = this.startNode(), kind = isLet ? "let" : this.value;
    this.next();
    this.parseVar(init$1, true, kind);
    this.finishNode(init$1, "VariableDeclaration");
    if ((this.type === types$1._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) && init$1.declarations.length === 1) {
      if (this.options.ecmaVersion >= 9) {
        if (this.type === types$1._in) {
          if (awaitAt > -1) {
            this.unexpected(awaitAt);
          }
        } else {
          node.await = awaitAt > -1;
        }
      }
      return this.parseForIn(node, init$1);
    }
    if (awaitAt > -1) {
      this.unexpected(awaitAt);
    }
    return this.parseFor(node, init$1);
  }
  var startsWithLet = this.isContextual("let"), isForOf = false;
  var containsEsc = this.containsEsc;
  var refDestructuringErrors = new DestructuringErrors;
  var initPos = this.start;
  var init = awaitAt > -1 ? this.parseExprSubscripts(refDestructuringErrors, "await") : this.parseExpression(true, refDestructuringErrors);
  if (this.type === types$1._in || (isForOf = this.options.ecmaVersion >= 6 && this.isContextual("of"))) {
    if (awaitAt > -1) {
      if (this.type === types$1._in) {
        this.unexpected(awaitAt);
      }
      node.await = true;
    } else if (isForOf && this.options.ecmaVersion >= 8) {
      if (init.start === initPos && !containsEsc && init.type === "Identifier" && init.name === "async") {
        this.unexpected();
      } else if (this.options.ecmaVersion >= 9) {
        node.await = false;
      }
    }
    if (startsWithLet && isForOf) {
      this.raise(init.start, "The left-hand side of a for-of loop may not start with 'let'.");
    }
    this.toAssignable(init, false, refDestructuringErrors);
    this.checkLValPattern(init);
    return this.parseForIn(node, init);
  } else {
    this.checkExpressionErrors(refDestructuringErrors, true);
  }
  if (awaitAt > -1) {
    this.unexpected(awaitAt);
  }
  return this.parseFor(node, init);
};
pp$8.parseFunctionStatement = function(node, isAsync, declarationPosition) {
  this.next();
  return this.parseFunction(node, FUNC_STATEMENT | (declarationPosition ? 0 : FUNC_HANGING_STATEMENT), false, isAsync);
};
pp$8.parseIfStatement = function(node) {
  this.next();
  node.test = this.parseParenExpression();
  node.consequent = this.parseStatement("if");
  node.alternate = this.eat(types$1._else) ? this.parseStatement("if") : null;
  return this.finishNode(node, "IfStatement");
};
pp$8.parseReturnStatement = function(node) {
  if (!this.inFunction && !this.options.allowReturnOutsideFunction) {
    this.raise(this.start, "'return' outside of function");
  }
  this.next();
  if (this.eat(types$1.semi) || this.insertSemicolon()) {
    node.argument = null;
  } else {
    node.argument = this.parseExpression();
    this.semicolon();
  }
  return this.finishNode(node, "ReturnStatement");
};
pp$8.parseSwitchStatement = function(node) {
  this.next();
  node.discriminant = this.parseParenExpression();
  node.cases = [];
  this.expect(types$1.braceL);
  this.labels.push(switchLabel);
  this.enterScope(0);
  var cur;
  for (var sawDefault = false;this.type !== types$1.braceR; ) {
    if (this.type === types$1._case || this.type === types$1._default) {
      var isCase = this.type === types$1._case;
      if (cur) {
        this.finishNode(cur, "SwitchCase");
      }
      node.cases.push(cur = this.startNode());
      cur.consequent = [];
      this.next();
      if (isCase) {
        cur.test = this.parseExpression();
      } else {
        if (sawDefault) {
          this.raiseRecoverable(this.lastTokStart, "Multiple default clauses");
        }
        sawDefault = true;
        cur.test = null;
      }
      this.expect(types$1.colon);
    } else {
      if (!cur) {
        this.unexpected();
      }
      cur.consequent.push(this.parseStatement(null));
    }
  }
  this.exitScope();
  if (cur) {
    this.finishNode(cur, "SwitchCase");
  }
  this.next();
  this.labels.pop();
  return this.finishNode(node, "SwitchStatement");
};
pp$8.parseThrowStatement = function(node) {
  this.next();
  if (lineBreak.test(this.input.slice(this.lastTokEnd, this.start))) {
    this.raise(this.lastTokEnd, "Illegal newline after throw");
  }
  node.argument = this.parseExpression();
  this.semicolon();
  return this.finishNode(node, "ThrowStatement");
};
var empty$1 = [];
pp$8.parseCatchClauseParam = function() {
  var param = this.parseBindingAtom();
  var simple = param.type === "Identifier";
  this.enterScope(simple ? SCOPE_SIMPLE_CATCH : 0);
  this.checkLValPattern(param, simple ? BIND_SIMPLE_CATCH : BIND_LEXICAL);
  this.expect(types$1.parenR);
  return param;
};
pp$8.parseTryStatement = function(node) {
  this.next();
  node.block = this.parseBlock();
  node.handler = null;
  if (this.type === types$1._catch) {
    var clause = this.startNode();
    this.next();
    if (this.eat(types$1.parenL)) {
      clause.param = this.parseCatchClauseParam();
    } else {
      if (this.options.ecmaVersion < 10) {
        this.unexpected();
      }
      clause.param = null;
      this.enterScope(0);
    }
    clause.body = this.parseBlock(false);
    this.exitScope();
    node.handler = this.finishNode(clause, "CatchClause");
  }
  node.finalizer = this.eat(types$1._finally) ? this.parseBlock() : null;
  if (!node.handler && !node.finalizer) {
    this.raise(node.start, "Missing catch or finally clause");
  }
  return this.finishNode(node, "TryStatement");
};
pp$8.parseVarStatement = function(node, kind, allowMissingInitializer) {
  this.next();
  this.parseVar(node, false, kind, allowMissingInitializer);
  this.semicolon();
  return this.finishNode(node, "VariableDeclaration");
};
pp$8.parseWhileStatement = function(node) {
  this.next();
  node.test = this.parseParenExpression();
  this.labels.push(loopLabel);
  node.body = this.parseStatement("while");
  this.labels.pop();
  return this.finishNode(node, "WhileStatement");
};
pp$8.parseWithStatement = function(node) {
  if (this.strict) {
    this.raise(this.start, "'with' in strict mode");
  }
  this.next();
  node.object = this.parseParenExpression();
  node.body = this.parseStatement("with");
  return this.finishNode(node, "WithStatement");
};
pp$8.parseEmptyStatement = function(node) {
  this.next();
  return this.finishNode(node, "EmptyStatement");
};
pp$8.parseLabeledStatement = function(node, maybeName, expr, context) {
  for (var i$1 = 0, list = this.labels;i$1 < list.length; i$1 += 1) {
    var label = list[i$1];
    if (label.name === maybeName) {
      this.raise(expr.start, "Label '" + maybeName + "' is already declared");
    }
  }
  var kind = this.type.isLoop ? "loop" : this.type === types$1._switch ? "switch" : null;
  for (var i = this.labels.length - 1;i >= 0; i--) {
    var label$1 = this.labels[i];
    if (label$1.statementStart === node.start) {
      label$1.statementStart = this.start;
      label$1.kind = kind;
    } else {
      break;
    }
  }
  this.labels.push({ name: maybeName, kind, statementStart: this.start });
  node.body = this.parseStatement(context ? context.indexOf("label") === -1 ? context + "label" : context : "label");
  this.labels.pop();
  node.label = expr;
  return this.finishNode(node, "LabeledStatement");
};
pp$8.parseExpressionStatement = function(node, expr) {
  node.expression = expr;
  this.semicolon();
  return this.finishNode(node, "ExpressionStatement");
};
pp$8.parseBlock = function(createNewLexicalScope, node, exitStrict) {
  if (createNewLexicalScope === undefined)
    createNewLexicalScope = true;
  if (node === undefined)
    node = this.startNode();
  node.body = [];
  this.expect(types$1.braceL);
  if (createNewLexicalScope) {
    this.enterScope(0);
  }
  while (this.type !== types$1.braceR) {
    var stmt = this.parseStatement(null);
    node.body.push(stmt);
  }
  if (exitStrict) {
    this.strict = false;
  }
  this.next();
  if (createNewLexicalScope) {
    this.exitScope();
  }
  return this.finishNode(node, "BlockStatement");
};
pp$8.parseFor = function(node, init) {
  node.init = init;
  this.expect(types$1.semi);
  node.test = this.type === types$1.semi ? null : this.parseExpression();
  this.expect(types$1.semi);
  node.update = this.type === types$1.parenR ? null : this.parseExpression();
  this.expect(types$1.parenR);
  node.body = this.parseStatement("for");
  this.exitScope();
  this.labels.pop();
  return this.finishNode(node, "ForStatement");
};
pp$8.parseForIn = function(node, init) {
  var isForIn = this.type === types$1._in;
  this.next();
  if (init.type === "VariableDeclaration" && init.declarations[0].init != null && (!isForIn || this.options.ecmaVersion < 8 || this.strict || init.kind !== "var" || init.declarations[0].id.type !== "Identifier")) {
    this.raise(init.start, (isForIn ? "for-in" : "for-of") + " loop variable declaration may not have an initializer");
  }
  node.left = init;
  node.right = isForIn ? this.parseExpression() : this.parseMaybeAssign();
  this.expect(types$1.parenR);
  node.body = this.parseStatement("for");
  this.exitScope();
  this.labels.pop();
  return this.finishNode(node, isForIn ? "ForInStatement" : "ForOfStatement");
};
pp$8.parseVar = function(node, isFor, kind, allowMissingInitializer) {
  node.declarations = [];
  node.kind = kind;
  for (;; ) {
    var decl = this.startNode();
    this.parseVarId(decl, kind);
    if (this.eat(types$1.eq)) {
      decl.init = this.parseMaybeAssign(isFor);
    } else if (!allowMissingInitializer && kind === "const" && !(this.type === types$1._in || this.options.ecmaVersion >= 6 && this.isContextual("of"))) {
      this.unexpected();
    } else if (!allowMissingInitializer && decl.id.type !== "Identifier" && !(isFor && (this.type === types$1._in || this.isContextual("of")))) {
      this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value");
    } else {
      decl.init = null;
    }
    node.declarations.push(this.finishNode(decl, "VariableDeclarator"));
    if (!this.eat(types$1.comma)) {
      break;
    }
  }
  return node;
};
pp$8.parseVarId = function(decl, kind) {
  decl.id = this.parseBindingAtom();
  this.checkLValPattern(decl.id, kind === "var" ? BIND_VAR : BIND_LEXICAL, false);
};
var FUNC_STATEMENT = 1;
var FUNC_HANGING_STATEMENT = 2;
var FUNC_NULLABLE_ID = 4;
pp$8.parseFunction = function(node, statement, allowExpressionBody, isAsync, forInit) {
  this.initFunction(node);
  if (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !isAsync) {
    if (this.type === types$1.star && statement & FUNC_HANGING_STATEMENT) {
      this.unexpected();
    }
    node.generator = this.eat(types$1.star);
  }
  if (this.options.ecmaVersion >= 8) {
    node.async = !!isAsync;
  }
  if (statement & FUNC_STATEMENT) {
    node.id = statement & FUNC_NULLABLE_ID && this.type !== types$1.name ? null : this.parseIdent();
    if (node.id && !(statement & FUNC_HANGING_STATEMENT)) {
      this.checkLValSimple(node.id, this.strict || node.generator || node.async ? this.treatFunctionsAsVar ? BIND_VAR : BIND_LEXICAL : BIND_FUNCTION);
    }
  }
  var oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
  this.yieldPos = 0;
  this.awaitPos = 0;
  this.awaitIdentPos = 0;
  this.enterScope(functionFlags(node.async, node.generator));
  if (!(statement & FUNC_STATEMENT)) {
    node.id = this.type === types$1.name ? this.parseIdent() : null;
  }
  this.parseFunctionParams(node);
  this.parseFunctionBody(node, allowExpressionBody, false, forInit);
  this.yieldPos = oldYieldPos;
  this.awaitPos = oldAwaitPos;
  this.awaitIdentPos = oldAwaitIdentPos;
  return this.finishNode(node, statement & FUNC_STATEMENT ? "FunctionDeclaration" : "FunctionExpression");
};
pp$8.parseFunctionParams = function(node) {
  this.expect(types$1.parenL);
  node.params = this.parseBindingList(types$1.parenR, false, this.options.ecmaVersion >= 8);
  this.checkYieldAwaitInDefaultParams();
};
pp$8.parseClass = function(node, isStatement) {
  this.next();
  var oldStrict = this.strict;
  this.strict = true;
  this.parseClassId(node, isStatement);
  this.parseClassSuper(node);
  var privateNameMap = this.enterClassBody();
  var classBody = this.startNode();
  var hadConstructor = false;
  classBody.body = [];
  this.expect(types$1.braceL);
  while (this.type !== types$1.braceR) {
    var element = this.parseClassElement(node.superClass !== null);
    if (element) {
      classBody.body.push(element);
      if (element.type === "MethodDefinition" && element.kind === "constructor") {
        if (hadConstructor) {
          this.raiseRecoverable(element.start, "Duplicate constructor in the same class");
        }
        hadConstructor = true;
      } else if (element.key && element.key.type === "PrivateIdentifier" && isPrivateNameConflicted(privateNameMap, element)) {
        this.raiseRecoverable(element.key.start, "Identifier '#" + element.key.name + "' has already been declared");
      }
    }
  }
  this.strict = oldStrict;
  this.next();
  node.body = this.finishNode(classBody, "ClassBody");
  this.exitClassBody();
  return this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression");
};
pp$8.parseClassElement = function(constructorAllowsSuper) {
  if (this.eat(types$1.semi)) {
    return null;
  }
  var ecmaVersion = this.options.ecmaVersion;
  var node = this.startNode();
  var keyName = "";
  var isGenerator = false;
  var isAsync = false;
  var kind = "method";
  var isStatic = false;
  if (this.eatContextual("static")) {
    if (ecmaVersion >= 13 && this.eat(types$1.braceL)) {
      this.parseClassStaticBlock(node);
      return node;
    }
    if (this.isClassElementNameStart() || this.type === types$1.star) {
      isStatic = true;
    } else {
      keyName = "static";
    }
  }
  node.static = isStatic;
  if (!keyName && ecmaVersion >= 8 && this.eatContextual("async")) {
    if ((this.isClassElementNameStart() || this.type === types$1.star) && !this.canInsertSemicolon()) {
      isAsync = true;
    } else {
      keyName = "async";
    }
  }
  if (!keyName && (ecmaVersion >= 9 || !isAsync) && this.eat(types$1.star)) {
    isGenerator = true;
  }
  if (!keyName && !isAsync && !isGenerator) {
    var lastValue = this.value;
    if (this.eatContextual("get") || this.eatContextual("set")) {
      if (this.isClassElementNameStart()) {
        kind = lastValue;
      } else {
        keyName = lastValue;
      }
    }
  }
  if (keyName) {
    node.computed = false;
    node.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc);
    node.key.name = keyName;
    this.finishNode(node.key, "Identifier");
  } else {
    this.parseClassElementName(node);
  }
  if (ecmaVersion < 13 || this.type === types$1.parenL || kind !== "method" || isGenerator || isAsync) {
    var isConstructor = !node.static && checkKeyName(node, "constructor");
    var allowsDirectSuper = isConstructor && constructorAllowsSuper;
    if (isConstructor && kind !== "method") {
      this.raise(node.key.start, "Constructor can't have get/set modifier");
    }
    node.kind = isConstructor ? "constructor" : kind;
    this.parseClassMethod(node, isGenerator, isAsync, allowsDirectSuper);
  } else {
    this.parseClassField(node);
  }
  return node;
};
pp$8.isClassElementNameStart = function() {
  return this.type === types$1.name || this.type === types$1.privateId || this.type === types$1.num || this.type === types$1.string || this.type === types$1.bracketL || this.type.keyword;
};
pp$8.parseClassElementName = function(element) {
  if (this.type === types$1.privateId) {
    if (this.value === "constructor") {
      this.raise(this.start, "Classes can't have an element named '#constructor'");
    }
    element.computed = false;
    element.key = this.parsePrivateIdent();
  } else {
    this.parsePropertyName(element);
  }
};
pp$8.parseClassMethod = function(method, isGenerator, isAsync, allowsDirectSuper) {
  var key = method.key;
  if (method.kind === "constructor") {
    if (isGenerator) {
      this.raise(key.start, "Constructor can't be a generator");
    }
    if (isAsync) {
      this.raise(key.start, "Constructor can't be an async method");
    }
  } else if (method.static && checkKeyName(method, "prototype")) {
    this.raise(key.start, "Classes may not have a static property named prototype");
  }
  var value = method.value = this.parseMethod(isGenerator, isAsync, allowsDirectSuper);
  if (method.kind === "get" && value.params.length !== 0) {
    this.raiseRecoverable(value.start, "getter should have no params");
  }
  if (method.kind === "set" && value.params.length !== 1) {
    this.raiseRecoverable(value.start, "setter should have exactly one param");
  }
  if (method.kind === "set" && value.params[0].type === "RestElement") {
    this.raiseRecoverable(value.params[0].start, "Setter cannot use rest params");
  }
  return this.finishNode(method, "MethodDefinition");
};
pp$8.parseClassField = function(field) {
  if (checkKeyName(field, "constructor")) {
    this.raise(field.key.start, "Classes can't have a field named 'constructor'");
  } else if (field.static && checkKeyName(field, "prototype")) {
    this.raise(field.key.start, "Classes can't have a static field named 'prototype'");
  }
  if (this.eat(types$1.eq)) {
    this.enterScope(SCOPE_CLASS_FIELD_INIT | SCOPE_SUPER);
    field.value = this.parseMaybeAssign();
    this.exitScope();
  } else {
    field.value = null;
  }
  this.semicolon();
  return this.finishNode(field, "PropertyDefinition");
};
pp$8.parseClassStaticBlock = function(node) {
  node.body = [];
  var oldLabels = this.labels;
  this.labels = [];
  this.enterScope(SCOPE_CLASS_STATIC_BLOCK | SCOPE_SUPER);
  while (this.type !== types$1.braceR) {
    var stmt = this.parseStatement(null);
    node.body.push(stmt);
  }
  this.next();
  this.exitScope();
  this.labels = oldLabels;
  return this.finishNode(node, "StaticBlock");
};
pp$8.parseClassId = function(node, isStatement) {
  if (this.type === types$1.name) {
    node.id = this.parseIdent();
    if (isStatement) {
      this.checkLValSimple(node.id, BIND_LEXICAL, false);
    }
  } else {
    if (isStatement === true) {
      this.unexpected();
    }
    node.id = null;
  }
};
pp$8.parseClassSuper = function(node) {
  node.superClass = this.eat(types$1._extends) ? this.parseExprSubscripts(null, false) : null;
};
pp$8.enterClassBody = function() {
  var element = { declared: Object.create(null), used: [] };
  this.privateNameStack.push(element);
  return element.declared;
};
pp$8.exitClassBody = function() {
  var ref2 = this.privateNameStack.pop();
  var declared = ref2.declared;
  var used = ref2.used;
  if (!this.options.checkPrivateFields) {
    return;
  }
  var len = this.privateNameStack.length;
  var parent = len === 0 ? null : this.privateNameStack[len - 1];
  for (var i = 0;i < used.length; ++i) {
    var id = used[i];
    if (!hasOwn(declared, id.name)) {
      if (parent) {
        parent.used.push(id);
      } else {
        this.raiseRecoverable(id.start, "Private field '#" + id.name + "' must be declared in an enclosing class");
      }
    }
  }
};
function isPrivateNameConflicted(privateNameMap, element) {
  var name = element.key.name;
  var curr = privateNameMap[name];
  var next = "true";
  if (element.type === "MethodDefinition" && (element.kind === "get" || element.kind === "set")) {
    next = (element.static ? "s" : "i") + element.kind;
  }
  if (curr === "iget" && next === "iset" || curr === "iset" && next === "iget" || curr === "sget" && next === "sset" || curr === "sset" && next === "sget") {
    privateNameMap[name] = "true";
    return false;
  } else if (!curr) {
    privateNameMap[name] = next;
    return false;
  } else {
    return true;
  }
}
function checkKeyName(node, name) {
  var computed = node.computed;
  var key = node.key;
  return !computed && (key.type === "Identifier" && key.name === name || key.type === "Literal" && key.value === name);
}
pp$8.parseExportAllDeclaration = function(node, exports) {
  if (this.options.ecmaVersion >= 11) {
    if (this.eatContextual("as")) {
      node.exported = this.parseModuleExportName();
      this.checkExport(exports, node.exported, this.lastTokStart);
    } else {
      node.exported = null;
    }
  }
  this.expectContextual("from");
  if (this.type !== types$1.string) {
    this.unexpected();
  }
  node.source = this.parseExprAtom();
  if (this.options.ecmaVersion >= 16) {
    node.attributes = this.parseWithClause();
  }
  this.semicolon();
  return this.finishNode(node, "ExportAllDeclaration");
};
pp$8.parseExport = function(node, exports) {
  this.next();
  if (this.eat(types$1.star)) {
    return this.parseExportAllDeclaration(node, exports);
  }
  if (this.eat(types$1._default)) {
    this.checkExport(exports, "default", this.lastTokStart);
    node.declaration = this.parseExportDefaultDeclaration();
    return this.finishNode(node, "ExportDefaultDeclaration");
  }
  if (this.shouldParseExportStatement()) {
    node.declaration = this.parseExportDeclaration(node);
    if (node.declaration.type === "VariableDeclaration") {
      this.checkVariableExport(exports, node.declaration.declarations);
    } else {
      this.checkExport(exports, node.declaration.id, node.declaration.id.start);
    }
    node.specifiers = [];
    node.source = null;
    if (this.options.ecmaVersion >= 16) {
      node.attributes = [];
    }
  } else {
    node.declaration = null;
    node.specifiers = this.parseExportSpecifiers(exports);
    if (this.eatContextual("from")) {
      if (this.type !== types$1.string) {
        this.unexpected();
      }
      node.source = this.parseExprAtom();
      if (this.options.ecmaVersion >= 16) {
        node.attributes = this.parseWithClause();
      }
    } else {
      for (var i = 0, list = node.specifiers;i < list.length; i += 1) {
        var spec = list[i];
        this.checkUnreserved(spec.local);
        this.checkLocalExport(spec.local);
        if (spec.local.type === "Literal") {
          this.raise(spec.local.start, "A string literal cannot be used as an exported binding without `from`.");
        }
      }
      node.source = null;
      if (this.options.ecmaVersion >= 16) {
        node.attributes = [];
      }
    }
    this.semicolon();
  }
  return this.finishNode(node, "ExportNamedDeclaration");
};
pp$8.parseExportDeclaration = function(node) {
  return this.parseStatement(null);
};
pp$8.parseExportDefaultDeclaration = function() {
  var isAsync;
  if (this.type === types$1._function || (isAsync = this.isAsyncFunction())) {
    var fNode = this.startNode();
    this.next();
    if (isAsync) {
      this.next();
    }
    return this.parseFunction(fNode, FUNC_STATEMENT | FUNC_NULLABLE_ID, false, isAsync);
  } else if (this.type === types$1._class) {
    var cNode = this.startNode();
    return this.parseClass(cNode, "nullableID");
  } else {
    var declaration = this.parseMaybeAssign();
    this.semicolon();
    return declaration;
  }
};
pp$8.checkExport = function(exports, name, pos) {
  if (!exports) {
    return;
  }
  if (typeof name !== "string") {
    name = name.type === "Identifier" ? name.name : name.value;
  }
  if (hasOwn(exports, name)) {
    this.raiseRecoverable(pos, "Duplicate export '" + name + "'");
  }
  exports[name] = true;
};
pp$8.checkPatternExport = function(exports, pat) {
  var type = pat.type;
  if (type === "Identifier") {
    this.checkExport(exports, pat, pat.start);
  } else if (type === "ObjectPattern") {
    for (var i = 0, list = pat.properties;i < list.length; i += 1) {
      var prop = list[i];
      this.checkPatternExport(exports, prop);
    }
  } else if (type === "ArrayPattern") {
    for (var i$1 = 0, list$1 = pat.elements;i$1 < list$1.length; i$1 += 1) {
      var elt = list$1[i$1];
      if (elt) {
        this.checkPatternExport(exports, elt);
      }
    }
  } else if (type === "Property") {
    this.checkPatternExport(exports, pat.value);
  } else if (type === "AssignmentPattern") {
    this.checkPatternExport(exports, pat.left);
  } else if (type === "RestElement") {
    this.checkPatternExport(exports, pat.argument);
  }
};
pp$8.checkVariableExport = function(exports, decls) {
  if (!exports) {
    return;
  }
  for (var i = 0, list = decls;i < list.length; i += 1) {
    var decl = list[i];
    this.checkPatternExport(exports, decl.id);
  }
};
pp$8.shouldParseExportStatement = function() {
  return this.type.keyword === "var" || this.type.keyword === "const" || this.type.keyword === "class" || this.type.keyword === "function" || this.isLet() || this.isAsyncFunction();
};
pp$8.parseExportSpecifier = function(exports) {
  var node = this.startNode();
  node.local = this.parseModuleExportName();
  node.exported = this.eatContextual("as") ? this.parseModuleExportName() : node.local;
  this.checkExport(exports, node.exported, node.exported.start);
  return this.finishNode(node, "ExportSpecifier");
};
pp$8.parseExportSpecifiers = function(exports) {
  var nodes = [], first = true;
  this.expect(types$1.braceL);
  while (!this.eat(types$1.braceR)) {
    if (!first) {
      this.expect(types$1.comma);
      if (this.afterTrailingComma(types$1.braceR)) {
        break;
      }
    } else {
      first = false;
    }
    nodes.push(this.parseExportSpecifier(exports));
  }
  return nodes;
};
pp$8.parseImport = function(node) {
  this.next();
  if (this.type === types$1.string) {
    node.specifiers = empty$1;
    node.source = this.parseExprAtom();
  } else {
    node.specifiers = this.parseImportSpecifiers();
    this.expectContextual("from");
    node.source = this.type === types$1.string ? this.parseExprAtom() : this.unexpected();
  }
  if (this.options.ecmaVersion >= 16) {
    node.attributes = this.parseWithClause();
  }
  this.semicolon();
  return this.finishNode(node, "ImportDeclaration");
};
pp$8.parseImportSpecifier = function() {
  var node = this.startNode();
  node.imported = this.parseModuleExportName();
  if (this.eatContextual("as")) {
    node.local = this.parseIdent();
  } else {
    this.checkUnreserved(node.imported);
    node.local = node.imported;
  }
  this.checkLValSimple(node.local, BIND_LEXICAL);
  return this.finishNode(node, "ImportSpecifier");
};
pp$8.parseImportDefaultSpecifier = function() {
  var node = this.startNode();
  node.local = this.parseIdent();
  this.checkLValSimple(node.local, BIND_LEXICAL);
  return this.finishNode(node, "ImportDefaultSpecifier");
};
pp$8.parseImportNamespaceSpecifier = function() {
  var node = this.startNode();
  this.next();
  this.expectContextual("as");
  node.local = this.parseIdent();
  this.checkLValSimple(node.local, BIND_LEXICAL);
  return this.finishNode(node, "ImportNamespaceSpecifier");
};
pp$8.parseImportSpecifiers = function() {
  var nodes = [], first = true;
  if (this.type === types$1.name) {
    nodes.push(this.parseImportDefaultSpecifier());
    if (!this.eat(types$1.comma)) {
      return nodes;
    }
  }
  if (this.type === types$1.star) {
    nodes.push(this.parseImportNamespaceSpecifier());
    return nodes;
  }
  this.expect(types$1.braceL);
  while (!this.eat(types$1.braceR)) {
    if (!first) {
      this.expect(types$1.comma);
      if (this.afterTrailingComma(types$1.braceR)) {
        break;
      }
    } else {
      first = false;
    }
    nodes.push(this.parseImportSpecifier());
  }
  return nodes;
};
pp$8.parseWithClause = function() {
  var nodes = [];
  if (!this.eat(types$1._with)) {
    return nodes;
  }
  this.expect(types$1.braceL);
  var attributeKeys = {};
  var first = true;
  while (!this.eat(types$1.braceR)) {
    if (!first) {
      this.expect(types$1.comma);
      if (this.afterTrailingComma(types$1.braceR)) {
        break;
      }
    } else {
      first = false;
    }
    var attr = this.parseImportAttribute();
    var keyName = attr.key.type === "Identifier" ? attr.key.name : attr.key.value;
    if (hasOwn(attributeKeys, keyName)) {
      this.raiseRecoverable(attr.key.start, "Duplicate attribute key '" + keyName + "'");
    }
    attributeKeys[keyName] = true;
    nodes.push(attr);
  }
  return nodes;
};
pp$8.parseImportAttribute = function() {
  var node = this.startNode();
  node.key = this.type === types$1.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never");
  this.expect(types$1.colon);
  if (this.type !== types$1.string) {
    this.unexpected();
  }
  node.value = this.parseExprAtom();
  return this.finishNode(node, "ImportAttribute");
};
pp$8.parseModuleExportName = function() {
  if (this.options.ecmaVersion >= 13 && this.type === types$1.string) {
    var stringLiteral = this.parseLiteral(this.value);
    if (loneSurrogate.test(stringLiteral.value)) {
      this.raise(stringLiteral.start, "An export name cannot include a lone surrogate.");
    }
    return stringLiteral;
  }
  return this.parseIdent(true);
};
pp$8.adaptDirectivePrologue = function(statements) {
  for (var i = 0;i < statements.length && this.isDirectiveCandidate(statements[i]); ++i) {
    statements[i].directive = statements[i].expression.raw.slice(1, -1);
  }
};
pp$8.isDirectiveCandidate = function(statement) {
  return this.options.ecmaVersion >= 5 && statement.type === "ExpressionStatement" && statement.expression.type === "Literal" && typeof statement.expression.value === "string" && (this.input[statement.start] === '"' || this.input[statement.start] === "'");
};
var pp$7 = Parser.prototype;
pp$7.toAssignable = function(node, isBinding, refDestructuringErrors) {
  if (this.options.ecmaVersion >= 6 && node) {
    switch (node.type) {
      case "Identifier":
        if (this.inAsync && node.name === "await") {
          this.raise(node.start, "Cannot use 'await' as identifier inside an async function");
        }
        break;
      case "ObjectPattern":
      case "ArrayPattern":
      case "AssignmentPattern":
      case "RestElement":
        break;
      case "ObjectExpression":
        node.type = "ObjectPattern";
        if (refDestructuringErrors) {
          this.checkPatternErrors(refDestructuringErrors, true);
        }
        for (var i = 0, list = node.properties;i < list.length; i += 1) {
          var prop = list[i];
          this.toAssignable(prop, isBinding);
          if (prop.type === "RestElement" && (prop.argument.type === "ArrayPattern" || prop.argument.type === "ObjectPattern")) {
            this.raise(prop.argument.start, "Unexpected token");
          }
        }
        break;
      case "Property":
        if (node.kind !== "init") {
          this.raise(node.key.start, "Object pattern can't contain getter or setter");
        }
        this.toAssignable(node.value, isBinding);
        break;
      case "ArrayExpression":
        node.type = "ArrayPattern";
        if (refDestructuringErrors) {
          this.checkPatternErrors(refDestructuringErrors, true);
        }
        this.toAssignableList(node.elements, isBinding);
        break;
      case "SpreadElement":
        node.type = "RestElement";
        this.toAssignable(node.argument, isBinding);
        if (node.argument.type === "AssignmentPattern") {
          this.raise(node.argument.start, "Rest elements cannot have a default value");
        }
        break;
      case "AssignmentExpression":
        if (node.operator !== "=") {
          this.raise(node.left.end, "Only '=' operator can be used for specifying default value.");
        }
        node.type = "AssignmentPattern";
        delete node.operator;
        this.toAssignable(node.left, isBinding);
        break;
      case "ParenthesizedExpression":
        this.toAssignable(node.expression, isBinding, refDestructuringErrors);
        break;
      case "ChainExpression":
        this.raiseRecoverable(node.start, "Optional chaining cannot appear in left-hand side");
        break;
      case "MemberExpression":
        if (!isBinding) {
          break;
        }
      default:
        this.raise(node.start, "Assigning to rvalue");
    }
  } else if (refDestructuringErrors) {
    this.checkPatternErrors(refDestructuringErrors, true);
  }
  return node;
};
pp$7.toAssignableList = function(exprList, isBinding) {
  var end = exprList.length;
  for (var i = 0;i < end; i++) {
    var elt = exprList[i];
    if (elt) {
      this.toAssignable(elt, isBinding);
    }
  }
  if (end) {
    var last = exprList[end - 1];
    if (this.options.ecmaVersion === 6 && isBinding && last && last.type === "RestElement" && last.argument.type !== "Identifier") {
      this.unexpected(last.argument.start);
    }
  }
  return exprList;
};
pp$7.parseSpread = function(refDestructuringErrors) {
  var node = this.startNode();
  this.next();
  node.argument = this.parseMaybeAssign(false, refDestructuringErrors);
  return this.finishNode(node, "SpreadElement");
};
pp$7.parseRestBinding = function() {
  var node = this.startNode();
  this.next();
  if (this.options.ecmaVersion === 6 && this.type !== types$1.name) {
    this.unexpected();
  }
  node.argument = this.parseBindingAtom();
  return this.finishNode(node, "RestElement");
};
pp$7.parseBindingAtom = function() {
  if (this.options.ecmaVersion >= 6) {
    switch (this.type) {
      case types$1.bracketL:
        var node = this.startNode();
        this.next();
        node.elements = this.parseBindingList(types$1.bracketR, true, true);
        return this.finishNode(node, "ArrayPattern");
      case types$1.braceL:
        return this.parseObj(true);
    }
  }
  return this.parseIdent();
};
pp$7.parseBindingList = function(close, allowEmpty, allowTrailingComma, allowModifiers) {
  var elts = [], first = true;
  while (!this.eat(close)) {
    if (first) {
      first = false;
    } else {
      this.expect(types$1.comma);
    }
    if (allowEmpty && this.type === types$1.comma) {
      elts.push(null);
    } else if (allowTrailingComma && this.afterTrailingComma(close)) {
      break;
    } else if (this.type === types$1.ellipsis) {
      var rest = this.parseRestBinding();
      this.parseBindingListItem(rest);
      elts.push(rest);
      if (this.type === types$1.comma) {
        this.raiseRecoverable(this.start, "Comma is not permitted after the rest element");
      }
      this.expect(close);
      break;
    } else {
      elts.push(this.parseAssignableListItem(allowModifiers));
    }
  }
  return elts;
};
pp$7.parseAssignableListItem = function(allowModifiers) {
  var elem = this.parseMaybeDefault(this.start, this.startLoc);
  this.parseBindingListItem(elem);
  return elem;
};
pp$7.parseBindingListItem = function(param) {
  return param;
};
pp$7.parseMaybeDefault = function(startPos, startLoc, left) {
  left = left || this.parseBindingAtom();
  if (this.options.ecmaVersion < 6 || !this.eat(types$1.eq)) {
    return left;
  }
  var node = this.startNodeAt(startPos, startLoc);
  node.left = left;
  node.right = this.parseMaybeAssign();
  return this.finishNode(node, "AssignmentPattern");
};
pp$7.checkLValSimple = function(expr, bindingType, checkClashes) {
  if (bindingType === undefined)
    bindingType = BIND_NONE;
  var isBind = bindingType !== BIND_NONE;
  switch (expr.type) {
    case "Identifier":
      if (this.strict && this.reservedWordsStrictBind.test(expr.name)) {
        this.raiseRecoverable(expr.start, (isBind ? "Binding " : "Assigning to ") + expr.name + " in strict mode");
      }
      if (isBind) {
        if (bindingType === BIND_LEXICAL && expr.name === "let") {
          this.raiseRecoverable(expr.start, "let is disallowed as a lexically bound name");
        }
        if (checkClashes) {
          if (hasOwn(checkClashes, expr.name)) {
            this.raiseRecoverable(expr.start, "Argument name clash");
          }
          checkClashes[expr.name] = true;
        }
        if (bindingType !== BIND_OUTSIDE) {
          this.declareName(expr.name, bindingType, expr.start);
        }
      }
      break;
    case "ChainExpression":
      this.raiseRecoverable(expr.start, "Optional chaining cannot appear in left-hand side");
      break;
    case "MemberExpression":
      if (isBind) {
        this.raiseRecoverable(expr.start, "Binding member expression");
      }
      break;
    case "ParenthesizedExpression":
      if (isBind) {
        this.raiseRecoverable(expr.start, "Binding parenthesized expression");
      }
      return this.checkLValSimple(expr.expression, bindingType, checkClashes);
    default:
      this.raise(expr.start, (isBind ? "Binding" : "Assigning to") + " rvalue");
  }
};
pp$7.checkLValPattern = function(expr, bindingType, checkClashes) {
  if (bindingType === undefined)
    bindingType = BIND_NONE;
  switch (expr.type) {
    case "ObjectPattern":
      for (var i = 0, list = expr.properties;i < list.length; i += 1) {
        var prop = list[i];
        this.checkLValInnerPattern(prop, bindingType, checkClashes);
      }
      break;
    case "ArrayPattern":
      for (var i$1 = 0, list$1 = expr.elements;i$1 < list$1.length; i$1 += 1) {
        var elem = list$1[i$1];
        if (elem) {
          this.checkLValInnerPattern(elem, bindingType, checkClashes);
        }
      }
      break;
    default:
      this.checkLValSimple(expr, bindingType, checkClashes);
  }
};
pp$7.checkLValInnerPattern = function(expr, bindingType, checkClashes) {
  if (bindingType === undefined)
    bindingType = BIND_NONE;
  switch (expr.type) {
    case "Property":
      this.checkLValInnerPattern(expr.value, bindingType, checkClashes);
      break;
    case "AssignmentPattern":
      this.checkLValPattern(expr.left, bindingType, checkClashes);
      break;
    case "RestElement":
      this.checkLValPattern(expr.argument, bindingType, checkClashes);
      break;
    default:
      this.checkLValPattern(expr, bindingType, checkClashes);
  }
};
var TokContext = function TokContext2(token, isExpr, preserveSpace, override, generator) {
  this.token = token;
  this.isExpr = !!isExpr;
  this.preserveSpace = !!preserveSpace;
  this.override = override;
  this.generator = !!generator;
};
var types = {
  b_stat: new TokContext("{", false),
  b_expr: new TokContext("{", true),
  b_tmpl: new TokContext("${", false),
  p_stat: new TokContext("(", false),
  p_expr: new TokContext("(", true),
  q_tmpl: new TokContext("`", true, true, function(p) {
    return p.tryReadTemplateToken();
  }),
  f_stat: new TokContext("function", false),
  f_expr: new TokContext("function", true),
  f_expr_gen: new TokContext("function", true, false, null, true),
  f_gen: new TokContext("function", false, false, null, true)
};
var pp$6 = Parser.prototype;
pp$6.initialContext = function() {
  return [types.b_stat];
};
pp$6.curContext = function() {
  return this.context[this.context.length - 1];
};
pp$6.braceIsBlock = function(prevType) {
  var parent = this.curContext();
  if (parent === types.f_expr || parent === types.f_stat) {
    return true;
  }
  if (prevType === types$1.colon && (parent === types.b_stat || parent === types.b_expr)) {
    return !parent.isExpr;
  }
  if (prevType === types$1._return || prevType === types$1.name && this.exprAllowed) {
    return lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
  }
  if (prevType === types$1._else || prevType === types$1.semi || prevType === types$1.eof || prevType === types$1.parenR || prevType === types$1.arrow) {
    return true;
  }
  if (prevType === types$1.braceL) {
    return parent === types.b_stat;
  }
  if (prevType === types$1._var || prevType === types$1._const || prevType === types$1.name) {
    return false;
  }
  return !this.exprAllowed;
};
pp$6.inGeneratorContext = function() {
  for (var i = this.context.length - 1;i >= 1; i--) {
    var context = this.context[i];
    if (context.token === "function") {
      return context.generator;
    }
  }
  return false;
};
pp$6.updateContext = function(prevType) {
  var update, type = this.type;
  if (type.keyword && prevType === types$1.dot) {
    this.exprAllowed = false;
  } else if (update = type.updateContext) {
    update.call(this, prevType);
  } else {
    this.exprAllowed = type.beforeExpr;
  }
};
pp$6.overrideContext = function(tokenCtx) {
  if (this.curContext() !== tokenCtx) {
    this.context[this.context.length - 1] = tokenCtx;
  }
};
types$1.parenR.updateContext = types$1.braceR.updateContext = function() {
  if (this.context.length === 1) {
    this.exprAllowed = true;
    return;
  }
  var out = this.context.pop();
  if (out === types.b_stat && this.curContext().token === "function") {
    out = this.context.pop();
  }
  this.exprAllowed = !out.isExpr;
};
types$1.braceL.updateContext = function(prevType) {
  this.context.push(this.braceIsBlock(prevType) ? types.b_stat : types.b_expr);
  this.exprAllowed = true;
};
types$1.dollarBraceL.updateContext = function() {
  this.context.push(types.b_tmpl);
  this.exprAllowed = true;
};
types$1.parenL.updateContext = function(prevType) {
  var statementParens = prevType === types$1._if || prevType === types$1._for || prevType === types$1._with || prevType === types$1._while;
  this.context.push(statementParens ? types.p_stat : types.p_expr);
  this.exprAllowed = true;
};
types$1.incDec.updateContext = function() {};
types$1._function.updateContext = types$1._class.updateContext = function(prevType) {
  if (prevType.beforeExpr && prevType !== types$1._else && !(prevType === types$1.semi && this.curContext() !== types.p_stat) && !(prevType === types$1._return && lineBreak.test(this.input.slice(this.lastTokEnd, this.start))) && !((prevType === types$1.colon || prevType === types$1.braceL) && this.curContext() === types.b_stat)) {
    this.context.push(types.f_expr);
  } else {
    this.context.push(types.f_stat);
  }
  this.exprAllowed = false;
};
types$1.colon.updateContext = function() {
  if (this.curContext().token === "function") {
    this.context.pop();
  }
  this.exprAllowed = true;
};
types$1.backQuote.updateContext = function() {
  if (this.curContext() === types.q_tmpl) {
    this.context.pop();
  } else {
    this.context.push(types.q_tmpl);
  }
  this.exprAllowed = false;
};
types$1.star.updateContext = function(prevType) {
  if (prevType === types$1._function) {
    var index = this.context.length - 1;
    if (this.context[index] === types.f_expr) {
      this.context[index] = types.f_expr_gen;
    } else {
      this.context[index] = types.f_gen;
    }
  }
  this.exprAllowed = true;
};
types$1.name.updateContext = function(prevType) {
  var allowed = false;
  if (this.options.ecmaVersion >= 6 && prevType !== types$1.dot) {
    if (this.value === "of" && !this.exprAllowed || this.value === "yield" && this.inGeneratorContext()) {
      allowed = true;
    }
  }
  this.exprAllowed = allowed;
};
var pp$5 = Parser.prototype;
pp$5.checkPropClash = function(prop, propHash, refDestructuringErrors) {
  if (this.options.ecmaVersion >= 9 && prop.type === "SpreadElement") {
    return;
  }
  if (this.options.ecmaVersion >= 6 && (prop.computed || prop.method || prop.shorthand)) {
    return;
  }
  var key = prop.key;
  var name;
  switch (key.type) {
    case "Identifier":
      name = key.name;
      break;
    case "Literal":
      name = String(key.value);
      break;
    default:
      return;
  }
  var kind = prop.kind;
  if (this.options.ecmaVersion >= 6) {
    if (name === "__proto__" && kind === "init") {
      if (propHash.proto) {
        if (refDestructuringErrors) {
          if (refDestructuringErrors.doubleProto < 0) {
            refDestructuringErrors.doubleProto = key.start;
          }
        } else {
          this.raiseRecoverable(key.start, "Redefinition of __proto__ property");
        }
      }
      propHash.proto = true;
    }
    return;
  }
  name = "$" + name;
  var other = propHash[name];
  if (other) {
    var redefinition;
    if (kind === "init") {
      redefinition = this.strict && other.init || other.get || other.set;
    } else {
      redefinition = other.init || other[kind];
    }
    if (redefinition) {
      this.raiseRecoverable(key.start, "Redefinition of property");
    }
  } else {
    other = propHash[name] = {
      init: false,
      get: false,
      set: false
    };
  }
  other[kind] = true;
};
pp$5.parseExpression = function(forInit, refDestructuringErrors) {
  var startPos = this.start, startLoc = this.startLoc;
  var expr = this.parseMaybeAssign(forInit, refDestructuringErrors);
  if (this.type === types$1.comma) {
    var node = this.startNodeAt(startPos, startLoc);
    node.expressions = [expr];
    while (this.eat(types$1.comma)) {
      node.expressions.push(this.parseMaybeAssign(forInit, refDestructuringErrors));
    }
    return this.finishNode(node, "SequenceExpression");
  }
  return expr;
};
pp$5.parseMaybeAssign = function(forInit, refDestructuringErrors, afterLeftParse) {
  if (this.isContextual("yield")) {
    if (this.inGenerator) {
      return this.parseYield(forInit);
    } else {
      this.exprAllowed = false;
    }
  }
  var ownDestructuringErrors = false, oldParenAssign = -1, oldTrailingComma = -1, oldDoubleProto = -1;
  if (refDestructuringErrors) {
    oldParenAssign = refDestructuringErrors.parenthesizedAssign;
    oldTrailingComma = refDestructuringErrors.trailingComma;
    oldDoubleProto = refDestructuringErrors.doubleProto;
    refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = -1;
  } else {
    refDestructuringErrors = new DestructuringErrors;
    ownDestructuringErrors = true;
  }
  var startPos = this.start, startLoc = this.startLoc;
  if (this.type === types$1.parenL || this.type === types$1.name) {
    this.potentialArrowAt = this.start;
    this.potentialArrowInForAwait = forInit === "await";
  }
  var left = this.parseMaybeConditional(forInit, refDestructuringErrors);
  if (afterLeftParse) {
    left = afterLeftParse.call(this, left, startPos, startLoc);
  }
  if (this.type.isAssign) {
    var node = this.startNodeAt(startPos, startLoc);
    node.operator = this.value;
    if (this.type === types$1.eq) {
      left = this.toAssignable(left, false, refDestructuringErrors);
    }
    if (!ownDestructuringErrors) {
      refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = refDestructuringErrors.doubleProto = -1;
    }
    if (refDestructuringErrors.shorthandAssign >= left.start) {
      refDestructuringErrors.shorthandAssign = -1;
    }
    if (this.type === types$1.eq) {
      this.checkLValPattern(left);
    } else {
      this.checkLValSimple(left);
    }
    node.left = left;
    this.next();
    node.right = this.parseMaybeAssign(forInit);
    if (oldDoubleProto > -1) {
      refDestructuringErrors.doubleProto = oldDoubleProto;
    }
    return this.finishNode(node, "AssignmentExpression");
  } else {
    if (ownDestructuringErrors) {
      this.checkExpressionErrors(refDestructuringErrors, true);
    }
  }
  if (oldParenAssign > -1) {
    refDestructuringErrors.parenthesizedAssign = oldParenAssign;
  }
  if (oldTrailingComma > -1) {
    refDestructuringErrors.trailingComma = oldTrailingComma;
  }
  return left;
};
pp$5.parseMaybeConditional = function(forInit, refDestructuringErrors) {
  var startPos = this.start, startLoc = this.startLoc;
  var expr = this.parseExprOps(forInit, refDestructuringErrors);
  if (this.checkExpressionErrors(refDestructuringErrors)) {
    return expr;
  }
  if (this.eat(types$1.question)) {
    var node = this.startNodeAt(startPos, startLoc);
    node.test = expr;
    node.consequent = this.parseMaybeAssign();
    this.expect(types$1.colon);
    node.alternate = this.parseMaybeAssign(forInit);
    return this.finishNode(node, "ConditionalExpression");
  }
  return expr;
};
pp$5.parseExprOps = function(forInit, refDestructuringErrors) {
  var startPos = this.start, startLoc = this.startLoc;
  var expr = this.parseMaybeUnary(refDestructuringErrors, false, false, forInit);
  if (this.checkExpressionErrors(refDestructuringErrors)) {
    return expr;
  }
  return expr.start === startPos && expr.type === "ArrowFunctionExpression" ? expr : this.parseExprOp(expr, startPos, startLoc, -1, forInit);
};
pp$5.parseExprOp = function(left, leftStartPos, leftStartLoc, minPrec, forInit) {
  var prec = this.type.binop;
  if (prec != null && (!forInit || this.type !== types$1._in)) {
    if (prec > minPrec) {
      var logical = this.type === types$1.logicalOR || this.type === types$1.logicalAND;
      var coalesce = this.type === types$1.coalesce;
      if (coalesce) {
        prec = types$1.logicalAND.binop;
      }
      var op = this.value;
      this.next();
      var startPos = this.start, startLoc = this.startLoc;
      var right = this.parseExprOp(this.parseMaybeUnary(null, false, false, forInit), startPos, startLoc, prec, forInit);
      var node = this.buildBinary(leftStartPos, leftStartLoc, left, right, op, logical || coalesce);
      if (logical && this.type === types$1.coalesce || coalesce && (this.type === types$1.logicalOR || this.type === types$1.logicalAND)) {
        this.raiseRecoverable(this.start, "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses");
      }
      return this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec, forInit);
    }
  }
  return left;
};
pp$5.buildBinary = function(startPos, startLoc, left, right, op, logical) {
  if (right.type === "PrivateIdentifier") {
    this.raise(right.start, "Private identifier can only be left side of binary expression");
  }
  var node = this.startNodeAt(startPos, startLoc);
  node.left = left;
  node.operator = op;
  node.right = right;
  return this.finishNode(node, logical ? "LogicalExpression" : "BinaryExpression");
};
pp$5.parseMaybeUnary = function(refDestructuringErrors, sawUnary, incDec, forInit) {
  var startPos = this.start, startLoc = this.startLoc, expr;
  if (this.isContextual("await") && this.canAwait) {
    expr = this.parseAwait(forInit);
    sawUnary = true;
  } else if (this.type.prefix) {
    var node = this.startNode(), update = this.type === types$1.incDec;
    node.operator = this.value;
    node.prefix = true;
    this.next();
    node.argument = this.parseMaybeUnary(null, true, update, forInit);
    this.checkExpressionErrors(refDestructuringErrors, true);
    if (update) {
      this.checkLValSimple(node.argument);
    } else if (this.strict && node.operator === "delete" && isLocalVariableAccess(node.argument)) {
      this.raiseRecoverable(node.start, "Deleting local variable in strict mode");
    } else if (node.operator === "delete" && isPrivateFieldAccess(node.argument)) {
      this.raiseRecoverable(node.start, "Private fields can not be deleted");
    } else {
      sawUnary = true;
    }
    expr = this.finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
  } else if (!sawUnary && this.type === types$1.privateId) {
    if ((forInit || this.privateNameStack.length === 0) && this.options.checkPrivateFields) {
      this.unexpected();
    }
    expr = this.parsePrivateIdent();
    if (this.type !== types$1._in) {
      this.unexpected();
    }
  } else {
    expr = this.parseExprSubscripts(refDestructuringErrors, forInit);
    if (this.checkExpressionErrors(refDestructuringErrors)) {
      return expr;
    }
    while (this.type.postfix && !this.canInsertSemicolon()) {
      var node$1 = this.startNodeAt(startPos, startLoc);
      node$1.operator = this.value;
      node$1.prefix = false;
      node$1.argument = expr;
      this.checkLValSimple(expr);
      this.next();
      expr = this.finishNode(node$1, "UpdateExpression");
    }
  }
  if (!incDec && this.eat(types$1.starstar)) {
    if (sawUnary) {
      this.unexpected(this.lastTokStart);
    } else {
      return this.buildBinary(startPos, startLoc, expr, this.parseMaybeUnary(null, false, false, forInit), "**", false);
    }
  } else {
    return expr;
  }
};
function isLocalVariableAccess(node) {
  return node.type === "Identifier" || node.type === "ParenthesizedExpression" && isLocalVariableAccess(node.expression);
}
function isPrivateFieldAccess(node) {
  return node.type === "MemberExpression" && node.property.type === "PrivateIdentifier" || node.type === "ChainExpression" && isPrivateFieldAccess(node.expression) || node.type === "ParenthesizedExpression" && isPrivateFieldAccess(node.expression);
}
pp$5.parseExprSubscripts = function(refDestructuringErrors, forInit) {
  var startPos = this.start, startLoc = this.startLoc;
  var expr = this.parseExprAtom(refDestructuringErrors, forInit);
  if (expr.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")") {
    return expr;
  }
  var result = this.parseSubscripts(expr, startPos, startLoc, false, forInit);
  if (refDestructuringErrors && result.type === "MemberExpression") {
    if (refDestructuringErrors.parenthesizedAssign >= result.start) {
      refDestructuringErrors.parenthesizedAssign = -1;
    }
    if (refDestructuringErrors.parenthesizedBind >= result.start) {
      refDestructuringErrors.parenthesizedBind = -1;
    }
    if (refDestructuringErrors.trailingComma >= result.start) {
      refDestructuringErrors.trailingComma = -1;
    }
  }
  return result;
};
pp$5.parseSubscripts = function(base, startPos, startLoc, noCalls, forInit) {
  var maybeAsyncArrow = this.options.ecmaVersion >= 8 && base.type === "Identifier" && base.name === "async" && this.lastTokEnd === base.end && !this.canInsertSemicolon() && base.end - base.start === 5 && this.potentialArrowAt === base.start;
  var optionalChained = false;
  while (true) {
    var element = this.parseSubscript(base, startPos, startLoc, noCalls, maybeAsyncArrow, optionalChained, forInit);
    if (element.optional) {
      optionalChained = true;
    }
    if (element === base || element.type === "ArrowFunctionExpression") {
      if (optionalChained) {
        var chainNode = this.startNodeAt(startPos, startLoc);
        chainNode.expression = element;
        element = this.finishNode(chainNode, "ChainExpression");
      }
      return element;
    }
    base = element;
  }
};
pp$5.shouldParseAsyncArrow = function() {
  return !this.canInsertSemicolon() && this.eat(types$1.arrow);
};
pp$5.parseSubscriptAsyncArrow = function(startPos, startLoc, exprList, forInit) {
  return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList, true, forInit);
};
pp$5.parseSubscript = function(base, startPos, startLoc, noCalls, maybeAsyncArrow, optionalChained, forInit) {
  var optionalSupported = this.options.ecmaVersion >= 11;
  var optional = optionalSupported && this.eat(types$1.questionDot);
  if (noCalls && optional) {
    this.raise(this.lastTokStart, "Optional chaining cannot appear in the callee of new expressions");
  }
  var computed = this.eat(types$1.bracketL);
  if (computed || optional && this.type !== types$1.parenL && this.type !== types$1.backQuote || this.eat(types$1.dot)) {
    var node = this.startNodeAt(startPos, startLoc);
    node.object = base;
    if (computed) {
      node.property = this.parseExpression();
      this.expect(types$1.bracketR);
    } else if (this.type === types$1.privateId && base.type !== "Super") {
      node.property = this.parsePrivateIdent();
    } else {
      node.property = this.parseIdent(this.options.allowReserved !== "never");
    }
    node.computed = !!computed;
    if (optionalSupported) {
      node.optional = optional;
    }
    base = this.finishNode(node, "MemberExpression");
  } else if (!noCalls && this.eat(types$1.parenL)) {
    var refDestructuringErrors = new DestructuringErrors, oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
    this.yieldPos = 0;
    this.awaitPos = 0;
    this.awaitIdentPos = 0;
    var exprList = this.parseExprList(types$1.parenR, this.options.ecmaVersion >= 8, false, refDestructuringErrors);
    if (maybeAsyncArrow && !optional && this.shouldParseAsyncArrow()) {
      this.checkPatternErrors(refDestructuringErrors, false);
      this.checkYieldAwaitInDefaultParams();
      if (this.awaitIdentPos > 0) {
        this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function");
      }
      this.yieldPos = oldYieldPos;
      this.awaitPos = oldAwaitPos;
      this.awaitIdentPos = oldAwaitIdentPos;
      return this.parseSubscriptAsyncArrow(startPos, startLoc, exprList, forInit);
    }
    this.checkExpressionErrors(refDestructuringErrors, true);
    this.yieldPos = oldYieldPos || this.yieldPos;
    this.awaitPos = oldAwaitPos || this.awaitPos;
    this.awaitIdentPos = oldAwaitIdentPos || this.awaitIdentPos;
    var node$1 = this.startNodeAt(startPos, startLoc);
    node$1.callee = base;
    node$1.arguments = exprList;
    if (optionalSupported) {
      node$1.optional = optional;
    }
    base = this.finishNode(node$1, "CallExpression");
  } else if (this.type === types$1.backQuote) {
    if (optional || optionalChained) {
      this.raise(this.start, "Optional chaining cannot appear in the tag of tagged template expressions");
    }
    var node$2 = this.startNodeAt(startPos, startLoc);
    node$2.tag = base;
    node$2.quasi = this.parseTemplate({ isTagged: true });
    base = this.finishNode(node$2, "TaggedTemplateExpression");
  }
  return base;
};
pp$5.parseExprAtom = function(refDestructuringErrors, forInit, forNew) {
  if (this.type === types$1.slash) {
    this.readRegexp();
  }
  var node, canBeArrow = this.potentialArrowAt === this.start;
  switch (this.type) {
    case types$1._super:
      if (!this.allowSuper) {
        this.raise(this.start, "'super' keyword outside a method");
      }
      node = this.startNode();
      this.next();
      if (this.type === types$1.parenL && !this.allowDirectSuper) {
        this.raise(node.start, "super() call outside constructor of a subclass");
      }
      if (this.type !== types$1.dot && this.type !== types$1.bracketL && this.type !== types$1.parenL) {
        this.unexpected();
      }
      return this.finishNode(node, "Super");
    case types$1._this:
      node = this.startNode();
      this.next();
      return this.finishNode(node, "ThisExpression");
    case types$1.name:
      var startPos = this.start, startLoc = this.startLoc, containsEsc = this.containsEsc;
      var id = this.parseIdent(false);
      if (this.options.ecmaVersion >= 8 && !containsEsc && id.name === "async" && !this.canInsertSemicolon() && this.eat(types$1._function)) {
        this.overrideContext(types.f_expr);
        return this.parseFunction(this.startNodeAt(startPos, startLoc), 0, false, true, forInit);
      }
      if (canBeArrow && !this.canInsertSemicolon()) {
        if (this.eat(types$1.arrow)) {
          return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], false, forInit);
        }
        if (this.options.ecmaVersion >= 8 && id.name === "async" && this.type === types$1.name && !containsEsc && (!this.potentialArrowInForAwait || this.value !== "of" || this.containsEsc)) {
          id = this.parseIdent(false);
          if (this.canInsertSemicolon() || !this.eat(types$1.arrow)) {
            this.unexpected();
          }
          return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], true, forInit);
        }
      }
      return id;
    case types$1.regexp:
      var value = this.value;
      node = this.parseLiteral(value.value);
      node.regex = { pattern: value.pattern, flags: value.flags };
      return node;
    case types$1.num:
    case types$1.string:
      return this.parseLiteral(this.value);
    case types$1._null:
    case types$1._true:
    case types$1._false:
      node = this.startNode();
      node.value = this.type === types$1._null ? null : this.type === types$1._true;
      node.raw = this.type.keyword;
      this.next();
      return this.finishNode(node, "Literal");
    case types$1.parenL:
      var start = this.start, expr = this.parseParenAndDistinguishExpression(canBeArrow, forInit);
      if (refDestructuringErrors) {
        if (refDestructuringErrors.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(expr)) {
          refDestructuringErrors.parenthesizedAssign = start;
        }
        if (refDestructuringErrors.parenthesizedBind < 0) {
          refDestructuringErrors.parenthesizedBind = start;
        }
      }
      return expr;
    case types$1.bracketL:
      node = this.startNode();
      this.next();
      node.elements = this.parseExprList(types$1.bracketR, true, true, refDestructuringErrors);
      return this.finishNode(node, "ArrayExpression");
    case types$1.braceL:
      this.overrideContext(types.b_expr);
      return this.parseObj(false, refDestructuringErrors);
    case types$1._function:
      node = this.startNode();
      this.next();
      return this.parseFunction(node, 0);
    case types$1._class:
      return this.parseClass(this.startNode(), false);
    case types$1._new:
      return this.parseNew();
    case types$1.backQuote:
      return this.parseTemplate();
    case types$1._import:
      if (this.options.ecmaVersion >= 11) {
        return this.parseExprImport(forNew);
      } else {
        return this.unexpected();
      }
    default:
      return this.parseExprAtomDefault();
  }
};
pp$5.parseExprAtomDefault = function() {
  this.unexpected();
};
pp$5.parseExprImport = function(forNew) {
  var node = this.startNode();
  if (this.containsEsc) {
    this.raiseRecoverable(this.start, "Escape sequence in keyword import");
  }
  this.next();
  if (this.type === types$1.parenL && !forNew) {
    return this.parseDynamicImport(node);
  } else if (this.type === types$1.dot) {
    var meta = this.startNodeAt(node.start, node.loc && node.loc.start);
    meta.name = "import";
    node.meta = this.finishNode(meta, "Identifier");
    return this.parseImportMeta(node);
  } else {
    this.unexpected();
  }
};
pp$5.parseDynamicImport = function(node) {
  this.next();
  node.source = this.parseMaybeAssign();
  if (this.options.ecmaVersion >= 16) {
    if (!this.eat(types$1.parenR)) {
      this.expect(types$1.comma);
      if (!this.afterTrailingComma(types$1.parenR)) {
        node.options = this.parseMaybeAssign();
        if (!this.eat(types$1.parenR)) {
          this.expect(types$1.comma);
          if (!this.afterTrailingComma(types$1.parenR)) {
            this.unexpected();
          }
        }
      } else {
        node.options = null;
      }
    } else {
      node.options = null;
    }
  } else {
    if (!this.eat(types$1.parenR)) {
      var errorPos = this.start;
      if (this.eat(types$1.comma) && this.eat(types$1.parenR)) {
        this.raiseRecoverable(errorPos, "Trailing comma is not allowed in import()");
      } else {
        this.unexpected(errorPos);
      }
    }
  }
  return this.finishNode(node, "ImportExpression");
};
pp$5.parseImportMeta = function(node) {
  this.next();
  var containsEsc = this.containsEsc;
  node.property = this.parseIdent(true);
  if (node.property.name !== "meta") {
    this.raiseRecoverable(node.property.start, "The only valid meta property for import is 'import.meta'");
  }
  if (containsEsc) {
    this.raiseRecoverable(node.start, "'import.meta' must not contain escaped characters");
  }
  if (this.options.sourceType !== "module" && !this.options.allowImportExportEverywhere) {
    this.raiseRecoverable(node.start, "Cannot use 'import.meta' outside a module");
  }
  return this.finishNode(node, "MetaProperty");
};
pp$5.parseLiteral = function(value) {
  var node = this.startNode();
  node.value = value;
  node.raw = this.input.slice(this.start, this.end);
  if (node.raw.charCodeAt(node.raw.length - 1) === 110) {
    node.bigint = node.raw.slice(0, -1).replace(/_/g, "");
  }
  this.next();
  return this.finishNode(node, "Literal");
};
pp$5.parseParenExpression = function() {
  this.expect(types$1.parenL);
  var val = this.parseExpression();
  this.expect(types$1.parenR);
  return val;
};
pp$5.shouldParseArrow = function(exprList) {
  return !this.canInsertSemicolon();
};
pp$5.parseParenAndDistinguishExpression = function(canBeArrow, forInit) {
  var startPos = this.start, startLoc = this.startLoc, val, allowTrailingComma = this.options.ecmaVersion >= 8;
  if (this.options.ecmaVersion >= 6) {
    this.next();
    var innerStartPos = this.start, innerStartLoc = this.startLoc;
    var exprList = [], first = true, lastIsComma = false;
    var refDestructuringErrors = new DestructuringErrors, oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, spreadStart;
    this.yieldPos = 0;
    this.awaitPos = 0;
    while (this.type !== types$1.parenR) {
      first ? first = false : this.expect(types$1.comma);
      if (allowTrailingComma && this.afterTrailingComma(types$1.parenR, true)) {
        lastIsComma = true;
        break;
      } else if (this.type === types$1.ellipsis) {
        spreadStart = this.start;
        exprList.push(this.parseParenItem(this.parseRestBinding()));
        if (this.type === types$1.comma) {
          this.raiseRecoverable(this.start, "Comma is not permitted after the rest element");
        }
        break;
      } else {
        exprList.push(this.parseMaybeAssign(false, refDestructuringErrors, this.parseParenItem));
      }
    }
    var innerEndPos = this.lastTokEnd, innerEndLoc = this.lastTokEndLoc;
    this.expect(types$1.parenR);
    if (canBeArrow && this.shouldParseArrow(exprList) && this.eat(types$1.arrow)) {
      this.checkPatternErrors(refDestructuringErrors, false);
      this.checkYieldAwaitInDefaultParams();
      this.yieldPos = oldYieldPos;
      this.awaitPos = oldAwaitPos;
      return this.parseParenArrowList(startPos, startLoc, exprList, forInit);
    }
    if (!exprList.length || lastIsComma) {
      this.unexpected(this.lastTokStart);
    }
    if (spreadStart) {
      this.unexpected(spreadStart);
    }
    this.checkExpressionErrors(refDestructuringErrors, true);
    this.yieldPos = oldYieldPos || this.yieldPos;
    this.awaitPos = oldAwaitPos || this.awaitPos;
    if (exprList.length > 1) {
      val = this.startNodeAt(innerStartPos, innerStartLoc);
      val.expressions = exprList;
      this.finishNodeAt(val, "SequenceExpression", innerEndPos, innerEndLoc);
    } else {
      val = exprList[0];
    }
  } else {
    val = this.parseParenExpression();
  }
  if (this.options.preserveParens) {
    var par = this.startNodeAt(startPos, startLoc);
    par.expression = val;
    return this.finishNode(par, "ParenthesizedExpression");
  } else {
    return val;
  }
};
pp$5.parseParenItem = function(item) {
  return item;
};
pp$5.parseParenArrowList = function(startPos, startLoc, exprList, forInit) {
  return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList, false, forInit);
};
var empty = [];
pp$5.parseNew = function() {
  if (this.containsEsc) {
    this.raiseRecoverable(this.start, "Escape sequence in keyword new");
  }
  var node = this.startNode();
  this.next();
  if (this.options.ecmaVersion >= 6 && this.type === types$1.dot) {
    var meta = this.startNodeAt(node.start, node.loc && node.loc.start);
    meta.name = "new";
    node.meta = this.finishNode(meta, "Identifier");
    this.next();
    var containsEsc = this.containsEsc;
    node.property = this.parseIdent(true);
    if (node.property.name !== "target") {
      this.raiseRecoverable(node.property.start, "The only valid meta property for new is 'new.target'");
    }
    if (containsEsc) {
      this.raiseRecoverable(node.start, "'new.target' must not contain escaped characters");
    }
    if (!this.allowNewDotTarget) {
      this.raiseRecoverable(node.start, "'new.target' can only be used in functions and class static block");
    }
    return this.finishNode(node, "MetaProperty");
  }
  var startPos = this.start, startLoc = this.startLoc;
  node.callee = this.parseSubscripts(this.parseExprAtom(null, false, true), startPos, startLoc, true, false);
  if (this.eat(types$1.parenL)) {
    node.arguments = this.parseExprList(types$1.parenR, this.options.ecmaVersion >= 8, false);
  } else {
    node.arguments = empty;
  }
  return this.finishNode(node, "NewExpression");
};
pp$5.parseTemplateElement = function(ref2) {
  var isTagged = ref2.isTagged;
  var elem = this.startNode();
  if (this.type === types$1.invalidTemplate) {
    if (!isTagged) {
      this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal");
    }
    elem.value = {
      raw: this.value.replace(/\r\n?/g, `
`),
      cooked: null
    };
  } else {
    elem.value = {
      raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, `
`),
      cooked: this.value
    };
  }
  this.next();
  elem.tail = this.type === types$1.backQuote;
  return this.finishNode(elem, "TemplateElement");
};
pp$5.parseTemplate = function(ref2) {
  if (ref2 === undefined)
    ref2 = {};
  var isTagged = ref2.isTagged;
  if (isTagged === undefined)
    isTagged = false;
  var node = this.startNode();
  this.next();
  node.expressions = [];
  var curElt = this.parseTemplateElement({ isTagged });
  node.quasis = [curElt];
  while (!curElt.tail) {
    if (this.type === types$1.eof) {
      this.raise(this.pos, "Unterminated template literal");
    }
    this.expect(types$1.dollarBraceL);
    node.expressions.push(this.parseExpression());
    this.expect(types$1.braceR);
    node.quasis.push(curElt = this.parseTemplateElement({ isTagged }));
  }
  this.next();
  return this.finishNode(node, "TemplateLiteral");
};
pp$5.isAsyncProp = function(prop) {
  return !prop.computed && prop.key.type === "Identifier" && prop.key.name === "async" && (this.type === types$1.name || this.type === types$1.num || this.type === types$1.string || this.type === types$1.bracketL || this.type.keyword || this.options.ecmaVersion >= 9 && this.type === types$1.star) && !lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
};
pp$5.parseObj = function(isPattern, refDestructuringErrors) {
  var node = this.startNode(), first = true, propHash = {};
  node.properties = [];
  this.next();
  while (!this.eat(types$1.braceR)) {
    if (!first) {
      this.expect(types$1.comma);
      if (this.options.ecmaVersion >= 5 && this.afterTrailingComma(types$1.braceR)) {
        break;
      }
    } else {
      first = false;
    }
    var prop = this.parseProperty(isPattern, refDestructuringErrors);
    if (!isPattern) {
      this.checkPropClash(prop, propHash, refDestructuringErrors);
    }
    node.properties.push(prop);
  }
  return this.finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression");
};
pp$5.parseProperty = function(isPattern, refDestructuringErrors) {
  var prop = this.startNode(), isGenerator, isAsync, startPos, startLoc;
  if (this.options.ecmaVersion >= 9 && this.eat(types$1.ellipsis)) {
    if (isPattern) {
      prop.argument = this.parseIdent(false);
      if (this.type === types$1.comma) {
        this.raiseRecoverable(this.start, "Comma is not permitted after the rest element");
      }
      return this.finishNode(prop, "RestElement");
    }
    prop.argument = this.parseMaybeAssign(false, refDestructuringErrors);
    if (this.type === types$1.comma && refDestructuringErrors && refDestructuringErrors.trailingComma < 0) {
      refDestructuringErrors.trailingComma = this.start;
    }
    return this.finishNode(prop, "SpreadElement");
  }
  if (this.options.ecmaVersion >= 6) {
    prop.method = false;
    prop.shorthand = false;
    if (isPattern || refDestructuringErrors) {
      startPos = this.start;
      startLoc = this.startLoc;
    }
    if (!isPattern) {
      isGenerator = this.eat(types$1.star);
    }
  }
  var containsEsc = this.containsEsc;
  this.parsePropertyName(prop);
  if (!isPattern && !containsEsc && this.options.ecmaVersion >= 8 && !isGenerator && this.isAsyncProp(prop)) {
    isAsync = true;
    isGenerator = this.options.ecmaVersion >= 9 && this.eat(types$1.star);
    this.parsePropertyName(prop);
  } else {
    isAsync = false;
  }
  this.parsePropertyValue(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc);
  return this.finishNode(prop, "Property");
};
pp$5.parseGetterSetter = function(prop) {
  var kind = prop.key.name;
  this.parsePropertyName(prop);
  prop.value = this.parseMethod(false);
  prop.kind = kind;
  var paramCount = prop.kind === "get" ? 0 : 1;
  if (prop.value.params.length !== paramCount) {
    var start = prop.value.start;
    if (prop.kind === "get") {
      this.raiseRecoverable(start, "getter should have no params");
    } else {
      this.raiseRecoverable(start, "setter should have exactly one param");
    }
  } else {
    if (prop.kind === "set" && prop.value.params[0].type === "RestElement") {
      this.raiseRecoverable(prop.value.params[0].start, "Setter cannot use rest params");
    }
  }
};
pp$5.parsePropertyValue = function(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc) {
  if ((isGenerator || isAsync) && this.type === types$1.colon) {
    this.unexpected();
  }
  if (this.eat(types$1.colon)) {
    prop.value = isPattern ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(false, refDestructuringErrors);
    prop.kind = "init";
  } else if (this.options.ecmaVersion >= 6 && this.type === types$1.parenL) {
    if (isPattern) {
      this.unexpected();
    }
    prop.method = true;
    prop.value = this.parseMethod(isGenerator, isAsync);
    prop.kind = "init";
  } else if (!isPattern && !containsEsc && this.options.ecmaVersion >= 5 && !prop.computed && prop.key.type === "Identifier" && (prop.key.name === "get" || prop.key.name === "set") && (this.type !== types$1.comma && this.type !== types$1.braceR && this.type !== types$1.eq)) {
    if (isGenerator || isAsync) {
      this.unexpected();
    }
    this.parseGetterSetter(prop);
  } else if (this.options.ecmaVersion >= 6 && !prop.computed && prop.key.type === "Identifier") {
    if (isGenerator || isAsync) {
      this.unexpected();
    }
    this.checkUnreserved(prop.key);
    if (prop.key.name === "await" && !this.awaitIdentPos) {
      this.awaitIdentPos = startPos;
    }
    if (isPattern) {
      prop.value = this.parseMaybeDefault(startPos, startLoc, this.copyNode(prop.key));
    } else if (this.type === types$1.eq && refDestructuringErrors) {
      if (refDestructuringErrors.shorthandAssign < 0) {
        refDestructuringErrors.shorthandAssign = this.start;
      }
      prop.value = this.parseMaybeDefault(startPos, startLoc, this.copyNode(prop.key));
    } else {
      prop.value = this.copyNode(prop.key);
    }
    prop.kind = "init";
    prop.shorthand = true;
  } else {
    this.unexpected();
  }
};
pp$5.parsePropertyName = function(prop) {
  if (this.options.ecmaVersion >= 6) {
    if (this.eat(types$1.bracketL)) {
      prop.computed = true;
      prop.key = this.parseMaybeAssign();
      this.expect(types$1.bracketR);
      return prop.key;
    } else {
      prop.computed = false;
    }
  }
  return prop.key = this.type === types$1.num || this.type === types$1.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never");
};
pp$5.initFunction = function(node) {
  node.id = null;
  if (this.options.ecmaVersion >= 6) {
    node.generator = node.expression = false;
  }
  if (this.options.ecmaVersion >= 8) {
    node.async = false;
  }
};
pp$5.parseMethod = function(isGenerator, isAsync, allowDirectSuper) {
  var node = this.startNode(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
  this.initFunction(node);
  if (this.options.ecmaVersion >= 6) {
    node.generator = isGenerator;
  }
  if (this.options.ecmaVersion >= 8) {
    node.async = !!isAsync;
  }
  this.yieldPos = 0;
  this.awaitPos = 0;
  this.awaitIdentPos = 0;
  this.enterScope(functionFlags(isAsync, node.generator) | SCOPE_SUPER | (allowDirectSuper ? SCOPE_DIRECT_SUPER : 0));
  this.expect(types$1.parenL);
  node.params = this.parseBindingList(types$1.parenR, false, this.options.ecmaVersion >= 8);
  this.checkYieldAwaitInDefaultParams();
  this.parseFunctionBody(node, false, true, false);
  this.yieldPos = oldYieldPos;
  this.awaitPos = oldAwaitPos;
  this.awaitIdentPos = oldAwaitIdentPos;
  return this.finishNode(node, "FunctionExpression");
};
pp$5.parseArrowExpression = function(node, params, isAsync, forInit) {
  var oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
  this.enterScope(functionFlags(isAsync, false) | SCOPE_ARROW);
  this.initFunction(node);
  if (this.options.ecmaVersion >= 8) {
    node.async = !!isAsync;
  }
  this.yieldPos = 0;
  this.awaitPos = 0;
  this.awaitIdentPos = 0;
  node.params = this.toAssignableList(params, true);
  this.parseFunctionBody(node, true, false, forInit);
  this.yieldPos = oldYieldPos;
  this.awaitPos = oldAwaitPos;
  this.awaitIdentPos = oldAwaitIdentPos;
  return this.finishNode(node, "ArrowFunctionExpression");
};
pp$5.parseFunctionBody = function(node, isArrowFunction, isMethod, forInit) {
  var isExpression = isArrowFunction && this.type !== types$1.braceL;
  var oldStrict = this.strict, useStrict = false;
  if (isExpression) {
    node.body = this.parseMaybeAssign(forInit);
    node.expression = true;
    this.checkParams(node, false);
  } else {
    var nonSimple = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(node.params);
    if (!oldStrict || nonSimple) {
      useStrict = this.strictDirective(this.end);
      if (useStrict && nonSimple) {
        this.raiseRecoverable(node.start, "Illegal 'use strict' directive in function with non-simple parameter list");
      }
    }
    var oldLabels = this.labels;
    this.labels = [];
    if (useStrict) {
      this.strict = true;
    }
    this.checkParams(node, !oldStrict && !useStrict && !isArrowFunction && !isMethod && this.isSimpleParamList(node.params));
    if (this.strict && node.id) {
      this.checkLValSimple(node.id, BIND_OUTSIDE);
    }
    node.body = this.parseBlock(false, undefined, useStrict && !oldStrict);
    node.expression = false;
    this.adaptDirectivePrologue(node.body.body);
    this.labels = oldLabels;
  }
  this.exitScope();
};
pp$5.isSimpleParamList = function(params) {
  for (var i = 0, list = params;i < list.length; i += 1) {
    var param = list[i];
    if (param.type !== "Identifier") {
      return false;
    }
  }
  return true;
};
pp$5.checkParams = function(node, allowDuplicates) {
  var nameHash = Object.create(null);
  for (var i = 0, list = node.params;i < list.length; i += 1) {
    var param = list[i];
    this.checkLValInnerPattern(param, BIND_VAR, allowDuplicates ? null : nameHash);
  }
};
pp$5.parseExprList = function(close, allowTrailingComma, allowEmpty, refDestructuringErrors) {
  var elts = [], first = true;
  while (!this.eat(close)) {
    if (!first) {
      this.expect(types$1.comma);
      if (allowTrailingComma && this.afterTrailingComma(close)) {
        break;
      }
    } else {
      first = false;
    }
    var elt = undefined;
    if (allowEmpty && this.type === types$1.comma) {
      elt = null;
    } else if (this.type === types$1.ellipsis) {
      elt = this.parseSpread(refDestructuringErrors);
      if (refDestructuringErrors && this.type === types$1.comma && refDestructuringErrors.trailingComma < 0) {
        refDestructuringErrors.trailingComma = this.start;
      }
    } else {
      elt = this.parseMaybeAssign(false, refDestructuringErrors);
    }
    elts.push(elt);
  }
  return elts;
};
pp$5.checkUnreserved = function(ref2) {
  var start = ref2.start;
  var end = ref2.end;
  var name = ref2.name;
  if (this.inGenerator && name === "yield") {
    this.raiseRecoverable(start, "Cannot use 'yield' as identifier inside a generator");
  }
  if (this.inAsync && name === "await") {
    this.raiseRecoverable(start, "Cannot use 'await' as identifier inside an async function");
  }
  if (!(this.currentThisScope().flags & SCOPE_VAR) && name === "arguments") {
    this.raiseRecoverable(start, "Cannot use 'arguments' in class field initializer");
  }
  if (this.inClassStaticBlock && (name === "arguments" || name === "await")) {
    this.raise(start, "Cannot use " + name + " in class static initialization block");
  }
  if (this.keywords.test(name)) {
    this.raise(start, "Unexpected keyword '" + name + "'");
  }
  if (this.options.ecmaVersion < 6 && this.input.slice(start, end).indexOf("\\") !== -1) {
    return;
  }
  var re = this.strict ? this.reservedWordsStrict : this.reservedWords;
  if (re.test(name)) {
    if (!this.inAsync && name === "await") {
      this.raiseRecoverable(start, "Cannot use keyword 'await' outside an async function");
    }
    this.raiseRecoverable(start, "The keyword '" + name + "' is reserved");
  }
};
pp$5.parseIdent = function(liberal) {
  var node = this.parseIdentNode();
  this.next(!!liberal);
  this.finishNode(node, "Identifier");
  if (!liberal) {
    this.checkUnreserved(node);
    if (node.name === "await" && !this.awaitIdentPos) {
      this.awaitIdentPos = node.start;
    }
  }
  return node;
};
pp$5.parseIdentNode = function() {
  var node = this.startNode();
  if (this.type === types$1.name) {
    node.name = this.value;
  } else if (this.type.keyword) {
    node.name = this.type.keyword;
    if ((node.name === "class" || node.name === "function") && (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46)) {
      this.context.pop();
    }
    this.type = types$1.name;
  } else {
    this.unexpected();
  }
  return node;
};
pp$5.parsePrivateIdent = function() {
  var node = this.startNode();
  if (this.type === types$1.privateId) {
    node.name = this.value;
  } else {
    this.unexpected();
  }
  this.next();
  this.finishNode(node, "PrivateIdentifier");
  if (this.options.checkPrivateFields) {
    if (this.privateNameStack.length === 0) {
      this.raise(node.start, "Private field '#" + node.name + "' must be declared in an enclosing class");
    } else {
      this.privateNameStack[this.privateNameStack.length - 1].used.push(node);
    }
  }
  return node;
};
pp$5.parseYield = function(forInit) {
  if (!this.yieldPos) {
    this.yieldPos = this.start;
  }
  var node = this.startNode();
  this.next();
  if (this.type === types$1.semi || this.canInsertSemicolon() || this.type !== types$1.star && !this.type.startsExpr) {
    node.delegate = false;
    node.argument = null;
  } else {
    node.delegate = this.eat(types$1.star);
    node.argument = this.parseMaybeAssign(forInit);
  }
  return this.finishNode(node, "YieldExpression");
};
pp$5.parseAwait = function(forInit) {
  if (!this.awaitPos) {
    this.awaitPos = this.start;
  }
  var node = this.startNode();
  this.next();
  node.argument = this.parseMaybeUnary(null, true, false, forInit);
  return this.finishNode(node, "AwaitExpression");
};
var pp$4 = Parser.prototype;
pp$4.raise = function(pos, message) {
  var loc = getLineInfo(this.input, pos);
  message += " (" + loc.line + ":" + loc.column + ")";
  if (this.sourceFile) {
    message += " in " + this.sourceFile;
  }
  var err = new SyntaxError(message);
  err.pos = pos;
  err.loc = loc;
  err.raisedAt = this.pos;
  throw err;
};
pp$4.raiseRecoverable = pp$4.raise;
pp$4.curPosition = function() {
  if (this.options.locations) {
    return new Position(this.curLine, this.pos - this.lineStart);
  }
};
var pp$3 = Parser.prototype;
var Scope = function Scope2(flags) {
  this.flags = flags;
  this.var = [];
  this.lexical = [];
  this.functions = [];
};
pp$3.enterScope = function(flags) {
  this.scopeStack.push(new Scope(flags));
};
pp$3.exitScope = function() {
  this.scopeStack.pop();
};
pp$3.treatFunctionsAsVarInScope = function(scope) {
  return scope.flags & SCOPE_FUNCTION || !this.inModule && scope.flags & SCOPE_TOP;
};
pp$3.declareName = function(name, bindingType, pos) {
  var redeclared = false;
  if (bindingType === BIND_LEXICAL) {
    var scope = this.currentScope();
    redeclared = scope.lexical.indexOf(name) > -1 || scope.functions.indexOf(name) > -1 || scope.var.indexOf(name) > -1;
    scope.lexical.push(name);
    if (this.inModule && scope.flags & SCOPE_TOP) {
      delete this.undefinedExports[name];
    }
  } else if (bindingType === BIND_SIMPLE_CATCH) {
    var scope$1 = this.currentScope();
    scope$1.lexical.push(name);
  } else if (bindingType === BIND_FUNCTION) {
    var scope$2 = this.currentScope();
    if (this.treatFunctionsAsVar) {
      redeclared = scope$2.lexical.indexOf(name) > -1;
    } else {
      redeclared = scope$2.lexical.indexOf(name) > -1 || scope$2.var.indexOf(name) > -1;
    }
    scope$2.functions.push(name);
  } else {
    for (var i = this.scopeStack.length - 1;i >= 0; --i) {
      var scope$3 = this.scopeStack[i];
      if (scope$3.lexical.indexOf(name) > -1 && !(scope$3.flags & SCOPE_SIMPLE_CATCH && scope$3.lexical[0] === name) || !this.treatFunctionsAsVarInScope(scope$3) && scope$3.functions.indexOf(name) > -1) {
        redeclared = true;
        break;
      }
      scope$3.var.push(name);
      if (this.inModule && scope$3.flags & SCOPE_TOP) {
        delete this.undefinedExports[name];
      }
      if (scope$3.flags & SCOPE_VAR) {
        break;
      }
    }
  }
  if (redeclared) {
    this.raiseRecoverable(pos, "Identifier '" + name + "' has already been declared");
  }
};
pp$3.checkLocalExport = function(id) {
  if (this.scopeStack[0].lexical.indexOf(id.name) === -1 && this.scopeStack[0].var.indexOf(id.name) === -1) {
    this.undefinedExports[id.name] = id;
  }
};
pp$3.currentScope = function() {
  return this.scopeStack[this.scopeStack.length - 1];
};
pp$3.currentVarScope = function() {
  for (var i = this.scopeStack.length - 1;; i--) {
    var scope = this.scopeStack[i];
    if (scope.flags & (SCOPE_VAR | SCOPE_CLASS_FIELD_INIT | SCOPE_CLASS_STATIC_BLOCK)) {
      return scope;
    }
  }
};
pp$3.currentThisScope = function() {
  for (var i = this.scopeStack.length - 1;; i--) {
    var scope = this.scopeStack[i];
    if (scope.flags & (SCOPE_VAR | SCOPE_CLASS_FIELD_INIT | SCOPE_CLASS_STATIC_BLOCK) && !(scope.flags & SCOPE_ARROW)) {
      return scope;
    }
  }
};
var Node = function Node2(parser, pos, loc) {
  this.type = "";
  this.start = pos;
  this.end = 0;
  if (parser.options.locations) {
    this.loc = new SourceLocation(parser, loc);
  }
  if (parser.options.directSourceFile) {
    this.sourceFile = parser.options.directSourceFile;
  }
  if (parser.options.ranges) {
    this.range = [pos, 0];
  }
};
var pp$2 = Parser.prototype;
pp$2.startNode = function() {
  return new Node(this, this.start, this.startLoc);
};
pp$2.startNodeAt = function(pos, loc) {
  return new Node(this, pos, loc);
};
function finishNodeAt(node, type, pos, loc) {
  node.type = type;
  node.end = pos;
  if (this.options.locations) {
    node.loc.end = loc;
  }
  if (this.options.ranges) {
    node.range[1] = pos;
  }
  return node;
}
pp$2.finishNode = function(node, type) {
  return finishNodeAt.call(this, node, type, this.lastTokEnd, this.lastTokEndLoc);
};
pp$2.finishNodeAt = function(node, type, pos, loc) {
  return finishNodeAt.call(this, node, type, pos, loc);
};
pp$2.copyNode = function(node) {
  var newNode = new Node(this, node.start, this.startLoc);
  for (var prop in node) {
    newNode[prop] = node[prop];
  }
  return newNode;
};
var scriptValuesAddedInUnicode = "Gara Garay Gukh Gurung_Khema Hrkt Katakana_Or_Hiragana Kawi Kirat_Rai Krai Nag_Mundari Nagm Ol_Onal Onao Sunu Sunuwar Todhri Todr Tulu_Tigalari Tutg Unknown Zzzz";
var ecma9BinaryProperties = "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS";
var ecma10BinaryProperties = ecma9BinaryProperties + " Extended_Pictographic";
var ecma11BinaryProperties = ecma10BinaryProperties;
var ecma12BinaryProperties = ecma11BinaryProperties + " EBase EComp EMod EPres ExtPict";
var ecma13BinaryProperties = ecma12BinaryProperties;
var ecma14BinaryProperties = ecma13BinaryProperties;
var unicodeBinaryProperties = {
  9: ecma9BinaryProperties,
  10: ecma10BinaryProperties,
  11: ecma11BinaryProperties,
  12: ecma12BinaryProperties,
  13: ecma13BinaryProperties,
  14: ecma14BinaryProperties
};
var ecma14BinaryPropertiesOfStrings = "Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Flag_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence RGI_Emoji";
var unicodeBinaryPropertiesOfStrings = {
  9: "",
  10: "",
  11: "",
  12: "",
  13: "",
  14: ecma14BinaryPropertiesOfStrings
};
var unicodeGeneralCategoryValues = "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu";
var ecma9ScriptValues = "Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb";
var ecma10ScriptValues = ecma9ScriptValues + " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd";
var ecma11ScriptValues = ecma10ScriptValues + " Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho";
var ecma12ScriptValues = ecma11ScriptValues + " Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi";
var ecma13ScriptValues = ecma12ScriptValues + " Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith";
var ecma14ScriptValues = ecma13ScriptValues + " " + scriptValuesAddedInUnicode;
var unicodeScriptValues = {
  9: ecma9ScriptValues,
  10: ecma10ScriptValues,
  11: ecma11ScriptValues,
  12: ecma12ScriptValues,
  13: ecma13ScriptValues,
  14: ecma14ScriptValues
};
var data = {};
function buildUnicodeData(ecmaVersion) {
  var d = data[ecmaVersion] = {
    binary: wordsRegexp(unicodeBinaryProperties[ecmaVersion] + " " + unicodeGeneralCategoryValues),
    binaryOfStrings: wordsRegexp(unicodeBinaryPropertiesOfStrings[ecmaVersion]),
    nonBinary: {
      General_Category: wordsRegexp(unicodeGeneralCategoryValues),
      Script: wordsRegexp(unicodeScriptValues[ecmaVersion])
    }
  };
  d.nonBinary.Script_Extensions = d.nonBinary.Script;
  d.nonBinary.gc = d.nonBinary.General_Category;
  d.nonBinary.sc = d.nonBinary.Script;
  d.nonBinary.scx = d.nonBinary.Script_Extensions;
}
for (i = 0, list = [9, 10, 11, 12, 13, 14];i < list.length; i += 1) {
  ecmaVersion = list[i];
  buildUnicodeData(ecmaVersion);
}
var ecmaVersion;
var i;
var list;
var pp$1 = Parser.prototype;
var BranchID = function BranchID2(parent, base) {
  this.parent = parent;
  this.base = base || this;
};
BranchID.prototype.separatedFrom = function separatedFrom(alt) {
  for (var self = this;self; self = self.parent) {
    for (var other = alt;other; other = other.parent) {
      if (self.base === other.base && self !== other) {
        return true;
      }
    }
  }
  return false;
};
BranchID.prototype.sibling = function sibling() {
  return new BranchID(this.parent, this.base);
};
var RegExpValidationState = function RegExpValidationState2(parser) {
  this.parser = parser;
  this.validFlags = "gim" + (parser.options.ecmaVersion >= 6 ? "uy" : "") + (parser.options.ecmaVersion >= 9 ? "s" : "") + (parser.options.ecmaVersion >= 13 ? "d" : "") + (parser.options.ecmaVersion >= 15 ? "v" : "");
  this.unicodeProperties = data[parser.options.ecmaVersion >= 14 ? 14 : parser.options.ecmaVersion];
  this.source = "";
  this.flags = "";
  this.start = 0;
  this.switchU = false;
  this.switchV = false;
  this.switchN = false;
  this.pos = 0;
  this.lastIntValue = 0;
  this.lastStringValue = "";
  this.lastAssertionIsQuantifiable = false;
  this.numCapturingParens = 0;
  this.maxBackReference = 0;
  this.groupNames = Object.create(null);
  this.backReferenceNames = [];
  this.branchID = null;
};
RegExpValidationState.prototype.reset = function reset(start, pattern, flags) {
  var unicodeSets = flags.indexOf("v") !== -1;
  var unicode = flags.indexOf("u") !== -1;
  this.start = start | 0;
  this.source = pattern + "";
  this.flags = flags;
  if (unicodeSets && this.parser.options.ecmaVersion >= 15) {
    this.switchU = true;
    this.switchV = true;
    this.switchN = true;
  } else {
    this.switchU = unicode && this.parser.options.ecmaVersion >= 6;
    this.switchV = false;
    this.switchN = unicode && this.parser.options.ecmaVersion >= 9;
  }
};
RegExpValidationState.prototype.raise = function raise(message) {
  this.parser.raiseRecoverable(this.start, "Invalid regular expression: /" + this.source + "/: " + message);
};
RegExpValidationState.prototype.at = function at(i2, forceU) {
  if (forceU === undefined)
    forceU = false;
  var s = this.source;
  var l = s.length;
  if (i2 >= l) {
    return -1;
  }
  var c = s.charCodeAt(i2);
  if (!(forceU || this.switchU) || c <= 55295 || c >= 57344 || i2 + 1 >= l) {
    return c;
  }
  var next = s.charCodeAt(i2 + 1);
  return next >= 56320 && next <= 57343 ? (c << 10) + next - 56613888 : c;
};
RegExpValidationState.prototype.nextIndex = function nextIndex(i2, forceU) {
  if (forceU === undefined)
    forceU = false;
  var s = this.source;
  var l = s.length;
  if (i2 >= l) {
    return l;
  }
  var c = s.charCodeAt(i2), next;
  if (!(forceU || this.switchU) || c <= 55295 || c >= 57344 || i2 + 1 >= l || (next = s.charCodeAt(i2 + 1)) < 56320 || next > 57343) {
    return i2 + 1;
  }
  return i2 + 2;
};
RegExpValidationState.prototype.current = function current(forceU) {
  if (forceU === undefined)
    forceU = false;
  return this.at(this.pos, forceU);
};
RegExpValidationState.prototype.lookahead = function lookahead(forceU) {
  if (forceU === undefined)
    forceU = false;
  return this.at(this.nextIndex(this.pos, forceU), forceU);
};
RegExpValidationState.prototype.advance = function advance(forceU) {
  if (forceU === undefined)
    forceU = false;
  this.pos = this.nextIndex(this.pos, forceU);
};
RegExpValidationState.prototype.eat = function eat(ch, forceU) {
  if (forceU === undefined)
    forceU = false;
  if (this.current(forceU) === ch) {
    this.advance(forceU);
    return true;
  }
  return false;
};
RegExpValidationState.prototype.eatChars = function eatChars(chs, forceU) {
  if (forceU === undefined)
    forceU = false;
  var pos = this.pos;
  for (var i2 = 0, list2 = chs;i2 < list2.length; i2 += 1) {
    var ch = list2[i2];
    var current2 = this.at(pos, forceU);
    if (current2 === -1 || current2 !== ch) {
      return false;
    }
    pos = this.nextIndex(pos, forceU);
  }
  this.pos = pos;
  return true;
};
pp$1.validateRegExpFlags = function(state) {
  var validFlags = state.validFlags;
  var flags = state.flags;
  var u = false;
  var v = false;
  for (var i2 = 0;i2 < flags.length; i2++) {
    var flag = flags.charAt(i2);
    if (validFlags.indexOf(flag) === -1) {
      this.raise(state.start, "Invalid regular expression flag");
    }
    if (flags.indexOf(flag, i2 + 1) > -1) {
      this.raise(state.start, "Duplicate regular expression flag");
    }
    if (flag === "u") {
      u = true;
    }
    if (flag === "v") {
      v = true;
    }
  }
  if (this.options.ecmaVersion >= 15 && u && v) {
    this.raise(state.start, "Invalid regular expression flag");
  }
};
function hasProp(obj) {
  for (var _ in obj) {
    return true;
  }
  return false;
}
pp$1.validateRegExpPattern = function(state) {
  this.regexp_pattern(state);
  if (!state.switchN && this.options.ecmaVersion >= 9 && hasProp(state.groupNames)) {
    state.switchN = true;
    this.regexp_pattern(state);
  }
};
pp$1.regexp_pattern = function(state) {
  state.pos = 0;
  state.lastIntValue = 0;
  state.lastStringValue = "";
  state.lastAssertionIsQuantifiable = false;
  state.numCapturingParens = 0;
  state.maxBackReference = 0;
  state.groupNames = Object.create(null);
  state.backReferenceNames.length = 0;
  state.branchID = null;
  this.regexp_disjunction(state);
  if (state.pos !== state.source.length) {
    if (state.eat(41)) {
      state.raise("Unmatched ')'");
    }
    if (state.eat(93) || state.eat(125)) {
      state.raise("Lone quantifier brackets");
    }
  }
  if (state.maxBackReference > state.numCapturingParens) {
    state.raise("Invalid escape");
  }
  for (var i2 = 0, list2 = state.backReferenceNames;i2 < list2.length; i2 += 1) {
    var name = list2[i2];
    if (!state.groupNames[name]) {
      state.raise("Invalid named capture referenced");
    }
  }
};
pp$1.regexp_disjunction = function(state) {
  var trackDisjunction = this.options.ecmaVersion >= 16;
  if (trackDisjunction) {
    state.branchID = new BranchID(state.branchID, null);
  }
  this.regexp_alternative(state);
  while (state.eat(124)) {
    if (trackDisjunction) {
      state.branchID = state.branchID.sibling();
    }
    this.regexp_alternative(state);
  }
  if (trackDisjunction) {
    state.branchID = state.branchID.parent;
  }
  if (this.regexp_eatQuantifier(state, true)) {
    state.raise("Nothing to repeat");
  }
  if (state.eat(123)) {
    state.raise("Lone quantifier brackets");
  }
};
pp$1.regexp_alternative = function(state) {
  while (state.pos < state.source.length && this.regexp_eatTerm(state)) {}
};
pp$1.regexp_eatTerm = function(state) {
  if (this.regexp_eatAssertion(state)) {
    if (state.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(state)) {
      if (state.switchU) {
        state.raise("Invalid quantifier");
      }
    }
    return true;
  }
  if (state.switchU ? this.regexp_eatAtom(state) : this.regexp_eatExtendedAtom(state)) {
    this.regexp_eatQuantifier(state);
    return true;
  }
  return false;
};
pp$1.regexp_eatAssertion = function(state) {
  var start = state.pos;
  state.lastAssertionIsQuantifiable = false;
  if (state.eat(94) || state.eat(36)) {
    return true;
  }
  if (state.eat(92)) {
    if (state.eat(66) || state.eat(98)) {
      return true;
    }
    state.pos = start;
  }
  if (state.eat(40) && state.eat(63)) {
    var lookbehind = false;
    if (this.options.ecmaVersion >= 9) {
      lookbehind = state.eat(60);
    }
    if (state.eat(61) || state.eat(33)) {
      this.regexp_disjunction(state);
      if (!state.eat(41)) {
        state.raise("Unterminated group");
      }
      state.lastAssertionIsQuantifiable = !lookbehind;
      return true;
    }
  }
  state.pos = start;
  return false;
};
pp$1.regexp_eatQuantifier = function(state, noError) {
  if (noError === undefined)
    noError = false;
  if (this.regexp_eatQuantifierPrefix(state, noError)) {
    state.eat(63);
    return true;
  }
  return false;
};
pp$1.regexp_eatQuantifierPrefix = function(state, noError) {
  return state.eat(42) || state.eat(43) || state.eat(63) || this.regexp_eatBracedQuantifier(state, noError);
};
pp$1.regexp_eatBracedQuantifier = function(state, noError) {
  var start = state.pos;
  if (state.eat(123)) {
    var min = 0, max = -1;
    if (this.regexp_eatDecimalDigits(state)) {
      min = state.lastIntValue;
      if (state.eat(44) && this.regexp_eatDecimalDigits(state)) {
        max = state.lastIntValue;
      }
      if (state.eat(125)) {
        if (max !== -1 && max < min && !noError) {
          state.raise("numbers out of order in {} quantifier");
        }
        return true;
      }
    }
    if (state.switchU && !noError) {
      state.raise("Incomplete quantifier");
    }
    state.pos = start;
  }
  return false;
};
pp$1.regexp_eatAtom = function(state) {
  return this.regexp_eatPatternCharacters(state) || state.eat(46) || this.regexp_eatReverseSolidusAtomEscape(state) || this.regexp_eatCharacterClass(state) || this.regexp_eatUncapturingGroup(state) || this.regexp_eatCapturingGroup(state);
};
pp$1.regexp_eatReverseSolidusAtomEscape = function(state) {
  var start = state.pos;
  if (state.eat(92)) {
    if (this.regexp_eatAtomEscape(state)) {
      return true;
    }
    state.pos = start;
  }
  return false;
};
pp$1.regexp_eatUncapturingGroup = function(state) {
  var start = state.pos;
  if (state.eat(40)) {
    if (state.eat(63)) {
      if (this.options.ecmaVersion >= 16) {
        var addModifiers = this.regexp_eatModifiers(state);
        var hasHyphen = state.eat(45);
        if (addModifiers || hasHyphen) {
          for (var i2 = 0;i2 < addModifiers.length; i2++) {
            var modifier = addModifiers.charAt(i2);
            if (addModifiers.indexOf(modifier, i2 + 1) > -1) {
              state.raise("Duplicate regular expression modifiers");
            }
          }
          if (hasHyphen) {
            var removeModifiers = this.regexp_eatModifiers(state);
            if (!addModifiers && !removeModifiers && state.current() === 58) {
              state.raise("Invalid regular expression modifiers");
            }
            for (var i$1 = 0;i$1 < removeModifiers.length; i$1++) {
              var modifier$1 = removeModifiers.charAt(i$1);
              if (removeModifiers.indexOf(modifier$1, i$1 + 1) > -1 || addModifiers.indexOf(modifier$1) > -1) {
                state.raise("Duplicate regular expression modifiers");
              }
            }
          }
        }
      }
      if (state.eat(58)) {
        this.regexp_disjunction(state);
        if (state.eat(41)) {
          return true;
        }
        state.raise("Unterminated group");
      }
    }
    state.pos = start;
  }
  return false;
};
pp$1.regexp_eatCapturingGroup = function(state) {
  if (state.eat(40)) {
    if (this.options.ecmaVersion >= 9) {
      this.regexp_groupSpecifier(state);
    } else if (state.current() === 63) {
      state.raise("Invalid group");
    }
    this.regexp_disjunction(state);
    if (state.eat(41)) {
      state.numCapturingParens += 1;
      return true;
    }
    state.raise("Unterminated group");
  }
  return false;
};
pp$1.regexp_eatModifiers = function(state) {
  var modifiers = "";
  var ch = 0;
  while ((ch = state.current()) !== -1 && isRegularExpressionModifier(ch)) {
    modifiers += codePointToString(ch);
    state.advance();
  }
  return modifiers;
};
function isRegularExpressionModifier(ch) {
  return ch === 105 || ch === 109 || ch === 115;
}
pp$1.regexp_eatExtendedAtom = function(state) {
  return state.eat(46) || this.regexp_eatReverseSolidusAtomEscape(state) || this.regexp_eatCharacterClass(state) || this.regexp_eatUncapturingGroup(state) || this.regexp_eatCapturingGroup(state) || this.regexp_eatInvalidBracedQuantifier(state) || this.regexp_eatExtendedPatternCharacter(state);
};
pp$1.regexp_eatInvalidBracedQuantifier = function(state) {
  if (this.regexp_eatBracedQuantifier(state, true)) {
    state.raise("Nothing to repeat");
  }
  return false;
};
pp$1.regexp_eatSyntaxCharacter = function(state) {
  var ch = state.current();
  if (isSyntaxCharacter(ch)) {
    state.lastIntValue = ch;
    state.advance();
    return true;
  }
  return false;
};
function isSyntaxCharacter(ch) {
  return ch === 36 || ch >= 40 && ch <= 43 || ch === 46 || ch === 63 || ch >= 91 && ch <= 94 || ch >= 123 && ch <= 125;
}
pp$1.regexp_eatPatternCharacters = function(state) {
  var start = state.pos;
  var ch = 0;
  while ((ch = state.current()) !== -1 && !isSyntaxCharacter(ch)) {
    state.advance();
  }
  return state.pos !== start;
};
pp$1.regexp_eatExtendedPatternCharacter = function(state) {
  var ch = state.current();
  if (ch !== -1 && ch !== 36 && !(ch >= 40 && ch <= 43) && ch !== 46 && ch !== 63 && ch !== 91 && ch !== 94 && ch !== 124) {
    state.advance();
    return true;
  }
  return false;
};
pp$1.regexp_groupSpecifier = function(state) {
  if (state.eat(63)) {
    if (!this.regexp_eatGroupName(state)) {
      state.raise("Invalid group");
    }
    var trackDisjunction = this.options.ecmaVersion >= 16;
    var known = state.groupNames[state.lastStringValue];
    if (known) {
      if (trackDisjunction) {
        for (var i2 = 0, list2 = known;i2 < list2.length; i2 += 1) {
          var altID = list2[i2];
          if (!altID.separatedFrom(state.branchID)) {
            state.raise("Duplicate capture group name");
          }
        }
      } else {
        state.raise("Duplicate capture group name");
      }
    }
    if (trackDisjunction) {
      (known || (state.groupNames[state.lastStringValue] = [])).push(state.branchID);
    } else {
      state.groupNames[state.lastStringValue] = true;
    }
  }
};
pp$1.regexp_eatGroupName = function(state) {
  state.lastStringValue = "";
  if (state.eat(60)) {
    if (this.regexp_eatRegExpIdentifierName(state) && state.eat(62)) {
      return true;
    }
    state.raise("Invalid capture group name");
  }
  return false;
};
pp$1.regexp_eatRegExpIdentifierName = function(state) {
  state.lastStringValue = "";
  if (this.regexp_eatRegExpIdentifierStart(state)) {
    state.lastStringValue += codePointToString(state.lastIntValue);
    while (this.regexp_eatRegExpIdentifierPart(state)) {
      state.lastStringValue += codePointToString(state.lastIntValue);
    }
    return true;
  }
  return false;
};
pp$1.regexp_eatRegExpIdentifierStart = function(state) {
  var start = state.pos;
  var forceU = this.options.ecmaVersion >= 11;
  var ch = state.current(forceU);
  state.advance(forceU);
  if (ch === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(state, forceU)) {
    ch = state.lastIntValue;
  }
  if (isRegExpIdentifierStart(ch)) {
    state.lastIntValue = ch;
    return true;
  }
  state.pos = start;
  return false;
};
function isRegExpIdentifierStart(ch) {
  return isIdentifierStart(ch, true) || ch === 36 || ch === 95;
}
pp$1.regexp_eatRegExpIdentifierPart = function(state) {
  var start = state.pos;
  var forceU = this.options.ecmaVersion >= 11;
  var ch = state.current(forceU);
  state.advance(forceU);
  if (ch === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(state, forceU)) {
    ch = state.lastIntValue;
  }
  if (isRegExpIdentifierPart(ch)) {
    state.lastIntValue = ch;
    return true;
  }
  state.pos = start;
  return false;
};
function isRegExpIdentifierPart(ch) {
  return isIdentifierChar(ch, true) || ch === 36 || ch === 95 || ch === 8204 || ch === 8205;
}
pp$1.regexp_eatAtomEscape = function(state) {
  if (this.regexp_eatBackReference(state) || this.regexp_eatCharacterClassEscape(state) || this.regexp_eatCharacterEscape(state) || state.switchN && this.regexp_eatKGroupName(state)) {
    return true;
  }
  if (state.switchU) {
    if (state.current() === 99) {
      state.raise("Invalid unicode escape");
    }
    state.raise("Invalid escape");
  }
  return false;
};
pp$1.regexp_eatBackReference = function(state) {
  var start = state.pos;
  if (this.regexp_eatDecimalEscape(state)) {
    var n = state.lastIntValue;
    if (state.switchU) {
      if (n > state.maxBackReference) {
        state.maxBackReference = n;
      }
      return true;
    }
    if (n <= state.numCapturingParens) {
      return true;
    }
    state.pos = start;
  }
  return false;
};
pp$1.regexp_eatKGroupName = function(state) {
  if (state.eat(107)) {
    if (this.regexp_eatGroupName(state)) {
      state.backReferenceNames.push(state.lastStringValue);
      return true;
    }
    state.raise("Invalid named reference");
  }
  return false;
};
pp$1.regexp_eatCharacterEscape = function(state) {
  return this.regexp_eatControlEscape(state) || this.regexp_eatCControlLetter(state) || this.regexp_eatZero(state) || this.regexp_eatHexEscapeSequence(state) || this.regexp_eatRegExpUnicodeEscapeSequence(state, false) || !state.switchU && this.regexp_eatLegacyOctalEscapeSequence(state) || this.regexp_eatIdentityEscape(state);
};
pp$1.regexp_eatCControlLetter = function(state) {
  var start = state.pos;
  if (state.eat(99)) {
    if (this.regexp_eatControlLetter(state)) {
      return true;
    }
    state.pos = start;
  }
  return false;
};
pp$1.regexp_eatZero = function(state) {
  if (state.current() === 48 && !isDecimalDigit(state.lookahead())) {
    state.lastIntValue = 0;
    state.advance();
    return true;
  }
  return false;
};
pp$1.regexp_eatControlEscape = function(state) {
  var ch = state.current();
  if (ch === 116) {
    state.lastIntValue = 9;
    state.advance();
    return true;
  }
  if (ch === 110) {
    state.lastIntValue = 10;
    state.advance();
    return true;
  }
  if (ch === 118) {
    state.lastIntValue = 11;
    state.advance();
    return true;
  }
  if (ch === 102) {
    state.lastIntValue = 12;
    state.advance();
    return true;
  }
  if (ch === 114) {
    state.lastIntValue = 13;
    state.advance();
    return true;
  }
  return false;
};
pp$1.regexp_eatControlLetter = function(state) {
  var ch = state.current();
  if (isControlLetter(ch)) {
    state.lastIntValue = ch % 32;
    state.advance();
    return true;
  }
  return false;
};
function isControlLetter(ch) {
  return ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122;
}
pp$1.regexp_eatRegExpUnicodeEscapeSequence = function(state, forceU) {
  if (forceU === undefined)
    forceU = false;
  var start = state.pos;
  var switchU = forceU || state.switchU;
  if (state.eat(117)) {
    if (this.regexp_eatFixedHexDigits(state, 4)) {
      var lead = state.lastIntValue;
      if (switchU && lead >= 55296 && lead <= 56319) {
        var leadSurrogateEnd = state.pos;
        if (state.eat(92) && state.eat(117) && this.regexp_eatFixedHexDigits(state, 4)) {
          var trail = state.lastIntValue;
          if (trail >= 56320 && trail <= 57343) {
            state.lastIntValue = (lead - 55296) * 1024 + (trail - 56320) + 65536;
            return true;
          }
        }
        state.pos = leadSurrogateEnd;
        state.lastIntValue = lead;
      }
      return true;
    }
    if (switchU && state.eat(123) && this.regexp_eatHexDigits(state) && state.eat(125) && isValidUnicode(state.lastIntValue)) {
      return true;
    }
    if (switchU) {
      state.raise("Invalid unicode escape");
    }
    state.pos = start;
  }
  return false;
};
function isValidUnicode(ch) {
  return ch >= 0 && ch <= 1114111;
}
pp$1.regexp_eatIdentityEscape = function(state) {
  if (state.switchU) {
    if (this.regexp_eatSyntaxCharacter(state)) {
      return true;
    }
    if (state.eat(47)) {
      state.lastIntValue = 47;
      return true;
    }
    return false;
  }
  var ch = state.current();
  if (ch !== 99 && (!state.switchN || ch !== 107)) {
    state.lastIntValue = ch;
    state.advance();
    return true;
  }
  return false;
};
pp$1.regexp_eatDecimalEscape = function(state) {
  state.lastIntValue = 0;
  var ch = state.current();
  if (ch >= 49 && ch <= 57) {
    do {
      state.lastIntValue = 10 * state.lastIntValue + (ch - 48);
      state.advance();
    } while ((ch = state.current()) >= 48 && ch <= 57);
    return true;
  }
  return false;
};
var CharSetNone = 0;
var CharSetOk = 1;
var CharSetString = 2;
pp$1.regexp_eatCharacterClassEscape = function(state) {
  var ch = state.current();
  if (isCharacterClassEscape(ch)) {
    state.lastIntValue = -1;
    state.advance();
    return CharSetOk;
  }
  var negate = false;
  if (state.switchU && this.options.ecmaVersion >= 9 && ((negate = ch === 80) || ch === 112)) {
    state.lastIntValue = -1;
    state.advance();
    var result;
    if (state.eat(123) && (result = this.regexp_eatUnicodePropertyValueExpression(state)) && state.eat(125)) {
      if (negate && result === CharSetString) {
        state.raise("Invalid property name");
      }
      return result;
    }
    state.raise("Invalid property name");
  }
  return CharSetNone;
};
function isCharacterClassEscape(ch) {
  return ch === 100 || ch === 68 || ch === 115 || ch === 83 || ch === 119 || ch === 87;
}
pp$1.regexp_eatUnicodePropertyValueExpression = function(state) {
  var start = state.pos;
  if (this.regexp_eatUnicodePropertyName(state) && state.eat(61)) {
    var name = state.lastStringValue;
    if (this.regexp_eatUnicodePropertyValue(state)) {
      var value = state.lastStringValue;
      this.regexp_validateUnicodePropertyNameAndValue(state, name, value);
      return CharSetOk;
    }
  }
  state.pos = start;
  if (this.regexp_eatLoneUnicodePropertyNameOrValue(state)) {
    var nameOrValue = state.lastStringValue;
    return this.regexp_validateUnicodePropertyNameOrValue(state, nameOrValue);
  }
  return CharSetNone;
};
pp$1.regexp_validateUnicodePropertyNameAndValue = function(state, name, value) {
  if (!hasOwn(state.unicodeProperties.nonBinary, name)) {
    state.raise("Invalid property name");
  }
  if (!state.unicodeProperties.nonBinary[name].test(value)) {
    state.raise("Invalid property value");
  }
};
pp$1.regexp_validateUnicodePropertyNameOrValue = function(state, nameOrValue) {
  if (state.unicodeProperties.binary.test(nameOrValue)) {
    return CharSetOk;
  }
  if (state.switchV && state.unicodeProperties.binaryOfStrings.test(nameOrValue)) {
    return CharSetString;
  }
  state.raise("Invalid property name");
};
pp$1.regexp_eatUnicodePropertyName = function(state) {
  var ch = 0;
  state.lastStringValue = "";
  while (isUnicodePropertyNameCharacter(ch = state.current())) {
    state.lastStringValue += codePointToString(ch);
    state.advance();
  }
  return state.lastStringValue !== "";
};
function isUnicodePropertyNameCharacter(ch) {
  return isControlLetter(ch) || ch === 95;
}
pp$1.regexp_eatUnicodePropertyValue = function(state) {
  var ch = 0;
  state.lastStringValue = "";
  while (isUnicodePropertyValueCharacter(ch = state.current())) {
    state.lastStringValue += codePointToString(ch);
    state.advance();
  }
  return state.lastStringValue !== "";
};
function isUnicodePropertyValueCharacter(ch) {
  return isUnicodePropertyNameCharacter(ch) || isDecimalDigit(ch);
}
pp$1.regexp_eatLoneUnicodePropertyNameOrValue = function(state) {
  return this.regexp_eatUnicodePropertyValue(state);
};
pp$1.regexp_eatCharacterClass = function(state) {
  if (state.eat(91)) {
    var negate = state.eat(94);
    var result = this.regexp_classContents(state);
    if (!state.eat(93)) {
      state.raise("Unterminated character class");
    }
    if (negate && result === CharSetString) {
      state.raise("Negated character class may contain strings");
    }
    return true;
  }
  return false;
};
pp$1.regexp_classContents = function(state) {
  if (state.current() === 93) {
    return CharSetOk;
  }
  if (state.switchV) {
    return this.regexp_classSetExpression(state);
  }
  this.regexp_nonEmptyClassRanges(state);
  return CharSetOk;
};
pp$1.regexp_nonEmptyClassRanges = function(state) {
  while (this.regexp_eatClassAtom(state)) {
    var left = state.lastIntValue;
    if (state.eat(45) && this.regexp_eatClassAtom(state)) {
      var right = state.lastIntValue;
      if (state.switchU && (left === -1 || right === -1)) {
        state.raise("Invalid character class");
      }
      if (left !== -1 && right !== -1 && left > right) {
        state.raise("Range out of order in character class");
      }
    }
  }
};
pp$1.regexp_eatClassAtom = function(state) {
  var start = state.pos;
  if (state.eat(92)) {
    if (this.regexp_eatClassEscape(state)) {
      return true;
    }
    if (state.switchU) {
      var ch$1 = state.current();
      if (ch$1 === 99 || isOctalDigit(ch$1)) {
        state.raise("Invalid class escape");
      }
      state.raise("Invalid escape");
    }
    state.pos = start;
  }
  var ch = state.current();
  if (ch !== 93) {
    state.lastIntValue = ch;
    state.advance();
    return true;
  }
  return false;
};
pp$1.regexp_eatClassEscape = function(state) {
  var start = state.pos;
  if (state.eat(98)) {
    state.lastIntValue = 8;
    return true;
  }
  if (state.switchU && state.eat(45)) {
    state.lastIntValue = 45;
    return true;
  }
  if (!state.switchU && state.eat(99)) {
    if (this.regexp_eatClassControlLetter(state)) {
      return true;
    }
    state.pos = start;
  }
  return this.regexp_eatCharacterClassEscape(state) || this.regexp_eatCharacterEscape(state);
};
pp$1.regexp_classSetExpression = function(state) {
  var result = CharSetOk, subResult;
  if (this.regexp_eatClassSetRange(state))
    ;
  else if (subResult = this.regexp_eatClassSetOperand(state)) {
    if (subResult === CharSetString) {
      result = CharSetString;
    }
    var start = state.pos;
    while (state.eatChars([38, 38])) {
      if (state.current() !== 38 && (subResult = this.regexp_eatClassSetOperand(state))) {
        if (subResult !== CharSetString) {
          result = CharSetOk;
        }
        continue;
      }
      state.raise("Invalid character in character class");
    }
    if (start !== state.pos) {
      return result;
    }
    while (state.eatChars([45, 45])) {
      if (this.regexp_eatClassSetOperand(state)) {
        continue;
      }
      state.raise("Invalid character in character class");
    }
    if (start !== state.pos) {
      return result;
    }
  } else {
    state.raise("Invalid character in character class");
  }
  for (;; ) {
    if (this.regexp_eatClassSetRange(state)) {
      continue;
    }
    subResult = this.regexp_eatClassSetOperand(state);
    if (!subResult) {
      return result;
    }
    if (subResult === CharSetString) {
      result = CharSetString;
    }
  }
};
pp$1.regexp_eatClassSetRange = function(state) {
  var start = state.pos;
  if (this.regexp_eatClassSetCharacter(state)) {
    var left = state.lastIntValue;
    if (state.eat(45) && this.regexp_eatClassSetCharacter(state)) {
      var right = state.lastIntValue;
      if (left !== -1 && right !== -1 && left > right) {
        state.raise("Range out of order in character class");
      }
      return true;
    }
    state.pos = start;
  }
  return false;
};
pp$1.regexp_eatClassSetOperand = function(state) {
  if (this.regexp_eatClassSetCharacter(state)) {
    return CharSetOk;
  }
  return this.regexp_eatClassStringDisjunction(state) || this.regexp_eatNestedClass(state);
};
pp$1.regexp_eatNestedClass = function(state) {
  var start = state.pos;
  if (state.eat(91)) {
    var negate = state.eat(94);
    var result = this.regexp_classContents(state);
    if (state.eat(93)) {
      if (negate && result === CharSetString) {
        state.raise("Negated character class may contain strings");
      }
      return result;
    }
    state.pos = start;
  }
  if (state.eat(92)) {
    var result$1 = this.regexp_eatCharacterClassEscape(state);
    if (result$1) {
      return result$1;
    }
    state.pos = start;
  }
  return null;
};
pp$1.regexp_eatClassStringDisjunction = function(state) {
  var start = state.pos;
  if (state.eatChars([92, 113])) {
    if (state.eat(123)) {
      var result = this.regexp_classStringDisjunctionContents(state);
      if (state.eat(125)) {
        return result;
      }
    } else {
      state.raise("Invalid escape");
    }
    state.pos = start;
  }
  return null;
};
pp$1.regexp_classStringDisjunctionContents = function(state) {
  var result = this.regexp_classString(state);
  while (state.eat(124)) {
    if (this.regexp_classString(state) === CharSetString) {
      result = CharSetString;
    }
  }
  return result;
};
pp$1.regexp_classString = function(state) {
  var count = 0;
  while (this.regexp_eatClassSetCharacter(state)) {
    count++;
  }
  return count === 1 ? CharSetOk : CharSetString;
};
pp$1.regexp_eatClassSetCharacter = function(state) {
  var start = state.pos;
  if (state.eat(92)) {
    if (this.regexp_eatCharacterEscape(state) || this.regexp_eatClassSetReservedPunctuator(state)) {
      return true;
    }
    if (state.eat(98)) {
      state.lastIntValue = 8;
      return true;
    }
    state.pos = start;
    return false;
  }
  var ch = state.current();
  if (ch < 0 || ch === state.lookahead() && isClassSetReservedDoublePunctuatorCharacter(ch)) {
    return false;
  }
  if (isClassSetSyntaxCharacter(ch)) {
    return false;
  }
  state.advance();
  state.lastIntValue = ch;
  return true;
};
function isClassSetReservedDoublePunctuatorCharacter(ch) {
  return ch === 33 || ch >= 35 && ch <= 38 || ch >= 42 && ch <= 44 || ch === 46 || ch >= 58 && ch <= 64 || ch === 94 || ch === 96 || ch === 126;
}
function isClassSetSyntaxCharacter(ch) {
  return ch === 40 || ch === 41 || ch === 45 || ch === 47 || ch >= 91 && ch <= 93 || ch >= 123 && ch <= 125;
}
pp$1.regexp_eatClassSetReservedPunctuator = function(state) {
  var ch = state.current();
  if (isClassSetReservedPunctuator(ch)) {
    state.lastIntValue = ch;
    state.advance();
    return true;
  }
  return false;
};
function isClassSetReservedPunctuator(ch) {
  return ch === 33 || ch === 35 || ch === 37 || ch === 38 || ch === 44 || ch === 45 || ch >= 58 && ch <= 62 || ch === 64 || ch === 96 || ch === 126;
}
pp$1.regexp_eatClassControlLetter = function(state) {
  var ch = state.current();
  if (isDecimalDigit(ch) || ch === 95) {
    state.lastIntValue = ch % 32;
    state.advance();
    return true;
  }
  return false;
};
pp$1.regexp_eatHexEscapeSequence = function(state) {
  var start = state.pos;
  if (state.eat(120)) {
    if (this.regexp_eatFixedHexDigits(state, 2)) {
      return true;
    }
    if (state.switchU) {
      state.raise("Invalid escape");
    }
    state.pos = start;
  }
  return false;
};
pp$1.regexp_eatDecimalDigits = function(state) {
  var start = state.pos;
  var ch = 0;
  state.lastIntValue = 0;
  while (isDecimalDigit(ch = state.current())) {
    state.lastIntValue = 10 * state.lastIntValue + (ch - 48);
    state.advance();
  }
  return state.pos !== start;
};
function isDecimalDigit(ch) {
  return ch >= 48 && ch <= 57;
}
pp$1.regexp_eatHexDigits = function(state) {
  var start = state.pos;
  var ch = 0;
  state.lastIntValue = 0;
  while (isHexDigit(ch = state.current())) {
    state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch);
    state.advance();
  }
  return state.pos !== start;
};
function isHexDigit(ch) {
  return ch >= 48 && ch <= 57 || ch >= 65 && ch <= 70 || ch >= 97 && ch <= 102;
}
function hexToInt(ch) {
  if (ch >= 65 && ch <= 70) {
    return 10 + (ch - 65);
  }
  if (ch >= 97 && ch <= 102) {
    return 10 + (ch - 97);
  }
  return ch - 48;
}
pp$1.regexp_eatLegacyOctalEscapeSequence = function(state) {
  if (this.regexp_eatOctalDigit(state)) {
    var n1 = state.lastIntValue;
    if (this.regexp_eatOctalDigit(state)) {
      var n2 = state.lastIntValue;
      if (n1 <= 3 && this.regexp_eatOctalDigit(state)) {
        state.lastIntValue = n1 * 64 + n2 * 8 + state.lastIntValue;
      } else {
        state.lastIntValue = n1 * 8 + n2;
      }
    } else {
      state.lastIntValue = n1;
    }
    return true;
  }
  return false;
};
pp$1.regexp_eatOctalDigit = function(state) {
  var ch = state.current();
  if (isOctalDigit(ch)) {
    state.lastIntValue = ch - 48;
    state.advance();
    return true;
  }
  state.lastIntValue = 0;
  return false;
};
function isOctalDigit(ch) {
  return ch >= 48 && ch <= 55;
}
pp$1.regexp_eatFixedHexDigits = function(state, length) {
  var start = state.pos;
  state.lastIntValue = 0;
  for (var i2 = 0;i2 < length; ++i2) {
    var ch = state.current();
    if (!isHexDigit(ch)) {
      state.pos = start;
      return false;
    }
    state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch);
    state.advance();
  }
  return true;
};
var Token = function Token2(p) {
  this.type = p.type;
  this.value = p.value;
  this.start = p.start;
  this.end = p.end;
  if (p.options.locations) {
    this.loc = new SourceLocation(p, p.startLoc, p.endLoc);
  }
  if (p.options.ranges) {
    this.range = [p.start, p.end];
  }
};
var pp = Parser.prototype;
pp.next = function(ignoreEscapeSequenceInKeyword) {
  if (!ignoreEscapeSequenceInKeyword && this.type.keyword && this.containsEsc) {
    this.raiseRecoverable(this.start, "Escape sequence in keyword " + this.type.keyword);
  }
  if (this.options.onToken) {
    this.options.onToken(new Token(this));
  }
  this.lastTokEnd = this.end;
  this.lastTokStart = this.start;
  this.lastTokEndLoc = this.endLoc;
  this.lastTokStartLoc = this.startLoc;
  this.nextToken();
};
pp.getToken = function() {
  this.next();
  return new Token(this);
};
if (typeof Symbol !== "undefined") {
  pp[Symbol.iterator] = function() {
    var this$1$1 = this;
    return {
      next: function() {
        var token = this$1$1.getToken();
        return {
          done: token.type === types$1.eof,
          value: token
        };
      }
    };
  };
}
pp.nextToken = function() {
  var curContext = this.curContext();
  if (!curContext || !curContext.preserveSpace) {
    this.skipSpace();
  }
  this.start = this.pos;
  if (this.options.locations) {
    this.startLoc = this.curPosition();
  }
  if (this.pos >= this.input.length) {
    return this.finishToken(types$1.eof);
  }
  if (curContext.override) {
    return curContext.override(this);
  } else {
    this.readToken(this.fullCharCodeAtPos());
  }
};
pp.readToken = function(code) {
  if (isIdentifierStart(code, this.options.ecmaVersion >= 6) || code === 92) {
    return this.readWord();
  }
  return this.getTokenFromCode(code);
};
pp.fullCharCodeAtPos = function() {
  var code = this.input.charCodeAt(this.pos);
  if (code <= 55295 || code >= 56320) {
    return code;
  }
  var next = this.input.charCodeAt(this.pos + 1);
  return next <= 56319 || next >= 57344 ? code : (code << 10) + next - 56613888;
};
pp.skipBlockComment = function() {
  var startLoc = this.options.onComment && this.curPosition();
  var start = this.pos, end = this.input.indexOf("*/", this.pos += 2);
  if (end === -1) {
    this.raise(this.pos - 2, "Unterminated comment");
  }
  this.pos = end + 2;
  if (this.options.locations) {
    for (var nextBreak = undefined, pos = start;(nextBreak = nextLineBreak(this.input, pos, this.pos)) > -1; ) {
      ++this.curLine;
      pos = this.lineStart = nextBreak;
    }
  }
  if (this.options.onComment) {
    this.options.onComment(true, this.input.slice(start + 2, end), start, this.pos, startLoc, this.curPosition());
  }
};
pp.skipLineComment = function(startSkip) {
  var start = this.pos;
  var startLoc = this.options.onComment && this.curPosition();
  var ch = this.input.charCodeAt(this.pos += startSkip);
  while (this.pos < this.input.length && !isNewLine(ch)) {
    ch = this.input.charCodeAt(++this.pos);
  }
  if (this.options.onComment) {
    this.options.onComment(false, this.input.slice(start + startSkip, this.pos), start, this.pos, startLoc, this.curPosition());
  }
};
pp.skipSpace = function() {
  loop:
    while (this.pos < this.input.length) {
      var ch = this.input.charCodeAt(this.pos);
      switch (ch) {
        case 32:
        case 160:
          ++this.pos;
          break;
        case 13:
          if (this.input.charCodeAt(this.pos + 1) === 10) {
            ++this.pos;
          }
        case 10:
        case 8232:
        case 8233:
          ++this.pos;
          if (this.options.locations) {
            ++this.curLine;
            this.lineStart = this.pos;
          }
          break;
        case 47:
          switch (this.input.charCodeAt(this.pos + 1)) {
            case 42:
              this.skipBlockComment();
              break;
            case 47:
              this.skipLineComment(2);
              break;
            default:
              break loop;
          }
          break;
        default:
          if (ch > 8 && ch < 14 || ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch))) {
            ++this.pos;
          } else {
            break loop;
          }
      }
    }
};
pp.finishToken = function(type, val) {
  this.end = this.pos;
  if (this.options.locations) {
    this.endLoc = this.curPosition();
  }
  var prevType = this.type;
  this.type = type;
  this.value = val;
  this.updateContext(prevType);
};
pp.readToken_dot = function() {
  var next = this.input.charCodeAt(this.pos + 1);
  if (next >= 48 && next <= 57) {
    return this.readNumber(true);
  }
  var next2 = this.input.charCodeAt(this.pos + 2);
  if (this.options.ecmaVersion >= 6 && next === 46 && next2 === 46) {
    this.pos += 3;
    return this.finishToken(types$1.ellipsis);
  } else {
    ++this.pos;
    return this.finishToken(types$1.dot);
  }
};
pp.readToken_slash = function() {
  var next = this.input.charCodeAt(this.pos + 1);
  if (this.exprAllowed) {
    ++this.pos;
    return this.readRegexp();
  }
  if (next === 61) {
    return this.finishOp(types$1.assign, 2);
  }
  return this.finishOp(types$1.slash, 1);
};
pp.readToken_mult_modulo_exp = function(code) {
  var next = this.input.charCodeAt(this.pos + 1);
  var size = 1;
  var tokentype = code === 42 ? types$1.star : types$1.modulo;
  if (this.options.ecmaVersion >= 7 && code === 42 && next === 42) {
    ++size;
    tokentype = types$1.starstar;
    next = this.input.charCodeAt(this.pos + 2);
  }
  if (next === 61) {
    return this.finishOp(types$1.assign, size + 1);
  }
  return this.finishOp(tokentype, size);
};
pp.readToken_pipe_amp = function(code) {
  var next = this.input.charCodeAt(this.pos + 1);
  if (next === code) {
    if (this.options.ecmaVersion >= 12) {
      var next2 = this.input.charCodeAt(this.pos + 2);
      if (next2 === 61) {
        return this.finishOp(types$1.assign, 3);
      }
    }
    return this.finishOp(code === 124 ? types$1.logicalOR : types$1.logicalAND, 2);
  }
  if (next === 61) {
    return this.finishOp(types$1.assign, 2);
  }
  return this.finishOp(code === 124 ? types$1.bitwiseOR : types$1.bitwiseAND, 1);
};
pp.readToken_caret = function() {
  var next = this.input.charCodeAt(this.pos + 1);
  if (next === 61) {
    return this.finishOp(types$1.assign, 2);
  }
  return this.finishOp(types$1.bitwiseXOR, 1);
};
pp.readToken_plus_min = function(code) {
  var next = this.input.charCodeAt(this.pos + 1);
  if (next === code) {
    if (next === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 && (this.lastTokEnd === 0 || lineBreak.test(this.input.slice(this.lastTokEnd, this.pos)))) {
      this.skipLineComment(3);
      this.skipSpace();
      return this.nextToken();
    }
    return this.finishOp(types$1.incDec, 2);
  }
  if (next === 61) {
    return this.finishOp(types$1.assign, 2);
  }
  return this.finishOp(types$1.plusMin, 1);
};
pp.readToken_lt_gt = function(code) {
  var next = this.input.charCodeAt(this.pos + 1);
  var size = 1;
  if (next === code) {
    size = code === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2;
    if (this.input.charCodeAt(this.pos + size) === 61) {
      return this.finishOp(types$1.assign, size + 1);
    }
    return this.finishOp(types$1.bitShift, size);
  }
  if (next === 33 && code === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 && this.input.charCodeAt(this.pos + 3) === 45) {
    this.skipLineComment(4);
    this.skipSpace();
    return this.nextToken();
  }
  if (next === 61) {
    size = 2;
  }
  return this.finishOp(types$1.relational, size);
};
pp.readToken_eq_excl = function(code) {
  var next = this.input.charCodeAt(this.pos + 1);
  if (next === 61) {
    return this.finishOp(types$1.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2);
  }
  if (code === 61 && next === 62 && this.options.ecmaVersion >= 6) {
    this.pos += 2;
    return this.finishToken(types$1.arrow);
  }
  return this.finishOp(code === 61 ? types$1.eq : types$1.prefix, 1);
};
pp.readToken_question = function() {
  var ecmaVersion2 = this.options.ecmaVersion;
  if (ecmaVersion2 >= 11) {
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === 46) {
      var next2 = this.input.charCodeAt(this.pos + 2);
      if (next2 < 48 || next2 > 57) {
        return this.finishOp(types$1.questionDot, 2);
      }
    }
    if (next === 63) {
      if (ecmaVersion2 >= 12) {
        var next2$1 = this.input.charCodeAt(this.pos + 2);
        if (next2$1 === 61) {
          return this.finishOp(types$1.assign, 3);
        }
      }
      return this.finishOp(types$1.coalesce, 2);
    }
  }
  return this.finishOp(types$1.question, 1);
};
pp.readToken_numberSign = function() {
  var ecmaVersion2 = this.options.ecmaVersion;
  var code = 35;
  if (ecmaVersion2 >= 13) {
    ++this.pos;
    code = this.fullCharCodeAtPos();
    if (isIdentifierStart(code, true) || code === 92) {
      return this.finishToken(types$1.privateId, this.readWord1());
    }
  }
  this.raise(this.pos, "Unexpected character '" + codePointToString(code) + "'");
};
pp.getTokenFromCode = function(code) {
  switch (code) {
    case 46:
      return this.readToken_dot();
    case 40:
      ++this.pos;
      return this.finishToken(types$1.parenL);
    case 41:
      ++this.pos;
      return this.finishToken(types$1.parenR);
    case 59:
      ++this.pos;
      return this.finishToken(types$1.semi);
    case 44:
      ++this.pos;
      return this.finishToken(types$1.comma);
    case 91:
      ++this.pos;
      return this.finishToken(types$1.bracketL);
    case 93:
      ++this.pos;
      return this.finishToken(types$1.bracketR);
    case 123:
      ++this.pos;
      return this.finishToken(types$1.braceL);
    case 125:
      ++this.pos;
      return this.finishToken(types$1.braceR);
    case 58:
      ++this.pos;
      return this.finishToken(types$1.colon);
    case 96:
      if (this.options.ecmaVersion < 6) {
        break;
      }
      ++this.pos;
      return this.finishToken(types$1.backQuote);
    case 48:
      var next = this.input.charCodeAt(this.pos + 1);
      if (next === 120 || next === 88) {
        return this.readRadixNumber(16);
      }
      if (this.options.ecmaVersion >= 6) {
        if (next === 111 || next === 79) {
          return this.readRadixNumber(8);
        }
        if (next === 98 || next === 66) {
          return this.readRadixNumber(2);
        }
      }
    case 49:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57:
      return this.readNumber(false);
    case 34:
    case 39:
      return this.readString(code);
    case 47:
      return this.readToken_slash();
    case 37:
    case 42:
      return this.readToken_mult_modulo_exp(code);
    case 124:
    case 38:
      return this.readToken_pipe_amp(code);
    case 94:
      return this.readToken_caret();
    case 43:
    case 45:
      return this.readToken_plus_min(code);
    case 60:
    case 62:
      return this.readToken_lt_gt(code);
    case 61:
    case 33:
      return this.readToken_eq_excl(code);
    case 63:
      return this.readToken_question();
    case 126:
      return this.finishOp(types$1.prefix, 1);
    case 35:
      return this.readToken_numberSign();
  }
  this.raise(this.pos, "Unexpected character '" + codePointToString(code) + "'");
};
pp.finishOp = function(type, size) {
  var str = this.input.slice(this.pos, this.pos + size);
  this.pos += size;
  return this.finishToken(type, str);
};
pp.readRegexp = function() {
  var escaped, inClass, start = this.pos;
  for (;; ) {
    if (this.pos >= this.input.length) {
      this.raise(start, "Unterminated regular expression");
    }
    var ch = this.input.charAt(this.pos);
    if (lineBreak.test(ch)) {
      this.raise(start, "Unterminated regular expression");
    }
    if (!escaped) {
      if (ch === "[") {
        inClass = true;
      } else if (ch === "]" && inClass) {
        inClass = false;
      } else if (ch === "/" && !inClass) {
        break;
      }
      escaped = ch === "\\";
    } else {
      escaped = false;
    }
    ++this.pos;
  }
  var pattern = this.input.slice(start, this.pos);
  ++this.pos;
  var flagsStart = this.pos;
  var flags = this.readWord1();
  if (this.containsEsc) {
    this.unexpected(flagsStart);
  }
  var state = this.regexpState || (this.regexpState = new RegExpValidationState(this));
  state.reset(start, pattern, flags);
  this.validateRegExpFlags(state);
  this.validateRegExpPattern(state);
  var value = null;
  try {
    value = new RegExp(pattern, flags);
  } catch (e) {}
  return this.finishToken(types$1.regexp, { pattern, flags, value });
};
pp.readInt = function(radix, len, maybeLegacyOctalNumericLiteral) {
  var allowSeparators = this.options.ecmaVersion >= 12 && len === undefined;
  var isLegacyOctalNumericLiteral = maybeLegacyOctalNumericLiteral && this.input.charCodeAt(this.pos) === 48;
  var start = this.pos, total = 0, lastCode = 0;
  for (var i2 = 0, e = len == null ? Infinity : len;i2 < e; ++i2, ++this.pos) {
    var code = this.input.charCodeAt(this.pos), val = undefined;
    if (allowSeparators && code === 95) {
      if (isLegacyOctalNumericLiteral) {
        this.raiseRecoverable(this.pos, "Numeric separator is not allowed in legacy octal numeric literals");
      }
      if (lastCode === 95) {
        this.raiseRecoverable(this.pos, "Numeric separator must be exactly one underscore");
      }
      if (i2 === 0) {
        this.raiseRecoverable(this.pos, "Numeric separator is not allowed at the first of digits");
      }
      lastCode = code;
      continue;
    }
    if (code >= 97) {
      val = code - 97 + 10;
    } else if (code >= 65) {
      val = code - 65 + 10;
    } else if (code >= 48 && code <= 57) {
      val = code - 48;
    } else {
      val = Infinity;
    }
    if (val >= radix) {
      break;
    }
    lastCode = code;
    total = total * radix + val;
  }
  if (allowSeparators && lastCode === 95) {
    this.raiseRecoverable(this.pos - 1, "Numeric separator is not allowed at the last of digits");
  }
  if (this.pos === start || len != null && this.pos - start !== len) {
    return null;
  }
  return total;
};
function stringToNumber(str, isLegacyOctalNumericLiteral) {
  if (isLegacyOctalNumericLiteral) {
    return parseInt(str, 8);
  }
  return parseFloat(str.replace(/_/g, ""));
}
function stringToBigInt(str) {
  if (typeof BigInt !== "function") {
    return null;
  }
  return BigInt(str.replace(/_/g, ""));
}
pp.readRadixNumber = function(radix) {
  var start = this.pos;
  this.pos += 2;
  var val = this.readInt(radix);
  if (val == null) {
    this.raise(this.start + 2, "Expected number in radix " + radix);
  }
  if (this.options.ecmaVersion >= 11 && this.input.charCodeAt(this.pos) === 110) {
    val = stringToBigInt(this.input.slice(start, this.pos));
    ++this.pos;
  } else if (isIdentifierStart(this.fullCharCodeAtPos())) {
    this.raise(this.pos, "Identifier directly after number");
  }
  return this.finishToken(types$1.num, val);
};
pp.readNumber = function(startsWithDot) {
  var start = this.pos;
  if (!startsWithDot && this.readInt(10, undefined, true) === null) {
    this.raise(start, "Invalid number");
  }
  var octal = this.pos - start >= 2 && this.input.charCodeAt(start) === 48;
  if (octal && this.strict) {
    this.raise(start, "Invalid number");
  }
  var next = this.input.charCodeAt(this.pos);
  if (!octal && !startsWithDot && this.options.ecmaVersion >= 11 && next === 110) {
    var val$1 = stringToBigInt(this.input.slice(start, this.pos));
    ++this.pos;
    if (isIdentifierStart(this.fullCharCodeAtPos())) {
      this.raise(this.pos, "Identifier directly after number");
    }
    return this.finishToken(types$1.num, val$1);
  }
  if (octal && /[89]/.test(this.input.slice(start, this.pos))) {
    octal = false;
  }
  if (next === 46 && !octal) {
    ++this.pos;
    this.readInt(10);
    next = this.input.charCodeAt(this.pos);
  }
  if ((next === 69 || next === 101) && !octal) {
    next = this.input.charCodeAt(++this.pos);
    if (next === 43 || next === 45) {
      ++this.pos;
    }
    if (this.readInt(10) === null) {
      this.raise(start, "Invalid number");
    }
  }
  if (isIdentifierStart(this.fullCharCodeAtPos())) {
    this.raise(this.pos, "Identifier directly after number");
  }
  var val = stringToNumber(this.input.slice(start, this.pos), octal);
  return this.finishToken(types$1.num, val);
};
pp.readCodePoint = function() {
  var ch = this.input.charCodeAt(this.pos), code;
  if (ch === 123) {
    if (this.options.ecmaVersion < 6) {
      this.unexpected();
    }
    var codePos = ++this.pos;
    code = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos);
    ++this.pos;
    if (code > 1114111) {
      this.invalidStringToken(codePos, "Code point out of bounds");
    }
  } else {
    code = this.readHexChar(4);
  }
  return code;
};
pp.readString = function(quote) {
  var out = "", chunkStart = ++this.pos;
  for (;; ) {
    if (this.pos >= this.input.length) {
      this.raise(this.start, "Unterminated string constant");
    }
    var ch = this.input.charCodeAt(this.pos);
    if (ch === quote) {
      break;
    }
    if (ch === 92) {
      out += this.input.slice(chunkStart, this.pos);
      out += this.readEscapedChar(false);
      chunkStart = this.pos;
    } else if (ch === 8232 || ch === 8233) {
      if (this.options.ecmaVersion < 10) {
        this.raise(this.start, "Unterminated string constant");
      }
      ++this.pos;
      if (this.options.locations) {
        this.curLine++;
        this.lineStart = this.pos;
      }
    } else {
      if (isNewLine(ch)) {
        this.raise(this.start, "Unterminated string constant");
      }
      ++this.pos;
    }
  }
  out += this.input.slice(chunkStart, this.pos++);
  return this.finishToken(types$1.string, out);
};
var INVALID_TEMPLATE_ESCAPE_ERROR = {};
pp.tryReadTemplateToken = function() {
  this.inTemplateElement = true;
  try {
    this.readTmplToken();
  } catch (err) {
    if (err === INVALID_TEMPLATE_ESCAPE_ERROR) {
      this.readInvalidTemplateToken();
    } else {
      throw err;
    }
  }
  this.inTemplateElement = false;
};
pp.invalidStringToken = function(position, message) {
  if (this.inTemplateElement && this.options.ecmaVersion >= 9) {
    throw INVALID_TEMPLATE_ESCAPE_ERROR;
  } else {
    this.raise(position, message);
  }
};
pp.readTmplToken = function() {
  var out = "", chunkStart = this.pos;
  for (;; ) {
    if (this.pos >= this.input.length) {
      this.raise(this.start, "Unterminated template");
    }
    var ch = this.input.charCodeAt(this.pos);
    if (ch === 96 || ch === 36 && this.input.charCodeAt(this.pos + 1) === 123) {
      if (this.pos === this.start && (this.type === types$1.template || this.type === types$1.invalidTemplate)) {
        if (ch === 36) {
          this.pos += 2;
          return this.finishToken(types$1.dollarBraceL);
        } else {
          ++this.pos;
          return this.finishToken(types$1.backQuote);
        }
      }
      out += this.input.slice(chunkStart, this.pos);
      return this.finishToken(types$1.template, out);
    }
    if (ch === 92) {
      out += this.input.slice(chunkStart, this.pos);
      out += this.readEscapedChar(true);
      chunkStart = this.pos;
    } else if (isNewLine(ch)) {
      out += this.input.slice(chunkStart, this.pos);
      ++this.pos;
      switch (ch) {
        case 13:
          if (this.input.charCodeAt(this.pos) === 10) {
            ++this.pos;
          }
        case 10:
          out += `
`;
          break;
        default:
          out += String.fromCharCode(ch);
          break;
      }
      if (this.options.locations) {
        ++this.curLine;
        this.lineStart = this.pos;
      }
      chunkStart = this.pos;
    } else {
      ++this.pos;
    }
  }
};
pp.readInvalidTemplateToken = function() {
  for (;this.pos < this.input.length; this.pos++) {
    switch (this.input[this.pos]) {
      case "\\":
        ++this.pos;
        break;
      case "$":
        if (this.input[this.pos + 1] !== "{") {
          break;
        }
      case "`":
        return this.finishToken(types$1.invalidTemplate, this.input.slice(this.start, this.pos));
      case "\r":
        if (this.input[this.pos + 1] === `
`) {
          ++this.pos;
        }
      case `
`:
      case "\u2028":
      case "\u2029":
        ++this.curLine;
        this.lineStart = this.pos + 1;
        break;
    }
  }
  this.raise(this.start, "Unterminated template");
};
pp.readEscapedChar = function(inTemplate) {
  var ch = this.input.charCodeAt(++this.pos);
  ++this.pos;
  switch (ch) {
    case 110:
      return `
`;
    case 114:
      return "\r";
    case 120:
      return String.fromCharCode(this.readHexChar(2));
    case 117:
      return codePointToString(this.readCodePoint());
    case 116:
      return "\t";
    case 98:
      return "\b";
    case 118:
      return "\v";
    case 102:
      return "\f";
    case 13:
      if (this.input.charCodeAt(this.pos) === 10) {
        ++this.pos;
      }
    case 10:
      if (this.options.locations) {
        this.lineStart = this.pos;
        ++this.curLine;
      }
      return "";
    case 56:
    case 57:
      if (this.strict) {
        this.invalidStringToken(this.pos - 1, "Invalid escape sequence");
      }
      if (inTemplate) {
        var codePos = this.pos - 1;
        this.invalidStringToken(codePos, "Invalid escape sequence in template string");
      }
    default:
      if (ch >= 48 && ch <= 55) {
        var octalStr = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0];
        var octal = parseInt(octalStr, 8);
        if (octal > 255) {
          octalStr = octalStr.slice(0, -1);
          octal = parseInt(octalStr, 8);
        }
        this.pos += octalStr.length - 1;
        ch = this.input.charCodeAt(this.pos);
        if ((octalStr !== "0" || ch === 56 || ch === 57) && (this.strict || inTemplate)) {
          this.invalidStringToken(this.pos - 1 - octalStr.length, inTemplate ? "Octal literal in template string" : "Octal literal in strict mode");
        }
        return String.fromCharCode(octal);
      }
      if (isNewLine(ch)) {
        if (this.options.locations) {
          this.lineStart = this.pos;
          ++this.curLine;
        }
        return "";
      }
      return String.fromCharCode(ch);
  }
};
pp.readHexChar = function(len) {
  var codePos = this.pos;
  var n = this.readInt(16, len);
  if (n === null) {
    this.invalidStringToken(codePos, "Bad character escape sequence");
  }
  return n;
};
pp.readWord1 = function() {
  this.containsEsc = false;
  var word = "", first = true, chunkStart = this.pos;
  var astral = this.options.ecmaVersion >= 6;
  while (this.pos < this.input.length) {
    var ch = this.fullCharCodeAtPos();
    if (isIdentifierChar(ch, astral)) {
      this.pos += ch <= 65535 ? 1 : 2;
    } else if (ch === 92) {
      this.containsEsc = true;
      word += this.input.slice(chunkStart, this.pos);
      var escStart = this.pos;
      if (this.input.charCodeAt(++this.pos) !== 117) {
        this.invalidStringToken(this.pos, "Expecting Unicode escape sequence \\uXXXX");
      }
      ++this.pos;
      var esc = this.readCodePoint();
      if (!(first ? isIdentifierStart : isIdentifierChar)(esc, astral)) {
        this.invalidStringToken(escStart, "Invalid Unicode escape");
      }
      word += codePointToString(esc);
      chunkStart = this.pos;
    } else {
      break;
    }
    first = false;
  }
  return word + this.input.slice(chunkStart, this.pos);
};
pp.readWord = function() {
  var word = this.readWord1();
  var type = types$1.name;
  if (this.keywords.test(word)) {
    type = keywords[word];
  }
  return this.finishToken(type, word);
};
var version = "8.14.1";
Parser.acorn = {
  Parser,
  version,
  defaultOptions,
  Position,
  SourceLocation,
  getLineInfo,
  Node,
  TokenType,
  tokTypes: types$1,
  keywordTypes: keywords,
  TokContext,
  tokContexts: types,
  isIdentifierChar,
  isIdentifierStart,
  Token,
  isNewLine,
  lineBreak,
  lineBreakG,
  nonASCIIwhitespace
};
function parse3(input, options) {
  return Parser.parse(input, options);
}
function parseExpressionAt2(input, pos, options) {
  return Parser.parseExpressionAt(input, pos, options);
}
function tokenizer2(input, options) {
  return Parser.tokenizer(input, options);
}

// node_modules/@sveltejs/acorn-typescript/index.js
var startsExpr2 = true;
function kwLike(_name, options = {}) {
  return new TokenType("name", options);
}
var acornTypeScriptMap = /* @__PURE__ */ new WeakMap;
function generateAcornTypeScript(_acorn) {
  const acorn = _acorn.Parser.acorn || _acorn;
  let acornTypeScript = acornTypeScriptMap.get(acorn);
  if (!acornTypeScript) {
    let tokenIsLiteralPropertyName = function(token) {
      return [
        ...[types$1.name, types$1.string, types$1.num],
        ...Object.values(keywords),
        ...Object.values(tsKwTokenType)
      ].includes(token);
    }, tokenIsKeywordOrIdentifier = function(token) {
      return [
        ...[types$1.name],
        ...Object.values(keywords),
        ...Object.values(tsKwTokenType)
      ].includes(token);
    }, tokenIsIdentifier = function(token) {
      return [...Object.values(tsKwTokenType), types$1.name].includes(token);
    }, tokenIsTSDeclarationStart = function(token) {
      return [
        tsKwTokenType.abstract,
        tsKwTokenType.declare,
        tsKwTokenType.enum,
        tsKwTokenType.module,
        tsKwTokenType.namespace,
        tsKwTokenType.interface,
        tsKwTokenType.type
      ].includes(token);
    }, tokenIsTSTypeOperator = function(token) {
      return [tsKwTokenType.keyof, tsKwTokenType.readonly, tsKwTokenType.unique].includes(token);
    }, tokenIsTemplate = function(token) {
      return token === types$1.invalidTemplate;
    };
    const tsKwTokenType = generateTsKwTokenType();
    const tsTokenType = generateTsTokenType();
    const tsTokenContext = generateTsTokenContext();
    const tsKeywordsRegExp = new RegExp(`^(?:${Object.keys(tsKwTokenType).join("|")})$`);
    tsTokenType.jsxTagStart.updateContext = function() {
      this.context.push(tsTokenContext.tc_expr);
      this.context.push(tsTokenContext.tc_oTag);
      this.exprAllowed = false;
    };
    tsTokenType.jsxTagEnd.updateContext = function(prevType) {
      let out = this.context.pop();
      if (out === tsTokenContext.tc_oTag && prevType === types$1.slash || out === tsTokenContext.tc_cTag) {
        this.context.pop();
        this.exprAllowed = this.curContext() === tsTokenContext.tc_expr;
      } else {
        this.exprAllowed = true;
      }
    };
    acornTypeScript = {
      tokTypes: {
        ...tsKwTokenType,
        ...tsTokenType
      },
      tokContexts: {
        ...tsTokenContext
      },
      keywordsRegExp: tsKeywordsRegExp,
      tokenIsLiteralPropertyName,
      tokenIsKeywordOrIdentifier,
      tokenIsIdentifier,
      tokenIsTSDeclarationStart,
      tokenIsTSTypeOperator,
      tokenIsTemplate
    };
  }
  return acornTypeScript;
}
function generateTsTokenContext() {
  return {
    tc_oTag: new TokContext("<tag", false, false),
    tc_cTag: new TokContext("</tag", false, false),
    tc_expr: new TokContext("<tag>...</tag>", true, true)
  };
}
function generateTsTokenType() {
  return {
    at: new TokenType("@"),
    jsxName: new TokenType("jsxName"),
    jsxText: new TokenType("jsxText", { beforeExpr: true }),
    jsxTagStart: new TokenType("jsxTagStart", { startsExpr: true }),
    jsxTagEnd: new TokenType("jsxTagEnd")
  };
}
function generateTsKwTokenType() {
  return {
    assert: kwLike("assert", { startsExpr: startsExpr2 }),
    asserts: kwLike("asserts", { startsExpr: startsExpr2 }),
    global: kwLike("global", { startsExpr: startsExpr2 }),
    keyof: kwLike("keyof", { startsExpr: startsExpr2 }),
    readonly: kwLike("readonly", { startsExpr: startsExpr2 }),
    unique: kwLike("unique", { startsExpr: startsExpr2 }),
    abstract: kwLike("abstract", { startsExpr: startsExpr2 }),
    declare: kwLike("declare", { startsExpr: startsExpr2 }),
    enum: kwLike("enum", { startsExpr: startsExpr2 }),
    module: kwLike("module", { startsExpr: startsExpr2 }),
    namespace: kwLike("namespace", { startsExpr: startsExpr2 }),
    interface: kwLike("interface", { startsExpr: startsExpr2 }),
    type: kwLike("type", { startsExpr: startsExpr2 })
  };
}
var TS_SCOPE_OTHER = 512;
var TS_SCOPE_TS_MODULE = 1024;
var BIND_KIND_VALUE = 1;
var BIND_KIND_TYPE = 2;
var BIND_SCOPE_VAR = 4;
var BIND_SCOPE_LEXICAL = 8;
var BIND_SCOPE_FUNCTION = 16;
var BIND_FLAGS_NONE = 64;
var BIND_FLAGS_CLASS = 128;
var BIND_FLAGS_TS_ENUM = 256;
var BIND_FLAGS_TS_CONST_ENUM = 512;
var BIND_FLAGS_TS_EXPORT_ONLY = 1024;
var BIND_CLASS = BIND_KIND_VALUE | BIND_KIND_TYPE | BIND_SCOPE_LEXICAL | BIND_FLAGS_CLASS;
var BIND_LEXICAL2 = BIND_KIND_VALUE | 0 | BIND_SCOPE_LEXICAL | 0;
var BIND_VAR2 = BIND_KIND_VALUE | 0 | BIND_SCOPE_VAR | 0;
var BIND_FUNCTION2 = BIND_KIND_VALUE | 0 | BIND_SCOPE_FUNCTION | 0;
var BIND_TS_INTERFACE = 0 | BIND_KIND_TYPE | 0 | BIND_FLAGS_CLASS;
var BIND_TS_TYPE = 0 | BIND_KIND_TYPE | 0 | 0;
var BIND_TS_ENUM = BIND_KIND_VALUE | BIND_KIND_TYPE | BIND_SCOPE_LEXICAL | BIND_FLAGS_TS_ENUM;
var BIND_TS_AMBIENT = 0 | 0 | 0 | BIND_FLAGS_TS_EXPORT_ONLY;
var BIND_NONE2 = 0 | 0 | 0 | BIND_FLAGS_NONE;
var BIND_OUTSIDE2 = BIND_KIND_VALUE | 0 | 0 | BIND_FLAGS_NONE;
var BIND_TS_CONST_ENUM = BIND_TS_ENUM | BIND_FLAGS_TS_CONST_ENUM;
var BIND_TS_NAMESPACE = 0 | 0 | 0 | BIND_FLAGS_TS_EXPORT_ONLY;
var CLASS_ELEMENT_FLAG_STATIC = 4;
var CLASS_ELEMENT_KIND_GETTER = 2;
var CLASS_ELEMENT_KIND_SETTER = 1;
var CLASS_ELEMENT_KIND_ACCESSOR = CLASS_ELEMENT_KIND_GETTER | CLASS_ELEMENT_KIND_SETTER;
var CLASS_ELEMENT_STATIC_GETTER = CLASS_ELEMENT_KIND_GETTER | CLASS_ELEMENT_FLAG_STATIC;
var CLASS_ELEMENT_STATIC_SETTER = CLASS_ELEMENT_KIND_SETTER | CLASS_ELEMENT_FLAG_STATIC;
var skipWhiteSpaceInLine = /(?:[^\S\n\r\u2028\u2029]|\/\/.*|\/\*.*?\*\/)*/y;
var skipWhiteSpaceToLineBreak = new RegExp("(?=(" + skipWhiteSpaceInLine.source + "))\\1" + /(?=[\n\r\u2028\u2029]|\/\*(?!.*?\*\/)|$)/.source, "y");
var DestructuringErrors3 = class {
  constructor() {
    this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;
  }
};
function isPrivateNameConflicted2(privateNameMap, element) {
  const name = element.key.name;
  const curr = privateNameMap[name];
  let next = "true";
  if (element.type === "MethodDefinition" && (element.kind === "get" || element.kind === "set")) {
    next = (element.static ? "s" : "i") + element.kind;
  }
  if (curr === "iget" && next === "iset" || curr === "iset" && next === "iget" || curr === "sget" && next === "sset" || curr === "sset" && next === "sget") {
    privateNameMap[name] = "true";
    return false;
  } else if (!curr) {
    privateNameMap[name] = next;
    return false;
  } else {
    return true;
  }
}
function checkKeyName2(node, name) {
  const { computed, key } = node;
  return !computed && (key.type === "Identifier" && key.name === name || key.type === "Literal" && key.value === name);
}
var TypeScriptError = {
  AbstractMethodHasImplementation: ({ methodName }) => `Method '${methodName}' cannot have an implementation because it is marked abstract.`,
  AbstractPropertyHasInitializer: ({ propertyName }) => `Property '${propertyName}' cannot have an initializer because it is marked abstract.`,
  AccesorCannotDeclareThisParameter: "'get' and 'set' accessors cannot declare 'this' parameters.",
  AccesorCannotHaveTypeParameters: "An accessor cannot have type parameters.",
  CannotFindName: ({ name }) => `Cannot find name '${name}'.`,
  ClassMethodHasDeclare: "Class methods cannot have the 'declare' modifier.",
  ClassMethodHasReadonly: "Class methods cannot have the 'readonly' modifier.",
  ConstInitiailizerMustBeStringOrNumericLiteralOrLiteralEnumReference: "A 'const' initializer in an ambient context must be a string or numeric literal or literal enum reference.",
  ConstructorHasTypeParameters: "Type parameters cannot appear on a constructor declaration.",
  DeclareAccessor: ({ kind }) => `'declare' is not allowed in ${kind}ters.`,
  DeclareClassFieldHasInitializer: "Initializers are not allowed in ambient contexts.",
  DeclareFunctionHasImplementation: "An implementation cannot be declared in ambient contexts.",
  DuplicateAccessibilityModifier: () => `Accessibility modifier already seen.`,
  DuplicateModifier: ({ modifier }) => `Duplicate modifier: '${modifier}'.`,
  EmptyHeritageClauseType: ({ token }) => `'${token}' list cannot be empty.`,
  EmptyTypeArguments: "Type argument list cannot be empty.",
  EmptyTypeParameters: "Type parameter list cannot be empty.",
  ExpectedAmbientAfterExportDeclare: "'export declare' must be followed by an ambient declaration.",
  ImportAliasHasImportType: "An import alias can not use 'import type'.",
  IncompatibleModifiers: ({ modifiers }) => `'${modifiers[0]}' modifier cannot be used with '${modifiers[1]}' modifier.`,
  IndexSignatureHasAbstract: "Index signatures cannot have the 'abstract' modifier.",
  IndexSignatureHasAccessibility: ({ modifier }) => `Index signatures cannot have an accessibility modifier ('${modifier}').`,
  IndexSignatureHasDeclare: "Index signatures cannot have the 'declare' modifier.",
  IndexSignatureHasOverride: "'override' modifier cannot appear on an index signature.",
  IndexSignatureHasStatic: "Index signatures cannot have the 'static' modifier.",
  InitializerNotAllowedInAmbientContext: "Initializers are not allowed in ambient contexts.",
  InvalidModifierOnTypeMember: ({ modifier }) => `'${modifier}' modifier cannot appear on a type member.`,
  InvalidModifierOnTypeParameter: ({ modifier }) => `'${modifier}' modifier cannot appear on a type parameter.`,
  InvalidModifierOnTypeParameterPositions: ({ modifier }) => `'${modifier}' modifier can only appear on a type parameter of a class, interface or type alias.`,
  InvalidModifiersOrder: ({ orderedModifiers }) => `'${orderedModifiers[0]}' modifier must precede '${orderedModifiers[1]}' modifier.`,
  InvalidPropertyAccessAfterInstantiationExpression: "Invalid property access after an instantiation expression. You can either wrap the instantiation expression in parentheses, or delete the type arguments.",
  InvalidTupleMemberLabel: "Tuple members must be labeled with a simple identifier.",
  MissingInterfaceName: "'interface' declarations must be followed by an identifier.",
  MixedLabeledAndUnlabeledElements: "Tuple members must all have names or all not have names.",
  NonAbstractClassHasAbstractMethod: "Abstract methods can only appear within an abstract class.",
  NonClassMethodPropertyHasAbstractModifer: "'abstract' modifier can only appear on a class, method, or property declaration.",
  OptionalTypeBeforeRequired: "A required element cannot follow an optional element.",
  OverrideNotInSubClass: "This member cannot have an 'override' modifier because its containing class does not extend another class.",
  PatternIsOptional: "A binding pattern parameter cannot be optional in an implementation signature.",
  PrivateElementHasAbstract: "Private elements cannot have the 'abstract' modifier.",
  PrivateElementHasAccessibility: ({ modifier }) => `Private elements cannot have an accessibility modifier ('${modifier}').`,
  PrivateMethodsHasAccessibility: ({ modifier }) => `Private methods cannot have an accessibility modifier ('${modifier}').`,
  ReadonlyForMethodSignature: "'readonly' modifier can only appear on a property declaration or index signature.",
  ReservedArrowTypeParam: "This syntax is reserved in files with the .mts or .cts extension. Add a trailing comma, as in `<T,>() => ...`.",
  ReservedTypeAssertion: "This syntax is reserved in files with the .mts or .cts extension. Use an `as` expression instead.",
  SetAccesorCannotHaveOptionalParameter: "A 'set' accessor cannot have an optional parameter.",
  SetAccesorCannotHaveRestParameter: "A 'set' accessor cannot have rest parameter.",
  SetAccesorCannotHaveReturnType: "A 'set' accessor cannot have a return type annotation.",
  SingleTypeParameterWithoutTrailingComma: ({ typeParameterName }) => `Single type parameter ${typeParameterName} should have a trailing comma. Example usage: <${typeParameterName},>.`,
  StaticBlockCannotHaveModifier: "Static class blocks cannot have any modifier.",
  TypeAnnotationAfterAssign: "Type annotations must come before default assignments, e.g. instead of `age = 25: number` use `age: number = 25`.",
  TypeImportCannotSpecifyDefaultAndNamed: "A type-only import can specify a default import or named bindings, but not both.",
  TypeModifierIsUsedInTypeExports: "The 'type' modifier cannot be used on a named export when 'export type' is used on its export statement.",
  TypeModifierIsUsedInTypeImports: "The 'type' modifier cannot be used on a named import when 'import type' is used on its import statement.",
  UnexpectedParameterModifier: "A parameter property is only allowed in a constructor implementation.",
  UnexpectedReadonly: "'readonly' type modifier is only permitted on array and tuple literal types.",
  GenericsEndWithComma: `Trailing comma is not allowed at the end of generics.`,
  UnexpectedTypeAnnotation: "Did not expect a type annotation here.",
  UnexpectedTypeCastInParameter: "Unexpected type cast in parameter position.",
  UnsupportedImportTypeArgument: "Argument in a type import must be a string literal.",
  UnsupportedParameterPropertyKind: "A parameter property may not be declared using a binding pattern.",
  UnsupportedSignatureParameterKind: ({ type }) => `Name in a signature must be an Identifier, ObjectPattern or ArrayPattern, instead got ${type}.`,
  LetInLexicalBinding: "'let' is not allowed to be used as a name in 'let' or 'const' declarations."
};
var DecoratorsError = {
  UnexpectedLeadingDecorator: "Leading decorators must be attached to a class declaration.",
  DecoratorConstructor: "Decorators can't be used with a constructor. Did you mean '@dec class { ... }'?",
  TrailingDecorator: "Decorators must be attached to a class element.",
  SpreadElementDecorator: `Decorators can't be used with SpreadElement`
};
function generateParseDecorators(Parse, acornTypeScript, acorn) {
  const { tokTypes: tt } = acorn;
  const { tokTypes: tokTypes2 } = acornTypeScript;
  return class ParseDecorators extends Parse {
    takeDecorators(node) {
      const decorators = this.decoratorStack[this.decoratorStack.length - 1];
      if (decorators.length) {
        node.decorators = decorators;
        this.resetStartLocationFromNode(node, decorators[0]);
        this.decoratorStack[this.decoratorStack.length - 1] = [];
      }
    }
    parseDecorators(allowExport) {
      const currentContextDecorators = this.decoratorStack[this.decoratorStack.length - 1];
      while (this.match(tokTypes2.at)) {
        const decorator = this.parseDecorator();
        currentContextDecorators.push(decorator);
      }
      if (this.match(tt._export)) {
        if (!allowExport) {
          this.unexpected();
        }
      } else if (!this.canHaveLeadingDecorator()) {
        this.raise(this.start, DecoratorsError.UnexpectedLeadingDecorator);
      }
    }
    parseDecorator() {
      const node = this.startNode();
      this.next();
      this.decoratorStack.push([]);
      const startPos = this.start;
      const startLoc = this.startLoc;
      let expr;
      if (this.match(tt.parenL)) {
        const startPos2 = this.start;
        const startLoc2 = this.startLoc;
        this.next();
        expr = this.parseExpression();
        this.expect(tt.parenR);
        if (this.options.preserveParens) {
          let par = this.startNodeAt(startPos2, startLoc2);
          par.expression = expr;
          expr = this.finishNode(par, "ParenthesizedExpression");
        }
      } else {
        expr = this.parseIdent(false);
        while (this.eat(tt.dot)) {
          const node2 = this.startNodeAt(startPos, startLoc);
          node2.object = expr;
          node2.property = this.parseIdent(true);
          node2.computed = false;
          expr = this.finishNode(node2, "MemberExpression");
        }
      }
      node.expression = this.parseMaybeDecoratorArguments(expr);
      this.decoratorStack.pop();
      return this.finishNode(node, "Decorator");
    }
    parseMaybeDecoratorArguments(expr) {
      if (this.eat(tt.parenL)) {
        const node = this.startNodeAtNode(expr);
        node.callee = expr;
        node.arguments = this.parseExprList(tt.parenR, false);
        return this.finishNode(node, "CallExpression");
      }
      return expr;
    }
  };
}
var xhtml_default = {
  quot: '"',
  amp: "&",
  apos: "'",
  lt: "<",
  gt: ">",
  nbsp: "\xA0",
  iexcl: "\xA1",
  cent: "\xA2",
  pound: "\xA3",
  curren: "\xA4",
  yen: "\xA5",
  brvbar: "\xA6",
  sect: "\xA7",
  uml: "\xA8",
  copy: "\xA9",
  ordf: "\xAA",
  laquo: "\xAB",
  not: "\xAC",
  shy: "\xAD",
  reg: "\xAE",
  macr: "\xAF",
  deg: "\xB0",
  plusmn: "\xB1",
  sup2: "\xB2",
  sup3: "\xB3",
  acute: "\xB4",
  micro: "\xB5",
  para: "\xB6",
  middot: "\xB7",
  cedil: "\xB8",
  sup1: "\xB9",
  ordm: "\xBA",
  raquo: "\xBB",
  frac14: "\xBC",
  frac12: "\xBD",
  frac34: "\xBE",
  iquest: "\xBF",
  Agrave: "\xC0",
  Aacute: "\xC1",
  Acirc: "\xC2",
  Atilde: "\xC3",
  Auml: "\xC4",
  Aring: "\xC5",
  AElig: "\xC6",
  Ccedil: "\xC7",
  Egrave: "\xC8",
  Eacute: "\xC9",
  Ecirc: "\xCA",
  Euml: "\xCB",
  Igrave: "\xCC",
  Iacute: "\xCD",
  Icirc: "\xCE",
  Iuml: "\xCF",
  ETH: "\xD0",
  Ntilde: "\xD1",
  Ograve: "\xD2",
  Oacute: "\xD3",
  Ocirc: "\xD4",
  Otilde: "\xD5",
  Ouml: "\xD6",
  times: "\xD7",
  Oslash: "\xD8",
  Ugrave: "\xD9",
  Uacute: "\xDA",
  Ucirc: "\xDB",
  Uuml: "\xDC",
  Yacute: "\xDD",
  THORN: "\xDE",
  szlig: "\xDF",
  agrave: "\xE0",
  aacute: "\xE1",
  acirc: "\xE2",
  atilde: "\xE3",
  auml: "\xE4",
  aring: "\xE5",
  aelig: "\xE6",
  ccedil: "\xE7",
  egrave: "\xE8",
  eacute: "\xE9",
  ecirc: "\xEA",
  euml: "\xEB",
  igrave: "\xEC",
  iacute: "\xED",
  icirc: "\xEE",
  iuml: "\xEF",
  eth: "\xF0",
  ntilde: "\xF1",
  ograve: "\xF2",
  oacute: "\xF3",
  ocirc: "\xF4",
  otilde: "\xF5",
  ouml: "\xF6",
  divide: "\xF7",
  oslash: "\xF8",
  ugrave: "\xF9",
  uacute: "\xFA",
  ucirc: "\xFB",
  uuml: "\xFC",
  yacute: "\xFD",
  thorn: "\xFE",
  yuml: "\xFF",
  OElig: "\u0152",
  oelig: "\u0153",
  Scaron: "\u0160",
  scaron: "\u0161",
  Yuml: "\u0178",
  fnof: "\u0192",
  circ: "\u02C6",
  tilde: "\u02DC",
  Alpha: "\u0391",
  Beta: "\u0392",
  Gamma: "\u0393",
  Delta: "\u0394",
  Epsilon: "\u0395",
  Zeta: "\u0396",
  Eta: "\u0397",
  Theta: "\u0398",
  Iota: "\u0399",
  Kappa: "\u039A",
  Lambda: "\u039B",
  Mu: "\u039C",
  Nu: "\u039D",
  Xi: "\u039E",
  Omicron: "\u039F",
  Pi: "\u03A0",
  Rho: "\u03A1",
  Sigma: "\u03A3",
  Tau: "\u03A4",
  Upsilon: "\u03A5",
  Phi: "\u03A6",
  Chi: "\u03A7",
  Psi: "\u03A8",
  Omega: "\u03A9",
  alpha: "\u03B1",
  beta: "\u03B2",
  gamma: "\u03B3",
  delta: "\u03B4",
  epsilon: "\u03B5",
  zeta: "\u03B6",
  eta: "\u03B7",
  theta: "\u03B8",
  iota: "\u03B9",
  kappa: "\u03BA",
  lambda: "\u03BB",
  mu: "\u03BC",
  nu: "\u03BD",
  xi: "\u03BE",
  omicron: "\u03BF",
  pi: "\u03C0",
  rho: "\u03C1",
  sigmaf: "\u03C2",
  sigma: "\u03C3",
  tau: "\u03C4",
  upsilon: "\u03C5",
  phi: "\u03C6",
  chi: "\u03C7",
  psi: "\u03C8",
  omega: "\u03C9",
  thetasym: "\u03D1",
  upsih: "\u03D2",
  piv: "\u03D6",
  ensp: "\u2002",
  emsp: "\u2003",
  thinsp: "\u2009",
  zwnj: "\u200C",
  zwj: "\u200D",
  lrm: "\u200E",
  rlm: "\u200F",
  ndash: "\u2013",
  mdash: "\u2014",
  lsquo: "\u2018",
  rsquo: "\u2019",
  sbquo: "\u201A",
  ldquo: "\u201C",
  rdquo: "\u201D",
  bdquo: "\u201E",
  dagger: "\u2020",
  Dagger: "\u2021",
  bull: "\u2022",
  hellip: "\u2026",
  permil: "\u2030",
  prime: "\u2032",
  Prime: "\u2033",
  lsaquo: "\u2039",
  rsaquo: "\u203A",
  oline: "\u203E",
  frasl: "\u2044",
  euro: "\u20AC",
  image: "\u2111",
  weierp: "\u2118",
  real: "\u211C",
  trade: "\u2122",
  alefsym: "\u2135",
  larr: "\u2190",
  uarr: "\u2191",
  rarr: "\u2192",
  darr: "\u2193",
  harr: "\u2194",
  crarr: "\u21B5",
  lArr: "\u21D0",
  uArr: "\u21D1",
  rArr: "\u21D2",
  dArr: "\u21D3",
  hArr: "\u21D4",
  forall: "\u2200",
  part: "\u2202",
  exist: "\u2203",
  empty: "\u2205",
  nabla: "\u2207",
  isin: "\u2208",
  notin: "\u2209",
  ni: "\u220B",
  prod: "\u220F",
  sum: "\u2211",
  minus: "\u2212",
  lowast: "\u2217",
  radic: "\u221A",
  prop: "\u221D",
  infin: "\u221E",
  ang: "\u2220",
  and: "\u2227",
  or: "\u2228",
  cap: "\u2229",
  cup: "\u222A",
  int: "\u222B",
  there4: "\u2234",
  sim: "\u223C",
  cong: "\u2245",
  asymp: "\u2248",
  ne: "\u2260",
  equiv: "\u2261",
  le: "\u2264",
  ge: "\u2265",
  sub: "\u2282",
  sup: "\u2283",
  nsub: "\u2284",
  sube: "\u2286",
  supe: "\u2287",
  oplus: "\u2295",
  otimes: "\u2297",
  perp: "\u22A5",
  sdot: "\u22C5",
  lceil: "\u2308",
  rceil: "\u2309",
  lfloor: "\u230A",
  rfloor: "\u230B",
  lang: "\u2329",
  rang: "\u232A",
  loz: "\u25CA",
  spades: "\u2660",
  clubs: "\u2663",
  hearts: "\u2665",
  diams: "\u2666"
};
var hexNumber = /^[\da-fA-F]+$/;
var decimalNumber = /^\d+$/;
function getQualifiedJSXName(object) {
  if (!object)
    return object;
  if (object.type === "JSXIdentifier")
    return object.name;
  if (object.type === "JSXNamespacedName")
    return object.namespace.name + ":" + object.name.name;
  if (object.type === "JSXMemberExpression")
    return getQualifiedJSXName(object.object) + "." + getQualifiedJSXName(object.property);
}
function generateJsxParser(acorn, acornTypeScript, Parser3, jsxOptions) {
  const tt = acorn.tokTypes;
  const tok = acornTypeScript.tokTypes;
  const isNewLine2 = acorn.isNewLine;
  const isIdentifierChar2 = acorn.isIdentifierChar;
  const options = Object.assign({
    allowNamespaces: true,
    allowNamespacedObjects: true
  }, jsxOptions || {});
  return class JsxParser extends Parser3 {
    jsx_readToken() {
      let out = "", chunkStart = this.pos;
      for (;; ) {
        if (this.pos >= this.input.length)
          this.raise(this.start, "Unterminated JSX contents");
        let ch = this.input.charCodeAt(this.pos);
        switch (ch) {
          case 60:
          case 123:
            if (this.pos === this.start) {
              if (ch === 60 && this.exprAllowed) {
                ++this.pos;
                return this.finishToken(tok.jsxTagStart);
              }
              return this.getTokenFromCode(ch);
            }
            out += this.input.slice(chunkStart, this.pos);
            return this.finishToken(tok.jsxText, out);
          case 38:
            out += this.input.slice(chunkStart, this.pos);
            out += this.jsx_readEntity();
            chunkStart = this.pos;
            break;
          case 62:
          case 125:
            this.raise(this.pos, "Unexpected token `" + this.input[this.pos] + "`. Did you mean `" + (ch === 62 ? "&gt;" : "&rbrace;") + '` or `{"' + this.input[this.pos] + '"}`?');
          default:
            if (isNewLine2(ch)) {
              out += this.input.slice(chunkStart, this.pos);
              out += this.jsx_readNewLine(true);
              chunkStart = this.pos;
            } else {
              ++this.pos;
            }
        }
      }
    }
    jsx_readNewLine(normalizeCRLF) {
      let ch = this.input.charCodeAt(this.pos);
      let out;
      ++this.pos;
      if (ch === 13 && this.input.charCodeAt(this.pos) === 10) {
        ++this.pos;
        out = normalizeCRLF ? `
` : `\r
`;
      } else {
        out = String.fromCharCode(ch);
      }
      if (this.options.locations) {
        ++this.curLine;
        this.lineStart = this.pos;
      }
      return out;
    }
    jsx_readString(quote) {
      let out = "", chunkStart = ++this.pos;
      for (;; ) {
        if (this.pos >= this.input.length)
          this.raise(this.start, "Unterminated string constant");
        let ch = this.input.charCodeAt(this.pos);
        if (ch === quote)
          break;
        if (ch === 38) {
          out += this.input.slice(chunkStart, this.pos);
          out += this.jsx_readEntity();
          chunkStart = this.pos;
        } else if (isNewLine2(ch)) {
          out += this.input.slice(chunkStart, this.pos);
          out += this.jsx_readNewLine(false);
          chunkStart = this.pos;
        } else {
          ++this.pos;
        }
      }
      out += this.input.slice(chunkStart, this.pos++);
      return this.finishToken(tt.string, out);
    }
    jsx_readEntity() {
      let str = "", count = 0, entity;
      let ch = this.input[this.pos];
      if (ch !== "&")
        this.raise(this.pos, "Entity must start with an ampersand");
      let startPos = ++this.pos;
      while (this.pos < this.input.length && count++ < 10) {
        ch = this.input[this.pos++];
        if (ch === ";") {
          if (str[0] === "#") {
            if (str[1] === "x") {
              str = str.substr(2);
              if (hexNumber.test(str))
                entity = String.fromCharCode(parseInt(str, 16));
            } else {
              str = str.substr(1);
              if (decimalNumber.test(str))
                entity = String.fromCharCode(parseInt(str, 10));
            }
          } else {
            entity = xhtml_default[str];
          }
          break;
        }
        str += ch;
      }
      if (!entity) {
        this.pos = startPos;
        return "&";
      }
      return entity;
    }
    jsx_readWord() {
      let ch, start = this.pos;
      do {
        ch = this.input.charCodeAt(++this.pos);
      } while (isIdentifierChar2(ch) || ch === 45);
      return this.finishToken(tok.jsxName, this.input.slice(start, this.pos));
    }
    jsx_parseIdentifier() {
      let node = this.startNode();
      if (this.type === tok.jsxName)
        node.name = this.value;
      else if (this.type.keyword)
        node.name = this.type.keyword;
      else
        this.unexpected();
      this.next();
      return this.finishNode(node, "JSXIdentifier");
    }
    jsx_parseNamespacedName() {
      let startPos = this.start, startLoc = this.startLoc;
      let name = this.jsx_parseIdentifier();
      if (!options.allowNamespaces || !this.eat(tt.colon))
        return name;
      var node = this.startNodeAt(startPos, startLoc);
      node.namespace = name;
      node.name = this.jsx_parseIdentifier();
      return this.finishNode(node, "JSXNamespacedName");
    }
    jsx_parseElementName() {
      if (this.type === tok.jsxTagEnd)
        return "";
      let startPos = this.start, startLoc = this.startLoc;
      let node = this.jsx_parseNamespacedName();
      if (this.type === tt.dot && node.type === "JSXNamespacedName" && !options.allowNamespacedObjects) {
        this.unexpected();
      }
      while (this.eat(tt.dot)) {
        let newNode = this.startNodeAt(startPos, startLoc);
        newNode.object = node;
        newNode.property = this.jsx_parseIdentifier();
        node = this.finishNode(newNode, "JSXMemberExpression");
      }
      return node;
    }
    jsx_parseAttributeValue() {
      switch (this.type) {
        case tt.braceL:
          let node = this.jsx_parseExpressionContainer();
          if (node.expression.type === "JSXEmptyExpression")
            this.raise(node.start, "JSX attributes must only be assigned a non-empty expression");
          return node;
        case tok.jsxTagStart:
        case tt.string:
          return this.parseExprAtom();
        default:
          this.raise(this.start, "JSX value should be either an expression or a quoted JSX text");
      }
    }
    jsx_parseEmptyExpression() {
      let node = this.startNodeAt(this.lastTokEnd, this.lastTokEndLoc);
      return this.finishNodeAt(node, "JSXEmptyExpression", this.start, this.startLoc);
    }
    jsx_parseExpressionContainer() {
      let node = this.startNode();
      this.next();
      node.expression = this.type === tt.braceR ? this.jsx_parseEmptyExpression() : this.parseExpression();
      this.expect(tt.braceR);
      return this.finishNode(node, "JSXExpressionContainer");
    }
    jsx_parseAttribute() {
      let node = this.startNode();
      if (this.eat(tt.braceL)) {
        this.expect(tt.ellipsis);
        node.argument = this.parseMaybeAssign();
        this.expect(tt.braceR);
        return this.finishNode(node, "JSXSpreadAttribute");
      }
      node.name = this.jsx_parseNamespacedName();
      node.value = this.eat(tt.eq) ? this.jsx_parseAttributeValue() : null;
      return this.finishNode(node, "JSXAttribute");
    }
    jsx_parseOpeningElementAt(startPos, startLoc) {
      let node = this.startNodeAt(startPos, startLoc);
      node.attributes = [];
      let nodeName = this.jsx_parseElementName();
      if (nodeName)
        node.name = nodeName;
      while (this.type !== tt.slash && this.type !== tok.jsxTagEnd)
        node.attributes.push(this.jsx_parseAttribute());
      node.selfClosing = this.eat(tt.slash);
      this.expect(tok.jsxTagEnd);
      return this.finishNode(node, nodeName ? "JSXOpeningElement" : "JSXOpeningFragment");
    }
    jsx_parseClosingElementAt(startPos, startLoc) {
      let node = this.startNodeAt(startPos, startLoc);
      let nodeName = this.jsx_parseElementName();
      if (nodeName)
        node.name = nodeName;
      this.expect(tok.jsxTagEnd);
      return this.finishNode(node, nodeName ? "JSXClosingElement" : "JSXClosingFragment");
    }
    jsx_parseElementAt(startPos, startLoc) {
      let node = this.startNodeAt(startPos, startLoc);
      let children = [];
      let openingElement = this.jsx_parseOpeningElementAt(startPos, startLoc);
      let closingElement = null;
      if (!openingElement.selfClosing) {
        contents:
          for (;; ) {
            switch (this.type) {
              case tok.jsxTagStart:
                startPos = this.start;
                startLoc = this.startLoc;
                this.next();
                if (this.eat(tt.slash)) {
                  closingElement = this.jsx_parseClosingElementAt(startPos, startLoc);
                  break contents;
                }
                children.push(this.jsx_parseElementAt(startPos, startLoc));
                break;
              case tok.jsxText:
                children.push(this.parseExprAtom());
                break;
              case tt.braceL:
                children.push(this.jsx_parseExpressionContainer());
                break;
              default:
                this.unexpected();
            }
          }
        if (getQualifiedJSXName(closingElement.name) !== getQualifiedJSXName(openingElement.name)) {
          this.raise(closingElement.start, "Expected corresponding JSX closing tag for <" + getQualifiedJSXName(openingElement.name) + ">");
        }
      }
      let fragmentOrElement = openingElement.name ? "Element" : "Fragment";
      node["opening" + fragmentOrElement] = openingElement;
      node["closing" + fragmentOrElement] = closingElement;
      node.children = children;
      if (this.type === tt.relational && this.value === "<") {
        this.raise(this.start, "Adjacent JSX elements must be wrapped in an enclosing tag");
      }
      return this.finishNode(node, "JSX" + fragmentOrElement);
    }
    jsx_parseText() {
      let node = this.parseLiteral(this.value);
      node.type = "JSXText";
      return node;
    }
    jsx_parseElement() {
      let startPos = this.start, startLoc = this.startLoc;
      this.next();
      return this.jsx_parseElementAt(startPos, startLoc);
    }
  };
}
function generateParseImportAssertions(Parse, acornTypeScript, acorn) {
  const { tokTypes: tokTypes2 } = acornTypeScript;
  const { tokTypes: tt } = acorn;
  return class ImportAttributes extends Parse {
    parseMaybeImportAttributes(node) {
      if (this.type === tt._with || this.type === tokTypes2.assert) {
        this.next();
        const attributes = this.parseImportAttributes();
        if (attributes) {
          node.attributes = attributes;
        }
      }
    }
    parseImportAttributes() {
      this.expect(tt.braceL);
      const attrs = this.parseWithEntries();
      this.expect(tt.braceR);
      return attrs;
    }
    parseWithEntries() {
      const attrs = [];
      const attrNames = /* @__PURE__ */ new Set;
      do {
        if (this.type === tt.braceR) {
          break;
        }
        const node = this.startNode();
        let withionKeyNode;
        if (this.type === tt.string) {
          withionKeyNode = this.parseLiteral(this.value);
        } else {
          withionKeyNode = this.parseIdent(true);
        }
        this.next();
        node.key = withionKeyNode;
        if (attrNames.has(node.key.name)) {
          this.raise(this.pos, "Duplicated key in attributes");
        }
        attrNames.add(node.key.name);
        if (this.type !== tt.string) {
          this.raise(this.pos, "Only string is supported as an attribute value");
        }
        node.value = this.parseLiteral(this.value);
        attrs.push(this.finishNode(node, "ImportAttribute"));
      } while (this.eat(tt.comma));
      return attrs;
    }
  };
}
var skipWhiteSpace2 = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;
function assert(x) {
  if (!x) {
    throw new Error("Assert fail");
  }
}
function tsIsClassAccessor(modifier) {
  return modifier === "accessor";
}
function tsIsVarianceAnnotations(modifier) {
  return modifier === "in" || modifier === "out";
}
var FUNC_STATEMENT2 = 1;
var FUNC_HANGING_STATEMENT2 = 2;
var FUNC_NULLABLE_ID2 = 4;
var acornScope = {
  SCOPE_TOP: 1,
  SCOPE_FUNCTION: 2,
  SCOPE_ASYNC: 4,
  SCOPE_GENERATOR: 8,
  SCOPE_ARROW: 16,
  SCOPE_SIMPLE_CATCH: 32,
  SCOPE_SUPER: 64,
  SCOPE_DIRECT_SUPER: 128,
  SCOPE_CLASS_STATIC_BLOCK: 256,
  SCOPE_VAR: 256,
  BIND_NONE: 0,
  BIND_VAR: 1,
  BIND_LEXICAL: 2,
  BIND_FUNCTION: 3,
  BIND_SIMPLE_CATCH: 4,
  BIND_OUTSIDE: 5,
  BIND_TS_TYPE: 6,
  BIND_TS_INTERFACE: 7,
  BIND_TS_NAMESPACE: 8,
  BIND_FLAGS_TS_EXPORT_ONLY: 1024,
  BIND_FLAGS_TS_IMPORT: 4096,
  BIND_FLAGS_TS_ENUM: 256,
  BIND_FLAGS_TS_CONST_ENUM: 512,
  BIND_FLAGS_CLASS: 128
};
function functionFlags2(async, generator) {
  return acornScope.SCOPE_FUNCTION | (async ? acornScope.SCOPE_ASYNC : 0) | (generator ? acornScope.SCOPE_GENERATOR : 0);
}
function isPossiblyLiteralEnum(expression) {
  if (expression.type !== "MemberExpression")
    return false;
  const { computed, property } = expression;
  if (computed && (property.type !== "TemplateLiteral" || property.expressions.length > 0)) {
    return false;
  }
  return isUncomputedMemberExpressionChain(expression.object);
}
function isUncomputedMemberExpressionChain(expression) {
  if (expression.type === "Identifier")
    return true;
  if (expression.type !== "MemberExpression")
    return false;
  if (expression.computed)
    return false;
  return isUncomputedMemberExpressionChain(expression.object);
}
function tsIsAccessModifier(modifier) {
  return modifier === "private" || modifier === "public" || modifier === "protected";
}
function tokenCanStartExpression(token) {
  return Boolean(token.startsExpr);
}
function nonNull(x) {
  if (x == null) {
    throw new Error(`Unexpected ${x} value.`);
  }
  return x;
}
function keywordTypeFromName(value) {
  switch (value) {
    case "any":
      return "TSAnyKeyword";
    case "boolean":
      return "TSBooleanKeyword";
    case "bigint":
      return "TSBigIntKeyword";
    case "never":
      return "TSNeverKeyword";
    case "number":
      return "TSNumberKeyword";
    case "object":
      return "TSObjectKeyword";
    case "string":
      return "TSStringKeyword";
    case "symbol":
      return "TSSymbolKeyword";
    case "undefined":
      return "TSUndefinedKeyword";
    case "unknown":
      return "TSUnknownKeyword";
    default:
      return;
  }
}
function tsPlugin(options) {
  const { dts = false } = options || {};
  const disallowAmbiguousJSXLike = !!options?.jsx;
  return function(Parser3) {
    const _acorn = Parser3.acorn || exports_acorn;
    const acornTypeScript = generateAcornTypeScript(_acorn);
    const tt = _acorn.tokTypes;
    const keywordTypes2 = _acorn.keywordTypes;
    const isIdentifierStart2 = _acorn.isIdentifierStart;
    const lineBreak2 = _acorn.lineBreak;
    const isNewLine2 = _acorn.isNewLine;
    const tokContexts = _acorn.tokContexts;
    const isIdentifierChar2 = _acorn.isIdentifierChar;
    const {
      tokTypes: tokTypes2,
      tokContexts: tsTokContexts,
      keywordsRegExp,
      tokenIsLiteralPropertyName,
      tokenIsTemplate,
      tokenIsTSDeclarationStart,
      tokenIsIdentifier,
      tokenIsKeywordOrIdentifier,
      tokenIsTSTypeOperator
    } = acornTypeScript;
    function nextLineBreak2(code, from, end = code.length) {
      for (let i2 = from;i2 < end; i2++) {
        let next = code.charCodeAt(i2);
        if (isNewLine2(next))
          return i2 < end - 1 && next === 13 && code.charCodeAt(i2 + 1) === 10 ? i2 + 2 : i2 + 1;
      }
      return -1;
    }
    Parser3 = generateParseDecorators(Parser3, acornTypeScript, _acorn);
    if (options?.jsx) {
      Parser3 = generateJsxParser(_acorn, acornTypeScript, Parser3, typeof options.jsx === "boolean" ? {} : options.jsx);
    }
    Parser3 = generateParseImportAssertions(Parser3, acornTypeScript, _acorn);

    class TypeScriptParser extends Parser3 {
      constructor(options2, input, startPos) {
        super(options2, input, startPos);
        this.preValue = null;
        this.preToken = null;
        this.isLookahead = false;
        this.isAmbientContext = false;
        this.inAbstractClass = false;
        this.inType = false;
        this.inDisallowConditionalTypesContext = false;
        this.maybeInArrowParameters = false;
        this.shouldParseArrowReturnType = undefined;
        this.shouldParseAsyncArrowReturnType = undefined;
        this.decoratorStack = [[]];
        this.importsStack = [[]];
        this.importOrExportOuterKind = undefined;
        this.tsParseConstModifier = (node) => {
          this.tsParseModifiers({
            modified: node,
            allowedModifiers: ["const"],
            disallowedModifiers: ["in", "out"],
            errorTemplate: TypeScriptError.InvalidModifierOnTypeParameterPositions
          });
        };
        this.ecmaVersion = this.options.ecmaVersion;
      }
      static get acornTypeScript() {
        return acornTypeScript;
      }
      get acornTypeScript() {
        return acornTypeScript;
      }
      getTokenFromCodeInType(code) {
        if (code === 62) {
          return this.finishOp(tt.relational, 1);
        }
        if (code === 60) {
          return this.finishOp(tt.relational, 1);
        }
        return super.getTokenFromCode(code);
      }
      readToken(code) {
        if (!this.inType) {
          let context = this.curContext();
          if (context === tsTokContexts.tc_expr)
            return this.jsx_readToken();
          if (context === tsTokContexts.tc_oTag || context === tsTokContexts.tc_cTag) {
            if (isIdentifierStart2(code))
              return this.jsx_readWord();
            if (code == 62) {
              ++this.pos;
              return this.finishToken(tokTypes2.jsxTagEnd);
            }
            if ((code === 34 || code === 39) && context == tsTokContexts.tc_oTag)
              return this.jsx_readString(code);
          }
          if (code === 60 && this.exprAllowed && this.input.charCodeAt(this.pos + 1) !== 33) {
            ++this.pos;
            if (options?.jsx) {
              return this.finishToken(tokTypes2.jsxTagStart);
            } else {
              return this.finishToken(tt.relational, "<");
            }
          }
        }
        return super.readToken(code);
      }
      getTokenFromCode(code) {
        if (this.inType) {
          return this.getTokenFromCodeInType(code);
        }
        if (code === 64) {
          ++this.pos;
          return this.finishToken(tokTypes2.at);
        }
        return super.getTokenFromCode(code);
      }
      isAbstractClass() {
        return this.ts_isContextual(tokTypes2.abstract) && this.lookahead().type === tt._class;
      }
      finishNode(node, type) {
        if (node.type !== "" && node.end !== 0) {
          return node;
        }
        return super.finishNode(node, type);
      }
      tryParse(fn, oldState = this.cloneCurLookaheadState()) {
        const abortSignal = { node: null };
        try {
          const node = fn((node2 = null) => {
            abortSignal.node = node2;
            throw abortSignal;
          });
          return {
            node,
            error: null,
            thrown: false,
            aborted: false,
            failState: null
          };
        } catch (error) {
          const failState = this.getCurLookaheadState();
          this.setLookaheadState(oldState);
          if (error instanceof SyntaxError) {
            return {
              node: null,
              error,
              thrown: true,
              aborted: false,
              failState
            };
          }
          if (error === abortSignal) {
            return {
              node: abortSignal.node,
              error: null,
              thrown: false,
              aborted: true,
              failState
            };
          }
          throw error;
        }
      }
      setOptionalParametersError(refExpressionErrors, resultError) {
        refExpressionErrors.optionalParametersLoc = resultError?.loc ?? this.startLoc;
      }
      reScan_lt_gt() {
        if (this.type === tt.relational) {
          this.pos -= 1;
          this.readToken_lt_gt(this.fullCharCodeAtPos());
        }
      }
      reScan_lt() {
        const { type } = this;
        if (type === tt.bitShift) {
          this.pos -= 2;
          this.finishOp(tt.relational, 1);
          return tt.relational;
        }
        return type;
      }
      resetEndLocation(node, endPos = this.lastTokEnd, endLoc = this.lastTokEndLoc) {
        node.end = endPos;
        node.loc.end = endLoc;
        if (this.options.ranges)
          node.range[1] = endPos;
      }
      startNodeAtNode(type) {
        return super.startNodeAt(type.start, type.loc.start);
      }
      nextTokenStart() {
        return this.nextTokenStartSince(this.pos);
      }
      tsHasSomeModifiers(member, modifiers) {
        return modifiers.some((modifier) => {
          if (tsIsAccessModifier(modifier)) {
            return member.accessibility === modifier;
          }
          return !!member[modifier];
        });
      }
      tsIsStartOfStaticBlocks() {
        return this.isContextual("static") && this.lookaheadCharCode() === 123;
      }
      tsCheckForInvalidTypeCasts(items) {
        items.forEach((node) => {
          if (node?.type === "TSTypeCastExpression") {
            this.raise(node.typeAnnotation.start, TypeScriptError.UnexpectedTypeAnnotation);
          }
        });
      }
      atPossibleAsyncArrow(base) {
        return base.type === "Identifier" && base.name === "async" && this.lastTokEndLoc.column === base.end && !this.canInsertSemicolon() && base.end - base.start === 5 && base.start === this.potentialArrowAt;
      }
      tsIsIdentifier() {
        return tokenIsIdentifier(this.type);
      }
      tsTryParseTypeOrTypePredicateAnnotation() {
        return this.match(tt.colon) ? this.tsParseTypeOrTypePredicateAnnotation(tt.colon) : undefined;
      }
      tsTryParseGenericAsyncArrowFunction(startPos, startLoc, forInit) {
        if (!this.tsMatchLeftRelational()) {
          return;
        }
        const oldMaybeInArrowParameters = this.maybeInArrowParameters;
        this.maybeInArrowParameters = true;
        const res = this.tsTryParseAndCatch(() => {
          const node = this.startNodeAt(startPos, startLoc);
          node.typeParameters = this.tsParseTypeParameters(this.tsParseConstModifier);
          super.parseFunctionParams(node);
          node.returnType = this.tsTryParseTypeOrTypePredicateAnnotation();
          this.expect(tt.arrow);
          return node;
        });
        this.maybeInArrowParameters = oldMaybeInArrowParameters;
        if (!res) {
          return;
        }
        return super.parseArrowExpression(res, null, true, forInit);
      }
      tsParseTypeArgumentsInExpression() {
        if (this.reScan_lt() !== tt.relational) {
          return;
        }
        return this.tsParseTypeArguments();
      }
      tsInNoContext(cb) {
        const oldContext = this.context;
        this.context = [oldContext[0]];
        try {
          return cb();
        } finally {
          this.context = oldContext;
        }
      }
      tsTryParseTypeAnnotation() {
        return this.match(tt.colon) ? this.tsParseTypeAnnotation() : undefined;
      }
      isUnparsedContextual(nameStart, name) {
        const nameEnd = nameStart + name.length;
        if (this.input.slice(nameStart, nameEnd) === name) {
          const nextCh = this.input.charCodeAt(nameEnd);
          return !(isIdentifierChar2(nextCh) || (nextCh & 64512) === 55296);
        }
        return false;
      }
      isAbstractConstructorSignature() {
        return this.ts_isContextual(tokTypes2.abstract) && this.lookahead().type === tt._new;
      }
      nextTokenStartSince(pos) {
        skipWhiteSpace2.lastIndex = pos;
        return skipWhiteSpace2.test(this.input) ? skipWhiteSpace2.lastIndex : pos;
      }
      lookaheadCharCode() {
        return this.input.charCodeAt(this.nextTokenStart());
      }
      compareLookaheadState(state, state2) {
        for (const key of Object.keys(state)) {
          if (state[key] !== state2[key])
            return false;
        }
        return true;
      }
      createLookaheadState() {
        this.value = null;
        this.context = [this.curContext()];
      }
      getCurLookaheadState() {
        return {
          endLoc: this.endLoc,
          lastTokEnd: this.lastTokEnd,
          lastTokStart: this.lastTokStart,
          lastTokStartLoc: this.lastTokStartLoc,
          pos: this.pos,
          value: this.value,
          type: this.type,
          start: this.start,
          end: this.end,
          context: this.context,
          startLoc: this.startLoc,
          lastTokEndLoc: this.lastTokEndLoc,
          curLine: this.curLine,
          lineStart: this.lineStart,
          curPosition: this.curPosition,
          containsEsc: this.containsEsc
        };
      }
      cloneCurLookaheadState() {
        return {
          pos: this.pos,
          value: this.value,
          type: this.type,
          start: this.start,
          end: this.end,
          context: this.context && this.context.slice(),
          startLoc: this.startLoc,
          lastTokEndLoc: this.lastTokEndLoc,
          endLoc: this.endLoc,
          lastTokEnd: this.lastTokEnd,
          lastTokStart: this.lastTokStart,
          lastTokStartLoc: this.lastTokStartLoc,
          curLine: this.curLine,
          lineStart: this.lineStart,
          curPosition: this.curPosition,
          containsEsc: this.containsEsc
        };
      }
      setLookaheadState(state) {
        this.pos = state.pos;
        this.value = state.value;
        this.endLoc = state.endLoc;
        this.lastTokEnd = state.lastTokEnd;
        this.lastTokStart = state.lastTokStart;
        this.lastTokStartLoc = state.lastTokStartLoc;
        this.type = state.type;
        this.start = state.start;
        this.end = state.end;
        this.context = state.context;
        this.startLoc = state.startLoc;
        this.lastTokEndLoc = state.lastTokEndLoc;
        this.curLine = state.curLine;
        this.lineStart = state.lineStart;
        this.curPosition = state.curPosition;
        this.containsEsc = state.containsEsc;
      }
      tsLookAhead(f) {
        const state = this.getCurLookaheadState();
        const res = f();
        this.setLookaheadState(state);
        return res;
      }
      lookahead(number) {
        const oldState = this.getCurLookaheadState();
        this.createLookaheadState();
        this.isLookahead = true;
        if (number !== undefined) {
          for (let i2 = 0;i2 < number; i2++) {
            this.nextToken();
          }
        } else {
          this.nextToken();
        }
        this.isLookahead = false;
        const curState = this.getCurLookaheadState();
        this.setLookaheadState(oldState);
        return curState;
      }
      readWord() {
        let word = this.readWord1();
        let type = tt.name;
        if (this.keywords.test(word)) {
          type = keywordTypes2[word];
        } else if (new RegExp(keywordsRegExp).test(word)) {
          type = tokTypes2[word];
        }
        return this.finishToken(type, word);
      }
      skipBlockComment() {
        let startLoc;
        if (!this.isLookahead)
          startLoc = this.options.onComment && this.curPosition();
        let start = this.pos, end = this.input.indexOf("*/", this.pos += 2);
        if (end === -1)
          this.raise(this.pos - 2, "Unterminated comment");
        this.pos = end + 2;
        if (this.options.locations) {
          for (let nextBreak, pos = start;(nextBreak = nextLineBreak2(this.input, pos, this.pos)) > -1; ) {
            ++this.curLine;
            pos = this.lineStart = nextBreak;
          }
        }
        if (this.isLookahead)
          return;
        if (this.options.onComment) {
          this.options.onComment(true, this.input.slice(start + 2, end), start, this.pos, startLoc, this.curPosition());
        }
      }
      skipLineComment(startSkip) {
        let start = this.pos;
        let startLoc;
        if (!this.isLookahead)
          startLoc = this.options.onComment && this.curPosition();
        let ch = this.input.charCodeAt(this.pos += startSkip);
        while (this.pos < this.input.length && !isNewLine2(ch)) {
          ch = this.input.charCodeAt(++this.pos);
        }
        if (this.isLookahead)
          return;
        if (this.options.onComment)
          this.options.onComment(false, this.input.slice(start + startSkip, this.pos), start, this.pos, startLoc, this.curPosition());
      }
      finishToken(type, val) {
        this.preValue = this.value;
        this.preToken = this.type;
        this.end = this.pos;
        if (this.options.locations)
          this.endLoc = this.curPosition();
        let prevType = this.type;
        this.type = type;
        this.value = val;
        if (!this.isLookahead) {
          this.updateContext(prevType);
        }
      }
      resetStartLocation(node, start, startLoc) {
        node.start = start;
        node.loc.start = startLoc;
        if (this.options.ranges)
          node.range[0] = start;
      }
      isLineTerminator() {
        return this.eat(tt.semi) || super.canInsertSemicolon();
      }
      hasFollowingLineBreak() {
        skipWhiteSpaceToLineBreak.lastIndex = this.end;
        return skipWhiteSpaceToLineBreak.test(this.input);
      }
      addExtra(node, key, value, enumerable = true) {
        if (!node)
          return;
        const extra = node.extra = node.extra || {};
        if (enumerable) {
          extra[key] = value;
        } else {
          Object.defineProperty(extra, key, { enumerable, value });
        }
      }
      isLiteralPropertyName() {
        return tokenIsLiteralPropertyName(this.type);
      }
      hasPrecedingLineBreak() {
        return lineBreak2.test(this.input.slice(this.lastTokEnd, this.start));
      }
      createIdentifier(node, name) {
        node.name = name;
        return this.finishNode(node, "Identifier");
      }
      resetStartLocationFromNode(node, locationNode) {
        this.resetStartLocation(node, locationNode.start, locationNode.loc.start);
      }
      isThisParam(param) {
        return param.type === "Identifier" && param.name === "this";
      }
      isLookaheadContextual(name) {
        const next = this.nextTokenStart();
        return this.isUnparsedContextual(next, name);
      }
      ts_type_isContextual(type, token) {
        return type === token && !this.containsEsc;
      }
      ts_isContextual(token) {
        return this.type === token && !this.containsEsc;
      }
      ts_isContextualWithState(state, token) {
        return state.type === token && !state.containsEsc;
      }
      isContextualWithState(keyword, state) {
        return state.type === tt.name && state.value === keyword && !state.containsEsc;
      }
      tsIsStartOfMappedType() {
        this.next();
        if (this.eat(tt.plusMin)) {
          return this.ts_isContextual(tokTypes2.readonly);
        }
        if (this.ts_isContextual(tokTypes2.readonly)) {
          this.next();
        }
        if (!this.match(tt.bracketL)) {
          return false;
        }
        this.next();
        if (!this.tsIsIdentifier()) {
          return false;
        }
        this.next();
        return this.match(tt._in);
      }
      tsInDisallowConditionalTypesContext(cb) {
        const oldInDisallowConditionalTypesContext = this.inDisallowConditionalTypesContext;
        this.inDisallowConditionalTypesContext = true;
        try {
          return cb();
        } finally {
          this.inDisallowConditionalTypesContext = oldInDisallowConditionalTypesContext;
        }
      }
      tsTryParseType() {
        return this.tsEatThenParseType(tt.colon);
      }
      match(type) {
        return this.type === type;
      }
      matchJsx(type) {
        return this.type === acornTypeScript.tokTypes[type];
      }
      ts_eatWithState(type, nextCount, state) {
        const targetType = state.type;
        if (type === targetType) {
          for (let i2 = 0;i2 < nextCount; i2++) {
            this.next();
          }
          return true;
        } else {
          return false;
        }
      }
      ts_eatContextualWithState(name, nextCount, state) {
        if (keywordsRegExp.test(name)) {
          if (this.ts_isContextualWithState(state, tokTypes2[name])) {
            for (let i2 = 0;i2 < nextCount; i2++) {
              this.next();
            }
            return true;
          }
          return false;
        } else {
          if (!this.isContextualWithState(name, state))
            return false;
          for (let i2 = 0;i2 < nextCount; i2++) {
            this.next();
          }
          return true;
        }
      }
      canHaveLeadingDecorator() {
        return this.match(tt._class);
      }
      eatContextual(name) {
        if (keywordsRegExp.test(name)) {
          if (this.ts_isContextual(tokTypes2[name])) {
            this.next();
            return true;
          }
          return false;
        } else {
          return super.eatContextual(name);
        }
      }
      tsIsExternalModuleReference() {
        return this.isContextual("require") && this.lookaheadCharCode() === 40;
      }
      tsParseExternalModuleReference() {
        const node = this.startNode();
        this.expectContextual("require");
        this.expect(tt.parenL);
        if (!this.match(tt.string)) {
          this.unexpected();
        }
        node.expression = this.parseExprAtom();
        this.expect(tt.parenR);
        return this.finishNode(node, "TSExternalModuleReference");
      }
      tsParseEntityName(allowReservedWords = true) {
        let entity = this.parseIdent(allowReservedWords);
        while (this.eat(tt.dot)) {
          const node = this.startNodeAtNode(entity);
          node.left = entity;
          node.right = this.parseIdent(allowReservedWords);
          entity = this.finishNode(node, "TSQualifiedName");
        }
        return entity;
      }
      tsParseEnumMember() {
        const node = this.startNode();
        node.id = this.match(tt.string) ? this.parseLiteral(this.value) : this.parseIdent(true);
        if (this.eat(tt.eq)) {
          node.initializer = this.parseMaybeAssign();
        }
        return this.finishNode(node, "TSEnumMember");
      }
      tsParseEnumDeclaration(node, properties = {}) {
        if (properties.const)
          node.const = true;
        if (properties.declare)
          node.declare = true;
        this.expectContextual("enum");
        node.id = this.parseIdent();
        this.checkLValSimple(node.id);
        this.expect(tt.braceL);
        node.members = this.tsParseDelimitedList("EnumMembers", this.tsParseEnumMember.bind(this));
        this.expect(tt.braceR);
        return this.finishNode(node, "TSEnumDeclaration");
      }
      tsParseModuleBlock() {
        const node = this.startNode();
        this.enterScope(TS_SCOPE_OTHER);
        this.expect(tt.braceL);
        node.body = [];
        while (this.type !== tt.braceR) {
          let stmt = this.parseStatement(null, true);
          node.body.push(stmt);
        }
        this.next();
        super.exitScope();
        return this.finishNode(node, "TSModuleBlock");
      }
      tsParseAmbientExternalModuleDeclaration(node) {
        if (this.ts_isContextual(tokTypes2.global)) {
          node.global = true;
          node.id = this.parseIdent();
        } else if (this.match(tt.string)) {
          node.id = this.parseLiteral(this.value);
        } else {
          this.unexpected();
        }
        if (this.match(tt.braceL)) {
          this.enterScope(TS_SCOPE_TS_MODULE);
          node.body = this.tsParseModuleBlock();
          super.exitScope();
        } else {
          super.semicolon();
        }
        return this.finishNode(node, "TSModuleDeclaration");
      }
      tsTryParseDeclare(nany) {
        if (this.isLineTerminator()) {
          return;
        }
        let starttype = this.type;
        let kind;
        if (this.isContextual("let")) {
          starttype = tt._var;
          kind = "let";
        }
        return this.tsInAmbientContext(() => {
          if (starttype === tt._function) {
            nany.declare = true;
            return this.parseFunctionStatement(nany, false, true);
          }
          if (starttype === tt._class) {
            nany.declare = true;
            return this.parseClass(nany, true);
          }
          if (starttype === tokTypes2.enum) {
            return this.tsParseEnumDeclaration(nany, { declare: true });
          }
          if (starttype === tokTypes2.global) {
            return this.tsParseAmbientExternalModuleDeclaration(nany);
          }
          if (starttype === tt._const || starttype === tt._var) {
            if (!this.match(tt._const) || !this.isLookaheadContextual("enum")) {
              nany.declare = true;
              return this.parseVarStatement(nany, kind || this.value, true);
            }
            this.expect(tt._const);
            return this.tsParseEnumDeclaration(nany, {
              const: true,
              declare: true
            });
          }
          if (starttype === tokTypes2.interface) {
            const result = this.tsParseInterfaceDeclaration(nany, {
              declare: true
            });
            if (result)
              return result;
          }
          if (tokenIsIdentifier(starttype)) {
            return this.tsParseDeclaration(nany, this.value, true);
          }
        });
      }
      tsIsListTerminator(kind) {
        switch (kind) {
          case "EnumMembers":
          case "TypeMembers":
            return this.match(tt.braceR);
          case "HeritageClauseElement":
            return this.match(tt.braceL);
          case "TupleElementTypes":
            return this.match(tt.bracketR);
          case "TypeParametersOrArguments":
            return this.tsMatchRightRelational();
        }
      }
      tsParseDelimitedListWorker(kind, parseElement, expectSuccess, refTrailingCommaPos) {
        const result = [];
        let trailingCommaPos = -1;
        for (;; ) {
          if (this.tsIsListTerminator(kind)) {
            break;
          }
          trailingCommaPos = -1;
          const element = parseElement();
          if (element == null) {
            return;
          }
          result.push(element);
          if (this.eat(tt.comma)) {
            trailingCommaPos = this.lastTokStart;
            continue;
          }
          if (this.tsIsListTerminator(kind)) {
            break;
          }
          if (expectSuccess) {
            this.expect(tt.comma);
          }
          return;
        }
        if (refTrailingCommaPos) {
          refTrailingCommaPos.value = trailingCommaPos;
        }
        return result;
      }
      tsParseDelimitedList(kind, parseElement, refTrailingCommaPos) {
        return nonNull(this.tsParseDelimitedListWorker(kind, parseElement, true, refTrailingCommaPos));
      }
      tsParseBracketedList(kind, parseElement, bracket, skipFirstToken, refTrailingCommaPos) {
        if (!skipFirstToken) {
          if (bracket) {
            this.expect(tt.bracketL);
          } else {
            this.expect(tt.relational);
          }
        }
        const result = this.tsParseDelimitedList(kind, parseElement, refTrailingCommaPos);
        if (bracket) {
          this.expect(tt.bracketR);
        } else {
          this.expect(tt.relational);
        }
        return result;
      }
      tsParseTypeParameterName() {
        const typeName = this.parseIdent();
        return typeName.name;
      }
      tsEatThenParseType(token) {
        return !this.match(token) ? undefined : this.tsNextThenParseType();
      }
      tsExpectThenParseType(token) {
        return this.tsDoThenParseType(() => this.expect(token));
      }
      tsNextThenParseType() {
        return this.tsDoThenParseType(() => this.next());
      }
      tsDoThenParseType(cb) {
        return this.tsInType(() => {
          cb();
          return this.tsParseType();
        });
      }
      tsSkipParameterStart() {
        if (tokenIsIdentifier(this.type) || this.match(tt._this)) {
          this.next();
          return true;
        }
        if (this.match(tt.braceL)) {
          try {
            this.parseObj(true);
            return true;
          } catch {
            return false;
          }
        }
        if (this.match(tt.bracketL)) {
          this.next();
          try {
            this.parseBindingList(tt.bracketR, true, true);
            return true;
          } catch {
            return false;
          }
        }
        return false;
      }
      tsIsUnambiguouslyStartOfFunctionType() {
        this.next();
        if (this.match(tt.parenR) || this.match(tt.ellipsis)) {
          return true;
        }
        if (this.tsSkipParameterStart()) {
          if (this.match(tt.colon) || this.match(tt.comma) || this.match(tt.question) || this.match(tt.eq)) {
            return true;
          }
          if (this.match(tt.parenR)) {
            this.next();
            if (this.match(tt.arrow)) {
              return true;
            }
          }
        }
        return false;
      }
      tsIsStartOfFunctionType() {
        if (this.tsMatchLeftRelational()) {
          return true;
        }
        return this.match(tt.parenL) && this.tsLookAhead(this.tsIsUnambiguouslyStartOfFunctionType.bind(this));
      }
      tsInAllowConditionalTypesContext(cb) {
        const oldInDisallowConditionalTypesContext = this.inDisallowConditionalTypesContext;
        this.inDisallowConditionalTypesContext = false;
        try {
          return cb();
        } finally {
          this.inDisallowConditionalTypesContext = oldInDisallowConditionalTypesContext;
        }
      }
      tsParseBindingListForSignature() {
        return super.parseBindingList(tt.parenR, true, true).map((pattern) => {
          if (pattern.type !== "Identifier" && pattern.type !== "RestElement" && pattern.type !== "ObjectPattern" && pattern.type !== "ArrayPattern") {
            this.raise(pattern.start, TypeScriptError.UnsupportedSignatureParameterKind(pattern.type));
          }
          return pattern;
        });
      }
      tsParseTypePredicateAsserts() {
        if (this.type !== tokTypes2.asserts) {
          return false;
        }
        const containsEsc = this.containsEsc;
        this.next();
        if (!tokenIsIdentifier(this.type) && !this.match(tt._this)) {
          return false;
        }
        if (containsEsc) {
          this.raise(this.lastTokStart, "Escape sequence in keyword asserts");
        }
        return true;
      }
      tsParseThisTypeNode() {
        const node = this.startNode();
        this.next();
        return this.finishNode(node, "TSThisType");
      }
      tsParseTypeAnnotation(eatColon = true, t = this.startNode()) {
        this.tsInType(() => {
          if (eatColon)
            this.expect(tt.colon);
          t.typeAnnotation = this.tsParseType();
        });
        return this.finishNode(t, "TSTypeAnnotation");
      }
      tsParseThisTypePredicate(lhs) {
        this.next();
        const node = this.startNodeAtNode(lhs);
        node.parameterName = lhs;
        node.typeAnnotation = this.tsParseTypeAnnotation(false);
        node.asserts = false;
        return this.finishNode(node, "TSTypePredicate");
      }
      tsParseThisTypeOrThisTypePredicate() {
        const thisKeyword = this.tsParseThisTypeNode();
        if (this.isContextual("is") && !this.hasPrecedingLineBreak()) {
          return this.tsParseThisTypePredicate(thisKeyword);
        } else {
          return thisKeyword;
        }
      }
      tsParseTypePredicatePrefix() {
        const id = this.parseIdent();
        if (this.isContextual("is") && !this.hasPrecedingLineBreak()) {
          this.next();
          return id;
        }
      }
      tsParseTypeOrTypePredicateAnnotation(returnToken) {
        return this.tsInType(() => {
          const t = this.startNode();
          this.expect(returnToken);
          const node = this.startNode();
          const asserts = !!this.tsTryParse(this.tsParseTypePredicateAsserts.bind(this));
          if (asserts && this.match(tt._this)) {
            let thisTypePredicate = this.tsParseThisTypeOrThisTypePredicate();
            if (thisTypePredicate.type === "TSThisType") {
              node.parameterName = thisTypePredicate;
              node.asserts = true;
              node.typeAnnotation = null;
              thisTypePredicate = this.finishNode(node, "TSTypePredicate");
            } else {
              this.resetStartLocationFromNode(thisTypePredicate, node);
              thisTypePredicate.asserts = true;
            }
            t.typeAnnotation = thisTypePredicate;
            return this.finishNode(t, "TSTypeAnnotation");
          }
          const typePredicateVariable = this.tsIsIdentifier() && this.tsTryParse(this.tsParseTypePredicatePrefix.bind(this));
          if (!typePredicateVariable) {
            if (!asserts) {
              return this.tsParseTypeAnnotation(false, t);
            }
            node.parameterName = this.parseIdent();
            node.asserts = asserts;
            node.typeAnnotation = null;
            t.typeAnnotation = this.finishNode(node, "TSTypePredicate");
            return this.finishNode(t, "TSTypeAnnotation");
          }
          const type = this.tsParseTypeAnnotation(false);
          node.parameterName = typePredicateVariable;
          node.typeAnnotation = type;
          node.asserts = asserts;
          t.typeAnnotation = this.finishNode(node, "TSTypePredicate");
          return this.finishNode(t, "TSTypeAnnotation");
        });
      }
      tsFillSignature(returnToken, signature) {
        const returnTokenRequired = returnToken === tt.arrow;
        const paramsKey = "parameters";
        const returnTypeKey = "typeAnnotation";
        signature.typeParameters = this.tsTryParseTypeParameters();
        this.expect(tt.parenL);
        signature[paramsKey] = this.tsParseBindingListForSignature();
        if (returnTokenRequired) {
          signature[returnTypeKey] = this.tsParseTypeOrTypePredicateAnnotation(returnToken);
        } else if (this.match(returnToken)) {
          signature[returnTypeKey] = this.tsParseTypeOrTypePredicateAnnotation(returnToken);
        }
      }
      tsTryNextParseConstantContext() {
        if (this.lookahead().type !== tt._const)
          return null;
        this.next();
        const typeReference = this.tsParseTypeReference();
        if (typeReference.typeParameters || typeReference.typeArguments) {
          this.raise(typeReference.typeName.start, TypeScriptError.CannotFindName({
            name: "const"
          }));
        }
        return typeReference;
      }
      tsParseFunctionOrConstructorType(type, abstract) {
        const node = this.startNode();
        if (type === "TSConstructorType") {
          node.abstract = !!abstract;
          if (abstract)
            this.next();
          this.next();
        }
        this.tsInAllowConditionalTypesContext(() => this.tsFillSignature(tt.arrow, node));
        return this.finishNode(node, type);
      }
      tsParseUnionOrIntersectionType(kind, parseConstituentType, operator) {
        const node = this.startNode();
        const hasLeadingOperator = this.eat(operator);
        const types2 = [];
        do {
          types2.push(parseConstituentType());
        } while (this.eat(operator));
        if (types2.length === 1 && !hasLeadingOperator) {
          return types2[0];
        }
        node.types = types2;
        return this.finishNode(node, kind);
      }
      tsCheckTypeAnnotationForReadOnly(node) {
        switch (node.typeAnnotation.type) {
          case "TSTupleType":
          case "TSArrayType":
            return;
          default:
            this.raise(node.start, TypeScriptError.UnexpectedReadonly);
        }
      }
      tsParseTypeOperator() {
        const node = this.startNode();
        const operator = this.value;
        this.next();
        node.operator = operator;
        node.typeAnnotation = this.tsParseTypeOperatorOrHigher();
        if (operator === "readonly") {
          this.tsCheckTypeAnnotationForReadOnly(node);
        }
        return this.finishNode(node, "TSTypeOperator");
      }
      tsParseConstraintForInferType() {
        if (this.eat(tt._extends)) {
          const constraint = this.tsInDisallowConditionalTypesContext(() => this.tsParseType());
          if (this.inDisallowConditionalTypesContext || !this.match(tt.question)) {
            return constraint;
          }
        }
      }
      tsParseInferType() {
        const node = this.startNode();
        this.expectContextual("infer");
        const typeParameter = this.startNode();
        typeParameter.name = this.tsParseTypeParameterName();
        typeParameter.constraint = this.tsTryParse(() => this.tsParseConstraintForInferType());
        node.typeParameter = this.finishNode(typeParameter, "TSTypeParameter");
        return this.finishNode(node, "TSInferType");
      }
      tsParseLiteralTypeNode() {
        const node = this.startNode();
        node.literal = (() => {
          switch (this.type) {
            case tt.num:
            case tt.string:
            case tt._true:
            case tt._false:
              return this.parseExprAtom();
            default:
              this.unexpected();
          }
        })();
        return this.finishNode(node, "TSLiteralType");
      }
      tsParseImportType() {
        const node = this.startNode();
        this.expect(tt._import);
        this.expect(tt.parenL);
        if (!this.match(tt.string)) {
          this.raise(this.start, TypeScriptError.UnsupportedImportTypeArgument);
        }
        node.argument = this.parseExprAtom();
        this.expect(tt.parenR);
        if (this.eat(tt.dot)) {
          node.qualifier = this.tsParseEntityName();
        }
        if (this.tsMatchLeftRelational()) {
          node.typeArguments = this.tsParseTypeArguments();
        }
        return this.finishNode(node, "TSImportType");
      }
      tsParseTypeQuery() {
        const node = this.startNode();
        this.expect(tt._typeof);
        if (this.match(tt._import)) {
          node.exprName = this.tsParseImportType();
        } else {
          node.exprName = this.tsParseEntityName();
        }
        if (!this.hasPrecedingLineBreak() && this.tsMatchLeftRelational()) {
          node.typeArguments = this.tsParseTypeArguments();
        }
        return this.finishNode(node, "TSTypeQuery");
      }
      tsParseMappedTypeParameter() {
        const node = this.startNode();
        node.name = this.tsParseTypeParameterName();
        node.constraint = this.tsExpectThenParseType(tt._in);
        return this.finishNode(node, "TSTypeParameter");
      }
      tsParseMappedType() {
        const node = this.startNode();
        this.expect(tt.braceL);
        if (this.match(tt.plusMin)) {
          node.readonly = this.value;
          this.next();
          this.expectContextual("readonly");
        } else if (this.eatContextual("readonly")) {
          node.readonly = true;
        }
        this.expect(tt.bracketL);
        node.typeParameter = this.tsParseMappedTypeParameter();
        node.nameType = this.eatContextual("as") ? this.tsParseType() : null;
        this.expect(tt.bracketR);
        if (this.match(tt.plusMin)) {
          node.optional = this.value;
          this.next();
          this.expect(tt.question);
        } else if (this.eat(tt.question)) {
          node.optional = true;
        }
        node.typeAnnotation = this.tsTryParseType();
        this.semicolon();
        this.expect(tt.braceR);
        return this.finishNode(node, "TSMappedType");
      }
      tsParseTypeLiteral() {
        const node = this.startNode();
        node.members = this.tsParseObjectTypeMembers();
        return this.finishNode(node, "TSTypeLiteral");
      }
      tsParseTupleElementType() {
        const startLoc = this.startLoc;
        const startPos = this["start"];
        const rest = this.eat(tt.ellipsis);
        let type = this.tsParseType();
        const optional = this.eat(tt.question);
        const labeled = this.eat(tt.colon);
        if (labeled) {
          const labeledNode = this.startNodeAtNode(type);
          labeledNode.optional = optional;
          if (type.type === "TSTypeReference" && !type.typeArguments && type.typeName.type === "Identifier") {
            labeledNode.label = type.typeName;
          } else {
            this.raise(type.start, TypeScriptError.InvalidTupleMemberLabel);
            labeledNode.label = type;
          }
          labeledNode.elementType = this.tsParseType();
          type = this.finishNode(labeledNode, "TSNamedTupleMember");
        } else if (optional) {
          const optionalTypeNode = this.startNodeAtNode(type);
          optionalTypeNode.typeAnnotation = type;
          type = this.finishNode(optionalTypeNode, "TSOptionalType");
        }
        if (rest) {
          const restNode = this.startNodeAt(startPos, startLoc);
          restNode.typeAnnotation = type;
          type = this.finishNode(restNode, "TSRestType");
        }
        return type;
      }
      tsParseTupleType() {
        const node = this.startNode();
        node.elementTypes = this.tsParseBracketedList("TupleElementTypes", this.tsParseTupleElementType.bind(this), true, false);
        let seenOptionalElement = false;
        let labeledElements = null;
        node.elementTypes.forEach((elementNode) => {
          const { type } = elementNode;
          if (seenOptionalElement && type !== "TSRestType" && type !== "TSOptionalType" && !(type === "TSNamedTupleMember" && elementNode.optional)) {
            this.raise(elementNode.start, TypeScriptError.OptionalTypeBeforeRequired);
          }
          seenOptionalElement ||= type === "TSNamedTupleMember" && elementNode.optional || type === "TSOptionalType";
          let checkType = type;
          if (type === "TSRestType") {
            elementNode = elementNode.typeAnnotation;
            checkType = elementNode.type;
          }
          const isLabeled = checkType === "TSNamedTupleMember";
          labeledElements ??= isLabeled;
          if (labeledElements !== isLabeled) {
            this.raise(elementNode.start, TypeScriptError.MixedLabeledAndUnlabeledElements);
          }
        });
        return this.finishNode(node, "TSTupleType");
      }
      tsParseTemplateLiteralType() {
        const node = this.startNode();
        node.literal = this.parseTemplate({ isTagged: false });
        return this.finishNode(node, "TSLiteralType");
      }
      tsParseTypeReference() {
        const node = this.startNode();
        node.typeName = this.tsParseEntityName();
        if (!this.hasPrecedingLineBreak() && this.tsMatchLeftRelational()) {
          node.typeArguments = this.tsParseTypeArguments();
        }
        return this.finishNode(node, "TSTypeReference");
      }
      tsMatchLeftRelational() {
        return this.match(tt.relational) && this.value === "<";
      }
      tsMatchRightRelational() {
        return this.match(tt.relational) && this.value === ">";
      }
      tsParseParenthesizedType() {
        const node = this.startNode();
        this.expect(tt.parenL);
        node.typeAnnotation = this.tsParseType();
        this.expect(tt.parenR);
        return this.finishNode(node, "TSParenthesizedType");
      }
      tsParseNonArrayType() {
        switch (this.type) {
          case tt.string:
          case tt.num:
          case tt._true:
          case tt._false:
            return this.tsParseLiteralTypeNode();
          case tt.plusMin:
            if (this.value === "-") {
              const node = this.startNode();
              const nextToken = this.lookahead();
              if (nextToken.type !== tt.num) {
                this.unexpected();
              }
              node.literal = this.parseMaybeUnary();
              return this.finishNode(node, "TSLiteralType");
            }
            break;
          case tt._this:
            return this.tsParseThisTypeOrThisTypePredicate();
          case tt._typeof:
            return this.tsParseTypeQuery();
          case tt._import:
            return this.tsParseImportType();
          case tt.braceL:
            return this.tsLookAhead(this.tsIsStartOfMappedType.bind(this)) ? this.tsParseMappedType() : this.tsParseTypeLiteral();
          case tt.bracketL:
            return this.tsParseTupleType();
          case tt.parenL:
            return this.tsParseParenthesizedType();
          case tt.backQuote:
          case tt.dollarBraceL:
            return this.tsParseTemplateLiteralType();
          default: {
            const { type } = this;
            if (tokenIsIdentifier(type) || type === tt._void || type === tt._null) {
              const nodeType = type === tt._void ? "TSVoidKeyword" : type === tt._null ? "TSNullKeyword" : keywordTypeFromName(this.value);
              if (nodeType !== undefined && this.lookaheadCharCode() !== 46) {
                const node = this.startNode();
                this.next();
                return this.finishNode(node, nodeType);
              }
              return this.tsParseTypeReference();
            }
          }
        }
        this.unexpected();
      }
      tsParseArrayTypeOrHigher() {
        let type = this.tsParseNonArrayType();
        while (!this.hasPrecedingLineBreak() && this.eat(tt.bracketL)) {
          if (this.match(tt.bracketR)) {
            const node = this.startNodeAtNode(type);
            node.elementType = type;
            this.expect(tt.bracketR);
            type = this.finishNode(node, "TSArrayType");
          } else {
            const node = this.startNodeAtNode(type);
            node.objectType = type;
            node.indexType = this.tsParseType();
            this.expect(tt.bracketR);
            type = this.finishNode(node, "TSIndexedAccessType");
          }
        }
        return type;
      }
      tsParseTypeOperatorOrHigher() {
        const isTypeOperator = tokenIsTSTypeOperator(this.type) && !this.containsEsc;
        return isTypeOperator ? this.tsParseTypeOperator() : this.isContextual("infer") ? this.tsParseInferType() : this.tsInAllowConditionalTypesContext(() => this.tsParseArrayTypeOrHigher());
      }
      tsParseIntersectionTypeOrHigher() {
        return this.tsParseUnionOrIntersectionType("TSIntersectionType", this.tsParseTypeOperatorOrHigher.bind(this), tt.bitwiseAND);
      }
      tsParseUnionTypeOrHigher() {
        return this.tsParseUnionOrIntersectionType("TSUnionType", this.tsParseIntersectionTypeOrHigher.bind(this), tt.bitwiseOR);
      }
      tsParseNonConditionalType() {
        if (this.tsIsStartOfFunctionType()) {
          return this.tsParseFunctionOrConstructorType("TSFunctionType");
        }
        if (this.match(tt._new)) {
          return this.tsParseFunctionOrConstructorType("TSConstructorType");
        } else if (this.isAbstractConstructorSignature()) {
          return this.tsParseFunctionOrConstructorType("TSConstructorType", true);
        }
        return this.tsParseUnionTypeOrHigher();
      }
      tsParseType() {
        assert(this.inType);
        const type = this.tsParseNonConditionalType();
        if (this.inDisallowConditionalTypesContext || this.hasPrecedingLineBreak() || !this.eat(tt._extends)) {
          return type;
        }
        const node = this.startNodeAtNode(type);
        node.checkType = type;
        node.extendsType = this.tsInDisallowConditionalTypesContext(() => this.tsParseNonConditionalType());
        this.expect(tt.question);
        node.trueType = this.tsInAllowConditionalTypesContext(() => this.tsParseType());
        this.expect(tt.colon);
        node.falseType = this.tsInAllowConditionalTypesContext(() => this.tsParseType());
        return this.finishNode(node, "TSConditionalType");
      }
      tsIsUnambiguouslyIndexSignature() {
        this.next();
        if (tokenIsIdentifier(this.type)) {
          this.next();
          return this.match(tt.colon);
        }
        return false;
      }
      tsInType(cb) {
        const oldInType = this.inType;
        this.inType = true;
        try {
          return cb();
        } finally {
          this.inType = oldInType;
        }
      }
      tsTryParseIndexSignature(node) {
        if (!(this.match(tt.bracketL) && this.tsLookAhead(this.tsIsUnambiguouslyIndexSignature.bind(this)))) {
          return;
        }
        this.expect(tt.bracketL);
        const id = this.parseIdent();
        id.typeAnnotation = this.tsParseTypeAnnotation();
        this.resetEndLocation(id);
        this.expect(tt.bracketR);
        node.parameters = [id];
        const type = this.tsTryParseTypeAnnotation();
        if (type)
          node.typeAnnotation = type;
        this.tsParseTypeMemberSemicolon();
        return this.finishNode(node, "TSIndexSignature");
      }
      tsParseNoneModifiers(node) {
        this.tsParseModifiers({
          modified: node,
          allowedModifiers: [],
          disallowedModifiers: ["in", "out"],
          errorTemplate: TypeScriptError.InvalidModifierOnTypeParameterPositions
        });
      }
      tsParseTypeParameter(parseModifiers = this.tsParseNoneModifiers.bind(this)) {
        const node = this.startNode();
        parseModifiers(node);
        node.name = this.tsParseTypeParameterName();
        node.constraint = this.tsEatThenParseType(tt._extends);
        node.default = this.tsEatThenParseType(tt.eq);
        return this.finishNode(node, "TSTypeParameter");
      }
      tsParseTypeParameters(parseModifiers) {
        const node = this.startNode();
        if (this.tsMatchLeftRelational() || this.matchJsx("jsxTagStart")) {
          this.next();
        } else {
          this.unexpected();
        }
        const refTrailingCommaPos = { value: -1 };
        node.params = this.tsParseBracketedList("TypeParametersOrArguments", this.tsParseTypeParameter.bind(this, parseModifiers), false, true, refTrailingCommaPos);
        if (node.params.length === 0) {
          this.raise(this.start, TypeScriptError.EmptyTypeParameters);
        }
        if (refTrailingCommaPos.value !== -1) {
          this.addExtra(node, "trailingComma", refTrailingCommaPos.value);
        }
        return this.finishNode(node, "TSTypeParameterDeclaration");
      }
      tsTryParseTypeParameters(parseModifiers) {
        if (this.tsMatchLeftRelational()) {
          return this.tsParseTypeParameters(parseModifiers);
        }
      }
      tsTryParse(f) {
        const state = this.getCurLookaheadState();
        const result = f();
        if (result !== undefined && result !== false) {
          return result;
        } else {
          this.setLookaheadState(state);
          return;
        }
      }
      tsTokenCanFollowModifier() {
        return (this.match(tt.bracketL) || this.match(tt.braceL) || this.match(tt.star) || this.match(tt.ellipsis) || this.match(tt.privateId) || this.isLiteralPropertyName()) && !this.hasPrecedingLineBreak();
      }
      tsNextTokenCanFollowModifier() {
        this.next(true);
        return this.tsTokenCanFollowModifier();
      }
      tsParseModifier(allowedModifiers, stopOnStartOfClassStaticBlock) {
        const modifier = this.value;
        if (allowedModifiers.indexOf(modifier) !== -1 && !this.containsEsc) {
          if (stopOnStartOfClassStaticBlock && this.tsIsStartOfStaticBlocks()) {
            return;
          }
          if (this.tsTryParse(this.tsNextTokenCanFollowModifier.bind(this))) {
            return modifier;
          }
        }
        return;
      }
      tsParseModifiersByMap({
        modified,
        map
      }) {
        for (const key of Object.keys(map)) {
          modified[key] = map[key];
        }
      }
      tsParseModifiers({
        modified,
        allowedModifiers,
        disallowedModifiers,
        stopOnStartOfClassStaticBlock,
        errorTemplate = TypeScriptError.InvalidModifierOnTypeMember
      }) {
        const modifiedMap = {};
        const enforceOrder = (loc, modifier, before, after) => {
          if (modifier === before && modified[after]) {
            this.raise(loc.column, TypeScriptError.InvalidModifiersOrder({ orderedModifiers: [before, after] }));
          }
        };
        const incompatible = (loc, modifier, mod1, mod2) => {
          if (modified[mod1] && modifier === mod2 || modified[mod2] && modifier === mod1) {
            this.raise(loc.column, TypeScriptError.IncompatibleModifiers({ modifiers: [mod1, mod2] }));
          }
        };
        for (;; ) {
          const startLoc = this.startLoc;
          const modifier = this.tsParseModifier(allowedModifiers.concat(disallowedModifiers ?? []), stopOnStartOfClassStaticBlock);
          if (!modifier)
            break;
          if (tsIsAccessModifier(modifier)) {
            if (modified.accessibility) {
              this.raise(this.start, TypeScriptError.DuplicateAccessibilityModifier());
            } else {
              enforceOrder(startLoc, modifier, modifier, "override");
              enforceOrder(startLoc, modifier, modifier, "static");
              enforceOrder(startLoc, modifier, modifier, "readonly");
              enforceOrder(startLoc, modifier, modifier, "accessor");
              modifiedMap.accessibility = modifier;
              modified["accessibility"] = modifier;
            }
          } else if (tsIsVarianceAnnotations(modifier)) {
            if (modified[modifier]) {
              this.raise(this.start, TypeScriptError.DuplicateModifier({ modifier }));
            } else {
              enforceOrder(startLoc, modifier, "in", "out");
              modifiedMap[modifier] = modifier;
              modified[modifier] = true;
            }
          } else if (tsIsClassAccessor(modifier)) {
            if (modified[modifier]) {
              this.raise(this.start, TypeScriptError.DuplicateModifier({ modifier }));
            } else {
              incompatible(startLoc, modifier, "accessor", "readonly");
              incompatible(startLoc, modifier, "accessor", "static");
              incompatible(startLoc, modifier, "accessor", "override");
              modifiedMap[modifier] = modifier;
              modified[modifier] = true;
            }
          } else if (modifier === "const") {
            if (modified[modifier]) {
              this.raise(this.start, TypeScriptError.DuplicateModifier({ modifier }));
            } else {
              modifiedMap[modifier] = modifier;
              modified[modifier] = true;
            }
          } else {
            if (Object.hasOwnProperty.call(modified, modifier)) {
              this.raise(this.start, TypeScriptError.DuplicateModifier({ modifier }));
            } else {
              enforceOrder(startLoc, modifier, "static", "readonly");
              enforceOrder(startLoc, modifier, "static", "override");
              enforceOrder(startLoc, modifier, "override", "readonly");
              enforceOrder(startLoc, modifier, "abstract", "override");
              incompatible(startLoc, modifier, "declare", "override");
              incompatible(startLoc, modifier, "static", "abstract");
              modifiedMap[modifier] = modifier;
              modified[modifier] = true;
            }
          }
          if (disallowedModifiers?.includes(modifier)) {
            this.raise(this.start, errorTemplate);
          }
        }
        return modifiedMap;
      }
      tsParseInOutModifiers(node) {
        this.tsParseModifiers({
          modified: node,
          allowedModifiers: ["in", "out"],
          disallowedModifiers: [
            "public",
            "private",
            "protected",
            "readonly",
            "declare",
            "abstract",
            "override"
          ],
          errorTemplate: TypeScriptError.InvalidModifierOnTypeParameter
        });
      }
      parseMaybeUnary(refExpressionErrors, sawUnary, incDec, forInit) {
        if (!options?.jsx && this.tsMatchLeftRelational()) {
          return this.tsParseTypeAssertion();
        } else {
          return super.parseMaybeUnary(refExpressionErrors, sawUnary, incDec, forInit);
        }
      }
      tsParseTypeAssertion() {
        if (disallowAmbiguousJSXLike) {
          this.raise(this.start, TypeScriptError.ReservedTypeAssertion);
        }
        const result = this.tryParse(() => {
          const node = this.startNode();
          const _const = this.tsTryNextParseConstantContext();
          node.typeAnnotation = _const || this.tsNextThenParseType();
          this.expect(tt.relational);
          node.expression = this.parseMaybeUnary();
          return this.finishNode(node, "TSTypeAssertion");
        });
        if (result.error) {
          return this.tsParseTypeParameters(this.tsParseConstModifier);
        } else {
          return result.node;
        }
      }
      tsParseTypeArguments() {
        const node = this.startNode();
        node.params = this.tsInType(() => this.tsInNoContext(() => {
          this.expect(tt.relational);
          return this.tsParseDelimitedList("TypeParametersOrArguments", this.tsParseType.bind(this));
        }));
        if (node.params.length === 0) {
          this.raise(this.start, TypeScriptError.EmptyTypeArguments);
        }
        this.exprAllowed = false;
        this.expect(tt.relational);
        return this.finishNode(node, "TSTypeParameterInstantiation");
      }
      tsParseHeritageClause(token) {
        const originalStart = this.start;
        const delimitedList = this.tsParseDelimitedList("HeritageClauseElement", () => {
          const node = this.startNode();
          node.expression = this.tsParseEntityName();
          if (this.tsMatchLeftRelational()) {
            node.typeParameters = this.tsParseTypeArguments();
          }
          return this.finishNode(node, "TSExpressionWithTypeArguments");
        });
        if (!delimitedList.length) {
          this.raise(originalStart, TypeScriptError.EmptyHeritageClauseType({ token }));
        }
        return delimitedList;
      }
      tsParseTypeMemberSemicolon() {
        if (!this.eat(tt.comma) && !this.isLineTerminator()) {
          this.expect(tt.semi);
        }
      }
      tsTryParseAndCatch(f) {
        const result = this.tryParse((abort) => f() || abort());
        if (result.aborted || !result.node)
          return;
        if (result.error)
          this.setLookaheadState(result.failState);
        return result.node;
      }
      tsParseSignatureMember(kind, node) {
        this.tsFillSignature(tt.colon, node);
        this.tsParseTypeMemberSemicolon();
        return this.finishNode(node, kind);
      }
      tsParsePropertyOrMethodSignature(node, readonly) {
        if (this.eat(tt.question))
          node.optional = true;
        const nodeAny = node;
        if (this.match(tt.parenL) || this.tsMatchLeftRelational()) {
          if (readonly) {
            this.raise(node.start, TypeScriptError.ReadonlyForMethodSignature);
          }
          const method = nodeAny;
          if (method.kind && this.tsMatchLeftRelational()) {
            this.raise(this.start, TypeScriptError.AccesorCannotHaveTypeParameters);
          }
          this.tsFillSignature(tt.colon, method);
          this.tsParseTypeMemberSemicolon();
          const paramsKey = "parameters";
          const returnTypeKey = "typeAnnotation";
          if (method.kind === "get") {
            if (method[paramsKey].length > 0) {
              this.raise(this.start, "A 'get' accesor must not have any formal parameters.");
              if (this.isThisParam(method[paramsKey][0])) {
                this.raise(this.start, TypeScriptError.AccesorCannotDeclareThisParameter);
              }
            }
          } else if (method.kind === "set") {
            if (method[paramsKey].length !== 1) {
              this.raise(this.start, "A 'get' accesor must not have any formal parameters.");
            } else {
              const firstParameter = method[paramsKey][0];
              if (this.isThisParam(firstParameter)) {
                this.raise(this.start, TypeScriptError.AccesorCannotDeclareThisParameter);
              }
              if (firstParameter.type === "Identifier" && firstParameter.optional) {
                this.raise(this.start, TypeScriptError.SetAccesorCannotHaveOptionalParameter);
              }
              if (firstParameter.type === "RestElement") {
                this.raise(this.start, TypeScriptError.SetAccesorCannotHaveRestParameter);
              }
            }
            if (method[returnTypeKey]) {
              this.raise(method[returnTypeKey].start, TypeScriptError.SetAccesorCannotHaveReturnType);
            }
          } else {
            method.kind = "method";
          }
          return this.finishNode(method, "TSMethodSignature");
        } else {
          const property = nodeAny;
          if (readonly)
            property.readonly = true;
          const type = this.tsTryParseTypeAnnotation();
          if (type)
            property.typeAnnotation = type;
          this.tsParseTypeMemberSemicolon();
          return this.finishNode(property, "TSPropertySignature");
        }
      }
      tsParseTypeMember() {
        const node = this.startNode();
        if (this.match(tt.parenL) || this.tsMatchLeftRelational()) {
          return this.tsParseSignatureMember("TSCallSignatureDeclaration", node);
        }
        if (this.match(tt._new)) {
          const id = this.startNode();
          this.next();
          if (this.match(tt.parenL) || this.tsMatchLeftRelational()) {
            return this.tsParseSignatureMember("TSConstructSignatureDeclaration", node);
          } else {
            node.key = this.createIdentifier(id, "new");
            return this.tsParsePropertyOrMethodSignature(node, false);
          }
        }
        this.tsParseModifiers({
          modified: node,
          allowedModifiers: ["readonly"],
          disallowedModifiers: [
            "declare",
            "abstract",
            "private",
            "protected",
            "public",
            "static",
            "override"
          ]
        });
        const idx = this.tsTryParseIndexSignature(node);
        if (idx) {
          return idx;
        }
        this.parsePropertyName(node);
        if (!node.computed && node.key.type === "Identifier" && (node.key.name === "get" || node.key.name === "set") && this.tsTokenCanFollowModifier()) {
          node.kind = node.key.name;
          this.parsePropertyName(node);
        }
        return this.tsParsePropertyOrMethodSignature(node, !!node.readonly);
      }
      tsParseList(kind, parseElement) {
        const result = [];
        while (!this.tsIsListTerminator(kind)) {
          result.push(parseElement());
        }
        return result;
      }
      tsParseObjectTypeMembers() {
        this.expect(tt.braceL);
        const members = this.tsParseList("TypeMembers", this.tsParseTypeMember.bind(this));
        this.expect(tt.braceR);
        return members;
      }
      tsParseInterfaceDeclaration(node, properties = {}) {
        if (this.hasFollowingLineBreak())
          return null;
        this.expectContextual("interface");
        if (properties.declare)
          node.declare = true;
        if (tokenIsIdentifier(this.type)) {
          node.id = this.parseIdent();
          this.checkLValSimple(node.id, acornScope.BIND_TS_INTERFACE);
        } else {
          node.id = null;
          this.raise(this.start, TypeScriptError.MissingInterfaceName);
        }
        node.typeParameters = this.tsTryParseTypeParameters(this.tsParseInOutModifiers.bind(this));
        if (this.eat(tt._extends)) {
          node.extends = this.tsParseHeritageClause("extends");
        }
        const body = this.startNode();
        body.body = this.tsInType(this.tsParseObjectTypeMembers.bind(this));
        node.body = this.finishNode(body, "TSInterfaceBody");
        return this.finishNode(node, "TSInterfaceDeclaration");
      }
      tsParseAbstractDeclaration(node) {
        if (this.match(tt._class)) {
          node.abstract = true;
          return this.parseClass(node, true);
        } else if (this.ts_isContextual(tokTypes2.interface)) {
          if (!this.hasFollowingLineBreak()) {
            node.abstract = true;
            return this.tsParseInterfaceDeclaration(node);
          }
        } else {
          this.unexpected(node.start);
        }
      }
      tsIsDeclarationStart() {
        return tokenIsTSDeclarationStart(this.type);
      }
      tsParseExpressionStatement(node, expr) {
        switch (expr.name) {
          case "declare": {
            const declaration = this.tsTryParseDeclare(node);
            if (declaration) {
              declaration.declare = true;
              return declaration;
            }
            break;
          }
          case "global":
            if (this.match(tt.braceL)) {
              this.enterScope(TS_SCOPE_TS_MODULE);
              const mod = node;
              mod.global = true;
              mod.id = expr;
              mod.body = this.tsParseModuleBlock();
              super.exitScope();
              return this.finishNode(mod, "TSModuleDeclaration");
            }
            break;
          default:
            return this.tsParseDeclaration(node, expr.name, false);
        }
      }
      tsParseModuleReference() {
        return this.tsIsExternalModuleReference() ? this.tsParseExternalModuleReference() : this.tsParseEntityName(false);
      }
      tsIsExportDefaultSpecifier() {
        const { type } = this;
        const isAsync = this.isAsyncFunction();
        const isLet = this.isLet();
        if (tokenIsIdentifier(type)) {
          if (isAsync && !this.containsEsc || isLet) {
            return false;
          }
          if ((type === tokTypes2.type || type === tokTypes2.interface) && !this.containsEsc) {
            const ahead = this.lookahead();
            if (tokenIsIdentifier(ahead.type) && !this.isContextualWithState("from", ahead) || ahead.type === tt.braceL) {
              return false;
            }
          }
        } else if (!this.match(tt._default)) {
          return false;
        }
        const next = this.nextTokenStart();
        const hasFrom = this.isUnparsedContextual(next, "from");
        if (this.input.charCodeAt(next) === 44 || tokenIsIdentifier(this.type) && hasFrom) {
          return true;
        }
        if (this.match(tt._default) && hasFrom) {
          const nextAfterFrom = this.input.charCodeAt(this.nextTokenStartSince(next + 4));
          return nextAfterFrom === 34 || nextAfterFrom === 39;
        }
        return false;
      }
      tsInAmbientContext(cb) {
        const oldIsAmbientContext = this.isAmbientContext;
        this.isAmbientContext = true;
        try {
          return cb();
        } finally {
          this.isAmbientContext = oldIsAmbientContext;
        }
      }
      tsCheckLineTerminator(next) {
        if (next) {
          if (this.hasFollowingLineBreak())
            return false;
          this.next();
          return true;
        }
        return !this.isLineTerminator();
      }
      tsParseModuleOrNamespaceDeclaration(node, nested = false) {
        node.id = this.parseIdent();
        if (!nested) {
          this.checkLValSimple(node.id, acornScope.BIND_TS_NAMESPACE);
        }
        if (this.eat(tt.dot)) {
          const inner = this.startNode();
          this.tsParseModuleOrNamespaceDeclaration(inner, true);
          node.body = inner;
        } else {
          this.enterScope(TS_SCOPE_TS_MODULE);
          node.body = this.tsParseModuleBlock();
          super.exitScope();
        }
        return this.finishNode(node, "TSModuleDeclaration");
      }
      checkLValSimple(expr, bindingType = acornScope.BIND_NONE, checkClashes) {
        if (expr.type === "TSNonNullExpression" || expr.type === "TSAsExpression") {
          expr = expr.expression;
        }
        return super.checkLValSimple(expr, bindingType, checkClashes);
      }
      tsParseTypeAliasDeclaration(node) {
        node.id = this.parseIdent();
        this.checkLValSimple(node.id, acornScope.BIND_TS_TYPE);
        node.typeAnnotation = this.tsInType(() => {
          node.typeParameters = this.tsTryParseTypeParameters(this.tsParseInOutModifiers.bind(this));
          this.expect(tt.eq);
          if (this.ts_isContextual(tokTypes2.interface) && this.lookahead().type !== tt.dot) {
            const node2 = this.startNode();
            this.next();
            return this.finishNode(node2, "TSIntrinsicKeyword");
          }
          return this.tsParseType();
        });
        this.semicolon();
        return this.finishNode(node, "TSTypeAliasDeclaration");
      }
      tsParseDeclaration(node, value, next) {
        switch (value) {
          case "abstract":
            if (this.tsCheckLineTerminator(next) && (this.match(tt._class) || tokenIsIdentifier(this.type))) {
              return this.tsParseAbstractDeclaration(node);
            }
            break;
          case "module":
            if (this.tsCheckLineTerminator(next)) {
              if (this.match(tt.string)) {
                return this.tsParseAmbientExternalModuleDeclaration(node);
              } else if (tokenIsIdentifier(this.type)) {
                return this.tsParseModuleOrNamespaceDeclaration(node);
              }
            }
            break;
          case "namespace":
            if (this.tsCheckLineTerminator(next) && tokenIsIdentifier(this.type)) {
              return this.tsParseModuleOrNamespaceDeclaration(node);
            }
            break;
          case "type":
            if (this.tsCheckLineTerminator(next) && tokenIsIdentifier(this.type)) {
              return this.tsParseTypeAliasDeclaration(node);
            }
            break;
        }
      }
      tsTryParseExportDeclaration() {
        return this.tsParseDeclaration(this.startNode(), this.value, true);
      }
      tsParseImportEqualsDeclaration(node, isExport) {
        node.isExport = isExport || false;
        node.id = this.parseIdent();
        this.checkLValSimple(node.id, acornScope.BIND_LEXICAL);
        super.expect(tt.eq);
        const moduleReference = this.tsParseModuleReference();
        if (node.importKind === "type" && moduleReference.type !== "TSExternalModuleReference") {
          this.raise(moduleReference.start, TypeScriptError.ImportAliasHasImportType);
        }
        node.moduleReference = moduleReference;
        super.semicolon();
        return this.finishNode(node, "TSImportEqualsDeclaration");
      }
      isExportDefaultSpecifier() {
        if (this.tsIsDeclarationStart())
          return false;
        const { type } = this;
        if (tokenIsIdentifier(type)) {
          if (this.isContextual("async") || this.isContextual("let")) {
            return false;
          }
          if ((type === tokTypes2.type || type === tokTypes2.interface) && !this.containsEsc) {
            const ahead = this.lookahead();
            if (tokenIsIdentifier(ahead.type) && !this.isContextualWithState("from", ahead) || ahead.type === tt.braceL) {
              return false;
            }
          }
        } else if (!this.match(tt._default)) {
          return false;
        }
        const next = this.nextTokenStart();
        const hasFrom = this.isUnparsedContextual(next, "from");
        if (this.input.charCodeAt(next) === 44 || tokenIsIdentifier(this.type) && hasFrom) {
          return true;
        }
        if (this.match(tt._default) && hasFrom) {
          const nextAfterFrom = this.input.charCodeAt(this.nextTokenStartSince(next + 4));
          return nextAfterFrom === 34 || nextAfterFrom === 39;
        }
        return false;
      }
      parseTemplate({ isTagged = false } = {}) {
        let node = this.startNode();
        this.next();
        node.expressions = [];
        let curElt = this.parseTemplateElement({ isTagged });
        node.quasis = [curElt];
        while (!curElt.tail) {
          if (this.type === tt.eof)
            this.raise(this.pos, "Unterminated template literal");
          this.expect(tt.dollarBraceL);
          node.expressions.push(this.inType ? this.tsParseType() : this.parseExpression());
          this.expect(tt.braceR);
          node.quasis.push(curElt = this.parseTemplateElement({ isTagged }));
        }
        this.next();
        return this.finishNode(node, "TemplateLiteral");
      }
      parseFunction(node, statement, allowExpressionBody, isAsync, forInit) {
        this.initFunction(node);
        if (this.ecmaVersion >= 9 || this.ecmaVersion >= 6 && !isAsync) {
          if (this.type === tt.star && statement & FUNC_HANGING_STATEMENT2) {
            this.unexpected();
          }
          node.generator = this.eat(tt.star);
        }
        if (this.ecmaVersion >= 8) {
          node.async = !!isAsync;
        }
        if (statement & FUNC_STATEMENT2) {
          node.id = statement & FUNC_NULLABLE_ID2 && this.type !== tt.name ? null : this.parseIdent();
        }
        let oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
        const oldMaybeInArrowParameters = this.maybeInArrowParameters;
        this.maybeInArrowParameters = false;
        this.yieldPos = 0;
        this.awaitPos = 0;
        this.awaitIdentPos = 0;
        this.enterScope(functionFlags2(node.async, node.generator));
        if (!(statement & FUNC_STATEMENT2)) {
          node.id = this.type === tt.name ? this.parseIdent() : null;
        }
        this.parseFunctionParams(node);
        const isDeclaration = statement & FUNC_STATEMENT2;
        this.parseFunctionBody(node, allowExpressionBody, false, forInit, {
          isFunctionDeclaration: isDeclaration
        });
        this.yieldPos = oldYieldPos;
        this.awaitPos = oldAwaitPos;
        this.awaitIdentPos = oldAwaitIdentPos;
        if (statement & FUNC_STATEMENT2 && node.id && !(statement & FUNC_HANGING_STATEMENT2)) {
          if (node.body) {
            this.checkLValSimple(node.id, this.strict || node.generator || node.async ? this.treatFunctionsAsVar ? acornScope.BIND_VAR : acornScope.BIND_LEXICAL : acornScope.BIND_FUNCTION);
          } else {
            this.checkLValSimple(node.id, acornScope.BIND_NONE);
          }
        }
        this.maybeInArrowParameters = oldMaybeInArrowParameters;
        return this.finishNode(node, isDeclaration ? "FunctionDeclaration" : "FunctionExpression");
      }
      parseFunctionBody(node, isArrowFunction = false, isMethod = false, forInit = false, tsConfig) {
        if (this.match(tt.colon)) {
          node.returnType = this.tsParseTypeOrTypePredicateAnnotation(tt.colon);
        }
        const bodilessType = tsConfig?.isFunctionDeclaration ? "TSDeclareFunction" : tsConfig?.isClassMethod ? "TSDeclareMethod" : undefined;
        if (bodilessType && !this.match(tt.braceL) && this.isLineTerminator()) {
          return this.finishNode(node, bodilessType);
        }
        if (bodilessType === "TSDeclareFunction" && this.isAmbientContext) {
          this.raise(node.start, TypeScriptError.DeclareFunctionHasImplementation);
          if (node.declare) {
            super.parseFunctionBody(node, isArrowFunction, isMethod, false);
            return this.finishNode(node, bodilessType);
          }
        }
        super.parseFunctionBody(node, isArrowFunction, isMethod, forInit);
        return node;
      }
      parseNew() {
        if (this.containsEsc)
          this.raiseRecoverable(this.start, "Escape sequence in keyword new");
        let node = this.startNode();
        let meta = this.parseIdent(true);
        if (this.ecmaVersion >= 6 && this.eat(tt.dot)) {
          node.meta = meta;
          let containsEsc = this.containsEsc;
          node.property = this.parseIdent(true);
          if (node.property.name !== "target")
            this.raiseRecoverable(node.property.start, "The only valid meta property for new is 'new.target'");
          if (containsEsc)
            this.raiseRecoverable(node.start, "'new.target' must not contain escaped characters");
          if (!this["allowNewDotTarget"])
            this.raiseRecoverable(node.start, "'new.target' can only be used in functions and class static block");
          return this.finishNode(node, "MetaProperty");
        }
        let startPos = this.start, startLoc = this.startLoc, isImport = this.type === tt._import;
        node.callee = this.parseSubscripts(this.parseExprAtom(), startPos, startLoc, true, false);
        if (isImport && node.callee.type === "ImportExpression") {
          this.raise(startPos, "Cannot use new with import()");
        }
        const { callee } = node;
        if (callee.type === "TSInstantiationExpression" && !callee.extra?.parenthesized) {
          node.typeArguments = callee.typeArguments;
          node.callee = callee.expression;
        }
        if (this.eat(tt.parenL))
          node.arguments = this.parseExprList(tt.parenR, this.ecmaVersion >= 8, false);
        else
          node.arguments = [];
        return this.finishNode(node, "NewExpression");
      }
      parseExprOp(left, leftStartPos, leftStartLoc, minPrec, forInit) {
        if (tt._in.binop > minPrec && !this.hasPrecedingLineBreak()) {
          let nodeType;
          if (this.isContextual("as")) {
            nodeType = "TSAsExpression";
          }
          if (this.isContextual("satisfies")) {
            nodeType = "TSSatisfiesExpression";
          }
          if (nodeType) {
            const node = this.startNodeAt(leftStartPos, leftStartLoc);
            node.expression = left;
            const _const = this.tsTryNextParseConstantContext();
            if (_const) {
              node.typeAnnotation = _const;
            } else {
              node.typeAnnotation = this.tsNextThenParseType();
            }
            this.finishNode(node, nodeType);
            this.reScan_lt_gt();
            return this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec, forInit);
          }
        }
        return super.parseExprOp(left, leftStartPos, leftStartLoc, minPrec, forInit);
      }
      parseImportSpecifiers() {
        let nodes = [], first = true;
        if (acornTypeScript.tokenIsIdentifier(this.type)) {
          nodes.push(this.parseImportDefaultSpecifier());
          if (!this.eat(tt.comma))
            return nodes;
        }
        if (this.type === tt.star) {
          nodes.push(this.parseImportNamespaceSpecifier());
          return nodes;
        }
        this.expect(tt.braceL);
        while (!this.eat(tt.braceR)) {
          if (!first) {
            this.expect(tt.comma);
            if (this.afterTrailingComma(tt.braceR))
              break;
          } else
            first = false;
          nodes.push(this.parseImportSpecifier());
        }
        return nodes;
      }
      parseImport(node) {
        let enterHead = this.lookahead();
        node.importKind = "value";
        this.importOrExportOuterKind = "value";
        if (tokenIsIdentifier(enterHead.type) || this.match(tt.star) || this.match(tt.braceL)) {
          let ahead = this.lookahead(2);
          if (ahead.type !== tt.comma && !this.isContextualWithState("from", ahead) && ahead.type !== tt.eq && this.ts_eatContextualWithState("type", 1, enterHead)) {
            this.importOrExportOuterKind = "type";
            node.importKind = "type";
            enterHead = this.lookahead();
            ahead = this.lookahead(2);
          }
          if (tokenIsIdentifier(enterHead.type) && ahead.type === tt.eq) {
            this.next();
            const importNode = this.tsParseImportEqualsDeclaration(node);
            this.importOrExportOuterKind = "value";
            return importNode;
          }
        }
        this.next();
        if (this.type === tt.string) {
          node.specifiers = [];
          node.source = this.parseExprAtom();
        } else {
          node.specifiers = this.parseImportSpecifiers();
          this.expectContextual("from");
          node.source = this.type === tt.string ? this.parseExprAtom() : this.unexpected();
        }
        this.parseMaybeImportAttributes(node);
        this.semicolon();
        this.finishNode(node, "ImportDeclaration");
        this.importOrExportOuterKind = "value";
        if (node.importKind === "type" && node.specifiers.length > 1 && node.specifiers[0].type === "ImportDefaultSpecifier") {
          this.raise(node.start, TypeScriptError.TypeImportCannotSpecifyDefaultAndNamed);
        }
        return node;
      }
      parseExportDefaultDeclaration() {
        if (this.isAbstractClass()) {
          const cls = this.startNode();
          this.next();
          cls.abstract = true;
          return this.parseClass(cls, true);
        }
        if (this.match(tokTypes2.interface)) {
          const result = this.tsParseInterfaceDeclaration(this.startNode());
          if (result)
            return result;
        }
        return super.parseExportDefaultDeclaration();
      }
      parseExportAllDeclaration(node, exports) {
        if (this.ecmaVersion >= 11) {
          if (this.eatContextual("as")) {
            node.exported = this.parseModuleExportName();
            this.checkExport(exports, node.exported, this.lastTokStart);
          } else {
            node.exported = null;
          }
        }
        this.expectContextual("from");
        if (this.type !== tt.string)
          this.unexpected();
        node.source = this.parseExprAtom();
        this.parseMaybeImportAttributes(node);
        this.semicolon();
        return this.finishNode(node, "ExportAllDeclaration");
      }
      parseDynamicImport(node) {
        this.next();
        node.source = this.parseMaybeAssign();
        if (this.eat(tt.comma)) {
          const expr = this.parseExpression();
          node.arguments = [expr];
        }
        if (!this.eat(tt.parenR)) {
          const errorPos = this.start;
          if (this.eat(tt.comma) && this.eat(tt.parenR)) {
            this.raiseRecoverable(errorPos, "Trailing comma is not allowed in import()");
          } else {
            this.unexpected(errorPos);
          }
        }
        return this.finishNode(node, "ImportExpression");
      }
      parseExport(node, exports) {
        let enterHead = this.lookahead();
        if (this.ts_eatWithState(tt._import, 2, enterHead)) {
          if (this.ts_isContextual(tokTypes2.type) && this.lookaheadCharCode() !== 61) {
            node.importKind = "type";
            this.importOrExportOuterKind = "type";
            this.next();
          } else {
            node.importKind = "value";
            this.importOrExportOuterKind = "value";
          }
          const exportEqualsNode = this.tsParseImportEqualsDeclaration(node, true);
          this.importOrExportOuterKind = undefined;
          return exportEqualsNode;
        } else if (this.ts_eatWithState(tt.eq, 2, enterHead)) {
          const assign = node;
          assign.expression = this.parseExpression();
          this.semicolon();
          this.importOrExportOuterKind = undefined;
          return this.finishNode(assign, "TSExportAssignment");
        } else if (this.ts_eatContextualWithState("as", 2, enterHead)) {
          const decl = node;
          this.expectContextual("namespace");
          decl.id = this.parseIdent();
          this.semicolon();
          this.importOrExportOuterKind = undefined;
          return this.finishNode(decl, "TSNamespaceExportDeclaration");
        } else {
          if (this.ts_isContextualWithState(enterHead, tokTypes2.type) && this.lookahead(2).type === tt.braceL) {
            this.next();
            this.importOrExportOuterKind = "type";
            node.exportKind = "type";
          } else {
            this.importOrExportOuterKind = "value";
            node.exportKind = "value";
          }
          this.next();
          if (this.eat(tt.star)) {
            return this.parseExportAllDeclaration(node, exports);
          }
          if (this.eat(tt._default)) {
            this.checkExport(exports, "default", this.lastTokStart);
            node.declaration = this.parseExportDefaultDeclaration();
            return this.finishNode(node, "ExportDefaultDeclaration");
          }
          if (this.shouldParseExportStatement()) {
            node.declaration = this.parseExportDeclaration(node);
            if (node.declaration.type === "VariableDeclaration")
              this.checkVariableExport(exports, node.declaration.declarations);
            else
              this.checkExport(exports, node.declaration.id, node.declaration.id.start);
            node.specifiers = [];
            node.source = null;
          } else {
            node.declaration = null;
            node.specifiers = this.parseExportSpecifiers(exports);
            if (this.eatContextual("from")) {
              if (this.type !== tt.string)
                this.unexpected();
              node.source = this.parseExprAtom();
              this.parseMaybeImportAttributes(node);
            } else {
              for (let spec of node.specifiers) {
                this.checkUnreserved(spec.local);
                this.checkLocalExport(spec.local);
                if (spec.local.type === "Literal") {
                  this.raise(spec.local.start, "A string literal cannot be used as an exported binding without `from`.");
                }
              }
              node.source = null;
            }
            this.semicolon();
          }
          return this.finishNode(node, "ExportNamedDeclaration");
        }
      }
      checkExport(exports, name, _) {
        if (!exports) {
          return;
        }
        if (typeof name !== "string") {
          name = name.type === "Identifier" ? name.name : name.value;
        }
        exports[name] = true;
      }
      parseMaybeDefault(startPos, startLoc, left) {
        const node = super.parseMaybeDefault(startPos, startLoc, left);
        if (node.type === "AssignmentPattern" && node.typeAnnotation && node.right.start < node.typeAnnotation.start) {
          this.raise(node.typeAnnotation.start, TypeScriptError.TypeAnnotationAfterAssign);
        }
        return node;
      }
      typeCastToParameter(node) {
        node.expression.typeAnnotation = node.typeAnnotation;
        this.resetEndLocation(node.expression, node.typeAnnotation.end, node.typeAnnotation.loc?.end);
        return node.expression;
      }
      toAssignableList(exprList, isBinding) {
        for (let i2 = 0;i2 < exprList.length; i2++) {
          const expr = exprList[i2];
          if (expr?.type === "TSTypeCastExpression") {
            exprList[i2] = this.typeCastToParameter(expr);
          }
        }
        return super.toAssignableList(exprList, isBinding);
      }
      reportReservedArrowTypeParam(node) {
        if (node.params.length === 1 && !node.extra?.trailingComma && disallowAmbiguousJSXLike) {
          this.raise(node.start, TypeScriptError.ReservedArrowTypeParam);
        }
      }
      parseExprAtom(refDestructuringErrors, forInit, forNew) {
        if (this.type === tokTypes2.jsxText) {
          return this.jsx_parseText();
        } else if (this.type === tokTypes2.jsxTagStart) {
          return this.jsx_parseElement();
        } else if (this.type === tokTypes2.at) {
          this.parseDecorators();
          return this.parseExprAtom();
        } else if (tokenIsIdentifier(this.type)) {
          let canBeArrow = this.potentialArrowAt === this.start;
          let startPos = this.start, startLoc = this.startLoc, containsEsc = this.containsEsc;
          let id = this.parseIdent(false);
          if (this.ecmaVersion >= 8 && !containsEsc && id.name === "async" && !this.canInsertSemicolon() && this.eat(tt._function)) {
            this.overrideContext(tokContexts.f_expr);
            return this.parseFunction(this.startNodeAt(startPos, startLoc), 0, false, true, forInit);
          }
          if (canBeArrow && !this.canInsertSemicolon()) {
            if (this.eat(tt.arrow))
              return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], false, forInit);
            if (this.ecmaVersion >= 8 && id.name === "async" && this.type === tt.name && !containsEsc && (!this.potentialArrowInForAwait || this.value !== "of" || this.containsEsc)) {
              id = this.parseIdent(false);
              if (this.canInsertSemicolon() || !this.eat(tt.arrow))
                this.unexpected();
              return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], true, forInit);
            }
          }
          return id;
        } else {
          return super.parseExprAtom(refDestructuringErrors, forInit, forNew);
        }
      }
      parseExprAtomDefault() {
        if (tokenIsIdentifier(this.type)) {
          const canBeArrow = this["potentialArrowAt"] === this.start;
          const containsEsc = this.containsEsc;
          const id = this.parseIdent();
          if (!containsEsc && id.name === "async" && !this.canInsertSemicolon()) {
            const { type } = this;
            if (type === tt._function) {
              this.next();
              return this.parseFunction(this.startNodeAtNode(id), undefined, true, true);
            } else if (tokenIsIdentifier(type)) {
              if (this.lookaheadCharCode() === 61) {
                const paramId = this.parseIdent(false);
                if (this.canInsertSemicolon() || !this.eat(tt.arrow))
                  this.unexpected();
                return this.parseArrowExpression(this.startNodeAtNode(id), [paramId], true);
              } else {
                return id;
              }
            }
          }
          if (canBeArrow && this.match(tt.arrow) && !this.canInsertSemicolon()) {
            this.next();
            return this.parseArrowExpression(this.startNodeAtNode(id), [id], false);
          }
          return id;
        } else {
          this.unexpected();
        }
      }
      parseIdentNode() {
        let node = this.startNode();
        if (tokenIsKeywordOrIdentifier(this.type) && !((this.type.keyword === "class" || this.type.keyword === "function") && (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46))) {
          node.name = this.value;
        } else {
          return super.parseIdentNode();
        }
        return node;
      }
      parseVarStatement(node, kind, allowMissingInitializer = false) {
        const { isAmbientContext } = this;
        this.next();
        super.parseVar(node, false, kind, allowMissingInitializer || isAmbientContext);
        this.semicolon();
        const declaration = this.finishNode(node, "VariableDeclaration");
        if (!isAmbientContext)
          return declaration;
        for (const { id, init } of declaration.declarations) {
          if (!init)
            continue;
          if (kind !== "const" || !!id.typeAnnotation) {
            this.raise(init.start, TypeScriptError.InitializerNotAllowedInAmbientContext);
          } else if (init.type !== "StringLiteral" && init.type !== "BooleanLiteral" && init.type !== "NumericLiteral" && init.type !== "BigIntLiteral" && (init.type !== "TemplateLiteral" || init.expressions.length > 0) && !isPossiblyLiteralEnum(init)) {
            this.raise(init.start, TypeScriptError.ConstInitiailizerMustBeStringOrNumericLiteralOrLiteralEnumReference);
          }
        }
        return declaration;
      }
      parseStatement(context, topLevel, exports) {
        if (this.match(tokTypes2.at)) {
          this.parseDecorators(true);
        }
        if (this.match(tt._const) && this.isLookaheadContextual("enum")) {
          const node = this.startNode();
          this.expect(tt._const);
          return this.tsParseEnumDeclaration(node, { const: true });
        }
        if (this.ts_isContextual(tokTypes2.enum)) {
          return this.tsParseEnumDeclaration(this.startNode());
        }
        if (this.ts_isContextual(tokTypes2.interface)) {
          const result = this.tsParseInterfaceDeclaration(this.startNode());
          if (result)
            return result;
        }
        return super.parseStatement(context, topLevel, exports);
      }
      parseAccessModifier() {
        return this.tsParseModifier(["public", "protected", "private"]);
      }
      parsePostMemberNameModifiers(methodOrProp) {
        const optional = this.eat(tt.question);
        if (optional)
          methodOrProp.optional = true;
        if (methodOrProp.readonly && this.match(tt.parenL)) {
          this.raise(methodOrProp.start, TypeScriptError.ClassMethodHasReadonly);
        }
        if (methodOrProp.declare && this.match(tt.parenL)) {
          this.raise(methodOrProp.start, TypeScriptError.ClassMethodHasDeclare);
        }
      }
      parseExpressionStatement(node, expr) {
        const decl = expr.type === "Identifier" ? this.tsParseExpressionStatement(node, expr) : undefined;
        return decl || super.parseExpressionStatement(node, expr);
      }
      shouldParseExportStatement() {
        if (this.tsIsDeclarationStart())
          return true;
        if (this.match(tokTypes2.at)) {
          return true;
        }
        return super.shouldParseExportStatement();
      }
      parseConditional(expr, startPos, startLoc, forInit, refDestructuringErrors) {
        if (this.eat(tt.question)) {
          let node = this.startNodeAt(startPos, startLoc);
          node.test = expr;
          node.consequent = this.parseMaybeAssign();
          this.expect(tt.colon);
          node.alternate = this.parseMaybeAssign(forInit);
          return this.finishNode(node, "ConditionalExpression");
        }
        return expr;
      }
      parseMaybeConditional(forInit, refDestructuringErrors) {
        let startPos = this.start, startLoc = this.startLoc;
        let expr = this.parseExprOps(forInit, refDestructuringErrors);
        if (this.checkExpressionErrors(refDestructuringErrors))
          return expr;
        if (!this.maybeInArrowParameters || !this.match(tt.question)) {
          return this.parseConditional(expr, startPos, startLoc, forInit, refDestructuringErrors);
        }
        const result = this.tryParse(() => this.parseConditional(expr, startPos, startLoc, forInit, refDestructuringErrors));
        if (!result.node) {
          if (result.error) {
            this.setOptionalParametersError(refDestructuringErrors, result.error);
          }
          return expr;
        }
        if (result.error)
          this.setLookaheadState(result.failState);
        return result.node;
      }
      parseParenItem(node) {
        const startPos = this.start;
        const startLoc = this.startLoc;
        node = super.parseParenItem(node);
        if (this.eat(tt.question)) {
          node.optional = true;
          this.resetEndLocation(node);
        }
        if (this.match(tt.colon)) {
          const typeCastNode = this.startNodeAt(startPos, startLoc);
          typeCastNode.expression = node;
          typeCastNode.typeAnnotation = this.tsParseTypeAnnotation();
          return this.finishNode(typeCastNode, "TSTypeCastExpression");
        }
        return node;
      }
      parseExportDeclaration(node) {
        if (!this.isAmbientContext && this.ts_isContextual(tokTypes2.declare)) {
          return this.tsInAmbientContext(() => this.parseExportDeclaration(node));
        }
        const startPos = this.start;
        const startLoc = this.startLoc;
        const isDeclare = this.eatContextual("declare");
        if (isDeclare && (this.ts_isContextual(tokTypes2.declare) || !this.shouldParseExportStatement())) {
          this.raise(this.start, TypeScriptError.ExpectedAmbientAfterExportDeclare);
        }
        const isIdentifier = tokenIsIdentifier(this.type);
        const declaration = isIdentifier && this.tsTryParseExportDeclaration() || this.parseStatement(null);
        if (!declaration)
          return null;
        if (declaration.type === "TSInterfaceDeclaration" || declaration.type === "TSTypeAliasDeclaration" || isDeclare) {
          node.exportKind = "type";
        }
        if (isDeclare) {
          this.resetStartLocation(declaration, startPos, startLoc);
          declaration.declare = true;
        }
        return declaration;
      }
      parseClassId(node, isStatement) {
        if (!isStatement && this.isContextual("implements")) {
          return;
        }
        super.parseClassId(node, isStatement);
        const typeParameters = this.tsTryParseTypeParameters(this.tsParseInOutModifiers.bind(this));
        if (typeParameters)
          node.typeParameters = typeParameters;
      }
      parseClassPropertyAnnotation(node) {
        if (!node.optional) {
          if (this.value === "!" && this.eat(tt.prefix)) {
            node.definite = true;
          } else if (this.eat(tt.question)) {
            node.optional = true;
          }
        }
        const type = this.tsTryParseTypeAnnotation();
        if (type)
          node.typeAnnotation = type;
      }
      parseClassField(field) {
        const isPrivate = field.key.type === "PrivateIdentifier";
        if (isPrivate) {
          if (field.abstract) {
            this.raise(field.start, TypeScriptError.PrivateElementHasAbstract);
          }
          if (field.accessibility) {
            this.raise(field.start, TypeScriptError.PrivateElementHasAccessibility({
              modifier: field.accessibility
            }));
          }
          this.parseClassPropertyAnnotation(field);
        } else {
          this.parseClassPropertyAnnotation(field);
          if (this.isAmbientContext && !(field.readonly && !field.typeAnnotation) && this.match(tt.eq)) {
            this.raise(this.start, TypeScriptError.DeclareClassFieldHasInitializer);
          }
          if (field.abstract && this.match(tt.eq)) {
            const { key } = field;
            this.raise(this.start, TypeScriptError.AbstractPropertyHasInitializer({
              propertyName: key.type === "Identifier" && !field.computed ? key.name : `[${this.input.slice(key.start, key.end)}]`
            }));
          }
        }
        return super.parseClassField(field);
      }
      parseClassMethod(method, isGenerator, isAsync, allowsDirectSuper) {
        const isConstructor = method.kind === "constructor";
        const isPrivate = method.key.type === "PrivateIdentifier";
        const typeParameters = this.tsTryParseTypeParameters(this.tsParseConstModifier);
        if (isPrivate) {
          if (typeParameters)
            method.typeParameters = typeParameters;
          if (method.accessibility) {
            this.raise(method.start, TypeScriptError.PrivateMethodsHasAccessibility({
              modifier: method.accessibility
            }));
          }
        } else {
          if (typeParameters && isConstructor) {
            this.raise(typeParameters.start, TypeScriptError.ConstructorHasTypeParameters);
          }
        }
        const { declare = false, kind } = method;
        if (declare && (kind === "get" || kind === "set")) {
          this.raise(method.start, TypeScriptError.DeclareAccessor({ kind }));
        }
        if (typeParameters)
          method.typeParameters = typeParameters;
        const key = method.key;
        if (method.kind === "constructor") {
          if (isGenerator)
            this.raise(key.start, "Constructor can't be a generator");
          if (isAsync)
            this.raise(key.start, "Constructor can't be an async method");
        } else if (method.static && checkKeyName2(method, "prototype")) {
          this.raise(key.start, "Classes may not have a static property named prototype");
        }
        const value = method.value = this.parseMethod(isGenerator, isAsync, allowsDirectSuper, true, method);
        if (method.kind === "get" && value["params"].length !== 0)
          this.raiseRecoverable(value.start, "getter should have no params");
        if (method.kind === "set" && value["params"].length !== 1)
          this.raiseRecoverable(value.start, "setter should have exactly one param");
        if (method.kind === "set" && value["params"][0].type === "RestElement")
          this.raiseRecoverable(value["params"][0].start, "Setter cannot use rest params");
        return this.finishNode(method, "MethodDefinition");
      }
      isClassMethod() {
        return this.match(tt.relational);
      }
      parseClassElement(constructorAllowsSuper) {
        if (this.eat(tt.semi))
          return null;
        let node = this.startNode();
        let keyName = "";
        let isGenerator = false;
        let isAsync = false;
        let kind = "method";
        let isStatic = false;
        const modifiers = [
          "declare",
          "private",
          "public",
          "protected",
          "accessor",
          "override",
          "abstract",
          "readonly",
          "static"
        ];
        const modifierMap = this.tsParseModifiers({
          modified: node,
          allowedModifiers: modifiers,
          disallowedModifiers: ["in", "out"],
          stopOnStartOfClassStaticBlock: true,
          errorTemplate: TypeScriptError.InvalidModifierOnTypeParameterPositions
        });
        isStatic = Boolean(modifierMap.static);
        const callParseClassMemberWithIsStatic = () => {
          if (this.tsIsStartOfStaticBlocks()) {
            this.next();
            this.next();
            if (this.tsHasSomeModifiers(node, modifiers)) {
              this.raise(this.start, TypeScriptError.StaticBlockCannotHaveModifier);
            }
            if (this.ecmaVersion >= 13) {
              super.parseClassStaticBlock(node);
              return node;
            }
          } else {
            const idx = this.tsTryParseIndexSignature(node);
            if (idx) {
              if (node.abstract) {
                this.raise(node.start, TypeScriptError.IndexSignatureHasAbstract);
              }
              if (node.accessibility) {
                this.raise(node.start, TypeScriptError.IndexSignatureHasAccessibility({
                  modifier: node.accessibility
                }));
              }
              if (node.declare) {
                this.raise(node.start, TypeScriptError.IndexSignatureHasDeclare);
              }
              if (node.override) {
                this.raise(node.start, TypeScriptError.IndexSignatureHasOverride);
              }
              return idx;
            }
            if (!this.inAbstractClass && node.abstract) {
              this.raise(node.start, TypeScriptError.NonAbstractClassHasAbstractMethod);
            }
            if (node.override) {
              if (!constructorAllowsSuper) {
                this.raise(node.start, TypeScriptError.OverrideNotInSubClass);
              }
            }
            node.static = isStatic;
            if (isStatic) {
              if (!(this.isClassElementNameStart() || this.type === tt.star)) {
                keyName = "static";
              }
            }
            if (!keyName && this.ecmaVersion >= 8 && this.eatContextual("async")) {
              if ((this.isClassElementNameStart() || this.type === tt.star) && !this.canInsertSemicolon()) {
                isAsync = true;
              } else {
                keyName = "async";
              }
            }
            if (!keyName && (this.ecmaVersion >= 9 || !isAsync) && this.eat(tt.star)) {
              isGenerator = true;
            }
            if (!keyName && !isAsync && !isGenerator) {
              const lastValue = this.value;
              if (this.eatContextual("get") || this.eatContextual("set")) {
                if (this.isClassElementNameStart()) {
                  kind = lastValue;
                } else {
                  keyName = lastValue;
                }
              }
            }
            if (keyName) {
              node.computed = false;
              node.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc);
              node.key.name = keyName;
              this.finishNode(node.key, "Identifier");
            } else {
              this.parseClassElementName(node);
            }
            this.parsePostMemberNameModifiers(node);
            if (this.isClassMethod() || this.ecmaVersion < 13 || this.type === tt.parenL || kind !== "method" || isGenerator || isAsync) {
              const isConstructor = !node.static && checkKeyName2(node, "constructor");
              const allowsDirectSuper = isConstructor && constructorAllowsSuper;
              if (isConstructor && kind !== "method")
                this.raise(node.key.start, "Constructor can't have get/set modifier");
              node.kind = isConstructor ? "constructor" : kind;
              this.parseClassMethod(node, isGenerator, isAsync, allowsDirectSuper);
            } else {
              this.parseClassField(node);
            }
            return node;
          }
        };
        if (node.declare) {
          this.tsInAmbientContext(callParseClassMemberWithIsStatic);
        } else {
          callParseClassMemberWithIsStatic();
        }
        return node;
      }
      isClassElementNameStart() {
        if (this.tsIsIdentifier()) {
          return true;
        }
        return super.isClassElementNameStart();
      }
      parseClassSuper(node) {
        super.parseClassSuper(node);
        if (node.superClass && (this.tsMatchLeftRelational() || this.match(tt.bitShift))) {
          node.superTypeParameters = this.tsParseTypeArgumentsInExpression();
        }
        if (this.eatContextual("implements")) {
          node.implements = this.tsParseHeritageClause("implements");
        }
      }
      parseFunctionParams(node) {
        const typeParameters = this.tsTryParseTypeParameters(this.tsParseConstModifier);
        if (typeParameters)
          node.typeParameters = typeParameters;
        super.parseFunctionParams(node);
      }
      parseVarId(decl, kind) {
        super.parseVarId(decl, kind);
        if (decl.id.type === "Identifier" && !this.hasPrecedingLineBreak() && this.value === "!" && this.eat(tt.prefix)) {
          decl.definite = true;
        }
        const type = this.tsTryParseTypeAnnotation();
        if (type) {
          decl.id.typeAnnotation = type;
          this.resetEndLocation(decl.id);
        }
      }
      parseArrowExpression(node, params, isAsync, forInit) {
        if (this.match(tt.colon)) {
          node.returnType = this.tsParseTypeAnnotation();
        }
        let oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
        this.enterScope(functionFlags2(isAsync, false) | acornScope.SCOPE_ARROW);
        this.initFunction(node);
        const oldMaybeInArrowParameters = this.maybeInArrowParameters;
        if (this.ecmaVersion >= 8)
          node.async = !!isAsync;
        this.yieldPos = 0;
        this.awaitPos = 0;
        this.awaitIdentPos = 0;
        this.maybeInArrowParameters = true;
        node.params = this.toAssignableList(params, true);
        this.maybeInArrowParameters = false;
        this.parseFunctionBody(node, true, false, forInit);
        this.yieldPos = oldYieldPos;
        this.awaitPos = oldAwaitPos;
        this.awaitIdentPos = oldAwaitIdentPos;
        this.maybeInArrowParameters = oldMaybeInArrowParameters;
        return this.finishNode(node, "ArrowFunctionExpression");
      }
      parseMaybeAssignOrigin(forInit, refDestructuringErrors, afterLeftParse) {
        if (this.isContextual("yield")) {
          if (this.inGenerator)
            return this.parseYield(forInit);
          else
            this.exprAllowed = false;
        }
        let ownDestructuringErrors = false, oldParenAssign = -1, oldTrailingComma = -1, oldDoubleProto = -1;
        if (refDestructuringErrors) {
          oldParenAssign = refDestructuringErrors.parenthesizedAssign;
          oldTrailingComma = refDestructuringErrors.trailingComma;
          oldDoubleProto = refDestructuringErrors.doubleProto;
          refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = -1;
        } else {
          refDestructuringErrors = new DestructuringErrors3;
          ownDestructuringErrors = true;
        }
        let startPos = this.start, startLoc = this.startLoc;
        if (this.type === tt.parenL || tokenIsIdentifier(this.type)) {
          this.potentialArrowAt = this.start;
          this.potentialArrowInForAwait = forInit === "await";
        }
        let left = this.parseMaybeConditional(forInit, refDestructuringErrors);
        if (afterLeftParse)
          left = afterLeftParse.call(this, left, startPos, startLoc);
        if (this.type.isAssign) {
          let node = this.startNodeAt(startPos, startLoc);
          node.operator = this.value;
          if (this.type === tt.eq)
            left = this.toAssignable(left, true, refDestructuringErrors);
          if (!ownDestructuringErrors) {
            refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = refDestructuringErrors.doubleProto = -1;
          }
          if (refDestructuringErrors.shorthandAssign >= left.start)
            refDestructuringErrors.shorthandAssign = -1;
          if (!this.maybeInArrowParameters) {
            if (this.type === tt.eq)
              this.checkLValPattern(left);
            else
              this.checkLValSimple(left);
          }
          node.left = left;
          this.next();
          node.right = this.parseMaybeAssign(forInit);
          if (oldDoubleProto > -1)
            refDestructuringErrors.doubleProto = oldDoubleProto;
          return this.finishNode(node, "AssignmentExpression");
        } else {
          if (ownDestructuringErrors)
            this.checkExpressionErrors(refDestructuringErrors, true);
        }
        if (oldParenAssign > -1)
          refDestructuringErrors.parenthesizedAssign = oldParenAssign;
        if (oldTrailingComma > -1)
          refDestructuringErrors.trailingComma = oldTrailingComma;
        return left;
      }
      parseMaybeAssign(forInit, refExpressionErrors, afterLeftParse) {
        let state;
        let jsx;
        let typeCast;
        if (options?.jsx && (this.matchJsx("jsxTagStart") || this.tsMatchLeftRelational())) {
          state = this.cloneCurLookaheadState();
          jsx = this.tryParse(() => this.parseMaybeAssignOrigin(forInit, refExpressionErrors, afterLeftParse), state);
          if (!jsx.error)
            return jsx.node;
          const context = this.context;
          const currentContext = context[context.length - 1];
          const lastCurrentContext = context[context.length - 2];
          if (currentContext === acornTypeScript.tokContexts.tc_oTag && lastCurrentContext === acornTypeScript.tokContexts.tc_expr) {
            context.pop();
            context.pop();
          } else if (currentContext === acornTypeScript.tokContexts.tc_oTag || currentContext === acornTypeScript.tokContexts.tc_expr) {
            context.pop();
          }
        }
        if (!jsx?.error && !this.tsMatchLeftRelational()) {
          return this.parseMaybeAssignOrigin(forInit, refExpressionErrors, afterLeftParse);
        }
        if (!state || this.compareLookaheadState(state, this.getCurLookaheadState())) {
          state = this.cloneCurLookaheadState();
        }
        let typeParameters;
        const arrow = this.tryParse((abort) => {
          typeParameters = this.tsParseTypeParameters(this.tsParseConstModifier);
          const expr = this.parseMaybeAssignOrigin(forInit, refExpressionErrors, afterLeftParse);
          if (expr.type !== "ArrowFunctionExpression" || expr.extra?.parenthesized) {
            abort();
          }
          if (typeParameters?.params.length !== 0) {
            this.resetStartLocationFromNode(expr, typeParameters);
          }
          expr.typeParameters = typeParameters;
          return expr;
        }, state);
        if (!arrow.error && !arrow.aborted) {
          if (typeParameters)
            this.reportReservedArrowTypeParam(typeParameters);
          return arrow.node;
        }
        if (!jsx) {
          assert(true);
          typeCast = this.tryParse(() => this.parseMaybeAssignOrigin(forInit, refExpressionErrors, afterLeftParse), state);
          if (!typeCast.error)
            return typeCast.node;
        }
        if (jsx?.node) {
          this.setLookaheadState(jsx.failState);
          return jsx.node;
        }
        if (arrow.node) {
          this.setLookaheadState(arrow.failState);
          if (typeParameters)
            this.reportReservedArrowTypeParam(typeParameters);
          return arrow.node;
        }
        if (typeCast?.node) {
          this.setLookaheadState(typeCast.failState);
          return typeCast.node;
        }
        if (jsx?.thrown)
          throw jsx.error;
        if (arrow.thrown)
          throw arrow.error;
        if (typeCast?.thrown)
          throw typeCast.error;
        throw jsx?.error || arrow.error || typeCast?.error;
      }
      parseAssignableListItem(allowModifiers) {
        const decorators = [];
        while (this.match(tokTypes2.at)) {
          decorators.push(this.parseDecorator());
        }
        const startPos = this.start;
        const startLoc = this.startLoc;
        let accessibility;
        let readonly = false;
        let override = false;
        if (allowModifiers !== undefined) {
          const modified = {};
          this.tsParseModifiers({
            modified,
            allowedModifiers: ["public", "private", "protected", "override", "readonly"]
          });
          accessibility = modified.accessibility;
          override = modified.override;
          readonly = modified.readonly;
          if (allowModifiers === false && (accessibility || readonly || override)) {
            this.raise(startLoc.start, TypeScriptError.UnexpectedParameterModifier);
          }
        }
        const left = this.parseMaybeDefault(startPos, startLoc);
        this.parseBindingListItem(left);
        const elt = this.parseMaybeDefault(left["start"], left["loc"], left);
        if (decorators.length) {
          elt.decorators = decorators;
        }
        if (accessibility || readonly || override) {
          const pp2 = this.startNodeAt(startPos, startLoc);
          if (accessibility)
            pp2.accessibility = accessibility;
          if (readonly)
            pp2.readonly = readonly;
          if (override)
            pp2.override = override;
          if (elt.type !== "Identifier" && elt.type !== "AssignmentPattern") {
            this.raise(pp2.start, TypeScriptError.UnsupportedParameterPropertyKind);
          }
          pp2.parameter = elt;
          return this.finishNode(pp2, "TSParameterProperty");
        }
        return elt;
      }
      checkLValInnerPattern(expr, bindingType = acornScope.BIND_NONE, checkClashes) {
        switch (expr.type) {
          case "TSParameterProperty":
            this.checkLValInnerPattern(expr.parameter, bindingType, checkClashes);
            break;
          default: {
            super.checkLValInnerPattern(expr, bindingType, checkClashes);
            break;
          }
        }
      }
      parseBindingListItem(param) {
        if (this.eat(tt.question)) {
          if (param.type !== "Identifier" && !this.isAmbientContext && !this.inType) {
            this.raise(param.start, TypeScriptError.PatternIsOptional);
          }
          param.optional = true;
        }
        const type = this.tsTryParseTypeAnnotation();
        if (type)
          param.typeAnnotation = type;
        this.resetEndLocation(param);
        return param;
      }
      isAssignable(node, isBinding) {
        switch (node.type) {
          case "TSTypeCastExpression":
            return this.isAssignable(node.expression, isBinding);
          case "TSParameterProperty":
            return true;
          case "Identifier":
          case "ObjectPattern":
          case "ArrayPattern":
          case "AssignmentPattern":
          case "RestElement":
            return true;
          case "ObjectExpression": {
            const last = node.properties.length - 1;
            return node.properties.every((prop, i2) => {
              return prop.type !== "ObjectMethod" && (i2 === last || prop.type !== "SpreadElement") && this.isAssignable(prop);
            });
          }
          case "Property":
          case "ObjectProperty":
            return this.isAssignable(node.value);
          case "SpreadElement":
            return this.isAssignable(node.argument);
          case "ArrayExpression":
            return node.elements.every((element) => element === null || this.isAssignable(element));
          case "AssignmentExpression":
            return node.operator === "=";
          case "ParenthesizedExpression":
            return this.isAssignable(node.expression);
          case "MemberExpression":
          case "OptionalMemberExpression":
            return !isBinding;
          default:
            return false;
        }
      }
      toAssignable(node, isBinding = false, refDestructuringErrors = new DestructuringErrors3) {
        switch (node.type) {
          case "ParenthesizedExpression":
            return this.toAssignableParenthesizedExpression(node, isBinding, refDestructuringErrors);
          case "TSAsExpression":
          case "TSSatisfiesExpression":
          case "TSNonNullExpression":
          case "TSTypeAssertion":
            if (isBinding) {} else {
              this.raise(node.start, TypeScriptError.UnexpectedTypeCastInParameter);
            }
            return this.toAssignable(node.expression, isBinding, refDestructuringErrors);
          case "MemberExpression":
            break;
          case "AssignmentExpression":
            if (!isBinding && node.left.type === "TSTypeCastExpression") {
              node.left = this.typeCastToParameter(node.left);
            }
            return super.toAssignable(node, isBinding, refDestructuringErrors);
          case "TSTypeCastExpression": {
            return this.typeCastToParameter(node);
          }
          default:
            return super.toAssignable(node, isBinding, refDestructuringErrors);
        }
        return node;
      }
      toAssignableParenthesizedExpression(node, isBinding, refDestructuringErrors) {
        switch (node.expression.type) {
          case "TSAsExpression":
          case "TSSatisfiesExpression":
          case "TSNonNullExpression":
          case "TSTypeAssertion":
          case "ParenthesizedExpression":
            return this.toAssignable(node.expression, isBinding, refDestructuringErrors);
          default:
            return super.toAssignable(node, isBinding, refDestructuringErrors);
        }
      }
      parseBindingAtom() {
        switch (this.type) {
          case tt._this:
            return this.parseIdent(true);
          default:
            return super.parseBindingAtom();
        }
      }
      shouldParseArrow(exprList) {
        let shouldParseArrowRes;
        if (this.match(tt.colon)) {
          shouldParseArrowRes = exprList.every((expr) => this.isAssignable(expr, true));
        } else {
          shouldParseArrowRes = !this.canInsertSemicolon();
        }
        if (shouldParseArrowRes) {
          if (this.match(tt.colon)) {
            const result = this.tryParse((abort) => {
              const returnType = this.tsParseTypeOrTypePredicateAnnotation(tt.colon);
              if (this.canInsertSemicolon() || !this.match(tt.arrow))
                abort();
              return returnType;
            });
            if (result.aborted) {
              this.shouldParseArrowReturnType = undefined;
              return false;
            }
            if (!result.thrown) {
              if (result.error)
                this.setLookaheadState(result.failState);
              this.shouldParseArrowReturnType = result.node;
            }
          }
          if (!this.match(tt.arrow)) {
            this.shouldParseArrowReturnType = undefined;
            return false;
          }
          return true;
        }
        this.shouldParseArrowReturnType = undefined;
        return shouldParseArrowRes;
      }
      parseParenArrowList(startPos, startLoc, exprList, forInit) {
        const node = this.startNodeAt(startPos, startLoc);
        node.returnType = this.shouldParseArrowReturnType;
        this.shouldParseArrowReturnType = undefined;
        return this.parseArrowExpression(node, exprList, false, forInit);
      }
      parseParenAndDistinguishExpression(canBeArrow, forInit) {
        let startPos = this.start, startLoc = this.startLoc, val, allowTrailingComma = this.ecmaVersion >= 8;
        if (this.ecmaVersion >= 6) {
          const oldMaybeInArrowParameters = this.maybeInArrowParameters;
          this.maybeInArrowParameters = true;
          this.next();
          let innerStartPos = this.start, innerStartLoc = this.startLoc;
          let exprList = [], first = true, lastIsComma = false;
          let refDestructuringErrors = new DestructuringErrors3, oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, spreadStart;
          this.yieldPos = 0;
          this.awaitPos = 0;
          while (this.type !== tt.parenR) {
            first ? first = false : this.expect(tt.comma);
            if (allowTrailingComma && this.afterTrailingComma(tt.parenR, true)) {
              lastIsComma = true;
              break;
            } else if (this.type === tt.ellipsis) {
              spreadStart = this.start;
              exprList.push(this.parseParenItem(this.parseRestBinding()));
              if (this.type === tt.comma) {
                this.raise(this.start, "Comma is not permitted after the rest element");
              }
              break;
            } else {
              exprList.push(this.parseMaybeAssign(forInit, refDestructuringErrors, this.parseParenItem));
            }
          }
          let innerEndPos = this.lastTokEnd, innerEndLoc = this.lastTokEndLoc;
          this.expect(tt.parenR);
          this.maybeInArrowParameters = oldMaybeInArrowParameters;
          if (canBeArrow && this.shouldParseArrow(exprList) && this.eat(tt.arrow)) {
            this.checkPatternErrors(refDestructuringErrors, false);
            this.checkYieldAwaitInDefaultParams();
            this.yieldPos = oldYieldPos;
            this.awaitPos = oldAwaitPos;
            return this.parseParenArrowList(startPos, startLoc, exprList, forInit);
          }
          if (!exprList.length || lastIsComma)
            this.unexpected(this.lastTokStart);
          if (spreadStart)
            this.unexpected(spreadStart);
          this.checkExpressionErrors(refDestructuringErrors, true);
          this.yieldPos = oldYieldPos || this.yieldPos;
          this.awaitPos = oldAwaitPos || this.awaitPos;
          if (exprList.length > 1) {
            val = this.startNodeAt(innerStartPos, innerStartLoc);
            val.expressions = exprList;
            this.finishNodeAt(val, "SequenceExpression", innerEndPos, innerEndLoc);
          } else {
            val = exprList[0];
          }
        } else {
          val = this.parseParenExpression();
        }
        if (this.options.preserveParens) {
          let par = this.startNodeAt(startPos, startLoc);
          par.expression = val;
          return this.finishNode(par, "ParenthesizedExpression");
        } else {
          return val;
        }
      }
      parseTaggedTemplateExpression(base, startPos, startLoc, optionalChainMember) {
        const node = this.startNodeAt(startPos, startLoc);
        node.tag = base;
        node.quasi = this.parseTemplate({ isTagged: true });
        if (optionalChainMember) {
          this.raise(startPos, "Tagged Template Literals are not allowed in optionalChain.");
        }
        return this.finishNode(node, "TaggedTemplateExpression");
      }
      shouldParseAsyncArrow() {
        if (this.match(tt.colon)) {
          const result = this.tryParse((abort) => {
            const returnType = this.tsParseTypeOrTypePredicateAnnotation(tt.colon);
            if (this.canInsertSemicolon() || !this.match(tt.arrow))
              abort();
            return returnType;
          });
          if (result.aborted) {
            this.shouldParseAsyncArrowReturnType = undefined;
            return false;
          }
          if (!result.thrown) {
            if (result.error)
              this.setLookaheadState(result.failState);
            this.shouldParseAsyncArrowReturnType = result.node;
            return !this.canInsertSemicolon() && this.eat(tt.arrow);
          }
        } else {
          return !this.canInsertSemicolon() && this.eat(tt.arrow);
        }
      }
      parseSubscriptAsyncArrow(startPos, startLoc, exprList, forInit) {
        const arrN = this.startNodeAt(startPos, startLoc);
        arrN.returnType = this.shouldParseAsyncArrowReturnType;
        this.shouldParseAsyncArrowReturnType = undefined;
        return this.parseArrowExpression(arrN, exprList, true, forInit);
      }
      parseExprList(close, allowTrailingComma, allowEmpty, refDestructuringErrors) {
        let elts = [], first = true;
        while (!this.eat(close)) {
          if (!first) {
            this.expect(tt.comma);
            if (allowTrailingComma && this.afterTrailingComma(close))
              break;
          } else
            first = false;
          let elt;
          if (allowEmpty && this.type === tt.comma)
            elt = null;
          else if (this.type === tt.ellipsis) {
            elt = this.parseSpread(refDestructuringErrors);
            if (this.maybeInArrowParameters && this.match(tt.colon)) {
              elt.typeAnnotation = this.tsParseTypeAnnotation();
            }
            if (refDestructuringErrors && this.type === tt.comma && refDestructuringErrors.trailingComma < 0)
              refDestructuringErrors.trailingComma = this.start;
          } else {
            elt = this.parseMaybeAssign(false, refDestructuringErrors, this.parseParenItem);
          }
          elts.push(elt);
        }
        return elts;
      }
      parseSubscript(base, startPos, startLoc, noCalls, maybeAsyncArrow, optionalChained, forInit) {
        let _optionalChained = optionalChained;
        if (!this.hasPrecedingLineBreak() && this.value === "!" && this.match(tt.prefix)) {
          this.exprAllowed = false;
          this.next();
          const nonNullExpression = this.startNodeAt(startPos, startLoc);
          nonNullExpression.expression = base;
          base = this.finishNode(nonNullExpression, "TSNonNullExpression");
          return base;
        }
        let isOptionalCall = false;
        if (this.match(tt.questionDot) && this.lookaheadCharCode() === 60) {
          if (noCalls) {
            return base;
          }
          base.optional = true;
          _optionalChained = isOptionalCall = true;
          this.next();
        }
        if (this.tsMatchLeftRelational() || this.match(tt.bitShift)) {
          let missingParenErrorLoc;
          const result = this.tsTryParseAndCatch(() => {
            if (!noCalls && this.atPossibleAsyncArrow(base)) {
              const asyncArrowFn = this.tsTryParseGenericAsyncArrowFunction(startPos, startLoc, forInit);
              if (asyncArrowFn) {
                base = asyncArrowFn;
                return base;
              }
            }
            const typeArguments = this.tsParseTypeArgumentsInExpression();
            if (!typeArguments)
              return base;
            if (isOptionalCall && !this.match(tt.parenL)) {
              missingParenErrorLoc = this.curPosition();
              return base;
            }
            if (tokenIsTemplate(this.type) || this.type === tt.backQuote) {
              const result2 = this.parseTaggedTemplateExpression(base, startPos, startLoc, _optionalChained);
              result2.typeArguments = typeArguments;
              return result2;
            }
            if (!noCalls && this.eat(tt.parenL)) {
              let refDestructuringErrors = new DestructuringErrors3;
              const node2 = this.startNodeAt(startPos, startLoc);
              node2.callee = base;
              node2.arguments = this.parseExprList(tt.parenR, this.ecmaVersion >= 8, false, refDestructuringErrors);
              this.tsCheckForInvalidTypeCasts(node2.arguments);
              node2.typeArguments = typeArguments;
              if (_optionalChained) {
                node2.optional = isOptionalCall;
              }
              this.checkExpressionErrors(refDestructuringErrors, true);
              base = this.finishNode(node2, "CallExpression");
              return base;
            }
            const tokenType = this.type;
            if (this.tsMatchRightRelational() || tokenType === tt.bitShift || tokenType !== tt.parenL && tokenCanStartExpression(tokenType) && !this.hasPrecedingLineBreak()) {
              return;
            }
            const node = this.startNodeAt(startPos, startLoc);
            node.expression = base;
            node.typeArguments = typeArguments;
            return this.finishNode(node, "TSInstantiationExpression");
          });
          if (missingParenErrorLoc) {
            this.unexpected(missingParenErrorLoc);
          }
          if (result) {
            if (result.type === "TSInstantiationExpression" && (this.match(tt.dot) || this.match(tt.questionDot) && this.lookaheadCharCode() !== 40)) {
              this.raise(this.start, TypeScriptError.InvalidPropertyAccessAfterInstantiationExpression);
            }
            base = result;
            return base;
          }
        }
        let optionalSupported = this.ecmaVersion >= 11;
        let optional = optionalSupported && this.eat(tt.questionDot);
        if (noCalls && optional)
          this.raise(this.lastTokStart, "Optional chaining cannot appear in the callee of new expressions");
        let computed = this.eat(tt.bracketL);
        if (computed || optional && this.type !== tt.parenL && this.type !== tt.backQuote || this.eat(tt.dot)) {
          let node = this.startNodeAt(startPos, startLoc);
          node.object = base;
          if (computed) {
            node.property = this.parseExpression();
            this.expect(tt.bracketR);
          } else if (this.type === tt.privateId && base.type !== "Super") {
            node.property = this.parsePrivateIdent();
          } else {
            node.property = this.parseIdent(this.options.allowReserved !== "never");
          }
          node.computed = !!computed;
          if (optionalSupported) {
            node.optional = optional;
          }
          base = this.finishNode(node, "MemberExpression");
        } else if (!noCalls && this.eat(tt.parenL)) {
          const oldMaybeInArrowParameters = this.maybeInArrowParameters;
          this.maybeInArrowParameters = true;
          let refDestructuringErrors = new DestructuringErrors3, oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
          this.yieldPos = 0;
          this.awaitPos = 0;
          this.awaitIdentPos = 0;
          let exprList = this.parseExprList(tt.parenR, this.ecmaVersion >= 8, false, refDestructuringErrors);
          if (maybeAsyncArrow && !optional && this.shouldParseAsyncArrow()) {
            this.checkPatternErrors(refDestructuringErrors, false);
            this.checkYieldAwaitInDefaultParams();
            if (this.awaitIdentPos > 0)
              this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function");
            this.yieldPos = oldYieldPos;
            this.awaitPos = oldAwaitPos;
            this.awaitIdentPos = oldAwaitIdentPos;
            base = this.parseSubscriptAsyncArrow(startPos, startLoc, exprList, forInit);
          } else {
            this.checkExpressionErrors(refDestructuringErrors, true);
            this.yieldPos = oldYieldPos || this.yieldPos;
            this.awaitPos = oldAwaitPos || this.awaitPos;
            this.awaitIdentPos = oldAwaitIdentPos || this.awaitIdentPos;
            let node = this.startNodeAt(startPos, startLoc);
            node.callee = base;
            node.arguments = exprList;
            if (optionalSupported) {
              node.optional = optional;
            }
            base = this.finishNode(node, "CallExpression");
          }
          this.maybeInArrowParameters = oldMaybeInArrowParameters;
        } else if (this.type === tt.backQuote) {
          if (optional || _optionalChained) {
            this.raise(this.start, "Optional chaining cannot appear in the tag of tagged template expressions");
          }
          let node = this.startNodeAt(startPos, startLoc);
          node.tag = base;
          node.quasi = this.parseTemplate({ isTagged: true });
          base = this.finishNode(node, "TaggedTemplateExpression");
        }
        return base;
      }
      parseGetterSetter(prop) {
        prop.kind = prop.key.name;
        this.parsePropertyName(prop);
        prop.value = this.parseMethod(false);
        let paramCount = prop.kind === "get" ? 0 : 1;
        const firstParam = prop.value.params[0];
        const hasContextParam = firstParam && this.isThisParam(firstParam);
        paramCount = hasContextParam ? paramCount + 1 : paramCount;
        if (prop.value.params.length !== paramCount) {
          let start = prop.value.start;
          if (prop.kind === "get")
            this.raiseRecoverable(start, "getter should have no params");
          else
            this.raiseRecoverable(start, "setter should have exactly one param");
        } else {
          if (prop.kind === "set" && prop.value.params[0].type === "RestElement")
            this.raiseRecoverable(prop.value.params[0].start, "Setter cannot use rest params");
        }
      }
      parseProperty(isPattern, refDestructuringErrors) {
        if (!isPattern) {
          let decorators = [];
          if (this.match(tokTypes2.at)) {
            while (this.match(tokTypes2.at)) {
              decorators.push(this.parseDecorator());
            }
          }
          const property = super.parseProperty(isPattern, refDestructuringErrors);
          if (property.type === "SpreadElement") {
            if (decorators.length)
              this.raise(property.start, DecoratorsError.SpreadElementDecorator);
          }
          if (decorators.length) {
            property.decorators = decorators;
            decorators = [];
          }
          return property;
        }
        return super.parseProperty(isPattern, refDestructuringErrors);
      }
      parseCatchClauseParam() {
        const param = this.parseBindingAtom();
        let simple = param.type === "Identifier";
        this.enterScope(simple ? acornScope.SCOPE_SIMPLE_CATCH : 0);
        this.checkLValPattern(param, simple ? acornScope.BIND_SIMPLE_CATCH : acornScope.BIND_LEXICAL);
        const type = this.tsTryParseTypeAnnotation();
        if (type) {
          param.typeAnnotation = type;
          this.resetEndLocation(param);
        }
        this.expect(tt.parenR);
        return param;
      }
      parseClass(node, isStatement) {
        const oldInAbstractClass = this.inAbstractClass;
        this.inAbstractClass = !!node.abstract;
        try {
          this.next();
          this.takeDecorators(node);
          const oldStrict = this.strict;
          this.strict = true;
          this.parseClassId(node, isStatement);
          this.parseClassSuper(node);
          const privateNameMap = this.enterClassBody();
          const classBody = this.startNode();
          let hadConstructor = false;
          classBody.body = [];
          let decorators = [];
          this.expect(tt.braceL);
          while (this.type !== tt.braceR) {
            if (this.match(tokTypes2.at)) {
              decorators.push(this.parseDecorator());
              continue;
            }
            const element = this.parseClassElement(node.superClass !== null);
            if (decorators.length) {
              element.decorators = decorators;
              this.resetStartLocationFromNode(element, decorators[0]);
              decorators = [];
            }
            if (element) {
              classBody.body.push(element);
              if (element.type === "MethodDefinition" && element.kind === "constructor" && element.value.type === "FunctionExpression") {
                if (hadConstructor) {
                  this.raiseRecoverable(element.start, "Duplicate constructor in the same class");
                }
                hadConstructor = true;
                if (element.decorators && element.decorators.length > 0) {
                  this.raise(element.start, DecoratorsError.DecoratorConstructor);
                }
              } else if (element.key && element.key.type === "PrivateIdentifier" && isPrivateNameConflicted2(privateNameMap, element)) {
                this.raiseRecoverable(element.key.start, `Identifier '#${element.key.name}' has already been declared`);
              }
            }
          }
          this.strict = oldStrict;
          this.next();
          if (decorators.length) {
            this.raise(this.start, DecoratorsError.TrailingDecorator);
          }
          node.body = this.finishNode(classBody, "ClassBody");
          this.exitClassBody();
          return this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression");
        } finally {
          this.inAbstractClass = oldInAbstractClass;
        }
      }
      parseClassFunctionParams() {
        const typeParameters = this.tsTryParseTypeParameters();
        let params = this.parseBindingList(tt.parenR, false, this.ecmaVersion >= 8, true);
        if (typeParameters)
          params.typeParameters = typeParameters;
        return params;
      }
      parseMethod(isGenerator, isAsync, allowDirectSuper, inClassScope, method) {
        let node = this.startNode(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
        this.initFunction(node);
        if (this.ecmaVersion >= 6)
          node.generator = isGenerator;
        if (this.ecmaVersion >= 8)
          node.async = !!isAsync;
        this.yieldPos = 0;
        this.awaitPos = 0;
        this.awaitIdentPos = 0;
        this.enterScope(functionFlags2(isAsync, node.generator) | acornScope.SCOPE_SUPER | (allowDirectSuper ? acornScope.SCOPE_DIRECT_SUPER : 0));
        this.expect(tt.parenL);
        node.params = this.parseClassFunctionParams();
        this.checkYieldAwaitInDefaultParams();
        this.parseFunctionBody(node, false, true, false, {
          isClassMethod: inClassScope
        });
        this.yieldPos = oldYieldPos;
        this.awaitPos = oldAwaitPos;
        this.awaitIdentPos = oldAwaitIdentPos;
        if (method && method.abstract) {
          const hasBody = !!node.body;
          if (hasBody) {
            const { key } = method;
            this.raise(method.start, TypeScriptError.AbstractMethodHasImplementation({
              methodName: key.type === "Identifier" && !method.computed ? key.name : `[${this.input.slice(key.start, key.end)}]`
            }));
          }
        }
        return this.finishNode(node, "FunctionExpression");
      }
      static parse(input, options2) {
        if (options2.locations === false) {
          throw new Error(`You have to enable options.locations while using acorn-typescript`);
        } else {
          options2.locations = true;
        }
        const parser = new this(options2, input);
        if (dts) {
          parser.isAmbientContext = true;
        }
        return parser.parse();
      }
      static parseExpressionAt(input, pos, options2) {
        if (options2.locations === false) {
          throw new Error(`You have to enable options.locations while using acorn-typescript`);
        } else {
          options2.locations = true;
        }
        const parser = new this(options2, input, pos);
        if (dts) {
          parser.isAmbientContext = true;
        }
        parser.nextToken();
        return parser.parseExpression();
      }
      parseImportSpecifier() {
        const isMaybeTypeOnly = this.ts_isContextual(tokTypes2.type);
        if (isMaybeTypeOnly) {
          let node = this.startNode();
          node.imported = this.parseModuleExportName();
          this.parseTypeOnlyImportExportSpecifier(node, true, this.importOrExportOuterKind === "type");
          return this.finishNode(node, "ImportSpecifier");
        } else {
          const node = super.parseImportSpecifier();
          node.importKind = "value";
          return node;
        }
      }
      parseExportSpecifier(exports) {
        const isMaybeTypeOnly = this.ts_isContextual(tokTypes2.type);
        const isString = this.match(tt.string);
        if (!isString && isMaybeTypeOnly) {
          let node = this.startNode();
          node.local = this.parseModuleExportName();
          this.parseTypeOnlyImportExportSpecifier(node, false, this.importOrExportOuterKind === "type");
          this.finishNode(node, "ExportSpecifier");
          this.checkExport(exports, node.exported, node.exported.start);
          return node;
        } else {
          const node = super.parseExportSpecifier(exports);
          node.exportKind = "value";
          return node;
        }
      }
      parseTypeOnlyImportExportSpecifier(node, isImport, isInTypeOnlyImportExport) {
        const leftOfAsKey = isImport ? "imported" : "local";
        const rightOfAsKey = isImport ? "local" : "exported";
        let leftOfAs = node[leftOfAsKey];
        let rightOfAs;
        let hasTypeSpecifier = false;
        let canParseAsKeyword = true;
        const loc = leftOfAs.start;
        if (this.isContextual("as")) {
          const firstAs = this.parseIdent();
          if (this.isContextual("as")) {
            const secondAs = this.parseIdent();
            if (tokenIsKeywordOrIdentifier(this.type)) {
              hasTypeSpecifier = true;
              leftOfAs = firstAs;
              rightOfAs = isImport ? this.parseIdent() : this.parseModuleExportName();
              canParseAsKeyword = false;
            } else {
              rightOfAs = secondAs;
              canParseAsKeyword = false;
            }
          } else if (tokenIsKeywordOrIdentifier(this.type)) {
            canParseAsKeyword = false;
            rightOfAs = isImport ? this.parseIdent() : this.parseModuleExportName();
          } else {
            hasTypeSpecifier = true;
            leftOfAs = firstAs;
          }
        } else if (tokenIsKeywordOrIdentifier(this.type)) {
          hasTypeSpecifier = true;
          if (isImport) {
            leftOfAs = super.parseIdent(true);
            if (!this.isContextual("as")) {
              this.checkUnreserved(leftOfAs);
            }
          } else {
            leftOfAs = this.parseModuleExportName();
          }
        }
        if (hasTypeSpecifier && isInTypeOnlyImportExport) {
          this.raise(loc, isImport ? TypeScriptError.TypeModifierIsUsedInTypeImports : TypeScriptError.TypeModifierIsUsedInTypeExports);
        }
        node[leftOfAsKey] = leftOfAs;
        node[rightOfAsKey] = rightOfAs;
        const kindKey = isImport ? "importKind" : "exportKind";
        node[kindKey] = hasTypeSpecifier ? "type" : "value";
        if (canParseAsKeyword && this.eatContextual("as")) {
          node[rightOfAsKey] = isImport ? this.parseIdent() : this.parseModuleExportName();
        }
        if (!node[rightOfAsKey]) {
          node[rightOfAsKey] = this.copyNode(node[leftOfAsKey]);
        }
        if (isImport) {
          this.checkLValSimple(node[rightOfAsKey], acornScope.BIND_LEXICAL);
        }
      }
      raiseCommonCheck(pos, message, recoverable) {
        switch (message) {
          case "Comma is not permitted after the rest element": {
            if (this.isAmbientContext && this.match(tt.comma) && this.lookaheadCharCode() === 41) {
              this.next();
              return;
            } else {
              return super.raise(pos, message);
            }
          }
        }
        return recoverable ? super.raiseRecoverable(pos, message) : super.raise(pos, message);
      }
      raiseRecoverable(pos, message) {
        return this.raiseCommonCheck(pos, message, true);
      }
      raise(pos, message) {
        return this.raiseCommonCheck(pos, message, true);
      }
      updateContext(prevType) {
        const { type } = this;
        if (type == tt.braceL) {
          var curContext = this.curContext();
          if (curContext == tsTokContexts.tc_oTag)
            this.context.push(tokContexts.b_expr);
          else if (curContext == tsTokContexts.tc_expr)
            this.context.push(tokContexts.b_tmpl);
          else
            super.updateContext(prevType);
          this.exprAllowed = true;
        } else if (type === tt.slash && prevType === tokTypes2.jsxTagStart) {
          this.context.length -= 2;
          this.context.push(tsTokContexts.tc_cTag);
          this.exprAllowed = false;
        } else {
          return super.updateContext(prevType);
        }
      }
      jsx_parseOpeningElementAt(startPos, startLoc) {
        let node = this.startNodeAt(startPos, startLoc);
        let nodeName = this.jsx_parseElementName();
        if (nodeName)
          node.name = nodeName;
        if (this.match(tt.relational) || this.match(tt.bitShift)) {
          const typeArguments = this.tsTryParseAndCatch(() => this.tsParseTypeArgumentsInExpression());
          if (typeArguments)
            node.typeArguments = typeArguments;
        }
        node.attributes = [];
        while (this.type !== tt.slash && this.type !== tokTypes2.jsxTagEnd)
          node.attributes.push(this.jsx_parseAttribute());
        node.selfClosing = this.eat(tt.slash);
        this.expect(tokTypes2.jsxTagEnd);
        return this.finishNode(node, nodeName ? "JSXOpeningElement" : "JSXOpeningFragment");
      }
      enterScope(flags) {
        if (flags === TS_SCOPE_TS_MODULE) {
          this.importsStack.push([]);
        }
        super.enterScope(flags);
        const scope = super.currentScope();
        scope.types = [];
        scope.enums = [];
        scope.constEnums = [];
        scope.classes = [];
        scope.exportOnlyBindings = [];
      }
      exitScope() {
        const scope = super.currentScope();
        if (scope.flags === TS_SCOPE_TS_MODULE) {
          this.importsStack.pop();
        }
        super.exitScope();
      }
      hasImport(name, allowShadow) {
        const len = this.importsStack.length;
        if (this.importsStack[len - 1].indexOf(name) > -1) {
          return true;
        }
        if (!allowShadow && len > 1) {
          for (let i2 = 0;i2 < len - 1; i2++) {
            if (this.importsStack[i2].indexOf(name) > -1)
              return true;
          }
        }
        return false;
      }
      maybeExportDefined(scope, name) {
        if (this.inModule && scope.flags & acornScope.SCOPE_TOP) {
          this.undefinedExports.delete(name);
        }
      }
      declareName(name, bindingType, pos) {
        if (bindingType & acornScope.BIND_FLAGS_TS_IMPORT) {
          if (this.hasImport(name, true)) {
            this.raise(pos, `Identifier '${name}' has already been declared.`);
          }
          this.importsStack[this.importsStack.length - 1].push(name);
          return;
        }
        const scope = this.currentScope();
        if (bindingType & acornScope.BIND_FLAGS_TS_EXPORT_ONLY) {
          this.maybeExportDefined(scope, name);
          scope.exportOnlyBindings.push(name);
          return;
        }
        if (bindingType === acornScope.BIND_TS_TYPE || bindingType === acornScope.BIND_TS_INTERFACE) {
          if (bindingType === acornScope.BIND_TS_TYPE && scope.types.includes(name)) {
            this.raise(pos, `type '${name}' has already been declared.`);
          }
          scope.types.push(name);
        } else {
          super.declareName(name, bindingType, pos);
        }
        if (bindingType & acornScope.BIND_FLAGS_TS_ENUM)
          scope.enums.push(name);
        if (bindingType & acornScope.BIND_FLAGS_TS_CONST_ENUM)
          scope.constEnums.push(name);
        if (bindingType & acornScope.BIND_FLAGS_CLASS)
          scope.classes.push(name);
      }
      checkLocalExport(id) {
        const { name } = id;
        if (this.hasImport(name))
          return;
        const len = this.scopeStack.length;
        for (let i2 = len - 1;i2 >= 0; i2--) {
          const scope = this.scopeStack[i2];
          if (scope.types.indexOf(name) > -1 || scope.exportOnlyBindings.indexOf(name) > -1)
            return;
        }
        super.checkLocalExport(id);
      }
    }
    return TypeScriptParser;
  };
}

// node_modules/acorn-loose/dist/acorn-loose.mjs
var dummyValue = "\u2716";
function isDummy(node) {
  return node.name === dummyValue;
}
function noop() {}
var LooseParser = function LooseParser2(input, options) {
  if (options === undefined)
    options = {};
  this.toks = this.constructor.BaseParser.tokenizer(input, options);
  this.options = this.toks.options;
  this.input = this.toks.input;
  this.tok = this.last = { type: types$1.eof, start: 0, end: 0 };
  this.tok.validateRegExpFlags = noop;
  this.tok.validateRegExpPattern = noop;
  if (this.options.locations) {
    var here = this.toks.curPosition();
    this.tok.loc = new SourceLocation(this.toks, here, here);
  }
  this.ahead = [];
  this.context = [];
  this.curIndent = 0;
  this.curLineStart = 0;
  this.nextLineStart = this.lineEnd(this.curLineStart) + 1;
  this.inAsync = false;
  this.inGenerator = false;
  this.inFunction = false;
};
LooseParser.prototype.startNode = function startNode() {
  return new Node(this.toks, this.tok.start, this.options.locations ? this.tok.loc.start : null);
};
LooseParser.prototype.storeCurrentPos = function storeCurrentPos() {
  return this.options.locations ? [this.tok.start, this.tok.loc.start] : this.tok.start;
};
LooseParser.prototype.startNodeAt = function startNodeAt(pos) {
  if (this.options.locations) {
    return new Node(this.toks, pos[0], pos[1]);
  } else {
    return new Node(this.toks, pos);
  }
};
LooseParser.prototype.finishNode = function finishNode(node, type) {
  node.type = type;
  node.end = this.last.end;
  if (this.options.locations) {
    node.loc.end = this.last.loc.end;
  }
  if (this.options.ranges) {
    node.range[1] = this.last.end;
  }
  return node;
};
LooseParser.prototype.dummyNode = function dummyNode(type) {
  var dummy = this.startNode();
  dummy.type = type;
  dummy.end = dummy.start;
  if (this.options.locations) {
    dummy.loc.end = dummy.loc.start;
  }
  if (this.options.ranges) {
    dummy.range[1] = dummy.start;
  }
  this.last = { type: types$1.name, start: dummy.start, end: dummy.start, loc: dummy.loc };
  return dummy;
};
LooseParser.prototype.dummyIdent = function dummyIdent() {
  var dummy = this.dummyNode("Identifier");
  dummy.name = dummyValue;
  return dummy;
};
LooseParser.prototype.dummyString = function dummyString() {
  var dummy = this.dummyNode("Literal");
  dummy.value = dummy.raw = dummyValue;
  return dummy;
};
LooseParser.prototype.eat = function eat2(type) {
  if (this.tok.type === type) {
    this.next();
    return true;
  } else {
    return false;
  }
};
LooseParser.prototype.isContextual = function isContextual(name) {
  return this.tok.type === types$1.name && this.tok.value === name;
};
LooseParser.prototype.eatContextual = function eatContextual(name) {
  return this.tok.value === name && this.eat(types$1.name);
};
LooseParser.prototype.canInsertSemicolon = function canInsertSemicolon() {
  return this.tok.type === types$1.eof || this.tok.type === types$1.braceR || lineBreak.test(this.input.slice(this.last.end, this.tok.start));
};
LooseParser.prototype.semicolon = function semicolon() {
  return this.eat(types$1.semi);
};
LooseParser.prototype.expect = function expect(type) {
  if (this.eat(type)) {
    return true;
  }
  for (var i2 = 1;i2 <= 2; i2++) {
    if (this.lookAhead(i2).type === type) {
      for (var j = 0;j < i2; j++) {
        this.next();
      }
      return true;
    }
  }
};
LooseParser.prototype.pushCx = function pushCx() {
  this.context.push(this.curIndent);
};
LooseParser.prototype.popCx = function popCx() {
  this.curIndent = this.context.pop();
};
LooseParser.prototype.lineEnd = function lineEnd(pos) {
  while (pos < this.input.length && !isNewLine(this.input.charCodeAt(pos))) {
    ++pos;
  }
  return pos;
};
LooseParser.prototype.indentationAfter = function indentationAfter(pos) {
  for (var count = 0;; ++pos) {
    var ch = this.input.charCodeAt(pos);
    if (ch === 32) {
      ++count;
    } else if (ch === 9) {
      count += this.options.tabSize;
    } else {
      return count;
    }
  }
};
LooseParser.prototype.closes = function closes(closeTok, indent, line, blockHeuristic) {
  if (this.tok.type === closeTok || this.tok.type === types$1.eof) {
    return true;
  }
  return line !== this.curLineStart && this.curIndent < indent && this.tokenStartsLine() && (!blockHeuristic || this.nextLineStart >= this.input.length || this.indentationAfter(this.nextLineStart) < indent);
};
LooseParser.prototype.tokenStartsLine = function tokenStartsLine() {
  for (var p = this.tok.start - 1;p >= this.curLineStart; --p) {
    var ch = this.input.charCodeAt(p);
    if (ch !== 9 && ch !== 32) {
      return false;
    }
  }
  return true;
};
LooseParser.prototype.extend = function extend2(name, f) {
  this[name] = f(this[name]);
};
LooseParser.prototype.parse = function parse4() {
  this.next();
  return this.parseTopLevel();
};
LooseParser.extend = function extend3() {
  var plugins = [], len = arguments.length;
  while (len--)
    plugins[len] = arguments[len];
  var cls = this;
  for (var i2 = 0;i2 < plugins.length; i2++) {
    cls = plugins[i2](cls);
  }
  return cls;
};
LooseParser.parse = function parse5(input, options) {
  return new this(input, options).parse();
};
LooseParser.BaseParser = Parser;
var lp$2 = LooseParser.prototype;
function isSpace(ch) {
  return ch < 14 && ch > 8 || ch === 32 || ch === 160 || isNewLine(ch);
}
lp$2.next = function() {
  this.last = this.tok;
  if (this.ahead.length) {
    this.tok = this.ahead.shift();
  } else {
    this.tok = this.readToken();
  }
  if (this.tok.start >= this.nextLineStart) {
    while (this.tok.start >= this.nextLineStart) {
      this.curLineStart = this.nextLineStart;
      this.nextLineStart = this.lineEnd(this.curLineStart) + 1;
    }
    this.curIndent = this.indentationAfter(this.curLineStart);
  }
};
lp$2.readToken = function() {
  for (;; ) {
    try {
      this.toks.next();
      if (this.toks.type === types$1.dot && this.input.substr(this.toks.end, 1) === "." && this.options.ecmaVersion >= 6) {
        this.toks.end++;
        this.toks.type = types$1.ellipsis;
      }
      return new Token(this.toks);
    } catch (e) {
      if (!(e instanceof SyntaxError)) {
        throw e;
      }
      var { message: msg, raisedAt: pos } = e, replace = true;
      if (/unterminated/i.test(msg)) {
        pos = this.lineEnd(e.pos + 1);
        if (/string/.test(msg)) {
          replace = { start: e.pos, end: pos, type: types$1.string, value: this.input.slice(e.pos + 1, pos) };
        } else if (/regular expr/i.test(msg)) {
          var re = this.input.slice(e.pos, pos);
          try {
            re = new RegExp(re);
          } catch (e$1) {}
          replace = { start: e.pos, end: pos, type: types$1.regexp, value: re };
        } else if (/template/.test(msg)) {
          replace = {
            start: e.pos,
            end: pos,
            type: types$1.template,
            value: this.input.slice(e.pos, pos)
          };
        } else {
          replace = false;
        }
      } else if (/invalid (unicode|regexp|number)|expecting unicode|octal literal|is reserved|directly after number|expected number in radix/i.test(msg)) {
        while (pos < this.input.length && !isSpace(this.input.charCodeAt(pos))) {
          ++pos;
        }
      } else if (/character escape|expected hexadecimal/i.test(msg)) {
        while (pos < this.input.length) {
          var ch = this.input.charCodeAt(pos++);
          if (ch === 34 || ch === 39 || isNewLine(ch)) {
            break;
          }
        }
      } else if (/unexpected character/i.test(msg)) {
        pos++;
        replace = false;
      } else if (/regular expression/i.test(msg)) {
        replace = true;
      } else {
        throw e;
      }
      this.resetTo(pos);
      if (replace === true) {
        replace = { start: pos, end: pos, type: types$1.name, value: dummyValue };
      }
      if (replace) {
        if (this.options.locations) {
          replace.loc = new SourceLocation(this.toks, getLineInfo(this.input, replace.start), getLineInfo(this.input, replace.end));
        }
        return replace;
      }
    }
  }
};
lp$2.resetTo = function(pos) {
  this.toks.pos = pos;
  this.toks.containsEsc = false;
  var ch = this.input.charAt(pos - 1);
  this.toks.exprAllowed = !ch || /[[{(,;:?/*=+\-~!|&%^<>]/.test(ch) || /[enwfd]/.test(ch) && /\b(case|else|return|throw|new|in|(instance|type)?of|delete|void)$/.test(this.input.slice(pos - 10, pos));
  if (this.options.locations) {
    this.toks.curLine = 1;
    this.toks.lineStart = lineBreakG.lastIndex = 0;
    var match;
    while ((match = lineBreakG.exec(this.input)) && match.index < pos) {
      ++this.toks.curLine;
      this.toks.lineStart = match.index + match[0].length;
    }
  }
};
lp$2.lookAhead = function(n) {
  while (n > this.ahead.length) {
    this.ahead.push(this.readToken());
  }
  return this.ahead[n - 1];
};
var lp$1 = LooseParser.prototype;
lp$1.parseTopLevel = function() {
  var node = this.startNodeAt(this.options.locations ? [0, getLineInfo(this.input, 0)] : 0);
  node.body = [];
  while (this.tok.type !== types$1.eof) {
    node.body.push(this.parseStatement());
  }
  this.toks.adaptDirectivePrologue(node.body);
  this.last = this.tok;
  node.sourceType = this.options.sourceType;
  return this.finishNode(node, "Program");
};
lp$1.parseStatement = function() {
  var starttype = this.tok.type, node = this.startNode(), kind;
  if (this.toks.isLet()) {
    starttype = types$1._var;
    kind = "let";
  }
  switch (starttype) {
    case types$1._break:
    case types$1._continue:
      this.next();
      var isBreak = starttype === types$1._break;
      if (this.semicolon() || this.canInsertSemicolon()) {
        node.label = null;
      } else {
        node.label = this.tok.type === types$1.name ? this.parseIdent() : null;
        this.semicolon();
      }
      return this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement");
    case types$1._debugger:
      this.next();
      this.semicolon();
      return this.finishNode(node, "DebuggerStatement");
    case types$1._do:
      this.next();
      node.body = this.parseStatement();
      node.test = this.eat(types$1._while) ? this.parseParenExpression() : this.dummyIdent();
      this.semicolon();
      return this.finishNode(node, "DoWhileStatement");
    case types$1._for:
      this.next();
      var isAwait = this.options.ecmaVersion >= 9 && this.eatContextual("await");
      this.pushCx();
      this.expect(types$1.parenL);
      if (this.tok.type === types$1.semi) {
        return this.parseFor(node, null);
      }
      var isLet = this.toks.isLet();
      if (isLet || this.tok.type === types$1._var || this.tok.type === types$1._const) {
        var init$1 = this.parseVar(this.startNode(), true, isLet ? "let" : this.tok.value);
        if (init$1.declarations.length === 1 && (this.tok.type === types$1._in || this.isContextual("of"))) {
          if (this.options.ecmaVersion >= 9 && this.tok.type !== types$1._in) {
            node.await = isAwait;
          }
          return this.parseForIn(node, init$1);
        }
        return this.parseFor(node, init$1);
      }
      var init = this.parseExpression(true);
      if (this.tok.type === types$1._in || this.isContextual("of")) {
        if (this.options.ecmaVersion >= 9 && this.tok.type !== types$1._in) {
          node.await = isAwait;
        }
        return this.parseForIn(node, this.toAssignable(init));
      }
      return this.parseFor(node, init);
    case types$1._function:
      this.next();
      return this.parseFunction(node, true);
    case types$1._if:
      this.next();
      node.test = this.parseParenExpression();
      node.consequent = this.parseStatement();
      node.alternate = this.eat(types$1._else) ? this.parseStatement() : null;
      return this.finishNode(node, "IfStatement");
    case types$1._return:
      this.next();
      if (this.eat(types$1.semi) || this.canInsertSemicolon()) {
        node.argument = null;
      } else {
        node.argument = this.parseExpression();
        this.semicolon();
      }
      return this.finishNode(node, "ReturnStatement");
    case types$1._switch:
      var blockIndent = this.curIndent, line = this.curLineStart;
      this.next();
      node.discriminant = this.parseParenExpression();
      node.cases = [];
      this.pushCx();
      this.expect(types$1.braceL);
      var cur;
      while (!this.closes(types$1.braceR, blockIndent, line, true)) {
        if (this.tok.type === types$1._case || this.tok.type === types$1._default) {
          var isCase = this.tok.type === types$1._case;
          if (cur) {
            this.finishNode(cur, "SwitchCase");
          }
          node.cases.push(cur = this.startNode());
          cur.consequent = [];
          this.next();
          if (isCase) {
            cur.test = this.parseExpression();
          } else {
            cur.test = null;
          }
          this.expect(types$1.colon);
        } else {
          if (!cur) {
            node.cases.push(cur = this.startNode());
            cur.consequent = [];
            cur.test = null;
          }
          cur.consequent.push(this.parseStatement());
        }
      }
      if (cur) {
        this.finishNode(cur, "SwitchCase");
      }
      this.popCx();
      this.eat(types$1.braceR);
      return this.finishNode(node, "SwitchStatement");
    case types$1._throw:
      this.next();
      node.argument = this.parseExpression();
      this.semicolon();
      return this.finishNode(node, "ThrowStatement");
    case types$1._try:
      this.next();
      node.block = this.parseBlock();
      node.handler = null;
      if (this.tok.type === types$1._catch) {
        var clause = this.startNode();
        this.next();
        if (this.eat(types$1.parenL)) {
          clause.param = this.toAssignable(this.parseExprAtom(), true);
          this.expect(types$1.parenR);
        } else {
          clause.param = null;
        }
        clause.body = this.parseBlock();
        node.handler = this.finishNode(clause, "CatchClause");
      }
      node.finalizer = this.eat(types$1._finally) ? this.parseBlock() : null;
      if (!node.handler && !node.finalizer) {
        return node.block;
      }
      return this.finishNode(node, "TryStatement");
    case types$1._var:
    case types$1._const:
      return this.parseVar(node, false, kind || this.tok.value);
    case types$1._while:
      this.next();
      node.test = this.parseParenExpression();
      node.body = this.parseStatement();
      return this.finishNode(node, "WhileStatement");
    case types$1._with:
      this.next();
      node.object = this.parseParenExpression();
      node.body = this.parseStatement();
      return this.finishNode(node, "WithStatement");
    case types$1.braceL:
      return this.parseBlock();
    case types$1.semi:
      this.next();
      return this.finishNode(node, "EmptyStatement");
    case types$1._class:
      return this.parseClass(true);
    case types$1._import:
      if (this.options.ecmaVersion > 10) {
        var nextType = this.lookAhead(1).type;
        if (nextType === types$1.parenL || nextType === types$1.dot) {
          node.expression = this.parseExpression();
          this.semicolon();
          return this.finishNode(node, "ExpressionStatement");
        }
      }
      return this.parseImport();
    case types$1._export:
      return this.parseExport();
    default:
      if (this.toks.isAsyncFunction()) {
        this.next();
        this.next();
        return this.parseFunction(node, true, true);
      }
      var expr = this.parseExpression();
      if (isDummy(expr)) {
        this.next();
        if (this.tok.type === types$1.eof) {
          return this.finishNode(node, "EmptyStatement");
        }
        return this.parseStatement();
      } else if (starttype === types$1.name && expr.type === "Identifier" && this.eat(types$1.colon)) {
        node.body = this.parseStatement();
        node.label = expr;
        return this.finishNode(node, "LabeledStatement");
      } else {
        node.expression = expr;
        this.semicolon();
        return this.finishNode(node, "ExpressionStatement");
      }
  }
};
lp$1.parseBlock = function() {
  var node = this.startNode();
  this.pushCx();
  this.expect(types$1.braceL);
  var blockIndent = this.curIndent, line = this.curLineStart;
  node.body = [];
  while (!this.closes(types$1.braceR, blockIndent, line, true)) {
    node.body.push(this.parseStatement());
  }
  this.popCx();
  this.eat(types$1.braceR);
  return this.finishNode(node, "BlockStatement");
};
lp$1.parseFor = function(node, init) {
  node.init = init;
  node.test = node.update = null;
  if (this.eat(types$1.semi) && this.tok.type !== types$1.semi) {
    node.test = this.parseExpression();
  }
  if (this.eat(types$1.semi) && this.tok.type !== types$1.parenR) {
    node.update = this.parseExpression();
  }
  this.popCx();
  this.expect(types$1.parenR);
  node.body = this.parseStatement();
  return this.finishNode(node, "ForStatement");
};
lp$1.parseForIn = function(node, init) {
  var type = this.tok.type === types$1._in ? "ForInStatement" : "ForOfStatement";
  this.next();
  node.left = init;
  node.right = this.parseExpression();
  this.popCx();
  this.expect(types$1.parenR);
  node.body = this.parseStatement();
  return this.finishNode(node, type);
};
lp$1.parseVar = function(node, noIn, kind) {
  node.kind = kind;
  this.next();
  node.declarations = [];
  do {
    var decl = this.startNode();
    decl.id = this.options.ecmaVersion >= 6 ? this.toAssignable(this.parseExprAtom(), true) : this.parseIdent();
    decl.init = this.eat(types$1.eq) ? this.parseMaybeAssign(noIn) : null;
    node.declarations.push(this.finishNode(decl, "VariableDeclarator"));
  } while (this.eat(types$1.comma));
  if (!node.declarations.length) {
    var decl$1 = this.startNode();
    decl$1.id = this.dummyIdent();
    node.declarations.push(this.finishNode(decl$1, "VariableDeclarator"));
  }
  if (!noIn) {
    this.semicolon();
  }
  return this.finishNode(node, "VariableDeclaration");
};
lp$1.parseClass = function(isStatement) {
  var node = this.startNode();
  this.next();
  if (this.tok.type === types$1.name) {
    node.id = this.parseIdent();
  } else if (isStatement === true) {
    node.id = this.dummyIdent();
  } else {
    node.id = null;
  }
  node.superClass = this.eat(types$1._extends) ? this.parseExpression() : null;
  node.body = this.startNode();
  node.body.body = [];
  this.pushCx();
  var indent = this.curIndent + 1, line = this.curLineStart;
  this.eat(types$1.braceL);
  if (this.curIndent + 1 < indent) {
    indent = this.curIndent;
    line = this.curLineStart;
  }
  while (!this.closes(types$1.braceR, indent, line)) {
    var element = this.parseClassElement();
    if (element) {
      node.body.body.push(element);
    }
  }
  this.popCx();
  if (!this.eat(types$1.braceR)) {
    this.last.end = this.tok.start;
    if (this.options.locations) {
      this.last.loc.end = this.tok.loc.start;
    }
  }
  this.semicolon();
  this.finishNode(node.body, "ClassBody");
  return this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression");
};
lp$1.parseClassElement = function() {
  if (this.eat(types$1.semi)) {
    return null;
  }
  var ref2 = this.options;
  var ecmaVersion2 = ref2.ecmaVersion;
  var locations = ref2.locations;
  var indent = this.curIndent;
  var line = this.curLineStart;
  var node = this.startNode();
  var keyName = "";
  var isGenerator = false;
  var isAsync = false;
  var kind = "method";
  var isStatic = false;
  if (this.eatContextual("static")) {
    if (ecmaVersion2 >= 13 && this.eat(types$1.braceL)) {
      this.parseClassStaticBlock(node);
      return node;
    }
    if (this.isClassElementNameStart() || this.toks.type === types$1.star) {
      isStatic = true;
    } else {
      keyName = "static";
    }
  }
  node.static = isStatic;
  if (!keyName && ecmaVersion2 >= 8 && this.eatContextual("async")) {
    if ((this.isClassElementNameStart() || this.toks.type === types$1.star) && !this.canInsertSemicolon()) {
      isAsync = true;
    } else {
      keyName = "async";
    }
  }
  if (!keyName) {
    isGenerator = this.eat(types$1.star);
    var lastValue = this.toks.value;
    if (this.eatContextual("get") || this.eatContextual("set")) {
      if (this.isClassElementNameStart()) {
        kind = lastValue;
      } else {
        keyName = lastValue;
      }
    }
  }
  if (keyName) {
    node.computed = false;
    node.key = this.startNodeAt(locations ? [this.toks.lastTokStart, this.toks.lastTokStartLoc] : this.toks.lastTokStart);
    node.key.name = keyName;
    this.finishNode(node.key, "Identifier");
  } else {
    this.parseClassElementName(node);
    if (isDummy(node.key)) {
      if (isDummy(this.parseMaybeAssign())) {
        this.next();
      }
      this.eat(types$1.comma);
      return null;
    }
  }
  if (ecmaVersion2 < 13 || this.toks.type === types$1.parenL || kind !== "method" || isGenerator || isAsync) {
    var isConstructor = !node.computed && !node.static && !isGenerator && !isAsync && kind === "method" && (node.key.type === "Identifier" && node.key.name === "constructor" || node.key.type === "Literal" && node.key.value === "constructor");
    node.kind = isConstructor ? "constructor" : kind;
    node.value = this.parseMethod(isGenerator, isAsync);
    this.finishNode(node, "MethodDefinition");
  } else {
    if (this.eat(types$1.eq)) {
      if (this.curLineStart !== line && this.curIndent <= indent && this.tokenStartsLine()) {
        node.value = null;
      } else {
        var oldInAsync = this.inAsync;
        var oldInGenerator = this.inGenerator;
        this.inAsync = false;
        this.inGenerator = false;
        node.value = this.parseMaybeAssign();
        this.inAsync = oldInAsync;
        this.inGenerator = oldInGenerator;
      }
    } else {
      node.value = null;
    }
    this.semicolon();
    this.finishNode(node, "PropertyDefinition");
  }
  return node;
};
lp$1.parseClassStaticBlock = function(node) {
  var blockIndent = this.curIndent, line = this.curLineStart;
  node.body = [];
  this.pushCx();
  while (!this.closes(types$1.braceR, blockIndent, line, true)) {
    node.body.push(this.parseStatement());
  }
  this.popCx();
  this.eat(types$1.braceR);
  return this.finishNode(node, "StaticBlock");
};
lp$1.isClassElementNameStart = function() {
  return this.toks.isClassElementNameStart();
};
lp$1.parseClassElementName = function(element) {
  if (this.toks.type === types$1.privateId) {
    element.computed = false;
    element.key = this.parsePrivateIdent();
  } else {
    this.parsePropertyName(element);
  }
};
lp$1.parseFunction = function(node, isStatement, isAsync) {
  var oldInAsync = this.inAsync, oldInGenerator = this.inGenerator, oldInFunction = this.inFunction;
  this.initFunction(node);
  if (this.options.ecmaVersion >= 6) {
    node.generator = this.eat(types$1.star);
  }
  if (this.options.ecmaVersion >= 8) {
    node.async = !!isAsync;
  }
  if (this.tok.type === types$1.name) {
    node.id = this.parseIdent();
  } else if (isStatement === true) {
    node.id = this.dummyIdent();
  }
  this.inAsync = node.async;
  this.inGenerator = node.generator;
  this.inFunction = true;
  node.params = this.parseFunctionParams();
  node.body = this.parseBlock();
  this.toks.adaptDirectivePrologue(node.body.body);
  this.inAsync = oldInAsync;
  this.inGenerator = oldInGenerator;
  this.inFunction = oldInFunction;
  return this.finishNode(node, isStatement ? "FunctionDeclaration" : "FunctionExpression");
};
lp$1.parseExport = function() {
  var node = this.startNode();
  this.next();
  if (this.eat(types$1.star)) {
    if (this.options.ecmaVersion >= 11) {
      if (this.eatContextual("as")) {
        node.exported = this.parseExprAtom();
      } else {
        node.exported = null;
      }
    }
    node.source = this.eatContextual("from") ? this.parseExprAtom() : this.dummyString();
    if (this.options.ecmaVersion >= 16) {
      node.attributes = this.parseWithClause();
    }
    this.semicolon();
    return this.finishNode(node, "ExportAllDeclaration");
  }
  if (this.eat(types$1._default)) {
    var isAsync;
    if (this.tok.type === types$1._function || (isAsync = this.toks.isAsyncFunction())) {
      var fNode = this.startNode();
      this.next();
      if (isAsync) {
        this.next();
      }
      node.declaration = this.parseFunction(fNode, "nullableID", isAsync);
    } else if (this.tok.type === types$1._class) {
      node.declaration = this.parseClass("nullableID");
    } else {
      node.declaration = this.parseMaybeAssign();
      this.semicolon();
    }
    return this.finishNode(node, "ExportDefaultDeclaration");
  }
  if (this.tok.type.keyword || this.toks.isLet() || this.toks.isAsyncFunction()) {
    node.declaration = this.parseStatement();
    node.specifiers = [];
    node.source = null;
  } else {
    node.declaration = null;
    node.specifiers = this.parseExportSpecifierList();
    node.source = this.eatContextual("from") ? this.parseExprAtom() : null;
    if (this.options.ecmaVersion >= 16) {
      node.attributes = this.parseWithClause();
    }
    this.semicolon();
  }
  return this.finishNode(node, "ExportNamedDeclaration");
};
lp$1.parseImport = function() {
  var node = this.startNode();
  this.next();
  if (this.tok.type === types$1.string) {
    node.specifiers = [];
    node.source = this.parseExprAtom();
  } else {
    var elt;
    if (this.tok.type === types$1.name && this.tok.value !== "from") {
      elt = this.startNode();
      elt.local = this.parseIdent();
      this.finishNode(elt, "ImportDefaultSpecifier");
      this.eat(types$1.comma);
    }
    node.specifiers = this.parseImportSpecifiers();
    node.source = this.eatContextual("from") && this.tok.type === types$1.string ? this.parseExprAtom() : this.dummyString();
    if (elt) {
      node.specifiers.unshift(elt);
    }
  }
  if (this.options.ecmaVersion >= 16) {
    node.attributes = this.parseWithClause();
  }
  this.semicolon();
  return this.finishNode(node, "ImportDeclaration");
};
lp$1.parseImportSpecifiers = function() {
  var elts = [];
  if (this.tok.type === types$1.star) {
    var elt = this.startNode();
    this.next();
    elt.local = this.eatContextual("as") ? this.parseIdent() : this.dummyIdent();
    elts.push(this.finishNode(elt, "ImportNamespaceSpecifier"));
  } else {
    var indent = this.curIndent, line = this.curLineStart, continuedLine = this.nextLineStart;
    this.pushCx();
    this.eat(types$1.braceL);
    if (this.curLineStart > continuedLine) {
      continuedLine = this.curLineStart;
    }
    while (!this.closes(types$1.braceR, indent + (this.curLineStart <= continuedLine ? 1 : 0), line)) {
      var elt$1 = this.startNode();
      if (this.eat(types$1.star)) {
        elt$1.local = this.eatContextual("as") ? this.parseModuleExportName() : this.dummyIdent();
        this.finishNode(elt$1, "ImportNamespaceSpecifier");
      } else {
        if (this.isContextual("from")) {
          break;
        }
        elt$1.imported = this.parseModuleExportName();
        if (isDummy(elt$1.imported)) {
          break;
        }
        elt$1.local = this.eatContextual("as") ? this.parseModuleExportName() : elt$1.imported;
        this.finishNode(elt$1, "ImportSpecifier");
      }
      elts.push(elt$1);
      this.eat(types$1.comma);
    }
    this.eat(types$1.braceR);
    this.popCx();
  }
  return elts;
};
lp$1.parseWithClause = function() {
  var nodes = [];
  if (!this.eat(types$1._with)) {
    return nodes;
  }
  var indent = this.curIndent, line = this.curLineStart, continuedLine = this.nextLineStart;
  this.pushCx();
  this.eat(types$1.braceL);
  if (this.curLineStart > continuedLine) {
    continuedLine = this.curLineStart;
  }
  while (!this.closes(types$1.braceR, indent + (this.curLineStart <= continuedLine ? 1 : 0), line)) {
    var attr = this.startNode();
    attr.key = this.tok.type === types$1.string ? this.parseExprAtom() : this.parseIdent();
    if (this.eat(types$1.colon)) {
      if (this.tok.type === types$1.string) {
        attr.value = this.parseExprAtom();
      } else {
        attr.value = this.dummyString();
      }
    } else {
      if (isDummy(attr.key)) {
        break;
      }
      if (this.tok.type === types$1.string) {
        attr.value = this.parseExprAtom();
      } else {
        break;
      }
    }
    nodes.push(this.finishNode(attr, "ImportAttribute"));
    this.eat(types$1.comma);
  }
  this.eat(types$1.braceR);
  this.popCx();
  return nodes;
};
lp$1.parseExportSpecifierList = function() {
  var elts = [];
  var indent = this.curIndent, line = this.curLineStart, continuedLine = this.nextLineStart;
  this.pushCx();
  this.eat(types$1.braceL);
  if (this.curLineStart > continuedLine) {
    continuedLine = this.curLineStart;
  }
  while (!this.closes(types$1.braceR, indent + (this.curLineStart <= continuedLine ? 1 : 0), line)) {
    if (this.isContextual("from")) {
      break;
    }
    var elt = this.startNode();
    elt.local = this.parseModuleExportName();
    if (isDummy(elt.local)) {
      break;
    }
    elt.exported = this.eatContextual("as") ? this.parseModuleExportName() : elt.local;
    this.finishNode(elt, "ExportSpecifier");
    elts.push(elt);
    this.eat(types$1.comma);
  }
  this.eat(types$1.braceR);
  this.popCx();
  return elts;
};
lp$1.parseModuleExportName = function() {
  return this.options.ecmaVersion >= 13 && this.tok.type === types$1.string ? this.parseExprAtom() : this.parseIdent();
};
var lp = LooseParser.prototype;
lp.checkLVal = function(expr) {
  if (!expr) {
    return expr;
  }
  switch (expr.type) {
    case "Identifier":
    case "MemberExpression":
      return expr;
    case "ParenthesizedExpression":
      expr.expression = this.checkLVal(expr.expression);
      return expr;
    default:
      return this.dummyIdent();
  }
};
lp.parseExpression = function(noIn) {
  var start = this.storeCurrentPos();
  var expr = this.parseMaybeAssign(noIn);
  if (this.tok.type === types$1.comma) {
    var node = this.startNodeAt(start);
    node.expressions = [expr];
    while (this.eat(types$1.comma)) {
      node.expressions.push(this.parseMaybeAssign(noIn));
    }
    return this.finishNode(node, "SequenceExpression");
  }
  return expr;
};
lp.parseParenExpression = function() {
  this.pushCx();
  this.expect(types$1.parenL);
  var val = this.parseExpression();
  this.popCx();
  this.expect(types$1.parenR);
  return val;
};
lp.parseMaybeAssign = function(noIn) {
  if (this.inGenerator && this.toks.isContextual("yield")) {
    var node = this.startNode();
    this.next();
    if (this.semicolon() || this.canInsertSemicolon() || this.tok.type !== types$1.star && !this.tok.type.startsExpr) {
      node.delegate = false;
      node.argument = null;
    } else {
      node.delegate = this.eat(types$1.star);
      node.argument = this.parseMaybeAssign();
    }
    return this.finishNode(node, "YieldExpression");
  }
  var start = this.storeCurrentPos();
  var left = this.parseMaybeConditional(noIn);
  if (this.tok.type.isAssign) {
    var node$1 = this.startNodeAt(start);
    node$1.operator = this.tok.value;
    node$1.left = this.tok.type === types$1.eq ? this.toAssignable(left) : this.checkLVal(left);
    this.next();
    node$1.right = this.parseMaybeAssign(noIn);
    return this.finishNode(node$1, "AssignmentExpression");
  }
  return left;
};
lp.parseMaybeConditional = function(noIn) {
  var start = this.storeCurrentPos();
  var expr = this.parseExprOps(noIn);
  if (this.eat(types$1.question)) {
    var node = this.startNodeAt(start);
    node.test = expr;
    node.consequent = this.parseMaybeAssign();
    node.alternate = this.expect(types$1.colon) ? this.parseMaybeAssign(noIn) : this.dummyIdent();
    return this.finishNode(node, "ConditionalExpression");
  }
  return expr;
};
lp.parseExprOps = function(noIn) {
  var start = this.storeCurrentPos();
  var indent = this.curIndent, line = this.curLineStart;
  return this.parseExprOp(this.parseMaybeUnary(false), start, -1, noIn, indent, line);
};
lp.parseExprOp = function(left, start, minPrec, noIn, indent, line) {
  if (this.curLineStart !== line && this.curIndent < indent && this.tokenStartsLine()) {
    return left;
  }
  var prec = this.tok.type.binop;
  if (prec != null && (!noIn || this.tok.type !== types$1._in)) {
    if (prec > minPrec) {
      var node = this.startNodeAt(start);
      node.left = left;
      node.operator = this.tok.value;
      this.next();
      if (this.curLineStart !== line && this.curIndent < indent && this.tokenStartsLine()) {
        node.right = this.dummyIdent();
      } else {
        var rightStart = this.storeCurrentPos();
        node.right = this.parseExprOp(this.parseMaybeUnary(false), rightStart, prec, noIn, indent, line);
      }
      this.finishNode(node, /&&|\|\||\?\?/.test(node.operator) ? "LogicalExpression" : "BinaryExpression");
      return this.parseExprOp(node, start, minPrec, noIn, indent, line);
    }
  }
  return left;
};
lp.parseMaybeUnary = function(sawUnary) {
  var start = this.storeCurrentPos(), expr;
  if (this.options.ecmaVersion >= 8 && this.toks.isContextual("await") && (this.inAsync || this.toks.inModule && this.options.ecmaVersion >= 13 || !this.inFunction && this.options.allowAwaitOutsideFunction)) {
    expr = this.parseAwait();
    sawUnary = true;
  } else if (this.tok.type.prefix) {
    var node = this.startNode(), update = this.tok.type === types$1.incDec;
    if (!update) {
      sawUnary = true;
    }
    node.operator = this.tok.value;
    node.prefix = true;
    this.next();
    node.argument = this.parseMaybeUnary(true);
    if (update) {
      node.argument = this.checkLVal(node.argument);
    }
    expr = this.finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
  } else if (this.tok.type === types$1.ellipsis) {
    var node$1 = this.startNode();
    this.next();
    node$1.argument = this.parseMaybeUnary(sawUnary);
    expr = this.finishNode(node$1, "SpreadElement");
  } else if (!sawUnary && this.tok.type === types$1.privateId) {
    expr = this.parsePrivateIdent();
  } else {
    expr = this.parseExprSubscripts();
    while (this.tok.type.postfix && !this.canInsertSemicolon()) {
      var node$2 = this.startNodeAt(start);
      node$2.operator = this.tok.value;
      node$2.prefix = false;
      node$2.argument = this.checkLVal(expr);
      this.next();
      expr = this.finishNode(node$2, "UpdateExpression");
    }
  }
  if (!sawUnary && this.eat(types$1.starstar)) {
    var node$3 = this.startNodeAt(start);
    node$3.operator = "**";
    node$3.left = expr;
    node$3.right = this.parseMaybeUnary(false);
    return this.finishNode(node$3, "BinaryExpression");
  }
  return expr;
};
lp.parseExprSubscripts = function() {
  var start = this.storeCurrentPos();
  return this.parseSubscripts(this.parseExprAtom(), start, false, this.curIndent, this.curLineStart);
};
lp.parseSubscripts = function(base, start, noCalls, startIndent, line) {
  var optionalSupported = this.options.ecmaVersion >= 11;
  var optionalChained = false;
  for (;; ) {
    if (this.curLineStart !== line && this.curIndent <= startIndent && this.tokenStartsLine()) {
      if (this.tok.type === types$1.dot && this.curIndent === startIndent) {
        --startIndent;
      } else {
        break;
      }
    }
    var maybeAsyncArrow = base.type === "Identifier" && base.name === "async" && !this.canInsertSemicolon();
    var optional = optionalSupported && this.eat(types$1.questionDot);
    if (optional) {
      optionalChained = true;
    }
    if (optional && this.tok.type !== types$1.parenL && this.tok.type !== types$1.bracketL && this.tok.type !== types$1.backQuote || this.eat(types$1.dot)) {
      var node = this.startNodeAt(start);
      node.object = base;
      if (this.curLineStart !== line && this.curIndent <= startIndent && this.tokenStartsLine()) {
        node.property = this.dummyIdent();
      } else {
        node.property = this.parsePropertyAccessor() || this.dummyIdent();
      }
      node.computed = false;
      if (optionalSupported) {
        node.optional = optional;
      }
      base = this.finishNode(node, "MemberExpression");
    } else if (this.tok.type === types$1.bracketL) {
      this.pushCx();
      this.next();
      var node$1 = this.startNodeAt(start);
      node$1.object = base;
      node$1.property = this.parseExpression();
      node$1.computed = true;
      if (optionalSupported) {
        node$1.optional = optional;
      }
      this.popCx();
      this.expect(types$1.bracketR);
      base = this.finishNode(node$1, "MemberExpression");
    } else if (!noCalls && this.tok.type === types$1.parenL) {
      var exprList = this.parseExprList(types$1.parenR);
      if (maybeAsyncArrow && this.eat(types$1.arrow)) {
        return this.parseArrowExpression(this.startNodeAt(start), exprList, true);
      }
      var node$2 = this.startNodeAt(start);
      node$2.callee = base;
      node$2.arguments = exprList;
      if (optionalSupported) {
        node$2.optional = optional;
      }
      base = this.finishNode(node$2, "CallExpression");
    } else if (this.tok.type === types$1.backQuote) {
      var node$3 = this.startNodeAt(start);
      node$3.tag = base;
      node$3.quasi = this.parseTemplate();
      base = this.finishNode(node$3, "TaggedTemplateExpression");
    } else {
      break;
    }
  }
  if (optionalChained) {
    var chainNode = this.startNodeAt(start);
    chainNode.expression = base;
    base = this.finishNode(chainNode, "ChainExpression");
  }
  return base;
};
lp.parseExprAtom = function() {
  var node;
  switch (this.tok.type) {
    case types$1._this:
    case types$1._super:
      var type = this.tok.type === types$1._this ? "ThisExpression" : "Super";
      node = this.startNode();
      this.next();
      return this.finishNode(node, type);
    case types$1.name:
      var start = this.storeCurrentPos();
      var id = this.parseIdent();
      var isAsync = false;
      if (id.name === "async" && !this.canInsertSemicolon()) {
        if (this.eat(types$1._function)) {
          this.toks.overrideContext(types.f_expr);
          return this.parseFunction(this.startNodeAt(start), false, true);
        }
        if (this.tok.type === types$1.name) {
          id = this.parseIdent();
          isAsync = true;
        }
      }
      return this.eat(types$1.arrow) ? this.parseArrowExpression(this.startNodeAt(start), [id], isAsync) : id;
    case types$1.regexp:
      node = this.startNode();
      var val = this.tok.value;
      node.regex = { pattern: val.pattern, flags: val.flags };
      node.value = val.value;
      node.raw = this.input.slice(this.tok.start, this.tok.end);
      this.next();
      return this.finishNode(node, "Literal");
    case types$1.num:
    case types$1.string:
      node = this.startNode();
      node.value = this.tok.value;
      node.raw = this.input.slice(this.tok.start, this.tok.end);
      if (this.tok.type === types$1.num && node.raw.charCodeAt(node.raw.length - 1) === 110) {
        node.bigint = node.raw.slice(0, -1).replace(/_/g, "");
      }
      this.next();
      return this.finishNode(node, "Literal");
    case types$1._null:
    case types$1._true:
    case types$1._false:
      node = this.startNode();
      node.value = this.tok.type === types$1._null ? null : this.tok.type === types$1._true;
      node.raw = this.tok.type.keyword;
      this.next();
      return this.finishNode(node, "Literal");
    case types$1.parenL:
      var parenStart = this.storeCurrentPos();
      this.next();
      var inner = this.parseExpression();
      this.expect(types$1.parenR);
      if (this.eat(types$1.arrow)) {
        var params = inner.expressions || [inner];
        if (params.length && isDummy(params[params.length - 1])) {
          params.pop();
        }
        return this.parseArrowExpression(this.startNodeAt(parenStart), params);
      }
      if (this.options.preserveParens) {
        var par = this.startNodeAt(parenStart);
        par.expression = inner;
        inner = this.finishNode(par, "ParenthesizedExpression");
      }
      return inner;
    case types$1.bracketL:
      node = this.startNode();
      node.elements = this.parseExprList(types$1.bracketR, true);
      return this.finishNode(node, "ArrayExpression");
    case types$1.braceL:
      this.toks.overrideContext(types.b_expr);
      return this.parseObj();
    case types$1._class:
      return this.parseClass(false);
    case types$1._function:
      node = this.startNode();
      this.next();
      return this.parseFunction(node, false);
    case types$1._new:
      return this.parseNew();
    case types$1.backQuote:
      return this.parseTemplate();
    case types$1._import:
      if (this.options.ecmaVersion >= 11) {
        return this.parseExprImport();
      } else {
        return this.dummyIdent();
      }
    default:
      return this.dummyIdent();
  }
};
lp.parseExprImport = function() {
  var node = this.startNode();
  var meta = this.parseIdent(true);
  switch (this.tok.type) {
    case types$1.parenL:
      return this.parseDynamicImport(node);
    case types$1.dot:
      node.meta = meta;
      return this.parseImportMeta(node);
    default:
      node.name = "import";
      return this.finishNode(node, "Identifier");
  }
};
lp.parseDynamicImport = function(node) {
  var list2 = this.parseExprList(types$1.parenR);
  node.source = list2[0] || this.dummyString();
  node.options = list2[1] || null;
  return this.finishNode(node, "ImportExpression");
};
lp.parseImportMeta = function(node) {
  this.next();
  node.property = this.parseIdent(true);
  return this.finishNode(node, "MetaProperty");
};
lp.parseNew = function() {
  var node = this.startNode(), startIndent = this.curIndent, line = this.curLineStart;
  var meta = this.parseIdent(true);
  if (this.options.ecmaVersion >= 6 && this.eat(types$1.dot)) {
    node.meta = meta;
    node.property = this.parseIdent(true);
    return this.finishNode(node, "MetaProperty");
  }
  var start = this.storeCurrentPos();
  node.callee = this.parseSubscripts(this.parseExprAtom(), start, true, startIndent, line);
  if (this.tok.type === types$1.parenL) {
    node.arguments = this.parseExprList(types$1.parenR);
  } else {
    node.arguments = [];
  }
  return this.finishNode(node, "NewExpression");
};
lp.parseTemplateElement = function() {
  var elem = this.startNode();
  if (this.tok.type === types$1.invalidTemplate) {
    elem.value = {
      raw: this.tok.value,
      cooked: null
    };
  } else {
    elem.value = {
      raw: this.input.slice(this.tok.start, this.tok.end).replace(/\r\n?/g, `
`),
      cooked: this.tok.value
    };
  }
  this.next();
  elem.tail = this.tok.type === types$1.backQuote;
  return this.finishNode(elem, "TemplateElement");
};
lp.parseTemplate = function() {
  var node = this.startNode();
  this.next();
  node.expressions = [];
  var curElt = this.parseTemplateElement();
  node.quasis = [curElt];
  while (!curElt.tail) {
    this.next();
    node.expressions.push(this.parseExpression());
    if (this.expect(types$1.braceR)) {
      curElt = this.parseTemplateElement();
    } else {
      curElt = this.startNode();
      curElt.value = { cooked: "", raw: "" };
      curElt.tail = true;
      this.finishNode(curElt, "TemplateElement");
    }
    node.quasis.push(curElt);
  }
  this.expect(types$1.backQuote);
  return this.finishNode(node, "TemplateLiteral");
};
lp.parseObj = function() {
  var node = this.startNode();
  node.properties = [];
  this.pushCx();
  var indent = this.curIndent + 1, line = this.curLineStart;
  this.eat(types$1.braceL);
  if (this.curIndent + 1 < indent) {
    indent = this.curIndent;
    line = this.curLineStart;
  }
  while (!this.closes(types$1.braceR, indent, line)) {
    var prop = this.startNode(), isGenerator = undefined, isAsync = undefined, start = undefined;
    if (this.options.ecmaVersion >= 9 && this.eat(types$1.ellipsis)) {
      prop.argument = this.parseMaybeAssign();
      node.properties.push(this.finishNode(prop, "SpreadElement"));
      this.eat(types$1.comma);
      continue;
    }
    if (this.options.ecmaVersion >= 6) {
      start = this.storeCurrentPos();
      prop.method = false;
      prop.shorthand = false;
      isGenerator = this.eat(types$1.star);
    }
    this.parsePropertyName(prop);
    if (this.toks.isAsyncProp(prop)) {
      isAsync = true;
      isGenerator = this.options.ecmaVersion >= 9 && this.eat(types$1.star);
      this.parsePropertyName(prop);
    } else {
      isAsync = false;
    }
    if (isDummy(prop.key)) {
      if (isDummy(this.parseMaybeAssign())) {
        this.next();
      }
      this.eat(types$1.comma);
      continue;
    }
    if (this.eat(types$1.colon)) {
      prop.kind = "init";
      prop.value = this.parseMaybeAssign();
    } else if (this.options.ecmaVersion >= 6 && (this.tok.type === types$1.parenL || this.tok.type === types$1.braceL)) {
      prop.kind = "init";
      prop.method = true;
      prop.value = this.parseMethod(isGenerator, isAsync);
    } else if (this.options.ecmaVersion >= 5 && prop.key.type === "Identifier" && !prop.computed && (prop.key.name === "get" || prop.key.name === "set") && (this.tok.type !== types$1.comma && this.tok.type !== types$1.braceR && this.tok.type !== types$1.eq)) {
      prop.kind = prop.key.name;
      this.parsePropertyName(prop);
      prop.value = this.parseMethod(false);
    } else {
      prop.kind = "init";
      if (this.options.ecmaVersion >= 6) {
        if (this.eat(types$1.eq)) {
          var assign = this.startNodeAt(start);
          assign.operator = "=";
          assign.left = prop.key;
          assign.right = this.parseMaybeAssign();
          prop.value = this.finishNode(assign, "AssignmentExpression");
        } else {
          prop.value = prop.key;
        }
      } else {
        prop.value = this.dummyIdent();
      }
      prop.shorthand = true;
    }
    node.properties.push(this.finishNode(prop, "Property"));
    this.eat(types$1.comma);
  }
  this.popCx();
  if (!this.eat(types$1.braceR)) {
    this.last.end = this.tok.start;
    if (this.options.locations) {
      this.last.loc.end = this.tok.loc.start;
    }
  }
  return this.finishNode(node, "ObjectExpression");
};
lp.parsePropertyName = function(prop) {
  if (this.options.ecmaVersion >= 6) {
    if (this.eat(types$1.bracketL)) {
      prop.computed = true;
      prop.key = this.parseExpression();
      this.expect(types$1.bracketR);
      return;
    } else {
      prop.computed = false;
    }
  }
  var key = this.tok.type === types$1.num || this.tok.type === types$1.string ? this.parseExprAtom() : this.parseIdent();
  prop.key = key || this.dummyIdent();
};
lp.parsePropertyAccessor = function() {
  if (this.tok.type === types$1.name || this.tok.type.keyword) {
    return this.parseIdent();
  }
  if (this.tok.type === types$1.privateId) {
    return this.parsePrivateIdent();
  }
};
lp.parseIdent = function() {
  var name = this.tok.type === types$1.name ? this.tok.value : this.tok.type.keyword;
  if (!name) {
    return this.dummyIdent();
  }
  if (this.tok.type.keyword) {
    this.toks.type = types$1.name;
  }
  var node = this.startNode();
  this.next();
  node.name = name;
  return this.finishNode(node, "Identifier");
};
lp.parsePrivateIdent = function() {
  var node = this.startNode();
  node.name = this.tok.value;
  this.next();
  return this.finishNode(node, "PrivateIdentifier");
};
lp.initFunction = function(node) {
  node.id = null;
  node.params = [];
  if (this.options.ecmaVersion >= 6) {
    node.generator = false;
    node.expression = false;
  }
  if (this.options.ecmaVersion >= 8) {
    node.async = false;
  }
};
lp.toAssignable = function(node, binding) {
  if (!node || node.type === "Identifier" || node.type === "MemberExpression" && !binding)
    ;
  else if (node.type === "ParenthesizedExpression") {
    this.toAssignable(node.expression, binding);
  } else if (this.options.ecmaVersion < 6) {
    return this.dummyIdent();
  } else if (node.type === "ObjectExpression") {
    node.type = "ObjectPattern";
    for (var i2 = 0, list2 = node.properties;i2 < list2.length; i2 += 1) {
      var prop = list2[i2];
      this.toAssignable(prop, binding);
    }
  } else if (node.type === "ArrayExpression") {
    node.type = "ArrayPattern";
    this.toAssignableList(node.elements, binding);
  } else if (node.type === "Property") {
    this.toAssignable(node.value, binding);
  } else if (node.type === "SpreadElement") {
    node.type = "RestElement";
    this.toAssignable(node.argument, binding);
  } else if (node.type === "AssignmentExpression") {
    node.type = "AssignmentPattern";
    delete node.operator;
  } else {
    return this.dummyIdent();
  }
  return node;
};
lp.toAssignableList = function(exprList, binding) {
  for (var i2 = 0, list2 = exprList;i2 < list2.length; i2 += 1) {
    var expr = list2[i2];
    this.toAssignable(expr, binding);
  }
  return exprList;
};
lp.parseFunctionParams = function(params) {
  params = this.parseExprList(types$1.parenR);
  return this.toAssignableList(params, true);
};
lp.parseMethod = function(isGenerator, isAsync) {
  var node = this.startNode(), oldInAsync = this.inAsync, oldInGenerator = this.inGenerator, oldInFunction = this.inFunction;
  this.initFunction(node);
  if (this.options.ecmaVersion >= 6) {
    node.generator = !!isGenerator;
  }
  if (this.options.ecmaVersion >= 8) {
    node.async = !!isAsync;
  }
  this.inAsync = node.async;
  this.inGenerator = node.generator;
  this.inFunction = true;
  node.params = this.parseFunctionParams();
  node.body = this.parseBlock();
  this.toks.adaptDirectivePrologue(node.body.body);
  this.inAsync = oldInAsync;
  this.inGenerator = oldInGenerator;
  this.inFunction = oldInFunction;
  return this.finishNode(node, "FunctionExpression");
};
lp.parseArrowExpression = function(node, params, isAsync) {
  var oldInAsync = this.inAsync, oldInGenerator = this.inGenerator, oldInFunction = this.inFunction;
  this.initFunction(node);
  if (this.options.ecmaVersion >= 8) {
    node.async = !!isAsync;
  }
  this.inAsync = node.async;
  this.inGenerator = false;
  this.inFunction = true;
  node.params = this.toAssignableList(params, true);
  node.expression = this.tok.type !== types$1.braceL;
  if (node.expression) {
    node.body = this.parseMaybeAssign();
  } else {
    node.body = this.parseBlock();
    this.toks.adaptDirectivePrologue(node.body.body);
  }
  this.inAsync = oldInAsync;
  this.inGenerator = oldInGenerator;
  this.inFunction = oldInFunction;
  return this.finishNode(node, "ArrowFunctionExpression");
};
lp.parseExprList = function(close, allowEmpty) {
  this.pushCx();
  var indent = this.curIndent, line = this.curLineStart, elts = [];
  this.next();
  while (!this.closes(close, indent + 1, line)) {
    if (this.eat(types$1.comma)) {
      elts.push(allowEmpty ? null : this.dummyIdent());
      continue;
    }
    var elt = this.parseMaybeAssign();
    if (isDummy(elt)) {
      if (this.closes(close, indent, line)) {
        break;
      }
      this.next();
    } else {
      elts.push(elt);
    }
    this.eat(types$1.comma);
  }
  this.popCx();
  if (!this.eat(close)) {
    this.last.end = this.tok.start;
    if (this.options.locations) {
      this.last.loc.end = this.tok.loc.start;
    }
  }
  return elts;
};
lp.parseAwait = function() {
  var node = this.startNode();
  this.next();
  node.argument = this.parseMaybeUnary();
  return this.finishNode(node, "AwaitExpression");
};
defaultOptions.tabSize = 4;

// node_modules/acorn-walk/dist/walk.mjs
function ancestor(node, visitors, baseVisitor, state, override) {
  var ancestors = [];
  if (!baseVisitor) {
    baseVisitor = base;
  }
  (function c(node2, st, override2) {
    var type = override2 || node2.type;
    var isNew = node2 !== ancestors[ancestors.length - 1];
    if (isNew) {
      ancestors.push(node2);
    }
    baseVisitor[type](node2, st, c);
    if (visitors[type]) {
      visitors[type](node2, st || ancestors, ancestors);
    }
    if (isNew) {
      ancestors.pop();
    }
  })(node, state, override);
}
function skipThrough(node, st, c) {
  c(node, st);
}
function ignore(_node, _st, _c) {}
var base = {};
base.Program = base.BlockStatement = base.StaticBlock = function(node, st, c) {
  for (var i2 = 0, list2 = node.body;i2 < list2.length; i2 += 1) {
    var stmt = list2[i2];
    c(stmt, st, "Statement");
  }
};
base.Statement = skipThrough;
base.EmptyStatement = ignore;
base.ExpressionStatement = base.ParenthesizedExpression = base.ChainExpression = function(node, st, c) {
  return c(node.expression, st, "Expression");
};
base.IfStatement = function(node, st, c) {
  c(node.test, st, "Expression");
  c(node.consequent, st, "Statement");
  if (node.alternate) {
    c(node.alternate, st, "Statement");
  }
};
base.LabeledStatement = function(node, st, c) {
  return c(node.body, st, "Statement");
};
base.BreakStatement = base.ContinueStatement = ignore;
base.WithStatement = function(node, st, c) {
  c(node.object, st, "Expression");
  c(node.body, st, "Statement");
};
base.SwitchStatement = function(node, st, c) {
  c(node.discriminant, st, "Expression");
  for (var i2 = 0, list2 = node.cases;i2 < list2.length; i2 += 1) {
    var cs = list2[i2];
    c(cs, st);
  }
};
base.SwitchCase = function(node, st, c) {
  if (node.test) {
    c(node.test, st, "Expression");
  }
  for (var i2 = 0, list2 = node.consequent;i2 < list2.length; i2 += 1) {
    var cons = list2[i2];
    c(cons, st, "Statement");
  }
};
base.ReturnStatement = base.YieldExpression = base.AwaitExpression = function(node, st, c) {
  if (node.argument) {
    c(node.argument, st, "Expression");
  }
};
base.ThrowStatement = base.SpreadElement = function(node, st, c) {
  return c(node.argument, st, "Expression");
};
base.TryStatement = function(node, st, c) {
  c(node.block, st, "Statement");
  if (node.handler) {
    c(node.handler, st);
  }
  if (node.finalizer) {
    c(node.finalizer, st, "Statement");
  }
};
base.CatchClause = function(node, st, c) {
  if (node.param) {
    c(node.param, st, "Pattern");
  }
  c(node.body, st, "Statement");
};
base.WhileStatement = base.DoWhileStatement = function(node, st, c) {
  c(node.test, st, "Expression");
  c(node.body, st, "Statement");
};
base.ForStatement = function(node, st, c) {
  if (node.init) {
    c(node.init, st, "ForInit");
  }
  if (node.test) {
    c(node.test, st, "Expression");
  }
  if (node.update) {
    c(node.update, st, "Expression");
  }
  c(node.body, st, "Statement");
};
base.ForInStatement = base.ForOfStatement = function(node, st, c) {
  c(node.left, st, "ForInit");
  c(node.right, st, "Expression");
  c(node.body, st, "Statement");
};
base.ForInit = function(node, st, c) {
  if (node.type === "VariableDeclaration") {
    c(node, st);
  } else {
    c(node, st, "Expression");
  }
};
base.DebuggerStatement = ignore;
base.FunctionDeclaration = function(node, st, c) {
  return c(node, st, "Function");
};
base.VariableDeclaration = function(node, st, c) {
  for (var i2 = 0, list2 = node.declarations;i2 < list2.length; i2 += 1) {
    var decl = list2[i2];
    c(decl, st);
  }
};
base.VariableDeclarator = function(node, st, c) {
  c(node.id, st, "Pattern");
  if (node.init) {
    c(node.init, st, "Expression");
  }
};
base.Function = function(node, st, c) {
  if (node.id) {
    c(node.id, st, "Pattern");
  }
  for (var i2 = 0, list2 = node.params;i2 < list2.length; i2 += 1) {
    var param = list2[i2];
    c(param, st, "Pattern");
  }
  c(node.body, st, node.expression ? "Expression" : "Statement");
};
base.Pattern = function(node, st, c) {
  if (node.type === "Identifier") {
    c(node, st, "VariablePattern");
  } else if (node.type === "MemberExpression") {
    c(node, st, "MemberPattern");
  } else {
    c(node, st);
  }
};
base.VariablePattern = ignore;
base.MemberPattern = skipThrough;
base.RestElement = function(node, st, c) {
  return c(node.argument, st, "Pattern");
};
base.ArrayPattern = function(node, st, c) {
  for (var i2 = 0, list2 = node.elements;i2 < list2.length; i2 += 1) {
    var elt = list2[i2];
    if (elt) {
      c(elt, st, "Pattern");
    }
  }
};
base.ObjectPattern = function(node, st, c) {
  for (var i2 = 0, list2 = node.properties;i2 < list2.length; i2 += 1) {
    var prop = list2[i2];
    if (prop.type === "Property") {
      if (prop.computed) {
        c(prop.key, st, "Expression");
      }
      c(prop.value, st, "Pattern");
    } else if (prop.type === "RestElement") {
      c(prop.argument, st, "Pattern");
    }
  }
};
base.Expression = skipThrough;
base.ThisExpression = base.Super = base.MetaProperty = ignore;
base.ArrayExpression = function(node, st, c) {
  for (var i2 = 0, list2 = node.elements;i2 < list2.length; i2 += 1) {
    var elt = list2[i2];
    if (elt) {
      c(elt, st, "Expression");
    }
  }
};
base.ObjectExpression = function(node, st, c) {
  for (var i2 = 0, list2 = node.properties;i2 < list2.length; i2 += 1) {
    var prop = list2[i2];
    c(prop, st);
  }
};
base.FunctionExpression = base.ArrowFunctionExpression = base.FunctionDeclaration;
base.SequenceExpression = function(node, st, c) {
  for (var i2 = 0, list2 = node.expressions;i2 < list2.length; i2 += 1) {
    var expr = list2[i2];
    c(expr, st, "Expression");
  }
};
base.TemplateLiteral = function(node, st, c) {
  for (var i2 = 0, list2 = node.quasis;i2 < list2.length; i2 += 1) {
    var quasi = list2[i2];
    c(quasi, st);
  }
  for (var i$1 = 0, list$1 = node.expressions;i$1 < list$1.length; i$1 += 1) {
    var expr = list$1[i$1];
    c(expr, st, "Expression");
  }
};
base.TemplateElement = ignore;
base.UnaryExpression = base.UpdateExpression = function(node, st, c) {
  c(node.argument, st, "Expression");
};
base.BinaryExpression = base.LogicalExpression = function(node, st, c) {
  c(node.left, st, "Expression");
  c(node.right, st, "Expression");
};
base.AssignmentExpression = base.AssignmentPattern = function(node, st, c) {
  c(node.left, st, "Pattern");
  c(node.right, st, "Expression");
};
base.ConditionalExpression = function(node, st, c) {
  c(node.test, st, "Expression");
  c(node.consequent, st, "Expression");
  c(node.alternate, st, "Expression");
};
base.NewExpression = base.CallExpression = function(node, st, c) {
  c(node.callee, st, "Expression");
  if (node.arguments) {
    for (var i2 = 0, list2 = node.arguments;i2 < list2.length; i2 += 1) {
      var arg = list2[i2];
      c(arg, st, "Expression");
    }
  }
};
base.MemberExpression = function(node, st, c) {
  c(node.object, st, "Expression");
  if (node.computed) {
    c(node.property, st, "Expression");
  }
};
base.ExportNamedDeclaration = base.ExportDefaultDeclaration = function(node, st, c) {
  if (node.declaration) {
    c(node.declaration, st, node.type === "ExportNamedDeclaration" || node.declaration.id ? "Statement" : "Expression");
  }
  if (node.source) {
    c(node.source, st, "Expression");
  }
};
base.ExportAllDeclaration = function(node, st, c) {
  if (node.exported) {
    c(node.exported, st);
  }
  c(node.source, st, "Expression");
};
base.ImportDeclaration = function(node, st, c) {
  for (var i2 = 0, list2 = node.specifiers;i2 < list2.length; i2 += 1) {
    var spec = list2[i2];
    c(spec, st);
  }
  c(node.source, st, "Expression");
};
base.ImportExpression = function(node, st, c) {
  c(node.source, st, "Expression");
};
base.ImportSpecifier = base.ImportDefaultSpecifier = base.ImportNamespaceSpecifier = base.Identifier = base.PrivateIdentifier = base.Literal = ignore;
base.TaggedTemplateExpression = function(node, st, c) {
  c(node.tag, st, "Expression");
  c(node.quasi, st, "Expression");
};
base.ClassDeclaration = base.ClassExpression = function(node, st, c) {
  return c(node, st, "Class");
};
base.Class = function(node, st, c) {
  if (node.id) {
    c(node.id, st, "Pattern");
  }
  if (node.superClass) {
    c(node.superClass, st, "Expression");
  }
  c(node.body, st);
};
base.ClassBody = function(node, st, c) {
  for (var i2 = 0, list2 = node.body;i2 < list2.length; i2 += 1) {
    var elt = list2[i2];
    c(elt, st);
  }
};
base.MethodDefinition = base.PropertyDefinition = base.Property = function(node, st, c) {
  if (node.computed) {
    c(node.key, st, "Expression");
  }
  if (node.value) {
    c(node.value, st, "Expression");
  }
};

// pkg/ast-analyzer/regex-analyzer.ts
function createRegexAnalyzer(config) {
  return (args, matchesReturn) => {
    return {
      Literal(node, _state, ancestors) {
        const stringValue = node.value;
        if (typeof stringValue !== "string") {
          return;
        }
        if (!config.regex.test(stringValue)) {
          return;
        }
        if (!node.loc) {
          return;
        }
        const match = {
          filePath: args.filePath,
          analyzerName: config.analyzerName,
          value: stringValue,
          start: node.loc.start,
          end: node.loc.end,
          tags: config.tags ? config.tags(stringValue) : {}
        };
        if (config.filter && !config.filter(match, ancestors)) {
          return;
        }
        matchesReturn.push(match);
      },
      TemplateLiteral(node, _state, ancestors) {
        const templateValue = args.source.slice(node.start, node.end).replaceAll("`", "");
        if (!config.regex.test(templateValue)) {
          return;
        }
        if (!node.loc) {
          return;
        }
        const match = {
          filePath: args.filePath,
          analyzerName: config.analyzerName,
          value: templateValue,
          start: node.loc.start,
          end: node.loc.end,
          tags: config.tags ? config.tags(templateValue) : {}
        };
        if (config.filter && !config.filter(match, ancestors)) {
          return;
        }
        matchesReturn.push(match);
      }
    };
  };
}

// pkg/ast-analyzer/paths.ts
var PATH_REGEX = /^(?!https?:\/\/)(?:\/)?(?:[A-Za-z0-9\-._~!$&'()*+,;=:@{}]+\/)*[A-Za-z0-9\-._~!$&'()*+,;=:@{}]+(?:\?[^#]*)?(?:#[^]*)?$/;
function isHighEntropy(str, threshold = 4.9) {
  const freq = {};
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
var COMMON_MIME_TYPES = new Set([
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
  "x-conference/x-cooltalk"
]);
var STATIC_ASSET_EXTENSIONS = new Set([
  ".css",
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".svg",
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
  ".ttf",
  ".otf",
  ".woff",
  ".woff2",
  ".eot",
  ".mp3",
  ".wav",
  ".ogg",
  ".mp4",
  ".avi",
  ".mov",
  ".wmv",
  ".flv",
  ".mkv",
  ".webm"
]);
function isMimeType(str) {
  return COMMON_MIME_TYPES.has(str) || str.toLowerCase().endsWith(";charset=utf-8");
}
function containsOnlySpecialChars(path) {
  const withoutSlashes = path.replace(/\//g, "");
  return withoutSlashes.length > 0 && /^[^a-zA-Z0-9]+$/.test(withoutSlashes);
}
function hasOnlyShortSegments(path) {
  const segments = path.split("/").filter((segment) => segment.length > 0);
  return segments.length > 0 && segments.every((segment) => segment.length <= 2);
}
function hasFileExtension(path) {
  const lastSegment = path.split("/").pop() || "";
  return Array.from(STATIC_ASSET_EXTENSIONS).some((ext) => lastSegment.toLowerCase().endsWith(ext));
}
var PATHS_ANALYZER_NAME = "paths";
var pathsAnalyzerBuilder = createRegexAnalyzer({
  analyzerName: PATHS_ANALYZER_NAME,
  regex: PATH_REGEX,
  filter: (match, ancestors) => {
    const value = match.value;
    if (!value.includes("/")) {
      return false;
    }
    if (containsOnlySpecialChars(value)) {
      return false;
    }
    if (/^[@.~]/.test(value)) {
      return false;
    }
    if (isMimeType(value)) {
      return false;
    }
    if (isHighEntropy(value)) {
      return false;
    }
    if (hasOnlyShortSegments(value)) {
      return false;
    }
    if (hasFileExtension(value)) {
      return false;
    }
    if (ancestors.some((ancestor2) => ancestor2.type === "ImportDeclaration")) {
      return false;
    }
    return true;
  },
  tags: (value) => {
    const tags = {};
    tags.path = true;
    if (value.includes("api")) {
      tags.api = true;
    }
    if (value.includes("?")) {
      tags.query = true;
    }
    if (value.includes("#")) {
      tags.fragment = true;
    }
    return tags;
  }
});

// pkg/ast-analyzer/emails.ts
var EMAIL_ADDRESS_REGEX = /^[a-zA-Z0-9_.${}+-]+@[${}a-zA-Z0-9-]+\.?[a-zA-Z0-9-.]*$/;
var isLikelyEmail = (match) => {
  if (match.value.includes("://"))
    return false;
  if (match.value.trim().split("@").length !== 2)
    return false;
  return true;
};
var EMAILS_ANALYZER_NAME = "emails";
var emailsAnalyzerBuilder = createRegexAnalyzer({
  analyzerName: EMAILS_ANALYZER_NAME,
  regex: EMAIL_ADDRESS_REGEX,
  filter: isLikelyEmail
});

// pkg/ast-analyzer/post-message.ts
var POST_MESSAGE_ANALYZER_NAME = "post-message";
var postMessageAnalyzerBuilder = (args, matchesReturn) => {
  return {
    CallExpression(node, _state, ancestors) {
      if (node.callee.type === "MemberExpression" && node.callee.object.type === "Identifier" && node.callee.property.type === "Identifier" && node.callee.property.name === "postMessage" || node.callee.type === "Identifier" && node.callee.name === "postMessage") {
        const targetOriginArg = node.arguments[1];
        if (!node.loc) {
          return;
        }
        const tags = {
          "post-message": true
        };
        const match = {
          filePath: args.filePath,
          analyzerName: POST_MESSAGE_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags
        };
        matchesReturn.push(match);
      }
    }
  };
};

// pkg/ast-analyzer/message-listener.ts
var MESSAGE_LISTENER_ANALYZER_NAME = "message-listener";
var messageListenerAnalyzerBuilder = (args, matchesReturn) => {
  return {
    AssignmentExpression(node, _state, ancestors) {
      if (node.left.type === "MemberExpression" && node.left.object.type === "Identifier" && node.left.object.name === "window" && node.left.property.type === "Identifier" && node.left.property.name === "onmessage" || node.left.type === "Identifier" && node.left.name === "onmessage") {
        if (!node.loc) {
          return;
        }
        const match = {
          filePath: args.filePath,
          analyzerName: MESSAGE_LISTENER_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "message-listener": true
          }
        };
        matchesReturn.push(match);
      }
    },
    CallExpression(node, _state, ancestors) {
      if (node.callee.type === "MemberExpression" && node.callee.property.type === "Identifier" && node.callee.property.name === "addEventListener" && node.arguments.length >= 2 && node.arguments[0].type === "Literal" && node.arguments[0].value === "message") {
        if (!node.loc) {
          return;
        }
        const match = {
          filePath: args.filePath,
          analyzerName: MESSAGE_LISTENER_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "message-listener": true
          }
        };
        matchesReturn.push(match);
      }
    }
  };
};

// pkg/ast-analyzer/regex-match.ts
var REGEX_MATCH_ANALYZER_NAME = "regex-match";
var regexMatchAnalyzerBuilder = (args, matchesReturn) => {
  return {
    CallExpression(node, _state, ancestors) {
      if (!node.loc) {
        return;
      }
      if (node.callee.type === "MemberExpression" && node.callee.property.type === "Identifier" && node.callee.property.name === "match" && (node.callee.object.type === "Identifier" || node.callee.object.type === "Literal" && typeof node.callee.object.value === "string") && node.arguments.length > 0 && (node.arguments[0].type === "Literal" || node.arguments[0].type === "RegExpLiteral")) {
        const match = {
          filePath: args.filePath,
          analyzerName: REGEX_MATCH_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "regex-match": true
          }
        };
        matchesReturn.push(match);
      }
      if (node.callee.type === "MemberExpression" && node.callee.property.type === "Identifier" && node.callee.property.name === "test" && (node.callee.object.type === "NewExpression" && node.callee.object.callee.type === "Identifier" && node.callee.object.callee.name === "RegExp" || node.callee.object.type === "Identifier" && node.callee.object.name === "RegExp" || node.callee.object.type === "Identifier" && node.callee.object.name === "regex")) {
        const match = {
          filePath: args.filePath,
          analyzerName: REGEX_MATCH_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "regex-match": true
          }
        };
        matchesReturn.push(match);
      }
      if (node.callee.type === "MemberExpression" && node.callee.property.type === "Identifier" && node.callee.property.name === "exec" && (node.callee.object.type === "NewExpression" && node.callee.object.callee.type === "Identifier" && node.callee.object.callee.name === "RegExp" || node.callee.object.type === "Identifier" && node.callee.object.name === "RegExp" || node.callee.object.type === "Identifier" && node.callee.object.name === "regex")) {
        const match = {
          filePath: args.filePath,
          analyzerName: REGEX_MATCH_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "regex-match": true
          }
        };
        matchesReturn.push(match);
      }
    }
  };
};

// pkg/ast-analyzer/hash-change.ts
var HASH_CHANGE_ANALYZER_NAME = "hash-change";
var hashChangeAnalyzerBuilder = (args, matchesReturn) => {
  return {
    AssignmentExpression(node, _state, ancestors) {
      if (node.left.type === "MemberExpression" && node.left.object.type === "Identifier" && node.left.object.name === "window" && node.left.property.type === "Identifier" && node.left.property.name === "onhashchange" || node.left.type === "Identifier" && node.left.name === "onhashchange") {
        if (!node.loc) {
          return;
        }
        const match = {
          filePath: args.filePath,
          analyzerName: HASH_CHANGE_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "hash-change": true
          }
        };
        matchesReturn.push(match);
      }
    },
    CallExpression(node, _state, ancestors) {
      if (node.callee.type === "MemberExpression" && node.callee.property.type === "Identifier" && node.callee.property.name === "addEventListener" && node.arguments.length >= 2 && node.arguments[0].type === "Literal" && node.arguments[0].value === "hashchange") {
        if (!node.loc) {
          return;
        }
        const match = {
          filePath: args.filePath,
          analyzerName: HASH_CHANGE_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "hash-change": true
          }
        };
        matchesReturn.push(match);
      }
    }
  };
};

// pkg/ast-analyzer/regex.ts
var REGEX_ANALYZER_NAME = "regex";
var regexAnalyzerBuilder = (args, matchesReturn) => {
  return {
    Literal(node, _state, ancestors) {
      if (!node.loc) {
        return;
      }
      if (node.regex) {
        const match = {
          filePath: args.filePath,
          analyzerName: REGEX_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            regex: true,
            "regex-literal": true
          }
        };
        matchesReturn.push(match);
      }
    },
    NewExpression(node, _state, ancestors) {
      if (node.callee.type === "Identifier" && node.callee.name === "RegExp") {
        if (!node.loc) {
          return;
        }
        const match = {
          filePath: args.filePath,
          analyzerName: REGEX_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            regex: true,
            "regex-constructor": true
          }
        };
        matchesReturn.push(match);
      }
    }
  };
};

// pkg/ast-analyzer/dom-xss.ts
var DOM_XSS_ANALYZER_NAME = "dom-xss";
var domXssAnalyzerBuilder = (args, matchesReturn) => {
  return {
    AssignmentExpression(node, _state, ancestors) {
      if (!node.loc) {
        return;
      }
      if (node.left.type === "MemberExpression" && node.left.property.type === "Identifier" && node.left.property.name === "innerHTML") {
        const match = {
          filePath: args.filePath,
          analyzerName: DOM_XSS_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "dom-xss": true
          }
        };
        matchesReturn.push(match);
      }
      if (node.left.type === "MemberExpression" && node.left.property.type === "Identifier" && node.left.property.name === "outerHTML") {
        const match = {
          filePath: args.filePath,
          analyzerName: DOM_XSS_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "dom-xss": true
          }
        };
        matchesReturn.push(match);
      }
      if (node.left.type === "MemberExpression" && node.left.object.type === "Identifier" && node.left.object.name === "document" && node.left.property.type === "Identifier" && node.left.property.name === "domain") {
        const match = {
          filePath: args.filePath,
          analyzerName: DOM_XSS_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "dom-xss": true
          }
        };
        matchesReturn.push(match);
      }
      if (node.left.type === "MemberExpression" && node.left.property.type === "Identifier" && node.left.property.name.startsWith("on") && (node.right.type === "Literal" || node.right.type === "TemplateLiteral")) {
        const match = {
          filePath: args.filePath,
          analyzerName: DOM_XSS_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "dom-xss": true
          }
        };
        matchesReturn.push(match);
      }
    },
    CallExpression(node, _state, ancestors) {
      if (!node.loc) {
        return;
      }
      if (node.callee.type === "MemberExpression" && node.callee.object.type === "Identifier" && node.callee.object.name === "document" && node.callee.property.type === "Identifier" && (node.callee.property.name === "write" || node.callee.property.name === "writeln")) {
        const match = {
          filePath: args.filePath,
          analyzerName: DOM_XSS_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "dom-xss": true
          }
        };
        matchesReturn.push(match);
      }
      if (node.callee.type === "MemberExpression" && node.callee.property.type === "Identifier" && node.callee.property.name === "insertAdjacentHTML") {
        const match = {
          filePath: args.filePath,
          analyzerName: DOM_XSS_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "dom-xss": true
          }
        };
        matchesReturn.push(match);
      }
    }
  };
};

// pkg/ast-analyzer/graphql.ts
var GRAPHQL_REGEX = /(query|mutation|type|fragment|subscription|directive|input|enum|interface|union|scalar|object|list|nonnull)/;
function isValidGraphQLOperation(str) {
  const trimmed = str.trim();
  if (!trimmed.startsWith("query") && !trimmed.startsWith("mutation") && !trimmed.startsWith("type") && !trimmed.startsWith("fragment") && !trimmed.startsWith("subscription") && !trimmed.startsWith("input") && !trimmed.startsWith("enum") && !trimmed.startsWith("interface") && !trimmed.startsWith("union") && !trimmed.startsWith("scalar") && !trimmed.startsWith("object") && !trimmed.startsWith("list") && !trimmed.startsWith("nonnull")) {
    return false;
  }
  if (!trimmed.includes("{") || !trimmed.includes("}")) {
    return false;
  }
  let braceCount = 0;
  for (const char of trimmed) {
    if (char === "{")
      braceCount++;
    if (char === "}")
      braceCount--;
    if (braceCount < 0)
      return false;
  }
  return braceCount === 0;
}
var GRAPHQL_ANALYZER_NAME = "graphql";
var graphqlAnalyzerBuilder = createRegexAnalyzer({
  analyzerName: GRAPHQL_ANALYZER_NAME,
  regex: GRAPHQL_REGEX,
  filter: (match, ancestors) => {
    const value = match.value;
    const cleanValue = value.replace(/^`|`$/g, "").trim();
    if (!isValidGraphQLOperation(cleanValue)) {
      return false;
    }
    return true;
  },
  tags: (value) => {
    const tags = {};
    const cleanValue = value.replace(/^`|`$/g, "").trim();
    tags.graphql = true;
    return tags;
  }
});

// pkg/ast-analyzer/urls.ts
var URL_REGEX = /^(https?|ftp|ftps|sftp|ws|wss):\/\/(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(?::\d+)?(?:\/[^\s]*)?$/;
var URLS_ANALYZER_NAME = "urls";
var urlsAnalyzerBuilder = createRegexAnalyzer({
  analyzerName: URLS_ANALYZER_NAME,
  regex: URL_REGEX,
  tags: (value) => {
    const tags = {};
    const protocol = value.split("://")[0];
    if (protocol) {
      tags[protocol] = true;
    }
    if (value.includes("?")) {
      tags.query = true;
    }
    if (value.includes("#")) {
      tags.fragment = true;
    }
    return tags;
  }
});

// pkg/ast-analyzer/jquery-dom-xss.ts
var JQUERY_DOM_XSS_ANALYZER_NAME = "jquery-dom-xss";
var jqueryDomXssAnalyzerBuilder = (args, matchesReturn) => {
  return {
    CallExpression(node, _state, ancestors) {
      if (!node.loc) {
        return;
      }
      const jquerySinkMethods = [
        "add",
        "after",
        "append",
        "animate",
        "insertAfter",
        "insertBefore",
        "before",
        "html",
        "prepend",
        "replaceAll",
        "replaceWith",
        "wrap",
        "wrapInner",
        "wrapAll",
        "has",
        "constructor",
        "init",
        "index",
        "parseHTML"
      ];
      if (node.callee.type === "MemberExpression" && node.callee.property.type === "Identifier" && jquerySinkMethods.includes(node.callee.property.name)) {
        let isJQueryObject = false;
        let current2 = node.callee.object;
        while (current2) {
          if (current2.type === "CallExpression" && current2.callee.type === "Identifier" && (current2.callee.name === "jQuery" || current2.callee.name === "$")) {
            isJQueryObject = true;
            break;
          }
          if (current2.type === "MemberExpression") {
            current2 = current2.object;
          } else {
            break;
          }
        }
        if (isJQueryObject) {
          const match = {
            filePath: args.filePath,
            analyzerName: JQUERY_DOM_XSS_ANALYZER_NAME,
            value: args.source.slice(node.start, node.end),
            start: node.loc.start,
            end: node.loc.end,
            tags: {
              "jquery-dom-xss": true
            }
          };
          matchesReturn.push(match);
        }
      }
      if (node.callee.type === "MemberExpression" && node.callee.property.type === "Identifier" && node.callee.property.name === "parseHTML" && node.callee.object.type === "Identifier" && (node.callee.object.name === "jQuery" || node.callee.object.name === "$")) {
        const match = {
          filePath: args.filePath,
          analyzerName: JQUERY_DOM_XSS_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "jquery-dom-xss": true
          }
        };
        matchesReturn.push(match);
      }
    }
  };
};

// pkg/ast-analyzer/open-redirection.ts
var OPEN_REDIRECTION_ANALYZER_NAME = "open-redirection";
var openRedirectionAnalyzerBuilder = (args, matchesReturn) => {
  return {
    CallExpression(node, _state, ancestors) {
      if (!node.loc) {
        return;
      }
      if (node.callee.type === "MemberExpression" && node.callee.property.type === "Identifier" && (node.callee.property.name === "open" || node.callee.property.name === "send") && (node.callee.object.type === "Identifier" && node.callee.object.name === "xhr" || node.callee.object.type === "NewExpression" && node.callee.object.callee.type === "Identifier" && node.callee.object.callee.name === "XMLHttpRequest")) {
        const match = {
          filePath: args.filePath,
          analyzerName: OPEN_REDIRECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "open-redirection": true
          }
        };
        matchesReturn.push(match);
      }
      if (node.callee.type === "MemberExpression" && node.callee.property.type === "Identifier" && node.callee.property.name === "ajax" && node.callee.object.type === "Identifier" && (node.callee.object.name === "jQuery" || node.callee.object.name === "$")) {
        const match = {
          filePath: args.filePath,
          analyzerName: OPEN_REDIRECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "open-redirection": true
          }
        };
        matchesReturn.push(match);
      }
      if (node.callee.type === "MemberExpression" && node.callee.object.type === "Identifier" && node.callee.object.name === "location" && node.callee.property.type === "Identifier" && (node.callee.property.name === "assign" || node.callee.property.name === "replace")) {
        const match = {
          filePath: args.filePath,
          analyzerName: OPEN_REDIRECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "open-redirection": true
          }
        };
        matchesReturn.push(match);
      }
      if (node.callee.type === "MemberExpression" && node.callee.object.type === "Identifier" && node.callee.object.name === "window" && node.callee.property.type === "Identifier" && node.callee.property.name === "open") {
        const match = {
          filePath: args.filePath,
          analyzerName: OPEN_REDIRECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "open-redirection": true
          }
        };
        matchesReturn.push(match);
      }
    },
    MemberExpression(node, _state, ancestors) {
      if (!node.loc) {
        return;
      }
      if (node.object.type === "Identifier" && node.object.name === "location" && node.property.type === "Identifier" && ["host", "hostname", "href", "pathname", "search", "protocol"].includes(node.property.name)) {
        const match = {
          filePath: args.filePath,
          analyzerName: OPEN_REDIRECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "open-redirection": true
          }
        };
        matchesReturn.push(match);
      }
      if (node.property.type === "Identifier" && node.property.name === "srcdoc") {
        const match = {
          filePath: args.filePath,
          analyzerName: OPEN_REDIRECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "open-redirection": true
          }
        };
        matchesReturn.push(match);
      }
    },
    AssignmentExpression(node, _state, ancestors) {
      if (!node.loc) {
        return;
      }
      if (node.left.type === "MemberExpression" && node.left.object.type === "Identifier" && node.left.object.name === "location" && node.left.property.type === "Identifier" && ["host", "hostname", "href", "pathname", "search", "protocol"].includes(node.left.property.name)) {
        const match = {
          filePath: args.filePath,
          analyzerName: OPEN_REDIRECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "open-redirection": true
          }
        };
        matchesReturn.push(match);
      }
      if (node.left.type === "MemberExpression" && node.left.property.type === "Identifier" && node.left.property.name === "srcdoc") {
        const match = {
          filePath: args.filePath,
          analyzerName: OPEN_REDIRECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "open-redirection": true
          }
        };
        matchesReturn.push(match);
      }
    }
  };
};

// pkg/ast-analyzer/cookie-manipulation.ts
var COOKIE_MANIPULATION_ANALYZER_NAME = "cookie-manipulation";
var cookieManipulationAnalyzerBuilder = (args, matchesReturn) => {
  return {
    AssignmentExpression(node, _state, ancestors) {
      if (!node.loc) {
        return;
      }
      if (node.left.type === "MemberExpression" && node.left.object.type === "Identifier" && node.left.object.name === "document" && node.left.property.type === "Identifier" && node.left.property.name === "cookie") {
        const match = {
          filePath: args.filePath,
          analyzerName: COOKIE_MANIPULATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "cookie-manipulation": true
          }
        };
        matchesReturn.push(match);
      }
    }
  };
};

// pkg/ast-analyzer/javascript-injection.ts
var JAVASCRIPT_INJECTION_ANALYZER_NAME = "javascript-injection";
var javascriptInjectionAnalyzerBuilder = (args, matchesReturn) => {
  return {
    CallExpression(node, _state, ancestors) {
      if (!node.loc) {
        return;
      }
      if (node.callee.type === "Identifier" && node.callee.name === "eval") {
        const match = {
          filePath: args.filePath,
          analyzerName: JAVASCRIPT_INJECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "javascript-injection": true
          }
        };
        matchesReturn.push(match);
      }
      if (node.callee.type === "Identifier" && node.callee.name === "Function") {
        const match = {
          filePath: args.filePath,
          analyzerName: JAVASCRIPT_INJECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "javascript-injection": true
          }
        };
        matchesReturn.push(match);
      }
      if (node.callee.type === "Identifier" && node.callee.name === "setTimeout") {
        const match = {
          filePath: args.filePath,
          analyzerName: JAVASCRIPT_INJECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "javascript-injection": true
          }
        };
        matchesReturn.push(match);
      }
      if (node.callee.type === "Identifier" && node.callee.name === "setInterval") {
        const match = {
          filePath: args.filePath,
          analyzerName: JAVASCRIPT_INJECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "javascript-injection": true
          }
        };
        matchesReturn.push(match);
      }
      if (node.callee.type === "Identifier" && node.callee.name === "setImmediate") {
        const match = {
          filePath: args.filePath,
          analyzerName: JAVASCRIPT_INJECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "javascript-injection": true
          }
        };
        matchesReturn.push(match);
      }
      if (node.callee.type === "MemberExpression" && node.callee.property.type === "Identifier" && node.callee.property.name === "execCommand") {
        const match = {
          filePath: args.filePath,
          analyzerName: JAVASCRIPT_INJECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "javascript-injection": true
          }
        };
        matchesReturn.push(match);
      }
      if (node.callee.type === "MemberExpression" && node.callee.property.type === "Identifier" && node.callee.property.name === "execScript") {
        const match = {
          filePath: args.filePath,
          analyzerName: JAVASCRIPT_INJECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "javascript-injection": true
          }
        };
        matchesReturn.push(match);
      }
      if (node.callee.type === "MemberExpression" && node.callee.property.type === "Identifier" && node.callee.property.name === "msSetImmediate") {
        const match = {
          filePath: args.filePath,
          analyzerName: JAVASCRIPT_INJECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "javascript-injection": true
          }
        };
        matchesReturn.push(match);
      }
      if (node.callee.type === "MemberExpression" && node.callee.object.type === "Identifier" && node.callee.object.name === "crypto" && node.callee.property.type === "Identifier" && node.callee.property.name === "generateCRMFRequest") {
        const match = {
          filePath: args.filePath,
          analyzerName: JAVASCRIPT_INJECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "javascript-injection": true
          }
        };
        matchesReturn.push(match);
      }
      if (node.callee.type === "MemberExpression" && node.callee.object.type === "Identifier" && node.callee.object.name === "range" && node.callee.property.type === "Identifier" && node.callee.property.name === "createContextualFragment") {
        const match = {
          filePath: args.filePath,
          analyzerName: JAVASCRIPT_INJECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "javascript-injection": true
          }
        };
        matchesReturn.push(match);
      }
    }
  };
};

// pkg/ast-analyzer/document-domain-manipulation.ts
var DOCUMENT_DOMAIN_MANIPULATION_ANALYZER_NAME = "document-domain-manipulation";
var documentDomainManipulationAnalyzerBuilder = (args, matchesReturn) => {
  return {
    MemberExpression(node, _state, ancestors) {
      if (!node.loc) {
        return;
      }
      if (node.object.type === "Identifier" && node.object.name === "document" && node.property.type === "Identifier" && node.property.name === "domain") {
        const match = {
          filePath: args.filePath,
          analyzerName: DOCUMENT_DOMAIN_MANIPULATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "document-domain-manipulation": true
          }
        };
        matchesReturn.push(match);
      }
    },
    AssignmentExpression(node, _state, ancestors) {
      if (!node.loc) {
        return;
      }
      if (node.left.type === "MemberExpression" && node.left.object.type === "Identifier" && node.left.object.name === "document" && node.left.property.type === "Identifier" && node.left.property.name === "domain") {
        const match = {
          filePath: args.filePath,
          analyzerName: DOCUMENT_DOMAIN_MANIPULATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "document-domain-manipulation": true
          }
        };
        matchesReturn.push(match);
      }
    }
  };
};

// pkg/ast-analyzer/websocket-url-poisoning.ts
var WEBSOCKET_URL_POISONING_ANALYZER_NAME = "websocket-url-poisoning";
var websocketUrlPoisoningAnalyzerBuilder = (args, matchesReturn) => {
  return {
    NewExpression(node, _state, ancestors) {
      if (!node.loc) {
        return;
      }
      if (node.callee.type === "Identifier" && node.callee.name === "WebSocket") {
        const match = {
          filePath: args.filePath,
          analyzerName: WEBSOCKET_URL_POISONING_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "websocket-url-poisoning": true
          }
        };
        matchesReturn.push(match);
      }
    }
  };
};

// pkg/ast-analyzer/link-manipulation.ts
var LINK_MANIPULATION_ANALYZER_NAME = "link-manipulation";
var linkManipulationAnalyzerBuilder = (args, matchesReturn) => {
  return {
    MemberExpression(node, _state, ancestors) {
      if (!node.loc) {
        return;
      }
      if (node.property.type === "Identifier" && ["href", "src", "action"].includes(node.property.name)) {
        const match = {
          filePath: args.filePath,
          analyzerName: LINK_MANIPULATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "link-manipulation": true
          }
        };
        matchesReturn.push(match);
      }
    },
    AssignmentExpression(node, _state, ancestors) {
      if (!node.loc) {
        return;
      }
      if (node.left.type === "MemberExpression" && node.left.property.type === "Identifier" && ["href", "src", "action"].includes(node.left.property.name)) {
        const match = {
          filePath: args.filePath,
          analyzerName: LINK_MANIPULATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "link-manipulation": true
          }
        };
        matchesReturn.push(match);
      }
    }
  };
};

// pkg/ast-analyzer/ajax-request-header-manipulation.ts
var AJAX_REQUEST_HEADER_MANIPULATION_ANALYZER_NAME = "ajax-request-header-manipulation";
var ajaxRequestHeaderManipulationAnalyzerBuilder = (args, matchesReturn) => {
  return {
    CallExpression(node, _state, ancestors) {
      if (!node.loc) {
        return;
      }
      if (node.callee.type === "MemberExpression" && node.callee.property.type === "Identifier" && ["setRequestHeader", "open", "send"].includes(node.callee.property.name) && (node.callee.object.type === "Identifier" && node.callee.object.name === "xhr" || node.callee.object.type === "NewExpression" && node.callee.object.callee.type === "Identifier" && node.callee.object.callee.name === "XMLHttpRequest")) {
        const match = {
          filePath: args.filePath,
          analyzerName: AJAX_REQUEST_HEADER_MANIPULATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "ajax-request-header-manipulation": true
          }
        };
        matchesReturn.push(match);
      }
      if (node.callee.type === "MemberExpression" && node.callee.property.type === "Identifier" && node.callee.property.name === "globalEval" && node.callee.object.type === "Identifier" && (node.callee.object.name === "jQuery" || node.callee.object.name === "$")) {
        const match = {
          filePath: args.filePath,
          analyzerName: AJAX_REQUEST_HEADER_MANIPULATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "ajax-request-header-manipulation": true
          }
        };
        matchesReturn.push(match);
      }
    }
  };
};

// pkg/ast-analyzer/local-file-path-manipulation.ts
var LOCAL_FILE_PATH_MANIPULATION_ANALYZER_NAME = "local-file-path-manipulation";
var localFilePathManipulationAnalyzerBuilder = (args, matchesReturn) => {
  return {
    CallExpression(node, _state, ancestors) {
      if (!node.loc) {
        return;
      }
      if (node.callee.type === "MemberExpression" && node.callee.object.type === "Identifier" && node.callee.object.name === "FileReader" && node.callee.property.type === "Identifier" && [
        "readAsArrayBuffer",
        "readAsBinaryString",
        "readAsDataURL",
        "readAsText",
        "readAsFile"
      ].includes(node.callee.property.name)) {
        const match = {
          filePath: args.filePath,
          analyzerName: LOCAL_FILE_PATH_MANIPULATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "local-file-path-manipulation": true
          }
        };
        matchesReturn.push(match);
      }
      if (node.callee.type === "MemberExpression" && node.callee.object.type === "MemberExpression" && node.callee.object.object.type === "Identifier" && node.callee.object.object.name === "FileReader" && node.callee.object.property.type === "Identifier" && node.callee.object.property.name === "root" && node.callee.property.type === "Identifier" && node.callee.property.name === "getFile") {
        const match = {
          filePath: args.filePath,
          analyzerName: LOCAL_FILE_PATH_MANIPULATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "local-file-path-manipulation": true
          }
        };
        matchesReturn.push(match);
      }
    }
  };
};

// pkg/ast-analyzer/html5-storage-manipulation.ts
var HTML5_STORAGE_MANIPULATION_ANALYZER_NAME = "html5-storage-manipulation";
var html5StorageManipulationAnalyzerBuilder = (args, matchesReturn) => {
  return {
    CallExpression(node, _state, ancestors) {
      if (!node.loc) {
        return;
      }
      if (node.callee.type === "MemberExpression" && node.callee.object.type === "Identifier" && node.callee.object.name === "sessionStorage" && node.callee.property.type === "Identifier" && node.callee.property.name === "setItem") {
        const match = {
          filePath: args.filePath,
          analyzerName: HTML5_STORAGE_MANIPULATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "session-storage": true
          }
        };
        matchesReturn.push(match);
      }
      if (node.callee.type === "MemberExpression" && node.callee.object.type === "Identifier" && node.callee.object.name === "localStorage" && node.callee.property.type === "Identifier" && node.callee.property.name === "setItem") {
        const match = {
          filePath: args.filePath,
          analyzerName: HTML5_STORAGE_MANIPULATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "local-storage": true
          }
        };
        matchesReturn.push(match);
      }
    }
  };
};

// pkg/ast-analyzer/xpath-injection.ts
var XPATH_INJECTION_ANALYZER_NAME = "xpath-injection";
var xpathInjectionAnalyzerBuilder = (args, matchesReturn) => {
  return {
    CallExpression(node, _state, ancestors) {
      if (!node.loc) {
        return;
      }
      if (node.callee.type === "MemberExpression" && node.callee.object.type === "Identifier" && node.callee.object.name === "document" && node.callee.property.type === "Identifier" && node.callee.property.name === "evaluate") {
        const match = {
          filePath: args.filePath,
          analyzerName: XPATH_INJECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "xpath-injection": true
          }
        };
        matchesReturn.push(match);
        return;
      }
      if (node.callee.type === "MemberExpression" && node.callee.property.type === "Identifier" && node.callee.property.name === "evaluate" && node.callee.object.type === "Identifier" && node.callee.object.name !== "document") {
        const match = {
          filePath: args.filePath,
          analyzerName: XPATH_INJECTION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "xpath-injection": true
          }
        };
        matchesReturn.push(match);
      }
    }
  };
};

// pkg/ast-analyzer/dom-data-manipulation.ts
var DOM_DATA_MANIPULATION_ANALYZER_NAME = "dom-data-manipulation";
var domDataManipulationAnalyzerBuilder = (args, matchesReturn) => {
  return {
    CallExpression(node, _state, ancestors) {
      if (!node.loc) {
        return;
      }
      if (node.callee.type === "MemberExpression" && node.callee.property.type === "Identifier" && node.callee.property.name === "setAttribute") {
        const match = {
          filePath: args.filePath,
          analyzerName: DOM_DATA_MANIPULATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "dom-data-manipulation": true
          }
        };
        matchesReturn.push(match);
      }
      if (node.callee.type === "MemberExpression" && node.callee.object.type === "MemberExpression" && node.callee.object.object.type === "Identifier" && node.callee.object.object.name === "document" && node.callee.object.property.type === "Identifier" && node.callee.object.property.name === "implementation" && node.callee.property.type === "Identifier" && node.callee.property.name === "createHTMLDocument") {
        const match = {
          filePath: args.filePath,
          analyzerName: DOM_DATA_MANIPULATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "dom-data-manipulation": true
          }
        };
        matchesReturn.push(match);
      }
      if (node.callee.type === "MemberExpression" && node.callee.object.type === "Identifier" && node.callee.object.name === "history" && node.callee.property.type === "Identifier" && (node.callee.property.name === "pushState" || node.callee.property.name === "replaceState")) {
        const match = {
          filePath: args.filePath,
          analyzerName: DOM_DATA_MANIPULATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "dom-data-manipulation": true
          }
        };
        matchesReturn.push(match);
      }
    },
    MemberExpression(node, _state, ancestors) {
      if (!node.loc) {
        return;
      }
      if (node.object.type === "Identifier" && node.object.name === "script" && node.property.type === "Identifier" && ["src", "text", "textContent", "innerText"].includes(node.property.name)) {
        const match = {
          filePath: args.filePath,
          analyzerName: DOM_DATA_MANIPULATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "dom-data-manipulation": true
          }
        };
        matchesReturn.push(match);
      }
      if (node.object.type === "Identifier" && node.object.name === "document" && node.property.type === "Identifier" && node.property.name === "title") {
        const match = {
          filePath: args.filePath,
          analyzerName: DOM_DATA_MANIPULATION_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "dom-data-manipulation": true
          }
        };
        matchesReturn.push(match);
      }
    }
  };
};

// pkg/ast-analyzer/common-sources.ts
var COMMON_SOURCES_ANALYZER_NAME = "common-sources";
var commonSourcesAnalyzerBuilder = (args, matchesReturn) => {
  return {
    AssignmentExpression(node, _state, ancestors) {
      if (!node.loc) {
        return;
      }
      if (node.left.type === "Identifier" && node.left.name === "location") {
        const match = {
          filePath: args.filePath,
          analyzerName: COMMON_SOURCES_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "common-sources": true
          }
        };
        matchesReturn.push(match);
      }
      if (node.left.type === "MemberExpression" && node.left.object.type === "Identifier" && node.left.object.name === "location" && node.left.property.type === "Identifier" && ["href", "pathname", "search", "hash"].includes(node.left.property.name)) {
        const match = {
          filePath: args.filePath,
          analyzerName: COMMON_SOURCES_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "common-sources": true
          }
        };
        matchesReturn.push(match);
      }
    },
    MemberExpression(node, _state, ancestors) {
      if (!node.loc) {
        return;
      }
      if (node.object.type === "Identifier" && node.object.name === "document" && node.property.type === "Identifier" && [
        "URL",
        "documentURI",
        "URLUnencoded",
        "baseURI",
        "cookie",
        "referrer"
      ].includes(node.property.name)) {
        const match = {
          filePath: args.filePath,
          analyzerName: COMMON_SOURCES_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "common-sources": true
          }
        };
        matchesReturn.push(match);
      }
      if (node.object.type === "Identifier" && node.object.name === "window" && node.property.type === "Identifier" && node.property.name === "name") {
        const match = {
          filePath: args.filePath,
          analyzerName: COMMON_SOURCES_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "common-sources": true
          }
        };
        matchesReturn.push(match);
      }
      if (node.object.type === "Identifier" && ["mozIndexedDB", "webkitIndexedDB", "msIndexedDB"].includes(node.object.name)) {
        const match = {
          filePath: args.filePath,
          analyzerName: COMMON_SOURCES_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "common-sources": true
          }
        };
        matchesReturn.push(match);
      }
    },
    CallExpression(node, _state, ancestors) {
      if (!node.loc) {
        return;
      }
      if (node.callee.type === "MemberExpression" && node.callee.object.type === "Identifier" && node.callee.object.name === "history" && node.callee.property.type === "Identifier" && ["pushState", "replaceState"].includes(node.callee.property.name)) {
        const match = {
          filePath: args.filePath,
          analyzerName: COMMON_SOURCES_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "common-sources": true
          }
        };
        matchesReturn.push(match);
      }
      if (node.callee.type === "MemberExpression" && node.callee.object.type === "Identifier" && ["localStorage", "sessionStorage"].includes(node.callee.object.name) && node.callee.property.type === "Identifier" && node.callee.property.name === "getItem") {
        const match = {
          filePath: args.filePath,
          analyzerName: COMMON_SOURCES_ANALYZER_NAME,
          value: args.source.slice(node.start, node.end),
          start: node.loc.start,
          end: node.loc.end,
          tags: {
            "common-sources": true
          }
        };
        matchesReturn.push(match);
      }
    }
  };
};

// pkg/ast-analyzer/secrets.ts
var SECRET_PATTERNS = [
  {
    name: "AWS API Gateway",
    regex: new RegExp("[0-9a-z]+.execute-api.[0-9a-z._-]+.amazonaws.com")
  },
  { name: "AWS API Key", regex: new RegExp("AKIA[0-9A-Z]{16}") },
  {
    name: "AWS ARN",
    regex: new RegExp("arn:aws:[a-z0-9-]+:[a-z]{2}-[a-z]+-[0-9]+:[0-9]+:.+")
  },
  {
    name: "AWS Access Key ID Value",
    regex: new RegExp("(A3T[A-Z0-9]|AKIA|AGPA|AROA|AIPA|ANPA|ANVA|ASIA)[A-Z0-9]{16}")
  },
  { name: "AWS AppSync GraphQL Key", regex: new RegExp("da2-[a-z0-9]{26}") },
  {
    name: "AWS EC2 External",
    regex: new RegExp("ec2-[0-9a-z._-]+.compute(-1)?.amazonaws.com")
  },
  {
    name: "AWS EC2 Internal",
    regex: new RegExp("[0-9a-z._-]+.compute(-1)?.internal")
  },
  { name: "AWS ELB", regex: new RegExp("[0-9a-z._-]+.elb.amazonaws.com") },
  {
    name: "AWS ElasticCache",
    regex: new RegExp("[0-9a-z._-]+.cache.amazonaws.com")
  },
  {
    name: "AWS MWS ID",
    regex: new RegExp("mzn\\.mws\\.[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}")
  },
  {
    name: "AWS MWS key",
    regex: new RegExp("amzn\\.mws\\.[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}")
  },
  { name: "AWS RDS", regex: new RegExp("[0-9a-z._-]+.rds.amazonaws.com") },
  { name: "AWS S3 Bucket", regex: new RegExp("s3://[0-9a-z._/-]+") },
  {
    name: "AWS client ID",
    regex: new RegExp("(A3T[A-Z0-9]|AKIA|AGPA|AIDA|AROA|AIPA|ANPA|ANVA|ASIA)[A-Z0-9]{16}")
  },
  {
    name: "AWS cred file info",
    regex: new RegExp("(aws_access_key_id|aws_secret_access_key)")
  },
  {
    name: "Abbysale",
    regex: new RegExp("(?:abbysale).{0,40}\\b([a-z0-9A-Z]{40})\\b")
  },
  {
    name: "Abstract",
    regex: new RegExp("(?:abstract).{0,40}\\b([0-9a-z]{32})\\b")
  },
  {
    name: "Abuseipdb",
    regex: new RegExp("(?:abuseipdb).{0,40}\\b([a-z0-9]{80})\\b")
  },
  {
    name: "Accuweather",
    regex: new RegExp("(?:accuweather).{0,40}([a-z0-9A-Z\\%]{35})\\b")
  },
  { name: "Adafruitio", regex: new RegExp("\\b(aio\\_[a-zA-Z0-9]{28})\\b") },
  {
    name: "Adobeio - 1",
    regex: new RegExp("(?:adobe).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Adzuna - 1",
    regex: new RegExp("(?:adzuna).{0,40}\\b([a-z0-9]{8})\\b")
  },
  {
    name: "Adzuna - 2",
    regex: new RegExp("(?:adzuna).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Aeroworkflow - 1",
    regex: new RegExp("(?:aeroworkflow).{0,40}\\b([0-9]{1,})\\b")
  },
  {
    name: "Aeroworkflow - 2",
    regex: new RegExp("(?:aeroworkflow).{0,40}\\b([a-zA-Z0-9^!]{20})\\b")
  },
  { name: "Agora", regex: new RegExp("(?:agora).{0,40}\\b([a-z0-9]{32})\\b") },
  {
    name: "Airbrakeprojectkey - 1",
    regex: new RegExp("(?:airbrake).{0,40}\\b([0-9]{6})\\b")
  },
  {
    name: "Airbrakeprojectkey - 2",
    regex: new RegExp("(?:airbrake).{0,40}\\b([a-zA-Z-0-9]{32})\\b")
  },
  {
    name: "Airbrakeuserkey",
    regex: new RegExp("(?:airbrake).{0,40}\\b([a-zA-Z-0-9]{40})\\b")
  },
  {
    name: "Airship",
    regex: new RegExp("(?:airship).{0,40}\\b([0-9Aa-zA-Z]{91})\\b")
  },
  {
    name: "Airvisual",
    regex: new RegExp("(?:airvisual).{0,40}\\b([a-z0-9-]{36})\\b")
  },
  {
    name: "Alconost",
    regex: new RegExp("(?:alconost).{0,40}\\b([0-9Aa-z]{32})\\b")
  },
  {
    name: "Alegra - 1",
    regex: new RegExp("(?:alegra).{0,40}\\b([a-z0-9-]{20})\\b")
  },
  {
    name: "Alegra - 2",
    regex: new RegExp("(?:alegra).{0,40}\\b([a-zA-Z0-9.-@]{25,30})\\b")
  },
  {
    name: "Aletheiaapi",
    regex: new RegExp("(?:aletheiaapi).{0,40}\\b([A-Z0-9]{32})\\b")
  },
  {
    name: "Algoliaadminkey - 1",
    regex: new RegExp("(?:algolia).{0,40}\\b([A-Z0-9]{10})\\b")
  },
  {
    name: "Algoliaadminkey - 2",
    regex: new RegExp("(?:algolia).{0,40}\\b([a-zA-Z0-9]{32})\\b")
  },
  {
    name: "Alibaba - 2",
    regex: new RegExp("\\b(LTAI[a-zA-Z0-9]{17,21})[\\\"' ;\\s]*")
  },
  {
    name: "Alienvault",
    regex: new RegExp("(?:alienvault).{0,40}\\b([a-z0-9]{64})\\b")
  },
  {
    name: "Allsports",
    regex: new RegExp("(?:allsports).{0,40}\\b([0-9a-z]{64})\\b")
  },
  {
    name: "Amadeus - 1",
    regex: new RegExp("(?:amadeus).{0,40}\\b([0-9A-Za-z]{32})\\b")
  },
  {
    name: "Amadeus - 2",
    regex: new RegExp("(?:amadeus).{0,40}\\b([0-9A-Za-z]{16})\\b")
  },
  {
    name: "Amazon SNS Topic",
    regex: new RegExp("arn:aws:sns:[a-z0-9\\-]+:[0-9]+:[A-Za-z0-9\\-_]+")
  },
  { name: "Ambee", regex: new RegExp("(?:ambee).{0,40}\\b([0-9a-f]{64})\\b") },
  {
    name: "Amplitudeapikey",
    regex: new RegExp("(?:amplitude).{0,40}\\b([a-f0-9]{32})")
  },
  {
    name: "Apacta",
    regex: new RegExp("(?:apacta).{0,40}\\b([a-z0-9-]{36})\\b")
  },
  {
    name: "Api2cart",
    regex: new RegExp("(?:api2cart).{0,40}\\b([0-9a-f]{32})\\b")
  },
  {
    name: "Apideck - 1",
    regex: new RegExp("\\b(sk_live_[a-z0-9A-Z-]{93})\\b")
  },
  {
    name: "Apideck - 2",
    regex: new RegExp("(?:apideck).{0,40}\\b([a-z0-9A-Z]{40})\\b")
  },
  {
    name: "Apiflash - 1",
    regex: new RegExp("(?:apiflash).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Apiflash - 2",
    regex: new RegExp("(?:apiflash).{0,40}\\b([a-zA-Z0-9\\S]{21,30})\\b")
  },
  {
    name: "Apifonica",
    regex: new RegExp("(?:apifonica).{0,40}\\b([0-9a-z]{11}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12})\\b")
  },
  {
    name: "Apify",
    regex: new RegExp("\\b(apify\\_api\\_[a-zA-Z-0-9]{36})\\b")
  },
  {
    name: "Apimatic - 1",
    regex: new RegExp("(?:apimatic).{0,40}\\b([a-z0-9-\\S]{8,32})\\b")
  },
  {
    name: "Apimatic - 2",
    regex: new RegExp("(?:apimatic).{0,40}\\b([a-zA-Z0-9]{3,20}@[a-zA-Z0-9]{2,12}.[a-zA-Z0-9]{2,5})\\b")
  },
  {
    name: "Apiscience",
    regex: new RegExp("(?:apiscience).{0,40}\\b([a-bA-Z0-9\\S]{22})\\b")
  },
  {
    name: "Apollo",
    regex: new RegExp("(?:apollo).{0,40}\\b([a-zA-Z0-9]{22})\\b")
  },
  {
    name: "Appcues - 1",
    regex: new RegExp("(?:appcues).{0,40}\\b([0-9]{5})\\b")
  },
  {
    name: "Appcues - 2",
    regex: new RegExp("(?:appcues).{0,40}\\b([a-z0-9-]{36})\\b")
  },
  {
    name: "Appcues - 3",
    regex: new RegExp("(?:appcues).{0,40}\\b([a-z0-9-]{39})\\b")
  },
  {
    name: "Appfollow",
    regex: new RegExp("(?:appfollow).{0,40}\\b([0-9A-Za-z]{20})\\b")
  },
  {
    name: "Appsynergy",
    regex: new RegExp("(?:appsynergy).{0,40}\\b([a-z0-9]{64})\\b")
  },
  {
    name: "Apptivo - 1",
    regex: new RegExp("(?:apptivo).{0,40}\\b([a-z0-9-]{36})\\b")
  },
  {
    name: "Apptivo - 2",
    regex: new RegExp("(?:apptivo).{0,40}\\b([a-zA-Z0-9-]{32})\\b")
  },
  {
    name: "Artifactory - 2",
    regex: new RegExp("\\b([A-Za-z0-9](?:[A-Za-z0-9\\-]{0,61}[A-Za-z0-9])\\.jfrog\\.io)")
  },
  {
    name: "Artifactory API Token",
    regex: new RegExp('(?:\\s|=|:|"|^)AKC[a-zA-Z0-9]{10,}')
  },
  {
    name: "Artifactory Password",
    regex: new RegExp('(?:\\s|=|:|"|^)AP[\\dABCDEF][a-zA-Z0-9]{8,}')
  },
  {
    name: "Artsy - 1",
    regex: new RegExp("(?:artsy).{0,40}\\b([0-9a-zA-Z]{20})\\b")
  },
  {
    name: "Artsy - 2",
    regex: new RegExp("(?:artsy).{0,40}\\b([0-9a-zA-Z]{32})\\b")
  },
  {
    name: "Asanaoauth",
    regex: new RegExp("(?:asana).{0,40}\\b([a-z\\/:0-9]{51})\\b")
  },
  {
    name: "Asanapersonalaccesstoken",
    regex: new RegExp("(?:asana).{0,40}\\b([0-9]{1,}\\/[0-9]{16,}:[A-Za-z0-9]{32,})\\b")
  },
  {
    name: "Assemblyai",
    regex: new RegExp("(?:assemblyai).{0,40}\\b([0-9a-z]{32})\\b")
  },
  {
    name: "Asymmetric Private Key",
    regex: new RegExp("-----BEGIN ((EC|PGP|DSA|RSA|OPENSSH) )?PRIVATE KEY( BLOCK)?-----")
  },
  { name: "Audd", regex: new RegExp("(?:audd).{0,40}\\b([a-z0-9-]{32})\\b") },
  {
    name: "Auth0managementapitoken",
    regex: new RegExp("(?:auth0).{0,40}\\b(ey[a-zA-Z0-9._-]+)\\b")
  },
  {
    name: "Auth0oauth - 1",
    regex: new RegExp("(?:auth0).{0,40}\\b([a-zA-Z0-9_-]{32,60})\\b")
  },
  {
    name: "Autodesk - 1",
    regex: new RegExp("(?:autodesk).{0,40}\\b([0-9A-Za-z]{32})\\b")
  },
  {
    name: "Autodesk - 2",
    regex: new RegExp("(?:autodesk).{0,40}\\b([0-9A-Za-z]{16})\\b")
  },
  {
    name: "Autoklose",
    regex: new RegExp("(?:autoklose).{0,40}\\b([a-zA-Z0-9-]{32})\\b")
  },
  {
    name: "Autopilot",
    regex: new RegExp("(?:autopilot).{0,40}\\b([0-9a-f]{32})\\b")
  },
  {
    name: "Avazapersonalaccesstoken",
    regex: new RegExp("(?:avaza).{0,40}\\b([0-9]+-[0-9a-f]{40})\\b")
  },
  {
    name: "Aviationstack",
    regex: new RegExp("(?:aviationstack).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Aws - 1",
    regex: new RegExp("\\b((?:AKIA|ABIA|ACCA|ASIA)[0-9A-Z]{16})\\b")
  },
  {
    name: "Axonaut",
    regex: new RegExp("(?:axonaut).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Aylien - 1",
    regex: new RegExp("(?:aylien).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Aylien - 2",
    regex: new RegExp("(?:aylien).{0,40}\\b([a-z0-9]{8})\\b")
  },
  {
    name: "Ayrshare",
    regex: new RegExp("(?:ayrshare).{0,40}\\b([A-Z]{7}-[A-Z0-9]{7}-[A-Z0-9]{7}-[A-Z0-9]{7})\\b")
  },
  {
    name: "Bannerbear",
    regex: new RegExp("(?:bannerbear).{0,40}\\b([0-9a-zA-Z]{22}tt)\\b")
  },
  {
    name: "Baremetrics",
    regex: new RegExp("(?:baremetrics).{0,40}\\b([a-zA-Z0-9_]{25})\\b")
  },
  {
    name: "Baseapiio",
    regex: new RegExp("(?:baseapi|base-api).{0,40}\\b([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\\b")
  },
  {
    name: "Beamer",
    regex: new RegExp("(?:beamer).{0,40}\\b([a-zA-Z0-9_+/]{45}=)")
  },
  { name: "Bearer token", regex: new RegExp("(bearer).+") },
  {
    name: "Beebole",
    regex: new RegExp("(?:beebole).{0,40}\\b([0-9a-z]{40})\\b")
  },
  {
    name: "Besttime",
    regex: new RegExp("(?:besttime).{0,40}\\b([0-9A-Za-z_]{36})\\b")
  },
  {
    name: "Billomat - 1",
    regex: new RegExp("(?:billomat).{0,40}\\b([0-9a-z]{1,})\\b")
  },
  {
    name: "Billomat - 2",
    regex: new RegExp("(?:billomat).{0,40}\\b([0-9a-z]{32})\\b")
  },
  {
    name: "Bitbar",
    regex: new RegExp("(?:bitbar).{0,40}\\b([0-9a-z]{32})\\b")
  },
  {
    name: "Bitcoinaverage",
    regex: new RegExp("(?:bitcoinaverage).{0,40}\\b([a-zA-Z0-9]{43})\\b")
  },
  {
    name: "Bitfinex",
    regex: new RegExp("(?:bitfinex).{0,40}\\b([A-Za-z0-9_-]{43})\\b")
  },
  { name: "Bitly Secret Key", regex: new RegExp("R_[0-9a-f]{32}") },
  {
    name: "Bitlyaccesstoken",
    regex: new RegExp("(?:bitly).{0,40}\\b([a-zA-Z-0-9]{40})\\b")
  },
  {
    name: "Bitmex - 1",
    regex: new RegExp("(?:bitmex).{0,40}([ \\r\\n]{1}[0-9a-zA-Z\\-\\_]{24}[ \\r\\n]{1})")
  },
  {
    name: "Bitmex - 2",
    regex: new RegExp("(?:bitmex).{0,40}([ \\r\\n]{1}[0-9a-zA-Z\\-\\_]{48}[ \\r\\n]{1})")
  },
  {
    name: "Blablabus",
    regex: new RegExp("(?:blablabus).{0,40}\\b([0-9A-Za-z]{22})\\b")
  },
  {
    name: "Blazemeter",
    regex: new RegExp("(?:blazemeter|runscope).{0,40}\\b([0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12})\\b")
  },
  {
    name: "Blitapp",
    regex: new RegExp("(?:blitapp).{0,40}\\b([a-zA-Z0-9_-]{39})\\b")
  },
  {
    name: "Blogger",
    regex: new RegExp("(?:blogger).{0,40}\\b([0-9A-Za-z-]{39})\\b")
  },
  {
    name: "Bombbomb",
    regex: new RegExp("(?:bombbomb).{0,40}\\b([a-zA-Z0-9-._]{704})\\b")
  },
  {
    name: "Boostnote",
    regex: new RegExp("(?:boostnote).{0,40}\\b([0-9a-f]{64})\\b")
  },
  {
    name: "Borgbase",
    regex: new RegExp("(?:borgbase).{0,40}\\b([a-zA-Z0-9/_.-]{148,152})\\b")
  },
  {
    name: "Braintree API Key",
    regex: new RegExp("access_token$production$[0-9a-z]{16}$[0-9a-f]{32}")
  },
  {
    name: "Brandfetch",
    regex: new RegExp("(?:brandfetch).{0,40}\\b([0-9A-Za-z]{40})\\b")
  },
  {
    name: "Browshot",
    regex: new RegExp("(?:browshot).{0,40}\\b([a-zA-Z-0-9]{28})\\b")
  },
  {
    name: "Buddyns",
    regex: new RegExp("(?:buddyns).{0,40}\\b([0-9a-z]{40})\\b")
  },
  {
    name: "Bugherd",
    regex: new RegExp("(?:bugherd).{0,40}\\b([0-9a-z]{22})\\b")
  },
  {
    name: "Bugsnag",
    regex: new RegExp("(?:bugsnag).{0,40}\\b([0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12})\\b")
  },
  {
    name: "Buildkite",
    regex: new RegExp("(?:buildkite).{0,40}\\b([a-z0-9]{40})\\b")
  },
  {
    name: "Bulbul",
    regex: new RegExp("(?:bulbul).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Buttercms",
    regex: new RegExp("(?:buttercms).{0,40}\\b([a-z0-9]{40})\\b")
  },
  {
    name: "Caflou",
    regex: new RegExp("(?:caflou).{0,40}\\b([a-bA-Z0-9\\S]{155})\\b")
  },
  {
    name: "Calendarific",
    regex: new RegExp("(?:calendarific).{0,40}\\b([a-z0-9]{40})\\b")
  },
  {
    name: "Calendlyapikey",
    regex: new RegExp("(?:calendly).{0,40}\\b([a-zA-Z-0-9]{20}.[a-zA-Z-0-9]{171}.[a-zA-Z-0-9_]{43})\\b")
  },
  {
    name: "Calorieninja",
    regex: new RegExp("(?:calorieninja).{0,40}\\b([0-9A-Za-z]{40})\\b")
  },
  {
    name: "Campayn",
    regex: new RegExp("(?:campayn).{0,40}\\b([a-z0-9]{64})\\b")
  },
  {
    name: "Cannyio",
    regex: new RegExp("(?:canny).{0,40}\\b([a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[0-9]{4}-[a-z0-9]{12})\\b")
  },
  {
    name: "Capsulecrm",
    regex: new RegExp("(?:capsulecrm).{0,40}\\b([a-zA-Z0-9-._+=]{64})\\b")
  },
  {
    name: "Captaindata - 1",
    regex: new RegExp("(?:captaindata).{0,40}\\b([0-9a-f]{8}\\-[0-9a-f]{4}\\-[0-9a-f]{4}\\-[0-9a-f]{4}\\-[0-9a-f]{12})\\b")
  },
  {
    name: "Captaindata - 2",
    regex: new RegExp("(?:captaindata).{0,40}\\b([0-9a-f]{64})\\b")
  },
  {
    name: "Carboninterface",
    regex: new RegExp("(?:carboninterface).{0,40}\\b([a-zA-Z0-9]{21})\\b")
  },
  {
    name: "Cashboard - 1",
    regex: new RegExp("(?:cashboard).{0,40}\\b([0-9A-Z]{3}-[0-9A-Z]{3}-[0-9A-Z]{3}-[0-9A-Z]{3})\\b")
  },
  {
    name: "Cashboard - 2",
    regex: new RegExp("(?:cashboard).{0,40}\\b([0-9a-z]{1,})\\b")
  },
  {
    name: "Caspio - 1",
    regex: new RegExp("(?:caspio).{0,40}\\b([a-z0-9]{8})\\b")
  },
  {
    name: "Caspio - 2",
    regex: new RegExp("(?:caspio).{0,40}\\b([a-z0-9]{50})\\b")
  },
  {
    name: "Censys - 1",
    regex: new RegExp("(?:censys).{0,40}\\b([a-zA-Z0-9]{32})\\b")
  },
  {
    name: "Censys - 2",
    regex: new RegExp("(?:censys).{0,40}\\b([a-z0-9-]{36})\\b")
  },
  {
    name: "Centralstationcrm",
    regex: new RegExp("(?:centralstation).{0,40}\\b([a-z0-9]{30})\\b")
  },
  {
    name: "Cexio - 1",
    regex: new RegExp("(?:cexio|cex.io).{0,40}\\b([a-z]{2}[0-9]{9})\\b")
  },
  {
    name: "Cexio - 2",
    regex: new RegExp("(?:cexio|cex.io).{0,40}\\b([0-9A-Za-z]{24,27})\\b")
  },
  {
    name: "Chatbot",
    regex: new RegExp("(?:chatbot).{0,40}\\b([a-zA-Z0-9_]{32})\\b")
  },
  {
    name: "Chatfule",
    regex: new RegExp("(?:chatfuel).{0,40}\\b([a-zA-Z0-9]{128})\\b")
  },
  {
    name: "Checio",
    regex: new RegExp("(?:checio).{0,40}\\b(pk_[a-z0-9]{45})\\b")
  },
  {
    name: "Checklyhq",
    regex: new RegExp("(?:checklyhq).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Checkout - 1",
    regex: new RegExp("(?:checkout).{0,40}\\b((sk_|sk_test_)[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})\\b")
  },
  {
    name: "Checkout - 2",
    regex: new RegExp("(?:checkout).{0,40}\\b(cus_[0-9a-zA-Z]{26})\\b")
  },
  {
    name: "Checkvist - 1",
    regex: new RegExp("(?:checkvist).{0,40}\\b([\\w\\.-]+@[\\w-]+\\.[\\w\\.-]{2,5})\\b")
  },
  {
    name: "Checkvist - 2",
    regex: new RegExp("(?:checkvist).{0,40}\\b([0-9a-zA-Z]{14})\\b")
  },
  {
    name: "Cicero",
    regex: new RegExp("(?:cicero).{0,40}\\b([0-9a-z]{40})\\b")
  },
  { name: "Circleci", regex: new RegExp("(?:circle).{0,40}([a-fA-F0-9]{40})") },
  {
    name: "Clearbit",
    regex: new RegExp("(?:clearbit).{0,40}\\b([0-9a-z_]{35})\\b")
  },
  {
    name: "Clickhelp - 1",
    regex: new RegExp("\\b([0-9A-Za-z]{3,20}.try.clickhelp.co)\\b")
  },
  {
    name: "Clickhelp - 2",
    regex: new RegExp("(?:clickhelp).{0,40}\\b([0-9A-Za-z]{24})\\b")
  },
  {
    name: "Clicksendsms - 2",
    regex: new RegExp("(?:sms).{0,40}\\b([a-zA-Z0-9]{3,20}@[a-zA-Z0-9]{2,12}.[a-zA-Z0-9]{2,5})\\b")
  },
  {
    name: "Clickuppersonaltoken",
    regex: new RegExp("(?:clickup).{0,40}\\b(pk_[0-9]{8}_[0-9A-Z]{32})\\b")
  },
  {
    name: "Cliengo",
    regex: new RegExp("(?:cliengo).{0,40}\\b([0-9a-f]{8}\\-[0-9a-f]{4}\\-[0-9a-f]{4}\\-[0-9a-f]{4}\\-[0-9a-f]{12})\\b")
  },
  {
    name: "Clinchpad",
    regex: new RegExp("(?:clinchpad).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Clockify",
    regex: new RegExp("(?:clockify).{0,40}\\b([a-zA-Z0-9]{48})\\b")
  },
  {
    name: "Clockworksms - 1",
    regex: new RegExp("(?:clockwork|textanywhere).{0,40}\\b([0-9a-zA-Z]{24})\\b")
  },
  {
    name: "Clockworksms - 2",
    regex: new RegExp("(?:clockwork|textanywhere).{0,40}\\b([0-9]{5})\\b")
  },
  { name: "Closecrm", regex: new RegExp("\\b(api_[a-z0-9A-Z.]{45})\\b") },
  {
    name: "Cloudelements - 1",
    regex: new RegExp("(?:cloudelements).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Cloudelements - 2",
    regex: new RegExp("(?:cloudelements).{0,40}\\b([a-zA-Z0-9]{43})\\b")
  },
  {
    name: "Cloudflareapitoken",
    regex: new RegExp("(?:cloudflare).{0,40}\\b([A-Za-z0-9_-]{40})\\b")
  },
  {
    name: "Cloudflarecakey",
    regex: new RegExp("(?:cloudflare).{0,40}\\b(v[A-Za-z0-9._-]{173,})\\b")
  },
  {
    name: "Cloudimage",
    regex: new RegExp("(?:cloudimage).{0,40}\\b([a-z0-9_]{30})\\b")
  },
  {
    name: "Cloudinary Credentials",
    regex: new RegExp("cloudinary://[0-9]+:[A-Za-z0-9\\-_\\.]+@[A-Za-z0-9\\-_\\.]+")
  },
  {
    name: "Cloudmersive",
    regex: new RegExp("(?:cloudmersive).{0,40}\\b([a-z0-9-]{36})\\b")
  },
  {
    name: "Cloudplan",
    regex: new RegExp("(?:cloudplan).{0,40}\\b([A-Z0-9-]{32})\\b")
  },
  {
    name: "Cloverly",
    regex: new RegExp("(?:cloverly).{0,40}\\b([a-z0-9:_]{28})\\b")
  },
  {
    name: "Cloze - 1",
    regex: new RegExp("(?:cloze).{0,40}\\b([0-9a-f]{32})\\b")
  },
  {
    name: "Cloze - 2",
    regex: new RegExp("(?:cloze).{0,40}\\b([\\w\\.-]+@[\\w-]+\\.[\\w\\.-]{2,5})\\b")
  },
  {
    name: "Clustdoc",
    regex: new RegExp("(?:clustdoc).{0,40}\\b([0-9a-zA-Z]{60})\\b")
  },
  {
    name: "Codacy",
    regex: new RegExp("(?:codacy).{0,40}\\b([0-9A-Za-z]{20})\\b")
  },
  {
    name: "Coinapi",
    regex: new RegExp("(?:coinapi).{0,40}\\b([A-Z0-9-]{36})\\b")
  },
  {
    name: "Coinbase",
    regex: new RegExp("(?:coinbase).{0,40}\\b([a-zA-Z-0-9]{64})\\b")
  },
  {
    name: "Coinlayer",
    regex: new RegExp("(?:coinlayer).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Coinlib",
    regex: new RegExp("(?:coinlib).{0,40}\\b([a-z0-9]{16})\\b")
  },
  {
    name: "Column",
    regex: new RegExp("(?:column).{0,40}\\b((?:test|live)_[a-zA-Z0-9]{27})\\b")
  },
  {
    name: "Commercejs",
    regex: new RegExp("(?:commercejs).{0,40}\\b([a-z0-9_]{48})\\b")
  },
  {
    name: "Commodities",
    regex: new RegExp("(?:commodities).{0,40}\\b([a-zA-Z0-9]{60})\\b")
  },
  {
    name: "Companyhub - 1",
    regex: new RegExp("(?:companyhub).{0,40}\\b([0-9a-zA-Z]{20})\\b")
  },
  {
    name: "Companyhub - 2",
    regex: new RegExp("(?:companyhub).{0,40}\\b([a-zA-Z0-9$%^=-]{4,32})\\b")
  },
  {
    name: "Confluent - 1",
    regex: new RegExp("(?:confluent).{0,40}\\b([a-zA-Z-0-9]{16})\\b")
  },
  {
    name: "Confluent - 2",
    regex: new RegExp("(?:confluent).{0,40}\\b([a-zA-Z-0-9]{64})\\b")
  },
  {
    name: "Convertkit",
    regex: new RegExp("(?:convertkit).{0,40}\\b([a-z0-9A-Z_]{22})\\b")
  },
  {
    name: "Convier",
    regex: new RegExp("(?:convier).{0,40}\\b([0-9]{2}\\|[a-zA-Z0-9]{40})\\b")
  },
  {
    name: "Copper - 2",
    regex: new RegExp("(?:copper).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Countrylayer",
    regex: new RegExp("(?:countrylayer).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Courier",
    regex: new RegExp("(?:courier).{0,40}\\b(pk\\_[a-zA-Z0-9]{1,}\\_[a-zA-Z0-9]{28})\\b")
  },
  {
    name: "Coveralls",
    regex: new RegExp("(?:coveralls).{0,40}\\b([a-zA-Z0-9-]{37})\\b")
  },
  {
    name: "Crowdin",
    regex: new RegExp("(?:crowdin).{0,40}\\b([0-9A-Za-z]{80})\\b")
  },
  {
    name: "Cryptocompare",
    regex: new RegExp("(?:cryptocompare).{0,40}\\b([a-z-0-9]{64})\\b")
  },
  {
    name: "Currencycloud - 1",
    regex: new RegExp("(?:currencycloud).{0,40}\\b([0-9a-z]{64})\\b")
  },
  {
    name: "Currencyfreaks",
    regex: new RegExp("(?:currencyfreaks).{0,40}\\b([0-9a-z]{32})\\b")
  },
  {
    name: "Currencylayer",
    regex: new RegExp("(?:currencylayer).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Currencyscoop",
    regex: new RegExp("(?:currencyscoop).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Currentsapi",
    regex: new RegExp("(?:currentsapi).{0,40}\\b([a-zA-Z0-9\\S]{48})\\b")
  },
  {
    name: "Customerguru - 1",
    regex: new RegExp("(?:guru).{0,40}\\b([a-z0-9A-Z]{50})\\b")
  },
  {
    name: "Customerguru - 2",
    regex: new RegExp("(?:guru).{0,40}\\b([a-z0-9A-Z]{30})\\b")
  },
  {
    name: "Customerio",
    regex: new RegExp("(?:customer).{0,40}\\b([a-z0-9A-Z]{20})\\b")
  },
  {
    name: "D7network",
    regex: new RegExp("(?:d7network).{0,40}\\b([a-zA-Z0-9\\W\\S]{23}\\=)")
  },
  {
    name: "Dailyco",
    regex: new RegExp("(?:daily).{0,40}\\b([0-9a-f]{64})\\b")
  },
  {
    name: "Dandelion",
    regex: new RegExp("(?:dandelion).{0,40}\\b([a-z0-9]{32})\\b")
  },
  { name: "Databricks", regex: new RegExp("dapi[a-f0-9]{32}\\b") },
  {
    name: "Datadogtoken - 1",
    regex: new RegExp("(?:datadog).{0,40}\\b([a-zA-Z-0-9]{32})\\b")
  },
  {
    name: "Datadogtoken - 2",
    regex: new RegExp("(?:datadog).{0,40}\\b([a-zA-Z-0-9]{40})\\b")
  },
  {
    name: "Datafire",
    regex: new RegExp("(?:datafire).{0,40}\\b([a-z0-9\\S]{175,190})\\b")
  },
  {
    name: "Datagov",
    regex: new RegExp("(?:data.gov).{0,40}\\b([a-zA-Z0-9]{40})\\b")
  },
  {
    name: "Debounce",
    regex: new RegExp("(?:debounce).{0,40}\\b([a-zA-Z0-9]{13})\\b")
  },
  {
    name: "Deepai",
    regex: new RegExp("(?:deepai).{0,40}\\b([a-z0-9-]{36})\\b")
  },
  {
    name: "Deepgram",
    regex: new RegExp("(?:deepgram).{0,40}\\b([0-9a-z]{40})\\b")
  },
  {
    name: "Delighted",
    regex: new RegExp("(?:delighted).{0,40}\\b([a-z0-9A-Z]{32})\\b")
  },
  {
    name: "Deputy - 1",
    regex: new RegExp("\\b([0-9a-z]{1,}.as.deputy.com)\\b")
  },
  {
    name: "Deputy - 2",
    regex: new RegExp("(?:deputy).{0,40}\\b([0-9a-z]{32})\\b")
  },
  {
    name: "Detectlanguage",
    regex: new RegExp("(?:detectlanguage).{0,40}\\b([a-z0-9]{32})\\b")
  },
  { name: "Dfuse", regex: new RegExp("\\b(web\\_[0-9a-z]{32})\\b") },
  {
    name: "Diffbot",
    regex: new RegExp("(?:diffbot).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Digitaloceantoken",
    regex: new RegExp("(?:digitalocean).{0,40}\\b([A-Za-z0-9_-]{64})\\b")
  },
  {
    name: "Discord Webhook",
    regex: new RegExp("https://discordapp\\.com/api/webhooks/[0-9]+/[A-Za-z0-9\\-]+")
  },
  {
    name: "Discordbottoken - 1",
    regex: new RegExp("(?:discord).{0,40}\\b([A-Za-z0-9_-]{24}\\.[A-Za-z0-9_-]{6}\\.[A-Za-z0-9_-]{27})\\b")
  },
  {
    name: "Discordbottoken - 2",
    regex: new RegExp("(?:discord).{0,40}\\b([0-9]{17})\\b")
  },
  {
    name: "Discordwebhook",
    regex: new RegExp("(https:\\/\\/discord.com\\/api\\/webhooks\\/[0-9]{18}\\/[0-9a-zA-Z-]{68})")
  },
  {
    name: "Ditto",
    regex: new RegExp("(?:ditto).{0,40}\\b([a-z0-9]{8}\\-[a-z0-9]{4}\\-[a-z0-9]{4}\\-[a-z0-9]{4}\\-[a-z0-9]{12}\\.[a-z0-9]{40})\\b")
  },
  {
    name: "Dnscheck - 1",
    regex: new RegExp("(?:dnscheck).{0,40}\\b([a-z0-9A-Z-]{36})\\b")
  },
  {
    name: "Dnscheck - 2",
    regex: new RegExp("(?:dnscheck).{0,40}\\b([a-z0-9A-Z]{32})\\b")
  },
  {
    name: "Documo",
    regex: new RegExp("\\b(ey[a-zA-Z0-9]{34}.ey[a-zA-Z0-9]{154}.[a-zA-Z0-9_-]{43})\\b")
  },
  { name: "Doppler", regex: new RegExp("\\b(dp\\.pt\\.[a-zA-Z0-9]{43})\\b") },
  {
    name: "Dotmailer - 1",
    regex: new RegExp("(?:dotmailer).{0,40}\\b(apiuser-[a-z0-9]{12}@apiconnector.com)\\b")
  },
  {
    name: "Dotmailer - 2",
    regex: new RegExp("(?:dotmailer).{0,40}\\b([a-zA-Z0-9\\S]{8,24})\\b")
  },
  {
    name: "Dovico",
    regex: new RegExp("(?:dovico).{0,40}\\b([0-9a-z]{32}\\.[0-9a-z]{1,}\\b)")
  },
  {
    name: "Dronahq",
    regex: new RegExp("(?:dronahq).{0,40}\\b([a-z0-9]{50})\\b")
  },
  {
    name: "Droneci",
    regex: new RegExp("(?:droneci).{0,40}\\b([a-zA-Z0-9]{32})\\b")
  },
  {
    name: "Dropbox",
    regex: new RegExp("\\b(sl\\.[A-Za-z0-9\\-\\_]{130,140})\\b")
  },
  {
    name: "Dwolla",
    regex: new RegExp("(?:dwolla).{0,40}\\b([a-zA-Z-0-9]{50})\\b")
  },
  {
    name: "Dynalist",
    regex: new RegExp("(?:dynalist).{0,40}\\b([a-zA-Z0-9-_]{128})\\b")
  },
  {
    name: "Dynatrace token",
    regex: new RegExp("dt0[a-zA-Z]{1}[0-9]{2}\\.[A-Z0-9]{24}\\.[A-Z0-9]{64}")
  },
  {
    name: "Dyspatch",
    regex: new RegExp("(?:dyspatch).{0,40}\\b([A-Z0-9]{52})\\b")
  },
  { name: "EC", regex: new RegExp("-----BEGIN EC PRIVATE KEY-----") },
  {
    name: "Eagleeyenetworks - 1",
    regex: new RegExp("(?:eagleeyenetworks).{0,40}\\b([a-zA-Z0-9]{3,20}@[a-zA-Z0-9]{2,12}.[a-zA-Z0-9]{2,5})\\b")
  },
  {
    name: "Eagleeyenetworks - 2",
    regex: new RegExp("(?:eagleeyenetworks).{0,40}\\b([a-zA-Z0-9]{15})\\b")
  },
  {
    name: "Easyinsight - 1",
    regex: new RegExp("(?:easyinsight|easy-insight).{0,40}\\b([a-zA-Z0-9]{20})\\b")
  },
  {
    name: "Easyinsight - 2",
    regex: new RegExp("(?:easyinsight|easy-insight).{0,40}\\b([0-9Aa-zA-Z]{20})\\b")
  },
  {
    name: "Edamam - 1",
    regex: new RegExp("(?:edamam).{0,40}\\b([0-9a-z]{32})\\b")
  },
  {
    name: "Edamam - 2",
    regex: new RegExp("(?:edamam).{0,40}\\b([0-9a-z]{8})\\b")
  },
  {
    name: "Edenai",
    regex: new RegExp("(?:edenai).{0,40}\\b([a-zA-Z0-9]{36}.[a-zA-Z0-9]{92}.[a-zA-Z0-9_]{43})\\b")
  },
  {
    name: "Eightxeight - 1",
    regex: new RegExp("(?:8x8).{0,40}\\b([a-zA-Z0-9_]{18,30})\\b")
  },
  {
    name: "Eightxeight - 2",
    regex: new RegExp("(?:8x8).{0,40}\\b([a-zA-Z0-9]{43})\\b")
  },
  {
    name: "Elasticemail",
    regex: new RegExp("(?:elastic).{0,40}\\b([A-Za-z0-9_-]{96})\\b")
  },
  {
    name: "Enablex - 1",
    regex: new RegExp("(?:enablex).{0,40}\\b([a-zA-Z0-9]{36})\\b")
  },
  {
    name: "Enablex - 2",
    regex: new RegExp("(?:enablex).{0,40}\\b([a-z0-9]{24})\\b")
  },
  {
    name: "Enigma",
    regex: new RegExp("(?:enigma).{0,40}\\b([a-zA-Z0-9]{40})\\b")
  },
  {
    name: "Ethplorer",
    regex: new RegExp("(?:ethplorer).{0,40}\\b([a-z0-9A-Z-]{22})\\b")
  },
  {
    name: "Etsyapikey",
    regex: new RegExp("(?:etsy).{0,40}\\b([a-zA-Z-0-9]{24})\\b")
  },
  {
    name: "Everhour",
    regex: new RegExp("(?:everhour).{0,40}\\b([0-9Aa-f]{4}-[0-9a-f]{4}-[0-9a-f]{6}-[0-9a-f]{6}-[0-9a-f]{8})\\b")
  },
  {
    name: "Exchangerateapi",
    regex: new RegExp("(?:exchangerate).{0,40}\\b([a-z0-9]{24})\\b")
  },
  {
    name: "Exchangeratesapi",
    regex: new RegExp("(?:exchangerates).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "FCM Server Key",
    regex: new RegExp("AAAA[a-zA-Z0-9_-]{7}:[a-zA-Z0-9_-]{140}")
  },
  {
    name: "FCM_server_key",
    regex: new RegExp("(AAAA[a-zA-Z0-9_-]{7}:[a-zA-Z0-9_-]{140})")
  },
  {
    name: "Facebook Access Token",
    regex: new RegExp("EAACEdEose0cBA[0-9A-Za-z]+")
  },
  {
    name: "Facebook OAuth",
    regex: new RegExp(`[fF][aA][cC][eE][bB][oO][oO][kK].*['|"][0-9a-f]{32}['|"]`)
  },
  {
    name: "Facebookoauth",
    regex: new RegExp("(?:facebook).{0,40}\\b([A-Za-z0-9]{32})\\b")
  },
  {
    name: "Faceplusplus",
    regex: new RegExp("(?:faceplusplus).{0,40}\\b([0-9a-zA-Z_-]{32})\\b")
  },
  {
    name: "Fakejson",
    regex: new RegExp("(?:fakejson).{0,40}\\b([a-zA-Z0-9]{22})\\b")
  },
  {
    name: "Fastforex",
    regex: new RegExp("(?:fastforex).{0,40}\\b([a-z0-9-]{28})\\b")
  },
  {
    name: "Fastlypersonaltoken",
    regex: new RegExp("(?:fastly).{0,40}\\b([A-Za-z0-9_-]{32})\\b")
  },
  {
    name: "Feedier",
    regex: new RegExp("(?:feedier).{0,40}\\b([a-z0-9A-Z]{32})\\b")
  },
  {
    name: "Fetchrss",
    regex: new RegExp("(?:fetchrss).{0,40}\\b([0-9A-Za-z.]{40})\\b")
  },
  {
    name: "Figmapersonalaccesstoken",
    regex: new RegExp("(?:figma).{0,40}\\b([0-9]{6}-[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12})\\b")
  },
  {
    name: "Fileio",
    regex: new RegExp("(?:fileio).{0,40}\\b([A-Z0-9.-]{39})\\b")
  },
  { name: "Finage", regex: new RegExp("\\b(API_KEY[0-9A-Z]{32})\\b") },
  {
    name: "Financialmodelingprep",
    regex: new RegExp("(?:financialmodelingprep).{0,40}\\b([a-zA-Z0-9]{32})\\b")
  },
  {
    name: "Findl",
    regex: new RegExp("(?:findl).{0,40}\\b([a-z0-9]{8}\\-[a-z0-9]{4}\\-[a-z0-9]{4}\\-[a-z0-9]{4}\\-[a-z0-9]{12})\\b")
  },
  {
    name: "Finnhub",
    regex: new RegExp("(?:finnhub).{0,40}\\b([0-9a-z]{20})\\b")
  },
  {
    name: "Firebase Database Detect - 1",
    regex: new RegExp("[a-z0-9.-]+\\.firebaseio\\.com")
  },
  {
    name: "Firebase Database Detect - 2",
    regex: new RegExp("[a-z0-9.-]+\\.firebaseapp\\.com")
  },
  {
    name: "Fixerio",
    regex: new RegExp("(?:fixer).{0,40}\\b([A-Za-z0-9]{32})\\b")
  },
  { name: "Flatio", regex: new RegExp("(?:flat).{0,40}\\b([0-9a-z]{128})\\b") },
  { name: "Fleetbase", regex: new RegExp("\\b(flb_live_[0-9a-zA-Z]{20})\\b") },
  {
    name: "Flickr",
    regex: new RegExp("(?:flickr).{0,40}\\b([0-9a-z]{32})\\b")
  },
  {
    name: "Flightapi",
    regex: new RegExp("(?:flightapi).{0,40}\\b([a-z0-9]{24})\\b")
  },
  {
    name: "Flightstats - 1",
    regex: new RegExp("(?:flightstats).{0,40}\\b([0-9a-z]{32})\\b")
  },
  {
    name: "Flightstats - 2",
    regex: new RegExp("(?:flightstats).{0,40}\\b([0-9a-z]{8})\\b")
  },
  {
    name: "Float",
    regex: new RegExp("(?:float).{0,40}\\b([a-zA-Z0-9-._+=]{59,60})\\b")
  },
  {
    name: "Flowflu - 2",
    regex: new RegExp("(?:flowflu).{0,40}\\b([a-zA-Z0-9]{51})\\b")
  },
  { name: "Flutterwave", regex: new RegExp("\\b(FLWSECK-[0-9a-z]{32}-X)\\b") },
  {
    name: "Fmfw - 1",
    regex: new RegExp("(?:fmfw).{0,40}\\b([a-zA-Z0-9-]{32})\\b")
  },
  {
    name: "Fmfw - 2",
    regex: new RegExp("(?:fmfw).{0,40}\\b([a-zA-Z0-9_-]{32})\\b")
  },
  {
    name: "Formbucket",
    regex: new RegExp("(?:formbucket).{0,40}\\b([0-9A-Za-z]{1,}.[0-9A-Za-z]{1,}\\.[0-9A-Z-a-z\\-_]{1,})")
  },
  {
    name: "Formio",
    regex: new RegExp("(?:formio).{0,40}\\b(eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\\.[0-9A-Za-z]{310}\\.[0-9A-Z-a-z\\-_]{43}[ \\r\\n]{1})")
  },
  {
    name: "Foursquare",
    regex: new RegExp("(?:foursquare).{0,40}\\b([0-9A-Z]{48})\\b")
  },
  { name: "Frameio", regex: new RegExp("\\b(fio-u-[0-9a-zA-Z_-]{64})\\b") },
  {
    name: "Freshbooks - 1",
    regex: new RegExp("(?:freshbooks).{0,40}\\b([0-9a-z]{64})\\b")
  },
  {
    name: "Freshbooks - 2",
    regex: new RegExp("(?:freshbooks).{0,40}\\b(https://www.[0-9A-Za-z_-]{1,}.com)\\b")
  },
  {
    name: "Freshdesk - 1",
    regex: new RegExp("(?:freshdesk).{0,40}\\b([0-9A-Za-z]{20})\\b")
  },
  {
    name: "Freshdesk - 2",
    regex: new RegExp("\\b([0-9a-z-]{1,}.freshdesk.com)\\b")
  },
  {
    name: "Front",
    regex: new RegExp("(?:front).{0,40}\\b([0-9a-zA-Z]{36}.[0-9a-zA-Z\\.\\-\\_]{188,244})\\b")
  },
  {
    name: "Fulcrum",
    regex: new RegExp("(?:fulcrum).{0,40}\\b([a-z0-9]{80})\\b")
  },
  {
    name: "Fullstory",
    regex: new RegExp("(?:fullstory).{0,40}\\b([a-zA-Z-0-9/+]{88})\\b")
  },
  {
    name: "Fusebill",
    regex: new RegExp("(?:fusebill).{0,40}\\b([a-zA-Z0-9]{88})\\b")
  },
  {
    name: "Fxmarket",
    regex: new RegExp("(?:fxmarket).{0,40}\\b([0-9Aa-zA-Z-_=]{20})\\b")
  },
  {
    name: "Gcp",
    regex: new RegExp("\\{[^{]+auth_provider_x509_cert_url[^}]+\\}")
  },
  {
    name: "Geckoboard",
    regex: new RegExp("(?:geckoboard).{0,40}\\b([a-zA-Z0-9]{44})\\b")
  },
  { name: "Generic - 1376", regex: new RegExp("jdbc:mysql(=| =|:| :)") },
  {
    name: "Generic - 1688",
    regex: new RegExp("TOKEN[\\\\-|_|A-Z0-9]*(\\'|\\\")?(:|=)(\\'|\\\")?[\\\\-|_|A-Z0-9]{10}")
  },
  {
    name: "Generic - 1689",
    regex: new RegExp("API[\\\\-|_|A-Z0-9]*(\\'|\\\")?(:|=)(\\'|\\\")?[\\\\-|_|A-Z0-9]{10}")
  },
  {
    name: "Generic - 1691",
    regex: new RegExp("SECRET[\\\\-|_|A-Z0-9]*(\\'|\\\")?(:|=)(\\'|\\\")?[\\\\-|_|A-Z0-9]{10}")
  },
  {
    name: "Generic - 1692",
    regex: new RegExp("AUTHORIZATION[\\\\-|_|A-Z0-9]*(\\'|\\\")?(:|=)(\\'|\\\")?[\\\\-|_|A-Z0-9]{10}")
  },
  {
    name: "Generic - 1693",
    regex: new RegExp("PASSWORD[\\\\-|_|A-Z0-9]*(\\'|\\\")?(:|=)(\\'|\\\")?[\\\\-|_|A-Z0-9]{10}")
  },
  {
    name: "Generic - 1695",
    regex: new RegExp(`(A|a)(P|p)(Ii)[\\-|_|A-Za-z0-9]*(\\''|")?( )*(:|=)( )*(\\''|")?[0-9A-Za-z\\-_]+(\\''|")?`)
  },
  { name: "Generic - 1700", regex: new RegExp("BEGIN OPENSSH PRIVATE KEY") },
  { name: "Generic - 1701", regex: new RegExp("BEGIN PRIVATE KEY") },
  { name: "Generic - 1702", regex: new RegExp("BEGIN RSA PRIVATE KEY") },
  { name: "Generic - 1703", regex: new RegExp("BEGIN DSA PRIVATE KEY") },
  { name: "Generic - 1704", regex: new RegExp("BEGIN EC PRIVATE KEY") },
  { name: "Generic - 1705", regex: new RegExp("BEGIN PGP PRIVATE KEY BLOCK") },
  {
    name: "Generic - 1707",
    regex: new RegExp("[a-z0-9.-]+\\.s3-[a-z0-9-]\\.amazonaws\\.com")
  },
  {
    name: "Generic - 1708",
    regex: new RegExp("[a-z0-9.-]+\\.s3-website[.-](eu|ap|us|ca|sa|cn)")
  },
  { name: "Generic - 1710", regex: new RegExp("algolia_api_key") },
  { name: "Generic - 1711", regex: new RegExp("asana_access_token") },
  { name: "Generic - 1713", regex: new RegExp("azure_tenant") },
  { name: "Generic - 1714", regex: new RegExp("bitly_access_token") },
  { name: "Generic - 1715", regex: new RegExp("branchio_secret") },
  { name: "Generic - 1716", regex: new RegExp("browserstack_access_key") },
  { name: "Generic - 1717", regex: new RegExp("buildkite_access_token") },
  { name: "Generic - 1718", regex: new RegExp("comcast_access_token") },
  { name: "Generic - 1719", regex: new RegExp("datadog_api_key") },
  { name: "Generic - 1720", regex: new RegExp("deviantart_secret") },
  { name: "Generic - 1721", regex: new RegExp("deviantart_access_token") },
  { name: "Generic - 1722", regex: new RegExp("dropbox_api_token") },
  { name: "Generic - 1723", regex: new RegExp("facebook_appsecret") },
  { name: "Generic - 1724", regex: new RegExp("facebook_access_token") },
  { name: "Generic - 1725", regex: new RegExp("firebase_custom_token") },
  { name: "Generic - 1726", regex: new RegExp("firebase_id_token") },
  { name: "Generic - 1727", regex: new RegExp("github_client") },
  { name: "Generic - 1728", regex: new RegExp("github_ssh_key") },
  { name: "Generic - 1730", regex: new RegExp("gitlab_private_token") },
  { name: "Generic - 1731", regex: new RegExp("google_cm") },
  { name: "Generic - 1732", regex: new RegExp("google_maps_key") },
  { name: "Generic - 1733", regex: new RegExp("heroku_api_key") },
  { name: "Generic - 1734", regex: new RegExp("instagram_access_token") },
  { name: "Generic - 1735", regex: new RegExp("mailchimp_api_key") },
  { name: "Generic - 1736", regex: new RegExp("mailgun_api_key") },
  { name: "Generic - 1737", regex: new RegExp("mailjet") },
  { name: "Generic - 1738", regex: new RegExp("mapbox_access_token") },
  { name: "Generic - 1739", regex: new RegExp("pagerduty_api_token") },
  { name: "Generic - 1740", regex: new RegExp("paypal_key_sb") },
  { name: "Generic - 1741", regex: new RegExp("paypal_key_live") },
  { name: "Generic - 1742", regex: new RegExp("paypal_token_sb") },
  { name: "Generic - 1743", regex: new RegExp("paypal_token_live") },
  { name: "Generic - 1744", regex: new RegExp("pendo_integration_key") },
  { name: "Generic - 1745", regex: new RegExp("salesforce_access_token") },
  { name: "Generic - 1746", regex: new RegExp("saucelabs_ukey") },
  { name: "Generic - 1747", regex: new RegExp("sendgrid_api_key") },
  { name: "Generic - 1748", regex: new RegExp("slack_api_token") },
  { name: "Generic - 1749", regex: new RegExp("slack_webhook") },
  { name: "Generic - 1750", regex: new RegExp("square_secret") },
  { name: "Generic - 1751", regex: new RegExp("square_auth_token") },
  { name: "Generic - 1752", regex: new RegExp("travisci_api_token") },
  { name: "Generic - 1753", regex: new RegExp("twilio_sid_token") },
  { name: "Generic - 1754", regex: new RegExp("twitter_api_secret") },
  { name: "Generic - 1755", regex: new RegExp("twitter_bearer_token") },
  { name: "Generic - 1756", regex: new RegExp("spotify_access_token") },
  { name: "Generic - 1757", regex: new RegExp("stripe_key_live") },
  { name: "Generic - 1758", regex: new RegExp("wakatime_api_key") },
  { name: "Generic - 1759", regex: new RegExp("wompi_auth_bearer_sb") },
  { name: "Generic - 1760", regex: new RegExp("wompi_auth_bearer_live") },
  { name: "Generic - 1761", regex: new RegExp("wpengine_api_key") },
  { name: "Generic - 1762", regex: new RegExp("zapier_webhook") },
  { name: "Generic - 1763", regex: new RegExp("zendesk_access_token") },
  { name: "Generic - 1764", regex: new RegExp("ssh-rsa") },
  {
    name: "Generic - 1765",
    regex: new RegExp("s3-[a-z0-9-]+\\.amazonaws\\.com/[a-z0-9._-]+")
  },
  {
    name: "Generic Secret",
    regex: new RegExp(`[sS][eE][cC][rR][eE][tT].*['|"][0-9a-zA-Z]{32,45}['|"]`)
  },
  {
    name: "Generic webhook secret",
    regex: new RegExp("(webhook).+(secret|token|key).+")
  },
  {
    name: "Gengo",
    regex: new RegExp("(?:gengo).{0,40}([ ]{0,1}[0-9a-zA-Z\\[\\]\\-\\(\\)\\{\\}|_^@$=~]{64}[ \\r\\n]{1})")
  },
  {
    name: "Geoapify",
    regex: new RegExp("(?:geoapify).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Geocode",
    regex: new RegExp("(?:geocode).{0,40}\\b([a-z0-9]{28})\\b")
  },
  {
    name: "Geocodify",
    regex: new RegExp("(?:geocodify).{0,40}\\b([0-9a-z]{40})\\b")
  },
  {
    name: "Geocodio - 2",
    regex: new RegExp("(?:geocod).{0,40}\\b([a-z0-9]{39})\\b")
  },
  {
    name: "Geoipifi",
    regex: new RegExp("(?:ipifi).{0,40}\\b([a-z0-9A-Z_]{32})\\b")
  },
  {
    name: "Getemail",
    regex: new RegExp("(?:getemail).{0,40}\\b([a-zA-Z0-9-]{20})\\b")
  },
  {
    name: "Getemails - 1",
    regex: new RegExp("(?:getemails).{0,40}\\b([a-z0-9-]{26})\\b")
  },
  {
    name: "Getemails - 2",
    regex: new RegExp("(?:getemails).{0,40}\\b([a-z0-9-]{18})\\b")
  },
  {
    name: "Getgeoapi",
    regex: new RegExp("(?:getgeoapi).{0,40}\\b([0-9a-z]{40})\\b")
  },
  {
    name: "Getgist",
    regex: new RegExp("(?:getgist).{0,40}\\b([a-z0-9A-Z+=]{68})")
  },
  {
    name: "Getsandbox - 1",
    regex: new RegExp("(?:getsandbox).{0,40}\\b([a-z0-9-]{40})\\b")
  },
  {
    name: "Getsandbox - 2",
    regex: new RegExp("(?:getsandbox).{0,40}\\b([a-z0-9-]{15,30})\\b")
  },
  {
    name: "GitHub",
    regex: new RegExp(`[gG][iI][tT][hH][uU][bB].*['|"][0-9a-zA-Z]{35,40}['|"]`)
  },
  {
    name: "Github - 2",
    regex: new RegExp("\\b((?:ghp|gho|ghu|ghs|ghr)_[a-zA-Z0-9]{36,255}\\b)")
  },
  { name: "Github App Token", regex: new RegExp("(ghu|ghs)_[0-9a-zA-Z]{36}") },
  {
    name: "Github OAuth Access Token",
    regex: new RegExp("gho_[0-9a-zA-Z]{36}")
  },
  {
    name: "Github Personal Access Token",
    regex: new RegExp("ghp_[0-9a-zA-Z]{36}")
  },
  { name: "Github Refresh Token", regex: new RegExp("ghr_[0-9a-zA-Z]{76}") },
  {
    name: "Github_old",
    regex: new RegExp(`(?:github)[^\\.].{0,40}[ =:'"]+([a-f0-9]{40})\\b`)
  },
  {
    name: "Githubapp - 1",
    regex: new RegExp("(?:github).{0,40}\\b([0-9]{6})\\b")
  },
  {
    name: "Githubapp - 2",
    regex: new RegExp("(?:github).{0,40}(-----BEGIN RSA PRIVATE KEY-----\\s[A-Za-z0-9+\\/\\s]*\\s-----END RSA PRIVATE KEY-----)")
  },
  {
    name: "Gitlab",
    regex: new RegExp("(?:gitlab).{0,40}\\b([a-zA-Z0-9\\-=_]{20,22})\\b")
  },
  {
    name: "Gitlabv2",
    regex: new RegExp("\\b(glpat-[a-zA-Z0-9\\-=_]{20,22})\\b")
  },
  {
    name: "Gitter",
    regex: new RegExp("(?:gitter).{0,40}\\b([a-z0-9-]{40})\\b")
  },
  {
    name: "Glassnode",
    regex: new RegExp("(?:glassnode).{0,40}\\b([0-9A-Za-z]{27})\\b")
  },
  {
    name: "Gocanvas - 1",
    regex: new RegExp("(?:gocanvas).{0,40}\\b([0-9A-Za-z/+]{43}=[ \\r\\n]{1})")
  },
  {
    name: "Gocanvas - 2",
    regex: new RegExp("(?:gocanvas).{0,40}\\b([\\w\\.-]+@[\\w-]+\\.[\\w\\.-]{2,5})\\b")
  },
  {
    name: "Gocardless",
    regex: new RegExp(`\\b(live_[0-9A-Za-z\\_\\-]{40}[ "'\\r\\n]{1})`)
  },
  {
    name: "Goodday",
    regex: new RegExp("(?:goodday).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Google (GCP) Service Account",
    regex: new RegExp('"type": "service_account"')
  },
  { name: "Google API Key", regex: new RegExp("AIza[0-9a-z-_]{35}") },
  {
    name: "Google Calendar URI",
    regex: new RegExp("https://www\\.google\\.com/calendar/embed\\?src=[A-Za-z0-9%@&;=\\-_\\./]+")
  },
  {
    name: "Google OAuth Access Token",
    regex: new RegExp("ya29\\.[0-9A-Za-z\\-_]+")
  },
  {
    name: "Graphcms - 1",
    regex: new RegExp("(?:graph).{0,40}\\b([a-z0-9]{25})\\b")
  },
  {
    name: "Graphcms - 2",
    regex: new RegExp("\\b(ey[a-zA-Z0-9]{73}.ey[a-zA-Z0-9]{365}.[a-zA-Z0-9_-]{683})\\b")
  },
  {
    name: "Graphhopper",
    regex: new RegExp("(?:graphhopper).{0,40}\\b([a-z0-9-]{36})\\b")
  },
  {
    name: "Groovehq",
    regex: new RegExp("(?:groove).{0,40}\\b([a-z0-9A-Z]{64})")
  },
  {
    name: "Guru - 1",
    regex: new RegExp("(?:guru).{0,40}\\b([a-zA-Z0-9]{3,20}@[a-zA-Z0-9]{2,12}.[a-zA-Z0-9]{2,5})\\b")
  },
  {
    name: "Guru - 2",
    regex: new RegExp("(?:guru).{0,40}\\b([a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12})\\b")
  },
  {
    name: "Gyazo",
    regex: new RegExp("(?:gyazo).{0,40}\\b([0-9A-Za-z-]{43})\\b")
  },
  { name: "Happi", regex: new RegExp("(?:happi).{0,40}\\b([a-zA-Z0-9]{56})") },
  {
    name: "Happyscribe",
    regex: new RegExp("(?:happyscribe).{0,40}\\b([0-9a-zA-Z]{24})\\b")
  },
  {
    name: "Harvest - 1",
    regex: new RegExp("(?:harvest).{0,40}\\b([a-z0-9A-Z._]{97})\\b")
  },
  {
    name: "Harvest - 2",
    regex: new RegExp("(?:harvest).{0,40}\\b([0-9]{4,9})\\b")
  },
  {
    name: "Hellosign",
    regex: new RegExp("(?:hellosign).{0,40}\\b([a-zA-Z-0-9/+]{64})\\b")
  },
  {
    name: "Helpcrunch",
    regex: new RegExp("(?:helpcrunch).{0,40}\\b([a-zA-Z-0-9+/=]{328})")
  },
  {
    name: "Helpscout",
    regex: new RegExp("(?:helpscout).{0,40}\\b([A-Za-z0-9]{56})\\b")
  },
  {
    name: "Hereapi",
    regex: new RegExp("(?:hereapi).{0,40}\\b([a-zA-Z0-9\\S]{43})\\b")
  },
  {
    name: "Heroku",
    regex: new RegExp("(?:heroku).{0,40}\\b([0-9Aa-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\\b")
  },
  {
    name: "Hive - 1",
    regex: new RegExp("(?:hive).{0,40}\\b([0-9a-z]{32})\\b")
  },
  {
    name: "Hive - 2",
    regex: new RegExp("(?:hive).{0,40}\\b([0-9A-Za-z]{17})\\b")
  },
  {
    name: "Hiveage",
    regex: new RegExp("(?:hiveage).{0,40}\\b([0-9A-Za-z\\_\\-]{20})\\b")
  },
  {
    name: "Holidayapi",
    regex: new RegExp("(?:holidayapi).{0,40}\\b([a-z0-9-]{36})\\b")
  },
  { name: "Host", regex: new RegExp("(?:host).{0,40}\\b([a-z0-9]{14})\\b") },
  {
    name: "Html2pdf",
    regex: new RegExp("(?:html2pdf).{0,40}\\b([a-zA-Z0-9]{64})\\b")
  },
  {
    name: "Hubspotapikey",
    regex: new RegExp("(?:hubspot).{0,40}\\b([A-Za-z0-9]{8}\\-[A-Za-z0-9]{4}\\-[A-Za-z0-9]{4}\\-[A-Za-z0-9]{4}\\-[A-Za-z0-9]{12})\\b")
  },
  {
    name: "Humanity",
    regex: new RegExp("(?:humanity).{0,40}\\b([0-9a-z]{40})\\b")
  },
  {
    name: "Hunter",
    regex: new RegExp("(?:hunter).{0,40}\\b([a-z0-9_-]{40})\\b")
  },
  {
    name: "Hypertrack - 1",
    regex: new RegExp("(?:hypertrack).{0,40}\\b([0-9a-zA-Z\\_\\-]{54})\\b")
  },
  {
    name: "Hypertrack - 2",
    regex: new RegExp("(?:hypertrack).{0,40}\\b([0-9a-zA-Z\\_\\-]{27})\\b")
  },
  {
    name: "Ibmclouduserkey",
    regex: new RegExp("(?:ibm).{0,40}\\b([A-Za-z0-9_-]{44})\\b")
  },
  {
    name: "Iconfinder",
    regex: new RegExp("(?:iconfinder).{0,40}\\b([a-zA-Z0-9]{64})\\b")
  },
  {
    name: "Iexcloud",
    regex: new RegExp("(?:iexcloud).{0,40}\\b([a-z0-9_]{35})\\b")
  },
  {
    name: "Imagekit",
    regex: new RegExp("(?:imagekit).{0,40}\\b([a-zA-Z0-9_=]{36})")
  },
  {
    name: "Imagga",
    regex: new RegExp("(?:imagga).{0,40}\\b([a-z0-9A-Z=]{72})")
  },
  {
    name: "Impala",
    regex: new RegExp("(?:impala).{0,40}\\b([0-9A-Za-z_]{46})\\b")
  },
  {
    name: "Insightly",
    regex: new RegExp("(?:insightly).{0,40}\\b([a-z0-9-]{36})\\b")
  },
  {
    name: "Integromat",
    regex: new RegExp("(?:integromat).{0,40}\\b([a-z0-9-]{36})\\b")
  },
  {
    name: "Intercom",
    regex: new RegExp("(?:intercom).{0,40}\\b([a-zA-Z0-9\\W\\S]{59}\\=)")
  },
  {
    name: "Intrinio",
    regex: new RegExp("(?:intrinio).{0,40}\\b([a-zA-Z0-9]{44})\\b")
  },
  {
    name: "Invoiceocean - 1",
    regex: new RegExp("(?:invoiceocean).{0,40}\\b([0-9A-Za-z]{20})\\b")
  },
  {
    name: "Invoiceocean - 2",
    regex: new RegExp("\\b([0-9a-z]{1,}.invoiceocean.com)\\b")
  },
  { name: "Ipapi", regex: new RegExp("(?:ipapi).{0,40}\\b([a-z0-9]{32})\\b") },
  {
    name: "Ipgeolocation",
    regex: new RegExp("(?:ipgeolocation).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Ipify",
    regex: new RegExp("(?:ipify).{0,40}\\b([a-zA-Z0-9_-]{32})\\b")
  },
  {
    name: "Ipinfodb",
    regex: new RegExp("(?:ipinfodb).{0,40}\\b([a-z0-9]{64})\\b")
  },
  {
    name: "Ipquality",
    regex: new RegExp("(?:ipquality).{0,40}\\b([0-9a-z]{32})\\b")
  },
  {
    name: "Ipstack",
    regex: new RegExp("(?:ipstack).{0,40}\\b([a-fA-f0-9]{32})\\b")
  },
  {
    name: "JDBC Connection String",
    regex: new RegExp("jdbc:[a-z:]+://[A-Za-z0-9\\.\\-_:;=/@?,&]+")
  },
  {
    name: "Jiratoken - 1",
    regex: new RegExp("(?:jira).{0,40}\\b([a-zA-Z-0-9]{24})\\b")
  },
  {
    name: "Jiratoken - 2",
    regex: new RegExp("(?:jira).{0,40}\\b([a-zA-Z-0-9]{5,24}\\@[a-zA-Z-0-9]{3,16}\\.com)\\b")
  },
  {
    name: "Jiratoken - 3",
    regex: new RegExp("(?:jira).{0,40}\\b([a-zA-Z-0-9]{5,24}\\.[a-zA-Z-0-9]{3,16}\\.[a-zA-Z-0-9]{3,16})\\b")
  },
  {
    name: "Jotform",
    regex: new RegExp("(?:jotform).{0,40}\\b([0-9Aa-z]{32})\\b")
  },
  {
    name: "Jumpcloud",
    regex: new RegExp("(?:jumpcloud).{0,40}\\b([a-zA-Z0-9]{40})\\b")
  },
  { name: "Juro", regex: new RegExp("(?:juro).{0,40}\\b([a-zA-Z0-9]{40})\\b") },
  {
    name: "Kanban - 1",
    regex: new RegExp("(?:kanban).{0,40}\\b([0-9A-Z]{12})\\b")
  },
  {
    name: "Kanban - 2",
    regex: new RegExp("\\b([0-9a-z]{1,}.kanbantool.com)\\b")
  },
  {
    name: "Karmacrm",
    regex: new RegExp("(?:karma).{0,40}\\b([a-zA-Z0-9]{20})\\b")
  },
  {
    name: "Keenio - 1",
    regex: new RegExp("(?:keen).{0,40}\\b([0-9a-z]{24})\\b")
  },
  {
    name: "Keenio - 2",
    regex: new RegExp("(?:keen).{0,40}\\b([0-9A-Z]{64})\\b")
  },
  {
    name: "Kickbox",
    regex: new RegExp("(?:kickbox).{0,40}\\b([a-zA-Z0-9_]+[a-zA-Z0-9]{64})\\b")
  },
  {
    name: "Klipfolio",
    regex: new RegExp("(?:klipfolio).{0,40}\\b([0-9a-f]{40})\\b")
  },
  {
    name: "Kontent",
    regex: new RegExp("(?:kontent).{0,40}\\b([a-z0-9-]{36})\\b")
  },
  {
    name: "Kraken - 1",
    regex: new RegExp(`(?:kraken).{0,40}\\b([0-9A-Za-z\\/\\+=]{56}[ "'\\r\\n]{1})`)
  },
  {
    name: "Kraken - 2",
    regex: new RegExp(`(?:kraken).{0,40}\\b([0-9A-Za-z\\/\\+=]{86,88}[ "'\\r\\n]{1})`)
  },
  {
    name: "Kucoin - 1",
    regex: new RegExp("(?:kucoin).{0,40}([ \\r\\n]{1}[!-~]{7,32}[ \\r\\n]{1})")
  },
  {
    name: "Kucoin - 2",
    regex: new RegExp("(?:kucoin).{0,40}\\b([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\\b")
  },
  {
    name: "Kucoin - 3",
    regex: new RegExp("(?:kucoin).{0,40}\\b([0-9a-f]{24})\\b")
  },
  { name: "Kylas", regex: new RegExp("(?:kylas).{0,40}\\b([a-z0-9-]{36})\\b") },
  {
    name: "Languagelayer",
    regex: new RegExp("(?:languagelayer).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Lastfm",
    regex: new RegExp("(?:lastfm).{0,40}\\b([0-9a-z]{32})\\b")
  },
  {
    name: "Launchdarkly",
    regex: new RegExp("(?:launchdarkly).{0,40}\\b([a-z0-9-]{40})\\b")
  },
  {
    name: "Leadfeeder",
    regex: new RegExp("(?:leadfeeder).{0,40}\\b([a-zA-Z0-9-]{43})\\b")
  },
  {
    name: "Lendflow",
    regex: new RegExp("(?:lendflow).{0,40}\\b([a-zA-Z0-9]{36}\\.[a-zA-Z0-9]{235}\\.[a-zA-Z0-9]{32}\\-[a-zA-Z0-9]{47}\\-[a-zA-Z0-9_]{162}\\-[a-zA-Z0-9]{42}\\-[a-zA-Z0-9_]{40}\\-[a-zA-Z0-9_]{66}\\-[a-zA-Z0-9_]{59}\\-[a-zA-Z0-9]{7}\\-[a-zA-Z0-9_]{220})\\b")
  },
  {
    name: "Lessannoyingcrm",
    regex: new RegExp("(?:less).{0,40}\\b([a-zA-Z0-9-]{57})\\b")
  },
  {
    name: "Lexigram",
    regex: new RegExp("(?:lexigram).{0,40}\\b([a-zA-Z0-9\\S]{301})\\b")
  },
  { name: "Linearapi", regex: new RegExp("\\b(lin_api_[0-9A-Za-z]{40})\\b") },
  {
    name: "Linemessaging",
    regex: new RegExp("(?:line).{0,40}\\b([A-Za-z0-9+/]{171,172})\\b")
  },
  {
    name: "Linenotify",
    regex: new RegExp("(?:linenotify).{0,40}\\b([0-9A-Za-z]{43})\\b")
  },
  {
    name: "Linkpreview",
    regex: new RegExp("(?:linkpreview).{0,40}\\b([a-zA-Z0-9]{32})\\b")
  },
  {
    name: "Liveagent",
    regex: new RegExp("(?:liveagent).{0,40}\\b([a-zA-Z0-9]{32})\\b")
  },
  {
    name: "Livestorm",
    regex: new RegExp("(?:livestorm).{0,40}\\b(eyJhbGciOiJIUzI1NiJ9\\.eyJhdWQiOiJhcGkubGl2ZXN0b3JtLmNvIiwianRpIjoi[0-9A-Z-a-z]{134}\\.[0-9A-Za-z\\-\\_]{43}[ \\r\\n]{1})")
  },
  { name: "Locationiq", regex: new RegExp("\\b(pk\\.[a-zA-Z-0-9]{32})\\b") },
  {
    name: "Loginradius",
    regex: new RegExp("(?:loginradius).{0,40}\\b([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\\b")
  },
  {
    name: "Lokalisetoken",
    regex: new RegExp("(?:lokalise).{0,40}\\b([a-z0-9]{40})\\b")
  },
  {
    name: "Loyverse",
    regex: new RegExp("(?:loyverse).{0,40}\\b([0-9-a-z]{32})\\b")
  },
  {
    name: "Luno - 1",
    regex: new RegExp("(?:luno).{0,40}\\b([a-z0-9]{13})\\b")
  },
  {
    name: "Luno - 2",
    regex: new RegExp("(?:luno).{0,40}\\b([a-zA-Z0-9_-]{43})\\b")
  },
  { name: "M3o", regex: new RegExp("(?:m3o).{0,40}\\b([0-9A-Za-z]{48})\\b") },
  {
    name: "Macaddress",
    regex: new RegExp("(?:macaddress).{0,40}\\b([a-zA-Z0-9_]{32})\\b")
  },
  {
    name: "Madkudu",
    regex: new RegExp("(?:madkudu).{0,40}\\b([0-9a-f]{32})\\b")
  },
  {
    name: "Magnetic",
    regex: new RegExp("(?:magnetic).{0,40}\\b([0-9Aa-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12})\\b")
  },
  { name: "MailChimp API Key", regex: new RegExp("[0-9a-f]{32}-us[0-9]{1,2}") },
  {
    name: "Mailboxlayer",
    regex: new RegExp("(?:mailboxlayer).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Mailerlite",
    regex: new RegExp("(?:mailerlite).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Mailgun - 2",
    regex: new RegExp("(?:mailgun).{0,40}\\b([a-zA-Z-0-9]{72})\\b")
  },
  { name: "Mailgun API Key - 1", regex: new RegExp("key-[0-9a-zA-Z]{32}") },
  {
    name: "Mailgun API key - 2",
    regex: new RegExp("(mailgun|mg)[0-9a-z]{32}")
  },
  {
    name: "Mailjetbasicauth",
    regex: new RegExp("(?:mailjet).{0,40}\\b([A-Za-z0-9]{87}\\=)")
  },
  {
    name: "Mailjetsms",
    regex: new RegExp("(?:mailjet).{0,40}\\b([A-Za-z0-9]{32})\\b")
  },
  {
    name: "Mailmodo",
    regex: new RegExp("(?:mailmodo).{0,40}\\b([A-Z0-9]{7}-[A-Z0-9]{7}-[A-Z0-9]{7}-[A-Z0-9]{7})\\b")
  },
  {
    name: "Mailsac",
    regex: new RegExp("(?:mailsac).{0,40}\\b(k_[0-9A-Za-z]{36,})\\b")
  },
  {
    name: "Mandrill",
    regex: new RegExp("(?:mandrill).{0,40}\\b([A-Za-z0-9_-]{22})\\b")
  },
  {
    name: "Manifest",
    regex: new RegExp("(?:manifest).{0,40}\\b([a-zA-z0-9]{32})\\b")
  },
  {
    name: "Mapbox - 2",
    regex: new RegExp("\\b(sk\\.[a-zA-Z-0-9\\.]{80,240})\\b")
  },
  {
    name: "Mapquest",
    regex: new RegExp("(?:mapquest).{0,40}\\b([0-9A-Za-z]{32})\\b")
  },
  {
    name: "Marketstack",
    regex: new RegExp("(?:marketstack).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Mattermostpersonaltoken - 1",
    regex: new RegExp("(?:mattermost).{0,40}\\b([A-Za-z0-9-_]{1,}.cloud.mattermost.com)\\b")
  },
  {
    name: "Mattermostpersonaltoken - 2",
    regex: new RegExp("(?:mattermost).{0,40}\\b([a-z0-9]{26})\\b")
  },
  {
    name: "Mavenlink",
    regex: new RegExp("(?:mavenlink).{0,40}\\b([0-9a-z]{64})\\b")
  },
  {
    name: "Maxmindlicense - 1",
    regex: new RegExp("(?:maxmind|geoip).{0,40}\\b([0-9A-Za-z]{16})\\b")
  },
  {
    name: "Maxmindlicense - 2",
    regex: new RegExp("(?:maxmind|geoip).{0,40}\\b([0-9]{2,7})\\b")
  },
  {
    name: "Meaningcloud",
    regex: new RegExp("(?:meaningcloud).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Mediastack",
    regex: new RegExp("(?:mediastack).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Meistertask",
    regex: new RegExp("(?:meistertask).{0,40}\\b([a-zA-Z0-9]{43})\\b")
  },
  {
    name: "Mesibo",
    regex: new RegExp("(?:mesibo).{0,40}\\b([0-9A-Za-z]{64})\\b")
  },
  {
    name: "Messagebird",
    regex: new RegExp("(?:messagebird).{0,40}\\b([A-Za-z0-9_-]{25})\\b")
  },
  {
    name: "Metaapi - 1",
    regex: new RegExp("(?:metaapi|meta-api).{0,40}\\b([0-9a-f]{64})\\b")
  },
  {
    name: "Metaapi - 2",
    regex: new RegExp("(?:metaapi|meta-api).{0,40}\\b([0-9a-f]{24})\\b")
  },
  {
    name: "Metrilo",
    regex: new RegExp("(?:metrilo).{0,40}\\b([a-z0-9]{16})\\b")
  },
  {
    name: "Microsoft Teams Webhook",
    regex: new RegExp("https://outlook\\.office\\.com/webhook/[A-Za-z0-9\\-@]+/IncomingWebhook/[A-Za-z0-9\\-]+/[A-Za-z0-9\\-]+")
  },
  {
    name: "Microsoftteamswebhook",
    regex: new RegExp("(https:\\/\\/[a-zA-Z-0-9]+\\.webhook\\.office\\.com\\/webhookb2\\/[a-zA-Z-0-9]{8}-[a-zA-Z-0-9]{4}-[a-zA-Z-0-9]{4}-[a-zA-Z-0-9]{4}-[a-zA-Z-0-9]{12}\\@[a-zA-Z-0-9]{8}-[a-zA-Z-0-9]{4}-[a-zA-Z-0-9]{4}-[a-zA-Z-0-9]{4}-[a-zA-Z-0-9]{12}\\/IncomingWebhook\\/[a-zA-Z-0-9]{32}\\/[a-zA-Z-0-9]{8}-[a-zA-Z-0-9]{4}-[a-zA-Z-0-9]{4}-[a-zA-Z-0-9]{4}-[a-zA-Z-0-9]{12})")
  },
  { name: "Midise", regex: new RegExp("midi-662b69edd2[a-zA-Z0-9]{54}") },
  {
    name: "Mindmeister",
    regex: new RegExp("(?:mindmeister).{0,40}\\b([a-zA-Z0-9]{43})\\b")
  },
  {
    name: "Mite - 1",
    regex: new RegExp("(?:mite).{0,40}\\b([0-9a-z]{16})\\b")
  },
  { name: "Mite - 2", regex: new RegExp("\\b([0-9a-z-]{1,}.mite.yo.lk)\\b") },
  {
    name: "Mixmax",
    regex: new RegExp("(?:mixmax).{0,40}\\b([a-zA-Z0-9_-]{36})\\b")
  },
  {
    name: "Mixpanel - 1",
    regex: new RegExp("(?:mixpanel).{0,40}\\b([a-zA-Z0-9.-]{30,40})\\b")
  },
  {
    name: "Mixpanel - 2",
    regex: new RegExp("(?:mixpanel).{0,40}\\b([a-zA-Z0-9-]{32})\\b")
  },
  {
    name: "Moderation",
    regex: new RegExp("(?:moderation).{0,40}\\b([a-zA-Z0-9]{36}\\.[a-zA-Z0-9]{115}\\.[a-zA-Z0-9_]{43})\\b")
  },
  {
    name: "Monday",
    regex: new RegExp("(?:monday).{0,40}\\b(ey[a-zA-Z0-9_.]{210,225})\\b")
  },
  {
    name: "Moonclerck",
    regex: new RegExp("(?:moonclerck).{0,40}\\b([0-9a-z]{32})\\b")
  },
  {
    name: "Moonclerk",
    regex: new RegExp("(?:moonclerk).{0,40}\\b([0-9a-z]{32})\\b")
  },
  {
    name: "Moosend",
    regex: new RegExp("(?:moosend).{0,40}\\b([0-9Aa-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\\b")
  },
  {
    name: "Mrticktock - 1",
    regex: new RegExp("(?:mrticktock).{0,40}\\b([a-zA-Z0-9!=@#$%()_^]{1,50})")
  },
  {
    name: "Myfreshworks - 2",
    regex: new RegExp("(?:freshworks).{0,40}\\b([a-z0-9A-Z-]{22})\\b")
  },
  {
    name: "Myintervals",
    regex: new RegExp("(?:myintervals).{0,40}\\b([0-9a-z]{11})\\b")
  },
  {
    name: "Nasdaqdatalink",
    regex: new RegExp("(?:nasdaq).{0,40}\\b([a-zA-Z0-9_-]{20})\\b")
  },
  {
    name: "Nethunt - 1",
    regex: new RegExp("(?:nethunt).{0,40}\\b([a-zA-Z0-9.-@]{25,30})\\b")
  },
  {
    name: "Nethunt - 2",
    regex: new RegExp("(?:nethunt).{0,40}\\b([a-z0-9-\\S]{36})\\b")
  },
  {
    name: "Netlify",
    regex: new RegExp("(?:netlify).{0,40}\\b([A-Za-z0-9_-]{43,45})\\b")
  },
  {
    name: "Neutrinoapi - 1",
    regex: new RegExp("(?:neutrinoapi).{0,40}\\b([a-zA-Z0-9]{48})\\b")
  },
  {
    name: "Neutrinoapi - 2",
    regex: new RegExp("(?:neutrinoapi).{0,40}\\b([a-zA-Z0-9]{6,24})\\b")
  },
  { name: "Newrelic Admin API Key", regex: new RegExp("NRAA-[a-f0-9]{27}") },
  {
    name: "Newrelic Insights API Key",
    regex: new RegExp("NRI(?:I|Q)-[A-Za-z0-9\\-_]{32}")
  },
  { name: "Newrelic REST API Key", regex: new RegExp("NRRA-[a-f0-9]{42}") },
  {
    name: "Newrelic Synthetics Location Key",
    regex: new RegExp("NRSP-[a-z]{2}[0-9]{2}[a-f0-9]{31}")
  },
  {
    name: "Newrelicpersonalapikey",
    regex: new RegExp("(?:newrelic).{0,40}\\b([A-Za-z0-9_\\.]{4}-[A-Za-z0-9_\\.]{42})\\b")
  },
  { name: "Newsapi", regex: new RegExp("(?:newsapi).{0,40}\\b([a-z0-9]{32})") },
  {
    name: "Newscatcher",
    regex: new RegExp("(?:newscatcher).{0,40}\\b([0-9A-Za-z_]{43})\\b")
  },
  {
    name: "Nexmoapikey - 1",
    regex: new RegExp("(?:nexmo).{0,40}\\b([A-Za-z0-9_-]{8})\\b")
  },
  {
    name: "Nexmoapikey - 2",
    regex: new RegExp("(?:nexmo).{0,40}\\b([A-Za-z0-9_-]{16})\\b")
  },
  {
    name: "Nftport",
    regex: new RegExp("(?:nftport).{0,40}\\b([a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12})\\b")
  },
  {
    name: "Nicereply",
    regex: new RegExp("(?:nicereply).{0,40}\\b([0-9a-f]{40})\\b")
  },
  {
    name: "Nimble",
    regex: new RegExp("(?:nimble).{0,40}\\b([a-zA-Z0-9]{30})\\b")
  },
  { name: "Nitro", regex: new RegExp("(?:nitro).{0,40}\\b([0-9a-f]{32})\\b") },
  {
    name: "Noticeable",
    regex: new RegExp("(?:noticeable).{0,40}\\b([0-9a-zA-Z]{20})\\b")
  },
  { name: "Notion", regex: new RegExp("\\b(secret_[A-Za-z0-9]{43})\\b") },
  {
    name: "Nozbeteams",
    regex: new RegExp("(?:nozbe|nozbeteams).{0,40}\\b([0-9A-Za-z]{16}_[0-9A-Za-z\\-_]{64}[ \\r\\n]{1})")
  },
  {
    name: "Numverify",
    regex: new RegExp("(?:numverify).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Nutritionix - 1",
    regex: new RegExp("(?:nutritionix).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Nutritionix - 2",
    regex: new RegExp("(?:nutritionix).{0,40}\\b([a-z0-9]{8})\\b")
  },
  {
    name: "Nylas",
    regex: new RegExp("(?:nylas).{0,40}\\b([0-9A-Za-z]{30})\\b")
  },
  {
    name: "Nytimes",
    regex: new RegExp("(?:nytimes).{0,40}\\b([a-z0-9A-Z-]{32})\\b")
  },
  {
    name: "Oanda",
    regex: new RegExp("(?:oanda).{0,40}\\b([a-zA-Z0-9]{24})\\b")
  },
  {
    name: "Omnisend",
    regex: new RegExp("(?:omnisend).{0,40}\\b([a-z0-9A-Z-]{75})\\b")
  },
  {
    name: "Onedesk - 1",
    regex: new RegExp("(?:onedesk).{0,40}\\b([a-zA-Z0-9!=@#$%^]{8,64})")
  },
  {
    name: "Onelogin - 2",
    regex: new RegExp(`secret[a-zA-Z0-9_' "=]{0,20}([a-z0-9]{64})`)
  },
  {
    name: "Onepagecrm - 1",
    regex: new RegExp("(?:onepagecrm).{0,40}\\b([a-zA-Z0-9=]{44})")
  },
  {
    name: "Onepagecrm - 2",
    regex: new RegExp("(?:onepagecrm).{0,40}\\b([a-z0-9]{24})\\b")
  },
  {
    name: "Onwaterio",
    regex: new RegExp("(?:onwater).{0,40}\\b([a-zA-Z0-9_-]{20})\\b")
  },
  {
    name: "Oopspam",
    regex: new RegExp("(?:oopspam).{0,40}\\b([a-zA-Z0-9]{40})\\b")
  },
  {
    name: "Opencagedata",
    regex: new RegExp("(?:opencagedata).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Opengraphr",
    regex: new RegExp("(?:opengraphr).{0,40}\\b([0-9Aa-zA-Z]{80})\\b")
  },
  {
    name: "Openuv",
    regex: new RegExp("(?:openuv).{0,40}\\b([0-9a-z]{32})\\b")
  },
  {
    name: "Openweather",
    regex: new RegExp("(?:openweather).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Optimizely",
    regex: new RegExp("(?:optimizely).{0,40}\\b([0-9A-Za-z-:]{54})\\b")
  },
  {
    name: "Owlbot",
    regex: new RegExp("(?:owlbot).{0,40}\\b([a-z0-9]{40})\\b")
  },
  {
    name: "PGP private key block",
    regex: new RegExp("-----BEGIN PGP PRIVATE KEY BLOCK-----")
  },
  {
    name: "Pagerdutyapikey",
    regex: new RegExp("(?:pagerduty).{0,40}\\b([a-z]{1}\\+[a-zA-Z]{9}\\-[a-z]{2}\\-[a-z0-9]{5})\\b")
  },
  {
    name: "Pandadoc",
    regex: new RegExp("(?:pandadoc).{0,40}\\b([a-zA-Z0-9]{40})\\b")
  },
  {
    name: "Pandascore",
    regex: new RegExp("(?:pandascore).{0,40}([ \\r\\n]{0,1}[0-9A-Za-z\\-\\_]{51}[ \\r\\n]{1})")
  },
  {
    name: "Paralleldots",
    regex: new RegExp("(?:paralleldots).{0,40}\\b([0-9A-Za-z]{43})\\b")
  },
  {
    name: "Partnerstack",
    regex: new RegExp("(?:partnerstack).{0,40}\\b([0-9A-Za-z]{64})\\b")
  },
  {
    name: "Passbase",
    regex: new RegExp("(?:passbase).{0,40}\\b([a-zA-Z0-9]{128})\\b")
  },
  {
    name: "Password in URL",
    regex: new RegExp(`[a-zA-Z]{3,10}://[^/\\s:@]{3,20}:[^/\\s:@]{3,20}@.{1,100}["'\\s]`)
  },
  {
    name: "Pastebin",
    regex: new RegExp("(?:pastebin).{0,40}\\b([a-zA-Z0-9_]{32})\\b")
  },
  {
    name: "PayPal Braintree access token",
    regex: new RegExp("access_token\\$production\\$[0-9a-z]{16}\\$[0-9a-f]{32}")
  },
  {
    name: "Paymoapp",
    regex: new RegExp("(?:paymoapp).{0,40}\\b([a-zA-Z0-9]{44})\\b")
  },
  {
    name: "Paymongo",
    regex: new RegExp("(?:paymongo).{0,40}\\b([a-zA-Z0-9_]{32})\\b")
  },
  {
    name: "Paypaloauth - 1",
    regex: new RegExp("\\b([A-Za-z0-9_\\.]{7}-[A-Za-z0-9_\\.]{72})\\b")
  },
  {
    name: "Paypaloauth - 2",
    regex: new RegExp("\\b([A-Za-z0-9_\\.]{69}-[A-Za-z0-9_\\.]{10})\\b")
  },
  {
    name: "Paystack",
    regex: new RegExp("\\b(sk\\_[a-z]{1,}\\_[A-Za-z0-9]{40})\\b")
  },
  {
    name: "Pdflayer",
    regex: new RegExp("(?:pdflayer).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Pdfshift",
    regex: new RegExp("(?:pdfshift).{0,40}\\b([0-9a-f]{32})\\b")
  },
  {
    name: "Peopledatalabs",
    regex: new RegExp("(?:peopledatalabs).{0,40}\\b([a-z0-9]{64})\\b")
  },
  {
    name: "Pepipost",
    regex: new RegExp("(?:pepipost|netcore).{0,40}\\b([a-zA-Z-0-9]{32})\\b")
  },
  { name: "Picatic API key", regex: new RegExp("sk_live_[0-9a-z]{32}") },
  {
    name: "Pipedream",
    regex: new RegExp("(?:pipedream).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Pipedrive",
    regex: new RegExp("(?:pipedrive).{0,40}\\b([a-zA-Z0-9]{40})\\b")
  },
  {
    name: "Pivotaltracker",
    regex: new RegExp("(?:pivotal).{0,40}([a-z0-9]{32})")
  },
  {
    name: "Pixabay",
    regex: new RegExp("(?:pixabay).{0,40}\\b([a-z0-9-]{34})\\b")
  },
  {
    name: "Plaidkey - 1",
    regex: new RegExp("(?:plaid).{0,40}\\b([a-z0-9]{24})\\b")
  },
  {
    name: "Plaidkey - 2",
    regex: new RegExp("(?:plaid).{0,40}\\b([a-z0-9]{30})\\b")
  },
  {
    name: "Planviewleankit - 1",
    regex: new RegExp("(?:planviewleankit|planview).{0,40}\\b([0-9a-f]{128})\\b")
  },
  {
    name: "Planviewleankit - 2",
    regex: new RegExp("(?:planviewleankit|planview).{0,40}(?:subdomain).\\b([a-zA-Z][a-zA-Z0-9.-]{1,23}[a-zA-Z0-9])\\b")
  },
  {
    name: "Planyo",
    regex: new RegExp("(?:planyo).{0,40}\\b([0-9a-z]{62})\\b")
  },
  {
    name: "Plivo - 1",
    regex: new RegExp("(?:plivo).{0,40}\\b([A-Za-z0-9_-]{40})\\b")
  },
  { name: "Plivo - 2", regex: new RegExp("(?:plivo).{0,40}\\b([A-Z]{20})\\b") },
  {
    name: "Poloniex - 1",
    regex: new RegExp("(?:poloniex).{0,40}\\b([0-9a-f]{128})\\b")
  },
  {
    name: "Poloniex - 2",
    regex: new RegExp("(?:poloniex).{0,40}\\b([0-9A-Z]{8}-[0-9A-Z]{8}-[0-9A-Z]{8}-[0-9A-Z]{8})\\b")
  },
  {
    name: "Polygon",
    regex: new RegExp("(?:polygon).{0,40}\\b([a-z0-9A-Z]{32})\\b")
  },
  {
    name: "Positionstack",
    regex: new RegExp("(?:positionstack).{0,40}\\b([a-zA-Z0-9_]{32})\\b")
  },
  {
    name: "Postageapp",
    regex: new RegExp("(?:postageapp).{0,40}\\b([0-9A-Za-z]{32})\\b")
  },
  { name: "Posthog", regex: new RegExp("\\b(phc_[a-zA-Z0-9_]{43})\\b") },
  { name: "Postman", regex: new RegExp("\\b(PMAK-[a-zA-Z-0-9]{59})\\b") },
  {
    name: "Postmark",
    regex: new RegExp("(?:postmark).{0,40}\\b([0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12})\\b")
  },
  {
    name: "Powrbot",
    regex: new RegExp("(?:powrbot).{0,40}\\b([a-z0-9A-Z]{40})\\b")
  },
  {
    name: "Privatekey",
    regex: new RegExp("-----\\s*?BEGIN[ A-Z0-9_-]*?PRIVATE KEY\\s*?-----[\\s\\S]*?----\\s*?END[ A-Z0-9_-]*? PRIVATE KEY\\s*?-----")
  },
  {
    name: "Prospectcrm",
    regex: new RegExp("(?:prospect).{0,40}\\b([a-z0-9-]{32})\\b")
  },
  {
    name: "Prospectio",
    regex: new RegExp("(?:prospect).{0,40}\\b([a-z0-9A-Z-]{50})\\b")
  },
  {
    name: "Protocolsio",
    regex: new RegExp("(?:protocols).{0,40}\\b([a-z0-9]{64})\\b")
  },
  {
    name: "Proxycrawl",
    regex: new RegExp("(?:proxycrawl).{0,40}\\b([a-zA-Z0-9_]{22})\\b")
  },
  {
    name: "Pubnubpublishkey - 1",
    regex: new RegExp("\\b(sub-c-[0-9a-z]{8}-[a-z]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12})\\b")
  },
  {
    name: "Pubnubpublishkey - 2",
    regex: new RegExp("\\b(pub-c-[0-9a-z]{8}-[0-9a-z]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12})\\b")
  },
  {
    name: "Purestake",
    regex: new RegExp("(?:purestake).{0,40}\\b([a-zA-Z0-9]{40})\\b")
  },
  {
    name: "Pushbulletapikey",
    regex: new RegExp("(?:pushbullet).{0,40}\\b([A-Za-z0-9_\\.]{34})\\b")
  },
  {
    name: "Pusherchannelkey - 1",
    regex: new RegExp("(?:key).{0,40}\\b([a-z0-9]{20})\\b")
  },
  {
    name: "Pusherchannelkey - 2",
    regex: new RegExp("(?:pusher).{0,40}\\b([a-z0-9]{20})\\b")
  },
  {
    name: "Pusherchannelkey - 3",
    regex: new RegExp("(?:pusher).{0,40}\\b([0-9]{7})\\b")
  },
  {
    name: "PyPI upload token",
    regex: new RegExp("pypi-AgEIcHlwaS5vcmc[A-Za-z0-9-_]{50,1000}")
  },
  {
    name: "Qualaroo",
    regex: new RegExp("(?:qualaroo).{0,40}\\b([a-z0-9A-Z=]{64})")
  },
  {
    name: "Qubole",
    regex: new RegExp("(?:qubole).{0,40}\\b([0-9a-z]{64})\\b")
  },
  {
    name: "Quickmetrics",
    regex: new RegExp("(?:quickmetrics).{0,40}\\b([a-zA-Z0-9_-]{22})\\b")
  },
  { name: "REDIS_URL", regex: new RegExp("(REDIS_URL).+") },
  { name: "RKCS8", regex: new RegExp("-----BEGIN PRIVATE KEY-----") },
  {
    name: "RSA private key",
    regex: new RegExp("-----BEGIN RSA PRIVATE KEY-----")
  },
  {
    name: "Rapidapi",
    regex: new RegExp("(?:rapidapi).{0,40}\\b([A-Za-z0-9_-]{50})\\b")
  },
  { name: "Raven", regex: new RegExp("(?:raven).{0,40}\\b([A-Z0-9-]{16})\\b") },
  { name: "Rawg", regex: new RegExp("(?:rawg).{0,40}\\b([0-9Aa-z]{32})\\b") },
  { name: "Razorpay - 1", regex: new RegExp("\\brzp_\\w{2,6}_\\w{10,20}\\b") },
  {
    name: "Readme",
    regex: new RegExp("(?:readme).{0,40}\\b([a-zA-Z0-9_]{32})\\b")
  },
  {
    name: "Reallysimplesystems",
    regex: new RegExp("\\b(ey[a-zA-Z0-9-._]{153}.ey[a-zA-Z0-9-._]{916,1000})\\b")
  },
  {
    name: "Rebrandly",
    regex: new RegExp("(?:rebrandly).{0,40}\\b([a-zA-Z0-9_]{32})\\b")
  },
  {
    name: "Refiner",
    regex: new RegExp("(?:refiner).{0,40}\\b([0-9Aa-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\\b")
  },
  {
    name: "Repairshopr - 1",
    regex: new RegExp("(?:repairshopr).{0,40}\\b([a-zA-Z0-9_.!+$#^*]{3,32})\\b")
  },
  {
    name: "Repairshopr - 2",
    regex: new RegExp("(?:repairshopr).{0,40}\\b([a-zA-Z0-9-]{51})\\b")
  },
  {
    name: "Restpack",
    regex: new RegExp("(?:restpack).{0,40}\\b([a-zA-Z0-9]{48})\\b")
  },
  {
    name: "Restpackhtmltopdfapi",
    regex: new RegExp("(?:restpack).{0,40}\\b([0-9A-Za-z]{48})\\b")
  },
  {
    name: "Rev - 1",
    regex: new RegExp("(?:rev).{0,40}\\b([0-9a-zA-Z\\/\\+]{27}\\=[ \\r\\n]{1})")
  },
  {
    name: "Rev - 2",
    regex: new RegExp("(?:rev).{0,40}\\b([0-9a-zA-Z\\-]{27}[ \\r\\n]{1})")
  },
  {
    name: "Revampcrm - 1",
    regex: new RegExp("(?:revamp).{0,40}\\b([a-zA-Z0-9]{40}\\b)")
  },
  {
    name: "Revampcrm - 2",
    regex: new RegExp("(?:revamp).{0,40}\\b([a-zA-Z0-9.-@]{25,30})\\b")
  },
  {
    name: "Ringcentral - 1",
    regex: new RegExp("(?:ringcentral).{0,40}\\b(https://www.[0-9A-Za-z_-]{1,}.com)\\b")
  },
  {
    name: "Ringcentral - 2",
    regex: new RegExp("(?:ringcentral).{0,40}\\b([0-9A-Za-z_-]{22})\\b")
  },
  {
    name: "Ritekit",
    regex: new RegExp("(?:ritekit).{0,40}\\b([0-9a-f]{44})\\b")
  },
  {
    name: "Roaring",
    regex: new RegExp("(?:roaring).{0,40}\\b([0-9A-Za-z_-]{28})\\b")
  },
  {
    name: "Rocketreach",
    regex: new RegExp("(?:rocketreach).{0,40}\\b([a-z0-9-]{39})\\b")
  },
  {
    name: "Roninapp - 1",
    regex: new RegExp("(?:ronin).{0,40}\\b([0-9Aa-zA-Z]{3,32})\\b")
  },
  {
    name: "Roninapp - 2",
    regex: new RegExp("(?:ronin).{0,40}\\b([0-9a-zA-Z]{26})\\b")
  },
  {
    name: "Route4me",
    regex: new RegExp("(?:route4me).{0,40}\\b([0-9A-Z]{32})\\b")
  },
  {
    name: "Rownd - 1",
    regex: new RegExp("(?:rownd).{0,40}\\b([a-z0-9]{8}\\-[a-z0-9]{4}\\-[a-z0-9]{4}\\-[a-z0-9]{4}\\-[a-z0-9]{12})\\b")
  },
  {
    name: "Rownd - 2",
    regex: new RegExp("(?:rownd).{0,40}\\b([a-z0-9]{48})\\b")
  },
  { name: "Rownd - 3", regex: new RegExp("(?:rownd).{0,40}\\b([0-9]{18})\\b") },
  { name: "Rubygems", regex: new RegExp("\\b(rubygems_[a-zA0-9]{48})\\b") },
  {
    name: "Runrunit - 1",
    regex: new RegExp("(?:runrunit).{0,40}\\b([0-9a-f]{32})\\b")
  },
  {
    name: "Runrunit - 2",
    regex: new RegExp("(?:runrunit).{0,40}\\b([0-9A-Za-z]{18,20})\\b")
  },
  { name: "SSH", regex: new RegExp("-----BEGIN OPENSSH PRIVATE KEY-----") },
  {
    name: "SSH (DSA) private key",
    regex: new RegExp("-----BEGIN DSA PRIVATE KEY-----")
  },
  {
    name: "Salesblink",
    regex: new RegExp("(?:salesblink).{0,40}\\b([a-zA-Z]{16})\\b")
  },
  {
    name: "Salescookie",
    regex: new RegExp("(?:salescookie).{0,40}\\b([a-zA-z0-9]{32})\\b")
  },
  {
    name: "Salesflare",
    regex: new RegExp("(?:salesflare).{0,40}\\b([a-zA-Z0-9_]{45})\\b")
  },
  {
    name: "Satismeterprojectkey - 1",
    regex: new RegExp("(?:satismeter).{0,40}\\b([a-zA-Z0-9]{4,20}@[a-zA-Z0-9]{2,12}.[a-zA-Z0-9]{2,12})\\b")
  },
  {
    name: "Satismeterprojectkey - 2",
    regex: new RegExp("(?:satismeter).{0,40}\\b([a-zA-Z0-9]{24})\\b")
  },
  {
    name: "Satismeterprojectkey - 3",
    regex: new RegExp("(?:satismeter).{0,40}\\b([a-zA-Z0-9!=@#$%^]{6,32})")
  },
  {
    name: "Satismeterwritekey",
    regex: new RegExp("(?:satismeter).{0,40}\\b([a-z0-9A-Z]{16})\\b")
  },
  {
    name: "Saucelabs - 1",
    regex: new RegExp("\\b(oauth\\-[a-z0-9]{8,}\\-[a-z0-9]{5})\\b")
  },
  {
    name: "Saucelabs - 2",
    regex: new RegExp("(?:saucelabs).{0,40}\\b([a-z0-9]{8}\\-[a-z0-9]{4}\\-[a-z0-9]{4}\\-[a-z0-9]{4}\\-[a-z0-9]{12})\\b")
  },
  {
    name: "Scalewaykey",
    regex: new RegExp("(?:scaleway).{0,40}\\b([0-9a-z]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[0-9a-z]{4}-[0-9a-z]{12})\\b")
  },
  {
    name: "Scrapeowl",
    regex: new RegExp("(?:scrapeowl).{0,40}\\b([0-9a-z]{30})\\b")
  },
  {
    name: "Scraperapi",
    regex: new RegExp("(?:scraperapi).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Scraperbox",
    regex: new RegExp("(?:scraperbox).{0,40}\\b([A-Z0-9]{32})\\b")
  },
  {
    name: "Scrapersite",
    regex: new RegExp("(?:scrapersite).{0,40}\\b([a-zA-Z0-9]{45})\\b")
  },
  {
    name: "Scrapestack",
    regex: new RegExp("(?:scrapestack).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Scrapfly",
    regex: new RegExp("(?:scrapfly).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Scrapingant",
    regex: new RegExp("(?:scrapingant).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Scrapingbee",
    regex: new RegExp("(?:scrapingbee).{0,40}\\b([A-Z0-9]{80})\\b")
  },
  {
    name: "Screenshotapi",
    regex: new RegExp("(?:screenshotapi).{0,40}\\b([0-9A-Z]{7}\\-[0-9A-Z]{7}\\-[0-9A-Z]{7}\\-[0-9A-Z]{7})\\b")
  },
  {
    name: "Screenshotlayer",
    regex: new RegExp("(?:screenshotlayer).{0,40}\\b([a-zA-Z0-9_]{32})\\b")
  },
  {
    name: "Securitytrails",
    regex: new RegExp("(?:securitytrails).{0,40}\\b([a-zA-Z0-9]{32})\\b")
  },
  {
    name: "Segmentapikey",
    regex: new RegExp("(?:segment).{0,40}\\b([A-Za-z0-9_\\-a-zA-Z]{43}\\.[A-Za-z0-9_\\-a-zA-Z]{43})\\b")
  },
  {
    name: "Selectpdf",
    regex: new RegExp("(?:selectpdf).{0,40}\\b([a-z0-9-]{36})\\b")
  },
  {
    name: "Semaphore",
    regex: new RegExp("(?:semaphore).{0,40}\\b([0-9a-z]{32})\\b")
  },
  {
    name: "SendGrid API Key",
    regex: new RegExp("SG\\.[\\w_]{16,32}\\.[\\w_]{16,64}")
  },
  {
    name: "Sendbird - 1",
    regex: new RegExp("(?:sendbird).{0,40}\\b([0-9a-f]{40})\\b")
  },
  {
    name: "Sendbird - 2",
    regex: new RegExp("(?:sendbird).{0,40}\\b([0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12})\\b")
  },
  {
    name: "Sendbirdorganizationapi",
    regex: new RegExp("(?:sendbird).{0,40}\\b([0-9a-f]{24})\\b")
  },
  {
    name: "Sendgrid",
    regex: new RegExp("(?:sendgrid).{0,40}(SG\\.[\\w\\-_]{20,24}\\.[\\w\\-_]{39,50})\\b")
  },
  {
    name: "Sendinbluev2",
    regex: new RegExp("\\b(xkeysib\\-[A-Za-z0-9_-]{81})\\b")
  },
  {
    name: "Sentiment - 1",
    regex: new RegExp("(?:sentiment).{0,40}\\b([0-9]{17})\\b")
  },
  {
    name: "Sentiment - 2",
    regex: new RegExp("(?:sentiment).{0,40}\\b([a-zA-Z0-9]{20})\\b")
  },
  {
    name: "Sentrytoken",
    regex: new RegExp("(?:sentry).{0,40}\\b([a-f0-9]{64})\\b")
  },
  {
    name: "Serphouse",
    regex: new RegExp("(?:serphouse).{0,40}\\b([0-9A-Za-z]{60})\\b")
  },
  {
    name: "Serpstack",
    regex: new RegExp("(?:serpstack).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Sheety - 1",
    regex: new RegExp("(?:sheety).{0,40}\\b([0-9a-z]{32})\\b")
  },
  {
    name: "Sheety - 2",
    regex: new RegExp("(?:sheety).{0,40}\\b([0-9a-z]{64})\\b")
  },
  {
    name: "Sherpadesk",
    regex: new RegExp("(?:sherpadesk).{0,40}\\b([0-9a-z]{32})\\b")
  },
  {
    name: "Shipday",
    regex: new RegExp("(?:shipday).{0,40}\\b([a-zA-Z0-9.]{11}[a-zA-Z0-9]{20})\\b")
  },
  {
    name: "Shodankey",
    regex: new RegExp("(?:shodan).{0,40}\\b([a-zA-Z0-9]{32})\\b")
  },
  { name: "Shopify access token", regex: new RegExp("shpat_[a-fA-F0-9]{32}") },
  {
    name: "Shopify custom app access token",
    regex: new RegExp("shpca_[a-fA-F0-9]{32}")
  },
  {
    name: "Shopify private app access token",
    regex: new RegExp("shppa_[a-fA-F0-9]{32}")
  },
  { name: "Shopify shared secret", regex: new RegExp("shpss_[a-fA-F0-9]{32}") },
  {
    name: "Shoppable Service Auth",
    regex: new RegExp("data-shoppable-auth-token.+")
  },
  {
    name: "Shortcut",
    regex: new RegExp("(?:shortcut).{0,40}\\b([0-9a-f-]{36})\\b")
  },
  {
    name: "Shotstack",
    regex: new RegExp("(?:shotstack).{0,40}\\b([a-zA-Z0-9]{40})\\b")
  },
  {
    name: "Shutterstock - 1",
    regex: new RegExp("(?:shutterstock).{0,40}\\b([0-9a-zA-Z]{32})\\b")
  },
  {
    name: "Shutterstock - 2",
    regex: new RegExp("(?:shutterstock).{0,40}\\b([0-9a-zA-Z]{16})\\b")
  },
  {
    name: "Shutterstockoauth",
    regex: new RegExp("(?:shutterstock).{0,40}\\b(v2/[0-9A-Za-z]{388})\\b")
  },
  {
    name: "Signalwire - 1",
    regex: new RegExp("\\b([0-9a-z-]{3,64}.signalwire.com)\\b")
  },
  {
    name: "Signalwire - 2",
    regex: new RegExp("(?:signalwire).{0,40}\\b([0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12})\\b")
  },
  {
    name: "Signalwire - 3",
    regex: new RegExp("(?:signalwire).{0,40}\\b([0-9A-Za-z]{50})\\b")
  },
  {
    name: "Signaturit",
    regex: new RegExp("(?:signaturit).{0,40}\\b([0-9A-Za-z]{86})\\b")
  },
  {
    name: "Signupgenius",
    regex: new RegExp("(?:signupgenius).{0,40}\\b([0-9A-Za-z]{32})\\b")
  },
  {
    name: "Sigopt",
    regex: new RegExp("(?:sigopt).{0,40}\\b([A-Z0-9]{48})\\b")
  },
  {
    name: "Simplesat",
    regex: new RegExp("(?:simplesat).{0,40}\\b([a-z0-9]{40})")
  },
  {
    name: "Simplynoted",
    regex: new RegExp("(?:simplynoted).{0,40}\\b([a-zA-Z0-9\\S]{340,360})\\b")
  },
  {
    name: "Simvoly",
    regex: new RegExp("(?:simvoly).{0,40}\\b([a-z0-9]{33})\\b")
  },
  {
    name: "Sinchmessage",
    regex: new RegExp("(?:sinch).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Sirv - 1",
    regex: new RegExp("(?:sirv).{0,40}\\b([a-zA-Z0-9\\S]{88})")
  },
  {
    name: "Sirv - 2",
    regex: new RegExp("(?:sirv).{0,40}\\b([a-zA-Z0-9]{26})\\b")
  },
  {
    name: "Siteleaf",
    regex: new RegExp("(?:siteleaf).{0,40}\\b([0-9Aa-z]{32})\\b")
  },
  {
    name: "Skrappio",
    regex: new RegExp("(?:skrapp).{0,40}\\b([a-z0-9A-Z]{42})\\b")
  },
  {
    name: "Skybiometry",
    regex: new RegExp("(?:skybiometry).{0,40}\\b([0-9a-z]{25,26})\\b")
  },
  { name: "Slack", regex: new RegExp("xox[baprs]-[0-9a-zA-Z]{10,48}") },
  {
    name: "Slack Token",
    regex: new RegExp("(xox[pborsa]-[0-9]{12}-[0-9]{12}-[0-9]{12}-[a-z0-9]{32})")
  },
  { name: "Slack User token", regex: new RegExp("xoxp-[0-9A-Za-z\\-]{72}") },
  {
    name: "Slack Webhook",
    regex: new RegExp("https://hooks.slack.com/services/T[a-zA-Z0-9_]{8,10}/B[a-zA-Z0-9_]{8,12}/[a-zA-Z0-9_]{23,24}")
  },
  { name: "Slack access token", regex: new RegExp("xoxb-[0-9A-Za-z\\-]{51}") },
  {
    name: "Slackwebhook",
    regex: new RegExp("(https:\\/\\/hooks.slack.com\\/services\\/[A-Za-z0-9+\\/]{44,46})")
  },
  {
    name: "Smartsheets",
    regex: new RegExp("(?:smartsheets).{0,40}\\b([a-zA-Z0-9]{37})\\b")
  },
  {
    name: "Smartystreets - 1",
    regex: new RegExp("(?:smartystreets).{0,40}\\b([a-zA-Z0-9]{20})\\b")
  },
  {
    name: "Smartystreets - 2",
    regex: new RegExp("(?:smartystreets).{0,40}\\b([a-z0-9-]{36})\\b")
  },
  {
    name: "Smooch - 1",
    regex: new RegExp("(?:smooch).{0,40}\\b(act_[0-9a-z]{24})\\b")
  },
  {
    name: "Smooch - 2",
    regex: new RegExp("(?:smooch).{0,40}\\b([0-9a-zA-Z_-]{86})\\b")
  },
  {
    name: "Snipcart",
    regex: new RegExp("(?:snipcart).{0,40}\\b([0-9A-Za-z_]{75})\\b")
  },
  {
    name: "Snykkey",
    regex: new RegExp("(?:snyk).{0,40}\\b([0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12})\\b")
  },
  {
    name: "SonarQube Token",
    regex: new RegExp("sonar.{0,50}(?:\"|'|`)?[0-9a-f]{40}(?:\"|'|`)?")
  },
  {
    name: "Splunkobservabilitytoken",
    regex: new RegExp("(?:splunk).{0,40}\\b([a-z0-9A-Z]{22})\\b")
  },
  {
    name: "Spoonacular",
    regex: new RegExp("(?:spoonacular).{0,40}\\b([0-9a-z]{32})\\b")
  },
  {
    name: "Sportsmonk",
    regex: new RegExp("(?:sportsmonk).{0,40}\\b([0-9a-zA-Z]{60})\\b")
  },
  {
    name: "Square",
    regex: new RegExp("(?:square).{0,40}(EAAA[a-zA-Z0-9\\-\\+\\=]{60})")
  },
  {
    name: "Square API Key",
    regex: new RegExp("sq0(atp|csp)-[0-9a-z-_]{22,43}")
  },
  {
    name: "Square OAuth Secret",
    regex: new RegExp("sq0csp-[0-9A-Za-z\\-_]{43}")
  },
  {
    name: "Square access token",
    regex: new RegExp("sq0atp-[0-9A-Za-z\\-_]{22}")
  },
  {
    name: "Squareapp - 1",
    regex: new RegExp("[\\w\\-]*sq0i[a-z]{2}-[0-9A-Za-z\\-_]{22,43}")
  },
  {
    name: "Squareapp - 2",
    regex: new RegExp("[\\w\\-]*sq0c[a-z]{2}-[0-9A-Za-z\\-_]{40,50}")
  },
  {
    name: "Squarespace",
    regex: new RegExp("(?:squarespace).{0,40}\\b([0-9Aa-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\\b")
  },
  { name: "Squareup", regex: new RegExp("\\b(sq0idp-[0-9A-Za-z]{22})\\b") },
  {
    name: "Sslmate",
    regex: new RegExp("(?:sslmate).{0,40}\\b([a-zA-Z0-9]{36})\\b")
  },
  {
    name: "Stitchdata",
    regex: new RegExp("(?:stitchdata).{0,40}\\b([0-9a-z_]{35})\\b")
  },
  {
    name: "Stockdata",
    regex: new RegExp("(?:stockdata).{0,40}\\b([0-9A-Za-z]{40})\\b")
  },
  {
    name: "Storecove",
    regex: new RegExp("(?:storecove).{0,40}\\b([a-zA-Z0-9_-]{43})\\b")
  },
  {
    name: "Stormglass",
    regex: new RegExp("(?:stormglass).{0,40}\\b([0-9Aa-z-]{73})\\b")
  },
  {
    name: "Storyblok",
    regex: new RegExp("(?:storyblok).{0,40}\\b([0-9A-Za-z]{22}t{2})\\b")
  },
  {
    name: "Storychief",
    regex: new RegExp("(?:storychief).{0,40}\\b([a-zA-Z0-9_\\-.]{940,1000})")
  },
  {
    name: "Strava - 1",
    regex: new RegExp("(?:strava).{0,40}\\b([0-9]{5})\\b")
  },
  {
    name: "Strava - 2",
    regex: new RegExp("(?:strava).{0,40}\\b([0-9a-z]{40})\\b")
  },
  {
    name: "Streak",
    regex: new RegExp("(?:streak).{0,40}\\b([0-9Aa-f]{32})\\b")
  },
  { name: "Stripe", regex: new RegExp("[rs]k_live_[a-zA-Z0-9]{20,30}") },
  { name: "Stripe API Key - 1", regex: new RegExp("sk_live_[0-9a-zA-Z]{24}") },
  {
    name: "Stripe API key - 2",
    regex: new RegExp("stripe[sr]k_live_[0-9a-zA-Z]{24}")
  },
  {
    name: "Stripe API key - 3",
    regex: new RegExp("stripe[sk|rk]_live_[0-9a-zA-Z]{24}")
  },
  { name: "Stripe Public Live Key", regex: new RegExp("pk_live_[0-9a-z]{24}") },
  { name: "Stripe Public Test Key", regex: new RegExp("pk_test_[0-9a-z]{24}") },
  {
    name: "Stripe Restriced Key",
    regex: new RegExp("rk_(?:live|test)_[0-9a-zA-Z]{24}")
  },
  {
    name: "Stripe Restricted API Key",
    regex: new RegExp("rk_live_[0-9a-zA-Z]{24}")
  },
  {
    name: "Stripe Secret Key",
    regex: new RegExp("sk_(?:live|test)_[0-9a-zA-Z]{24}")
  },
  {
    name: "Stripe Secret Live Key",
    regex: new RegExp("(sk|rk)_live_[0-9a-z]{24}")
  },
  {
    name: "Stripe Secret Test Key",
    regex: new RegExp("(sk|rk)_test_[0-9a-z]{24}")
  },
  {
    name: "Stytch - 1",
    regex: new RegExp("(?:stytch).{0,40}\\b([a-zA-Z0-9-_]{47}=)")
  },
  {
    name: "Stytch - 2",
    regex: new RegExp("(?:stytch).{0,40}\\b([a-z0-9-]{49})\\b")
  },
  {
    name: "Sugester - 1",
    regex: new RegExp("(?:sugester).{0,40}\\b([a-zA-Z0-9_.!+$#^*%]{3,32})\\b")
  },
  {
    name: "Sugester - 2",
    regex: new RegExp("(?:sugester).{0,40}\\b([a-zA-Z0-9]{32})\\b")
  },
  {
    name: "Sumologickey - 1",
    regex: new RegExp("(?:sumo).{0,40}\\b([A-Za-z0-9]{14})\\b")
  },
  {
    name: "Sumologickey - 2",
    regex: new RegExp("(?:sumo).{0,40}\\b([A-Za-z0-9]{64})\\b")
  },
  {
    name: "Supernotesapi",
    regex: new RegExp("(?:supernotes).{0,40}([ \\r\\n]{0,1}[0-9A-Za-z\\-_]{43}[ \\r\\n]{1})")
  },
  {
    name: "Surveyanyplace - 1",
    regex: new RegExp("(?:survey).{0,40}\\b([a-z0-9A-Z-]{36})\\b")
  },
  {
    name: "Surveyanyplace - 2",
    regex: new RegExp("(?:survey).{0,40}\\b([a-z0-9A-Z]{32})\\b")
  },
  {
    name: "Surveybot",
    regex: new RegExp("(?:surveybot).{0,40}\\b([A-Za-z0-9-]{80})\\b")
  },
  {
    name: "Surveysparrow",
    regex: new RegExp("(?:surveysparrow).{0,40}\\b([a-zA-Z0-9-_]{88})\\b")
  },
  {
    name: "Survicate",
    regex: new RegExp("(?:survicate).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Swell - 1",
    regex: new RegExp("(?:swell).{0,40}\\b([a-zA-Z0-9]{6,24})\\b")
  },
  {
    name: "Swell - 2",
    regex: new RegExp("(?:swell).{0,40}\\b([a-zA-Z0-9]{32})\\b")
  },
  {
    name: "Swiftype",
    regex: new RegExp("(?:swiftype).{0,40}\\b([a-zA-z-0-9]{6}\\_[a-zA-z-0-9]{6}\\-[a-zA-z-0-9]{6})\\b")
  },
  {
    name: "Tallyfy",
    regex: new RegExp("(?:tallyfy).{0,40}\\b([0-9A-Za-z]{36}\\.[0-9A-Za-z]{264}\\.[0-9A-Za-z\\-\\_]{683})\\b")
  },
  {
    name: "Tatumio",
    regex: new RegExp("(?:tatum).{0,40}\\b([0-9a-z-]{36})\\b")
  },
  {
    name: "Taxjar",
    regex: new RegExp("(?:taxjar).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Teamgate - 1",
    regex: new RegExp("(?:teamgate).{0,40}\\b([a-z0-9]{40})\\b")
  },
  {
    name: "Teamgate - 2",
    regex: new RegExp("(?:teamgate).{0,40}\\b([a-zA-Z0-9]{80})\\b")
  },
  {
    name: "Teamworkcrm",
    regex: new RegExp("(?:teamwork|teamworkcrm).{0,40}\\b(tkn\\.v1_[0-9A-Za-z]{71}=[ \\r\\n]{1})")
  },
  {
    name: "Teamworkdesk",
    regex: new RegExp("(?:teamwork|teamworkdesk).{0,40}\\b(tkn\\.v1_[0-9A-Za-z]{71}=[ \\r\\n]{1})")
  },
  {
    name: "Teamworkspaces",
    regex: new RegExp("(?:teamwork|teamworkspaces).{0,40}\\b(tkn\\.v1_[0-9A-Za-z]{71}=[ \\r\\n]{1})")
  },
  {
    name: "Technicalanalysisapi",
    regex: new RegExp("(?:technicalanalysisapi).{0,40}\\b([A-Z0-9]{48})\\b")
  },
  {
    name: "Telegram Bot API Key",
    regex: new RegExp("[0-9]+:AA[0-9A-Za-z\\-_]{33}")
  },
  { name: "Telegram Secret", regex: new RegExp("d{5,}:A[0-9a-z_-]{34,34}") },
  {
    name: "Telegrambottoken",
    regex: new RegExp("(?:telegram).{0,40}\\b([0-9]{8,10}:[a-zA-Z0-9_-]{35})\\b")
  },
  {
    name: "Telnyx",
    regex: new RegExp("(?:telnyx).{0,40}\\b(KEY[0-9A-Za-z_-]{55})\\b")
  },
  {
    name: "Terraformcloudpersonaltoken",
    regex: new RegExp("\\b([A-Za-z0-9]{14}.atlasv1.[A-Za-z0-9]{67})\\b")
  },
  {
    name: "Text2data",
    regex: new RegExp("(?:text2data).{0,40}\\b([0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12})\\b")
  },
  {
    name: "Textmagic - 1",
    regex: new RegExp("(?:textmagic).{0,40}\\b([0-9A-Za-z]{30})\\b")
  },
  {
    name: "Textmagic - 2",
    regex: new RegExp("(?:textmagic).{0,40}\\b([0-9A-Za-z]{1,25})\\b")
  },
  {
    name: "Theoddsapi",
    regex: new RegExp("(?:theoddsapi|the-odds-api).{0,40}\\b([0-9a-f]{32})\\b")
  },
  {
    name: "Thinkific - 1",
    regex: new RegExp("(?:thinkific).{0,40}\\b([0-9a-f]{32})\\b")
  },
  {
    name: "Thinkific - 2",
    regex: new RegExp("(?:thinkific).{0,40}\\b([0-9A-Za-z]{4,40})\\b")
  },
  {
    name: "Thousandeyes - 1",
    regex: new RegExp("(?:thousandeyes).{0,40}\\b([a-zA-Z0-9]{32})\\b")
  },
  {
    name: "Thousandeyes - 2",
    regex: new RegExp("(?:thousandeyes).{0,40}\\b([a-zA-Z0-9]{3,20}@[a-zA-Z0-9]{2,12}.[a-zA-Z0-9]{2,5})\\b")
  },
  {
    name: "Ticketmaster",
    regex: new RegExp("(?:ticketmaster).{0,40}\\b([a-zA-Z0-9]{32})\\b")
  },
  {
    name: "Tiingo",
    regex: new RegExp("(?:tiingo).{0,40}\\b([0-9a-z]{40})\\b")
  },
  {
    name: "Timezoneapi",
    regex: new RegExp("(?:timezoneapi).{0,40}\\b([a-zA-Z0-9]{20})\\b")
  },
  { name: "Tly", regex: new RegExp("(?:tly).{0,40}\\b([0-9A-Za-z]{60})\\b") },
  {
    name: "Tmetric",
    regex: new RegExp("(?:tmetric).{0,40}\\b([0-9A-Z]{64})\\b")
  },
  {
    name: "Todoist",
    regex: new RegExp("(?:todoist).{0,40}\\b([0-9a-z]{40})\\b")
  },
  {
    name: "Toggltrack",
    regex: new RegExp("(?:toggl).{0,40}\\b([0-9Aa-z]{32})\\b")
  },
  {
    name: "Tomorrowio",
    regex: new RegExp("(?:tomorrow).{0,40}\\b([a-zA-Z0-9]{32})\\b")
  },
  {
    name: "Tomtom",
    regex: new RegExp("(?:tomtom).{0,40}\\b([0-9Aa-zA-Z]{32})\\b")
  },
  {
    name: "Tradier",
    regex: new RegExp("(?:tradier).{0,40}\\b([a-zA-Z0-9]{28})\\b")
  },
  {
    name: "Travelpayouts",
    regex: new RegExp("(?:travelpayouts).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Travisci",
    regex: new RegExp("(?:travis).{0,40}\\b([a-zA-Z0-9A-Z_]{22})\\b")
  },
  {
    name: "Trello URL",
    regex: new RegExp("https://trello.com/b/[0-9a-z]/[0-9a-z_-]+")
  },
  {
    name: "Trelloapikey - 2",
    regex: new RegExp("(?:trello).{0,40}\\b([a-zA-Z-0-9]{32})\\b")
  },
  {
    name: "Twelvedata",
    regex: new RegExp("(?:twelvedata).{0,40}\\b([a-z0-9]{32})\\b")
  },
  { name: "Twilio - 1", regex: new RegExp("\\bAC[0-9a-f]{32}\\b") },
  { name: "Twilio API Key", regex: new RegExp("SK[0-9a-fA-F]{32}") },
  {
    name: "Twitter Access Token",
    regex: new RegExp("[tT][wW][iI][tT][tT][eE][rR].*[1-9][0-9]+-[0-9a-zA-Z]{40}")
  },
  { name: "Twitter Client ID", regex: new RegExp("twitter[0-9a-z]{18,25}") },
  {
    name: "Twitter OAuth",
    regex: new RegExp(`[tT][wW][iI][tT][tT][eE][rR].*['|"][0-9a-zA-Z]{35,44}['|"]`)
  },
  { name: "Twitter Secret Key", regex: new RegExp("twitter[0-9a-z]{35,44}") },
  {
    name: "Tyntec",
    regex: new RegExp("(?:tyntec).{0,40}\\b([a-zA-Z0-9]{32})\\b")
  },
  {
    name: "Typeform",
    regex: new RegExp("(?:typeform).{0,40}\\b([0-9A-Za-z]{44})\\b")
  },
  { name: "Ubidots", regex: new RegExp("\\b(BBFF-[0-9a-zA-Z]{30})\\b") },
  {
    name: "Unifyid",
    regex: new RegExp("(?:unify).{0,40}\\b([0-9A-Za-z_=-]{44})")
  },
  {
    name: "Unplugg",
    regex: new RegExp("(?:unplu).{0,40}\\b([a-z0-9]{64})\\b")
  },
  {
    name: "Unsplash",
    regex: new RegExp("(?:unsplash).{0,40}\\b([0-9A-Za-z_]{43})\\b")
  },
  {
    name: "Upcdatabase",
    regex: new RegExp("(?:upcdatabase).{0,40}\\b([A-Z0-9]{32})\\b")
  },
  {
    name: "Uplead",
    regex: new RegExp("(?:uplead).{0,40}\\b([a-z0-9-]{32})\\b")
  },
  {
    name: "Uploadcare",
    regex: new RegExp("(?:uploadcare).{0,40}\\b([a-z0-9]{20})\\b")
  },
  {
    name: "Upwave",
    regex: new RegExp("(?:upwave).{0,40}\\b([0-9a-z]{32})\\b")
  },
  {
    name: "Uri",
    regex: new RegExp("\\b[a-zA-Z]{1,10}:?\\/\\/[-.%\\w{}]{1,50}:([-.%\\S]{3,50})@[-.%\\w\\/:]+\\b")
  },
  {
    name: "Urlscan",
    regex: new RegExp("(?:urlscan).{0,40}\\b([a-z0-9-]{36})\\b")
  },
  {
    name: "Userstack",
    regex: new RegExp("(?:userstack).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Vatlayer",
    regex: new RegExp("(?:vatlayer).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Vercel",
    regex: new RegExp("(?:vercel).{0,40}\\b([a-zA-Z0-9]{24})\\b")
  },
  {
    name: "Verifier - 1",
    regex: new RegExp("(?:verifier).{0,40}\\b([a-zA-Z-0-9-]{5,16}\\@[a-zA-Z-0-9]{4,16}\\.[a-zA-Z-0-9]{3,6})\\b")
  },
  {
    name: "Verifier - 2",
    regex: new RegExp("(?:verifier).{0,40}\\b([a-z0-9]{96})\\b")
  },
  {
    name: "Verimail",
    regex: new RegExp("(?:verimail).{0,40}\\b([A-Z0-9]{32})\\b")
  },
  {
    name: "Veriphone",
    regex: new RegExp("(?:veriphone).{0,40}\\b([0-9A-Z]{32})\\b")
  },
  {
    name: "Versioneye",
    regex: new RegExp("(?:versioneye).{0,40}\\b([a-zA-Z0-9-]{40})\\b")
  },
  {
    name: "Viewneo",
    regex: new RegExp("(?:viewneo).{0,40}\\b([a-z0-9A-Z]{120,300}.[a-z0-9A-Z]{150,300}.[a-z0-9A-Z-_]{600,800})")
  },
  {
    name: "Virustotal",
    regex: new RegExp("(?:virustotal).{0,40}\\b([a-f0-9]{64})\\b")
  },
  {
    name: "Visualcrossing",
    regex: new RegExp("(?:visualcrossing).{0,40}\\b([0-9A-Z]{25})\\b")
  },
  {
    name: "Voicegain",
    regex: new RegExp("(?:voicegain).{0,40}\\b(ey[0-9a-zA-Z_-]{34}.ey[0-9a-zA-Z_-]{108}.[0-9a-zA-Z_-]{43})\\b")
  },
  {
    name: "Vouchery - 1",
    regex: new RegExp("(?:vouchery).{0,40}\\b([a-z0-9-]{36})\\b")
  },
  {
    name: "Vouchery - 2",
    regex: new RegExp("(?:vouchery).{0,40}\\b([a-zA-Z0-9-\\S]{2,20})\\b")
  },
  {
    name: "Vpnapi",
    regex: new RegExp("(?:vpnapi).{0,40}\\b([a-z0-9A-Z]{32})\\b")
  },
  {
    name: "Vultrapikey",
    regex: new RegExp("(?:vultr).{0,40} \\b([A-Z0-9]{36})\\b")
  },
  { name: "Vyte", regex: new RegExp("(?:vyte).{0,40}\\b([0-9a-z]{50})\\b") },
  {
    name: "Walkscore",
    regex: new RegExp("(?:walkscore).{0,40}\\b([0-9a-z]{32})\\b")
  },
  {
    name: "Weatherbit",
    regex: new RegExp("(?:weatherbit).{0,40}\\b([0-9a-z]{32})\\b")
  },
  {
    name: "Weatherstack",
    regex: new RegExp("(?:weatherstack).{0,40}\\b([0-9a-z]{32})\\b")
  },
  {
    name: "Webex - 1",
    regex: new RegExp("(?:error).{0,40}(redirect_uri_mismatch)")
  },
  {
    name: "Webex - 2",
    regex: new RegExp("(?:webex).{0,40}\\b([A-Za-z0-9_-]{65})\\b")
  },
  {
    name: "Webex - 3",
    regex: new RegExp("(?:webex).{0,40}\\b([A-Za-z0-9_-]{64})\\b")
  },
  {
    name: "Webflow",
    regex: new RegExp("(?:webflow).{0,40}\\b([a-zA0-9]{64})\\b")
  },
  {
    name: "Webscraper",
    regex: new RegExp("(?:webscraper).{0,40}\\b([a-zA-Z0-9]{60})\\b")
  },
  {
    name: "Webscraping",
    regex: new RegExp("(?:webscraping).{0,40}\\b([0-9A-Za-z]{32})\\b")
  },
  {
    name: "Wepay - 2",
    regex: new RegExp("(?:wepay).{0,40}\\b([a-zA-Z0-9_?]{62})\\b")
  },
  { name: "Whoxy", regex: new RegExp("(?:whoxy).{0,40}\\b([0-9a-z]{33})\\b") },
  {
    name: "Worksnaps",
    regex: new RegExp("(?:worksnaps).{0,40}\\b([0-9A-Za-z]{40})\\b")
  },
  {
    name: "Workstack",
    regex: new RegExp("(?:workstack).{0,40}\\b([0-9Aa-zA-Z]{60})\\b")
  },
  {
    name: "Worldcoinindex",
    regex: new RegExp("(?:worldcoinindex).{0,40}\\b([a-zA-Z0-9]{35})\\b")
  },
  {
    name: "Worldweather",
    regex: new RegExp("(?:worldweather).{0,40}\\b([0-9a-z]{31})\\b")
  },
  {
    name: "Wrike",
    regex: new RegExp("(?:wrike).{0,40}\\b(ey[a-zA-Z0-9-._]{333})\\b")
  },
  {
    name: "Yandex",
    regex: new RegExp("(?:yandex).{0,40}\\b([a-z0-9A-Z.]{83})\\b")
  },
  {
    name: "Youneedabudget",
    regex: new RegExp("(?:youneedabudget).{0,40}\\b([0-9a-f]{64})\\b")
  },
  {
    name: "Yousign",
    regex: new RegExp("(?:yousign).{0,40}\\b([0-9a-z]{32})\\b")
  },
  {
    name: "Youtubeapikey - 1",
    regex: new RegExp("(?:youtube).{0,40}\\b([a-zA-Z-0-9_]{39})\\b")
  },
  {
    name: "Zapier Webhook",
    regex: new RegExp("https://(?:www.)?hooks\\.zapier\\.com/hooks/catch/[A-Za-z0-9]+/[A-Za-z0-9]+/")
  },
  {
    name: "Zapierwebhook",
    regex: new RegExp("(https:\\/\\/hooks.zapier.com\\/hooks\\/catch\\/[A-Za-z0-9\\/]{16})")
  },
  {
    name: "Zendeskapi - 3",
    regex: new RegExp("(?:zendesk).{0,40}([A-Za-z0-9_-]{40})")
  },
  {
    name: "Zenkitapi",
    regex: new RegExp("(?:zenkit).{0,40}\\b([0-9a-z]{8}\\-[0-9A-Za-z]{32})\\b")
  },
  {
    name: "Zenscrape",
    regex: new RegExp("(?:zenscrape).{0,40}\\b([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\\b")
  },
  {
    name: "Zenserp",
    regex: new RegExp("(?:zenserp).{0,40}\\b([0-9a-z-]{36})\\b")
  },
  {
    name: "Zeplin",
    regex: new RegExp("(?:zeplin).{0,40}\\b([a-zA-Z0-9-.]{350,400})\\b")
  },
  {
    name: "Zerobounce",
    regex: new RegExp("(?:zerobounce).{0,40}\\b([a-z0-9]{32})\\b")
  },
  {
    name: "Zipapi - 1",
    regex: new RegExp("(?:zipapi).{0,40}\\b([a-zA-Z0-9!=@#$%^]{7,})")
  },
  {
    name: "Zipapi - 3",
    regex: new RegExp("(?:zipapi).{0,40}\\b([0-9a-z]{32})\\b")
  },
  {
    name: "Zipcodeapi",
    regex: new RegExp("(?:zipcodeapi).{0,40}\\b([a-zA-Z0-9]{64})\\b")
  },
  {
    name: "Zoho Webhook",
    regex: new RegExp("https://creator\\.zoho\\.com/api/[A-Za-z0-9/\\-_\\.]+\\?authtoken=[A-Za-z0-9]+")
  },
  {
    name: "Zonkafeedback",
    regex: new RegExp("(?:zonka).{0,40}\\b([A-Za-z0-9]{36})\\b")
  },
  {
    name: "access_key_secret",
    regex: new RegExp("access[_-]?key[_-]?secret(=| =|:| :)")
  },
  { name: "access_secret", regex: new RegExp("access[_-]?secret(=| =|:| :)") },
  { name: "access_token", regex: new RegExp("access[_-]?token(=| =|:| :)") },
  { name: "account_sid", regex: new RegExp("account[_-]?sid(=| =|:| :)") },
  { name: "admin_email", regex: new RegExp("admin[_-]?email(=| =|:| :)") },
  {
    name: "adzerk_api_key",
    regex: new RegExp("adzerk[_-]?api[_-]?key(=| =|:| :)")
  },
  {
    name: "algolia_admin_key_1",
    regex: new RegExp("algolia[_-]?admin[_-]?key[_-]?1(=| =|:| :)")
  },
  {
    name: "algolia_admin_key_2",
    regex: new RegExp("algolia[_-]?admin[_-]?key[_-]?2(=| =|:| :)")
  },
  {
    name: "algolia_admin_key_mcm",
    regex: new RegExp("algolia[_-]?admin[_-]?key[_-]?mcm(=| =|:| :)")
  },
  {
    name: "algolia_api_key",
    regex: new RegExp("algolia[_-]?api[_-]?key(=| =|:| :)")
  },
  {
    name: "algolia_api_key_mcm",
    regex: new RegExp("algolia[_-]?api[_-]?key[_-]?mcm(=| =|:| :)")
  },
  {
    name: "algolia_api_key_search",
    regex: new RegExp("algolia[_-]?api[_-]?key[_-]?search(=| =|:| :)")
  },
  {
    name: "algolia_search_api_key",
    regex: new RegExp("algolia[_-]?search[_-]?api[_-]?key(=| =|:| :)")
  },
  {
    name: "algolia_search_key",
    regex: new RegExp("algolia[_-]?search[_-]?key(=| =|:| :)")
  },
  {
    name: "algolia_search_key_1",
    regex: new RegExp("algolia[_-]?search[_-]?key[_-]?1(=| =|:| :)")
  },
  { name: "alias_pass", regex: new RegExp("alias[_-]?pass(=| =|:| :)") },
  {
    name: "alicloud_access_key",
    regex: new RegExp("alicloud[_-]?access[_-]?key(=| =|:| :)")
  },
  {
    name: "alicloud_secret_key",
    regex: new RegExp("alicloud[_-]?secret[_-]?key(=| =|:| :)")
  },
  {
    name: "amazon_bucket_name",
    regex: new RegExp("amazon[_-]?bucket[_-]?name(=| =|:| :)")
  },
  {
    name: "amazon_secret_access_key",
    regex: new RegExp("amazon[_-]?secret[_-]?access[_-]?key(=| =|:| :)")
  },
  {
    name: "anaconda_token",
    regex: new RegExp("anaconda[_-]?token(=| =|:| :)")
  },
  {
    name: "android_docs_deploy_token",
    regex: new RegExp("android[_-]?docs[_-]?deploy[_-]?token(=| =|:| :)")
  },
  {
    name: "ansible_vault_password",
    regex: new RegExp("ansible[_-]?vault[_-]?password(=| =|:| :)")
  },
  { name: "aos_key", regex: new RegExp("aos[_-]?key(=| =|:| :)") },
  { name: "aos_sec", regex: new RegExp("aos[_-]?sec(=| =|:| :)") },
  { name: "api_key", regex: new RegExp("api[_-]?key(=| =|:| :)") },
  {
    name: "api_key_secret",
    regex: new RegExp("api[_-]?key[_-]?secret(=| =|:| :)")
  },
  { name: "api_key_sid", regex: new RegExp("api[_-]?key[_-]?sid(=| =|:| :)") },
  { name: "api_secret", regex: new RegExp("api[_-]?secret(=| =|:| :)") },
  {
    name: "apiary_api_key",
    regex: new RegExp("apiary[_-]?api[_-]?key(=| =|:| :)")
  },
  {
    name: "apigw_access_token",
    regex: new RegExp("apigw[_-]?access[_-]?token(=| =|:| :)")
  },
  {
    name: "apikey_patterns",
    regex: new RegExp(`apikey[:](?:['"]?[a-zA-Z0-9-_|]+['"]?)`)
  },
  {
    name: "app_bucket_perm",
    regex: new RegExp("app[_-]?bucket[_-]?perm(=| =|:| :)")
  },
  {
    name: "app_report_token_key",
    regex: new RegExp("app[_-]?report[_-]?token[_-]?key(=| =|:| :)")
  },
  { name: "app_secrete", regex: new RegExp("app[_-]?secrete(=| =|:| :)") },
  { name: "app_token", regex: new RegExp("app[_-]?token(=| =|:| :)") },
  { name: "appclientsecret", regex: new RegExp("appclientsecret(=| =|:| :)") },
  {
    name: "apple_id_password",
    regex: new RegExp("apple[_-]?id[_-]?password(=| =|:| :)")
  },
  { name: "argos_token", regex: new RegExp("argos[_-]?token(=| =|:| :)") },
  {
    name: "artifactory",
    regex: new RegExp(`(artifactory.{0,50}("|')?[a-zA-Z0-9=]{112}("|')?)`)
  },
  {
    name: "artifactory_key",
    regex: new RegExp("artifactory[_-]?key(=| =|:| :)")
  },
  {
    name: "artifacts_aws_access_key_id",
    regex: new RegExp("artifacts[_-]?aws[_-]?access[_-]?key[_-]?id(=| =|:| :)")
  },
  {
    name: "artifacts_aws_secret_access_key",
    regex: new RegExp("artifacts[_-]?aws[_-]?secret[_-]?access[_-]?key(=| =|:| :)")
  },
  {
    name: "artifacts_bucket",
    regex: new RegExp("artifacts[_-]?bucket(=| =|:| :)")
  },
  { name: "artifacts_key", regex: new RegExp("artifacts[_-]?key(=| =|:| :)") },
  {
    name: "artifacts_secret",
    regex: new RegExp("artifacts[_-]?secret(=| =|:| :)")
  },
  {
    name: "assistant_iam_apikey",
    regex: new RegExp("assistant[_-]?iam[_-]?apikey(=| =|:| :)")
  },
  {
    name: "auth0_api_clientsecret",
    regex: new RegExp("auth0[_-]?api[_-]?clientsecret(=| =|:| :)")
  },
  {
    name: "auth0_client_secret",
    regex: new RegExp("auth0[_-]?client[_-]?secret(=| =|:| :)")
  },
  { name: "auth_token", regex: new RegExp("auth[_-]?token(=| =|:| :)") },
  {
    name: "author_email_addr",
    regex: new RegExp("author[_-]?email[_-]?addr(=| =|:| :)")
  },
  {
    name: "author_npm_api_key",
    regex: new RegExp("author[_-]?npm[_-]?api[_-]?key(=| =|:| :)")
  },
  { name: "aws_access", regex: new RegExp("aws[_-]?access(=| =|:| :)") },
  {
    name: "aws_access_key",
    regex: new RegExp("aws[_-]?access[_-]?key(=| =|:| :)")
  },
  {
    name: "aws_access_key_id - 1",
    regex: new RegExp("aws[_-]?access[_-]?key[_-]?id(=| =|:| :)")
  },
  {
    name: "aws_config_accesskeyid",
    regex: new RegExp("aws[_-]?config[_-]?accesskeyid(=| =|:| :)")
  },
  {
    name: "aws_config_secretaccesskey",
    regex: new RegExp("aws[_-]?config[_-]?secretaccesskey(=| =|:| :)")
  },
  { name: "aws_key", regex: new RegExp("aws[_-]?key(=| =|:| :)") },
  {
    name: "aws_patterns",
    regex: new RegExp("(?:accesskeyid|secretaccesskey|aws_access_key_id|aws_secret_access_key)")
  },
  { name: "aws_secret", regex: new RegExp("aws[_-]?secret(=| =|:| :)") },
  {
    name: "aws_secret_access_key",
    regex: new RegExp("aws[_-]?secret[_-]?access[_-]?key(=| =|:| :)")
  },
  {
    name: "aws_secret_key",
    regex: new RegExp("aws[_-]?secret[_-]?key(=| =|:| :)")
  },
  { name: "aws_secrets", regex: new RegExp("aws[_-]?secrets(=| =|:| :)") },
  {
    name: "aws_ses_access_key_id",
    regex: new RegExp("aws[_-]?ses[_-]?access[_-]?key[_-]?id(=| =|:| :)")
  },
  {
    name: "aws_ses_secret_access_key",
    regex: new RegExp("aws[_-]?ses[_-]?secret[_-]?access[_-]?key(=| =|:| :)")
  },
  { name: "awsaccesskeyid", regex: new RegExp("awsaccesskeyid(=| =|:| :)") },
  {
    name: "awscn_access_key_id",
    regex: new RegExp("awscn[_-]?access[_-]?key[_-]?id(=| =|:| :)")
  },
  {
    name: "awscn_secret_access_key",
    regex: new RegExp("awscn[_-]?secret[_-]?access[_-]?key(=| =|:| :)")
  },
  { name: "awssecretkey", regex: new RegExp("awssecretkey(=| =|:| :)") },
  { name: "b2_app_key", regex: new RegExp("b2[_-]?app[_-]?key(=| =|:| :)") },
  { name: "b2_bucket", regex: new RegExp("b2[_-]?bucket(=| =|:| :)") },
  {
    name: "bintray_api_key",
    regex: new RegExp("bintray[_-]?api[_-]?key(=| =|:| :)")
  },
  {
    name: "bintray_apikey",
    regex: new RegExp("bintray[_-]?apikey(=| =|:| :)")
  },
  {
    name: "bintray_gpg_password",
    regex: new RegExp("bintray[_-]?gpg[_-]?password(=| =|:| :)")
  },
  { name: "bintray_key", regex: new RegExp("bintray[_-]?key(=| =|:| :)") },
  { name: "bintray_token", regex: new RegExp("bintray[_-]?token(=| =|:| :)") },
  { name: "bintraykey", regex: new RegExp("bintraykey(=| =|:| :)") },
  {
    name: "bluemix_api_key",
    regex: new RegExp("bluemix[_-]?api[_-]?key(=| =|:| :)")
  },
  { name: "bluemix_auth", regex: new RegExp("bluemix[_-]?auth(=| =|:| :)") },
  { name: "bluemix_pass", regex: new RegExp("bluemix[_-]?pass(=| =|:| :)") },
  {
    name: "bluemix_pass_prod",
    regex: new RegExp("bluemix[_-]?pass[_-]?prod(=| =|:| :)")
  },
  {
    name: "bluemix_password",
    regex: new RegExp("bluemix[_-]?password(=| =|:| :)")
  },
  { name: "bluemix_pwd", regex: new RegExp("bluemix[_-]?pwd(=| =|:| :)") },
  {
    name: "bluemix_username",
    regex: new RegExp("bluemix[_-]?username(=| =|:| :)")
  },
  {
    name: "brackets_repo_oauth_token",
    regex: new RegExp("brackets[_-]?repo[_-]?oauth[_-]?token(=| =|:| :)")
  },
  {
    name: "browser_stack_access_key",
    regex: new RegExp("browser[_-]?stack[_-]?access[_-]?key(=| =|:| :)")
  },
  {
    name: "browserstack_access_key",
    regex: new RegExp("browserstack[_-]?access[_-]?key(=| =|:| :)")
  },
  {
    name: "bucketeer_aws_access_key_id",
    regex: new RegExp("bucketeer[_-]?aws[_-]?access[_-]?key[_-]?id(=| =|:| :)")
  },
  {
    name: "bucketeer_aws_secret_access_key",
    regex: new RegExp("bucketeer[_-]?aws[_-]?secret[_-]?access[_-]?key(=| =|:| :)")
  },
  {
    name: "built_branch_deploy_key",
    regex: new RegExp("built[_-]?branch[_-]?deploy[_-]?key(=| =|:| :)")
  },
  {
    name: "bundlesize_github_token",
    regex: new RegExp("bundlesize[_-]?github[_-]?token(=| =|:| :)")
  },
  { name: "bx_password", regex: new RegExp("bx[_-]?password(=| =|:| :)") },
  { name: "bx_username", regex: new RegExp("bx[_-]?username(=| =|:| :)") },
  {
    name: "cache_s3_secret_key",
    regex: new RegExp("cache[_-]?s3[_-]?secret[_-]?key(=| =|:| :)")
  },
  { name: "cargo_token", regex: new RegExp("cargo[_-]?token(=| =|:| :)") },
  {
    name: "cattle_access_key",
    regex: new RegExp("cattle[_-]?access[_-]?key(=| =|:| :)")
  },
  {
    name: "cattle_agent_instance_auth",
    regex: new RegExp("cattle[_-]?agent[_-]?instance[_-]?auth(=| =|:| :)")
  },
  {
    name: "cattle_secret_key",
    regex: new RegExp("cattle[_-]?secret[_-]?key(=| =|:| :)")
  },
  { name: "censys_secret", regex: new RegExp("censys[_-]?secret(=| =|:| :)") },
  {
    name: "certificate_password",
    regex: new RegExp("certificate[_-]?password(=| =|:| :)")
  },
  { name: "cf_password", regex: new RegExp("cf[_-]?password(=| =|:| :)") },
  {
    name: "cheverny_token",
    regex: new RegExp("cheverny[_-]?token(=| =|:| :)")
  },
  {
    name: "chrome_client_secret",
    regex: new RegExp("chrome[_-]?client[_-]?secret(=| =|:| :)")
  },
  {
    name: "chrome_refresh_token",
    regex: new RegExp("chrome[_-]?refresh[_-]?token(=| =|:| :)")
  },
  {
    name: "ci_deploy_password",
    regex: new RegExp("ci[_-]?deploy[_-]?password(=| =|:| :)")
  },
  {
    name: "ci_project_url",
    regex: new RegExp("ci[_-]?project[_-]?url(=| =|:| :)")
  },
  {
    name: "ci_registry_user",
    regex: new RegExp("ci[_-]?registry[_-]?user(=| =|:| :)")
  },
  {
    name: "ci_server_name",
    regex: new RegExp("ci[_-]?server[_-]?name(=| =|:| :)")
  },
  {
    name: "ci_user_token",
    regex: new RegExp("ci[_-]?user[_-]?token(=| =|:| :)")
  },
  {
    name: "claimr_database",
    regex: new RegExp("claimr[_-]?database(=| =|:| :)")
  },
  { name: "claimr_db", regex: new RegExp("claimr[_-]?db(=| =|:| :)") },
  {
    name: "claimr_superuser",
    regex: new RegExp("claimr[_-]?superuser(=| =|:| :)")
  },
  { name: "claimr_token", regex: new RegExp("claimr[_-]?token(=| =|:| :)") },
  {
    name: "cli_e2e_cma_token",
    regex: new RegExp("cli[_-]?e2e[_-]?cma[_-]?token(=| =|:| :)")
  },
  { name: "client_secret", regex: new RegExp("client[_-]?secret(=| =|:| :)") },
  {
    name: "clojars_password",
    regex: new RegExp("clojars[_-]?password(=| =|:| :)")
  },
  {
    name: "cloud_api_key",
    regex: new RegExp("cloud[_-]?api[_-]?key(=| =|:| :)")
  },
  {
    name: "cloudant_archived_database",
    regex: new RegExp("cloudant[_-]?archived[_-]?database(=| =|:| :)")
  },
  {
    name: "cloudant_audited_database",
    regex: new RegExp("cloudant[_-]?audited[_-]?database(=| =|:| :)")
  },
  {
    name: "cloudant_database",
    regex: new RegExp("cloudant[_-]?database(=| =|:| :)")
  },
  {
    name: "cloudant_instance",
    regex: new RegExp("cloudant[_-]?instance(=| =|:| :)")
  },
  {
    name: "cloudant_order_database",
    regex: new RegExp("cloudant[_-]?order[_-]?database(=| =|:| :)")
  },
  {
    name: "cloudant_parsed_database",
    regex: new RegExp("cloudant[_-]?parsed[_-]?database(=| =|:| :)")
  },
  {
    name: "cloudant_password",
    regex: new RegExp("cloudant[_-]?password(=| =|:| :)")
  },
  {
    name: "cloudant_processed_database",
    regex: new RegExp("cloudant[_-]?processed[_-]?database(=| =|:| :)")
  },
  {
    name: "cloudant_service_database",
    regex: new RegExp("cloudant[_-]?service[_-]?database(=| =|:| :)")
  },
  {
    name: "cloudflare_api_key",
    regex: new RegExp("cloudflare[_-]?api[_-]?key(=| =|:| :)")
  },
  {
    name: "cloudflare_auth_email",
    regex: new RegExp("cloudflare[_-]?auth[_-]?email(=| =|:| :)")
  },
  {
    name: "cloudflare_auth_key",
    regex: new RegExp("cloudflare[_-]?auth[_-]?key(=| =|:| :)")
  },
  {
    name: "cloudflare_email",
    regex: new RegExp("cloudflare[_-]?email(=| =|:| :)")
  },
  {
    name: "cloudinary_url",
    regex: new RegExp("cloudinary[_-]?url(=| =|:| :)")
  },
  {
    name: "cloudinary_url_staging",
    regex: new RegExp("cloudinary[_-]?url[_-]?staging(=| =|:| :)")
  },
  {
    name: "clu_repo_url",
    regex: new RegExp("clu[_-]?repo[_-]?url(=| =|:| :)")
  },
  {
    name: "clu_ssh_private_key_base64",
    regex: new RegExp("clu[_-]?ssh[_-]?private[_-]?key[_-]?base64(=| =|:| :)")
  },
  {
    name: "cn_access_key_id",
    regex: new RegExp("cn[_-]?access[_-]?key[_-]?id(=| =|:| :)")
  },
  {
    name: "cn_secret_access_key",
    regex: new RegExp("cn[_-]?secret[_-]?access[_-]?key(=| =|:| :)")
  },
  {
    name: "cocoapods_trunk_email",
    regex: new RegExp("cocoapods[_-]?trunk[_-]?email(=| =|:| :)")
  },
  {
    name: "cocoapods_trunk_token",
    regex: new RegExp("cocoapods[_-]?trunk[_-]?token(=| =|:| :)")
  },
  {
    name: "codacy_project_token",
    regex: new RegExp("codacy[_-]?project[_-]?token(=| =|:| :)")
  },
  {
    name: "codeclimate",
    regex: new RegExp(`(codeclima.{0,50}("|')?[0-9a-f]{64}("|')?)`)
  },
  {
    name: "codeclimate_repo_token",
    regex: new RegExp("codeclimate[_-]?repo[_-]?token(=| =|:| :)")
  },
  { name: "codecov_token", regex: new RegExp("codecov[_-]?token(=| =|:| :)") },
  { name: "coding_token", regex: new RegExp("coding[_-]?token(=| =|:| :)") },
  {
    name: "conekta_apikey",
    regex: new RegExp("conekta[_-]?apikey(=| =|:| :)")
  },
  { name: "consumer_key", regex: new RegExp("consumer[_-]?key(=| =|:| :)") },
  { name: "consumerkey", regex: new RegExp("consumerkey(=| =|:| :)") },
  {
    name: "contentful_access_token",
    regex: new RegExp("contentful[_-]?access[_-]?token(=| =|:| :)")
  },
  {
    name: "contentful_cma_test_token",
    regex: new RegExp("contentful[_-]?cma[_-]?test[_-]?token(=| =|:| :)")
  },
  {
    name: "contentful_integration_management_token",
    regex: new RegExp("contentful[_-]?integration[_-]?management[_-]?token(=| =|:| :)")
  },
  {
    name: "contentful_php_management_test_token",
    regex: new RegExp("contentful[_-]?php[_-]?management[_-]?test[_-]?token(=| =|:| :)")
  },
  {
    name: "contentful_test_org_cma_token",
    regex: new RegExp("contentful[_-]?test[_-]?org[_-]?cma[_-]?token(=| =|:| :)")
  },
  {
    name: "contentful_v2_access_token",
    regex: new RegExp("contentful[_-]?v2[_-]?access[_-]?token(=| =|:| :)")
  },
  {
    name: "conversation_password",
    regex: new RegExp("conversation[_-]?password(=| =|:| :)")
  },
  {
    name: "conversation_username",
    regex: new RegExp("conversation[_-]?username(=| =|:| :)")
  },
  { name: "cos_secrets", regex: new RegExp("cos[_-]?secrets(=| =|:| :)") },
  {
    name: "coveralls_api_token",
    regex: new RegExp("coveralls[_-]?api[_-]?token(=| =|:| :)")
  },
  {
    name: "coveralls_repo_token",
    regex: new RegExp("coveralls[_-]?repo[_-]?token(=| =|:| :)")
  },
  {
    name: "coveralls_token",
    regex: new RegExp("coveralls[_-]?token(=| =|:| :)")
  },
  {
    name: "coverity_scan_token",
    regex: new RegExp("coverity[_-]?scan[_-]?token(=| =|:| :)")
  },
  {
    name: "cypress_record_key",
    regex: new RegExp("cypress[_-]?record[_-]?key(=| =|:| :)")
  },
  {
    name: "danger_github_api_token",
    regex: new RegExp("danger[_-]?github[_-]?api[_-]?token(=| =|:| :)")
  },
  { name: "database_host", regex: new RegExp("database[_-]?host(=| =|:| :)") },
  { name: "database_name", regex: new RegExp("database[_-]?name(=| =|:| :)") },
  {
    name: "database_password",
    regex: new RegExp("database[_-]?password(=| =|:| :)")
  },
  { name: "database_port", regex: new RegExp("database[_-]?port(=| =|:| :)") },
  { name: "database_user", regex: new RegExp("database[_-]?user(=| =|:| :)") },
  {
    name: "database_username",
    regex: new RegExp("database[_-]?username(=| =|:| :)")
  },
  {
    name: "datadog_api_key",
    regex: new RegExp("datadog[_-]?api[_-]?key(=| =|:| :)")
  },
  {
    name: "datadog_app_key",
    regex: new RegExp("datadog[_-]?app[_-]?key(=| =|:| :)")
  },
  { name: "db_connection", regex: new RegExp("db[_-]?connection(=| =|:| :)") },
  { name: "db_database", regex: new RegExp("db[_-]?database(=| =|:| :)") },
  { name: "db_host", regex: new RegExp("db[_-]?host(=| =|:| :)") },
  { name: "db_password", regex: new RegExp("db[_-]?password(=| =|:| :)") },
  { name: "db_pw", regex: new RegExp("db[_-]?pw(=| =|:| :)") },
  { name: "db_user", regex: new RegExp("db[_-]?user(=| =|:| :)") },
  { name: "db_username", regex: new RegExp("db[_-]?username(=| =|:| :)") },
  {
    name: "ddg_test_email",
    regex: new RegExp("ddg[_-]?test[_-]?email(=| =|:| :)")
  },
  {
    name: "ddg_test_email_pw",
    regex: new RegExp("ddg[_-]?test[_-]?email[_-]?pw(=| =|:| :)")
  },
  {
    name: "ddgc_github_token",
    regex: new RegExp("ddgc[_-]?github[_-]?token(=| =|:| :)")
  },
  {
    name: "deploy_password",
    regex: new RegExp("deploy[_-]?password(=| =|:| :)")
  },
  { name: "deploy_secure", regex: new RegExp("deploy[_-]?secure(=| =|:| :)") },
  { name: "deploy_token", regex: new RegExp("deploy[_-]?token(=| =|:| :)") },
  { name: "deploy_user", regex: new RegExp("deploy[_-]?user(=| =|:| :)") },
  {
    name: "dgpg_passphrase",
    regex: new RegExp("dgpg[_-]?passphrase(=| =|:| :)")
  },
  {
    name: "digitalocean_access_token",
    regex: new RegExp("digitalocean[_-]?access[_-]?token(=| =|:| :)")
  },
  {
    name: "digitalocean_ssh_key_body",
    regex: new RegExp("digitalocean[_-]?ssh[_-]?key[_-]?body(=| =|:| :)")
  },
  {
    name: "digitalocean_ssh_key_ids",
    regex: new RegExp("digitalocean[_-]?ssh[_-]?key[_-]?ids(=| =|:| :)")
  },
  {
    name: "docker_hub_password",
    regex: new RegExp("docker[_-]?hub[_-]?password(=| =|:| :)")
  },
  { name: "docker_key", regex: new RegExp("docker[_-]?key(=| =|:| :)") },
  { name: "docker_pass", regex: new RegExp("docker[_-]?pass(=| =|:| :)") },
  { name: "docker_passwd", regex: new RegExp("docker[_-]?passwd(=| =|:| :)") },
  {
    name: "docker_password",
    regex: new RegExp("docker[_-]?password(=| =|:| :)")
  },
  {
    name: "docker_postgres_url",
    regex: new RegExp("docker[_-]?postgres[_-]?url(=| =|:| :)")
  },
  { name: "docker_token", regex: new RegExp("docker[_-]?token(=| =|:| :)") },
  {
    name: "dockerhub_password",
    regex: new RegExp("dockerhub[_-]?password(=| =|:| :)")
  },
  {
    name: "dockerhubpassword",
    regex: new RegExp("dockerhubpassword(=| =|:| :)")
  },
  {
    name: "doordash_auth_token",
    regex: new RegExp("doordash[_-]?auth[_-]?token(=| =|:| :)")
  },
  {
    name: "dropbox_oauth_bearer",
    regex: new RegExp("dropbox[_-]?oauth[_-]?bearer(=| =|:| :)")
  },
  {
    name: "droplet_travis_password",
    regex: new RegExp("droplet[_-]?travis[_-]?password(=| =|:| :)")
  },
  { name: "dsonar_login", regex: new RegExp("dsonar[_-]?login(=| =|:| :)") },
  {
    name: "dsonar_projectkey",
    regex: new RegExp("dsonar[_-]?projectkey(=| =|:| :)")
  },
  {
    name: "elastic_cloud_auth",
    regex: new RegExp("elastic[_-]?cloud[_-]?auth(=| =|:| :)")
  },
  {
    name: "elasticsearch_password",
    regex: new RegExp("elasticsearch[_-]?password(=| =|:| :)")
  },
  {
    name: "encryption_password",
    regex: new RegExp("encryption[_-]?password(=| =|:| :)")
  },
  {
    name: "end_user_password",
    regex: new RegExp("end[_-]?user[_-]?password(=| =|:| :)")
  },
  {
    name: "env_github_oauth_token",
    regex: new RegExp("env[_-]?github[_-]?oauth[_-]?token(=| =|:| :)")
  },
  {
    name: "env_heroku_api_key",
    regex: new RegExp("env[_-]?heroku[_-]?api[_-]?key(=| =|:| :)")
  },
  { name: "env_key", regex: new RegExp("env[_-]?key(=| =|:| :)") },
  { name: "env_secret", regex: new RegExp("env[_-]?secret(=| =|:| :)") },
  {
    name: "env_secret_access_key",
    regex: new RegExp("env[_-]?secret[_-]?access[_-]?key(=| =|:| :)")
  },
  {
    name: "env_sonatype_password",
    regex: new RegExp("env[_-]?sonatype[_-]?password(=| =|:| :)")
  },
  {
    name: "eureka_awssecretkey",
    regex: new RegExp("eureka[_-]?awssecretkey(=| =|:| :)")
  },
  { name: "exp_password", regex: new RegExp("exp[_-]?password(=| =|:| :)") },
  {
    name: "facebook_access_token",
    regex: new RegExp("(EAACEdEose0cBA[0-9A-Za-z]+)")
  },
  {
    name: "facebook_oauth",
    regex: new RegExp(`[f|F][a|A][c|C][e|E][b|B][o|O][o|O][k|K].*['|"][0-9a-f]{32}['|"]`)
  },
  { name: "file_password", regex: new RegExp("file[_-]?password(=| =|:| :)") },
  {
    name: "firebase_api_json",
    regex: new RegExp("firebase[_-]?api[_-]?json(=| =|:| :)")
  },
  {
    name: "firebase_api_token",
    regex: new RegExp("firebase[_-]?api[_-]?token(=| =|:| :)")
  },
  { name: "firebase_key", regex: new RegExp("firebase[_-]?key(=| =|:| :)") },
  {
    name: "firebase_project_develop",
    regex: new RegExp("firebase[_-]?project[_-]?develop(=| =|:| :)")
  },
  {
    name: "firebase_token",
    regex: new RegExp("firebase[_-]?token(=| =|:| :)")
  },
  {
    name: "firefox_secret",
    regex: new RegExp("firefox[_-]?secret(=| =|:| :)")
  },
  {
    name: "flask_secret_key",
    regex: new RegExp("flask[_-]?secret[_-]?key(=| =|:| :)")
  },
  {
    name: "flickr_api_key",
    regex: new RegExp("flickr[_-]?api[_-]?key(=| =|:| :)")
  },
  {
    name: "flickr_api_secret",
    regex: new RegExp("flickr[_-]?api[_-]?secret(=| =|:| :)")
  },
  {
    name: "fossa_api_key",
    regex: new RegExp("fossa[_-]?api[_-]?key(=| =|:| :)")
  },
  { name: "ftp_host", regex: new RegExp("ftp[_-]?host(=| =|:| :)") },
  { name: "ftp_login", regex: new RegExp("ftp[_-]?login(=| =|:| :)") },
  { name: "ftp_password", regex: new RegExp("ftp[_-]?password(=| =|:| :)") },
  { name: "ftp_pw", regex: new RegExp("ftp[_-]?pw(=| =|:| :)") },
  { name: "ftp_user", regex: new RegExp("ftp[_-]?user(=| =|:| :)") },
  { name: "ftp_username", regex: new RegExp("ftp[_-]?username(=| =|:| :)") },
  { name: "gcloud_bucket", regex: new RegExp("gcloud[_-]?bucket(=| =|:| :)") },
  {
    name: "gcloud_project",
    regex: new RegExp("gcloud[_-]?project(=| =|:| :)")
  },
  {
    name: "gcloud_service_key",
    regex: new RegExp("gcloud[_-]?service[_-]?key(=| =|:| :)")
  },
  { name: "gcr_password", regex: new RegExp("gcr[_-]?password(=| =|:| :)") },
  { name: "gcs_bucket", regex: new RegExp("gcs[_-]?bucket(=| =|:| :)") },
  { name: "gh_api_key", regex: new RegExp("gh[_-]?api[_-]?key(=| =|:| :)") },
  { name: "gh_email", regex: new RegExp("gh[_-]?email(=| =|:| :)") },
  {
    name: "gh_next_oauth_client_secret",
    regex: new RegExp("gh[_-]?next[_-]?oauth[_-]?client[_-]?secret(=| =|:| :)")
  },
  {
    name: "gh_next_unstable_oauth_client_id",
    regex: new RegExp("gh[_-]?next[_-]?unstable[_-]?oauth[_-]?client[_-]?id(=| =|:| :)")
  },
  {
    name: "gh_next_unstable_oauth_client_secret",
    regex: new RegExp("gh[_-]?next[_-]?unstable[_-]?oauth[_-]?client[_-]?secret(=| =|:| :)")
  },
  {
    name: "gh_oauth_client_secret",
    regex: new RegExp("gh[_-]?oauth[_-]?client[_-]?secret(=| =|:| :)")
  },
  {
    name: "gh_oauth_token",
    regex: new RegExp("gh[_-]?oauth[_-]?token(=| =|:| :)")
  },
  {
    name: "gh_repo_token",
    regex: new RegExp("gh[_-]?repo[_-]?token(=| =|:| :)")
  },
  { name: "gh_token", regex: new RegExp("gh[_-]?token(=| =|:| :)") },
  {
    name: "gh_unstable_oauth_client_secret",
    regex: new RegExp("gh[_-]?unstable[_-]?oauth[_-]?client[_-]?secret(=| =|:| :)")
  },
  { name: "ghb_token", regex: new RegExp("ghb[_-]?token(=| =|:| :)") },
  {
    name: "ghost_api_key",
    regex: new RegExp("ghost[_-]?api[_-]?key(=| =|:| :)")
  },
  {
    name: "git_author_email",
    regex: new RegExp("git[_-]?author[_-]?email(=| =|:| :)")
  },
  {
    name: "git_author_name",
    regex: new RegExp("git[_-]?author[_-]?name(=| =|:| :)")
  },
  {
    name: "git_committer_email",
    regex: new RegExp("git[_-]?committer[_-]?email(=| =|:| :)")
  },
  {
    name: "git_committer_name",
    regex: new RegExp("git[_-]?committer[_-]?name(=| =|:| :)")
  },
  { name: "git_email", regex: new RegExp("git[_-]?email(=| =|:| :)") },
  { name: "git_name", regex: new RegExp("git[_-]?name(=| =|:| :)") },
  { name: "git_token", regex: new RegExp("git[_-]?token(=| =|:| :)") },
  {
    name: "github_access_token - 1",
    regex: new RegExp("github[_-]?access[_-]?token(=| =|:| :)")
  },
  {
    name: "github_access_token - 2",
    regex: new RegExp("[a-zA-Z0-9_-]*:[a-zA-Z0-9_-]+@github.com*")
  },
  {
    name: "github_api_key",
    regex: new RegExp("github[_-]?api[_-]?key(=| =|:| :)")
  },
  {
    name: "github_api_token",
    regex: new RegExp("github[_-]?api[_-]?token(=| =|:| :)")
  },
  { name: "github_auth", regex: new RegExp("github[_-]?auth(=| =|:| :)") },
  {
    name: "github_auth_token",
    regex: new RegExp("github[_-]?auth[_-]?token(=| =|:| :)")
  },
  {
    name: "github_client_secret",
    regex: new RegExp("github[_-]?client[_-]?secret(=| =|:| :)")
  },
  {
    name: "github_deploy_hb_doc_pass",
    regex: new RegExp("github[_-]?deploy[_-]?hb[_-]?doc[_-]?pass(=| =|:| :)")
  },
  {
    name: "github_deployment_token",
    regex: new RegExp("github[_-]?deployment[_-]?token(=| =|:| :)")
  },
  {
    name: "github_hunter_token",
    regex: new RegExp("github[_-]?hunter[_-]?token(=| =|:| :)")
  },
  {
    name: "github_hunter_username",
    regex: new RegExp("github[_-]?hunter[_-]?username(=| =|:| :)")
  },
  { name: "github_key", regex: new RegExp("github[_-]?key(=| =|:| :)") },
  { name: "github_oauth", regex: new RegExp("github[_-]?oauth(=| =|:| :)") },
  {
    name: "github_oauth_token",
    regex: new RegExp("github[_-]?oauth[_-]?token(=| =|:| :)")
  },
  {
    name: "github_password",
    regex: new RegExp("github[_-]?password(=| =|:| :)")
  },
  { name: "github_pwd", regex: new RegExp("github[_-]?pwd(=| =|:| :)") },
  {
    name: "github_release_token",
    regex: new RegExp("github[_-]?release[_-]?token(=| =|:| :)")
  },
  { name: "github_repo", regex: new RegExp("github[_-]?repo(=| =|:| :)") },
  { name: "github_token", regex: new RegExp("github[_-]?token(=| =|:| :)") },
  { name: "github_tokens", regex: new RegExp("github[_-]?tokens(=| =|:| :)") },
  {
    name: "gitlab_user_email",
    regex: new RegExp("gitlab[_-]?user[_-]?email(=| =|:| :)")
  },
  { name: "gogs_password", regex: new RegExp("gogs[_-]?password(=| =|:| :)") },
  {
    name: "google_account_type",
    regex: new RegExp("google[_-]?account[_-]?type(=| =|:| :)")
  },
  {
    name: "google_client_email",
    regex: new RegExp("google[_-]?client[_-]?email(=| =|:| :)")
  },
  {
    name: "google_client_id",
    regex: new RegExp("google[_-]?client[_-]?id(=| =|:| :)")
  },
  {
    name: "google_client_secret",
    regex: new RegExp("google[_-]?client[_-]?secret(=| =|:| :)")
  },
  {
    name: "google_maps_api_key",
    regex: new RegExp("google[_-]?maps[_-]?api[_-]?key(=| =|:| :)")
  },
  { name: "google_oauth", regex: new RegExp("(ya29.[0-9A-Za-z-_]+)") },
  {
    name: "google_patterns",
    regex: new RegExp("(?:google_client_id|google_client_secret|google_client_token)")
  },
  {
    name: "google_private_key",
    regex: new RegExp("google[_-]?private[_-]?key(=| =|:| :)")
  },
  {
    name: "google_url",
    regex: new RegExp("([0-9]{12}-[a-z0-9]{32}.apps.googleusercontent.com)")
  },
  {
    name: "gpg_key_name",
    regex: new RegExp("gpg[_-]?key[_-]?name(=| =|:| :)")
  },
  { name: "gpg_keyname", regex: new RegExp("gpg[_-]?keyname(=| =|:| :)") },
  {
    name: "gpg_ownertrust",
    regex: new RegExp("gpg[_-]?ownertrust(=| =|:| :)")
  },
  {
    name: "gpg_passphrase",
    regex: new RegExp("gpg[_-]?passphrase(=| =|:| :)")
  },
  {
    name: "gpg_private_key",
    regex: new RegExp("gpg[_-]?private[_-]?key(=| =|:| :)")
  },
  {
    name: "gpg_secret_keys",
    regex: new RegExp("gpg[_-]?secret[_-]?keys(=| =|:| :)")
  },
  {
    name: "gradle_publish_key",
    regex: new RegExp("gradle[_-]?publish[_-]?key(=| =|:| :)")
  },
  {
    name: "gradle_publish_secret",
    regex: new RegExp("gradle[_-]?publish[_-]?secret(=| =|:| :)")
  },
  {
    name: "gradle_signing_key_id",
    regex: new RegExp("gradle[_-]?signing[_-]?key[_-]?id(=| =|:| :)")
  },
  {
    name: "gradle_signing_password",
    regex: new RegExp("gradle[_-]?signing[_-]?password(=| =|:| :)")
  },
  {
    name: "gren_github_token",
    regex: new RegExp("gren[_-]?github[_-]?token(=| =|:| :)")
  },
  { name: "grgit_user", regex: new RegExp("grgit[_-]?user(=| =|:| :)") },
  {
    name: "hab_auth_token",
    regex: new RegExp("hab[_-]?auth[_-]?token(=| =|:| :)")
  },
  { name: "hab_key", regex: new RegExp("hab[_-]?key(=| =|:| :)") },
  {
    name: "hb_codesign_gpg_pass",
    regex: new RegExp("hb[_-]?codesign[_-]?gpg[_-]?pass(=| =|:| :)")
  },
  {
    name: "hb_codesign_key_pass",
    regex: new RegExp("hb[_-]?codesign[_-]?key[_-]?pass(=| =|:| :)")
  },
  {
    name: "heroku_api_key",
    regex: new RegExp("heroku[_-]?api[_-]?key(=| =|:| :)")
  },
  {
    name: "heroku_api_key_api_key",
    regex: new RegExp("([h|H][e|E][r|R][o|O][k|K][u|U].{0,30}[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12})")
  },
  { name: "heroku_email", regex: new RegExp("heroku[_-]?email(=| =|:| :)") },
  { name: "heroku_token", regex: new RegExp("heroku[_-]?token(=| =|:| :)") },
  {
    name: "hockeyapp",
    regex: new RegExp(`hockey.{0,50}("|')?[0-9a-f]{32}("|')?`)
  },
  {
    name: "hockeyapp_token",
    regex: new RegExp("hockeyapp[_-]?token(=| =|:| :)")
  },
  {
    name: "homebrew_github_api_token",
    regex: new RegExp("homebrew[_-]?github[_-]?api[_-]?token(=| =|:| :)")
  },
  {
    name: "hub_dxia2_password",
    regex: new RegExp("hub[_-]?dxia2[_-]?password(=| =|:| :)")
  },
  {
    name: "ij_repo_password",
    regex: new RegExp("ij[_-]?repo[_-]?password(=| =|:| :)")
  },
  {
    name: "ij_repo_username",
    regex: new RegExp("ij[_-]?repo[_-]?username(=| =|:| :)")
  },
  { name: "index_name", regex: new RegExp("index[_-]?name(=| =|:| :)") },
  {
    name: "integration_test_api_key",
    regex: new RegExp("integration[_-]?test[_-]?api[_-]?key(=| =|:| :)")
  },
  {
    name: "integration_test_appid",
    regex: new RegExp("integration[_-]?test[_-]?appid(=| =|:| :)")
  },
  {
    name: "internal_secrets",
    regex: new RegExp("internal[_-]?secrets(=| =|:| :)")
  },
  {
    name: "ios_docs_deploy_token",
    regex: new RegExp("ios[_-]?docs[_-]?deploy[_-]?token(=| =|:| :)")
  },
  {
    name: "itest_gh_token",
    regex: new RegExp("itest[_-]?gh[_-]?token(=| =|:| :)")
  },
  { name: "jdbc", regex: new RegExp("mysql: jdbc:mysql(=| =|:| :)") },
  {
    name: "jdbc_databaseurl",
    regex: new RegExp("jdbc[_-]?databaseurl(=| =|:| :)")
  },
  { name: "jdbc_host", regex: new RegExp("jdbc[_-]?host(=| =|:| :)") },
  { name: "jwt_secret", regex: new RegExp("jwt[_-]?secret(=| =|:| :)") },
  {
    name: "kafka_admin_url",
    regex: new RegExp("kafka[_-]?admin[_-]?url(=| =|:| :)")
  },
  {
    name: "kafka_instance_name",
    regex: new RegExp("kafka[_-]?instance[_-]?name(=| =|:| :)")
  },
  {
    name: "kafka_rest_url",
    regex: new RegExp("kafka[_-]?rest[_-]?url(=| =|:| :)")
  },
  { name: "keystore_pass", regex: new RegExp("keystore[_-]?pass(=| =|:| :)") },
  {
    name: "kovan_private_key",
    regex: new RegExp("kovan[_-]?private[_-]?key(=| =|:| :)")
  },
  {
    name: "kubecfg_s3_path",
    regex: new RegExp("kubecfg[_-]?s3[_-]?path(=| =|:| :)")
  },
  { name: "kubeconfig", regex: new RegExp("kubeconfig(=| =|:| :)") },
  {
    name: "kxoltsn3vogdop92m",
    regex: new RegExp("kxoltsn3vogdop92m(=| =|:| :)")
  },
  { name: "leanplum_key", regex: new RegExp("leanplum[_-]?key(=| =|:| :)") },
  {
    name: "lektor_deploy_password",
    regex: new RegExp("lektor[_-]?deploy[_-]?password(=| =|:| :)")
  },
  {
    name: "lektor_deploy_username",
    regex: new RegExp("lektor[_-]?deploy[_-]?username(=| =|:| :)")
  },
  {
    name: "lighthouse_api_key",
    regex: new RegExp("lighthouse[_-]?api[_-]?key(=| =|:| :)")
  },
  {
    name: "linux_signing_key",
    regex: new RegExp("linux[_-]?signing[_-]?key(=| =|:| :)")
  },
  {
    name: "ll_publish_url",
    regex: new RegExp("ll[_-]?publish[_-]?url(=| =|:| :)")
  },
  {
    name: "ll_shared_key",
    regex: new RegExp("ll[_-]?shared[_-]?key(=| =|:| :)")
  },
  {
    name: "looker_test_runner_client_secret",
    regex: new RegExp("looker[_-]?test[_-]?runner[_-]?client[_-]?secret(=| =|:| :)")
  },
  {
    name: "lottie_happo_api_key",
    regex: new RegExp("lottie[_-]?happo[_-]?api[_-]?key(=| =|:| :)")
  },
  {
    name: "lottie_happo_secret_key",
    regex: new RegExp("lottie[_-]?happo[_-]?secret[_-]?key(=| =|:| :)")
  },
  {
    name: "lottie_s3_secret_key",
    regex: new RegExp("lottie[_-]?s3[_-]?secret[_-]?key(=| =|:| :)")
  },
  {
    name: "lottie_upload_cert_key_password",
    regex: new RegExp("lottie[_-]?upload[_-]?cert[_-]?key[_-]?password(=| =|:| :)")
  },
  {
    name: "lottie_upload_cert_key_store_password",
    regex: new RegExp("lottie[_-]?upload[_-]?cert[_-]?key[_-]?store[_-]?password(=| =|:| :)")
  },
  {
    name: "magento_auth_password",
    regex: new RegExp("magento[_-]?auth[_-]?password(=| =|:| :)")
  },
  {
    name: "magento_auth_username",
    regex: new RegExp("magento[_-]?auth[_-]?username (=| =|:| :)")
  },
  {
    name: "magento_password",
    regex: new RegExp("magento[_-]?password(=| =|:| :)")
  },
  { name: "mail_password", regex: new RegExp("mail[_-]?password(=| =|:| :)") },
  {
    name: "mailchimp",
    regex: new RegExp("(W(?:[a-f0-9]{32}(-us[0-9]{1,2}))a-zA-Z0-9)")
  },
  {
    name: "mailchimp_api_key",
    regex: new RegExp("mailchimp[_-]?api[_-]?key(=| =|:| :)")
  },
  { name: "mailchimp_key", regex: new RegExp("mailchimp[_-]?key(=| =|:| :)") },
  {
    name: "mailer_password",
    regex: new RegExp("mailer[_-]?password(=| =|:| :)")
  },
  { name: "mailgun", regex: new RegExp("(key-[0-9a-f]{32})") },
  {
    name: "mailgun_api_key",
    regex: new RegExp("mailgun[_-]?api[_-]?key(=| =|:| :)")
  },
  {
    name: "mailgun_apikey",
    regex: new RegExp("mailgun[_-]?apikey(=| =|:| :)")
  },
  {
    name: "mailgun_password",
    regex: new RegExp("mailgun[_-]?password(=| =|:| :)")
  },
  {
    name: "mailgun_priv_key",
    regex: new RegExp("mailgun[_-]?priv[_-]?key(=| =|:| :)")
  },
  {
    name: "mailgun_pub_apikey",
    regex: new RegExp("mailgun[_-]?pub[_-]?apikey(=| =|:| :)")
  },
  {
    name: "mailgun_pub_key",
    regex: new RegExp("mailgun[_-]?pub[_-]?key(=| =|:| :)")
  },
  {
    name: "mailgun_secret_api_key",
    regex: new RegExp("mailgun[_-]?secret[_-]?api[_-]?key(=| =|:| :)")
  },
  { name: "manage_key", regex: new RegExp("manage[_-]?key(=| =|:| :)") },
  { name: "manage_secret", regex: new RegExp("manage[_-]?secret(=| =|:| :)") },
  {
    name: "management_token",
    regex: new RegExp("management[_-]?token(=| =|:| :)")
  },
  {
    name: "managementapiaccesstoken",
    regex: new RegExp("managementapiaccesstoken(=| =|:| :)")
  },
  {
    name: "mandrill_api_key",
    regex: new RegExp("mandrill[_-]?api[_-]?key(=| =|:| :)")
  },
  {
    name: "manifest_app_token",
    regex: new RegExp("manifest[_-]?app[_-]?token(=| =|:| :)")
  },
  {
    name: "manifest_app_url",
    regex: new RegExp("manifest[_-]?app[_-]?url(=| =|:| :)")
  },
  {
    name: "mapbox_access_token",
    regex: new RegExp("mapbox[_-]?access[_-]?token(=| =|:| :)")
  },
  {
    name: "mapbox_api_token",
    regex: new RegExp("mapbox[_-]?api[_-]?token(=| =|:| :)")
  },
  {
    name: "mapbox_aws_access_key_id",
    regex: new RegExp("mapbox[_-]?aws[_-]?access[_-]?key[_-]?id(=| =|:| :)")
  },
  {
    name: "mapbox_aws_secret_access_key",
    regex: new RegExp("mapbox[_-]?aws[_-]?secret[_-]?access[_-]?key(=| =|:| :)")
  },
  {
    name: "mapboxaccesstoken",
    regex: new RegExp("mapboxaccesstoken(=| =|:| :)")
  },
  { name: "master_password", regex: new RegExp("(master_password).+") },
  { name: "mg_api_key", regex: new RegExp("mg[_-]?api[_-]?key(=| =|:| :)") },
  {
    name: "mg_public_api_key",
    regex: new RegExp("mg[_-]?public[_-]?api[_-]?key(=| =|:| :)")
  },
  { name: "mh_apikey", regex: new RegExp("mh[_-]?apikey(=| =|:| :)") },
  { name: "mh_password", regex: new RegExp("mh[_-]?password(=| =|:| :)") },
  {
    name: "mile_zero_key",
    regex: new RegExp("mile[_-]?zero[_-]?key(=| =|:| :)")
  },
  {
    name: "minio_access_key",
    regex: new RegExp("minio[_-]?access[_-]?key(=| =|:| :)")
  },
  {
    name: "minio_secret_key",
    regex: new RegExp("minio[_-]?secret[_-]?key(=| =|:| :)")
  },
  {
    name: "multi_bob_sid",
    regex: new RegExp("multi[_-]?bob[_-]?sid(=| =|:| :)")
  },
  {
    name: "multi_connect_sid",
    regex: new RegExp("multi[_-]?connect[_-]?sid(=| =|:| :)")
  },
  {
    name: "multi_disconnect_sid",
    regex: new RegExp("multi[_-]?disconnect[_-]?sid(=| =|:| :)")
  },
  {
    name: "multi_workflow_sid",
    regex: new RegExp("multi[_-]?workflow[_-]?sid(=| =|:| :)")
  },
  {
    name: "multi_workspace_sid",
    regex: new RegExp("multi[_-]?workspace[_-]?sid(=| =|:| :)")
  },
  {
    name: "my_secret_env",
    regex: new RegExp("my[_-]?secret[_-]?env(=| =|:| :)")
  },
  {
    name: "mysql_database",
    regex: new RegExp("mysql[_-]?database(=| =|:| :)")
  },
  {
    name: "mysql_hostname",
    regex: new RegExp("mysql[_-]?hostname(=| =|:| :)")
  },
  {
    name: "mysql_password",
    regex: new RegExp("mysql[_-]?password(=| =|:| :)")
  },
  {
    name: "mysql_root_password",
    regex: new RegExp("mysql[_-]?root[_-]?password(=| =|:| :)")
  },
  { name: "mysql_user", regex: new RegExp("mysql[_-]?user(=| =|:| :)") },
  {
    name: "mysql_username",
    regex: new RegExp("mysql[_-]?username(=| =|:| :)")
  },
  { name: "mysqlmasteruser", regex: new RegExp("mysqlmasteruser(=| =|:| :)") },
  { name: "mysqlsecret", regex: new RegExp("mysqlsecret(=| =|:| :)") },
  { name: "nativeevents", regex: new RegExp("nativeevents(=| =|:| :)") },
  {
    name: "netlify_api_key",
    regex: new RegExp("netlify[_-]?api[_-]?key(=| =|:| :)")
  },
  {
    name: "new_relic_beta_token",
    regex: new RegExp("new[_-]?relic[_-]?beta[_-]?token(=| =|:| :)")
  },
  {
    name: "nexus_password",
    regex: new RegExp("nexus[_-]?password(=| =|:| :)")
  },
  { name: "nexuspassword", regex: new RegExp("nexuspassword(=| =|:| :)") },
  {
    name: "ngrok_auth_token",
    regex: new RegExp("ngrok[_-]?auth[_-]?token(=| =|:| :)")
  },
  { name: "ngrok_token", regex: new RegExp("ngrok[_-]?token(=| =|:| :)") },
  { name: "node_env", regex: new RegExp("node[_-]?env(=| =|:| :)") },
  {
    name: "node_pre_gyp_accesskeyid",
    regex: new RegExp("node[_-]?pre[_-]?gyp[_-]?accesskeyid(=| =|:| :)")
  },
  {
    name: "node_pre_gyp_github_token",
    regex: new RegExp("node[_-]?pre[_-]?gyp[_-]?github[_-]?token(=| =|:| :)")
  },
  {
    name: "node_pre_gyp_secretaccesskey",
    regex: new RegExp("node[_-]?pre[_-]?gyp[_-]?secretaccesskey(=| =|:| :)")
  },
  { name: "non_token", regex: new RegExp("non[_-]?token(=| =|:| :)") },
  { name: "now_token", regex: new RegExp("now[_-]?token(=| =|:| :)") },
  { name: "npm_api_key", regex: new RegExp("npm[_-]?api[_-]?key(=| =|:| :)") },
  {
    name: "npm_api_token",
    regex: new RegExp("npm[_-]?api[_-]?token(=| =|:| :)")
  },
  {
    name: "npm_auth_token",
    regex: new RegExp("npm[_-]?auth[_-]?token(=| =|:| :)")
  },
  { name: "npm_email", regex: new RegExp("npm[_-]?email(=| =|:| :)") },
  { name: "npm_password", regex: new RegExp("npm[_-]?password(=| =|:| :)") },
  {
    name: "npm_secret_key",
    regex: new RegExp("npm[_-]?secret[_-]?key(=| =|:| :)")
  },
  { name: "npm_token - 1", regex: new RegExp("npm[_-]?token(=| =|:| :)") },
  { name: "nuget_api_key - 1", regex: new RegExp("(oy2[a-z0-9]{43})") },
  {
    name: "nuget_api_key - 2",
    regex: new RegExp("nuget[_-]?api[_-]?key(=| =|:| :)")
  },
  {
    name: "numbers_service_pass",
    regex: new RegExp("numbers[_-]?service[_-]?pass(=| =|:| :)")
  },
  { name: "oauth_token", regex: new RegExp("oauth[_-]?token(=| =|:| :)") },
  {
    name: "object_storage_password",
    regex: new RegExp("object[_-]?storage[_-]?password(=| =|:| :)")
  },
  {
    name: "object_storage_region_name",
    regex: new RegExp("object[_-]?storage[_-]?region[_-]?name(=| =|:| :)")
  },
  {
    name: "object_store_bucket",
    regex: new RegExp("object[_-]?store[_-]?bucket(=| =|:| :)")
  },
  {
    name: "object_store_creds",
    regex: new RegExp("object[_-]?store[_-]?creds(=| =|:| :)")
  },
  { name: "oc_pass", regex: new RegExp("oc[_-]?pass(=| =|:| :)") },
  {
    name: "octest_app_password",
    regex: new RegExp("octest[_-]?app[_-]?password(=| =|:| :)")
  },
  {
    name: "octest_app_username",
    regex: new RegExp("octest[_-]?app[_-]?username(=| =|:| :)")
  },
  {
    name: "octest_password",
    regex: new RegExp("octest[_-]?password(=| =|:| :)")
  },
  { name: "ofta_key", regex: new RegExp("ofta[_-]?key(=| =|:| :)") },
  { name: "ofta_region", regex: new RegExp("ofta[_-]?region(=| =|:| :)") },
  { name: "ofta_secret", regex: new RegExp("ofta[_-]?secret(=| =|:| :)") },
  {
    name: "okta_client_token",
    regex: new RegExp("okta[_-]?client[_-]?token(=| =|:| :)")
  },
  {
    name: "okta_oauth2_client_secret",
    regex: new RegExp("okta[_-]?oauth2[_-]?client[_-]?secret(=| =|:| :)")
  },
  {
    name: "okta_oauth2_clientsecret",
    regex: new RegExp("okta[_-]?oauth2[_-]?clientsecret(=| =|:| :)")
  },
  { name: "omise_key", regex: new RegExp("omise[_-]?key(=| =|:| :)") },
  { name: "omise_pkey", regex: new RegExp("omise[_-]?pkey(=| =|:| :)") },
  { name: "omise_pubkey", regex: new RegExp("omise[_-]?pubkey(=| =|:| :)") },
  { name: "omise_skey", regex: new RegExp("omise[_-]?skey(=| =|:| :)") },
  {
    name: "onesignal_api_key",
    regex: new RegExp("onesignal[_-]?api[_-]?key(=| =|:| :)")
  },
  {
    name: "onesignal_user_auth_key",
    regex: new RegExp("onesignal[_-]?user[_-]?auth[_-]?key(=| =|:| :)")
  },
  {
    name: "open_whisk_key",
    regex: new RegExp("open[_-]?whisk[_-]?key(=| =|:| :)")
  },
  { name: "openwhisk_key", regex: new RegExp("openwhisk[_-]?key(=| =|:| :)") },
  { name: "os_auth_url", regex: new RegExp("os[_-]?auth[_-]?url(=| =|:| :)") },
  { name: "os_password", regex: new RegExp("os[_-]?password(=| =|:| :)") },
  {
    name: "ossrh_jira_password",
    regex: new RegExp("ossrh[_-]?jira[_-]?password(=| =|:| :)")
  },
  { name: "ossrh_pass", regex: new RegExp("ossrh[_-]?pass(=| =|:| :)") },
  {
    name: "ossrh_password",
    regex: new RegExp("ossrh[_-]?password(=| =|:| :)")
  },
  { name: "ossrh_secret", regex: new RegExp("ossrh[_-]?secret(=| =|:| :)") },
  {
    name: "ossrh_username",
    regex: new RegExp("ossrh[_-]?username(=| =|:| :)")
  },
  {
    name: "outlook_team",
    regex: new RegExp("(https://outlook.office.com/webhook/[0-9a-f-]{36}@)")
  },
  {
    name: "packagecloud_token",
    regex: new RegExp("packagecloud[_-]?token(=| =|:| :)")
  },
  {
    name: "pagerduty_apikey",
    regex: new RegExp("pagerduty[_-]?apikey(=| =|:| :)")
  },
  {
    name: "parse_js_key",
    regex: new RegExp("parse[_-]?js[_-]?key(=| =|:| :)")
  },
  { name: "passwordtravis", regex: new RegExp("passwordtravis(=| =|:| :)") },
  {
    name: "paypal_braintree_access_token",
    regex: new RegExp("(access_token$production$[0-9a-z]{16}$[0-9a-f]{32})")
  },
  {
    name: "paypal_client_secret",
    regex: new RegExp("paypal[_-]?client[_-]?secret(=| =|:| :)")
  },
  { name: "percy_project", regex: new RegExp("percy[_-]?project(=| =|:| :)") },
  { name: "percy_token", regex: new RegExp("percy[_-]?token(=| =|:| :)") },
  { name: "personal_key", regex: new RegExp("personal[_-]?key(=| =|:| :)") },
  {
    name: "personal_secret",
    regex: new RegExp("personal[_-]?secret(=| =|:| :)")
  },
  { name: "pg_database", regex: new RegExp("pg[_-]?database(=| =|:| :)") },
  { name: "pg_host", regex: new RegExp("pg[_-]?host(=| =|:| :)") },
  {
    name: "places_api_key",
    regex: new RegExp("places[_-]?api[_-]?key(=| =|:| :)")
  },
  { name: "places_apikey", regex: new RegExp("places[_-]?apikey(=| =|:| :)") },
  { name: "plotly_apikey", regex: new RegExp("plotly[_-]?apikey(=| =|:| :)") },
  {
    name: "plugin_password",
    regex: new RegExp("plugin[_-]?password(=| =|:| :)")
  },
  {
    name: "postgres_env_postgres_db",
    regex: new RegExp("postgres[_-]?env[_-]?postgres[_-]?db(=| =|:| :)")
  },
  {
    name: "postgres_env_postgres_password",
    regex: new RegExp("postgres[_-]?env[_-]?postgres[_-]?password(=| =|:| :)")
  },
  { name: "postgresql_db", regex: new RegExp("postgresql[_-]?db(=| =|:| :)") },
  {
    name: "postgresql_pass",
    regex: new RegExp("postgresql[_-]?pass(=| =|:| :)")
  },
  { name: "prebuild_auth", regex: new RegExp("prebuild[_-]?auth(=| =|:| :)") },
  {
    name: "preferred_username",
    regex: new RegExp("preferred[_-]?username(=| =|:| :)")
  },
  {
    name: "pring_mail_username",
    regex: new RegExp("pring[_-]?mail[_-]?username(=| =|:| :)")
  },
  {
    name: "private_key",
    regex: new RegExp("-----(?:(?:BEGIN|END) )(?:(?:EC|PGP|DSA|RSA|OPENSSH).)?PRIVATE.KEY(.BLOCK)?-----")
  },
  {
    name: "private_signing_password",
    regex: new RegExp("private[_-]?signing[_-]?password(=| =|:| :)")
  },
  {
    name: "prod_access_key_id",
    regex: new RegExp("prod[_-]?access[_-]?key[_-]?id(=| =|:| :)")
  },
  { name: "prod_password", regex: new RegExp("prod[_-]?password(=| =|:| :)") },
  {
    name: "prod_secret_key",
    regex: new RegExp("prod[_-]?secret[_-]?key(=| =|:| :)")
  },
  {
    name: "project_config",
    regex: new RegExp("project[_-]?config(=| =|:| :)")
  },
  {
    name: "publish_access",
    regex: new RegExp("publish[_-]?access(=| =|:| :)")
  },
  { name: "publish_key", regex: new RegExp("publish[_-]?key(=| =|:| :)") },
  {
    name: "publish_secret",
    regex: new RegExp("publish[_-]?secret(=| =|:| :)")
  },
  {
    name: "pushover_token",
    regex: new RegExp("pushover[_-]?token(=| =|:| :)")
  },
  { name: "pypi_passowrd", regex: new RegExp("pypi[_-]?passowrd(=| =|:| :)") },
  { name: "qiita_token", regex: new RegExp("qiita[_-]?token(=| =|:| :)") },
  { name: "quip_token", regex: new RegExp("quip[_-]?token(=| =|:| :)") },
  {
    name: "rabbitmq_password",
    regex: new RegExp("rabbitmq[_-]?password(=| =|:| :)")
  },
  {
    name: "randrmusicapiaccesstoken",
    regex: new RegExp("randrmusicapiaccesstoken(=| =|:| :)")
  },
  {
    name: "redis_stunnel_urls",
    regex: new RegExp("redis[_-]?stunnel[_-]?urls(=| =|:| :)")
  },
  {
    name: "rediscloud_url",
    regex: new RegExp("rediscloud[_-]?url(=| =|:| :)")
  },
  { name: "refresh_token", regex: new RegExp("refresh[_-]?token(=| =|:| :)") },
  { name: "registry_pass", regex: new RegExp("registry[_-]?pass(=| =|:| :)") },
  {
    name: "registry_secure",
    regex: new RegExp("registry[_-]?secure(=| =|:| :)")
  },
  {
    name: "release_gh_token",
    regex: new RegExp("release[_-]?gh[_-]?token(=| =|:| :)")
  },
  { name: "release_token", regex: new RegExp("release[_-]?token(=| =|:| :)") },
  {
    name: "reporting_webdav_pwd",
    regex: new RegExp("reporting[_-]?webdav[_-]?pwd(=| =|:| :)")
  },
  {
    name: "reporting_webdav_url",
    regex: new RegExp("reporting[_-]?webdav[_-]?url(=| =|:| :)")
  },
  { name: "repotoken", regex: new RegExp("repotoken(=| =|:| :)") },
  {
    name: "rest_api_key",
    regex: new RegExp("rest[_-]?api[_-]?key(=| =|:| :)")
  },
  {
    name: "rinkeby_private_key",
    regex: new RegExp("rinkeby[_-]?private[_-]?key(=| =|:| :)")
  },
  {
    name: "ropsten_private_key",
    regex: new RegExp("ropsten[_-]?private[_-]?key(=| =|:| :)")
  },
  {
    name: "route53_access_key_id",
    regex: new RegExp("route53[_-]?access[_-]?key[_-]?id(=| =|:| :)")
  },
  {
    name: "rtd_key_pass",
    regex: new RegExp("rtd[_-]?key[_-]?pass(=| =|:| :)")
  },
  {
    name: "rtd_store_pass",
    regex: new RegExp("rtd[_-]?store[_-]?pass(=| =|:| :)")
  },
  {
    name: "rubygems_auth_token",
    regex: new RegExp("rubygems[_-]?auth[_-]?token(=| =|:| :)")
  },
  {
    name: "s3_access_key",
    regex: new RegExp("s3[_-]?access[_-]?key(=| =|:| :)")
  },
  {
    name: "s3_access_key_id",
    regex: new RegExp("s3[_-]?access[_-]?key[_-]?id(=| =|:| :)")
  },
  {
    name: "s3_bucket_name_app_logs",
    regex: new RegExp("s3[_-]?bucket[_-]?name[_-]?app[_-]?logs(=| =|:| :)")
  },
  {
    name: "s3_bucket_name_assets",
    regex: new RegExp("s3[_-]?bucket[_-]?name[_-]?assets(=| =|:| :)")
  },
  {
    name: "s3_external_3_amazonaws_com",
    regex: new RegExp("s3[_-]?external[_-]?3[_-]?amazonaws[_-]?com(=| =|:| :)")
  },
  { name: "s3_key", regex: new RegExp("s3[_-]?key(=| =|:| :)") },
  {
    name: "s3_key_app_logs",
    regex: new RegExp("s3[_-]?key[_-]?app[_-]?logs(=| =|:| :)")
  },
  {
    name: "s3_key_assets",
    regex: new RegExp("s3[_-]?key[_-]?assets(=| =|:| :)")
  },
  {
    name: "s3_secret_app_logs",
    regex: new RegExp("s3[_-]?secret[_-]?app[_-]?logs(=| =|:| :)")
  },
  {
    name: "s3_secret_assets",
    regex: new RegExp("s3[_-]?secret[_-]?assets(=| =|:| :)")
  },
  {
    name: "s3_secret_key",
    regex: new RegExp("s3[_-]?secret[_-]?key(=| =|:| :)")
  },
  {
    name: "s3_user_secret",
    regex: new RegExp("s3[_-]?user[_-]?secret(=| =|:| :)")
  },
  {
    name: "sacloud_access_token",
    regex: new RegExp("sacloud[_-]?access[_-]?token(=| =|:| :)")
  },
  {
    name: "sacloud_access_token_secret",
    regex: new RegExp("sacloud[_-]?access[_-]?token[_-]?secret(=| =|:| :)")
  },
  { name: "sacloud_api", regex: new RegExp("sacloud[_-]?api(=| =|:| :)") },
  {
    name: "salesforce_bulk_test_password",
    regex: new RegExp("salesforce[_-]?bulk[_-]?test[_-]?password(=| =|:| :)")
  },
  {
    name: "salesforce_bulk_test_security_token",
    regex: new RegExp("salesforce[_-]?bulk[_-]?test[_-]?security[_-]?token(=| =|:| :)")
  },
  {
    name: "sandbox_access_token",
    regex: new RegExp("sandbox[_-]?access[_-]?token(=| =|:| :)")
  },
  {
    name: "sandbox_aws_access_key_id",
    regex: new RegExp("sandbox[_-]?aws[_-]?access[_-]?key[_-]?id(=| =|:| :)")
  },
  {
    name: "sandbox_aws_secret_access_key",
    regex: new RegExp("sandbox[_-]?aws[_-]?secret[_-]?access[_-]?key(=| =|:| :)")
  },
  {
    name: "sauce_access_key",
    regex: new RegExp("sauce[_-]?access[_-]?key(=| =|:| :)")
  },
  {
    name: "sauce_token",
    regex: new RegExp(`(sauce.{0,50}("|')?[0-9a-f-]{36}("|')?)`)
  },
  {
    name: "scrutinizer_token",
    regex: new RegExp("scrutinizer[_-]?token(=| =|:| :)")
  },
  { name: "sdr_token", regex: new RegExp("sdr[_-]?token(=| =|:| :)") },
  { name: "secret_0", regex: new RegExp("secret[_-]?0(=| =|:| :)") },
  { name: "secret_1", regex: new RegExp("secret[_-]?1(=| =|:| :)") },
  { name: "secret_10", regex: new RegExp("secret[_-]?10(=| =|:| :)") },
  { name: "secret_11", regex: new RegExp("secret[_-]?11(=| =|:| :)") },
  { name: "secret_2", regex: new RegExp("secret[_-]?2(=| =|:| :)") },
  { name: "secret_3", regex: new RegExp("secret[_-]?3(=| =|:| :)") },
  { name: "secret_4", regex: new RegExp("secret[_-]?4(=| =|:| :)") },
  { name: "secret_5", regex: new RegExp("secret[_-]?5(=| =|:| :)") },
  { name: "secret_6", regex: new RegExp("secret[_-]?6(=| =|:| :)") },
  { name: "secret_7", regex: new RegExp("secret[_-]?7(=| =|:| :)") },
  { name: "secret_8", regex: new RegExp("secret[_-]?8(=| =|:| :)") },
  { name: "secret_9", regex: new RegExp("secret[_-]?9(=| =|:| :)") },
  {
    name: "secret_key_base",
    regex: new RegExp("secret[_-]?key[_-]?base(=| =|:| :)")
  },
  { name: "secretaccesskey", regex: new RegExp("secretaccesskey(=| =|:| :)") },
  { name: "secretkey", regex: new RegExp("secretkey(=| =|:| :)") },
  {
    name: "segment_api_key",
    regex: new RegExp("segment[_-]?api[_-]?key(=| =|:| :)")
  },
  {
    name: "selion_log_level_dev",
    regex: new RegExp("selion[_-]?log[_-]?level[_-]?dev(=| =|:| :)")
  },
  {
    name: "selion_selenium_host",
    regex: new RegExp("selion[_-]?selenium[_-]?host(=| =|:| :)")
  },
  { name: "sendgrid - 2", regex: new RegExp("sendgrid(=| =|:| :)") },
  {
    name: "sendgrid_api_key - 1",
    regex: new RegExp("sendgrid[_-]?api[_-]?key(=| =|:| :)")
  },
  { name: "sendgrid_key", regex: new RegExp("sendgrid[_-]?key(=| =|:| :)") },
  {
    name: "sendgrid_password",
    regex: new RegExp("sendgrid[_-]?password(=| =|:| :)")
  },
  { name: "sendgrid_user", regex: new RegExp("sendgrid[_-]?user(=| =|:| :)") },
  {
    name: "sendgrid_username",
    regex: new RegExp("sendgrid[_-]?username(=| =|:| :)")
  },
  {
    name: "sendwithus_key",
    regex: new RegExp("sendwithus[_-]?key(=| =|:| :)")
  },
  {
    name: "sentry_auth_token",
    regex: new RegExp("sentry[_-]?auth[_-]?token(=| =|:| :)")
  },
  {
    name: "sentry_default_org",
    regex: new RegExp("sentry[_-]?default[_-]?org(=| =|:| :)")
  },
  {
    name: "sentry_endpoint",
    regex: new RegExp("sentry[_-]?endpoint(=| =|:| :)")
  },
  { name: "sentry_key", regex: new RegExp("sentry[_-]?key(=| =|:| :)") },
  {
    name: "service_account_secret",
    regex: new RegExp("service[_-]?account[_-]?secret(=| =|:| :)")
  },
  {
    name: "ses_access_key",
    regex: new RegExp("ses[_-]?access[_-]?key(=| =|:| :)")
  },
  {
    name: "ses_secret_key",
    regex: new RegExp("ses[_-]?secret[_-]?key(=| =|:| :)")
  },
  { name: "setdstaccesskey", regex: new RegExp("setdstaccesskey(=| =|:| :)") },
  { name: "setdstsecretkey", regex: new RegExp("setdstsecretkey(=| =|:| :)") },
  { name: "setsecretkey", regex: new RegExp("setsecretkey(=| =|:| :)") },
  { name: "signing_key", regex: new RegExp("signing[_-]?key(=| =|:| :)") },
  {
    name: "signing_key_password",
    regex: new RegExp("signing[_-]?key[_-]?password(=| =|:| :)")
  },
  {
    name: "signing_key_secret",
    regex: new RegExp("signing[_-]?key[_-]?secret(=| =|:| :)")
  },
  {
    name: "signing_key_sid",
    regex: new RegExp("signing[_-]?key[_-]?sid(=| =|:| :)")
  },
  {
    name: "slack_webhook_url",
    regex: new RegExp("(hooks.slack.com/services/T[A-Z0-9]{8}/B[A-Z0-9]{8}/[a-zA-Z0-9]{1,})")
  },
  {
    name: "slash_developer_space",
    regex: new RegExp("slash[_-]?developer[_-]?space(=| =|:| :)")
  },
  {
    name: "slash_developer_space_key",
    regex: new RegExp("slash[_-]?developer[_-]?space[_-]?key(=| =|:| :)")
  },
  {
    name: "slate_user_email",
    regex: new RegExp("slate[_-]?user[_-]?email(=| =|:| :)")
  },
  {
    name: "snoowrap_client_secret",
    regex: new RegExp("snoowrap[_-]?client[_-]?secret(=| =|:| :)")
  },
  {
    name: "snoowrap_password",
    regex: new RegExp("snoowrap[_-]?password(=| =|:| :)")
  },
  {
    name: "snoowrap_refresh_token",
    regex: new RegExp("snoowrap[_-]?refresh[_-]?token(=| =|:| :)")
  },
  {
    name: "snyk_api_token",
    regex: new RegExp("snyk[_-]?api[_-]?token(=| =|:| :)")
  },
  { name: "snyk_token", regex: new RegExp("snyk[_-]?token(=| =|:| :)") },
  {
    name: "socrata_app_token",
    regex: new RegExp("socrata[_-]?app[_-]?token(=| =|:| :)")
  },
  {
    name: "socrata_password",
    regex: new RegExp("socrata[_-]?password(=| =|:| :)")
  },
  {
    name: "sonar_organization_key",
    regex: new RegExp("sonar[_-]?organization[_-]?key(=| =|:| :)")
  },
  {
    name: "sonar_project_key",
    regex: new RegExp("sonar[_-]?project[_-]?key(=| =|:| :)")
  },
  { name: "sonar_token", regex: new RegExp("sonar[_-]?token(=| =|:| :)") },
  {
    name: "sonarqube_docs_api_key",
    regex: new RegExp(`(sonar.{0,50}("|')?[0-9a-f]{40}("|')?)`)
  },
  {
    name: "sonatype_gpg_key_name",
    regex: new RegExp("sonatype[_-]?gpg[_-]?key[_-]?name(=| =|:| :)")
  },
  {
    name: "sonatype_gpg_passphrase",
    regex: new RegExp("sonatype[_-]?gpg[_-]?passphrase(=| =|:| :)")
  },
  {
    name: "sonatype_nexus_password",
    regex: new RegExp("sonatype[_-]?nexus[_-]?password(=| =|:| :)")
  },
  { name: "sonatype_pass", regex: new RegExp("sonatype[_-]?pass(=| =|:| :)") },
  {
    name: "sonatype_password",
    regex: new RegExp("sonatype[_-]?password(=| =|:| :)")
  },
  {
    name: "sonatype_token_password",
    regex: new RegExp("sonatype[_-]?token[_-]?password(=| =|:| :)")
  },
  {
    name: "sonatype_token_user",
    regex: new RegExp("sonatype[_-]?token[_-]?user(=| =|:| :)")
  },
  {
    name: "sonatypepassword",
    regex: new RegExp("sonatypepassword(=| =|:| :)")
  },
  {
    name: "soundcloud_client_secret",
    regex: new RegExp("soundcloud[_-]?client[_-]?secret(=| =|:| :)")
  },
  {
    name: "soundcloud_password",
    regex: new RegExp("soundcloud[_-]?password(=| =|:| :)")
  },
  {
    name: "spaces_access_key_id",
    regex: new RegExp("spaces[_-]?access[_-]?key[_-]?id(=| =|:| :)")
  },
  {
    name: "spaces_secret_access_key",
    regex: new RegExp("spaces[_-]?secret[_-]?access[_-]?key(=| =|:| :)")
  },
  {
    name: "spotify_api_access_token",
    regex: new RegExp("spotify[_-]?api[_-]?access[_-]?token(=| =|:| :)")
  },
  {
    name: "spotify_api_client_secret",
    regex: new RegExp("spotify[_-]?api[_-]?client[_-]?secret(=| =|:| :)")
  },
  {
    name: "spring_mail_password",
    regex: new RegExp("spring[_-]?mail[_-]?password(=| =|:| :)")
  },
  { name: "sqsaccesskey", regex: new RegExp("sqsaccesskey(=| =|:| :)") },
  { name: "sqssecretkey", regex: new RegExp("sqssecretkey(=| =|:| :)") },
  {
    name: "square_app_secret",
    regex: new RegExp("(sq0[a-z]{3}-[0-9A-Za-z-_]{20,50})")
  },
  {
    name: "square_reader_sdk_repository_password",
    regex: new RegExp("square[_-]?reader[_-]?sdk[_-]?repository[_-]?password(=| =|:| :)")
  },
  {
    name: "srcclr_api_token",
    regex: new RegExp("srcclr[_-]?api[_-]?token(=| =|:| :)")
  },
  { name: "ssh_password", regex: new RegExp(`(sshpass -p.*['|"])`) },
  { name: "sshpass", regex: new RegExp("sshpass(=| =|:| :)") },
  { name: "ssmtp_config", regex: new RegExp("ssmtp[_-]?config(=| =|:| :)") },
  {
    name: "staging_base_url_runscope",
    regex: new RegExp("staging[_-]?base[_-]?url[_-]?runscope(=| =|:| :)")
  },
  {
    name: "star_test_aws_access_key_id",
    regex: new RegExp("star[_-]?test[_-]?aws[_-]?access[_-]?key[_-]?id(=| =|:| :)")
  },
  {
    name: "star_test_bucket",
    regex: new RegExp("star[_-]?test[_-]?bucket(=| =|:| :)")
  },
  {
    name: "star_test_location",
    regex: new RegExp("star[_-]?test[_-]?location(=| =|:| :)")
  },
  {
    name: "star_test_secret_access_key",
    regex: new RegExp("star[_-]?test[_-]?secret[_-]?access[_-]?key(=| =|:| :)")
  },
  {
    name: "starship_account_sid",
    regex: new RegExp("starship[_-]?account[_-]?sid(=| =|:| :)")
  },
  {
    name: "starship_auth_token",
    regex: new RegExp("starship[_-]?auth[_-]?token(=| =|:| :)")
  },
  {
    name: "stormpath_api_key_id",
    regex: new RegExp("stormpath[_-]?api[_-]?key[_-]?id(=| =|:| :)")
  },
  {
    name: "stormpath_api_key_secret",
    regex: new RegExp("stormpath[_-]?api[_-]?key[_-]?secret(=| =|:| :)")
  },
  {
    name: "strip_publishable_key",
    regex: new RegExp("strip[_-]?publishable[_-]?key(=| =|:| :)")
  },
  {
    name: "strip_secret_key",
    regex: new RegExp("strip[_-]?secret[_-]?key(=| =|:| :)")
  },
  {
    name: "stripe_private",
    regex: new RegExp("stripe[_-]?private(=| =|:| :)")
  },
  { name: "stripe_public", regex: new RegExp("stripe[_-]?public(=| =|:| :)") },
  {
    name: "stripe_restricted_api",
    regex: new RegExp("(rk_live_[0-9a-zA-Z]{24,34})")
  },
  {
    name: "stripe_standard_api",
    regex: new RegExp("(sk_live_[0-9a-zA-Z]{24,34})")
  },
  { name: "surge_login", regex: new RegExp("surge[_-]?login(=| =|:| :)") },
  { name: "surge_token", regex: new RegExp("surge[_-]?token(=| =|:| :)") },
  { name: "svn_pass", regex: new RegExp("svn[_-]?pass(=| =|:| :)") },
  {
    name: "tesco_api_key",
    regex: new RegExp("tesco[_-]?api[_-]?key(=| =|:| :)")
  },
  {
    name: "test_github_token",
    regex: new RegExp("test[_-]?github[_-]?token(=| =|:| :)")
  },
  { name: "test_test", regex: new RegExp("test[_-]?test(=| =|:| :)") },
  {
    name: "tester_keys_password",
    regex: new RegExp("tester[_-]?keys[_-]?password(=| =|:| :)")
  },
  {
    name: "thera_oss_access_key",
    regex: new RegExp("thera[_-]?oss[_-]?access[_-]?key(=| =|:| :)")
  },
  {
    name: "token_core_java",
    regex: new RegExp("token[_-]?core[_-]?java(=| =|:| :)")
  },
  {
    name: "travis_access_token",
    regex: new RegExp("travis[_-]?access[_-]?token(=| =|:| :)")
  },
  {
    name: "travis_api_token",
    regex: new RegExp("travis[_-]?api[_-]?token(=| =|:| :)")
  },
  { name: "travis_branch", regex: new RegExp("travis[_-]?branch(=| =|:| :)") },
  {
    name: "travis_com_token",
    regex: new RegExp("travis[_-]?com[_-]?token(=| =|:| :)")
  },
  {
    name: "travis_e2e_token",
    regex: new RegExp("travis[_-]?e2e[_-]?token(=| =|:| :)")
  },
  {
    name: "travis_gh_token",
    regex: new RegExp("travis[_-]?gh[_-]?token(=| =|:| :)")
  },
  {
    name: "travis_pull_request",
    regex: new RegExp("travis[_-]?pull[_-]?request(=| =|:| :)")
  },
  {
    name: "travis_secure_env_vars",
    regex: new RegExp("travis[_-]?secure[_-]?env[_-]?vars(=| =|:| :)")
  },
  { name: "travis_token", regex: new RegExp("travis[_-]?token(=| =|:| :)") },
  {
    name: "trex_client_token",
    regex: new RegExp("trex[_-]?client[_-]?token(=| =|:| :)")
  },
  {
    name: "trex_okta_client_token",
    regex: new RegExp("trex[_-]?okta[_-]?client[_-]?token(=| =|:| :)")
  },
  {
    name: "twilio_api_key",
    regex: new RegExp("twilio[_-]?api[_-]?key(=| =|:| :)")
  },
  {
    name: "twilio_api_secret",
    regex: new RegExp("twilio[_-]?api[_-]?secret(=| =|:| :)")
  },
  {
    name: "twilio_chat_account_api_service",
    regex: new RegExp("twilio[_-]?chat[_-]?account[_-]?api[_-]?service(=| =|:| :)")
  },
  {
    name: "twilio_configuration_sid",
    regex: new RegExp("twilio[_-]?configuration[_-]?sid(=| =|:| :)")
  },
  { name: "twilio_sid", regex: new RegExp("twilio[_-]?sid(=| =|:| :)") },
  { name: "twilio_token", regex: new RegExp("twilio[_-]?token(=| =|:| :)") },
  {
    name: "twine_password",
    regex: new RegExp("twine[_-]?password(=| =|:| :)")
  },
  {
    name: "twitter_consumer_key",
    regex: new RegExp("twitter[_-]?consumer[_-]?key(=| =|:| :)")
  },
  {
    name: "twitter_consumer_secret",
    regex: new RegExp("twitter[_-]?consumer[_-]?secret(=| =|:| :)")
  },
  {
    name: "twitteroauthaccesssecret",
    regex: new RegExp("twitteroauthaccesssecret(=| =|:| :)")
  },
  {
    name: "twitteroauthaccesstoken",
    regex: new RegExp("twitteroauthaccesstoken(=| =|:| :)")
  },
  {
    name: "unity_password",
    regex: new RegExp("unity[_-]?password(=| =|:| :)")
  },
  { name: "unity_serial", regex: new RegExp("unity[_-]?serial(=| =|:| :)") },
  { name: "urban_key", regex: new RegExp("urban[_-]?key(=| =|:| :)") },
  {
    name: "urban_master_secret",
    regex: new RegExp("urban[_-]?master[_-]?secret(=| =|:| :)")
  },
  { name: "urban_secret", regex: new RegExp("urban[_-]?secret(=| =|:| :)") },
  {
    name: "us_east_1_elb_amazonaws_com",
    regex: new RegExp("us[_-]?east[_-]?1[_-]?elb[_-]?amazonaws[_-]?com(=| =|:| :)")
  },
  { name: "use_ssh", regex: new RegExp("use[_-]?ssh(=| =|:| :)") },
  {
    name: "user_assets_access_key_id",
    regex: new RegExp("user[_-]?assets[_-]?access[_-]?key[_-]?id(=| =|:| :)")
  },
  {
    name: "user_assets_secret_access_key",
    regex: new RegExp("user[_-]?assets[_-]?secret[_-]?access[_-]?key(=| =|:| :)")
  },
  { name: "usertravis", regex: new RegExp("usertravis(=| =|:| :)") },
  {
    name: "v_sfdc_client_secret",
    regex: new RegExp("v[_-]?sfdc[_-]?client[_-]?secret(=| =|:| :)")
  },
  {
    name: "v_sfdc_password",
    regex: new RegExp("v[_-]?sfdc[_-]?password(=| =|:| :)")
  },
  {
    name: "vip_github_build_repo_deploy_key",
    regex: new RegExp("vip[_-]?github[_-]?build[_-]?repo[_-]?deploy[_-]?key(=| =|:| :)")
  },
  {
    name: "vip_github_deploy_key",
    regex: new RegExp("vip[_-]?github[_-]?deploy[_-]?key(=| =|:| :)")
  },
  {
    name: "vip_github_deploy_key_pass",
    regex: new RegExp("vip[_-]?github[_-]?deploy[_-]?key[_-]?pass(=| =|:| :)")
  },
  {
    name: "virustotal_apikey",
    regex: new RegExp("virustotal[_-]?apikey(=| =|:| :)")
  },
  {
    name: "visual_recognition_api_key",
    regex: new RegExp("visual[_-]?recognition[_-]?api[_-]?key(=| =|:| :)")
  },
  { name: "vscetoken", regex: new RegExp("vscetoken(=| =|:| :)") },
  {
    name: "wakatime_api_key",
    regex: new RegExp("wakatime[_-]?api[_-]?key(=| =|:| :)")
  },
  {
    name: "watson_conversation_password",
    regex: new RegExp("watson[_-]?conversation[_-]?password(=| =|:| :)")
  },
  {
    name: "watson_device_password",
    regex: new RegExp("watson[_-]?device[_-]?password(=| =|:| :)")
  },
  {
    name: "watson_password",
    regex: new RegExp("watson[_-]?password(=| =|:| :)")
  },
  {
    name: "widget_basic_password",
    regex: new RegExp("widget[_-]?basic[_-]?password(=| =|:| :)")
  },
  {
    name: "widget_basic_password_2",
    regex: new RegExp("widget[_-]?basic[_-]?password[_-]?2(=| =|:| :)")
  },
  {
    name: "widget_basic_password_3",
    regex: new RegExp("widget[_-]?basic[_-]?password[_-]?3(=| =|:| :)")
  },
  {
    name: "widget_basic_password_4",
    regex: new RegExp("widget[_-]?basic[_-]?password[_-]?4(=| =|:| :)")
  },
  {
    name: "widget_basic_password_5",
    regex: new RegExp("widget[_-]?basic[_-]?password[_-]?5(=| =|:| :)")
  },
  {
    name: "widget_fb_password",
    regex: new RegExp("widget[_-]?fb[_-]?password(=| =|:| :)")
  },
  {
    name: "widget_fb_password_2",
    regex: new RegExp("widget[_-]?fb[_-]?password[_-]?2(=| =|:| :)")
  },
  {
    name: "widget_fb_password_3",
    regex: new RegExp("widget[_-]?fb[_-]?password[_-]?3(=| =|:| :)")
  },
  {
    name: "widget_test_server",
    regex: new RegExp("widget[_-]?test[_-]?server(=| =|:| :)")
  },
  {
    name: "wincert_password",
    regex: new RegExp("wincert[_-]?password(=| =|:| :)")
  },
  {
    name: "wordpress_db_password",
    regex: new RegExp("wordpress[_-]?db[_-]?password(=| =|:| :)")
  },
  {
    name: "wordpress_db_user",
    regex: new RegExp("wordpress[_-]?db[_-]?user(=| =|:| :)")
  },
  {
    name: "wpjm_phpunit_google_geocode_api_key",
    regex: new RegExp("wpjm[_-]?phpunit[_-]?google[_-]?geocode[_-]?api[_-]?key(=| =|:| :)")
  },
  {
    name: "wporg_password",
    regex: new RegExp("wporg[_-]?password(=| =|:| :)")
  },
  {
    name: "wpt_db_password",
    regex: new RegExp("wpt[_-]?db[_-]?password(=| =|:| :)")
  },
  { name: "wpt_db_user", regex: new RegExp("wpt[_-]?db[_-]?user(=| =|:| :)") },
  {
    name: "wpt_prepare_dir",
    regex: new RegExp("wpt[_-]?prepare[_-]?dir(=| =|:| :)")
  },
  {
    name: "wpt_report_api_key",
    regex: new RegExp("wpt[_-]?report[_-]?api[_-]?key(=| =|:| :)")
  },
  {
    name: "wpt_ssh_connect",
    regex: new RegExp("wpt[_-]?ssh[_-]?connect(=| =|:| :)")
  },
  {
    name: "wpt_ssh_private_key_base64",
    regex: new RegExp("wpt[_-]?ssh[_-]?private[_-]?key[_-]?base64(=| =|:| :)")
  },
  {
    name: "www_googleapis_com",
    regex: new RegExp("www[_-]?googleapis[_-]?com(=| =|:| :)")
  },
  {
    name: "yangshun_gh_password",
    regex: new RegExp("yangshun[_-]?gh[_-]?password(=| =|:| :)")
  },
  {
    name: "yangshun_gh_token",
    regex: new RegExp("yangshun[_-]?gh[_-]?token(=| =|:| :)")
  },
  {
    name: "yt_account_client_secret",
    regex: new RegExp("yt[_-]?account[_-]?client[_-]?secret(=| =|:| :)")
  },
  {
    name: "yt_account_refresh_token",
    regex: new RegExp("yt[_-]?account[_-]?refresh[_-]?token(=| =|:| :)")
  },
  { name: "yt_api_key", regex: new RegExp("yt[_-]?api[_-]?key(=| =|:| :)") },
  {
    name: "yt_client_secret",
    regex: new RegExp("yt[_-]?client[_-]?secret(=| =|:| :)")
  },
  {
    name: "yt_partner_client_secret",
    regex: new RegExp("yt[_-]?partner[_-]?client[_-]?secret(=| =|:| :)")
  },
  {
    name: "yt_partner_refresh_token",
    regex: new RegExp("yt[_-]?partner[_-]?refresh[_-]?token(=| =|:| :)")
  },
  {
    name: "yt_server_api_key",
    regex: new RegExp("yt[_-]?server[_-]?api[_-]?key(=| =|:| :)")
  },
  {
    name: "zendesk_travis_github",
    regex: new RegExp("zendesk[_-]?travis[_-]?github(=| =|:| :)")
  },
  {
    name: "zensonatypepassword",
    regex: new RegExp("zensonatypepassword(=| =|:| :)")
  },
  {
    name: "zhuliang_gh_token",
    regex: new RegExp("zhuliang[_-]?gh[_-]?token(=| =|:| :)")
  },
  {
    name: "zopim_account_key",
    regex: new RegExp("zopim[_-]?account[_-]?key(=| =|:| :)")
  }
];
var SECRETS_ANALYZER_NAME = "secrets";
var secretsAnalyzerBuilder = createRegexAnalyzer({
  analyzerName: SECRETS_ANALYZER_NAME,
  regex: /./,
  filter: (match) => {
    for (const pattern of SECRET_PATTERNS) {
      if (pattern.regex.test(match.value)) {
        match.tags["secret"] = true;
        match.tags[pattern.name.toLowerCase().replace(/\s+/g, "-")] = true;
        return true;
      }
    }
    return false;
  }
});

// pkg/ast-analyzer/pii.ts
var PII_PATTERNS = [
  {
    name: "emails",
    regex: new RegExp("([a-z0-9!#$%&'*+\\/=?^_`{|.}~-]+@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)")
  },
  {
    name: "ipv4",
    regex: new RegExp("(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)")
  },
  { name: "Box Links", regex: new RegExp("https://app.box.com/[s|l]/\\S+") },
  { name: "CVE Number", regex: new RegExp("CVE-\\d{4}-\\d{4,7}") },
  { name: "California Drivers License", regex: new RegExp("^[A-Z]{1}\\d{7}$") },
  {
    name: "Chase Routing Numbers - California",
    regex: new RegExp("^322271627$")
  },
  {
    name: "Cisco Router Config",
    regex: new RegExp("service\\ timestamps\\ [a-z]{3,5}\\ datetime\\ msec|boot-[a-z]{3,5}-marker|interface\\ [A-Za-z0-9]{0,10}[E,e]thernet")
  },
  {
    name: "Citibank Routing Numbers - California",
    regex: new RegExp("^32(?:11|22)71(?:18|72)4$")
  },
  {
    name: "DSA Private Key",
    regex: new RegExp(`-----BEGIN DSA PRIVATE KEY-----(?:[a-zA-Z0-9\\+\\=\\/"']|\\s)+?-----END DSA PRIVATE KEY-----`)
  },
  {
    name: "Dropbox Links",
    regex: new RegExp("https://www.dropbox.com/(?:s|l)/\\S+")
  },
  {
    name: "EC Private Key",
    regex: new RegExp(`-----BEGIN (?:EC|ECDSA) PRIVATE KEY-----(?:[a-zA-Z0-9\\+\\=\\/"']|\\s)+?-----END (?:EC|ECDSA) PRIVATE KEY-----`)
  },
  {
    name: "Encrypted DSA Private Key",
    regex: new RegExp("-----BEGIN DSA PRIVATE KEY-----\\s.*,ENCRYPTED(?:.|\\s)+?-----END DSA PRIVATE KEY-----")
  },
  {
    name: "Encrypted EC Private Key",
    regex: new RegExp("-----BEGIN (?:EC|ECDSA) PRIVATE KEY-----\\s.*,ENCRYPTED(?:.|\\s)+?-----END (?:EC|ECDSA) PRIVATE KEY-----")
  },
  {
    name: "Encrypted Private Key",
    regex: new RegExp("-----BEGIN ENCRYPTED PRIVATE KEY-----(?:.|\\s)+?-----END ENCRYPTED PRIVATE KEY-----")
  },
  {
    name: "Encrypted PuTTY SSH DSA Key",
    regex: new RegExp("PuTTY-User-Key-File-2: ssh-dss\\s*Encryption: aes(?:.|\\s?)*?Private-MAC:")
  },
  {
    name: "Encrypted RSA Private Key",
    regex: new RegExp("-----BEGIN RSA PRIVATE KEY-----\\s.*,ENCRYPTED(?:.|\\s)+?-----END RSA PRIVATE KEY-----")
  },
  {
    name: "Google Application Identifier",
    regex: new RegExp("[0-9]+-\\w+.apps.googleusercontent.com")
  },
  {
    name: "Huawei config file",
    regex: new RegExp("sysname\\ HUAWEI|set\\ authentication\\ password\\ simple\\ huawei")
  },
  {
    name: "Lightweight Directory Access Protocol",
    regex: new RegExp("(?:dn|cn|dc|sn):\\s*[a-zA-Z0-9=, ]*")
  },
  {
    name: "Metasploit Module",
    regex: new RegExp("require\\ 'msf/core'|class\\ Metasploit|include\\ Msf::Exploit::\\w+::\\w+")
  },
  {
    name: "MySQL database dump",
    regex: new RegExp("DROP DATABASE IF EXISTS(?:.|\\n){5,300}CREATE DATABASE(?:.|\\n){5,300}DROP TABLE IF EXISTS(?:.|\\n){5,300}CREATE TABLE")
  },
  {
    name: "MySQLite database dump",
    regex: new RegExp("DROP\\ TABLE\\ IF\\ EXISTS\\ \\[[a-zA-Z]*\\];|CREATE\\ TABLE\\ \\[[a-zA-Z]*\\];")
  },
  {
    name: "Network Proxy Auto-Config",
    regex: new RegExp("proxy\\.pac|function\\ FindProxyForURL\\(\\w+,\\ \\w+\\)")
  },
  {
    name: "Nmap Scan Report",
    regex: new RegExp("Nmap\\ scan\\ report\\ for\\ [a-zA-Z0-9.]+")
  },
  {
    name: "PGP Header",
    regex: new RegExp("-{5}(?:BEGIN|END)\\ PGP\\ MESSAGE-{5}")
  },
  {
    name: "PGP Private Key Block",
    regex: new RegExp("-----BEGIN PGP PRIVATE KEY BLOCK-----(?:.|\\s)+?-----END PGP PRIVATE KEY BLOCK-----")
  },
  {
    name: "PKCS7 Encrypted Data",
    regex: new RegExp("(?:Signer|Recipient)Info(?:s)?\\ ::=\\ \\w+|[D|d]igest(?:Encryption)?Algorithm|EncryptedKey\\ ::= \\w+")
  },
  {
    name: "Password etc passwd",
    regex: new RegExp('[a-zA-Z0-9\\-]+:[x|\\*]:\\d+:\\d+:[a-zA-Z0-9/\\- "]*:/[a-zA-Z0-9/\\-]*:/[a-zA-Z0-9/\\-]+')
  },
  {
    name: "Password etc shadow",
    regex: new RegExp("[a-zA-Z0-9\\-]+:(?:(?:!!?)|(?:\\*LOCK\\*?)|\\*|(?:\\*LCK\\*?)|(?:\\$.*\\$.*\\$.*?)?):\\d*:\\d*:\\d*:\\d*:\\d*:\\d*:")
  },
  {
    name: "PlainText Private Key",
    regex: new RegExp("-----BEGIN PRIVATE KEY-----(?:.|\\s)+?-----END PRIVATE KEY-----")
  },
  {
    name: "PuTTY SSH DSA Key",
    regex: new RegExp("PuTTY-User-Key-File-2: ssh-dss\\s*Encryption: none(?:.|\\s?)*?Private-MAC:")
  },
  {
    name: "PuTTY SSH RSA Key",
    regex: new RegExp("PuTTY-User-Key-File-2: ssh-rsa\\s*Encryption: none(?:.|\\s?)*?Private-MAC:")
  },
  {
    name: "Public Key Cryptography System (PKCS)",
    regex: new RegExp('protocol="application/x-pkcs[0-9]{0,2}-signature"')
  },
  {
    name: "Public encrypted key",
    regex: new RegExp("-----BEGIN PUBLIC KEY-----(?:.|\\s)+?-----END PUBLIC KEY-----")
  },
  {
    name: "RSA Private Key",
    regex: new RegExp(`-----BEGIN RSA PRIVATE KEY-----(?:[a-zA-Z0-9\\+\\=\\/"']|\\s)+?-----END RSA PRIVATE KEY-----`)
  },
  {
    name: "SSL Certificate",
    regex: new RegExp("-----BEGIN CERTIFICATE-----(?:.|\\n)+?\\s-----END CERTIFICATE-----")
  },
  {
    name: "Samba Password config file",
    regex: new RegExp("[a-z]*:\\d{3}:[0-9a-zA-Z]*:[0-9a-zA-Z]*:\\[U\\ \\]:.*")
  },
  {
    name: "aws_access_key",
    regex: new RegExp("((access[-_]?key[-_]?id)|(ACCESS[-_]?KEY[-_]?ID)|([Aa]ccessKeyId)|(access[_-]?id)).{0,20}AKIA[a-zA-Z0-9+/]{16}[^a-zA-Z0-9+/]")
  },
  {
    name: "aws_credentials_context",
    regex: new RegExp("access_key_id|secret_access_key|AssetSync.configure")
  },
  {
    name: "aws_secret_key",
    regex: new RegExp("((secret[-_]?access[-_]?key)|(SECRET[-_]?ACCESS[-_]?KEY|(private[-_]?key))|([Ss]ecretAccessKey)).{0,20}[^a-zA-Z0-9+/][a-zA-Z0-9+/]{40}\\b")
  },
  {
    name: "facebook_secret",
    regex: new RegExp(`(facebook_secret|FACEBOOK_SECRET|facebook_app_secret|FACEBOOK_APP_SECRET)[a-z_ =\\s"'\\:]{0,5}[^a-zA-Z0-9][a-f0-9]{32}[^a-zA-Z0-9]`)
  },
  {
    name: "github_key",
    regex: new RegExp(`(GITHUB_SECRET|GITHUB_KEY|github_secret|github_key|github_token|GITHUB_TOKEN|github_api_key|GITHUB_API_KEY)[a-z_ =\\s"'\\:]{0,10}[^a-zA-Z0-9][a-zA-Z0-9]{40}[^a-zA-Z0-9]`)
  },
  {
    name: "google_two_factor_backup",
    regex: new RegExp("(?:BACKUP VERIFICATION CODES|SAVE YOUR BACKUP CODES)[\\s\\S]{0,300}@")
  },
  {
    name: "heroku_key",
    regex: new RegExp(`(heroku_api_key|HEROKU_API_KEY|heroku_secret|HEROKU_SECRET)[a-z_ =\\s"'\\:]{0,10}[^a-zA-Z0-9-]\\w{8}(?:-\\w{4}){3}-\\w{12}[^a-zA-Z0-9\\-]`)
  },
  {
    name: "microsoft_office_365_oauth_context",
    regex: new RegExp("https://login.microsoftonline.com/common/oauth2/v2.0/token|https://login.windows.net/common/oauth2/token")
  },
  {
    name: "pgSQL Connection Information",
    regex: new RegExp("(?:postgres|pgsql)\\:\\/\\/")
  },
  {
    name: "slack_api_key",
    regex: new RegExp(`(slack_api_key|SLACK_API_KEY|slack_key|SLACK_KEY)[a-z_ =\\s"'\\:]{0,10}[^a-f0-9][a-f0-9]{32}[^a-f0-9]`)
  },
  {
    name: "slack_api_token",
    regex: new RegExp("(xox[pb](?:-[a-zA-Z0-9]+){4,})")
  },
  { name: "ssh_dss_public", regex: new RegExp("ssh-dss [0-9A-Za-z+/]+[=]{2}") },
  {
    name: "ssh_rsa_public",
    regex: new RegExp("ssh-rsa AAAA[0-9A-Za-z+/]+[=]{0,3} [^@]+@[^@]+")
  }
];
var PII_ANALYZER_NAME = "pii";
var piiAnalyzerBuilder = createRegexAnalyzer({
  analyzerName: PII_ANALYZER_NAME,
  regex: /./,
  filter: (match) => {
    for (const pattern of PII_PATTERNS) {
      if (pattern.regex.test(match.value)) {
        match.tags["pii"] = true;
        match.tags[pattern.name.toLowerCase().replace(/\s+/g, "-")] = true;
        return true;
      }
    }
    return false;
  }
});

// pkg/ast-analyzer/index.ts
function parseFile(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  let ast;
  const shouldUseTsPlugin = filePath.endsWith(".ts") || filePath.endsWith(".tsx") || filePath.endsWith(".jsx");
  try {
    if (shouldUseTsPlugin) {
      ast = Parser.extend(tsPlugin()).parse(fileContent, {
        ecmaVersion: "latest",
        sourceType: "module",
        locations: true
      });
    } else {
      ast = LooseParser.parse(fileContent, {
        ecmaVersion: "latest",
        sourceType: "module",
        locations: true
      });
    }
  } catch (err) {
    if (shouldUseTsPlugin) {
      ast = Parser.extend(tsPlugin({})).parse(fileContent, {
        ecmaVersion: "latest",
        sourceType: "module",
        locations: true
      });
    } else {
      ast = LooseParser.parse(fileContent, {
        ecmaVersion: "latest",
        sourceType: "module",
        locations: true
      });
    }
  }
  return { ast, source: fileContent, filePath };
}
function printUsage() {
  console.error("Usage: tsx pkg/ast-analyzers/index.ts <filepath>");
  process.exit(1);
}
function analyzeFile(filePath, analyzersToRun) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Error: File not found: ${filePath}`);
  }
  const results = [];
  const args = parseFile(filePath);
  const createAnalyzer = (type, builder) => {
    if (type === "emails" && !analyzersToRun?.includes("emails") || type === "link-manipulation" && !analyzersToRun?.includes("link-manipulation")) {
      return null;
    }
    return !analyzersToRun || analyzersToRun.includes(type) ? builder(args, results) : null;
  };
  const pathsAnalyzer = createAnalyzer("paths", pathsAnalyzerBuilder);
  const emailsAnalyzer = createAnalyzer("emails", emailsAnalyzerBuilder);
  const postMessageAnalyzer = createAnalyzer("post-message", postMessageAnalyzerBuilder);
  const messageListenerAnalyzer = createAnalyzer("message-listener", messageListenerAnalyzerBuilder);
  const regexMatchAnalyzer = createAnalyzer("regex-match", regexMatchAnalyzerBuilder);
  const hashChangeAnalyzer = createAnalyzer("hash-change", hashChangeAnalyzerBuilder);
  const regexAnalyzer = createAnalyzer("regex", regexAnalyzerBuilder);
  const domXssAnalyzer = createAnalyzer("dom-xss", domXssAnalyzerBuilder);
  const graphqlAnalyzer = createAnalyzer("graphql", graphqlAnalyzerBuilder);
  const urlsAnalyzer = createAnalyzer("urls", urlsAnalyzerBuilder);
  const jqueryDomXssAnalyzer = createAnalyzer("jquery-dom-xss", jqueryDomXssAnalyzerBuilder);
  const openRedirectionAnalyzer = createAnalyzer("open-redirection", openRedirectionAnalyzerBuilder);
  const cookieManipulationAnalyzer = createAnalyzer("cookie-manipulation", cookieManipulationAnalyzerBuilder);
  const javascriptInjectionAnalyzer = createAnalyzer("javascript-injection", javascriptInjectionAnalyzerBuilder);
  const documentDomainManipulationAnalyzer = createAnalyzer("document-domain-manipulation", documentDomainManipulationAnalyzerBuilder);
  const websocketUrlPoisoningAnalyzer = createAnalyzer("websocket-url-poisoning", websocketUrlPoisoningAnalyzerBuilder);
  const linkManipulationAnalyzer = createAnalyzer("link-manipulation", linkManipulationAnalyzerBuilder);
  const ajaxRequestHeaderManipulationAnalyzer = createAnalyzer("ajax-request-header-manipulation", ajaxRequestHeaderManipulationAnalyzerBuilder);
  const localFilePathManipulationAnalyzer = createAnalyzer("local-file-path-manipulation", localFilePathManipulationAnalyzerBuilder);
  const html5StorageManipulationAnalyzer = createAnalyzer("html5-storage-manipulation", html5StorageManipulationAnalyzerBuilder);
  const xpathInjectionAnalyzer = createAnalyzer("xpath-injection", xpathInjectionAnalyzerBuilder);
  const domDataManipulationAnalyzer = createAnalyzer("dom-data-manipulation", domDataManipulationAnalyzerBuilder);
  const commonSourcesAnalyzer = createAnalyzer("common-sources", commonSourcesAnalyzerBuilder);
  const secretsAnalyzer = createAnalyzer("secrets", secretsAnalyzerBuilder);
  const piiAnalyzer = createAnalyzer("pii", piiAnalyzerBuilder);
  ancestor(args.ast, {
    Literal(node, state, ancestors) {
      pathsAnalyzer?.Literal?.(node, state, ancestors);
      emailsAnalyzer?.Literal?.(node, state, ancestors);
      regexAnalyzer?.Literal?.(node, state, ancestors);
      graphqlAnalyzer?.Literal?.(node, state, ancestors);
      urlsAnalyzer?.Literal?.(node, state, ancestors);
      secretsAnalyzer?.Literal?.(node, state, ancestors);
      piiAnalyzer?.Literal?.(node, state, ancestors);
    },
    NewExpression(node, state, ancestors) {
      regexAnalyzer?.NewExpression?.(node, state, ancestors);
      websocketUrlPoisoningAnalyzer?.NewExpression?.(node, state, ancestors);
    },
    TemplateLiteral(node, state, ancestors) {
      pathsAnalyzer?.TemplateLiteral?.(node, state, ancestors);
      emailsAnalyzer?.TemplateLiteral?.(node, state, ancestors);
      graphqlAnalyzer?.TemplateLiteral?.(node, state, ancestors);
      urlsAnalyzer?.TemplateLiteral?.(node, state, ancestors);
      secretsAnalyzer?.TemplateLiteral?.(node, state, ancestors);
      piiAnalyzer?.TemplateLiteral?.(node, state, ancestors);
    },
    CallExpression(node, state, ancestors) {
      postMessageAnalyzer?.CallExpression?.(node, state, ancestors);
      messageListenerAnalyzer?.CallExpression?.(node, state, ancestors);
      regexMatchAnalyzer?.CallExpression?.(node, state, ancestors);
      hashChangeAnalyzer?.CallExpression?.(node, state, ancestors);
      domXssAnalyzer?.CallExpression?.(node, state, ancestors);
      jqueryDomXssAnalyzer?.CallExpression?.(node, state, ancestors);
      openRedirectionAnalyzer?.CallExpression?.(node, state, ancestors);
      javascriptInjectionAnalyzer?.CallExpression?.(node, state, ancestors);
      ajaxRequestHeaderManipulationAnalyzer?.CallExpression?.(node, state, ancestors);
      localFilePathManipulationAnalyzer?.CallExpression?.(node, state, ancestors);
      html5StorageManipulationAnalyzer?.CallExpression?.(node, state, ancestors);
      xpathInjectionAnalyzer?.CallExpression?.(node, state, ancestors);
      commonSourcesAnalyzer?.CallExpression?.(node, state, ancestors);
    },
    AssignmentExpression(node, state, ancestors) {
      messageListenerAnalyzer?.AssignmentExpression?.(node, state, ancestors);
      hashChangeAnalyzer?.AssignmentExpression?.(node, state, ancestors);
      domXssAnalyzer?.AssignmentExpression?.(node, state, ancestors);
      cookieManipulationAnalyzer?.AssignmentExpression?.(node, state, ancestors);
      linkManipulationAnalyzer?.AssignmentExpression?.(node, state, ancestors);
    },
    MemberExpression(node, state, ancestors) {
      openRedirectionAnalyzer?.MemberExpression?.(node, state, ancestors);
      documentDomainManipulationAnalyzer?.MemberExpression?.(node, state, ancestors);
      linkManipulationAnalyzer?.MemberExpression?.(node, state, ancestors);
      domDataManipulationAnalyzer?.MemberExpression?.(node, state, ancestors);
      commonSourcesAnalyzer?.MemberExpression?.(node, state, ancestors);
    }
  });
  return results;
}
function main() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    printUsage();
  }
  const [filePath] = args;
  try {
    const results = analyzeFile(filePath);
    console.log(JSON.stringify(results));
  } catch (error) {
    console.error(`Error running ast analysis:`, error);
    process.exit(1);
  }
}
if (import.meta.main) {
  main();
}
export {
  parseFile,
  analyzeFile
};
