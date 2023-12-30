<script>
	import { t } from 'svelte-i18n';

	export let banner;
	export let v2;

	$: wpLegends = ['win', 'lose', 'guaranteed', 'selected'];
	$: chLegends = ['win', 'lose', 'guaranteed'];
	$: legends = banner === 'character-event' ? chLegends : wpLegends;
</script>

{#if !['beginner', 'standard'].includes(banner)}
	<div class="legend" class:v2>
		{#each legends as v}
			<div class="item">
				<span class="star5">
					<i class="gi-{v}" style="font-size: larger;" />
				</span>
				&nbsp; : &nbsp; {$t(`history.${v}`)}
			</div>
		{/each}
	</div>
{/if}

<style>
	.star5 {
		color: #bd6932;
	}

	.legend.v2 {
		font-size: calc(0.013 * var(--content-width));
	}

	.legend {
		display: flex;
		flex-wrap: wrap;
		margin: 1% auto 0;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		font-weight: 600;
	}

	.legend .item {
		padding-left: 1.5rem;
		text-transform: capitalize;
	}

	@media screen and (max-width: 640px) {
		.legend:not(.v2) .item {
			min-width: 40%;
			max-width: 50%;
		}
	}
</style>
