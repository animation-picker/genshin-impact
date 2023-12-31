<script>
	import { getContext, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import hotkeys from 'hotkeys-js';

	import { localConfig } from '$lib/helpers/dataAPI/api-localstore';
	import { playSfx } from '$lib/helpers/audio/audio';
	import { assets } from '$lib/store/app-stores';
	import { pushToast } from '$lib/helpers/toast';

	export let rarity = 3;
	export let show = false;
	export let isSingle = false;

	let v3star;
	let v4starSingle;
	let v4star;
	let v5starSingle;
	let v5star;
	let showSkipButton = false;

	const showSplashArt = getContext('showSplashArt');
	const meteorEnd = ({ skip = false } = {}) => {
		showSplashArt({ skip });
		showSkipButton = false;
	};

	const skip = () => {
		playSfx();
		const videoDOMS = [v3star, v4starSingle, v4star, v5starSingle, v5star];
		meteorEnd({ skip: true });
		videoDOMS.forEach((video) => {
			video.load();
			video.style.display = 'none';
		});
	};

	onMount(() => {
		const videoDOMS = [v3star, v4starSingle, v4star, v5starSingle, v5star];
		videoDOMS.forEach((video) => {
			video.addEventListener('ended', () => {
				video.style.display = 'none';
				video.load();
				meteorEnd();
			});
		});
	});

	const showVideoHandle = async (rarity, single = true) => {
		const muted = localConfig.get('muted');
		let videoContent = v3star;
		if (single && rarity !== 3) {
			videoContent = rarity === 5 ? v5starSingle : v4starSingle;
		}
		if (!single && rarity !== 3) {
			videoContent = rarity === 5 ? v5star : v4star;
		}

		if (!videoContent || videoContent.error || isNaN(videoContent.duration)) {
			const message = $t('wish.result.meteorFailed');
			pushToast({ message });
			console.error("Can't play Meteor Animation because it cannot be loaded", videoContent.error);
			return meteorEnd();
		}
		videoContent.style.display = 'unset';
		videoContent.muted = !!muted;
		await videoContent.play();
		return;
	};

	$: if (show) showVideoHandle(rarity, isSingle);

	// Shortcut
	hotkeys('esc', 'index', (e) => {
		if (!show) return;
		e.preventDefault();
		skip();
	});

	hotkeys('enter', 'index', (e) => {
		if (!show) return;
		e.preventDefault();
		if (showSkipButton) return skip();
		showSkipButton = true;
	});
</script>

<div class="meteor-wrapper" class:show on:mousedown={() => (showSkipButton = true)}>
	<div class="video">
		<video bind:this={v3star} src={$assets['3star-single.mp4']} type="video/mp4">
			<track kind="captions" />
		</video>

		<video bind:this={v4starSingle} src={$assets['4star-single.mp4']} type="video/mp4">
			<track kind="captions" />
		</video>

		<video bind:this={v4star} src={$assets['4star-multi.mp4']} type="video/mp4">
			<track kind="captions" />
		</video>

		<video bind:this={v5starSingle} src={$assets['5star-single.mp4']} type="video/mp4">
			<track kind="captions" />
		</video>

		<video bind:this={v5star} src={$assets['5star-multi.mp4']} type="video/mp4">
			<track kind="captions" />
		</video>

		{#if showSkipButton}
			<button class="skip" on:click={skip} in:fade={{ duration: 250 }}>
				{$t('wish.result.skip')} <i class="gi-caret-up" />
			</button>
		{/if}
	</div>
</div>

<style>
	.meteor-wrapper {
		width: 100vw;
		height: var(--screen-height);
		position: absolute;
		top: 0;
		left: 0;
	}
	.meteor-wrapper.show {
		display: block;
		background-color: #fff;
	}
	.video {
		position: relative;
		width: 100vw;
		height: 100%;
	}

	.skip {
		position: absolute;
		top: 30px;
		right: 2%;
		color: #fff;
		font-size: 1.2rem;
		z-index: 10;
	}

	.gi-caret-up {
		display: inline-block;
		transform: rotate(90deg) translateX(-0.1rem);
		vertical-align: middle;
		margin-left: -0.5em;
	}

	:global(.mobile) .skip {
		font-size: 0.8rem;
		top: 0.3rem;
		right: 6%;
	}
	video {
		display: none;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 105%;
		height: 105%;
		object-fit: cover;
	}
</style>
