<script>
	import { fade, fly } from 'svelte/transition';
	import { getContext, setContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import { assets } from '$lib/store/app-stores';
	import { playSfx } from '$lib/helpers/audio/audio';
	import { getCharDetails } from '$lib/helpers/gacha/itemdrop-base';

	import InventoryItem from '../../_inventory/_inventory-item.svelte';
	import RateupPicker from './_rateup-picker.svelte';
	import PreviewGenerator from './_preview-generator.svelte';

	export let rateup = [];
	export let bannerName = '';
	export let character = '';
	export let charTitle = '';
	export let preview = '';
	export let watermark = '';

	let showCharPicker = false;
	let headerHeight;
	let rowWidth;
	$: itemWidth = rowWidth / 4;

	const editInfo = getContext('editInfo');
	const setBannerName = getContext('setBannerName');
	const setCharName = getContext('setCharName');
	const setCharTitle = getContext('setCharTitle');
	const setRateup = getContext('setRateup');
	const setWatermark = getContext('setWatermark');

	const typeBannerName = ({ target }) => {
		const { value } = target;
		setBannerName(value);
	};

	const typeCharName = ({ target }) => {
		const { value } = target;
		setCharName(value);
	};

	const typeCharTitle = ({ target }) => {
		const { value } = target;
		setCharTitle(value);
	};

	const typeWatermark = ({ target }) => {
		const { value } = target;
		setWatermark(value);
	};

	const closeInfoEditor = () => {
		editInfo(false);
		playSfx('close');
	};

	const openRateupPicker = () => {
		showCharPicker = true;
		playSfx('click');
	};

	// Rateup Picker
	const selectChar = (charName) => {
		showCharPicker = false;
		if (!charName) return;
		if (rateup.includes(charName)) return;
		if (rateup.length >= 3) return;
		setRateup([...rateup, charName]);
	};
	setContext('selectChar', selectChar);

	const removeChar = (charName) => {
		playSfx('close');
		const afterRemoved = rateup.filter((n) => charName != n);
		setRateup(afterRemoved);
	};
</script>

<section transition:fade={{ duration: 250 }} on:mousedown|self={closeInfoEditor}>
	<div
		class="wrapper vision-picker"
		class:pickerActive={showCharPicker}
		style="--bg-icon:url('{$assets['modal-bg-icon.png']}'); --header-height:{headerHeight}px;"
		transition:fly={{ duration: 250, x: 100 }}
	>
		<div class="header" bind:clientHeight={headerHeight}>
			<h1>{$t('customBanner.editBanner')}</h1>
			<div class="close-button">
				<button class="close" on:click={closeInfoEditor}>
					<i class="gi-close" />
				</button>
			</div>
		</div>

		<div class="body" bind:clientWidth={rowWidth} style="--item-width:{itemWidth}px">
			<div class="body-wrapper">
				<div class="field-group">
					<label for="bannerName">{$t('customBanner.bannerName')}: *</label>
					<div class="col">
						<input
							type="text"
							autocomplete="off"
							id="bannerName"
							placeholder={$t('customBanner.bannerName')}
							value={bannerName}
							on:input={typeBannerName}
						/>
					</div>
				</div>

				<div class="field-group">
					<label for="charName">{$t('customBanner.charName')}: *</label>
					<div class="col">
						<input
							type="text"
							autocomplete="off"
							id="charName"
							placeholder={$t('customBanner.charName')}
							value={character}
							on:input={typeCharName}
						/>
					</div>
				</div>

				<div class="field-group">
					<label for="charTitle">{$t('customBanner.charTitle')}:</label>
					<div class="col">
						<input
							type="text"
							autocomplete="off"
							id="charTitle"
							placeholder={$t('customBanner.charTitle')}
							value={charTitle}
							on:input={typeCharTitle}
						/>
					</div>
				</div>

				<div class="field-group">
					<label for="watermark">{$t('customBanner.watermark')}:</label>
					<div class="col">
						<input
							type="text"
							autocomplete="off"
							id="watermark"
							placeholder="Banner By @Traveler"
							value={watermark}
							on:input={typeWatermark}
						/>
					</div>
				</div>

				<div class="field-group">
					<div class="row">
						<label for="rateup">{$t('customBanner.rateupChar')}: *</label>
					</div>
					<div class="row">
						{#each Array(3) as _, i}
							{@const { name, vision } = getCharDetails(rateup[i]) || {}}
							<div class="rateup-item" class:blank={!name}>
								{#if name}
									<button class="remove" on:click={() => removeChar(name)}>
										<i class="gi-delete" /></button
									>
									<button class="item-wrapper">
										{#key name}
											<InventoryItem
												itemdata={{ localName: $t(`${name}.name`), name, vision, rarity: 4 }}
											/>
										{/key}
									</button>
								{:else}
									<button class="add" on:click={openRateupPicker}>
										<i class="gi-plus" />
									</button>
								{/if}
							</div>
						{/each}
					</div>
				</div>

				<div class="field-group">
					<PreviewGenerator {preview} />
				</div>
			</div>
			{#if showCharPicker}
				<RateupPicker exclude={rateup} />
			{/if}
		</div>
	</div>
</section>

<style>
	section {
		position: fixed;
		z-index: +20;
		top: 0;
		left: 0;
		width: var(--screen-width);
		height: var(--screen-height);
		background-color: rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(10px);
		display: flex;
		justify-content: flex-end;
	}

	.wrapper {
		height: 100%;
		width: 500px;
		max-width: 100%;
		padding: 1%;
		background-color: #fbf6ee;
		background-image: var(--bg-icon);
		background-repeat: no-repeat;
		background-size: 75%;
		background-position: 50% 60%;
		color: var(--text-color);
	}

	:global(.mobile) .wrapper {
		width: 350px;
	}

	.header {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2%;
	}

	h1 {
		font-size: calc(0.2 * var(--item-width));
	}

	.body {
		height: calc(100% - var(--header-height));
		padding-bottom: 2%;
		position: relative;
	}
	.body-wrapper {
		overflow-y: auto;
		width: 100%;
		height: 100%;
	}

	.field-group {
		padding: 1%;
	}

	input {
		width: 100%;
		padding: 0 1.5rem;
		margin-bottom: 2%;
		height: 3rem;
		display: block;
		border-radius: 3rem;
		border: #c3b8a5 2px solid;
		background-color: var(--tertiary-color);
		outline: none;
		transition: all 0.2s;
	}

	input:focus {
		box-shadow: 0 0 0.4rem rgba(227, 149, 48, 0.7);
	}

	input:disabled {
		background-color: transparent;
		opacity: 0.7;
	}

	.row {
		display: flex;
		width: 100%;
		align-items: center;
		margin-bottom: 2%;
	}

	.rateup-item {
		margin: 1%;
		aspect-ratio: 8.75 / 10;
		width: 25%;
		max-width: 135px;
		position: relative;
	}

	.rateup-item .item-wrapper {
		width: 100%;
		height: 100%;
	}

	.rateup-item .remove {
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(25%, -25%);
		z-index: +1;
		background-color: #ff1c1c;
		color: #fff;
		line-height: 0;
		padding: 7%;
		border-radius: 100%;
		opacity: 0.8;
		transition: all 0.25s;
	}

	.rateup-item .remove:hover {
		opacity: 1;
		background-color: #cb1717;
	}
	.remove:active {
		transform: translate(25%, -25%) scale(0.9);
	}

	.rateup-item.blank {
		border: 2px dashed #c3b8a5;
		border-radius: 5%;
		transition: all 0.25s;
	}
	.rateup-item.blank:hover {
		border-color: #857d71;
	}

	.add {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #c3b8a5;
		line-height: 0;
		font-size: calc(0.25 * var(--item-width));
		transition: all 0.25s;
	}

	.add:hover {
		color: #857d71;
	}
</style>
