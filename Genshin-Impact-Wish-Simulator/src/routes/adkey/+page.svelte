<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { playSfx } from '$lib/helpers/audio/audio';
	import { assets } from '$lib/store/app-stores';
	import { adKey } from '$lib/helpers/accessKey';
	import ButtonModal from '$lib/components/ButtonModal.svelte';

	const random = (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	let input = '';
	let error = false;
	let isKeyValid = false;
	let onRequest = false;

	const accessGranted = () => {
		const t = setTimeout(() => {
			clearTimeout(t);
			window.location.replace('/');
		}, 3000);
	};

	const requestAccess = async () => {
		playSfx();
		onRequest = true;
		const { validity } = await adKey.verify(input);
		error = !validity;
		isKeyValid = validity;
		onRequest = false;
		if (error) return;
		accessGranted();
	};

	const getKeyParam = () => {
		const url = new URL(window.location.href);
		const searchParams = new URLSearchParams(url.search);
		const key = searchParams.get('k');
		input = key || '';
	};

	onMount(getKeyParam);
</script>

<svelte:head>
	<title>Genshin Impact Wish Simulator</title>
</svelte:head>

<section in:fly={{ x: -200, duration: 200 }}>
	<img class="bg" src={$assets[`bg${random(1, 20)}.webp`]} alt="background" />
	<div class="container">
		<i class="gi-primo-star top-left" />
		<i class="gi-primo-star top-right" />
		<i class="gi-primo-star bottom-left" />
		<i class="gi-primo-star bottom-right" />
		<i class="gi-inazuma icon-bg" />

		<h1>Genshin Impact Wish Simulator</h1>
		<h2>This Page is only available for supporters.</h2>

		<form class="form" on:submit|preventDefault={requestAccess}>
			<div class="input">
				<input type="text" bind:value={input} placeholder="Input Access Key" class:error />
				{#if error}
					<span class="error">
						Wrong Access Key, please get <a
							href="https://ko-fi.com/post/AdFree-Wish-Simulator-Enjoy-Simulator-Without-Ads-G2G2DQ57O"
							target="_blank"
						>
							<strong> New One Here ! </strong>
						</a>
					</span>
				{/if}

				{#if isKeyValid}
					<span class="valid"> Congratulation, now you can enjoy the app without any ads! </span>
				{/if}
			</div>
			<div class="button">
				<ButtonModal disabled={onRequest || !input || isKeyValid} on:click={requestAccess}>
					{onRequest ? 'Waiting...' : isKeyValid ? 'Redirecting ...' : 'Start Simulator'}
				</ButtonModal>
			</div>
		</form>

		<p>
			<a
				href="https://ko-fi.com/post/AdFree-Wish-Simulator-Enjoy-Simulator-Without-Ads-G2G2DQ57O"
				target="_blank"
			>
				<strong> Become a supporter here </strong>
			</a> and get a opportunity to use the simulator without being distracted by Ads !
		</p>
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

	.bg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 110%;
		height: 110%;
		object-fit: cover;
		filter: blur(5px);
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
		font-size: 200%;
		line-height: 120%;
	}
	h2 {
		font-size: 120%;
		line-height: 120%;
		padding: 0.6rem 0;
	}
	p {
		font-size: 105%;
		display: block;
		margin: 0 auto;
		width: 80%;
	}

	@media screen and (max-width: 900px) {
		p {
			font-size: 120%;
		}
	}

	.form {
		margin: 3vh 0;
		width: 100%;
	}

	.input {
		width: 80%;
		max-width: 30rem;
		text-align: center;
		display: block;
		margin: 0 auto;
	}

	input {
		width: 100%;
		padding: 0 1.5rem;
		height: 3rem;
		display: block;
		border-radius: 3rem;
		border: #c3b8a5 1px solid;
		outline: none;
		transition: all 0.2s;
	}

	input:focus {
		box-shadow: 0 0 0.4rem rgba(227, 149, 48, 0.7);
	}

	input.error {
		border: #de2f22 1px solid;
	}
	input.error:focus {
		box-shadow: 0 0 0.4rem rgba(222, 47, 34, 0.7);
	}
	.button {
		margin-top: 1.5vh;
	}

	.error {
		color: #de2f22;
	}

	.valid {
		color: #64ad15;
	}
</style>
