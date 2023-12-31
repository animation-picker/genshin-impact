<script>
	import { dev } from '$app/environment';
	import { getContext, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import Zoomist from 'zoomist';
	import { assets } from '$lib/store/app-stores';
	import { playSfx } from '$lib/helpers/audio/audio';
	import { getPercentagePosition, getPxPosition } from '$lib/helpers/cssPosition';
	import SvgIcon from '$lib/components/SVGIcon.svelte';
	import ButtonModal from '$lib/components/ButtonModal.svelte';

	export let artURL = '';
	export let character = '';
	export let vision = '';
	export let position = {};

	let mainArt;
	let isChanged = false;
	let clientHeight = 1;
	let clientWidth = 0;
	const { wishCard: artPosition = { scale: 5, x: 40, y: 40 } } = position;

	const zoomOption = {
		initScale: artPosition.scale || 1,
		maxScale: 20,
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

	const editSplashArt = getContext('editSplashArt');
	const setPosition = getContext('setPosition');

	const setCoordinate = () => {
		playSfx();
		editSplashArt(false);
		if (!isChanged) return;

		// Get Image Position in Percentage
		const zoomistImage = mainArt.querySelector('.zoomist-image');
		const zoomPosition = getPercentagePosition(zoomistImage, clientHeight, clientWidth);
		setPosition('wishCard', zoomPosition);
		isChanged = false;

		if (!dev) return;
		console.log('WishCard Position', JSON.stringify(zoomPosition));
	};

	onMount(() => {
		clientWidth = (clientHeight * 7) / 30;

		const zoomist = new Zoomist(mainArt, zoomOption);
		const pos = getPxPosition(artPosition, clientHeight, clientWidth);
		zoomist.moveTo(pos);
		zoomist.on('dragEnd', () => (isChanged = true));
		zoomist.on('zoom', () => (isChanged = true));
	});
</script>

<svg viewBox="0 0 151.000000 656.000000" height="0" width="0" style="position: absolute;">
	<clipPath
		id="wishframe"
		transform="scale(0.00066225165562914 0.00015455950540958)"
		clipPathUnits="objectBoundingBox"
	>
		<path
			d="M734 6419 c-25 -29 -100 -76 -199 -127 -125 -64 -165 -117 -165 -217
			0 -22 -3 -50 -6 -63 -9 -33 -83 -72 -155 -82 -68 -10 -79 -19 -79 -67 0 -24
			-7 -37 -32 -54 -18 -12 -43 -34 -55 -48 l-22 -26 -1 -2502 c0 -1542 4 -2503 9
			-2503 5 0 13 -9 16 -20 4 -11 23 -28 43 -38 32 -15 37 -22 40 -57 4 -49 23
			-65 76 -65 47 0 113 -28 140 -58 12 -14 21 -45 26 -90 13 -117 54 -164 215
			-250 55 -28 114 -66 132 -82 18 -17 35 -30 39 -30 4 0 23 15 44 34 21 19 80
			56 131 82 153 79 197 131 210 252 4 39 13 70 25 84 27 30 93 58 140 58 53 0
			72 16 76 65 3 35 8 42 40 57 20 10 39 27 43 38 3 11 11 20 16 20 5 0 9 961 9
			2503 l-1 2502 -22 26 c-12 14 -37 36 -54 48 -26 17 -33 30 -33 54 0 48 -11 57
			-79 67 -72 10 -146 49 -155 82 -3 13 -6 41 -6 63 0 100 -40 153 -165 217 -106
			54 -153 84 -191 119 l-30 29 -20 -21z"
		/>
	</clipPath>
</svg>

<div class="zoomer">
	<div class="slider">
		<div class="zoomSlider" />
	</div>
	<button class="art-zoomin"><i class="gi-zoom-in" /></button>
	<button class="art-zoomout"><i class="gi-zoom-out" /></button>
</div>

<div class="confirm">
	<ButtonModal light on:click={setCoordinate}>
		{isChanged ? 'Set Position' : 'OK'}
	</ButtonModal>
</div>

<div class="container" in:fade>
	<div
		bind:clientHeight
		class="wishlist"
		style="--card-height:{clientHeight}px;--card-width:{clientWidth}px"
	>
		<div class="item-box" style="--bg:url({$assets['resultcard-bg.webp']})">
			<!--  -->
			<div id="wish1" class="item star5 character">
				<div class="new">{$t('wish.result.new')}</div>
				<div class="zoomist-container item-body" bind:this={mainArt}>
					<div class="zoomist-wrapper item-content">
						<div class="zoomist-image">
							<img src={artURL} alt={character} class="wishpic" crossorigin="anonymous" />
						</div>

						<div class="info">
							<div class="icon" style="width: 100%;">
								<SvgIcon name={vision} />
							</div>

							<div class="star">
								{#each Array(5) as _}
									<div class="i gi-star" />
								{/each}
							</div>
						</div>
					</div>
				</div>
			</div>

			<!--  -->
		</div>
	</div>
	<div class="shadows" style="--card-height: {clientHeight}px">
		<div class="shadow shadow5" />
	</div>
</div>

<style>
	.container {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	/* Wish List */
	.wishlist,
	.shadows {
		display: block;
		height: 40vw;
		max-height: 60vh;
		min-height: 40vh;
		width: 100%;
		padding: 0 20px;
		white-space: nowrap;
		text-align: center;
	}

	:global(.mobile) .wishlist,
	:global(.mobile) .shadows {
		min-height: 70vh;
	}

	:global(.mobile) .wishlist,
	:global(.mobile) .shadows {
		max-height: 72.5vh;
	}

	.item-box :global(.item),
	.shadow {
		height: 100%;
		aspect-ratio: 7/30;
		border-radius: 100%;
		position: relative;
	}

	.item-box {
		height: 100%;
		display: inline-block;
	}

	.shadows {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: -1;
	}

	.shadow {
		display: inline-block;
		height: 100%;
		border-radius: 100%;
	}

	.shadow.shadow5 {
		box-shadow: 0 0 4rem rgba(255, 255, 255, 0.5), 0 0 1rem rgb(249, 170, 2),
			0 0 1.4rem rgb(249, 170, 2), 0 0 2rem rgb(249, 121, 2);
		background-color: rgb(249, 170, 2);
		filter: unset;
	}

	/* Result List */
	.item-body {
		height: 100%;
		clip-path: url(#wishframe);
		margin: 0 0.5px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.star5 .item-body {
		background-image: linear-gradient(
			to bottom,
			rgb(249, 170, 2),
			rgb(255, 255, 255),
			rgb(249, 170, 2)
		);
	}

	.new {
		position: absolute;
		z-index: 10;
		display: block;
		top: 3%;
		left: 80%;
		transform: translateX(-50%);
		padding: 0 0.4rem;
		border-radius: calc(2 / 100 * var(--card-height)) 0;
		color: #fffa66;
		background-color: #c3882a;
		border: 1px solid #fffa66;
		font-size: calc(3 / 100 * var(--card-height));
	}

	.item-content {
		background-image: var(--bg);
		background-size: cover;
		background-position: center center;
		position: relative;
		cursor: move;
	}

	.item-content::after {
		content: '';
		display: block;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50%;
		background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0));
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

	.info {
		position: absolute;
		bottom: 10%;
		left: 0;
		width: 100%;
		z-index: 10;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.info .gi-star {
		color: #f7cf33;
		display: inline-block;
		font-size: calc(3.5 / 100 * var(--card-height));
	}
	.icon :global(svg) {
		width: 80%;
		aspect-ratio: 1/1;
	}

	/* Zoomist */
	.slider {
		display: grid;
		background-color: rgba(255, 255, 255, 0.75);
		padding: 1rem 0;
		transition: background 0.25s;
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
</style>
