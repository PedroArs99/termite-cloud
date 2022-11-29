<script lang="ts">
	import Icon from '$lib/utils/Icon.svelte';

	export let value: number;
</script>

<div class="battery-level">
	<!-- <span class="text-xs">{value} %</span> -->
	{#if value > 75}
		<Icon clazz="align-center" color="#bef264" icon="batteryFull" />
	{:else if value > 50}
		<Icon clazz="align-center" color="#bef264" icon="batteryThreeQuarters" />
	{:else if value > 25}
		<Icon clazz="align-center" icon="batteryHalf" />
	{:else if value > 10}
		<Icon clazz="align-center" color="#fdba74" icon="batteryQuarter" />
	{:else}
		<Icon clazz="align-center" color="#f3816d" icon="batteryEmpty" />
	{/if}
</div>

<style lang="scss">
	.battery-level {
		bottom: 0;
		display: flex;
		gap: 0.25em;
		padding: 0.25em 0.5em;
		position: absolute;
		right: 0;
	}
</style>
