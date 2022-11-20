<script lang="ts">
	import Fa from 'svelte-fa';
	import {
		faCogs,
		faLightbulb,
		faSun,
		faTemperatureHigh,
		faTemperatureLow
	} from '@fortawesome/free-solid-svg-icons';
	import { faCircle } from '@fortawesome/free-regular-svg-icons';

	export let clazz: string = '';
	export let color: string | undefined = undefined;
	export let icon: 'circle' | 'cogs' | 'cold' | 'lightbulb' | 'sun' | 'warm';
	export let size: string = 'lg';

	let icons = {
		circle: faCircle,
		cogs: faCogs,
		cold: faTemperatureLow,
		lightbulb: faLightbulb,
		sun: faSun,
		warm: faTemperatureHigh
	};
</script>

<Fa class={clazz} {color} icon={icons[icon]} {size} />
