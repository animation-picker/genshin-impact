import { browser } from '$app/environment';
import { init, register, getLocaleFromNavigator } from 'svelte-i18n';
import { localConfig } from './dataAPI/api-localstore';

const supportedLocales = [
	'zh-CN',
	'zh-TW',
	'de-DE',
	'en-US',
	'fr-FR',
	'id-ID',
	'it-IT',
	'ja-JP',
	'pt-BR',
	'ru-RU',
	'th-TH',
	'vi-VN'
];
const itemLocales = ['zh-CN', 'zh-TW', 'en-US', 'it-IT', 'ja-JP', 'pt-BR', 'ru-RU', 'vi-VN'];

const checkLocale = () => {
	const savedLocale = browser ? localConfig.get('locale') : null;
	const browserLocale = savedLocale || getLocaleFromNavigator();
	const usedLocale = supportedLocales.find((langID) => langID.includes(browserLocale));
	return usedLocale || 'en-US';
};

const mountLocale = () => {
	supportedLocales.forEach((langID) => {
		register(langID, () => import(`../../locales/${langID}.json`));
	});

	itemLocales.forEach((langID) => {
		register(langID, () => import(`../../locales/items/${langID}.json`));
	});

	const usedLocale = checkLocale();
	init({
		fallbackLocale: 'en-US',
		initialLocale: usedLocale
	});
};

export { mountLocale, checkLocale };
