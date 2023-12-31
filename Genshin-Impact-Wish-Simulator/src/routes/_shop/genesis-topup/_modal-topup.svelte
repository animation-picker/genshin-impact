<script>
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import { cookie } from '$lib/helpers/dataAPI/api-cookie';
	import { assets, genesis, primogem } from '$lib/store/app-stores';
	import { localBalance } from '$lib/helpers/dataAPI/api-localstore';
	import { playSfx } from '$lib/helpers/audio/audio';

	import Modal from '$lib/components/ModalTpl.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import ModalBalance from '../_modal-balance.svelte';

	export let data = { qty: 0, bonus: 0, price: '0' };

	const closeModal = getContext('closeModal');
	const confirmBuy = getContext('confirmBuy');
	const openObtained = getContext('openObtained');

	let autoConvert = cookie.get('autoconvert-genesis');
	let activeMethod = cookie.get('payment-method') || 'wakaranai';
	$: cookie.set('autoconvert-genesis', autoConvert);

	const selectMethod = (method) => {
		if (method === activeMethod) return;
		playSfx();
		activeMethod = method;
		cookie.set('payment-method', method);
	};

	const convertBuy = () => {
		primogem.update((v) => {
			const afterUpdate = v + data.qty + data.bonus;
			localBalance.set('primogem', afterUpdate);
			return afterUpdate;
		});
	};

	const handleBuy = () => {
		const item = autoConvert ? 'primogem' : 'genesis';
		confirmBuy({ qty: data.qty, bonus: data.bonus, item });
		openObtained([{ qty: data.qty + data.bonus, item }]);

		if (autoConvert) return convertBuy();
		genesis.update((v) => {
			const afterUpdate = v + data.qty + data.bonus;
			localBalance.set('genesis', afterUpdate);
			return afterUpdate;
		});
	};
</script>

<ModalBalance itemToBuy="genesis" />
<Modal on:cancel={closeModal} blank>
	<div class="genesis-modal">
		<div class="header">
			<button class="back" on:click={closeModal}>
				<i class="gi-angle-left" />
			</button>
			<div class="title">{$t('shop.pay')}</div>
		</div>

		<div class="body">
			<div class="detail">
				<picture>
					<span class="product-text">{$t('shop.product')}</span>
					<Icon type="genesis" width="50%" />
					<span class="product-name">{$t('shop.item.genesis')} x{data.qty}</span>
				</picture>
				<div class="price">{data.price}</div>
			</div>

			<div class="payment-type">
				<span>{$t('shop.selectPayment')}</span>
				<div class="list">
					{#each ['Childe', 'Tears', 'Wakaranai'] as method}
						<button
							class="item"
							class:selected={method === activeMethod}
							on:click={() => selectMethod(method)}
						>
							<img src={$assets[`payment-${method.toLocaleLowerCase()}.webp`]} alt="method" />
							{$t(`shop.payment${method}`)}
						</button>
					{/each}
				</div>
			</div>
			<div class="auto-convert">
				<input
					id="convert"
					type="checkbox"
					style="margin-right: .4rem"
					bind:checked={autoConvert}
					on:change={() => playSfx('click2')}
				/>
				<label for="convert">{$t('shop.convertPrimo')} </label>
			</div>
			<div class="button-payment">
				<button on:click={handleBuy}>{$t('shop.proceedPayment')}</button>
			</div>
		</div>
	</div>
</Modal>

<style>
	.genesis-modal {
		display: block;
		width: 100%;
		height: 100%;
	}

	.header {
		display: flex;
		width: 100%;
		align-items: center;
	}

	button.back {
		font-size: 2rem;
		padding: 0.4rem;
		line-height: 1rem;
	}

	.title {
		width: 100%;
		padding: 0.4rem;
		font-size: 1.5rem;
		line-height: 1rem;
	}

	.body {
		display: flex;
		width: center;
		width: 100%;
		flex-direction: column;
	}

	.detail {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	picture {
		width: 40%;
		display: block;
		position: relative;
		text-align: center;
	}
	:global(.mobile) picture {
		width: 25vh;
	}
	picture span {
		position: absolute;
		left: 0;
		width: 100%;
		display: block;
		font-size: 0.8rem;
	}
	span.product-text {
		top: 0;
	}

	span.product-name {
		bottom: 0;
	}
	:global(.mobile) span.product-text {
		width: fit-content;
		left: 19vh;
		top: 25%;
		font-size: 0.9rem;
	}
	:global(.mobile) span.product-name {
		width: max-content;
		left: 19vh;
		font-size: 0.9rem;
		bottom: 25%;
	}

	.price {
		width: 40%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.5rem;
		margin-right: 0.2rem;
		color: #de2f22;
	}
	.payment-type {
		text-align: left;
		width: 100%;
		padding: 1rem 1.4rem;
		font-size: 1.1rem;
	}
	:global(.mobile) .payment-type {
		font-size: 1rem;
	}

	.list {
		display: flex;
		width: 100%;
	}

	.item {
		margin: 0.5rem 0.25rem 0;
		padding: 0.5rem;
		border-radius: 0.25rem;
		text-align: center;
		width: 50%;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		font-size: 0.95rem;
		border: 2px solid #ccc;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		transition: all 0.2s;
		text-transform: capitalize;
	}
	.item:hover {
		border-color: rgb(206, 160, 100);
	}

	.item.selected {
		background-color: #d2c69c;
		border-color: rgb(206, 160, 100);
		font-weight: bold;
		box-shadow: 0 0 0.2rem #ce9c56;
	}

	.item img {
		width: 20%;
	}

	:global(.mobile) .item {
		padding: 0.3rem;
	}

	.auto-convert {
		font-size: 0.97rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.button-payment button {
		background-color: #353533;
		color: #ffc107;
		margin: 1rem;
		padding: 1rem;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		transition: all 0.2s;
	}

	.button-payment button:active {
		transform: scale(0.95);
	}
</style>
