const host = {}.VITE_HOST || "";
const HOST = host.replace(/^\/|\/$/g, "");
const APP_TITLE = {}.VITE_APP_TITLE || "Genshin Impact Wish Simulator";
const DESCRIPTION = {}.VITE_DESCRIPTION || "";
const KEYWORDS = {}.VITE_KEYWORDS || "";
const apihost = {}.VITE_API_HOST || "";
const API_HOST = apihost.replace(/^\/|\/$/g, "");
export {
  APP_TITLE as A,
  DESCRIPTION as D,
  HOST as H,
  KEYWORDS as K,
  API_HOST as a
};
