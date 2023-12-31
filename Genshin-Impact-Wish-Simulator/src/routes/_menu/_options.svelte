<script>
	import { createEventDispatcher, getContext } from 'svelte';
	import { fly } from 'svelte/transition';
	import { locales, locale, t } from 'svelte-i18n';
	import {
		activeVersion,
		primogem as primo,
		acquaint as ac,
		intertwined as iw,
		stardust as sd,
		starglitter as sg
	} from '$lib/store/app-stores';
	import { localBalance, localConfig } from '$lib/helpers/dataAPI/api-localstore';
	import { cookie } from '$lib/helpers/dataAPI/api-cookie';
	import { playSfx } from '$lib/helpers/audio/audio';
	import { localeName, flags } from '$lib/data/country.json';
	import { availableCurrencies, userCurrencies } from '$lib/helpers/currencies';
	import { loadMembers } from '$lib/helpers/member-loader';

	export let name;
	export let useInput = false;
	export let inputValue = '';
	export let sub = false;
	export let activeIndicator = null;
	export let showOption = false;

	const handleOption = getContext('handleOption');
	const reset = getContext('factoryReset');

	const dispatch = createEventDispatcher();
	let select = (selected) => {
		playSfx();
		showOption = !showOption;
		if (!selected) return;

		dispatch('select', { selected });
		handleOption('');
	};

	const openOption = () => {
		playSfx();
		if (showOption) return handleOption('');
		handleOption(name);
	};

	const navigate = getContext('navigate');
	const openPrevious = () => {
		playSfx('prevbanner');
		navigate('allbanners');
	};

	// Set Language
	const setLang = (langID) => {
		playSfx();
		locale.set(langID);
		localConfig.set('locale', langID);
		handleOption('');
		userCurrencies.init();
	};

	// Currency
	$: currencyIndicator = $locale ? userCurrencies.checkUsedCurrency().currency : '';
	const setCurrency = (selected) => {
		playSfx();
		cookie.set('currency', selected);
		currencyIndicator = selected;
		userCurrencies.init(selected);
		handleOption('');
	};

	// Wish Amount
	const selectAmount = (val) => {
		playSfx();
		handleOption('');
		dispatch('select', val);
	};

	const gameCurrencyList = {
		primogem: primo,
		intertwined: iw,
		acquaint: ac,
		starglitter: sg,
		stardust: sd
	};

	$: balance = gameCurrencyList[inputValue];
	const setMultiPull = getContext('setMultiPull');

	const setGameCurrencies = (value) => {
		gameCurrencyList[inputValue]?.set(value);
		localBalance.set(inputValue, value);
	};

	const setValues = (e) => {
		const inputVal = e.target.value.substring(0, 9);
		const numberVal = parseInt(inputVal, 10);
		const minVal = name === 'multi' ? 1 : 0;
		const value = !isNaN(numberVal) ? numberVal : minVal;
		e.target.value = value;

		if (name === 'currencyItem') return setGameCurrencies(value);
		if (name === 'multi') return setMultiPull(value);
	};

	let files;

	const handleUpload = () => {
		if (files) {
			// console.log(files[0]);
			loadMembers(files[0]);
		}
	}

</script>

<div class="option" class:sub>
	<div class="option-name">
		<slot />
	</div>

	{#if useInput}
		<input
			min="0"
			type="number"
			class="option-select"
			value={name === 'currencyItem' ? $balance : inputValue}
			on:input={setValues}
		/>

		<!-- Languages -->
	{:else if name === 'locale'}
		<div class="option-select locale">
			<button
				class="selected"
				style="width: 100%; height:100%"
				on:click|stopPropagation={openOption}
			>
				<img src="data:image/png;base64,{flags[activeIndicator]}" alt="flag" class="flag" />
				{localeName[activeIndicator]}
			</button>
			<i class="gi-caret-{showOption ? 'up' : 'down'}" />
			{#if showOption}
				<div class="select" in:fly={{ duration: 200, y: -10 }}>
					{#each $locales as locale}
						<button
							class:selected={activeIndicator === locale}
							on:click|stopPropagation={() => setLang(locale)}
						>
							<span style="text-align:right; padding-right: 1rem; width:50%">
								<img src="data:image/png;base64,{flags[locale]}" alt="flag" class="flag" />
							</span>
							<span style="text-align:left;width:100%"> {localeName[locale]} </span>
						</button>
					{/each}
				</div>
			{/if}
		</div>

		<!-- User Currency -->
	{:else if name === 'currency'}
		<div class="option-select locale">
			<button
				class="selected"
				style="width: 100%; height:100%"
				on:click|stopPropagation={openOption}
			>
				{currencyIndicator}
			</button>
			<i class="gi-caret-{showOption ? 'up' : 'down'}" />
			{#if showOption}
				<div class="select" in:fly={{ duration: 200, y: -10 }}>
					{#each availableCurrencies as { currency }}
						<button
							class:selected={currencyIndicator === currency}
							on:click|stopPropagation={() => setCurrency(currency)}
						>
							<span style="text-align:center;width:100%;padding: 3%"> {currency} </span>
						</button>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Wish Amount -->
	{:else if name === 'wishAmount'}
		<div class="option-select wishAmount">
			<button
				class="selected"
				style="width: 100%; height:100%"
				on:click|stopPropagation={openOption}
			>
				{activeIndicator === 'default' ? $t('outfit.default') : $t(`menu.${activeIndicator}`)}
			</button>
			<i class="gi-caret-{showOption ? 'up' : 'down'}" />
			{#if showOption}
				<div class="select" in:fly={{ duration: 200, y: -10 }}>
					{#each ['default', 'unlimited', 'manual'] as item}
						<button class:selected={activeIndicator === item} on:click={() => selectAmount(item)}>
							<span style="text-align:center;width:100%;padding: 3%">
								{item === 'default' ? $t('outfit.default') : $t(`menu.${item}`)}
							</span>
						</button>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Switch Banner -->
	{:else if name === 'switchBanner'}
		<button class="option-select" on:click={openPrevious}>
			<i class="gi-caret-down" />
			{$activeVersion.patch} - {$activeVersion.phase}
		</button>

		<!-- Reset -->
	{:else if name === 'reset'}
		<button class="option-select" on:click={reset}>
			<i class="gi-delete" style="vertical-align: bottom; line-height: 0; margin-right: .2rem" />
			{$t('menu.resetButton')}
		</button>

		<!-- General Option -->
	{:else if name === 'upload'}
		<input class="option-select-square" bind:files type="file" id="fileInput" accept=".txt" />
			
		<button class="option-select" on:click={handleUpload}>
			上传
		</button>
	{:else}
		<div class="option-select">
			<button
				class="selected"
				style="width: 100%; height:100%"
				on:click|stopPropagation={openOption}
			>
				{activeIndicator ? $t('menu.yes') : $t('menu.no')}
			</button>
			<i class="gi-caret-{showOption ? 'up' : 'down'}" />
			{#if showOption}
				<div class="select" in:fly={{ duration: 200, y: -10 }}>
					<button class:selected={!activeIndicator} on:click|stopPropagation={() => select('no')}>
						{$t('menu.no')}
					</button>
					<button class:selected={activeIndicator} on:click|stopPropagation={() => select('yes')}>
						{$t('menu.yes')}
					</button>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.option {
		display: flex;
		width: 100%;
		padding: 0.4rem 0;
	}
	@media screen and (max-width: 900px) {
		.option {
			padding: 0.3rem 0;
		}
	}
	.option-name {
		background-color: #eae5d9;
		width: 100%;
		padding: 0.35rem 1rem;
		border-top-left-radius: 5rem;
		border-bottom-left-radius: 5rem;
		border: solid transparent;
		border-width: 0.2rem 0 0.2rem 0.2rem;
		white-space: nowrap;
	}
	.sub .option-name {
		width: 87%;
		margin-left: 10%;
		position: relative;
	}

	.sub .option-name::before {
		content: '';
		position: absolute;
		left: -13%;
		width: 15%;
		height: 148%;
		z-index: -1;
		bottom: 50%;
		border-bottom: #dcd4c2 dashed 0.12rem;
		border-left: #dcd4c2 dashed 0.12rem;
		opacity: 0.5;
	}

	.option-select-square {
		background-color: #dcd4c2;
		width: 40%;
		max-width: 14rem;
		text-align: center;
		position: relative;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		transition: all 0.2s;
		border: solid transparent;
		border-width: 0.2rem 0.2rem 0.2rem 0;
	}

	.option-select {
		background-color: #dcd4c2;
		width: 40%;
		max-width: 14rem;
		text-align: center;
		position: relative;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		border-top-right-radius: 5rem;
		border-bottom-right-radius: 5rem;
		transition: all 0.2s;
		border: solid transparent;
		border-width: 0.2rem 0.2rem 0.2rem 0;
	}

	.option:hover .option-name,
	.option:hover .option-select {
		border-color: #fff;
	}

	.option-select i {
		position: absolute;
		top: 50%;
		right: 1rem;
		font-size: 1rem;
		transform: translateY(-50%);
		pointer-events: none;
	}

	.option-select button,
	.option-select {
		font-size: 0.7rem;
	}
	input.option-select {
		font-size: 0.8rem;
	}

	.select {
		position: absolute;
		top: 110%;
		left: 0;
		width: 100%;
		max-height: 60vh;
		background-color: #565a64;
		box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
		z-index: +1;
		border-radius: 1rem;
		overflow-y: auto;
		padding: 1% 2%;
	}

	.select button {
		display: block;
		width: 100%;
		padding: 6%;
		color: #eee;
		margin: 1% 0;
		transition: all 0.2s;
		position: relative;
	}

	.select button:hover,
	.select button.selected {
		background-color: #717887;
		border-radius: 2rem;
	}

	.select button.selected::after {
		content: '✔';
		color: #eee;
		position: absolute;
		display: block;
		top: 50%;
		right: 8%;
		font-size: 170%;
		line-height: 0;
		transform: translateY(-50%);
	}

	.locale {
		font-family: var(--gi-global-font);
	}
	.locale .select button {
		display: flex;
		justify-content: center;
		align-items: center;
		line-height: 0%;
		padding: 6% 8%;
	}

	.flag {
		width: 1.2rem;
	}

	@media screen and (max-width: 900px) {
		:global(main):not(.mobile) .option-name {
			font-size: 120%;
		}
	}
</style>
