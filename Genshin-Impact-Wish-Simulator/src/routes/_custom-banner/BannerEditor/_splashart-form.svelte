<script>
	import { t } from 'svelte-i18n';
	import { fade } from 'svelte/transition';
	import { getContext } from 'svelte';
	import { isMobile } from '$lib/store/app-stores';
	import { pushToast } from '$lib/helpers/toast';

	export let onBannerEdit = false;
	let onDrag = false;

	const allowedType = 'image/png, image/webp, image/jpeg';
	const editBanner = getContext('editBanner');
	const changeImage = getContext('changeArt');

	const dragNdrop = (e) => {
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

			changeImage(file);
		} catch (e) {
			console.error(e);
		}
	};
</script>

<div
	class="hoverable"
	class:isMobile={$isMobile}
	class:onBannerEdit
	class:onDrag
	on:dragenter={() => (onDrag = true)}
>
	<div class="wrapper">
		{#if !onDrag}
			<label class="mainart button" for="uploadFile" transition:fade|local>
				<i class="gi-picture" />
				<span>{$t('customBanner.changeSplashArt')}</span>
			</label>

			<button class="button move" on:click={editBanner} transition:fade|local>
				<i class="gi-move" /> <span>{$t('customBanner.move')}</span>
			</button>
		{/if}
	</div>
	{#if onDrag}
		<div class="drophere">
			<div class="drop button">
				<i class="gi-picture" />
				<span>{$t('customBanner.dropHere')}</span>
			</div>
		</div>
	{/if}

	<input
		class="inputFile"
		type="file"
		id="uploadFile"
		accept={allowedType}
		on:change={dragNdrop}
		on:dragleave={() => (onDrag = false)}
		on:drop={() => (onDrag = false)}
	/>
</div>

<style>
	.hoverable {
		position: absolute;
		top: 0;
		right: 0;
		width: 100%;
		height: 100%;
		z-index: +11;
		transition: all 0.25s;
		opacity: 0;
		display: flex;
		justify-content: flex-end;
	}

	.hoverable.onBannerEdit {
		pointer-events: none;
		opacity: 0;
	}

	.hoverable:hover:not(.onBannerEdit),
	.hoverable.onDrag,
	.hoverable.isMobile:not(.onBannerEdit),
	.wrapper:hover,
	.isMobile .wrapper {
		opacity: 1;
	}

	.hoverable.onDrag {
		z-index: 20;
	}

	.wrapper {
		width: 50%;
		height: 100%;
		position: relative;
		display: flex;
		align-items: flex-end;
		flex-direction: column;
		background-image: linear-gradient(45deg, transparent 50%, rgba(0, 0, 0, 0.5));
		opacity: 0;
		transition: all 0.25s;
	}

	.button {
		color: rgba(255, 255, 255, 0.8);
		background-color: rgba(0, 0, 0, 0.5);
		border: #e7e4de 0.1rem dashed;
		padding: 2% 3%;
		display: flex;
		align-items: center;
		line-height: 0;
		border-radius: 2%;
		margin: 1%;
		font-size: calc(1.5 / 100 * var(--content-width));
		transition: all 0.25s;
	}

	.button.move {
		border-style: solid;
		padding: 1%;
	}

	.button i {
		font-size: calc(2.5 / 100 * var(--content-width));
		margin-right: calc(1 / 100 * var(--content-width));
	}

	.button:active {
		transform: scale(0.95);
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

	.onDrag .inputFile {
		pointer-events: unset;
	}

	.drophere {
		pointer-events: none;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
