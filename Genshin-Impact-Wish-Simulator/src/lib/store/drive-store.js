import { writable } from 'svelte/store';

export const isSignedIn = writable(false);
export const syncProccess = writable(false);
export const syncSuccess = writable(false);
export const userEmail = writable('');

