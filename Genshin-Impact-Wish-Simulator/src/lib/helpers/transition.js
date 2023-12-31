import { crossfade } from 'svelte/transition';
import { cubicOut } from 'svelte/easing';

export const [morphOut, morphIn] = crossfade({
	duration: 6400,
	easing: cubicOut
});

export const removeAnimClass = (el) => {
	el.addEventListener('animationend', () => {
		el.classList.remove('animate');
		el.classList.remove('anim');
	});
};

