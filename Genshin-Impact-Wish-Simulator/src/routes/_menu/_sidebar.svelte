<script>
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';

	export let activeContent;
	const selectMenu = getContext('selectMenu');
	const chatToggle = getContext('chatToggle');
</script>

<div class="sidebar">
	<div class="menu-list" style="--bg-active: url('/menu-active.png')">
		<div class="menu-item" class:active={activeContent === 'options'}>
			<button on:click={() => selectMenu('options')}> {$t('menu.options')} </button>
		</div>

		<!-- <div class="menu-item" class:active={activeContent === 'nameImport'}>
			<button on:click={() => selectMenu('nameImport')}> {$t('menu.nameImport')} </button>
		</div> -->

		<!-- <div class="menu-item" class:active={activeContent === 'customBanner'}>
			<button on:click={() => selectMenu('customBanner')}> {$t('menu.customBanner')} </button>
		</div> -->

		<!-- <div class="menu-item" class:active={activeContent === 'proAccess'}>
			<button on:click={() => selectMenu('proAccess')}> {$t('menu.proAccess')} </button>
		</div> -->

		<!-- <div class="menu-item" class:active={activeContent === 'updates'}>
			<button on:click={() => selectMenu('updates')}> {$t('menu.updates')} </button>
		</div> -->

		<!-- <div class="menu-item" class:active={activeContent === 'backupRestore'}>
			<button on:click={() => selectMenu('backupRestore')}> {$t('menu.backupRestore')} </button>
		</div> -->

		<!-- <div class="menu-item">
			<button on:click={chatToggle}> {$t('menu.feedback')} </button>
		</div> -->
	</div>
</div>

<style>
	.sidebar {
		width: 30%;
		max-width: 20rem;
	}
	:global(.mobile) .sidebar {
		width: 25%;
	}
	.sidebar .menu-list {
		display: flex;
		flex-direction: column;
	}

	.menu-item button {
		color: var(--tertiary-color);
		transition: all 0.2s;
		opacity: 0.8;
		transform-origin: left;
		padding: 3.5% 5%;
		width: 100%;
		text-align: left;
		padding-left: 2.5rem;
		font-size: 110%;
	}

	.menu-item {
		position: relative;
	}
	.menu-item.active button {
		color: #fff;
		opacity: 1;
		position: relative;
	}
	.menu-item.active::after {
		content: '';
		background-image: var(--bg-active);
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}

	.menu-item:hover button {
		opacity: 1;
	}

	@media screen and (max-width: 900px) {
		:global(main):not(.mobile) .sidebar {
			width: 100%;
			max-width: unset;
		}
		:global(main):not(.mobile) .sidebar .menu-list {
			flex-direction: row;
			justify-content: center;
			flex-wrap: wrap;
		}
		:global(main):not(.mobile) .menu-item.active::after {
			display: none;
		}
		:global(main):not(.mobile) .menu-item button {
			padding: 0.2rem 1rem;
			border-radius: 50px;
			opacity: unset;
			font-size: 135%;
		}
		:global(main):not(.mobile) .menu-item.active button,
		:global(main):not(.mobile) .menu-item:hover button {
			background-color: var(--tertiary-color);
			color: #4a5265;
			transform: unset;
		}
	}
</style>
