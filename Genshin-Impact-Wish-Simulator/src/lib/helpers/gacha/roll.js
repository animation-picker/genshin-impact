import { beginnerRemaining, showBeginner } from '$lib/store/app-stores';
import { HistoryManager } from '../dataAPI/api-indexeddb';
import { localPity, owneditem, rollCounter } from '../dataAPI/api-localstore';
import { getRate, prob, rates } from './probabilities';

const { addHistory } = HistoryManager;

/**
 * Roll and get result for the selected Banner
 * @param {string} banner Wich banner to do roll
 * @param {Object} WishInstance Wish Instance, init first, then put as argument here
 * @param {number} indexOfBanner Index Of active banner among the dual banner
 * @returns Wish Result Object
 */
const roll = async (banner, WishInstance, indexOfBanner) => {
	if (banner === "member") {

		// Get Item
		const randomItem = WishInstance.getItem(5, banner, indexOfBanner);
		// const { manual, wish } = owneditem.put({ itemID: randomItem.itemID });
		// const numberOfOwnedItem = manual + wish - 1;
		// const isNew = numberOfOwnedItem < 1;
		let pity = 1;
		const isNew = false;

		// Milestone Bonus (Stardust or Starglitter)
		const bonusType = randomItem.rarity === 3 ? 'stardust' : 'starglitter';
		const bonusQty = 20;

		const result = { pity, isNew, bonusType, bonusQty, ...randomItem };
		return result;
	}


	const pity5 = localPity.get(`pity5-${banner}`) + 1;
	const pity4 = localPity.get(`pity4-${banner}`) + 1;
	const maxPity = getRate(banner, 'max5');

	const rate5star = () => {
		return rates({
			baseRate: getRate(banner, 'baseRate5'),
			rateIncreasedAt: getRate(banner, 'hard5'),
			currentPity: pity5,
			maxPity
		});
	};

	const rate4star = () => {
		return rates({
			baseRate: getRate(banner, 'baseRate4'),
			currentPity: pity4,
			rateIncreasedAt: getRate(banner, 'hard4'),
			maxPity: getRate(banner, 'max4')
		});
	};

	let chance5star = rate5star();
	let chance4star = rate4star();
	let chance3star = 100 - chance4star - chance5star;

	if ((chance3star < 0 && pity5 >= maxPity) || chance5star === 100) chance4star = 0;
	if (chance3star < 0) chance3star = 0;
	if (chance4star === 100) chance5star = 0;

	const item = [
		{
			rarity: 3,
			chance: chance3star
		},
		{
			rarity: 4,
			chance: chance4star
		},
		{
			rarity: 5,
			chance: chance5star
		}
	];

	const { rarity } = prob(item);
	let pity = 1;

	const rollQty = rollCounter.get(banner);
	rollCounter.set(banner, rollQty + 1);

	if (banner === 'beginner') {
		// hide beginner banner after 20 roll
		beginnerRemaining.update((v) => (v < 1 ? 0 : v - 1));
		if (rollQty >= 19) showBeginner.set(false);
	}

	if (rarity === 5) {
		localPity.set(`pity4-${banner}`, pity4);
		localPity.set(`pity5-${banner}`, 0);
		pity = pity5;
	}

	if (rarity === 4) {
		localPity.set(`pity4-${banner}`, 0);
		localPity.set(`pity5-${banner}`, pity5);
		pity = pity4;
	}

	if (rarity === 3) {
		localPity.set(`pity4-${banner}`, pity4);
		localPity.set(`pity5-${banner}`, pity5);
	}

	// Get Item
	const randomItem = WishInstance.getItem(rarity, banner, indexOfBanner);
	const { manual, wish } = owneditem.put({ itemID: randomItem.itemID });
	const numberOfOwnedItem = manual + wish - 1;
	const isNew = numberOfOwnedItem < 1;

	// storing item to storage
	await saveResult({ pity, ...randomItem });

	// Set Constellation
	const isFullConstellation = numberOfOwnedItem > 6;
	if (randomItem.type === 'character' && !isNew) {
		randomItem.stelaFortuna = !isFullConstellation;
	}

	// Milestone Bonus (Stardust or Starglitter)
	const bonusType = randomItem.rarity === 3 ? 'stardust' : 'starglitter';
	const bonusQty = getMilestoneQty(randomItem.rarity, randomItem.type, isFullConstellation, isNew);

	const result = { pity, isNew, bonusType, bonusQty, ...randomItem };
	return result;
};

const saveResult = async (result) => {
	const data = { ...result };
	delete data.release;
	delete data.limited;
	delete data.offset;
	await addHistory(data);
};

const getMilestoneQty = (rarity, type, isFullConstellation, isNew) => {
	// Always give stargliter or stardust on obtaining weapons
	if (type === 'weapon') {
		if (rarity === 3) return 15; // *3
		if (rarity === 4) return 2; // *4
		return 10; // *5
	}

	// Don't give Starglitter to newly obtained character
	if (isNew) return 0;

	// Give starglitter for duplicate characters
	if (rarity === 4) return isFullConstellation ? 5 : 2; // *4
	return isFullConstellation ? 25 : 10; // *5
};

export default roll;
