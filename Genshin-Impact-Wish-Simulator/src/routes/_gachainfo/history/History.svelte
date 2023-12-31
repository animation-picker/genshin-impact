<script>
	// Library
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { t } from 'svelte-i18n';
	import OverlayScrollbars from 'overlayscrollbars';
	import { APP_TITLE } from '$lib/env';
	import { activeBanner, bannerList } from '$lib/store/app-stores';
	import { localPity } from '$lib/helpers/dataAPI/api-localstore';

	// Components
	import Iklan from '$lib/components/Iklan.svelte';
	import SelectBanner from './_select-banner.svelte';
	import Reset from './_reset.svelte';
	import Report from './_report.svelte';
	import Filter from './_filter.svelte';
	import Legends from './_legends.svelte';
	import Pagination from './_pagination.svelte';
	import List from './_list.svelte';
	import Title from '../_title.svelte';

	export let tplVersion;

	let dataLength = 0;
	let filteredDataLength = 0;
	let activepage = 1;
	let itemPerPage = tplVersion === 'v2' ? 5 : 6;
	let filterBy = 'All';

	const pity5 = writable(0);
	const pity4 = writable(0);
	setContext('pity5', pity5);
	setContext('pity4', pity4);

	$: banner = $bannerList.find((v, i) => i === $activeBanner).type;
	$: pity5.set(localPity.get(`pity5-${banner}`));
	$: pity4.set(localPity.get(`pity4-${banner}`));

	const selectBanner = (path) => {
		activepage = 1;
		banner = path;
		filterBy = 'All';
	};
	setContext('selectBanner', selectBanner);

	const clearHistory = () => {
		filterBy = 'clear';
		activepage = 1;
	};
	setContext('clearHistory', clearHistory);

	const filter = (selected) => {
		filterBy = selected;
		activepage = 1;
	};
	setContext('tableFilter', filter);

	const setDataLength = (allData, dataToShow) => {
		dataLength = allData;
		filteredDataLength = dataToShow;
	};
	setContext('setDataLength', setDataLength);

	const navigation = (page) => (activepage = page);
	setContext('navigation', navigation);

	let container;
	onMount(() => {
		OverlayScrollbars(container, { sizeAutoCapable: false, className: 'os-theme-light' });
	});
</script>

<svelte:head>
	<title>
		{$t(`history.title`)} | {$t('title', { default: APP_TITLE })}
	</title>
</svelte:head>

{#if tplVersion === 'v2'}
	<Title type="history" />
	<SelectBanner v2 {banner} />
	<div class="container" bind:this={container}>
		<div class="wrapper">
			<p class="v2">{$t('history.disclaimer')}</p>
			<div class="row">
				<Report {dataLength} v2 />
				<Filter {filterBy} v2 />
			</div>
			<List v2 {banner} filter={filterBy} page={{ activepage, itemPerPage }} />
			<Iklan type="banner" />
		</div>
	</div>
	<Legends {banner} v2 />
	<Pagination v2 dataLength={filteredDataLength} {itemPerPage} {activepage} />

	<!-- Old Layout -->
{:else}
	<SelectBanner {banner} />
	<p>{$t('history.disclaimer')}</p>

	<div class="info">
		<div class="left">
			<Report {dataLength} />
		</div>
		<div class="right">
			<Reset {banner} />
			<Filter {filterBy} />
		</div>
	</div>

	<List {banner} filter={filterBy} page={{ activepage, itemPerPage }} />
	<Legends {banner} />
	<Pagination dataLength={filteredDataLength} {itemPerPage} {activepage} />
{/if}

<style>
	p {
		padding: 1rem 0;
	}

	.info {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		margin-bottom: 0.5rem;
	}

	.info > .right {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	@media screen and (max-width: 450px) {
		.info {
			flex-direction: column;
			width: 100%;
		}
		.left {
			width: 100%;
		}
	}

	/* V2 */
	.row {
		display: flex;
	}

	.container {
		height: 100%;
	}

	p.v2 {
		color: #8e8e8e;
		line-height: 120%;
		padding: calc(0.008 * var(--content-width)) 0;
		font-size: calc(0.014 * var(--content-width));
	}
</style>
