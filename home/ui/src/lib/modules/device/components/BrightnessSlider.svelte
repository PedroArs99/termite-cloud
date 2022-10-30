<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from '$lib/utils/Icon.svelte';

	export let value: number = 0;

	const dispatch = createEventDispatcher();

	function onBrightnessChange(e: Event) {
		const target = e.target as HTMLInputElement;
		const brightness = +target.value;

		dispatch('change', brightness);
	}
</script>

<div class="flex gap-1 my-3">
	<Icon icon="circle" size="md"/>
	<input
		type="range"
		min="0"
		max="254"
		{value}
		class="range range-xs"
		on:change={(e) => onBrightnessChange(e)}
	/>
    <Icon icon="sun" size="md"/>
</div>
