<script>
	import { getContext, onMount, setContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import { data as charDB } from '$lib/data/characters.json';
	import { data as weaponDB } from '$lib/data/weapons.json';
	import { cookie } from '$lib/helpers/dataAPI/api-cookie';
	import { owneditem } from '$lib/helpers/dataAPI/api-localstore';
	import { BannerManager } from '$lib/helpers/dataAPI/api-indexeddb';
	import { setActiveOutfit } from '$lib/helpers/outfit';
	import { playSfx } from '$lib/helpers/audio/audio';
	import { imageCDN } from '$lib/helpers/assets';
	import CheckBox from '$lib/components/CheckBox.svelte';
	import Order, { orderData } from './_order.svelte';

	export let activeItem;
	const loaded = getContext('loaded');
	const loadedList = getContext('loadedList');
	const itemList = getContext('itemList');

	let showAll = cookie.get('showAllInventory');
	$: cookie.set('showAllInventory', showAll);
	const handleShowAll = ({ detail }) => (showAll = !!detail.checked);
	const reverse = () => {
		playSfx('click2');
		itemList.update((list) => list.reverse());
	};

	let characters = [];
	let weapons = [];
	let isLoaded = false;
	let itemQty = { weapon: 0, character: 0 };

	let orderby = 'rarity';
	setContext('setOrderName', (val) => (orderby = val));

	const itemLocalName = (name, type) => {
		if (type === 'weapon') return $t(name);
		return $t(`${name}.name`);
	};

	const customItem = async () => {
		const idb = await BannerManager.getAll();
		const data = idb.reverse().map((d) => {
			const { character, status, images, hostedImages, artPosition } = d;
			d.name = character;
			d.rarity = 5;
			d.custom = true;
			d.images = status != 'owned' ? imageCDN(hostedImages) : images;
			d.offset = artPosition;
			return d;
		});

		return data.filter(({ character, images }) => {
			const isComplete = character && images && images?.artURL;
			return isComplete;
		});
	};

	const ownedItems = owneditem.getAll();
	const loadItems = async (type) => {
		const isChar = type === 'character';
		const data = isChar ? [...(await customItem()), ...charDB] : weaponDB;
		const dataResult = data.map((d) => {
			const { name, itemID, rarity, weaponType, vision, images, custom, offset } = d;
			const { wish = 0, manual = 0 } = ownedItems[itemID] || {};
			const qty = wish + manual;
			const type = weaponType ? 'weapon' : 'character';
			const localName = custom ? name : itemLocalName(name, type);
			const isOwned = qty > 0;
			itemQty[type] = qty > 0 ? itemQty[type] + 1 : itemQty[type];

			// prettier-ignore
			return { name, localName, rarity, type, vision, weaponType, qty, isOwned, images, itemID, custom, offset };
		});
		return dataResult;
	};

	const showHandle = (showAll, orderBy) => {
		if (showAll) {
			const updatedData = orderData([...$loadedList], orderBy);
			itemList.set(updatedData);
			return;
		}
		const data = [...$loadedList].filter(({ isOwned }) => isOwned);
		const updatedData = orderData(data, orderBy);
		itemList.set(updatedData);
	};

	const proccessData = (activeItem, showAll) => {
		if (!isLoaded) return;
		const loadedData = activeItem === 'character' ? characters : weapons;
		loadedList.set(loadedData);
		showHandle(showAll, orderby);
		return;
	};
	$: proccessData(activeItem, showAll);

	onMount(async () => {
		characters = (await loadItems('character')).map((c) => setActiveOutfit(c));
		weapons = await loadItems('weapon');
		isLoaded = true;
		proccessData(activeItem, showAll);
		loaded();
	});
</script>

<div class="filter">
	<div class="row">
		<button class="btn reverse" on:click={reverse} title="Reverse Order">
			<i class="gi-exchange" />
		</button>
		<div class="selector" on:mousedown|stopPropagation>
			<Order {activeItem} {orderby} {showAll} />
		</div>

		<CheckBox on:change={handleShowAll} checked={showAll}>
			{$t(`inventory.showAllOption`, {
				values: { item: $t(activeItem) }
			})}
			<span> {itemQty[activeItem]}/{$loadedList.length}</span>
		</CheckBox>
	</div>
</div>

<style>
	.filter {
		height: 3rem;
		width: 100%;
	}

	.filter .row {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		padding: 0 2%;
	}

	.filter :global(.checkbox) {
		color: var(--tertiary-color);
	}
</style>
