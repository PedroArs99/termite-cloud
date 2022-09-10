<script lang="ts">
	import { onMount } from 'svelte';

	import { fetchHomeState, homeState } from '../home.state.store';

	onMount(() => fetchHomeState());
</script>

<div class="card">
	<div class="card-body">
		<div class="property-wrapper">
			<span>Bridge log level</span>
			{#if $homeState.bridgeLogLevel === 'debug'}
				<span class="badge badge-success badge-outline">Debug</span>
			{:else if $homeState.bridgeLogLevel === 'info'}
				<div class="badge badge-info badge-outline">Info</div>
			{:else if $homeState.bridgeLogLevel === 'warning'}
				<div class="badge badge-warning badge-outline">Warning</div>
			{:else if $homeState.bridgeLogLevel === 'error'}
				<div class="badge badge-error badge-outline">Error</div>
			{/if}
		</div>

		<div class="property-wrapper">
			<span>Permit join</span>
			{#if $homeState.bridgePermitJoin}
				<span class="badge badge-success badge-outline">Yes</span>
			{:else}
				<div class="badge badge-error badge-outline">No</div>
			{/if}
		</div>

		<div class="property-wrapper">
			<span>Permit join timeout</span>
			{#if $homeState.bridgePermitJoinTimeout}
				<span class="badge badge-info badge-outline">{$homeState.bridgePermitJoinTimeout} s</span>
			{:else}
				<div class="badge badge-info badge-outline">No timeout</div>
			{/if}
		</div>

		<div class="property-wrapper">
			<span>Restart required</span>
			{#if $homeState.bridgeRestartRequired}
				<span class="badge badge-error badge-outline">Restart required</span>
			{:else}
				<div class="badge badge-success badge-outline">No Restart required</div>
			{/if}
		</div>
		
		<div class="property-wrapper">
			<span>Bridge state</span>
			{#if $homeState.bridgeState === 'online'}
				<span class="badge badge-success badge-outline">Online</span>
			{:else}
				<div class="badge badge-error badge-outline">Offline</div>
			{/if}
		</div>
	</div>
</div>

<style class="postcss">
	.property-wrapper {
		@apply flex justify-between;
	}
</style>