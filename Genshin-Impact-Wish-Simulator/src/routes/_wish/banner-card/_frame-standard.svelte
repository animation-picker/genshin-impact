<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import OverlayScrollbars from 'overlayscrollbars';
	import { highlightBannerName } from '$lib/helpers/nameText';

	export let bannerName = '';
	const oldStd = bannerName === 'wanderlust-invocation-1';

	const chars = oldStd ? ['jean', 'diluc'] : ['qiqi', 'mona', 'keqing'];
	const weap = oldStd ? 'skyward-blade' : 'skyward-spine';

	// const highlightBannerName = (bannerName) => {
	// 	const oldClass = oldStd ? 'old' : 'wanderlust-flat';
	// 	const splited = bannerName.split(' ');
	// 	return `${splited[0]} <span class="${oldClass}"> ${splited.slice(1).join(' ')}</span>`;
	// };

	let bannerInfo;
	onMount(() => {
		OverlayScrollbars(bannerInfo, {
			sizeAutoCapable: false,
			className: 'os-theme-light',
			scrollbars: { visibility: 'hidden' }
		});
	});
</script>

<div class="frame-content" class:old={oldStd}>
	<div class="top bg-wanderlust">
		{$t('wish.banner.standard')}
	</div>
	<h1 in:fly={{ x: 10, duration: 700 }} class="card-stroke">
		{@html highlightBannerName($t('banner.wanderlust'), oldStd ? 'old' : 'wanderlust')}
	</h1>
	<div class="info" bind:this={bannerInfo} in:fly={{ x: 15, duration: 700 }}>
		<div class="content">
			<div class="set card-stroke">
				{$t('wish.banner.standard')}
			</div>

			<div class="desc">
				<div class="icon">
					<i class="gi-primo-star" />
				</div>
				<div class="text">
					{$t('wish.banner.wishDescription')}
				</div>
			</div>
			<div class="note card-stroke">
				{$t('wish.banner.standardNote')}
				{$t('wish.banner.viewDetails')}
			</div>
		</div>
	</div>

	{#each chars as char}
		<div class="group {char}" in:fly={{ x: 10, duration: 700 }}>
			<div class="group-content">
				<div class="item-name">
					{$t(`${char}.name`)}
				</div>
				<div class="char-title">
					{$t(`${char}.title`)}
				</div>
			</div>
		</div>
	{/each}
	<div class="group skyward" in:fly={{ x: 10, duration: 700 }}>
		<div class="group-content">
			<div class="item-name">
				{$t(weap)}
				<span>{$t('wish.banner.etc')}</span>
			</div>
			<div class="all">
				{$t('wish.banner.allWeaponTypes')}
			</div>
		</div>
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
		line-height: 120%;
	}

	h1 :global(span) {
		display: block;
	}
	h1 :global(span.old) {
		color: #c9a07b;
	}

	h1,
	.frame-content > div {
		text-align: left;
		position: absolute;
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
		font-size: calc(7 / 100 * var(--content-width));
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
		padding: 0.3% 1.4%;
		border-bottom-left-radius: 2rem;
		border-top-left-radius: 2rem;
		border-bottom-right-radius: 4rem;
		top: 0;
		left: 0;
		transform: translate(-3%, -15%);
	}

	.old .top {
		background-color: #c9a07b;
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
		background-color: rgba(101, 107, 202, 0.9);
	}

	.old .desc {
		background-color: rgba(48, 143, 148, 0.9);
	}

	.desc .text {
		width: calc(32.5 / 100 * var(--content-width));
		padding: calc(0.3 / 100 * var(--content-width));
	}

	.icon {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: calc(1 / 100 * var(--content-width));
		font-size: calc(1.1 / 100 * var(--content-width));
	}

	.group-content {
		position: relative;
	}
	.item-name {
		color: #fff;
		-webkit-text-stroke: 0.05rem #565654;
		text-shadow: 0 0 0.15rem #d2c69c;
		filter: drop-shadow(0 0.3rem 0.5rem #000);
	}

	.char-title {
		color: #cfbc99;
		background-color: #39425d;
		margin-top: calc(2.8 / 100 * var(--content-width));
		padding: 1% 7%;
		white-space: nowrap;
		width: fit-content;
	}
	.qiqi {
		left: 36.5%;
		top: 78%;
	}
	.mona {
		left: 46%;
		top: 21%;
	}
	.keqing {
		left: 61%;
		top: 55%;
	}
	.jean {
		left: 44%;
		top: 72.5%;
	}
	.diluc {
		left: 78%;
		top: 10%;
	}

	.keqing .item-name {
		font-size: calc(4.5 / 100 * var(--content-width));
		transform: translateY(-80%);
	}
	.qiqi .item-name,
	.mona .item-name {
		font-size: calc(3.3 / 100 * var(--content-width));
	}
	.jean .item-name,
	.diluc .item-name {
		font-size: calc(4 / 100 * var(--content-width));
		margin-bottom: calc(4 / 100 * var(--content-width));
	}

	.skyward {
		left: 75.1%;
		bottom: 4.5%;
		width: 24%;
		line-height: 170%;
	}

	.skyward .item-name {
		font-size: calc(3.5 / 100 * var(--content-width));
	}

	:global(.vi-VN) .skyward .item-name {
		font-size: calc(3 / 100 * var(--content-width));
	}

	.item-name span {
		font-size: calc(2 / 100 * var(--content-width));
		white-space: nowrap;
	}
	.all {
		color: #fff;
		background-color: #f7ab48;
		display: inline-block;
		width: fit-content;
		font-size: calc(1.3 / 100 * var(--content-width));
		line-height: 130%;
		padding: calc(0.2 / 100 * var(--content-width)) calc(2 / 100 * var(--content-width));
		margin-top: calc(3.8 / 100 * var(--content-width));
		transform: translateX(-5%);
	}
</style>
