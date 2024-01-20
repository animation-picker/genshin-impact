import { c as create_ssr_component, a as subscribe, g as getContext, e as escape, s as setContext, d as add_attribute, v as validate_component } from "../../chunks/index.js";
import { y, $, F, D, k } from "../../chunks/runtime.esm.js";
import { p as page } from "../../chunks/stores.js";
import { i as isMobile, m as mobileMode, v as viewportWidth, a as viewportHeight, b as isPWA } from "../../chunks/app-stores.js";
import "idb";
import { H as HOST, D as DESCRIPTION, K as KEYWORDS, A as APP_TITLE } from "../../chunks/env.js";
import { w as writable } from "../../chunks/index2.js";
import "../../chunks/member-loader.js";
const zoomist = "";
const autoExport = writable(false);
const __variableDynamicImportRuntimeHelper = (glob, path) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, new Error("Unknown variable dynamic import: " + path)));
  });
};
const supportedLocales = [
  "zh-CN",
  "zh-TW",
  "de-DE",
  "en-US",
  "fr-FR",
  "id-ID",
  "it-IT",
  "ja-JP",
  "pt-BR",
  "ru-RU",
  "th-TH",
  "vi-VN"
];
const itemLocales = ["zh-CN", "zh-TW", "en-US", "it-IT", "ja-JP", "pt-BR", "ru-RU", "vi-VN"];
const checkLocale = () => {
  const browserLocale = F();
  const usedLocale = supportedLocales.find((langID) => langID.includes(browserLocale));
  return usedLocale || "en-US";
};
const mountLocale = () => {
  supportedLocales.forEach((langID) => {
    y(langID, () => __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../../locales/de-DE.json": () => import("../../chunks/de-DE.js"), "../../locales/en-US.json": () => import("../../chunks/en-US.js"), "../../locales/fr-FR.json": () => import("../../chunks/fr-FR.js"), "../../locales/id-ID.json": () => import("../../chunks/id-ID.js"), "../../locales/it-IT.json": () => import("../../chunks/it-IT.js"), "../../locales/ja-JP.json": () => import("../../chunks/ja-JP.js"), "../../locales/pt-BR.json": () => import("../../chunks/pt-BR.js"), "../../locales/ru-RU.json": () => import("../../chunks/ru-RU.js"), "../../locales/th-TH.json": () => import("../../chunks/th-TH.js"), "../../locales/vi-VN.json": () => import("../../chunks/vi-VN.js"), "../../locales/zh-CN.json": () => import("../../chunks/zh-CN.js"), "../../locales/zh-TW.json": () => import("../../chunks/zh-TW.js") }), `../../locales/${langID}.json`));
  });
  itemLocales.forEach((langID) => {
    y(langID, () => __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../../locales/items/en-US.json": () => import("../../chunks/en-US2.js"), "../../locales/items/it-IT.json": () => import("../../chunks/it-IT2.js"), "../../locales/items/ja-JP.json": () => import("../../chunks/ja-JP2.js"), "../../locales/items/pt-BR.json": () => import("../../chunks/pt-BR2.js"), "../../locales/items/ru-RU.json": () => import("../../chunks/ru-RU2.js"), "../../locales/items/vi-VN.json": () => import("../../chunks/vi-VN2.js"), "../../locales/items/zh-CN.json": () => import("../../chunks/zh-CN2.js"), "../../locales/items/zh-TW.json": () => import("../../chunks/zh-TW2.js") }), `../../locales/items/${langID}.json`));
  });
  const usedLocale = checkLocale();
  $({
    fallbackLocale: "en-US",
    initialLocale: usedLocale
  });
};
const app = "";
const Iklan_svelte_svelte_type_style_lang = "";
const Toast_svelte_svelte_type_style_lang = "";
const Toasts = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ``;
});
const InitialLoader_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".modal.svelte-o4a6oh.svelte-o4a6oh{position:fixed;z-index:9999;top:0;left:0;width:100vw;height:100vh;background-color:rgba(0, 0, 0, 0.5);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);display:flex;justify-content:center;align-items:center;text-align:center}.modal-content.svelte-o4a6oh.svelte-o4a6oh{background-color:#fff;border-radius:0.4rem;width:500px;max-width:80%;padding:2%}.btn.svelte-o4a6oh.svelte-o4a6oh{padding-top:5%;width:100%}button.svelte-o4a6oh.svelte-o4a6oh{color:#fff;padding:2% 6%}.reload.svelte-o4a6oh.svelte-o4a6oh{background-color:#94866e}.open.svelte-o4a6oh.svelte-o4a6oh{background-color:#353533}.loader.svelte-o4a6oh.svelte-o4a6oh{display:flex;justify-content:center;align-items:center;font-size:3.2vw;color:#666666;width:100%;height:100vh;position:fixed;top:0;left:0;background-color:#fff;z-index:9998}@media screen and (max-width: 600px){.loader.svelte-o4a6oh.svelte-o4a6oh{font-size:4vh}}.content.svelte-o4a6oh.svelte-o4a6oh{display:block;text-align:center}.text.svelte-o4a6oh.svelte-o4a6oh{font-size:1rem;height:1.5rem;position:absolute;left:50%;transform:translateX(-50%);font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif}.text.connecting.svelte-o4a6oh.svelte-o4a6oh::after{content:'..';display:inline-block;animation:svelte-o4a6oh-dot 4s linear infinite}.progress.svelte-o4a6oh.svelte-o4a6oh{width:-webkit-max-content;width:-moz-max-content;width:max-content;position:relative}.blend.svelte-o4a6oh.svelte-o4a6oh{mix-blend-mode:lighten;position:absolute;top:0;left:0;width:100%;height:100%}.rotate.svelte-o4a6oh.svelte-o4a6oh{position:fixed;width:100%;left:50%;bottom:20%;transform:translateX(-50%);display:flex;justify-content:center;align-items:center;flex-direction:column;color:#000}.rotate.svelte-o4a6oh span.svelte-o4a6oh{font-size:0.8rem;margin-top:1rem}.rotate.svelte-o4a6oh i.svelte-o4a6oh{animation:svelte-o4a6oh-rotatePhone 1s infinite alternate;transform-origin:center;line-height:1rem}.unfilled.svelte-o4a6oh.svelte-o4a6oh,.filled.svelte-o4a6oh.svelte-o4a6oh{display:block;position:absolute;top:0;left:0;height:100%}.unfilled.svelte-o4a6oh.svelte-o4a6oh{width:100%;background-color:#f7f7f7}.filled.svelte-o4a6oh.svelte-o4a6oh{background-color:#666666}@keyframes svelte-o4a6oh-dot{0%{content:''}33%{content:'.'}66%{content:'..'}100%{content:'...'}}@keyframes svelte-o4a6oh-rotatePhone{0%{transform:rotate(0deg)}100%{transform:rotate(-90deg)}}",
  map: null
};
const InitialLoader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $isMobile, $$unsubscribe_isMobile;
  let $mobileMode, $$unsubscribe_mobileMode;
  $$unsubscribe_isMobile = subscribe(isMobile, (value) => $isMobile = value);
  $$unsubscribe_mobileMode = subscribe(mobileMode, (value) => $mobileMode = value);
  let { isBannerLoaded = false } = $$props;
  let { directLoad = false } = $$props;
  let isLoaded = false;
  let current = -1;
  getContext("loaded");
  if ($$props.isBannerLoaded === void 0 && $$bindings.isBannerLoaded && isBannerLoaded !== void 0)
    $$bindings.isBannerLoaded(isBannerLoaded);
  if ($$props.directLoad === void 0 && $$bindings.directLoad && directLoad !== void 0)
    $$bindings.directLoad(directLoad);
  $$result.css.add(css$1);
  $$unsubscribe_isMobile();
  $$unsubscribe_mobileMode();
  return `${``}

${!((isBannerLoaded || directLoad) && isLoaded && current >= 100) ? `<div class="${"loader svelte-o4a6oh"}"><div class="${"content svelte-o4a6oh"}"><div class="${"progress svelte-o4a6oh"}"><div class="${"icon"}"><i class="${"gi-pyro"}"></i>
					<i class="${"gi-hydro"}"></i>
					<i class="${"gi-anemo"}"></i>
					<i class="${"gi-electro"}"></i>
					<i class="${"gi-dendro"}"></i>
					<i class="${"gi-cryo"}"></i>
					<i class="${"gi-geo"}"></i></div>
				<div class="${"blend svelte-o4a6oh"}"><div class="${"unfilled svelte-o4a6oh"}"></div>
					<div class="${"filled animate svelte-o4a6oh"}" style="${"width:" + escape(current.toFixed(2), true) + "%"}"></div></div></div>

			${`<div class="${"text connecting svelte-o4a6oh"}">Connecting</div>`}

			${$isMobile && !$mobileMode ? `<div class="${"rotate svelte-o4a6oh"}"><i class="${"gi-rotate-phone svelte-o4a6oh"}"></i>
					<span class="${"svelte-o4a6oh"}">Rotate for better experience </span></div>` : ``}</div></div>` : ``}`;
});
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: "@import '../../node_modules/overlayscrollbars/css/OverlayScrollbars.css';@font-face{font-family:'GI_Global_Web';src:url('/fonts/optimized_global_web.woff2') format('woff2');font-weight:normal;font-style:normal}@font-face{font-family:'GI_JA_Web';src:url('/fonts/optimized_jp_web.woff2') format('woff2');font-weight:normal;font-style:normal}@font-face{font-family:'GI_TH_Web';src:url('/fonts/optimized_th_web.woff2') format('woff2');font-weight:normal;font-style:normal}@font-face{font-family:'GI_ZH_Web';src:url('/fonts/optimized_zh_web.woff2') format('woff2');font-weight:normal;font-style:normal}@font-face{font-family:'AAQISHU';src:url('/fonts/aaqishu.woff') format('woff');font-style:normal;font-weight:normal}.os-theme-light > :global(.os-scrollbar) > :global(.os-scrollbar-track) > :global(.os-scrollbar-handle){background-color:#d2c69c;opacity:0.5}.os-theme-light > :global(.os-scrollbar) > :global(.os-scrollbar-track) > :global(.os-scrollbar-handle:hover),.os-theme-light > :global(.os-scrollbar) > :global(.os-scrollbar-track) > :global(.os-scrollbar-handle:active){background-color:#d2c69c;opacity:1}.os-theme-light > :global(.os-scrollbar-vertical){width:8px}.os-theme-light > :global(.os-scrollbar-horizontal){height:8px}main{display:block;width:var(--screen-width);height:var(--screen-height);font-family:var(--genshin-font);overflow:hidden}.uid{display:block;position:fixed;bottom:0px;right:2em;z-index:9999;color:#fff;text-shadow:0 0 1.5px rgba(0, 0, 0, 0.7);font-family:Roboto, sans-serif;pointer-events:none}.mobile .uid{right:5%}.preview .uid{pointer-events:unset;right:unset;left:1rem;bottom:1rem}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_autoExport;
  let $$unsubscribe_isMobile;
  let $$unsubscribe_isPWA;
  let $$unsubscribe_page;
  let $locale, $$unsubscribe_locale;
  let $mobileMode, $$unsubscribe_mobileMode;
  let $viewportHeight, $$unsubscribe_viewportHeight;
  let $viewportWidth, $$unsubscribe_viewportWidth;
  let $isLoading, $$unsubscribe_isLoading;
  $$unsubscribe_autoExport = subscribe(autoExport, (value) => value);
  $$unsubscribe_isMobile = subscribe(isMobile, (value) => value);
  $$unsubscribe_isPWA = subscribe(isPWA, (value) => value);
  $$unsubscribe_page = subscribe(page, (value) => value);
  $$unsubscribe_locale = subscribe(D, (value) => $locale = value);
  $$unsubscribe_mobileMode = subscribe(mobileMode, (value) => $mobileMode = value);
  $$unsubscribe_viewportHeight = subscribe(viewportHeight, (value) => $viewportHeight = value);
  $$unsubscribe_viewportWidth = subscribe(viewportWidth, (value) => $viewportWidth = value);
  $$unsubscribe_isLoading = subscribe(k, (value) => $isLoading = value);
  let innerHeight;
  let innerWidth;
  let isBannerLoaded = false;
  let isloaded = false;
  setContext("bannerLoaded", () => isBannerLoaded = true);
  setContext("loaded", () => isloaded = true);
  let font = "";
  let directLoad = false;
  mountLocale();
  $$result.css.add(css);
  {
    {
      const lc = $locale?.toLowerCase() || "";
      const isYuanshen = lc.match(/(cn|ja)/);
      font = isYuanshen || lc.includes("th") ? lc.split("-")[0] : "global";
    }
  }
  {
    viewportWidth.set(innerWidth);
  }
  {
    viewportHeight.set(innerHeight);
  }
  $$unsubscribe_autoExport();
  $$unsubscribe_isMobile();
  $$unsubscribe_isPWA();
  $$unsubscribe_page();
  $$unsubscribe_locale();
  $$unsubscribe_mobileMode();
  $$unsubscribe_viewportHeight();
  $$unsubscribe_viewportWidth();
  $$unsubscribe_isLoading();
  return `

${$$result.head += `<meta name="${"description"}"${add_attribute("content", DESCRIPTION, 0)} data-svelte="svelte-uo0i7a"><meta name="${"keywords"}"${add_attribute("content", KEYWORDS, 0)} data-svelte="svelte-uo0i7a"><meta property="${"al:web:url"}"${add_attribute("content", HOST, 0)} data-svelte="svelte-uo0i7a"><link rel="${"fluid-icon"}" href="${escape(HOST, true) + "/meta-picture.jpg"}"${add_attribute("title", APP_TITLE, 0)} data-svelte="svelte-uo0i7a"><meta property="${"og:url"}"${add_attribute("content", HOST, 0)} data-svelte="svelte-uo0i7a"><meta property="${"og:type"}" content="${"website"}" data-svelte="svelte-uo0i7a"><meta property="${"og:title"}"${add_attribute("content", APP_TITLE, 0)} data-svelte="svelte-uo0i7a"><meta property="${"og:description"}"${add_attribute("content", DESCRIPTION, 0)} data-svelte="svelte-uo0i7a"><meta property="${"og:image"}" content="${escape(HOST, true) + "/meta-picture.jpg"}" data-svelte="svelte-uo0i7a"><meta name="${"twitter:card"}" content="${"summary_large_image"}" data-svelte="svelte-uo0i7a"><meta property="${"twitter:domain"}"${add_attribute("content", HOST.replace("https://", "").replace("http://", ""), 0)} data-svelte="svelte-uo0i7a"><meta property="${"twitter:url"}"${add_attribute("content", HOST, 0)} data-svelte="svelte-uo0i7a"><meta name="${"twitter:title"}"${add_attribute("content", APP_TITLE, 0)} data-svelte="svelte-uo0i7a"><meta name="${"twitter:description"}"${add_attribute("content", DESCRIPTION, 0)} data-svelte="svelte-uo0i7a"><meta name="${"twitter:image"}" content="${escape(HOST, true) + "/meta-picture.jpg"}" data-svelte="svelte-uo0i7a"><link rel="${"preload"}" href="${"/fonts/aaqishu.woff"}" as="${"font"}" type="${"font/woff"}" crossorigin data-svelte="svelte-uo0i7a"><link rel="${"preload"}" href="${"/fonts/optimized_global_web.woff2"}" as="${"font"}" type="${"font/woff2"}" crossorigin data-svelte="svelte-uo0i7a"><link rel="${"preload"}" href="${"/fonts/optimized_th_web.woff2"}" as="${"font"}" type="${"font/woff2"}" crossorigin data-svelte="svelte-uo0i7a"><link rel="${"preload"}" href="${"/fonts/optimized_jp_web.woff2"}" as="${"font"}" type="${"font/woff2"}" crossorigin data-svelte="svelte-uo0i7a"><link rel="${"preload"}" href="${"/fonts/optimized_zh_web.woff2"}" as="${"font"}" type="${"font/woff2"}" crossorigin data-svelte="svelte-uo0i7a">${`<link rel="${"manifest"}" href="${"/appmanifest.json"}" data-svelte="svelte-uo0i7a">`}`, ""}

${validate_component(InitialLoader, "Loader").$$render($$result, { isBannerLoaded, directLoad }, {}, {})}

<main class="${[
    escape($locale, true),
    ($mobileMode ? "mobile" : "") + " "
  ].join(" ").trim()}" style="${"--screen-height: " + escape($viewportHeight ? `${$viewportHeight}px` : "100vh", true) + ";--screen-width: " + escape($viewportWidth, true) + "px; --genshin-font: var(--gi-" + escape(font, true) + "-font);"}">${validate_component(Toasts, "Toasts").$$render($$result, {}, {}, {})}

	${!$isLoading && isloaded ? `${slots.default ? slots.default({}) : ``}` : ``}
	<a href="${"/"}" class="${"uid"}" title="${"Try Your Luck by this Simulator"}"></a>
</main>`;
});
export {
  Layout as default
};
