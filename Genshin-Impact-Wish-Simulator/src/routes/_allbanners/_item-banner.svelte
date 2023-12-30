<script>
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { getName } from '$lib/helpers/nameText';
	import { playSfx } from '$lib/helpers/audio/audio';
	import { activeBanner, activeVersion } from '$lib/store/app-stores';
	import { localConfig } from '$lib/store/localstore-manager';

	export let groupby = 'version';
	export let groupName;
	export let data;

	const navigate = getContext('navigate');
	const selectBanner = (patch, phase) => {
		playSfx();
		// If select the same banner with the active one, change nothing just back to index
		const { patch: activePatch, phase: activePhase } = $activeVersion;
		if (activePhase === phase && activePatch === patch) return navigate('index');

		// Select a banner
		activeBanner.set(0);
		activeVersion.set({ patch, phase });
		localConfig.set('version', `${patch}-${phase}`);
		navigate('index');
	};
</script>

<div class="group-title">
	<h2>
		{groupby === 'version'
			? `${$t('version')} ${groupName}`
			: groupby === 'weapon'
			? $t(groupName)
			: $t(`${groupName}.name`)}
		<i class="gi-primo-star" />
	</h2>
</div>

{#each data as { patch, phase, chars, weapons }, i (i)}
	<a
		href="/"
		class="item"
		title={getName(chars.map(({ character }) => character).join(', '))}
		in:fade={{ duration: 300, delay: Math.sqrt(i * 10000) }}
		on:click={() => selectBanner(patch, phase)}
	>
		<div class="banner">
			<div class:dual={chars?.length > 1}>
				{#each chars as { character, bannerName }, i}
					<img
						src="/images/banner/thumbnail/{bannerName}.webp"
						alt={getName(character)}
						class="dual{i + 1}"
						style={chars.length > 1 ? '' : `width: 100%; height: 100%`}
						crossorigin="anonymous"
						loading="lazy"
						on:error={(e) => e.target.remove()}
					/>
				{/each}
			</div>
			<div>
				<img
					src="/images/banner/thumbnail/{weapons.bannerName}.webp"
					alt={getName(weapons.bannerName)}
					crossorigin="anonymous"
					loading="lazy"
					on:error={(e) => e.target.remove()}
				/>
			</div>
		</div>
		<h3 class="name">
			{chars.map(({ character }) => $t(`${character}.name`)).join(', ')}
			&
			{weapons.list.map(({ name }) => $t(name)).join(', ')}
		</h3>
	</a>
{/each}

<style>
	h2 {
		font-size: 1.1rem;
		padding: 0.2rem 2rem 0.2rem 6rem;
		margin-left: -5rem;
		margin-top: 1rem;
		border-radius: 40px;
		background-color: var(--tertiary-color);
		display: inline-block;
		position: relative;
		color: #383b40;
	}

	h2 .gi-primo-star {
		color: #ede5d8;
		position: absolute;
		right: 0;
		top: 50%;
		line-height: 0;
		transform: translate(80%, -50%);
	}

	.item {
		display: inline-flex;
		flex-direction: column;
		width: 60vh;
		max-width: 460px;
		margin: 0.5rem 0.5rem 1rem;
		text-align: center;
	}

	@media screen and (max-width: 1000px) {
		.item {
			width: 46%;
			min-width: 125px;
		}
	}

	:global(.mobile) .item {
		width: 65vh;
	}

	.banner {
		display: flex;
		justify-content: space-between;
	}
	.banner > div {
		width: 49.5%;
		height: 100%;
		aspect-ratio: 200/99;
		background-image: linear-gradient(90deg, #fbf6ee 30%, #ccc, #fbf6ee);
		background-size: 400%;
		display: flex;
		animation: infinite alternate 2s skeleton;
	}

	@keyframes skeleton {
		0% {
			background-position: 0 0;
		}
		100% {
			background-position: 300% 0;
		}
	}

	.banner > div:not(.dual) img {
		width: 100%;
	}

	.dual .dual1 {
		object-position: 60%;
		width: 40% !important;
		aspect-ratio: 81.1/99.35;
		margin-right: auto;
	}
	.dual .dual2 {
		margin-left: auto;
		object-position: 100%;
		width: 60% !important;
		aspect-ratio: 121.65/99.35;
	}

	.item .name {
		width: 100%;
		padding: 0.3rem;
		font-weight: 400;
		font-size: 0.97rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
