<script lang="ts">
	import Button from '$lib/Button.svelte';
	import Icon from '$lib/Icon.svelte';

	let { onResult }: { onResult: (ms: number) => void } = $props();

	const SIX_SECONDS = 6000;
	const ONE_HUNDRED_TWENTY_SECONDS = 120000;
	const MIN_BREATH = SIX_SECONDS;
	const MAX_BREATH = ONE_HUNDRED_TWENTY_SECONDS;

	let running = $state(false);
	let ms = $state(0);
	let startTime = 0;
	let raf = 0;

	function loop() {
		ms = Date.now() - startTime;
		raf = requestAnimationFrame(loop);
	}

	function start() {
		startTime = Date.now();
		ms = 0;
		running = true;
		raf = requestAnimationFrame(loop);
	}

	function stop() {
		running = false;
		if (raf) cancelAnimationFrame(raf);
		const exhale = Date.now() - startTime;
		// Reject implausible exhales (too short / too long) and reset to the start state.
		if (exhale < MIN_BREATH || exhale > MAX_BREATH) {
			ms = 0;
			return;
		}
		onResult(exhale);
	}

	$effect(() => () => {
		if (raf) cancelAnimationFrame(raf);
	});

	let secs = $derived(ms / 1000);
</script>

<div class="col between exhale">
	<div class="head">
		<span class="mono step">Step 01 · Exhale test</span>
		<h2>{running ? 'Exhale as slowly as you can' : 'Measure your slowest exhale'}</h2>
	</div>

	<div class="meter">
		<div class="ring" class:running>
			{#if running}
				<span class="time">{secs.toFixed(1)}<span class="unit">s</span></span>
			{:else}
				<Icon name="nose" size={42} stroke="var(--muted)" sw={1.6} />
			{/if}
		</div>
		<p class="guide">
			{#if running}
				Tap <strong>Stop</strong> the moment you run out of air. Don’t hold your breath.
			{:else}
				Inhale completely through your nose. Then start the timer and let the air out as slowly as
				possible.
			{/if}
		</p>
	</div>

	<Button
		full
		size="lg"
		variant={running ? 'secondary' : 'primary'}
		onclick={running ? stop : start}
	>
		{running ? 'Stop' : 'Start'}
	</Button>
</div>

<style>
	.exhale {
		gap: 0;
	}

	.step {
		color: var(--accent);
		font-size: 11.5px;
	}

	.head h2 {
		font-family: var(--font-display);
		font-size: 24px;
		font-weight: 700;
		color: var(--ink);
		margin: 10px 0 0;
		line-height: 1.12;
	}

	.meter {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 18px;
	}

	.ring {
		width: 116px;
		height: 116px;
		border-radius: 50%;
		border: 2px solid var(--line);
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		transition: all 0.3s;
	}

	.ring.running {
		border-color: var(--accent);
		background: var(--accent-soft);
	}

	.time {
		font-family: var(--font-mono);
		font-size: 30px;
		font-weight: 500;
		color: var(--accent);
		font-variant-numeric: tabular-nums;
	}

	.unit {
		font-size: 14px;
	}

	.guide {
		font-size: 14px;
		line-height: 1.55;
		color: var(--muted);
		text-align: center;
		margin: 0;
		max-width: 250px;
	}

	.guide strong {
		color: var(--ink);
	}
</style>
