<script>
	import { getContext } from 'svelte';
	import { fly } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { assets } from '$lib/store/app-stores';

	export let tplVersion;

	let contentWidth;
	const close = getContext('close-detail');
	const setTpl = getContext('detail-tpl');

	const customFLy = (node, args) => {
		if (args.tpl !== 'v2') return;
		return fly(node, args);
	};
</script>

{#if tplVersion !== 'v2'}
	<slot />
{:else}
	<div class="content-container" transition:customFLy={{ y: 25, tpl: tplVersion }}>
		<button class="old" on:click={() => setTpl('v1')}> {$t('history.olderLayout')}</button>
		<div class="wrapper">
			<div
				class="book"
				bind:clientWidth={contentWidth}
				style="--content-width:{contentWidth}px; --bg:url({$assets['book.webp']})"
			>
				<button class="tutup" on:click={close} />
				<div class="book-content">
					<slot />
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.content-container {
		min-width: 90%;
		height: 50vh;
		position: relative;
	}

	.wrapper {
		width: 100%;
		height: 100%;
		overflow-x: auto;
	}
	.wrapper::-webkit-scrollbar {
		display: none;
	}

	.tutup {
		width: calc(0.035 * var(--content-width));
		aspect-ratio: 1/1;
		position: absolute;
		top: 6%;
		right: 2%;
	}

	.old {
		position: absolute;
		z-index: +2;
		bottom: 5%;
		left: 50%;
		transform: translateX(-50%) translateY(200%);
		text-decoration: underline;
		transition: all 0.2s;
	}
	.old:hover {
		color: goldenrod;
	}

	.book {
		position: relative;
		display: block;
		margin: auto;
		height: 50vh;
		max-height: 900px;
		aspect-ratio: 487/257;
		background-size: cover;
		background-image: var(--bg);
		padding: calc(0.015 * var(--content-width)) calc(0.09 * var(--content-width));
	}

	@media screen and (min-width: 700px) {
		.content-container,
		.book {
			height: unset !important;
			width: 95%;
		}
	}

	:global(.mobile) .content-container,
	:global(.mobile) .book {
		height: 85vh !important;
		width: auto;
	}

	.book-content {
		width: 100%;
		height: 93%;
		display: flex;
		flex-direction: column;
	}
</style>
