// import { deleteDB } from 'idb';
import { data as charDB } from '$lib/data/characters.json';
import { data as wpDB } from '$lib/data/weapons.json';
import { BannerManager, HistoryManager } from '../dataAPI/api-indexeddb';
import { cookie } from '../dataAPI/api-cookie';
import { localConfig } from '../dataAPI/api-localstore';
import { retriveOldData } from './collect-old-data';
import { clearCacheStorage } from '../dataAPI/storage-reset';

const { addHistory, getAllHistories } = HistoryManager;
const { getAll: getAllCustomBanner, put: putCustomBanner } = BannerManager;

export const IDBUpdater = async () => {
	const idbVer = localConfig.get('idbVer');

	if (idbVer < 3) {
		const accessKey = cookie.get('adKey');
		if (accessKey) cookie.set('accessKey', accessKey);

		// Clear Storage
		await clearCacheStorage();

		// Update IDB
		const itemIDs = {};
		charDB.forEach(({ itemID, name }) => (itemIDs[name] = itemID));
		wpDB.forEach(({ itemID, name }) => (itemIDs[name] = itemID));
		const historyData = await getAllHistories();

		for (let i = 0; i < historyData.length; i++) {
			const data = historyData[i];
			data.itemID = itemIDs[data.name];
			await addHistory(data);

			if (i < historyData.length - 1) continue;
			await retriveOldData();
			localConfig.set('idbVer', 3);
		}
	}

	if (idbVer < 4) {
		const customBannerData = await getAllCustomBanner();
		for (let i = 0; i < customBannerData.length; i++) {
			const data = customBannerData[i];
			if (!data.id) continue;
			data.shareID = data.id;
			delete data.id;
			await putCustomBanner(data);
		}
		localConfig.set('idbVer', 4);
		console.log('IDB Updated');
	}
};
