<script>
	import { t } from 'svelte-i18n';
	import { fade } from 'svelte/transition';
	import { assets } from '$lib/store/app-stores';
	import { playSfx } from '$lib/helpers/audio/audio';
	import SyncCloud from './backup-restore/_sync-cloud.svelte';
	import SyncLocal from './backup-restore/_sync-local.svelte';

	let activeSync = 'local';
	const buttonNavigation = (section) => {
		if (activeSync === section) return;
		activeSync = section;
		playSfx('shopnav');
	};
</script>

<div
	class="backupRestore content-container"
	in:fade={{ duration: 200 }}
	style="--bg-icon:url('{$assets['modal-bg-icon.png']}')"
>
	<nav>
		<button class:active={activeSync === 'cloud'} on:click={() => buttonNavigation('cloud')}>
			<i class="gi-drive" />
			<span> {$t('backupRestore.cloudSync')}</span>
		</button>
		<button class:active={activeSync === 'local'} on:click={() => buttonNavigation('local')}>
			<i class="gi-local" />
			<span> {$t('backupRestore.localSync')}</span>
		</button>
	</nav>
	<div class="content">
		{#if activeSync === 'cloud'}
			<SyncCloud />
		{:else}
			<SyncLocal />
		{/if}
	</div>
</div>

<style>
	.content-container {
		background-color: #fbf6ee;
		background-image: var(--bg-icon);
		background-repeat: no-repeat;
		background-size: 50%;
		background-position: 50% 60%;
		border-radius: 0.5rem;
		color: var(--text-color);
		overflow: hidden;
	}

	nav {
		width: 100%;
		display: flex;
		position: relative;
		z-index: +1;
	}
	nav::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 50%;
		top: 0;
		left: 0;
		background-color: rgb(51, 57, 71);
		z-index: -1;
	}

	nav button {
		width: 100%;
		flex: 1;
		flex-basis: 50%;
		padding: 1rem;
		background-color: rgb(51, 57, 71);
		color: #fff;
		transition: all 0.25s;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}
	nav button i {
		font-size: larger;
		line-height: 0;
		transform: translateX(-25%);
	}

	nav button.active {
		background-color: #fbf6ee;
		color: initial;
	}

	nav button:nth-child(1) {
		border-bottom-right-radius: 1.75rem;
	}
	nav button.active:nth-child(1) {
		border-bottom-right-radius: unset;
		border-top-right-radius: 1.75rem;
	}

	nav button:nth-child(2) {
		border-bottom-left-radius: 1.75rem;
	}
	nav button.active:nth-child(2) {
		border-bottom-left-radius: unset;
		border-top-left-radius: 1.75rem;
	}

	.content {
		width: 100%;
		height: 100%;
	}
</style>
