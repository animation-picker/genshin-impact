<script>
	import { getContext, setContext } from 'svelte';
	import { fly } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { welkinReward } from '$lib/data/wish-setup.json';
	import { assets, genesis, pricelist, primogem } from '$lib/store/app-stores';
	import { dailyWelkin, localBalance } from '$lib/helpers/dataAPI/api-localstore';
	import { playSfx } from '$lib/helpers/audio/audio';

	import ButtonModal from '$lib/components/ButtonModal.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import ModalWelkin from './_modal-welkin.svelte';

	let showWelkinModal = false;
	const handleModal = () => {
		playSfx(showWelkinModal ? 'close' : 'click');
		showWelkinModal = !showWelkinModal;
	};
	setContext('handleModal', handleModal);

	const { welkin: welkinPrice } = $pricelist;
	const { genesis: genesisReward, primogem: dailyPrimo } = welkinReward;
	const { remaining } = dailyWelkin.getData();

	let dayRemaining = remaining || 0;
	const showObtained = getContext('openObtained');

	const buyWelkin = () => {
		showWelkinModal = false;
		genesis.update((n) => {
			const newQty = n + genesisReward;
			localBalance.set('genesis', newQty);
			return newQty;
		});
		primogem.update((n) => {
			const newQty = n + dailyPrimo;
			localBalance.set('primogem', newQty);
			return newQty;
		});
		showObtained([{ item: 'genesis', qty: genesisReward }]);
		const checkin = dailyWelkin.checkin('welkin');
		dayRemaining = checkin.remaining;
	};
	setContext('buyWelkin', buyWelkin);
</script>

{#if showWelkinModal}
	<ModalWelkin />
{/if}

<img src={$assets['welkin-card.webp']} alt="Welkin of the Blessing Moon" />
<div class="welkin-item">
	<img src={$assets['welkin.webp']} alt="Welkin Item" in:fly={{ y: -50, duration: 400 }} />
</div>

<h1>{$t('shop.recomended.welkin')}</h1>
{#if dayRemaining > 0}
	<div class="remaining">
		{@html $t('shop.recomended.dayRemaining', {
			values: { days: `<strong>${dayRemaining}</strong>` }
		})}
		<span>({$t('shop.recomended.alreadyClaimed')})</span>
	</div>
{/if}

<h2 class="price">{welkinPrice}</h2>
<div class="note">{$t('shop.welkinNote')}</div>

<div class="frame">
	<div class="parent-amount">
		<span>{$t('shop.recomended.instantlyGet')}</span>
		<span class="amount">
			{genesisReward}
			<Icon type="genesis" style="margin-bottom:-5%; width: 20%" />
		</span>
	</div>
	<div class="parent-amount">
		<span>{$t('shop.recomended.dailyGift')}</span>
		<span class="amount">
			{dailyPrimo}
			<Icon type="primogem" style="margin-bottom:-5%; width: 20%" />
		</span>
	</div>

	<!-- Button -->
	<div class="purchase-button">
		<div class="caption card-stroke">
			{@html $t('shop.recomended.obtainTotal', {
				values: {
					totalGenesis: `<strong>${genesisReward}</strong>`,
					totalPrimo: `<strong>${dailyPrimo * 30}</strong>`
				}
			})}
		</div>
		<ButtonModal type="confirm" on:click={handleModal}>
			{$t('shop.purchaseButton')}
		</ButtonModal>
	</div>
</div>

<style>
	img {
		width: 100%;
	}
	.welkin-item {
		position: absolute;
		top: 8%;
		left: 8%;
		width: 47.5%;
		animation: welkinItem 2s infinite alternate ease-in-out;
	}

	@keyframes welkinItem {
		0% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(-3%);
		}
	}

	h1 {
		position: absolute;
		right: 2%;
		top: 7.5%;
		color: #4c505e;
		font-size: calc(0.065 * var(--content-width));
	}

	h2 {
		position: absolute;
		left: 2%;
		bottom: 8%;
		font-size: calc(0.115 * var(--content-width));
		color: #fff;
	}

	.note {
		position: absolute;
		left: 6%;
		bottom: 3.7%;
		color: #fff;
		font-size: calc(0.026 * var(--content-width));
	}

	.remaining {
		width: 35%;
		position: absolute;
		top: 2%;
		left: 2%;
		color: #b3c4e3;
		font-size: calc(0.03 * var(--content-width));
	}
	.remaining span {
		color: #ffc107;
	}

	.parent-amount {
		margin: 2% 0;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
	.parent-amount span {
		display: block;
		text-align: right;
	}
	.parent-amount span:not(.amount),
	.purchase-button {
		color: #787b84;
	}
	.amount {
		padding: 5% 8%;
		background-color: #8e9cc0;
		color: #fff;
		border-radius: 2rem;
		margin-top: 5%;
		border: 0.1rem solid #fff;
		outline: 0.135rem solid #8e9cc0;
		width: calc(0.3 * var(--content-width));
	}
</style>
