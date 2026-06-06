<script lang="ts">
	import Button from '$lib/Button.svelte';
	import Icon from '$lib/Icon.svelte';
	import { createTimer } from '$lib/clock.svelte';
	import { isValidExhale } from '$lib/calibration';
	import { t } from '$lib/i18n/locale.svelte';

	let { onResult }: { onResult: (ms: number) => void } = $props();

	// Stopwatch: count up from the moment the breath starts.
	const timer = createTimer({ pollMs: 100 });

	function start() {
		timer.start();
	}

	function stop() {
		const exhale = timer.stop();
		// Reject implausible exhales (too short / too long); the start state returns on its own.
		if (!isValidExhale(exhale)) return;
		onResult(exhale);
	}

	$effect(() => () => timer.stop());

	let secs = $derived(timer.elapsedMs / 1000);
</script>

<div class="col between exhale">
	<div class="head">
		<span class="mono step">{t('Step 01 · Exhale test')}</span>
		<h2>{timer.running ? t('Exhale as slowly as you can') : t('Measure your slowest exhale')}</h2>
	</div>

	<div class="meter">
		<div class="ring" class:running={timer.running}>
			{#if timer.running}
				<span class="time">{secs.toFixed(1)}<span class="unit">s</span></span>
			{:else}
				<Icon name="nose" size={42} stroke="var(--muted)" sw={1.6} />
			{/if}
		</div>
		<p class="guide">
			{#if timer.running}
				{t('Tap')} <strong>{t('Stop')}</strong>
				{t('the moment you run out of air. Don’t hold your breath.')}
			{:else}
				{t(
					'Inhale completely through your nose. Then start the timer and let the air out as slowly as possible.'
				)}
			{/if}
		</p>
	</div>

	<Button
		full
		size="lg"
		variant={timer.running ? 'secondary' : 'primary'}
		onclick={timer.running ? stop : start}
	>
		{timer.running ? t('Stop') : t('Start')}
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
