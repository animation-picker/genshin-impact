<script>
	// Vision
	import Anemo from './svgs/Anemo.svelte';
	import Cryo from './svgs/Cryo.svelte';
	import Dendro from './svgs/Dendro.svelte';
	import Electro from './svgs/Electro.svelte';
	import Geo from './svgs/Geo.svelte';
	import Hydro from './svgs/Hydro.svelte';
	import Pyro from './svgs/Pyro.svelte';

	// Weapon
	import Bow from './svgs/Bow.svelte';
	import Catalyst from './svgs/Catalyst.svelte';
	import Claymore from './svgs/Claymore.svelte';
	import Polearm from './svgs/Polearm.svelte';
	import Sword from './svgs/Sword.svelte';

	export let name = '';

	const icons = {
		anemo: Anemo,
		cryo: Cryo,
		dendro: Dendro,
		electro: Electro,
		geo: Geo,
		hydro: Hydro,
		pyro: Pyro,
		bow: Bow,
		catalyst: Catalyst,
		claymore: Claymore,
		polearm: Polearm,
		sword: Sword
	};
</script>

{#if name in icons}
	<svelte:component this={icons[name]} />
{/if}
