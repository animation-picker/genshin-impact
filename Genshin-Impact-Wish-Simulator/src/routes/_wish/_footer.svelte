<script>
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import hotkeys from 'hotkeys-js';
	import {
		acquaint,
		assets,
		mobileMode,
		stardust,
		starglitter,
		intertwined,
		wishAmount,
		activeVersion,
		multipull
	} from '$lib/store/app-stores';
	import { playSfx } from '$lib/helpers/audio/audio';
	import { isNewOutfitReleased } from '$lib/helpers/outfit';

	import Icon from '$lib/components/Icon.svelte';
	import NoticeMark from '$lib/components/NoticeMark.svelte';
	import ButtonGeneral from '$lib/components/ButtonGeneral.svelte';
	import EpitomizedButton from './epitomized-path/_button.svelte';

	export let bannerType = 'beginner';

	$: isBeginner = bannerType === 'beginner';
	$: isEvent = bannerType.match('event');
	$: currencyUsed = isEvent ? $intertwined : $acquaint;
	$: fateType = isEvent ? 'intertwined' : 'acquaint';
	$: isUnlimited = $wishAmount === 'unlimited';

	// Notice Mark
	$: patch = $activeVersion.patch;
	$: openedNotices = [`outfits-${patch}`, `recomended-${patch}`];
	$: hasNewOutfit = isNewOutfitReleased(patch);

	const onWish = getContext('onWish');
	const readyToPull = getContext('readyToPull');

	const navigate = getContext('navigate');
	const changePage = (page) => {
		navigate(page);
		if (['inventory', 'history'].includes(page)) return playSfx(page);
		if (page === 'shop') return playSfx('shopopen');
		return playSfx();
	};

	const roll = getContext('doRoll');
	const handleSingleRollClick = () => {
		playSfx('roll');
		roll(1, bannerType);
	};
	const handleMultiRollClick = () => {
		playSfx('roll');
		roll(isBeginner ? 10 : $multipull, bannerType);
	};

	// ShortCut
	const appReady = getContext('appReady');
	hotkeys('enter', 'index', (e) => {
		if (!$appReady || $onWish) return;
		e.preventDefault();
		handleMultiRollClick();
	});

	hotkeys('shift+enter', 'index', (e) => {
		if (!$appReady || $onWish || isBeginner) return;
		e.preventDefault();
		handleSingleRollClick();
	});

	hotkeys('s,c,h,d', 'index', (e) => {
		if (!$appReady || $onWish) return;
		e.preventDefault();
		const [key] = hotkeys.getPressedKeyString();
		const to = key.toLocaleLowerCase();
		if (to === 's') return changePage('shop');
		if (to === 'c') return changePage('inventory');
		if (to === 'h') return changePage('history');
		if (to === 'd') return changePage('details');
	});
</script>

<div id="footer" style="width: 100%; height: 100%">
	<div class="footer-info">
		{#if !$mobileMode}
			{#if bannerType === 'weapon-event'}
				<EpitomizedButton />
			{/if}
			<div class="wish">
				<div class="starglitter">
					<Icon type="starglitter" />
					<span> {$starglitter} </span>
				</div>
				<div class="stardust">
					<Icon type="stardust" />
					<span> {$stardust} </span>
				</div>
			</div>
		{/if}
	</div>

	<div class="row">
		<div class="left menu-button">
			<ButtonGeneral on:click={() => changePage('shop')}>
				{#if hasNewOutfit}
					<NoticeMark name={openedNotices} style="transform: translateX(70%) translateY(-80%)" />
				{/if}
				{$t('shop.text')}
			</ButtonGeneral>

			<ButtonGeneral on:click={() => changePage('inventory')}>
				{$t('inventory.text')}
			</ButtonGeneral>
			<ButtonGeneral on:click={() => changePage('history')}>
				{$t('history.text')}
			</ButtonGeneral>
		</div>
		<div class="right roll-button">
			{#if !isBeginner}
				<button
					class="single wish-button"
					style="background-image: url({$assets['button.webp']})"
					on:click={handleSingleRollClick}
					disabled={$onWish || !$readyToPull}
				>
					<div class="top">{$t('wish.rollButton', { values: { count: '×1' } })}</div>
					<div class="bottom">
						<Icon type={fateType} />
						<span style="margin-left: 7px" class:red={currencyUsed < 1 && !isUnlimited}> x 1 </span>
					</div>
				</button>
			{/if}

			<button
				class="ten wish-button"
				style="background-image: url({$assets['button.webp']})"
				on:click={handleMultiRollClick}
				disabled={$onWish || !$readyToPull}
			>
				{#if bannerType === 'beginner'}
					<span class="discount">-20%</span>
				{/if}

				<div class="top">
					{$t('wish.rollButton', { values: { count: `×${isBeginner ? 10 : $multipull}` } })}
				</div>

				<div class="bottom">
					<Icon type={fateType} />
					{#if isBeginner}
						<span style="margin-left: 7px" class:red={currencyUsed < 8 && !isUnlimited}> x 8 </span>
					{:else}
						<span style="margin-left: 7px" class:red={currencyUsed < $multipull && !isUnlimited}>
							x {$multipull}
						</span>
					{/if}
				</div>
			</button>
		</div>
	</div>
</div>

<style>
	#footer {
		position: relative;
	}

	.red {
		color: #de2f22 !important;
	}

	.footer-info {
		position: absolute;
		left: 5%;
		bottom: 75%;
		align-items: center;
		display: flex;
		flex-direction: column;
		pointer-events: none;
	}

	.wish > div {
		display: inline-flex;
		align-items: center;
		margin-right: 5px;
		padding: 2px 20px 2px 2px;
		font-size: 0.9rem;
	}
	.wish span {
		margin-left: 10px;
		color: #fff;
		text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
	}

	.wish-button {
		transform: scale(1);
		transition: all 0.2s;
		color: #4a5265;
		text-decoration: none;
		position: relative;
	}

	.wish-button:active {
		filter: brightness(85%);
	}
	button:active:not(:disabled) {
		transform: scale(0.95);
	}

	.row {
		width: 100%;
		height: 100%;
		padding: 0 5%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.roll-button {
		text-align: right;
	}

	.roll-button button {
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
		width: 230px;
		aspect-ratio: 355/88;
		margin: 0 5px;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		color: #a49a90;
		transition: all 0.2s;
	}

	.roll-button button:disabled {
		filter: brightness(0.5);
	}

	.roll-button button .bottom {
		display: flex;
		align-items: center;
	}

	.discount {
		background-color: #8ab958;
		position: absolute;
		z-index: +2;
		left: 15%;
		top: -5%;
		border-radius: 20px;
		color: #fff;
		transform: scale(0.8) translateX(-50%);
		padding: 0.2rem 0.5rem;
	}

	@media screen and (min-width: 750px) {
		.discount {
			font-size: 0.7rem;
		}
		.roll-button {
			white-space: nowrap;
		}
	}

	/* mobile */
	:global(.mobile) .row {
		padding: 1rem 0;
		align-items: flex-end;
	}

	:global(.mobile .menu-button) {
		padding-left: 1%;
		white-space: nowrap;
	}
	:global(.mobile) .roll-button {
		margin-right: 40px !important;
		white-space: nowrap;
	}
	:global(.mobile) .roll-button button {
		font-size: 0.75rem;
	}
	:global(.mobile) .roll-button :global(img) {
		transform: scale(0.7);
	}
	:global(.mobile) .bottom {
		margin-top: -3px;
	}

	/* Media Query */

	@media screen and (max-width: 925px) {
		button {
			padding: 2px 15px;
			margin: 2px 5px;
		}

		.roll-button button {
			width: 175px;
			margin: 0;
		}
		.roll-button :global(img) {
			transform: scale(0.8);
		}
	}

	@media screen and (max-width: 700px) {
		.roll-button {
			width: 100%;
		}
	}
	@media screen and (max-width: 550px) {
		.menu-button {
			width: 100%;
		}
		.roll-button {
			width: auto;
		}
	}

	@media screen and (max-width: 400px) {
		.roll-button button {
			width: 140px;
			margin: 0;
		}
		.roll-button :global(img) {
			transform: scale(0.7);
		}
		.roll-button .bottom {
			margin-top: -3px;
		}
	}
</style>
