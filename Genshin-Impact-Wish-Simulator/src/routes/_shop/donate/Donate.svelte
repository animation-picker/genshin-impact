<script>
	import { fade, fly } from 'svelte/transition';
	import { supporterList } from '$lib/helpers/donation';
	import { copy } from '$lib/helpers/nameText';
	import { playSfx } from '$lib/helpers/audio/audio';

	import Modal from '$lib/components/ModalTpl.svelte';
	import ShopGroup from '../_shop-group.svelte';
	import ShopGroupItem from '../_shop-group-item.svelte';
	import { assets } from '$lib/store/app-stores';

	let showCryptoModal = false;
	let showToast = false;

	const dimiss = () => {
		playSfx('close');
		showCryptoModal = false;
	};
	const openModal = () => {
		playSfx();
		showCryptoModal = true;
	};

	const copyHandle = (text) => {
		playSfx();
		copy(text);
		showToast = true;
		const t = setTimeout(() => {
			showToast = false;
			clearTimeout(t);
		}, 2000);
	};
</script>

<!-- Crypto Donate -->
<div>
	<img class='qr' src={$assets[`alipay.jpg`]} alt="alipay" />

	<img class='qr2' src={$assets[`wechatpay.jpg`]} alt="wechatpay" />
</div>

<!-- Crypto Donate -->
<div class="container">

	<ShopGroup>
		<ShopGroupItem>
			<a
				class="content kofi"
				href="https://ko-fi.com/mantan21"
				target="_blank"
				in:fade={{ duration: 300, delay: Math.sqrt(0 * 5000) }}
			>
				<div
					style="display: flex;justify-content: center; align-items: center; width: 100%; height: 100%"
				>
					<div class="donate-icon">
						<img src={$assets['donate-kofi.png']} alt="Ko-fi Icon" />
						<img src={$assets['paypal.png']} alt="paypal" />
					</div>
				</div>
				<span> Support me on Ko-fi </span>
			</a>
		</ShopGroupItem>

		<!-- Donaate By Saweria -->
		<ShopGroupItem>
			<a
				class="content Saweria"
				href="https://saweria.co/AguzzTN54"
				target="_blank"
				in:fade={{ duration: 300, delay: Math.sqrt(1 * 5000) }}
			>
				<div
					style="display: flex;justify-content: center; align-items: center; width: 100%; height: 100%"
				>
					<div class="donate-icon">
						{#each ['ovo', 'dana', 'linkaja'] as im}
							<img src={$assets[`donate-${im}.png`]} alt="{im} icon" />
						{/each}
					</div>
				</div>
				<span> Support me on Saweria </span>
			</a>
		</ShopGroupItem>

		<!-- Donate By Crypto -->
		<ShopGroupItem>
			<button
				class="content crypto"
				on:click={openModal}
				in:fade={{ duration: 300, delay: Math.sqrt(2 * 5000) }}
			>
				<div
					style="display: flex;justify-content: center; align-items: center; width: 100%; height: 100%"
				>
					<div class="donate-icon">
						{#each ['btc', 'ethereum', 'bnb', 'solana'] as im}
							<img src={$assets[`donate-${im}.png`]} alt="{im} icon" />
						{/each}
					</div>
				</div>
				<span> Support me with Crypto </span>
			</button>
		</ShopGroupItem>
	</ShopGroup>
	<!-- List Of Supporters -->
</div>

<style>
	/* Donate */
	.toast {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: inline-block;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		background-color: rgba(173, 128, 65, 0.8);
		color: #fff;
		font-size: 0.75rem;
	}

	.modal-donate {
		padding: 3%;
	}
	.modal-donate .pop-item {
		display: flex;
		align-items: center;
		width: 100%;
	}

	.modal-donate .icon,
	.modal-donate .copy {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0.2rem;
	}
	.modal-donate img {
		height: 2rem;
		margin: 0;
	}
	.address {
		padding: 0 2%;
		display: flex;
		flex-direction: column;
		text-align: left;
		width: 100%;
	}
	.address span {
		font-size: 0.8rem;
	}

	.modal-donate button {
		background-color: #383b40;
		color: #fff;
		transition: all 0.2s;
		border-radius: 100%;
		width: 2.5rem;
		height: 2.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1rem;
		margin: 2%;
		transform: translateY(20%);
	}

	.modal-donate button:hover {
		background-color: #ccc;
		color: #000;
	}

	.content {
		background-color: rgba(255, 255, 255, 0.8);
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 1rem;
		padding: 1rem;
		text-align: center;
		transition: transform 0.1s;
	}

	.content:active {
		transform: scale(0.95);
	}

	.donate-icon {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
	}
	.qr {
		width: 14.5%;
		height: 14.5%;
	}

	.qr2 {
		width: 16%;
		height: 16%;
	}

	img {
		height: 1.5rem;
		margin: 0.2rem 0.5rem;
	}
	span {
		padding: 0.5rem;
	}

	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: calc(100vh - 130px);
	}
	:global(.mobile) .container {
		height: calc(100vh - 60px);
	}

	.recent {
		display: flex;
		flex-wrap: wrap;
		overflow-y: auto;
		max-height: 60%;
		justify-content: space-between;
		align-items: flex-start;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	.donation-item {
		width: 50%;
		margin: 0;
		padding: 0.5%;
	}

	.donation-item .supporter {
		background-color: rgba(255, 255, 255, 0.8);
		width: 100%;
		height: 100px;
		padding: 2%;
		border-radius: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	@media screen and (max-width: 640px) {
		.recent {
			max-height: 50%;
		}

		.donation-item {
			width: 100%;
		}
		.supporter {
			height: unset !important;
		}
		.info {
			overflow-y: unset !important;
		}
	}

	:global(.mobile) .recent {
		max-height: 50%;
	}
	:global(.mobile) .supporter {
		height: 5rem;
	}
	:global(.mobile) .info {
		overflow-y: auto;
	}

	.info {
		font-size: smaller;
		width: 100%;
		height: 100%;
		overflow-y: auto;
	}

	.info::-webkit-scrollbar {
		display: none;
	}

	.info .name {
		margin-left: 0.5rem;
	}
	.info .name span {
		font-family: var(--gi-global-font);
		font-size: larger;
	}

	.message {
		display: block;
		font-weight: 600;
		padding: 0.4rem 1rem;
	}

	.ko-fi .platform {
		color: #127399;
		margin-right: 0.5rem;
	}
	.sociabuzz .platform {
		color: #4f8d28;
		margin-right: 0.5rem;
	}

	.saweria .platform {
		color: rgb(213, 142, 18);
		margin-right: 0.5rem;
	}

	.time {
		color: #575859;
	}

	.amount span {
		width: fit-content;
		font-size: 0.7rem;
		white-space: nowrap;
		padding: 0.4rem 0.6rem;
		border-radius: 1rem;
		color: #fff;
		font-family: var(--gi-global-font);
	}

	.donation-item.ko-fi .amount span {
		background-color: #24ade1;
	}
	.donation-item.saweria .amount span {
		background-color: #e2a12d;
	}

	.donation-item.sociabuzz .amount span {
		background-image: linear-gradient(45deg, #3fa9f5 30%, #78c845);
	}
</style>
