<script lang="ts">
	let config = {
		bridgeState: 'offline'
	};
</script>

<div class="card">
	<div class="card-body">
		<div class="property-wrapper">
			<span>Bridge state</span>
			{#if config.bridgeState === 'online'}
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
