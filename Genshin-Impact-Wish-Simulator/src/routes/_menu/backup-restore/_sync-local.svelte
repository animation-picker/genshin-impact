<script>
	import { onMount, setContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import { fade } from 'svelte/transition';
	import { fileData, fileHandle } from '$lib/store/filesystem-store';
	import {
		FSSupported,
		saveExport,
		verifyFSPermission,
		readFileHandle
	} from '$lib/helpers/dataAPI/api-filesystem';
	import { exportFileLegacy } from '$lib/helpers/dataAPI/export-import';
	import { playSfx } from '$lib/helpers/audio/audio';

	import ButtonModal from '$lib/components/ButtonModal.svelte';
	import DropImport from './_drop-import.svelte';
	import ModalImport from './_modal-import.svelte';
	import AutoExport from './_auto-export.svelte';

	let showModalImport = false;
	let hasPermission, legacyFileHandler;
	let importData = {};

	setContext('setPermission', (val) => (hasPermission = val));
	setContext('handleModalImport', (data = null) => {
		importData = data;
		showModalImport = !!data;
	});

	const handleImport = async () => {
		playSfx();
		const inputFile = document.querySelector('.drop-area #importInput');
		return inputFile.click();
	};

	const updatePermission = async () => {
		hasPermission = await verifyFSPermission($fileHandle, { checkOnly: true });
	};

	const saveLocal = async () => {
		playSfx();
		if (legacyFileHandler) return exportFileLegacy();
		await saveExport();
		await updatePermission();
	};

	onMount(async () => {
		await updatePermission();
		legacyFileHandler = !FSSupported();

		// Read Filehandle once
		if ($fileData.name) return;
		readFileHandle();
	});
</script>

{#if showModalImport}
	<ModalImport {importData} on:cancel={() => (showModalImport = false)} />
{/if}

<div class="local-sync" in:fade>
	<div class="local-wrapper">
		<div class="drop-area">
			<DropImport {legacyFileHandler} />
		</div>

		{#if !legacyFileHandler}
			<AutoExport {hasPermission} />
		{/if}

		<div class="button">
			<ButtonModal icon="import" on:click={handleImport}>{$t('backupRestore.import')}</ButtonModal>
			<ButtonModal icon="save" on:click={saveLocal}>{$t('backupRestore.export')}</ButtonModal>
		</div>
	</div>
</div>

<style>
	.local-sync {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.local-wrapper {
		width: 100%;
	}

	.drop-area {
		margin: 1rem 5%;
	}

	.button {
		text-align: center;
		padding: 1%;
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(-360deg);
		}
	}
</style>
