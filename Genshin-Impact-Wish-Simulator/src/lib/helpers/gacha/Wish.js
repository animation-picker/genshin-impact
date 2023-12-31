import { standard } from '$lib/data/banners/standard.json';
import characterWish from './wishCharacter';
import beginerWish from './wishBeginner';
import memberWish from './wishMember';
import weaponWish from './wishWeapon';
import standardWish from './wishStandard';
import roll from './roll';

const WISH = {
	async init(version, phase, customData) {
		this._version = version;
		this._phase = phase;

		if (version.match(/(custom|local)/gi)) return this._initCustom(customData);
		const { data } = await import(`../../data/banners/events/${version}.json`);
		const { standardVersion, weapons, events } = data.find((d) => d.phase === phase).banners;

		this._characters = events;
		this._isDualBanner = events.featured?.length > 1;
		this._weapons = weapons;
		this._standardVer = standardVersion;
		this._customData = {};
		return this;
	},

	_initCustom(customData) {
		this._customData = customData;
		this._standardVer = standard.reverse()[0].version;
		const { character = '', rateup = [], bannerName = '' } = customData;
		this._characters = {
			rateup,
			featured: [{ bannerName, character }]
		};
		return this;
	},

	_characterWish(rarity, indexOfBanner) {
		const { featured, rateup } = this._characters;
		const eventBanner = characterWish.init({
			version: this._version,
			phase: this._phase,
			stdver: this._standardVer,
			customData: this._customData,
			indexOfBanner,
			featured,
			rateup
		});

		const result = eventBanner.get(rarity);
		result.bannerName = featured[indexOfBanner].bannerName;
		return result;
	},

	_weaponWish(rarity) {
		const { _weapons, _phase: phase, _version: version } = this;
		const { fatepointsystem: fatesystem = false, featured, rateup } = _weapons;
		const weaponBanner = weaponWish.init({
			fatesystemON: fatesystem,
			featured,
			phase,
			version,
			rateup
		});
		const result = weaponBanner.get(rarity);
		result.bannerName = _weapons.bannerName;
		return result;
	},

	_beginnerWish(rarity) {
		const result = beginerWish(rarity);
		result.bannerName = 'beginner';
		return result;
	},

	_standardWish(rarity) {
		const { _standardVer: stdver, _phase: phase, _version: version } = this;
		const standardBanner = standardWish.init({ stdver, phase, version });
		const result = standardBanner.get(rarity);
		result.bannerName = `wanderlust-invocation-${stdver}`;
		return result;
	},

	_memberWish(rarity) {
		const { _standardVer: stdver, _phase: phase, _version: version } = this;
		const memberBanner = memberWish.init({ stdver, phase, version });
		const result = memberBanner.get(rarity);
		result.bannerName =  `wanderlust-invocation-${stdver}`;
		return result;
	},

	getItem(rarity, banner, indexOfBanner) {
		const date = new Date();
		const time = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
		const resultObj = { time, banner };

		if (banner === 'member') return { ...resultObj, ...this._memberWish(rarity) };
		if (banner === 'beginner') return { ...resultObj, ...this._beginnerWish(rarity) };
		if (banner === 'standard') return { ...resultObj, ...this._standardWish(rarity) };
		if (banner === 'weapon-event') return { ...resultObj, ...this._weaponWish(rarity) };
		if (banner === 'character-event') {
			return { ...resultObj, ...this._characterWish(rarity, indexOfBanner) };
		}

		return { type: null, rarity: 0, name: null };
	}
};

export { roll };
export default WISH;
