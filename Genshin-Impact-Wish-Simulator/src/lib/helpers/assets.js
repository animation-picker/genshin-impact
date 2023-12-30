import { allPatch } from '$lib/data/wish-setup.json';
import { data as charDB } from '$lib/data/characters.json';
import { data as weaponsDB } from '$lib/data/weapons.json';
import { outfits } from '$lib/data/outfits.json';

const images = [
	{
		dir: 'background',
		paths: [
			'constellation.webp',
			'detailbg.webp',
			'element-anemo-bg.webp',
			'element-cryo-bg.webp',
			'element-dendro-bg.webp',
			'element-electro-bg.webp',
			'element-geo-bg.webp',
			'element-hydro-bg.webp',
			'element-pyro-bg.webp',
			'wish-background.webp'
		]
	},
	{
		dir: 'utility',
		paths: [
			'3star-bg.webp',
			'4star-bg.webp',
			'5star-bg.webp',
			'acquaint-fate.webp',
			'bg-bonus.webp',
			'book.webp',
			'book-select-bg.webp',
			'brand.png',
			'button.webp',
			'fatepointbook-half.webp',
			'fatepointbook.webp',
			'genesis-60.webp',
			'genesis-300.webp',
			'genesis-980.webp',
			'genesis-1980.webp',
			'genesis-3280.webp',
			'genesis-6480.webp',
			'genesis-bg.webp',
			'genesis.webp',
			'history-select-bg.webp',
			'imbroke.webp',
			'intertwined-fate.webp',
			'menu-active.png',
			'modal-bg-icon.png',
			'payment-childe.webp',
			'payment-tears.webp',
			'payment-wakaranai.webp',
			'primogem.webp',
			'shop-nav-bg.webp',
			'welkin-card.webp',
			'welkin-moon-girl.webp',
			'welkin.webp'
		]
	}
];

const previewImages = [
	{
		dir: 'background',
		paths: ['outfit-background.webp', 'splash-background.webp']
	},
	{
		dir: 'utility',
		paths: [
			'bg-bow.webp',
			'bg-catalyst.webp',
			'bg-claymore.webp',
			'bg-polearm.webp',
			'bg-sword.webp',
			'genshin-logo-cn.webp',
			'genshin-logo.webp',
			'masterless-stardust.webp',
			'masterless-starglitter.webp',
			'resultcard-bg.svg',
			'stella-fortuna-4star.webp',
			'stella-fortuna-5star.webp'
		]
	}
];

const bgList = () => {
	const paths = [];
	for (let i = 0; i < 20; i++) {
		paths.push(`bg${i + 1}.webp`);
	}
	return { dir: 'background', paths };
};

export const getItemlist = async () => {
	const pathList = {};
	outfits.forEach(({ name }) => {
		pathList[`face/${name}`] = `/images/outfits/face/${name}.webp`;
		pathList[`splash-art/${name}`] = `/images/outfits/splash-art/${name}.webp`;
		pathList[`thumbnail/${name}`] = `/images/outfits/thumbnail/${name}.webp`;
	});

	charDB.forEach(({ name, rarity }) => {
		pathList[`face/${name}`] = `/images/characters/face/${rarity}star/${name}.webp`;
		pathList[`splash-art/${name}`] = `/images/characters/splash-art/${rarity}star/${name}.webp`;
	});

	weaponsDB.forEach(({ name, weaponType, rarity }) => {
		pathList[name] = `/images/weapons/${weaponType}/${rarity}star/${name}.webp`;
	});

	for await (const patch of allPatch) {
		const json = await import(`$lib/data/banners/events/${patch.toFixed(1)}.json`);
		const { data } = json.default;
		data.forEach(({ banners }) => {
			const { bannerName } = banners.weapons;
			pathList[bannerName] = `/images/banner/weapons/${bannerName}.webp`;
			const event = banners.events.featured;
			event.forEach(({ bannerName }) => {
				pathList[bannerName] = `/images/banner/character-events/${bannerName}.webp`;
			});
		});
	}

	pathList['wanderlust-invocation-1'] = '/images/banner/standard/wanderlust-invocation-1.webp';
	pathList['wanderlust-invocation-2'] = '/images/banner/standard/wanderlust-invocation-2.webp';
	pathList['beginner'] = '/images/banner/beginner/beginner.webp';
	return pathList;
};

export const listingAssets = (param) => {
	const arr = [];
	const allImg = [bgList(), ...previewImages, ...images];
	const imgs = param === 'preview' ? previewImages : allImg;

	imgs.forEach(({ dir, paths }) => {
		paths.forEach((path) => {
			const pathdir = `/images/${dir}/${path}`;
			const item = { path: pathdir, asset: path };
			arr.push(item);
		});
	});
	return arr;
};

export const blobAssets = async (path) => {
	try {
		const data = await fetch(path);
		const responseType = data.headers.get('Content-Type');
		if (responseType === 'text/html') throw new Error('Failed to load Assets');
		const blob = await data.blob();
		const DOMURL = window.URL || window.webkitURL;
		const url = DOMURL.createObjectURL(blob);
		return url;
	} catch (e) {
		console.error(e);
		return 'error';
	}
};
