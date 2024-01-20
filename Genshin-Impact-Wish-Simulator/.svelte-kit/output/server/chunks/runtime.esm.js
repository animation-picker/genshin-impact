import { d as derived, w as writable } from "./index2.js";
import t from "deepmerge";
import o from "intl-messageformat";
const r = {}, i = (e, n, t2) => t2 ? (n in r || (r[n] = {}), e in r[n] || (r[n][e] = t2), t2) : t2, l = (e, n) => {
  if (null == n)
    return;
  if (n in r && e in r[n])
    return r[n][e];
  const t2 = E(n);
  for (let o2 = 0; o2 < t2.length; o2++) {
    const r2 = c(t2[o2], e);
    if (r2)
      return i(e, n, r2);
  }
};
let a;
const s = writable({});
function u(e) {
  return e in a;
}
function c(e, n) {
  if (!u(e))
    return null;
  const t2 = function(e2) {
    return a[e2] || null;
  }(e);
  return function(e2, n2) {
    if (null == n2)
      return;
    if (n2 in e2)
      return e2[n2];
    const t3 = n2.split(".");
    let o2 = e2;
    for (let e3 = 0; e3 < t3.length; e3++)
      if ("object" == typeof o2) {
        if (e3 > 0) {
          const n3 = t3.slice(e3, t3.length).join(".");
          if (n3 in o2) {
            o2 = o2[n3];
            break;
          }
        }
        o2 = o2[t3[e3]];
      } else
        o2 = void 0;
    return o2;
  }(t2, n);
}
function m(e, ...n) {
  delete r[e], s.update((o2) => (o2[e] = t.all([o2[e] || {}, ...n]), o2));
}
derived([s], ([e]) => Object.keys(e));
s.subscribe((e) => a = e);
const d = {};
function g(e) {
  return d[e];
}
function h(e) {
  return null != e && E(e).some((e2) => {
    var n;
    return null === (n = g(e2)) || void 0 === n ? void 0 : n.size;
  });
}
function w(e, n) {
  const t2 = Promise.all(n.map((n2) => (function(e2, n3) {
    d[e2].delete(n3), 0 === d[e2].size && delete d[e2];
  }(e, n2), n2().then((e2) => e2.default || e2))));
  return t2.then((n2) => m(e, ...n2));
}
const p = {};
function b(e) {
  if (!h(e))
    return e in p ? p[e] : Promise.resolve();
  const n = function(e2) {
    return E(e2).map((e3) => {
      const n2 = g(e3);
      return [e3, n2 ? [...n2] : []];
    }).filter(([, e3]) => e3.length > 0);
  }(e);
  return p[e] = Promise.all(n.map(([e2, n2]) => w(e2, n2))).then(() => {
    if (h(e))
      return b(e);
    delete p[e];
  }), p[e];
}
function y(e, n) {
  g(e) || function(e2) {
    d[e2] = /* @__PURE__ */ new Set();
  }(e);
  const t2 = g(e);
  g(e).has(n) || (u(e) || s.update((n2) => (n2[e] = {}, n2)), t2.add(n));
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function v(e, n) {
  var t2 = {};
  for (var o2 in e)
    Object.prototype.hasOwnProperty.call(e, o2) && n.indexOf(o2) < 0 && (t2[o2] = e[o2]);
  if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
    var r2 = 0;
    for (o2 = Object.getOwnPropertySymbols(e); r2 < o2.length; r2++)
      n.indexOf(o2[r2]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o2[r2]) && (t2[o2[r2]] = e[o2[r2]]);
  }
  return t2;
}
function O({ locale: e, id: n }) {
  console.warn(`[svelte-i18n] The message "${n}" was not found in "${E(e).join('", "')}".${h(P()) ? "\n\nNote: there are at least one loader still registered to this locale that wasn't executed." : ""}`);
}
const j = { fallbackLocale: null, loadingDelay: 200, formats: { number: { scientific: { notation: "scientific" }, engineering: { notation: "engineering" }, compactLong: { notation: "compact", compactDisplay: "long" }, compactShort: { notation: "compact", compactDisplay: "short" } }, date: { short: { month: "numeric", day: "numeric", year: "2-digit" }, medium: { month: "short", day: "numeric", year: "numeric" }, long: { month: "long", day: "numeric", year: "numeric" }, full: { weekday: "long", month: "long", day: "numeric", year: "numeric" } }, time: { short: { hour: "numeric", minute: "numeric" }, medium: { hour: "numeric", minute: "numeric", second: "numeric" }, long: { hour: "numeric", minute: "numeric", second: "numeric", timeZoneName: "short" }, full: { hour: "numeric", minute: "numeric", second: "numeric", timeZoneName: "short" } } }, warnOnMissingMessages: true, handleMissingMessage: void 0, ignoreTag: true };
function M() {
  return j;
}
function $(e) {
  const { formats: n } = e, t2 = v(e, ["formats"]), o2 = e.initialLocale || e.fallbackLocale;
  return t2.warnOnMissingMessages && (delete t2.warnOnMissingMessages, null == t2.handleMissingMessage ? t2.handleMissingMessage = O : console.warn('[svelte-i18n] The "warnOnMissingMessages" option is deprecated. Please use the "handleMissingMessage" option instead.')), Object.assign(j, t2, { initialLocale: o2 }), n && ("number" in n && Object.assign(j.formats.number, n.number), "date" in n && Object.assign(j.formats.date, n.date), "time" in n && Object.assign(j.formats.time, n.time)), D.set(o2);
}
const k = writable(false);
let T;
const L = writable(null);
function x(e) {
  return e.split("-").map((e2, n, t2) => t2.slice(0, n + 1).join("-")).reverse();
}
function E(e, n = M().fallbackLocale) {
  const t2 = x(e);
  return n ? [.../* @__PURE__ */ new Set([...t2, ...x(n)])] : t2;
}
function P() {
  return null != T ? T : void 0;
}
L.subscribe((e) => {
  T = null != e ? e : void 0, "undefined" != typeof window && null != e && document.documentElement.setAttribute("lang", e);
});
const D = Object.assign(Object.assign({}, L), { set: (e) => {
  if (e && function(e2) {
    if (null == e2)
      return;
    const n = E(e2);
    for (let e3 = 0; e3 < n.length; e3++) {
      const t2 = n[e3];
      if (u(t2))
        return t2;
    }
  }(e) && h(e)) {
    const { loadingDelay: n } = M();
    let t2;
    return "undefined" != typeof window && null != P() && n ? t2 = window.setTimeout(() => k.set(true), n) : k.set(true), b(e).then(() => {
      L.set(e);
    }).finally(() => {
      clearTimeout(t2), k.set(false);
    });
  }
  return L.set(e);
} }), F = () => "undefined" == typeof window ? null : window.navigator.language || window.navigator.languages[0], C = (e) => {
  const n = /* @__PURE__ */ Object.create(null);
  return (t2) => {
    const o2 = JSON.stringify(t2);
    return o2 in n ? n[o2] : n[o2] = e(t2);
  };
}, G = (e, n) => {
  const { formats: t2 } = M();
  if (e in t2 && n in t2[e])
    return t2[e][n];
  throw new Error(`[svelte-i18n] Unknown "${n}" ${e} format.`);
}, J = C((e) => {
  var { locale: n, format: t2 } = e, o2 = v(e, ["locale", "format"]);
  if (null == n)
    throw new Error('[svelte-i18n] A "locale" must be set to format numbers');
  return t2 && (o2 = G("number", t2)), new Intl.NumberFormat(n, o2);
}), U = C((e) => {
  var { locale: n, format: t2 } = e, o2 = v(e, ["locale", "format"]);
  if (null == n)
    throw new Error('[svelte-i18n] A "locale" must be set to format dates');
  return t2 ? o2 = G("date", t2) : 0 === Object.keys(o2).length && (o2 = G("date", "short")), new Intl.DateTimeFormat(n, o2);
}), V = C((e) => {
  var { locale: n, format: t2 } = e, o2 = v(e, ["locale", "format"]);
  if (null == n)
    throw new Error('[svelte-i18n] A "locale" must be set to format time values');
  return t2 ? o2 = G("time", t2) : 0 === Object.keys(o2).length && (o2 = G("time", "short")), new Intl.DateTimeFormat(n, o2);
}), _ = (e = {}) => {
  var { locale: n = P() } = e, t2 = v(e, ["locale"]);
  return J(Object.assign({ locale: n }, t2));
}, q = (e = {}) => {
  var { locale: n = P() } = e, t2 = v(e, ["locale"]);
  return U(Object.assign({ locale: n }, t2));
}, B = (e = {}) => {
  var { locale: n = P() } = e, t2 = v(e, ["locale"]);
  return V(Object.assign({ locale: n }, t2));
}, H = C((e, n = P()) => new o(e, n, M().formats, { ignoreTag: M().ignoreTag })), K = (e, n = {}) => {
  var t2, o2, r2, i2;
  let a2 = n;
  "object" == typeof e && (a2 = e, e = a2.id);
  const { values: s2, locale: u2 = P(), default: c2 } = a2;
  if (null == u2)
    throw new Error("[svelte-i18n] Cannot format a message without first setting the initial locale.");
  let m2 = l(e, u2);
  if (m2) {
    if ("string" != typeof m2)
      return console.warn(`[svelte-i18n] Message with id "${e}" must be of type "string", found: "${typeof m2}". Gettin its value through the "$format" method is deprecated; use the "json" method instead.`), m2;
  } else
    m2 = null !== (i2 = null !== (r2 = null === (o2 = (t2 = M()).handleMissingMessage) || void 0 === o2 ? void 0 : o2.call(t2, { locale: u2, id: e, defaultValue: c2 })) && void 0 !== r2 ? r2 : c2) && void 0 !== i2 ? i2 : e;
  if (!s2)
    return m2;
  let f = m2;
  try {
    f = H(m2, u2).format(s2);
  } catch (n2) {
    console.warn(`[svelte-i18n] Message "${e}" has syntax error:`, n2.message);
  }
  return f;
}, Q = (e, n) => B(n).format(e), R = (e, n) => q(n).format(e), W = (e, n) => _(n).format(e), X = (e, n = P()) => l(e, n), Y = derived([D, s], () => K);
derived([D], () => Q);
derived([D], () => R);
derived([D], () => W);
const oe = derived([D, s], () => X);
export {
  $,
  D,
  F,
  Y,
  k,
  oe as o,
  y
};
