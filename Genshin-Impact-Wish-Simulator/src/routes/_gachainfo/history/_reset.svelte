<script>
	import { t } from 'svelte-i18n';
	import { getContext } from 'svelte';
	import {
		rollCounter,
		localPity,
		guaranteedStatus,
		owneditem
	} from '$lib/helpers/dataAPI/api-localstore';
	import { showBeginner, beginnerRemaining } from '$lib/store/app-stores';
	import { HistoryManager } from '$lib/helpers/dataAPI/api-indexeddb';
	import { playSfx } from '$lib/helpers/audio/audio';
	import { pushToast } from '$lib/helpers/toast';

	import Modal from '$lib/components/ModalTpl.svelte';
	import CheckBox from '$lib/components/CheckBox.svelte';

	export let banner;
	export let v2 = false;

	let showModal = false;
	let keepPity = false;
	const pity5 = getContext('pity5');
	const pity4 = getContext('pity4');

	const { clearHistory, getListByBanner } = HistoryManager;

	const renewItemQty = async (banner) => {
		const tmp = {};
		const listFromBanner = await getListByBanner(banner);
		listFromBanner.forEach(({ itemID }) => {
			tmp[itemID] = (tmp[itemID] || 0) + 1;
		});
		Object.keys(tmp).forEach((key) => owneditem.put({ itemID: key, qty: -1 * tmp[key] }));
	};

	const clear = getContext('clearHistory');
	const confirmReset = async () => {
		await renewItemQty(banner);
		await clearHistory(banner);

		// Keep Pity
		if (!keepPity) {
			localPity.set(`pity5-${banner}`, 0);
			localPity.set(`pity4-${banner}`, 0);
			pity5.set(0);
			pity4.set(0);

			// GuaranteedStatus
			if (banner.match('event')) {
				guaranteedStatus.set(`${banner}-4star`, false);
				guaranteedStatus.set(`${banner}-5star`, false);
			} else guaranteedStatus.set(banner, false);
		}

		// Show Back Beginner Banner
		if (banner === 'beginner') {
			rollCounter.set('beginner', 0);
			showBeginner.set(true);
			beginnerRemaining.set(20);
		}

		clear();
		playSfx();

		showModal = false;
		const message = $t('history.resetSuccess');
		pushToast({ message, type: 'success' });
	};

	const handleModal = () => {
		playSfx(showModal ? 'close' : 'modal');
		showModal = !showModal;
	};
</script>

{#if showModal}
	<Modal title={$t('history.resetPromptTitle')} on:cancel={handleModal} on:confirm={confirmReset}>
		<div class="confirmation">
			<div style="padding: 0 1rem">
				<p>
					{@html $t('history.resetPrompt', {
						values: { bannerName: `<b>${$t(`wish.banner.${banner}`)}</b>` }
					})}
				</p>

				<div class="keep-setting" style="margin-top: 5%;">
					<CheckBox checked={keepPity} on:change={({ detail }) => (keepPity = !!detail.checked)}>
						<small> {@html $t('history.keepPity')}</small>
					</CheckBox>
				</div>
			</div>
		</div>
	</Modal>
{/if}

<button class="reset" class:v2 on:click={handleModal}>
	<i class="gi-delete" />
	{$t('history.resetButton')}
</button>

<style>
	.confirmation {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		font-family: var(--genshin-font);
		padding: 3%;
	}

	.reset {
		color: #bd6932;
		font-size: 1em;
	}

	.v2.reset {
		font-size: calc(0.016 * var(--content-width));
	}
	.reset:hover {
		text-decoration: underline;
	}
</style>
