import { writable } from 'svelte/store';

export const fileData = writable({});
export const fileHandle = writable(null);
export const autoExport = writable(false);
export const savingToSystem = writable(false);

