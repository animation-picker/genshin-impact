<script>
	import { t } from 'svelte-i18n';
	import { getContext } from 'svelte';
	import { toBlob } from 'html-to-image';
	import { playSfx } from '$lib/helpers/audio/audio';
	import ButtonGeneral from '$lib/components/ButtonGeneral.svelte';

	export let preview = '';

	const changeThumbnail = getContext('changeThumbnail');
	const filter = (node) => {
		const exclude = ['vision-picker', 'hoverable', 'customize', 'outfit-toggle'];
		if (node.classList) return !exclude.some((cl) => node.classList.contains(cl));
		return true;
	};

	const generate = async () => {
		playSfx();
		const node = document.querySelector('#cardEditor');
		const blob = await toBlob(node, { canvasHeight: 106.6, canvasWidth: 216, filter });
		changeThumbnail(blob);
	};
</script>

<div class="row">
	<label for="bannerdesign">{$t('customBanner.preview')}</label>
	<ButtonGeneral on:click={generate}>{$t('customBanner.generateImage')}</ButtonGeneral>
</div>
<div class="row">
	{#if preview}
		<img src={preview} alt="Preview Banner" crossorigin="anonymous" />
	{/if}
</div>

<style>
	.row {
		display: flex;
		width: 100%;
		align-items: center;
		margin-bottom: 2%;
	}

	img {
		max-width: 100%;
		height: auto;
	}
</style>
