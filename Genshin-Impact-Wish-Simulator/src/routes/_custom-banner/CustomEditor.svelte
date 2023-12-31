<script>
	import { setContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { activeVersion, assets, bannerList, editID } from '$lib/store/app-stores';
	import { BannerManager } from '$lib/helpers/dataAPI/api-indexeddb';

	import Icon from '$lib/components/Icon.svelte';
	import FrameCustom from '../_wish/banner-card/_frame-custom.svelte';
	import InfoButton from './BannerEditor/_info-face-button.svelte';
	import SplashartForm from './BannerEditor/_splashart-form.svelte';
	import MainArt from './BannerEditor/BannerArt.svelte';
	import VisionPicker from './BannerEditor/_vision-picker.svelte';
	import InfoEditor from './BannerEditor/_info-editor.svelte';
	import SplashArtEditor from './SplashArtEditor/SplashArt.svelte';

	let clientHeight;
	let clientWidth;
	let onBannerEdit = false;
	let isInfoEdit = false;
	let isSplashArtEdit = false;
	let isLoaded = false;
	let isEdited = false;

	// Banner Info
	let bannerID = $editID;
	let dataToEdit = {};
	let bannerName = '';
	let character = '';
	let charTitle = '';
	let vision = '';
	let watermark = '';
	let rateup = [];

	let imgChanged = { artURL: false, faceURL: false, thumbnail: false };
	let artPosition = { banner: {}, splashArt: {}, wishCard: {} };
	let images = {};

	const idb = BannerManager;
	const readIDB = async (id) => {
		if (isLoaded) return;
		isLoaded = true;
		dataToEdit = await idb.get(id);
		({
			bannerName = '',
			character = '',
			charTitle = '',
			watermark = '',
			vision = 'pyro',
			rateup = [],
			artPosition = {},
			images = {},
			imgChanged = {}
		} = dataToEdit);
	};

	// prettier-ignore
	$: bannerData = { bannerName, character, charTitle, watermark, vision, rateup, artPosition, images, imgChanged };

	const autoSave = async (data) => {
		if (!isLoaded) return;
		if (!isEdited) return (isEdited = true);
		const editedData = { ...dataToEdit, isChanged: true, itemID: $editID, ...data };
		delete editedData.lastModified; //renew LastModified
		await idb.put(editedData);

		// Update Store if banner is active
		const { phase: activeID, patch } = $activeVersion;
		if (!(patch.match('local') && activeID === bannerID)) return;
		$bannerList[0] = { ...editedData, type: 'character-event' };
		return;
	};
	$: autoSave(bannerData);

	// Splash Art
	const editSplashArt = (val) => (isSplashArtEdit = val);
	setContext('editSplashArt', editSplashArt);

	// Banner
	const setPosition = (type, pos) => (artPosition[type] = pos);
	setContext('setPosition', setPosition);

	const editBanner = (val) => (onBannerEdit = val);
	setContext('editBanner', editBanner);

	const editInfo = (val) => (isInfoEdit = val);
	setContext('editInfo', editInfo);

	const setVision = (vi) => (vision = vi);
	setContext('setVision', setVision);

	const setRateup = (chars) => (rateup = chars);
	setContext('setRateup', setRateup);

	const setCharName = (name) => (character = name);
	setContext('setCharName', setCharName);

	const setCharTitle = (title) => (charTitle = title);
	setContext('setCharTitle', setCharTitle);

	const setBannerName = (name) => (bannerName = name);
	setContext('setBannerName', setBannerName);

	const setWatermark = (text) => (watermark = text);
	setContext('setWatermark', setWatermark);

	const changeArt = (file) => {
		if (!file) return;
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.addEventListener('load', () => {
			images.artURL = reader.result;
			imgChanged.artURL = true;
			onBannerEdit = true;
		});
	};
	setContext('changeArt', changeArt);

	const changeFace = (file) => {
		if (!file) return;
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.addEventListener('load', () => {
			images.faceURL = reader.result;
			imgChanged.faceURL = true;
		});
	};
	setContext('changeFace', changeFace);

	const changeThumbnail = (file) => {
		if (!file) return;
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.addEventListener('load', () => {
			images.thumbnail = reader.result;
			imgChanged.thumbnail = true;
		});
	};
	setContext('changeThumbnail', changeThumbnail);
</script>

{#await readIDB(bannerID)}
	<div class="loading" out:fade>
		<div class="loader">
			<Icon type="loader" width="40px" />
		</div>
	</div>
{/await}

<div
	class="card"
	id="cardEditor"
	class:isLoaded
	bind:clientWidth
	bind:clientHeight
	style="--content-width:{clientWidth}px; --content-height:{clientHeight}px"
>
	<img
		src={$assets[`blank/${vision}`]}
		alt="Background Banner"
		crossorigin="anonymous"
		class="art-bg"
	/>

	<VisionPicker selected={vision} />
	{#key artPosition}
		<MainArt {onBannerEdit} artURL={images?.artURL} bannerPosition={artPosition?.banner} />
	{/key}
	<SplashartForm {onBannerEdit} />
	<FrameCustom
		editorMode
		{onBannerEdit}
		{vision}
		{bannerName}
		{character}
		{charTitle}
		{watermark}
	/>
	<InfoButton faceURL={images?.faceURL} {onBannerEdit} />
</div>

{#if isInfoEdit}
	<InfoEditor
		preview={images?.thumbnail}
		{rateup}
		{bannerName}
		{character}
		{charTitle}
		{watermark}
	/>
{/if}

{#if isSplashArtEdit}
	<SplashArtEditor
		on:close={() => editSplashArt(false)}
		artURL={images?.artURL}
		position={artPosition}
		{character}
		{vision}
	/>
{/if}

<style>
	.card {
		/* background-image: linear-gradient(to top, #eee8e3 50%, #f7f5f4); */
		position: relative;
	}

	.card {
		width: 100%;
		height: fit-content;
		aspect-ratio: 1080/533;
	}

	img {
		width: 100%;
		height: 100%;
		display: block;
		object-fit: contain;
		object-position: center;
	}

	.loading {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 100%;
		height: 100%;
		transform: translate(-50%, -50%);
		z-index: +20;
		display: flex;
		justify-content: center;
		align-items: center;
		backdrop-filter: blur(8px);
		background-color: rgba(0, 0, 0, 0.2);
	}

	.loader {
		--text-color: rgba(248, 184, 22, 0.7);
		aspect-ratio: 1/1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
