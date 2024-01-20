import { c as create_ssr_component, a as subscribe, g as getContext, e as escape, v as validate_component } from "../../chunks/index.js";
import { p as page } from "../../chunks/stores.js";
import { R as RandomBackground } from "../../chunks/RandomBackground.js";
const _error_svelte_svelte_type_style_lang = "";
const css = {
  code: "section.svelte-7a8fw6.svelte-7a8fw6{width:100%;height:100%;position:relative;display:flex;justify-content:center;align-items:center}.container.svelte-7a8fw6.svelte-7a8fw6{position:relative;z-index:+1;width:80%;height:70%;background-color:#ece6de;padding:2rem;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}.gi-primo-star.svelte-7a8fw6.svelte-7a8fw6{color:#fdf0ac;font-size:1.5rem;display:inline-block;position:absolute;filter:drop-shadow(0 0 7px rgba(227, 149, 48, 0.9))}.top-left.svelte-7a8fw6.svelte-7a8fw6{top:-0.8rem;left:-0.5rem;transform:rotate(-45deg)}.top-right.svelte-7a8fw6.svelte-7a8fw6{top:-0.8rem;right:-0.5rem;transform:rotate(45deg)}.bottom-left.svelte-7a8fw6.svelte-7a8fw6{bottom:-0.8rem;left:-0.5rem;transform:rotate(-135deg)}.bottom-right.svelte-7a8fw6.svelte-7a8fw6{bottom:-0.8rem;right:-0.5rem;transform:rotate(135deg)}.icon-bg.svelte-7a8fw6.svelte-7a8fw6{font-size:17em;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);color:#e4dcce;z-index:-1}h1.svelte-7a8fw6.svelte-7a8fw6{font-size:2.5rem}h2.svelte-7a8fw6.svelte-7a8fw6{font-size:1.2rem;padding:0.6rem 0}p.svelte-7a8fw6.svelte-7a8fw6{font-size:1rem}a.svelte-7a8fw6.svelte-7a8fw6{border-radius:40px;color:white;background-color:#4a5265;display:inline-flex;align-items:center;justify-content:space-between;padding:5px 4rem 5px 5px;transition:all 0.2s;margin-top:3rem}a.svelte-7a8fw6 i.svelte-7a8fw6{width:2rem;height:2rem;background-color:#353533;border-radius:100%;display:inline-flex;justify-content:center;align-items:center;font-size:1rem;margin-right:3rem;color:#ffc107}a.svelte-7a8fw6.svelte-7a8fw6:hover{background-color:rgb(51, 57, 71)}",
  map: null
};
const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  getContext("isBannerLoaded");
  $$result.css.add(css);
  $$unsubscribe_page();
  return `${$$result.head += `${$$result.title = `<title>Error ${escape($page.status)}</title>`, ""}`, ""}

<section class="${"svelte-7a8fw6"}">${validate_component(RandomBackground, "Background").$$render($$result, {}, {}, {})}
	<div class="${"container svelte-7a8fw6"}"><i class="${"gi-primo-star top-left svelte-7a8fw6"}"></i>
		<i class="${"gi-primo-star top-right svelte-7a8fw6"}"></i>
		<i class="${"gi-primo-star bottom-left svelte-7a8fw6"}"></i>
		<i class="${"gi-primo-star bottom-right svelte-7a8fw6"}"></i>
		<i class="${"gi-inazuma icon-bg svelte-7a8fw6"}"></i>
		<h1 class="${"svelte-7a8fw6"}">Error ${escape($page.status)}</h1>
		<h2 class="${"svelte-7a8fw6"}">${escape($page.error.message)}</h2>
		<p class="${"svelte-7a8fw6"}">We find some problem with the page you&#39;re looking for ..</p>
		<a href="${"/"}" class="${"svelte-7a8fw6"}"><i class="${"gi-reply svelte-7a8fw6"}"></i> Back To The Beginning .. </a></div>
</section>`;
});
export {
  Error as default
};
