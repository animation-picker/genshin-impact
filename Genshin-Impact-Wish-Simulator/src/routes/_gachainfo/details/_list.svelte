<script>
	import { t } from 'svelte-i18n';
	import { isCustomBanner } from '$lib/store/app-stores';

	export let drop5star;
	export let drop4star;
	export let drop3star;
	export let bannerType = '';
	export let tplVersion = 'v1';

	let value5star;
	let value4star;
	let value3star;

	if (bannerType === 'weapon-event') {
		value5star = { singlePercentage: '0.700%', avgPercentage: '1.850%', rarity: 5 };
		value4star = { singlePercentage: '6.000%', avgPercentage: '14.500%', rarity: 4 };
		value3star = { singlePercentage: '93.300%', avgPercentage: '83.650%', rarity: 4 };
	} else {
		value5star = { singlePercentage: '0.600%', avgPercentage: '1.600%', rarity: 5 };
		value4star = { singlePercentage: '5.100%', avgPercentage: '13.000%', rarity: 4 };
		value3star = { singlePercentage: '94.300%', avgPercentage: '85.400%', rarity: 4 };
	}
</script>

<div class="list" class:v2={tplVersion === 'v2'}>
	<h4>{$t('details.itemWishFor')}</h4>
	<h3 class="star5">
		<div class="star">
			{#each Array(5) as i} <i class="gi-star" /> {/each}
		</div>
		<span>
			{$t('details.probInfo', { values: value5star })}
		</span>
	</h3>
	<div class="table">
		<div>
			<div class="row head">
				<div class="cell">{$t('details.itemType')}</div>
				<div class="cell">{$t('details.itemName')}</div>
				<div class="cell">{$t('details.itemType')}</div>
				<div class="cell">{$t('details.itemName')}</div>
			</div>

			<div class="body">
				<div class="row">
					{#each drop5star as { name, type, rateup }}
						<div class="cell">
							{$t(type || 'character')}
						</div>

						{#if $isCustomBanner && rateup}
							<div class="cell">
								{name} <i class="gi-arrow-up" />
							</div>
						{:else}
							<div class="cell">
								{type === 'weapon' ? $t(name) : $t(`${name}.name`)}
								{#if rateup} <i class="gi-arrow-up" />{/if}
							</div>
						{/if}
					{/each}
				</div>
			</div>
		</div>
	</div>

	<h3 class="star4">
		<div class="star">
			{#each Array(5) as z, i}
				<i class="gi-star" style={i > 3 ? 'color: transparent' : ''} />
			{/each}
		</div>
		<span>
			{$t('details.probInfo', { values: value4star })}
		</span>
	</h3>
	<div class="table">
		<div>
			<div class="row head">
				<div class="cell">{$t('details.itemType')}</div>
				<div class="cell">{$t('details.itemName')}</div>
				<div class="cell">{$t('details.itemType')}</div>
				<div class="cell">{$t('details.itemName')}</div>
			</div>

			<div class="body">
				<div class="row">
					{#each drop4star as { name, type, rateup }}
						<div class="cell">
							{$t(type)}
						</div>
						<div class="cell">
							{type === 'weapon' ? $t(name) : $t(`${name}.name`)}
							{#if rateup} <i class="gi-arrow-up" />{/if}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<h3 class="star3">
		<div class="star">
			{#each Array(5) as x, i}
				<i class="gi-star" style={i > 2 ? 'color: transparent' : ''} />
			{/each}
		</div>
		<span>
			{$t('details.probInfo', { values: value3star })}
		</span>
	</h3>
	<div class="table">
		<div>
			<div class="row head">
				<div class="cell">{$t('details.itemType')}</div>
				<div class="cell">{$t('details.itemName')}</div>
				<div class="cell">{$t('details.itemType')}</div>
				<div class="cell">{$t('details.itemName')}</div>
			</div>

			<div class="body">
				<div class="row">
					{#each drop3star as { name, type }}
						<div class="cell">
							{$t(type)}
						</div>
						<div class="cell">
							{type === 'weapon' ? $t(name) : $t(`${name}.name`)}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.gi-arrow-up {
		font-size: 1.2rem;
		vertical-align: middle;
		line-height: 0;
		color: #51be51;
	}

	.gi-star {
		color: #feca33;
	}

	:not(.v2) h3,
	:not(.v2) .table .body .row {
		vertical-align: middle;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	h3 {
		padding: 0 0.7rem;
		font-weight: 400;
		background-color: #a28052;
		display: flex;
		align-items: center;
		margin-bottom: 1%;
	}

	.v2 h3 {
		color: #fff;
		font-size: calc(0.015 * var(--content-width));
		padding: 0.5% 2%;
		margin: 0;
	}

	h3 span {
		padding-left: 2rem;
	}

	h3.star5 {
		background-color: #dbbba4;
	}
	.v2 h3.star5 {
		background-color: #cfb383;
	}

	h3.star4 {
		background-color: #b7abbf;
	}
	.v2 h3.star4 {
		background-color: #b5a8c9;
	}

	h3.star3 {
		background-color: #a5bacc;
	}
	.v2 h3.star3 {
		background-color: #aabdc9;
	}

	h4 {
		color: #a28052;
		font-weight: 500;
		font-size: larger;
		margin-top: 1%;
		margin-bottom: 2%;
	}

	.v2 h4 {
		color: var(--text-color);
		font-size: calc(0.015 * var(--content-width));
	}

	.table {
		padding: 0 0 2rem;
		width: 100%;
		font-size: 0.9rem;
	}
	.row {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		border: 0.2px solid #b5b2ae;
	}
	.row.head {
		background-color: #dbd7d3;
		font-family: var(--genshin-font);
	}
	.body .row {
		border-top: 0;
	}

	.cell:nth-child(odd) {
		width: calc(3 / 14 * 100%);
	}
	.cell:nth-child(even) {
		width: calc(4 / 14 * 100%);
	}

	.cell {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		padding: 1rem 0.5rem;
		height: 100%;
		text-align: center;
		line-height: 1.2rem;
		height: 3.2rem;
	}

	.v2 .cell {
		font-size: calc(0.015 * var(--content-width));
		height: calc(0.05 * var(--content-width));
	}

	.head .cell {
		border: solid #b5b2ae;
		border-width: 0 0.07rem;
	}
	.body .cell {
		border: solid #b5b2ae;
		border-width: 0 0.07rem 0.07rem 0;
		color: #a7865a;
	}
</style>
