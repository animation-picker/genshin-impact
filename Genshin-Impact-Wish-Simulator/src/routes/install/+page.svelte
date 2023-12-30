<script>
	import { onMount } from 'svelte';
	import { t } from 'svelte-i18n';
	import { APP_TITLE } from '$lib/env';
	import { isMobile } from '$lib/store/app-stores';
	import { html as tutorAndroid } from '$post/install-android.md';
	import { html as tutorWindows } from '$post/install-windows.md';

	let selected = 'windows';
	$: tutor = selected === 'android' ? tutorAndroid : tutorWindows;

	const select = (device) => {
		selected = device;
	};

	onMount(() => {
		if ($isMobile) return (selected = 'android');
		return;
	});
</script>

<svelte:head>
	<title>
		Install Instruction | {$t('title', { default: APP_TITLE })}
	</title>
</svelte:head>

<section>
	<header>
		<div class="brand">
			<a href="/" on:click|preventDefault={() => window.location.replace('/')}>
				WishSimulator.App
			</a>
		</div>
	</header>

	<div class="select-device">
		<button class:active={selected === 'android'} on:click={() => select('android')}>
			<i class="gi-android" /> Android
		</button>
		<button class:active={selected === 'windows'} on:click={() => select('windows')}>
			<i class="gi-windows" /> Windows
		</button>
	</div>

	<article class={selected}>
		{@html tutor}
	</article>

	<footer>
		<a href="/" on:click|preventDefault={() => window.location.replace('/')}>
			Start Wishing Now !
		</a>
	</footer>
</section>

<style>
	section {
		width: 100%;
		height: 100%;
		overflow-y: auto;
		position: relative;
		background-color: #ebebeb;
	}

	header {
		display: flex;
		padding: 1rem 2%;
		justify-content: space-between;
		background-color: rgb(20, 18, 15);
		width: 100%;
		position: sticky;
		top: 0;
		left: 0;
		z-index: +10;
		color: #fff;
		font-size: 1rem;
	}

	footer {
		text-align: right;
		margin: 2rem 0;
	}
	footer a:hover {
		text-decoration: none;
	}

	.select-device,
	footer {
		padding: 1rem 10%;
	}

	.select-device button,
	footer a {
		color: var(--text-color);
		margin: 0 0.25rem;
		opacity: 0.85;
		padding: 0.5rem 1.2rem;
		font-size: 1rem;
		border-radius: 12rem;
		border: 1px solid var(--text-color);
		transition: all 0.2s;
		display: inline-flex;
		align-items: center;
	}

	.select-device button.active,
	.select-device button:hover,
	footer a {
		background-color: var(--text-color);
		color: #fff;
	}

	.select-device button.active,
	footer a:hover {
		opacity: 1;
	}

	i {
		font-size: 100%;
		margin-right: 0.5rem;
	}

	article {
		color: var(--text-color);
		padding: 0 10%;
		font-size: 120%;
	}

	section :global(h1) {
		font-size: 1.7rem;
		text-align: left;
		background-color: #dadada;
		padding: 0.5rem 5%;
		position: relative;
		font-family: var(--genshin-font);
	}
	:global(.mobile) section :global(h1) {
		font-size: 1.3rem;
	}

	section :global(h1)::before {
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

	.android :global(h1 span) {
		color: #64ad15;
	}
	.windows :global(h1 span) {
		color: #3f8ed1;
	}
	section :global(h2) {
		padding: 1.5rem 0 0.5rem;
	}

	section :global(ul),
	section :global(ol) {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		padding-left: 1.5rem;
	}
	section :global(p) {
		padding: 0.4rem 0;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	section :global(img),
	section :global(video) {
		max-width: 100%;
		max-height: 75vh;
	}

	@media screen and (max-width: 780px) {
		:global(main):not(.mobile) article {
			padding: 3.5rem 5% 0;
		}

		:global(main):not(.mobile) article {
			padding: 0 5% !important;
		}
	}
</style>
