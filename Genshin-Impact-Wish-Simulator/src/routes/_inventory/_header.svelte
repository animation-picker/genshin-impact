<script>
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import hotkeys from 'hotkeys-js';

	import { acquaint, genesis, intertwined, primogem } from '$lib/store/app-stores';
	import { playSfx } from '$lib/helpers/audio/audio';
	import Icon from '$lib/components/Icon.svelte';

	export let activeItem = '';

	const navigate = getContext('navigate');
	const handleCLose = () => {
		navigate('index');
		playSfx('close');
	};

	// shortcut
	hotkeys('esc', 'inventory', (e) => {
		e.preventDefault();
		handleCLose();
	});
</script>

<h1 class="title">{$t('inventory.text')} / {$t(activeItem)}</h1>
<div class="budget">
	<button class="intertwined">
		<Icon
			height="70%"
			width="auto"
			style="position: absolute; left: 5px;top: 50%; transform: translateY(-50%);"
			type="intertwined"
		/>
		{$intertwined}
	</button>
	<button class="acquiant">
		<Icon
			height="70%"
			width="auto"
			style="position: absolute; left: 5px;top: 50%; transform: translateY(-50%);"
			type="acquaint"
		/>
		{$acquaint}
	</button>
	<button class="primogem">
		<Icon
			type="primogem"
			height="80%"
			width="auto"
			style="position: absolute; left: 5px;top: 50%; transform: translateY(-50%);"
		/>
		{$primogem}
	</button>
	<button class="genesis">
		<Icon
			type="genesis"
			height="80%"
			width="auto"
			style="position: absolute; left: 5px;top: 50%; transform: translateY(-50%);"
		/>
		{$genesis}
	</button>
</div>
<button class="close" on:click={handleCLose}>
	<i class="gi-close" />
</button>

<style>
	.title {
		color: #d2c69c;
		text-transform: capitalize;
		display: flex;
		align-items: center;
		text-align: left;
	}
	:global(.mobile) .title {
		font-size: small;
	}
	.budget {
		text-align: right;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		margin-left: auto;
	}

	button:not(.close) {
		display: inline-block;
		max-width: 112px;
		height: 25px;
		overflow: hidden;
		background-color: rgba(0, 0, 0, 0.3);
		border-radius: 50px;
		color: #fff;
		vertical-align: middle;
		text-align: center;
		position: relative;
		margin: 0 0.3rem;
		padding: 0 15px 0 30px;
	}

	:global(.mobile) .close {
		margin-right: 4%;
	}

	@media screen and (max-width: 900px) {
		.title {
			font-size: small;
		}
		button {
			height: 20px;
			margin: 0 3px;
		}

		:global(main):not(.mobile) .budget {
			flex-wrap: wrap;
		}
	}
	@media screen and (max-width: 400px) {
		button {
			max-width: 80px;
		}
	}
</style>
