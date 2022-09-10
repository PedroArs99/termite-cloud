<script lang="ts">
	import { onMount } from 'svelte';

	import { fetchHomeState, homeState } from '../home.state.store';

	onMount(() => fetchHomeState());
</script>

<div class="card">
	<div class="card-body">
		<div class="flex justify-between">
			<span>Bridge state</span>
			{#if $homeState.bridgeState === 'online'}
				<span class="badge badge-success badge-outline">Online</span>
			{:else}
				<div class="badge badge-error badge-outline">Offline</div>
			{/if}
		</div>
	</div>
</div>