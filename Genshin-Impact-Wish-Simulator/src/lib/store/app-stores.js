import { writable } from 'svelte/store';
import { initialAmount, version, wishPhase } from '$lib/data/wish-setup.json';

const { fates, genesis: igen, primogem: ipri } = initialAmount;

export const activeVersion = writable({ patch: version, phase: wishPhase });
export const bannerList = writable([]);
export const activeBanner = writable(0);

// Beginner
export const showBeginner = writable(true);
export const beginnerRemaining = writable(20);

// Weapon
export const isFatepointSystem = writable(false);
export const course = writable({ selected: null, point: 0 });

// Game Currencies
export const genesis = writable(igen);
export const primogem = writable(ipri);
export const acquaint = writable(fates);
export const intertwined = writable(fates);
export const stardust = writable(0);
export const starglitter = writable(0);
export const pricelist = writable({});

// Settings
export const autoskip = writable(false);
export const wishAmount = writable('default');
export const multipull = writable(4);

// other
export const mobileMode = writable(false);
export const isMobile = writable(false);
export const isPWA = writable(false);
export const viewportHeight = writable(0);
export const viewportWidth = writable(0);

export const notice = writable([]);
export const assets = writable([]);

