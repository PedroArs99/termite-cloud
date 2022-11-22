<script lang="ts">
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import { fetchHomeConfig, homeConfig } from '../HomeConfig.store';

	onMount(fetchHomeConfig);
</script>

<div in:scale class="card">
	<div class="card-body">
		<div class="property-wrapper">
			<span>Bridge state</span>
			{#if $homeConfig.bridgeState === 'online'}
				<span class="badge badge-success badge-outline">Online</span>
			{:else}
				<div class="badge badge-error badge-outline">Offline</div>
			{/if}
		</div>
		<div class="property-wrapper">
			<span>Permit Join</span>
			<input type="checkbox" class={$homeConfig.permitJoin ? 'toggle-success' : 'toggle-error'} checked="{$homeConfig.permitJoin}" />
		</div>
	</div>
</div>

<style class="scss">
	.property-wrapper {
		@apply flex justify-between;
	}

	.toggle-error, .toggle-success {
		@apply toggle;
	}
</style>
