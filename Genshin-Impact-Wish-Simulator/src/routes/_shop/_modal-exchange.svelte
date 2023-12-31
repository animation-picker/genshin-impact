<script>
	import { getContext, setContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import {
		assets,
		acquaint,
		intertwined,
		genesis as gs,
		primogem as primo,
		stardust as sd,
		starglitter as sg
	} from '$lib/store/app-stores';
	import { localBalance } from '$lib/helpers/dataAPI/api-localstore';
	import { playSfx } from '$lib/helpers/audio/audio';

	import Icon from '$lib/components/Icon.svelte';
	import Modal from '$lib/components/ModalTpl.svelte';
	import Range from '$lib/components/Range.svelte';
	import ModalBalance from './_modal-balance.svelte';

	export let data = {};
	const { itemToExchange, currency, price, rarity, isOutfit, isOwned } = data;

	const balanceList = {
		starglitter: sg,
		stardust: sd,
		primogem: primo,
		genesis: gs
	};

	const openObtained = getContext('openObtained');
	const closeExchangeModal = getContext('closeExchageModal');
	const closeModal = () => {
		playSfx('close');
		closeExchangeModal();
	};
	setContext('closeModal', closeModal);

	// Initialize Game Currencies
	const fates = itemToExchange === 'intertwined' ? intertwined : acquaint;
	const balance = balanceList[currency];
	const max = ($balance - ($balance % price)) / price;

	// Set Range Value
	let value = 1;
	const setValue = (val) => (value = val);
	setContext('setValue', setValue);

	// Buy Button Clicked
	const buyOutfit = getContext('buyOutfit');

	const confirmPurchase = () => {
		playSfx();
		closeExchangeModal();
		balance.update((v) => {
			const newVal = v - value * price;
			localBalance.set(currency, newVal);
			return newVal;
		});

		if (isOutfit) return buyOutfit();

		fates.update((v) => {
			const newVal = v + value;
			localBalance.set(itemToExchange, newVal);
			return newVal;
		});

		openObtained([{ qty: value, item: itemToExchange }]);
	};

	// Get Content Height for layouting
	let contentHeight;
</script>

<ModalBalance itemToBuy={itemToExchange} />
<Modal
	title={$t('shop.purchaseHeading')}
	on:cancel={closeModal}
	on:confirm={confirmPurchase}
	disabled={isOwned || max < 1}
>
	<span slot="confirmtext"> {$t('shop.purchaseButton')} </span>
	<div
		class="content"
		bind:clientHeight={contentHeight}
		style="--content-height: {contentHeight}px"
	>
		<div class="item star{rarity}">
			<div class="primo">
				<span class="primogem" class:red={max < 1}>
					<Icon
						type={currency}
						height="80%"
						width="auto"
						style="position: absolute; left: 5px;top: 50%; transform: translateY(-50%);"
					/>
					{value * price}
				</span>
			</div>
			<picture>
				<!-- Item Icon -->
				{#if isOutfit}
					<img
						src={$assets[`thumbnail/${itemToExchange}`]}
						width="75%"
						alt={$t(`outfit.item.${itemToExchange}.name`)}
					/>
				{:else}
					<Icon type={itemToExchange} width="70%" />
				{/if}
			</picture>
			<div class="description">
				<div class="title">
					<!-- Item Name -->
					{#if isOutfit}
						{$t(`outfit.item.${itemToExchange}.name`)}
					{:else}
						{$t(`shop.item.${itemToExchange}`)}
					{/if}
				</div>

				<div class="star">
					{#each Array(rarity) as _, i}
						<i class="gi-star" />
					{/each}
				</div>

				<!-- Description -->
				{#if isOutfit}
					<p>{$t(`outfit.item.${itemToExchange}.description`)}</p>
				{:else}
					<p>{$t(`shop.description.${itemToExchange}`)}</p>
				{/if}
			</div>
		</div>

		<div class="slider">
			<div class="rangeNumber">
				<span>{$t('shop.qty')} :</span>
				<span style="font-size: larger">{value}</span>
			</div>
			<div class="rangeInput">
				<Range
					{value}
					min={max < 1 || isOutfit ? 0 : 1}
					max={isOutfit ? 1 : max || 1}
					disabled={max < 1 || isOutfit}
				/>
				{#if isOwned}
					<div class="error red">{$t('outfit.owned')}</div>
				{:else if max < 1}
					<div class="error red">{$t('shop.insufficient')}</div>
				{/if}
			</div>
		</div>
	</div>
</Modal>

<style>
	.red {
		color: #de2f22 !important;
	}

	.content {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.item {
		display: flex;
		width: 100%;
		height: calc(0.45 * var(--content-height));
	}
	.item.star5 {
		background-image: linear-gradient(-15deg, #e0b466, #817874);
	}
	.item.star4 {
		background-image: linear-gradient(-15deg, #b988c8, #625a8a);
	}
	.primo {
		position: absolute;
		top: 0.2rem;
		right: 0.2rem;
	}
	.primogem {
		padding: 2px 15px 0 30px;
		display: inline-flex;
		align-items: center;
		max-width: 112px;
		height: 25px;
		position: relative;
		overflow: hidden;
		background-color: rgba(0, 0, 0, 0.3);
		border-radius: 50px;
		color: #fff;
		text-align: center;
		margin: 0 8px;
		font-size: 0.8rem;
	}

	picture {
		display: flex;
		justify-content: center;
		align-items: center;
		height: calc(0.45 * var(--content-height));
		aspect-ratio: 1/1;
	}

	.description {
		max-width: calc(100% - (0.45 * var(--content-height)));
		color: #fff;
		font-size: 0.7rem;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		text-align: left;
		padding: 0.3rem;
	}
	.title {
		font-size: 1.1rem;
		text-transform: capitalize;
	}
	.gi-star {
		color: #eac343;
		font-size: 0.9rem;
		padding-top: 2px;
	}

	.description p {
		height: 100%;
		overflow-y: auto;
		color: #fff;
	}

	.col {
		width: 100%;
		flex-basis: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		padding: 0.1em 0 0.7em;
	}

	.col span {
		width: 100%;
		position: absolute;
		bottom: 0.3rem;
		left: 50%;
		transform: translateX(-50%);
		font-size: 0.7rem;
	}

	.slider,
	.rangeNumber,
	.rangeInput {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		width: 100%;
		position: relative;
		font-size: 1rem;
	}

	:global(.mobile) .rangeInput {
		font-size: 0.8rem;
	}
	.rangeNumber {
		font-size: 0.8rem;
		margin-bottom: -0.5rem;
	}
	.slider {
		padding: 1% 0;
	}
	.error {
		font-size: 80%;
	}

	@media screen and (max-width: 890px) {
		.primogem {
			height: 20px;
			margin: 0 3px;
		}
	}
	@media screen and (max-width: 400px) {
		.primogem {
			max-width: 80px;
		}
	}
</style>
