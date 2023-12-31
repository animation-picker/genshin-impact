<script>
	import { t } from 'svelte-i18n';
	import { afterUpdate } from 'svelte';
	import OverlayScrollbars from 'overlayscrollbars';
	import {
		activeBanner,
		bannerList,
		assets,
		activeVersion,
		isCustomBanner,
		customData
	} from '$lib/store/app-stores';
	import { playSfx } from '$lib/helpers/audio/audio';
	import { getBannerName } from '$lib/helpers/nameText';
	import {
		get3StarItem,
		get4StarItem,
		get5StarItem,
		getCharDetails,
		getWpDetails
	} from '$lib/helpers/gacha/itemdrop-base';

	import List from './_list.svelte';
	import Description from './_description.svelte';
	import PromotionalV1 from './_promotional-v1.svelte';
	import PromotionalV2 from './_promotional-v2.svelte';
	import Title from '../_title.svelte';

	export let tplVersion = 'v2';

	let {
		bannerName,
		type,
		stdver,
		character = '',
		featured = [],
		rateup = []
	} = $bannerList[$activeBanner];
	const { vision } = $isCustomBanner ? $customData : getCharDetails(character);

	// Get Droplist
	const { patch: version, phase } = $activeVersion;
	const drop3star = get3StarItem();

	// Drop4star
	const list4star = get4StarItem({
		phase,
		version,
		banner: type,
		type: 'all',
		rateupNamelist: rateup
	});
	rateup = rateup
		.map((name) => (type.match('weapon') ? getWpDetails(name) : getCharDetails(name)))
		.map((val) => {
			const item = { ...val };
			item.rateup = true;
			return item;
		});
	const drop4star = [...rateup, ...list4star];

	// drop 5star
	const list5star = get5StarItem({
		phase,
		version,
		stdver,
		type: type === 'standard' ? 'all' : type.split('-')[0],
		banner: type,
		rateupItem: type.match('weapon') ? featured.map(({ name }) => name) : [character] || []
	});

	character = { ...($isCustomBanner ? $customData : getCharDetails(character)), rateup: true };
	const weapons = featured
		.map(({ name }) => getWpDetails(name))
		.map((val) => {
			const item = { ...val };
			item.rateup = true;
			return item;
		});

	const rateup5 = type.match('character') ? [character] : weapons;
	const drop5star = [...(rateup5 || []), ...list5star];

	// BannerName
	const bannerSlug = getBannerName(bannerName).name;
	const isStd = type === 'standard';
	const defaultName = $t(`banner.${isStd ? 'wanderlust' : bannerSlug || 'beginner'}`);
	bannerName = $isCustomBanner ? $customData.bannerName : defaultName;

	const noPromo = type.match(/(standard|beginner)/);
	let activeContent = noPromo ? 2 : 1;

	// Click Handler
	const select = (selected) => {
		if (activeContent === selected) return;
		activeContent = selected;
		playSfx();
	};

	let scrollable;
	afterUpdate(() => {
		OverlayScrollbars(scrollable, { sizeAutoCapable: false, className: 'os-theme-light' });
	});
</script>

<Title {type} {vision} {bannerName} {tplVersion} />

{#if tplVersion === 'v2'}
	<nav style="background-image: url({$assets['book-select-bg.webp']});">
		{#if !noPromo}
			<div class="nav-item" class:active={activeContent === 1}>
				<button on:click={() => select(1)}> {$t('details.promotional')} </button>
			</div>
		{/if}
		<div class="nav-item" class:active={activeContent === 2}>
			<button on:click={() => select(2)}> {$t('details.text')} </button>
		</div>
		<div class="nav-item" class:active={activeContent === 3}>
			<button on:click={() => select(3)}> {$t('details.itemlist')} </button>
		</div>
	</nav>

	<div class="content" bind:this={scrollable}>
		<div class="wrapper">
			{#if activeContent === 1}
				<PromotionalV2 data={{ weapons, character, bannerType: type, rateup }} />
			{:else if activeContent === 2}
				<Description
					bannerType={type}
					{bannerName}
					{weapons}
					{character}
					{rateup}
					tplVersion="v2"
				/>
			{:else if activeContent === 3}
				<List {drop5star} {drop4star} {drop3star} bannerType={type} tplVersion="v2" />
			{/if}
		</div>
	</div>
{:else}
	<PromotionalV1 data={{ weapons, character, bannerType: type, rateup }} />
	<Description bannerType={type} {bannerName} {weapons} {character} {rateup} />
	<br />
	<List {drop5star} {drop4star} {drop3star} bannerType={type} />
{/if}

<style>
	nav {
		width: 100%;
		line-height: 0;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		background-size: cover;
		background-position: center center;
	}

	.nav-item {
		width: 33.33333%;
		padding: 0;
		display: flex;
		justify-content: center;
	}
	.nav-item button {
		font-size: calc(0.017 * var(--content-width));
		width: 100%;
		aspect-ratio: 557/86;
		opacity: 0.8;
		background-size: contain;
		background-position: center center;
		background-repeat: no-repeat;
		transition: all 0.2s;
	}

	.nav-item.active button,
	.nav-item button:hover {
		background-image: url('data:image/webp;base64,UklGRuwEAABXRUJQVlA4WAoAAAAQAAAAKwEAMAAAQUxQSH0BAAABgEJt27LmxeauzSsanUymO0T63H0N6lgmcmhzadT5xtzd/T//j8MXnxgRE0A5ipSB2B8Hxt9YQCkippplLg5IblnDpDQYB2WwlIV8GxXbchb6c1Sc61loz1BxpmVhvUfFnTW/EvuGgAphw16SR1XvYxyYj71VOVWNvceh+T5WlUPZwEccnJ+DZVmkvpc4PF980kzGWBygMWOGxnAcouHGNM8nRj49RNS0HgfpehOR+xsl326qicRhGqkxHeHkyNTxjZPvjhCPEz60GQfq5iNSHn+R8schhftAyscpUk4XBZwIi34eJ7zf/oSTJ0drFCfRtsJpASXCdCGZr1ByZSYqnUFJsIyIDCcYOTEQERWM8wjhxwvSqH0OIXPtlFm/jY9tPWUV267QcWUTZ6MC7xU2rrwFlGuBax8Z+64Cyl1qXORRwS8apZS35RYVtxZiqDtDxZmOhf4cFed6FvJtVGzLWZQGUTFbyoI0yxwiuGUNMRUpA7E/Dox/sYBSlAsAVlA4IEgDAABwFgCdASosATEAPlEmj0WjoiEiopgMUHAKCWcDyE4D3GgalpKNufSrTlG6/4HRwJ8fjMWOtzhg+/VupDXbutNKQ127r8B56ZwFQ0KiDO8f0bRALDyOFanPFD4UOCQPNucJgeVzmh7Eh4LW6YT48bBMV2Es6oWg3d2YoQ6gIIRBFYaFdZWyQeYHIohg0eTISZK7lrVPFXMm2OrTYBjpg9tTtGrF9Zpzg9Fz4RBo+TAtMNiXrDT+xCkRtAK9oAD++yyqMfJtYdJKgf2vrcNlZHq/DVUvFH6ZJK7IOrgZ93A5P1phmNx49/vcI1iLQR9fGhKNUXTL0BqDOaHlBCl+VeBjr5Zggy4F8iMxYUff5SqgwW7UGC3OsK1jAYPYAqsJZv+1VVCYIUm2D37147bJNVKgvZBTq2chCN1Q7ZymeKwhMqwPaLP9Bs/8Trz57hxOj9pWfEwugAuH63BuUK/uCQS0YebG3AgduCPvf8/1bX3mfizRuMODha1URGbCF2vE7tF/53tI8Nnw+lyx1RkqXhdrYn3PtomSCdgaRN8cvcR8Jk1J4dZppG0OuT1ikz2KPR1aFxONss8Ad/2W3WsZmVYOMV7LKM0uWE9deCoJfspH6el+zVaVfZoAoJgp7a8GTl0AiloTgFbahcJ93vIuQ26q68eP2Uy6kfDLbTLOH/VpMm3PnlLJid+keLuErU5yXjN0qFQu83BL58NQoaeO8CYWuhtPbaSTcmEsg3Cc4eurv3LEhLLj6MC1z8mQ0BrsXYp/SHIuU3LfAmf0rtMi5fXrBDFYB9Cqqgl/Dx3GqXlykoqZ7JN4O9P8E4VkZzUbpndg1ileL9220RAgFWZOwDNnoaj86MTL/lJltaA+0CuOfTWj5ir10bx/JG+Kt/xa78WiNULXV9LbCKhOIDJze8+lKVY2OrCV6rbDCfcyz60+srrneBxx1sL4HwowjVYf0ZRr/Le9qcLeqHv71USrK5Ih7iKYdwDC/RHvM0/VVOFCjU1mpAfJU9z5Ob6TnCMSDQ5EuXAOWkQxyxAqn8UhVw5xm/9ZpWEBfMfhcbI3W2k6z4fuh/SEiAAAABtCZhqluII+AYbJsmRLyfzH6eMYZVEUkAgH4EaAAAA=');
		color: #fff;
	}

	.nav-item.active button {
		opacity: 1;
	}

	.content {
		height: 100%;
	}
</style>
