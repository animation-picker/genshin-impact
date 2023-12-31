import { locale } from 'svelte-i18n';
import { initialAmount } from '$lib/data/wish-setup.json';
import * as stores from '$lib/store/app-stores';
import { BannerManager, HistoryManager } from './api-indexeddb';
import { cookie } from './api-cookie';
import {
	fatepointManager,
	localBalance,
	owneditem,
	storageLocal,
	rollCounter as rq,
	ownedOutfits as costumeManager
} from './api-localstore';
import { adKey } from '../accessKey';
import { onlineBanner } from '../custom-banner';

export const placeDataToAppDB = async (parsedFile, action) => {
	if (action === 'replace') await replaceData(parsedFile);
	if (action === 'merge') await mergeData(parsedFile);

	await setAccessKey(parsedFile.accessKey);
};

const setAccessKey = (key) => {
	const hasKey = cookie.get('accessKey');
	if (hasKey) return;
	return adKey.verify(key);
};

const { clearIDB: clearHistories, addHistory, getAllHistories } = HistoryManager;
const { clear: clearCustomBanner, put: addCustomBanner, get: getCustomBanner } = BannerManager;

const replaceData = async ({ settings, histories, banners } = {}) => {
	// replace custom banner
	await clearCustomBanner();
	for (const banner of banners) {
		await addCustomBanner(banner);
	}

	// Replace histories;
	await clearHistories();
	for (const history of histories) {
		await addHistory(history);
	}

	// Reset Setting and Localstorage
	const { date } = storageLocal.get('export');
	settings.data.export.date = date;
	const settingString = JSON.stringify(settings);
	localStorage.setItem('WishSimulator.App', settingString);
	updateSiteSettings(settings.data);
};

const mergeData = async ({ settings, histories, banners } = {}) => {
	await mergeCustomBanner(banners);
	await mergeHistories(histories);
	const updatedSettings = mergeSettings(settings.data);
	updateSiteSettings(updatedSettings);
};

const updateSiteSettings = (settings = {}) => {
	const { balance = {}, config = {}, rollcounter = {} } = settings;

	// Balance Update
	const balanceKey = ['acquaint', 'intertwined', 'genesis', 'primogem', 'stardust', 'starglitter'];
	balanceKey.forEach((key) => {
		if (key in balance) return stores[key].set(balance[key]); // restore values
		if (key.match('primo')) return stores[key].set(initialAmount['primogem']); // set default value
		if (!key.match(/(acquaint|intertwined)/)) return stores[key].set(0);
		return stores[key].set(initialAmount['fates']); // default values for fates stone
	});

	// Beginner Banner
	const { beginner = 0 } = rollcounter;
	const starterRemain = 20 - beginner;
	stores.beginnerRemaining.set(starterRemain < 0 ? 0 : starterRemain);
	stores.showBeginner.set(beginner < 20);

	// other store setting
	const { locale: lang, autoskip, wishAmount, multipull } = config;
	locale.set(lang);
	stores.autoskip.set(autoskip);
	stores.wishAmount.set(wishAmount);
	stores.multipull.set(multipull);
};

const mergeCustomBanner = async (banners = []) => {
	const shareIDs = [];
	for (const banner of banners) {
		const { itemID: idFromImport, shareID: shareIDFormImport, dateFromImport } = banner;
		const checkDB = await getCustomBanner(idFromImport);
		const isNewerData = new Date(dateFromImport) > new Date(checkDB?.lastModified);

		// collect shareID to verify banner is available Online
		if (shareIDFormImport && !checkDB?.shareID) {
			shareIDs.push({ id: shareIDFormImport, itemID: idFromImport });
		}

		// add newer modified item
		if (!checkDB || isNewerData) {
			const bannerData = isNewerData ? { ...banner, isChanged: true } : banner;
			await addCustomBanner(bannerData);
			continue;
		}
	}

	if (shareIDs.length < 1) return;
	// Renew if banner not detected in cloud
	const ids = shareIDs.map(({ id }) => id).join(',');
	const { success, data = [] } = (await onlineBanner.getData(ids, 'multi')) || {};
	if (!success) return;

	const cloudBannerIDs = data.map(({ id }) => id);
	const unAvailableBanner = shareIDs.filter(({ id }) => !cloudBannerIDs.includes(id));

	for (let i = 0; i < unAvailableBanner.length; i++) {
		const { itemID } = unAvailableBanner[i] || {};
		const oldData = await getCustomBanner(itemID);
		delete oldData.hostedImages;
		delete oldData.imageHash;
		delete oldData.shareID;
		oldData.imgChanged = { artURL: true, faceURL: true, thumbnail: true };
		oldData.lastModified = new Date().toISOString();
		oldData.isChanged = true;
		await addCustomBanner(oldData);
	}
};

const mergeHistories = async (histories) => {
	const currentHistories = await getAllHistories();
	const compareArray = currentHistories.map(({ itemID, bannerName, pity, time }) => {
		const dataString = `${itemID}/${bannerName}/${pity}/${time}`;
		return dataString;
	});

	for (let i = 0; i < histories.length; i++) {
		const newData = histories[i];
		const { itemID, bannerName, pity, time, banner } = newData;
		const newDataString = `${itemID}/${bannerName}/${pity}/${time}`;
		const isDuplicated = compareArray.includes(newDataString);

		if (isDuplicated) continue;
		owneditem.put({ itemID });
		await addHistory(newData);
		rq.put(banner);
	}
};

const mergeSettings = (settings = {}) => {
	const { balance = {}, fatepoint = [], ownedOutfits = [] } = settings;
	Object.keys(balance).forEach((key) => {
		const before = localBalance.get(key);
		const after = before + balance[key];
		localBalance.set(key, after);
	});

	// Merge Fatepoint
	const currentFatePoint = fatepointManager.getAll();
	const comparePoint = currentFatePoint.map(({ version, phase }) => `${version}-${phase}`);

	for (let i = 0; i < fatepoint.length; i++) {
		const newPoint = fatepoint[i] || {};
		const newDataString = `${newPoint.version}-${newPoint.phase}`;
		const isDuplicated = comparePoint.includes(newDataString);

		if (isDuplicated) continue;
		fatepointManager.restore(newPoint);
	}

	// Merge outfit
	const currentOutfit = costumeManager.getAll();
	const compareOutfit = currentOutfit.map(({ name }) => name).filter((n) => n);

	for (let i = 0; i < ownedOutfits.length; i++) {
		const newOutfit = ownedOutfits[i];
		const isDuplicated = compareOutfit.includes(newOutfit.name);
		if (isDuplicated) continue;
		newOutfit.outfitName = newOutfit.name;
		costumeManager.set(newOutfit);
	}

	const { data: finalSettings } = storageLocal.getData();
	return finalSettings;
};

