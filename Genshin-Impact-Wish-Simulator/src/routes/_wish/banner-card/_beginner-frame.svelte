<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import OverlayScrollbars from 'overlayscrollbars';
	import { beginnerRemaining } from '$lib/store/app-stores';

	export let character = '';
	$: char = $t(`${character}.name`);

	const highlightBannerName = (bannerName) => {
		const splited = bannerName.split(' ');
		return `${splited[0]} <span class="geo"> ${splited.slice(1).join(' ')}</span>`;
	};

	let bannerInfo;
	onMount(() => {
		OverlayScrollbars(bannerInfo, {
			sizeAutoCapable: false,
			className: 'os-theme-light',
			scrollbars: { visibility: 'hidden' }
		});
	});
</script>

<div class="frame-content">
	<div class="top">
		{$t('wish.banner.novice')}
	</div>
	<h1 class="card-stroke" in:fly={{ x: 10, duration: 700 }}>
		{@html highlightBannerName($t(`banner.beginner`))}
	</h1>

	<div class="info" bind:this={bannerInfo} in:fly={{ x: 15, duration: 700 }}>
		<div class="content">
			<div class="set">
				{$t('wish.banner.beginnerSet', { values: { character: char } })}
			</div>
			<div class="desc">
				<div class="icon">
					<i class="gi-primo-star" />
				</div>
				<p class="text">
					{$t('wish.banner.wishDescription')}
				</p>
			</div>
			<div class="note">
				{$t('wish.banner.beginnerNote')}
			</div>
		</div>
	</div>

	<div class="featured" in:fly={{ x: 10, duration: 700 }}>
		<div class="charName" style="position: relative;">
			<span>
				{char}
			</span>
			<span class="up">{$t('wish.banner.up')}</span>
		</div>
	</div>

	<div class="char-title" in:fly={{ x: 10, duration: 700 }}>
		{$t(`${character}.title`)}
	</div>

	<div class="chances">
		{$t('wish.banner.beginnerChance', { values: { chances: `${$beginnerRemaining}/20` } })}
	</div>
</div>

<style>
	.frame-content {
		width: 100%;
		height: 100%;
		position: relative;
		color: #565654;
		display: block;
		font-size: calc(1.8 / 100 * var(--content-width));
	}

	h1,
	.frame-content > div {
		text-align: left;
		position: absolute;
	}
	h1 :global(span) {
		color: #cba885;
		display: block;
	}
	h1 {
		bottom: 73.5%;
		left: 0;
		margin: 0 4%;
		line-height: 125%;
		font-size: calc(4.5 / 100 * var(--content-width));
	}

	:global(.zh-CN) h1,
	:global(.ja-JP) h1 {
		font-size: calc(6 / 100 * var(--content-width));
	}

	.info {
		left: 0;
		top: 36%;
		width: 40%;
		height: 45%;
		display: block;
		padding-left: 4%;
	}

	.top {
		color: #fff;
		background-color: #e79649;
		padding: 0.3% 1.4%;
		border-bottom-left-radius: 2rem;
		border-top-left-radius: 2rem;
		border-bottom-right-radius: 4rem;
		top: 0;
		left: 0;
		transform: translate(-3%, -15%);
	}

	.set {
		font-size: calc(2.4 / 100 * var(--content-width));
	}

	.desc {
		color: #fff;
		min-height: calc(9 / 100 * var(--content-height));
		display: flex;
		align-items: center;
		margin: calc(0.7 / 100 * var(--content-width)) 0;
		background-color: rgba(224, 85, 94, 0.85);
	}

	.desc .text {
		width: calc(32.5 / 100 * var(--content-width));
		padding: calc(0.3 / 100 * var(--content-width));
		line-height: 125%;
	}

	.icon {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: calc(1 / 100 * var(--content-width));
		font-size: calc(1.1 / 100 * var(--content-width));
	}

	.featured {
		top: 65.6%;
		left: 57.6%;
		color: #fff;
		font-size: calc(4.9 / 100 * var(--content-width));
		-webkit-text-stroke: 0.05rem #565654;
		text-shadow: 0 0 0.15rem #d2c69c;
	}

	:global(.ja-JP) .featured,
	:global(.zh-CN) .featured {
		top: 68%;
	}

	.charName span:not(.up) {
		filter: drop-shadow(0 0.3rem 0.5rem #000);
	}

	.charName span.up {
		color: #fff664;
		-webkit-text-stroke: 0.05rem #e7a12e;
		font-size: calc(1.5 / 100 * var(--content-width));
		filter: drop-shadow(0 0.3rem 0.5rem #fff);
		position: absolute;
		top: 0;
		right: 0;
		transform: translateX(100%);
		text-transform: uppercase;
		text-shadow: 0 0 0.4rem #f79c09;
	}

	.char-title {
		left: 57.6%;
		top: 83.5%;
		color: #cfbc99;
		background-color: #39425d;
		padding: 0.2% 1%;
	}

	.chances {
		right: 0;
		bottom: 6.5%;
		color: #e7dfd0;
		background-color: #252d3a;
		padding: 0.2% 2%;
	}
</style>
