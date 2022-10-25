<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchDevices } from '../stores/device.store';
	import { devices } from '../stores/device.store';

	onMount(() => fetchDevices());
</script>

{#each $devices as device}
	<div class="card">
		<div class="card-body">
			<h1 class="text-center">{device.friendlyName}</h1>
		</div>
	</div>
{/each}
