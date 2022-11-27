<script lang="ts">
	import Icon from '$lib/utils/Icon.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function onClick() {
		dispatch('click');
	}
</script>

<div class="icon-wrapper" on:click={onClick}>
	<Icon
		clazz="border rounded-full p-3 lg:hover:cursor-pointer lg:hover:bg-primary"
		icon="lightbulb"
		size="4x"
	/>
</div>

<style lang="scss">
	.icon-wrapper {
		display: contents;
	}
</style>
