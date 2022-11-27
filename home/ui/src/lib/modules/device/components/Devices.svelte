<script lang="ts">
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import { devices } from '../stores/device.store';
	import Device from './Device.svelte';

	onMount(() => devices.fetchDevices());
</script>

<div in:scale id="device-list">
	{#each $devices as device}
		<Device {device} />
	{/each}
</div>

<style lang="scss">
	#device-list {
		display: flex;
		flex-wrap: wrap;
	}
</style>
