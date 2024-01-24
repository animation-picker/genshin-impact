import { c as create_ssr_component, a as subscribe, f as createEventDispatcher, d as add_attribute, e as escape } from "./index.js";
import { Y } from "./runtime.esm.js";
const ButtonModal_svelte_svelte_type_style_lang = "";
const css = {
  code: "button.svelte-1sz47b8.svelte-1sz47b8{border-radius:40px;align-items:center;padding:0 0 0 0.3em;max-width:100%;height:2.3rem;transition:all 0.2s;position:relative;text-align:center;border:3.5px solid transparent;transition:all 0.2s;width:200px}button.light.svelte-1sz47b8.svelte-1sz47b8{background-color:#ece5d8;color:#4a5265}button.svelte-1sz47b8.svelte-1sz47b8:not(.light){color:white;background-color:#4a5265}button.svelte-1sz47b8.svelte-1sz47b8:active:not(:disabled){transform:scale(0.9);background-color:#e0ddd4 !important;border-color:rgb(195, 195, 195) !important;box-shadow:rgb(160 175 190 / 60%) 0px 0px 7px 5px;color:#fff}button.svelte-1sz47b8.svelte-1sz47b8:disabled{opacity:0.7}button.svelte-1sz47b8 i.svelte-1sz47b8{width:1.7rem;height:1.7rem;background-color:#353533;border-radius:100%;display:inline-flex;justify-content:center;align-items:center;font-size:0.8rem;position:absolute;left:2%;top:50%;transform:translateY(-50%)}button.svelte-1sz47b8.svelte-1sz47b8:hover:not(:disabled){background-color:rgb(51, 57, 71)}button.light.svelte-1sz47b8.svelte-1sz47b8:hover:not(:disabled){background-color:#c3b8a1}button.svelte-1sz47b8 i.svelte-1sz47b8{color:#ffc107}button.svelte-1sz47b8 i.gi-times.svelte-1sz47b8{color:#3f9ad1}.mobile button.svelte-1sz47b8.svelte-1sz47b8{height:2.1rem}.mobile button.svelte-1sz47b8.svelte-1sz47b8:not(.light){width:130px}@media screen and (max-width: 700px){main:not(.mobile) button.svelte-1sz47b8.svelte-1sz47b8{font-size:0.85rem}main:not(.mobile) button.svelte-1sz47b8.svelte-1sz47b8:not(.light){width:120px}}",
  map: null
};
const ButtonModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $t, $$unsubscribe_t;
  $$unsubscribe_t = subscribe(Y, (value) => $t = value);
  const isSlotpresent = $$props.$$slots;
  let { type = "confirm" } = $$props;
  let { text = "" } = $$props;
  let { disabled = false } = $$props;
  let { light = false } = $$props;
  let { width = "" } = $$props;
  let { icon = "" } = $$props;
  createEventDispatcher();
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  $$result.css.add(css);
  $$unsubscribe_t();
  return `<button ${disabled ? "disabled" : ""}${add_attribute("style", width ? `width:${width}` : "", 0)} class="${["svelte-1sz47b8", light ? "light" : ""].join(" ").trim()}">${icon ? `<i class="${"gi-" + escape(icon, true) + " svelte-1sz47b8"}"></i>` : `${type === "confirm" ? `<i class="${"gi-circle-o svelte-1sz47b8"}"></i>` : `<i class="${"gi-times svelte-1sz47b8"}"></i>`}`}

	${isSlotpresent ? `${slots.default ? slots.default({}) : ``}` : `<span>${escape(text || (type === "confirm" ? $t("confirmButton") : $t("cancelButton")))}</span>`}
</button>`;
});
export {
  ButtonModal as B
};
