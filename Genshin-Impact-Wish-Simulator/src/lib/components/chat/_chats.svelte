<script>
	import { afterUpdate, beforeUpdate, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { assets } from '$lib/store/app-stores';
	import Messagebox from './_messagebox.svelte';

	export let userId;
	export let messages = [];
	export let pro = false;

	let chatlist;
	let autoscroll;
	let newUpdate = false;

	const isAdmin = (id, nick) => id === 'nang441' && nick === 'nang441';
	const scrollToBottom = (behavior) => {
		const last = messages[messages.length - 1]?.key;
		const el = chatlist.querySelector(`#${last}`);
		el.scrollIntoView({ behavior });
	};

	const autoscrollCheck = () => {
		const chatListHeight = chatlist.offsetHeight + chatlist.scrollTop;
		autoscroll = chatListHeight > chatlist.scrollHeight - 20;
		if (chatListHeight <= chatlist.scrollHeight) {
			newUpdate = false;
		}
	};
	onMount(() => scrollToBottom('instant'));

	beforeUpdate(() => {
		if (!chatlist) return;
		autoscrollCheck();
		if (autoscroll) return;
		newUpdate = true;
	});

	afterUpdate(() => {
		if (autoscroll) scrollToBottom('smooth');
	});
</script>

<div class="messages" in:fade={{ duration: 300 }} bind:this={chatlist} on:scroll={autoscrollCheck}>
	{#each messages as { uid, name, pic, pro, message, key }, i}
		<div
			class="group"
			class:nopic={!pic}
			class:me={uid === userId}
			class:special={isAdmin(uid, name)}
			id={key}
		>
			<div class="picture">
				<figure>
					{#if isAdmin(uid, name)}
						<img src="/images/utility/admin.webp" alt="Admin" />
					{:else if pic}
						<img src={$assets[`face/${pic}`]} alt="Profile" />
					{:else}
						<i class="gi-user" />
					{/if}
				</figure>
			</div>

			<div class="message">
				<div class="sender reverse">
					{#if isAdmin(uid, name)}
						<span class="name">Admin</span>
					{:else}
						<span class="name">{name || uid}</span>
					{/if}
					{#if pro || isAdmin(uid, name)}
						<span class="pro"><i class="gi-win" /></span>
					{/if}
				</div>
				<div class="text">
					<p>{message}</p>
				</div>
			</div>
		</div>

		{#if i === 0}
			<div class="divider">
				<span />
			</div>
		{/if}
	{/each}
</div>
{#if newUpdate}
	<div class="jump">
		<button transition:fade on:click={() => scrollToBottom('smooth')}>
			<i class="gi-arrow-right" />
		</button>
	</div>
{/if}
<Messagebox {userId} {pro} />

<style>
	.messages {
		overflow-y: auto;
		height: 100%;
		position: relative;
	}

	.messages::-webkit-scrollbar {
		display: none;
	}

	.group {
		display: flex;
		width: 100%;
		height: fit-content;
		margin-bottom: 4%;
	}

	.group.me {
		flex-direction: row-reverse;
		justify-content: right;
	}

	.picture {
		width: 14%;
	}
	figure {
		width: 100%;
		aspect-ratio: 1/1;
		background-color: #3b4255;
		border-radius: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}
	.nopic figure {
		background-color: rgba(210, 198, 156, 1);
	}
	.special .name {
		background-color: #0087cb;
		padding: 0 4%;
		font-size: 80%;
		color: #fff;
		border-radius: 2rem;
	}
	.special .pro {
		background-color: #f9aa02;
	}
	.special figure {
		border: rgba(210, 198, 156, 1) solid 0.1rem;
	}

	figure i {
		font-size: x-large;
		color: #3b4255;
	}

	figure img {
		width: 100%;
		height: auto;
	}

	.message {
		padding: 0 5%;
		width: 86%;
	}
	.message span {
		margin-right: 3%;
	}
	.sender {
		display: flex;
	}
	.me .sender {
		flex-direction: row-reverse;
		justify-content: right;
	}
	.pro {
		background-color: #0087cb;
		color: #fff;
		aspect-ratio: 1/1;
		width: 1.3rem;
		line-height: 0;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		transform: rotate(45deg) scale(0.7);
	}
	.pro i {
		transform: rotate(-45deg);
	}
	.name {
		color: #bbbcc1;
		font-size: 90%;
		display: inline-flex;
		align-items: center;
	}

	.text {
		display: flex;
	}
	.me .text {
		justify-content: right;
	}

	.text p {
		background-color: #454b5d;
		color: #fff;
		padding: 2.3% 4%;
		margin-top: 2%;
		font-size: 80%;
		border-radius: 0.9rem;
		border-top-left-radius: 0;
		display: inline-block;
		position: relative;
		word-wrap: break-word;
		white-space: pre-wrap;
		max-width: 100%;
		font-family: var(--gi-global-font);
	}

	.me .text p {
		background-color: #d7d1c7;
		color: #3b4255;
		border-top-left-radius: 0.9rem;
		border-top-right-radius: 0;
	}

	.divider {
		display: flex;
		justify-content: center;
		margin-bottom: 5%;
	}

	.divider span {
		border-bottom: rgba(210, 198, 156, 1) solid 0.5px;
		width: 20%;
	}

	.jump {
		height: 0;
		position: relative;
	}
	.jump button {
		border-radius: 100%;
		aspect-ratio: 1/1;
		width: 9%;
		position: absolute;
		color: #d7d1c7;
		left: 50%;
		bottom: 0;
		display: inline-flex;
		justify-self: center;
		align-items: center;
		transform: translateX(-50%) translateY(-20%) rotate(90deg);
		line-height: 0;
		transition: 0.4s;
	}
	.jump i {
		animation: alternate 1s arrow infinite;
		font-size: 170%;
	}

	.jump button:hover {
		color: #fff;
	}
	.jump button:active {
		transform: translateX(-50%) translateY(-20%) rotate(90deg) scale(0.8);
	}

	@keyframes arrow {
		0% {
			transform: translateX(0%);
		}

		100% {
			transform: translateX(50%);
		}
	}

	@media screen and (max-width: 640px) {
		.text p {
			font-size: 120%;
			margin-top: 0%;
		}
		.name {
			font-size: 110%;
		}
		.pro {
			transform: rotate(45deg) scale(0.6);
			font-size: medium;
		}
	}
</style>
