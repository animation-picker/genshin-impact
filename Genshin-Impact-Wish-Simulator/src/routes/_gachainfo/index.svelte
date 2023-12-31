<script>
	import { getContext, setContext } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import hotkeys from 'hotkeys-js';

	import { assets } from '$lib/store/app-stores';
	import { cookie } from '$lib/helpers/dataAPI/api-cookie';
	import { localConfig } from '$lib/helpers/dataAPI/api-localstore';
	import { playSfx } from '$lib/helpers/audio/audio';

	import Book from './_book-bg.svelte';
	import Details from './details/Details.svelte';
	import History from './history/History.svelte';

	export let page = '';

	const animatedBG = localConfig.get('animatedBG');

	const navigate = getContext('navigate');
	const handleCLose = () => {
		navigate('index');
		playSfx('close');
	};
	setContext('close-detail', handleCLose);

	let tplVersion = cookie.get('detail-tpl') || 'v2';
	const setTpl = (v) => {
		cookie.set('detail-tpl', v);
		tplVersion = v;
	};
	setContext('detail-tpl', setTpl);

	// shortcut
	hotkeys('esc', page, (e) => {
		e.preventDefault();
		handleCLose();
	});
</script>

<section
	transition:fade={{ duration: 200 }}
	class:v2={tplVersion === 'v2'}
	class:animatedBG
	style="--bg:url({$assets['wish-background.webp']})"
>
	{#if tplVersion !== 'v2'}
		<div class="header" in:fly={{ y: -25 }}>
			<button on:click={handleCLose}>
				<i class="gi-reply" />
			</button>

			<button class="switchNewTpl" on:click={() => setTpl('v2')}> {$t('history.switchv2')} </button>
		</div>
	{/if}

	<div class="content-details {page}" class:v2={tplVersion === 'v2'}>
		<Book {tplVersion}>
			{#if page === 'details'}
				<Details {tplVersion} />
			{:else if page === 'history'}
				<History {tplVersion} />
			{/if}
		</Book>
	</div>
</section>

<style>
	section {
		background-color: #ebebeb;
		width: 100%;
		height: 100%;
		color: var(--text-color);
		overflow-y: auto;
		position: relative;
		z-index: +1;
	}

	section.v2 {
		background-color: transparent;
		position: absolute;
		top: 0;
		left: 0;
	}

	.content-details:not(.v2) {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	.content-details :global(h1),
	.content-details :global(.pop-footer button) {
		font-family: var(--genshin-font);
	}

	.header {
		display: flex;
		padding: 0 2%;
		justify-content: space-between;
		background-color: rgb(20, 18, 15);
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: +10;
	}

	.gi-reply {
		color: #dbd7d3;
		font-size: 2.2rem;
		line-height: 0;
		padding: 0.3rem 1rem;
		display: inline-block;
	}
	.switchNewTpl {
		color: darkgoldenrod;
		text-decoration: underline;
		transition: all 0.3s;
	}
	.switchNewTpl:hover {
		color: rgb(255, 238, 213);
	}

	.content-details {
		padding: 4rem 10% 1rem;
		width: 100%;
		overflow-x: hidden;
	}

	.content-details.v2 {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 10%;
		overflow-x: auto;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		background-position: 20%;
		background-image: var(--bg);
	}
	.animatedBG .content-details.v2 {
		background-image: unset;
	}

	.content-details.v2::-webkit-scrollbar {
		display: none;
	}

	:global(.mobile) .content-details.v2 {
		padding-left: 0;
		padding-right: 0;
	}

	@media screen and (max-width: 780px) {
		:global(main):not(.mobile) .content-details {
			padding: 3.5rem 5% 0;
		}

		:global(main):not(.mobile) .content-details.v2 {
			padding: 0 5% !important;
		}
	}
</style>
