/******/ (() => {
  // webpackBootstrap
  /******/ var __webpack_modules__ = {
    /***/ "./node_modules/@ageesea/psgc-js/src/extract lazy recursive ^\\.\\/geo\\-reg\\-.*\\.json$":
      /*!***************************************************************************************************!*\
  !*** ./node_modules/@ageesea/psgc-js/src/extract/ lazy ^\.\/geo\-reg\-.*\.json$ namespace object ***!
  \***************************************************************************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        var map = {
          "./geo-reg-1.json": [
            "./node_modules/@ageesea/psgc-js/src/extract/geo-reg-1.json",
            "node_modules_ageesea_psgc-js_src_extract_geo-reg-1_json",
          ],
          "./geo-reg-10.json": [
            "./node_modules/@ageesea/psgc-js/src/extract/geo-reg-10.json",
            "node_modules_ageesea_psgc-js_src_extract_geo-reg-10_json",
          ],
          "./geo-reg-11.json": [
            "./node_modules/@ageesea/psgc-js/src/extract/geo-reg-11.json",
            "node_modules_ageesea_psgc-js_src_extract_geo-reg-11_json",
          ],
          "./geo-reg-12.json": [
            "./node_modules/@ageesea/psgc-js/src/extract/geo-reg-12.json",
            "node_modules_ageesea_psgc-js_src_extract_geo-reg-12_json",
          ],
          "./geo-reg-13.json": [
            "./node_modules/@ageesea/psgc-js/src/extract/geo-reg-13.json",
            "node_modules_ageesea_psgc-js_src_extract_geo-reg-13_json",
          ],
          "./geo-reg-14.json": [
            "./node_modules/@ageesea/psgc-js/src/extract/geo-reg-14.json",
            "node_modules_ageesea_psgc-js_src_extract_geo-reg-14_json",
          ],
          "./geo-reg-15.json": [
            "./node_modules/@ageesea/psgc-js/src/extract/geo-reg-15.json",
            "node_modules_ageesea_psgc-js_src_extract_geo-reg-15_json",
          ],
          "./geo-reg-16.json": [
            "./node_modules/@ageesea/psgc-js/src/extract/geo-reg-16.json",
            "node_modules_ageesea_psgc-js_src_extract_geo-reg-16_json",
          ],
          "./geo-reg-17.json": [
            "./node_modules/@ageesea/psgc-js/src/extract/geo-reg-17.json",
            "node_modules_ageesea_psgc-js_src_extract_geo-reg-17_json",
          ],
          "./geo-reg-2.json": [
            "./node_modules/@ageesea/psgc-js/src/extract/geo-reg-2.json",
            "node_modules_ageesea_psgc-js_src_extract_geo-reg-2_json",
          ],
          "./geo-reg-3.json": [
            "./node_modules/@ageesea/psgc-js/src/extract/geo-reg-3.json",
            "node_modules_ageesea_psgc-js_src_extract_geo-reg-3_json",
          ],
          "./geo-reg-4.json": [
            "./node_modules/@ageesea/psgc-js/src/extract/geo-reg-4.json",
            "node_modules_ageesea_psgc-js_src_extract_geo-reg-4_json",
          ],
          "./geo-reg-5.json": [
            "./node_modules/@ageesea/psgc-js/src/extract/geo-reg-5.json",
            "node_modules_ageesea_psgc-js_src_extract_geo-reg-5_json",
          ],
          "./geo-reg-6.json": [
            "./node_modules/@ageesea/psgc-js/src/extract/geo-reg-6.json",
            "node_modules_ageesea_psgc-js_src_extract_geo-reg-6_json",
          ],
          "./geo-reg-7.json": [
            "./node_modules/@ageesea/psgc-js/src/extract/geo-reg-7.json",
            "node_modules_ageesea_psgc-js_src_extract_geo-reg-7_json",
          ],
          "./geo-reg-8.json": [
            "./node_modules/@ageesea/psgc-js/src/extract/geo-reg-8.json",
            "node_modules_ageesea_psgc-js_src_extract_geo-reg-8_json",
          ],
          "./geo-reg-9.json": [
            "./node_modules/@ageesea/psgc-js/src/extract/geo-reg-9.json",
            "node_modules_ageesea_psgc-js_src_extract_geo-reg-9_json",
          ],
        };
        function webpackAsyncContext(req) {
          if (!__webpack_require__.o(map, req)) {
            return Promise.resolve().then(() => {
              var e = new Error("Cannot find module '" + req + "'");
              e.code = "MODULE_NOT_FOUND";
              throw e;
            });
          }

          var ids = map[req],
            id = ids[0];
          return __webpack_require__.e(ids[1]).then(() => {
            return __webpack_require__.t(id, 3 | 16);
          });
        }
        webpackAsyncContext.keys = () => Object.keys(map);
        webpackAsyncContext.id =
          "./node_modules/@ageesea/psgc-js/src/extract lazy recursive ^\\.\\/geo\\-reg\\-.*\\.json$";
        module.exports = webpackAsyncContext;

        /***/
      },

    /***/ "./node_modules/@ageesea/psgc-js/src/index.js":
      /*!****************************************************!*\
    !*** ./node_modules/@ageesea/psgc-js/src/index.js ***!
    \****************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        let _objRegion;
        let _objProvinces;
        let _objMunicipality;
        let _objBarangay;
        let _addNameToKey = false;

        const clearOptions = (...obj) => {
          if (obj instanceof Array) {
            obj.forEach(function (elem) {
              if (elem.length > 0) {
                for (let [index, item] of Object.entries(elem[0].options))
                  item.remove();
                elem[0].add(new Option("-- Please select --"));
              }
            });
          }
        };

        const onChangeElement = (elem) => {
          if (elem) {
            const regCode = elem.value.substring(0, 2);
            if (elem.dataset.level == "reg") {
              if (_objProvinces.length > 0) {
                _objProvinces[0].dataset.level = "prov";
                clearOptions(_objProvinces, _objMunicipality, _objBarangay);

                if (regCode) {
                  const populateOptions = (filteredData) => {
                    filteredData.forEach(function (prov) {
                      let isDefault =
                        _objProvinces[0].dataset?.defaultValue == prov.code;
                      let key = _addNameToKey
                        ? prov.code +
                          ":" +
                          prov.name.replace(/\s/g, "-").toLowerCase()
                        : prov.code;
                      _objProvinces[0].add(
                        new Option(prov.name, key, isDefault, isDefault)
                      );
                      if (isDefault) {
                        onChangeElement(_objProvinces[0]);
                        delete _objProvinces[0].dataset.defaultValue;
                      }
                    });
                    _objProvinces[0].addEventListener("change", (e) =>
                      onChangeElement(e.target)
                    );
                  };
                  // populate for province/district
                  PSGC.get(regCode, { geographic_level: "Prov" }).then(
                    (outData) => {
                      if (outData.length == 0) {
                        PSGC.get(regCode, { geographic_level: "Dist" }).then(
                          (inData) => populateOptions(inData)
                        );
                      } else {
                        populateOptions(outData);
                      }
                    }
                  );
                }
              }
            } else if (elem.dataset.level == "prov") {
              if (_objMunicipality.length > 0) {
                _objMunicipality[0].dataset.level = "Mun";

                PSGC.get(regCode, {
                  search: {
                    code: elem.value,
                    type: "Mun",
                  },
                }).then((iData) => {
                  clearOptions(_objMunicipality, _objBarangay);
                  if (iData.length) {
                    iData.forEach(function (item) {
                      let isDefault =
                        _objMunicipality[0].dataset?.defaultValue == item.code;
                      let key = _addNameToKey
                        ? item.code +
                          ":" +
                          item.name.replace(/\s/g, "-").toLowerCase()
                        : item.code;
                      _objMunicipality[0].add(
                        new Option(item.name, key, isDefault, isDefault)
                      );
                      if (isDefault) {
                        onChangeElement(_objMunicipality[0]);
                        delete _objMunicipality[0].dataset.defaultValue;
                      }
                    });
                    _objMunicipality[0].addEventListener("change", (e) =>
                      onChangeElement(e.target)
                    );
                  }
                });
              }
            } else if (elem.dataset.level == "Mun") {
              if (_objBarangay.length > 0) {
                _objBarangay[0].dataset.level = "Bgy";

                PSGC.get(regCode, {
                  search: {
                    code: elem.value,
                    type: "Bgy",
                  },
                }).then((mData) => {
                  clearOptions(_objBarangay);
                  if (mData.length) {
                    mData.forEach(function (item) {
                      let isDefault =
                        _objBarangay[0].dataset?.defaultValue == item.code;
                      let key = _addNameToKey
                        ? item.code +
                          ":" +
                          item.name.replace(/\s/g, "-").toLowerCase()
                        : item.code;
                      _objBarangay[0].add(
                        new Option(item.name, key, isDefault, isDefault)
                      );
                      if (isDefault) {
                        onChangeElement(_objBarangay[0]);
                        delete _objBarangay[0].dataset.defaultValue;
                      }
                    });
                  }
                });
              }
            }
          }
        };

        const PSGC = {
          /**
           *
           * @param {object} options Required. Options for initializing psgc
           */
          init: (options) => {
            if (options && options.bind) {
              _objRegion = document.querySelectorAll(options.bind?.region);
              _objProvinces = document.querySelectorAll(options.bind?.province);
              _objMunicipality = document.querySelectorAll(
                options.bind?.municipality
              );
              _objBarangay = document.querySelectorAll(options.bind?.barangay);
              _addNameToKey = options?.addNameToKey;

              clearOptions(
                _objRegion,
                _objProvinces,
                _objMunicipality,
                _objBarangay
              );

              // TODO support incomplete bindings like province & municipality only, etc
              // const allRegions = PSGC.getAllRegions()
              PSGC.getAllRegions().then((allRegions) => {
                _objRegion.forEach(function (elem) {
                  let regDefaultValue = elem.dataset?.defaultValue;
                  // attributes
                  elem.dataset.level = "reg";
                  allRegions.forEach(function (item, index) {
                    let isDefault = regDefaultValue == item.code;
                    let key = _addNameToKey
                      ? item.code +
                        ":" +
                        item.name.replace(/\s/g, "-").toLowerCase()
                      : item.code;
                    elem.add(new Option(item.name, key, isDefault, isDefault));
                    if (isDefault) {
                      onChangeElement(elem);
                      delete elem.dataset.defaultValue;
                    }
                  });
                  elem.addEventListener("change", (e) =>
                    onChangeElement(e.target)
                  );
                });
              });
            }
          },
          getAllRegions: () => {
            // const content = require('./extract/geo-data.json')
            let geoData = __webpack_require__
              .e(
                /*! import() */ "node_modules_ageesea_psgc-js_src_extract_geo-regions_json"
              )
              .then(
                __webpack_require__.t.bind(
                  __webpack_require__,
                  /*! ./extract/geo-regions.json */ "./node_modules/@ageesea/psgc-js/src/extract/geo-regions.json",
                  19
                )
              );
            // let fOutput = []
            // for (let [index, item] of Object.entries(geoData)) {
            //     if (item.geographic_level) {
            //         fOutput.push(item)
            //     }
            // }

            // fOutput.sort((a, b) => parseInt(a.code) - parseInt(b.code))
            // return fOutput;

            return geoData.then((data) => {
              let fOutput = [];
              for (let [index, item] of Object.entries(data)) {
                if (item.geographic_level) {
                  fOutput.push(item);
                }
              }

              fOutput.sort((a, b) => parseInt(a.code) - parseInt(b.code));
              return Promise.resolve(fOutput);
            });
          },

          /**
           *
           * @param {string} region region code
           * @param {string} filters filter options
           */
          get: (regionCode, filters) => {
            if (filters && filters.search) {
              // let data = require(`./extract/geo-reg-${parseInt(regionCode)}.json`)
              let data = __webpack_require__(
                "./node_modules/@ageesea/psgc-js/src/extract lazy recursive ^\\.\\/geo\\-reg\\-.*\\.json$"
              )(`./geo-reg-${parseInt(regionCode)}.json`);
              return data.then((content) => {
                let code = filters.search.code;
                let type = filters.search.type;
                let provCode = code.substring(0, 4);
                let munCode = code.substring(0, 6);
                let res = [];
                if (type == "City" || type == "Mun" || type == "SubMun") {
                  for (let [index, item] of Object.entries(content)) {
                    if (item.geographic_level) {
                      if (
                        item.geographic_level == "City" ||
                        item.geographic_level == "Mun" ||
                        item.geographic_level == "SubMun"
                      ) {
                        if (item.code.toString().startsWith(provCode)) {
                          res.push(item);
                        }
                      }
                    }
                  }
                } else if (type == "Bgy") {
                  for (let [index, item] of Object.entries(content)) {
                    if (item.geographic_level) {
                      if (item.geographic_level == "Bgy") {
                        if (item.code.toString().startsWith(munCode)) {
                          res.push(item);
                        }
                      }
                    }
                  }
                }

                return Promise.resolve(res);
              });
            } else {
              // let content = require(`./extract/geo-reg-${parseInt(regionCode)}.json`);
              let res = __webpack_require__(
                "./node_modules/@ageesea/psgc-js/src/extract lazy recursive ^\\.\\/geo\\-reg\\-.*\\.json$"
              )(`./geo-reg-${parseInt(regionCode)}.json`);
              return res.then((content) => {
                let tempRes = [];
                for (let [key, value] of Object.entries(content)) {
                  if (value.geographic_level == filters.geographic_level) {
                    tempRes.push(value);
                  }
                }
                return Promise.resolve(tempRes);
              });
            }
          },
        };

        // module.exports = PSGC
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = PSGC;

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
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/ __webpack_require__.m = __webpack_modules__;
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/create fake namespace object */
  /******/ (() => {
    /******/ var getProto = Object.getPrototypeOf
      ? (obj) => Object.getPrototypeOf(obj)
      : (obj) => obj.__proto__;
    /******/ var leafPrototypes;
    /******/ // create a fake namespace object
    /******/ // mode & 1: value is a module id, require it
    /******/ // mode & 2: merge all properties of value into the ns
    /******/ // mode & 4: return value when already ns object
    /******/ // mode & 16: return value when it's Promise-like
    /******/ // mode & 8|1: behave like require
    /******/ __webpack_require__.t = function (value, mode) {
      /******/ if (mode & 1) value = this(value);
      /******/ if (mode & 8) return value;
      /******/ if (typeof value === "object" && value) {
        /******/ if (mode & 4 && value.__esModule) return value;
        /******/ if (mode & 16 && typeof value.then === "function")
          return value;
        /******/
      }
      /******/ var ns = Object.create(null);
      /******/ __webpack_require__.r(ns);
      /******/ var def = {};
      /******/ leafPrototypes = leafPrototypes || [
        null,
        getProto({}),
        getProto([]),
        getProto(getProto),
      ];
      /******/ for (
        var current = mode & 2 && value;
        typeof current == "object" && !~leafPrototypes.indexOf(current);
        current = getProto(current)
      ) {
        /******/ Object.getOwnPropertyNames(current).forEach(
          (key) => (def[key] = () => value[key])
        );
        /******/
      }
      /******/ def["default"] = () => value;
      /******/ __webpack_require__.d(ns, def);
      /******/ return ns;
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
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
  /******/ (() => {
    /******/ __webpack_require__.f = {};
    /******/ // This file contains only the entry chunk.
    /******/ // The chunk loading function for additional chunks
    /******/ __webpack_require__.e = (chunkId) => {
      /******/ return Promise.all(
        Object.keys(__webpack_require__.f).reduce((promises, key) => {
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
  /******/ (() => {
    /******/ // This function allow to reference async chunks
    /******/ __webpack_require__.u = (chunkId) => {
      /******/ // return url for filenames not based on template
      /******/ if (
        {
          "node_modules_ageesea_psgc-js_src_extract_geo-regions_json": 1,
          "node_modules_ageesea_psgc-js_src_extract_geo-reg-1_json": 1,
          "node_modules_ageesea_psgc-js_src_extract_geo-reg-10_json": 1,
          "node_modules_ageesea_psgc-js_src_extract_geo-reg-11_json": 1,
          "node_modules_ageesea_psgc-js_src_extract_geo-reg-12_json": 1,
          "node_modules_ageesea_psgc-js_src_extract_geo-reg-13_json": 1,
          "node_modules_ageesea_psgc-js_src_extract_geo-reg-14_json": 1,
          "node_modules_ageesea_psgc-js_src_extract_geo-reg-15_json": 1,
          "node_modules_ageesea_psgc-js_src_extract_geo-reg-16_json": 1,
          "node_modules_ageesea_psgc-js_src_extract_geo-reg-17_json": 1,
          "node_modules_ageesea_psgc-js_src_extract_geo-reg-2_json": 1,
          "node_modules_ageesea_psgc-js_src_extract_geo-reg-3_json": 1,
          "node_modules_ageesea_psgc-js_src_extract_geo-reg-4_json": 1,
          "node_modules_ageesea_psgc-js_src_extract_geo-reg-5_json": 1,
          "node_modules_ageesea_psgc-js_src_extract_geo-reg-6_json": 1,
          "node_modules_ageesea_psgc-js_src_extract_geo-reg-7_json": 1,
          "node_modules_ageesea_psgc-js_src_extract_geo-reg-8_json": 1,
          "node_modules_ageesea_psgc-js_src_extract_geo-reg-9_json": 1,
        }[chunkId]
      )
        return "js/" + chunkId + ".js";
      /******/ // return url for filenames based on template
      /******/ return undefined;
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/get mini-css chunk filename */
  /******/ (() => {
    /******/ // This function allow to reference all chunks
    /******/ __webpack_require__.miniCssF = (chunkId) => {
      /******/ // return url for filenames based on template
      /******/ return undefined;
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/load script */
  /******/ (() => {
    /******/ var inProgress = {};
    /******/ // data-webpack is not used as build has no uniqueName
    /******/ // loadScript function to load a script via script tag
    /******/ __webpack_require__.l = (url, done, key, chunkId) => {
      /******/ if (inProgress[url]) {
        inProgress[url].push(done);
        return;
      }
      /******/ var script, needAttach;
      /******/ if (key !== undefined) {
        /******/ var scripts = document.getElementsByTagName("script");
        /******/ for (var i = 0; i < scripts.length; i++) {
          /******/ var s = scripts[i];
          /******/ if (s.getAttribute("src") == url) {
            script = s;
            break;
          }
          /******/
        }
        /******/
      }
      /******/ if (!script) {
        /******/ needAttach = true;
        /******/ script = document.createElement("script");
        /******/
        /******/ script.charset = "utf-8";
        /******/ script.timeout = 120;
        /******/ if (__webpack_require__.nc) {
          /******/ script.setAttribute("nonce", __webpack_require__.nc);
          /******/
        }
        /******/
        /******/ script.src = url;
        /******/
      }
      /******/ inProgress[url] = [done];
      /******/ var onScriptComplete = (prev, event) => {
        /******/ // avoid mem leaks in IE.
        /******/ script.onerror = script.onload = null;
        /******/ clearTimeout(timeout);
        /******/ var doneFns = inProgress[url];
        /******/ delete inProgress[url];
        /******/ script.parentNode && script.parentNode.removeChild(script);
        /******/ doneFns && doneFns.forEach((fn) => fn(event));
        /******/ if (prev) return prev(event);
        /******/
      };
      /******/ /******/ var timeout = setTimeout(
        onScriptComplete.bind(null, undefined, {
          type: "timeout",
          target: script,
        }),
        120000
      );
      /******/ script.onerror = onScriptComplete.bind(null, script.onerror);
      /******/ script.onload = onScriptComplete.bind(null, script.onload);
      /******/ needAttach && document.head.appendChild(script);
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
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
  /******/ /* webpack/runtime/publicPath */
  /******/ (() => {
    /******/ __webpack_require__.p = "/";
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/jsonp chunk loading */
  /******/ (() => {
    /******/ // no baseURI
    /******/
    /******/ // object to store loaded and loading chunks
    /******/ // undefined = chunk not loaded, null = chunk preloaded/prefetched
    /******/ // [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
    /******/ var installedChunks = {
      /******/ "/js/app/users/edit": 0,
      /******/
    };
    /******/
    /******/ __webpack_require__.f.j = (chunkId, promises) => {
      /******/ // JSONP chunk loading for javascript
      /******/ var installedChunkData = __webpack_require__.o(
        installedChunks,
        chunkId
      )
        ? installedChunks[chunkId]
        : undefined;
      /******/ if (installedChunkData !== 0) {
        // 0 means "already installed".
        /******/
        /******/ // a Promise means "currently loading".
        /******/ if (installedChunkData) {
          /******/ promises.push(installedChunkData[2]);
          /******/
        } else {
          /******/ if (true) {
            // all chunks have JS
            /******/ // setup Promise in chunk cache
            /******/ var promise = new Promise(
              (resolve, reject) =>
                (installedChunkData = installedChunks[chunkId] =
                  [resolve, reject])
            );
            /******/ promises.push((installedChunkData[2] = promise));
            /******/
            /******/ // start chunk loading
            /******/ var url =
              __webpack_require__.p + __webpack_require__.u(chunkId);
            /******/ // create error before stack unwound to get useful stacktrace later
            /******/ var error = new Error();
            /******/ var loadingEnded = (event) => {
              /******/ if (__webpack_require__.o(installedChunks, chunkId)) {
                /******/ installedChunkData = installedChunks[chunkId];
                /******/ if (installedChunkData !== 0)
                  installedChunks[chunkId] = undefined;
                /******/ if (installedChunkData) {
                  /******/ var errorType =
                    event && (event.type === "load" ? "missing" : event.type);
                  /******/ var realSrc =
                    event && event.target && event.target.src;
                  /******/ error.message =
                    "Loading chunk " +
                    chunkId +
                    " failed.\n(" +
                    errorType +
                    ": " +
                    realSrc +
                    ")";
                  /******/ error.name = "ChunkLoadError";
                  /******/ error.type = errorType;
                  /******/ error.request = realSrc;
                  /******/ installedChunkData[1](error);
                  /******/
                }
                /******/
              }
              /******/
            };
            /******/ __webpack_require__.l(
              url,
              loadingEnded,
              "chunk-" + chunkId,
              chunkId
            );
            /******/
          } else {
          }
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
    /******/ // no prefetching
    /******/
    /******/ // no preloaded
    /******/
    /******/ // no HMR
    /******/
    /******/ // no HMR manifest
    /******/
    /******/ // no on chunks loaded
    /******/
    /******/ // install a JSONP callback for chunk loading
    /******/ var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
      /******/ var [chunkIds, moreModules, runtime] = data;
      /******/ // add "moreModules" to the modules object,
      /******/ // then flag all "chunkIds" as loaded and fire callback
      /******/ var moduleId,
        chunkId,
        i = 0;
      /******/ if (chunkIds.some((id) => installedChunks[id] !== 0)) {
        /******/ for (moduleId in moreModules) {
          /******/ if (__webpack_require__.o(moreModules, moduleId)) {
            /******/ __webpack_require__.m[moduleId] = moreModules[moduleId];
            /******/
          }
          /******/
        }
        /******/ if (runtime) var result = runtime(__webpack_require__);
        /******/
      }
      /******/ if (parentChunkLoadingFunction) parentChunkLoadingFunction(data);
      /******/ for (; i < chunkIds.length; i++) {
        /******/ chunkId = chunkIds[i];
        /******/ if (
          __webpack_require__.o(installedChunks, chunkId) &&
          installedChunks[chunkId]
        ) {
          /******/ installedChunks[chunkId][0]();
          /******/
        }
        /******/ installedChunks[chunkId] = 0;
        /******/
      }
      /******/
      /******/
    };
    /******/
    /******/ var chunkLoadingGlobal = (self["webpackChunk"] =
      self["webpackChunk"] || []);
    /******/ chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
    /******/ chunkLoadingGlobal.push = webpackJsonpCallback.bind(
      null,
      chunkLoadingGlobal.push.bind(chunkLoadingGlobal)
    );
    /******/
  })();
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be in strict mode.
  (() => {
    "use strict";
    /*!****************************************!*\
    !*** ./resources/js/app/users/edit.js ***!
    \****************************************/
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ var _ageesea_psgc_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(
        /*! @ageesea/psgc-js */ "./node_modules/@ageesea/psgc-js/src/index.js"
      );

    $(document).ready(function () {
      _ageesea_psgc_js__WEBPACK_IMPORTED_MODULE_0__["default"].init({
        bind: {
          region: "#regions",
          province: "#provinces",
          municipality: "#municipalities",
          barangay: "#barangays",
        },
        addNameToKey: true,
      });
    });
  })();

  /******/
})();
