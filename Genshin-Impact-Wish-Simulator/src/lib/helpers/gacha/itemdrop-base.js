import { standard } from '$lib/data/banners/standard.json';
import { data as weaponsDB } from '$lib/data/weapons.json';
import { data as charsDB, onlyStandard } from '$lib/data/characters.json';
// import { data as memberDB } from '$lib/data/members.json';
import { memberDB } from '../member-loader';
import { getRate, prob } from './probabilities';
import { guaranteedStatus } from '../dataAPI/api-localstore';


const standardWeapons = (star) => {
	return getAllWeapons(star).filter(({ limited }) => !limited);
};

const filterByReleased = (charlist, version = null, phase = null) => {
	return charlist.filter(({ release }) => {
		if (!release) return true;
		const [v, phs] = release.split('-');
		if (parseFloat(version) < parseFloat(v)) return false;
		if (parseFloat(version) === parseFloat(v) && phase <= parseInt(phs)) return false;
		return true;
	});
};

export const rand = (array) => {
	if (!Array.isArray(array)) return array;
	if (array.length < 2) return array[0];
	return array[Math.floor(Math.random() * array.length)];
};

export const randomNumber = (min = 1, max = 9) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const getAllChars = (star) => {
	return charsDB
		.filter(({ rarity }) => rarity === star)
		.map((arr) => {
			arr.type = 'character';
			return arr;
		});
};

const getAllWeapons = (star) => {
	return weaponsDB
		.filter(({ rarity }) => rarity === star)
		.map((arr) => {
			arr.type = 'weapon';
			return arr;
		});
};

export const getMemberItem = () => {
	return memberDB
		.map((arr) => {
			arr.type = 'member';
			arr.weaponType = "catalyst";
			// arr.rarity = 3;
			return arr;
		}); 
}

export const getCharDetails = (charName) => {
	if (!charName) return {};
	const findChar = charsDB.find(({ name }) => charName === name);
	return findChar || {};
};

export const getWpDetails = (weaponName) => {
	if (!weaponName) return {};
	const findWP = weaponsDB.find(({ name }) => name === weaponName);
	return findWP || {};
};

const char4starList = (banner) => {
	if (banner === 'standard') return getAllChars(4);
	return getAllChars(4).filter(({ name }) => !onlyStandard.includes(name));
};

export const get3StarItem = () => standardWeapons(3);

export const get4StarItem = ({
	banner = 'standard',
	version = null,
	phase = null,
	type = null,
	useRateup = false,
	rateupNamelist = []
} = {}) => {
	// Rateup Item
	if (useRateup) {
		const isChar = banner === 'character-event' || banner === 'beginner';
		const DBList = isChar ? getAllChars(4) : getAllWeapons(4);
		const rateupList = DBList.filter(({ name }) => rateupNamelist.includes(name));
		return rateupList;
	}

	// Beginner droplist
	if (banner === 'beginner') {
		const charList = char4starList(banner).filter(({ release }) => release === '1.0-0');
		return charList;
	}

	// General Wish Result
	let items;
	if (type == 'all') {
		items = [...char4starList(banner), ...standardWeapons(4)];
	} else if (type === 'character') {
		items = char4starList(banner);
	} else if (type === 'weapon') {
		items = standardWeapons(4);
	} else {
		const charRate = getRate(banner, 'charRate');
		const { itemType } = prob([
			{ itemType: 'char', chance: charRate },
			{ itemType: 'wp', chance: 100 - charRate }
		]);
		items = itemType === 'wp' ? standardWeapons(4) : char4starList(banner);
	}

	const filtered = filterByReleased(items, version, phase);
	const itemList = filtered.filter(({ name }) => !rateupNamelist.includes(name));
	return itemList;
};

const std5StarCharlist = (stdver = 1) => {
	const { characters: stdCharNames } = standard.find(({ version }) => version === stdver);
	const resultList = getAllChars(5).filter(({ name }) => stdCharNames.includes(name));
	return resultList;
};

export const get5StarItem = ({
	banner = 'standard',
	stdver = 1,
	type = null,
	useRateup = false,
	rateupItem = [],
	customData = {}
} = {}) => {
	// Featured Char Result
	if (useRateup && banner === 'character-event') {
		if (Object.keys(customData).length > 0) {
			const { vision, character, artPosition, itemID } = customData;
			const result = {
				vision,
				itemID,
				name: character,
				offset: artPosition || {},
				type: 'character',
				rarity: 5,
				custom: true
			};
			return result;
		}

		const featured = getAllChars(5).find(({ name }) => name === rateupItem[0]);
		return featured;
	}

	// Featured Weapon Result
	if (useRateup && banner === 'weapon-event') {
		const featured = getAllWeapons(5).filter(({ name }) => rateupItem.includes(name));
		return featured;
	}

	// Standard Weapon result
	if (banner === 'weapon-event') {
		const rateupRemoved = standardWeapons(5).filter(({ name }) => !rateupItem.includes(name));
		return rateupRemoved;
	}

	// Beginner Result
	if (banner === 'beginner') {
		const result = std5StarCharlist(1);
		return result;
	}

	// Standard Result
	if (banner === 'standard' || !banner) {
		let resultList;
		if (type === 'all') {
			resultList = [...std5StarCharlist(stdver), ...standardWeapons(5)];
		} else if (type === 'character') {
			resultList = std5StarCharlist(stdver);
		} else if (type === 'weapon') {
			resultList = standardWeapons(5);
		} else {
			const charRate = getRate(banner, 'charRate');
			const { itemType } = prob([
				{ itemType: 'char', chance: charRate },
				{ itemType: 'wp', chance: 100 - charRate }
			]);
			resultList = itemType === 'wp' ? standardWeapons(5) : std5StarCharlist(stdver);
		}
		return resultList;
	}

	// Character List while lose on character banner
	return std5StarCharlist(stdver).filter(({ name }) => !rateupItem.includes(name));
};

// RateUp Probability
export const isRateup = (banner) => {
	const winRate = getRate(banner, 'winRate');
	const { item } = prob([
		{ item: 'rateup', chance: winRate },
		{ item: 'std', chance: 100 - winRate }
	]);

	return item === 'rateup';
};

// CheckGuaranteed
export const checkGuaranteed = (banner, rarity) => {
	const status = guaranteedStatus.get(`${banner}-${rarity}star`);
	const guaranteedSystem = getRate(banner, 'guaranteed');
	const never = guaranteedSystem === 'never';
	const always = guaranteedSystem === 'always';
	return { status, never, always };
};
