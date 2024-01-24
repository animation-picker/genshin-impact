import { c as create_ssr_component, a as subscribe, e as escape, j as null_to_empty } from "../../../chunks/index.js";
import { Y } from "../../../chunks/runtime.esm.js";
import { A as APP_TITLE } from "../../../chunks/env.js";
import { i as isMobile } from "../../../chunks/app-stores.js";
const html = `<h1>How To Install WishSimulator.App to your <span> Windows</span></h1>
<h2>Why I need to Install it ?</h2>
<p>You are not required to install it, the installed app is literally the same as the site, but I advise you to install it because it offers several advantages:</p>
<ul>
<li><strong>Simple to Access</strong>, you don't need to open browser and type url address manually, access the simulator from your Desktop directly.</li>
<li><strong>Offline Capability</strong>, You can still open and run the simulator even if you don't have internet. But once the site has a new version, you have to connect it to the internet, the application will be updated automatically</li>
</ul>
<h2>Requirement</h2>
<ul>
<li>You must have a browser with a chromium base, for example <strong>Google Chrome, Ms.Edge, Brave, Duckduckgo or others</strong>. <strong>Mozilla and Opera</strong> can also be used too.</li>
</ul>
<h2>Steps</h2>
<ol>
<li>
<p>First, Open the site (<strong>https://wishsimulator.app</strong>) with one of the browsers above.</p>
</li>
<li>
<p>Wait for the site to finish loading, then just navigate to the address bar, then click the install icon on the right side</p>
<p><img src="https://user-images.githubusercontent.com/13815468/200633549-869ae8a3-f077-4865-b120-a3e2804026b2.jpg" alt="Windows Install"></p>
<p>You can see the video below</p>
<video src="https://user-images.githubusercontent.com/13815468/200639254-ef34490c-e18d-4b2e-b157-a99f9b426267.mp4" controls>
</li>
<li>
<p>Congratulations, Now you can access the Simulator directly from your desktop!</p>
</li>
<li>
<p>If You want to uninstall it, Just uninstall like a regular application. Click start -&gt; search &quot;Genshin Impact Wish Simulator&quot; -&gt; Click <strong>Uninstall</strong> option</p>
<p><img src="https://user-images.githubusercontent.com/13815468/200641681-98bd462e-65f2-4ee4-8a49-227f9b8d333a.jpg" alt="OnPaste 20221109-010157"></p>
</li>
</ol>
`;
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "section.svelte-y6ol5v.svelte-y6ol5v{width:100%;height:100%;overflow-y:auto;position:relative;background-color:#ebebeb}header.svelte-y6ol5v.svelte-y6ol5v{display:flex;padding:1rem 2%;justify-content:space-between;background-color:rgb(20, 18, 15);width:100%;position:-webkit-sticky;position:sticky;top:0;left:0;z-index:+10;color:#fff;font-size:1rem}footer.svelte-y6ol5v.svelte-y6ol5v{text-align:right;margin:2rem 0}footer.svelte-y6ol5v a.svelte-y6ol5v:hover{text-decoration:none}.select-device.svelte-y6ol5v.svelte-y6ol5v,footer.svelte-y6ol5v.svelte-y6ol5v{padding:1rem 10%}.select-device.svelte-y6ol5v button.svelte-y6ol5v,footer.svelte-y6ol5v a.svelte-y6ol5v{color:var(--text-color);margin:0 0.25rem;opacity:0.85;padding:0.5rem 1.2rem;font-size:1rem;border-radius:12rem;border:1px solid var(--text-color);transition:all 0.2s;display:inline-flex;align-items:center}.select-device.svelte-y6ol5v button.active.svelte-y6ol5v,.select-device.svelte-y6ol5v button.svelte-y6ol5v:hover,footer.svelte-y6ol5v a.svelte-y6ol5v{background-color:var(--text-color);color:#fff}.select-device.svelte-y6ol5v button.active.svelte-y6ol5v,footer.svelte-y6ol5v a.svelte-y6ol5v:hover{opacity:1}i.svelte-y6ol5v.svelte-y6ol5v{font-size:100%;margin-right:0.5rem}article.svelte-y6ol5v.svelte-y6ol5v{color:var(--text-color);padding:0 10%;font-size:120%}section.svelte-y6ol5v h1{font-size:1.7rem;text-align:left;background-color:#dadada;padding:0.5rem 5%;position:relative;font-family:var(--genshin-font)}.mobile section.svelte-y6ol5v h1{font-size:1.3rem}section.svelte-y6ol5v h1::before{content:'';display:block;position:absolute;width:0.8rem;height:80%;left:0;top:50%;transform:translateY(-50%);background-color:var(--text-color)}.android.svelte-y6ol5v h1 span{color:#64ad15}.windows.svelte-y6ol5v h1 span{color:#3f8ed1}section.svelte-y6ol5v h2{padding:1.5rem 0 0.5rem}section.svelte-y6ol5v ul,section.svelte-y6ol5v ol{font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;padding-left:1.5rem}section.svelte-y6ol5v p{padding:0.4rem 0;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif}section.svelte-y6ol5v img,section.svelte-y6ol5v video{max-width:100%;max-height:75vh}@media screen and (max-width: 780px){main:not(.mobile) article.svelte-y6ol5v.svelte-y6ol5v{padding:3.5rem 5% 0}main:not(.mobile) article.svelte-y6ol5v.svelte-y6ol5v{padding:0 5% !important}}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let tutor;
  let $$unsubscribe_isMobile;
  let $t, $$unsubscribe_t;
  $$unsubscribe_isMobile = subscribe(isMobile, (value) => value);
  $$unsubscribe_t = subscribe(Y, (value) => $t = value);
  let selected = "windows";
  $$result.css.add(css);
  tutor = html;
  $$unsubscribe_isMobile();
  $$unsubscribe_t();
  return `${$$result.head += `${$$result.title = `<title>
		Install Instruction | ${escape($t("title", { default: APP_TITLE }))}
	</title>`, ""}`, ""}

<section class="${"svelte-y6ol5v"}"><header class="${"svelte-y6ol5v"}"><div class="${"brand"}"><a href="${"/"}">WishSimulator.App
			</a></div></header>

	<div class="${"select-device svelte-y6ol5v"}"><button class="${["svelte-y6ol5v", ""].join(" ").trim()}"><i class="${"gi-android svelte-y6ol5v"}"></i> Android
		</button>
		<button class="${["svelte-y6ol5v", "active"].join(" ").trim()}"><i class="${"gi-windows svelte-y6ol5v"}"></i> Windows
		</button></div>

	<article class="${escape(null_to_empty(selected), true) + " svelte-y6ol5v"}"><!-- HTML_TAG_START -->${tutor}<!-- HTML_TAG_END --></article>

	<footer class="${"svelte-y6ol5v"}"><a href="${"/"}" class="${"svelte-y6ol5v"}">Start Wishing Now !
		</a></footer>
</section>`;
});
export {
  Page as default
};
