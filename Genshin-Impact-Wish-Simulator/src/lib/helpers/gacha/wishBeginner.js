import { guaranteedStatus } from '../dataAPI/api-localstore';
import { get3StarItem, get4StarItem, get5StarItem, rand } from './itemdrop-base';

const beginerWish = (rarity) => {
	const alreadyGetFeatured = guaranteedStatus.get('beginner');

	if (rarity === 3) {
		const droplist = get3StarItem();
		return rand(droplist);
	}

	if (rarity === 4) {
		// Get Noelle as a first 4 star from beginner
		if (!alreadyGetFeatured) {
			const result = get4StarItem({
				rateupNamelist: ['noelle'],
				banner: 'beginner',
				useRateup: true
			});
			guaranteedStatus.set('beginner', true);
			return rand(result);
		}

		const droplist = get4StarItem({ banner: 'beginner' });
		return rand(droplist);
	}

	if (rarity === 5) {
		const droplist = get5StarItem({ banner: 'beginner' });
		return rand(droplist);
	}
};

export default beginerWish;
