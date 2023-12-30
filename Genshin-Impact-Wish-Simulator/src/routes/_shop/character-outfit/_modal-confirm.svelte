<script>
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import ModalTpl from '$lib/components/ModalTpl.svelte';

	const cancelModal = getContext('cancelConfirm');
	const showDetailModal = getContext('showDetailModal');
</script>

<ModalTpl title={$t('shop.purchaseConfirm')} on:cancel={cancelModal} on:confirm={showDetailModal}>
	<div class="confirmation">
		<p>
			{$t('outfit.purchasePrompt')} <br />
			{$t('outfit.promptInfo')}
		</p>
	</div>
</ModalTpl>

<style>
	.confirmation {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
	}
</style>
