<script>
	import { t } from 'svelte-i18n';
	import { fade } from 'svelte/transition';
	import { getContext, onMount } from 'svelte';
	import {
		activeVersion,
		assets,
		editID,
		editorMode,
		preloadVersion,
		proUser,
		viewportWidth
	} from '$lib/store/app-stores';
	import { BannerManager } from '$lib/helpers/dataAPI/api-indexeddb';
	import { randomNumber as rng } from '$lib/helpers/gacha/itemdrop-base';
	import { playSfx } from '$lib/helpers/audio/audio';
	import { pushToast } from '$lib/helpers/toast';

	import ButtonModal from '$lib/components/ButtonModal.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import ModalDelete from '../_custom-banner/ModalDelete.svelte';

	let headerHeight;
	let rowWidth = 0;
	$: itemWidth = $viewportWidth > 640 ? rowWidth / 3 : rowWidth / 2;

	let ready = false;
	let showNote = false;
	let customList = [];

	const toggleInfo = () => {
		playSfx();
		showNote = !showNote;
	};

	const idb = BannerManager;
	onMount(async () => {
		const ownedBanner = await idb.getListByStatus('owned');
		const list = ownedBanner.map((d) => {
			const { character, images, rateup = [], bannerName } = d;
			const { artURL } = images || {};
			d.complete = !!artURL && !!character && rateup.length > 0 && !!bannerName;
			return d;
		});

		customList = (list || []).sort(({ lastModified: a }, { lastModified: b }) => {
			return new Date(b) - new Date(a);
		});

		ready = true;
		showNote = customList.length < 1;
	});

	const selectMenu = getContext('selectMenu');
	const handleClose = getContext('handleMenu');
	const putNewData = () => {
		return idb.put({
			status: 'owned',
			itemID: rng(111111111, 999999999),
			createdAt: new Date().toISOString()
		});
	};

	const customizeBanner = async (bannerID) => {
		playSfx();
		handleClose('mute');

		const id = bannerID || (await putNewData());
		editID.set(id);
		editorMode.set(true);
	};

	let showModal = false;
	let idToDelete = 0;

	const selectToDelete = (id) => {
		if (!id) return;
		playSfx('modal');
		idToDelete = id;
		showModal = true;
	};

	const cancelModal = () => {
		showModal = false;
		idToDelete = 0;
		playSfx('close');
	};

	const deleteError = () => {
		const message = $t('customBanner.deleteFailed');
		pushToast({ message, type: 'error' });
	};
	const deleteDone = () => {
		customList = customList.filter(({ itemID }) => itemID != idToDelete);
		const message = $t('customBanner.bannerRemoved');
		pushToast({ message, type: 'success' });
		showModal = false;
		idToDelete = 0;
	};

	const wishBanner = (id) => {
		playSfx();
		handleClose('mute');
		const { patch, phase } = $activeVersion;
		if (patch === 'Custom' && phase === id && !$editorMode) return;
		preloadVersion.set({ patch: 'Custom', phase: id });
	};
</script>

{#if showModal}
	<ModalDelete {idToDelete} on:done={deleteDone} on:error={deleteError} on:cancel={cancelModal} />
{/if}

<div
	class="content-container"
	in:fade={{ duration: 200 }}
	style="--bg-icon:url('{$assets['modal-bg-icon.png']}');
  --item-width:{itemWidth}px; --height:{headerHeight}px"
	bind:clientWidth={rowWidth}
>
	<div class="header" bind:clientHeight={headerHeight}>
		{#if ready && !showNote}
			<h1>
				<span> {$t('customBanner.yourBanners')} </span>
				<button class="question" on:click={toggleInfo}>i</button>
			</h1>
		{:else}
			<h1><span> {$t('customBanner.createBanner')} </span></h1>
		{/if}

		{#if customList.length > 3 && !$proUser && !showNote}
			<div class="notice">
				{$t('customBanner.limitation')}
			</div>
		{/if}
	</div>

	<div class="wrapper" class:ready>
		{#if !ready}
			<div class="row loader">
				<Icon type="loader" />
			</div>
		{:else}
			{#if showNote}
				<div class="disclaimer" transition:fade|local={{ duration: 250 }}>
					<article>
						<p>
							I will be monitoring this Feature over the coming period. If this feature is not found
							to be useful or is misused to share inappropriate content, I may limit or even disable
							it. I hope you are willing to provide feedback to help improve the quality of this
							simulator site.
						</p>
						<p>
							Every banner you add is saved in your browser's memory. <b>WishSimulator.App</b> does not
							collect or store your banner data in cloud storage unless you click the Share Button.
						</p>
						<p>
							<b>WishSimulator.App</b> does not collect your personal information. So, if an
							incident occurs on your device and causes your browser to clear your local storage,
							you will also lose all your data, and you will not be able to edit the banner(s) you
							have created.
							<u>In such a case, what you can do is create a new custom banner</u>.
						</p>
					</article>
					<ButtonModal width="200px" on:click={toggleInfo}>Create Banner</ButtonModal>
				</div>
			{:else}
				<div class="row" transition:fade|local={{ duration: 250 }}>
					{#if customList.length > 0}
						{#each customList as { itemID, vision, complete, images = { }, hostedImages, isChanged, blocked }}
							<div class="item" id={itemID}>
								{#if hostedImages}
									<i class="sync gi-{isChanged ? 'cloud-sync' : 'network'}" />
								{/if}
								<button
									class="banner-item"
									disabled={!complete || blocked}
									data-text={!complete
										? $t('customBanner.incomplete')
										: $t('customBanner.inappropriate')}
									on:click={!complete ? null : () => wishBanner(itemID)}
								>
									<img
										src={images?.thumbnail || $assets[`blank/${vision || 'pyro'}`]}
										alt="Custom Banner"
										crossorigin="anonymous"
									/>
								</button>
								<div class="action">
									{#if !(customList.length > 3 && !$proUser) && !blocked}
										<button class="edit" on:click={() => customizeBanner(itemID)}>
											<i class="gi-pen" /> <span>{$t('customBanner.edit')}</span>
										</button>
									{/if}
									<button class="delete" on:click={() => selectToDelete(itemID, images?.thumbnail)}>
										<i class="gi-delete" /> <span>{$t('customBanner.delete')}</span>
									</button>
								</div>
							</div>
						{/each}
					{/if}

					{#if $proUser || customList.length < 3}
						<div class="item blank">
							<button class="add" on:click={() => customizeBanner()}>
								<i class="gi-plus" />
								<span>{$t('customBanner.addBanner')}</span>
							</button>
						</div>
					{:else}
						<div class="item blank locked">
							<button class="add" on:click={() => selectMenu('proAccess')}>
								<i class="gi-lock" />
								<span>{$t('customBanner.memberToUnlock')}</span>
							</button>
						</div>
					{/if}
				</div>
			{/if}
			<!-- End ShowNote -->
		{/if}
	</div>
</div>

<style>
	.content-container {
		background-color: #fbf6ee;
		background-image: var(--bg-icon);
		background-repeat: no-repeat;
		background-size: 50%;
		background-position: 50% 60%;
		border-radius: 0.5rem;
		color: var(--text-color);
		padding: 2%;
	}

	@media screen and (max-width: 700px) {
		.content-container {
			background-size: 80%;
		}
	}

	.header h1 {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 120%;
	}

	.question {
		width: 25px;
		line-height: 0;
		margin-left: 1%;
		border-radius: 100%;
		aspect-ratio: 1/1;
		border: 1px solid var(--text-color);
		display: inline-flex;
		justify-content: center;
		align-items: center;
		transition: color 0.25s, background 0.25s, transform 0.25s;
	}

	.question:hover {
		background-color: var(--text-color);
		color: #fff;
	}

	.question:active {
		transform: scale(0.9);
	}

	:global(.mobile) .question {
		width: 20px;
		font-size: 80%;
	}

	/* Disclaimer */
	.disclaimer {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		padding: 2%;
		overflow: auto;
		z-index: +2;
		text-align: center;
	}

	article {
		padding: 2%;
		text-align: left;
		background-color: #fff;
		margin-bottom: 2%;
		border-radius: 0.5rem;
	}
	p {
		margin-bottom: 3%;
	}

	/*  */
	.notice {
		width: 100%;
		margin: 1% 0;
		padding: 2%;
		color: #fff;
		background-color: rgba(217, 67, 67, 0.75);
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		font-size: 100%;
		font-weight: bold;
	}

	.wrapper {
		width: 100%;
		height: calc(100% - var(--height));
		position: relative;
	}

	.wrapper.ready {
		overflow-y: auto;
	}

	.row {
		display: flex;
		width: 100%;
		align-items: center;
		margin-bottom: 2%;
		flex-wrap: wrap;
	}

	.item {
		margin: calc(0.04 * var(--item-width));
		margin-bottom: calc(0.12 * var(--item-width));
		aspect-ratio: 1080/533;
		width: 30%;
		position: relative;
	}

	@media screen and (max-width: 640px) {
		.item {
			width: 45%;
		}
	}

	.banner-item {
		width: 100%;
		height: 100%;
		display: flex;
		border: 2px solid #c3b8a5;
		position: relative;
	}

	.banner-item::after {
		content: '';
		position: absolute;
		z-index: +1;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		height: 100%;
		border-radius: calc(0.03 * var(--item-width));
		border: calc(0.015 * var(--item-width)) solid #eac343;
		opacity: 0;
		transition: opacity 0.15s;
	}
	.banner-item:disabled::after {
		content: attr(data-text);
		opacity: 1;
		background-color: rgba(0, 0, 0, 0.5);
		border-color: transparent;
		color: rgba(255, 255, 255, 0.85);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.banner-item:not(:disabled):hover::after {
		opacity: 1;
	}

	.sync {
		position: absolute;
		top: 0;
		right: 0;
		z-index: +1;
		line-height: 0;
		padding: calc(0.02 * var(--item-width));
		font-size: calc(0.065 * var(--item-width));
	}

	.gi-cloud-sync {
		background-color: #eac343;
	}
	.gi-network {
		background-color: #2f9cf4;
		color: #fff;
	}

	.item img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.action {
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		transform: translateY(120%);
		display: flex;
		justify-content: center;
	}

	.action button {
		font-size: 80%;
		line-height: 0;
		padding: 2% 5%;
		opacity: 0.8;
		display: inline-flex;
		align-items: center;
		border-radius: 2rem;
		color: #fff;
		margin: 0 1%;
		transition: transform 0.25s, background 0.25s;
	}

	.action button:active {
		transform: scale(0.9);
	}

	.action button i {
		transform: translateX(-15%);
		display: inline-block;
	}

	.edit {
		background-color: #00b5a9;
	}
	.edit:hover {
		background-color: #078f86;
	}

	.delete {
		background-color: #ff1c1c;
	}
	.delete:hover {
		opacity: 1;
		background-color: #cb1717;
	}

	.item.blank {
		border-radius: calc(0.02 * var(--item-width));
		transition: border 0.25s;
		border: 2px dashed #c3b8a5;
	}
	.item.blank:hover {
		border-color: #857d71;
	}

	.add {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		color: #c3b8a5;
		line-height: 0;
		transition: color 0.25s;
	}

	.add:hover {
		color: #857d71;
	}

	.add i {
		font-size: calc(0.1 * var(--item-width));
		margin-bottom: 2%;
	}
	.add span {
		font-size: calc(0.05 * var(--item-width));
		display: block;
		line-height: 100%;
	}
</style>
