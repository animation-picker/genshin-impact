<script>
	import { getContext, onMount } from 'svelte';
	import { t } from 'svelte-i18n';
	import OverlayScrollbars from 'overlayscrollbars';
	import { cookie } from '$lib/helpers/dataAPI/api-cookie';
	import { HistoryManager } from '$lib/helpers/dataAPI/api-indexeddb';
	import { assets } from '$lib/store/app-stores';
	import { playSfx } from '$lib/helpers/audio/audio';
	import { checkActiveOutfit } from '$lib/helpers/outfit';

	import ModalTpl from '../ModalTpl.svelte';
	import ButtonModal from '../ButtonModal.svelte';

	let scrollable;
	let characters = [];
	let selectedChar = {};
	let activeAvatar = cookie.get('avatar') || {};
	$: avatarName = selectedChar?.name || activeAvatar?.name;

	const { getAllHistories } = HistoryManager;
	const togglePic = getContext('togglePic');

	const previewAvatar = (charData) => {
		selectedChar = charData;
		playSfx();
	};

	const setAvatar = () => {
		cookie.set('avatar', selectedChar);
		playSfx();
		togglePic();
	};

	const getCharacter = async () => {
		const data = await getAllHistories();
		const chars = data.filter(({ type }) => type === 'character');
		const tmp = [];

		chars.forEach(({ name }) => {
			if (tmp.findIndex((c) => c?.name === name) > -1) return;
			const outfit = checkActiveOutfit(name)?.name;
			tmp.push({ name, outfit });
		});
		characters = tmp;
	};

	onMount(async () => {
		getCharacter();
		OverlayScrollbars(scrollable, { sizeAutoCapable: false, className: 'os-theme-light' });
	});
</script>

<ModalTpl dark wide confirm={false} on:cancel={togglePic} title="Change Avatar">
	<div class="changeAvatar">
		<div class="avatars" bind:this={scrollable}>
			{#if characters.length < 1}
				<div class="no-char">
					<span> No Character to show</span>
				</div>
			{:else}
				<div class="avatar-list">
					{#each characters as { name, outfit }}
						<div
							class="item"
							class:selected={avatarName === name}
							on:click={() => previewAvatar({ name, outfit })}
						>
							<figure>
								<img src={$assets[`face/${outfit || name}`]} alt={outfit || name} />
							</figure>
							{#if activeAvatar?.name === name}
								<span>Current</span>
							{/if}
						</div>
					{/each}
				</div>
			{/if}
		</div>
		<div class="preview">
			<div class="selected">
				<div class="item">
					<figure>
						{#if avatarName}
							<img
								src={$assets[
									`face/${
										selectedChar.outfit ||
										selectedChar.name ||
										activeAvatar?.outfit ||
										activeAvatar?.name
									}`
								]}
								alt={avatarName}
							/>
						{:else}
							<i class="gi-user" />
						{/if}
					</figure>
				</div>
			</div>
			<div class="info">
				<div class="name">
					<caption>
						{#if avatarName}
							<span>{$t(`${avatarName}.name`)}</span>
						{:else}
							<span> Choose Avatar</span>
						{/if}
					</caption>
				</div>
				<ButtonModal
					light
					disabled={selectedChar?.name === activeAvatar?.name || !selectedChar?.name}
					on:click={setAvatar}
				>
					Use
				</ButtonModal>
			</div>
		</div>
	</div>
</ModalTpl>

<style>
	.changeAvatar {
		width: 100%;
		height: 100%;
		display: flex;
		padding: 0 4% 3%;
	}

	.avatars {
		width: 70%;
		background-color: #41495b;
		padding: 2%;
	}
	.avatar-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: flex-start;
	}

	.no-char {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.item {
		width: 24%;
		aspect-ratio: 1/1;
		border-radius: 0.3rem;
		margin: 0.2%;
		padding: 3.5%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		transition: 0.2s;
	}

	.item.selected,
	.item:hover {
		background-color: #ece5d8;
	}

	.item span {
		position: absolute;
		bottom: 5%;
		color: #ece5d8;
		background-color: #41495b;
		font-size: small;
		transition: 0.2s;
	}

	.item.selected span,
	.item:hover span {
		background-color: #ece5d8;
		color: #383b40;
	}

	figure,
	img {
		width: 100%;
		height: 100%;
		display: block;
	}

	figure {
		border-radius: 100%;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #d19d78;
		box-shadow: rgb(0 0 0 / 15%) 0px 0px 5px 5px;
		border: 0.15rem solid #f1ebe1;
	}

	figure i {
		font-size: 400%;
		opacity: 0.8;
	}

	img {
		border-radius: 100%;
		overflow: hidden;
	}

	.preview {
		width: 30%;
		display: flex;
		flex-direction: column;
	}

	.preview .selected {
		height: 70%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.selected .item {
		width: 70%;
	}
	.selected .item:hover {
		background-color: unset;
	}

	.preview .info {
		height: 40%;
		padding: 0 10% 10%;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.preview .name caption {
		display: block;
		color: #d3bd8f;
		background-image: linear-gradient(
			to right,
			rgba(51, 57, 71, 0),
			rgba(51, 57, 71, 1),
			rgba(51, 57, 71, 0)
		);
		padding: 3%;
		margin-bottom: 10%;
		width: 100%;
		border-top: 1px solid rgba(210, 198, 156, 0.6);
		border-bottom: 1px solid rgba(210, 198, 156, 0.6);
	}

	@media screen and (max-width: 620px) {
		.changeAvatar {
			flex-direction: column;
		}
		.avatars {
			width: 100%;
			height: 70%;
		}

		.preview {
			flex-direction: row;
			width: 100%;
			height: 30%;
		}

		.preview .selected {
			height: unset;
			width: 50%;
		}

		.preview .info {
			height: 100%;
			width: 100%;
		}

		.preview .name {
			height: 100%;
			display: flex;
			align-items: center;
		}
		.preview .name caption {
			margin-bottom: -10%;
		}

		.info :global(button) {
			width: unset;
		}
	}
</style>
