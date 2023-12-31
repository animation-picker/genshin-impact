<script>
	import { getContext } from 'svelte';
	import { mobileMode, viewportWidth } from '$lib/store/app-stores';
	import { HOST } from '$lib/env';
	import Sidebar from './_sidebar.svelte';

	export let show = false;
	let clientHeight;
	const close = getContext('chatToggle');

	window.disqus_config = function () {
		this.page.url = HOST;
	};
</script>

<svelte:head>
	<script src="https://gi-wishsim.disqus.com/embed.js" data-timestamp={+new Date()} async>
	</script>
</svelte:head>

<section class:show>
	<div class="container transition" class:show>
		{#if $viewportWidth > 640 || $mobileMode}
			<Sidebar />
		{/if}
		<div
			class="room transition"
			class:full={$viewportWidth <= 640}
			class:show
			style="--height:{clientHeight}px"
		>
			<div class="top" bind:clientHeight>
				<div class="col">
					<button class="close dimiss" on:click={close}>
						<i class="gi-reply" />
					</button>
				</div>
				<span> Has Anything in Mind? </span>
			</div>

			<div class="chats">
				<div id="disqus_thread" />
			</div>
		</div>

		<div class="close-div" on:click={close} />
	</div>
</section>

<style>
	.container.transition {
		transform: translateX(-200px);
		transition: all 0.2s;
	}
	.room.transition {
		transform: translateX(-300px);
		transition: all 0.3s;
	}

	.transition {
		opacity: 0;
		pointer-events: none;
	}

	.transition.show {
		opacity: 1;
		pointer-events: unset;
		transform: translateX(0);
	}

	section {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 100;
		pointer-events: none;
		color: #fff !important;
	}

	section.show {
		pointer-events: unset;
	}

	.container {
		background-image: linear-gradient(
			to right,
			rgba(32, 36, 49, 0.9) 50%,
			rgba(32, 36, 49, 0.3) 80%,
			rgba(32, 36, 49, 0)
		);
		background-position: left;
		background-repeat: no-repeat;
		height: 100%;
		display: flex;
		position: relative;
	}

	.close-div {
		width: 25%;
		margin-left: auto;
	}

	.top {
		width: 100%;
		height: 60px;
		color: rgba(210, 198, 156, 0.8);
		display: flex;
		align-items: center;
		text-align: center;
		border-bottom: 1px solid rgba(210, 198, 156, 0.5);
	}

	:global(.mobile) .top {
		height: 40px;
		margin-bottom: -10px;
	}
	.top .close {
		transform: scale(0.8);
	}

	.top .dimiss {
		display: none;
	}
	.room {
		height: 100%;
		width: 50%;
		min-width: 300px;
		max-width: 500px;
	}
	.room.full,
	.top span {
		width: 100%;
	}

	.chats {
		padding: 5%;
		display: flex;
		flex-direction: column;
		height: calc(100% - var(--height));
		position: relative;
		overflow-y: auto;
	}
	.chats::-webkit-scrollbar {
		display: none;
	}

	@media screen and (min-width: 1200px) {
		.container {
			background-size: 1400px;
		}
	}

	@media screen and (max-width: 1200px) {
		.container {
			background-size: 120%;
		}
	}

	@media screen and (max-width: 850px) {
		.container {
			background-size: 140%;
		}
	}

	@media screen and (max-width: 640px) {
		.container {
			background-size: 180%;
		}
		.close-div {
			display: none;
		}
		.top {
			height: unset;
			padding: 3%;
			font-size: 120%;
		}
		.top .dimiss {
			display: unset;
		}
		.gi-reply {
			font-size: large;
		}

		.room {
			width: 100%;
			min-width: unset;
			max-width: unset;
		}
	}
</style>
