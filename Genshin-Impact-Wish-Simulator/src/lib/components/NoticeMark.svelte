<script>
	import { notice } from '$lib/store/app-stores';

	export let name = '';
	export let style = '';

	let active = false;

	$: {
		if (!Array.isArray(name)) {
			active = !$notice.includes(name);
		} else {
			const tmp = [];
			name.forEach((n) => tmp.push($notice.includes(n)));
			active = tmp.includes(false);
		}
	}
</script>

{#if active}
	<div class="notice" {style}>
		<span>i</span>
	</div>
{/if}

<style>
	.notice {
		position: absolute;
		right: 0.5rem;
		z-index: +1;
	}

	span {
		color: #fff;
		background-color: #de2f22;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		border-radius: 100%;
		aspect-ratio: 1/1;
		font-size: xx-small;
		padding: 0.3rem;
		line-height: 0;
	}

	:global(.mobile) span {
		font-size: 0.4rem;
		padding: 0.25rem;
	}
</style>
