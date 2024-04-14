<script>
	import { assets, customData } from '$lib/store/app-stores';
	import { removeAnimClass } from '$lib/helpers/transition';
	import { lazyLoad } from '$lib/helpers/lazyload';
	import { getCssVarPosition as pos } from '$lib/helpers/cssPosition';

	export let name;
	export let type;
	export let outfitName;
	export let weaponType;
	export let useOutfit;
	export let custom;
	export let chineseChar;
	export let rarity;
	export let clientHeight = 0;
	export let clientWidth = 0;
	export let offset = {};

</script>

<div class="zoomist-wrapper splash-art anim {type}" style="overflow: visible;" use:removeAnimClass>
	<!-- Custom Art -->
	{#if custom}
		{@const { images = {}, hostedImages = {}, status, artPosition } = $customData || {}}
		{@const { artURL } = status === 'owned' ? images : hostedImages}
		{@const { splashArt = {} } = artPosition || {}}
		<div class="zoomist-image" style={pos(splashArt, clientHeight, clientWidth)}>
			<img use:lazyLoad={artURL} alt={name} crossorigin="anonymous" />
		</div>

		<!-- Weapon -->
	{:else if type === 'weapon'}
		<div class="zoomist-image weapon anim {weaponType}-parent" use:removeAnimClass>
			<img src={$assets[`bg-${weaponType}.webp`]} alt={weaponType} class="weaponbg" />
			<img use:lazyLoad={$assets[name]} alt={name} class={weaponType} />
		</div>

	{:else if type === 'member'}
		<div class="zoomist-image weapon anim {weaponType}-parent" use:removeAnimClass>
			<img src={$assets[`bg-${weaponType}.webp`]} alt={weaponType} class="weaponbg" />
			<p id="chinese-char" class="{rarity === 5 ? 'rainbow' : rarity === 4 ? 'flux' : ''}" >{chineseChar}</p>
		</div>
	{:else if type === 'outfit'}
		<div class="zoomist-image" style={pos(offset, clientHeight, clientWidth)}>
			<img use:lazyLoad={$assets[`splash-art/${outfitName}`]} alt={name} crossorigin="anonymous" />
		</div>
	{:else}
		<div class="zoomist-image" style={pos(offset, clientHeight, clientWidth)}>
			<img
				use:lazyLoad={$assets[`splash-art/${useOutfit ? outfitName : name}`]}
				alt={name}
				crossorigin="anonymous"
			/>
		</div>
	{/if}
</div>

<style>
	.zoomist-wrapper,
	.zoomist-image {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.zoomist-wrapper {
		--scale: 1.5;
		--translate-x: 0px;
		--translate-y: 0px;
		background-color: unset;
		position: relative;
	}
	.zoomist-wrapper.weapon {
		--scale: 1.1;
	}

	.zoomist-image {
		transform: translate(var(--translate-x, 0px), var(--translate-y, 0px)) scale(var(--scale, 0));
	}

	#chinese-char {
		font-family: 'AaQiShu';
		position: absolute;
		top: 50%;
		left: 45%;
		transform: translate(-50%, -50%);
		font-size: 20vh;
		width: 10%;
		word-wrap: break-word;
		line-height: 85%;
		filter: drop-shadow(0.2rem 0.2rem 0.02rem rgb(0, 0, 0));
	}

	img {
		width: 100%;
		height: 100%;
		display: block;
		object-fit: contain;
		object-position: center;
	}

	.splash-art.anim {
		filter: brightness(0) opacity(0);
		animation: splashart forwards 1.5s 1;
	}
	.splash-art:not(.anim) {
		transform: translate(2%, 0);
	}

	.zoomist-image {
		position: relative;
		width: var(--width);
		height: var(--height);
	}
	.splash-art .weapon img {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.splash-art .weapon img.weaponbg {
		height: 80%;
	}

	.splash-art .weapon.anim img.weaponbg {
		opacity: 0;
		animation: weaponbg forwards 1.5s 1;
	}

	.bow-parent .weaponbg {
		transform: translate(-53%, -50%) scale(1.1) !important;
	}
	.catalyst-parent .weaponbg {
		height: 90% !important;
	}

	.anim .bow,
	.anim .polearm,
	.anim .sword,
	.anim .claymore,
	.anim .catalyst {
		animation: weaponShadow forwards 0.1s 1;
		animation-delay: 1.2s;
		filter: drop-shadow(0 0 0 rgba(0, 0, 0, 0));
	}

	.bow,
	.polearm,
	.sword,
	.claymore,
	.catalyst {
		filter: drop-shadow(0.6rem 0.6rem 0.05rem rgb(0, 0, 0));
	}

	.bow {
		height: 115%;
	}

	.catalyst {
		height: 40%;
	}

	.polearm {
		transform: translate(-53%, -35%) scale(1.2) !important;
	}

	@keyframes splashart {
		0% {
			transform: scale(5) translate(0, -5%);
			filter: brightness(0);
		}

		20% {
			transform: scale(1);
			filter: brightness(0);
		}
		75% {
			transform: scale(1);
			filter: brightness(0);
		}
		95% {
			transform: scale(1) translate(2%, 0);
			filter: brightness(1);
		}
		100% {
			transform: scale(1) translate(2%, 0);
			filter: brightness(1);
		}
	}

	@keyframes weaponbg {
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

	@keyframes weaponShadow {
		to {
			filter: drop-shadow(0.7rem 0.6rem 0.2rem rgba(0, 0, 0, 0.7));
		}
	}

	.rainbow {
    	color: #fff;
		animation: animate 1.5s linear infinite;
		text-shadow: 0 0 50px #0072ff, 0 0 100px #0072ff, 0 0 150px #0072ff, 0 0 200px #0072ff;
		filter: hue-rotate(0deg);
		animation-delay: 0.1s;
	}

	@keyframes animate {
		from {
			filter: hue-rotate(0deg);
		}
		to {
			filter: hue-rotate(360deg);
		}	
	}


	.flux {
		/* font-family: neon; */
		color: #426DFB;
		text-shadow: 0 0 3vw #2356FF;
		animation: flux 2s linear infinite;
		-moz-animation: flux 2s linear infinite;
		-webkit-animation: flux 2s linear infinite;
		-o-animation: flux 2s linear infinite;
	}

	@keyframes flux {
		0%,
		100% {
			text-shadow: 0 0 1vw #1041FF, 0 0 3vw #1041FF, 0 0 10vw #1041FF, 0 0 10vw #1041FF, 0 0 .4vw #8BFDFE, .5vw .5vw .1vw #147280;
			color: #28D7FE;
		}
		50% {
			text-shadow: 0 0 .5vw #082180, 0 0 1.5vw #082180, 0 0 5vw #082180, 0 0 5vw #082180, 0 0 .2vw #082180, .5vw .5vw .1vw #0A3940;
			color: #146C80;
		}
	}
	
</style>
