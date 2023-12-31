<script>
	import { t, json } from 'svelte-i18n';
	import { APP_TITLE } from '$lib/env';
	import { customData, isCustomBanner } from '$lib/store/app-stores';
	import { highlightBannerName } from '$lib/helpers/nameText';

	export let tplVersion = 'v1';
	export let bannerType;
	export let bannerName = '';
	export let rateup;
	export let weapons;
	export let character;

	const charNameAndTitle = (name, vision) => {
		const element = `(${$t(vision)})`;
		return `"${$t(`${name}.title`)}" ${$t(`${name}.name`)} ${$t(element)}`;
	};

	const getFeaturedChars = ({ name, vision }) => {
		if (!$isCustomBanner) {
			return `<span class="custom ${vision}-flat">
			"${$t(`${name}.title`)}" ${$t(`${name}.name`)} (${$t(vision)})
		</span>`;
		}

		const { charTitle } = $customData;
		return `<span class="custom ${vision}-flat">
			"${charTitle}" ${name} (${$t(vision)})
		</span>`;
	};

	const getFeaturedWeapon = ({ name, type }) => {
		return `<span class="weapon"> ${$t(name)} (${$t(type)})</span>`;
	};

	const getDelimiter = (arr, i) => {
		if (i > arr.length - 2) return '';
		if (i > arr.length - 3) return '&';
		return ',';
	};

	const getRateupChars = (items) => {
		const translated = items.map(({ name, vision }, i) => {
			return `<span class="custom ${vision}-flat"> ${charNameAndTitle(name, vision)}</span>
			${getDelimiter(rateup, i)}`;
		});
		return translated.join('');
	};

	const getRateupWeapons = (items) => {
		const translated = items.map(({ name, type }, i) => {
			return `<span class="stardust"> ${$t(name)} (${$t(type)})</span>
			${getDelimiter(rateup, i)} `;
		});
		return translated.join('');
	};

	const valuesToToChange = {
		starglitter: `<span class="starglitter"> ${$t('shop.item.starglitter')}</span>`,
		stardust: `<span class="stardust"> ${$t('shop.item.stardust')}</span>`,
		stellaFortuna: `<span class="stardust"> ${$t('wish.stellaFortuna')}</span>`
	};

	const duplicateDetails = (star) => {
		return $t(`details.duplicate.text`, {
			values: {
				rarity: star,
				constBonus: star === 5 ? '×10' : '×2',
				fullConstBonus: star === 5 ? '×25' : '×5',
				...valuesToToChange
			}
		});
	};

	const convertion = (star) => {
		return $t(`details.convertion.${star}`, {
			values: valuesToToChange
		});
	};
</script>

<svelte:head>
	<title>
		{bannerName} | {$t('title', { default: APP_TITLE })}
	</title>
</svelte:head>

<div class="description" class:v2={tplVersion === 'v2'}>
	{#if tplVersion === 'v2'}
		<h2><span>{$t('details.wishDetails')} </span> <span class="line" /></h2>
	{/if}

	{#if bannerType === 'beginner'}
		<h3>{$t('details.beginnerInfo')}</h3>
	{:else if bannerType.match('event')}
		<h3>{$t('details.limited')}</h3>
	{:else}
		<h3>{$t('details.permanent')}</h3>
	{/if}

	{#if bannerType === 'beginner'}
		{@const { name, vision } = character}
		{#each $json('details.beginner') as text}
			<p>
				{@html $t(text, {
					values: {
						character: `<span class="custom ${vision}-flat">
              ${charNameAndTitle(name, vision)}
            </span> `,
						...valuesToToChange
					}
				})}
			</p>
		{/each}
	{:else if bannerType === 'standard'}
		{#each $json('details.standard') as text}
			<p>
				{@html $t(text, {
					values: { bannerName: highlightBannerName(bannerName, 'standard') }
				})}
			</p>
		{/each}
	{:else if bannerType === 'character-event'}
		{#each $json('details.events') as text}
			<p>
				{@html $t(text, {
					values: {
						bannerName: highlightBannerName(bannerName, character.vision),
						featuredCharacter: getFeaturedChars(character),
						rateupCharacters: getRateupChars(rateup)
					}
				})}
			</p>
		{/each}
	{:else if bannerType === 'weapon-event'}
		{#each $json('details.weapons') as text}
			<p>
				{@html $t(text, {
					values: {
						bannerName: highlightBannerName(bannerName, 'epitome'),
						featuredWeapon1: getFeaturedWeapon(weapons[0]),
						featuredWeapon2: getFeaturedWeapon(weapons[1]),
						rateupWeapons: getRateupWeapons(rateup)
					}
				})}
			</p>
		{/each}
	{/if}

	<p>
		{#if bannerType.match(/(weapon|standard)/)}
			{@html convertion('fiveStar')}
		{/if}
		{@html convertion('fourStar')}
		{@html convertion('threeStar')}
	</p>

	<p>{@html $t('details.duplicate.heading')}</p>
	{#if bannerType !== 'weapon-event'} <p>{@html duplicateDetails(5)}</p> {/if}
	<p>{@html duplicateDetails(4)}</p>

	{#if bannerType.match('event')}
		<p>{$t('details.alert', { values: { wishName: $t(`wish.banner.${bannerType}`) } })}</p>
	{/if}
</div>

<style>
	p :global(span):not([class*='-flat']) {
		color: #cf5e47;
	}

	p :global(span.invocation) {
		color: #ef7c1aff;
	}

	p :global(span.starglitter) {
		color: #c37b4d;
	}
	p :global(span.stardust) {
		color: #a256e1;
	}
	p :global(span.wish) {
		color: #debd6c;
	}
	p :global(span.electro-flat) {
		color: #ca82fc;
	}
	p :global(span.std-flat) {
		color: #757acdff;
	}

	p :global(span .weapon) {
		color: #bd6932;
	}

	p {
		font-size: 150%;
		line-height: 170%;
		margin: 1rem 0;
	}

	.v2 p {
		font-size: calc(0.017 * var(--content-width));
	}

	h2 {
		font-size: calc(0.015 * var(--content-width));
		padding: calc(0.007 * var(--content-width)) 0;
		display: flex;
	}

	h3 {
		padding: 0.2rem 0.7rem;
		font-weight: 400;
		color: #fff;
		background-color: #a28052;
		vertical-align: middle;
	}

	.v2 h3 {
		background-color: #6f778a;
		font-size: calc(0.015 * var(--content-width));
	}
</style>
