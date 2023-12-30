<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	const { url } = $page;
	const redirect = () => {
		const replace = url.href.replace('/chars?a', '/wishitem?a');
		return goto(replace);
	};

	onMount(redirect);
</script>
