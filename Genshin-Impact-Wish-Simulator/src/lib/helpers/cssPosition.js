export const positionToStyle = (position) => {
	if (!position) return '';
	const cssProps = ['width', 'height', 'top', 'bottom', 'left', 'right'];
	const keyToChange = ['w', 'h', 't', 'b', 'l', 'r'];
	const style = Object.keys(position).map((key) => {
		const index = keyToChange.findIndex((v) => v === key);
		const css = key.replace(key, cssProps[index]);
		return `${css}:${position[key]}%`;
	});
	return style.join(';');
};

const getPropVal = (el, key) => {
	const prop = getComputedStyle(el).getPropertyValue(key);
	const num = prop.split('px')[0] || 0;
	return parseFloat(num);
};

export const getPercentagePosition = (zoomistImage, h = 0, w = 0) => {
	// Get Image Position in Percentage
	const xPx = getPropVal(zoomistImage, '--translate-x');
	const yPx = getPropVal(zoomistImage, '--translate-y');
	const scale = getPropVal(zoomistImage, '--scale');
	const x = (xPx / w) * 100;
	const y = (yPx / h) * 100;
	return { x, y, scale };
};

export const getPxPosition = ({ x, y } = {}, h = 0, w = 0) => {
	// get PX value from PERCENTAGE
	const X = !x ? null : (x / 100) * w;
	const Y = !y ? null : (y / 100) * h;
	return { x: X, y: Y };
};

export const getCssVarPosition = ({ x, y, scale } = {}, h = 0, w = 0) => {
	// get PX value from PERCENTAGE
	const X = !x ? '' : (x / 100) * w;
	const Y = !y ? '' : (y / 100) * h;

	// Set CSS Variable
	const varX = !X ? '' : `--translate-x:${X}px;`;
	const varY = !Y ? '' : `--translate-y:${Y}px;`;
	const varScale = !scale ? '' : `--scale:${scale};`;
	return `${varX}${varY}${varScale}`;
};
