import { beginner } from '$lib/data/banners/beginner.json';
import { bannerList, isFatepointSystem, showBeginner } from '$lib/store/app-stores';
import { rollCounter } from '$lib/store/localstore-manager';

const checkBeginnerBanner = () => {
	const starterRollCount = rollCounter.get('beginner');
	const isShowBeginner = starterRollCount < 20;
	showBeginner.set(isShowBeginner);
	return isShowBeginner;
};

export const initializeBanner = async ({ patch, phase }) => {
	try {
		if (!patch || !phase) return;
		const list = checkBeginnerBanner() ? [{ type: 'beginner', ...beginner.featured }] : [];

		const { data } = await import(`$lib/data/banners/events/${patch}.json`);
		const { banners } = data.find((b) => b.phase === phase);
		const { events, weapons, standardVersion: stdver } = banners;
		const { standard } = await import(`$lib/data/banners/standard/${stdver}.json`);

		const charEventBanner = {
			type: 'character-event',
			rateup: events.rateup,
			stdver
		};
		events.featured.forEach((eventdata) => list.push({ ...eventdata, ...charEventBanner }));
		list.push({ type: 'weapon-event', stdver, ...weapons });
		list.push({ type: 'standard', stdver, ...standard.featured });

		bannerList.set(list);
		isFatepointSystem.set(!!weapons.fatepointsystem);
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

