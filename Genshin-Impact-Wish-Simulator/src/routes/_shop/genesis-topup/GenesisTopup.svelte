<script>
	import { setContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';

	import { genesisBonus } from '$lib/data/pricelist.json';
	import { activeVersion, assets, pricelist } from '$lib/store/app-stores';
	import { localConfig } from '$lib/helpers/dataAPI/api-localstore';
	import { cookie } from '$lib/helpers/dataAPI/api-cookie';
	import { playSfx } from '$lib/helpers/audio/audio';

	import Icon from '$lib/components/Icon.svelte';
	import ShopGroup from '../_shop-group.svelte';
	import ShopGroupItem from '../_shop-group-item.svelte';
	import ModalTopup from './_modal-topup.svelte';
	import CheckBox from '$lib/components/CheckBox.svelte';

	const checkCookie = cookie.get('initialTopup');
	let initialTopup = checkCookie === undefined ? true : checkCookie;
	const initialCheck = ({ detail }) => (initialTopup = !!detail?.checked);
	$: cookie.set('initialTopup', initialTopup);

	const { versionReset, topupBonus } = genesisBonus;
	const localTopup = localConfig.get('topupBonus') || {};
	const filterVersion = (arr) => {
		const { patch } = $activeVersion;
		return arr.filter((v) => v <= parseFloat(patch)).sort((a, b) => b - a)[0] || 0;
	};
	const defaultVersionBase = filterVersion(versionReset);
	const localVersionBase = filterVersion(Object.keys(localTopup));
	const versionBase = defaultVersionBase > localVersionBase ? defaultVersionBase : localVersionBase;

	const genesisList = [];
	const genesis = $pricelist.genesis;
	Object.keys(genesis).forEach((key) => {
		const list = Array.isArray(localTopup[versionBase]) ? localTopup[versionBase] : [];
		const doubleBonus = !list.includes(parseFloat(key));
		const item = { qty: parseInt(key), price: genesis[key], doubleBonus };
		genesisList.push(item);
	});

	let data = {};
	let showPaymentModal = false;
	const selectGenesis = ({ qty, isDoubleBonus, price }) => {
		playSfx('exchange');
		showPaymentModal = true;
		const isDouble = isDoubleBonus && initialTopup;
		data = { qty, bonus: isDouble ? qty : topupBonus[qty] || 0, price };
	};

	const closePaymentModal = () => {
		playSfx('close');
		showPaymentModal = false;
	};
	setContext('closeModal', closePaymentModal);

	const confirmBuy = ({ qty, bonus }) => {
		showPaymentModal = false;
		playSfx();

		if (qty === bonus) {
			localTopup[versionBase] = localTopup[versionBase] || [];
			if (!localTopup[versionBase].includes(qty)) localTopup[versionBase].push(qty);
			localConfig.set('topupBonus', localTopup);
			const i = genesisList.findIndex((v) => v.qty === qty);
			genesisList[i].doubleBonus = false;
		}
	};
	setContext('confirmBuy', confirmBuy);
</script>

{#if showPaymentModal}
	<ModalTopup {data} />
{/if}

<ShopGroup>
	{#each genesisList as { qty, price, doubleBonus }, i}
		<ShopGroupItem>
			<button
				on:click={() => selectGenesis({ qty, price, isDoubleBonus: doubleBonus })}
				in:fade={{ duration: 300, delay: Math.sqrt(i * 5000) }}
			>
				{#if doubleBonus && initialTopup}
					<div class="bonus firstBonus" style="background-image: url({$assets['bg-bonus.webp']})">
						<div class="wrap">
							<Icon type="genesis" style="position: absolute; top:-50%;" width="35%" />
							<span>{$t('shop.bonus')}!</span>
							<span class="amount">+{qty}</span>
						</div>
					</div>
				{:else if qty !== 60}
					<div class="topup-bonus bonus">
						<div class="wrap">
							<span>{$t('shop.bonus')}</span>
							<Icon type="genesis" />
							<span>{topupBonus[qty]}</span>
						</div>
					</div>
				{/if}

				<div class="content" style="background-image: url({$assets['genesis-bg.webp']})">
					<div class="picture">
						<picture>
							<img src={$assets[`genesis-${qty}.webp`]} alt="Genesis Crystal {qty}" />
						</picture>
					</div>
					<div class="caption">
						<div class="name">{qty} {$t('shop.item.genesis')}</div>
						<div class="price">{price}</div>
					</div>
				</div>
			</button>
		</ShopGroupItem>
	{/each}
</ShopGroup>

<CheckBox checked={initialTopup} on:change={initialCheck}>
	<span style="color: var(--tertiary-color);">
		{$t('shop.initialBonus')}
	</span>
</CheckBox>

<style>
	button {
		transition: all 0.2s;
		transform: scale(1);
		width: 100%;
		height: 100%;
		display: block;
		position: relative;
	}
	button:not(.nav-link-item):active {
		transform: scale(0.95);
	}

	.firstBonus {
		left: -5%;
		top: -5%;
		width: 35%;
		aspect-ratio: 1/1;
		background-size: cover;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.bonus {
		color: #fff6d2;
		text-shadow: 0.05em 0.05em 0.2em rgba(0, 0, 0, 0.5);
		font-size: 80%;
		filter: drop-shadow(0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.5));
		position: absolute;
		z-index: +1;
	}

	.wrap {
		width: 100%;
		position: relative;
		display: flex;
	}

	.firstBonus .wrap {
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.firstBonus .amount {
		color: #fefdf2;
		font-size: initial;
	}

	:global(.mobile) .amount {
		font-size: 140%;
	}

	.topup-bonus {
		background-color: #fb9095;
		top: 0;
		left: -3%;
		padding: 0.15rem 1rem 0.15rem 0.7rem;
		border-bottom-left-radius: 1rem;
		border-top-left-radius: 1rem;
		border-bottom-right-radius: 2rem;
	}
	:global(.mobile) .topup-bonus {
		padding: 0 10% 0 8%;
	}
	.topup-bonus .wrap {
		align-items: center;
	}

	.content {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: flex-start;
		flex-direction: column;
		align-items: center;
		overflow: hidden;
		text-align: center;
		background-size: cover;
		background-position: center center;
		transition: all 0.2s;
		position: relative;
	}

	.content:hover {
		filter: drop-shadow(-0.3rem 0.2rem #eac343) drop-shadow(0.3rem 0.2rem #eac343)
			drop-shadow(-0rem -0.3rem #eac343);
	}

	picture {
		display: block;
		margin-top: -10%;
	}
	.picture {
		display: block;
		width: 100%;
		height: 70%;
		overflow-y: hidden;
		margin-top: 5%;
	}

	img {
		width: 90%;
	}

	.caption {
		position: absolute;
		bottom: 5%;
		display: block;
		width: 95%;
	}

	.name {
		width: 100%;
		padding: 15% 4.5% 2%;
		display: block;
		font-size: calc(8 / 100 * var(--column-width));
		background-image: linear-gradient(to top, rgba(241, 239, 222, 1) 55%, rgba(241, 239, 222, 0));
	}

	.price {
		display: block;
		height: calc(16 / 100 * var(--column-width));
		line-height: calc(16 / 100 * var(--column-width));
		font-size: calc(9 / 100 * var(--column-width));
	}
</style>
