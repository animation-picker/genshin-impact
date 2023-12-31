<div class="column">
	<slot />
</div>

<style>
	.column {
		flex-basis: var(--column-basis);
		width: var(--column-basis);
		aspect-ratio: 1/1;
		overflow: auto;
		padding: calc(0.06 * var(--column-width));
		display: block;
	}

	@media screen and (min-width: 1440px) {
		.column {
			--column-width: 200px;
			flex-basis: unset;
			width: 200px;
		}
	}

	@media screen and (max-width: 890px) {
		.column {
			min-width: 150px;
			min-height: 150px;
		}

		:global(.mobile) .column {
			min-width: 130px;
			min-height: 130px;
		}
	}

	@media screen and (max-width: 400px) {
		.column {
			min-width: 100px;
			min-height: 100px;
		}
	}
</style>
