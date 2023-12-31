<script>
	import { getContext, setContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';

	import { assets, activeVersion } from '$lib/store/app-stores';
	import { owneditem } from '$lib/helpers/dataAPI/api-localstore';
	import { getCharDetails } from '$lib/helpers/gacha/itemdrop-base';
	import { playSfx } from '$lib/helpers/audio/audio';
	import { getName } from '$lib/helpers/nameText';

	// Components
	import Icon from '$lib/components/Icon.svelte';
	import ModalConfirm from './_modal-confirm.svelte';
	import ShopGroup from '../_shop-group.svelte';
	import ShopGroupItem from '../_shop-group-item.svelte';

	const outfits = getContext('outfits');
	$: outfitList = [...$outfits].reverse().map((outfit) => {
		const { release, promoPrice, price } = outfit;
		const promo = promoPrice && promoPrice !== price;
		outfit.isPromo = $activeVersion.patch === `${release}` && promo;
		return outfit;
	});

	let showConfirmModal = false;
	let outfitToBuy = {};

	const cancelConfirm = () => {
		showConfirmModal = false;
		playSfx('close');
	};
	setContext('cancelConfirm', cancelConfirm);

	const openExchangeModal = getContext('openExchangeModal');
	const showDetailModal = () => {
		playSfx();
		showConfirmModal = false;

		const { rarity, promoPrice, price, name, isPromo, isOwned } = outfitToBuy;

		const exchangeData = {
			rarity,
			isOwned,
			isOutfit: true,
			price: isPromo ? promoPrice : price,
			currency: 'genesis',
			itemToExchange: name
		};
		openExchangeModal(exchangeData);
	};
	setContext('showDetailModal', showDetailModal);

	const prepareToBuy = (data) => {
		outfitToBuy = data;
		const { itemID } = getCharDetails(data.characterName);
		const { qty } = owneditem.get(itemID);
		if (qty > 0 || outfitToBuy.isOwned) return showDetailModal();

		playSfx();
		showConfirmModal = true;
		return;
	};
</script>

{#if showConfirmModal}
	<ModalConfirm />
{/if}

<ShopGroup>
	{#each outfitList as outfitData, i}
		{@const { name, price, promoPrice, isPromo, isOwned, rarity } = outfitData}
		<ShopGroupItem>
			<button
				class:discount={isPromo}
				on:click={() => prepareToBuy(outfitData)}
				in:fade={{ duration: 300, delay: Math.sqrt(i * 5000) }}
			>
				<div class="content">
					{#if isPromo}
						<div class="discount-percentage">-20%</div>
					{/if}

					<div
						class="thumbnail"
						style="background-image: url('{$assets[`${rarity}star-bg.webp`]}');"
					>
						<picture class="star{rarity}">
							<img src={$assets[`thumbnail/${name}`]} alt={getName(name)} />
						</picture>
						<caption>
							<span class="name">{$t(`outfit.item.${name}.name`)}</span>
							{#if isOwned}
								<span class="owned">{$t('outfit.owned')}</span>
							{:else}
								<span class="desc">{$t('shop.purchaseUpto')}</span>
							{/if}
						</caption>
					</div>
					<div class="price">
						<Icon type="genesis" width="15%" />
						{#if isPromo}
							<del class="real-price">{price}</del>
						{/if}
						<span style="margin-left: 5px">{isPromo ? promoPrice : price}</span>
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

	.discount-percentage {
		color: #fff;
		background-color: #88ba59;
		position: absolute;
		top: -0.4rem;
		left: -0.4rem;
		z-index: +1;
		padding: 0.2rem 0.7rem;
		font-size: 0.8rem;
		border-bottom-left-radius: 1rem;
		border-top-left-radius: 1rem;
		border-bottom-right-radius: 2rem;
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
	.thumbnail {
		height: 100%;
		width: 100%;
		position: relative;
		background-size: cover;
	}

	picture::after {
		width: 100%;
		height: 50%;
		content: '';
		display: block;
		position: absolute;
		bottom: 0;
		left: 0;
	}
	picture.star4::after {
		background-image: linear-gradient(to top, rgba(174, 148, 211, 0.8) 40%, rgba(174, 148, 211, 0));
	}
	picture.star5::after {
		background-image: linear-gradient(to top, rgba(224, 180, 102, 0.8) 40%, rgba(224, 180, 102, 0));
	}

	picture {
		display: block;
		width: 100%;
		height: 100%;
		position: relative;
	}
	img {
		width: 58%;
		height: auto;
	}

	caption {
		position: absolute;
		bottom: 0;
		left: 50%;
		width: 100%;
		transform: translateX(-50%);
		z-index: +2;
	}
	caption span {
		display: block;
	}

	.name {
		color: #fdf5f5;
		font-size: 1.1rem;
		line-height: 1.2rem;
		-webkit-text-stroke: 0.02rem #675c31;
		text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.6);
	}

	@media screen and (max-width: 400px) {
		.name {
			font-size: 1.3rem;
		}
	}

	.desc,
	.owned {
		color: #e8dfbb;
		font-size: 0.8em;
		padding-bottom: 0.2rem;
	}

	.owned {
		background-color: #e86b69;
		padding-top: 0.2rem;
	}

	.price {
		width: 100%;
		height: 20%;
		color: #fff;
		-webkit-text-stroke: 0.02rem black;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.discount .price {
		background-color: #88ba59;
	}

	.real-price {
		color: #66892b;
		font-size: 0.7rem;
		position: absolute;
		top: 0.1rem;
		right: 0.5rem;
	}
</style>
