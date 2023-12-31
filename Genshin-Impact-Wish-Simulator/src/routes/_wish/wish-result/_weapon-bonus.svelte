<script>
	import Icon from '$lib/components/Icon.svelte';
	import { t } from 'svelte-i18n';
	import { isMobile } from '$lib/store/app-stores';
	import { removeAnimClass } from '$lib/helpers/transition';

	export let bonusQty = 0;
	export let bonusType = 'stardust';
	export let type;
</script>

{#if type === 'weapon' && bonusQty > 1}
	<div class="starfate anim {bonusType}" use:removeAnimClass>
		<div class="icon">
			<Icon type={bonusType} width={$isMobile ? '50px' : '60px'} />
		</div>
		<div class="text">
			<span>{$t('extra')}</span>
			{$t(`shop.item.${bonusType}`)}
			<br /> ×{bonusQty}
		</div>
	</div>
{/if}

<style>
	.starfate {
		justify-content: flex-end;
		right: 0;
		transform: translateY(-50%);
		text-transform: capitalize;
	}
	.starfate > .icon {
		margin-right: -25px;
		position: relative;
		z-index: +1;
		transform: scale(1);
		animation-delay: 1.3s !important;
	}
	.starfate.anim > .icon {
		animation: starfateIcon forwards 0.4s 1;
		opacity: 0;
	}
	.starfate.starglitter :global(img) {
		filter: drop-shadow(0 0 6px rgba(245, 193, 63, 1));
	}
	.starglitter .text {
		background-image: linear-gradient(to right, rgba(245, 193, 63, 0.9), rgba(245, 193, 63, 0.1));
		color: rgb(255, 255, 77);
	}
	.starfate.stardust :global(img) {
		filter: drop-shadow(0 0 6px rgba(221, 203, 245, 1));
	}
	.stardust .text {
		background-image: linear-gradient(to right, rgba(104, 47, 173, 0.9), rgba(104, 47, 173, 0.1));
		color: rgb(198, 130, 214);
	}
	.starfate .text {
		width: 330px;
		max-width: 50%;
		padding: 2px 25px;
		position: relative;
		z-index: -1;
		animation-delay: 1.3s !important;
	}

	.starfate.anim .text {
		opacity: 0;
		animation: starfateText forwards 0.7s 1;
	}

	:global(.mobile) .starfate .text {
		width: 230px;
	}
	.starfate span {
		color: #ddd;
		position: absolute;
		top: -45%;
		left: 25px;
		font-size: smaller;
	}

	.starfate {
		position: fixed;
		top: 60%;
		display: flex;
		align-items: center;
		width: 1200px;
		max-width: 95%;
		z-index: +1;
	}

	@keyframes starfateIcon {
		30% {
			transform: scale(1.5);
			opacity: 1;
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}

	@keyframes starfateText {
		0% {
			transform: translateX(-10px);
			opacity: 0;
		}
		100% {
			transform: translateX(0px);
			opacity: 1;
		}
	}
</style>
