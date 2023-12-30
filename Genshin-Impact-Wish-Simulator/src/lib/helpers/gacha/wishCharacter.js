import { guaranteedStatus } from '$lib/store/localstore-manager';
import {
	get3StarItem,
	get4StarItem,
	rand,
	get5StarItem,
	isRateup,
	checkGuaranteed
} from './itemdrop-base';

const getNameList = () => {
	return get3StarItem().filter(({ weaponType }) => weaponType == 'polearm');
};

const characterWish = {
	init({ indexOfBanner, featured, rateup, version, phase, stdver }) {
		this._featured = featured;
		this._rateup = rateup;
		this._indexOfBanner = indexOfBanner;
		this._version = version;
		this._phase = phase;
		this._stdver = stdver;
		return this;
	},

	get(rarity) {
		if (rarity === 3) {
			const droplist = getNameList();
			return rand(droplist);
		}
		if (rarity === 4) {
			const droplist = getNameList();
			return rand(droplist);
		}
		if (rarity === 5) {
			const droplist = getNameList();
			return rand(droplist);
		}

		if (rarity === 4) {
			const { _version: version, _phase: phase, _rateup: rateup } = this;
			const { status: isGuaranteed, never, always } = checkGuaranteed('character-event', 4);
			const useRateup = (isGuaranteed && !never) || always || isRateup('character-event');

			const droplist = get4StarItem({
				banner: 'character-event',
				rateupNamelist: rateup,
				useRateup,
				version,
				phase
			});

			guaranteedStatus.set('character-event-4star', !useRateup);
			return rand(droplist);
		}

		if (rarity === 5) {
			const { _featured, _indexOfBanner, _stdver } = this;
			const { status: isGuaranteed, never, always } = checkGuaranteed('character-event', 5);
			const useRateup = (isGuaranteed && !never) || always || isRateup('character-event');

			const droplist = get5StarItem({
				banner: 'character-event',
				stdver: _stdver,
				rateupItem: [_featured[_indexOfBanner].character],
				useRateup
			});
			const result = rand(droplist);

			const statusGuarateed = (isGuaranteed && !never) || always;
			const rateUpStatus = statusGuarateed ? 'guaranteed' : 'win';
			const status = useRateup ? rateUpStatus : 'lose';
			guaranteedStatus.set('character-event-5star', !useRateup);
			return { ...result, status };
		}
	}
};

export default characterWish;
