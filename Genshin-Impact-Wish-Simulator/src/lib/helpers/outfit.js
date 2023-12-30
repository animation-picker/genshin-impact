import { outfits } from '$lib/data/outfits.json';
import { ownedOutfits } from '$lib/store/localstore-manager';

export const setActiveOutfit = (obj = {}) => {
	if (!obj.name) return obj;
	const { name: outfitName } = ownedOutfits.getByChar(obj.name)?.find(({ isSet }) => isSet) || {};
	if (!outfitName) return obj;
	const { wishBoxPosition } = getSplashArtData(outfitName);
	if (wishBoxPosition) obj.wishBoxPosition = wishBoxPosition;
	return { ...obj, useOutfit: true, outfitName };
};

export const getSplashArtData = (outfitName) => {
	const findOutfit = outfits.find(({ name }) => name === outfitName);
	const { characterName, rarity, wishBoxPosition } = findOutfit || {};
	const data = { name: characterName, rarity, outfitName, wishBoxPosition, type: 'outfit' };
	return data;
};

export const outfitListForChar = (charName) => {
	const list = outfits.filter(({ characterName }) => characterName === charName);
	const setStatus = list.map((o) => {
		const localOutfit = ownedOutfits.get(o.name);
		o.owned = !!localOutfit || !o.release;
		o.isSet = localOutfit?.isSet || false;
		return o;
	});
	return setStatus;
};

export const outfitsForThisPatch = ({ patch }) => {
	const filtered = outfits.filter(({ release }) => release <= parseFloat(patch));
	const setOwned = filtered.map((outfit) => {
		outfit.isOwned = !!ownedOutfits.get(outfit.name);
		return outfit;
	});
	return setOwned;
};

export const isNewOutfitReleased = (patch) => {
	const filtered = outfits.filter(({ release }) => release === parseFloat(patch));
	return filtered.length > 0;
};
