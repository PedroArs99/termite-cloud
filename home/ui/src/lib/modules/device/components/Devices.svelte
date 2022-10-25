<script lang="ts">
	import { onMount } from 'svelte';
	import { devices, fetchDevices } from '../stores/device.store';
    import Device from './Device.svelte'

	onMount(() => fetchDevices());
</script>

<div id="device-list">
	{#each $devices as device}
		<Device {device} />
	{/each}
</div>

<style lang="scss">
    #device-list {
        display: flex;
    }
</style>
