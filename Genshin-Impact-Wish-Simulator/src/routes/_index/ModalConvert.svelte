<script>
	import { getContext, setContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import { genesis, primogem } from '$lib/store/app-stores';
	import { localBalance } from '$lib/helpers/dataAPI/api-localstore';
	import { playSfx } from '$lib/helpers/audio/audio';

	import Icon from '$lib/components/Icon.svelte';
	import Modal from '$lib/components/ModalTpl.svelte';
	import Range from '$lib/components/Range.svelte';
	import ModalBalance from '../_shop/_modal-balance.svelte';

	let value = 1;
	$: value = value > $genesis ? $genesis : parseInt(value);
	setContext('setValue', (val) => (value = val));

	const openObtained = getContext('openObtained');
	const closeConvertModal = getContext('closeConvertModal');
	const cancelModal = () => {
		closeConvertModal();
		playSfx('close');
	};
	setContext('closeModal', cancelModal);

	const confirmConvert = () => {
		primogem.update((v) => {
			const newVal = v + value;
			localBalance.set('primogem', newVal);
			return newVal;
		});

		genesis.update((v) => {
			const newVal = v - value;
			localBalance.set('genesis', newVal);
			return newVal;
		});

		playSfx();
		closeConvertModal();
		openObtained([{ item: 'primogem', qty: value }]);
	};
</script>

<ModalBalance />
<Modal
	title={$t('shop.exchangeHeading')}
	on:cancel={cancelModal}
	on:confirm={confirmConvert}
	disabled={$genesis < 1}
>
	<div slot="confirmtext">{$t('shop.purchaseButton')}</div>
	<div class="content">
		<div class="row genesis-exchange">
			<div class="col genesis">
				<picture>
					<Icon type="genesis" width="50%" />
					<span>{$t('shop.item.genesis')}</span>
				</picture>
			</div>

			<div class="col primo-exchange">
				<picture>
					<Icon type="primogem" width="50%" />
					<span>{$t('shop.item.primogem')}</span>
				</picture>
			</div>

			<div class="divider">
				<i class="gi-arrow-right" />
			</div>
		</div>

		<div class="slider">
			<div class="rangeNumber">
				<span>{$t('shop.qty')} :</span>
				<span style="font-size: larger">{$genesis < 1 ? 1 : value}</span>
			</div>
			<div class="rangeInput">
				<Range
					value={$genesis < 1 ? 1 : value}
					min={$genesis <= 1 ? 0 : 1}
					max={$genesis || 1}
					disabled={$genesis < 1}
				/>
				<div class="consume" style="display: inline-flex; align-items:center">
					{$t('shop.consume')}
					<Icon type="genesis" />
					<span class:red={$genesis < 1}> {value}</span>
				</div>

				{#if $genesis < 1}
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
		height: 90%;
		display: flex;
		flex-direction: column;
	}

	picture {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.genesis-exchange {
		display: flex;
		width: 80%;
		height: 100%;
		position: relative;
		margin: 0 auto;
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

	.divider {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: xX-large;
		color: #fff;
	}
	.genesis-exchange .genesis {
		background-color: #d1c8bb;
	}
	.genesis-exchange .primo-exchange {
		background-color: #ecd7a5;
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
</style>
