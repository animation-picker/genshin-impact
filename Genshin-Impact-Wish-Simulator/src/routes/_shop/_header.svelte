<script>
	import { getContext } from 'svelte';
	import { fly } from 'svelte/transition';
	import { t } from 'svelte-i18n';

	import {
		genesis,
		primogem,
		stardust,
		starglitter,
		mobileMode,
		viewportWidth,
		activeVersion
	} from '$lib/store/app-stores';
	import { playSfx } from '$lib/helpers/audio/audio';
	import { isNewOutfitReleased } from '$lib/helpers/outfit';

	import MyFund from '$lib/components/MyFund.svelte';
	import NoticeMark from '$lib/components/NoticeMark.svelte';

	export let activeShop = 'genesis';

	$: resizeable = $viewportWidth < 700 && !$mobileMode;

	const { patch } = $activeVersion;
	const openedNotices = [`outfits-${patch}`, `recomended-${patch}`];
	const hasNewOutfit = isNewOutfitReleased(patch);

	const asideToggle = getContext('asideToggle');

	const navigate = getContext('navigate');
	const handleClose = () => {
		playSfx('close');
		navigate('index');
	};
</script>

<div class="item-header" transition:fly={{ y: -20, duration: 250 }}>
	<div class="info" style="display: flex; align-items: center">
		{#if resizeable}
			<button class="toggle" on:click={asideToggle}>
				{#if hasNewOutfit}
					<NoticeMark name={openedNotices} style="transform: translateX(70%) translateY(-150%)" />
				{/if}
				<span />
			</button>
		{/if}
		{#if activeShop === 'donate'}
			<span> 随便给点吧, 我买东西吃. </span>
		{:else}
			<span> {$t('shop.noLimitTime')} </span>
		{/if}
	</div>
	<div class="fates">
		{#if ['genesis', 'outfits', 'recomended'].includes(activeShop)}
			<MyFund type="primogem" plusbutton>
				{$primogem}
			</MyFund>
			<MyFund type="genesis">
				{$genesis}
			</MyFund>
		{:else if activeShop === 'paimon-bargains'}
			<MyFund type="stardust">
				{$stardust}
			</MyFund>
			<MyFund type="starglitter">
				{$starglitter}
			</MyFund>
			<MyFund type="primogem" plusbutton>
				{$primogem}
			</MyFund>
		{/if}

		<button class="close" on:click={handleClose}>
			<i class="gi-close" />
		</button>
	</div>
</div>

<style>
	.toggle {
		display: inline-block;
		width: 40px;
		height: 40px;
		border: 1px solid #d2c69c;
		margin-right: 5px;
		position: relative;
	}

	.toggle span {
		display: block;
		width: 60%;
		height: 2px;
		top: 50%;
		left: 50%;
		position: absolute;
		transform: translate(-50%, -50%);
		background-color: #d2c69c;
	}
	.toggle span::after,
	.toggle span::before {
		display: block;
		position: absolute;
		left: 0;
		width: 100%;
		height: 2px;
		content: '';
		background-color: #d2c69c;
	}
	.toggle span::before {
		top: -300%;
	}
	.toggle span::after {
		bottom: -300%;
	}

	.item-header {
		height: 80px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #d2c69c;
		position: relative;
	}
	:global(.mobile) .item-header {
		height: 40px;
	}

	.fates {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	:global(.mobile) .fates {
		margin-right: 5%;
	}
	@media screen and (max-width: 500px) {
		.item-header {
			flex-direction: column;
			justify-content: center;
		}
		.info {
			width: 100%;
		}
		.close {
			position: absolute;
			top: 20%;
			right: 0;
		}
	}
</style>
