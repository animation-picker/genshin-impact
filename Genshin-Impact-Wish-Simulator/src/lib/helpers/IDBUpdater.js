import HistoryIDB from '$lib/store/IDB-manager';
import { deleteDB } from 'idb';

const { getByName, addHistory } = HistoryIDB;

const updateNameFromIDB = async (before, after) => {
	const kokomi = await getByName(before);
	kokomi.forEach(async (item) => {
		item.name = after;
		await addHistory(item);
	});
};

export const IDBUpdater = async () => {
	updateNameFromIDB('sagonomiya-kokomi', 'sangonomiya-kokomi');
	updateNameFromIDB('alhaitam', 'alhaitham');
	await deleteDB('workbox-expiration');
};

/**
 * This file is Unused for now
 * To use this function, call on Layout.svelte inside onMount Scope
 */

