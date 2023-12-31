import { proUser, showAd } from '$lib/store/app-stores';
import { cookie } from './dataAPI/api-cookie';

const digestMessage = async (message) => {
	const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
	const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8); // hash the message
	const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
	const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
	return hashHex;
};

const fetchKey = async () => {
	const date = new Date().toISOString();
	const data = await fetch(
		`https://gist.githubusercontent.com/AguzzTN54/3816708e01827a5c64f4903242ede7b0/raw?date=${date}`
	);
	const { hash, previousKey } = await data.json();
	return { baseKey: hash, previousKey };
};

const checkKey = async (key) => {
	const { baseKey, previousKey } = await fetchKey();
	const inputKey = await digestMessage(key?.trim());
	const isKeyValid = baseKey === inputKey;
	const expiryDate = isKeyValid ? 'none' : previousKey[inputKey] || null;
	return { isKeyValid, expiryDate };
};

const adKey = {
	_set(key) {
		const reversed = key.trim().split('').reverse().join('');
		cookie.set('accessKey', reversed);
	},

	clear() {
		return cookie.set('accessKey', null);
	},

	async initialLoad() {
		const storedKey = cookie.get('accessKey');
		const reversedKey = storedKey?.split('').reverse().join('');
		try {
			if (!storedKey) return { validity: false, storedKey: reversedKey, status: 'ok' };
			const { isKeyValid, expiryDate } = await checkKey(reversedKey);
			return { validity: isKeyValid, expiryDate, storedKey: reversedKey, status: 'ok' };
		} catch (e) {
			return { validity: false, storedKey: reversedKey, status: 'offline' };
		}
	},

	async verify(key) {
		try {
			const { isKeyValid, expiryDate } = await checkKey(key);
			if (isKeyValid) this._set(key);
			const isExpired = expiryDate && expiryDate !== 'none';
			const invalidMsg = isExpired ? 'menu.keyExpired1' : 'menu.invalidKey';
			const msg = isKeyValid ? 'success' : invalidMsg;
			return { validity: isKeyValid, msg };
		} catch (e) {
			return { validity: false, msg: 'connectionFailed' };
		}
	}
};

const retry = () => {
	console.log('reconecting...');
	const timer = setTimeout(() => {
		clearTimeout(timer);
		verifyKey();
	}, 10000);
};

const verifyKey = async () => {
	const { validity, status } = await adKey.initialLoad();
	if (status === 'offline') return retry();
	proUser.set(!!validity);
	showAd.set(!validity);
};

export { adKey, verifyKey };
