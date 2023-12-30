<script>
	import { getContext } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { mobileMode } from '$lib/store/app-stores';

	export let activeItem;

	const select = getContext('showItem');
	const inTransition = (node, args) => {
		return args.mobile ? fly(node, { x: -20, duration: 400 }) : fade(node, { duration: 400 });
	};
</script>

<div class="navigation" in:inTransition={{ mobile: $mobileMode }}>
	<nav>
		<button
			class="nav-link"
			class:active={activeItem === 'character'}
			on:click={() => select('character')}
		>
			<i class="gi-character" />
			{$mobileMode ? '' : $t('character')}
		</button>
		<button
			class="nav-link"
			class:active={activeItem === 'weapon'}
			on:click={() => select('weapon')}
		>
			<i class="gi-weapon" />
			{$mobileMode ? '' : $t('weapon')}
		</button>
	</nav>
</div>

<style>
	.navigation {
		text-align: center;
		display: flex;
		justify-content: center;
		position: relative;
		z-index: 10;
		width: 100%;
	}

	.navigation nav {
		width: 80%;
		height: 44px;
		margin-top: 5px;
		border-width: 0.1rem 0 !important;
		border: solid rgba(207, 186, 143, 0.5);
		display: flex;
		justify-content: center;
		background-image: linear-gradient(
			to left,
			rgba(0, 0, 0, 0),
			rgba(0, 0, 0, 0.6),
			rgba(0, 0, 0, 0.6),
			rgba(0, 0, 0, 0)
		);
	}

	nav .nav-link {
		height: 44px;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		color: #ede5d8;
		margin: 0 15px;
		line-height: 0;
		border-radius: 100%;
		opacity: 0.6;
		transition: all 0.2s;
	}
	nav .nav-link.active {
		color: #fff;
		opacity: 1;
	}

	nav .nav-link:hover {
		opacity: 0.9;
	}

	nav .nav-link i {
		font-size: 1.5rem;
	}

	:global(.mobile) .navigation {
		flex-direction: column;
		align-items: flex-end;
		width: 70px;
		margin-top: 0;
		height: 100%;
		justify-content: flex-start;
		padding-top: 0;
	}

	:global(.mobile) nav {
		display: block;
		height: 100vh;
		background-color: #484f62;
		z-index: -1;
		text-align: center;
		border-width: 0 0.1rem !important;
		width: 40px;
		margin-top: 0;
		padding-top: 50px;
		background-image: none;
	}

	:global(.mobile) nav .nav-link {
		margin: 0;
		font-size: 1.7rem;
		margin: 5px 0;
		height: unset;
		position: relative;
		line-height: 1rem;
		padding: 0.3rem;
		opacity: unset;
		background-color: #3a4156;
	}

	:global(.mobile) nav .nav-link.active {
		color: #3a4156;
		background-color: transparent;
	}

	:global(.mobile) nav .nav-link::after {
		position: absolute;
		top: 0;
		right: -0.2rem;
		content: '';
		display: block;
		width: 1000%;
		height: 100%;
		border-top-right-radius: 40px;
		border-bottom-right-radius: 40px;
		z-index: -1;
		transition: all 0.2s;
	}
	:global(.mobile) nav .nav-link.active::after {
		background-color: #ede5d8;
	}

	@media screen and (max-width: 900px) {
		:global(main):not(.mobile) .navigation nav {
			height: 40px;
			width: 100%;
		}
		nav .nav-link {
			height: 40px;
		}
	}
</style>
