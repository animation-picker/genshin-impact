<script>
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import { readDropedFile } from '$lib/helpers/dataAPI/api-filesystem';
	import { allowedType, importFileLegacy } from '$lib/helpers/dataAPI/export-import';
	import { pushToast } from '$lib/helpers/toast';

	export let legacyFileHandler = false;
	let onDrag = false;
	let importHandler;

	const handleModalImport = getContext('handleModalImport');
	const dragenter = () => {
		onDrag = true;
		importHandler = 'drop';
	};

	const dragNdrop = async (e) => {
		try {
			if (importHandler !== 'drop') return;
			onDrag = false;
			if (legacyFileHandler) {
				const dataToImport = await importFileLegacy(e.dataTransfer.files);
				return handleModalImport(dataToImport);
			}
			const dataToImport = await readDropedFile(e.dataTransfer.items);
			return handleModalImport(dataToImport);
		} catch (e) {
			const { message } = e;
			pushToast({ message, type: 'error' });
			console.error(e);
		}
	};

	const handleInput = async (e) => {
		try {
			if (importHandler !== 'click') return;
			const dataToImport = await importFileLegacy(e.target.files);
			return handleModalImport(dataToImport);
		} catch (e) {
			const { message } = e;
			pushToast({ message, type: 'error' });
			console.error(e);
		}
	};
</script>

<div class="drop-content" class:onDrag on:dragenter={dragenter}>
	<span> {$t('backupRestore.dropFiles')} </span>

	<input
		class="inputFile"
		type="file"
		id="importInput"
		accept={allowedType}
		on:dragleave={() => (onDrag = false)}
		on:drop={dragNdrop}
		on:change={handleInput}
		on:click={() => (importHandler = 'click')}
	/>
</div>

<style>
	.drop-content {
		width: 100%;
		padding: 5%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 0.5rem;
		border: 0.1rem dashed var(--text-color);
		position: relative;
		transition: all 0.25s;
	}

	.drop-content.onDrag {
		background-color: rgba(0, 0, 0, 0.75);
		color: #fff;
		border-color: #fff;
	}

	.inputFile {
		position: absolute;
		height: 100%;
		width: 100%;
		opacity: 0;
		top: 0;
		left: 0;
		pointer-events: none;
		z-index: +1;
	}

	.onDrag .inputFile {
		pointer-events: unset;
	}
</style>
