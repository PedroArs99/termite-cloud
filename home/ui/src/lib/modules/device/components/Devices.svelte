<script lang="ts">
	import { onMount } from 'svelte';
	import { devices, fetchDevices } from '../stores/device.store';
	import Icon from '$lib/utils/Icon.svelte';

	onMount(() => fetchDevices());
</script>

<div id="device-list">
	{#each $devices as device}
		<div class="card">
			<div class="card-body">
				<Icon clazz="border rounded-full p-3" icon="lightbulb" size="5x" />
				<h1 class="text-center">{device.friendlyName}</h1>
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
    #device-list {
        display: flex;
    }
</style>
