export const storageLocal = {
	_getData() {
		const data = localStorage.getItem('WishSimulator.App');
		if (!data) return { data: {} };
		const parsed = JSON.parse(data);
		return parsed;
	},

	get(key) {
		const { data } = this._getData();
		return data[key] || {};
	},

	set(key, value) {
		const { data } = this._getData();
		data[key] = value;
		localStorage.setItem('WishSimulator.App', JSON.stringify({ data }));
	}
};

export const localPity = {
	get(pityBanner) {
		const pity = storageLocal.get('pity');
		return pity[pityBanner] || 0;
	},

	set(pityBanner, value) {
		const pity = storageLocal.get('pity');
		pity[pityBanner] = value;
		storageLocal.set('pity', pity);
	}
};

export const localBalance = {
	all() {
		const balance = storageLocal.get('balance');
		return balance;
	},
	get(currency) {
		const balance = storageLocal.get('balance');
		return balance[currency] || 0;
	},

	set(currency, value) {
		const balance = storageLocal.get('balance');
		balance[currency] = value;
		storageLocal.set('balance', balance);
	}
};

export const rollCounter = {
	get(banner) {
		const rollCount = storageLocal.get('rollCounter');
		return rollCount[banner] || 0;
	},
	set(banner, rollNumber) {
		const rollCount = storageLocal.get('rollCounter');
		rollCount[banner] = rollNumber;
		storageLocal.set('rollCounter', rollCount);
	}
};

export const guaranteedStatus = {
	get(banner) {
		const guaranteedStatus = storageLocal.get('guaranteedStatus');
		return guaranteedStatus[banner] || false;
	},
	set(banner, value) {
		const guaranteedStatus = storageLocal.get('guaranteedStatus');
		guaranteedStatus[banner] = value;
		storageLocal.set('guaranteedStatus', guaranteedStatus);
	}
};

export const localConfig = {
	get(key) {
		const config = storageLocal.get('config');
		const isValue = config[key] !== null;
		return isValue ? config[key] : null;
	},
	set(key, value) {
		const config = storageLocal.get('config');
		config[key] = value;
		storageLocal.set('config', config);
	}
};

export const owneditem = {
	getAll() {
		const items = storageLocal.get('ownedItem');
		return items;
	},

	get(itemName) {
		const db = this.getAll();
		const selected = db[itemName];
		if (!selected) return { qty: 0, name: itemName };

		const { manual, wish } = selected;
		return { name: itemName, qty: manual + wish };
	},

	put({ name, source = 'wish', qty = 1 }) {
		const allItems = storageLocal.get('ownedItem');
		const { manual = 0, wish = 0 } = allItems[name] || {};
		allItems[name] = {
			manual: source === 'wish' ? manual : qty + manual,
			wish: source === 'wish' ? qty + wish : wish
		};

		storageLocal.set('ownedItem', allItems);
		return allItems[name];
	}
};

export const fatepointManager = {
	init({ version, phase } = {}) {
		this._version = version;
		this._phase = phase;
		const storedData = storageLocal.get('fatepoint');
		this._db = Array.isArray(storedData) ? storedData : [];
		this._recordIndex = this._db.findIndex((d) => d.phase === phase && d.version === version);
		return this;
	},

	set(point, selectedIndex) {
		const { _recordIndex: i, _version: version, _phase: phase, _db: db } = this;
		const newData = { version, phase, point, selected: selectedIndex };
		if (i < 0) db.push(newData);
		else db[i] = newData;

		storageLocal.set('fatepoint', db);
		return;
	},

	getInfo() {
		const { _recordIndex: i, _db: db } = this;
		if (i < 0) return { selected: null, point: null };
		const { selected, point } = db[i];
		return { selected, point };
	},

	remove() {
		const { _recordIndex: i, _db: db } = this;
		const afterRemoved = db.filter((d, index) => index !== i);
		storageLocal.set('fatepoint', afterRemoved);
	}
};

export const dailyWelkin = {
	getData() {
		const welkin = storageLocal.get('welkin');
		if (!welkin) return { remaining: 0, diff: 0 };

		const utc = new Date().getTime() - 3 * 3600 * 1000;
		const today = new Date(utc).toDateString();
		const counter = Math.abs(new Date(today) - new Date(welkin.latestCheckIn));
		welkin.diff = Math.ceil(counter / (1000 * 60 * 60 * 24));
		return welkin;
	},

	checkin(action = 'checkin') {
		let { remaining, latestCheckIn } = this.getData();
		const time = new Date().getTime() - 3 * 3600 * 1000;
		const today = new Date(time).toDateString();

		// Initial Purchase
		if (!latestCheckIn && action !== 'checkin') {
			const object = { remaining: 29, latestCheckIn: today };
			storageLocal.set('welkin', object);
			return object;
		}

		// Buying More Welkin
		if (action !== 'checkin') {
			const days = remaining < 1 ? 29 : 30;
			const object = { remaining: days + remaining, latestCheckIn: today };
			storageLocal.set('welkin', object);
			return object;
		}

		// Daily Checkin
		const counter = Math.abs(new Date(today) - new Date(latestCheckIn));
		const diffDays = Math.ceil(counter / (1000 * 60 * 60 * 24));

		remaining = remaining - diffDays;
		remaining = remaining < 0 ? 0 : remaining;
		latestCheckIn = today;
		const object = { remaining, latestCheckIn };
		storageLocal.set('welkin', object);
		return object;
	}
};

export const ownedOutfits = {
	getAll() {
		const items = storageLocal.get('ownedOutfits');
		return Array.isArray(items) ? items : [];
	},

	get(outfitName) {
		const outfits = this.getAll();
		return outfits.find(({ name }) => name === outfitName);
	},

	getByChar(charName) {
		const outfits = this.getAll();
		return outfits.filter(({ characterName }) => characterName === charName);
	},

	set({ outfitName, isSet = true, characterName = null } = {}) {
		const outfits = this.getAll().map((outfit) => {
			if (outfit.characterName !== characterName) return outfit;
			outfit.isSet = false;
			return outfit;
		});

		if (this.get(outfitName)) {
			const index = outfits.findIndex(({ name }) => name === outfitName);
			outfits[index].isSet = isSet;
		} else {
			outfits.push({ name: outfitName, characterName, isSet });
		}
		storageLocal.set('ownedOutfits', outfits);
	}
};

export const localrate = {
	get(key) {
		const rates = storageLocal.get('probabilityRates');
		const isValue = rates[key] && rates[key] !== null && rates[key] !== undefined;
		return isValue ? rates[key] : {};
	},
	set(key, value) {
		const rates = storageLocal.get('probabilityRates');
		rates[key] = value;
		storageLocal.set('probabilityRates', rates);
	},
	reset(key) {
		const rates = storageLocal.get('probabilityRates');
		delete rates[key];
		storageLocal.set('probabilityRates', rates);
	}
};

