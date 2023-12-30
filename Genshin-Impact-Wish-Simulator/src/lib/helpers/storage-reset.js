import { wishPhase, version, initialAmount, storageVersion } from '$lib/data/wish-setup.json';
import { HistoryManager } from '$lib/store/IDB-manager';
import { localConfig, storageLocal } from '$lib/store/localstore-manager';
import {
	acquaint,
	genesis,
	intertwined,
	primogem,
	stardust,
	starglitter,
	showBeginner,
	wishAmount,
	activeVersion,
	beginnerRemaining,
	course,
	activeBanner,
	autoskip
} from '$lib/store/app-stores';

const { clearIDB } = HistoryManager;

const clearCacheStorage = async () => {
	const keys = await caches.keys();
	for (const key of keys) await caches.delete(key);
	return true;
};

const factoryReset = async ({ clearCache = false, keepSetting = false }) => {
	await clearIDB();
	if (clearCache) await clearCacheStorage();

	beginnerRemaining.set(20);
	showBeginner.set(true);
	course.set({ point: null, selected: null });

	if (keepSetting) {
		const config = storageLocal.get('config');
		const pity = storageLocal.get('pity');
		const balance = storageLocal.get('balance');
		const probabilityRates = storageLocal.get('probabilityRates');
		localStorage.removeItem('WishSimulator.App');

		storageLocal.set('config', config);
		storageLocal.set('pity', pity);
		storageLocal.set('balance', balance);
		storageLocal.set('probabilityRates', probabilityRates);
		return;
	}

	// Remove all Settings
	const locale = localConfig.get('locale');
	const adKey = localConfig.get('adKey');
	localStorage.removeItem('WishSimulator.App');
	if (locale) localConfig.set('locale', locale);
	if (adKey) localConfig.set('adKey', adKey);

	const { fates, genesis: igen, primogem: iprimo } = initialAmount;
	acquaint.set(fates);
	intertwined.set(fates);
	genesis.set(igen);
	primogem.set(iprimo);
	stardust.set(0);
	starglitter.set(0);

	localConfig.set('storageVersion', storageVersion);
	localConfig.set('version', `${version}-${wishPhase}`);
	activeVersion.set({ patch: version, phase: wishPhase });
	activeBanner.set(0);

	// Setting
	autoskip.set(false);
	wishAmount.set('default');
};

export default factoryReset;
