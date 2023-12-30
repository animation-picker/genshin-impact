import { HistoryManager } from '$lib/store/IDB-manager';
import {
	guaranteedStatus,
	localBalance,
	owneditem,
	storageLocal,
	localPity,
	rollCounter,
	localConfig
} from '$lib/store/localstore-manager';
import { getSplashArtData } from '../outfit';

const { getListByBanner, addHistory } = HistoryManager;

const migrateWpBannerHistory = async () => {
	const list = await getListByBanner('weapons');
	if (list.length < 1) return;
	list.map((d) => {
		d.banner = 'weapon-event';
		owneditem.put({ name: d.name });
		addHistory(d);
	});
};

const migrateCharBannerHistory = async () => {
	const list = await getListByBanner('events');
	if (list.length < 1) return;
	list.map((d) => {
		d.banner = 'character-event';
		owneditem.put({ name: d.name });
		addHistory(d);
	});
};

const migratePity = () => {
	const pityList = {
		'pity4-character-event': 'events4sPity',
		'pity5-character-event': 'events5sPity',
		'pity4-weapon-event': 'weapons4sPity',
		'pity5-weapon-event': 'weapons5sPity',
		'pity4-beginner': 'beginner4sPity',
		'pity5-beginner': 'beginner5sPity',
		'pity4-standard': 'standard4sPity',
		'pity5-standard': 'standard5sPity'
	};

	Object.keys(pityList).forEach((key) => {
		const oldPity = localStorage.getItem(pityList[key]);
		localStorage.removeItem(pityList[key]);
		if (!oldPity) return;
		localPity.set(key, parseInt(oldPity));
	});
};

const migrateRollCounter = () => {
	const rollCount = localStorage.getItem('beginnerRoll');
	localStorage.removeItem('beginnerRoll');
	if (!rollCount) return;
	rollCounter.set('beginner', parseInt(rollCount));
};

const migrateGuaranteedStatus = () => {
	const keyList = {
		beginner: 'beginner',
		events4Star: 'character-event-4star',
		events: 'character-event-5star',
		weapons4Star: 'weapon-event-4star',
		weapons: 'weapon-event-5star'
	};

	const objString = localStorage.getItem('guaranteedStatus');
	if (!objString) return;

	localStorage.removeItem('guaranteedStatus');
	const { status: oldObj } = JSON.parse(objString);
	Object.keys(oldObj).forEach((key) => {
		const status = oldObj[key];
		guaranteedStatus.set(keyList[key], status);
	});
};

const migrateBalance = () => {
	const balanceKeys = ['primogem', 'genesis', 'intertwined', 'acquaint', 'starglitter', 'stardust'];
	balanceKeys.forEach((key) => {
		const balance = localStorage.getItem(key);
		localStorage.removeItem(key);
		if (!balance) return;
		localBalance.set(key, parseInt(balance));
	});
};

const migrateFatePoint = () => {
	const oldPoints = localStorage.getItem('fatepoint');
	localStorage.removeItem('fatepoint');
	if (!oldPoints) return;

	const { data } = JSON.parse(oldPoints);
	const newData = data.map(({ patch, phase, selected, point }) => {
		return { version: patch, phase, selected, point };
	});
	storageLocal.set('fatepoint', newData);
};

const migrateWelkinData = () => {
	const oldWelkin = localStorage.getItem('welkin');
	localStorage.removeItem('welkin');
	if (!oldWelkin) return;
	const { latestCheckIn, remaining } = JSON.parse(oldWelkin);
	const newObj = { latestCheckIn, remaining };
	storageLocal.set('welkin', newObj);
};

const migrateOutfits = () => {
	const oldData = localStorage.getItem('outfits');
	localStorage.removeItem('outfits');
	if (!oldData) return;
	const { outfits: oldObj } = JSON.parse(oldData);
	const newObj = oldObj.map(({ isSet, name }) => {
		const { name: characterName } = getSplashArtData(name);
		return { isSet, name, characterName };
	});
	storageLocal.set('ownedOutfits', newObj);
};

const migrateConfig = () => {
	const oldObj = localStorage.getItem('config');
	localStorage.removeItem('config');
	if (!oldObj) return;

	const { config: oldConfig } = JSON.parse(oldObj);
	const configKey = {
		adKey: 'adKey',
		wishAmount: 'wishAmount',
		topupBonus: 'topupBonus',
		animatedBG: 'animatedBG'
	};

	Object.keys(configKey).forEach((key) => {
		const config = oldConfig[key];
		if (config === undefined || config === null) return;
		localConfig.set(configKey[key], config);
	});
};

const migrateFirstTimeShare = () => {
	const firstTimeShare = localStorage.getItem('firstshare');
	localStorage.removeItem('firstshare');
	if (!firstTimeShare) return;
	localConfig.set('firstTimeShare', firstTimeShare === 'yes');
};

export const retriveOldData = async () => {
	// LocalStorage
	localStorage.removeItem('storageVersion');
	localStorage.removeItem('version');
	migratePity();
	migrateRollCounter();
	migrateBalance();
	migrateGuaranteedStatus();
	migrateFatePoint();
	migrateWelkinData();
	migrateOutfits();
	migrateConfig();
	migrateFirstTimeShare();

	// IDB
	await migrateWpBannerHistory();
	await migrateCharBannerHistory();
};

