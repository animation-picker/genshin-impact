<script>
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { assets, customData } from '$lib/store/app-stores';
	import { getCssVarPosition } from '$lib/helpers/cssPosition';
	import { playSfx } from '$lib/helpers/audio/audio';
	import Icon from '$lib/components/Icon.svelte';
	import SvgIcon from '$lib/components/SVGIcon.svelte';
	import { each } from 'svelte/internal';
	import changebanner from '$lib/helpers/audio/changebanner';
	import Header from '../_header.svelte';

	export let index;
	export let clientHeight;
	export let clientWidth;
	export let data = {};
	const {
		name,
		rarity,
		weaponType,
		type,
		vision,
		offset,
		stelaFortuna,
		isNew,
		bonusType,
		bonusQty,
		useOutfit,
		outfitName,
		custom,
		chineseChar
	} = data;

	const getCssVarPercent = (l, i) => {
		const pos = Math.floor(100 / (l + 1) * (i + 1));
		return `top: ${pos}%;`
	}
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
	<div class="zoomist-container item-body {weaponType || ''}">
		<div class="zoomist-wrapper item-content" style="--bg: url({$assets['resultcard-bg.webp']})">
			{#if custom}
				{@const { images = {}, hostedImages = {}, status, artPosition } = $customData || {}}
				{@const { artURL } = status === 'owned' ? images : hostedImages}
				{@const { wishCard = {} } = artPosition || {}}
				<div class="zoomist-image" style={getCssVarPosition(wishCard, clientHeight, clientWidth)}>
					<img src={artURL} alt={name} class="wishpic" crossorigin="anonymous" />
				</div>

			{:else if type === 'member'}
				{#each chineseChar as c, i}
					<p id="chinese-char" style={getCssVarPercent(chineseChar.length, i)}>{c}</p>
				{/each}
				
				<!-- <div class="zoomist-image weapon">
					
				</div>
				<div class="zoomist-image weapon">
					<p id="chinese-char">fff1</p>
				</div> -->

				<!-- Weapon -->
			{:else if type === 'weapon'}
				<div class="zoomist-image weapon">
					<img src={$assets[name]} alt={name} class="wishpic" crossorigin="anonymous" />
				</div>

				<!-- Character -->
			{:else}
				<div
					class="zoomist-image"
					style={getCssVarPosition(offset?.wishCard || {}, clientHeight, clientWidth)}
				>
					<img
						src={$assets[`splash-art/${useOutfit ? outfitName : name}`]}
						alt={name}
						class="wishpic"
						crossorigin="anonymous"
					/>
				</div>
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
		--scale: 2.05;
		height: 100%;
		clip-path: url(#wishframe);
		margin: 0 0.5px;
		display: flex;
		justify-content: center;
		align-items: center;
		touch-action: unset;
		background-image: linear-gradient(to bottom, #aac8f1, #fff, #aac8f1);
	}
	.item-body.catalyst {
		--scale: 1.3;
	}
	.character .item-body {
		--scale: 5;
		--translate-y: 150%;
	}

	.item-content {
		clip-path: url(#wishframe);
		transform: scaleX(0.98) scaleY(0.99);
		background-image: var(--bg);
		background-size: cover;
		background-position: center center;
		position: relative;
	}

	.item-content::after {
		content: '';
		display: block;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50%;
		background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0));
	}

	#chinese-char {
		font-family: 'AaQiShu';
		position: absolute;
		/* top: 44%; */
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 15vh;
		color: #2f2e2f;
		filter: drop-shadow(0.2rem 0.2rem 0.02rem rgb(0, 0, 0))
	}

	.zoomist-image {
		position: absolute;
		transform: translate(var(--translate-x, 0px), var(--translate-y, 0px)) scale(var(--scale, 0));
	}

	.zoomist-image.weapon {
		width: 100%;
		height: 100%;
	}

	img {
		width: 100%;
		height: 100%;
		display: block;
		object-fit: contain;
		object-position: center;
	}

	.weapon img.wishpic {
		filter: drop-shadow(0.2rem 0.2rem 0.02rem rgb(0, 0, 0));
	}

	.stella {
		margin-top: 10%;
	}

	.stella,
	.masterless {
		width: 60%;
		border-radius: 10%;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		aspect-ratio: 1/1;
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
