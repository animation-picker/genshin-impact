<script>
	import { getContext } from 'svelte';

	export let dataLength;
	export let activepage;
	export let itemPerPage;
	export let v2 = false;

	const navigate = getContext('navigation');
	const previous = () => {
		if (activepage > 1) navigate(activepage - 1);
	};

	const next = () => {
		if (dataLength > activepage * itemPerPage) navigate(activepage + 1);
	};
</script>

<div class="pagination" class:v2>
	<button class="prev" disabled={activepage === 1} on:click={previous}>
		{#if v2}
			<span class="left arrow" />
		{:else}
			<i class="gi-angle-left" />
		{/if}
	</button>
	<span class="active">{activepage}</span>
	<button class="next" disabled={!(dataLength > activepage * itemPerPage)} on:click={next}>
		{#if v2}
			<span class="right arrow" />
		{:else}
			<i class="gi-angle-right" />
		{/if}
	</button>
</div>

<style>
	.pagination {
		display: flex;
		width: 100%;
		margin: 10px;
		text-align: center;
		justify-content: center;
	}

	.pagination button,
	.pagination span {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		aspect-ratio: 1/1;
		border-radius: 2px;
		margin: 5px;
	}
	.pagination button {
		background-color: #c3a280;
		color: #d7cbbd;
	}
	.pagination span {
		background-color: #918981;
		color: #fff;
	}

	/* V2 */
	.pagination.v2 {
		margin: 1% 0 0;
		font-size: calc(0.02 * var(--content-width));
		color: #8e8e8e;
	}

	.pagination.v2 > button,
	.pagination.v2 span {
		width: calc(0.028 * var(--content-width));
		margin: 0 2%;
		background-color: transparent;
	}

	.pagination.v2 span {
		color: var(--text-color);
	}
	.pagination.v2 button {
		border-radius: 100%;
		border: 2px solid #d7cbbd;
	}

	span.arrow {
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAASCAMAAAAJ4/xdAAAAY1BMVEVHcExZUlJZUVFVTU1YUVFYUVFZUVFZUlJZUlJYTU1ZUFBZUVFYUVFYT09ZRUVXTk5YUVFZUlJZQ0NYUVFZUVFZUlJZUVFZUlJYTk5ZUVFZUlJYT09ZUVFYUlJOTk5OTk5ZUlKPb9bhAAAAIHRSTlMAz+kiZfbk8foSSKpVNAgqsokLxqTbcsAbhNc6j5YGDUB/3r0AAACpSURBVBgZfcEFEoMwAATAC0Rxrcv9/5UFmjBAobtYKytj0hJ/JIYDk+CQtJxYiQM1Z1fsKVIudAV+uJYrZ4eNuOfGLcbKPaKnFL0ox0Km6EX5PaKnMsxODG4xEPf07Anek8HZYeBaBg+MmopB98KkSBlUDeAEgytmNYPWIaVnJRakpddB8cskWEkMvww0J7rERq456SE5Ehf8uAiOJJAJq+sGO94PbUWGD0o8IC9WAY0jAAAAAElFTkSuQmCC');
		background-size: contain;
		background-repeat: no-repeat;
		width: calc(0.01 * var(--content-width));
		aspect-ratio: 2.5/1;
		transform-origin: 40%;
	}
	.arrow.left {
		transform: rotate(-90deg) translateY(10%);
	}
	.arrow.right {
		transform: rotate(90deg) translateY(-40%);
	}

	button:disabled span {
		opacity: 0.3;
	}
</style>
