import { c as create_ssr_component, f as createEventDispatcher } from "./index.js";
const ButtonGeneral_svelte_svelte_type_style_lang = "";
const css = {
  code: "button.svelte-hp2f5i{position:relative;border:3.5px solid transparent;border-radius:50px;background-color:#e0ddd4;box-shadow:0 2px 2px 0 rgba(100, 100, 100, 0.2), 0 2px 2px 0 rgba(100, 100, 100, 0.19);padding:0.25rem 1.5rem;margin:2px 5px;transition:all 0.2s;border:solid transparent;font-size:90%}button.dark.svelte-hp2f5i{color:white;background-color:#4a5265}button.svelte-hp2f5i:hover:not(:disabled){border-color:#fff}button.svelte-hp2f5i:active:not(:disabled){animation-name:svelte-hp2f5i-colourchange;animation-duration:0.2s;animation-fill-mode:forwards;transform:scale(0.95)}@keyframes svelte-hp2f5i-colourchange{50%{color:#ffffda;background:#ede9cc}100%{border-color:darkgray;color:white;background:linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)), #e0ddd4}}.mobile button.svelte-hp2f5i{margin:1px 2px;padding:0.15rem 1.3rem;font-size:90%}@media screen and (max-width: 900px){button.svelte-hp2f5i{margin:2px 5px}}@media screen and (max-width: 400px){button.svelte-hp2f5i{font-size:120%;margin:1px 2px}}",
  map: null
};
const ButtonGeneral = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { disabled = false } = $$props;
  let { dark = false } = $$props;
  createEventDispatcher();
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.dark === void 0 && $$bindings.dark && dark !== void 0)
    $$bindings.dark(dark);
  $$result.css.add(css);
  return `<button ${disabled ? "disabled" : ""} class="${["svelte-hp2f5i", dark ? "dark" : ""].join(" ").trim()}">${slots.default ? slots.default({}) : ``}
</button>`;
});
export {
  ButtonGeneral as B
};
