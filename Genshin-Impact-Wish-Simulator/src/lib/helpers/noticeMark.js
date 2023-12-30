import { cookie } from '$lib/store/cookie';
import { notice } from '$lib/store/app-stores';

const getNotices = () => cookie.get('notice') || [];
const setNotices = (data = []) => cookie.set('notice', data);

export const noticeMark = {
	openNotice(key) {
		const openedNotice = getNotices();
		const isAlreadyOpen = openedNotice.includes(key);
		if (isAlreadyOpen) return;
		openedNotice.push(key);
		setNotices(openedNotice);
		notice.set(openedNotice);
		return;
	},

	onLoadCheck() {
		const openedNotice = getNotices();
		notice.set(openedNotice);
	}
};
