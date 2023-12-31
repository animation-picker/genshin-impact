<script>
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { assets } from '$lib/store/app-stores';
	import { playSfx } from '$lib/helpers/audio/audio';
	import Reset from './_reset.svelte';

	export let v2 = false;
	export let banner;
	let showSelectList = false;

	const list = ['beginner', 'character-event', 'weapon-event', 'standard'];
	$: nowOpenIndex = list.findIndex((type) => type === banner.toLocaleLowerCase());
	$: selected = nowOpenIndex < 0 ? 2 : nowOpenIndex;

	const selectBanner = getContext('selectBanner');
	const select = (bn) => {
		showSelectList = !showSelectList;
		selectBanner(bn);
		playSfx();
	};
</script>

<div class="selectType" class:v2>
	<div style="--bg:url({$assets['history-select-bg.webp']})" class="wish-type" class:v2>
		<span> {$t('history.selectWish')} </span>
		<div class="select-box">
			<button class="selected" on:click={() => (showSelectList = !showSelectList)}>
				<span>{@html $t(`wish.banner.${banner}`)}</span>

				{#if v2}
					<span class="arrow icon {showSelectList ? 'up' : 'down'}" />
				{:else}
					<i class="arrow gi-caret-{showSelectList ? 'up' : 'down'}" />
				{/if}
			</button>

			{#if showSelectList}
				<div class="select-list" transition:fade={{ duration: 200 }}>
					{#each list as type, i}
						<button class="item" class:active={selected === i} on:click={() => select(type)}>
							{@html $t(`wish.banner.${type}`)}
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</div>

	{#if v2}
		<div class="reset">
			<Reset {banner} v2 />
		</div>
	{/if}
</div>

<style>
	.selectType {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.reset {
		text-align: right;
	}

	.wish-type {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.wish-type span {
		padding: 5px;
	}

	.select-box {
		width: 270px;
		max-width: 100%;
		position: relative;
		margin: 0 15px;
	}

	.selected .arrow {
		position: absolute;
		top: 50%;
		right: 1rem;
		font-size: 2rem;
		transform: translateY(-50%);
	}

	.selected,
	.select-list {
		width: 100%;
		border: 0.15rem solid #b5b2ae;
		background-color: #dbd7d3;
		border-radius: 0.25rem;
	}
	.selected,
	.item {
		text-align: left;
		display: block;
		width: 100%;
		color: #757575;
		text-decoration: none;
		padding: 6px 15px;
		transition: background 0.2s;
	}
	.item.active,
	.item:hover {
		background-color: #efebe7;
	}

	.select-list {
		position: absolute;
		z-index: +1;
		top: 130%;
		left: 50%;
		transform: translateX(-50%);
	}

	@media screen and (max-width: 495px) {
		.wish-type:not(.v2) {
			flex-direction: column;
		}
	}

	:global(.mobile) .wish-type {
		font-size: 0.9em;
	}

	/* V2 */
	.wish-type.v2 {
		background-image: var(--bg);
		background-size: contain;
		background-repeat: no-repeat;
		aspect-ratio: 201/11;
		justify-content: flex-start;
		font-size: calc(0.014 * var(--content-width));
		margin-bottom: calc(0.005 * var(--content-width));
	}

	.wish-type.v2 > span {
		width: calc(0.23 * var(--content-width));
		text-align: right;
		line-height: 90%;
	}

	.v2 .select-box {
		width: 100%;
		margin: 0;
	}

	.v2 .selected {
		padding-left: calc(0.035 * var(--content-width));
		font-size: calc(0.014 * var(--content-width));
		color: var(--text-color);
		background-color: transparent;
		border: transparent;
	}

	.v2 .select-list {
		background-color: #646975;
		border: 0;
		border-radius: 1rem;
		overflow: hidden;
	}
	.v2 .item {
		color: #eee;
		padding: calc(0.02 * var(--content-width)) calc(0.03 * var(--content-width));
		position: relative;
		margin: 0.5% 1%;
		width: 98%;
	}

	.v2 .item.active,
	.v2 .item:hover {
		background-color: #717887;
		border-radius: 3rem;
	}

	.v2 .item.active::after {
		content: '✔';
		color: #eee;
		position: absolute;
		display: block;
		top: 50%;
		right: 5%;
		font-size: 170%;
		line-height: 0;
		transform: translateY(-50%);
	}

	.selectType.v2 .reset {
		width: calc(0.13 * var(--content-width));
		text-align: center;
	}

	.arrow.icon {
		width: calc(0.02 * var(--content-width));
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAASCAMAAAAJ4/xdAAAAY1BMVEVHcExZUlJZUVFVTU1YUVFYUVFZUVFZUlJZUlJYTU1ZUFBZUVFYUVFYT09ZRUVXTk5YUVFZUlJZQ0NYUVFZUVFZUlJZUVFZUlJYTk5ZUVFZUlJYT09ZUVFYUlJOTk5OTk5ZUlKPb9bhAAAAIHRSTlMAz+kiZfbk8foSSKpVNAgqsokLxqTbcsAbhNc6j5YGDUB/3r0AAACpSURBVBgZfcEFEoMwAATAC0Rxrcv9/5UFmjBAobtYKytj0hJ/JIYDk+CQtJxYiQM1Z1fsKVIudAV+uJYrZ4eNuOfGLcbKPaKnFL0ox0Km6EX5PaKnMsxODG4xEPf07Anek8HZYeBaBg+MmopB98KkSBlUDeAEgytmNYPWIaVnJRakpddB8cskWEkMvww0J7rERq456SE5Ehf8uAiOJJAJq+sGO94PbUWGD0o8IC9WAY0jAAAAAElFTkSuQmCC');
		background-size: contain;
		background-repeat: no-repeat;
	}
	.v2 .arrow.icon.up {
		transform: translateY(-50%) rotate(0);
	}

	.v2 .arrow.icon.down {
		transform: translateY(-50%) rotate(180deg);
	}
</style>
