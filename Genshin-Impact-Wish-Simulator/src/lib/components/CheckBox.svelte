<script>
	import { playSfx } from '$lib/helpers/audio/audio';
	import { createEventDispatcher } from 'svelte';

	export let checked = false;
	export let id = '_0';

	const dispatch = createEventDispatcher();
	const change = (e) => {
		const { checked } = e.target;
		dispatch('change', { checked });
		playSfx('click2');
	};
</script>

<div class="checkbox">
	<input type="checkbox" name="check{id}" id="check{id}" {checked} on:change={change} />
	<label for="check{id}">
		<i>✔</i>
		<slot />
	</label>
</div>

<style>
	.checkbox {
		margin: 1%;
	}

	label {
		cursor: inherit;
	}
	.checkbox input + label i {
		color: white;
		display: inline-block;
		width: 1.1rem;
		aspect-ratio: 1/1;
		line-height: 1rem;
		background-color: #fff;
		border: 1px solid #aaa;
		transition: all 0.2s;
		text-align: center;
	}

	.checkbox input:checked + label i {
		background-color: #06bbff;
		border-color: transparent;
	}

	.checkbox:hover input + label i {
		border: 1px solid #06bbff;
		box-shadow: rgba(106, 168, 230, 0.6) 0px 0px 7px 5px;
	}

	.checkbox input {
		display: none;
	}
</style>
