<script>
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import { fly } from 'svelte/transition';
	import { activeVersion, mobileMode, viewportWidth } from '$lib/store/app-stores';
	import { isNewOutfitReleased } from '$lib/helpers/outfit';
	import { noticeMark } from '$lib/helpers/noticeMark';
	import NoticeMark from '$lib/components/NoticeMark.svelte';

	export let activeShop = 'genesis';
	export let isOpen = false;

	$: resizeable = $viewportWidth < 700 && !$mobileMode;

	// Notice Marks
	const { patch } = $activeVersion;
	const outfits = getContext('outfits');
	const hasNewOutfits = isNewOutfitReleased(patch);

	// Shop Menu Handle
	const selectShopMenu = getContext('selectShopMenu');
	const asideToggle = getContext('asideToggle');

	const selectShop = (shop) => {
		activeShop = shop;
		selectShopMenu(shop);

		// NoticeMark
		if (['outfits', 'recomended'].includes(shop) && hasNewOutfits) {
			return noticeMark.openNotice(`${shop}-${patch}`);
		}
	};
</script>

{#if isOpen && resizeable}
	<div class="bg" on:mousedown|self={asideToggle} transition:fly={{ x: -10, duration: 100 }} />
{/if}

<aside
	class="navbar"
	class:resizeable
	class:show={isOpen}
	transition:fly={{ x: -100, duration: 200 }}
>
	<div class="top">{$t('shop.text')}</div>
	<div class="nav-item">
		<button
			class="link"
			class:active={activeShop === 'recomended'}
			on:click={() => selectShop('recomended')}
		>
			{#if hasNewOutfits}
				<NoticeMark name="recomended-{patch}" />
			{/if}
			<span>
				<i class="gi-recomended" />
				{$t('shop.recomendedHeading')}
			</span>
		</button>

		{#if $outfits.length > 0}
			<button
				class="link"
				class:active={activeShop === 'outfits'}
				on:click|preventDefault={() => selectShop('outfits')}
			>
				{#if hasNewOutfits}
					<NoticeMark name="outfits-{patch}" />
				{/if}
				<span><i class="gi-outfit" /> {$t('outfit.heading')}</span>
			</button>
		{/if}

		<button
			class="link"
			class:active={activeShop === 'paimon-bargains'}
			on:click={() => selectShop('paimon-bargains')}
		>
			<span>
				<i class="gi-paimon-bargains" />
				{$t('shop.paimonHeading')}
			</span>
		</button>
		<button
			class="link"
			class:active={activeShop === 'genesis'}
			on:click={() => selectShop('genesis')}
		>
			<span>
				<i class="gi-genesis" />
				{$t('shop.crystalTopup')}
			</span>
		</button>
		<button
			class="link"
			class:active={activeShop === 'donate'}
			on:click={() => selectShop('donate')}
		>
			<span>
				<i class="gi-companion" />
				{$t('donate')}
			</span>
		</button>
	</div>
</aside>

<style>
	.navbar {
		width: 320px;
		height: 100%;
		display: block;
		background-color: rgba(75, 82, 101, 0.8);
		border-right: 1px solid #d2c69c;
		border-left: 1px solid #d2c69c;
		color: #d2c69c;
		margin-right: 3%;
		position: relative;
		z-index: -1;
	}
	:global(.mobile) .navbar {
		width: 190px;
	}

	.navbar.resizeable {
		position: fixed;
		top: 0;
		left: 0;
		width: 200px;
		background-color: rgba(75, 82, 101, 1);
		z-index: 10;
		transform: translateX(-110%);
		transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
	}
	.bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(75, 82, 101, 0.5);
		z-index: 8;
		backdrop-filter: blur(10px);
	}

	aside.resizeable.show {
		transform: translateX(0);
	}

	.top {
		font-size: 1.5rem;
		width: 100%;
		height: 80px;
		background-color: #3b4255;
		padding: 0 20px 20px;
		display: flex;
		align-items: flex-end;
	}
	:global(.mobile) .top {
		height: 50px;
		font-size: 1.2rem;
		padding: 0 20px 10px;
		margin-bottom: -10px;
	}

	.nav-item {
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		color: #f0e4d4;
	}

	.link {
		position: relative;
		transition: all 0.2s;
		text-decoration: none;
		color: #ededed;
		aspect-ratio: 70/17.5;
		display: flex;
		align-items: center;
		padding-left: 5%;
		z-index: 1;
		text-align: left;
	}
	.link i {
		font-size: 2rem;
		display: inline-block;
		margin-right: 10px;
	}
	:global(.mobile) .link i {
		font-size: 1.4rem;
	}

	.link.active,
	.link:hover {
		background-color: #ede5d8;
		color: #40475a;
		border-radius: 0.25rem;
	}

	.link::after,
	.link::before,
	span::after,
	span::before {
		content: '';
		position: absolute;
		background-size: contain;
		display: block;
	}

	.link.active::before {
		top: 50%;
		right: -13.25%;
		height: 100%;
		aspect-ratio: 37/30;
		transform: translateY(-50%) rotate(180deg);
		z-index: -1;
		line-height: 120%;
		background-repeat: no-repeat;
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN4AAAC0CAMAAADM1mK5AAAAP1BMVEUAAADn59ft5djs5djn39/r49fs5tjs5djr5Nft5dns5dns5Njs49fs49jr5tns5dns59nt5trq5Nrq5NXs5dgwi7xwAAAAFHRSTlMAIN/vEEC/gGCg0L9QkHCwX48wMGbNuj8AAAQnSURBVHja7d3pcuMgDABgcYPPttH7P+uuN02TZpwGWDuWqL7/nalGIAiXQQghhBBCCCGEEOIRe4ohzZ3W+I/W3qcQnQX2bBy9wQeMHwcFXNlh1PhUlwaGabSTx2w+skqiHTwW8hGYUMFgBZ04pNB5rJYc0HYOrp6nHOA1uHqeahNVM26CZh8MBrcSgBqncUOaVgLtO541mUDV4T9tJnAyuAMzAQnvuJN3OJ7qcDfd4Q1UafymrQ74YXBX5gQHejO4M/MGh3nDF8iNj2d0ufFxjS43PmZV5dj6ogy+jFHwHKPx7vDxr8OX6uAZHvNMEvPPCV9ugh9xLSsHlBeNB+gsvEbAXBy7n8KDOFjVQtNcaFjTRtN8uHzWSNN8TfVMeKAZ7jWUvBdUF4+H8rArh4V4pc9jKU7pOzx59+lrqGyupK+psnmmoIbWlkPyKqcuEXGiO9u8ZSyU8xmtOiIJQ2WvOlEfFc58ZUkMDArLwtb9hjMs2uZKkcjsVY5D26xonT7j7yySYaGIyvm7AckYKtcXAvUx/WysXBwydHYVfqJrfwc4+sPCwlb+DvAcuh5ihHwqa0I3IiFj+aB3FsiPeqUjn87aJzRIiKleYHDkB/WFrd1G9mRXWW6dqrcMAu359Fms3yQPxDZOqlck7KRxhY6K8pRskeApNxp8JDnK48LzvRQbOrxaTyHh8LoNbsOkgdgiWdak2gaDmXRQvMKzzlfdG0Ritrs5qJNiEp7HKjOT8CaNFczEJDyA2GOhfrBc+t5CjRqzmWCBT2n5NMyZiXMMx72Fihqf6IKltvdVslbmEj5mkiO7DLjoYVGZwn6ycGdGUnrIMqwEqB3tNepFqr5+19lWfs6unYvWqqXFCICQ9YcnJMVBLmvwhrGNLQTCiDdSa8u44PCGY7EI31ce89PQ3BYKTPgl0j8Xcdl9rikuisPJgdJjczN+StQPlFVdd3M3hYVD50tQxlwKS5MHPy4zl9jmsZ3Lv654HLrq6064z+SuXK6LUMp9NmkWrVNBMYOoyV9iOOuhXPgstwxqZ4RyNiPnlsSvBg01Bkf6ZuLqmC7XNHjdkLpPnlyRYpW+Hr5pLX13yWssfT3caSt9CjZGai8lwRruj5k8S548qiBPYhRXF35Ns2jNjGHT/Mt2mINl0/wFT0E1/pDXAd1vhBzyiJ48gdj+A5YvfX70A3ZA5o2FCDm4xpcbHc/4IhwmGtyZKYuOWX2pqCqMxj99/JP+TX+w4H7+yXie+Ts/FnLpgA02zN2Wz0Za3xzcNoGa3pfOAm7FUPrG0heVcBMzpV53S/X433p67fLK9Q0Ht3Cp4eAWKum6gkK1z21xx5PXx3VVSYT9xCq2MzukDp/SI6+8faOGsTf4gOnHyDe0L9bFkPr++kHybk4hfjQQmRBCCCGEEEIIIa7+AOtDPh8UDv3LAAAAAElFTkSuQmCC');
	}

	.link.active::after {
		top: 50%;
		right: -1%;
		width: 100%;
		aspect-ratio: 708/156;
		transform: translateY(-50%) rotate(180deg);
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAsQAAACcCAMAAABPyU0CAAAAOVBMVEUAAADTu4vUvI7Uuo3TvI7TvI7UvI7TvozTu43TvI7Su47Pv4/fv43TvI7Tu43SvIzVuo3UvI/TvI7Io+VzAAAAEnRSTlMAQL9goL/eIHDvsBAQkIBQML8hIpUyAAADO0lEQVR42uzd22oCMRSG0dixM2oVZb//wzaOhzoWerjzh7VAxfuPkExibD9ZF7yg97YgYvKImHj/jHho8FJWIiadiIknYuKJmHgiJp6IiSdi4omYeL9G/FYLIublrOqZiAkjYuL9JeJVgxwiJp6IiSdi4omYeCImnoiJJ2LiiZh4IiaeiIknYuKJmHgiJp6IiSdi4omYeCImnoiJJ2LiiZh4Iibet4inrYjJ8hzxfqwaPxrkeI74ULWdGgR5injo3zcNkiwjnsaqdYMoy4jXVaPJBGEWEQ+uDyTQImKTCRI9RrwxmSDRQ8TTaDJBoh7x46quQZyviCerOjL1cg3EZLtHPG0NxGS6RzwYiAl1j9ijCVLdIj4aiEl1i3hns45U14in/mmzjkzXiIeq9waRrhG/WdYRq0dsNkG2Xq/ZBNkuEe/8so5cl4jHqlODTHPEJzsdBJsjHqp2DULNEa9NiQk2Rzy6fo1gPeL5bd8gVO/Xuo5s54iPtjpIdo54U3VokOoc8cHDCZKdI95VHRuk6hH7lw6y9YidnCDbHLHDxCTrEc8viCVi4omYeCImnoiJJ2LiecRGPBETz7Yz8eYDQO6wIpmjmMT7bO8OU1oHwgCKpiCtIdDHy/4XKxOjOFUQ//XCOWu4hJkk34yf4sk7xpMcO0HZiPhmUJQyI/vkOTyFPMdYkXdE/GpnR9gR8W3f1wWijoiX1agoXSNii2LSXDxD3nvEmzfFdJ1THf+tJ8g6I361niDrjHhzpShZI+JzPXFfoOgj4su+r7Z2JI2ID6sZJaI+I77b2hH1GfG2+h+TphGxRzFpI2KPYtJGxKe7UTuSvkS8rb49UzQi/nD3rpii6VjX676/LBAzRXzZ7e3omSIeRwteLSiImSPeVgsKcuaIl3+7NxTUPEQ8jnld/VhMymPE29WymJgR8eTm6zMx3yJ2gwc1IiZPxOSJmDwRkydi8kRMnojJEzF5IiZPxOSJmDwRkydi8kRMnojJEzF5IiZPxOSJmDwRkydi8n6KeOJSJZ7OZZ+ImB4Rk/drxLMXEfN0Lt9u+hIxMSImT8TkiZg8EZMnYvJETJ6IyftzxPCEREyeiMl7iPgNPx9ffAKGWGIAAAAASUVORK5CYII=');
		background-repeat: no-repeat;
	}

	span {
		display: flex;
		align-items: center;
		width: 100%;
		height: 95%;
		position: relative;
		overflow: hidden;
	}
	span :global(i) {
		line-height: 0;
	}

	.active span::before {
		width: 40%;
		height: 100%;
		z-index: -1;
		top: 0;
		right: 0;
		content: '\68';
		font-family: 'genshin-icon' !important;
		font-style: normal !important;
		font-weight: normal !important;
		font-variant: normal !important;
		text-transform: none !important;
		speak: none;
		line-height: 90%;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		font-size: 5rem;
		color: #e3d9c4;
	}

	.active span::after {
		width: 100%;
		height: 100%;
		z-index: -1;
		background-image: linear-gradient(
			to right,
			rgba(237, 229, 216, 1) 60%,
			rgba(237, 229, 216, 0) 80%
		);
	}
</style>
