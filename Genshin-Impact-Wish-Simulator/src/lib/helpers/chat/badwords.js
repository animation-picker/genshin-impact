import { wordlist } from './badword-list';

const Badwords = {
	_filterWord(badword, stringToFilter) {
		const wordExp = new RegExp(`\\b${badword.replace(/(\W)/g, '\\$1')}\\b`, 'gi');
		return wordExp.test(stringToFilter);
	},
	_isProfane(stringToFilter) {
		const check = wordlist.filter((word) => this._filterWord(word, stringToFilter));
		return check.length > 0 || false;
	},
	_replaceWord(string) {
		const sensored = string.replace(/\w/g, '*');
		return sensored;
	},

	hasBadword(string) {
		return this._isProfane(string);
	},

	clean(string) {
		const stringArray = string.split(/\b/);
		const replaced = stringArray.map((word) => {
			return this._isProfane(word) ? this._replaceWord(word) : word;
		});
		const delimiter = /\b/.exec(string) ? /\b/.exec(string)[0] : '';
		const filteredWord = replaced.join(delimiter);
		return filteredWord;
	}
};

export default Badwords;

