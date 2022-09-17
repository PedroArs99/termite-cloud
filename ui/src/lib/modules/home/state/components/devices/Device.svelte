<script lang="ts">
	import Icon from '$lib/utils/Icon.svelte';
	import { onMount } from 'svelte';
	import type { Device } from '../../models/device/Device.model';

	export let device: Device;

	function makeDeviceBlink(deviceDomNode: HTMLElement, toggler: number) {
		if(toggler % 2 === 0){
			deviceDomNode.classList.add("bg-error", "border-error");
		} else {
			deviceDomNode.classList.remove("bg-error", "border-error");
		}
	}

	onMount(() => {
		const deviceDomNode = document.getElementById(`${device.friendlyName}`);
		
		let toggler = 0;
		let intervalId = setInterval(() => { 
			makeDeviceBlink(deviceDomNode!, toggler);
			toggler++;
		 }, 1000)
	});
</script>

<div class="card">
	<div id={device.friendlyName} class="card-body">
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
