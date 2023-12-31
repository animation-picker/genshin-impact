<script>
	import { page } from '$app/stores';
	import { getContext, onMount } from 'svelte';
	import Background from '$lib/components/RandomBackground.svelte';

	const loaded = getContext('isBannerLoaded');
	onMount(loaded);
</script>

<svelte:head>
	<title>Error {$page.status}</title>
</svelte:head>

<section>
	<Background />
	<div class="container">
		<i class="gi-primo-star top-left" />
		<i class="gi-primo-star top-right" />
		<i class="gi-primo-star bottom-left" />
		<i class="gi-primo-star bottom-right" />
		<i class="gi-inazuma icon-bg" />
		<h1>Error {$page.status}</h1>
		<h2>{$page.error.message}</h2>
		<p>We find some problem with the page you're looking for ..</p>
		<a href="/"> <i class="gi-reply" /> Back To The Beginning .. </a>
	</div>
</section>

<style>
	section {
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.container {
		position: relative;
		z-index: +1;
		width: 80%;
		height: 70%;
		background-color: #ece6de;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.gi-primo-star {
		color: #fdf0ac;
		font-size: 1.5rem;
		display: inline-block;
		position: absolute;
		filter: drop-shadow(0 0 7px rgba(227, 149, 48, 0.9));
	}
	.top-left {
		top: -0.8rem;
		left: -0.5rem;
		transform: rotate(-45deg);
	}
	.top-right {
		top: -0.8rem;
		right: -0.5rem;
		transform: rotate(45deg);
	}
	.bottom-left {
		bottom: -0.8rem;
		left: -0.5rem;
		transform: rotate(-135deg);
	}
	.bottom-right {
		bottom: -0.8rem;
		right: -0.5rem;
		transform: rotate(135deg);
	}
	.icon-bg {
		font-size: 17em;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #e4dcce;
		z-index: -1;
	}

	h1 {
		font-size: 2.5rem;
	}
	h2 {
		font-size: 1.2rem;
		padding: 0.6rem 0;
	}
	p {
		font-size: 1rem;
	}

	a {
		border-radius: 40px;
		color: white;
		background-color: #4a5265;
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
		padding: 5px 4rem 5px 5px;
		transition: all 0.2s;
		margin-top: 3rem;
	}

	a i {
		width: 2rem;
		height: 2rem;
		background-color: #353533;
		border-radius: 100%;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		font-size: 1rem;
		margin-right: 3rem;
		color: #ffc107;
	}
	a:hover {
		background-color: rgb(51, 57, 71);
	}
</style>
