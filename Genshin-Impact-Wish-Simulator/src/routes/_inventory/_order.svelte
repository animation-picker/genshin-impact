<script context="module">
	export const orderData = (data, orderby) => {
		if (!orderby || !data || !Array.isArray(data)) return data;
		if (orderby === 'release') return data;
		if (orderby === 'rarity') {
			return data.sort((a, b) => b.rarity - a.rarity);
		}
		if (orderby === 'quantity') {
			return data.sort((a, b) => b.qty - a.qty);
		}
		if (orderby === 'name') {
			return data.sort((a, b) => {
				if (a.localName > b.localName) return 1;
				if (a.localName < b.localName) return -1;
				return 0;
			});
		}
		if (orderby === 'element') {
			return data.sort((a, b) => {
				if (a.vision > b.vision) return 1;
				if (a.vision < b.vision) return -1;
				return 0;
			});
		}
		if (orderby === 'type') {
			return data.sort((a, b) => {
				if (a.weaponType > b.weaponType) return 1;
				if (a.weaponType < b.weaponType) return -1;
				return 0;
			});
		}
	};
</script>

<script>
	import { playSfx } from '$lib/helpers/audio/audio';
	import { getContext, onMount } from 'svelte';
	import { t } from 'svelte-i18n';
	import { fade } from 'svelte/transition';

	export let activeItem = 'character';
	export let orderby = 'rarity';
	export let showAll = false;

	let showOrderOption = false;
	const handleShowOrderOption = () => {
		playSfx();
		showOrderOption = !showOrderOption;
	};

	const setOrderName = getContext('setOrderName');
	const loadedList = getContext('loadedList');
	const itemList = getContext('itemList');
	const selectOrder = (by) => {
		const data = !showAll ? $loadedList.filter(({ isOwned }) => isOwned) : $loadedList;
		const ordered = orderData([...data], by);
		itemList.set(ordered);
		setOrderName(by);
		handleShowOrderOption();
	};

	onMount(() => {
		const section = document.querySelector('section');
		section.addEventListener('mousedown', () => (showOrderOption = false));
	});
</script>

<button class="selected-option" on:click={handleShowOrderOption}>
	{$t('inventory.sort')} / {$t(`inventory.${orderby}`)}

	{#if showOrderOption}
		<i class="gi-caret-up" />
	{:else}
		<i class="gi-caret-down" />
	{/if}
</button>

{#if showOrderOption}
	<div class="option-list above" transition:fade={{ duration: 200 }}>
		{#each ['release', 'rarity', 'name', 'quantity'] as val}
			<button class:selected={orderby == val} on:click={() => selectOrder(val)}>
				{$t(`inventory.${val}`)}
			</button>
		{/each}

		{#if activeItem === 'character'}
			<button class:selected={orderby == 'element'} on:click={() => selectOrder('element')}>
				{$t(`inventory.element`)}
			</button>
		{/if}

		{#if activeItem === 'weapon'}
			<button class:selected={orderby == 'type'} on:click={() => selectOrder('type')}>
				{$t(`inventory.type`)}
			</button>
		{/if}
	</div>
{/if}

<style>
	button {
		width: 100%;
	}
</style>
