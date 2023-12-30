<script>
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { assets } from '$lib/store/app-stores';
	import positionToStyle from '$lib/helpers/cssPosition';
	import { playSfx } from '$lib/helpers/audio/audio';
	import Icon from '$lib/components/Icon.svelte';
	import SvgIcon from '$lib/components/SVGIcon.svelte';

	export let index;
	export let data = {};
	const {
		name,
		rarity,
		weaponType,
		type,
		vision,
		wishBoxPosition,
		stelaFortuna,
		isNew,
		bonusType,
		bonusQty,
		useOutfit,
		outfitName
	} = data;
</script>

<div
	id="wish{index}"
	class="item star{rarity} {type}"
	class:duplicate={!isNew}
	on:mousedown|preventDefault={() => playSfx()}
>
	{#if isNew}
		<div class="new">{$t('wish.result.new')}</div>
	{/if}
	<div class="item-body">
		<div class="item-content" style="background-image: url({$assets['resultcard-bg.svg']})">
			<div class="pic">
				{#if type === 'weapon'}
					<img
						src={$assets[name]}
						alt={name}
						class="wishpic {weaponType}-item"
						style={positionToStyle(wishBoxPosition)}
						crossorigin="anonymous"
					/>
				{:else}
					<img
						src={$assets[`splash-art/${useOutfit ? outfitName : name}`]}
						alt={name}
						class="wishpic"
						crossorigin="anonymous"
						style={positionToStyle(wishBoxPosition)}
					/>
				{/if}

				<div class="info" in:fade={{ delay: 1000 }}>
					<div class="icon" style="width: 100%;">
						{#if isNew || type === 'weapon'}
							{@const iconName = weaponType || vision}
							<SvgIcon name={iconName} />
						{/if}
					</div>

					{#if (isNew && type === 'character') || type === 'weapon'}
						<div class="star">
							{#each Array(rarity) as _, i}
								<div class="i gi-star" />
							{/each}
						</div>
					{/if}

					{#if type === 'character' && !isNew}
						<div class="masterless {bonusType}">
							<Icon type={bonusType} width="80%" />
							<span>{bonusQty}</span>
						</div>
					{/if}

					{#if stelaFortuna}
						<div class="stella stella{rarity}">
							<img src={$assets[`stella-fortuna-${rarity}star.webp`]} alt="Stella Fortuna" />
						</div>
					{/if}
				</div>

				{#if type === 'character' && !isNew}
					<div class="cover" in:fade={{ delay: 1000, duration: 1000 }} />
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.character.duplicate {
		animation: brighten forwards 1s;
		animation-delay: 1s;
	}

	.item {
		transition: all 0.2s;
		will-change: transform;
	}
	.item:hover,
	.item.hover {
		transform: scale(1.04);
		/* z-index: +10; */
	}
	.item:hover .cover,
	.item.hover .cover {
		background-color: rgba(0, 0, 0, 0);
	}

	.star5 .item-body {
		background-image: linear-gradient(
			to bottom,
			rgb(249, 170, 2),
			rgb(255, 255, 255),
			rgb(249, 170, 2)
		);
	}

	.star4 .item-body {
		background-image: linear-gradient(
			to bottom,
			rgb(196, 77, 218),
			rgb(255, 255, 255),
			rgb(196, 77, 218)
		);
	}

	.new {
		position: absolute;
		z-index: 10;
		display: block;
		top: 3%;
		left: 80%;
		transform: translateX(-50%);
		padding: 0 0.4rem;
		border-radius: calc(2 / 100 * var(--card-height)) 0;
		color: #fffa66;
		background-color: #c3882a;
		border: 1px solid #fffa66;
		font-size: calc(3 / 100 * var(--card-height));
	}

	.cover {
		display: block;
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: 100%;
		transition: all 0.2s;
		background-color: rgba(0, 0, 0, 0.2);
	}

	.item-body {
		height: 100%;
		clip-path: url(#wishframe);
		margin: 0 0.5px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-image: linear-gradient(to bottom, #aac8f1, #fff, #aac8f1);
	}

	.item-content {
		width: 97%;
		height: 99%;
		clip-path: url(#wishframe);
		background-size: cover;
		background-position: center center;
	}

	.pic {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
	}
	.pic::after {
		content: '';
		display: block;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50%;
		background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0));
	}
	.pic img.wishpic {
		position: absolute;
		top: 75%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: 180%;
	}

	.weapon .pic img.wishpic {
		top: 50%;
		height: 97%;
		filter: drop-shadow(0.2rem 0.2rem 0.05rem rgb(0, 0, 0));
	}
	.pic > .wishpic.catalyst-item {
		height: 30% !important;
	}

	.stella {
		margin-top: 10%;
	}
	.stella,
	.masterless {
		width: 65%;
		border-radius: 10%;
		overflow: hidden;
		display: block;
		position: relative;
		box-shadow: 0 0 7px rgba(255, 255, 255, 0.7), 0 0 14px rgba(255, 255, 255, 0.5),
			0 0 21px rgba(255, 255, 255, 0.2), 0 0 42px rgba(255, 255, 255, 1);
	}
	.stella::after,
	.masterless span {
		width: 100%;
		font-size: calc(3 / 100 * var(--card-height));
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
	.masterless img {
		width: 80%;
		height: auto;
	}

	.stella5,
	.starglitter {
		background-image: linear-gradient(to top, #ca8937, #a47853);
	}

	.stella4 {
		background-image: linear-gradient(to top, #a47ab9, #7e78a9);
	}

	.info {
		position: absolute;
		bottom: 10%;
		left: 0;
		width: 100%;
		z-index: 10;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.info .gi-star {
		color: #f7cf33;
		display: inline-block;
		font-size: calc(3.5 / 100 * var(--card-height));
	}
	.icon :global(svg) {
		width: 80%;
		aspect-ratio: 1/1;
	}

	@keyframes brighten {
		0% {
			filter: brightness(100%);
		}
		50% {
			filter: brightness(150%);
		}
		100% {
			filter: brightness(100%);
		}
	}
</style>
