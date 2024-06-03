const getBannerName = (banner) => {
	const split = banner.split('-');
	return { name: split.slice(0, -1).join('-'), number: split[split.length - 1] };
};

const getName = (name) => {
	if (!name) return name;
	const removedDelimiter = name.replace(/-/g, ' ').replace(new RegExp('_'), "'");
	return removedDelimiter
		.split(' ')
		.map((t) => t.charAt(0).toUpperCase() + t.slice(1))
		.join(' ');
};

const getSlug = (name) => name.replace(/ /g, '-').replace(new RegExp("'"), '_');

const copy = (text) => {
	if (navigator.clipboard) {
		navigator.clipboard.writeText(text);
		return;
	}
	const textArea = document.createElement('textarea');
	textArea.setAttribute('style', 'position: fixed; top: -200%');
	textArea.value = text;
	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();
	return new Promise((res, rej) => {
		document.execCommand('copy') ? res() : rej();
		textArea.remove();
	});
};

export const randomLetter = (length) => {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < length) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
		counter += 1;
	}
	return result;
};

const highLightMethod2 = (name, vision) => {
	const splited = name.replaceAll(/(#)/gi, '').trim().split(' ');
	const wordCount = splited.length - 1;
	if (wordCount < 1) return `<span class="${vision}-flat" block>${name}</span>`;

	const modulo = wordCount % 2;
	const halfOfTextIndex = (wordCount - modulo) / 2;
	const frontText = splited.filter((w, i) => i <= halfOfTextIndex).join(' ');
	const endText = splited.filter((w, i) => i > halfOfTextIndex).join(' ');

	return `<span class="${vision}-flat" block>${frontText}</span> ${endText}`;
};

export const highlightBannerName = (name, vision) => {
	const method1 = name.trim().split('#');
	if (method1.length !== 3) return highLightMethod2(name, vision);
	const [front, colored, back] = method1;
	return `${front}<span class="${vision}-flat" style="display: inline">${colored}</span>${back}`;
};

export { getName, getSlug, copy, getBannerName };
