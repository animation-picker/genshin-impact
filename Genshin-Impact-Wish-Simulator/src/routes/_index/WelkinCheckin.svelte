<script>
	import { getContext, onMount } from 'svelte';
	import { t } from 'svelte-i18n';

	import { welkinReward } from '$lib/data/wish-setup.json';
	import { assets, primogem } from '$lib/store/app-stores';
	import { localBalance, dailyWelkin } from '$lib/helpers/dataAPI/api-localstore';

	const { primogem: dailyPrimo } = welkinReward;
	const closeWelkin = getContext('closeWelkin');
	const handleObtained = getContext('openObtained');

	const closeHandle = () => {
		closeWelkin();
		primogem.update((n) => {
			const newQty = n + dailyPrimo;
			localBalance.set('primogem', newQty);
			return newQty;
		});
		handleObtained([{ item: 'primogem', qty: dailyPrimo }]);
	};

	let dayRemaining;
	const setDay = () => {
		dayRemaining = dailyWelkin.getData().remaining;
	};

	onMount(setDay);
</script>

<section on:mousedown={closeHandle}>
	<div class="container">
		<div class="bg" />
		<div class="content">
			<div class="milestone">
				<img src={$assets['welkin-moon-girl.webp']} alt="Welkin Moon Girl" />
			</div>

			<h3 class="title">{$t('shop.recomended.claimingBlessing')}</h3>
			<h4 class="msg">
				{@html $t('shop.recomended.dayRemaining', {
					values: { days: `<span>${dayRemaining}</span>` }
				})}
			</h4>
		</div>
	</div>
</section>

<style>
	section {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 99;
		color: #000;
	}
	.container {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.bg {
		min-width: 100vw;
		min-height: 100%;
		position: absolute;
		z-index: -1;
		left: 0;
		background-image: linear-gradient(-30deg, rgba(0, 0, 0, 0.75) 80%, rgba(0, 0, 0, 0.6));
	}

	.content {
		display: flex;
		flex-direction: column;
		max-width: 80%;
		width: 80%;
		text-align: center;
	}

	:global(.mobile) .content {
		transform: scale(0.85);
	}

	h3 {
		color: #e9e4d9;
		font-weight: 100;
		padding: 0.5rem;
	}
	h4 {
		color: #d0ba98;
		font-weight: 100;
	}
	.msg :global(span) {
		color: #e9e4d9;
	}
	.milestone {
		display: flex;
		width: 100%;
		justify-content: center;
	}
	img {
		width: 30%;
	}
</style>
