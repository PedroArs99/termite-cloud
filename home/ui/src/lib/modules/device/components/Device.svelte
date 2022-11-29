<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Device } from '../models/Device.model';
	import BrightnessSlider from './lights/BrightnessSlider.svelte';
	import ColorPicker from './lights/ColorPicker.svelte';
	import PowerButton from './lights/PowerButton.svelte';
	import TemperatureSlider from './lights/TemperatureSlider.svelte';

	export let device: Device;
	const dispatch = createEventDispatcher();

	function onStateChange(key: string, value: any) {
		dispatch('state', {
			friendlyName: device.friendlyName,
			key,
			value
		});
	}
</script>

<div class="card">
	<h1 class="card-title">{device.friendlyName.replace('_', ' ')}</h1>
	<div class="card-body">
		{#each Object.keys(device.features) as feature}
			{#if feature === 'state'}
				<PowerButton on:click={() => onStateChange('state', 'TOGGLE')} />
			{/if}
			{#if feature === 'brightness'}
				<BrightnessSlider
					on:change={(e) => onStateChange('brightness', e.detail)}
					value={device.state?.['brightness']}
				/>
			{/if}
			{#if feature === 'color_temp'}
				<TemperatureSlider
					on:change={(e) => onStateChange('color_temp', e.detail)}
					value={device.state?.['color_temp']}
				/>
			{/if}
			{#if feature === 'color_xy'}
				<ColorPicker />
			{/if}
		{/each}
	</div>
</div>

<style lang="scss">
	.card {
		padding: 1em;
	}

	.card-body {
		padding: 1em;
	}

	.card-title {
		justify-content: center;
	}
</style>
