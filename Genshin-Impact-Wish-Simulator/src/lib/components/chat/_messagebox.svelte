<script>
	import { push, ref } from 'firebase/database';
	import { db } from '$lib/helpers/chat/firebaseApp';
	import { playSfx } from '$lib/helpers/audio/audio';
	import { cookie } from '$lib/helpers/dataAPI/api-cookie';
	import Badwords from '$lib/helpers/chat/badwords';
	import ButtonModal from '../ButtonModal.svelte';

	export let userId;
	export let pro = false;
	let isOnline = true;

	// Write to DB
	const writeUserData = (userId, message) => {
		const char = cookie.get('avatar');
		push(ref(db, 'wishsim-chatroom'), {
			uid: userId,
			name: cookie.get('nickName'),
			pic: char.outfit || char.name,
			pro,
			message
		});
	};

	const removeUrl = (text) => {
		let urlRegex =
			/(https?:\/\/)?[\w\-~]+(\.[\w\-~]+)+(\/[\w\-~@:%]*)*(#[\w-]*)?(\?[^\s]*)?(\.[\w\-~]+)?/gi;
		return text.replace(urlRegex, '~𝘣𝘭𝘰𝘤𝘬𝘦𝘥 𝘭𝘪𝘯𝘬~');
	};

	let msgInput;
	const send = () => {
		if (!msgInput || !isOnline) return;
		const urlRemoved = removeUrl(msgInput);
		writeUserData(userId, Badwords.clean(urlRemoved));
		msgInput = '';
		playSfx();
	};

	const offlineHandle = () => {
		isOnline = !isOnline;
	};
</script>

<svelte:window on:offline={offlineHandle} on:online={offlineHandle} />

<form class="message-box" on:submit|preventDefault>
	<div class="input">
		<input
			type="text"
			class="wishinput"
			placeholder="Click to Enter"
			maxlength="200"
			bind:value={msgInput}
		/>
	</div>
	<div class="col" style="margin-left: 2%">
		<ButtonModal light width="100px" on:click={send} disabled={!isOnline}>
			{#if isOnline}
				<span style="margin-right: -20%;">Send</span>
			{:else}
				<span style="margin-right: -20%;"> ... </span>
			{/if}
		</ButtonModal>
	</div>
</form>

<style>
	.message-box {
		display: flex;
		width: 100%;
		border-top: 1px solid rgba(210, 198, 156, 0.5);
		padding-top: 4%;
	}
	.input {
		width: 100%;
	}

	span {
		width: fit-content;
	}
</style>
