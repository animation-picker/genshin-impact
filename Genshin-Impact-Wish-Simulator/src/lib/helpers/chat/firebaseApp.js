import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { getDatabase } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import { cookie } from '$lib/helpers/dataAPI/api-cookie';
import {
	API_KEY,
	AUTH_DOMAIN,
	BUCKET,
	MSG_SENDER_ID,
	DATABASE_URL,
	RECAPTCHA_PUBLIC_KEY
} from '$lib/env';

const config = {
	apiKey: API_KEY,
	authDomain: AUTH_DOMAIN,
	databaseURL: DATABASE_URL,
	storageBucket: BUCKET,
	messagingSenderId: MSG_SENDER_ID
};

const app = initializeApp(config);
const db = getDatabase(app);

initializeAppCheck(app, {
	provider: new ReCaptchaV3Provider(RECAPTCHA_PUBLIC_KEY),
	isTokenAutoRefreshEnabled: true
});

const setCookieUuid = () => {
	const uuid = uuidv4().split('-')[0];
	const travelerID = `Traveler_${uuid}`;
	cookie.set('travelerID', travelerID);
	return travelerID;
};

const getCredential = async () => {
	const currentUuid = cookie.get('travelerID');
	if (currentUuid) return currentUuid;
	return setCookieUuid();
};

export { getCredential, db };

