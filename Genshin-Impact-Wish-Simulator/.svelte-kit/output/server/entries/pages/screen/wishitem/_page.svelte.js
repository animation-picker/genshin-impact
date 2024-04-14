import { c as create_ssr_component, a as subscribe, e as escape, d as add_attribute, v as validate_component } from "../../../../chunks/index.js";
import { p as page } from "../../../../chunks/stores.js";
import { Y } from "../../../../chunks/runtime.esm.js";
import { A as APP_TITLE } from "../../../../chunks/env.js";
import { W as WishResult } from "../../../../chunks/WishResult.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "section.svelte-1bfm8fx{width:100%;height:var(--screen-height)}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  let $t, $$unsubscribe_t;
  $$unsubscribe_page = subscribe(page, (value) => value);
  $$unsubscribe_t = subscribe(Y, (value) => $t = value);
  let list = [];
  let itemName = "";
  let isOutfit = false;
  $$result.css.add(css);
  $$unsubscribe_page();
  $$unsubscribe_t();
  return `${$$result.head += `${$$result.title = `<title>
		${escape($t(`${itemName}.name`))} | ${escape($t("title"))}
	</title>`, ""}<meta name="${"title"}"${add_attribute("content", APP_TITLE, 0)} data-svelte="svelte-h0ssec"><meta property="${"og:title"}"${add_attribute("content", APP_TITLE, 0)} data-svelte="svelte-h0ssec"><meta property="${"twitter:title"}"${add_attribute("content", APP_TITLE, 0)} data-svelte="svelte-h0ssec">`, ""}

<section class="${"svelte-1bfm8fx"}">${list.length > 0 ? `${validate_component(WishResult, "WishResult").$$render(
    $$result,
    {
      list,
      isOutfit,
      skip: true,
      standalone: true
    },
    {},
    {}
  )}` : ``}
</section>`;
});
export {
  Page as default
};
