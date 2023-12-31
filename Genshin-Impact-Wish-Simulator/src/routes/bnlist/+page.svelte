<script>
	import ButtonGeneral from '$lib/components/ButtonGeneral.svelte';
	import Background from '$lib/components/RandomBackground.svelte';
	import List from './_list.svelte';

	let loggedIn = false;
	let pass = '';
	let code = '1baedd25059490937a8f7a52dbaf5a7c168bc49f5bac0d7bc48bd6b58a84a421';

	const digestMessage = async (message) => {
		const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
		const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8); // hash the message
		const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
		const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
		return hashHex;
	};

	const login = async () => {
		const codeInput = await digestMessage(pass.trim());
		loggedIn = codeInput === code;
		if (loggedIn) return;
		pass = '';
	};
</script>

<section>
	<Background />
	<div class="container" on:contextmenu|stopPropagation>
		<h1>Control Banner</h1>

		{#if !loggedIn}
			<form on:submit|preventDefault={login}>
				<div class="col">
					<input type="text" bind:value={pass} />
				</div>
				<div class="col button">
					<ButtonGeneral on:click={login}>Show List</ButtonGeneral>
				</div>
			</form>
		{:else}
			<List />
		{/if}
	</div>
</section>

<style>
	section {
		width: 100%;
		height: 100%;
		overflow-y: auto;
		position: relative;
		padding: 1rem;
	}

	.container {
		padding: 1rem;
		background-color: rgba(255, 255, 255, 0.8);
		position: relative;
		border-radius: 1rem;
		z-index: +10;
	}

	form {
		width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		padding: 2rem;
		text-align: center;
	}

	input {
		width: 300px;
		max-width: 90%;
		height: 2.3rem;
		border-radius: 4rem;
		border: 0;
		outline: 0;
		padding: 0 1rem;
	}

	.col.button {
		padding-top: 1rem;
	}
	h1 {
		padding: 1rem;
	}
</style>
