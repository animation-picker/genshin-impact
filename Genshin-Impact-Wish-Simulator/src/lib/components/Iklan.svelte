<script>
	import { dev } from '$app/environment';
	import { getContext, onMount } from 'svelte';
	import { isMobile } from '$lib/store/app-stores';
	import { randomLetter } from '$lib/helpers/nameText';

	export let type = '';
	export let head = false;

	const showAd = getContext('showAd');

	// onMount(() => {
	// 	if (type !== 'banner') return;
	// 	(window.adsbygoogle = window.adsbygoogle || []).push({});
	// 	return;
	// });
	const kadamAdId = randomLetter(6);

	onMount(() => {
		return;

		if (!$showAd) return;
		if (head) {
			window.k_init = window.k_init || [];
		}

		if (type === 'banner') {
			const obj = {
				id: `${kadamAdId}342003`,
				type: 'bn',
				domain: 'hdbkome.com',
				refresh: false,
				next: 0
			};
			window.k_init.push(obj);
		}

		if (type === 'pop') {
			const obj = {
				id: `${kadamAdId}342006`,
				type: 'cu',
				domain: 'hdbkell.com',
				next: 1,
				rerun: true,
				newtab: 1
			};
			window.k_init.push(obj);
		}
	});
</script>
