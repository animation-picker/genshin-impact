<script>
	import { getContext } from 'svelte';
	import { playSfx } from '$lib/helpers/audio/audio';
	import Icon from './Icon.svelte';

	export let type = 'primogem';
	export let plusbutton = false;
	const allowAddition = type === 'primogem' && plusbutton;

	const openConvertModal = getContext('openConvertModal');
	const openModal = () => {
		if (!allowAddition) return;
		openConvertModal();
		playSfx('modal');
	};
</script>

<button class={type} class:increament={allowAddition} on:click={openModal}>
	<Icon
		{type}
		height="80%"
		width="auto"
		style="position: absolute; left: 5px;top: 50%; transform: translateY(-50%);"
	/>
	<slot />
	{#if allowAddition}
		<span> <i class="gi-plus" /> </span>
	{/if}
</button>

<style>
	.primogem span {
		width: 1.2rem;
		height: 1.2rem;
		color: rgba(0, 0, 0, 0.7);
		background-color: #e0ddd4;
		border-radius: 100%;
		position: absolute;
		right: 3px;
		top: 50%;
		font-size: 110%;
		line-height: 0;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		transform: translateY(-50%);
		transition: all 0.2s;
	}

	.primogem.increament {
		padding-right: 2rem !important;
	}

	.primogem:active span {
		transform: translateY(-50%) scale(0.9);
		color: #fff;
		border-color: darkgray;
	}

	.primogem:hover span {
		border-color: #fff;
		box-shadow: rgb(160 175 190 / 60%) 0px 0px 7px 5px;
	}

	button {
		display: inline-block;
		height: 25px;
		overflow: hidden;
		background-color: rgba(0, 0, 0, 0.3);
		border-radius: 50px;
		color: #fff;
		vertical-align: middle;
		text-align: center;
		position: relative;
		margin: 0 10px 0 0;
		padding: 0 1rem 0 1.85rem;
		border: 0.7px solid #656565;
	}

	@media screen and (max-width: 900px) {
		button {
			height: 20px;
			margin: 0 3px;
		}
	}

	@media screen and (max-width: 400px) {
		.primogem {
			margin-bottom: 2px;
		}

		.gi-plus {
			right: 2px;
			transform: translateY(-50%) scale(0.9);
		}
	}
</style>
