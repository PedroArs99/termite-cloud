<script lang="ts">
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import { devices, fetchDevices } from '../stores/device.store';
	import Device from './Device.svelte';

	onMount(() => fetchDevices());
</script>

<div in:scale id="device-list">
	{#each $devices as device}
		<Device {device} />
	{/each}
</div>

<style lang="scss">
	@media (min-width: 768px) {
		#device-list {
			display: flex;
		}
	}
</style>
