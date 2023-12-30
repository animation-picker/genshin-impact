let screenLock;

const wakelockHandle = async ({ release = false } = {}) => {
	try {
		if (!release) {
			screenLock = await navigator.wakeLock.request('screen');
			return;
		}

		await screenLock.release();
		screenLock = null;
	} catch (e) {
		// console.log('error');
	}
};

export const wakeLock = () => {
	const isWakeLockSupport = 'wakeLock' in navigator;
	if (!isWakeLockSupport) return;

	wakelockHandle();
	window.addEventListener('focus', () => wakelockHandle());
	window.addEventListener('blur', () => wakelockHandle({ release: true }));
};
