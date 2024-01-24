
import root from '__GENERATED__/root.svelte';
import { respond } from '../../node_modules/@sveltejs/kit/src/runtime/server/index.js';
import { set_paths, assets, base } from '../../node_modules/@sveltejs/kit/src/runtime/paths.js';
import { set_prerendering } from '../../node_modules/@sveltejs/kit/src/runtime/env.js';
import { set_private_env } from '../../node_modules/@sveltejs/kit/src/runtime/env-private.js';
import { set_public_env } from '../../node_modules/@sveltejs/kit/src/runtime/env-public.js';

const app_template = ({ head, body, assets, nonce }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<meta\n\t\t\tname=\"viewport\"\n\t\t\tcontent=\"width=device-width,initial-scale=1,shrink-to-fit=no,user-scalable=no\"\n\t\t/>\n\t\t<meta name=\"a.validate.02\" content=\"gc8Hcbkq-w-3WEWF_q38cMwWsDdHhE5icT8F\" />\n\t\t<meta name=\"google-site-verification\" content=\"zn73VlG6JLf_oG3P8jQVbKGlDkQ9s6JcR6qZLzT2tVI\" />\n\t\t<meta name=\"google-adsense-account\" content=\"ca-pub-1874822310102113\" />\n\n\t\t<meta property=\"og:type\" content=\"profile\" />\n\t\t<meta property=\"profile:username\" content=\"AguzzTN54\" />\n\t\t<meta property=\"twitter:card\" content=\"summary_large_image\" />\n\t\t<meta name=\"author\" content=\"AguzzTN54\" />\n\t\t<meta name=\"robots\" content=\"index, follow\" />\n\n\t\t<meta name=\"language\" content=\"English\" />\n\t\t<meta property=\"og:locale\" content=\"en_US\" />\n\t\t<meta property=\"og:locale:alternate\" content=\"id_ID\" />\n\t\t<meta property=\"og:locale:alternate\" content=\"it_IT\" />\n\t\t<meta property=\"og:locale:alternate\" content=\"ja_JP\" />\n\t\t<meta property=\"og:locale:alternate\" content=\"pt_BR\" />\n\t\t<meta property=\"og:locale:alternate\" content=\"ru_RU\" />\n\t\t<meta property=\"og:locale:alternate\" content=\"th_TH\" />\n\t\t<meta property=\"og:locale:alternate\" content=\"vi_VN\" />\n\t\t<meta property=\"og:locale:alternate\" content=\"zh_CN\" />\n\t\t<title>Genshin Impact Wish Simulator</title>\n\n\t\t<link rel=\"stylesheet\" href=\"/icons.css\" />\n\t\t<link rel=\"icon\" href=\"/favicon.ico\" />\n\t\t<link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"/apple-touch-icon.png\" />\n\t\t<link rel=\"mask-icon\" href=\"/safari-pinned-tab.svg\" color=\"#5bbad5\" />\n\t\t<meta name=\"msapplication-TileColor\" content=\"#2d89ef\" />\n\t\t<meta name=\"theme-color\" content=\"#ffffff\" />\n\n\t\t" + head + "\n\n\t\t<script async src=\"https://www.googletagmanager.com/gtag/js?id=UA-211756322-1\"></script>\n\t\t<script>\n\t\t\twindow.dataLayer = window.dataLayer || [];\n\t\t\tfunction gtag() {\n\t\t\t\tdataLayer.push(arguments);\n\t\t\t}\n\t\t\tgtag('js', new Date());\n\t\t\tgtag('config', 'UA-211756322-1');\n\t\t</script>\n\t</head>\n\t<body>\n\t\t<div id=\"svelte\" class=\"svelte\">" + body + "</div>\n\t</body>\n</html>\n";

const error_template = ({ status, message }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<title>" + message + "</title>\n\n\t\t<style>\n\t\t\tbody {\n\t\t\t\tfont-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,\n\t\t\t\t\tUbuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\t\t\t\theight: 100vh;\n\t\t\t}\n\n\t\t\t.error {\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tmax-width: 32rem;\n\t\t\t\tmargin: 0 1rem;\n\t\t\t}\n\n\t\t\t.status {\n\t\t\t\tfont-weight: 200;\n\t\t\t\tfont-size: 3rem;\n\t\t\t\tline-height: 1;\n\t\t\t\tposition: relative;\n\t\t\t\ttop: -0.05rem;\n\t\t\t}\n\n\t\t\t.message {\n\t\t\t\tborder-left: 1px solid #ccc;\n\t\t\t\tpadding: 0 0 0 1rem;\n\t\t\t\tmargin: 0 0 0 1rem;\n\t\t\t\tmin-height: 2.5rem;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t}\n\n\t\t\t.message h1 {\n\t\t\t\tfont-weight: 400;\n\t\t\t\tfont-size: 1em;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\t\t</style>\n\t</head>\n\t<body>\n\t\t<div class=\"error\">\n\t\t\t<span class=\"status\">" + status + "</span>\n\t\t\t<div class=\"message\">\n\t\t\t\t<h1>" + message + "</h1>\n\t\t\t</div>\n\t\t</div>\n\t</body>\n</html>\n";

let read = null;

set_paths({"base":"","assets":""});

let default_protocol = 'https';

// allow paths to be globally overridden
// in svelte-kit preview and in prerendering
export function override(settings) {
	default_protocol = settings.protocol || default_protocol;
	set_paths(settings.paths);
	set_prerendering(settings.prerendering);
	read = settings.read;
}

export class Server {
	constructor(manifest) {
		this.options = {
			csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false},"reportOnly":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
			csrf: {
				check_origin: true,
			},
			dev: false,
			handle_error: (error, event) => {
				return this.options.hooks.handleError({
					error,
					event,

					// TODO remove for 1.0
					// @ts-expect-error
					get request() {
						throw new Error('request in handleError has been replaced with event. See https://github.com/sveltejs/kit/pull/3384 for details');
					}
				}) ?? { message: event.route.id != null ? 'Internal Error' : 'Not Found' };
			},
			hooks: null,
			manifest,
			paths: { base, assets },
			public_env: {},
			read,
			root,
			service_worker: false,
			app_template,
			app_template_contains_nonce: false,
			error_template,
			trailing_slash: "never"
		};
	}

	/**
	 * Take care: Some adapters may have to call `Server.init` per-request to set env vars,
	 * so anything that shouldn't be rerun should be wrapped in an `if` block to make sure it hasn't
	 * been done already.
	 */
	async init({ env }) {
		const entries = Object.entries(env);

		const prv = Object.fromEntries(entries.filter(([k]) => !k.startsWith('PUBLIC_')));

		const pub = Object.fromEntries(entries.filter(([k]) => k.startsWith('PUBLIC_')));

		set_private_env(prv);
		set_public_env(pub);

		this.options.public_env = pub;

		if (!this.options.hooks) {
			const module = await import("./hooks.js");

			// TODO remove this for 1.0
			if (module.externalFetch) {
				throw new Error('externalFetch has been removed — use handleFetch instead. See https://github.com/sveltejs/kit/pull/6565 for details');
			}

			this.options.hooks = {
				handle: module.handle || (({ event, resolve }) => resolve(event)),
				handleError: module.handleError || (({ error }) => console.error(error.stack)),
				handleFetch: module.handleFetch || (({ request, fetch }) => fetch(request))
			};
		}
	}

	async respond(request, options = {}) {
		if (!(request instanceof Request)) {
			throw new Error('The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details');
		}

		return respond(request, this.options, options);
	}
}
