<script lang="ts">
	export let name: string;
	export let value: number;
	export let unit: string;
</script>

<div class="stat">
	<div class="stat-title">{name}</div>
	<div class="stat-value">{value} {unit}</div>
</div>

<style lang="scss">
	.stat {
		padding: 0;
	}

	.stat-value {
		font-size: 1.5rem;
	}
</style>
