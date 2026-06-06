<script>
	// Periodic-style "title card" tile (Lab = filled plate treatment).
	let { sym, num = '', name = '', size = 56, active = true } = $props();
	let scale = $derived(size / 56);
</script>

<div
	class="tile"
	class:active
	style="width:{size}px;height:{size * 1.16}px;border-radius:var(--radius)"
>
	{#if num}
		<span class="num" style="top:{5 * scale}px;left:{6 * scale}px;font-size:{10 * scale}px"
			>{num}</span
		>
	{/if}
	<span class="sym" style="font-size:{25 * scale}px">{sym}</span>
	{#if name}
		<span class="name" style="bottom:{5 * scale}px;font-size:{7.5 * scale}px">{name}</span>
	{/if}
</div>

<style>
	.tile {
		position: relative;
		overflow: hidden;
		flex: 0 0 auto;
		font-family: var(--font-mono);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: var(--sunken);
		color: var(--muted);
		border: 1px solid var(--line);
	}

	.tile.active {
		background: var(--accent);
		color: var(--accent-ink);
		border-color: var(--accent);
	}

	.num {
		position: absolute;
		font-weight: 500;
		opacity: 0.85;
		line-height: 1;
	}

	.sym {
		font-weight: 600;
		line-height: 1;
	}

	.name {
		position: absolute;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		opacity: 0.8;
		line-height: 1;
	}
</style>
