import { browser } from '$app/environment';
import { openDB } from 'idb';

const version = 2;
const DBName = 'WishSimulator';

let IndexedDB;

if (browser) {
	IndexedDB = openDB(DBName, version, {
		upgrade(db) {
			if (!db.objectStoreNames.contains('history')) {
				const historyStore = db.createObjectStore('history', {
					keyPath: 'id',
					autoIncrement: true
				});
				historyStore.createIndex('banner', 'banner', { unique: false });
				historyStore.createIndex('name', 'name', { unique: false });
			}

			if (!db.objectStoreNames.contains('assets')) {
				db.createObjectStore('assets', { keyPath: 'key', autoIncrement: false });
			}
		}
	});
}

export const HistoryManager = {
	async historyCount() {
		return (await IndexedDB).count('history');
	},
	async getListByBanner(banner) {
		return (await IndexedDB).getAllFromIndex('history', 'banner', banner);
	},

	async countItem(name) {
		return (await IndexedDB).countFromIndex('history', 'name', name);
	},

	async getByName(name) {
		return (await IndexedDB).getAllFromIndex('history', 'name', name);
	},

	async clearHistory(banner) {
		try {
			const idb = await IndexedDB;
			const keys = await idb.getAllKeysFromIndex('history', 'banner', banner);
			keys.forEach((key) => idb.delete('history', key));
			return 'success';
		} catch (e) {
			return 'failed';
		}
	},
	async clearIDB() {
		return (await IndexedDB).clear('history');
	},
	async getAllHistories() {
		return (await IndexedDB).getAll('history');
	},
	async addHistory(data) {
		// eslint-disable-next-line no-prototype-builtins
		if (!data.hasOwnProperty('banner')) return;
		return (await IndexedDB).put('history', data);
	},
	async delete(id) {
		if (!id) return;
		return (await IndexedDB).delete('history', id);
	}
};

// Assets Manager
export const AssetManager = {
	async put(data) {
		// eslint-disable-next-line no-prototype-builtins
		if (!data.hasOwnProperty('key')) return;
		return (await IndexedDB).put('assets', data);
	},
	async get(key) {
		if (!key) return null;
		return (await IndexedDB).get('assets', key);
	},
	async delete(key) {
		if (!key) return;
		return (await IndexedDB).delete('assets', key);
	}
};
