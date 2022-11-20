<script>
	import Icon from "$lib/utils/Icon.svelte";
</script>
<div class="navbar">
	<div>
		<a href="/">
			<img src="/favicon.png" alt="Termite Home Logo" width="64px" />
		</a>
	</div>
	<div>
		<a href="/" class="navbar-link">
			<Icon icon="home" size="2x" />
		</a>
		<a href="/config" class="navbar-link">
			<Icon icon="cogs" size="2x" />
		</a>
	</div>
</div>

<style lang="postcss">
	.navbar {
		width: inherit;
		display: flex;
		justify-content: space-between;

		@apply m-3 border border-accent rounded-2xl shadow-2xl;
	}

	.navbar-link {
		@apply btn btn-ghost;
	}
</style>
