<script>
	import { getContext, onDestroy, onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import hotkeys from 'hotkeys-js';

	import { assets } from '$lib/store/app-stores';
	import { playSfx } from '$lib/helpers/audio/audio';
	import Icon from './Icon.svelte';

	export let data = [{ item: 'primogem', qty: 0 }];

	const checkRarity = (item) => {
		return item === 'stardust' ? 4 : 5;
	};
	const closeObtained = getContext('closeObtained');
	onMount(() => playSfx('obtain'));

	// Shortcut;
	const currentScope = hotkeys.getScope();
	hotkeys('*', 'obtain', (e) => {
		e.preventDefault();
		closeObtained();
	});

	hotkeys.setScope('obtain');
	onDestroy(() => hotkeys.deleteScope('obtain', currentScope));
</script>

<section on:mousedown={closeObtained}>
	<div class="container">
		<div class="bg" />
		<div class="content" in:scale={{ start: 0, duration: 200 }}>
			<h3 class="title">
				{$t('obtained')}
				<i class="gi-primo-star" />
			</h3>

			<h4>{$t('extra')}</h4>
			<div class="milestone">
				{#each data as { item, qty }}
					{#if qty > 0}
						<div class="item {item}" on:mousedown|stopPropagation>
							<div class="body">
								<div
									class="pic"
									style="--bg: url('{$assets[`${checkRarity(item)}star-bg.webp`]}');"
								>
									<Icon width="100%" type={item} />
									<div class="star">
										{#each Array(checkRarity(item)) as _}
											<i class="gi-star" />
										{/each}
									</div>
								</div>
								<span>{qty}</span>
							</div>
							<div class="name">
								{$t(`shop.item.${item}`)}
							</div>
						</div>
					{/if}
				{/each}
			</div>

			<h4 class="msg">{$t('pressToContinue')}</h4>
		</div>
	</div>
</section>

<style>
	section {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
		color: #000;
	}
	.container {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.bg {
		min-width: 100vw;
		min-height: 100%;
		position: absolute;
		z-index: -1;
		left: 0;
		background-image: linear-gradient(to top, rgba(136, 132, 133, 0.93), rgba(39, 34, 54, 0.93));
	}

	.content {
		display: flex;
		flex-direction: column;
		max-width: 80%;
		width: 35rem;
		text-align: center;
	}

	:global(.mobile) .content {
		transform: scale(0.85);
	}

	h3 {
		color: #beb99c;
		font-weight: 100;
		padding: 0.5rem;
		border-bottom: 0.01rem solid #959187;
	}
	h4 {
		color: #ede5d8;
		padding: 0.8rem;
		font-weight: 100;
	}
	h4.msg {
		border-top: 0.01rem solid #959187;
		margin-top: 1.5rem;
	}
	i.gi-primo-star {
		font-size: 0.7rem;
		vertical-align: top;
	}

	.milestone {
		display: flex;
		width: 100%;
		justify-content: center;
	}

	.item {
		margin: 0.25rem;
	}
	.item,
	.body {
		display: block;
		border-radius: 0.4rem;
		overflow: hidden;
		width: 5rem;
	}
	.body {
		background-color: #fff;
	}

	.acquaint .pic,
	.intertwined .pic {
		padding: 0.55rem;
	}

	.pic {
		background-image: var(--bg);
		background-size: cover;
		position: relative;
		border-bottom-right-radius: 0.8em;
	}
	.star {
		position: absolute;
		left: 50%;
		bottom: -0.6rem;
		transform: translateX(-50%);
	}
	.gi-star {
		color: #eac343;
		font-size: 0.9rem;
	}
	span {
		font-size: 0.7rem;
		display: block;
		line-height: 1rem;
	}
	.name {
		font-size: 0.7rem;
		white-space: pre-wrap;
		width: 5rem;
		color: #ede5d8;
		line-height: 0.9rem;
		margin-top: 0.3rem;
	}
</style>
