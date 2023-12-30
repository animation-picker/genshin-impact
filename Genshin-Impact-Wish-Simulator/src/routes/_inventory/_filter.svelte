<script>
	import { getContext, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { playSfx } from '$lib/helpers/audio/audio';

	export let activeItem;
	export let itemQty;
	export let showAll;
	export let orderby;

	const showAllInventory = getContext('showAll');
	const order = getContext('orderby');
	const reverse = getContext('reverse');

	let showOrderOption = false;
	const handleShowOrderOption = () => {
		playSfx();
		showOrderOption = !showOrderOption;
	};

	const selectOrder = (val) => {
		order(val);
		handleShowOrderOption();
	};

	const handleShowAll = ({ target }) => {
		playSfx();
		showAllInventory(target.checked);
	};

	onMount(() => {
		const section = document.querySelector('section');
		section.addEventListener('mousedown', () => (showOrderOption = false));
	});
</script>

<div class="filter">
	<div class="row">
		<button class="btn reverse" on:click={reverse} title="Reverse Order">
			<i class="gi-exchange" />
		</button>
		<div class="selector" on:mousedown|stopPropagation>
			<button class="selected-option" on:click={handleShowOrderOption}>
				{$t('inventory.sort')} / {$t(`inventory.${orderby}`)}

				{#if showOrderOption}
					<i class="gi-caret-up" />
				{:else}
					<i class="gi-caret-down" />
				{/if}
			</button>

			{#if showOrderOption}
				<div class="option-list above" transition:fade={{ duration: 200 }}>
					{#each ['release', 'rarity', 'name', 'quantity'] as val}
						<button class:selected={orderby == val} on:click={() => selectOrder(val)}>
							{$t(`inventory.${val}`)}
						</button>
					{/each}

					{#if activeItem === 'character'}
						<button class:selected={orderby == 'element'} on:click={() => selectOrder('element')}>
							{$t(`inventory.element`)}
						</button>
					{/if}

					{#if activeItem === 'weapon'}
						<button class:selected={orderby == 'type'} on:click={() => selectOrder('type')}>
							{$t(`inventory.type`)}
						</button>
					{/if}
				</div>
			{/if}
		</div>
		<div class="showAll">
			<input
				type="checkbox"
				name="showAll"
				id="showAll"
				bind:checked={showAll}
				on:change={handleShowAll}
			/>
			<label for="showAll">
				<i>✔</i>
				{$t(`inventory.showAllOption`, {
					values: { item: $t(activeItem) }
				})}
				<span> {itemQty.owned}/{itemQty.all}</span>
			</label>
		</div>
	</div>
</div>

<style>
	.filter {
		height: 3rem;
		width: 100%;
	}

	.filter .row {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		padding: 0 2%;
	}

	.selector button {
		width: 100%;
	}
	.showAll {
		margin-left: 0.5rem;
		color: var(--tertiary-color);
		text-transform: capitalize;
	}
	label {
		cursor: inherit;
	}
	.showAll input + label i {
		color: white;
		display: inline-block;
		padding: 0.1rem 0.2rem 0.1rem 0.1rem;
		line-height: 1rem;
		background-color: #fff;
		border: 1px solid transparent;
		transition: all 0.2s;
	}
	.showAll input:checked + label i {
		background-color: #06bbff;
	}

	.showAll:hover input + label i {
		border: 1px solid #06bbff;
		box-shadow: rgba(106, 168, 230, 0.6) 0px 0px 7px 5px;
	}

	.showAll input {
		display: none;
	}
</style>
