<script>
	import { onDestroy } from 'svelte';
	import { assets } from '$lib/store/app-stores';
	import { morphIn, morphOut } from '$lib/helpers/transition';

	const bg = ['dendro', 'anemo', 'cryo', 'hydro', 'electro', 'pyro', 'geo'];
	let activeBgIndex = Math.floor(Math.random() * bg.length);

	const t = setInterval(() => {
		const backToStart = activeBgIndex === bg.length - 1;
		activeBgIndex = backToStart ? 0 : activeBgIndex + 1;
	}, 6500);

	onDestroy(() => clearInterval(t));
</script>

{#each bg as b, i}
	{#if activeBgIndex === i}
		<img
			src={$assets[`element-${b}-bg.webp`]}
			alt="Background"
			class="bg"
			crossorigin="anonymous"
			in:morphIn={{ key: 'morph' }}
			out:morphOut={{ key: 'morph' }}
		/>
	{/if}
{/each}

<style>
	img.bg {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
