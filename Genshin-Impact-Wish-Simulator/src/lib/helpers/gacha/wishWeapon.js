// import { fatePoint, selectedCourse } from '$lib/store/stores';
import { course } from '$lib/store/app-stores';
import { fatepointManager, guaranteedStatus } from '../dataAPI/api-localstore';
import {
	rand,
	get3StarItem,
	get4StarItem,
	get5StarItem,
	isRateup,
	checkGuaranteed
} from './itemdrop-base';
import { getRate, prob } from './probabilities';

const fatepoint = {
	init({ version, phase, featured, fatesystemON }) {
		this._fatesystemON = fatesystemON;
		if (!fatesystemON) return null;
		this._featured = featured;
		this._fatepointManager = fatepointManager.init({ version, phase });
		return this;
	},

	check() {
		this._info = this._fatepointManager.getInfo();
		return this._info;
	},

	verify(result) {
		if (!this._fatesystemON) return null;
		const { _featured, _info, _fatepointManager } = this;
		const { selected, point } = _info;
		if (selected === null) return false;

		const { name: resultName } = result;
		const { name: selectedWeapon } = _featured[selected];

		// Reset Fatepoint
		if (resultName === selectedWeapon) {
			_fatepointManager.remove();
			course.set({ point: 0, selected: null });
			return point === 2;
		}

		// Update Fatepoint if not a selected item
		_fatepointManager.set(point + 1, selected);
		course.set({ point: point + 1, selected });
		return false;
	}
};

const weaponWish = {
	init({ rateup, version, phase, featured, fatesystemON } = {}) {
		this._version = version;
		this._phase = phase;
		this._rateup = rateup;
		this._featured = featured;

		this._fatesystem = fatepoint.init({ version, phase, featured, fatesystemON });
		return this;
	},

	get(rarity) {
		// 3 star items
		if (rarity === 3) {
			const droplist = get3StarItem();
			return rand(droplist);
		}

		// 4 star items (Character or Weapon)
		if (rarity === 4) {
			const { _version: version, _phase: phase, _rateup: rateup } = this;
			const { status: isGuaranteed, never, always } = checkGuaranteed('weapon-event', 4);
			const useRateup = (isGuaranteed && !never) || always || isRateup('weapon-event');

			const droplist = get4StarItem({
				banner: 'weapon-event',
				rateupNamelist: rateup,
				useRateup,
				version,
				phase
			});

			guaranteedStatus.set('weapon-event-4star', !useRateup);
			return rand(droplist);
		}

		// 5 Star Weapon
		if (rarity === 5) {
			const { _featured, _fatesystem } = this;
			const { status: isGuaranteed, never, always } = checkGuaranteed('weapon-event', 5);
			let useRateup = (isGuaranteed && !never) || always || isRateup('weapon-event');

			let calculateFatepoint = false;
			let rateupItem = _featured.map(({ name }) => name);

			// Epitomized path is Active and Weapon is Selected
			if (_fatesystem) {
				const { selected, point } = _fatesystem.check();
				calculateFatepoint = selected !== null && selected > -1;
				let useSelected = false;

				// Probability to get selected Weapon
				if (calculateFatepoint && useRateup) {
					const selectedRate = getRate('weapon-event', 'selectedRate');
					const { item } = prob([
						{ item: 'selected', chance: selectedRate },
						{ item: 'random', chance: 100 - selectedRate }
					]);
					useSelected = item === 'selected';
				}

				// Guaranteed after 2 point
				if (useSelected || (calculateFatepoint && point >= 2)) {
					useRateup = true;
					rateupItem = [rateupItem[selected]];
				}
			}

			const droplist = get5StarItem({
				banner: 'weapon-event',
				rateupItem,
				useRateup
			});

			const result = rand(droplist);
			const isFatepointFull = _fatesystem?.verify(result);

			const statusGuarateed = (isGuaranteed && !never) || always;
			const rateUpStatus = statusGuarateed ? 'guaranteed' : 'win';
			const fatepointstatus = calculateFatepoint && isFatepointFull ? 'selected' : rateUpStatus;
			const status = useRateup ? fatepointstatus : 'lose';
			guaranteedStatus.set('weapon-event-5star', !useRateup);

			return { ...result, status };
		}
	}
};

export default weaponWish;
