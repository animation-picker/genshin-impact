<script>
	import { getContext, onMount, setContext } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { ref, query, limitToLast, onChildAdded } from 'firebase/database';
	import { db } from '$lib/helpers/chat/firebaseApp';
	import { mobileMode, viewportWidth } from '$lib/store/app-stores';
	import { getCredential } from '$lib/helpers/chat/firebaseApp';
	import { playSfx } from '$lib/helpers/audio/audio';
	import { adKey } from '$lib/helpers/accessKey';

	import ButtonGeneral from '../ButtonGeneral.svelte';
	import Chats from './_chats.svelte';
	import Sidebar from './_sidebar.svelte';
	import ChangeNick from './_changeNick.svelte';
	import ChangeAvatar from './_changeAvatar.svelte';
	import LoaderChat from './_loader-chat.svelte';

	export let show = false;

	let userId;
	let clientHeight;
	let pro = false;
	let showSetting = false;
	let changeNick = false;
	let changePic = false;

	const close = getContext('chatToggle');
	const loadCredential = async () => (userId = await getCredential());
	const toggleSetting = (op) => {
		const isDimiss = op === 'dimiss';
		if (isDimiss && !showSetting) return;
		showSetting = isDimiss ? false : !showSetting;
		playSfx(isDimiss ? 'close' : 'click');
	};

	const toggleNick = () => (changeNick = !changeNick);
	const togglePic = () => (changePic = !changePic);
	setContext('toggleNick', toggleNick);
	setContext('togglePic', togglePic);

	const toggle = (op) => {
		playSfx();
		if (op === 'nick') return toggleNick();
		return togglePic();
	};

	$: if (show && !userId) loadCredential();
	$: if (!show) showSetting = false;

	let messages = [
		{
			uid: 'nang441',
			name: 'nang441',
			pic: 'nahida',
			pro: false,
			message:
				'Welcome to the WishSimulator.App! Please be polite in this chat room! Everything in here will be cleaned every 3 hours.'
		}
	];

	// Read & Listen DB
	const dataRef = query(ref(db, 'wishsim-chatroom'), limitToLast(5));
	onChildAdded(dataRef, (data) => {
		const { uid, name, pic, pro, message } = data.toJSON();
		const key = data.key.split('-')[1];
		messages = [...messages, { uid, name, pic, pro, message, key }];
	});

	onMount(async () => {
		const { validity } = await adKey.checkLocal();
		pro = validity;
	});
</script>

{#if show}
	<section>
		<div
			class="container"
			transition:fly={{ x: -200, duration: 200 }}
			on:click={() => toggleSetting('dimiss')}
		>
			{#if $viewportWidth > 640 || $mobileMode}
				<Sidebar />
			{/if}
			<div
				class="room"
				class:full={$viewportWidth <= 640}
				on:click|stopPropagation={() => toggleSetting('dimiss')}
				style="--height:{clientHeight}px"
				transition:fly={{ x: -50, duration: 200, delay: 150 }}
			>
				<div class="top" bind:clientHeight>
					<div class="col">
						<button class="close dimiss" on:click={close}>
							<i class="gi-reply" />
						</button>
					</div>
					<span> Chatroom is an experimental feature </span>
					<div class="col" style="position:relative">
						<button class="close" on:click|stopPropagation={toggleSetting}>
							<i class="gi-dot-3" />
						</button>
						{#if showSetting}
							<div class="setting" transition:fade={{ duration: 250 }} on:click|stopPropagation>
								<ButtonGeneral on:click={() => toggle('nick')}>Edit Nickname</ButtonGeneral>
								<ButtonGeneral on:click={toggle}>Change Avatar</ButtonGeneral>
							</div>
						{/if}
					</div>
				</div>

				<div class="chats">
					{#if !userId || messages.length < 2}
						<div class="loading" transition:fade|local={{ duration: 300 }}>
							<LoaderChat />
						</div>
					{:else}
						<Chats {userId} {messages} {pro} />
					{/if}
				</div>
			</div>

			<div class="close-div" on:click={close} />
		</div>
		{#if changeNick} <ChangeNick />{/if}
		{#if changePic} <ChangeAvatar /> {/if}
	</section>
{/if}

<style>
	section {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 10;
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
	.setting {
		position: absolute;
		top: 0;
		left: 150%;
		display: flex;
		flex-direction: column;
		background-color: #454b5d;
		border: 1px solid rgba(210, 198, 156, 0.5);
		border-radius: 1.1rem;
		padding: 20% 10%;
		z-index: +1;
	}
	.setting :global(button) {
		font-size: 80%;
		white-space: nowrap;
	}

	.loading {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
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

		.setting {
			left: unset;
			top: 100%;
			right: 0;
		}

		.room {
			width: 100%;
			min-width: unset;
			max-width: unset;
		}
	}
</style>
