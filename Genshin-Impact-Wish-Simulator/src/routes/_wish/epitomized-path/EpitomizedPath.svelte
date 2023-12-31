<script>
	import { getContext, onDestroy, onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import OverlayScrollbars from 'overlayscrollbars';
	import { t, json } from 'svelte-i18n';
	import {
		bannerList,
		viewportWidth,
		viewportHeight,
		activeVersion,
		activeBanner,
		assets,
		course
	} from '$lib/store/app-stores';
	import { fatepointManager } from '$lib/helpers/dataAPI/api-localstore';
	import { playSfx } from '$lib/helpers/audio/audio';

	import Modal from '$lib/components/ModalTpl.svelte';
	import ButtonModal from '$lib/components/ButtonModal.svelte';
	import FatepointSVG from './_svg-background.svelte';
	import InventoryItem from '../../_inventory/_inventory-item.svelte';
	import hotkeys from 'hotkeys-js';
	import { getWpDetails } from '$lib/helpers/gacha/itemdrop-base';

	$: half = $viewportWidth < 500;
	const weapons = $bannerList[$activeBanner].featured.map(({ name }) => getWpDetails(name));

	let itemWidth;
	$: defaultItemWidth = (16.5 / 100) * $viewportHeight;
	$: if (itemWidth < 150) itemWidth = 150;
	else itemWidth = defaultItemWidth;

	let clientWidth;
	let content;
	let weaponName = '';
	let selectedCourse = -1;

	onMount(() => {
		playSfx('bookflip');
		OverlayScrollbars(content, { sizeAutoCapable: false, className: 'os-theme-light' });
		course.subscribe(({ selected }) => {
			weaponName = weapons[selected]?.name;
			selectedCourse = selected;
		});
	});

	// Target Course
	let targetActive = null;
	const select = (i) => {
		playSfx('click2');
		targetActive = i;
	};

	const handleClose = getContext('handleEpitomizedModal');
	const closePath = () => {
		handleClose();
		playSfx('close');
		playSfx('bookflip');
	};

	const closeModal = () => {
		playSfx('close');
		showCancelConfirmation = false;
	};

	let showCancelConfirmation = false;
	const cancelCourse = () => {
		showCancelConfirmation = true;
		playSfx();
	};

	const setCourse = () => {
		if (targetActive === null) return;

		playSfx('click');
		const { patch, phase } = $activeVersion;

		// set to local
		const localFate = fatepointManager.init({ version: patch, phase });
		localFate.set(0, targetActive);

		// set to App
		course.set({ selected: targetActive, point: 0 });
		handleClose();
	};

	const confirmCancel = () => {
		playSfx();
		const { patch, phase } = $activeVersion;
		// clear local
		const localFate = fatepointManager.init({ version: patch, phase });
		localFate.remove();

		// clear App
		course.set({ point: 0, selected: null });

		targetActive = null;
		showCancelConfirmation = false;
		handleClose();
		return;
	};

	// Shortcut
	hotkeys('left,right', 'epipath', (e) => {
		e.preventDefault();
		if (weaponName) return;

		playSfx('click2');
		const [key] = hotkeys.getPressedKeyString();
		const to = key.toLocaleLowerCase();
		if (to === 'left') {
			targetActive = targetActive <= 0 ? 1 : targetActive - 1;
		}
		if (to === 'right') {
			targetActive = targetActive >= 1 ? 0 : targetActive + 1;
		}
	});

	hotkeys('enter', 'epipath', (e) => {
		e.preventDefault();
		if (targetActive === null) return;
		setCourse();
	});

	hotkeys('esc,e', 'epipath', (e) => {
		e.preventDefault();
		closePath();
	});

	hotkeys.setScope('epipath');
	onDestroy(() => hotkeys.deleteScope('epipath', 'index'));
</script>

{#if showCancelConfirmation}
	<Modal on:confirm={confirmCancel} on:cancel={closeModal}>
		<div
			class="pop-up"
			style="display: flex; width:100%; height:100%; justify-content: center; align-items:center;"
		>
			<div>
				{$t('wish.epitomizedPath.cancelPrompt')}
				<br />
				<span style="font-size: smaller; padding: 2rem">
					{$t('wish.epitomizedPath.cancelDesc')}
				</span>
			</div>
		</div>
	</Modal>
{/if}

<section class="modal" style="height:{$viewportHeight}px" transition:fade={{ duration: 250 }}>
	<div
		class="modal-content"
		bind:clientWidth
		style="--modal-width: {clientWidth}px"
		transition:fly={{ y: 40, duration: 250 }}
	>
		<img src={$assets[`fatepointbook${half ? '-half' : ''}.webp`]} alt="Fatepoint Background" />
		<button class="close-modal" on:click={closePath}>
			<i class="gi-close" />
		</button>
		<div class="container">
			{#if !half}
				<div class="description">
					<h1>{$t('wish.epitomizedPath.text')}</h1>
					<div class="content" bind:this={content}>
						{#each $json('wish.epitomizedPath.description') as desc}
							<p>
								· {@html desc}
							</p>
						{/each}
					</div>
				</div>
			{/if}
			<div class="weapon-selector" class:counter={weaponName}>
				<div class="bg">
					<FatepointSVG mode={weaponName ? 'counter' : 'bg'} />
				</div>
				<div class="top">{$t('wish.epitomizedPath.selectWeapon')}</div>
				<div class="weapon-item">
					<div class="weapon-list" style="--item-width: {itemWidth}px">
						{#if weaponName}
							<div class="weapon-content">
								<button>
									<InventoryItem
										itemdata={{
											name: weaponName,
											weaponType: weapons[selectedCourse].weaponType,
											type: 'weapon',
											rarity: 5
										}}
									/>
								</button>
							</div>
						{:else}
							{#each weapons as { name, weaponType }, i}
								<div
									class="weapon-content"
									class:active={targetActive === i}
									on:click={() => select(i)}
								>
									<button>
										<InventoryItem itemdata={{ name, weaponType, type: 'weapon', rarity: 5 }} />
									</button>
								</div>
							{/each}
						{/if}
					</div>
					<div class="text">
						<div>
							{#if weaponName}
								{$t('wish.epitomizedPath.fatePoint')} : <span>{$course.point}</span>/2
							{:else if targetActive === null}
								{$t('wish.epitomizedPath.selectWeapon')}
							{:else}
								{@html $t('wish.epitomizedPath.chartCourseOf', {
									values: {
										target: `<span> ${$t(weapons[targetActive].name)} </span>`
									}
								})}
							{/if}
						</div>
					</div>
				</div>
				<div class="button">
					{#if weaponName}
						<ButtonModal on:click={cancelCourse} type="cancel">
							{$t('wish.epitomizedPath.cancelCourse')}
						</ButtonModal>
					{:else}
						<ButtonModal on:click={setCourse} disabled={targetActive === null}>
							{$t('wish.epitomizedPath.chartCourse')}
						</ButtonModal>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		background-color: rgba(0, 0, 0, 0.7);
		z-index: 10;
		display: flex;
		justify-content: center;
		align-items: center;
		backdrop-filter: blur(2px);
	}

	.modal-content {
		width: 1000px;
		max-width: 90%;
		min-width: 250px;
		text-align: center;
		position: relative;
		border-radius: 1.2rem;
		overflow: hidden;
	}

	:global(.mobile) .modal-content {
		max-width: 140vh;
		border-radius: 0.8rem;
	}

	.modal-content img {
		position: relative;
		width: 100%;
	}

	.close-modal {
		position: absolute;
		top: 1.5rem;
		right: -0.2rem;
		z-index: +10;
	}
	.gi-close {
		font-size: 1.3rem;
		background-color: transparent;
		color: #383b40;
	}
	.container {
		width: 100%;
		height: 100%;
		display: flex;
		position: absolute;
		top: 0;
		left: 0;
	}

	.container h1 {
		text-align: left;
		padding-left: 10%;
		padding-top: 5%;
		font-size: calc(3 / 100 * var(--modal-width));
		color: #7c613f;
	}

	.container > div {
		flex-basis: 50%;
		flex-grow: 1;
		padding: 3% 7%;
	}

	.description {
		padding-right: 5.5% !important;
		font-size: calc(2 / 100 * var(--modal-width));
	}

	.container .content {
		width: 100%;
		height: 82%;
		overflow: hidden;
		margin: 8% 0 0;
		text-align: left;
		color: #aa8e77;
	}

	.weapon-selector {
		display: flex;
		flex-direction: column;
		height: 100%;
		color: #383b40;
	}
	.weapon-selector,
	.weapon-selector > div {
		position: relative;
		padding: 5%;
	}
	.weapon-selector .bg {
		position: absolute;
		width: 90%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.counter.weapon-selector .bg {
		width: 110%;
		top: 48%;
	}

	.top {
		font-size: calc(3 / 100 * var(--modal-width));
		white-space: nowrap;
	}

	.weapon-item {
		display: flex;
		flex-direction: column;
		height: 100%;
		border: solid #dcd8cd;
		border-width: 3px 0;
		font-size: x-large;
		padding-left: 0 !important;
		padding-right: 0 !important;
	}

	.counter .weapon-item {
		border: 0;
	}

	.weapon-list {
		height: 100%;
		width: 100%;
		padding: 0 10%;
		background-color: #dcd8cd;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		text-align: center;
		color: #3a4156;
		line-height: 1.2rem;
	}
	.counter .weapon-list {
		background-color: transparent;
	}

	.weapon-content {
		display: inline-block;
		padding: 5%;
		width: 50%;
	}

	.weapon-content button {
		font-size: small;
		aspect-ratio: 8.75 / 10;
		position: relative;
		vertical-align: middle;
		width: 100%;
	}
	:global(.mobile) .weapon-content button {
		font-size: xx-small;
	}

	.weapon-content.active button::after,
	.weapon-content.active button::before {
		position: absolute;
		right: 0;
		top: 0;
	}

	.weapon-content.active button::after {
		display: block;
		content: '';
		width: 100%;
		height: calc(100% - 0.4rem);
		border: solid #bed634;
		border-width: 0.2rem 0;
		border-radius: 0.3rem;
	}
	.weapon-content.active button::before {
		content: '✔';
		font-size: 1.2rem;
		color: #759a28;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #bed634;
		width: 20%;
		height: 20%;
		z-index: +1;
		border-top-right-radius: 0.5em;
	}

	.text {
		margin-top: auto;
		height: 40%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	span,
	p :global(span),
	.text :global(span) {
		color: #f0b164;
	}

	.counter .text {
		height: unset;
		margin-bottom: -1rem;
	}

	button i {
		width: 2rem;
		height: 2rem;
		background-color: #353533;
		border-radius: 100%;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		font-size: 1rem;
		margin-right: 2rem;
	}

	@media screen and (max-width: 800px) and (min-width: 500px) {
		.weapon-item {
			font-size: medium;
		}
	}

	:global(.mobile) .text {
		height: 30%;
	}
	:global(.mobile) .counter .text {
		height: unset;
		margin-bottom: -1rem;
	}
	:global(.mobile) .weapon-item {
		font-size: small;
	}
</style>
