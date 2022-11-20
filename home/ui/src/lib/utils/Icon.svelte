<script lang="ts">
	import Fa from 'svelte-fa';
	import {
		faCogs,
		faHouseSignal,
		faLightbulb,
		faSun,
		faTemperatureHigh,
		faTemperatureLow
	} from '@fortawesome/free-solid-svg-icons';
	import { faCircle } from '@fortawesome/free-regular-svg-icons';

	export let clazz: string = '';
	export let color: string | undefined = undefined;
	export let icon: 'circle' | 'cogs' | 'cold' | 'home' | 'lightbulb' | 'sun' | 'warm';
	export let size: string = 'lg';

	let icons = {
		circle: faCircle,
		cogs: faCogs,
		cold: faTemperatureLow,
		home: faHouseSignal,
		lightbulb: faLightbulb,
		sun: faSun,
		warm: faTemperatureHigh
	};
</script>

<Fa class={clazz} {color} icon={icons[icon]} {size} />
