<script>
	// library
	import { onMount, setContext } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import OverlayScrollbars from 'overlayscrollbars';

	// Store
	import { APP_TITLE } from '$lib/env';
	import { playSfx } from '$lib/helpers/audio/audio';
	import { viewportHeight } from '$lib/store/app-stores';
	import { cookie } from '$lib/store/cookie';

	import Background from './_background.svelte';
	import Header from './_header.svelte';
	import Navlink from './_navlink.svelte';
	import Filter from './_filter.svelte';
	import InventoryList from './_inventory-list.svelte';
	import InventoryDetail from './_inventory-detail.svelte';

	let headerHeight = 0;

	let activeItem = 'character';
	let orderby = 'rarity';
	let reverse = false;
	setContext('reverse', () => (reverse = !reverse));

	let showAll = cookie.get('showAllInventory');
	$: cookie.set('showAllInventory', showAll);
	setContext('showAll', (v) => (showAll = v));

	let itemQty = { owned: 0, all: 0 };
	setContext('setItemQty', (obj) => (itemQty = obj));

	const showItem = (item) => {
		if (activeItem === item) return;
		playSfx('shopnav');
		activeItem = item;
		orderby = 'rarity';
	};
	setContext('showItem', showItem);

	const orderData = (order = 'rarity') => {
		if (orderby === order) return;
		orderby = order;
		playSfx();
	};
	setContext('orderby', orderData);

	let content;
	onMount(() => {
		OverlayScrollbars(content, {
			sizeAutoCapable: false,
			className: 'os-theme-light'
		});
	});

	let detailItem = {};
	let outfitData = { charName: '', outfitName: '' };
	let showInventoryDetail = false;
	const showDetail = (detail) => {
		playSfx('collectionitem');
		detailItem = detail;
		showInventoryDetail = true;
	};
	setContext('showDetail', showDetail);

	const closeDetail = () => {
		playSfx('close');
		showInventoryDetail = false;
	};
	setContext('closeDetail', closeDetail);

	const refreshAfterOutfitChanged = (charName, outfitName) => {
		outfitData = { outfitName, charName };
	};
	setContext('applyOutfit', refreshAfterOutfitChanged);
</script>

<svelte:head>
	<title>{$t(`inventory.text`)} | {$t('title', { default: APP_TITLE })}</title>
</svelte:head>

{#if showInventoryDetail}
	<InventoryDetail {...detailItem} />
{/if}

<section id="inventory">
	<Background />
	<div class="header" bind:clientHeight={headerHeight} in:fly={{ y: -20 }}>
		<Header {activeItem} />
	</div>
	<div class="body">
		<Navlink {activeItem} />
		<div class="body-content" in:fade={{ duration: 400 }}>
			<div
				class="container"
				bind:this={content}
				style="--headerHeight:{$viewportHeight - headerHeight}px;"
			>
				<InventoryList {activeItem} {showAll} {reverse} {orderby} {outfitData} />
			</div>
			<Filter {activeItem} {itemQty} {showAll} {orderby} />
		</div>
	</div>
</section>

<style>
	section {
		display: block;
		width: 100%;
		height: 100%;
		position: relative;
		background-color: #000;
	}

	.header {
		position: relative;
		width: 100%;
		display: flex;
		padding: 15px 2%;
		z-index: +2;
	}

	/* mobile */
	:global(.mobile) .header {
		position: fixed;
		top: 0;
		right: 0;
		width: calc(100% - 65px);
		display: flex;
		justify-content: space-between;
		padding: 5px 2%;
	}

	.body {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		position: relative;
		z-index: +1;
	}

	:global(.mobile) .body {
		flex-direction: row;
	}

	/* List */
	.body-content {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}
	.container {
		height: calc(var(--headerHeight) - 6.3rem);
		display: block;
		width: 100%;
		padding: 0 2%;
		margin-top: 2px;
		/* overflow-y: auto; */
	}

	:global(.mobile) .container {
		margin-top: 45px;
		height: calc(100% - 85px);
	}

	@media screen and (max-width: 900px) {
		.container {
			height: calc(var(--headerHeight) - 7rem);
			margin-top: 0;
		}
	}
</style>
