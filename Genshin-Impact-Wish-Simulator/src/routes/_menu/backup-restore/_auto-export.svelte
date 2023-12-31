<script>
	import { t } from 'svelte-i18n';
	import { fade } from 'svelte/transition';
	import { getContext, onDestroy, onMount } from 'svelte';
	import { autoExport, fileData, fileHandle, savingToSystem } from '$lib/store/filesystem-store';
	import {
		calculateByteSize,
		checkFileExist,
		readFileHandle,
		verifyFSPermission
	} from '$lib/helpers/dataAPI/api-filesystem';
	import { playSfx } from '$lib/helpers/audio/audio';
	import { storageLocal } from '$lib/helpers/dataAPI/api-localstore';
	import { timeAgo } from '$lib/helpers/timeago';
	import { updateRemoteStorage } from '$lib/helpers/dataAPI/sync';
	import ButtonGeneral from '$lib/components/ButtonGeneral.svelte';

	export let hasPermission = false;
	let fileName, isFileExist;
	$: autoSave = hasPermission && $autoExport;
	$: ({ name: fileName } = $fileData);

	const setPermission = getContext('setPermission');
	const getExportTime = () => {
		const { date } = storageLocal.get('export') || {};
		return timeAgo(date);
	};

	let checkLastExport;
	const stopInterval = () => {
		clearInterval(checkLastExport);
		checkLastExport = null;
	};

	let lastExport = getExportTime();
	const startInterval = () => {
		if (checkLastExport) return;
		checkLastExport = setInterval(() => (lastExport = getExportTime()), 1000);
	};

	const checkAndUpdate = async () => {
		isFileExist = await checkFileExist($fileHandle);
		await updateRemoteStorage({ to: 'local' }); // Export once
		autoExport.set(true); // Turn on Auto export
	};

	const allowAutoExport = async () => {
		if (!$fileHandle) await readFileHandle();

		// Check Permission
		if (!hasPermission) {
			const newPermission = await verifyFSPermission($fileHandle);
			setPermission(newPermission);
			if (!newPermission) throw new Error('Permission Denied');
		}
		return checkAndUpdate();
	};

	const toggleAutoExport = async () => {
		playSfx('click2');
		if (!hasPermission) return allowAutoExport(); // get permission
		if ($autoExport) return autoExport.set(false); // turn off auto export
		return checkAndUpdate();
	};

	onMount(startInterval);
	onDestroy(stopInterval);
</script>

{#if fileName}
	<div class="savedFile" class:active={autoSave} in:fade>
		<div class="button-export">
			<ButtonGeneral on:click={toggleAutoExport} disabled={$savingToSystem}>
				<div class="toggle">
					{#if $savingToSystem}
						<i class="gi-reset" />
					{:else}
						<i class="gi-{autoSave ? 'check' : 'cancel'}" />
					{/if}
					<span> {$t('backupRestore.autoExport')} </span>
				</div>
			</ButtonGeneral>
		</div>
		<div class="fileName">
			<table>
				<tr>
					<td>{$t('backupRestore.destination')}</td>
					<td> <span> {fileName} </span></td>
				</tr>
				<tr>
					<td>File Size</td>
					<td>{calculateByteSize($fileData.size)}</td>
				</tr>
				<tr>
					<td> {$t('backupRestore.lastExport')} </td>
					<td> {lastExport} </td>
				</tr>
			</table>
		</div>
	</div>
{:else if isFileExist === false}
	<button class="savedFile error" disabled in:fade>
		<span> {$t('backupRestore.desNotFound')} </span>
	</button>
{/if}

<style>
	.savedFile {
		display: flex;
		width: 90%;
		align-items: center;
		margin: 2rem 5% 1rem;
		border: 0.075rem solid #adad45;
		border-radius: 0.4rem;
		transition: all 0.25s;
		position: relative;
	}

	.savedFile.active {
		background-color: var(--tertiary-color);
	}
	.savedFile.error {
		color: #cf2727;
		padding: 0 5%;
		font-size: smaller;
		justify-content: center;
		border-radius: 2rem;
		overflow: hidden;
		height: 2rem;
	}

	.button-export {
		transform: translateY(-50%);
		position: absolute;
		top: 0;
		left: 0;
	}
	.toggle {
		line-height: 0;
		white-space: nowrap;
		display: flex;
		align-items: center;
	}
	.toggle i {
		font-size: larger;
	}
	.toggle span {
		font-size: smaller;
	}

	.gi-check {
		color: #58c70a;
	}
	.gi-cancel {
		color: #cf2727;
	}
	.gi-reset {
		color: orange;
		font-size: 100% !important;
		transform-origin: 50%;
		transform-box: fill-box;
		animation: rotate 1s linear infinite;
	}

	.fileName {
		width: 100%;
		height: 100%;
		padding: 1.75rem 2% 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	.fileName span {
		display: block;
		width: 90%;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-transform: capitalize;
	}

	table {
		width: 90%;
	}

	table td:nth-child(2) {
		font-style: italic;
		color: brown;
	}
</style>
