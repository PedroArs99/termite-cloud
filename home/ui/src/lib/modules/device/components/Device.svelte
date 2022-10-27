<script lang="ts">
	import type { Device } from "../models/device/Device.model";
    import Icon from "$lib/utils/Icon.svelte"
	import { fade, fly } from "svelte/transition";

    export let device: Device;

    $: color = device.state.power === "ON" ? "#EFC070": "#333333";
</script>

<div in:fade out:fly class="card">
    <div class="card-body">
        <Icon clazz="border rounded-full p-3 hover:cursor-pointer hover:bg-primary" icon="lightbulb" size="5x" {color} />
        <h1 class="text-center">{device.friendlyName.replace("_", " ")}</h1>
    </div>
</div>

<style lang="scss">
</style>

