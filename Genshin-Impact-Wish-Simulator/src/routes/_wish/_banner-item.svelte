<script>
	import { getContext, setContext } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import hotkeys from 'hotkeys-js';

	import { localrate } from '$lib/helpers/dataAPI/api-localstore';
	import { playSfx } from '$lib/helpers/audio/audio';
	import {
		activeBanner,
		bannerList,
		editID,
		editorMode as editBanner,
		isMobile,
		mobileMode,
		viewportHeight,
		viewportWidth,
		customData
	} from '$lib/store/app-stores';
	import { pushToast } from '$lib/helpers/toast';
	import ModalTpl from '$lib/components/ModalTpl.svelte';
	import BannerCard from './banner-card/BannerCard.svelte';
	import CustomEditor from '../_custom-banner/CustomEditor.svelte';
	import ModalDelete from '../_custom-banner/ModalDelete.svelte';

	$: landscape = $viewportWidth / 2.1 > $viewportHeight;
	$: tabletBannerStyle = landscape ? 'width: 90vh' : '';

	$: mobileBannerStyle = $mobileMode
		? `max-width: ${(150 / 100) * $viewportHeight}px;`
		: tabletBannerStyle;

	$: style =
		$viewportHeight > 800 ||
		$viewportHeight > $viewportWidth ||
		$viewportHeight / $viewportWidth > 0.5
			? 'align-items:center;'
			: '';

	const navigateBanner = (target) => {
		if (target === 'right') {
			if ($activeBanner >= $bannerList.length - 1) return;
			playSfx('changebanner');
			return activeBanner.update((n) => n + 1);
		}

		if (target === 'left') {
			if ($activeBanner <= 0) return;
			playSfx('changebanner');
			return activeBanner.update((n) => n - 1);
		}
	};

	// Probability Editor
	let editor = false;
	$: banner = $bannerList[$activeBanner]?.type;
	$: if (banner === 'beginner') editor = false;

	const editProb = () => {
		playSfx('bookflip');
		editor = !editor;
	};
	setContext('editprob', editProb);

	let showModalReset = false;
	let ModalDeleteCustom = false;

	setContext('showModalReset', () => {
		showModalReset = true;
	});

	const confirmModal = () => {
		playSfx('modal');
		playSfx('bookflip');
		localrate.reset(banner);
		showModalReset = false;
		editor = false;
	};

	const cancelModal = () => {
		playSfx('close');
		showModalReset = false;
		ModalDeleteCustom = false;
	};

	// Modal to Delete Custom banner
	setContext('deleteBanner', () => {
		ModalDeleteCustom = true;
		playSfx();
	});

	const deleteDone = () => {
		const message = 'Banner Removed';
		pushToast({ message, type: 'success' });
		ModalDeleteCustom = false;
	};
	const deleteError = () => {
		const message = 'Failed to Remove';
		pushToast({ message, type: 'error' });
	};

	// Shortcut
	const onWish = getContext('onWish');
	hotkeys('right,left,up,down', 'index', (e) => {
		if ($onWish) return;
		e.preventDefault();
		const [to] = hotkeys.getPressedKeyString();
		if (to === 'up') return navigateBanner('left');
		if (to === 'down') return navigateBanner('right');
		navigateBanner(to);
	});

	hotkeys('1,2,3,4,5', 'index', (e) => {
		if ($onWish) return;
		e.preventDefault();
		const to = hotkeys.getPressedKeyString();
		const bannerIndex = parseInt(to) - 1;
		if (to > $bannerList.length) return;
		activeBanner.set(bannerIndex);
		playSfx('changebanner');
	});
</script>

<div class="banner-container" {style} class:editMode={$editBanner}>
	{#if $editBanner}
		{#key $editID}
			<div class="banner-item" style={mobileBannerStyle} in:fly={{ x: 25, duration: 580 }}>
				<CustomEditor />
			</div>
		{/key}
	{:else}
		{#each $bannerList as data, index}
			{#if $activeBanner === index}
				<div
					class="banner-item"
					class:editorOpen={editor}
					class:fullscreen={$isMobile && $mobileMode}
					style={mobileBannerStyle}
					in:fly={{ x: 25, duration: 580 }}
				>
					<BannerCard {data} {editor} {index} fullscreenEditor={$isMobile && $mobileMode} />
				</div>
			{/if}
		{/each}

		<div class="navigate">
			{#if $activeBanner > 0}
				<button
					class="left"
					style="margin-right: auto;"
					on:click={() => navigateBanner('left')}
					transition:fade|local={{ duration: 200 }}
				>
					<i class="gi-arrow-left" />
				</button>
			{/if}

			{#if $activeBanner < $bannerList.length - 1}
				<button
					class="left"
					style="margin-left: auto;"
					on:click={() => navigateBanner('right')}
					transition:fade|local={{ duration: 200 }}
				>
					<i class="gi-arrow-right" />
				</button>
			{/if}
		</div>
	{/if}
</div>

{#if showModalReset}
	<ModalTpl title="Back to Default" on:cancel={cancelModal} on:confirm={confirmModal}>
		<div class="modal-content">
			<p>
				{@html $t('editor.resetPrompt', { values: { banner: $t(`wish.banner.${banner}`) } })}
			</p>
		</div>
	</ModalTpl>
{/if}

{#if ModalDeleteCustom}
	<ModalDelete
		idToDelete={$customData.itemID}
		on:cancel={cancelModal}
		on:done={deleteDone}
		on:error={deleteError}
	/>
{/if}

<style>
	.modal-content {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		font-family: var(--genshin-font);
		padding: 3%;
	}

	.banner-container {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	:global(.mobile) .banner-container {
		align-items: flex-end;
		padding: 0;
	}

	.banner-item {
		max-width: 900px;
		width: 80%;
		max-height: 75vh;
		aspect-ratio: 27/14;
		perspective: 1000px;
	}

	.editMode .banner-item {
		aspect-ratio: 1080/533;
		perspective: unset;
		position: relative;
	}

	.fullscreen.banner-item {
		perspective: unset;
	}

	.banner-item.editorOpen {
		z-index: +10;
	}

	.navigate {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 85%;
		transform: translate(-50%, -50%);
		display: flex;
		justify-content: space-between;
		transition: all 0.2s;
		pointer-events: none;
	}

	@media screen and (max-width: 1200px) {
		.navigate {
			width: 90%;
		}
	}

	@media screen and (max-width: 800px) {
		.navigate {
			width: 95%;
		}
	}

	.navigate button {
		color: #ece5d8;
		font-size: 2rem;
		line-height: 0;
		pointer-events: initial;
	}

	:global(.mobile) .navigate {
		display: none;
	}
</style>
