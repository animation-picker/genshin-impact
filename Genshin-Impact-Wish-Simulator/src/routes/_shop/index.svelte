<script>
	import { getContext, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import hotkeys from 'hotkeys-js';

	import { activeVersion } from '$lib/store/app-stores';
	import { ownedOutfits } from '$lib/helpers/dataAPI/api-localstore';
	import { getSplashArtData, outfitsForThisPatch } from '$lib/helpers/outfit';
	import { APP_TITLE } from '$lib/env';
	import { playSfx } from '$lib/helpers/audio/audio';

	import Background from '$lib/components/RandomBackground.svelte';
	import Header from './_header.svelte';
	import Aside from './_aside.svelte';
	import ModalExchange from './_modal-exchange.svelte';
	import GenesisTopup from './genesis-topup/GenesisTopup.svelte';
	import PaimonBargains from './paimon-bargains/PaimonBargains.svelte';
	import Donate from './donate/Donate.svelte';
	import Recomended from './recomended/Recomended.svelte';
	import CharacterOutfits from './character-outfit/CharacterOutfits.svelte';
	import WishResult from '../_wish/wish-result/WishResult.svelte';

	$: title = $t('title', { default: APP_TITLE });

	// Exchange Modal
	let exchangeData = {};
	let showExchangeModal = false;

	setContext('closeExchageModal', () => (showExchangeModal = false));
	const openModal = (data) => {
		exchangeData = data;
		showExchangeModal = true;
	};
	setContext('openExchangeModal', openModal);

	// Outfit Manager
	const { patch } = $activeVersion;
	const filteredOutfit = outfitsForThisPatch({ patch });
	const outfits = writable(filteredOutfit);
	setContext('outfits', outfits);

	let splashArtData = {};
	let showSplashArt = false;
	const buyOutfit = () => {
		const { itemToExchange: outfitName } = exchangeData;
		const outfitData = getSplashArtData(outfitName);
		splashArtData = { isOutfit: true, list: [outfitData] };

		// Update Outfit Status
		ownedOutfits.set({ outfitName, isSet: true, characterName: outfitData.name });
		outfits.update((arr) => {
			const setOwned = (d) => (d.name === outfitName ? { ...d, isOwned: true } : d);
			return arr.map(setOwned);
		});
		showSplashArt = true;
	};
	setContext('buyOutfit', buyOutfit);

	const closeResult = () => {
		playSfx('close');
		showSplashArt = false;
	};
	setContext('closeResult', closeResult);

	// Shop Group Navigation
	let contentHeight;
	let activeShop = 'genesis';
	let showAside = false;

	const asideToggle = () => {
		playSfx(showAside ? 'close' : 'click');
		showAside = !showAside;
	};
	setContext('asideToggle', asideToggle);

	const selectShopMenu = (selected) => {
		if (activeShop === selected) return;
		activeShop = selected;
		showAside = !showAside;
		playSfx('shopnav');
	};
	setContext('selectShopMenu', selectShopMenu);

	// Shortcut
	const navigate = getContext('navigate');
	hotkeys('esc', 'shop', (e) => {
		e.preventDefault();
		if (showSplashArt) return closeResult();
		playSfx('close');
		navigate('index');
	});
</script>

<svelte:head>
	{#if activeShop === 'genesis'}
		<title>{$t('shop.buyGenesisHeading')} | {title}</title>
	{:else if activeShop === 'recomended'}
		<title>{$t('shop.recomendedHeading')} | {title}</title>
	{:else if activeShop === 'outfits'}
		<title>{$t('outfit.heading')} | {title}</title>
	{:else if activeShop === 'donate'}
		<title>Donate | {title}</title>
	{:else}
		<title>{$t('shop.paimonHeading')} | {title}</title>
	{/if}
</svelte:head>

<!-- outfit Splash Art -->
{#if showSplashArt}
	<div class="wish-container">
		<WishResult {...splashArtData} skip />
	</div>
{/if}
<!-- End Outfit Splash Art -->

{#if showExchangeModal}
	<ModalExchange data={exchangeData} />
{/if}

<section>
	<Background />
	<div class="container" out:fade={{ duration: 250 }}>
		<Aside isOpen={showAside} />

		<div class="items-container">
			<Header {activeShop} />

			<div
				class="item-body"
				in:fade={{ duration: 300 }}
				bind:clientHeight={contentHeight}
				style="--content-height:{contentHeight}px"
			>
				{#if activeShop === 'genesis'}
					<GenesisTopup />

					<!-- Recomended Item -->
				{:else if activeShop === 'recomended'}
					<!-- <Recomended {recentlyBuyIndex} /> -->
					<Recomended />

					<!-- Characters Outfits -->
				{:else if activeShop === 'outfits'}
					<CharacterOutfits />

					<!-- Donate -->
				{:else if activeShop === 'donate'}
					<Donate />

					<!-- Paimon Bargains -->
				{:else if activeShop === 'paimon-bargains'}
					<PaimonBargains />
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	.wish-container {
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 10;
		top: 0;
		left: 0;
	}

	section {
		width: 100vw;
		height: var(--screen-height);
		display: block;
		position: relative;
		font-size: 1rem;
		background-color: var(--text-color);
	}

	.item-body {
		height: 100%;
		overflow-y: auto;
	}

	:global(.mobile) section {
		font-size: 0.8rem;
	}

	section::after {
		position: absolute;
		content: '';
		display: block;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.2);
		z-index: -1;
	}

	.container {
		display: flex;
		padding: 0 3% 0 0;
		position: relative;
		z-index: +2;
		width: 100%;
		height: 100%;
	}

	:global(.mobile) .container {
		padding: 0 2%;
	}

	@media screen and (max-width: 745px) {
		.container {
			padding: 0 3%;
		}
	}

	.items-container {
		width: 100%;
	}
</style>
