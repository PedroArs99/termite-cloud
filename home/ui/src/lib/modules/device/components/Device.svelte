<script lang="ts">
	import type { Device } from '../models/device/Device.model';
	import Icon from '$lib/utils/Icon.svelte';
	import { toggleDeviceState, updateDeviceState } from '../stores/device.store';
	import BrightnessSlider from './BrightnessSlider.svelte';
	import TemperatureSlider from './TemperatureSlider.svelte';
	import type { DeviceState } from '../models/device/DeviceState.model';

	export let device: Device;

	function onDeviceClick() {
		toggleDeviceState(device);
	}

	function onBrightnessChange(event: CustomEvent<number>) {
		const patchedState: DeviceState = {
			...device.state,
			brightness: event.detail
		};

		updateDeviceState(device, patchedState);
	}

	function onTemperatureChange(event: CustomEvent<number>) {
		const patchedState: DeviceState = {
			...device.state,
			colorTemperature: event.detail
		};

		updateDeviceState(device, patchedState);
	}

	$: color = device.state.power === 'ON' ? device.state.color : '#333333';
</script>

<div class="card">
	<div class="card-body">
		<div class="icon-wrapper" on:click={() => onDeviceClick()}>
			<Icon
				clazz="border rounded-full p-3 lg:hover:cursor-pointer lg:hover:bg-primary"
				icon="lightbulb"
				size="5x"
				{color}
			/>
		</div>
		<BrightnessSlider value={device.state.brightness} on:change={(e) => onBrightnessChange(e)} />
		<TemperatureSlider
			value={device.state.colorTemperature}
			on:change={(e) => onTemperatureChange(e)}
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

	@media (min-width: 768px) {
		.card {
			max-width: inherit;
			flex-grow: 1;
		}
	}
</style>
