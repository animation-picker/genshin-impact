import { currencies } from '$lib/data/pricelist.json';
import { pricelist } from '$lib/store/app-stores';
import { cookie } from './dataAPI/api-cookie';
import { checkLocale } from './i18n';

export const availableCurrencies = currencies.map(({ symbol, currency }) => ({ symbol, currency }));
export const formatNumber = (n) => n.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const userCurrencies = {
	init(currency = null) {
		const { symbol, list, format } = this.checkUsedCurrency(currency);
		this._symbol = symbol;
		this._list = list;
		this._format = format;
		const { welkin, genesis } = list;
		const prices = { genesis: {} };

		prices.welkin = this.formatPrice(welkin);
		Object.keys(genesis).forEach((key) => {
			prices.genesis[key] = this.formatPrice(genesis[key]);
		});
		pricelist.set(prices);
	},

	checkUsedCurrency(curr) {
		const used = curr || cookie.get('currency') || checkLocale();
		const filtered = currencies.find(({ country, currency }) => {
			const isCurrDetected = used === currency;
			const isCountryAvailable = country.find((v) => used.toLocaleLowerCase().includes(v));
			const isUsed = isCurrDetected || (used.length < 6 && isCountryAvailable);
			return isUsed;
		});
		return filtered || currencies.find(({ currency }) => currency === 'USD');
	},

	formatPrice(price) {
		const decimal = price.toFixed(2).toString();
		const formated = formatNumber(decimal);
		return this._format.replace('{symbol}', this._symbol).replace('{nominal}', formated);
	},

	getTotalSpend(totalPull) {
		const pricePerUnit = this._list.genesis['60'] / 60;
		const pullPrice = totalPull * 160 * pricePerUnit;
		return this.formatPrice(pullPrice);
	}
};
