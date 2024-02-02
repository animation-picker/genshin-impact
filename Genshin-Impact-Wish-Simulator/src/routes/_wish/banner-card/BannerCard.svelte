<script>
	import { getContext, setContext } from 'svelte';
	import { fly } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { assets, isCustomBanner } from '$lib/store/app-stores';
	import { playSfx } from '$lib/helpers/audio/audio';

	import FrameBeginner from './_frame-beginner.svelte';
	import FrameCharacter from './_frame-character.svelte';
	import FrameWeapon from './_frame-weapon.svelte';
	import FrameStandard from './_frame-standard.svelte';
	import FrameCustom from './_frame-custom.svelte';
	import BannerImage from './_banner-image.svelte';
	import ProbEditor from './_probability-editor.svelte';

	export let data = {};
	export let index = -1;
	export let fullscreenEditor = false;
	export let editor = false;

	// prettier-ignore
	let type, featured, character, bannerName, rateup, textOffset, charTitle, vision, images, artPosition;
	// prettier-ignore
	$: ({ type, featured, character, bannerName, rateup, textOffset, charTitle, vision, images, artPosition, watermark } = data);

	let clientWidth;
	let clientHeight;

	let imageError = false;
	setContext('imageError', () => (imageError = true));
	const editProb = getContext('editprob');

	const navigate = getContext('navigate');
	const openDetails = () => {
		navigate('details');
		return playSfx();
	};
</script>

<div
	class="card"
	class:editor
	class:fullscreenEditor
	bind:clientWidth
	bind:clientHeight
	style="--content-width:{clientWidth}px; --content-height:{clientHeight}px"
>
	<div class="back" on:mousedown|self={editProb}>
		{#if editor}
			<ProbEditor {type} {fullscreenEditor} />
		{/if}
	</div>
	<div class="front">
		{#if $isCustomBanner}
			<BannerImage
				custom
				src={images?.artURL}
				alt={bannerName}
				wrapperClass="card-image skeleton"
				{artPosition}
				{vision}
			/>
			<div class="frame skeleton">
				<FrameCustom {bannerName} {character} {charTitle} {vision} {watermark} />
			</div>
		{:else if type === 'beginner'}
			<BannerImage
				src={$assets['beginner']}
				isError={imageError}
				alt="Weapon Banner"
				wrapperClass="card-image skeleton"
			/>
			<div class="frame skeleton">
				<FrameBeginner {character} />
			</div>
		{:else if type === 'weapon-event'}
			<BannerImage
				isError={imageError}
				src={$assets[bannerName]}
				alt="Weapon Banner"
				wrapperClass="card-image skeleton-event"
			/>
			<div class="frame skeleton-event">
				<FrameWeapon {featured} {rateup} {textOffset} />
			</div>
		{:else if type === 'character-event'}
			<BannerImage
				isError={imageError}
				src={$assets[bannerName]}
				alt="Character Event Banner"
				wrapperClass="card-image skeleton-event"
			/>
			{#if !bannerName || imageError}
				<div class="character" in:fly={{ x: 20, duration: 850 }}>
					<img
						class="splash-art"
						src={$assets[`splash-art/${character}`]}
						alt="character"
						on:error={(e) => e.target.remove()}
						crossorigin="anonymous"
					/>
				</div>
			{/if}
			<div class="frame skeleton-event">
				<FrameCharacter {character} {textOffset} {bannerName} event2={index === 2} />
			</div>
		{:else if type === 'standard'}
			<BannerImage
				isError={imageError}
				src={$assets[bannerName]}
				alt="Standard Banner"
				wrapperClass="card-image {imageError ? 'skeleton' : ''}"
			/>
			<div class="frame">
				<FrameStandard {bannerName} />
			</div>
		{:else if type === 'member'}
			<BannerImage
				isError={imageError}
				src={$assets[bannerName]}
				alt="Member Banner"
				wrapperClass="card-image {imageError ? 'skeleton' : ''}"
			/>
			<div class="frame">
				<FrameCharacter {bannerName} {character} {textOffset} />
			</div>
		{/if}

		<div class="info">
			<button class="detail" on:click={openDetails}> {$t('details.text')} </button>
			{#if type !== 'beginner'}
				<button class="gear" on:click={editProb}><i class="gi-gear" /></button>
			{/if}
		</div>
	</div>
</div>

<style>
	.card,
	.front,
	.back,
	.frame {
		width: 100%;
		height: fit-content;
		aspect-ratio: 27/14;
	}

	.back {
		position: absolute;
		transform: rotateX(180deg);
		z-index: +999;
		transition: all 0.5s;
	}

	.editor.fullscreenEditor .back {
		position: fixed;
		transform: unset;
		aspect-ratio: unset;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.25);
		display: flex;
		justify-content: center;
		align-items: center;
		backdrop-filter: blur(8px);
	}

	.front,
	.back {
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
	}

	.frame.skeleton-event,
	.card :global(.card-image.skeleton-event) {
		aspect-ratio: 1080/533;
	}

	.frame.skeleton,
	.card :global(.card-image.skeleton) {
		aspect-ratio: 738.55/382.95;
	}

	.card {
		position: relative;
	}

	.card:not(.fullscreenEditor) {
		transition: transform 0.5s;
		transform-style: preserve-3d;
	}

	.card.editor:not(.fullscreenEditor) {
		transform: rotateX(180deg);
	}

	.editor .front {
		pointer-events: none;
	}

	.frame,
	.card :global(.card-image) {
		position: absolute;
		bottom: 0;
		left: 0;
	}

	.character {
		position: absolute;
		height: 100%;
		right: 0;
		top: 0;
		overflow: hidden;
	}

	img.splash-art {
		height: 150%;
	}

	.info {
		position: absolute;
		left: 5%;
		bottom: 8%;
		display: flex;
		align-items: center;
		z-index: +10;
	}

	.info button {
		background-color: #eee8e3;
		color: rgba(0, 0, 0, 0.5);
		border-radius: 20px;
		border: #e2d7b6 0.1rem solid;
		font-size: calc(1.5 / 100 * var(--content-width));
		transition: background 0.25s, color 0.25s;
	}

	.info button:hover {
		background-color: #e0ddd4;
		color: rgba(0, 0, 0, 1);
	}

	.info button.gear {
		width: calc(3 / 100 * var(--content-width));
		font-size: calc(2 / 100 * var(--content-width));
		aspect-ratio: 1/1;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		line-height: 0;
		margin-left: calc(1 / 100 * var(--content-width));
	}

	.info button.detail {
		padding: calc(0.5 / 100 * var(--content-width)) calc(2.5 / 100 * var(--content-width));
	}
</style>
