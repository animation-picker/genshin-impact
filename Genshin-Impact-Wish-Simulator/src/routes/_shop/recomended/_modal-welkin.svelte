<script>
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import { welkinReward } from '$lib/data/wish-setup.json';
	import { assets, mobileMode, pricelist } from '$lib/store/app-stores';
	import ModalTpl from '$lib/components/ModalTpl.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import ModalBalance from '../_modal-balance.svelte';

	const { welkin: welkinPrice } = $pricelist;
	const { genesis: genesisReward, primogem: dailyPrimo } = welkinReward;

	const handleModal = getContext('handleModal');
	const buyWelkin = getContext('buyWelkin');
</script>

<ModalBalance />

<ModalTpl title={$t('shop.purchaseHeading')} on:confirm={buyWelkin} on:cancel={handleModal}>
	<span slot="confirmtext"> {$t('shop.purchaseButton')} </span>
	<div class="content">
		<div class="img-content">
			<div class="thumbnail">
				<picture>
					<img src={$assets['welkin.webp']} alt="Welkin" />
					<caption> {$t('shop.recomended.welkin')} </caption>
				</picture>
				<div class="price">
					<span>{welkinPrice}</span>
				</div>
			</div>
		</div>
		<div class="description-content">
			<div class="item">
				<div class="name">{$t('shop.recomended.issuedPurchase')}</div>
				<div class="content">
					<div class="icon">
						<span>
							<Icon type="genesis" width={$mobileMode ? '20px' : '30px'} />
						</span>
					</div>
					<div class="detail">
						<span>{$t('shop.item.genesis')}</span>
						<span class="amount">x{genesisReward}</span>
					</div>
				</div>
			</div>
			<div class="item" style="margin-top: 1rem ;">
				<div class="name">{$t('shop.recomended.collect')}</div>
				<div class="content">
					<div class="icon">
						<span>
							<Icon type="primogem" width={$mobileMode ? '20px' : '30px'} />
						</span>
					</div>
					<div class="detail">
						<span>{$t('shop.item.primogem')}</span>
						<span class="amount">x{dailyPrimo}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</ModalTpl>

<style>
	.content {
		width: 100%;
		display: flex;
		padding: 0 1.2rem;
		color: #545259;
	}

	.img-content {
		width: 40%;
		padding: 2% 1rem;
	}

	.thumbnail {
		aspect-ratio: 1/1;
		background-color: #fff;
		border-radius: 8%;
		display: flex;
		flex-direction: column;
		background-color: #ffe4af;
		align-items: center;
		overflow: hidden;
		box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);
	}

	picture {
		width: 100%;
		height: 80%;
		background-color: #f8f3f4;
		position: relative;
	}

	picture::after,
	picture::before {
		content: '';
		position: absolute;
		left: 50%;
		bottom: 0;
		display: block;
		transform: translateX(-50%);
	}
	picture::after {
		background-image: linear-gradient(to top, rgba(243, 232, 227, 1) 20%, rgba(243, 232, 227, 0));
		height: 70%;
		width: 100%;
	}
	picture::before {
		height: calc(100% - 0.35rem);
		width: calc(100% - 0.7rem);
		border: 0.1rem solid #ddc295;
		border-top-left-radius: 8%;
		border-top-right-radius: 8%;
	}

	.thumbnail img {
		width: 75%;
	}

	caption {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: +2;
		line-height: 120%;
		font-size: 65%;
		padding: 0.4rem;
	}

	.price {
		font-size: 80%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 20%;
		width: 100%;
		border-top: 0.1rem solid #ddc295;
	}

	@media screen and (min-width: 474px) {
		.price,
		caption {
			font-size: medium;
		}
		:global(.mobile) .price {
			font-size: 80%;
		}
		:global(.mobile) caption {
			font-size: 65%;
		}
	}

	.description-content {
		width: 60%;
		padding: 2% 0 1rem 0.5rem;
		text-align: left;
		font-size: 65%;
	}

	.item {
		background-color: #f8f3f4;
		border-bottom: 0.1rem solid #ddc295;
	}
	.icon span {
		display: inline-block;
		padding: 0.2rem;
		aspect-ratio: 1/1;
		background-color: #d38b4c;
		margin-right: 1rem;
		margin-top: 0.3rem;
	}

	.item .name {
		background-color: #d38b4c;
		color: #fff;
		padding: 2% 1rem;
		line-height: 120%;
	}
	.item .content {
		padding: 2% 1rem;
	}

	span.amount {
		display: block;
		padding-top: 1%;
		font-size: 120%;
		color: #d38b4c;
	}
</style>
