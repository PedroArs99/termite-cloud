<script lang="ts">
	import Fa from 'svelte-fa';
	import { faSignal } from '@fortawesome/free-solid-svg-icons';

    export let icon: "signal";

    let icons = {
        "signal": faSignal
    }
</script>

<Fa icon={icons[icon]} />
