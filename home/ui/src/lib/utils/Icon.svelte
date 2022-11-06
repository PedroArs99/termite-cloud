<script lang="ts">
	import Fa from 'svelte-fa';
	import { faLightbulb, faSun, faTemperatureEmpty, faTemperatureFull, faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';
	import { faCircle } from '@fortawesome/free-regular-svg-icons';

	export let clazz: string = '';
	export let color: string | undefined = undefined;
	export let icon: 'circle'| 'cold' | 'lightbulb' | 'sun' | 'warm';
	export let size: string = 'lg';

	let icons = {
		circle: faCircle,
		cold: faTemperatureEmpty,
		lightbulb: faLightbulb,
		sun: faSun,
		warm: faTemperatureFull
	};
</script>

<Fa class={clazz} {color} icon={icons[icon]} {size} />
