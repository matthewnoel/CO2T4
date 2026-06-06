<script>
	let { total = 6, idx = 0 } = $props();

	let pips = $derived(Array.from({ length: total }, (_, i) => i));
</script>

<div class="pips">
	{#each pips as i (i)}
		<div
			class="pip"
			class:active={i === idx}
			style="background:{i <= idx ? 'var(--accent)' : 'var(--line)'}"
		></div>
	{/each}
</div>

<style>
	.pips {
		display: flex;
		gap: 6px;
		align-items: center;
	}

	.pip {
		height: 4px;
		width: 7px;
		border-radius: 2px;
		transition: all 0.3s;
	}

	.pip.active {
		width: 18px;
	}
</style>
