<script>
	import { playSfx } from '$lib/helpers/audio/audio';
	import { getContext } from 'svelte';

	export let selected = '';
	const visionList = ['pyro', 'hydro', 'anemo', 'electro', 'dendro', 'cryo', 'geo'];
	const setVision = getContext('setVision');
	const pickVision = (vision) => {
		if (selected === vision) return;
		setVision(vision);
		playSfx('click2');
	};
</script>

<div class="vision-picker">
	{#each visionList as vision}
		{@const isActive = selected === vision}
		<button
			class:active={isActive}
			class={isActive ? `bg-${vision}` : ''}
			on:click={() => pickVision(vision)}
		>
			<i class="gi-{vision} {!isActive ? `${vision}-flat` : ''}" />
		</button>
	{/each}
</div>

<style>
	.vision-picker {
		position: absolute;
		top: 0;
		right: 0;
		transform: translateY(-100%);
		display: flex;
		width: 100%;
		justify-content: flex-end;
		z-index: +10;
	}

	button {
		font-size: 150%;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		line-height: 0;
		padding: 1%;
		border: 1px solid #ccc;
		transition: all 0.25s;
	}

	button.active {
		color: #fff;
		border-color: transparent;
	}
	button:not(.active) {
		background-color: #fff;
	}
	button:hover:not(.active) {
		background-color: #ecedda;
	}
	button:active:not(.active) {
		transform: scale(0.9);
	}
</style>
