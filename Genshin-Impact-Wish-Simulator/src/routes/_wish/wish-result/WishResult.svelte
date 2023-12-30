<script>
	import { getContext, onMount, setContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t, locale } from 'svelte-i18n';
	import hotkeys from 'hotkeys-js';

	import { assets, viewportHeight, viewportWidth } from '$lib/store/app-stores';
	import { localConfig } from '$lib/store/localstore-manager';
	import { playSfx, pauseSfx as stopSfx } from '$lib/helpers/audio/audio';
	import { setActiveOutfit } from '$lib/helpers/outfit';
	import { lazyLoad } from '$lib/helpers/lazyload';
	import { createLink } from '$lib/helpers/shareable-link';

	// Component
	import ResultList from './ResultList.svelte';
	import SplashLight from './_splash-light.svelte';
	import ItemInfo from './_item-info.svelte';
	import WeaponBonus from './_weapon-bonus.svelte';
	import ScreenshotShare from '../../_index/ScreenshotShare.svelte';

	export let list = [];
	export let skip = false;
	export let standalone = false;
	export let isOutfit = false;

	let preview = standalone || false;
	setContext('preview', (val) => (preview = val));

	const lc = $locale?.toLowerCase() || '';
	const isYuanshen = lc.match(/(cn|ja)/);

	const splashBG = isOutfit ? $assets['outfit-background.webp'] : $assets['splash-background.webp'];
	list = list.map(setActiveOutfit);

	const calculateWrapperHeight = (vw, vh) => {
		if (vw < vh) return '80vw';
		if (vw < vh * 1.5) return '65vw';
		return '100%';
	};
	$: wrapperHeight = calculateWrapperHeight($viewportWidth, $viewportHeight);

	let isSplashOut = false;
	let timer;
	const startTimer = () => {
		clearTimeout(timer);
		isSplashOut = false;
		timer = setTimeout(() => {
			isSplashOut = true;
			clearTimeout(timer);
		}, 1100);
	};

	const playRevealAudio = () => {
		startTimer();
		if (localConfig.get('muted')) return;
		if (activeIndex > 0) {
			const starBefore = list[activeIndex - 1].rarity;
			stopSfx(`reveal${starBefore}Star`);
		}
		const star = list[activeIndex].rarity;
		playSfx(`reveal${star}Star`);
	};

	let showResultList = false;
	let activeIndex = 0;

	const createShareableLink = (activeIndex, showResultList) => {
		const isMulti = showResultList && list.length > 1;
		const link = isMulti ? createLink(list) : createLink([list[activeIndex]]);
		return link;
	};

	const showItem = (startIndex) => {
		// Single Pull
		if (list.length === 1) {
			if (startIndex === 'start') playRevealAudio();
			return;
		}

		// Multi Pull
		if (activeIndex > list.length - 2) {
			showResultList = true;
			return;
		}
		if (startIndex !== 'start') {
			activeIndex = activeIndex + 1;
		}
		playRevealAudio();
	};

	const closeResult = getContext('closeResult');
	const closeHandle = () => {
		playSfx('close');
		closeResult();
		return;
	};

	const skipHandle = () => {
		playSfx();
		showResultList = true;
	};

	const removeClass = (el) => {
		el.addEventListener('animationend', () => {
			el.classList.remove('anim');
		});
	};
	onMount(() => {
		if (!skip || list.length === 1) showItem('start');
		if (skip || standalone) return (showResultList = true);
	});

	// Shortcut
	const onWish = getContext('onWish');
	hotkeys('enter,space', 'index', (e) => {
		if (!$onWish) return;
		e.preventDefault();
		if (list.length > 1 && !showResultList) showItem();
	});

	hotkeys('esc', 'index', (e) => {
		if (!$onWish) return;
		e.preventDefault();
		if (list <= 1 || showResultList) return closeHandle();
		return skipHandle();
	});
</script>

<div
	class="wish-result"
	class:preview
	style="background-image: url({splashBG});"
	out:fade={{ duration: 250 }}
>
	<!-- Preview Only -->
	<div class="uid">WishSimulator.App</div>
	<img
		src={$assets[`genshin-logo${isYuanshen ? '-cn' : ''}.webp`]}
		alt="genshin logo"
		class="logo"
		class:cn={isYuanshen}
	/>
	<!-- End Preview Only -->

	{#if !standalone}
		{#if list.length > 1 && !showResultList}
			<button class="skip" on:click={skipHandle}>
				{$t('wish.result.skip')} <i class="gi-caret-up" />
			</button>
		{:else}
			<button class="close" on:click={closeHandle} in:fade={{ delay: 1500 }}>
				<i class="gi-close" />
			</button>
		{/if}
	{/if}

	{#if showResultList && list.length > 1}
		<ResultList {list} {standalone} />
	{:else}
		<div class="container" in:fade={{ duration: 500, delay: 200 }}>
			{#each list as { name, rarity, type, outfitName, vision, weaponType, bonusQty, bonusType, stelaFortuna, useOutfit }, i}
				{#if activeIndex === i}
					<div class="wrapper" on:mousedown={showItem} style="height: {wrapperHeight};">
						{#if !isSplashOut} <SplashLight type="in" {rarity} /> {/if}

						{#if type === 'weapon'}
							<div class="splash-art anim weapon {weaponType}-parent" use:removeClass>
								<img src={$assets[`bg-${weaponType}.webp`]} alt={weaponType} class="weaponbg" />
								<img use:lazyLoad={$assets[name]} alt={name} class={weaponType} />
							</div>
						{:else if type === 'outfit'}
							<div class="splash-art anim" use:removeClass>
								<img
									use:lazyLoad={$assets[`splash-art/${outfitName}`]}
									alt={name}
									crossorigin="anonymous"
								/>
							</div>
						{:else}
							<div class="splash-art anim" use:removeClass>
								<img
									use:lazyLoad={$assets[`splash-art/${useOutfit ? outfitName : name}`]}
									alt={name}
									crossorigin="anonymous"
								/>
							</div>
						{/if}

						<ItemInfo
							itemName={name}
							{type}
							{outfitName}
							{rarity}
							{vision}
							{bonusQty}
							{weaponType}
							{stelaFortuna}
						/>
						<WeaponBonus {type} {bonusQty} {bonusType} />

						{#if isSplashOut} <SplashLight type="out" {rarity} /> {/if}
					</div>
				{/if}
			{/each}
		</div>
	{/if}

	{#if !standalone}
		{#if list[activeIndex].rarity > 3 || (showResultList && list.length > 1)}
			<div class="share">
				<ScreenshotShare canshare shareURL={createShareableLink(activeIndex, showResultList)} />
			</div>
		{/if}
	{/if}
</div>

<style>
	.skip,
	.close {
		position: fixed;
		top: 30px;
		right: 2%;
		z-index: 10;
	}

	:global(.mobile) .close {
		top: 0.3rem;
		right: 6%;
	}

	.skip {
		color: #fff;
		font-size: 1.2rem;
	}

	.gi-caret-up {
		display: inline-block;
		transform: rotate(90deg) translateX(-0.1rem);
		vertical-align: middle;
		margin-left: -0.5em;
	}

	:global(.mobile) .skip {
		font-size: 0.8rem;
		right: 5%;
		top: 0.5rem;
	}

	.wish-result {
		background-size: cover;
		background-position: center;
	}

	.wish-result,
	.container,
	.wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.splash-art {
		width: 100%;
		height: 100%;
		display: flex;
		position: relative;
		justify-content: center;
		align-items: center;
		transform: translateX(2%);
	}

	.splash-art.anim {
		filter: brightness(0) opacity(0);
		animation: splashart forwards 1.5s 1;
	}

	.splash-art img {
		height: 120%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		top: 50%;
	}

	.splash-art.weapon img.weaponbg {
		height: 85%;
	}
	.splash-art.weapon.anim img.weaponbg {
		opacity: 0;
		animation: weaponbg forwards 1.5s 1;
	}

	.bow-parent .weaponbg {
		height: 90% !important;
		transform: translate(-53%, -50%) !important;
	}
	.catalyst-parent .weaponbg {
		height: 90% !important;
	}

	.anim .bow,
	.anim .polearm,
	.anim .sword,
	.anim .claymore,
	.anim .catalyst {
		animation: weaponShadow forwards 0.1s 1;
		animation-delay: 1.2s;
		filter: drop-shadow(0 0 0 rgba(0, 0, 0, 0));
	}

	.bow,
	.polearm,
	.sword,
	.claymore,
	.catalyst {
		filter: drop-shadow(0.6rem 0.6rem 0.05rem rgb(0, 0, 0));
	}

	.bow {
		height: 100%;
	}

	.claymore {
		height: 105% !important;
	}

	.catalyst {
		height: 40% !important;
	}

	.polearm {
		top: 65% !important;
		left: 48% !important;
		height: 130% !important;
	}

	.share {
		display: flex;
		width: 100%;
		text-align: right;
		justify-content: flex-end;
		align-items: center;
		position: absolute;
		bottom: 5%;
		right: 8%;
		color: #fff;
		font-size: 0.8rem;
		z-index: 999;
	}

	button:active {
		transform: scale(0.9);
	}

	:global(.preview) .uid {
		position: fixed;
		left: 1rem;
		bottom: 1rem;
		display: block !important;
		color: #fff;
		text-shadow: 0 0 1.5px rgba(0, 0, 0, 0.7);
	}
	.logo,
	.uid {
		display: none;
		transition: all 0.1.5s;
		z-index: 999;
		pointer-events: none;
	}

	:global(.preview) .logo {
		display: block;
		width: 30vh;
		max-width: 30%;
		position: fixed;
		bottom: 0px;
		right: 2rem;
	}

	.logo.cn {
		max-height: 20vh;
		width: 20vh;
	}

	@keyframes splashart {
		0% {
			transform: scale(2) translate(0, -5%);
			filter: brightness(0);
		}

		20% {
			transform: scale(1);
			filter: brightness(0);
		}
		75% {
			transform: scale(1);
			filter: brightness(0);
		}
		95% {
			transform: scale(1) translate(2%, 0);
			filter: brightness(1);
		}
		100% {
			transform: scale(1) translate(2%, 0);
			filter: brightness(1);
		}
	}

	@keyframes weaponbg {
		80% {
			opacity: 0;
		}
		85% {
			opacity: 1;
		}
		100% {
			opacity: 1;
		}
	}

	@keyframes weaponShadow {
		to {
			filter: drop-shadow(0.7rem 0.6rem 0.2rem rgba(0, 0, 0, 0.7));
		}
	}
</style>
