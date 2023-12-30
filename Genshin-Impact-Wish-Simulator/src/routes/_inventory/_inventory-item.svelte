<script>
	import { getContext } from 'svelte';
	import { assets } from '$lib/store/app-stores';
	import { lazyLoad } from '$lib/helpers/lazyload';

	export let rarity = 3;
	export let type = 'character';
	export let name = '';
	export let localName = '';
	export let vision = '';
	export let weaponType = '';
	export let qty = 0;
	export let isOwned = true;
	export let useOutfit = false;
	export let outfitName = '';

	let countInfo = `R${qty > 5 ? `5 + ${qty - 5}` : qty}`;
	if (type === 'character') {
		countInfo = `C${qty > 7 ? `6 + ${qty - 7}` : qty - 1}`;
	}

	const showDetail = getContext('showDetail');
	const handleShowDetails = () => {
		if (!showDetail) return;
		if (!isOwned) return;
		showDetail({ name, useOutfit, outfitName });
	};
</script>

<div class="content" class:owned={isOwned} on:mousedown={handleShowDetails}>
	{#if !isOwned}
		<div class="overlay" />
	{/if}
	<picture
		class="star{rarity} {type}"
		style="background-image:url('{$assets[`${rarity}star-bg.webp`]}');"
	>
		{#if type === 'character'}
			{#key outfitName}
				<img
					use:lazyLoad={$assets[`face/${useOutfit ? outfitName : name}`]}
					alt={localName}
					crossorigin="anonymous"
				/>
			{/key}
			<span class="gi-{vision} {vision} icon-gradient element" />
		{:else}
			<img
				use:lazyLoad={$assets[name]}
				alt={localName}
				class={weaponType}
				crossorigin="anonymous"
			/>
		{/if}
		{#if qty > 1}
			<span class="qty"> {countInfo} </span>
		{/if}
	</picture>
	<div class="caption">
		<div class="star">
			{#each Array(rarity) as _}
				<i class="gi-star" />
			{/each}
		</div>
		<span>
			{localName}
		</span>
	</div>
</div>

<style>
	.content {
		border-radius: calc(3.5 / 100 * var(--item-width));
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		text-align: center;
		background-color: #fff;
		color: #3a4156;
		position: relative;
	}

	.content.owned::after {
		content: '';
		position: absolute;
		z-index: -1;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		height: 100%;
		border-radius: calc(5 / 100 * var(--item-width));
		border: 0.3rem solid #eac343;
		opacity: 0;
		transition: opacity 0.15s;
	}
	.content.owned:hover::after {
		opacity: 1;
	}

	.overlay {
		top: 0;
		left: 0;
		position: absolute;
		z-index: +1;
		width: 100%;
		height: 100%;
		background-color: #000;
		opacity: 0.5;
		border-radius: calc(3.5 / 100 * var(--item-width));
	}

	picture {
		width: 100%;
		aspect-ratio: 1/1;
		display: flex;
		justify-content: center;
		background-size: cover;
		position: relative;
		overflow: hidden;
		border-top-left-radius: calc(3.5 / 100 * var(--item-width));
		border-top-right-radius: calc(3.5 / 100 * var(--item-width));
		border-bottom-right-radius: calc(20 / 100 * var(--item-width));
	}
	picture.weapon {
		justify-content: flex-end;
		align-items: flex-start;
	}

	picture.character img {
		height: 100%;
	}
	picture.weapon img {
		width: 100%;
	}

	picture span {
		position: absolute;
		top: 0;
	}
	.element {
		left: 0;
		font-size: 2rem;
	}
	.qty {
		right: 0;
		background-color: #a36b5e;
		border-bottom-left-radius: 0.5rem;
		font-size: 0.9rem;
		padding: 0.1rem 0.3rem;
		color: #f0c882;
	}

	.star {
		position: absolute;
		left: 50%;
		top: calc(-8 / 100 * var(--item-width));
		transform: translateX(-50%);
	}

	.gi-star {
		color: #eac343;
		font-size: calc(15 / 100 * var(--item-width));
	}

	.caption {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		padding: calc(4 / 100 * var(--item-width));
		position: relative;
		font-size: calc(9 / 100 * var(--item-width));
	}
	.caption span {
		display: block;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-transform: capitalize;
	}

	img.claymore {
		transform: rotate(18deg) scale(1.15) translateX(-1.5em);
	}

	img.bow {
		transform: rotate(10deg) scale(1.25) translateX(-0.5em);
	}

	img.polearm {
		transform: rotate(10deg) scale(1.5) translate(-12%, 12%);
	}

	img.sword {
		transform: rotate(10deg) scale(1.2) translateY(-1em) translateX(-0.7em);
	}
</style>
