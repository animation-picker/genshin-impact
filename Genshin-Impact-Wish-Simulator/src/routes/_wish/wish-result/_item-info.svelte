<script>
	import { t } from 'svelte-i18n';
	import { assets } from '$lib/store/app-stores';
	import { removeAnimClass } from '$lib/helpers/transition';
	import Icon from '$lib/components/Icon.svelte';
	import SvgIcon from '$lib/components/SVGIcon.svelte';

	export let staticMode = false;
	export let custom = false;

	export let itemName = '';
	export let chineseChar = '';
	export let type = '';
	export let vision = '';
	export let weaponType = '';

	export let outfitName = '';
	export let stelaFortuna = false;
	export let bonusQty = 0;
	export let rarity = 4;
</script>

<div class="info">
	{#if type !== 'outfit'}
		<div class="icon vision" class:animate={!staticMode} use:removeAnimClass>
			<SvgIcon name={weaponType || vision} />
		</div>
	{/if}

	<!-- Item Name -->
	<div class="name">
		{#if type === 'outfit'}
			<span class:animate={!staticMode} use:removeAnimClass> {$t('outfit.obtained')} </span>
		{/if}

		<div class="text" class:animate={!staticMode} use:removeAnimClass>
			{#if custom}
				{itemName}
			{:else if type === 'member'}
				{chineseChar}
			{:else if type === 'outfit'}
				{$t(`outfit.item.${outfitName}.name`)}
			{:else if weaponType}
				{$t(itemName)}
			{:else}
				{$t(`${itemName}.name`)}
			{/if}
		</div>

		<div class="star">
			{#each Array(rarity) as _, i (i)}
				<i
					class="gi-star"
					class:animate={!staticMode}
					style="animation-delay: {2 + i * 0.15}s"
					use:removeAnimClass
				/>
			{/each}
		</div>

		{#if type === 'outfit'}
			<span class="anim" class:animate={!staticMode} use:removeAnimClass>
				{$t('outfit.unlocked', {
					values: { character: $t(`${itemName}.name`) }
				})}
			</span>
		{/if}
	</div>

	<!-- Show Starglitter Bonus & Stella Fortuna For Character -->
	<div class="bonus" class:animate={!staticMode} use:removeAnimClass>
		{#if stelaFortuna}
			<div class="stella stella{rarity}">
				<img src={$assets[`stella-fortuna-${rarity}star.webp`]} alt="Stella Formula" />
			</div>
		{/if}

		{#if type == 'character' && bonusQty > 0}
			<div class="masterless starglitter">
				<Icon type="starglitter" width="80%" />
				<span> {bonusQty} </span>
			</div>
		{/if}
	</div>
</div>

<style>
	/* Infoemation */
	.info {
		position: fixed;
		top: 60%;
		display: flex;
		align-items: center;
		width: 1200px;
		max-width: 95%;
		z-index: +1;
		pointer-events: none;
	}
	.info {
		left: 50%;
		transform: translate(-50%, -50%);
	}

	:global(.mobile) .info {
		max-width: 83%;
	}
	.name {
		position: relative;
		z-index: +2;
		width: 100%;
	}

	.name span {
		color: rgba(255, 255, 255, 0.9);
		padding: 0.2% 0 0.5%;
		display: block;
	}
	.name span.animate {
		animation-delay: 2s !important;
		animation: revealName forwards 0.8s 1;
		opacity: 0;
	}

	.name .text.animate {
		animation-delay: 1.3s !important;
		animation: revealName forwards 0.8s 1;
		opacity: 0;
		transform: translateX(20px);
	}
	.name .text {
		max-width: 38%;
		font-size: 2.5em;
		line-height: 1.2em;
		color: #fff;
		-webkit-text-stroke: 0.04rem #000;
	}

	.text,
	.star {
		filter: drop-shadow(0 0 0.25rem rgba(0, 0, 0, 0.5));
	}

	:global(.zh-CN) .name .text,
	:global(.ja-JP) .name .text {
		font-size: 3em;
	}

	.icon {
		margin-top: -5px;
		position: relative;
		width: 5rem;
	}
	.icon :global(svg) {
		width: 100%;
		height: 100%;
	}

	:global(.mobile) .icon {
		height: 4rem;
	}

	.icon.animate {
		opacity: 0;
		animation-delay: 1.2s !important;
		animation: revealIcon forwards 1.3s 1;
	}

	.gi-star {
		color: #f7cf33;
		font-size: 1.525em;
		display: inline-block;
	}
	.gi-star.animate {
		opacity: 0;
		transform: scale(5);
		animation: revealStar forwards 0.4s 1;
	}
	.weapon-icon {
		background-image: linear-gradient(to right, #585a66, #bed0d4, #585a66);
		margin-top: -25px !important;
	}

	.bonus {
		position: absolute;
		display: flex;
		bottom: -25vh;
		left: 50%;
		transform: translateX(-50%);
	}
	.bonus.animate {
		opacity: 0;
		animation: opacityChange forwards 1.5s 1;
	}
	.stella,
	.bonus .masterless {
		width: 3.5rem;
		border-radius: 10%;
		overflow: hidden;
		display: block;
		text-align: center;
		position: relative;
		margin-left: 0.5rem;
		margin-right: 0.5rem;
		padding-bottom: 0.5rem;
		box-shadow: 0 0 7px rgba(255, 255, 255, 0.5), 0 0 14px rgba(255, 255, 255, 0.3),
			0 0 30px rgba(255, 255, 255, 0.2);
	}
	.stella::after,
	.bonus .masterless span {
		width: 100%;
		font-size: 0.6rem;
		content: '1';
		display: block;
		position: absolute;
		left: 0;
		bottom: 0;
		color: #fff;
		text-align: center;
		background-color: rgba(0, 0, 0, 0.5);
	}
	.stella img,
	.bonus .masterless img {
		width: 80%;
		height: auto;
	}

	.stella5,
	.bonus .starglitter {
		background-image: linear-gradient(to top, #ca8937, #a47853);
	}

	.stella4 {
		background-image: linear-gradient(to top, #a47ab9, #7e78a9);
	}

	@keyframes revealIcon {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	@keyframes revealName {
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}

	@keyframes revealStar {
		to {
			transform: scale(1);
			opacity: 1;
		}
	}

	@keyframes opacityChange {
		80% {
			opacity: 0;
		}
		85% {
			opacity: 1;
		}
		100% {
			opacity: 1;
		}
	}
</style>
