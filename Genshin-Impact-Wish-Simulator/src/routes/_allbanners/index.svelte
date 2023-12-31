<script>
	import { getContext, onDestroy, onMount, setContext } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { flip } from 'svelte/animate';
	import OverlayScrollbars from 'overlayscrollbars';
	import hotkeys from 'hotkeys-js';

	import { allPatch } from '$lib/data/wish-setup.json';
	import { APP_TITLE } from '$lib/env';
	import { BannerManager } from '$lib/helpers/dataAPI/api-indexeddb';
	import { assets, isMobile } from '$lib/store/app-stores';
	import { getBannerName } from '$lib/helpers/nameText';
	import { playSfx } from '$lib/helpers/audio/audio';
	import ItemBanner from './_item-banner.svelte';
	import FormBox from './_form-box.svelte';

	let allBanners = [];
	let dataToShow = [];
	let customBanner = [];
	let groupby = 'version';
	const query = getContext('query');

	const sort = (arr) =>
		arr.sort((a, b) => {
			if (a[0] > b[0]) return 1;
			if (a[0] < b[0]) return -1;
			return 0;
		});

	const groupByChars = () => {
		const char = {};
		allBanners.forEach((data) => {
			data[1].forEach((dt) => {
				dt.chars.forEach(({ character }) => {
					char[character] = [...(char[character] || []), dt];
				});
			});
		});
		dataToShow = sort(Object.entries(char));
		return;
	};

	const groupByWeapon = () => {
		const weap = {};
		allBanners.forEach((data) => {
			data[1].forEach((wp) => {
				const { weapons } = wp;
				const weapon1 = weapons.list[0].name;
				const weapon2 = weapons.list[1].name;
				weap[weapon1] = [...(weap[weapon1] || []), wp];
				weap[weapon2] = [...(weap[weapon2] || []), wp];
			});
		});
		dataToShow = sort(Object.entries(weap));
		return;
	};

	const groupData = (group) => {
		if (group === 'version') dataToShow = allBanners;
		if (group === 'character') return groupByChars();
		if (group === 'weapon') return groupByWeapon();
	};

	const selectGroup = (group = null) => {
		playSfx();
		if (!group) return;
		groupby = group;
		groupData(group);
	};
	setContext('selectGroup', selectGroup);

	const reverse = () => {
		playSfx();
		dataToShow = dataToShow.reverse();
	};
	setContext('reverse', reverse);

	const translateWp = (bannerName, featured) => {
		const { number } = getBannerName(bannerName);
		const tmp = [`${$t(`wish.banner.name.epitome-invocation`)}-${number}`];
		featured.forEach(({ name }) => {
			tmp.push($t(name));
			tmp.push(name);
		});
		return tmp;
	};

	const translateChar = (item) => {
		const tmp = [];
		const translate = (name, character) => {
			const banner = getBannerName(name);
			tmp.push(character);
			tmp.push(name);
			tmp.push($t(`${character}.name`));
			tmp.push(`${$t(`wish.banner.name.${banner.name}`)}-${banner.number}`);
		};

		item.forEach(({ bannerName, character }) => translate(bannerName, character));
		return tmp;
	};

	const generateQueryKey = (ver, phase, banners) => {
		const { events, weapons } = banners;
		const { rateup, bannerName, featured } = weapons;

		const translatedRateupWp = rateup.map((wp) => $t(wp));
		const translatedBannerWp = translateWp(bannerName, featured);
		const translatedRateupCh = events.rateup.map((ch) => $t(`${ch}.name`));
		const translatedBannerCh = translateChar(events.featured);
		const queryKey = [
			...translatedRateupWp,
			...translatedBannerWp,
			...translatedRateupCh,
			...translatedBannerCh,
			...events.rateup,
			...rateup
		];

		const result = {
			queryKey,
			rateup: [...events.rateup, ...weapons.rateup],
			weapons: { bannerName: weapons.bannerName, list: weapons.featured },
			chars: events.featured,
			patch: ver,
			phase
		};
		return result;
	};

	const checkAllBanner = async () => {
		const patchList = [];
		allPatch.forEach((patch) => {
			const json = import(`../../lib/data/banners/events/${patch.toFixed(1)}.json`);
			patchList.push(json);
		});

		const promise = await Promise.all(patchList);
		const data = promise.map(({ data, patch }) => {
			patch = patch.toFixed(1);
			data = data.map(({ phase, banners }) => generateQueryKey(patch, phase, banners));
			return [patch.toString(), data];
		});

		allBanners = data.reverse();
		if ($query.trim().length > 0) return handleSearch($query);
		dataToShow = allBanners;
		return data;
	};

	const handleSearch = (e) => {
		groupby = 'version';
		const queryValue = typeof e === 'string' ? e : e.target.value;
		const query = queryValue.toLocaleLowerCase().trim().replace(/'/, '');
		if (query.length < 1) return (dataToShow = allBanners);

		const check = (t) => {
			const text = t.toLocaleLowerCase();
			return text.replace(/_/g, '').replace(/-/g, ' ').includes(query);
		};

		const newArr = allBanners.map(([a, b]) => {
			const filtered = b.filter(({ queryKey }) => {
				const checkQueryKey = queryKey.map((name) => check(name));
				return checkQueryKey.includes(true);
			});

			return [a, filtered];
		});
		dataToShow = newArr.filter(([, b]) => b.length > 0);
	};
	setContext('handleSearch', handleSearch);

	const readSavedCustomBanner = async () => {
		const data = await BannerManager.getListByStatus('cloud');
		const proccessed = data.map(({ bannerName, hostedImages, character, itemID, rateup }) => {
			const { thumbnail } = hostedImages || {};
			const chars = [{ bannerName, character, images: thumbnail }];
			const itemData = { rateup, chars, phase: itemID, patch: 'Custom' };
			return itemData;
		});
		customBanner = ['Custom', proccessed];
	};
	const loadData = async () => {
		await checkAllBanner();
		await readSavedCustomBanner();
		return 'ok';
	};

	let content;
	onMount(async () => {
		playSfx('prevbanner');
		OverlayScrollbars(content, { sizeAutoCapable: false, className: 'os-theme-light' });
	});

	onDestroy(() => query.set(''));

	const navigate = getContext('navigate');
	const handleClose = () => {
		navigate('index');
		playSfx('close');
	};

	// Shortcut
	hotkeys('esc', 'allbanners', (e) => {
		e.preventDefault();
		handleClose();
	});
</script>

<svelte:head>
	<title>{$t('wish.banner.allBanner')} | {$t('title', { default: APP_TITLE })}</title>
</svelte:head>

<section id="previous" style="background-image: url({$assets['constellation.webp']});">
	<header transition:fly={{ y: -20 }}>
		<h1>{$t('wish.banner.previous')}</h1>
		<button class="close" on:click={handleClose}>
			<i class="gi-close" />
		</button>
	</header>

	<div class="body" transition:fade={{ duration: 300 }}>
		<FormBox {groupby} />
		<div class="content" bind:this={content}>
			<div id="content">
				{#await loadData() then _}
					{@const bn = customBanner[1].length < 1 ? dataToShow : [customBanner, ...dataToShow]}

					{#if $isMobile}
						{#each bn as [groupName, data]}
							<div in:fade={{ duration: 300 }} class:custom={groupName.match(/custom/gi)}>
								<ItemBanner {data} {groupName} {groupby} />
							</div>
						{/each}
					{:else}
						{#each bn as [groupName, data], i (groupName)}
							<div
								animate:flip={{ duration: (i) => 10 * Math.sqrt(i) }}
								in:fade={{ duration: 300, delay: Math.sqrt(i * 20000) }}
								class:custom={groupName.match(/custom/gi)}
							>
								<ItemBanner {data} {groupName} {groupby} />
							</div>
						{/each}
					{/if}
				{/await}
			</div>
		</div>
	</div>
</section>

<style>
	section {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-size: cover;
		color: var(--tertiary-color);
		font-size: 0.97rem;
		position: relative;
		z-index: +1;
	}
	h1 {
		color: var(--tertiary-color);
	}
	header {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15px 2%;
	}
	:global(.mobile) header {
		padding: 5px 2%;
	}

	button:hover {
		background-color: var(--tertiary-color);
	}

	.close {
		margin-left: auto;
	}
	:global(.mobile) .close {
		margin-right: 4.5%;
	}

	.body {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}

	.content {
		padding: 1rem 2%;
		width: 100%;
		height: 100%;
		display: block;
	}

	#content > .custom {
		border-bottom: 1px solid #ccc;
	}
</style>
