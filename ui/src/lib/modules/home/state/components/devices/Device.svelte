<script lang="ts">
	import Icon from '$lib/utils/Icon.svelte';
	import type { Device } from '../../models/device/Device.model';

	export let device: Device;
</script>

<div class="card">
	<div class="card-body">
		<Icon clazz="border rounded-full p-3" icon="lightbulb" size="5x" />
		<h1 class="text-center">{device.friendlyName}</h1>
	</div>
</div>

<style lang="postcss">
	.card-body {
		display: flex;
		align-items: center;
	}
</style>
