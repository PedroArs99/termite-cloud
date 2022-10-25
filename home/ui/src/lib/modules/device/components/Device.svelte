<script lang="ts">
	import type { Device } from "../models/device/Device.model";
    import Icon from "$lib/utils/Icon.svelte"

    export let device: Device;

    $: color = device.state.power === "ON" ? "#EFC070": "#333333";
</script>

<div class="card">
    <div class="card-body">
        <Icon clazz="border rounded-full p-3" icon="lightbulb" size="5x" {color} />
        <h1 class="text-center">{device.friendlyName.replace("_", " ")}</h1>
    </div>
</div>

