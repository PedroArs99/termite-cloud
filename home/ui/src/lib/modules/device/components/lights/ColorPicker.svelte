<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function onColorChange(hexColor: string) {
		dispatch('change', hexColor);
	}
</script>

<div class="flex justify-around w-full grow gap-1 py-3">
	<button class="color-button button-netflix-red" on:click={() => onColorChange('#E50914')} />
	<button class="color-button button-warm-light" on:click={() => onColorChange('#FFDA48')} />
	<button class="color-button button-cold-light" on:click={() => onColorChange('#FFF6C1')} />
	<button class="color-button button-football-green" on:click={() => onColorChange('#007514')} />
	<button class="color-button button-amazon-prime-blue" on:click={() => onColorChange('#0043FF')} />
	<button class="color-button button-twitch-purple" on:click={() => onColorChange('#3C013C')} />
</div>

<style lang="scss">
	.color-button {
		width: 30px;
		height: 30px;
		border-radius: 50%;

		@apply border border-primary;
	}

	.button-netflix-red {
		background-color: #e50914;
	}

	.button-warm-light {
		background-color: #ffda48;
	}

	.button-cold-light {
		background-color: #fff6c1;
	}

	.button-football-green {
		background-color: #007514;
	}

	.button-amazon-prime-blue {
		background-color: #0043ff;
	}

	.button-twitch-purple {
		background-color: #3c013c;
	}
</style>
