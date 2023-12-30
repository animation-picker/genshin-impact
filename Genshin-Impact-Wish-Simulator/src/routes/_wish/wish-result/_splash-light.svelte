<script>
	export let type = '';
	export let rarity = 0;

	const removeAfterAnimate = (el) => {
		el.addEventListener('animationend', () => {
			el?.remove();
		});
	};
</script>

{#if type === 'in'}
	<div class="star{rarity} orbs in5" />
	<div class="in star{rarity} orbs in1" style="animation-duration: 1s;" />
	<div class="in star{rarity} orbs in2" style="animation-duration: 1.2s;" />
	<div class="in star{rarity} orbs in3" style="animation-duration: 1.1s;" />
	<div class="in star{rarity} orbs in4" style="animation-duration: .75s;" />
{/if}

{#if type === 'out'}
	<div
		class="out star{rarity} orbs out1 "
		style="animation-duration: 0.8s; animation-delay: .1s;"
		use:removeAfterAnimate
	/>
	<div class="out  star{rarity} orbs out2" style="animation-duration: 2s;" use:removeAfterAnimate />
	<div
		class="out  star{rarity} orbs out3"
		style="animation-duration: 1.2s; animation-delay: .1s;"
		use:removeAfterAnimate
	/>
{/if}

<style>
	div {
		aspect-ratio: 1/1;
	}
	/* Light */
	.orbs {
		background-color: transparent;
		border-radius: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(0);
		transform-origin: 0 0;
		opacity: 0;
	}

	.in {
		animation: orbsIn forwards 1;
	}

	.in1 {
		width: 100%;
	}

	.in2 {
		width: 80%;
	}

	.in3 {
		width: 40%;
	}

	.in4 {
		width: 70%;
	}

	.in5 {
		position: fixed;
		transform: translate(-50%, 50%);
		bottom: 0;
		width: 100vw;
		aspect-ratio: 1/1;
		opacity: 1;
		animation: orbs2 forwards 1s 1;
	}

	.out {
		transform: scale(0) translate(-50%, -50%);
		opacity: 0;
	}
	.out {
		animation: outOrbs forwards 1;
	}

	.out1 {
		width: 50%;
		background-color: rgb(254 133 63 / 5%);
	}

	.out2 {
		width: 100%;
	}

	.out3 {
		width: 150%;
	}

	/* 5Star Color */
	.star5.in1 {
		background-color: rgb(254 133 63 / 5%);
		box-shadow: 0 0 50px rgb(254 133 63 / 10%), inset 0 0 70px rgb(254 133 63 / 10%);
	}
	.star5.in2 {
		box-shadow: 0 0 50px rgb(253 148 48 / 30%), inset 0 0 70px rgb(253 148 48 / 30%);
	}
	.star5.in3 {
		box-shadow: 0 0 50px rgb(251 193 60 / 50%), inset 0 0 70px rgb(251 193 60 / 0%);
		background-image: radial-gradient(rgba(251, 193, 60, 1), rgb(251, 193, 60, 0));
	}
	.star5.in4 {
		box-shadow: 0 0 30px rgb(253 148 48 / 10%), inset 0 0 30px rgb(253 148 48 / 10%);
	}
	.star5.in5 {
		background-image: radial-gradient(
			rgba(253, 148, 48, 0.5),
			rgb(253, 148, 48, 0),
			rgba(253, 148, 48, 0)
		);
	}
	.star5.out1 {
		box-shadow: 0 0 50px rgb(251 193 60 / 50%), inset 0 0 50px rgb(251 193 60 / 50%);
	}
	.star5.out2 {
		box-shadow: 0 0 150px rgb(255 255 255 / 50%), inset 0 0 170px rgb(255 255 255 / 50%);
	}
	.star5.out3 {
		box-shadow: 0 0 200px rgb(253 148 48 / 60%), inset 0 0 170px rgb(253 148 48 / 60%);
	}

	/* 4 Star Color */
	.star4.in1 {
		background-color: rgba(241, 143, 223, 0.05);
		box-shadow: 0 0 50px rgba(126, 20, 158, 0.1), inset 0 0 70px rgba(159, 51, 241, 0.1);
	}
	.star4.in2 {
		box-shadow: 0 0 50px rgb(113 34 221 / 30%), inset 0 0 70px rgb(113 34 221 / 30%);
	}
	.star4.in3 {
		box-shadow: 0 0 50px rgb(180 47 248 / 50%), inset 0 0 70px rgb(180 47 248 / 0%);
		background-image: radial-gradient(rgba(156, 71, 218, 1), rgb(180, 47, 248, 0));
	}
	.star4.in4 {
		box-shadow: 0 0 30px rgb(113 34 221 / 10%), inset 0 0 30px rgb(113 34 221 / 10%);
	}
	.star4.in5 {
		background-image: radial-gradient(
			rgba(156, 71, 218, 0.5),
			rgb(156, 71, 218, 0),
			rgba(156, 71, 218, 0)
		);
	}
	.star4.out1 {
		box-shadow: 0 0 50px rgb(180 47 248 / 50%), inset 0 0 50px rgb(180 47 248 / 50%);
	}
	.star4.out2 {
		box-shadow: 0 0 150px rgb(255 255 255 / 50%), inset 0 0 170px rgb(255 255 255 / 50%);
	}
	.star4.out3 {
		box-shadow: 0 0 200px rgb(113 34 221 / 60%), inset 0 0 170px rgb(113 34 221 / 60%);
	}

	/* 3 Star Color */
	.star3.in1 {
		background-color: rgba(255, 255, 255, 0.05);
		box-shadow: 0 0 50px rgba(255, 255, 255, 0.1), inset 0 0 70px rgba(247, 237, 231, 0.1);
	}
	.star3.in2 {
		box-shadow: 0 0 50px rgb(85 93 255 / 30%), inset 0 0 70px rgb(85 93 255 / 30%);
	}
	.star3.in3 {
		box-shadow: 0 0 50px rgb(106 128 254 / 50%), inset 0 0 70px rgb(106 128 254 / 0%);
		background-image: radial-gradient(rgba(99, 124, 205, 1), rgba(99, 124, 205, 0));
	}
	.star3.in4 {
		box-shadow: 0 0 30px rgb(85 93 255 / 10%), inset 0 0 30px rgb(85 93 255 / 10%);
	}
	.star3.in5 {
		background-image: radial-gradient(
			rgba(99, 124, 205, 0.5),
			rgba(99, 124, 205, 0),
			rgba(99, 124, 205, 0)
		);
	}
	.star3.out1 {
		box-shadow: 0 0 50px rgb(157 217 252 / 50%), inset 0 0 50px rgb(157 217 252 / 50%);
	}
	.star3.out2 {
		box-shadow: 0 0 150px rgb(255 255 255 / 50%), inset 0 0 170px rgba(99, 124, 205, 1);
	}
	.star3.out3 {
		box-shadow: 0 0 200px rgb(85 93 255 / 60%), inset 0 0 170px rgb(85 93 255 / 60%);
	}

	@keyframes orbsIn {
		0% {
			transform: scale(0) translate(-50%, -50%);
		}
		90% {
			transform: scale(1) translate(-50%, -50%);
			opacity: 1;
		}
		100% {
			transform: scale(1) translate(-50%, -50%);
			opacity: 0;
		}
	}

	@keyframes orbs2 {
		0% {
			transform: scale(0) translateX(-50%);
		}
		90% {
			transform: scale(1) translateX(-50%);
			opacity: 1;
		}
		100% {
			transform: scale(1) translateX(-50%);
			opacity: 0;
		}
	}

	@keyframes outOrbs {
		30% {
			opacity: 1;
		}
		100% {
			transform: scale(2) translate(-50%, -50%);
			opacity: 0;
		}
	}
</style>
