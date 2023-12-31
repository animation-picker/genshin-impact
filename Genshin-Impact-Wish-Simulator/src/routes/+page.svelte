<script>
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { writable } from 'svelte/store';
	import { getContext, onMount, setContext } from 'svelte';
	import hotkeys from 'hotkeys-js';

	import browserState from '$lib/helpers/browserState';
	import { assets, preloadVersion, showBeginner } from '$lib/store/app-stores';
	import { dailyWelkin, localConfig } from '$lib/helpers/dataAPI/api-localstore';
	import { importLocalConfig, setBannerVersionAndPhase } from '$lib/helpers/dataAPI/storage-reader';
	import { handleShowStarter, initializeBanner } from '$lib/helpers/banner-loader';
	import { userCurrencies } from '$lib/helpers/currencies';
	import { pauseSfx, playSfx } from '$lib/helpers/audio/audio';

	import ModalInitBanner from './_custom-banner/ModalInitBanner.svelte';
	import ModalWelcome from './_index/ModalWelcome.svelte';
	import WelkinCheckin from './_index/WelkinCheckin.svelte';
	import PreloadMeteor from './_index/PreloadMeteor.svelte';
	import MainWish from './_wish/index.svelte';

	let status = '';
	let pageActive = 'index';
	let showWelcomeModal = true;
	let shareID = '';

	let appReady = writable(false);
	let onWish = writable(false);

	setContext('onWish', onWish);
	setContext('appReady', appReady);
	setContext('query', writable('')); //query store to help finding a banner
	setContext('readyToPull', writable(true)); // Ready to pull if meteor animation are loaded already

	// Background animation
	let animatedBG = localConfig.get('animatedBG');
	const animatebg = () => (animatedBG = localConfig.get('animatedBG'));
	setContext('animateBG', animatebg);

	// Background Music
	$: if (!showWelcomeModal) {
		if (pageActive !== 'index' || $onWish) pauseSfx('wishBacksound');
		else playSfx('wishBacksound');
	}

	const bgmHandle = () => {
		if (showWelcomeModal) return; // User is not ready to Wish
		if ($onWish) return; // dont resume/pause if user on wishing
		if (pageActive !== 'index') return; // dont handle BGM if not index page

		const mode = document.visibilityState;
		if (mode === 'visible') return playSfx('wishBacksound');
		return pauseSfx('wishBacksound');
	};

	// Welkin Checkin
	let showWelkinScreen = false;
	const welkinCheckin = () => {
		const { remaining, diff, latestCheckIn } = dailyWelkin.getData();
		showWelkinScreen = remaining > 0 && remaining - diff >= 0 && diff > 0;
		if (latestCheckIn) return dailyWelkin.checkin();
	};
	setContext('closeWelkin', () => (showWelkinScreen = false));

	const startApp = () => {
		appReady.set(true);
		hotkeys.setScope('index');
		showWelcomeModal = false;
		welkinCheckin();
		playSfx();
	};
	// Welcome Modal && Custom Banner Modal
	setContext('startApp', startApp);

	// Menu
	let showMenu = false;
	const handleMenu = (act) => {
		showMenu = !showMenu;
		if (act === 'mute') return;
		playSfx(!showMenu ? 'close' : 'click');
	};
	setContext('handleMenu', handleMenu);

	// Page Navigation
	const navigate = (page) => {
		let beforeNavigate = pageActive;
		pageActive = page;
		showMenu = false;
		hotkeys.setScope(page);

		if (beforeNavigate === pageActive) return;
		hotkeys.deleteScope(beforeNavigate);

		if (beforeNavigate !== 'index') return browserState.back();
		browserState.set(page);
	};
	setContext('navigate', navigate);

	// Component Loader
	let AllBanners, GachaInfo, Inventory, Shop, Feedback, Menu, ObtainedItem, ModalConvert;
	const asyncLoadComponent = async () => {
		ObtainedItem = (await import('$lib/components/ObtainedItem.svelte')).default;
		ModalConvert = (await import('./_index/ModalConvert.svelte')).default;

		Menu = (await import('./_menu/index.svelte')).default;
		GachaInfo = (await import('./_gachainfo/index.svelte')).default;
		AllBanners = (await import('./_allbanners/index.svelte')).default;
		Inventory = (await import('./_inventory/index.svelte')).default;
		Shop = (await import('./_shop/index.svelte')).default;
		Feedback = (await import('./_feedback/index.svelte')).default;
	};

	// Switching Banner
	const bannerLoaded = getContext('bannerLoaded');
	const loadBanner = async (patchPhase) => {
		const initBanner = await initializeBanner(patchPhase);
		({ status } = initBanner || {});
		bannerLoaded();
	};

	onMount(() => {
		setBannerVersionAndPhase();
		preloadVersion.subscribe(loadBanner);
		showBeginner.subscribe(handleShowStarter);

		importLocalConfig();
		userCurrencies.init();
		asyncLoadComponent();
		animatebg();

		window.addEventListener('popstate', (e) => {
			if (e.state.page) return;
			if (pageActive === 'index') return;
			navigate('index');
		});
		document.addEventListener('visibilitychange', bgmHandle);

		// Check Custom Banner
		const { url } = $page;
		shareID = url.searchParams.get('banner');
	});

	// Obtained
	let showObtained = false;
	let obtainedData = {};
	const openObtained = (data) => {
		obtainedData = data;
		showObtained = true;
	};
	const closeObtained = () => {
		showObtained = false;
		obtainedData = {};
		playSfx('close');
	};
	setContext('openObtained', openObtained);
	setContext('closeObtained', closeObtained);

	// Modal to Convert Genesis
	let showConvertModal = false;
	setContext('openConvertModal', () => (showConvertModal = true));
	setContext('closeConvertModal', () => (showConvertModal = false));

	// Feedback
	let chatLoaded = false; // initial load
	let showChat = false; // toggle hide-show
	const chatToggle = () => {
		chatLoaded = true;
		showChat = !showChat;
		playSfx(showChat ? 'shopnav' : 'close');
	};
	setContext('chatToggle', chatToggle);
	$: hotkeys('o', pageActive, chatToggle);
</script>

{#if status !== 'ok'}
	error bos
{/if}

{#if animatedBG && pageActive.match(/(index|detail|history)/) && !$onWish}
	<video
		transition:fade|local={{ duration: 2000 }}
		muted
		loop
		autoplay
		type="video/webm"
		src={$assets['bg.webm']}
		poster={$assets['wish-background.webp']}
	>
		<track kind="captions" />
	</video>
{/if}

<!-- Main Banner -->
{#if pageActive === 'index'}
	<MainWish />

	{#if showMenu}
		<svelte:component this={Menu} />
	{/if}

	<!-- Select Banner -->
{:else if pageActive === 'allbanners'}
	<svelte:component this={AllBanners} />

	<!-- Wish Details -->
{:else if pageActive === 'details'}
	<svelte:component this={GachaInfo} page="details" />

	<!-- Wish Record -->
{:else if pageActive === 'history'}
	<svelte:component this={GachaInfo} page="history" />

	<!-- Inventory -->
{:else if pageActive === 'inventory'}
	<svelte:component this={Inventory} />

	<!-- Shop -->
{:else if pageActive === 'shop'}
	<svelte:component this={Shop} />
{/if}

{#if showObtained}
	<svelte:component this={ObtainedItem} data={obtainedData} />
{/if}

<!-- Utility -->
{#if showConvertModal}
	<svelte:component this={ModalConvert} />
{/if}

<!-- {#if chatLoaded}
	<svelte:component this={Feedback} show={showChat} />
{/if} -->

{#if showWelkinScreen}
	<WelkinCheckin />
{/if}

<!-- {#if showWelcomeModal}
	{#if shareID}
		<ModalInitBanner {shareID} />
	{:else}
		<ModalWelcome />
	{/if}
{/if} -->

<PreloadMeteor />

<style>
	video {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 20%;
	}
</style>
