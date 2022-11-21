<script lang="ts">
	import Icon from '$lib/utils/Icon.svelte';
</script>

<div class="flex justify-around w-full grow gap-1 py-3">
	<button class="color-button button-netflix-red"></button>
	<button class="color-button button-warm-light"></button>
	<button class="color-button button-cold-light"></button>
	<button class="color-button button-football-green"></button>
	<button class="color-button button-amazon-prime-blue"></button>
	<button class="color-button button-twitch-purple"></button>
</div>

<style lang="scss">
	.color-button {
        width: 30px;
        height: 30px;
        border-radius: 50%;

        @apply border border-primary;
	}

    .button-netflix-red {
        background-color: #E50914;
    }

    .button-warm-light {
        background-color: #FFDA48;
    }

    .button-cold-light {
        background-color: #FFF6C1;
    }

    .button-football-green {
        background-color: #007514;
    }

    .button-amazon-prime-blue {
        background-color: #0043FF;
    } 

    .button-twitch-purple {
        background-color: #3C013C;
    } 
</style>
