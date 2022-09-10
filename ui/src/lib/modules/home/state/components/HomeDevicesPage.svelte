<script lang="ts">
	import { onMount } from 'svelte';

	import { fetchHomeState, homeState } from '../home.state.store';
	import type { Device } from '../models/device/Device.model';
	import BulbImage from './devices/bulb/BulbImage.svelte';

	let devices: Device[];

	$: devices = $homeState.devices;

	onMount(() => fetchHomeState());
</script>

<div id="device-list">
	{#each devices as device}
		<div class="card">
			<div class="card-body">
				<BulbImage clazz="border fill-primary rounded-full shadow-2xl p-3" width="64px" />
				<h1 class="text-center">{device.friendlyName}</h1>
			</div>
		</div>
	{/each}
</div>

<style lang="postcss">
	.card-body {
		display: flex;
		align-items: center;
	}

	#device-list{
		display: flex;
	}
</style>
