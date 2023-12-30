<script>
	import { assets } from '$lib/store/app-stores';

	export let type = '';
	export let width = '20px';
	export let height = 'auto';
	export let style = '';

	$: pic = {
		acquaint: $assets['acquaint-fate.webp'],
		intertwined: $assets['intertwined-fate.webp'],
		stardust: $assets['masterless-stardust.webp'],
		starglitter: $assets['masterless-starglitter.webp'],
		primogem: $assets['primogem.webp'],
		genesis: $assets['genesis.webp']
	};
</script>

{#if type !== 'loader'}
	<img src={pic[type]} alt={type} {width} {height} {style} />
{:else}
	<div class="loader-icon" style="--width:{width};width: {width};">
		<span />
	</div>
{/if}

<style>
	.loader-icon {
		position: relative;
		aspect-ratio: 1/1;
	}
	span {
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	span::before,
	span::after {
		content: '';
		display: block;
		position: absolute;
		left: 0;
		top: 0;
		margin: auto;
		width: 100%;
		height: 100%;
		border: calc(0.15 * var(--width)) solid var(--text-color);
		border-radius: 50%;
		opacity: 0.5;
	}
	span::before {
		animation: loaderAnim1 1.5s cubic-bezier(0.075, 0.82, 0.165, 1) infinite;
	}

	span::after {
		animation: loaderAnim2 1.5s cubic-bezier(0.075, 0.82, 0.165, 1) 0.25s infinite;
	}

	@keyframes loaderAnim1 {
		0% {
			transform: scale(0);
			opacity: 1;
		}
		20% {
			opacity: 1;
		}
		100% {
			transform: scale(1.5);
			opacity: 0;
		}
	}

	@keyframes loaderAnim2 {
		0% {
			transform: scale(0);
			opacity: 1;
		}
		20% {
			opacity: 1;
		}
		100% {
			transform: scale(1);
			opacity: 0;
		}
	}
</style>
