<script lang="ts">
	import { untrack } from 'svelte';
	import Button from '$lib/Button.svelte';
	import { exhaleToInterval, MIN_INTERVAL_S, MAX_INTERVAL_S } from '$lib/calibration';

	let { milliseconds, onStart }: { milliseconds: number; onStart: (secs: number) => void } =
		$props();

	// Seed the interval from the measured exhale once; the +/- buttons then own it.
	let secs = $state(untrack(() => exhaleToInterval(milliseconds)));

	function dec() {
		if (secs > MIN_INTERVAL_S) secs -= 1;
	}

	function inc() {
		if (secs < MAX_INTERVAL_S) secs += 1;
	}

	let exhaleSecs = $derived((milliseconds / 1000).toFixed(1));
</script>

<div class="col between calibrate">
	<div class="head">
		<span class="mono step">Step 02 · Calibration</span>
		<h2>Set your interval</h2>
		<p class="lede">
			Calibrated from your <strong>{exhaleSecs}s</strong> exhale. Each phase will last this long.
		</p>
	</div>

	<div class="stepper">
		<button class="round" aria-label="Decrease interval" onclick={dec} disabled={secs <= MIN_INTERVAL_S}
			>–</button
		>
		<div class="value-wrap">
			<div class="value" data-testid="interval">{secs}</div>
			<span class="mono unit">seconds</span>
		</div>
		<button class="round" aria-label="Increase interval" onclick={inc} disabled={secs >= MAX_INTERVAL_S}
			>+</button
		>
	</div>

	<Button full size="lg" onclick={() => onStart(secs)}>Start box breathing</Button>
</div>

<style>
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

	.lede {
		font-size: 13.5px;
		color: var(--muted);
		margin: 8px 0 0;
		line-height: 1.5;
	}

	.lede strong {
		color: var(--ink);
	}

	.stepper {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 22px;
	}

	.round {
		width: 52px;
		height: 52px;
		border-radius: 50%;
		border: 1.5px solid var(--accent);
		background: transparent;
		color: var(--accent);
		font-size: 26px;
		cursor: pointer;
		font-family: var(--font-body);
		line-height: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.15s;
	}

	.round:disabled {
		border-color: var(--line);
		color: var(--faint);
		cursor: default;
	}

	.value-wrap {
		text-align: center;
		min-width: 96px;
	}

	.value {
		font-family: var(--font-display);
		font-size: 76px;
		font-weight: 700;
		color: var(--ink);
		line-height: 0.9;
		font-variant-numeric: tabular-nums;
	}

	.unit {
		display: block;
		margin-top: 6px;
		font-size: 11px;
		color: var(--faint);
	}
</style>
