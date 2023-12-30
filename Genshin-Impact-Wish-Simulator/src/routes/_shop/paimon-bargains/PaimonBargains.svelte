<script>
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { assets } from '$lib/store/app-stores';
	import { playSfx } from '$lib/helpers/audio/audio';

	import Icon from '$lib/components/Icon.svelte';
	import ShopGroup from '../_shop-group.svelte';
	import ShopGroupItem from '../_shop-group-item.svelte';
	import NavlinkTop from '../_navlink-top.svelte';
	import NavlinkTopButton from '../_navlink-top-button.svelte';

	let activeCurrency = 'starglitter';

	const pricelist = {
		starglitter: { price: 5, rarity: 5 },
		stardust: { price: 125, rarity: 4 },
		primogem: { price: 160, rarity: 5 }
	};

	const openExchangeModal = getContext('openExchangeModal');
	const selectItem = (itemToExchange) => {
		playSfx();
		const currency = activeCurrency;
		const { price, rarity } = pricelist[activeCurrency];
		const data = { itemToExchange, price, rarity, currency };
		openExchangeModal(data);
	};

	const handlePaimonClick = ({ detail }) => {
		if (activeCurrency === detail.selected) return;
		activeCurrency = detail.selected;
		playSfx('shopsubnav');
	};
</script>

<NavlinkTop>
	{#each ['starglitter', 'stardust', 'primogem'] as val}
		<NavlinkTopButton on:click={handlePaimonClick} name={val} active={activeCurrency === val}>
			{$t(`shop.exchange.${val}`)}
		</NavlinkTopButton>
	{/each}
</NavlinkTop>

<ShopGroup>
	{#each ['intertwined', 'acquaint'] as fate, i}
		<ShopGroupItem>
			<button
				on:click={() => selectItem(fate)}
				in:fade={{ duration: 300, delay: Math.sqrt(i * 5000) }}
			>
				<div class="content">
					<picture style="background-image: url('{$assets['5star-bg.webp']}')">
						<Icon type={fate} width="60%" />
						<span> {$t(`shop.item.${fate}`)} </span>
					</picture>
					<div class="price">
						{#each Object.keys(pricelist) as key}
							{#if activeCurrency === key}
								<Icon type={key} width="15%" />
								<span style="margin-left: 5px">{pricelist[key].price}</span>
							{/if}
						{/each}
					</div>
				</div>
			</button>
		</ShopGroupItem>
	{/each}
</ShopGroup>

<style>
	button {
		width: 100%;
		height: 100%;
		transition: all 0.2s;
		position: relative;
	}
	button::after {
		content: '';
		position: absolute;
		z-index: -1;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		height: 100%;
		border-radius: 0.8rem;
		border: 0.3rem solid #eac343;
		opacity: 0;
		transition: opacity 0.15s;
	}
	button:hover::after {
		opacity: 1;
	}
	button:active {
		transform: scale(0.95);
	}

	.content {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		border-radius: 0.5rem;
		overflow: hidden;
		text-align: center;
		background-color: #596982;
	}

	.content picture {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		margin-top: -10%;
		align-items: center;
		position: relative;
		background-size: cover;
		border-bottom-right-radius: 1.4rem;
		overflow: hidden;
	}
	.content picture span {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		color: #fff;
		transform: scale(0.9);
		-webkit-text-stroke: 0.2px black;
		text-transform: capitalize;
	}
	.price {
		width: 100%;
		height: 20%;
		color: #fff;
		-webkit-text-stroke: 0.02rem black;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
