import { writable } from 'svelte/store';
import { assets } from '$lib/store/app-stores';
import { AssetManager } from './dataAPI/api-indexeddb';
import { isSafari } from './mobileDetect';

const itemRarity = [3, 3, 4, 4, 5, 5];
const meteorList = [
	'bg.webm',
	'3star-single.mp4',
	'4star-single.mp4',
	'4star-multi.mp4',
	'5star-single.mp4',
	'5star-multi.mp4'
];

export const check = async () => {
	const loadedData = [];

	// Load video from network directly if user use Safari browser
	if (isSafari()) return safariMeteorLoader();

	// Read blob data from storage if using chrome
	for (let i = 0; i < meteorList.length; i++) {
		const key = meteorList[i];
		const storedData = await AssetManager.get(key);
		if (!storedData) continue;
		loadedData.push(storedData);
	}

	const allComplete = loadedData.length === meteorList.length;
	if (allComplete) {
		const DOMURL = window.URL || window.webkitURL;
		assets.update((v) => {
			loadedData.forEach(({ key, blob }) => (v[key] = DOMURL.createObjectURL(blob)));
			return v;
		});
	}
	return allComplete;
};

const safariMeteorLoader = () => {
	assets.update((v) => {
		meteorList.forEach((vid) => (v[vid] = `/videos/${vid}`));
		return v;
	});
	return true;
};

export const loadProggress = writable({ rarity: '', progress: 0, totalItem: 0, itemNumber: 0 });

export const loadAnimation = async () => {
	const results = [];
	const totalItem = meteorList.length;
	for (let i = 0; i < totalItem; i++) {
		loadProggress.set({ rarity: itemRarity[i], progress: 0, totalItem, itemIndex: i });
		const response = await fetch(`/videos/${meteorList[i]}`);
		const data = new Response(streamResponse(response));
		const blob = await data.blob();

		// Save to IDB
		await AssetManager.put({ key: meteorList[i], blob });

		const DOMURL = window.URL || window.webkitURL;
		const blobUrl = DOMURL.createObjectURL(blob);
		const resultObj = { asset: meteorList[i], url: blobUrl };
		results.push(resultObj);
	}

	return results;
};

const streamResponse = (response) => {
	const contentLength = response.headers.get('content-length');
	return new ReadableStream({
		start(controller) {
			const reader = response.body.getReader();
			readStream(controller, reader, contentLength);
		}
	});
};

let loaded = 0;
const readStream = (controller, reader, contentLength) => {
	reader.read().then((progressEvent) => {
		if (progressEvent.done) {
			controller.close();
			loaded = 0;
			return;
		}

		loadProggress.update((v) => {
			loaded += progressEvent.value.byteLength;
			v.progress = Math.round((loaded / contentLength) * 100);
			return v;
		});
		controller.enqueue(progressEvent.value);
		readStream(controller, reader, contentLength);
	});
};

