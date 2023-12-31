<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dismissToast } from '$lib/helpers/toast';
	import { toastMsg } from '$lib/store/app-stores';
	import Toast from './Toast.svelte';
</script>

<!-- {#if $toastMsg}
	<div class="toasts">
		{#each $toastMsg as { type, id, dismissible, message, autoclose, timeout } (id)}
			<div class="toast-item" animate:flip={{ duration: (i) => 25 * Math.sqrt(i) }}>
				<Toast {type} {dismissible} {autoclose} {timeout} on:dismiss={() => dismissToast(id)}>
					{message}
				</Toast>
			</div>
		{/each}
	</div>
{/if} -->

<style>
	.toasts {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		display: flex;
		margin-top: 1rem;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		pointer-events: none;
		z-index: 1000;
	}
</style>
