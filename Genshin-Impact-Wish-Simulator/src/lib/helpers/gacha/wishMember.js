import { get3StarItem, getMemberItem, rand } from './itemdrop-base';

const memberWish = {
    init({ stdver, version, phase }) {
        this._stdver = stdver;
		this._version = version;
		this._phase = phase;
		return this;
    },

    get(rarity) {
        const dropList = getMemberItem();
        return rand(dropList);
    }
};

export default memberWish;