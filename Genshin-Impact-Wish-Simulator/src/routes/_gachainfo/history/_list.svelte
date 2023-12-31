<script>
	import { browser } from '$app/environment';
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import { HistoryManager } from '$lib/helpers/dataAPI/api-indexeddb';
	import { getBannerName, getName } from '$lib/helpers/nameText';

	export let v2 = false;
	export let banner = 'beginner';
	export let filter = '';
	export let page = { itemPerPage: 0, activepage: 0 };

	let data = [];
	let dataToShow = [];

	const { getListByBanner } = HistoryManager;
	const setDataLength = getContext('setDataLength');

	const getItemPage = (data, { itemPerPage = 0, activepage = 0 } = {}) => {
		const result = data.filter((d, i) => {
			const begining = i > (activepage - 1) * itemPerPage - 1;
			const end = i < itemPerPage * activepage;
			return begining && end;
		});
		return result;
	};

	const filterData = (filterBy) => data.filter(({ rarity }) => rarity === filterBy);
	const readData = async (banner, filter) => {
		if (!browser) return [];
		const bannerList = await getListByBanner(banner);
		data = bannerList.map((d) => d).reverse();
		dataToShow = filter && filter !== 'All' ? filterData(filter) : data;
		setDataLength(data.length, dataToShow.length);
		return data;
	};

	$: readData(banner, filter);

	const query = getContext('query');
	const navigate = getContext('navigate');
	const search = (bannerName) => {
		query.set(getName(bannerName));
		navigate('allbanners');
	};
</script>

<div class="table" class:v2>
	<div style="min-width: max-content;">
		<div class="row head">
			<div class="cell cell0">{$t('history.pity')}</div>
			<div class="cell cell1">{$t('details.itemType')}</div>
			<div class="cell cell2">{$t('details.itemName')}</div>
			<div class="cell cell3">{$t('history.timeReceived')}</div>
			<div class="cell cell4">{$t('wish.banner.text')}</div>
		</div>

		<div class="body">
			{#if dataToShow.length < 1}
				<div class="row" style="justify-content: center">
					<div class="cell">{$t('history.noData')}</div>
				</div>
			{:else}
				{#each getItemPage(dataToShow, page) as { name, type, rarity, time, pity, bannerName, status, custom }}
					<div class="row">
						<div class="cell cell0 star{rarity}">
							{pity}
							{#if status}
								<span class="status"> <i class="gi-{status}" /> </span>
							{/if}
						</div>
						<div class="cell cell1">{$t(type)}</div>
						{#if custom}
							<div class="cell cell2 star{rarity}">
								{name} ( 5★ )
							</div>
						{:else}
							<div class="cell cell2 star{rarity}">
								{type === 'weapon' ? $t(name) : $t(`${name}.name`)}
								{#if rarity > 3} ( {rarity}★ ) {/if}
							</div>
						{/if}
						<div class="cell cell3">{time}</div>
						<div class="cell cell4">
							{#if bannerName}
								{@const bn = getBannerName(bannerName).name}
								{#if custom || !bn}
									<span> {bannerName} </span>
								{:else if banner.match('event')}
									<a href="/" on:click|preventDefault={() => search(bannerName)}>
										{@html $t(`banner.${bn}`)}
									</a>
								{:else}
									{$t(`banner.wanderlust`)}
								{/if}
							{:else}
								{$t('history.untracked')}
							{/if}
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>

<style>
	a {
		margin: 5px;
	}

	span.status {
		font-size: 80%;
		margin-left: 5%;
	}
	.table {
		width: 100%;
		height: 21.5rem;
	}
	.row {
		display: flex;
		justify-content: stretch;
		align-items: center;
		width: 100%;
		border: 0.2px solid #b5b2ae;
		height: 3rem;
	}
	.row.head {
		background-color: #dbd7d3;
		font-weight: bold;
	}
	.body .row {
		border-top: 0;
	}

	.cell0 {
		width: calc(1 / 12 * 100%);
		border-right: 0.2px solid #b5b2ae;
	}
	.cell1 {
		min-width: 80px;
		width: calc(2 / 12 * 100%);
		border-right: 0.2px solid #b5b2ae;
	}
	.cell2 {
		width: calc(4 / 12 * 100%);
		border-right: 0.2px solid #b5b2ae;
		min-width: 15rem;
	}
	.cell3 {
		width: calc(2.5 / 12 * 100%);
		border-right: 0.2px solid #b5b2ae;
		min-width: 12rem;
	}
	.cell4 {
		width: calc(2.5 / 12 * 100%);
		min-width: 12rem;
	}
	.cell {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		padding: 1rem 0.5rem;
		height: 100%;
		text-align: center;
		line-height: 1rem;
	}
	.cell a,
	.cell span {
		color: #dda04f;
	}

	.gi-star {
		font-size: 0.8em;
	}

	.star4 {
		color: #a256e1;
	}
	.star5 {
		color: #bd6932;
	}

	/* V2 */
	.table.v2 {
		font-size: calc(0.015 * var(--content-width));
		color: #8e8e8e;
		height: unset;
	}

	.table.v2 .row.head {
		color: var(--text-color);
		background-color: #ede1ca;
	}
	.table.v2 .row:not(.head) {
		background-color: #f6f1e7;
	}

	.table.v2 .row {
		height: calc(0.045 * var(--content-width));
	}
	.table.v2 .cell,
	.table .row {
		border-color: #d5bf94;
		line-height: 120%;
	}
	.table.v2 .row:not(.head) .cell1,
	.table.v2 .row:not(.head) .cell3,
	.table.v2 .row:not(.head) .cell4 {
		font-size: calc(0.013 * var(--content-width));
	}

	.v2 .cell0,
	.v2 .cell1,
	.v2 .cell2,
	.v2 .cell3,
	.v2 .cell4 {
		min-width: unset;
	}
</style>
