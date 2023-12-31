<script>
	import { getContext, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { check, loadAnimation, loadProggress } from '$lib/helpers/meteor-loader';
	import { assets, autoskip } from '$lib/store/app-stores';
	import { localConfig } from '$lib/helpers/dataAPI/api-localstore';
	import { playSfx } from '$lib/helpers/audio/audio';
	import ButtonGeneral from '$lib/components/ButtonGeneral.svelte';

	let onProgress = false;
	let rarity = 3;
	let progress = 0;
	let totalItem;
	let itemIndex;
	$: ({ rarity, progress, itemIndex, totalItem } = $loadProggress);
	$: percentage = ((itemIndex * 100 + progress) / (totalItem * 100)) * 100;

	const readyToPull = getContext('readyToPull');
	$: ready = $readyToPull;

	onMount(async () => {
		const isReady = localConfig.get('autoskip') || (await check());
		readyToPull.set(isReady);
	});

	const skipMeteor = () => {
		playSfx();
		autoskip.set(true);
		readyToPull.set(true);
		localConfig.set('autoskip', true);
	};

	const preloadMeteor = async () => {
		playSfx();
		onProgress = true;
		const data = await loadAnimation();
		assets.update((v) => {
			data.forEach(({ asset, url }) => (v[asset] = url));
			return v;
		});
		readyToPull.set(true);
		onProgress = false;
	};

	if (!ready) {
		preloadMeteor();
	}

</script>

<!-- {#if !ready}
	<div class="tooltip" transition:fade={{ duration: 250 }}>
		{#if onProgress}
			<div class="loader">
				<caption class="load-text" style="position: relative;">
					{@html $t('wish.loadMeteorMsg', { values: { star: rarity } })}
				</caption>
				<div class="progress-bar" style="--per:{percentage}%">
					<span />
				</div>
				<div class="percentage">
					{percentage.toFixed(0)}%
				</div>
			</div>
		{:else}
			<div class="prompt-text">
				{@html $t('wish.meteorNotLoaded')}
				<small>
					{$t('wish.preloadFilesMsg')}
				</small>
			</div>
			<div class="options">
				<ButtonGeneral dark on:click={preloadMeteor}>
					{$t('wish.loadMeteor')}
				</ButtonGeneral>
				<ButtonGeneral dark on:click={skipMeteor}>
					{$t('wish.skipMeteor')}
				</ButtonGeneral>
			</div>
		{/if}
	</div>
{/if} -->

<style>
	.tooltip {
		max-width: 90%;
		width: 300px;
		position: fixed;
		bottom: 12%;
		right: 5%;
		z-index: +100;
		background-color: #fbf6ee;
		border: 2px solid #ddd5c8;
		padding: 2% 2% 1.5%;
		border-radius: 0.5rem;
		font-size: 85%;
	}

	@media screen and (min-width: 900px) {
		.tooltip {
			width: 400px;
		}
	}

	.prompt-text :global(span),
	.loader :global(span) {
		color: var(--color-second);
		position: relative;
	}

	.tooltip :global(span) {
		color: #f0b164;
	}

	small {
		display: block;
		padding: 2%;
		opacity: 0.8;
	}

	.loader {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.load-text::after {
		content: '.';
		position: absolute;
		right: 0;
		transform: translateX(100%);
		bottom: 0;
		animation: dot 3s infinite;
	}

	.progress-bar {
		width: 100%;
		height: 0.2rem;
		background-color: #ccc;
		margin: 3% 0;
		position: relative;
		border-radius: 1rem;
	}

	.progress-bar span {
		border-radius: inherit;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: var(--per);
		height: 120%;
		background-image: linear-gradient(to left, #898e9d, #4a5265);
		box-shadow: 0 0 0.1rem #fff;
		transition: width 0.05s;
	}

	.options {
		padding: 2% 1% 0;
		text-align: center;
	}
	.tooltip :global(button) {
		font-size: 80%;
		margin: 1%;
		padding: 2% 5%;
	}

	@keyframes dot {
		0% {
			content: '.';
		}
		25% {
			content: '..';
		}
		50% {
			content: '...';
		}
		100% {
			content: '';
		}
	}
</style>
