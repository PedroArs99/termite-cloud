<script lang="ts">
	import type { Device } from '../models/device/Device.model';
	import Icon from '$lib/utils/Icon.svelte';
	import { toggleDeviceState, updateDeviceState } from '../stores/device.store';
	import BrightnessSlider from './BrightnessSlider.svelte';
	import TemperatureSlider from './TemperatureSlider.svelte';
	import type { DeviceState } from '../models/device/DeviceState.model';
	import ColorPicker from './ColorPicker.svelte';

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

	function onColorChange(event: CustomEvent<string>) {
		console.log(event);

		const patchedState: DeviceState = {
			...device.state,
			color: event.detail
		};

		updateDeviceState(device, patchedState);
	}

	$: color = device.state.power === 'ON' ? device.state.color : '#333333';
</script>

<div class="card">
	<h1 class="card-title">{device.friendlyName.replace('_', ' ')}</h1>
	<div class="card-body">
		<div class="icon-wrapper" on:click={() => onDeviceClick()}>
			<Icon
				clazz="border rounded-full p-3 lg:hover:cursor-pointer lg:hover:bg-primary"
				icon="lightbulb"
				size="5x"
				{color}
			/>
		</div>
		<div class="card-actions">
			<BrightnessSlider value={device.state.brightness} on:change={(e) => onBrightnessChange(e)} />
			<TemperatureSlider
				value={device.state.colorTemperature}
				on:change={(e) => onTemperatureChange(e)}
			/>
			<ColorPicker on:change={(e) => onColorChange(e)} />
		</div>
	</div>
</div>

<style lang="scss">
	.card {
		max-width: 25rem;
	}

	.card-body {
		display: flex;
		gap: 1em;
		padding: 1rem;
		flex-direction: row;
	}

	.card-title {
		justify-content: center;
		padding: 0.5rem;
	}

	.icon-wrapper {
		display: contents;
	}

	@media (min-width: 768px) {
		.card {
			max-width: inherit;
			flex-grow: 1;
		}

		.card-body {
			flex-direction: column;
		}

		.card-actions {
			display: flex;
			flex-direction: column;
		}
	}
</style>
