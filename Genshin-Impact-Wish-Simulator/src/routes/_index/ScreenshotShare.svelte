<script>
	import { getContext, setContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { toBlob } from 'html-to-image';

	import { primogem } from '$lib/store/app-stores';
	import { initialAmount } from '$lib/data/wish-setup.json';
	import { localBalance, localConfig } from '$lib/helpers/dataAPI/api-localstore';
	import { playSfx } from '$lib/helpers/audio/audio';

	import Icon from '$lib/components/Icon.svelte';
	import ButtonGeneral from '$lib/components/ButtonGeneral.svelte';
	import ScreenshotResult from './_screenshot-result.svelte';

	export let shareURL = '';
	export let canshare = false;

	let blob;
	let showResult = false;
	let loading = false;
	let btnTxt = canshare ? $t('share') : $t('screenshot');

	let obtainScreen = false;
	let isFirstTimeShare = !localConfig.get('firstTimeShare');

	setContext('firsTimeShare', () => {
		isFirstTimeShare = false;
		obtainScreen = true;

		primogem.update((v) => {
			const newVal = v + initialAmount.shareReward;
			localBalance.set('primogem', newVal);
			return newVal;
		});
		localConfig.set('firstTimeShare', true);
	});

	const previewDOM = getContext('preview');
	const preview = (val) => (previewDOM ? previewDOM(val) : null);

	const filterShot = (node) => {
		const notIncluded = ['close', 'share', 'skip', 'outfit-toggle', 'zoomer'];
		if (node.classList) return !notIncluded.some((cl) => node.classList.contains(cl));
		return true;
	};

	const takeShot = async () => {
		try {
			if (loading) return;
			playSfx();
			preview(true);
			loading = true;
			btnTxt = `${$t('waiting')}...`;

			const node = document.querySelector('.wish-result');
			blob = await toBlob(node, { filter: filterShot });

			playSfx('camera');
			showResult = true;
			loading = false;
			preview(false);
			btnTxt = canshare ? $t('share') : $t('screenshot');
		} catch (e) {
			loading = false;
			preview(false);
			btnTxt = canshare ? $t('share') : $t('screenshot');
			console.error('failed to take screenshot', e);
		}
	};

	const openObtained = getContext('openObtained');
	setContext('closeShot', () => {
		showResult = false;
		playSfx('close');

		if (!obtainScreen) return;
		openObtained([{ item: 'primogem', qty: initialAmount.shareReward }]);
		obtainScreen = false;
	});
</script>

{#if showResult}
	<ScreenshotResult isFirstTime={isFirstTimeShare} {blob} {shareURL} {canshare} />
{/if}

{#if loading}
	<div class="progress" transition:fade={{ duration: 200 }}>
		<div class="row">
			<div class="loading" />
			<div class="text">{$t('capturing')}..</div>
		</div>
	</div>
{/if}

<div class="screenshot-button">
	{#if isFirstTimeShare && canshare}
		<span>
			{$t('rewardFirstShare', { values: { qty: initialAmount.shareReward } })}
			<Icon type="primogem" width="18px" style="margin-left: .5rem" />
		</span>
	{/if}
	<ButtonGeneral on:click={takeShot} disabled={loading}>
		{btnTxt}
	</ButtonGeneral>
</div>

<style>
	.screenshot-button {
		width: 100%;
	}
	.screenshot-button span {
		display: inline-flex;
		align-items: center;
		-webkit-text-stroke: 0.02rem #000;
	}

	.progress {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: var(--text-color);
		color: var(--tertiary-color);
		padding: 2rem;
		border: 1px solid var(--tertiary-color);
		border-radius: 0.5rem;
	}
	.progress .row {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.loading {
		border: 0.2rem solid #f3f3f3;
		border-top: 0.2rem solid var(--text-color);
		border-radius: 50%;
		width: 2rem;
		height: 2rem;
		margin-right: 1rem;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
