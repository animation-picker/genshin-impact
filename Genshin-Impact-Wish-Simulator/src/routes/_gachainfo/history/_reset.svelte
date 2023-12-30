<script>
	import { t } from 'svelte-i18n';
	import { getContext } from 'svelte';
	import {
		rollCounter,
		localPity,
		guaranteedStatus,
		owneditem
	} from '$lib/store/localstore-manager';
	import { showBeginner, beginnerRemaining } from '$lib/store/app-stores';
	import { HistoryManager } from '$lib/store/IDB-manager';
	import { playSfx } from '$lib/helpers/audio/audio';

	import Modal from '$lib/components/ModalTpl.svelte';
	import Toast from '$lib/components/Toast.svelte';

	export let banner;
	export let v2 = false;

	let showModal = false;
	let showToast = false;
	let keepPity = false;
	const pity5 = getContext('pity5');
	const pity4 = getContext('pity4');

	const { clearHistory, getListByBanner } = HistoryManager;

	const renewItemQty = async (banner) => {
		const tmp = {};
		const listFromBanner = await getListByBanner(banner);
		listFromBanner.forEach(({ name }) => {
			tmp[name] = (tmp[name] || 0) + 1;
		});
		Object.keys(tmp).forEach((key) => owneditem.put({ name: key, qty: -1 * tmp[key] }));
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
		showToast = true;
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

				<div class="checkbox keep-setting" style="margin-top: 5%;">
					<input
						type="checkbox"
						name="keepsetting"
						id="keepsetting"
						style="margin-right: 2%;"
						bind:checked={keepPity}
						on:change={() => playSfx()}
					/>
					<label for="keepsetting">
						<i>✔</i>
						<span> {@html $t('history.keepPity')}</span>
					</label>
				</div>
			</div>
		</div>
	</Modal>
{/if}

{#if showToast}
	<Toast on:close={() => (showToast = false)}>{$t('history.resetSuccess')}</Toast>
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

	/*  */
	.checkbox {
		font-size: 80%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 2% 0;
	}
	.checkbox label {
		width: 80%;
		text-align: left;
		display: flex;
		align-items: center;
	}
	.checkbox :global(small) {
		display: block;
	}

	.checkbox input + label i {
		color: white;
		border: 1px solid #aaa;
		display: inline-block;
		width: 1rem;
		aspect-ratio: 1/1;
		line-height: 1rem;
		margin-right: 2%;
		background-color: #fff;
		transition: all 0.2s;
	}
	.checkbox input:checked + label i {
		background-color: #06bbff;
	}

	.checkbox:hover input + label i {
		border: 1px solid #06bbff;
		box-shadow: rgba(106, 168, 230, 0.6) 0px 0px 7px 5px;
	}

	.checkbox input {
		display: none;
	}
</style>
