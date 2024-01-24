import { c as create_ssr_component, a as subscribe, d as add_attribute, v as validate_component, e as escape } from "../../../chunks/index.js";
import "howler";
import { d as assets } from "../../../chunks/app-stores.js";
import { B as ButtonModal } from "../../../chunks/ButtonModal.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "section.svelte-rwed1l{width:100%;height:100%;position:relative;display:flex;justify-content:center;align-items:center}.bg.svelte-rwed1l{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);width:110%;height:110%;-o-object-fit:cover;object-fit:cover;filter:blur(5px)}.container.svelte-rwed1l{position:relative;z-index:+1;width:80%;height:70%;background-color:#ece6de;padding:2rem;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}.gi-primo-star.svelte-rwed1l{color:#fdf0ac;font-size:1.5rem;display:inline-block;position:absolute;filter:drop-shadow(0 0 7px rgba(227, 149, 48, 0.9))}.top-left.svelte-rwed1l{top:-0.8rem;left:-0.5rem;transform:rotate(-45deg)}.top-right.svelte-rwed1l{top:-0.8rem;right:-0.5rem;transform:rotate(45deg)}.bottom-left.svelte-rwed1l{bottom:-0.8rem;left:-0.5rem;transform:rotate(-135deg)}.bottom-right.svelte-rwed1l{bottom:-0.8rem;right:-0.5rem;transform:rotate(135deg)}.icon-bg.svelte-rwed1l{font-size:17em;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);color:#e4dcce;z-index:-1}h1.svelte-rwed1l{font-size:200%;line-height:120%}h2.svelte-rwed1l{font-size:120%;line-height:120%;padding:0.6rem 0}p.svelte-rwed1l{font-size:105%;display:block;margin:0 auto;width:80%}@media screen and (max-width: 900px){p.svelte-rwed1l{font-size:120%}}.form.svelte-rwed1l{margin:3vh 0;width:100%}.input.svelte-rwed1l{width:80%;max-width:30rem;text-align:center;display:block;margin:0 auto}input.svelte-rwed1l{width:100%;padding:0 1.5rem;height:3rem;display:block;border-radius:3rem;border:#c3b8a5 1px solid;outline:none;transition:all 0.2s}input.svelte-rwed1l:focus{box-shadow:0 0 0.4rem rgba(227, 149, 48, 0.7)}input.error.svelte-rwed1l{border:#de2f22 1px solid}input.error.svelte-rwed1l:focus{box-shadow:0 0 0.4rem rgba(222, 47, 34, 0.7)}.button.svelte-rwed1l{margin-top:1.5vh}.error.svelte-rwed1l{color:#de2f22}.valid.svelte-rwed1l{color:#64ad15}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $assets, $$unsubscribe_assets;
  $$unsubscribe_assets = subscribe(assets, (value) => $assets = value);
  const random = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  let input = "";
  $$result.css.add(css);
  $$unsubscribe_assets();
  return `${$$result.head += `${$$result.title = `<title>Genshin Impact Wish Simulator</title>`, ""}`, ""}

<section class="${"svelte-rwed1l"}"><img class="${"bg svelte-rwed1l"}"${add_attribute("src", $assets[`bg${random(1, 20)}.webp`], 0)} alt="${"background"}">
	<div class="${"container svelte-rwed1l"}"><i class="${"gi-primo-star top-left svelte-rwed1l"}"></i>
		<i class="${"gi-primo-star top-right svelte-rwed1l"}"></i>
		<i class="${"gi-primo-star bottom-left svelte-rwed1l"}"></i>
		<i class="${"gi-primo-star bottom-right svelte-rwed1l"}"></i>
		<i class="${"gi-inazuma icon-bg svelte-rwed1l"}"></i>

		<h1 class="${"svelte-rwed1l"}">Genshin Impact Wish Simulator</h1>
		<h2 class="${"svelte-rwed1l"}">This Page is only available for supporters.</h2>

		<form class="${"form svelte-rwed1l"}"><div class="${"input svelte-rwed1l"}"><input type="${"text"}" placeholder="${"Input Access Key"}" class="${["svelte-rwed1l", ""].join(" ").trim()}"${add_attribute("value", input, 0)}>
				${``}

				${``}</div>
			<div class="${"button svelte-rwed1l"}">${validate_component(ButtonModal, "ButtonModal").$$render(
    $$result,
    {
      disabled: !input
    },
    {},
    {
      default: () => {
        return `${escape("Start Simulator")}`;
      }
    }
  )}</div></form>

		<p class="${"svelte-rwed1l"}"><a href="${"https://ko-fi.com/post/AdFree-Wish-Simulator-Enjoy-Simulator-Without-Ads-G2G2DQ57O"}" target="${"_blank"}"><strong>Become a supporter here </strong></a> and get a opportunity to use the simulator without being distracted by Ads !
		</p></div>
</section>`;
});
export {
  Page as default
};
