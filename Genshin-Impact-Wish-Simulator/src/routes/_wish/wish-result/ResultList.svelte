<script>
	import { onMount } from 'svelte';
	import { t } from 'svelte-i18n';
	import OverlayScrollbars from 'overlayscrollbars';
	import { removeAnimClass } from '$lib/helpers/transition';
	import { playSfx } from '$lib/helpers/audio/audio';
	import ResultListItem from './_result-list-item.svelte';

	export let standalone = false;
	export let list = [];
	let clientHeight;
	let clientWidth;
	let container;

	const sortByType = (a, b) => {
		if (a.type > b.type) return 1;
		if (b.type > a.type) return -1;
		return 0;
	};

	const sortByName = (a, b) => {
		if (a.name > b.name) return 1;
		if (a.name < b.name) return -1;
		return 0;
	};

	let sortedWish = [];
	const sortList = (list) => {
		const item = (star) =>
			list
				.filter(({ rarity }) => rarity === star)
				.sort(sortByName)
				.sort((a, b) => b.isNew - a.isNew)
				.sort(sortByType);
		const threeStar = list.filter(({ rarity }) => rarity === 3);
		sortedWish = [...item(5), ...item(4), ...threeStar];
	};

	$: sortList(list);

	onMount(async () => {
		clientWidth = (clientHeight * 7) / 30;

		OverlayScrollbars(container, {
			sizeAutoCapable: false,
			className: 'os-theme-light',
			scrollbars: { visibility: 'auto', autoHide: 'leave' }
		});
		if (standalone) return;
		playSfx('resultList');
	});
</script>

<svg viewBox="0 0 151.000000 656.000000" height="0" width="0" style="position: absolute;">
	<clipPath
		id="wishframe"
		transform="scale(0.00066225165562914 0.00015455950540958)"
		clipPathUnits="objectBoundingBox"
	>
		<path
			d="M734 6419 c-25 -29 -100 -76 -199 -127 -125 -64 -165 -117 -165 -217
			0 -22 -3 -50 -6 -63 -9 -33 -83 -72 -155 -82 -68 -10 -79 -19 -79 -67 0 -24
			-7 -37 -32 -54 -18 -12 -43 -34 -55 -48 l-22 -26 -1 -2502 c0 -1542 4 -2503 9
			-2503 5 0 13 -9 16 -20 4 -11 23 -28 43 -38 32 -15 37 -22 40 -57 4 -49 23
			-65 76 -65 47 0 113 -28 140 -58 12 -14 21 -45 26 -90 13 -117 54 -164 215
			-250 55 -28 114 -66 132 -82 18 -17 35 -30 39 -30 4 0 23 15 44 34 21 19 80
			56 131 82 153 79 197 131 210 252 4 39 13 70 25 84 27 30 93 58 140 58 53 0
			72 16 76 65 3 35 8 42 40 57 20 10 39 27 43 38 3 11 11 20 16 20 5 0 9 961 9
			2503 l-1 2502 -22 26 c-12 14 -37 36 -54 48 -26 17 -33 30 -33 54 0 48 -11 57
			-79 67 -72 10 -146 49 -155 82 -3 13 -6 41 -6 63 0 100 -40 153 -165 217 -106
			54 -153 84 -191 119 l-30 29 -20 -21z"
		/>
	</clipPath>
</svg>

<div class="scroll" bind:this={container}>
	<div class="container animate" use:removeAnimClass>
		<div class="wishlist" bind:clientHeight style="--card-height: {clientHeight}px">
			{#each sortedWish as data, i}
				<div
					class="item-box"
					class:animate={!standalone}
					style="animation-delay: {0.5 + i * 0.1}s"
					use:removeAnimClass
				>
					<ResultListItem {data} index={i} {clientHeight} {clientWidth} />
				</div>
			{/each}
		</div>
		<div class="shadows" style="--card-height: {clientHeight}px">
			{#each sortedWish as { rarity, type, isNew }, i}
				<div
					class="shadow shadow{rarity}"
					class:animate={!standalone}
					style="animation-delay: {0.5 + i * 0.1}s"
					use:removeAnimClass
				>
					{#if type === 'character' && !isNew}
						<span class="convertion"> {$t('wish.result.convertion')} </span>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.scroll {
		width: 100%;
		height: 100%;
		display: block;
	}
	.container {
		width: 100% !important;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.container.animate::after {
		content: '';
		display: block;
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: #fff;
		opacity: 1;
		animation: reveal forwards 1s 1;
		pointer-events: none;
	}

	.close {
		position: fixed;
		top: 15px;
		right: 3%;
		z-index: 10;
		opacity: 0;
	}

	:global(.mobile) .close {
		top: 0.3rem;
		right: 6%;
	}

	/* Wish List */
	.wishlist,
	.shadows {
		display: block;
		height: 40vw;
		max-height: 60vh;
		min-height: 40vh;
		width: 100%;
		padding: 0 20px;
		white-space: nowrap;
		text-align: center;
	}

	.item-box.animate,
	.shadow.animate {
		opacity: 0;
		animation: wishReveal forwards 0.4s 1;
		pointer-events: none;
	}

	:global(.mobile) .wishlist,
	:global(.mobile) .shadows {
		min-height: 70vh;
	}

	:global(.mobile) .wishlist,
	:global(.mobile) .shadows {
		max-height: 72.5vh;
	}

	.item-box :global(.item),
	.shadow {
		height: 100%;
		aspect-ratio: 7/30;
		border-radius: 100%;
		filter: drop-shadow(0px 0px 6px rgb(101, 187, 246));
		position: relative;
	}

	.shadow5,
	.shadow4,
	.item-box :global(.item.star4),
	.item-box :global(.item.star5) {
		filter: unset;
	}

	.item-box {
		height: 100%;
		display: inline-block;
	}

	.shadows {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: -1;
	}

	.shadow {
		display: inline-block;
		height: 100%;
		border-radius: 100%;
	}
	.shadow span {
		position: absolute;
		left: 50%;
		bottom: -5%;
		color: #fff;
		transform: translateX(-50%);
		-webkit-text-stroke: 0.3px #000;
	}

	.shadow.shadow5 {
		box-shadow: 0 0 4rem rgba(255, 255, 255, 0.5), 0 0 1rem rgb(249, 170, 2),
			0 0 1.4rem rgb(249, 170, 2), 0 0 2rem rgb(249, 121, 2);
		background-color: rgb(249, 170, 2);
		filter: unset;
	}

	.shadow.shadow4 {
		box-shadow: 0 0 4rem rgba(255, 255, 255, 0.6), 0 0 1rem rgb(138, 3, 161),
			0 0 1.4rem rgb(217, 0, 255), 0 0 2rem rgb(29, 4, 255);
		background-color: rgb(185, 18, 214);
	}

	.convertion {
		font-size: calc(3 / 100 * var(--card-height));
	}

	@keyframes wishReveal {
		0% {
			transform: translateX(150%);
		}
		100% {
			transform: translateX(0);
			opacity: 1;
		}
	}

	@keyframes reveal {
		20% {
			opacity: 1;
		}
		99% {
			opacity: 0;
		}
		100% {
			opacity: 0;
		}
	}
</style>
