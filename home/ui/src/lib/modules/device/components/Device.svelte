<script lang="ts">
	import type { Device } from '../models/device/Device.model';
	import Icon from '$lib/utils/Icon.svelte';
	import { fade, fly } from 'svelte/transition';
	import { toggleDeviceState, updateDeviceBrightness } from '../stores/device.store';

	export let device: Device;

	function onDeviceClick() {
		toggleDeviceState(device);
	}

	function onBrightnessChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const brightness = +target.value;

		updateDeviceBrightness(device, brightness);
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
		<input
			type="range"
			min="0"
			max="254"
			value={device.state.brightness}
			class="range range-xs"
			on:change={(e) => onBrightnessChange(e)}
		/>
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
