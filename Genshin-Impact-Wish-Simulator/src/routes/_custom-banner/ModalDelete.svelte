<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';

	import { wishPhase, version } from '$lib/data/wish-setup.json';
	import { imageCDN } from '$lib/helpers/assets';
	import { activeVersion, editID, editorMode, preloadVersion } from '$lib/store/app-stores';
	import { BannerManager } from '$lib/helpers/dataAPI/api-indexeddb';
	import { lazyLoad } from '$lib/helpers/lazyload';
	import { playSfx } from '$lib/helpers/audio/audio';
	import { onlineBanner } from '$lib/helpers/custom-banner';
	import Icon from '$lib/components/Icon.svelte';
	import ModalTpl from '$lib/components/ModalTpl.svelte';

	export let idToDelete = 0;

	let thumbnail = '';
	let isOwned = false;
	let showDeleteLoader = false;
	const dispatch = createEventDispatcher();

	const removeBanner = async () => {
		try {
			playSfx();
			showDeleteLoader = true;
			if (idToDelete === $editID) editorMode.set(false);

			const { patch, phase } = $activeVersion;
			const isActiveDeleted = patch.match(/custom/gi) && phase == idToDelete;
			const { status } = await onlineBanner.deleteBanner(idToDelete);
			if (isActiveDeleted) preloadVersion.set({ patch: version, phase: wishPhase });
			if (status != 'ok') throw new Error();

			dispatch('done');
			showDeleteLoader = false;
		} catch (e) {
			dispatch('error');
			showDeleteLoader = false;
		}
	};

	onMount(async () => {
		const { images = {}, hostedImages = {}, status } = await BannerManager.get(idToDelete);
		isOwned = status === 'owned';
		if (isOwned) return ({ thumbnail = '' } = images);

		const { thumbnail: thumb = '' } = hostedImages;
		thumbnail = imageCDN(thumb);
	});
</script>

<ModalTpl
	title="Remove Banner"
	disabled={showDeleteLoader}
	on:confirm={removeBanner}
	on:cancel={() => dispatch('cancel')}
>
	<div class="confirmation">
		{#if showDeleteLoader}
			<div class="row loader" in:fade>
				<Icon type="loader" />
			</div>
		{:else}
			<div class="wrapper" in:fade>
				<span> {$t('customBanner.deletePrompt')} </span>
				{#if isOwned}
					<small> {$t('customBanner.ownerDeleteNote')} </small>
				{:else}
					<small> {$t('customBanner.userDeleteNote')} </small>
				{/if}

				{#if thumbnail}
					<img
						use:lazyLoad={thumbnail}
						alt="Delete this banner"
						class="selectedToDelete"
						crossorigin="anonymous"
					/>
				{/if}
			</div>
		{/if}
	</div>
</ModalTpl>

<style>
	.confirmation {
		padding: 5%;
		height: 100%;
		align-items: center;
		justify-content: center;
		display: flex;
	}
	.confirmation small {
		display: block;
	}

	.selectedToDelete {
		width: 45%;
		margin-top: 3%;
	}

	.row.loader {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
