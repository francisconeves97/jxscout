/******/ (function () {
  // webpackBootstrap
  /******/ "use strict";
  /******/ var __webpack_modules__ = {
    /***/ 93565: /***/ function (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ getStaticProps: function () {
          return /* binding */ getStaticProps;
        },
        /* harmony export */ getStaticPaths: function () {
          return /* binding */ getStaticPaths;
        },
        /* harmony export */ getServerSideProps: function () {
          return /* binding */ getServerSideProps;
        },
        /* harmony export */ unstable_getStaticParams: function () {
          return /* binding */ unstable_getStaticParams;
        },
        /* harmony export */ unstable_getStaticProps: function () {
          return /* binding */ unstable_getStaticProps;
        },
        /* harmony export */ unstable_getStaticPaths: function () {
          return /* binding */ unstable_getStaticPaths;
        },
        /* harmony export */ unstable_getServerProps: function () {
          return /* binding */ unstable_getServerProps;
        },
        /* harmony export */ config: function () {
          return /* binding */ config;
        },
        /* harmony export */ _app: function () {
          return /* binding */ _app;
        },
        /* harmony export */ renderReqToHTML: function () {
          return /* binding */ renderReqToHTML;
        },
        /* harmony export */ render: function () {
          return /* binding */ render;
        },
        /* harmony export */
      });
      /* harmony import */ var next_dist_next_server_server_node_polyfill_fetch__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(3660);
      /* harmony import */ var next_dist_next_server_server_node_polyfill_fetch__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/ __webpack_require__.n(
          next_dist_next_server_server_node_polyfill_fetch__WEBPACK_IMPORTED_MODULE_0__
        );
      /* harmony import */ var private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__ =
        __webpack_require__(35706);
      /* harmony import */ var private_dot_next_build_manifest_json__WEBPACK_IMPORTED_MODULE_2__ =
        __webpack_require__(32738);
      /* harmony import */ var private_dot_next_react_loadable_manifest_json__WEBPACK_IMPORTED_MODULE_3__ =
        __webpack_require__(19392);
      /* harmony import */ var next_dist_build_webpack_loaders_next_serverless_loader_page_handler__WEBPACK_IMPORTED_MODULE_4__ =
        __webpack_require__(99436);

      const { processEnv } = __webpack_require__(72333);
      processEnv([]);

      const runtimeConfig = {};
      const documentModule = __webpack_require__(53789);

      const appMod = __webpack_require__(8412);
      let App =
        appMod.default || (appMod.then && appMod.then((mod) => mod.default));

      const compMod = __webpack_require__(3359);

      const Component =
        compMod.default || (compMod.then && compMod.then((mod) => mod.default));
      /* harmony default export */ __webpack_exports__["default"] = Component;
      const getStaticProps =
        compMod["getStaticProp" + "s"] ||
        (compMod.then && compMod.then((mod) => mod["getStaticProp" + "s"]));
      const getStaticPaths =
        compMod["getStaticPath" + "s"] ||
        (compMod.then && compMod.then((mod) => mod["getStaticPath" + "s"]));
      const getServerSideProps =
        compMod["getServerSideProp" + "s"] ||
        (compMod.then && compMod.then((mod) => mod["getServerSideProp" + "s"]));

      // kept for detecting legacy exports
      const unstable_getStaticParams =
        compMod["unstable_getStaticParam" + "s"] ||
        (compMod.then &&
          compMod.then((mod) => mod["unstable_getStaticParam" + "s"]));
      const unstable_getStaticProps =
        compMod["unstable_getStaticProp" + "s"] ||
        (compMod.then &&
          compMod.then((mod) => mod["unstable_getStaticProp" + "s"]));
      const unstable_getStaticPaths =
        compMod["unstable_getStaticPath" + "s"] ||
        (compMod.then &&
          compMod.then((mod) => mod["unstable_getStaticPath" + "s"]));
      const unstable_getServerProps =
        compMod["unstable_getServerProp" + "s"] ||
        (compMod.then &&
          compMod.then((mod) => mod["unstable_getServerProp" + "s"]));

      let config =
        compMod["confi" + "g"] ||
        (compMod.then && compMod.then((mod) => mod["confi" + "g"])) ||
        {};
      const _app = App;

      const combinedRewrites = Array.isArray(
        private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__ /* .rewrites */.Dg
      )
        ? private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__ /* .rewrites */.Dg
        : [];

      if (
        !Array.isArray(
          private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__ /* .rewrites */.Dg
        )
      ) {
        combinedRewrites.push(
          ...private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__ /* .rewrites.beforeFiles */
            .Dg.beforeFiles
        );
        combinedRewrites.push(
          ...private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__ /* .rewrites.afterFiles */
            .Dg.afterFiles
        );
        combinedRewrites.push(
          ...private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__ /* .rewrites.fallback */
            .Dg.fallback
        );
      }

      const { renderReqToHTML, render } = (0,
      next_dist_build_webpack_loaders_next_serverless_loader_page_handler__WEBPACK_IMPORTED_MODULE_4__ /* .getPageHandler */.u)(
        {
          pageModule: compMod,
          pageComponent: Component,
          pageConfig: config,
          appModule: App,
          documentModule: documentModule,
          errorModule: __webpack_require__(3359),
          notFoundModule: undefined,
          pageGetStaticProps: getStaticProps,
          pageGetStaticPaths: getStaticPaths,
          pageGetServerSideProps: getServerSideProps,

          assetPrefix: "",
          canonicalBase: "",
          generateEtags: true,
          poweredByHeader: true,

          runtimeConfig,
          buildManifest:
            private_dot_next_build_manifest_json__WEBPACK_IMPORTED_MODULE_2__,
          reactLoadableManifest:
            private_dot_next_react_loadable_manifest_json__WEBPACK_IMPORTED_MODULE_3__,

          rewrites: combinedRewrites,
          i18n: undefined,
          page: "/_error",
          buildId: "N4cOguXrZ6u3JIDABvKIW",
          escapedBuildId: "N4cOguXrZ6u3JIDABvKIW",
          basePath: "",
          pageIsDynamic: false,
          encodedPreviewProps: {
            previewModeId: "60a63c481e8d2f56513713740faf0bee",
            previewModeSigningKey:
              "8f2caef78274ef80dd23618d900d36b011cc523ee040753322c91bc686f2d8fe",
            previewModeEncryptionKey:
              "1c84ebb4a46879e918ee721180745759ab5c322056138ee9f73f047773068d2e",
          },
        }
      );

      /***/
    },

    /***/ 64293: /***/ function (module) {
      module.exports = require("buffer");

      /***/
    },

    /***/ 45532: /***/ function (module) {
      module.exports = require("critters");

      /***/
    },

    /***/ 76417: /***/ function (module) {
      module.exports = require("crypto");

      /***/
    },

    /***/ 28614: /***/ function (module) {
      module.exports = require("events");

      /***/
    },

    /***/ 35747: /***/ function (module) {
      module.exports = require("fs");

      /***/
    },

    /***/ 98605: /***/ function (module) {
      module.exports = require("http");

      /***/
    },

    /***/ 57211: /***/ function (module) {
      module.exports = require("https");

      /***/
    },

    /***/ 33700: /***/ function (module) {
      module.exports = require("next/dist/compiled/@ampproject/toolbox-optimizer");

      /***/
    },

    /***/ 12087: /***/ function (module) {
      module.exports = require("os");

      /***/
    },

    /***/ 85622: /***/ function (module) {
      module.exports = require("path");

      /***/
    },

    /***/ 71191: /***/ function (module) {
      module.exports = require("querystring");

      /***/
    },

    /***/ 92413: /***/ function (module) {
      module.exports = require("stream");

      /***/
    },

    /***/ 24304: /***/ function (module) {
      module.exports = require("string_decoder");

      /***/
    },

    /***/ 78835: /***/ function (module) {
      module.exports = require("url");

      /***/
    },

    /***/ 31669: /***/ function (module) {
      module.exports = require("util");

      /***/
    },

    /***/ 78761: /***/ function (module) {
      module.exports = require("zlib");

      /***/
    },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ id: moduleId,
      /******/ loaded: false,
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ var threw = true;
    /******/ try {
      /******/ __webpack_modules__[moduleId].call(
        module.exports,
        module,
        module.exports,
        __webpack_require__
      );
      /******/ threw = false;
      /******/
    } finally {
      /******/ if (threw) delete __webpack_module_cache__[moduleId];
      /******/
    }
    /******/
    /******/ // Flag the module as loaded
    /******/ module.loaded = true;
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/ __webpack_require__.m = __webpack_modules__;
  /******/
  /******/ // the startup function
  /******/ __webpack_require__.x = function () {
    /******/ // Load entry module and return exports
    /******/ // This entry module depends on other loaded chunks and execution need to be delayed
    /******/ var __webpack_exports__ = __webpack_require__.O(
      undefined,
      [87, 33, 256],
      function () {
        return __webpack_require__(93565);
      }
    );
    /******/ __webpack_exports__ = __webpack_require__.O(__webpack_exports__);
    /******/ return __webpack_exports__;
    /******/
  };
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/chunk loaded */
  /******/ !(function () {
    /******/ var deferred = [];
    /******/ __webpack_require__.O = function (result, chunkIds, fn, priority) {
      /******/ if (chunkIds) {
        /******/ priority = priority || 0;
        /******/ for (
          var i = deferred.length;
          i > 0 && deferred[i - 1][2] > priority;
          i--
        )
          deferred[i] = deferred[i - 1];
        /******/ deferred[i] = [chunkIds, fn, priority];
        /******/ return;
        /******/
      }
      /******/ var notFulfilled = Infinity;
      /******/ for (var i = 0; i < deferred.length; i++) {
        /******/ var chunkIds = deferred[i][0];
        /******/ var fn = deferred[i][1];
        /******/ var priority = deferred[i][2];
        /******/ var fulfilled = true;
        /******/ for (var j = 0; j < chunkIds.length; j++) {
          /******/ if (
            (priority & (1 === 0) || notFulfilled >= priority) &&
            Object.keys(__webpack_require__.O).every(function (key) {
              return __webpack_require__.O[key](chunkIds[j]);
            })
          ) {
            /******/ chunkIds.splice(j--, 1);
            /******/
          } else {
            /******/ fulfilled = false;
            /******/ if (priority < notFulfilled) notFulfilled = priority;
            /******/
          }
          /******/
        }
        /******/ if (fulfilled) {
          /******/ deferred.splice(i--, 1);
          /******/ result = fn();
          /******/
        }
        /******/
      }
      /******/ return result;
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/compat get default export */
  /******/ !(function () {
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/ __webpack_require__.n = function (module) {
      /******/ var getter =
        module && module.__esModule
          ? /******/ function () {
              return module["default"];
            }
          : /******/ function () {
              return module;
            };
      /******/ __webpack_require__.d(getter, { a: getter });
      /******/ return getter;
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/define property getters */
  /******/ !(function () {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = function (exports, definition) {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/ensure chunk */
  /******/ !(function () {
    /******/ __webpack_require__.f = {};
    /******/ // This file contains only the entry chunk.
    /******/ // The chunk loading function for additional chunks
    /******/ __webpack_require__.e = function (chunkId) {
      /******/ return Promise.all(
        Object.keys(__webpack_require__.f).reduce(function (promises, key) {
          /******/ __webpack_require__.f[key](chunkId, promises);
          /******/ return promises;
          /******/
        }, [])
      );
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/get javascript chunk filename */
  /******/ !(function () {
    /******/ // This function allow to reference async chunks and sibling chunks for the entrypoint
    /******/ __webpack_require__.u = function (chunkId) {
      /******/ // return url for filenames based on template
      /******/ return "" + chunkId + ".js";
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ !(function () {
    /******/ __webpack_require__.o = function (obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ !(function () {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = function (exports) {
      /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
        /******/
      }
      /******/ Object.defineProperty(exports, "__esModule", { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/node module decorator */
  /******/ !(function () {
    /******/ __webpack_require__.nmd = function (module) {
      /******/ module.paths = [];
      /******/ if (!module.children) module.children = [];
      /******/ return module;
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/compat */
  /******/
  /******/ // Font manifest declaration
  /******/ __webpack_require__.__NEXT_FONT_MANIFEST__ = [
    {
      url: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap",
      content:
        "@font-face{font-family:'Roboto';font-style:normal;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmSU5fBBc-.woff) format('woff')}@font-face{font-family:'Roboto';font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxM.woff) format('woff')}@font-face{font-family:'Roboto';font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmEU9fBBc-.woff) format('woff')}@font-face{font-family:'Roboto';font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmWUlfBBc-.woff) format('woff')}@font-face{font-family:'Roboto';font-style:normal;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmSU5fCRc4AMP6lbBP.woff2) format('woff2');unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:'Roboto';font-style:normal;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmSU5fABc4AMP6lbBP.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Roboto';font-style:normal;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmSU5fCBc4AMP6lbBP.woff2) format('woff2');unicode-range:U+1F00-1FFF}@font-face{font-family:'Roboto';font-style:normal;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmSU5fBxc4AMP6lbBP.woff2) format('woff2');unicode-range:U+0370-03FF}@font-face{font-family:'Roboto';font-style:normal;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmSU5fCxc4AMP6lbBP.woff2) format('woff2');unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EF9,U+20AB}@font-face{font-family:'Roboto';font-style:normal;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmSU5fChc4AMP6lbBP.woff2) format('woff2');unicode-range:U+0100-024F,U+0259,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Roboto';font-style:normal;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmSU5fBBc4AMP6lQ.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:'Roboto';font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu72xKKTU1Kvnz.woff2) format('woff2');unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:'Roboto';font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu5mxKKTU1Kvnz.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Roboto';font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu7mxKKTU1Kvnz.woff2) format('woff2');unicode-range:U+1F00-1FFF}@font-face{font-family:'Roboto';font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4WxKKTU1Kvnz.woff2) format('woff2');unicode-range:U+0370-03FF}@font-face{font-family:'Roboto';font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu7WxKKTU1Kvnz.woff2) format('woff2');unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EF9,U+20AB}@font-face{font-family:'Roboto';font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu7GxKKTU1Kvnz.woff2) format('woff2');unicode-range:U+0100-024F,U+0259,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Roboto';font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:'Roboto';font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmEU9fCRc4AMP6lbBP.woff2) format('woff2');unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:'Roboto';font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmEU9fABc4AMP6lbBP.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Roboto';font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmEU9fCBc4AMP6lbBP.woff2) format('woff2');unicode-range:U+1F00-1FFF}@font-face{font-family:'Roboto';font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmEU9fBxc4AMP6lbBP.woff2) format('woff2');unicode-range:U+0370-03FF}@font-face{font-family:'Roboto';font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmEU9fCxc4AMP6lbBP.woff2) format('woff2');unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EF9,U+20AB}@font-face{font-family:'Roboto';font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmEU9fChc4AMP6lbBP.woff2) format('woff2');unicode-range:U+0100-024F,U+0259,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Roboto';font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmEU9fBBc4AMP6lQ.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:'Roboto';font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmWUlfCRc4AMP6lbBP.woff2) format('woff2');unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:'Roboto';font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmWUlfABc4AMP6lbBP.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Roboto';font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmWUlfCBc4AMP6lbBP.woff2) format('woff2');unicode-range:U+1F00-1FFF}@font-face{font-family:'Roboto';font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmWUlfBxc4AMP6lbBP.woff2) format('woff2');unicode-range:U+0370-03FF}@font-face{font-family:'Roboto';font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmWUlfCxc4AMP6lbBP.woff2) format('woff2');unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EF9,U+20AB}@font-face{font-family:'Roboto';font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmWUlfChc4AMP6lbBP.woff2) format('woff2');unicode-range:U+0100-024F,U+0259,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Roboto';font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmWUlfBBc4AMP6lQ.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}",
    },
  ];
  /******/ // Enable feature:
  /******/ process.env.__NEXT_OPTIMIZE_FONTS =
    JSON.stringify(true); /* webpack/runtime/require chunk loading */
  /******/ !(function () {
    /******/ // no baseURI
    /******/
    /******/ // object to store loaded chunks
    /******/ // "1" means "loaded", otherwise not loaded yet
    /******/ var installedChunks = {
      /******/ 820: 1,
      /******/
    };
    /******/
    /******/ __webpack_require__.O.require = function (chunkId) {
      return installedChunks[chunkId];
    };
    /******/
    /******/ var installChunk = function (chunk) {
      /******/ var moreModules = chunk.modules,
        chunkIds = chunk.ids,
        runtime = chunk.runtime;
      /******/ for (var moduleId in moreModules) {
        /******/ if (__webpack_require__.o(moreModules, moduleId)) {
          /******/ __webpack_require__.m[moduleId] = moreModules[moduleId];
          /******/
        }
        /******/
      }
      /******/ if (runtime) runtime(__webpack_require__);
      /******/ for (var i = 0; i < chunkIds.length; i++)
        /******/ installedChunks[chunkIds[i]] = 1;
      /******/ __webpack_require__.O();
      /******/
    };
    /******/
    /******/ // require() chunk loading for javascript
    /******/ __webpack_require__.f.require = function (chunkId, promises) {
      /******/ // "1" is the signal for "already loaded"
      /******/ if (!installedChunks[chunkId]) {
        /******/ if (true) {
          // all chunks have JS
          /******/ installChunk(
            require("../chunks/" + __webpack_require__.u(chunkId))
          );
          /******/
        } else {
        }
        /******/
      }
      /******/
    };
    /******/
    /******/ // no external install chunk
    /******/
    /******/ // no HMR
    /******/
    /******/ // no HMR manifest
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/startup chunk dependencies */
  /******/ !(function () {
    /******/ var next = __webpack_require__.x;
    /******/ __webpack_require__.x = function () {
      /******/ __webpack_require__.e(87);
      /******/ __webpack_require__.e(33);
      /******/ __webpack_require__.e(256);
      /******/ return next();
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  /******/
  /******/ // run startup
  /******/ var __webpack_exports__ = __webpack_require__.x();
  /******/ module.exports = __webpack_exports__;
  /******/
  /******/
})();
