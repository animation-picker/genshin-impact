import { c as create_ssr_component, v as validate_component, d as add_attribute } from "../../../chunks/index.js";
import { B as ButtonGeneral } from "../../../chunks/ButtonGeneral.js";
import { R as RandomBackground } from "../../../chunks/RandomBackground.js";
import "../../../chunks/env.js";
import "idb";
const _pagination_svelte_svelte_type_style_lang = "";
const _list_svelte_svelte_type_style_lang = "";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "section.svelte-33al2o{width:100%;height:100%;overflow-y:auto;position:relative;padding:1rem}.container.svelte-33al2o{padding:1rem;background-color:rgba(255, 255, 255, 0.8);position:relative;border-radius:1rem;z-index:+10}form.svelte-33al2o{width:100%;display:flex;justify-content:center;flex-direction:column;align-items:center;padding:2rem;text-align:center}input.svelte-33al2o{width:300px;max-width:90%;height:2.3rem;border-radius:4rem;border:0;outline:0;padding:0 1rem}.col.button.svelte-33al2o{padding-top:1rem}h1.svelte-33al2o{padding:1rem}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let pass = "";
  $$result.css.add(css);
  return `<section class="${"svelte-33al2o"}">${validate_component(RandomBackground, "Background").$$render($$result, {}, {}, {})}
	<div class="${"container svelte-33al2o"}"><h1 class="${"svelte-33al2o"}">Control Banner</h1>

		${`<form class="${"svelte-33al2o"}"><div class="${"col"}"><input type="${"text"}" class="${"svelte-33al2o"}"${add_attribute("value", pass, 0)}></div>
				<div class="${"col button svelte-33al2o"}">${validate_component(ButtonGeneral, "ButtonGeneral").$$render($$result, {}, {}, {
    default: () => {
      return `Show List`;
    }
  })}</div></form>`}</div>
</section>`;
});
export {
  Page as default
};
