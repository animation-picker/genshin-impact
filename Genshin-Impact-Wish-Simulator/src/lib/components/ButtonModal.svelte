<script>
	import { createEventDispatcher } from 'svelte';
	import { t } from 'svelte-i18n';

	const isSlotpresent = $$props.$$slots;
	export let type = 'confirm';
	export let text = '';
	export let disabled = false;
	export let light = false;
	export let width = '';
	export let icon = '';

	const dispatch = createEventDispatcher();
	const click = () => dispatch('click');
</script>

<button
	on:click|preventDefault={click}
	{disabled}
	class:light
	style={width ? `width:${width}` : ''}
>
	{#if icon}
		<i class="gi-{icon}" />
	{:else if type === 'confirm'}
		<i class="gi-circle-o" />
	{:else}
		<i class="gi-times" />
	{/if}

	{#if isSlotpresent}
		<slot />
	{:else}
		<span>
			{text || (type === 'confirm' ? $t('confirmButton') : $t('cancelButton'))}
		</span>
	{/if}
</button>

<style>
	button {
		border-radius: 40px;
		align-items: center;
		padding: 0 0 0 0.3em;
		max-width: 100%;
		height: 2.3rem;
		transition: all 0.2s;
		position: relative;
		text-align: center;
		border: 3.5px solid transparent;
		transition: all 0.2s;
		width: 200px;
	}
	button.light {
		background-color: #ece5d8;
		color: #4a5265;
	}

	button:not(.light) {
		color: white;
		background-color: #4a5265;
	}

	button:active:not(:disabled) {
		transform: scale(0.9);
		background-color: #e0ddd4 !important;
		border-color: rgb(195, 195, 195) !important;
		box-shadow: rgb(160 175 190 / 60%) 0px 0px 7px 5px;
		color: #fff;
	}

	button:disabled {
		opacity: 0.7;
	}

	button i {
		width: 1.7rem;
		height: 1.7rem;
		background-color: #353533;
		border-radius: 100%;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		font-size: 0.8rem;
		position: absolute;
		left: 2%;
		top: 50%;
		transform: translateY(-50%);
	}
	button:hover:not(:disabled) {
		background-color: rgb(51, 57, 71);
	}

	button.light:hover:not(:disabled) {
		background-color: #c3b8a1;
	}

	button i {
		color: #ffc107;
	}
	button i.gi-times {
		color: #3f9ad1;
	}

	:global(.mobile) button {
		height: 2.1rem;
	}
	:global(.mobile) button:not(.light) {
		width: 130px;
	}

	@media screen and (max-width: 700px) {
		:global(main):not(.mobile) button {
			font-size: 0.85rem;
		}
		:global(main):not(.mobile) button:not(.light) {
			width: 120px;
		}
	}
</style>
