<script lang="ts">
	import { onMount } from 'svelte';
	import Button from '$lib/Button.svelte';
	import { createTimer } from '$lib/clock.svelte';
	import { t } from '$lib/i18n/locale.svelte';

	let { interval, onDone, onEnd }: { interval: number; onDone: () => void; onEnd: () => void } =
		$props();

	const PHASES = [
		{ label: 'Inhale', sub: 'through your nose' },
		{ label: 'Hold', sub: 'keep it in' },
		{ label: 'Exhale', sub: 'slow and steady' },
		{ label: 'Hold', sub: 'stay empty' }
	];
	const TOTAL = 120;
	const SMALL = 0.4;

	// Phase timer: runs the full protocol, then completes. Started in onMount (not an
	// $effect) so the timer's imperative state writes don't run inside effect tracking.
	const timer = createTimer({ durationMs: TOTAL * 1000, pollMs: 200, onComplete: () => onDone() });

	let scale = $state(SMALL);
	let dur = $state(0);

	onMount(() => {
		timer.start();
		return () => timer.stop();
	});

	// Everything is derived from elapsed time, so behaviour is correct no matter how the
	// clock advances (a single large jump under test still lands on the right phase).
	let elapsed = $derived(timer.elapsedMs / 1000);
	let idx = $derived(Math.floor(elapsed / interval) % 4);
	let secLeft = $derived(Math.max(1, Math.ceil(interval - (elapsed % interval))));

	// Drive the square's expand/contract via a CSS transition keyed to the phase.
	function applyPhase(i: number) {
		if (i === 0) {
			dur = interval; // inhale: grow over the whole phase
			scale = 1;
		} else if (i === 1) {
			dur = 0; // hold: stay expanded
			scale = 1;
		} else if (i === 2) {
			dur = interval; // exhale: shrink over the whole phase
			scale = SMALL;
		} else {
			dur = 0; // hold: stay contracted
			scale = SMALL;
		}
	}

	$effect(() => {
		applyPhase(idx);
	});

	let remain = $derived(Math.max(0, TOTAL - elapsed));
	let mm = $derived(Math.floor(remain / 60));
	let ss = $derived(String(Math.floor(remain % 60)).padStart(2, '0'));
	let ph = $derived(PHASES[idx]);
</script>

<div class="col between breathe">
	<div class="bar">
		<span class="mono accent">{t('Box breathing')}</span>
		<span class="mono muted">{interval}s · {mm}:{ss} {t('left')}</span>
	</div>

	<div class="stage">
		<div class="guide"></div>
		<div
			class="square"
			style="transform: translate(-50%,-50%) scale({scale}); transition: transform {dur}s linear;"
		>
			<span class="tick tl"></span>
			<span class="tick tr"></span>
			<span class="tick bl"></span>
			<span class="tick br"></span>
		</div>
		<div class="center">
			<span class="phase">{t(ph.label)}</span>
			<span class="phase-sub">{t(ph.sub)}</span>
			<span class="phase-count">{secLeft}</span>
		</div>
	</div>

	<div class="foot">
		<div class="dots">
			{#each PHASES as phase, i (phase.label + i)}
				<span class="dot" class:on={i === idx}></span>
			{/each}
		</div>
		<Button variant="ghost" size="sm" onclick={onEnd}>{t('End session')}</Button>
	</div>
</div>

<style>
	.bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.accent {
		color: var(--accent);
		font-size: 11.5px;
	}

	.muted {
		color: var(--muted);
		font-size: 11.5px;
		font-variant-numeric: tabular-nums;
	}

	.stage {
		position: relative;
		width: 196px;
		height: 196px;
		margin: 0 auto;
		flex: 0 0 auto;
	}

	.guide {
		position: absolute;
		inset: 0;
		border-radius: calc(var(--radius) + 3px);
		border: 1px dashed var(--line);
	}

	.square {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 196px;
		height: 196px;
		border-radius: calc(var(--radius) + 3px);
		border: 2px solid var(--accent);
		background: var(--accent-soft);
		will-change: transform;
	}

	.tick {
		position: absolute;
		width: 16px;
		height: 16px;
	}

	.tl {
		top: -2px;
		left: -2px;
		border-top: 2.5px solid var(--accent);
		border-left: 2.5px solid var(--accent);
	}

	.tr {
		top: -2px;
		right: -2px;
		border-top: 2.5px solid var(--accent);
		border-right: 2.5px solid var(--accent);
	}

	.bl {
		bottom: -2px;
		left: -2px;
		border-bottom: 2.5px solid var(--accent);
		border-left: 2.5px solid var(--accent);
	}

	.br {
		bottom: -2px;
		right: -2px;
		border-bottom: 2.5px solid var(--accent);
		border-right: 2.5px solid var(--accent);
	}

	.center {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 4px;
	}

	.phase {
		font-family: var(--font-display);
		font-size: 28px;
		font-weight: 700;
		color: var(--ink);
		letter-spacing: -0.01em;
	}

	.phase-sub {
		font-family: var(--font-mono);
		font-size: 13px;
		color: var(--muted);
	}

	.phase-count {
		font-family: var(--font-mono);
		font-size: 19px;
		font-weight: 500;
		color: var(--accent);
		margin-top: 4px;
		font-variant-numeric: tabular-nums;
	}

	.foot {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 14px;
	}

	.dots {
		display: flex;
		gap: 6px;
	}

	.dot {
		width: 7px;
		height: 7px;
		border-radius: 4px;
		background: var(--line);
		transition: background 0.2s;
	}

	.dot.on {
		background: var(--accent);
	}

	@media (prefers-reduced-motion: reduce) {
		.square {
			transition: none !important;
		}
	}
</style>
