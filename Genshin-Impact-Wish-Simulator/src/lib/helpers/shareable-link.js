const encodeAndMakeLink = (string, path = 'wishitem') => {
	const encoded = window.btoa(string);
	const link = `${window.location.origin}/screen/${path}?a=${encoded}`;
	return link;
};

export const decodeAndReadData = {
	_read(decoded) {
		// prettier-ignore
		let [name, rarity, vision, stelaFortuna, bonusQty, bonusType, useOutfit, type, isNew] = decoded.split('/');

		rarity = parseInt(rarity);
		stelaFortuna = !!parseInt(stelaFortuna);
		bonusQty = parseInt(bonusQty);
		isNew = !!parseInt(isNew);
		useOutfit = !!parseInt(useOutfit);
		return { name, rarity, vision, stelaFortuna, bonusQty, bonusType, useOutfit, type, isNew };
	},

	single(encoded) {
		const decoded = window.atob(encoded);
		return this._read(decoded);
	},

	multi(encoded) {
		const decoded = window.atob(encoded);
		const arrData = decoded.split('|');
		const readData = arrData.map(this._read);
		return readData;
	}
};

const encodeData = {
	_createStringData(data) {
		// prettier-ignore
		const { bonusQty, bonusType, vision, rarity, name, stelaFortuna, type, isNew, useOutfit } = data;
		const string = `${name}/${rarity}/${vision}/${+!!stelaFortuna}/${bonusQty}/${bonusType}/${+!!useOutfit}/${type}/${+!!isNew}`;
		return string;
	},

	single(data) {
		const stringData = this._createStringData(data[0]);
		return encodeAndMakeLink(stringData);
	},

	multi(data) {
		const arrayDataStr = data.map(this._createStringData);
		const stringData = arrayDataStr.join('|');
		return encodeAndMakeLink(stringData, 'wishlist');
	}
};

export const createLink = (data = []) => {
	if (data.length > 1) return encodeData.multi(data);
	return encodeData.single(data);
};

