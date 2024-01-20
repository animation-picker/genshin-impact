export { matchers } from './client-matchers.js';

export const nodes = [() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10')];

export const server_loads = [];

export const dictionary = {
	"/": [2],
	"/adkey": [3],
	"/bnlist": [4],
	"/install": [5],
	"/privacy-policy": [6],
	"/screen": [7],
	"/screen/chars": [8],
	"/screen/wishitem": [9],
	"/screen/wishlist": [10]
};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};