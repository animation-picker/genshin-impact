<script>
	import { assets } from '$lib/store/app-stores';

	const random = (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};
</script>

<img class="bg" src={$assets[`bg${random(1, 20)}.webp`]} alt="background" />

<style>
	.bg {
		width: 100vw;
		height: 100%;
		object-fit: cover;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(1.1);
		filter: blur(10px);
		-webkit-filter: blur(10px);
		z-index: +1;
	}
</style>
