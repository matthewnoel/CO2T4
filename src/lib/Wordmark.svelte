<script>
	let { size = 19 } = $props();
</script>

<span class="wordmark" style="font-size:{size}px">CO<sub>2</sub>T<sub>4</sub></span>

<style>
	.wordmark {
		font-family: var(--font-display);
		font-weight: 700;
		letter-spacing: -0.01em;
		color: var(--ink);
		display: inline-flex;
		align-items: baseline;
		line-height: 1;
	}

	.wordmark sub {
		font-size: 0.62em;
		color: var(--accent);
	}
</style>
