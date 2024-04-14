import { c as create_ssr_component, a as subscribe, d as add_attribute } from "./index.js";
import { d as assets } from "./app-stores.js";
const RandomBackground_svelte_svelte_type_style_lang = "";
const css = {
  code: ".bg.svelte-1ghl7jp{width:100vw;height:100%;-o-object-fit:cover;object-fit:cover;position:fixed;top:50%;left:50%;transform:translate(-50%, -50%) scale(1.1);filter:blur(10px);-webkit-filter:blur(10px);z-index:+1}",
  map: null
};
const RandomBackground = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $assets, $$unsubscribe_assets;
  $$unsubscribe_assets = subscribe(assets, (value) => $assets = value);
  const random = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  $$result.css.add(css);
  $$unsubscribe_assets();
  return `<img class="${"bg svelte-1ghl7jp"}"${add_attribute("src", $assets[`bg${random(1, 20)}.webp`], 0)} alt="${"background"}">`;
});
export {
  RandomBackground as R
};
