<script>
	import { getContext } from 'svelte';
	import { fade, fly, scale } from 'svelte/transition';
	import { saveAs } from 'file-saver';

	import { APP_TITLE } from '$lib/env';
	import { isMobile } from '$lib/store/app-stores';
	import { playSfx } from '$lib/helpers/audio/audio';
	import { copy } from '$lib/helpers/nameText';

	export let canshare = false;
	export let isFirstTime = false;
	export let shareURL = '';
	export let blob;

	$: shareLink = shareURL || window.location.origin;
	let shareText = 'Come and try this Genshin Impact Wish Simulator!';
	let showToast = false;

	const closeShot = getContext('closeShot');
	const firstTime = getContext('firsTimeShare');

	const addFunds = () => {
		if (!isFirstTime) return;
		firstTime();
	};

	const DOMURL = window.URL || window.webkitURL;
	$: screenshotURL = DOMURL.createObjectURL(blob);

	const copyHandle = async () => {
		playSfx();
		copy(shareLink);
		showToast = true;
		const t = setTimeout(() => {
			showToast = false;
			clearTimeout(t);
		}, 2000);
		addFunds();
	};

	const saveHandler = () => {
		playSfx();
		saveAs(blob, `WishSimulator.App - ${new Date().toLocaleString()}.png`);
		addFunds();
	};

	const facebookHandle = () => {
		playSfx();
		const url = `https://www.facebook.com/sharer/sharer.php?u=${shareLink}&quote=${shareText}`;
		window.open(url, '_blank');
		addFunds();
	};

	const twitterHandle = () => {
		playSfx();
		const url = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareLink}`;
		window.open(url, '_blank');
		addFunds();
	};

	const webShareHandle = async () => {
		try {
			playSfx();
			const generalDataToShare = {
				title: APP_TITLE,
				text: shareText,
				url: shareLink
			};

			const files = new File([blob], `WishSimulator.App - ${new Date().toLocaleString()}.png`, {
				type: blob.type,
				lastModified: new Date().getTime()
			});
			const dataWithPic = { ...generalDataToShare, files: [files] };
			const attachPic = navigator?.canShare(dataWithPic);
			const dataToShare = attachPic && $isMobile ? dataWithPic : generalDataToShare;

			await navigator.share(dataToShare);
			addFunds();
		} catch (e) {
			console.error('Abort Sharing', e);
		}
	};
</script>

<div class="screenshot" out:fade={{ duration: 200 }}>
	<button class="close" on:click={closeShot}>
		<i class="gi-close" />
	</button>

	<div class="wrapper" in:scale={{ opacity: 1, start: 1.1 }}>
		<div class="letshare">
			<!-- {#if canshare}
				<div class="copy">
					<span class="text">{shareLink}</span>
					<button title="Copy link" on:click={copyHandle}> <i class="gi-link" /> </button>
				</div>
			{/if} -->

			<button class="save" title="Save To Your Device" on:click={saveHandler}>
				<i class="gi-save" />
			</button>

			{#if canshare}
				<div class="divider" />
				<button class="save" title="Share to Twitter" on:click={twitterHandle}>
					<i class="gi-twitter" />
				</button>
				<button class="save" title="Share to Facebook" on:click={facebookHandle}>
					<i class="gi-facebook" />
				</button>
				<button class="save" title="More Options" on:click={webShareHandle}>
					<i class="gi-dot-3" />
				</button>
			{/if}
		</div>

		<picture>
			<img src={screenshotURL} alt="screenshot" on:contextmenu|stopPropagation />
		</picture>
	</div>

	{#if showToast}
		<div class="toast" in:fly={{ y: 10 }} out:fade>Copied to Clipboard</div>
	{/if}
</div>

<style>
	.screenshot {
		width: 100vw;
		height: var(--screen-height);
		position: fixed;
		z-index: 998;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.45);
		backdrop-filter: blur(10px);
	}
	.screenshot::after {
		content: '';
		display: block;
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: #fff;
		pointer-events: none;
		animation: flash forwards 1s;
	}

	.screenshot .wrapper {
		width: 75%;
		max-height: 75%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		box-shadow: 0 0 3px rgba(255, 255, 255, 0.8);
	}

	picture {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		padding: 0.2rem;
		background-color: #fff;
	}

	.screenshot img {
		max-height: 100%;
		max-width: 100%;
	}

	.divider {
		background-color: #fff;
		height: 1.7rem;
		width: 0.1rem;
		display: inline-block;
		margin: 0 0.6rem;
	}

	.toast {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: inline-block;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		background-color: rgba(173, 128, 65, 0.8);
		color: #fff;
		font-size: 0.75rem;
	}

	button:active {
		transform: scale(0.9);
	}

	button:active,
	button:hover {
		background-color: #fff !important;
	}

	.close {
		position: fixed;
		top: 30px;
		right: 2%;
	}

	:global(.mobile) .close {
		top: 0.3rem;
		right: 6%;
	}
	:global(.mobile) .letshare {
		transform: scale(0.8) translate(10%, -120%);
	}

	.letshare {
		position: absolute;
		top: 0;
		right: 0;
		width: 100%;
		transform: translate(0, -120%);
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.letshare button {
		padding: 0;
		border-radius: 100%;
		z-index: 10;
		aspect-ratio: 1 / 1;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		line-height: 0;
		margin: 0 0.2rem;
		font-size: 1.3rem !important;
		background-color: #e0ddd4;
		min-width: 2.2rem;
		transition: all 0.2s;
	}

	.copy {
		display: inline-flex;
		align-items: center;
	}

	.copy span {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		display: inline-block;
		width: 200rem;
		max-width: 30vw;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	@keyframes flash {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>
