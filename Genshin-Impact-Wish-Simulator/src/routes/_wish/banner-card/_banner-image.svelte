<script>
	import { getContext } from 'svelte';
	import BannerArt from '../../_custom-banner/BannerEditor/BannerArt.svelte';
	import { assets } from '$lib/store/app-stores';

	export let src = '';
	export let alt = '';
	export let wrapperClass = '';
	export let isError = false;

	export let custom = false;
	export let vision = '';
	export let artPosition = {};

	const imageError = getContext('imageError');
</script>

<div
	class:image-error={isError}
	class="wrapper {wrapperClass}"
	style="min-height: 100px; width: 100%;"
>
	{#if !isError}
		{#if custom}
			<img
				src={$assets[`blank/${vision}`]}
				alt="background banner"
				crossorigin="anonymous"
				class="art-bg"
			/>
			{#key artPosition}
				<BannerArt artURL={src} bannerPosition={artPosition?.banner} />
			{/key}
		{:else}
			<div style="position: relative; width: 100%;">
				<div style="position: relative; overflow: hidden;">
					<picture>
						<img {src} {alt} on:error={imageError} crossorigin="anonymous" />
					</picture>
				</div>
			</div>
		{/if}
	{/if}
</div>

<style>
	picture,
	img {
		width: 100%;
		display: block;
	}
	.art-bg {
		position: absolute;
		bottom: 0;
		left: 0;
	}

	.image-error {
		background-image: linear-gradient(to top, #eee8e3 50%, #f7f5f4);
	}
</style>
