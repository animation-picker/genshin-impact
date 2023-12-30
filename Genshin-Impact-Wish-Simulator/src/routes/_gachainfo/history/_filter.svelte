<script>
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';

	export let filterBy;
	export let v2 = false;

	let showTableFilterOption = false;
	$: filterTxt = isNaN(filterBy)
		? $t('history.filterAll')
		: $t('history.filter', { values: { rarity: filterBy } });

	const filterFunc = getContext('tableFilter');
	const filter = (selected) => {
		showTableFilterOption = !showTableFilterOption;
		filterFunc(selected);
	};
</script>

<div class="table-filter" class:v2>
	<span class="filter-selected" on:click={() => (showTableFilterOption = !showTableFilterOption)}>
		{$t('history.filterTxt')} / {filterTxt}
		<i class="gi-caret-{showTableFilterOption ? 'up' : 'down'}" />
	</span>
	{#if showTableFilterOption}
		<div class="options" transition:fade={{ duration: 200 }}>
			<span on:click={() => filter('All')} class:active={isNaN(filterBy)}>
				{$t('history.filterAll')}
			</span>
			<span on:click={() => filter(5)} class:active={filterBy === 5}>
				{$t('history.filter', { values: { rarity: 5 } })}
			</span>
			<span on:click={() => filter(4)} class:active={filterBy === 4}>
				{$t('history.filter', { values: { rarity: 4 } })}
			</span>
			<span on:click={() => filter(3)} class:active={filterBy === 3}>
				{$t('history.filter', { values: { rarity: 3 } })}
			</span>
		</div>
	{/if}
</div>

<style>
	.table-filter {
		position: relative;
	}

	.filter-selected {
		display: inline-block;
		border: 1px solid #c3a280;
		border-radius: 0.2rem;
		padding: 0.3rem 1rem;
		text-align: center;
	}

	.table-filter .options {
		position: absolute;
		top: 110%;
		right: 0;
		width: 100%;
		display: flex;
		flex-direction: column;
		z-index: +1;
		background: #e8e6e5;
		border: 1px solid #c3a280;
		border-radius: 0.3rem;
		padding: 0 0.2rem;
	}

	.table-filter .options span {
		padding: 0.3rem 1rem;
		transition: all 0.2s;
		border-bottom: 0.5px solid #c8c8c8;
	}
	.table-filter .options span:hover {
		background-color: #d6d1cb;
	}

	/*  V2  */
	.table-filter.v2 {
		font-size: calc(0.012 * var(--content-width));
		margin-left: auto;
		margin-top: auto;
		margin-bottom: 0.5%;
	}

	.table-filter.v2 .options {
		background-color: #646975;
		border: 0;
		padding: 0;
		color: #fff;
		overflow: hidden;
	}
	.v2 .options span {
		border: 0;
		padding: calc(0.015 * var(--content-width)) calc(0.02 * var(--content-width));
		position: relative;
		margin: 1%;
	}
	.v2 .options span:hover {
		background-color: #717887;
	}

	.v2 .options span.active,
	.v2 .options span:hover {
		background-color: #717887;
		border-radius: 3rem;
	}

	.v2 .options span.active::after {
		content: '✔';
		color: #eee;
		position: absolute;
		display: block;
		top: 50%;
		right: 10%;
		font-size: 170%;
		line-height: 0;
		transform: translateY(-50%);
	}
</style>
