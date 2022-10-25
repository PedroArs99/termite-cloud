<script lang="ts">
	import Config from '$lib/modules/config/components/Config.svelte';
	import Devices from '$lib/modules/device/components/Devices.svelte';
</script>

<svelte:head>
	<title>Home @ Termite Cloud</title>
	<meta name="description" content="Termite Cloud App - Home Control" />
</svelte:head>

<Config />
<Devices />