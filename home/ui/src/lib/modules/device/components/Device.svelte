<script lang="ts">
	import type { Device } from '../models/device/Device.model';
	import Icon from '$lib/utils/Icon.svelte';
	import { fade, fly } from 'svelte/transition';
	import { toggleDeviceState } from '../stores/device.store';

	export let device: Device;

	function onDeviceClick() {
		toggleDeviceState(device);
	}

	$: color = device.state.power === 'ON' ? '#EFC070' : '#333333';
</script>

<div in:fade out:fly class="card">
	<div class="card-body">
		<div on:click={() => onDeviceClick()}>
			<Icon
				clazz="border rounded-full p-3 hover:cursor-pointer hover:bg-primary"
				icon="lightbulb"
				size="5x"
				{color}
			/>
		</div>
		<h1 class="text-center">{device.friendlyName.replace('_', ' ')}</h1>
	</div>
</div>
