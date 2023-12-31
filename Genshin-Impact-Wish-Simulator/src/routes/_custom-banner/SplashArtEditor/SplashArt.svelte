<script>
	import { dev } from '$app/environment';
	import { createEventDispatcher, getContext, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import Zoomist from 'zoomist';

	import { assets, viewportHeight, viewportWidth } from '$lib/store/app-stores';
	import { getPercentagePosition, getPxPosition } from '$lib/helpers/cssPosition';
	import { playSfx } from '$lib/helpers/audio/audio';
	import ItemInfo from '../../_wish/wish-result/_item-info.svelte';
	import ButtonModal from '$lib/components/ButtonModal.svelte';
	import ResultCard from './_result-card.svelte';

	export let character;
	export let rarity = 5;
	export let vision;
	export let artURL = '';
	export let position = {};

	export let preview = false;
	export let onshot = false;
	export let isOwned = false;
	export let weaponType = '';
	export let localName = '';
	export let hideInfo = false;

	let mainArt;
	let clientHeight = 0;
	let clientWidth = 0;
	let isChanged = false;
	let wishCard = false;

	const { splashArt: artPosition = { scale: 1.5, x: 0, y: 0 } } = position;
	const bg = preview ? $assets['detailbg.webp'] : $assets['splash-background.webp'];

	const calculateWrapperHeight = (vw, vh) => {
		if (vw < vh) return '85vw';
		if (vw < vh * 1.5) return '65vw';
		return '100%';
	};
	$: wrapperHeight = calculateWrapperHeight($viewportWidth, $viewportHeight);

	const dispatch = createEventDispatcher();
	const closeHandle = () => {
		playSfx('close');
		dispatch('close');
		return;
	};

	const toggleEye = getContext('toggleInfoHide');
	const setPosition = getContext('setPosition');
	const zoomOption = {
		initScale: artPosition.scale || 1,
		maxScale: 5,
		bounds: false,
		slider: {
			el: '.zoomSlider',
			direction: 'vertical'
		},
		zoomer: {
			inEl: '.art-zoomin',
			outEl: '.art-zoomout',
			resetEl: null,
			disabledClass: 'zoomer-disabled'
		}
	};

	const setCoordinate = () => {
		// Get Image Position in Percentage
		const zoomistImage = mainArt.querySelector('.zoomist-image');
		const zoomPosition = getPercentagePosition(zoomistImage, clientHeight, clientWidth);
		setPosition('splashArt', zoomPosition);
		isChanged = false;
		playSfx('click2');

		if (!dev) return;
		console.log('SplashArt Position: ', JSON.stringify(zoomPosition));
	};

	let zoomist;
	let isLoaded = false;
	const movePos = (artPosition) => {
		if (!isLoaded || !artPosition || typeof artPosition !== 'object') return;
		const pos = getPxPosition(artPosition, clientHeight, clientWidth);
		zoomist.zoomTo(artPosition?.scale || 1.1);
		zoomist.moveTo(pos);
	};

	onMount(() => {
		zoomist = new Zoomist(mainArt, zoomOption);
		isLoaded = true;
		zoomist.on('dragEnd', () => (isChanged = true));
		zoomist.on('zoom', () => (isChanged = true));
	});

	// Wish Card
	const nextArt = () => {
		playSfx();
		wishCard = true;
	};
</script>

<div
	class="splash-art wish-result"
	class:preview
	class:hideInfo
	style="--bg: url({bg});"
	transition:fade={{ duration: 250 }}
>
	{#if onshot}
		<div class="uid">WishSimulator.App</div>
	{/if}

	{#if preview && !isOwned}
		<div class="overlay">
			<div class="not-owned">
				<span>{$t('inventory.notOwned')}</span>
			</div>
		</div>
	{/if}

	<button class="close" on:click={closeHandle}>
		<i class="gi-close" />
	</button>

	{#if wishCard}
		<ResultCard {artURL} {character} {vision} {position} />
	{:else}
		{#if !(preview && !isOwned)}
			<div class="zoomer">
				<div class="slider">
					<div class="zoomSlider" />
				</div>
				<button class="art-zoomin"><i class="gi-zoom-in" /></button>
				<button class="art-zoomout"><i class="gi-zoom-out" /></button>
				{#if preview}
					<button on:click={toggleEye}> <i class="gi-eye{!hideInfo ? '' : '-slash'}" /></button>
				{/if}
			</div>
		{/if}

		{#if !preview}
			<div class="confirm">
				{#if isChanged}
					<ButtonModal light on:click={setCoordinate}>{$t('customBanner.setPosition')}</ButtonModal>
				{:else}
					<ButtonModal light on:click={nextArt}>{$t('customBanner.next')} &raquo;</ButtonModal>
				{/if}
			</div>
		{/if}

		<div
			class="zoomist-container"
			style="height: {wrapperHeight};"
			bind:this={mainArt}
			bind:clientHeight
			bind:clientWidth
		>
			<div
				class="zoomist-wrapper {weaponType}"
				style="overflow: visible;"
				class:notOwned={preview && !isOwned}
				class:weapon={weaponType}
			>
				<div class="zoomist-image">
					{#if weaponType}
						<img src={$assets[`bg-${weaponType}.webp`]} alt={weaponType} class="weaponbg" />
					{/if}

					<img
						src={artURL}
						alt={localName || character}
						crossorigin="anonymous"
						on:load={() => movePos(position?.splashArt || {})}
					/>
				</div>
				<div class="dragable" />
			</div>

			{#if !hideInfo}
				<ItemInfo
					custom
					staticMode
					itemName={localName || character}
					type="character"
					{rarity}
					{vision}
					{weaponType}
				/>
			{/if}
		</div>
	{/if}
</div>

<style>
	.splash-art {
		--zoomist-slider-bar-side: calc(0.003 * var(--screen-width));
		--zoomist-slider-bar-size: calc(0.35 * var(--screen-height));
		--zoomist-slider-button-size: calc(0.025 * var(--screen-height));
		--zoomist-slider-bar-color: #e9a540;
		--zoomist-slider-track-color: #999;
		--zoomist-slider-button-color: #fff;
	}

	.close {
		position: fixed;
		top: 30px;
		right: 2%;
		z-index: 10;
	}

	button:active:not(.zoomer-disabled) {
		transform: scale(0.9);
	}

	:global(.mobile) .close {
		top: 0.3rem;
		right: 6%;
	}

	.overlay {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		z-index: +10;
		font-size: calc(0.1 * var(--screen-height));
		color: var(--tertiary-color);
		opacity: 0.5;
	}
	.not-owned {
		max-width: var(--screen-height);
		transform: rotate(-30deg);
		line-height: 0.9;
	}
	.notOwned {
		filter: brightness(40%);
	}

	.splash-art {
		background-image: var(--bg);
		background-size: cover;
		background-position: center;
		position: fixed;
		top: 0;
		left: 0;
		z-index: +15;
	}

	.zoomist-container {
		aspect-ratio: 1/1;
		opacity: 1;
		transition: opacity 0.25s;
	}

	.splash-art,
	.zoomist-wrapper,
	.zoomist-image {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.zoomist-wrapper {
		--scale: 1.5;
		--translate-x: 0px;
		--translate-y: 0px;
		cursor: move;
		background-color: unset;
		position: relative;
	}

	.zoomist-wrapper.weapon {
		--scale: 1.1;
	}

	.dragable {
		position: absolute;
		width: var(--screen-width);
		height: var(--screen-height);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.zoomist-wrapper::after {
		position: absolute;
		content: 'Best Visible Area';
		text-align: right;
		font-size: 100%;
		color: #fff;
		filter: drop-shadow(0 0 0.1rem #000);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: calc(100% - 4px);
		height: calc(100% - 4px);
		border: 2px dashed #fff;
		opacity: 0;
		transition: opacity 0.25s;
	}

	.splash-art:not(.preview) .zoomist-wrapper:hover::after {
		opacity: 1;
	}

	.zoomist-image {
		transform: translate(var(--translate-x, 0px), var(--translate-y, 0px)) scale(var(--scale, 0));
	}

	img {
		width: 100%;
		height: 100%;
		display: block;
		object-fit: contain;
		object-position: center;
	}

	.weapon img {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.weapon img:not(.weaponbg) {
		filter: drop-shadow(0.6rem 0.6rem 0.05rem rgba(0, 0, 0, 0.9));
	}

	.weapon img.weaponbg {
		height: 80%;
	}

	.catalyst img:not(.weaponbg) {
		height: 40%;
	}

	.polearm img:not(.weaponbg) {
		transform: translate(-53%, -35%) scale(1.2) !important;
	}

	.slider {
		display: grid;
		background-color: rgba(255, 255, 255, 0.75);
		padding: 1rem 0;
		transition: background 0.25s, opacity 0.25s;
	}

	.slider:hover {
		background-color: #fff;
	}

	.zoomSlider {
		padding: 2%;
		display: flex;
		justify-self: center;
	}

	.zoomer {
		position: absolute;
		z-index: +20;
		bottom: 50%;
		right: 2%;
		transform: translateY(50%);
		display: flex;
		flex-direction: column;
	}

	.zoomer button {
		font-size: calc(0.035 * var(--screen-height));
		width: calc(0.075 * var(--screen-height));
		display: inline-flex;
		justify-content: center;
		align-items: center;
		aspect-ratio: 1/1;
		background-color: #fff;
		color: #000;
		opacity: 0.75;
		transition: all 0.25s;
		line-height: 0;
	}

	.zoomer button:hover:not(.zoomer-disabled) {
		opacity: 1;
	}
	.zoomer button:active:not(.zoomer-disabled) {
		opacity: 1;
		transform: scale(0.9);
	}

	.zoomer :global(button.zoomer-disabled) {
		opacity: 0.6;
		color: rgba(0, 0, 0, 0.5);
	}

	.confirm {
		position: absolute;
		z-index: +5;
		bottom: 7.5%;
		right: 5%;
	}

	:global(.mobile) .confirm {
		transform: scale(0.8);
	}

	.uid {
		left: unset;
		right: 5%;
		width: fit-content;
		font-size: x-large;
		font-family: var(--gi-font);
	}

	.hideInfo .slider,
	.hideInfo .art-zoomin,
	.hideInfo .art-zoomout {
		opacity: 0;
	}
</style>
