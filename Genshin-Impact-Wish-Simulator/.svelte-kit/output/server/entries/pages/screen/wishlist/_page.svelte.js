import { c as create_ssr_component, a as subscribe, v as validate_component } from "../../../../chunks/index.js";
import { p as page } from "../../../../chunks/stores.js";
import { W as WishResult } from "../../../../chunks/WishResult.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "section.svelte-1bfm8fx{width:100%;height:var(--screen-height)}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let list = [];
  $$result.css.add(css);
  $$unsubscribe_page();
  return `<section class="${"svelte-1bfm8fx"}">${list.length > 1 ? `${validate_component(WishResult, "WishResult").$$render($$result, { list, skip: true, standalone: true }, {}, {})}` : ``}
</section>`;
});
export {
  Page as default
};
