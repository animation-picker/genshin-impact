<script>
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import { acquaint, intertwined, multipull, primogem } from '$lib/store/app-stores';
	import { localBalance } from '$lib/helpers/dataAPI/api-localstore';
	import ModalTpl from '$lib/components/ModalTpl.svelte';

	export let isEventBanner = false;
	export let rollCost = 0;

	const closeModal = getContext('closeModal');
	const reroll = getContext('reroll');

	const currencyUsed = isEventBanner ? $intertwined : $acquaint;
	const currencyName = isEventBanner ? $t('shop.item.intertwined') : $t('shop.item.acquaint');

	const fateNeeded = rollCost - currencyUsed;
	const primoNeeded = fateNeeded * 160;
	const insufficientPrimo = $primogem < primoNeeded;

	const convertAndRoll = async () => {
		await updateBalance();
		return reroll($multipull);
	};

	const updateBalance = async () => {
		new Promise((resolve, reject) => {
			if (insufficientPrimo) return reject('not enough Primogem');
			primogem.update((n) => {
				const v = n - primoNeeded;
				localBalance.set('primogem', v);
				resolve('ok');
				return v;
			});

			if (isEventBanner) {
				intertwined.update((n) => {
					const v = n + fateNeeded;
					localBalance.set('intertwined', v);
					resolve('ok');
					return v;
				});
			} else {
				acquaint.update((n) => {
					const v = n + fateNeeded;
					localBalance.set('acquaint', v);
					resolve('ok');
					return v;
				});
			}
		});
	};
</script>

<ModalTpl
	title={$t('shop.paimonBargains')}
	on:cancel={closeModal}
	on:confirm={convertAndRoll}
	disabled={insufficientPrimo}
>
	<div class="exchange">
		<div>
			{@html $t('shop.fateNeeded', {
				values: {
					rollQty: `<span class="yellow">${fateNeeded}</span>`,
					currency: currencyName
				}
			})}
			<br />

			{@html $t('shop.primoNeeded', {
				values: {
					primoPrice: `
						<span class="${insufficientPrimo ? 'red' : 'yellow'}">
							${primoNeeded}
						</span>
					`
				}
			})}

			{#if insufficientPrimo}
				<br />
				<br />
				<span class="red">{$t('shop.insufficient')}</span>
			{/if}
		</div>
	</div>
</ModalTpl>

<style>
	.exchange :global(.red) {
		color: #de2f22 !important;
	}
	.exchange :global(.yellow) {
		color: rgb(218, 177, 45) !important;
	}
	.exchange {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
