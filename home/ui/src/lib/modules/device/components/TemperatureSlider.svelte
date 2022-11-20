<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from '$lib/utils/Icon.svelte';

	export let value: number = 0;

	const dispatch = createEventDispatcher();

	function onTemperatureChange(e: Event) {
		const target = e.target as HTMLInputElement;
		const temperature = +target.value;

		dispatch('change', temperature);
	}
</script>

<div class="flex w-full grow gap-1 py-3">
	<Icon icon="cold" size="md"/>
	<input
		type="range"
		min="250"
		max="454"
		step="25"
		{value}
		class="range range-xs"
		on:change={(e) => onTemperatureChange(e)}
	/>
    <Icon icon="warm" size="md"/>
</div>
