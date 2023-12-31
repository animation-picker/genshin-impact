<script>
	import { t } from 'svelte-i18n';
	import { fly } from 'svelte/transition';
	import { getContext } from 'svelte';
	import { viewportHeight } from '$lib/store/app-stores';
	import { playSfx } from '$lib/helpers/audio/audio';
	import { getAllChars } from '$lib/helpers/gacha/wishBase';
	import InventoryItem from '../../_inventory/_inventory-item.svelte';

	export let exclude = [];
	const chars = getAllChars(4).filter(({ name }) => !exclude.includes(name));
	const selectChar = getContext('selectChar');
	const pickChar = (char) => {
		selectChar(char);
		playSfx('click2');
	};
</script>

<div class="picker" transition:fly={{ y: $viewportHeight, duration: 250 }}>
	<div class="row">
		{#each chars as char}
			<button class="item" on:click={() => pickChar(char.name)}>
				<InventoryItem itemdata={{ ...char, localName: $t(`${char.name}.name`) }} />
			</button>
		{/each}
	</div>
</div>

<style>
	.picker {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background-color: #e2dbce;
		z-index: +1;
		overflow-y: auto;
		padding: 1% 0 5%;
	}

	.row {
		display: flex;
		flex-wrap: wrap;
	}

	.item {
		margin: calc(0.025 * var(--item-width));
		aspect-ratio: 8.75 / 10;
		width: 23.5%;
	}
</style>
