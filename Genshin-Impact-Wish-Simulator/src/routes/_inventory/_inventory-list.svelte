<script>
	import { getContext, onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';

	import { data as charDB } from '$lib/data/characters.json';
	import { data as weaponDB } from '$lib/data/weapons.json';
	import { mobileMode, viewportHeight, viewportWidth } from '$lib/store/app-stores';
	import { owneditem } from '$lib/store/localstore-manager';
	import { setActiveOutfit } from '$lib/helpers/outfit';
	import { playSfx } from '$lib/helpers/audio/audio';
	import InventoryItem from './_inventory-item.svelte';

	export let activeItem = 'character';
	export let orderby = 'rarity';
	export let showAll = false;
	export let reverse = false;
	export let outfitData = { charName: '', outfitName: '' };

	let weapons = [];
	let characters = [];
	let dataToShow = [];
	let loadedData = [];
	let isLoaded = false;

	const itemQty = { weapon: 0, character: 0 };
	const setItemQty = getContext('setItemQty');
	const ownedItems = owneditem.getAll();

	const orderData = (data, orderby) => {
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

	const itemLocalName = (name, type) => {
		if (type === 'weapon') return $t(name);
		return $t(`${name}.name`);
	};
	const loadItems = (type) => {
		const isChar = type === 'character';
		const data = isChar ? charDB : weaponDB;
		return data.map(({ name, rarity, weaponType, vision }) => {
			const { wish = 0, manual = 0 } = ownedItems[name] || {};
			const qty = wish + manual;
			const type = weaponType ? 'weapon' : 'character';
			const localName = itemLocalName(name, type);
			itemQty[type] = qty > 0 ? itemQty[type] + 1 : itemQty[type];
			return { name, localName, rarity, type, vision, weaponType, qty, isOwned: qty > 0 };
		});
	};

	const outfitHandle = ({ outfitName, charName }) => {
		if (!isLoaded) return;
		const index = dataToShow.findIndex(({ name }) => name === charName);
		dataToShow[index].outfitName = outfitName;
		dataToShow[index].useOutfit = outfitName !== 'default';
	};

	const showHandle = (showAll, orderBy) => {
		if (!isLoaded) return;
		if (showAll) return (dataToShow = orderData([...loadedData], orderBy));
		const data = [...loadedData].filter(({ isOwned }) => isOwned);
		dataToShow = orderData(data, orderBy);
	};

	const reverseHandle = () => {
		if (!isLoaded) return;
		dataToShow = dataToShow.reverse();
		playSfx();
	};

	const proccessData = (activeItem) => {
		if (!isLoaded) return;
		loadedData = activeItem === 'character' ? characters : weapons;
		setItemQty({ owned: itemQty[activeItem], all: loadedData.length });
		showHandle(showAll, orderby);
		return;
	};

	const getAll = () => {
		characters = loadItems('character').map((c) => {
			const charData = setActiveOutfit(c);
			delete charData.wishBoxPosition;
			return charData;
		});
		weapons = loadItems('lightcone');
		isLoaded = true;
		proccessData(activeItem);
	};

	$: outfitHandle(outfitData);
	$: proccessData(activeItem);
	$: showHandle(showAll, orderby);
	$: reverseHandle(reverse);
	onMount(getAll);

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
	{#if !isLoaded}
		<span style="color: white; padding: 2rem; font-size: 1.2rem">
			{$t('waiting')}...
		</span>
	{:else if !dataToShow || dataToShow.length < 1}
		<span style="color: white; padding: 2rem; font-size: 1.2rem">
			{$t('history.noData')}
		</span>
	{:else}
		{#each dataToShow as d, i (d)}
			<div
				class="item"
				animate:flip={{ duration: (i) => 25 * Math.sqrt(i) }}
				in:fade={{ duration: 300, delay: Math.sqrt(i * 2500) }}
			>
				<InventoryItem {...d} />
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
