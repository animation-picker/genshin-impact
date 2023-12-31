<script>
	import { getContext, onMount } from 'svelte';
	import { t } from 'svelte-i18n';
	import OverlayScrollbars from 'overlayscrollbars';

	import { data } from '$lib/data/updates.json';
	import { isPWA } from '$lib/store/app-stores';
	import { adKey, verifyKey } from '$lib/helpers/accessKey';
	import { browserDetect } from '$lib/helpers/mobileDetect';
	import { playSfx } from '$lib/helpers/audio/audio';
	import Modal from '$lib/components/ModalTpl.svelte';

	let content;
	let contentHeight;
	let savedKey = '';
	let dateExpired = '';

	const startApp = getContext('startApp');
	const updates = data.filter(({ featured }) => !!featured);

	onMount(async () => {
		OverlayScrollbars(content, { sizeAutoCapable: false, className: 'os-theme-light' });
		const { expiryDate, storedKey } = await adKey.initialLoad();
		dateExpired = expiryDate;
		savedKey = storedKey;
	});

	const handleConfirm = () => {
		playSfx();
		startApp();
		verifyKey();
	};
</script>

<Modal confirmOnly title={$t('title')} on:confirm={handleConfirm}>
	<section bind:clientHeight={contentHeight} style="--modalHeight:{contentHeight}px">
		<p class="sp">
			{$t('fanmade')} <br />
			{#if !$isPWA}
				<a href="/install">{$t('installInstruction')}</a>
			{/if}
		</p>
		{#if !browserDetect().isSupported && isPWA}
			<div class="updates adExpired">
				<strong>
					We highly recommend you to install
					<span style="display: inline; color:#5ab3ff"> Google Chrome </span>
					First, Maybe some features won't work properly for now!
				</strong>
			</div>
		{:else if dateExpired && dateExpired !== 'none'}
			<div class="updates adExpired">
				<div>
					{@html $t('menu.keyExpired2', {
						values: { key: `<b>${savedKey}</b>`, date: `<u>${dateExpired}</u>` }
					})}
					<a
						href="https://ko-fi.com/post/AdFree-Wish-Simulator-Enjoy-Simulator-Without-Ads-G2G2DQ57O"
						target="_blank"
					>
						{$t('menu.getNewKey')}
					</a>
				</div>
			</div>
		{:else}
			<div class="updates" bind:this={content}>
				{#each updates.reverse() as { description, date }, i (i)}
					<span>
						<i class="tgl"> {date} </i>
						{#if i === 0} ( Latest Update ) {/if}
					</span>
					{#each description as txt} <p>{@html txt}</p> {/each}
				{/each}
				<div style="height: .5rem" />
			</div>
		{/if}
		<p class="credit">{$t('disclaimer')}</p>
	</section>
</Modal>

<style>
	section {
		width: 100%;
		height: 100%;
		padding: 0 1.5rem;
	}
	.credit {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		font-size: 0.9rem;
	}

	.updates {
		text-align: left;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		background-color: #fff;
		font-size: 0.97rem;
		height: calc(0.7 * var(--modalHeight));
		padding: 0 1rem;
		display: block;
		overflow: hidden;
	}

	:global(.mobile) .updates {
		height: calc(0.6 * var(--modalHeight));
	}

	.adExpired {
		text-align: center;
		font-size: 125%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.adExpired a {
		display: block;
		margin-top: 1rem;
	}

	.updates span {
		font-weight: bold;
		color: #f7cf33;
		display: block;
		padding-top: 0.5rem;
	}
	.updates .tgl {
		color: #bd6932;
	}

	.updates :global(a) {
		color: #f29f0f;
	}
	.updates :global(a:hover) {
		text-decoration: underline;
	}

	.updates p {
		padding-left: 1rem;
		position: relative;
		line-height: 1rem;
		margin: 0.5rem 0;
	}
	.updates p::before {
		content: '*';
		display: inline-block;
		width: 10px;
		line-height: 0;
		font-size: 1.3rem;
		padding-top: 0.5rem;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
	}

	.sp {
		font-size: 0.9rem;
		padding: 0rem 0 0.5rem;
	}

	a {
		transition: all 0.2s;
	}
	.sp a {
		font-weight: bold;
		color: #e3a023;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	a:active {
		transform: scale(0.9);
	}
</style>
