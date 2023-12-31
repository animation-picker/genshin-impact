<script>
	import { fade, fly } from 'svelte/transition';
	import { getContext, onMount } from 'svelte';
	import { t } from 'svelte-i18n';
	import { HOST, IBB_KEY } from '$lib/env';
	import { editID, isMobile } from '$lib/store/app-stores';
	import { BannerManager } from '$lib/helpers/dataAPI/api-indexeddb';
	import { base64ToBlob } from '$lib/helpers/assets';
	import { localBanner, onlineBanner } from '$lib/helpers/custom-banner';
	import { copy } from '$lib/helpers/nameText';
	import { playSfx } from '$lib/helpers/audio/audio';
	import Icon from '$lib/components/Icon.svelte';
	import ButtonModal from '$lib/components/ButtonModal.svelte';

	let percentage = 0;
	let uploadProccess = true;
	let cloudProccess = false;
	let uploadError = false;
	let itemInProccess = '';
	const itemName = { artURL: 'SplashArt', faceURL: 'Face', thumbnail: 'Banner Preview' };

	let showToast;
	let shareID = '';
	let character = '';
	let thumbnail = '';
	$: shareLink = `${HOST}/?banner=${shareID}`;
	$: shareText = $t('customBanner.shareText');

	const copyHandle = async () => {
		playSfx();
		copy(shareLink);
		showToast = true;
		const t = setTimeout(() => {
			showToast = false;
			clearTimeout(t);
		}, 2000);
	};

	const facebookHandle = () => {
		playSfx();
		const url = `https://web.facebook.com/sharer/sharer.php?u=${shareLink}&quote=${shareText}`;
		window.open(url, '_blank');
	};

	const twitterHandle = () => {
		playSfx();
		const url = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareLink}`;
		window.open(url, '_blank');
	};

	const webShareHandle = async () => {
		try {
			playSfx();
			const generalDataToShare = {
				title: `${character} Wish Simulator`,
				text: shareText,
				url: shareLink
			};

			const blob = base64ToBlob(thumbnail);
			const files = new File([blob], `WishSimulator.App - ${new Date().toLocaleString()}.png`, {
				type: blob.type,
				lastModified: new Date().getTime()
			});

			const dataWithPic = { ...generalDataToShare, files: [files] };
			const attachPic = navigator?.canShare(dataWithPic);
			const dataToShare = attachPic && $isMobile ? dataWithPic : generalDataToShare;
			await navigator.share(dataToShare);
		} catch (e) {
			console.error('Abort Sharing', e);
		}
	};

	// Publish
	const chatToggle = getContext('chatToggle');
	const publishError = getContext('publishError');
	const publishDone = getContext('publishDone');
	const closePublisher = getContext('closePublisher');
	const closeModal = () => {
		playSfx();
		publishDone();
	};

	const saveToCloud = async () => {
		uploadProccess = false;
		cloudProccess = true;
		({ shareID, character, thumbnail } = await onlineBanner.updateData($editID));
		cloudProccess = false;
	};

	const upload = async ({ file, total = 0, number = 0, key }) => {
		const result = new Promise((resolve, reject) => {
			try {
				const data = new FormData();
				data.append('image', file);

				const request = new XMLHttpRequest();
				request.open('POST', `https://api.imgbb.com/1/upload?key=${IBB_KEY}`);
				request.send(data);
				request.addEventListener('error', () => reject({ success: false }));

				// Track Upload Proggress
				request.upload.addEventListener('progress', (e) => {
					const proggress = e.loaded / e.total;
					const maxPrgPerItem = 1 / total;
					const proggressPerItem = proggress * maxPrgPerItem;
					const acumulatedProgress = (number - 1) * maxPrgPerItem + proggressPerItem;
					percentage = Math.round(acumulatedProgress * 100);
				});

				// request finished event
				request.addEventListener('load', async () => {
					const newData = JSON.parse(request.responseText);
					if (request.status != 200) return reject({ success: false, ...newData });
					await localBanner.renewImage({ id: $editID, newData, key });
					resolve({ ...newData, status_code: 200 });
				});
			} catch (e) {
				return reject({ success: false });
			}
		});
		return result;
	};

	const doPublish = async () => {
		if (!window.navigator.onLine) return publishError();

		const idb = BannerManager;
		const data = await idb.get($editID);
		const { imgChanged = {}, images = {} } = data;
		const changedImgs = Object.keys(imgChanged).filter((key) => imgChanged[key]);

		if (changedImgs.length < 1) return saveToCloud();

		let i = 0;
		for await (const imgKey of changedImgs) {
			i++;
			if (!images[imgKey]) continue;
			const file = images[imgKey].split(',')[1];
			if (!file) continue;

			try {
				itemInProccess = imgKey;
				await upload({ file, number: i, total: changedImgs.length, key: imgKey });
				if (i < changedImgs.length) continue;
				saveToCloud();
			} catch (e) {
				uploadProccess = false;
				cloudProccess = false;
				uploadError = true;
			}
		}
	};

	onMount(doPublish);
</script>

{#if showToast}
	<div class="toast" in:fly={{ y: 10 }} out:fade>Copied to Clipboard</div>
{/if}

<div class="publisher" transition:fade>
	<div class="container">
		{#if uploadProccess}
			<div class="content" in:fade>
				<caption class="load-text" style="position: relative;">
					{@html $t('customBanner.uploading', {
						values: { item: `<span>${itemName[itemInProccess]}</span>` }
					})}
				</caption>
				<div class="progress-bar" style="--per:{percentage}%">
					<span />
				</div>
			</div>
		{:else if cloudProccess}
			<div class="content" in:fade>
				<caption class="load-text"> {$t('customBanner.almostDone')} </caption>
				<div class="loader">
					<Icon type="loader" />
				</div>
			</div>
		{:else if uploadError}
			<div class="content" in:fade>
				<caption class="load-text"> {$t('customBanner.uploadFailed')} </caption>
				<div class="report">
					Please <button on:click={chatToggle}>Report</button> if you think this is a mistake!
				</div>
				<div style="margin-top: 1rem;">
					<ButtonModal on:click={closePublisher}>{$t('customBanner.close')}</ButtonModal>
				</div>
			</div>
		{:else}
			<div class="content" in:fade>
				<div class="copy-text">
					<label for="link" class="link">{shareLink}</label>
					<button id="link" title="Copy link" on:click={copyHandle}>
						<i class="gi-copy" />
						<span> Copy </span>
					</button>
				</div>
				<div class="shareable">
					<button class="twitter" title="Share to Twitter" on:click={twitterHandle}>
						<i class="gi-twitter" />
					</button>
					<button class="facebook" title="Share to Facebook" on:click={facebookHandle}>
						<i class="gi-facebook" />
					</button>
					<button class="save" title="More Options" on:click={webShareHandle}>
						<i class="gi-dot-3" />
					</button>
				</div>

				<ButtonModal on:click={closeModal} />
			</div>
		{/if}
	</div>
</div>

<style>
	.publisher {
		position: fixed;
		z-index: +20;
		top: 0;
		left: 0;
		width: var(--screen-width);
		height: var(--screen-height);
		background-color: rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(8px);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.load-text :global(span) {
		color: #ff9615;
	}

	.container {
		width: 600px;
		max-width: 90%;
		background-color: #fbf6ee;
		border: 2px solid #ddd5c8;
		border-radius: 0.5rem;
		padding: 3% 1.5%;
	}

	.load-text {
		display: inline-block;
	}
	.load-text::after {
		content: '.';
		position: absolute;
		right: 0;
		transform: translateX(100%);
		bottom: 0;
		animation: dot 3s infinite;
	}

	.progress-bar {
		width: 100%;
		height: 0.2rem;
		background-color: #ccc;
		margin: 3% 0;
		position: relative;
		border-radius: 1rem;
	}

	.progress-bar span {
		border-radius: inherit;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: var(--per);
		height: 120%;
		background-image: linear-gradient(to left, #898e9d, #4a5265);
		box-shadow: 0 0 0.1rem #fff;
		transition: width 0.05s;
	}

	.content {
		text-align: center;
	}

	.loader {
		margin: 3% 0;
	}

	.report {
		padding-top: 0.5rem;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		font-style: italic;
	}

	.report button {
		color: orange;
		font-weight: bold;
		font-style: inherit;
		transition: all 0.25s;
	}

	.report button:hover {
		text-decoration: underline;
	}

	@media screen and (max-width: 640px) {
		.loader {
			margin: 7% 0;
		}
	}

	.copy-text,
	.loader {
		display: flex;
		align-items: center;
		text-align: center;
		justify-content: center;
		width: 100%;
	}

	.copy-text label {
		padding: 2% 5%;
		background-color: #fff;
		border: 1px solid #898e9d;
		border-radius: 3rem;
		white-space: nowrap;
		width: 80%;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.copy-text button {
		background-color: #898e9d;
		color: #fff;
		line-height: 0;
		padding: 2% 2.5%;
		margin: 1%;
		border-radius: 3rem;
		font-size: 80%;
		display: inline-flex;
		align-items: center;
		transition: all 0.25s;
	}
	.copy-text button:hover {
		background-color: #4a5265;
	}

	.shareable {
		padding: 2%;
	}
	.shareable button {
		padding: 0;
		border-radius: 100%;
		z-index: 10;
		aspect-ratio: 1 / 1;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		line-height: 0;
		margin: 0 0.2rem;
		font-size: 100%;
		opacity: 0.75;
		width: 2.2rem;
		transition: all 0.25s;
		color: #fff;
	}

	.shareable button:hover {
		opacity: 1;
	}
	button:active {
		transform: scale(0.9);
	}

	.twitter {
		background-color: #1da1f2;
	}
	.facebook {
		background-color: #4267b2;
	}
	.save {
		background-color: #3f4349;
	}

	.toast {
		position: fixed;
		z-index: +25;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: inline-block;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		background-color: rgba(173, 128, 65, 0.8);
		color: #fff;
		font-size: 0.75rem;
	}

	@keyframes dot {
		0% {
			content: '.';
		}
		25% {
			content: '..';
		}
		50% {
			content: '...';
		}
		100% {
			content: '';
		}
	}
</style>
