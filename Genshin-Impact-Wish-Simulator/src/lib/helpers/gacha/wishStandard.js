import { get3StarItem, get4StarItem, get5StarItem, rand } from './itemdrop-base';

const standardWish = {
	init({ stdver, version, phase }) {
		this._stdver = stdver;
		this._version = version;
		this._phase = phase;
		return this;
	},

	get(rarity) {
		if (rarity === 3) {
			const droplist = get3StarItem();
			return rand(droplist);
		}

		if (rarity === 4) {
			const droplist = get4StarItem({
				banner: 'standard',
				version: this._version,
				phase: this._phase
			});

			return rand(droplist);
		}

		if (rarity === 5) {
			const droplist = get5StarItem({
				banner: 'standard',
				stdver: this._stdver
			});

			return rand(droplist);
		}
	}
};

export default standardWish;

