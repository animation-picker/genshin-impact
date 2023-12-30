<script>
	import { getContext } from 'svelte';

	export let src = '';
	export let alt = '';
	export let wrapperClass = '';
	export let isError = false;

	const imageError = getContext('imageError');
</script>

<div
	class:image-error={isError}
	class="wrapper {wrapperClass}"
	style="min-height: 100px; width: 100%;"
>
	{#if !isError}
		<div style="position: relative; width: 100%;">
			<div style="position: relative; overflow: hidden;">
				<picture>
					<img {src} {alt} on:error={imageError} crossorigin="anonymous" />
				</picture>
			</div>
		</div>
	{/if}
</div>

<style>
	picture,
	img {
		width: 100%;
		display: block;
	}

	.image-error {
		background-image: linear-gradient(to top, #eee8e3 50%, #f7f5f4);
	}
</style>
