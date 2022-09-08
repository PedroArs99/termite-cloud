<script lang="ts">
	import { onMount } from 'svelte';

	import { fetchHomeState, homeState } from '../home.state.store';

	onMount(() => fetchHomeState());
</script>

<h1>Home Store : {$homeState} </h1>