<script>
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { cookie } from '$lib/helpers/dataAPI/api-cookie';
	import Badwords from '$lib/helpers/chat/badwords';
	import ModalTpl from '../ModalTpl.svelte';

	let error = false;
	let errorMsg = '';
	let newName = cookie.get('nickName') || cookie.get('travelerID');
	const toggleNick = getContext('toggleNick');

	const setName = () => {
		let newNick = newName.trim();
		if (newNick === '') return;
		if (/[,./\\=+#@~` *":;_$^?$%&<>[\]{}()|]/.test(newNick)) {
			error = true;
			errorMsg = 'Illegal character detected';
			return;
		}
		if (Badwords.hasBadword(newNick)) {
			error = true;
			errorMsg = 'Badword Detected, Use different Name!';
			return;
		}
		toggleNick();
		cookie.set('nickName', newNick);
	};
</script>

<ModalTpl show dark on:cancel={toggleNick} title="Edit Nickname" on:confirm={setName}>
	<div class="input">
		<input
			type="text"
			class="wishinput"
			placeholder="Input Nickname"
			maxlength="15"
			class:error
			bind:value={newName}
			on:input={() => (error = false)}
		/>
		{#if error}
			<div class="warning" transition:fade={{ duration: 250 }}>{errorMsg}</div>
		{/if}
	</div>
</ModalTpl>

<style>
	.input {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	input {
		width: 70%;
		text-align: center;
	}

	.warning {
		position: absolute;
		top: 65%;
		left: 50%;
		transform: translateX(-50%);
		color: #fff;
		background-color: #ee6c4c;
		font-size: x-small;
		padding: 1% 3%;
		border-radius: 0.3rem;
	}
</style>
