<script lang="ts">
	import Icon from '$lib/utils/Icon.svelte';
	import { onMount } from 'svelte';
	import type { Device } from '../../models/device/Device.model';

	export let device: Device;
	let deviceDomNode: HTMLElement | null;
	let deviceIconColor: string;

	function makeDeviceBlink() {
		let toggler = true;
		let intervalId = setInterval(() => {
			if (toggler) {
				deviceDomNode?.classList.add('bg-error', 'border-error');
			} else {
				deviceDomNode?.classList.remove('bg-error', 'border-error');
			}

			toggler = !toggler
		}, 1000);
	}

	onMount(() => {
		deviceDomNode = document.getElementById(`${device.friendlyName}`);
	});

	$: if(device.state === "undefined") makeDeviceBlink();
	$: deviceIconColor = device.state === "ON" ? "#efc070" : "#080703";
</script>

<div class="card">
	<div id={device.friendlyName} class="card-body">
		<Icon clazz="border rounded-full p-3" icon="lightbulb" size="5x" color={deviceIconColor}  />
		<h1 class="text-center">{device.friendlyName}</h1>
	</div>
</div>

<style lang="postcss">
	.card-body {
		display: flex;
		align-items: center;
	}
</style>
