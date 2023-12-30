<script>
	// Packagae
	import { registerSW } from 'virtual:pwa-register';
	import { isLoading, locale } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { dev } from '$app/environment';
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	import {
		viewportHeight,
		viewportWidth,
		isMobile,
		mobileMode,
		isPWA
	} from '$lib/store/app-stores';
	import { retriveOldData } from '$lib/helpers/migrator/collect-old-data';
	import { HOST, DESCRIPTION, KEYWORDS, APP_TITLE } from '$lib/env';
	import { mountLocale } from '$lib/helpers/i18n';
	import { mobileDetect } from '$lib/helpers/mobileDetect';
	import { wakeLock } from '$lib/helpers/wakeLock';
	import '../app.css';

	import Iklan from '$lib/components/Iklan.svelte';
	import Loader from './_index/InitialLoader.svelte';

	let innerHeight;
	let innerWidth;
	let isBannerLoaded = false;
	let isloaded = false;
	const showAd = writable(false);

	setContext('bannerLoaded', () => (isBannerLoaded = true));
	setContext('loaded', () => (isloaded = true));
	setContext('showAd', showAd);

	let font = '';
	$: {
		const lc = $locale?.toLowerCase() || '';
		const isYuanshen = lc.match(/(cn|ja)/);
		font = isYuanshen || lc.includes('th') ? lc.split('-')[0] : 'global';
	}

	$: viewportWidth.set(innerWidth);
	$: viewportHeight.set(innerHeight);
	$: path = $page.url.pathname.split('/');
	$: directLoad = path[1] !== '';
	$: preview = path[1] === 'screen';

	const setMobileMode = () => {
		if ($isPWA) return mobileMode.set(true);
		const angle = screen.orientation?.angle || 0;
		const rotate = angle === 90 || angle === 270;
		mobileMode.set(rotate);
	};

	const validPaths = ['adkey', 'install', 'privacy-policy', 'screen'];
	$: isPathValid = validPaths.includes(path[1].toLowerCase());

	const redirectIfNotValidPath = () => {
		const isCDNHost = $page.url.host.includes('cdn.');
		if (isCDNHost) return window.location.replace('https://wishsimulator.app/');
		if (path[1] && !isPathValid) return window.location.replace('/');
	};

	mountLocale();
	onMount(() => {
		redirectIfNotValidPath();

		const url = new URL(window.location.href);
		const searchParams = new URLSearchParams(url.search);
		isPWA.set(searchParams.get('pwa') === 'true' || !!searchParams.get('pwasc'));

		registerSW();
		wakeLock();
		retriveOldData();

		isMobile.set(mobileDetect() || innerWidth < 601);
		if ($isMobile) setMobileMode();

		window.addEventListener('orientationchange', () => {
			if ($isMobile) setMobileMode();
		});

		// prevent Righ click (hold on android) on production mode
		if (!dev) document.addEventListener('contextmenu', (e) => e.preventDefault());
	});
</script>

<svelte:window bind:innerHeight bind:innerWidth />

<svelte:head>
	<meta name="description" content={DESCRIPTION} />
	<meta name="keywords" content={KEYWORDS} />
	<meta property="al:web:url" content={HOST} />
	<link rel="fluid-icon" href="{HOST}/meta-picture.jpg" title={APP_TITLE} />

	<meta property="og:url" content={HOST} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={APP_TITLE} />
	<meta property="og:description" content={DESCRIPTION} />
	<meta property="og:image" content="{HOST}/meta-picture.jpg" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content={HOST.replace('https://', '').replace('http://', '')} />
	<meta property="twitter:url" content={HOST} />
	<meta name="twitter:title" content={APP_TITLE} />
	<meta name="twitter:description" content={DESCRIPTION} />
	<meta name="twitter:image" content="{HOST}/meta-picture.jpg" />

	{#if path[1] && !isPathValid}
		<link rel="canonical" href={HOST} />
	{/if}

	<link
		rel="preload"
		href="/fonts/optimized_global_web.woff2"
		as="font"
		type="font/woff2"
		crossorigin
	/>
	<link
		rel="preload"
		href="/fonts/optimized_th_web.woff2"
		as="font"
		type="font/woff2"
		crossorigin
	/>
	<link
		rel="preload"
		href="/fonts/optimized_jp_web.woff2"
		as="font"
		type="font/woff2"
		crossorigin
	/>
	<link
		rel="preload"
		href="/fonts/optimized_zh_web.woff2"
		as="font"
		type="font/woff2"
		crossorigin
	/>

	{#if !dev}
		<link rel="manifest" href="/appmanifest.json" />
	{/if}

	{#if isloaded && $showAd}
		<Iklan head />
	{/if}
</svelte:head>

<Loader {isBannerLoaded} {directLoad} />

<main
	class:mobile={$mobileMode}
	class:preview
	class={$locale}
	style="--screen-height: {$viewportHeight
		? `${$viewportHeight}px`
		: '100vh'};--screen-width: {$viewportWidth}px;
		--genshin-font: var(--gi-{font}-font);"
>
	{#if !$isLoading && isloaded}
		<slot />
	{/if}
	<a
		href="/"
		on:click|preventDefault={() => window.location.replace('/')}
		class="uid"
		title="Try Your Luck by this Simulator"
	>
	
	</a>
</main>

<Iklan type="pop" />

<style global>
	@import '../../node_modules/overlayscrollbars/css/OverlayScrollbars.css';

	@font-face {
		font-family: 'GI_Global_Web';
		src: url('/fonts/optimized_global_web.woff2') format('woff2');
		font-weight: normal;
		font-style: normal;
	}

	@font-face {
		font-family: 'GI_JA_Web';
		src: url('/fonts/optimized_jp_web.woff2') format('woff2');
		font-weight: normal;
		font-style: normal;
	}

	@font-face {
		font-family: 'GI_TH_Web';
		src: url('/fonts/optimized_th_web.woff2') format('woff2');
		font-weight: normal;
		font-style: normal;
	}

	@font-face {
		font-family: 'GI_ZH_Web';
		src: url('/fonts/optimized_zh_web.woff2') format('woff2');
		font-weight: normal;
		font-style: normal;
	}

	:global(.os-theme-light > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle) {
		background-color: #d2c69c;
		opacity: 0.5;
	}
	:global(.os-theme-light > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle:hover),
	:global(.os-theme-light > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle:active) {
		background-color: #d2c69c;
		opacity: 1;
	}

	:global(.os-theme-light > .os-scrollbar-vertical) {
		width: 8px;
	}
	:global(.os-theme-light > .os-scrollbar-horizontal) {
		height: 8px;
	}

	main {
		display: block;
		width: var(--screen-width);
		height: var(--screen-height);
		font-family: var(--genshin-font);
		overflow: hidden;
	}

	.uid {
		display: block;
		position: fixed;
		bottom: 0px;
		right: 2em;
		z-index: 9999;
		color: #fff;
		text-shadow: 0 0 1.5px rgba(0, 0, 0, 0.7);
		font-family: Roboto, sans-serif;
		pointer-events: none;
	}

	.mobile .uid {
		right: 5%;
	}

	.preview .uid {
		pointer-events: unset;
		right: unset;
		left: 1rem;
		bottom: 1rem;
	}
</style>
