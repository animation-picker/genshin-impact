<script>
	import { createEventDispatcher } from 'svelte';
	export let disabled = false;
	export let dark = false;

	const dispatch = createEventDispatcher();
	const click = () => dispatch('click');
</script>

<button on:click|preventDefault|stopPropagation={click} {disabled} class:dark>
	<slot />
</button>

<style>
	button {
		position: relative;
		border: 3.5px solid transparent;
		border-radius: 50px;
		background-color: #e0ddd4;
		box-shadow: 0 2px 2px 0 rgba(100, 100, 100, 0.2), 0 2px 2px 0 rgba(100, 100, 100, 0.19);
		padding: 0.25rem 1.5rem;
		margin: 2px 5px;
		transition: all 0.2s;
		border: solid transparent;
		font-size: 90%;
	}

	button.dark {
		color: white;
		background-color: #4a5265;
	}

	button:hover:not(:disabled) {
		border-color: #fff;
	}

	button:active:not(:disabled) {
		animation-name: colourchange;
		animation-duration: 0.2s;
		animation-fill-mode: forwards;
		transform: scale(0.95);
	}

	@keyframes colourchange {
		50% {
			color: #ffffda;
			background: #ede9cc;
		}
		100% {
			border-color: darkgray;
			color: white;
			background: linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)), #e0ddd4;
		}
	}

	:global(.mobile) button {
		margin: 1px 2px;
		padding: 0.15rem 1.3rem;
		font-size: 90%;
	}

	@media screen and (max-width: 900px) {
		button {
			margin: 2px 5px;
		}
	}

	@media screen and (max-width: 400px) {
		button {
			font-size: 120%;
			margin: 1px 2px;
		}
	}
</style>
