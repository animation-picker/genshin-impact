<script>
	import { mobileMode } from '$lib/store/app-stores';

	let containerWidth;
	let itemBasis = 100 / 2;
	let itemWidth;

	const setitemBasis = (cwidth, mbl) => {
		if (mbl) {
			itemBasis = 100 / 4;
			itemWidth = cwidth / 4;
			return;
		}

		if (cwidth >= 800) {
			itemBasis = 100 / 5;
			itemWidth = cwidth / 5;
			return;
		}
		if (cwidth >= 650) {
			itemBasis = 100 / 4;
			itemWidth = cwidth / 4;
			return;
		}
		if (cwidth >= 500) {
			itemBasis = 100 / 3;
			itemWidth = cwidth / 3;
			return;
		}

		itemBasis = 100 / 2;
		itemWidth = cwidth / 2;
		return;
	};
	$: setitemBasis(containerWidth, $mobileMode);
</script>

<div class="item-list" bind:clientWidth={containerWidth}>
	<div class="list-body" style="--column-basis:{itemBasis}%; --column-width:{itemWidth}px">
		<slot />
	</div>
</div>

<style>
	/* List */
	.item-list {
		height: calc(var(--content-height) * 0.78);
		margin: 15px 0;
		overflow-y: auto;
		overflow-x: hidden;
	}
	:global(.mobile) .item-list {
		margin: 5px 0 0;
		padding: 0;
	}

	.list-body {
		display: flex;
		flex-wrap: wrap;
	}

	@media screen and (max-width: 400px) {
		.list-body {
			justify-content: space-between;
			padding: 0 2.3%;
		}
	}
</style>
