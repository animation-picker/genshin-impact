<script>
	import { getContext, setContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import { assets } from '$lib/store/app-stores';
	import { getCharDetails } from '$lib/helpers/gacha/itemdrop-base';
	import { owneditem } from '$lib/helpers/dataAPI/api-localstore';
	import { positionToStyle } from '$lib/helpers/cssPosition';
	import { getName } from '$lib/helpers/nameText';
	import { playSfx } from '$lib/helpers/audio/audio';

	import Icon from '$lib/components/Icon.svelte';
	import ButtonModal from '$lib/components/ButtonModal.svelte';
	import ModalConfirm from '../character-outfit/_modal-confirm.svelte';

	export let data = {};
	let name, offset, promoPrice, price, isOwned, characterName, rarity, itemID;
	$: ({ name, offset, promoPrice, price, isOwned, characterName, rarity } = data);
	$: ({ itemID } = getCharDetails(characterName));

	let showConfirmModal = false;
	const cancelConfirm = () => {
		showConfirmModal = false;
		playSfx('close');
	};
	setContext('cancelConfirm', cancelConfirm);

	const openExchangeModal = getContext('openExchangeModal');
	const showDetailModal = () => {
		playSfx();
		showConfirmModal = false;

		const exchangeData = {
			rarity,
			isOutfit: true,
			price: promoPrice,
			currency: 'genesis',
			itemToExchange: name
		};
		openExchangeModal(exchangeData);
	};
	setContext('showDetailModal', showDetailModal);

	const prepareToBuy = () => {
		const { qty } = owneditem.get(itemID);
		if (qty > 0) return showDetailModal();

		playSfx();
		showConfirmModal = true;
		return;
	};
</script>

{#if showConfirmModal}
	<ModalConfirm />
{/if}

<img
	class="outfit-art"
	src={$assets[`splash-art/${name}`]}
	alt={getName(name)}
	style={positionToStyle(offset?.storeCard || {})}
/>

<div class="remaining card-stroke">{$t('shop.limitedOffer')}</div>
<div class="details">
	<div class="name stroke">{$t(`outfit.item.${name}.name`)}</div>
	<div class="price">
		<Icon type="genesis" style="margin-right:-1%; width: 10%" />
		<span class="dicount stroke"> {promoPrice} </span>

		<del class="real-price"> {price} </del>
	</div>
</div>

<div class="frame">
	<div class="description">
		<div class="title">{$t('shop.recomended.newOutfit')}</div>
		<span class="name">{$t(`outfit.item.${name}.name`)}</span>
		<p class="card-stroke">
			{$t(`outfit.item.${name}.description`)}
		</p>
	</div>
	<div class="purchase-button">
		{#if isOwned}
			<span class="owned">{$t('outfit.owned')}</span>
		{:else}
			<ButtonModal text={$t('shop.purchaseButton')} type="confirm" on:click={prepareToBuy} />
		{/if}
	</div>
</div>

<style>
	.owned {
		color: #de2f22;
	}

	img.outfit-art {
		position: absolute;
		top: -16.5%;
		left: -31%;
		width: 130%;
	}

	.frame {
		padding-top: 2% !important;
	}
	.remaining {
		color: #5391b3;
		width: 35%;
		position: absolute;
		top: 2%;
		left: 2%;
		font-size: calc(0.03 * var(--content-width));
	}

	.description {
		width: 50%;
		text-align: right;
		color: #787b84;
		text-shadow: 0 0 1rem #f7f3eb;
	}

	.description p {
		line-height: 130%;
		font-size: calc(0.04 * var(--content-width));
		max-height: calc(0.52 * var(--content-width));
		overflow-y: auto;
	}

	.title {
		display: block;
		margin-left: auto;
		width: 80%;
		color: #3c4b5e;
		font-size: calc(0.07 * var(--content-width));
		line-height: 120%;
	}
	span.name {
		color: #3c4b5e;
		font-weight: bold;
		display: block;
		margin: 5% 0;
	}

	.details {
		height: 100%;
		display: flex;
		flex-direction: column;
		position: absolute;
		left: 0;
		top: 0;
		padding-bottom: 5%;
		padding-left: 3%;
	}
	.details .name {
		font-size: calc(0.08 * var(--content-width));
		width: 50%;
		line-height: 120%;
		margin-top: auto;
		color: #fff;
		filter: drop-shadow(0 0 25px #787b84);
	}

	.price {
		position: relative;
		color: #fff;
		margin-top: 5%;
		filter: drop-shadow(0 0 25px #787b84);
	}
	.dicount {
		font-size: calc(0.11 * var(--content-width));
	}

	.stroke {
		/* prettier-ignore */
		text-shadow:
    -0.025rem -0.025rem 0 #3c4b5e,
     0   		 -0.025rem 0 #3c4b5e,
     0.025rem -0.025rem 0 #3c4b5e,
     0.025rem  0 		  0 #3c4b5e,
     0.025rem  0.025rem 0 #3c4b5e,
     0    		0.025rem 0 #3c4b5e,
    -0.025rem  0.025rem 0 #3c4b5e,
    -0.025rem  0		    0 #3c4b5e;
	}

	.real-price {
		position: absolute;
		left: 52%;
		bottom: 0;
		transform: translateY(-50%);
		color: #fff;
		background-color: #88ba59;
		padding: 0.1rem 1rem 0.1rem 0.7rem;
		border-bottom-left-radius: 1rem;
		border-top-left-radius: 1rem;
		border-bottom-right-radius: 2rem;
	}
</style>
