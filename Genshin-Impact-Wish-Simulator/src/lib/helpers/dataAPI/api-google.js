import { API_HOST, GOOGLE_API_KEY, GOOGLE_CLIENT_ID } from '$lib/env';
import { cookie } from './api-cookie';
import { isSignedIn, userEmail } from '$lib/store/drive-store';

let gapi = {};
let google = {};
let gsiToken = {};

let TOKEN = '';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/drive.appdata';

// export const GAPI = {
// 	async _initClient() {
// 		await gapi.client.init({
// 			apiKey: GOOGLE_API_KEY,
// 			discoveryDocs: DISCOVERY_DOCS
// 		});

// 		const gapiToken = gapi.client.getToken();
// 		console.log({ gapiToken });
// 		if (gapiToken === null) return;
// 		return gsiToken.requestAccessToken({ prompt: '' });
// 	},

// 	async _getToken(err) {
// 		// Errors unrelated to authorization: server errors, exceeding quota, bad requests, and so on.
// 		const { code, status } = err.result.error;
// 		const isError = code === 401 || (code === 403 && status == 'PERMISSION_DENIED');
// 		if (isError) throw new Error(err);

// 		// The access token is missing, invalid, or expired, prompt for user consent to obtain one.
// 		await new Promise((resolve, reject) => {
// 			try {
// 				// Settle this promise in the response callback for requestAccessToken()
// 				gsiToken.callback = (response) => {
// 					if (response.error !== undefined) return reject(response);
// 					console.log('gapi.client access token: ' + JSON.stringify(gapi.client.getToken()));
// 					resolve(response);
// 				};
// 				gsiToken.requestAccessToken();
// 			} catch (err) {
// 				console.log(err);
// 			}
// 		});
// 	},

// 	async fileHandle(response) {
// 		if (response.error !== undefined) throw response;
// 		console.log('rrr', response);
// 		GAPI._getFile();
// 	},

// 	async _getFile() {
// 		try {
// 			const { result = {} } = await gapi.client.drive.files.list({
// 				spaces: 'appDataFolder',
// 				q: "name = 'Genshin-WishSimulatorApp.json'"
// 			});

// 			const { files } = result;
// 			if (!files || files.length == 0) {
// 				console.log('no Files');
// 				return;
// 			}
// 		} catch (err) {
// 			console.error(err);
// 		}
// 	},

// 	scriptLoaded() {
// 		gapi = window.gapi;
// 		gapi.load('client', GAPI._initClient);
// 	},

// 	scriptError() {
// 		console.log('error');
// 	}
// };

const GSI = {
	scriptLoaded() {
		google = window.google;
		gsiToken = google.accounts.oauth2.initCodeClient({
			client_id: GOOGLE_CLIENT_ID,
			scope: SCOPES,
			ux_mode: 'popup',
			callback: GSI._getToken
		});

		GSI._refreshToken();
	},

	async _getToken(response) {
		try {
			if (response.error !== undefined) return;

			const { code } = response;
			const tokenData = await fetch(API_HOST + '/auth/signin', {
				method: 'POST',
				body: JSON.stringify({ code })
			});

			const { access_token, refresh_token, userData } = await tokenData.json();
			cookie.set('rToken', refresh_token);
			TOKEN = access_token;

			isSignedIn.set(true);
			userEmail.set(userData.email);
		} catch (e) {
			console.error(e);
		}
	},

	async _refreshToken() {
		try {
			const refresh_token = cookie.get('rToken');
			if (!refresh_token) return;

			const tokenData = await fetch(API_HOST + '/auth/refresh', {
				method: 'POST',
				body: JSON.stringify({ refresh_token })
			});
			const { access_token, userData } = await tokenData.json();
			TOKEN = access_token;

			isSignedIn.set(true);
			userEmail.set(userData.email);
		} catch (e) {
			console.error(e);
		}
	}
};

export const DRIVEAPI = {
	sync() {
		//
	}
};

export const signIn = () => {
	gsiToken.requestCode({ prompt: 'consent' });
	return;
};

export const signOut = async () => {
	try {
		const token = cookie.get('rToken');
		if (token === null) return;

		await google.accounts.oauth2.revoke(token);
		cookie.remove('rToken');
		isSignedIn.set(false);
		userEmail.set('');
	} catch (e) {
		console.error(e);
	}
};

export const initializeDriveAPI = () => {
	const { scriptLoaded: gsiLoaded } = GSI;
	const gsiScript = document.createElement('script');
	gsiScript.src = 'https://accounts.google.com/gsi/client';
	gsiScript.onload = gsiLoaded;
	// gsiScript.onerror = gapiError;
	document.head.appendChild(gsiScript);

	// const { scriptError: gapiError, scriptLoaded: gapiLoaded } = GAPI;
	// const gapiScript = document.createElement('script');
	// gapiScript.src = 'https://apis.google.com/js/api.js';
	// gapiScript.onload = gapiLoaded;
	// gapiScript.onerror = gapiError;
	// document.head.appendChild(gapiScript);
};

