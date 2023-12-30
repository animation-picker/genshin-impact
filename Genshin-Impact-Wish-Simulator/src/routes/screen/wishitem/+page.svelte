<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { t } from 'svelte-i18n';

	import { APP_TITLE } from '$lib/env';
	import { data as charDB } from '$lib/data/characters.json';
	import { data as weaponDB } from '$lib/data/weapons.json';
	import { decodeAndReadData } from '$lib/helpers/shareable-link';
	import WishResult from '../../_wish/wish-result/WishResult.svelte';

	let list = [];
	let itemName = '';
	let isOutfit = false;
	const { url } = $page;

	const completeMissingData = (data) => {
		const { name, type, useOutfit } = data;
		itemName = name;
		isOutfit = useOutfit;
		const itemdb = type === 'character' ? charDB : weaponDB;
		const complement = itemdb.find((v) => v.name === name);
		return { ...data, ...complement };
	};

	const resolveData = () => {
		try {
			const itemData = url.searchParams.get('a');
			if (!itemData) throw new Error('no Data');
			const parsed = decodeAndReadData.single(itemData);
			const data = completeMissingData(parsed);
			list = [data];
		} catch (e) {
			console.error('something Wrong');
			goto('/');
		}
	};

	onMount(resolveData);
</script>

<svelte:head>
	<title>
		{$t(`${itemName}.name`)} | {$t('title')}
	</title>

	<meta name="title" content={APP_TITLE} />
	<meta property="og:title" content={APP_TITLE} />
	<meta property="twitter:title" content={APP_TITLE} />
</svelte:head>

<section>
	{#if list.length > 0}
		<WishResult {list} {isOutfit} skip standalone />
	{/if}
</section>

<style>
	section {
		width: 100%;
		height: var(--screen-height);
	}
</style>
