<script>
	import { fly } from 'svelte/transition';
	import {
		genesis,
		primogem,
		starglitter,
		stardust,
		acquaint,
		intertwined
	} from '$lib/store/app-stores';
	import MyFund from '$lib/components/MyFund.svelte';

	export let itemToBuy = '';

	const isPaimon = ['intertwined', 'acquaint'].includes(itemToBuy);
	$: fates = itemToBuy === 'intertwined' ? $intertwined : $acquaint;
</script>

<div class="funds" transition:fly={{ y: -15, duration: 300 }}>
	<div class="fates">
		{#if isPaimon}
			<MyFund type="stardust">{$stardust}</MyFund>
			<MyFund type="starglitter">{$starglitter}</MyFund>
			<MyFund type="primogem">{$primogem}</MyFund>
			<MyFund type={itemToBuy}>{fates}</MyFund>
		{/if}

		{#if !isPaimon}
			<MyFund type="primogem">{$primogem}</MyFund>
			<MyFund type="genesis">{$genesis}</MyFund>
		{/if}
	</div>
</div>

<style>
	.funds {
		position: fixed;
		z-index: +999;
		top: 0;
		left: 0;
		width: 100vw;
		padding: 1.2rem 3%;
		background-color: #1a1b24;
		display: flex;
		justify-content: flex-end;
	}
	:global(.mobile) .funds {
		padding: 0.7rem 3%;
	}
</style>
