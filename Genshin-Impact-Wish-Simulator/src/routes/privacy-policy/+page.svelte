<script>
	import { t } from 'svelte-i18n';
	import { APP_TITLE } from '$lib/env';
	import { html } from '$post/privacy.md';
</script>

<svelte:head>
	<title>
		Privacy Policy | {$t('title', { default: APP_TITLE })}
	</title>
</svelte:head>

<section>
	<header>
		<h1>Privacy Policy for WishSimulator.App</h1>
		<h2>Genshin Impact Wish Simulator</h2>
	</header>

	<article>
		{@html html}
	</article>
</section>

<style>
	section {
		width: 100%;
		height: 100%;
		overflow-y: auto;
		background-color: #ebebeb;
	}

	header {
		height: 20em;
		background-color: #458a74;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #fff;
		background-image: url('https://user-images.githubusercontent.com/13815468/200537311-398f386d-00c3-4a5c-a338-54588c79095b.jpg');
		background-size: cover;
		position: relative;
	}
	header::after {
		content: '';
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.55);
	}
	header h1,
	header h2 {
		position: relative;
		z-index: +1;
	}

	header h1 {
		font-size: 2rem;
	}

	header h2 {
		font-size: large;
		margin-top: 1rem;
	}

	article {
		color: var(--text-color);
		padding: 2% 10%;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	article :global(h2) {
		font-family: var(--genshin-font);
		padding: 1.5rem 0 0.5rem;
	}

	article :global(p) {
		padding: 0.4rem 0;
	}

	article :global(a) {
		color: #dda04f;
	}

	article :global(ul) {
		list-style-position: inside;
	}

	@media screen and (max-width: 900px) {
		header h1 {
			font-size: 1.2rem;
		}
		header h2 {
			font-size: 1rem;
			margin-top: 0.5rem;
		}

		article {
			padding: 2% 5%;
		}
	}
</style>
