<script lang="ts">
	import type { Device } from '../models/device/Device.model';
	import Icon from '$lib/utils/Icon.svelte';
	import { fade, fly } from 'svelte/transition';
	import { toggleDeviceState, updateDeviceBrightness } from '../stores/device.store';
	import BrightnessSlider from './BrightnessSlider.svelte';

	export let device: Device;

	function onDeviceClick() {
		toggleDeviceState(device);
	}

	function onBrightnessChange(event: CustomEvent<number>) {
		updateDeviceBrightness(device, event.detail);
	}

	$: color = device.state.power === 'ON' ? '#EFC070' : '#333333';
</script>

<div in:fade out:fly class="card">
	<div class="card-body">
		<div class="icon-wrapper" on:click={() => onDeviceClick()}>
			<Icon
				clazz="border rounded-full p-3 hover:cursor-pointer hover:bg-primary"
				icon="lightbulb"
				size="5x"
				{color}
			/>
		</div>
		<BrightnessSlider value={device.state.brightness} on:change={(e) => onBrightnessChange(e)} />
		<h1 class="text-center">{device.friendlyName.replace('_', ' ')}</h1>
	</div>
</div>

<style lang="scss">
	.card {
		max-width: 25rem;
	}

	.icon-wrapper {
		display: contents;
	}
</style>
