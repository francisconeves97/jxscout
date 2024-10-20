window.NREUM || (NREUM = {});
NREUM.init = {
  distributed_tracing: { enabled: true },
  privacy: { cookies_enabled: true },
  ajax: { deny_list: ["bam.nr-data.net"] },
};

NREUM.loader_config = {
  accountID: "2943787",
  trustKey: "2943787",
  agentID: "1134296435",
  licenseKey: "NRJS-ae370fb83c897c23305",
  applicationID: "1134296435",
};
NREUM.info = {
  beacon: "bam.nr-data.net",
  errorBeacon: "bam.nr-data.net",
  licenseKey: "NRJS-ae370fb83c897c23305",
  applicationID: "1134296435",
  sa: 1,
};
(() => {
  var e,
    t,
    r = {
      9071: (e, t, r) => {
        "use strict";
        r.d(t, { I: () => n });
        var n = 0,
          i = navigator.userAgent.match(/Firefox[\/\s](\d+\.\d+)/);
        i && (n = +i[1]);
      },
      6900: (e, t, r) => {
        "use strict";
        let n;
        if ((r.d(t, { H: () => i }), r(2374).il)) {
          const e = document.createElement("div");
          (e.innerHTML =
            "\x3c!--[if lte IE 6]><div></div><![endif]--\x3e\x3c!--[if lte IE 7]><div></div><![endif]--\x3e\x3c!--[if lte IE 8]><div></div><![endif]--\x3e\x3c!--[if lte IE 9]><div></div><![endif]--\x3e"),
            (n = e.getElementsByTagName("div").length);
        }
        var i;
        i = 4 === n ? 6 : 3 === n ? 7 : 2 === n ? 8 : 1 === n ? 9 : 0;
      },
      6562: (e, t, r) => {
        "use strict";
        r.d(t, {
          P_: () => p,
          Mt: () => v,
          C5: () => d,
          DL: () => y,
          OP: () => L,
          lF: () => H,
          Yu: () => E,
          Dg: () => g,
          CX: () => f,
          GE: () => w,
          sU: () => M,
        });
        var n = {};
        r.r(n), r.d(n, { agent: () => O, match: () => N, version: () => A });
        var i = r(6797),
          o = r(909),
          a = r(8610);
        class s {
          constructor(e, t) {
            try {
              if (!e || "object" != typeof e)
                return (0, a.Z)(
                  "New setting a Configurable requires an object as input"
                );
              if (!t || "object" != typeof t)
                return (0, a.Z)(
                  "Setting a Configurable requires a model to set its initial properties"
                );
              Object.assign(this, t),
                Object.entries(e).forEach((e) => {
                  let [t, r] = e;
                  const n = (0, o.q)(t);
                  n.length &&
                    r &&
                    "object" == typeof r &&
                    n.forEach((e) => {
                      e in r &&
                        ((0, a.Z)(
                          `"${e}" is a protected attribute and can not be changed in feature ${t}.  It will have no effect.`
                        ),
                        delete r[e]);
                    }),
                    (this[t] = r);
                });
            } catch (e) {
              (0, a.Z)("An error occured while setting a Configurable", e);
            }
          }
        }
        const c = {
            beacon: i.ce.beacon,
            errorBeacon: i.ce.errorBeacon,
            licenseKey: void 0,
            applicationID: void 0,
            sa: void 0,
            queueTime: void 0,
            applicationTime: void 0,
            ttGuid: void 0,
            user: void 0,
            account: void 0,
            product: void 0,
            extra: void 0,
            jsAttributes: {},
            userAttributes: void 0,
            atts: void 0,
            transactionName: void 0,
            tNamePlain: void 0,
          },
          u = {};
        function d(e) {
          if (!e)
            throw new Error("All info objects require an agent identifier!");
          if (!u[e]) throw new Error(`Info for ${e} was never set`);
          return u[e];
        }
        function f(e, t) {
          if (!e)
            throw new Error("All info objects require an agent identifier!");
          (u[e] = new s(t, c)), (0, i.Qy)(e, u[e], "info");
        }
        const l = {
            allow_bfcache: !1,
            privacy: { cookies_enabled: !0 },
            ajax: { deny_list: void 0, enabled: !0, harvestTimeSeconds: 10 },
            distributed_tracing: {
              enabled: void 0,
              exclude_newrelic_header: void 0,
              cors_use_newrelic_header: void 0,
              cors_use_tracecontext_headers: void 0,
              allowed_origins: void 0,
            },
            ssl: void 0,
            obfuscate: void 0,
            jserrors: { enabled: !0, harvestTimeSeconds: 10 },
            metrics: { enabled: !0, harvestTimeSeconds: 10 },
            page_action: { enabled: !0, harvestTimeSeconds: 30 },
            page_view_event: { enabled: !0 },
            page_view_timing: { enabled: !0, harvestTimeSeconds: 30 },
            session_trace: { enabled: !0, harvestTimeSeconds: 10 },
            spa: { enabled: !0, harvestTimeSeconds: 10 },
          },
          h = {};
        function p(e) {
          if (!e)
            throw new Error(
              "All configuration objects require an agent identifier!"
            );
          if (!h[e]) throw new Error(`Configuration for ${e} was never set`);
          return h[e];
        }
        function g(e, t) {
          if (!e)
            throw new Error(
              "All configuration objects require an agent identifier!"
            );
          (h[e] = new s(t, l)), (0, i.Qy)(e, h[e], "config");
        }
        function v(e, t) {
          if (!e)
            throw new Error(
              "All configuration objects require an agent identifier!"
            );
          var r = p(e);
          if (r) {
            for (var n = t.split("."), i = 0; i < n.length - 1; i++)
              if ("object" != typeof (r = r[n[i]])) return;
            r = r[n[n.length - 1]];
          }
          return r;
        }
        const m = {
            accountID: void 0,
            trustKey: void 0,
            agentID: void 0,
            licenseKey: void 0,
            applicationID: void 0,
            xpid: void 0,
          },
          b = {};
        function y(e) {
          if (!e)
            throw new Error(
              "All loader-config objects require an agent identifier!"
            );
          if (!b[e]) throw new Error(`LoaderConfig for ${e} was never set`);
          return b[e];
        }
        function w(e, t) {
          if (!e)
            throw new Error(
              "All loader-config objects require an agent identifier!"
            );
          (b[e] = new s(t, m)), (0, i.Qy)(e, b[e], "loader_config");
        }
        const E = (0, i.mF)().o;
        var T = r(6900),
          x = r(2053),
          O = null,
          A = null;
        if (navigator.userAgent) {
          var _ = navigator.userAgent,
            S = _.match(/Version\/(\S+)\s+Safari/);
          S &&
            -1 === _.indexOf("Chrome") &&
            -1 === _.indexOf("Chromium") &&
            ((O = "Safari"), (A = S[1]));
        }
        function N(e, t) {
          if (!O) return !1;
          if (e !== O) return !1;
          if (!t) return !0;
          if (!A) return !1;
          for (var r = A.split("."), n = t.split("."), i = 0; i < n.length; i++)
            if (n[i] !== r[i]) return !1;
          return !0;
        }
        var D = r(5526),
          P = r(2374);
        const I = "NRBA_SESSION_ID";
        function R() {
          if (!P.il) return null;
          try {
            let e;
            return (
              null === (e = window.sessionStorage.getItem(I)) &&
                ((e = (0, D.ky)(16)), window.sessionStorage.setItem(I, e)),
              e
            );
          } catch (e) {
            return null;
          }
        }
        var C = P._A?.XMLHttpRequest,
          j = C && C.prototype;
        const k = {};
        function L(e) {
          if (!e)
            throw new Error("All runtime objects require an agent identifier!");
          if (!k[e]) throw new Error(`Runtime for ${e} was never set`);
          return k[e];
        }
        function M(e, t) {
          if (!e)
            throw new Error("All runtime objects require an agent identifier!");
          var r;
          (k[e] = new s(
            t,
            ((r = e),
            {
              customTransaction: void 0,
              disabled: !1,
              features: {},
              isolatedBacklog: !1,
              loaderType: void 0,
              maxBytes: 6 === T.H ? 2e3 : 3e4,
              offset: (0, x.yf)(),
              onerror: void 0,
              origin: "" + P._A?.location,
              ptid: void 0,
              releaseIds: {},
              sessionId: 1 == v(r, "privacy.cookies_enabled") ? R() : null,
              xhrWrappable:
                C &&
                j &&
                j.addEventListener &&
                !/CriOS/.test(navigator.userAgent),
              userAgent: n,
            })
          )),
            (0, i.Qy)(e, k[e], "runtime");
        }
        function H(e) {
          return (function (e) {
            try {
              const t = d(e);
              return !!t.licenseKey && !!t.errorBeacon && !!t.applicationID;
            } catch (e) {
              return !1;
            }
          })(e);
        }
      },
      8226: (e, t, r) => {
        "use strict";
        r.d(t, { q: () => n });
        const n = "1223.PROD";
      },
      9557: (e, t, r) => {
        "use strict";
        r.d(t, { w: () => o });
        var n = r(8610);
        const i = { agentIdentifier: "" };
        class o {
          constructor(e) {
            try {
              if ("object" != typeof e)
                return (0, n.Z)("shared context requires an object as input");
              (this.sharedContext = {}),
                Object.assign(this.sharedContext, i),
                Object.entries(e).forEach((e) => {
                  let [t, r] = e;
                  Object.keys(i).includes(t) && (this.sharedContext[t] = r);
                });
            } catch (e) {
              (0, n.Z)("An error occured while setting SharedContext", e);
            }
          }
        }
      },
      4329: (e, t, r) => {
        "use strict";
        r.d(t, { L: () => d, R: () => c });
        var n = r(3752),
          i = r(7022),
          o = r(4045),
          a = r(2325);
        const s = {};
        function c(e, t) {
          const r = { staged: !1, priority: a.p[t] || 0 };
          u(e), s[e].get(t) || s[e].set(t, r);
        }
        function u(e) {
          e && (s[e] || (s[e] = new Map()));
        }
        function d() {
          let e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : "",
            t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : "feature";
          if ((u(e), !e || !s[e].get(t))) return a(t);
          s[e].get(t).staged = !0;
          const r = Array.from(s[e]);
          function a(t) {
            const r = e ? n.ee.get(e) : n.ee,
              a = o.X.handlers;
            if (r.backlog && a) {
              var s = r.backlog[t],
                c = a[t];
              if (c) {
                for (var u = 0; s && u < s.length; ++u) f(s[u], c);
                (0, i.D)(c, function (e, t) {
                  (0, i.D)(t, function (t, r) {
                    r[0].on(e, r[1]);
                  });
                });
              }
              delete a[t], (r.backlog[t] = null), r.emit("drain-" + t, []);
            }
          }
          r.every((e) => {
            let [t, r] = e;
            return r.staged;
          }) &&
            (r.sort((e, t) => e[1].priority - t[1].priority),
            r.forEach((e) => {
              let [t] = e;
              a(t);
            }));
        }
        function f(e, t) {
          var r = e[1];
          (0, i.D)(t[r], function (t, r) {
            var n = e[0];
            if (r[0] === n) {
              var i = r[1],
                o = e[3],
                a = e[2];
              i.apply(o, a);
            }
          });
        }
      },
      3752: (e, t, r) => {
        "use strict";
        r.d(t, { c: () => f, ee: () => u });
        var n = r(6797),
          i = r(3916),
          o = r(7022),
          a = r(6562),
          s = "nr@context";
        let c = (0, n.fP)();
        var u;
        function d() {}
        function f(e) {
          return (0, i.X)(e, s, l);
        }
        function l() {
          return new d();
        }
        function h() {
          (u.backlog.api || u.backlog.feature) &&
            ((u.aborted = !0), (u.backlog = {}));
        }
        c.ee
          ? (u = c.ee)
          : ((u = (function e(t, r) {
              var n = {},
                c = {},
                f = {},
                p = !1;
              try {
                p = 16 === r.length && (0, a.OP)(r).isolatedBacklog;
              } catch (e) {}
              var g = {
                on: b,
                addEventListener: b,
                removeEventListener: y,
                emit: m,
                get: E,
                listeners: w,
                context: v,
                buffer: T,
                abort: h,
                aborted: !1,
                isBuffering: x,
                debugId: r,
                backlog: p
                  ? {}
                  : t && "object" == typeof t.backlog
                  ? t.backlog
                  : {},
              };
              return g;
              function v(e) {
                return e && e instanceof d ? e : e ? (0, i.X)(e, s, l) : l();
              }
              function m(e, r, n, i, o) {
                if ((!1 !== o && (o = !0), !u.aborted || i)) {
                  t && o && t.emit(e, r, n);
                  for (var a = v(n), s = w(e), d = s.length, f = 0; f < d; f++)
                    s[f].apply(a, r);
                  var l = O()[c[e]];
                  return l && l.push([g, e, r, a]), a;
                }
              }
              function b(e, t) {
                n[e] = w(e).concat(t);
              }
              function y(e, t) {
                var r = n[e];
                if (r)
                  for (var i = 0; i < r.length; i++)
                    r[i] === t && r.splice(i, 1);
              }
              function w(e) {
                return n[e] || [];
              }
              function E(t) {
                return (f[t] = f[t] || e(g, t));
              }
              function T(e, t) {
                var r = O();
                g.aborted ||
                  (0, o.D)(e, function (e, n) {
                    (t = t || "feature"), (c[n] = t), t in r || (r[t] = []);
                  });
              }
              function x(e) {
                return !!O()[c[e]];
              }
              function O() {
                return g.backlog;
              }
            })(void 0, "globalEE")),
            (c.ee = u));
      },
      9252: (e, t, r) => {
        "use strict";
        r.d(t, { E: () => n, p: () => i });
        var n = r(3752).ee.get("handle");
        function i(e, t, r, i, o) {
          o
            ? (o.buffer([e], i), o.emit(e, t, r))
            : (n.buffer([e], i), n.emit(e, t, r));
        }
      },
      4045: (e, t, r) => {
        "use strict";
        r.d(t, { X: () => o });
        var n = r(9252);
        o.on = a;
        var i = (o.handlers = {});
        function o(e, t, r, o) {
          a(o || n.E, i, e, t, r);
        }
        function a(e, t, r, i, o) {
          o || (o = "feature"), e || (e = n.E);
          var a = (t[o] = t[o] || {});
          (a[r] = a[r] || []).push([e, i]);
        }
      },
      8544: (e, t, r) => {
        "use strict";
        r.d(t, { bP: () => s, iz: () => c, m$: () => a });
        var n = r(2374),
          i = !1;
        try {
          var o = Object.defineProperty({}, "passive", {
            get: function () {
              i = !0;
            },
          });
          n._A?.addEventListener("testPassive", null, o),
            n._A?.removeEventListener("testPassive", null, o);
        } catch (e) {}
        function a(e) {
          return i ? { passive: !0, capture: !!e } : !!e;
        }
        function s(e, t) {
          let r =
            arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
          window.addEventListener(e, t, a(r));
        }
        function c(e, t) {
          let r =
            arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
          document.addEventListener(e, t, a(r));
        }
      },
      5526: (e, t, r) => {
        "use strict";
        r.d(t, { Ht: () => a, M: () => o, Rl: () => i, ky: () => s });
        var n = r(2374);
        function i() {
          var e = null,
            t = 0,
            r = n._A?.crypto || n._A?.msCrypto;
          function i() {
            return e ? 15 & e[t++] : (16 * Math.random()) | 0;
          }
          r && r.getRandomValues && (e = r.getRandomValues(new Uint8Array(31)));
          for (
            var o, a = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx", s = "", c = 0;
            c < a.length;
            c++
          )
            s +=
              "x" === (o = a[c])
                ? i().toString(16)
                : "y" === o
                ? (o = (3 & i()) | 8).toString(16)
                : o;
          return s;
        }
        function o() {
          return s(16);
        }
        function a() {
          return s(32);
        }
        function s(e) {
          var t = null,
            r = 0,
            n = self.crypto || self.msCrypto;
          n &&
            n.getRandomValues &&
            Uint8Array &&
            (t = n.getRandomValues(new Uint8Array(31)));
          for (var i = [], o = 0; o < e; o++) i.push(a().toString(16));
          return i.join("");
          function a() {
            return t ? 15 & t[r++] : (16 * Math.random()) | 0;
          }
        }
      },
      2053: (e, t, r) => {
        "use strict";
        r.d(t, { nb: () => c, os: () => u, yf: () => s, zO: () => a });
        var n = r(7145),
          i = new Date().getTime(),
          o = i;
        function a() {
          return n.G && performance.now
            ? Math.round(performance.now())
            : (i = Math.max(new Date().getTime(), i)) - o;
        }
        function s() {
          return i;
        }
        function c(e) {
          o = e;
        }
        function u() {
          return o;
        }
      },
      7145: (e, t, r) => {
        "use strict";
        r.d(t, { G: () => n });
        const n = void 0 !== r(2374)._A?.performance?.timing?.navigationStart;
      },
      6625: (e, t, r) => {
        "use strict";
        r.d(t, { s: () => c, v: () => u });
        var n = r(8283),
          i = r(9071),
          o = r(2053),
          a = r(7145),
          s = r(2374);
        let c = !0;
        function u(e) {
          var t = (function () {
            if (i.I && i.I < 9) return;
            if (a.G)
              return (c = !1), s._A?.performance?.timing?.navigationStart;
          })();
          t && ((0, n.B)(e, "starttime", t), (0, o.nb)(t));
        }
      },
      8283: (e, t, r) => {
        "use strict";
        r.d(t, { B: () => o, L: () => a });
        var n = r(2053),
          i = {};
        function o(e, t, r) {
          void 0 === r && (r = (0, n.zO)() + (0, n.os)()),
            (i[e] = i[e] || {}),
            (i[e][t] = r);
        }
        function a(e, t, r, n) {
          const o = e.sharedContext.agentIdentifier;
          var a = i[o]?.[r],
            s = i[o]?.[n];
          void 0 !== a &&
            void 0 !== s &&
            e.store("measures", t, { value: s - a });
        }
      },
      6368: (e, t, r) => {
        "use strict";
        r.d(t, { e: () => o });
        var n = r(2374),
          i = {};
        function o(e) {
          if (e in i) return i[e];
          if (0 === (e || "").indexOf("data:")) return { protocol: "data" };
          let t;
          var r = n._A?.location,
            o = {};
          if (n.il) (t = document.createElement("a")), (t.href = e);
          else
            try {
              t = new URL(e, r.href);
            } catch (e) {
              return o;
            }
          o.port = t.port;
          var a = t.href.split("://");
          !o.port &&
            a[1] &&
            (o.port = a[1].split("/")[0].split("@").pop().split(":")[1]),
            (o.port && "0" !== o.port) ||
              (o.port = "https" === a[0] ? "443" : "80"),
            (o.hostname = t.hostname || r.hostname),
            (o.pathname = t.pathname),
            (o.protocol = a[0]),
            "/" !== o.pathname.charAt(0) && (o.pathname = "/" + o.pathname);
          var s =
              !t.protocol || ":" === t.protocol || t.protocol === r.protocol,
            c = t.hostname === r.hostname && t.port === r.port;
          return (
            (o.sameOrigin = s && (!t.hostname || c)),
            "/" === o.pathname && (i[e] = o),
            o
          );
        }
      },
      9548: (e, t, r) => {
        "use strict";
        r.d(t, { T: () => i });
        var n = r(2374);
        const i = {
          isFileProtocol: function () {
            let e = Boolean("file:" === (0, n.lW)()?.location?.protocol);
            e && (i.supportabilityMetricSent = !0);
            return e;
          },
          supportabilityMetricSent: !1,
        };
      },
      8610: (e, t, r) => {
        "use strict";
        function n(e, t) {
          console &&
            console.warn &&
            "function" == typeof console.warn &&
            (console.warn(`New Relic: ${e}`), t && console.warn(t));
        }
        r.d(t, { Z: () => n });
      },
      3916: (e, t, r) => {
        "use strict";
        r.d(t, { X: () => i });
        var n = Object.prototype.hasOwnProperty;
        function i(e, t, r) {
          if (n.call(e, t)) return e[t];
          var i = r();
          if (Object.defineProperty && Object.keys)
            try {
              return (
                Object.defineProperty(e, t, {
                  value: i,
                  writable: !0,
                  enumerable: !1,
                }),
                i
              );
            } catch (e) {}
          return (e[t] = i), i;
        }
      },
      2374: (e, t, r) => {
        "use strict";
        r.d(t, { _A: () => o, il: () => n, lW: () => a, v6: () => i });
        const n = Boolean("undefined" != typeof window && window.document),
          i = Boolean(
            "undefined" != typeof WorkerGlobalScope &&
              self.navigator instanceof WorkerNavigator
          );
        let o = (() => {
          if (n) return window;
          if (i) {
            if (
              "undefined" != typeof globalThis &&
              globalThis instanceof WorkerGlobalScope
            )
              return globalThis;
            if (self instanceof WorkerGlobalScope) return self;
          }
          throw new Error(
            "New Relic browser agent shutting down due to error: Unable to locate global scope. This is possibly due to code redefining browser global variables like `self` and `window`."
          );
        })();
        function a() {
          return o;
        }
      },
      7022: (e, t, r) => {
        "use strict";
        r.d(t, { D: () => i });
        var n = Object.prototype.hasOwnProperty;
        function i(e, t) {
          var r = [],
            i = "",
            o = 0;
          for (i in e) n.call(e, i) && ((r[o] = t(i, e[i])), (o += 1));
          return r;
        }
      },
      9226: (e, t, r) => {
        "use strict";
        r.d(t, { $c: () => u, Ng: () => d, RR: () => c });
        var n = r(6562),
          i = r(9557),
          o = r(9548),
          a = r(8610),
          s = { regex: /^file:\/\/(.*)/, replacement: "file://OBFUSCATED" };
        class c extends i.w {
          constructor(e) {
            super(e);
          }
          shouldObfuscate() {
            return u(this.sharedContext.agentIdentifier).length > 0;
          }
          obfuscateString(e) {
            if (!e || "string" != typeof e) return e;
            for (
              var t = u(this.sharedContext.agentIdentifier), r = e, n = 0;
              n < t.length;
              n++
            ) {
              var i = t[n].regex,
                o = t[n].replacement || "*";
              r = r.replace(i, o);
            }
            return r;
          }
        }
        function u(e) {
          var t = [],
            r = (0, n.Mt)(e, "obfuscate") || [];
          return (t = t.concat(r)), o.T.isFileProtocol() && t.push(s), t;
        }
        function d(e) {
          for (var t = !1, r = !1, n = 0; n < e.length; n++) {
            "regex" in e[n]
              ? "string" != typeof e[n].regex &&
                e[n].regex.constructor !== RegExp &&
                ((0, a.Z)(
                  'An obfuscation replacement rule contains a "regex" value with an invalid type (must be a string or RegExp)'
                ),
                (r = !0))
              : ((0, a.Z)(
                  'An obfuscation replacement rule was detected missing a "regex" value.'
                ),
                (r = !0));
            var i = e[n].replacement;
            i &&
              "string" != typeof i &&
              ((0, a.Z)(
                'An obfuscation replacement rule contains a "replacement" value with an invalid type (must be a string)'
              ),
              (t = !0));
          }
          return !t && !r;
        }
      },
      2650: (e, t, r) => {
        "use strict";
        r.d(t, { K: () => a, b: () => o });
        var n = r(8544);
        function i() {
          return (
            "undefined" == typeof document || "complete" === document.readyState
          );
        }
        function o(e, t) {
          if (i()) return e();
          (0, n.bP)("load", e, t);
        }
        function a(e) {
          if (i()) return e();
          (0, n.iz)("DOMContentLoaded", e);
        }
      },
      6797: (e, t, r) => {
        "use strict";
        r.d(t, {
          EZ: () => u,
          Qy: () => c,
          ce: () => o,
          fP: () => a,
          gG: () => d,
          mF: () => s,
        });
        var n = r(2053),
          i = r(2374);
        const o = { beacon: "bam.nr-data.net", errorBeacon: "bam.nr-data.net" };
        function a() {
          return (
            i._A.NREUM || (i._A.NREUM = {}),
            void 0 === i._A.newrelic && (i._A.newrelic = i._A.NREUM),
            i._A.NREUM
          );
        }
        function s() {
          let e = a();
          return (
            e.o ||
              (e.o = {
                ST: i._A.setTimeout,
                SI: i._A.setImmediate,
                CT: i._A.clearTimeout,
                XHR: i._A.XMLHttpRequest,
                REQ: i._A.Request,
                EV: i._A.Event,
                PR: i._A.Promise,
                MO: i._A.MutationObserver,
                FETCH: i._A.fetch,
              }),
            e
          );
        }
        function c(e, t, r) {
          let i = a();
          const o = i.initializedAgents || {},
            s = o[e] || {};
          return (
            Object.keys(s).length ||
              (s.initializedAt = { ms: (0, n.zO)(), date: new Date() }),
            (i.initializedAgents = { ...o, [e]: { ...s, [r]: t } }),
            i
          );
        }
        function u(e, t) {
          a()[e] = t;
        }
        function d() {
          return (
            (function () {
              let e = a();
              const t = e.info || {};
              e.info = { beacon: o.beacon, errorBeacon: o.errorBeacon, ...t };
            })(),
            (function () {
              let e = a();
              const t = e.init || {};
              e.init = { ...t };
            })(),
            s(),
            (function () {
              let e = a();
              const t = e.loader_config || {};
              e.loader_config = { ...t };
            })(),
            a()
          );
        }
      },
      6998: (e, t, r) => {
        "use strict";
        r.d(t, { N: () => i, e: () => o });
        var n = r(8544);
        function i(e) {
          let t =
            arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
          return void (0, n.iz)("visibilitychange", r);
          function r() {
            if (t) {
              if ("hidden" != document.visibilityState) return;
              e();
            }
            e(document.visibilityState);
          }
        }
        function o() {
          return "hidden" === document.visibilityState ? -1 : 1 / 0;
        }
      },
      6408: (e, t, r) => {
        "use strict";
        r.d(t, { W: () => i });
        var n = r(2374);
        function i() {
          return "function" == typeof n._A?.PerformanceObserver;
        }
      },
      8675: (e, t, r) => {
        "use strict";
        r.d(t, { t: () => n });
        const n = r(2325).D.ajax;
      },
      8322: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => i, t: () => n });
        const n = r(2325).D.jserrors,
          i = "nr@seenError";
      },
      6034: (e, t, r) => {
        "use strict";
        r.d(t, { t: () => n });
        const n = r(2325).D.metrics;
      },
      6486: (e, t, r) => {
        "use strict";
        r.d(t, { t: () => n });
        const n = r(2325).D.pageAction;
      },
      2484: (e, t, r) => {
        "use strict";
        r.d(t, { t: () => n });
        const n = r(2325).D.pageViewEvent;
      },
      6382: (e, t, r) => {
        "use strict";
        r.d(t, { t: () => n });
        const n = r(2325).D.pageViewTiming;
      },
      2628: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            ADD_EVENT_LISTENER: () => a,
            BST_RESOURCE: () => u,
            BST_TIMER: () => g,
            END: () => l,
            FEATURE_NAME: () => i,
            FN_END: () => p,
            FN_START: () => h,
            ORIG_EVENT: () => m,
            PUSH_STATE: () => v,
            REMOVE_EVENT_LISTENER: () => s,
            RESOURCE: () => d,
            RESOURCE_TIMING_BUFFER_FULL: () => c,
            START: () => f,
            learResourceTimings: () => o,
          });
        var n = r(6562);
        const i = r(2325).D.sessionTrace,
          o = "learResourceTimings",
          a = "addEventListener",
          s = "removeEventListener",
          c = "resourcetimingbufferfull",
          u = "bstResource",
          d = "resource",
          f = "-start",
          l = "-end",
          h = "fn" + f,
          p = "fn" + l,
          g = "bstTimer",
          v = "pushState",
          m = n.Yu.EV;
      },
      755: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            ADD_EVENT_LISTENER: () => S,
            BODY: () => x,
            CB_END: () => O,
            CB_START: () => d,
            END: () => T,
            FEATURE_NAME: () => o,
            FETCH: () => _,
            FETCH_BODY: () => b,
            FETCH_DONE: () => m,
            FETCH_START: () => v,
            FN_END: () => u,
            FN_START: () => c,
            INTERACTION: () => h,
            INTERACTION_API: () => f,
            INTERACTION_EVENTS: () => a,
            JSONP_END: () => y,
            JSONP_NODE: () => g,
            JS_TIME: () => A,
            LOCATION: () => D,
            MAX_TIMER_BUDGET: () => s,
            REMAINING: () => l,
            SPA_NODE: () => p,
            START: () => E,
            WIN: () => N,
            originalSetTimeout: () => w,
          });
        var n = r(6562),
          i = r(2374);
        const o = r(2325).D.spa,
          a = ["click", "submit", "keypress", "keydown", "keyup", "change"],
          s = 999,
          c = "fn-start",
          u = "fn-end",
          d = "cb-start",
          f = "api-ixn-",
          l = "remaining",
          h = "interaction",
          p = "spaNode",
          g = "jsonpNode",
          v = "fetch-start",
          m = "fetch-done",
          b = "fetch-body-",
          y = "jsonp-end",
          w = n.Yu.ST,
          E = "-start",
          T = "-end",
          x = "-body",
          O = "cb" + T,
          A = "jsTime",
          _ = "fetch",
          S = "addEventListener",
          N = i._A,
          D = N.location;
      },
      1509: (e, t, r) => {
        "use strict";
        r.d(t, { W: () => s });
        var n = r(6562),
          i = r(3752),
          o = r(2384),
          a = r(6797);
        class s {
          constructor(e, t, r) {
            (this.agentIdentifier = e),
              (this.aggregator = t),
              (this.ee = i.ee.get(
                e,
                (0, n.OP)(this.agentIdentifier).isolatedBacklog
              )),
              (this.featureName = r),
              (this.blocked = !1),
              this.checkConfiguration();
          }
          checkConfiguration() {
            if (!(0, n.lF)(this.agentIdentifier)) {
              let e = { ...(0, a.gG)().info?.jsAttributes };
              try {
                e = { ...e, ...(0, n.C5)(this.agentIdentifier)?.jsAttributes };
              } catch (e) {}
              (0, o.j)(this.agentIdentifier, {
                ...(0, a.gG)(),
                info: { ...(0, a.gG)().info, jsAttributes: e },
              });
            }
          }
        }
      },
      2384: (e, t, r) => {
        "use strict";
        r.d(t, { j: () => y });
        var n = r(8683),
          i = r.n(n),
          o = r(2325),
          a = r(6562),
          s = r(9252),
          c = r(7022),
          u = r(3752),
          d = r(2053),
          f = r(4329),
          l = r(2650),
          h = r(2374);
        function p(e, t, n) {
          n || (0, f.R)(e, "api"),
            (function (e) {
              function t(t) {
                for (
                  var r = arguments.length,
                    n = new Array(r > 1 ? r - 1 : 0),
                    i = 1;
                  i < r;
                  i++
                )
                  n[i - 1] = arguments[i];
                Object.values(e.initializedAgents).forEach((e) => {
                  e.exposed && e.api[t] && e.api[t](...n);
                });
              }
              [
                "setErrorHandler",
                "finished",
                "addToTrace",
                "inlineHit",
                "addRelease",
                "addPageAction",
                "setCurrentRouteName",
                "setPageViewName",
                "setCustomAttribute",
                "interaction",
                "noticeError",
              ].forEach((r) => {
                e[r] = function () {
                  for (
                    var e = arguments.length, n = new Array(e), i = 0;
                    i < e;
                    i++
                  )
                    n[i] = arguments[i];
                  return t(r, ...n);
                };
              });
            })(t);
          var p = u.ee.get(e),
            g = p.get("tracer"),
            v = "api-",
            m = "api-ixn-";
          function b() {}
          (0, c.D)(
            [
              "setErrorHandler",
              "finished",
              "addToTrace",
              "inlineHit",
              "addRelease",
            ],
            function (e, r) {
              t[r] = w(v, r, !0, "api");
            }
          ),
            (t.addPageAction = w(v, "addPageAction", !0, o.D.pageAction)),
            (t.setCurrentRouteName = w(v, "routeName", !0, o.D.spa)),
            (t.setPageViewName = function (t, r) {
              if ("string" == typeof t)
                return (
                  "/" !== t.charAt(0) && (t = "/" + t),
                  ((0, a.OP)(e).customTransaction =
                    (r || "http://custom.transaction") + t),
                  w(v, "setPageViewName", !0, "api")()
                );
            }),
            (t.setCustomAttribute = function (t, r) {
              const n = (0, a.C5)(e);
              return (
                (0, a.CX)(e, {
                  ...n,
                  jsAttributes: { ...n.jsAttributes, [t]: r },
                }),
                w(v, "setCustomAttribute", !0, "api")()
              );
            }),
            (t.interaction = function () {
              return new b().get();
            });
          var y = (b.prototype = {
            createTracer: function (e, t) {
              var r = {},
                n = this,
                i = "function" == typeof t;
              return (
                (0, s.p)("api-ixn-tracer", [(0, d.zO)(), e, r], n, o.D.spa, p),
                function () {
                  if (
                    (g.emit(
                      (i ? "" : "no-") + "fn-start",
                      [(0, d.zO)(), n, i],
                      r
                    ),
                    i)
                  )
                    try {
                      return t.apply(this, arguments);
                    } catch (e) {
                      throw (
                        (g.emit(
                          "fn-err",
                          [
                            arguments,
                            this,
                            "string" == typeof e ? new Error(e) : e,
                          ],
                          r
                        ),
                        e)
                      );
                    } finally {
                      g.emit("fn-end", [(0, d.zO)()], r);
                    }
                }
              );
            },
          });
          function w(e, t, r, n) {
            return function () {
              return (
                (0, s.p)(
                  "record-supportability",
                  ["API/" + t + "/called"],
                  void 0,
                  o.D.metrics,
                  p
                ),
                (0, s.p)(
                  e + t,
                  [(0, d.zO)()].concat(i()(arguments)),
                  r ? null : this,
                  n,
                  p
                ),
                r ? void 0 : this
              );
            };
          }
          function E() {
            r.e(692)
              .then(r.bind(r, 5692))
              .then((t) => {
                let { setAPI: r } = t;
                r(e), (0, f.L)(e, "api");
              });
          }
          (0, c.D)(
            "actionText,setName,setAttribute,save,ignore,onEnd,getContext,end,get".split(
              ","
            ),
            function (e, t) {
              y[t] = w(m, t, void 0, o.D.spa);
            }
          ),
            (t.noticeError = function (e, t) {
              "string" == typeof e && (e = new Error(e)),
                (0, s.p)(
                  "record-supportability",
                  ["API/noticeError/called"],
                  void 0,
                  o.D.metrics,
                  p
                ),
                (0, s.p)(
                  "err",
                  [e, (0, d.zO)(), !1, t],
                  void 0,
                  o.D.jserrors,
                  p
                );
            }),
            h.v6 ? E() : (0, l.b)(() => E(), !0);
        }
        var g = r(6797);
        const v = {
          stn: o.D.sessionTrace,
          err: o.D.jserrors,
          ins: o.D.pageAction,
          spa: o.D.spa,
        };
        function m(e, t) {
          var r = u.ee.get(t);
          e &&
            "object" == typeof e &&
            ((0, c.D)(e, function (e, t) {
              if (!t) return (0, s.p)("block-" + e, [], void 0, v[e], r);
              t &&
                !b[e] &&
                ((0, s.p)("feat-" + e, [], void 0, v[e], r), (b[e] = !0));
            }),
            (0, f.L)(t, o.D.pageViewEvent));
        }
        const b = {};
        function y(e) {
          let t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {},
            r = arguments.length > 2 ? arguments[2] : void 0,
            n = arguments.length > 3 ? arguments[3] : void 0,
            {
              init: i,
              info: o,
              loader_config: s,
              runtime: c = { loaderType: r },
              exposed: u = !0,
            } = t;
          const d = (0, g.gG)();
          let f = {};
          return (
            o || ((i = d.init), (o = d.info), (s = d.loader_config), (f = d)),
            h.v6 && (o.jsAttributes = { ...o.jsAttributes, isWorker: !0 }),
            (0, a.CX)(e, o),
            (0, a.Dg)(e, i || {}),
            (0, a.GE)(e, s || {}),
            (0, a.sU)(e, c),
            p(e, f, n),
            (0, g.Qy)(e, d, "api"),
            (0, g.Qy)(e, u, "exposed"),
            h.v6 ||
              ((0, g.EZ)("activatedFeatures", b),
              (0, g.EZ)("setToken", (t) => m(t, e))),
            f
          );
        }
      },
      909: (e, t, r) => {
        "use strict";
        r.d(t, { Z: () => i, q: () => o });
        var n = r(2325);
        function i(e) {
          switch (e) {
            case n.D.ajax:
              return [n.D.jserrors];
            case n.D.sessionTrace:
              return [n.D.ajax, n.D.pageViewEvent];
            case n.D.pageViewTiming:
              return [n.D.pageViewEvent];
            default:
              return [];
          }
        }
        function o(e) {
          return e === n.D.jserrors ? [] : ["auto"];
        }
      },
      2325: (e, t, r) => {
        "use strict";
        r.d(t, { D: () => n, p: () => i });
        const n = {
            ajax: "ajax",
            jserrors: "jserrors",
            metrics: "metrics",
            pageAction: "page_action",
            pageViewEvent: "page_view_event",
            pageViewTiming: "page_view_timing",
            sessionTrace: "session_trace",
            spa: "spa",
          },
          i = {
            [n.pageViewEvent]: 1,
            [n.pageViewTiming]: 2,
            [n.metrics]: 3,
            [n.jserrors]: 4,
            [n.ajax]: 5,
            [n.sessionTrace]: 6,
            [n.pageAction]: 7,
            [n.spa]: 8,
          };
      },
      8683: (e) => {
        e.exports = function (e, t, r) {
          t || (t = 0), void 0 === r && (r = e ? e.length : 0);
          for (var n = -1, i = r - t || 0, o = Array(i < 0 ? 0 : i); ++n < i; )
            o[n] = e[t + n];
          return o;
        };
      },
      4992: (e, t, r) => {
        var n = {
          "./ajax/aggregate": [960, 779, 960],
          "./jserrors/aggregate": [6112, 779, 112],
          "./metrics/aggregate": [4325, 779, 325],
          "./page_action/aggregate": [6817, 779, 817],
          "./page_view_event/aggregate": [4823, 779, 823],
          "./page_view_timing/aggregate": [8785, 779, 785],
          "./session_trace/aggregate": [1307, 779, 307],
          "./spa/aggregate": [9378, 779, 378],
        };
        function i(e) {
          if (!r.o(n, e))
            return Promise.resolve().then(() => {
              var t = new Error("Cannot find module '" + e + "'");
              throw ((t.code = "MODULE_NOT_FOUND"), t);
            });
          var t = n[e],
            i = t[0];
          return Promise.all(t.slice(1).map(r.e)).then(() => r(i));
        }
        (i.keys = () => Object.keys(n)), (i.id = 4992), (e.exports = i);
      },
    },
    n = {};
  function i(e) {
    var t = n[e];
    if (void 0 !== t) return t.exports;
    var o = (n[e] = { exports: {} });
    return r[e](o, o.exports, i), o.exports;
  }
  (i.m = r),
    (i.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return i.d(t, { a: t }), t;
    }),
    (i.d = (e, t) => {
      for (var r in t)
        i.o(t, r) &&
          !i.o(e, r) &&
          Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }),
    (i.f = {}),
    (i.e = (e) =>
      Promise.all(Object.keys(i.f).reduce((t, r) => (i.f[r](e, t), t), []))),
    (i.u = (e) => e + "." + i.h().slice(0, 8) + "-1223.js"),
    (i.h = () => "215647de1097144af948"),
    (i.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (e = {}),
    (t = "NRBA:"),
    (i.l = (r, n, o, a) => {
      if (e[r]) e[r].push(n);
      else {
        var s, c;
        if (void 0 !== o)
          for (
            var u = document.getElementsByTagName("script"), d = 0;
            d < u.length;
            d++
          ) {
            var f = u[d];
            if (
              f.getAttribute("src") == r ||
              f.getAttribute("data-webpack") == t + o
            ) {
              s = f;
              break;
            }
          }
        s ||
          ((c = !0),
          ((s = document.createElement("script")).charset = "utf-8"),
          (s.timeout = 120),
          i.nc && s.setAttribute("nonce", i.nc),
          s.setAttribute("data-webpack", t + o),
          (s.src = r)),
          (e[r] = [n]);
        var l = (t, n) => {
            (s.onerror = s.onload = null), clearTimeout(h);
            var i = e[r];
            if (
              (delete e[r],
              s.parentNode && s.parentNode.removeChild(s),
              i && i.forEach((e) => e(n)),
              t)
            )
              return t(n);
          },
          h = setTimeout(
            l.bind(null, void 0, { type: "timeout", target: s }),
            12e4
          );
        (s.onerror = l.bind(null, s.onerror)),
          (s.onload = l.bind(null, s.onload)),
          c && document.head.appendChild(s);
      }
    }),
    (i.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (i.p = "https://js-agent.newrelic.com/"),
    (() => {
      var e = { 939: 0, 866: 0 };
      i.f.j = (t, r) => {
        var n = i.o(e, t) ? e[t] : void 0;
        if (0 !== n)
          if (n) r.push(n[2]);
          else {
            var o = new Promise((r, i) => (n = e[t] = [r, i]));
            r.push((n[2] = o));
            var a = i.p + i.u(t),
              s = new Error();
            i.l(
              a,
              (r) => {
                if (i.o(e, t) && (0 !== (n = e[t]) && (e[t] = void 0), n)) {
                  var o = r && ("load" === r.type ? "missing" : r.type),
                    a = r && r.target && r.target.src;
                  (s.message =
                    "Loading chunk " + t + " failed.\n(" + o + ": " + a + ")"),
                    (s.name = "ChunkLoadError"),
                    (s.type = o),
                    (s.request = a),
                    n[1](s);
                }
              },
              "chunk-" + t,
              t
            );
          }
      };
      var t = (t, r) => {
          var n,
            o,
            [a, s, c] = r,
            u = 0;
          if (a.some((t) => 0 !== e[t])) {
            for (n in s) i.o(s, n) && (i.m[n] = s[n]);
            if (c) c(i);
          }
          for (t && t(r); u < a.length; u++)
            (o = a[u]), i.o(e, o) && e[o] && e[o][0](), (e[o] = 0);
        },
        r = (window.webpackChunkNRBA = window.webpackChunkNRBA || []);
      r.forEach(t.bind(null, 0)), (r.push = t.bind(null, r.push.bind(r)));
    })();
  var o = {};
  (() => {
    "use strict";
    i.r(o);
    var e = i(2325),
      t = i(6562);
    const r = Object.values(e.D);
    function n(e) {
      const n = {};
      return (
        r.forEach((r) => {
          n[r] = (function (e, r) {
            return !1 !== (0, t.Mt)(r, `${e}.enabled`);
          })(r, e);
        }),
        n
      );
    }
    var a = i(2384),
      s = i(909),
      c = i(9557),
      u = i(7022);
    class d extends c.w {
      constructor(e) {
        super(e), (this.aggregatedData = {});
      }
      store(e, t, r, n, i) {
        var o = this.getBucket(e, t, r, i);
        return (
          (o.metrics = (function (e, t) {
            t || (t = { count: 0 });
            return (
              (t.count += 1),
              (0, u.D)(e, function (e, r) {
                t[e] = f(r, t[e]);
              }),
              t
            );
          })(n, o.metrics)),
          o
        );
      }
      merge(e, t, r, n, i) {
        var o = this.getBucket(e, t, n, i);
        if (o.metrics) {
          var a = o.metrics;
          (a.count += r.count),
            (0, u.D)(r, function (e, t) {
              if ("count" !== e) {
                var n = a[e],
                  i = r[e];
                i && !i.c
                  ? (a[e] = f(i.t, n))
                  : (a[e] = (function (e, t) {
                      if (!t) return e;
                      t.c || (t = l(t.t));
                      return (
                        (t.min = Math.min(e.min, t.min)),
                        (t.max = Math.max(e.max, t.max)),
                        (t.t += e.t),
                        (t.sos += e.sos),
                        (t.c += e.c),
                        t
                      );
                    })(i, a[e]));
              }
            });
        } else o.metrics = r;
      }
      storeMetric(e, t, r, n) {
        var i = this.getBucket(e, t, r);
        return (i.stats = f(n, i.stats)), i;
      }
      getBucket(e, t, r, n) {
        this.aggregatedData[e] || (this.aggregatedData[e] = {});
        var i = this.aggregatedData[e][t];
        return (
          i ||
            ((i = this.aggregatedData[e][t] = { params: r || {} }),
            n && (i.custom = n)),
          i
        );
      }
      get(e, t) {
        return t
          ? this.aggregatedData[e] && this.aggregatedData[e][t]
          : this.aggregatedData[e];
      }
      take(e) {
        for (var t = {}, r = "", n = !1, i = 0; i < e.length; i++)
          (t[(r = e[i])] = h(this.aggregatedData[r])),
            t[r].length && (n = !0),
            delete this.aggregatedData[r];
        return n ? t : null;
      }
    }
    function f(e, t) {
      return null == e
        ? (function (e) {
            e ? e.c++ : (e = { c: 1 });
            return e;
          })(t)
        : t
        ? (t.c || (t = l(t.t)),
          (t.c += 1),
          (t.t += e),
          (t.sos += e * e),
          e > t.max && (t.max = e),
          e < t.min && (t.min = e),
          t)
        : { t: e };
    }
    function l(e) {
      return { t: e, min: e, max: e, sos: e * e, c: 1 };
    }
    function h(e) {
      return "object" != typeof e ? [] : (0, u.D)(e, p);
    }
    function p(e, t) {
      return t;
    }
    var g = i(6797),
      v = i(5526),
      m = i(8610);
    var b = i(9252),
      y = i(2053),
      w = i(8283),
      E = i(6625),
      T = i(4329),
      x = i(1509),
      O = i(2650),
      A = i(2374);
    class _ extends x.W {
      constructor(e, t, r) {
        let n =
          !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
        super(e, t, r),
          (this.completed = new Promise((e, t) => {
            (this.resolve = e), (this.reject = t);
          })),
          (this.hasAggregator = !1),
          (this.auto = n),
          n && (0, T.R)(e, r);
      }
      importAggregator() {
        try {
          if (this.hasAggregator || !this.auto) return;
          this.hasAggregator = !0;
          const e = async () => {
            try {
              const { Aggregate: e } = await i(4992)(
                `./${this.featureName}/aggregate`
              );
              new e(this.agentIdentifier, this.aggregator), this.resolve();
            } catch (e) {
              (0, m.Z)(
                `Failed to import aggregator class for ${this.featureName}`,
                e
              );
            }
          };
          A.v6 ? e() : (0, O.b)(() => e(), !0);
        } catch (e) {
          this.reject(e);
        }
      }
    }
    var S,
      N,
      D,
      P = i(2484);
    class I extends _ {
      constructor(e, t) {
        let r =
          !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
        super(e, t, P.t, r),
          A.il &&
            ((0, E.v)(e),
            (0, w.B)(e, "firstbyte", (0, y.yf)()),
            (0, O.K)(() => this.measureDomContentLoaded()),
            (0, O.b)(() => this.measureWindowLoaded(), !0),
            this.importAggregator());
      }
      measureWindowLoaded() {
        var t = (0, y.zO)();
        (0, w.B)(this.agentIdentifier, "onload", t + (0, y.os)()),
          (0, b.p)("timing", ["load", t], void 0, e.D.pageViewTiming, this.ee);
      }
      measureDomContentLoaded() {
        (0, w.B)(this.agentIdentifier, "domContent", (0, y.zO)() + (0, y.os)());
      }
    }
    (S = I),
      (N = "featureName"),
      (D = P.t),
      N in S
        ? Object.defineProperty(S, N, {
            value: D,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (S[N] = D);
    var R = i(6998),
      C = i(8544),
      j = i(6382);
    class k extends _ {
      constructor(t, r) {
        var n;
        let i =
          !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
        if ((super(t, r, j.t, i), (n = this), A.il)) {
          if (
            ((this.pageHiddenTime = (0, R.e)()),
            this.performanceObserver,
            this.lcpPerformanceObserver,
            this.clsPerformanceObserver,
            (this.fiRecorded = !1),
            "PerformanceObserver" in window &&
              "function" == typeof window.PerformanceObserver)
          ) {
            this.performanceObserver = new PerformanceObserver(function () {
              return n.perfObserver(...arguments);
            });
            try {
              this.performanceObserver.observe({ entryTypes: ["paint"] });
            } catch (e) {}
            this.lcpPerformanceObserver = new PerformanceObserver(function () {
              return n.lcpObserver(...arguments);
            });
            try {
              this.lcpPerformanceObserver.observe({
                entryTypes: ["largest-contentful-paint"],
              });
            } catch (e) {}
            this.clsPerformanceObserver = new PerformanceObserver(function () {
              return n.clsObserver(...arguments);
            });
            try {
              this.clsPerformanceObserver.observe({
                type: "layout-shift",
                buffered: !0,
              });
            } catch (e) {}
          }
          this.fiRecorded = !1;
          [
            "click",
            "keydown",
            "mousedown",
            "pointerdown",
            "touchstart",
          ].forEach((e) => {
            (0, C.iz)(e, function () {
              return n.captureInteraction(...arguments);
            });
          }),
            (0, R.N)(() => {
              (this.pageHiddenTime = (0, y.zO)()),
                (0, b.p)(
                  "docHidden",
                  [this.pageHiddenTime],
                  void 0,
                  e.D.pageViewTiming,
                  this.ee
                );
            }, !0),
            (0, C.bP)("pagehide", () =>
              (0, b.p)(
                "winPagehide",
                [(0, y.zO)()],
                void 0,
                e.D.pageViewTiming,
                this.ee
              )
            ),
            this.importAggregator();
        }
      }
      perfObserver(t, r) {
        t.getEntries().forEach((t) => {
          "first-paint" === t.name
            ? (0, b.p)(
                "timing",
                ["fp", Math.floor(t.startTime)],
                void 0,
                e.D.pageViewTiming,
                this.ee
              )
            : "first-contentful-paint" === t.name &&
              (0, b.p)(
                "timing",
                ["fcp", Math.floor(t.startTime)],
                void 0,
                e.D.pageViewTiming,
                this.ee
              );
        });
      }
      lcpObserver(t, r) {
        var n = t.getEntries();
        if (n.length > 0) {
          var i = n[n.length - 1];
          if (this.pageHiddenTime < i.startTime) return;
          var o = [i],
            a = this.addConnectionAttributes({});
          a && o.push(a),
            (0, b.p)("lcp", o, void 0, e.D.pageViewTiming, this.ee);
        }
      }
      clsObserver(t) {
        t.getEntries().forEach((t) => {
          t.hadRecentInput ||
            (0, b.p)("cls", [t], void 0, e.D.pageViewTiming, this.ee);
        });
      }
      addConnectionAttributes(e) {
        var t =
          navigator.connection ||
          navigator.mozConnection ||
          navigator.webkitConnection;
        if (t)
          return (
            t.type && (e["net-type"] = t.type),
            t.effectiveType && (e["net-etype"] = t.effectiveType),
            t.rtt && (e["net-rtt"] = t.rtt),
            t.downlink && (e["net-dlink"] = t.downlink),
            e
          );
      }
      captureInteraction(r) {
        if (r instanceof t.Yu.EV && !this.fiRecorded) {
          var n = Math.round(r.timeStamp),
            i = { type: r.type };
          this.addConnectionAttributes(i),
            n <= (0, y.zO)()
              ? (i.fid = (0, y.zO)() - n)
              : n > (0, y.os)() && n <= Date.now()
              ? ((n -= (0, y.os)()), (i.fid = (0, y.zO)() - n))
              : (n = (0, y.zO)()),
            (this.fiRecorded = !0),
            (0, b.p)(
              "timing",
              ["fi", n, i],
              void 0,
              e.D.pageViewTiming,
              this.ee
            );
        }
      }
    }
    !(function (e, t, r) {
      t in e
        ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = r);
    })(k, "featureName", j.t);
    var L = i(4045),
      M = "React",
      H = "Angular",
      z = "AngularJS",
      B = "Backbone",
      F = "Ember",
      $ = "Vue",
      U = "Meteor",
      V = "Zepto",
      G = "Jquery";
    function q() {
      if (!A.il) return [];
      var e = [];
      try {
        (function () {
          try {
            if (window.React || window.ReactDOM || window.ReactRedux) return !0;
            if (document.querySelector("[data-reactroot], [data-reactid]"))
              return !0;
            for (
              var e = document.querySelectorAll("body > div"), t = 0;
              t < e.length;
              t++
            )
              if (Object.keys(e[t]).indexOf("_reactRootContainer") >= 0)
                return !0;
            return !1;
          } catch (e) {
            return !1;
          }
        })() && e.push(M),
          (function () {
            try {
              return (
                !!window.angular ||
                !!document.querySelector(
                  ".ng-binding, [ng-app], [data-ng-app], [ng-controller], [data-ng-controller], [ng-repeat], [data-ng-repeat]"
                ) ||
                !!document.querySelector(
                  'script[src*="angular.js"], script[src*="angular.min.js"]'
                )
              );
            } catch (e) {
              return !1;
            }
          })() && e.push(z),
          (function () {
            try {
              return (
                !!(
                  window.hasOwnProperty("ng") &&
                  window.ng.hasOwnProperty("coreTokens") &&
                  window.ng.coreTokens.hasOwnProperty("NgZone")
                ) || !!document.querySelectorAll("[ng-version]").length
              );
            } catch (e) {
              return !1;
            }
          })() && e.push(H),
          window.Backbone && e.push(B),
          window.Ember && e.push(F),
          window.Vue && e.push($),
          window.Meteor && e.push(U),
          window.Zepto && e.push(V),
          window.jQuery && e.push(G);
      } catch (e) {}
      return e;
    }
    var W = i(9548),
      X = i(9226),
      Z = i(8226);
    const Y = Boolean(A._A?.Worker),
      J = Boolean(A._A?.SharedWorker),
      Q = Boolean(A._A?.navigator?.serviceWorker);
    let K, ee, te;
    var re = i(6034);
    class ne extends _ {
      constructor(e, t) {
        var r;
        let n =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
          i =
            !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
        super(e, t, re.t, i),
          (r = this),
          (this.PfFeatStatusEnum = n),
          this.singleChecks(),
          this.eachSessionChecks(),
          (0, L.X)(
            "record-supportability",
            function () {
              return r.recordSupportability(...arguments);
            },
            this.featureName,
            this.ee
          ),
          (0, L.X)(
            "record-custom",
            function () {
              return r.recordCustom(...arguments);
            },
            this.featureName,
            this.ee
          ),
          this.importAggregator();
      }
      recordSupportability(e, t) {
        var r = ["sm", e, { name: e }, t];
        return (0, b.p)("storeMetric", r, null, this.featureName, this.ee), r;
      }
      recordCustom(e, t) {
        var r = ["cm", e, { name: e }, t];
        return (
          (0, b.p)("storeEventMetrics", r, null, this.featureName, this.ee), r
        );
      }
      singleChecks() {
        this.recordSupportability(`Generic/Version/${Z.q}/Detected`);
        const { loaderType: e } = (0, t.OP)(this.agentIdentifier);
        e && this.recordSupportability(`Generic/LoaderType/${e}/Detected`),
          A.il &&
            (0, O.K)(() => {
              q().forEach((e) => {
                this.recordSupportability("Framework/" + e + "/Detected");
              });
            }),
          W.T.isFileProtocol() &&
            (this.recordSupportability("Generic/FileProtocol/Detected"),
            (W.T.supportabilityMetricSent = !0));
        const r = (0, X.$c)(this.agentIdentifier);
        r.length > 0 && this.recordSupportability("Generic/Obfuscate/Detected"),
          r.length > 0 &&
            !(0, X.Ng)(r) &&
            this.recordSupportability("Generic/Obfuscate/Invalid"),
          A.il && this.reportPolyfillsNeeded(),
          (function (e) {
            if (!K) {
              if (Y) {
                K = Worker;
                try {
                  A._A.Worker = r(K, "Dedicated");
                } catch (e) {
                  o(e, "Dedicated");
                }
                if (J) {
                  ee = SharedWorker;
                  try {
                    A._A.SharedWorker = r(ee, "Shared");
                  } catch (e) {
                    o(e, "Shared");
                  }
                } else n("Shared");
                if (Q) {
                  te = navigator.serviceWorker.register;
                  try {
                    A._A.navigator.serviceWorker.register =
                      ((t = te),
                      function () {
                        for (
                          var e = arguments.length, r = new Array(e), n = 0;
                          n < e;
                          n++
                        )
                          r[n] = arguments[n];
                        return (
                          i("Service", r[1]?.type),
                          t.apply(navigator.serviceWorker, r)
                        );
                      });
                  } catch (e) {
                    o(e, "Service");
                  }
                } else n("Service");
                var t;
                return;
              }
              n("All");
            }
            function r(e, t) {
              return new Proxy(e, {
                construct: (e, r) => (i(t, r[1]?.type), new e(...r)),
              });
            }
            function n(t) {
              A.v6 || e(`Workers/${t}/Unavailable`);
            }
            function i(t, r) {
              e(
                "module" === r ? `Workers/${t}/Module` : `Workers/${t}/Classic`
              );
            }
            function o(t, r) {
              e(`Workers/${r}/SM/Unsupported`),
                (0, m.Z)(`NR Agent: Unable to capture ${r} workers.`, t);
            }
          })(this.recordSupportability.bind(this));
      }
      reportPolyfillsNeeded() {
        this.recordSupportability(
          `Generic/Polyfill/Promise/${this.PfFeatStatusEnum.PROMISE}`
        ),
          this.recordSupportability(
            `Generic/Polyfill/ArrayIncludes/${this.PfFeatStatusEnum.ARRAY_INCLUDES}`
          ),
          this.recordSupportability(
            `Generic/Polyfill/ObjectAssign/${this.PfFeatStatusEnum.OBJECT_ASSIGN}`
          ),
          this.recordSupportability(
            `Generic/Polyfill/ObjectEntries/${this.PfFeatStatusEnum.OBJECT_ENTRIES}`
          );
      }
      eachSessionChecks() {
        A.il &&
          (0, C.bP)("pageshow", (e) => {
            e.persisted && this.recordCustom("Custom/BFCache/PageRestored");
          });
      }
    }
    !(function (e, t, r) {
      t in e
        ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = r);
    })(ne, "featureName", re.t);
    var ie = i(3916),
      oe = i(3752),
      ae = i(8683),
      se = i.n(ae),
      ce = A._A,
      ue = "fetch-",
      de = "fetch-body-",
      fe = ["arrayBuffer", "blob", "json", "text", "formData"],
      le = ce.Request,
      he = ce.Response,
      pe = "prototype",
      ge = "nr@context";
    const ve = {};
    function me(e) {
      const t = (function (e) {
        return (e || oe.ee).get("fetch");
      })(e);
      if (!(le && he && ce.fetch)) return t;
      if (ve[t.debugId]) return t;
      function r(e, r, n) {
        var i = e[r];
        "function" == typeof i &&
          (e[r] = function () {
            var e,
              r = se()(arguments),
              o = {};
            t.emit(n + "before-start", [r], o),
              o[ge] && o[ge].dt && (e = o[ge].dt);
            var a = i.apply(this, r);
            return (
              t.emit(n + "start", [r, e], a),
              a.then(
                function (e) {
                  return t.emit(n + "end", [null, e], a), e;
                },
                function (e) {
                  throw (t.emit(n + "end", [e], a), e);
                }
              )
            );
          });
      }
      return (
        (ve[t.debugId] = !0),
        (0, u.D)(fe, function (e, t) {
          r(le[pe], t, de), r(he[pe], t, de);
        }),
        r(ce, "fetch", ue),
        t.on("fetch-end", function (e, r) {
          var n = this;
          if (r) {
            var i = r.headers.get("content-length");
            null !== i && (n.rxSize = i), t.emit("fetch-done", [null, r], n);
          } else t.emit("fetch-done", [e], n);
        }),
        t
      );
    }
    var be = "nr@original",
      ye = Object.prototype.hasOwnProperty,
      we = !1;
    function Ee(e, t) {
      return (
        e || (e = oe.ee),
        (r.inPlace = function (e, t, n, i, o) {
          n || (n = "");
          var a,
            s,
            c,
            u = "-" === n.charAt(0);
          for (c = 0; c < t.length; c++)
            (s = t[c]), Oe((a = e[s])) || (e[s] = r(a, u ? s + n : n, i, s, o));
        }),
        (r.flag = be),
        r
      );
      function r(t, r, i, o, a) {
        return Oe(t)
          ? t
          : (r || (r = ""),
            (nrWrapper[be] = t),
            xe(t, nrWrapper, e),
            nrWrapper);
        function nrWrapper() {
          var s, c, u, d;
          try {
            (c = this),
              (s = se()(arguments)),
              (u = "function" == typeof i ? i(s, c) : i || {});
          } catch (t) {
            Te([t, "", [s, c, o], u], e);
          }
          n(r + "start", [s, c, o], u, a);
          try {
            return (d = t.apply(c, s));
          } catch (e) {
            throw (n(r + "err", [s, c, e], u, a), e);
          } finally {
            n(r + "end", [s, c, d], u, a);
          }
        }
      }
      function n(r, n, i, o) {
        if (!we || t) {
          var a = we;
          we = !0;
          try {
            e.emit(r, n, i, t, o);
          } catch (t) {
            Te([t, r, n, i], e);
          }
          we = a;
        }
      }
    }
    function Te(e, t) {
      t || (t = oe.ee);
      try {
        t.emit("internal-error", e);
      } catch (e) {}
    }
    function xe(e, t, r) {
      if (Object.defineProperty && Object.keys)
        try {
          return (
            Object.keys(e).forEach(function (r) {
              Object.defineProperty(t, r, {
                get: function () {
                  return e[r];
                },
                set: function (t) {
                  return (e[r] = t), t;
                },
              });
            }),
            t
          );
        } catch (e) {
          Te([e], r);
        }
      for (var n in e) ye.call(e, n) && (t[n] = e[n]);
      return t;
    }
    function Oe(e) {
      return !(e && e instanceof Function && e.apply && !e[be]);
    }
    function Ae(e, t, r) {
      var n = e[t];
      e[t] = (function (e, t) {
        var r = t(e);
        return (r[be] = e), xe(e, r, oe.ee), r;
      })(n, r);
    }
    function _e() {
      for (var e = arguments.length, t = new Array(e), r = 0; r < e; ++r)
        t[r] = arguments[r];
      return t;
    }
    const Se = {};
    function Ne(e) {
      const t = (function (e) {
        return (e || oe.ee).get("timer");
      })(e);
      if (Se[t.debugId]) return t;
      Se[t.debugId] = !0;
      var r = Ee(t),
        n = "setTimeout",
        i = "setInterval",
        o = "clearTimeout",
        a = "-start";
      return (
        r.inPlace(A._A, [n, "setImmediate"], "setTimeout-"),
        r.inPlace(A._A, [i], "setInterval-"),
        r.inPlace(A._A, [o, "clearImmediate"], "clearTimeout-"),
        t.on(i + a, function (e, t, n) {
          e[0] = r(e[0], "fn-", null, n);
        }),
        t.on(n + a, function (e, t, n) {
          (this.method = n),
            (this.timerDuration = isNaN(e[1]) ? 0 : +e[1]),
            (e[0] = r(e[0], "fn-", this, n));
        }),
        t
      );
    }
    const De = {};
    function Pe(e) {
      const t = (function (e) {
        return (e || oe.ee).get("raf");
      })(e);
      if (De[t.debugId] || !A.il) return t;
      De[t.debugId] = !0;
      var r = Ee(t);
      return (
        r.inPlace(
          window,
          [
            "requestAnimationFrame",
            "mozRequestAnimationFrame",
            "webkitRequestAnimationFrame",
            "msRequestAnimationFrame",
          ],
          "raf-"
        ),
        t.on("raf-start", function (e) {
          e[0] = r(e[0], "fn-");
        }),
        t
      );
    }
    const Ie = {};
    function Re(e) {
      const t = (function (e) {
        return (e || oe.ee).get("history");
      })(e);
      if (Ie[t.debugId] || !A.il) return t;
      Ie[t.debugId] = !0;
      var r = Ee(t),
        n =
          window.history &&
          window.history.constructor &&
          window.history.constructor.prototype,
        i = window.history;
      return (
        n && n.pushState && n.replaceState && (i = n),
        r.inPlace(i, ["pushState", "replaceState"], "-"),
        t
      );
    }
    const Ce = {};
    function je(e) {
      const t = (function (e) {
        return (e || oe.ee).get("jsonp");
      })(e);
      if (Ce[t.debugId] || !A.il) return t;
      Ce[t.debugId] = !0;
      var r = Ee(t),
        n = /[?&](?:callback|cb)=([^&#]+)/,
        i = /(.*)\.([^.]+)/,
        o = /^(\w+)(\.|$)(.*)$/,
        a = ["appendChild", "insertBefore", "replaceChild"];
      function s(e, t) {
        var r = e.match(o),
          n = r[1],
          i = r[3];
        return i ? s(i, t[n]) : t[n];
      }
      return (
        "addEventListener" in window &&
          (Node && Node.prototype && Node.prototype.appendChild
            ? r.inPlace(Node.prototype, a, "dom-")
            : (r.inPlace(HTMLElement.prototype, a, "dom-"),
              r.inPlace(HTMLHeadElement.prototype, a, "dom-"),
              r.inPlace(HTMLBodyElement.prototype, a, "dom-"))),
        t.on("dom-start", function (e) {
          !(function (e) {
            if (
              !e ||
              "string" != typeof e.nodeName ||
              "script" !== e.nodeName.toLowerCase()
            )
              return;
            if ("function" != typeof e.addEventListener) return;
            var o = ((a = e.src), (c = a.match(n)), c ? c[1] : null);
            var a, c;
            if (!o) return;
            var u = (function (e) {
              var t = e.match(i);
              if (t && t.length >= 3)
                return { key: t[2], parent: s(t[1], window) };
              return { key: e, parent: window };
            })(o);
            if ("function" != typeof u.parent[u.key]) return;
            var d = {};
            function f() {
              t.emit("jsonp-end", [], d),
                e.removeEventListener("load", f, (0, C.m$)(!1)),
                e.removeEventListener("error", l, (0, C.m$)(!1));
            }
            function l() {
              t.emit("jsonp-error", [], d),
                t.emit("jsonp-end", [], d),
                e.removeEventListener("load", f, (0, C.m$)(!1)),
                e.removeEventListener("error", l, (0, C.m$)(!1));
            }
            r.inPlace(u.parent, [u.key], "cb-", d),
              e.addEventListener("load", f, (0, C.m$)(!1)),
              e.addEventListener("error", l, (0, C.m$)(!1)),
              t.emit("new-jsonp", [e.src], d);
          })(e[0]);
        }),
        t
      );
    }
    const ke = {};
    function Le(e) {
      const r = (function (e) {
        return (e || oe.ee).get("mutation");
      })(e);
      if (ke[r.debugId] || !A.il) return r;
      ke[r.debugId] = !0;
      var n = Ee(r),
        i = t.Yu.MO;
      return (
        i &&
          ((window.MutationObserver = function (e) {
            return this instanceof i
              ? new i(n(e, "fn-"))
              : i.apply(this, arguments);
          }),
          (MutationObserver.prototype = i.prototype)),
        r
      );
    }
    const Me = {};
    function He(e) {
      const r = (function (e) {
        return (e || oe.ee).get("promise");
      })(e);
      if (Me[r.debugId]) return r;
      Me[r.debugId] = !0;
      var n = oe.c,
        i = Ee(r),
        o = t.Yu.PR;
      return (
        o &&
          (function () {
            function e(e) {
              var t = r.context(),
                n = i(e, "executor-", t, null, !1),
                a = new o(n);
              return (
                (r.context(a).getCtx = function () {
                  return t;
                }),
                a
              );
            }
            (A._A.Promise = e),
              Object.defineProperty(A._A.Promise, "name", { value: "Promise" }),
              ["all", "race"].forEach(function (e) {
                var t = o[e];
                o[e] = function (n) {
                  var i = !1;
                  (0, u.D)(n, function (t, r) {
                    Promise.resolve(r).then(s("all" === e), s(!1));
                  });
                  var a = t.apply(o, arguments);
                  return o.resolve(a);
                  function s(e) {
                    return function () {
                      r.emit("propagate", [null, !i], a, !1, !1), (i = i || !e);
                    };
                  }
                };
              }),
              ["resolve", "reject"].forEach(function (e) {
                var t = o[e];
                o[e] = function (e) {
                  var n = t.apply(o, arguments);
                  return e !== n && r.emit("propagate", [e, !0], n, !1, !1), n;
                };
              }),
              (o.prototype.catch = function (e) {
                return this.then(null, e);
              }),
              Object.assign(o.prototype, { constructor: { value: e } }),
              (0, u.D)(Object.getOwnPropertyNames(o), function (t, r) {
                try {
                  e[r] = o[r];
                } catch (e) {}
              }),
              Ae(o.prototype, "then", function (e) {
                return function () {
                  var t = this,
                    o = _e.apply(this, arguments),
                    a = n(t);
                  (a.promise = t),
                    (o[0] = i(o[0], "cb-", a, null, !1)),
                    (o[1] = i(o[1], "cb-", a, null, !1));
                  var s = e.apply(this, o);
                  return (
                    (a.nextPromise = s),
                    r.emit("propagate", [t, !0], s, !1, !1),
                    s
                  );
                };
              }),
              r.on("executor-start", function (e) {
                (e[0] = i(e[0], "resolve-", this, null, !1)),
                  (e[1] = i(e[1], "resolve-", this, null, !1));
              }),
              r.on("executor-err", function (e, t, r) {
                e[1](r);
              }),
              r.on("cb-end", function (e, t, n) {
                r.emit("propagate", [n, !0], this.nextPromise, !1, !1);
              }),
              r.on("propagate", function (e, t, n) {
                (this.getCtx && !t) ||
                  (this.getCtx = function () {
                    if (e instanceof Promise) var t = r.context(e);
                    return t && t.getCtx ? t.getCtx() : this;
                  });
              }),
              (e.toString = function () {
                return "" + o;
              });
          })(),
        r
      );
    }
    const ze = {};
    function Be(e) {
      var t = (function (e) {
        return (e || oe.ee).get("events");
      })(e);
      if (ze[t.debugId]) return t;
      ze[t.debugId] = !0;
      var r = Ee(t, !0),
        n = XMLHttpRequest,
        i = "addEventListener",
        o = "removeEventListener";
      function a(e) {
        for (var t = e; t && !t.hasOwnProperty(i); )
          t = Object.getPrototypeOf(t);
        t && s(t);
      }
      function s(e) {
        r.inPlace(e, [i, o], "-", c);
      }
      function c(e, t) {
        return e[1];
      }
      return (
        "getPrototypeOf" in Object
          ? (A.il && a(document), a(A._A), a(n.prototype))
          : n.prototype.hasOwnProperty(i) && (s(A._A), s(n.prototype)),
        t.on("addEventListener-start", function (e, t) {
          var n = e[1];
          if (null !== n && ("function" == typeof n || "object" == typeof n)) {
            var i = (0, ie.X)(n, "nr@wrapped", function () {
              var e = {
                object: function () {
                  if ("function" != typeof n.handleEvent) return;
                  return n.handleEvent.apply(n, arguments);
                },
                function: n,
              }[typeof n];
              return e ? r(e, "fn-", null, e.name || "anonymous") : n;
            });
            this.wrapped = e[1] = i;
          }
        }),
        t.on("removeEventListener-start", function (e) {
          e[1] = this.wrapped || e[1];
        }),
        t
      );
    }
    const Fe = {};
    function $e(e) {
      var r = e || oe.ee;
      const n = (function (e) {
        return (e || oe.ee).get("xhr");
      })(r);
      if (Fe[n.debugId]) return n;
      (Fe[n.debugId] = !0), Be(r);
      var i = Ee(n),
        o = t.Yu.XHR,
        a = t.Yu.MO,
        s = t.Yu.PR,
        c = t.Yu.SI,
        u = "readystatechange",
        d = [
          "onload",
          "onerror",
          "onabort",
          "onloadstart",
          "onloadend",
          "onprogress",
          "ontimeout",
        ],
        f = [],
        l = A._A.XMLHttpRequest.listeners,
        h = (A._A.XMLHttpRequest = function (e) {
          var t = new o(e);
          function r() {
            try {
              n.emit("new-xhr", [t], t),
                t.addEventListener(u, g, (0, C.m$)(!1));
            } catch (e) {
              (0, m.Z)("An error occured while intercepting XHR", e);
              try {
                n.emit("internal-error", [e]);
              } catch (e) {}
            }
          }
          return (
            (this.listeners = l ? [...l, r] : [r]),
            this.listeners.forEach((e) => e()),
            t
          );
        });
      function p(e, t) {
        i.inPlace(t, ["onreadystatechange"], "fn-", E);
      }
      function g() {
        var e = this,
          t = n.context(e);
        e.readyState > 3 &&
          !t.resolved &&
          ((t.resolved = !0), n.emit("xhr-resolved", [], e)),
          i.inPlace(e, d, "fn-", E);
      }
      if (
        ((function (e, t) {
          for (var r in e) t[r] = e[r];
        })(o, h),
        (h.prototype = o.prototype),
        i.inPlace(h.prototype, ["open", "send"], "-xhr-", E),
        n.on("send-xhr-start", function (e, t) {
          p(e, t),
            (function (e) {
              f.push(e),
                a && (v ? v.then(w) : c ? c(w) : ((b = -b), (y.data = b)));
            })(t);
        }),
        n.on("open-xhr-start", p),
        a)
      ) {
        var v = s && s.resolve();
        if (!c && !s) {
          var b = 1,
            y = document.createTextNode(b);
          new a(w).observe(y, { characterData: !0 });
        }
      } else
        r.on("fn-end", function (e) {
          (e[0] && e[0].type === u) || w();
        });
      function w() {
        for (var e = 0; e < f.length; e++) p(0, f[e]);
        f.length && (f = []);
      }
      function E(e, t) {
        return t;
      }
      return n;
    }
    function Ue(e) {
      return Be(e);
    }
    function Ve(e) {
      return me(e);
    }
    function Ge(e) {
      return Re(e);
    }
    function qe(e) {
      return Pe(e);
    }
    function We(e) {
      return Ne(e);
    }
    function Xe(e) {
      return $e(e);
    }
    var Ze,
      Ye = {};
    try {
      (Ze = localStorage.getItem("__nr_flags").split(",")),
        console &&
          "function" == typeof console.log &&
          ((Ye.console = !0),
          -1 !== Ze.indexOf("dev") && (Ye.dev = !0),
          -1 !== Ze.indexOf("nr_dev") && (Ye.nrDev = !0));
    } catch (e) {}
    function Je(e) {
      try {
        Ye.console && Je(e);
      } catch (e) {}
    }
    Ye.nrDev &&
      oe.ee.on("internal-error", function (e) {
        Je(e.stack);
      }),
      Ye.dev &&
        oe.ee.on("fn-err", function (e, t, r) {
          Je(r.stack);
        }),
      Ye.dev &&
        (Je("NR AGENT IN DEVELOPMENT MODE"),
        Je(
          "flags: " +
            (0, u.D)(Ye, function (e, t) {
              return e;
            }).join(", ")
        ));
    var Qe = i(8322);
    class Ke extends _ {
      constructor(r, n) {
        var i;
        let o =
          !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
        super(r, n, Qe.t, o),
          (i = this),
          (this.skipNext = 0),
          (this.handleErrors = !1),
          (this.origOnerror = A._A?.onerror);
        const a = this,
          s = (0, t.OP)(this.agentIdentifier);
        (s.features.err = !0),
          a.ee.on("fn-start", function (e, t, r) {
            a.handleErrors && (a.skipNext += 1);
          }),
          a.ee.on("fn-err", function (e, t, r) {
            a.handleErrors &&
              !r[Qe.A] &&
              ((0, ie.X)(r, Qe.A, function () {
                return !0;
              }),
              (this.thrown = !0),
              tt(r, void 0, a.ee));
          }),
          a.ee.on("fn-end", function () {
            a.handleErrors &&
              !this.thrown &&
              a.skipNext > 0 &&
              (a.skipNext -= 1);
          }),
          a.ee.on("internal-error", (t) => {
            (0, b.p)("ierr", [t, (0, y.zO)(), !0], void 0, e.D.jserrors, a.ee);
          });
        const c = A._A?.onerror;
        A._A.onerror = function () {
          return c && c(...arguments), i.onerrorHandler(...arguments), !1;
        };
        try {
          A._A?.addEventListener("unhandledrejection", (t) => {
            const r = new Error(`${t.reason}`);
            (0, b.p)(
              "err",
              [r, (0, y.zO)(), !1, { unhandledPromiseRejection: 1 }],
              void 0,
              e.D.jserrors,
              this.ee
            );
          });
        } catch (e) {}
        try {
          throw new Error();
        } catch (e) {
          "stack" in e &&
            (We(this.ee),
            qe(this.ee),
            "addEventListener" in A._A && Ue(this.ee),
            s.xhrWrappable && Xe(this.ee),
            (a.handleErrors = !0));
        }
        this.importAggregator();
      }
      onerrorHandler(t, r, n, i, o) {
        try {
          this.skipNext
            ? (this.skipNext -= 1)
            : tt(o || new et(t, r, n), !0, this.ee);
        } catch (t) {
          try {
            (0, b.p)(
              "ierr",
              [t, (0, y.zO)(), !0],
              void 0,
              e.D.jserrors,
              this.ee
            );
          } catch (e) {}
        }
        return (
          "function" == typeof this.origOnerror &&
          this.origOnerror.apply(this, se()(arguments))
        );
      }
    }
    function et(e, t, r) {
      (this.message = e || "Uncaught error with no additional information"),
        (this.sourceURL = t),
        (this.line = r);
    }
    function tt(t, r, n) {
      var i = r ? null : (0, y.zO)();
      (0, b.p)("err", [t, i], void 0, e.D.jserrors, n);
    }
    !(function (e, t, r) {
      t in e
        ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = r);
    })(Ke, "featureName", Qe.t);
    var rt = 1;
    function nt(e) {
      var t = typeof e;
      return !e || ("object" !== t && "function" !== t)
        ? -1
        : e === A._A
        ? 0
        : (0, ie.X)(e, "nr@id", function () {
            return rt++;
          });
    }
    var it = i(9071);
    function ot(e) {
      if ("string" == typeof e && e.length) return e.length;
      if ("object" == typeof e) {
        if (
          "undefined" != typeof ArrayBuffer &&
          e instanceof ArrayBuffer &&
          e.byteLength
        )
          return e.byteLength;
        if ("undefined" != typeof Blob && e instanceof Blob && e.size)
          return e.size;
        if (!("undefined" != typeof FormData && e instanceof FormData))
          try {
            return JSON.stringify(e).length;
          } catch (e) {
            return;
          }
      }
    }
    var at = i(6368);
    class st {
      constructor(e) {
        (this.agentIdentifier = e),
          (this.generateTracePayload = this.generateTracePayload.bind(this)),
          (this.shouldGenerateTrace = this.shouldGenerateTrace.bind(this));
      }
      generateTracePayload(e) {
        if (!this.shouldGenerateTrace(e)) return null;
        var r = (0, t.DL)(this.agentIdentifier);
        if (!r) return null;
        var n = (r.accountID || "").toString() || null,
          i = (r.agentID || "").toString() || null,
          o = (r.trustKey || "").toString() || null;
        if (!n || !i) return null;
        var a = (0, v.M)(),
          s = (0, v.Ht)(),
          c = Date.now(),
          u = { spanId: a, traceId: s, timestamp: c };
        return (
          (e.sameOrigin ||
            (this.isAllowedOrigin(e) &&
              this.useTraceContextHeadersForCors())) &&
            ((u.traceContextParentHeader =
              this.generateTraceContextParentHeader(a, s)),
            (u.traceContextStateHeader = this.generateTraceContextStateHeader(
              a,
              c,
              n,
              i,
              o
            ))),
          ((e.sameOrigin && !this.excludeNewrelicHeader()) ||
            (!e.sameOrigin &&
              this.isAllowedOrigin(e) &&
              this.useNewrelicHeaderForCors())) &&
            (u.newrelicHeader = this.generateTraceHeader(a, s, c, n, i, o)),
          u
        );
      }
      generateTraceContextParentHeader(e, t) {
        return "00-" + t + "-" + e + "-01";
      }
      generateTraceContextStateHeader(e, t, r, n, i) {
        return i + "@nr=0-1-" + r + "-" + n + "-" + e + "----" + t;
      }
      generateTraceHeader(e, t, r, n, i, o) {
        if (!("function" == typeof A._A?.btoa)) return null;
        var a = {
          v: [0, 1],
          d: { ty: "Browser", ac: n, ap: i, id: e, tr: t, ti: r },
        };
        return o && n !== o && (a.d.tk = o), btoa(JSON.stringify(a));
      }
      shouldGenerateTrace(e) {
        return this.isDtEnabled() && this.isAllowedOrigin(e);
      }
      isAllowedOrigin(e) {
        var r = !1,
          n = {};
        if (
          ((0, t.Mt)(this.agentIdentifier, "distributed_tracing") &&
            (n = (0, t.P_)(this.agentIdentifier).distributed_tracing),
          e.sameOrigin)
        )
          r = !0;
        else if (n.allowed_origins instanceof Array)
          for (var i = 0; i < n.allowed_origins.length; i++) {
            var o = (0, at.e)(n.allowed_origins[i]);
            if (
              e.hostname === o.hostname &&
              e.protocol === o.protocol &&
              e.port === o.port
            ) {
              r = !0;
              break;
            }
          }
        return r;
      }
      isDtEnabled() {
        var e = (0, t.Mt)(this.agentIdentifier, "distributed_tracing");
        return !!e && !!e.enabled;
      }
      excludeNewrelicHeader() {
        var e = (0, t.Mt)(this.agentIdentifier, "distributed_tracing");
        return !!e && !!e.exclude_newrelic_header;
      }
      useNewrelicHeaderForCors() {
        var e = (0, t.Mt)(this.agentIdentifier, "distributed_tracing");
        return !!e && !1 !== e.cors_use_newrelic_header;
      }
      useTraceContextHeadersForCors() {
        var e = (0, t.Mt)(this.agentIdentifier, "distributed_tracing");
        return !!e && !!e.cors_use_tracecontext_headers;
      }
    }
    var ct = i(8675);
    var ut = ["load", "error", "abort", "timeout"],
      dt = ut.length,
      ft = t.Yu.REQ,
      lt = A._A?.XMLHttpRequest;
    class ht extends _ {
      constructor(r, n) {
        let i =
          !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
        super(r, n, ct.t, i);
        const o = (0, t.OP)(this.agentIdentifier);
        o.xhrWrappable &&
          ((o.features.xhr = !0),
          (this.dt = new st(this.agentIdentifier)),
          (this.handler = (e, t, r, n) => (0, b.p)(e, t, r, n, this.ee)),
          (this.wrappedFetch = Ve(this.ee)),
          Xe(this.ee),
          (function (r, n, i, o) {
            function a(e) {
              var t = this;
              (t.totalCbs = 0),
                (t.called = 0),
                (t.cbTime = 0),
                (t.end = T),
                (t.ended = !1),
                (t.xhrGuids = {}),
                (t.lastSize = null),
                (t.loadCaptureCalled = !1),
                (t.params = this.params || {}),
                (t.metrics = this.metrics || {}),
                e.addEventListener(
                  "load",
                  function (r) {
                    O(t, e);
                  },
                  (0, C.m$)(!1)
                ),
                (it.I && (it.I > 34 || it.I < 10)) ||
                  e.addEventListener(
                    "progress",
                    function (e) {
                      t.lastSize = e.loaded;
                    },
                    (0, C.m$)(!1)
                  );
            }
            function s(e) {
              (this.params = { method: e[0] }),
                x(this, e[1]),
                (this.metrics = {});
            }
            function c(e, n) {
              var i = (0, t.DL)(r);
              "xpid" in i &&
                this.sameOrigin &&
                n.setRequestHeader("X-NewRelic-ID", i.xpid);
              var a = o.generateTracePayload(this.parsedOrigin);
              if (a) {
                var s = !1;
                a.newrelicHeader &&
                  (n.setRequestHeader("newrelic", a.newrelicHeader), (s = !0)),
                  a.traceContextParentHeader &&
                    (n.setRequestHeader(
                      "traceparent",
                      a.traceContextParentHeader
                    ),
                    a.traceContextStateHeader &&
                      n.setRequestHeader(
                        "tracestate",
                        a.traceContextStateHeader
                      ),
                    (s = !0)),
                  s && (this.dt = a);
              }
            }
            function u(e, t) {
              var r = this.metrics,
                i = e[0],
                o = this;
              if (r && i) {
                var a = ot(i);
                a && (r.txSize = a);
              }
              (this.startTime = (0, y.zO)()),
                (this.listener = function (e) {
                  try {
                    "abort" !== e.type ||
                      o.loadCaptureCalled ||
                      (o.params.aborted = !0),
                      ("load" !== e.type ||
                        (o.called === o.totalCbs &&
                          (o.onloadCalled || "function" != typeof t.onload))) &&
                        o.end(t);
                  } catch (e) {
                    try {
                      n.emit("internal-error", [e]);
                    } catch (e) {}
                  }
                });
              for (var s = 0; s < dt; s++)
                t.addEventListener(ut[s], this.listener, (0, C.m$)(!1));
            }
            function d(e, t, r) {
              (this.cbTime += e),
                t ? (this.onloadCalled = !0) : (this.called += 1),
                this.called !== this.totalCbs ||
                  (!this.onloadCalled && "function" == typeof r.onload) ||
                  this.end(r);
            }
            function f(e, t) {
              var r = "" + nt(e) + !!t;
              this.xhrGuids &&
                !this.xhrGuids[r] &&
                ((this.xhrGuids[r] = !0), (this.totalCbs += 1));
            }
            function l(e, t) {
              var r = "" + nt(e) + !!t;
              this.xhrGuids &&
                this.xhrGuids[r] &&
                (delete this.xhrGuids[r], (this.totalCbs -= 1));
            }
            function h() {
              this.endTime = (0, y.zO)();
            }
            function p(e, t) {
              t instanceof lt &&
                "load" === e[0] &&
                n.emit("xhr-load-added", [e[1], e[2]], t);
            }
            function g(e, t) {
              t instanceof lt &&
                "load" === e[0] &&
                n.emit("xhr-load-removed", [e[1], e[2]], t);
            }
            function v(e, t, r) {
              t instanceof lt &&
                ("onload" === r && (this.onload = !0),
                ("load" === (e[0] && e[0].type) || this.onload) &&
                  (this.xhrCbStart = (0, y.zO)()));
            }
            function m(e, t) {
              this.xhrCbStart &&
                n.emit(
                  "xhr-cb-time",
                  [(0, y.zO)() - this.xhrCbStart, this.onload, t],
                  t
                );
            }
            function b(e) {
              var t,
                r = e[1] || {};
              "string" == typeof e[0]
                ? (t = e[0])
                : e[0] && e[0].url
                ? (t = e[0].url)
                : A._A?.URL && e[0] && e[0] instanceof URL && (t = e[0].href),
                t &&
                  ((this.parsedOrigin = (0, at.e)(t)),
                  (this.sameOrigin = this.parsedOrigin.sameOrigin));
              var n = o.generateTracePayload(this.parsedOrigin);
              if (n && (n.newrelicHeader || n.traceContextParentHeader))
                if (
                  "string" == typeof e[0] ||
                  (A._A?.URL && e[0] && e[0] instanceof URL)
                ) {
                  var i = {};
                  for (var a in r) i[a] = r[a];
                  (i.headers = new Headers(r.headers || {})),
                    s(i.headers, n) && (this.dt = n),
                    e.length > 1 ? (e[1] = i) : e.push(i);
                } else
                  e[0] && e[0].headers && s(e[0].headers, n) && (this.dt = n);
              function s(e, t) {
                var r = !1;
                return (
                  t.newrelicHeader &&
                    (e.set("newrelic", t.newrelicHeader), (r = !0)),
                  t.traceContextParentHeader &&
                    (e.set("traceparent", t.traceContextParentHeader),
                    t.traceContextStateHeader &&
                      e.set("tracestate", t.traceContextStateHeader),
                    (r = !0)),
                  r
                );
              }
            }
            function w(e, t) {
              (this.params = {}),
                (this.metrics = {}),
                (this.startTime = (0, y.zO)()),
                (this.dt = t),
                e.length >= 1 && (this.target = e[0]),
                e.length >= 2 && (this.opts = e[1]);
              var r,
                n = this.opts || {},
                i = this.target;
              "string" == typeof i
                ? (r = i)
                : "object" == typeof i && i instanceof ft
                ? (r = i.url)
                : A._A?.URL &&
                  "object" == typeof i &&
                  i instanceof URL &&
                  (r = i.href),
                x(this, r);
              var o = (
                "" + ((i && i instanceof ft && i.method) || n.method || "GET")
              ).toUpperCase();
              (this.params.method = o), (this.txSize = ot(n.body) || 0);
            }
            function E(t, r) {
              var n;
              (this.endTime = (0, y.zO)()),
                this.params || (this.params = {}),
                (this.params.status = r ? r.status : 0),
                "string" == typeof this.rxSize &&
                  this.rxSize.length > 0 &&
                  (n = +this.rxSize);
              var o = {
                txSize: this.txSize,
                rxSize: n,
                duration: (0, y.zO)() - this.startTime,
              };
              i(
                "xhr",
                [this.params, o, this.startTime, this.endTime, "fetch"],
                this,
                e.D.ajax
              );
            }
            function T(t) {
              var r = this.params,
                n = this.metrics;
              if (!this.ended) {
                this.ended = !0;
                for (var o = 0; o < dt; o++)
                  t.removeEventListener(ut[o], this.listener, !1);
                r.aborted ||
                  ((n.duration = (0, y.zO)() - this.startTime),
                  this.loadCaptureCalled || 4 !== t.readyState
                    ? null == r.status && (r.status = 0)
                    : O(this, t),
                  (n.cbTime = this.cbTime),
                  i(
                    "xhr",
                    [r, n, this.startTime, this.endTime, "xhr"],
                    this,
                    e.D.ajax
                  ));
              }
            }
            function x(e, t) {
              var r = (0, at.e)(t),
                n = e.params;
              (n.hostname = r.hostname),
                (n.port = r.port),
                (n.protocol = r.protocol),
                (n.host = r.hostname + ":" + r.port),
                (n.pathname = r.pathname),
                (e.parsedOrigin = r),
                (e.sameOrigin = r.sameOrigin);
            }
            function O(e, t) {
              e.params.status = t.status;
              var r = (function (e, t) {
                var r = e.responseType;
                return "json" === r && null !== t
                  ? t
                  : "arraybuffer" === r || "blob" === r || "json" === r
                  ? ot(e.response)
                  : "text" === r || "" === r || void 0 === r
                  ? ot(e.responseText)
                  : void 0;
              })(t, e.lastSize);
              if ((r && (e.metrics.rxSize = r), e.sameOrigin)) {
                var n = t.getResponseHeader("X-NewRelic-App-Data");
                n && (e.params.cat = n.split(", ").pop());
              }
              e.loadCaptureCalled = !0;
            }
            n.on("new-xhr", a),
              n.on("open-xhr-start", s),
              n.on("open-xhr-end", c),
              n.on("send-xhr-start", u),
              n.on("xhr-cb-time", d),
              n.on("xhr-load-added", f),
              n.on("xhr-load-removed", l),
              n.on("xhr-resolved", h),
              n.on("addEventListener-end", p),
              n.on("removeEventListener-end", g),
              n.on("fn-end", m),
              n.on("fetch-before-start", b),
              n.on("fetch-start", w),
              n.on("fn-start", v),
              n.on("fetch-done", E);
          })(this.agentIdentifier, this.ee, this.handler, this.dt),
          this.importAggregator());
      }
    }
    !(function (e, t, r) {
      t in e
        ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = r);
    })(ht, "featureName", ct.t);
    var pt = i(6408),
      gt = i(2628);
    const {
      ADD_EVENT_LISTENER: vt,
      BST_RESOURCE: mt,
      BST_TIMER: bt,
      END: yt,
      FEATURE_NAME: wt,
      FN_END: Et,
      FN_START: Tt,
      learResourceTimings: xt,
      PUSH_STATE: Ot,
      REMOVE_EVENT_LISTENER: At,
      RESOURCE: _t,
      RESOURCE_TIMING_BUFFER_FULL: St,
      START: Nt,
      ORIG_EVENT: Dt,
    } = gt;
    class Pt extends _ {
      constructor(r, n) {
        if (
          (super(
            r,
            n,
            wt,
            !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2]
          ),
          !A.il)
        )
          return;
        if (
          !(
            window.performance &&
            window.performance.timing &&
            window.performance.getEntriesByType
          )
        )
          return;
        (0, t.OP)(this.agentIdentifier).features.stn = !0;
        const i = this.ee;
        function o(t) {
          if (
            ((0, b.p)(
              mt,
              [window.performance.getEntriesByType(_t)],
              void 0,
              e.D.sessionTrace,
              i
            ),
            window.performance["c" + xt])
          )
            try {
              window.performance[At](St, o, !1);
            } catch (t) {}
          else
            try {
              window.performance[At]("webkit" + St, o, !1);
            } catch (t) {}
        }
        (this.timerEE = We(this.ee)),
          (this.rafEE = qe(this.ee)),
          Ge(this.ee),
          Ue(this.ee),
          this.ee.on(Tt, function (e, t) {
            e[0] instanceof Dt && (this.bstStart = (0, y.zO)());
          }),
          this.ee.on(Et, function (t, r) {
            var n = t[0];
            n instanceof Dt &&
              (0, b.p)(
                "bst",
                [n, r, this.bstStart, (0, y.zO)()],
                void 0,
                e.D.sessionTrace,
                i
              );
          }),
          this.timerEE.on(Tt, function (e, t, r) {
            (this.bstStart = (0, y.zO)()), (this.bstType = r);
          }),
          this.timerEE.on(Et, function (t, r) {
            (0,
            b.p)(bt, [r, this.bstStart, (0, y.zO)(), this.bstType], void 0, e.D.sessionTrace, i);
          }),
          this.rafEE.on(Tt, function () {
            this.bstStart = (0, y.zO)();
          }),
          this.rafEE.on(Et, function (t, r) {
            (0,
            b.p)(bt, [r, this.bstStart, (0, y.zO)(), "requestAnimationFrame"], void 0, e.D.sessionTrace, i);
          }),
          this.ee.on(Ot + Nt, function (e) {
            (this.time = (0, y.zO)()),
              (this.startPath = location.pathname + location.hash);
          }),
          this.ee.on(Ot + yt, function (t) {
            (0,
            b.p)("bstHist", [location.pathname + location.hash, this.startPath, this.time], void 0, e.D.sessionTrace, i);
          }),
          (0, pt.W)()
            ? ((0, b.p)(
                mt,
                [window.performance.getEntriesByType("resource")],
                void 0,
                e.D.sessionTrace,
                i
              ),
              (function () {
                var t = new PerformanceObserver((t, r) => {
                  var n = t.getEntries();
                  (0, b.p)(mt, [n], void 0, e.D.sessionTrace, i);
                });
                try {
                  t.observe({ entryTypes: ["resource"] });
                } catch (e) {}
              })())
            : vt in window.performance &&
              (window.performance["c" + xt]
                ? window.performance[vt](St, o, (0, C.m$)(!1))
                : window.performance[vt]("webkit" + St, o, (0, C.m$)(!1))),
          document[vt]("scroll", this.noOp, (0, C.m$)(!1)),
          document[vt]("keypress", this.noOp, (0, C.m$)(!1)),
          document[vt]("click", this.noOp, (0, C.m$)(!1)),
          this.importAggregator();
      }
      noOp(e) {}
    }
    !(function (e, t, r) {
      t in e
        ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = r);
    })(Pt, "featureName", wt);
    var It = i(755);
    const {
      FEATURE_NAME: Rt,
      START: Ct,
      END: jt,
      BODY: kt,
      CB_END: Lt,
      JS_TIME: Mt,
      FETCH: Ht,
      ADD_EVENT_LISTENER: zt,
      WIN: Bt,
      LOCATION: Ft,
      FN_START: $t,
      CB_START: Ut,
      FN_END: Vt,
    } = It;
    class Gt extends _ {
      constructor(e, r) {
        if (
          (super(
            e,
            r,
            Rt,
            !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2]
          ),
          !A.il)
        )
          return;
        const n = (0, t.OP)(this.agentIdentifier);
        if (!Bt[zt] || !n.xhrWrappable) return;
        n.features.spa = !0;
        let i,
          o = 0;
        const a = this.ee.get("tracer"),
          s = je(this.ee);
        const c = (function (e) {
            return He(e);
          })(this.ee),
          u = Ue(this.ee),
          d = We(this.ee),
          f = Xe(this.ee),
          l = Ve(this.ee),
          h = Ge(this.ee),
          p = (function (e) {
            return Le(e);
          })(this.ee);
        function g(e, t) {
          h.emit("newURL", ["" + Ft, t]);
        }
        function v() {
          o++, (i = Ft.hash), (this[$t] = (0, y.zO)());
        }
        function m() {
          o--, Ft.hash !== i && g(0, !0);
          var e = (0, y.zO)();
          (this[Mt] = ~~this[Mt] + e - this[$t]), (this[Vt] = e);
        }
        function b(e, t) {
          e.on(t, function () {
            this[t] = (0, y.zO)();
          });
        }
        this.ee.on($t, v),
          c.on(Ut, v),
          s.on(Ut, v),
          this.ee.on(Vt, m),
          c.on(Lt, m),
          s.on(Lt, m),
          this.ee.buffer([$t, Vt, "xhr-resolved"], this.featureName),
          u.buffer([$t], this.featureName),
          d.buffer(
            ["setTimeout" + jt, "clearTimeout" + Ct, $t],
            this.featureName
          ),
          f.buffer([$t, "new-xhr", "send-xhr" + Ct], this.featureName),
          l.buffer(
            [Ht + Ct, Ht + "-done", Ht + kt + Ct, Ht + kt + jt],
            this.featureName
          ),
          h.buffer(["newURL"], this.featureName),
          p.buffer([$t], this.featureName),
          c.buffer(
            ["propagate", Ut, Lt, "executor-err", "resolve" + Ct],
            this.featureName
          ),
          a.buffer([$t, "no-" + $t], this.featureName),
          s.buffer(
            ["new-jsonp", "cb-start", "jsonp-error", "jsonp-end"],
            this.featureName
          ),
          b(l, Ht + Ct),
          b(l, Ht + "-done"),
          b(s, "new-jsonp"),
          b(s, "jsonp-end"),
          b(s, "cb-start"),
          h.on("pushState-end", g),
          h.on("replaceState-end", g),
          Bt[zt]("hashchange", g, (0, C.m$)(!0)),
          Bt[zt]("load", g, (0, C.m$)(!0)),
          Bt[zt](
            "popstate",
            function () {
              g(0, o > 1);
            },
            (0, C.m$)(!0)
          ),
          this.importAggregator();
      }
    }
    !(function (e, t, r) {
      t in e
        ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = r);
    })(Gt, "featureName", Rt);
    var qt = i(6486);
    class Wt extends _ {
      constructor(e, t) {
        let r =
          !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
        super(e, t, qt.t, r), this.importAggregator();
      }
    }
    !(function (e, t, r) {
      t in e
        ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = r);
    })(Wt, "featureName", qt.t),
      new (class {
        constructor(t) {
          let r =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : (0, v.ky)(16);
          (this.agentIdentifier = r),
            (this.sharedAggregator = new d({
              agentIdentifier: this.agentIdentifier,
            })),
            (this.features = {}),
            (this.desiredFeatures = t.features || []),
            this.desiredFeatures.sort(
              (t, r) => e.p[t.featureName] - e.p[r.featureName]
            ),
            Object.assign(
              this,
              (0, a.j)(this.agentIdentifier, t, t.loaderType || "agent")
            ),
            this.start();
        }
        get config() {
          return {
            info: (0, t.C5)(this.agentIdentifier),
            init: (0, t.P_)(this.agentIdentifier),
            loader_config: (0, t.DL)(this.agentIdentifier),
            runtime: (0, t.OP)(this.agentIdentifier),
          };
        }
        start() {
          try {
            const e = n(this.agentIdentifier);
            this.desiredFeatures.forEach((t) => {
              if (e[t.featureName]) {
                const r = (0, s.Z)(t.featureName);
                r.every((t) => e[t]) ||
                  (0, m.Z)(
                    `${
                      t.featureName
                    } is enabled but one or more dependent features has been disabled (${JSON.stringify(
                      r
                    )}). This may cause unintended consequences or missing data...`
                  ),
                  (this.features[t.featureName] = new t(
                    this.agentIdentifier,
                    this.sharedAggregator
                  ));
              }
            }),
              (0, g.Qy)(this.agentIdentifier, this.features, "features");
          } catch (e) {
            return (0, m.Z)("Failed to initialize instrument classes", e), !1;
          }
        }
      })({ features: [ht, I, k, Pt, ne, Wt, Ke, Gt], loaderType: "spa" });
  })(),
    (window.NRBA = o);
})();
