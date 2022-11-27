<script lang="ts">
	import type { Device } from '../models/Device.model';
	import BrightnessSlider from './lights/BrightnessSlider.svelte';
	import ColorPicker from './ColorPicker.svelte';
	import TemperatureSlider from './TemperatureSlider.svelte';

	export let device: Device;
</script>

<div class="card">
	<h1 class="card-title">{device.friendlyName.replace('_', ' ')}</h1>
	{#each Object.keys(device.features) as feature}
		{#if feature === 'brightness'}
			<BrightnessSlider value={device.state?.['brightness']} />
		{/if}
		{#if feature === 'color_temp'}
			<TemperatureSlider value={device.state?.['color_temp']}/>
		{/if}
		{#if feature === 'color_xy'}
			<ColorPicker />
		{/if}
	{/each}
</div>

<style lang="scss">
	.card {
		padding: 1em;
	}

	.card-title {
		justify-content: center;
	}
</style>
