<script lang="ts">
	import { onMount } from 'svelte';

	import { fetchHomeState, homeState } from '../home.state.store';
	import type { Device as IDevice } from '../models/device/Device.model';
	import Device from './devices/Device.svelte';

	let devices: IDevice[];

	$: devices = $homeState.devices;

	onMount(() => fetchHomeState());
</script>

<div id="device-list">
	{#each devices as device}
		<Device {device} />
	{/each}
</div>

<style lang="scss">
	#device-list {
		display: flex;
		justify-content: space-between;

		@media (min-width: 640px) {
			justify-content: start;
		}
	}
</style>
