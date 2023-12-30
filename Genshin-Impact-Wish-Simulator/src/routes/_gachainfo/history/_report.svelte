<script>
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import { userCurrencies } from '$lib/helpers/currencies';
	import Icon from '$lib/components/Icon.svelte';

	export let v2 = false;
	export let dataLength = 0;

	const pity5 = getContext('pity5');
	const pity4 = getContext('pity4');

	$: totalSpend = userCurrencies.getTotalSpend(dataLength);
</script>

{#if v2}
	<div class="cell v2">
		{$t('history.currentPity')} &nbsp; <strong class="star5"> {$pity5} </strong> &nbsp; - &nbsp;
		<strong class="star4"> {$pity4} </strong>
		<br />
		{$t('history.totalPull')} <span class="lighted"> <strong> {dataLength} </strong> </span>
	</div>
	<div class="cell v2">
		{$t('history.totalSpend')}
		<span class="lighted">
			<strong style="position:relative">
				{dataLength * 160}
				<Icon type="primogem" />
			</strong>
		</span>
		<br />
		Est. <span class="lighted"> <strong> {totalSpend} </strong> </span>
	</div>
{:else}
	{$t('history.currentPity')} &nbsp; <strong class="star5"> {$pity5} </strong> &nbsp; - &nbsp;
	<strong class="star4"> {$pity4} </strong>
	<br />
	{$t('history.totalPull')} <span class="lighted"> <strong> {dataLength} </strong> </span>
	<br />
	{$t('history.totalSpend')}
	<span class="lighted">
		<strong style="position:relative">
			{dataLength * 160}
			<Icon type="primogem" />
		</strong>
	</span>
	~
	<span class="lighted"> <strong> {totalSpend} </strong> </span>
{/if}

<style>
	.star4,
	.lighted {
		color: #a256e1;
	}
	.star5 {
		color: #bd6932;
	}

	.cell {
		width: 33.33333333333%;
		font-size: calc(0.014 * var(--content-width));
	}

	.lighted :global(img) {
		width: 20px;
		border-radius: 100%;
		aspect-ratio: 1/1;
		border: 1px solid orange;
	}

	.v2 .lighted :global(img) {
		position: absolute;
		right: 0;
		top: 0;
		transform: translate(125%, -20%);
	}
</style>
