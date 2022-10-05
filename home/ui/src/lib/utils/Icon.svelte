<script lang="ts">
	import Fa from 'svelte-fa';
	import { 
        faLightbulb,
        faSignal
    } from '@fortawesome/free-solid-svg-icons';

    export let clazz: string = "";
    export let color: string | undefined = undefined;
    export let icon:  "lightbulb" | "signal";
    export let size: string = "lg";

    let icons = {
        "lightbulb": faLightbulb,
        "signal": faSignal
    }
</script>

<Fa class={clazz} {color} icon={icons[icon]} {size} />
