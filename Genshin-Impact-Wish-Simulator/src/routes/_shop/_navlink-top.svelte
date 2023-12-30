<div class="nav-item-list">
	<slot />
</div>

<style>
	div {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		border-top: 1px solid #d2c69c;
		border-bottom: 1px solid #d2c69c;
		width: fit-content;
		margin-top: 1%;
		background-image: linear-gradient(
			to right,
			rgba(0, 0, 0, 0),
			rgba(0, 0, 0, 0.5),
			rgba(0, 0, 0, 0.5),
			rgba(0, 0, 0, 0.5),
			rgba(0, 0, 0, 0)
		);
	}
	:global(.mobile) div {
		flex-wrap: nowrap;
	}
</style>
