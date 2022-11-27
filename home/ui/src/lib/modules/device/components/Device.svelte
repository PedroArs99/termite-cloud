<script lang="ts">
	import type { Device } from '../models/device/Device.model';

	export let device: Device;
</script>

<div class="card">
	<h1 class="card-title">{device.friendlyName.replace('_', ' ')}</h1>
</div>

<style lang="scss">
	.card {
		max-width: 25rem;
	}
</style>
