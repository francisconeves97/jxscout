!(function () {
    "use strict";
    var t = {
        d: function (e, n) {
          for (var r in n)
            t.o(n, r) &&
              !t.o(e, r) &&
              Object.defineProperty(e, r, { enumerable: !0, get: n[r] });
        },
        o: function (t, e) {
          return Object.prototype.hasOwnProperty.call(t, e);
        },
        r: function (t) {
          "undefined" != typeof Symbol &&
            Symbol.toStringTag &&
            Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
            Object.defineProperty(t, "__esModule", { value: !0 });
        },
      },
      e = {};
    t.r(e),
      t.d(e, {
        default: function () {
          return F;
        },
      });
    var n = function (t) {
        var e, n;
        return null !==
          (e =
            null ===
              (n = "; "
                .concat(document.cookie)
                .split("; ".concat(t, "="))
                .pop()) || void 0 === n
              ? void 0
              : n.split(";").shift()) && void 0 !== e
          ? e
          : null;
      },
      r = function (t) {
        return new Promise(function (e, r) {
          var i = n("adserver-scope"),
            o = t.get("ad_unit") || "";
          i && t.set("scope", i);
          var a = new XMLHttpRequest();
          a.open(
            "GET",
            ""
              .concat(
                (function (t) {
                  var e = window.location.hostname,
                    n = e.split(".").slice(1).join(".");
                  return e.includes("mercadopago")
                    ? "https://placements.".concat(n, "/v1/adn/").concat(t)
                    : "https://".concat(e.replace("dev", "www"), "/adn/api");
                })(o),
                "?",
              )
              .concat(t.toString()),
          ),
            (a.responseType = "json"),
            (a.withCredentials = !0),
            (a.onload = function () {
              [200, 204].includes(null == a ? void 0 : a.status) ||
                r(
                  new Error(
                    "status code ".concat(
                      null == a ? void 0 : a.status,
                      " not valid",
                    ),
                  ),
                ),
                e(a.response);
            }),
            (a.onerror = function () {
              r(new Error("XMLHttpRequest network error"));
            }),
            a.send();
        });
      },
      i = function (t) {
        var e = document.createElement("script");
        "noModule" in e != !1 && Promise.allSettled
          ? t()
          : ((e.src =
              "https://http2.mlstatic.com/frontend-assets/adn-frontend-library/adn-polyfills.js"),
            (e.defer = !0),
            (e.onload = t),
            document.head.appendChild(e));
      },
      o = "success",
      a = function (t, e) {
        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
          r = (function (t) {
            return {
              status: o,
              source: "script",
              params: {
                placement:
                  (null == t ? void 0 : t.getAttribute("data-placement")) || "",
                page: (null == t ? void 0 : t.getAttribute("data-page")) || "",
                slot_id:
                  (null == t ? void 0 : t.getAttribute("data-slot_id")) || "",
              },
            };
          })(t);
        if (e) {
          (r.status = "error"), (r.reason = e);
          var i = new CustomEvent("adn-banner-empty", {
            detail: { message: e },
            bubbles: !0,
            composed: !0,
          });
          null == t || t.dispatchEvent(i),
            null == t || t.setAttribute("style", "display:none;");
        }
        n && (r.status = o);
      },
      u = function () {
        var t = new Date().getTime();
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
          /[xy]/g,
          function (e) {
            var n = (t + 16 * Math.random()) % 16 | 0;
            return (
              (t = Math.floor(t / 16)), ("x" == e ? n : (3 & n) | 8).toString(16)
            );
          },
        );
      },
      c = ["sponsor_landing", "search", "purchases-status", "purchases-list"],
      s = ["ios", "android"],
      l = ["android"],
      d = /mercado(libre|pago)\-[a-zA-Z]+(\/|%2F)(\d+\.\d+\.\d+).*/i,
      f = function (t, e) {
        var n = t.split(".").map(Number),
          r = e.split(".").map(Number);
        return (
          n.some(function (t, e) {
            return t > r[e] || (r[e], !1);
          }) ||
          n.every(function (t, e) {
            return t === r[e];
          })
        );
      },
      m = function (t) {
        MobileWebKit.isConnected() &&
        (function () {
          try {
            var t = window.navigator.userAgent.match(d)[3],
              e = "pago" === window.navigator.userAgent.match(d)[1].toLowerCase(),
              n = l.includes(MobileWebKit.platform),
              r = !e && f(t, "10.360.0"),
              i = e && f(t, "2.349.0");
            return n && (r || i);
          } catch (t) {
            return !1;
          }
        })()
          ? MobileWebKit.lifecycle.onViewAppeared(function () {
              "finished" === window.adn && t();
            })
          : document.addEventListener("visibilitychange", function () {
              "visible" === document.visibilityState &&
                "finished" === window.adn &&
                t();
            });
      },
      p = ["purchases-list"],
      b = ["ios", "android"],
      v = function (t) {
        var e = t.get("page") || "",
          n = t.get("platform") || "";
        return p.includes(e) && b.includes(n);
      },
      y = ["purchases-list"],
      g = ["ios", "android"],
      h = function (t) {
        var e = t.get("page") || "",
          n = t.get("platform") || "";
        return y.includes(e) && g.includes(n);
      };
    function w(t) {
      return (
        (w =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  "function" == typeof Symbol &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              }),
        w(t)
      );
    }
    var A = ["fast_loading"];
    function O(t) {
      return (
        (function (t) {
          if (Array.isArray(t)) return E(t);
        })(t) ||
        (function (t) {
          if (
            ("undefined" != typeof Symbol && null != t[Symbol.iterator]) ||
            null != t["@@iterator"]
          )
            return Array.from(t);
        })(t) ||
        _(t) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
          );
        })()
      );
    }
    function S(t, e) {
      return (
        (function (t) {
          if (Array.isArray(t)) return t;
        })(t) ||
        (function (t, e) {
          var n =
            null == t
              ? null
              : ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
                t["@@iterator"];
          if (null != n) {
            var r,
              i,
              o,
              a,
              u = [],
              c = !0,
              s = !1;
            try {
              if (((o = (n = n.call(t)).next), 0 === e)) {
                if (Object(n) !== n) return;
                c = !1;
              } else
                for (
                  ;
                  !(c = (r = o.call(n)).done) &&
                  (u.push(r.value), u.length !== e);
                  c = !0
                );
            } catch (t) {
              (s = !0), (i = t);
            } finally {
              try {
                if (!c && null != n.return && ((a = n.return()), Object(a) !== a))
                  return;
              } finally {
                if (s) throw i;
              }
            }
            return u;
          }
        })(t, e) ||
        _(t, e) ||
        (function () {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
          );
        })()
      );
    }
    function _(t, e) {
      if (t) {
        if ("string" == typeof t) return E(t, e);
        var n = {}.toString.call(t).slice(8, -1);
        return (
          "Object" === n && t.constructor && (n = t.constructor.name),
          "Map" === n || "Set" === n
            ? Array.from(t)
            : "Arguments" === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              ? E(t, e)
              : void 0
        );
      }
    }
    function E(t, e) {
      (null == e || e > t.length) && (e = t.length);
      for (var n = 0, r = Array(e); n < e; n++) r[n] = t[n];
      return r;
    }
    function j(t, e) {
      var n = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(t);
        e &&
          (r = r.filter(function (e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function x(t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? j(Object(n), !0).forEach(function (e) {
              k(t, e, n[e]);
            })
          : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
            : j(Object(n)).forEach(function (e) {
                Object.defineProperty(
                  t,
                  e,
                  Object.getOwnPropertyDescriptor(n, e),
                );
              });
      }
      return t;
    }
    function k(t, e, n) {
      return (
        (e = (function (t) {
          var e = (function (t, e) {
            if ("object" != w(t) || !t) return t;
            var n = t[Symbol.toPrimitive];
            if (void 0 !== n) {
              var r = n.call(t, e || "default");
              if ("object" != w(r)) return r;
              throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === e ? String : Number)(t);
          })(t, "string");
          return "symbol" == w(e) ? e : e + "";
        })(e)) in t
          ? Object.defineProperty(t, e, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (t[e] = n),
        t
      );
    }
    var P = "FASTLOADING-CACHE",
      C = "MEMORY-CACHE",
      N = function (t) {
        try {
          return JSON.stringify(t);
        } catch (t) {
          return JSON.stringify([]);
        }
      },
      I = function (t) {
        return t.getAttribute("data-uid") || "";
      },
      J = function (t) {
        return window["adn-scripts"][I(t)];
      },
      M = function (t, e) {
        window["adn-scripts"][I(t)] = e;
      },
      T = function (t) {
        for (
          !(function (t) {
            J(t) && (J(t).disconnect(), M(t, null));
          })(t);
          t.firstChild;
  
        )
          t.removeChild(t.firstChild);
      },
      L = function (t) {
        var e = t.getAttribute("data-content") || "{}";
        try {
          var n = JSON.parse(e),
            r = n.fast_loading,
            i = (function (t, e) {
              if (null == t) return {};
              var n,
                r,
                i = (function (t, e) {
                  if (null == t) return {};
                  var n = {};
                  for (var r in t)
                    if ({}.hasOwnProperty.call(t, r)) {
                      if (e.indexOf(r) >= 0) continue;
                      n[r] = t[r];
                    }
                  return n;
                })(t, e);
              if (Object.getOwnPropertySymbols) {
                var o = Object.getOwnPropertySymbols(t);
                for (r = 0; r < o.length; r++)
                  (n = o[r]),
                    e.indexOf(n) >= 0 ||
                      ({}.propertyIsEnumerable.call(t, n) && (i[n] = t[n]));
              }
              return i;
            })(n, A);
          return r
            ? (t.setAttribute("data-content", JSON.stringify(i)), r)
            : null;
        } catch (e) {
          return a(t, "Invalid JSON data-content"), null;
        }
      },
      q = function (t, e) {
        var n = JSON.parse(window.adnTemplateCache || "{}"),
          r = e === C,
          i = x(
            x({}, n),
            {},
            r
              ? { memory: { items: t } }
              : { fast_loading: { items: t }, memory: { items: t } },
          );
        window.adnTemplateCache = JSON.stringify(x({}, i));
      },
      D = function (t) {
        return new Promise(function (e, n) {
          try {
            var r = window.adnTemplateCache || "{}",
              i = JSON.parse(r),
              o = i.memory,
              u = i.fast_loading,
              c = L(t);
            if (
              (u &&
                JSON.stringify(null == u ? void 0 : u.items) !==
                  JSON.stringify(null == c ? void 0 : c.items)) ||
              !o
            ) {
              var s = c || u,
                l = S(s.items, 1)[0],
                d = s.items;
              return q(d, P), void e({ item: l, banner: t, itemsArray: d });
            }
            if (o) {
              var f = S(o.items, 1)[0],
                m = o.items;
              return void e({ item: f, banner: t, itemsArray: m });
            }
            n();
          } catch (e) {
            a(t, "Invalid JSON data-content"), n();
          }
        });
      },
      R = function (t) {
        for (
          var e = ["component", "content", "uid"], n = {}, r = 0, i = !0;
          r < t.attributes.length && i;
  
        ) {
          var o,
            a =
              null !== (o = t.attributes[r].name.replace("data-", "")) &&
              void 0 !== o
                ? o
                : "";
          e.includes(a) || (n["".concat(a)] = t.attributes[r].value),
            "content" === a &&
              ((n = JSON.parse(t.attributes[r].value).queries), (i = !1)),
            (r += 1);
        }
        return new URLSearchParams(n);
      },
      H = function (t) {
        return new Promise(function (e, n) {
          T(t),
            (function (t) {
              return t.hasAttribute("data-uid");
            })(t) ||
              (function (t) {
                t.setAttribute("data-uid", u());
              })(t);
          var i = L(t),
            o = R(t);
          if (i) {
            var c = S(i.items, 1)[0],
              s = i.items;
            (h(o) || v(o)) && q(s, P), e({ item: c, banner: t, itemsArray: s });
          } else
            o.set("unique_id", u()),
              r(o)
                .then(function (r) {
                  if (!r) throw new Error("no data");
                  if (null != r && r.items.length) {
                    var i = S(r.items, 1)[0],
                      u = r.items;
                    (h(o) || v(o)) && q(r.items, C),
                      null == t || t.setAttribute("style", "display:block;"),
                      e({ item: i, banner: t, itemsArray: u });
                  } else
                    a(t, "Empty response, with params ".concat(o.toString())),
                      n();
                })
                .catch(function (r) {
                  v(o)
                    ? D(t)
                        .then(function (t) {
                          e(t);
                        })
                        .catch(function () {
                          a(t, "error gettting from memory"), n();
                        })
                    : (a(
                        t,
                        "fail fetching: "
                          .concat(r.message, ", with params ")
                          .concat(o.toString()),
                      ),
                      n());
                });
        });
      },
      K = function (t, e) {
        var n;
        !(function (t, e) {
          var n = e.get("page") || "",
            r = e.get("platform") || "";
          c.includes(n) &&
            s.includes(r) &&
            t.setAttribute("data-auto_refresh", "initial");
        })(t, R(t)),
          "initial" ===
            (null !== (n = t.getAttribute("data-auto_refresh")) && void 0 !== n
              ? n
              : "") &&
            (t.setAttribute("data-auto_refresh", "ready"),
            m(function () {
              null != t &&
                t.hasAttribute("style") &&
                (null == t || t.removeAttribute("style")),
                e();
            }));
      };
    window["adn-scripts"] = {};
    var W = function (t) {
        var e = t,
          r = n("adn-template-version");
        if (r) {
          e = e.replace(/(\d+\.\d+\.\d+)(?=.js)/, "".concat(r));
        }
        var i = n("adn-template-names");
        i &&
          i.split(",").forEach(function (t) {
            var n = S(t.split(":"), 2),
              r = n[0],
              i = n[1],
              o = new RegExp("/adn-frontend-library/".concat(r, "..*js"));
            e = e.replace(o, "/adn-frontend-library/".concat(i, ".js"));
          });
        return e;
      },
      z = function t() {
        window.adn = "loaded";
        var e = document.querySelectorAll('[data-component="adn"]');
        e.length > 0
          ? Promise.allSettled(O(e).map(H))
              .then(function (t) {
                var e = function (t) {
                  var e = t.item,
                    r = e.content,
                    i = r.actions.content_link.link,
                    o = r.texts,
                    u = r.images,
                    c = r.colors,
                    s = r.marketplace_items,
                    l = e.event_tracking,
                    d = l.print,
                    f = l.click,
                    m = l.view,
                    p = e.verification_resources,
                    b = e.template,
                    v = e.lazy_loading_print_percentage,
                    y = e.is_off_meli,
                    g = t.banner,
                    h = t.itemsArray;
                  T(g);
                  var w = n("adn-template-tag") || b.tag,
                    A = document.createElement("".concat(w));
                  if (
                    (Array.isArray(h) && h.length > 1
                      ? A.setAttribute("items", JSON.stringify(h))
                      : (Object.keys(o).forEach(function (t) {
                          return A.setAttribute(t, o[t]);
                        }),
                        Object.keys(u).forEach(function (t) {
                          return A.setAttribute(t, u[t]);
                        }),
                        Object.keys(c).forEach(function (t) {
                          return A.setAttribute(t, c[t]);
                        }),
                        A.setAttribute("destination_url", i),
                        A.setAttribute("print_url", N(d)),
                        A.setAttribute("click_url", N(f)),
                        m && A.setAttribute("view_url", N(m)),
                        y && A.setAttribute("target", "_blank"),
                        p && A.setAttribute("verification_resources", N(p)),
                        Array.isArray(s) &&
                          s.length > 0 &&
                          (A.setAttribute("marketplace_items", JSON.stringify(s)),
                          b && A.setAttribute("template_tag", b.tag))),
                    v > -1 &&
                      "IntersectionObserver" in window &&
                      "IntersectionObserverEntry" in window &&
                      "intersectionRatio" in
                        window.IntersectionObserverEntry.prototype &&
                      "isIntersecting" in
                        window.IntersectionObserverEntry.prototype)
                  ) {
                    var O = (function () {
                      var t = arguments.length > 1 ? arguments[1] : void 0;
                      return new IntersectionObserver(
                        function (e, n) {
                          e.forEach(function (e) {
                            e.isIntersecting &&
                              (e.target.appendChild(t), n.disconnect());
                          });
                        },
                        {
                          root: null,
                          rootMargin: "".concat(
                            arguments.length > 0 && void 0 !== arguments[0]
                              ? arguments[0]
                              : 10,
                            "%",
                          ),
                        },
                      );
                    })(v, A);
                    O.observe(g), M(g, O);
                  } else g.appendChild(A);
                  a(g);
                };
                t.forEach(function (t) {
                  if ("fulfilled" === t.status) {
                    var n = t.value,
                      r = n.item.template,
                      i = n.banner;
                    if (window["adn-scripts"][r.url]) e(t.value);
                    else {
                      var o = W(r.url);
                      window["adn-scripts"][r.url] = o;
                      var u = document.createElement("script");
                      (u.src = o),
                        (u.defer = !0),
                        (u.onload = function () {
                          return e(t.value);
                        }),
                        document.head.appendChild(u);
                    }
                    a(i);
                  }
                });
              })
              .catch(function () {
                e.forEach(function (t) {
                  return a(t, "error adding banners");
                });
              })
              .finally(function () {
                (window.adn = "finished"),
                  e.forEach(function (e) {
                    return K(e, t);
                  });
              })
          : a(void 0, "banners not found");
      };
    document.body.addEventListener("adn-reload", function () {
      !(function () {
        window.adn = "loaded";
        var t = document.querySelectorAll('[data-component="adn"]');
        t.length > 0
          ? Promise.allSettled(O(t).map(D))
              .then(function (t) {
                var e = function (t) {
                  var e = t.item,
                    r = e.content,
                    i = r.actions.content_link.link,
                    o = r.texts,
                    u = r.images,
                    c = r.colors,
                    s = r.marketplace_items,
                    l = e.event_tracking,
                    d = l.print,
                    f = l.click,
                    m = l.view,
                    p = e.verification_resources,
                    b = e.template,
                    v = e.is_off_meli,
                    y = t.banner,
                    g = t.itemsArray;
                  T(y);
                  var h = n("adn-template-tag") || b.tag,
                    w = document.createElement("".concat(h));
                  Array.isArray(g) && g.length > 1
                    ? w.setAttribute("items", JSON.stringify(g))
                    : (Object.keys(o).forEach(function (t) {
                        return w.setAttribute(t, o[t]);
                      }),
                      Object.keys(u).forEach(function (t) {
                        return w.setAttribute(t, u[t]);
                      }),
                      Object.keys(c).forEach(function (t) {
                        return w.setAttribute(t, c[t]);
                      }),
                      w.setAttribute("destination_url", i),
                      w.setAttribute("print_url", N(d)),
                      w.setAttribute("click_url", N(f)),
                      m && w.setAttribute("view_url", N(m)),
                      v && w.setAttribute("target", "_blank"),
                      p && w.setAttribute("verification_resources", N(p)),
                      Array.isArray(s) &&
                        s.length > 0 &&
                        (w.setAttribute("marketplace_items", JSON.stringify(s)),
                        b && w.setAttribute("template_tag", b.tag))),
                    y.appendChild(w),
                    a(y);
                };
                t.forEach(function (t) {
                  if ("fulfilled" === t.status && t.value) {
                    var n = t.value,
                      r = n.item.template,
                      i = n.banner;
                    if (window["adn-scripts"][r.url]) e(t.value);
                    else {
                      var o = W(r.url);
                      window["adn-scripts"][r.url] = o;
                      var u = document.createElement("script");
                      (u.src = o),
                        (u.defer = !0),
                        (u.onload = function () {
                          return e(t.value);
                        }),
                        document.head.appendChild(u);
                    }
                    a(i);
                  }
                });
              })
              .catch(function () {
                t.forEach(function (t) {
                  return a(t, "error adding banners");
                });
              })
              .finally(function () {
                (window.adn = "finished"),
                  t.forEach(function (t) {
                    return K(t, z);
                  });
              })
          : a(void 0, "banners not found");
      })();
    });
    var F = void i(z),
      G = window;
    for (var U in e) G[U] = e[U];
    e.__esModule && Object.defineProperty(G, "__esModule", { value: !0 });
  })();
  //# sourceMappingURL=adn-script.js.map
  