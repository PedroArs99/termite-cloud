<script lang="ts">
	import type { Device } from '../../models/device/Device.model';
	import BulbImage from './bulb/BulbImage.svelte';

	export let device: Device;
</script>

<div class="card">
	<div class="card-body">
		<BulbImage clazz="border fill-primary rounded-full shadow-2xl p-3" width="64px" />
		<h1 class="text-center">{device.friendlyName}</h1>
	</div>
</div>

<style lang="postcss">
	.card-body {
		display: flex;
		align-items: center;
	}
</style>
