<script>
	import { getContext, onMount } from 'svelte';
	import Zoomist from 'zoomist';

	export let onBannerEdit = false;
	export let artURL = '';
	export let bannerPosition = { scale: 2, x: 0, y: 0 };

	let mainArt;
	let zoomist;
	let clientWidth = 0;
	let clientHeight = 0;

	let zoomPosition = bannerPosition || {};
	const zoomOption = {
		initScale: bannerPosition.scale || 2,
		maxScale: 5,
		slider: {
			el: '.zoom-slider',
			direction: 'vertical'
		},
		zoomer: {
			inEl: '.zoomin',
			outEl: '.zoomout',
			resetEl: null,
			disabledClass: 'zoomer-disabled'
		}
	};

	const calculatePosition = () => {
		const { x: X = 0, y: Y = 0 } = zoomPosition;

		// get px value from perentage
		const x = (X / 100) * clientWidth;
		const y = (Y / 100) * clientHeight;
		return { x, y };
	};

	const editBanner = getContext('editBanner');
	const setPosition = getContext('setPosition');

	const getPropVal = (el, key) => {
		const prop = getComputedStyle(el).getPropertyValue(key);
		const num = prop.split('px')[0] || 0;
		return parseFloat(num);
	};

	const setCoordinate = () => {
		const options = { draggable: false, wheelable: false, pinchable: false };
		const updatedOption = { ...zoomOption, ...options };

		// Get Image Position in Percentage
		const zoomistImage = mainArt.querySelector('.zoomist-image');
		const xPx = getPropVal(zoomistImage, '--translate-x');
		const yPx = getPropVal(zoomistImage, '--translate-y');
		const x = (xPx / clientWidth) * 100;
		const y = (yPx / clientHeight) * 100;
		zoomPosition = { x, y };
		setPosition('banner', { scale: zoomOption.initScale, x, y });

		zoomist.update(updatedOption);
		zoomist.moveTo(calculatePosition());
		editBanner(false);
	};

	const zoomistEvent = () => {
		zoomist.moveTo(calculatePosition());
		zoomist.on('zoom', (e, scale) => (zoomOption.initScale = scale));
	};

	const editPosition = () => {
		if (!zoomist) return;
		zoomist.update(zoomOption);
		zoomistEvent();
	};
	$: !onBannerEdit || editPosition();

	onMount(() => {
		zoomist = new Zoomist(mainArt, zoomOption);
		zoomistEvent();
	});
</script>

<div class="main-art" class:onBannerEdit bind:clientHeight bind:clientWidth>
	<div class="zoom-slider" />
	<div class="zoomer">
		<button class="zoomin"><i class="gi-zoom-in" /></button>
		<button class="zoomout"><i class="gi-zoom-out" /></button>
	</div>
	<button class="setpos" on:click={setCoordinate}><i class="gi-check" /></button>

	<div class="zoomist-container" bind:this={mainArt}>
		<div class="zoomist-wrapper">
			<div class="zoomist-image">
				<img src={artURL} alt="Uploaded Splash Art" crossorigin="anonymous" />
			</div>
		</div>
	</div>
</div>

<style>
	.main-art {
		--zoomist-slider-bar-side: calc(0.003 * var(--content-width));
		--zoomist-slider-bar-size: calc(0.4 * var(--content-height));
		--zoomist-slider-button-size: calc(0.015 * var(--content-width));
		--zoomist-slider-bar-color: #e9a540;
	}
	img {
		width: 100%;
		height: 100%;
		display: block;
		object-fit: contain;
		object-position: center;
	}

	.main-art,
	.zoomist-wrapper,
	.zoomist-image {
		width: 100%;
		height: fit-content;
		aspect-ratio: 1080/533;
	}

	.main-art {
		position: absolute;
		bottom: 0;
		left: 0;
	}

	.zoomist-wrapper {
		cursor: move;
		background-color: unset;
		mask-image: linear-gradient(to right, transparent 15%, black 40%, black 75%, transparent 85%);
	}

	.zoom-slider {
		position: absolute;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.75);
		padding: 2.5%;
		z-index: +20;
		display: none;
	}

	.zoomer {
		position: absolute;
		z-index: +20;
		top: 0;
		right: 0;
		display: flex;
		flex-direction: column;
		display: none;
	}

	.zoomer button,
	.setpos {
		font-size: calc(0.02 * var(--content-width));
		width: calc(0.06 * var(--content-width));
		display: inline-flex;
		justify-content: center;
		align-items: center;
		aspect-ratio: 1/1;
		background-color: rgba(0, 0, 0, 0.75);
		color: #fff;
		opacity: 0.75;
		transition: all 0.25s;
	}

	.setpos:hover,
	.zoomer button:hover:not(.zoomer-disabled) {
		opacity: 1;
	}
	.setpos:active,
	.zoomer button:active:not(.zoomer-disabled) {
		opacity: 1;
		transform: scale(0.9);
	}

	.zoomer :global(button.zoomer-disabled) {
		opacity: 0.6;
		color: rgba(255, 255, 255, 0.5);
	}

	.setpos {
		position: absolute;
		right: 0;
		bottom: 0;
		z-index: +20;
		display: none;
	}

	.onBannerEdit .zoomer {
		display: flex;
	}
	.onBannerEdit .zoom-slider,
	.onBannerEdit .setpos {
		display: unset;
	}
</style>
