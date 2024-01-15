<script>
	import { onMount, setContext } from 'svelte';
	import { API_HOST } from '$lib/env';
	import { imageCDN } from '$lib/helpers/assets';
	import { lazyLoad } from '$lib/helpers/lazyload';
	import { timeAgo } from '$lib/helpers/timeago';
	import { onlineBanner } from '$lib/helpers/custom-banner';
	import ButtonGeneral from '$lib/components/ButtonGeneral.svelte';
	import Pagination from '../_gachainfo/history/_pagination.svelte';

	let activepage = 1;
	let itemPerPage = 10;
	let customList = [];

	const block = async (id) => {
		await onlineBanner.block(id);
		const index = customList.findIndex(({ id: lID }) => id === lID);
		customList[index].blocked = true;
	};

	const navigation = (page) => (activepage = page);
	setContext('navigation', navigation);

	const getItemPage = (data, activepage = 1) => {
		const result = data.filter((d, i) => {
			const begining = i > (activepage - 1) * itemPerPage - 1;
			const end = i < itemPerPage * activepage;
			return begining && end;
		});
		return result;
	};

	const loadBanners = async () => {
		try {
			const request = await fetch(API_HOST + '/storage');
			const { success, data = [] } = await request.json();
			if (!success) return;
			// customList = data.sort(({ lastModified: a }, { lastModified: b }) => {
			// 	return new Date(b) - new Date(a);
			// });
			customList = window._.orderBy(data, ['lastModified'], ['desc']);
		} catch (e) {
			console.error(e);
			customList = [];
		}
	};

	onMount(() => {
		const lodash = document.createElement('script');
		lodash.src = 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js';
		document.head.append(lodash);

		lodash.onload = loadBanners;
	});
</script>

<div class="list" style="--content-width:1000px">
	<div class="row total">
		<span>
			Total: {customList.length}
		</span>
	</div>

	<div class="row header">
		<div class="col img">Images</div>
		<div class="col info">Banner information</div>
		<div class="col action">Action</div>
	</div>

	{#if customList.length < 1}
		<div class="row">
			<span> waiting ...</span>
		</div>
	{:else}
		{#each getItemPage(customList, activepage) as { bannerName, hostedImages = { }, blocked, id, lastModified }}
			<div class="row" {id}>
				<div class="col img">
					{#each ['artURL', 'faceURL', 'thumbnail'] as key}
						{#if hostedImages[key]}
							{#key hostedImages[key]}
								<a href={imageCDN(hostedImages[key])} target="_blank" rel="noopener noreferrer">
									<img use:lazyLoad={imageCDN(hostedImages[key], 150)} alt={bannerName} />
								</a>
							{/key}
						{/if}
					{/each}
				</div>

				<div class="col info">
					<a class="name" target="_blank" href="/?banner={id}">{bannerName}</a>
					<span class="time"> {timeAgo(lastModified)} </span>
				</div>

				<div class="col action">
					{#if blocked}
						<ButtonGeneral disabled>Blocked</ButtonGeneral>
					{:else}
						<ButtonGeneral on:click={() => block(id)}>Block</ButtonGeneral>
					{/if}
				</div>
			</div>
		{/each}

		<Pagination v2 {itemPerPage} {activepage} dataLength={customList.length} />
	{/if}
</div>

<style>
	.row {
		padding: 0.2rem;
		border-bottom: 1px solid rgba(0, 0, 0, 0.5);
		border-right: 1px solid rgba(0, 0, 0, 0.5);
		border-left: 1px solid rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
	}

	.total {
		padding: 1rem;
		border: none;
	}
	.header {
		background-color: rgba(0, 0, 0, 0.7);
		color: #fff;
	}
	.row:nth-child(odd) {
		background-color: rgba(255, 255, 255, 0.5);
	}

	.col {
		padding: 1%;
	}
	.col.img {
		width: 50%;
	}
	.img {
		display: flex;
		align-items: center;
	}
	.img img {
		max-height: 150px;
		max-width: 100%;
		object-fit: contain;
	}

	.header .col:not(.img),
	.col.action {
		text-align: center;
	}

	.col.info {
		display: block;
		width: 30%;
		padding: 2%;
	}
	.info a {
		display: block;
	}
	.info span.time {
		display: block;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		font-style: italic;
	}

	.col.action {
		width: 20%;
		padding: 1rem;
	}

	@media screen and (max-width: 500px) {
		.row {
			flex-wrap: wrap;
			padding: 0.5rem 0.1rem;
		}
		.row:nth-child(3) {
			border-top: 1px solid rgba(0, 0, 0, 0.5);
		}
		.header {
			display: none;
		}
		.col.img,
		.col.info,
		.col.action {
			width: 100%;
		}
	}
</style>
