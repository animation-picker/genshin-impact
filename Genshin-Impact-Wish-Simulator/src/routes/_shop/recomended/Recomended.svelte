<script>
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { activeVersion } from '$lib/store/app-stores';
	import { playSfx } from '$lib/helpers/audio/audio';

	import ShopGroup from '../_shop-group.svelte';
	import NavlinkTop from '../_navlink-top.svelte';
	import NavlinkTopButton from '../_navlink-top-button.svelte';
	import OutfitCard from './_item-outfit.svelte';
	import WelkinCard from './_item-welkin.svelte';

	let contentWidth;
	const outfits = getContext('outfits');
	const { patch } = $activeVersion;
	$: newOutfit = $outfits.find(({ release, promoPrice }) => patch === `${release}` && promoPrice);
	$: activeItem = newOutfit ? 'outfit' : 'welkin';

	const selectSubShop = ({ detail }) => {
		if (activeItem === detail.selected) return;
		activeItem = detail.selected;
		playSfx('shopsubnav');
	};
</script>

<NavlinkTop>
	{#if newOutfit}
		<NavlinkTopButton name="outfit" active={activeItem === 'outfit'} on:click={selectSubShop}>
			{$t('outfit.heading')}
		</NavlinkTopButton>
	{/if}

	<NavlinkTopButton name="welkin" active={activeItem === 'welkin'} on:click={selectSubShop}>
		{$t('shop.recomended.welkin')}
	</NavlinkTopButton>
</NavlinkTop>

<ShopGroup>
	<div
		class="content-item"
		bind:clientHeight={contentWidth}
		style="--content-width: {contentWidth}px"
	>
		{#if activeItem === 'outfit'}
			<div class="card outfit" in:fade={{ duration: 400 }}>
				<OutfitCard data={newOutfit} />
			</div>
		{:else}
			<div class="card welkin" in:fade={{ duration: 400 }}>
				<WelkinCard />
			</div>
		{/if}
	</div>
</ShopGroup>

<style>
	.content-item,
	.card {
		display: block;
		width: 100%;
	}

	:global(.mobile) .content-item,
	:global(.mobile) .card {
		max-width: 100%;
		width: fit-content;
		height: 75vh;
		max-height: 40vw;
	}

	.card {
		position: relative;
		background-color: #f7f3eb;
		max-width: 55rem;
		max-height: 75vh;
		aspect-ratio: 1000/561;
		border-radius: 1rem;
		overflow: hidden;
		font-size: calc(0.035 * var(--content-width));
	}

	.content-item :global(.frame) {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		padding-top: 10%;
		z-index: +3;
		padding-right: calc(0.05 * var(--content-width));
	}

	.content-item :global(.purchase-button) {
		width: 48%;
		text-align: right;
		margin-top: auto;
		margin-bottom: 2.5%;
	}
	.content-item :global(.purchase-button .caption) {
		font-size: calc(0.029 * var(--content-width));
	}
	.content-item :global(.card-stroke) {
		line-height: 150%;
		margin-bottom: 5%;
	}

	.outfit {
		position: relative;
	}
	.outfit::after {
		width: 100%;
		height: 100%;
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		background-image: linear-gradient(
			65deg,
			rgba(247, 243, 235, 0) 40%,
			rgba(247, 243, 235, 0.8) 70%
		);
		background-size: cover;
		z-index: +2;
	}
</style>
