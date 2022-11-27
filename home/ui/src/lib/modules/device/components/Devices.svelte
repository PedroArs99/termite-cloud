<script lang="ts">
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import type { DeviceStateChange } from '../models/DeviceStateChange.model';
	import { devices } from '../stores/device.store';
	import Device from './Device.svelte';

	onMount(() => devices.fetchDevices());

	function onDeviceChange(event: CustomEvent<DeviceStateChange>) {
		devices.updateDeviceState(event.detail.friendlyName, event.detail.key, event.detail.value);
	}
</script>

<div in:scale id="device-list">
	{#each $devices as device}
		<Device {device} on:state={(e) => onDeviceChange(e)} />
	{/each}
</div>

<style lang="scss">
	#device-list {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
	}
</style>
