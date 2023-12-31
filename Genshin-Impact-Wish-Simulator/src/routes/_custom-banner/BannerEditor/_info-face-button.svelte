<script>
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import { assets } from '$lib/store/app-stores';
	import { playSfx } from '$lib/helpers/audio/audio';
	import { pushToast } from '$lib/helpers/toast';

	export let onBannerEdit = false;
	export let faceURL = '';

	const editInfo = getContext('editInfo');
	const changeFace = getContext('changeFace');
	const editSplashArt = getContext('editSplashArt');
	const allowedType = 'image/png, image/webp, image/jpeg';

	const showInfoEditor = () => {
		editInfo(true);
		playSfx('modal');
	};

	const showSplashArtEdit = () => {
		editSplashArt(true);
		playSfx();
	};

	const handleImage = (e) => {
		try {
			const file = e.target.files[0];
			const isImage = allowedType.match(file.type);

			if (!isImage) {
				const message = $t('customBanner.notAnImage');
				pushToast({ message });
				throw new Error(message);
			}

			const fileSize = file.size;
			const maxSize = 1024 * 1024 * 2; // 2MB
			if (fileSize > maxSize) {
				const message = $t('customBanner.imageTooLarge', { values: { maxSize: '2MB' } });
				pushToast({ message, timeout: 5000 });
				throw new Error(message);
			}

			changeFace(file);
		} catch (e) {
			console.error(e);
		}
	};
</script>

<div class="info" class:onBannerEdit>
	<div class="pic">
		<label class="face" for="faceInput" on:mousedown={() => playSfx()}>
			<div class="overlay">
				<i class="gi-picture" />
				<span>{$t('customBanner.faceIcon')}</span>
			</div>

			{#if faceURL}
				<img src={faceURL} alt="Face" crossorigin="anonymous" />
			{:else}
				<img
					class="placeholder"
					src={$assets['face-placeholder.webp']}
					alt="face placeholder"
					crossorigin="anonymous"
				/>
			{/if}
		</label>

		<input
			class="inputFile"
			type="file"
			id="faceInput"
			accept={allowedType}
			on:change={handleImage}
		/>
	</div>

	<div class="customize">
		<button class="detail" on:click={showInfoEditor}>
			<i class="gi-pen" />
			{$t('customBanner.editInfo')}
		</button>
		<br />
		<button class="splashart" on:click={showSplashArtEdit}>
			<i class="gi-pen" />
			{$t('customBanner.adjustSplashArt')}
		</button>
	</div>
</div>

<style>
	.info {
		position: absolute;
		z-index: +11;
		left: 5%;
		bottom: 5%;
		display: flex;
		align-items: center;
	}

	.info.onBannerEdit {
		pointer-events: none;
		opacity: 0.5;
	}

	.face {
		display: flex;
		aspect-ratio: 1/1;
		background-color: #efeeee;
		border: #c5b894 calc(0.005 * var(--content-height)) solid;
		border-radius: 5%;
		width: calc(0.18 * var(--content-height));
		position: relative;
	}

	.inputFile {
		position: absolute;
		height: 100%;
		width: 100%;
		opacity: 0;
		top: 0;
		left: 0;
		pointer-events: none;
	}

	.overlay {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		border: #e7e4de 0.1rem dashed;
		position: absolute;
		z-index: +2;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		align-items: center;
		opacity: 0;
		transition: all 0.25s;
	}

	.overlay i {
		color: rgba(255, 255, 255, 0.5);
		line-height: 0;
		font-size: calc(2.5 / 100 * var(--content-width));
	}
	.overlay span {
		color: #fff;
		font-size: calc(1.3 / 100 * var(--content-width));
		margin-top: 10%;
	}

	.face:hover .overlay {
		opacity: 1;
	}

	.face img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	img.placeholder {
		opacity: 0.5;
	}

	.customize {
		transform: translateX(calc(0.02 * var(--content-height)));
	}

	.customize button {
		background-color: #efeeee;
		color: rgba(0, 0, 0, 0.5);
		border-radius: 20px;
		border: #e2d7b6 0.1rem solid;
		font-size: calc(1.5 / 100 * var(--content-width));
		transition: background 0.25s, color 0.25s;
		padding: calc(0.5 / 100 * var(--content-width)) calc(2.5 / 100 * var(--content-width));
		transition: all 0.25s;
	}

	.customize button:hover {
		background-color: #e0ddd4;
		color: rgba(0, 0, 0, 1);
	}

	.customize button:active {
		transform: scale(0.95);
	}
</style>
