<script>
	import { getContext, onDestroy, setContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import hotkeys from 'hotkeys-js';

	import { HistoryManager } from '$lib/store/IDB-manager';
	import { assets, viewportHeight, viewportWidth } from '$lib/store/app-stores';
	import { lazyLoad } from '$lib/helpers/lazyload';
	import { getCharDetails } from '$lib/helpers/gacha/itemdrop-base';
	import { owneditem } from '$lib/store/localstore-manager';

	// Component
	import ItemInfo from './../_wish/wish-result/_item-info.svelte';
	import ScreenshotShare from '../_index/ScreenshotShare.svelte';
	import OutfitToggle from './_outfit-toggle.svelte';

	export let name;
	export let useOutfit = false;
	export let outfitName = '';

	const previewOutfit = (outfit) => {
		outfitName = outfit;
		useOutfit = outfit !== 'default';
	};
	setContext('previewOutfit', previewOutfit);
	const closeDetail = getContext('closeDetail');

	const calculateWrapperHeight = (vw, vh) => {
		if (vw < vh) return '80vw';
		if (vw < vh * 1.5) return '65vw';
		return '100%';
	};
	$: wrapperHeight = calculateWrapperHeight($viewportWidth, $viewportHeight);

	const getQtyInfo = (type, qty) => {
		if (type === 'weapon') {
			const refineExtra = $t(`inventory.extra`, { values: { count: `5 + ${qty - 5}` } });
			const info = $t(`inventory.refinement`, {
				values: { count: qty > 5 ? refineExtra : qty }
			});
			return info;
		}

		const refineExtra = $t(`inventory.extra`, { values: { count: `6 + ${qty - 7}` } });
		const info = $t(`inventory.constellation`, {
			values: { count: qty > 7 ? refineExtra : qty - 1 }
		});
		return info;
	};

	const loadItem = async () => {
		if (!name) return;
		const dt = await HistoryManager.getByName(name);

		// If no data in IDB
		if (dt.length < 1 || !dt[0]) {
			const result = getCharDetails(name);
			result.qty = owneditem.get(name)?.qty || 0;
			return result;
		}

		const result = dt[0];
		result.qty = dt.length;
		return result;
	};

	// Shortcut
	hotkeys('esc', 'itemdetail', (e) => {
		e.preventDefault();
		closeDetail();
	});
	hotkeys.setScope('itemdetail');
	onDestroy(() => hotkeys.deleteScope('itemdetail', 'inventory'));
</script>

<div
	class="wish-result"
	style="background-image: url({$assets['detailbg.webp']});"
	transition:fade={{ duration: 250 }}
>
	<div class="uid">WishSimulator.App</div>

	<button class="close" on:click={closeDetail}>
		<i class="gi-close" />
	</button>

	<div class="container">
		{#await loadItem()}
			<div class="wrapper">
				<span style="color:#fff">{$t('waiting')}...</span>
			</div>
		{:then { time, vision, type, weaponType, rarity, qty }}
			{#if type === 'character'}
				<OutfitToggle charName={name} />
			{/if}

			<div class="wrapper" in:fade={{ duration: 250 }} style="height: {wrapperHeight};">
				{#if type === 'weapon'}
					<div class="splash-art weapon {weaponType}-parent">
						<img src={$assets[`bg-${weaponType}.webp`]} alt={weaponType} class="weaponbg" />
						<img use:lazyLoad={$assets[name]} alt={name} class={weaponType} />
					</div>
				{:else}
					<div class="splash-art">
						{#key outfitName}
							<img
								use:lazyLoad={$assets[`splash-art/${useOutfit ? outfitName : name}`]}
								alt={name}
								crossorigin="anonymous"
							/>
						{/key}
					</div>
				{/if}

				<ItemInfo staticMode itemName={name} {rarity} {vision} {weaponType} />
			</div>
			<div class="detail">
				<span class="qty"> {getQtyInfo(type, qty)} </span>
				<small> {$t('inventory.firstSummon', { values: { date: time } })} </small>
			</div>
		{/await}
	</div>

	<div class="share">
		<ScreenshotShare />
	</div>
</div>

<style>
	.close {
		position: fixed;
		top: 30px;
		right: 2%;
		z-index: 10;
	}

	:global(.mobile) .close {
		top: 0.3rem;
		right: 6%;
	}

	.wish-result,
	.container,
	.wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.wish-result {
		background-size: cover;
		background-position: center;
		position: fixed;
		top: 0;
		left: 0;
		z-index: +100000;
	}

	.splash-art {
		width: 100%;
		height: 100%;
		display: flex;
		position: relative;
		justify-content: center;
		align-items: center;
	}

	.splash-art img {
		height: 120%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		top: 50%;
	}

	.splash-art.weapon img.weaponbg {
		height: 85%;
	}

	.bow-parent .weaponbg {
		height: 90% !important;
		transform: translate(-53%, -50%) !important;
	}
	.catalyst-parent .weaponbg {
		height: 90% !important;
	}

	.bow,
	.polearm,
	.sword,
	.claymore,
	.catalyst {
		filter: drop-shadow(0.6rem 0.6rem 0.05rem rgb(0, 0, 0));
	}

	.bow {
		height: 100%;
	}

	.claymore {
		height: 105% !important;
	}

	.catalyst {
		height: 40% !important;
	}

	.polearm {
		top: 65% !important;
		left: 48% !important;
		height: 130% !important;
	}

	.share {
		display: flex;
		width: 100%;
		text-align: right;
		justify-content: flex-end;
		align-items: center;
		position: absolute;
		bottom: 5%;
		right: 8%;
		color: #fff;
		font-size: 0.8rem;
		z-index: 999;
	}

	button:active {
		transform: scale(0.9);
	}

	.uid {
		left: unset;
		right: 5%;
		width: fit-content;
		display: none;
		font-size: x-large;
		font-family: var(--gi-font);
	}

	.detail {
		position: absolute;
		left: 5%;
		bottom: 2%;
		display: block;
		color: #fff;
		font-size: large;
		-webkit-text-stroke: #000 0.015rem;
	}
	.detail span,
	.detail small {
		display: block;
		white-space: nowrap;
	}

	.detail .qty {
		font-size: larger;
	}

	@media screen and (max-width: 520px) {
		.detail {
			font-size: 120%;
		}
	}
</style>
