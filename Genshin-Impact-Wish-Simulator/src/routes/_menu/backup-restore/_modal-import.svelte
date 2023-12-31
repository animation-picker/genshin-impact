<script>
	import { createEventDispatcher, getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { calculateByteSize } from '$lib/helpers/dataAPI/api-filesystem';
	import { placeDataToAppDB } from '$lib/helpers/dataAPI/data-merger';
	import { playSfx } from '$lib/helpers/audio/audio';

	import ModalTpl from '$lib/components/ModalTpl.svelte';
	import CheckBox from '$lib/components/CheckBox.svelte';
	import Icon from '$lib/components/Icon.svelte';

	export let importData = {};
	const { file, parsedFile } = importData;
	let action = '';
	let processing = false;

	const closeModalImport = getContext('handleModalImport');
	const dispatch = createEventDispatcher();

	const closeModal = () => {
		dispatch('cancel');
		playSfx('close');
	};

	const confirm = async () => {
		playSfx();
		processing = true;

		await placeDataToAppDB(parsedFile, action);
		closeModalImport();
		processing = false;
	};

	const checkboxHandle = (act, { detail }) => {
		const { checked } = detail;
		if (checked) return (action = act);
		action = '';
	};
</script>

<ModalTpl
	noDimiss
	title="Import Data"
	disabled={!action || processing}
	on:cancel={closeModal}
	on:confirm={confirm}
>
	{#if processing}
		<div class="import-content">
			<div class="row loader" in:fade>
				<Icon type="loader" />
			</div>
		</div>
	{:else}
		<div class="import-content">
			<caption>
				{@html $t('backupRestore.importAction', {
					values: { fileInfo: `<strong> ${file.name} (${calculateByteSize(file.size)}) </strong>` }
				})}
			</caption>

			<div class="import-option">
				<CheckBox
					id="_merge"
					checked={action === 'merge'}
					on:change={(e) => checkboxHandle('merge', e)}
				>
					<span> {@html $t('backupRestore.mergeAction')} </span>
				</CheckBox>

				<CheckBox
					id="_replace"
					checked={action === 'replace'}
					on:change={(e) => checkboxHandle('replace', e)}
				>
					<span>
						{@html $t('backupRestore.replaceAction')}
					</span>
				</CheckBox>
			</div>
		</div>
	{/if}
</ModalTpl>

<style>
	/* Modal */
	.import-content {
		padding: 5%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	caption {
		width: 100%;
	}

	.import-option {
		font-size: 80%;
		width: 80%;
	}

	.import-option :global(.checkbox) {
		margin-top: 3% !important;
	}

	.import-option :global(label) {
		text-align: left;
		display: flex;
		align-items: center;
	}
	.import-option :global(small) {
		display: block;
	}

	.import-option :global(label i) {
		margin-right: 2%;
	}

	.row.loader {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
