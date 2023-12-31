<script>
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { assets } from '$lib/store/app-stores';
	import { ownedOutfits } from '$lib/helpers/dataAPI/api-localstore';
	import { outfitListForChar } from '$lib/helpers/outfit';
	import { getName } from '$lib/helpers/nameText';
	import { lazyLoad } from '$lib/helpers/lazyload';
	import { playSfx } from '$lib/helpers/audio/audio';
	import { getCharDetails } from '$lib/helpers/gacha/itemdrop-base';
	import ButtonGeneral from '$lib/components/ButtonGeneral.svelte';

	export let charName = '';
	let columnWidth;
	let offset = {};

	const outfitList = outfitListForChar(charName);
	const { offset: defaultOffset = {} } = getCharDetails(charName);
	let { name: selectedOutfit = 'default' } = outfitList.find(({ isSet }) => isSet) || {};
	let activeOutfit = selectedOutfit;

	const previewOutfit = getContext('previewOutfit');
	const preview = (outfitName, position) => {
		if (selectedOutfit === outfitName) return;
		playSfx('click2');
		selectedOutfit = outfitName;
		offset = position || defaultOffset;
		previewOutfit(selectedOutfit, offset);
	};

	const apply = () => {
		if (activeOutfit !== 'default') {
			ownedOutfits.set({ outfitName: activeOutfit, isSet: false, characterName: charName });
		}
		if (selectedOutfit !== 'default') {
			ownedOutfits.set({ outfitName: selectedOutfit, isSet: true, characterName: charName });
		}

		activeOutfit = selectedOutfit;
		playSfx();
		applyOutfit();
	};

	const loadedList = getContext('loadedList');
	const itemList = getContext('itemList');
	const updateList = (list) => {
		const index = list.findIndex(({ name }) => name === charName);
		list[index].outfitName = activeOutfit;
		list[index].offset = offset;
		list[index].useOutfit = activeOutfit && activeOutfit !== 'default';
		return list;
	};
	const applyOutfit = () => {
		const toUpdate = [itemList, loadedList];
		toUpdate.forEach((list) => list.update(updateList));
	};
</script>

{#if outfitList.length > 0}
	<div class="outfit-toggle" style="--width: {columnWidth}px">
		<div class="column" bind:clientWidth={columnWidth}>
			<button
				class:selected={!selectedOutfit || selectedOutfit === 'default'}
				on:click={() => preview('default')}
			>
				<picture class="star4" style="background-image:url('{$assets['4star-bg.webp']}');">
					<img
						use:lazyLoad={$assets[`face/${charName}`]}
						alt={getName(charName)}
						crossorigin="anonymous"
					/>
				</picture>
				<caption>
					<span> {$t('outfit.default')} </span>
				</caption>
			</button>
		</div>

		{#each outfitList as { name, rarity, owned, offset }}
			<div class="column" class:disabled={!owned} data-text={$t('inventory.notOwned')}>
				<button class:selected={selectedOutfit === name} on:click={() => preview(name, offset)}>
					<picture
						class="star{rarity}"
						style="background-image:url('{$assets[`${rarity}star-bg.webp`]}');"
					>
						<img
							use:lazyLoad={$assets[`face/${name}`]}
							alt={getName(name)}
							crossorigin="anonymous"
						/>
					</picture>
					<caption>
						<span> {$t(`outfit.item.${name}.name`)}</span>
					</caption>
				</button>
			</div>
		{/each}
		<div class="apply">
			{#if selectedOutfit !== activeOutfit}
				<div transition:fade={{ duration: 200 }}>
					<ButtonGeneral on:click={apply}>
						{$t('outfit.setOutfit')}
					</ButtonGeneral>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.outfit-toggle {
		position: absolute;
		top: 0;
		left: 0;
		padding-top: 1rem;
		padding-left: 1rem;
		z-index: +2;
		width: fit-content;
	}

	.column {
		width: 10vw;
		max-width: 120px;
		min-width: 90px;
		aspect-ratio: 1/1;
		padding: 0.3rem;
		display: inline-block;
		flex-direction: column;
		position: relative;
	}

	.column button {
		border-radius: 5%;
		display: flex;
		flex-direction: column;
		text-align: center;
		background-color: #596982;
		color: #e8dfbb;
		line-height: 1.2rem;
		position: relative;
	}

	.column button::after {
		content: '';
		position: absolute;
		z-index: -1;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		height: 100%;
		border-radius: 8%;
		border: 0.2rem solid rgba(234, 195, 67, 0.7);
		opacity: 0;
		transition: opacity 0.15s;
	}
	.column:not(.disabled):hover button::after,
	button.selected::after {
		opacity: 1;
	}

	.column.disabled::before {
		content: attr(data-text);
		color: #e8dfbb;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: calc(100% - 0.6rem);
		height: calc(100% - 0.6rem);
		background-color: rgba(0, 0, 0, 0.6);
		border-radius: 0.5em;
		z-index: +2;
		font-size: calc(0.12 * var(--width));
	}

	.column button {
		width: 100%;
		height: 100%;
	}

	caption {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 40%;
		font-size: calc(0.095 * var(--width));
		line-height: 1.15em;
	}

	picture {
		display: block;
		width: 100%;
		height: 70%;
		margin: auto;
		background-size: cover;
		border-top-right-radius: 0.5em;
		border-top-left-radius: 0.5em;
	}

	img {
		height: 100%;
	}

	.apply {
		width: 100%;
		text-align: center;
		font-size: 90%;
	}
</style>
