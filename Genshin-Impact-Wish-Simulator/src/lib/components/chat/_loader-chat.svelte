<script>
	let activeIconIndex = 0;
	const iconList = ['pyro', 'hydro', 'anemo', 'electro', 'dendro', 'cryo', 'geo'];

	setInterval(() => {
		activeIconIndex = activeIconIndex === iconList.length - 1 ? 0 : activeIconIndex + 1;
	}, 1500);
</script>

<div class="initializing">
	<div class="icons">
		{#each iconList as element, i}
			<span class="icon" class:active={activeIconIndex === i}>
				<i class="gi-{element} {element}-flat" />
			</span>
		{/each}
	</div>
	<caption>
		<span>Initializing</span>
	</caption>
</div>

<style>
	.initializing {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	i {
		font-size: 300%;
	}

	span.icon {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
		opacity: 0;
		transition: 1s;
	}

	span.icon.active {
		opacity: 1;
	}

	caption {
		color: rgba(210, 198, 156, 1);
		font-size: 80%;
		position: absolute;
		top: 57%;
		left: 50%;
		transform: translateX(-50%);
	}

	caption span::after {
		content: '';
		padding-left: 2%;
		animation: infinite dot 2s;
	}

	@keyframes dot {
		0% {
			content: '';
		}
		25% {
			content: '.';
		}
		50% {
			content: '..';
		}
		75% {
			content: '...';
		}
		100% {
			content: '...';
		}
	}
</style>
