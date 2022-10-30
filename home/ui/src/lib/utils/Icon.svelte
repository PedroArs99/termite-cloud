<script lang="ts">
	import Fa from 'svelte-fa';
	import { faLightbulb, faSun } from '@fortawesome/free-solid-svg-icons';
	import { faCircle } from '@fortawesome/free-regular-svg-icons';

	export let clazz: string = '';
	export let color: string | undefined = undefined;
	export let icon: 'circle' | 'lightbulb' | 'sun';
	export let size: string = 'lg';

	let icons = {
		circle: faCircle,
		lightbulb: faLightbulb,
		sun: faSun
	};
</script>

<Fa class={clazz} {color} icon={icons[icon]} {size} />
