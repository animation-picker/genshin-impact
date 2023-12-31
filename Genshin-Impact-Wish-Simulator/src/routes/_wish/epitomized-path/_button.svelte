<script>
	import { getContext, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import hotkeys from 'hotkeys-js';

	import { activeBanner, activeVersion, bannerList, course } from '$lib/store/app-stores';
	import { fatepointManager } from '$lib/helpers/dataAPI/api-localstore';
	import { playSfx } from '$lib/helpers/audio/audio';
	import { noticeMark } from '$lib/helpers/noticeMark';

	import NoticeMark from '$lib/components/NoticeMark.svelte';
	import EpitomizedIcon from './_icon.svelte';

	let buttonHeight;
	let patch, phase, type, fatepointsystem;
	$: ({ patch, phase } = $activeVersion);
	$: ({ fatepointsystem, type } = $bannerList[$activeBanner]);

	const checkFatepoint = () => {
		const localFate = fatepointManager.init({ phase, version: patch });
		const { selected, point } = localFate.getInfo();
		course.set({ point, selected });
	};

	const handleEpitomizedModal = getContext('handleEpitomizedModal');
	const handleClick = () => {
		playSfx('exchange');
		handleEpitomizedModal();
		noticeMark.openNotice(`fatepoint${patch}-${phase}`);
	};

	onMount(() => bannerList.subscribe(checkFatepoint));

	// Shortcut
	hotkeys('e', 'index', (e) => {
		e.preventDefault();
		if (!fatepointsystem || type !== 'weapon-event') return;
		handleClick();
	});
</script>

{#if fatepointsystem}
	<button
		class="container"
		style="--height:{buttonHeight}px"
		in:fade={{ duration: 250 }}
		on:click={handleClick}
		bind:clientHeight={buttonHeight}
	>
		<NoticeMark name="fatepoint{patch}-{phase}" />
		<EpitomizedIcon active={$course.point === 2} />
		<div class="point-number">
			{#if $course.selected !== null}
				<span>{$course.point}</span>/2
			{:else}
				<span class="small">{$t('wish.epitomizedPath.text')}</span>
			{/if}
		</div>
	</button>
{/if}

<style>
	button {
		position: relative;
		pointer-events: initial;
	}

	.point-number {
		border-radius: 50px;
		background-color: #ece4d9;
		border: 3px solid #fff;
		padding: 0.2rem;
		width: 100%;
		transition: all 0.2s;
		color: #a49a90;
		border: 1px solid #a49a90;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		bottom: 5%;
		left: 50%;
		transform: translateX(-50%);
	}

	.point-number span {
		color: #ff8700;
	}

	.point-number span.small {
		font-size: calc(0.101 * var(--height));
		line-height: 110%;
		display: inline-block;
		color: var(--text-color);
		padding: 1% 10%;
	}
	:global(.mobile) button {
		font-size: 90%;
		padding: 0 0.2rem;
		margin-top: auto;
		margin-bottom: 10%;
	}
	:global(.mobile) span:not(.small) {
		font-size: 120%;
	}
	:global(.mobile) .point-number {
		padding: 0.1rem;
	}
</style>
