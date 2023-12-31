<script>
	import { getContext } from 'svelte';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { isMobile, mobileMode, viewportHeight, viewportWidth } from '$lib/store/app-stores';
	import InventoryItem from './_inventory-item.svelte';

	export let loaded = false;
	const itemList = getContext('itemList');

	// Layout
	let itemWidth = 150;
	const setItemWidth = (viewportWidth, isMobileMode) => {
		itemWidth = (20 / 100) * viewportWidth;
		if (isMobileMode) {
			itemWidth = (24 / 100) * $viewportHeight;
			return;
		}

		if (itemWidth < 150) {
			itemWidth = 130;
			return;
		}

		if (itemWidth > 150) {
			itemWidth = 150;
			return;
		}
	};
	$: setItemWidth($viewportWidth, $mobileMode);
</script>

<div class="list-item" style="--item-width: {itemWidth}px">
	{#if !loaded}
		<span style="color: white; padding: 2rem; font-size: 1.2rem">
			{$t('history.waiting')}
		</span>
	{:else if !$itemList || $itemList.length < 1}
		<span style="color: white; padding: 2rem; font-size: 1.2rem">
			{$t('history.noData')}
		</span>
	{:else if $isMobile}
		{#each $itemList as d}
			<div class="item" in:fade={{ duration: 300 }}>
				{#key d} <InventoryItem itemdata={d} /> {/key}
			</div>
		{/each}
	{:else}
		{#each $itemList as d, i (d)}
			<div
				class="item"
				animate:flip={{ duration: (i) => 25 * Math.sqrt(i) }}
				in:fade={{ duration: 300, delay: Math.sqrt(i * 2500) }}
			>
				<InventoryItem itemdata={d} />
			</div>
		{/each}
	{/if}
</div>

<style>
	.list-item {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: flex-start;
		width: 100%;
	}

	.list-item:hover {
		will-change: scroll-position;
	}

	.item {
		margin: 0.5rem;
		aspect-ratio: 8.75 / 10;
		width: 20vh;
		max-width: 135px;
	}
	:global(.mobile) .item {
		width: 24vh;
	}

	@media screen and (max-width: 400px) {
		.item {
			width: 14vh;
		}
	}
</style>
