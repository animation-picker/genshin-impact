<script>
	import { highlightBannerName } from '$lib/helpers/nameText';
	import { assets } from '$lib/store/app-stores';
	import { t } from 'svelte-i18n';

	export let bannerName = '';
	export let type = '';
	export let vision = '';
	export let tplVersion = '';
</script>

{#if type === 'history'}
	<h1 class="v2">
		<img src={$assets['brand.png']} alt="Icon" crossorigin="anonymous" />
		<span> {$t('history.title')}</span>
	</h1>

	<!-- Details Page -->
{:else}
	{@const divclass = type === 'standard' ? 'wanderlust' : vision}
	<h1 class={type} class:v2={tplVersion === 'v2'}>
		{#if tplVersion === 'v2'}
			<img src={$assets['brand.png']} alt="Icon" crossorigin="anonymous" />
		{/if}
		<span>
			{#if type !== 'beginner'}
				{$t(`wish.banner.${type}`)}
			{/if}

			"{@html highlightBannerName(bannerName, divclass || 'epitome')}"
		</span>
	</h1>
{/if}

<style>
	h1 {
		font-size: 1.7rem;
		text-align: left;
		background-color: #dadada;
		padding: 0.5rem 5%;
		display: flex;
		align-items: center;
		position: relative;
	}

	:global(.mobile) h1 {
		font-size: 1.3rem;
	}

	h1.v2 {
		background-color: transparent;
		font-size: calc(0.022 * var(--content-width));
		vertical-align: middle;
		padding: calc(0.01 * var(--content-width)) 0;
	}

	h1 img {
		width: calc(0.03 * var(--content-width));
		margin-right: calc(0.01 * var(--content-width));
	}

	h1:not(.v2)::before {
		content: '';
		display: block;
		position: absolute;
		width: 0.8rem;
		height: 80%;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		background-color: var(--text-color);
	}
</style>
