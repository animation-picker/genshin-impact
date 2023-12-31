import { beginner } from '$lib/data/banners/beginner.json';
import { standard } from '$lib/data/banners/standard.json';
import { member } from '$lib/data/banners/member.json';
import { version, wishPhase } from '$lib/data/wish-setup.json';

import { imageCDN } from './assets';
import { BannerManager } from './dataAPI/api-indexeddb';
import { localConfig, rollCounter } from './dataAPI/api-localstore';
import {
	activeBanner,
	activeVersion,
	bannerList,
	customData,
	editorMode,
	isCustomBanner,
	isFatepointSystem,
	preloadVersion,
	showBeginner
} from '$lib/store/app-stores';

const idb = BannerManager;

const useCustomBanner = async (bannerID) => {
	try {
		const data = await idb.get(bannerID);
		if (!data) return preloadVersion.set({ patch: version, phase: wishPhase });

		const {
			bannerName = '',
			character = '',
			rateup = [],
			images = {},
			hostedImages = {},
			vision = 'pyro',
			charTitle = '',
			artPosition = {},
			watermark = '',
			status = null
		} = data;

		const dataIMG = status === 'owned' ? images : imageCDN(hostedImages);
		customData.set({ ...data, name: character, images: dataIMG });
		bannerList.set([
			{
				type: 'character-event',
				bannerName,
				character,
				rateup,
				images: dataIMG,
				vision,
				charTitle,
				artPosition,
				watermark
			}
		]);

		activeVersion.set({ patch: 'Custom', phase: bannerID });
		activeBanner.set(0);
		editorMode.set(false);
		isCustomBanner.set(true);
		localConfig.set('version', `Custom-${bannerID}`);
		return { status: 'ok' };
	} catch (e) {
		console.error(e);
		return { status: 'error' };
	}
};

const checkBeginnerBanner = () => {
	// const starterRollCount = rollCounter.get('beginner');
	// const isShowBeginner = starterRollCount < 20;
	const isShowBeginner = false;
	showBeginner.set(isShowBeginner);
	return isShowBeginner;
};

export const initializeBanner = async ({ patch, phase }) => {
	try {
		if (!patch || !phase) return;
		if (patch.match(/(local|custom)/gi)) return useCustomBanner(phase);

		const list = checkBeginnerBanner() ? [{ type: 'beginner', ...beginner.featured }] : [];

		const { data } = await import(`$lib/data/banners/events/${patch}.json`);
		const { banners } = data.find((b) => b.phase === phase);
		const { events, weapons, standardVersion: stdver } = banners;
		const { featured: stdFeatured } = standard.find(({ version }) => stdver === version) || {};
		const { featured: memFeatured } = member.find(({ version }) => stdver === version) || {};
		const charEventBanner = {
			type: 'character-event',
			rateup: events.rateup,
			stdver
		};

		list.push({ type: 'member', stdver, ...memFeatured});

		events.featured.forEach((eventdata) => list.push({ ...eventdata, ...charEventBanner }));
		list.push({ type: 'weapon-event', stdver, ...weapons });
		list.push({ type: 'standard', stdver, ...stdFeatured });

		bannerList.set(list);
		isFatepointSystem.set(!!weapons.fatepointsystem);

		activeVersion.set({ patch, phase });
		activeBanner.set(0);
		localConfig.set('version', `${patch}-${phase}`);

		customData.set({});
		isCustomBanner.set(false);
		return { status: 'ok' };
	} catch (e) {
		console.error(e);
		return { status: 'error', e };
	}
};

export const handleShowStarter = (isShow) => {
	if (!isShow) {
		return bannerList.update((bn) => {
			return bn.filter(({ type }) => type !== 'beginner');
		});
	}
	return bannerList.update((bn) => {
		bn.unshift({ type: 'beginner', ...beginner.featured });
		return bn;
	});
};
