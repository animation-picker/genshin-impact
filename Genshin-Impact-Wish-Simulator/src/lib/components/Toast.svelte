<script>
	import { createEventDispatcher } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	export let type = 'info';
	export let dismissible = false;
	export let timeout = 0;
	export let autoclose = true;

	const dispatch = createEventDispatcher();
	const duration = timeout ? `${timeout / 1000}s` : '0s';
</script>

<div
	class="toast {type}"
	class:dismissible
	class:autoclose={autoclose && timeout > 0}
	role="alert"
	style="--duration: {duration}"
	in:fly|local={{ y: -20 }}
	out:fade={{ duration: 200 }}
>
	<div class="text">
		<slot />
	</div>

	{#if dismissible}
		<button class="dismiss" on:click={() => dispatch('dismiss')}>
			<i class="gi-times" />
		</button>
	{/if}
</div>

<style>
	.toast {
		pointer-events: initial;
		padding: 0.5rem 1.5rem 0.7rem;
		text-align: center;
		border-top-right-radius: 0.3rem;
		border-top-left-radius: 0.3rem;
		min-width: 10rem;
		max-width: 20rem;
		margin: 0.2rem;
		background-color: var(--tertiary-color);
		color: #4a5265;
		font-size: 80%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		box-shadow: 0 0 1rem rgba(0, 0, 0, 0.4);
	}

	.toast.autoclose::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		border-bottom: #4a5265 0.2rem solid;
		animation: scaleX forwards linear;
		transform-origin: 0%;
		animation-duration: var(--duration);
	}

	.toast.dismissible {
		padding-right: 0.75rem;
	}

	.toast.error {
		color: #d14a29;
	}
	.toast.error::after {
		border-color: #d14a29;
	}

	.toast.success {
		color: #359697;
	}
	.toast.success::after {
		border-color: #359697;
	}

	button {
		color: inherit;
		background: transparent;
		border: 0 none;
		padding: 0;
		line-height: 0;
		font-size: 80%;
		margin-left: auto;
		aspect-ratio: 1/1;
		padding: 0.25rem;
		transform: scale(1.2);
	}

	@keyframes scaleX {
		0% {
			transform: scaleX(100%);
		}
		100% {
			transform: scaleX(0%);
		}
	}
</style>
