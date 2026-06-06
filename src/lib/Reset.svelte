<script>
	import { onMount } from 'svelte';
	import { createTimer } from '$lib/clock.svelte';
	import { t } from '$lib/i18n/locale.svelte';

	let { sub = 'Rest before the next step.', onDone, onSkip } = $props();

	const DUR = 8;
	const R = 68;
	const CIRC = 2 * Math.PI * R;

	// Countdown: auto-completes after DUR seconds of rest. Started in onMount (not an
	// $effect) so the timer's imperative state writes don't run inside effect tracking.
	const timer = createTimer({ durationMs: DUR * 1000, pollMs: 60, onComplete: () => onDone() });

	onMount(() => {
		timer.start();
		return () => timer.stop();
	});

	let left = $derived(Math.max(0, DUR - timer.elapsedMs / 1000));
	let prog = $derived((DUR - left) / DUR);
</script>

<div class="col center rest">
	<div class="dial">
		<svg width="150" height="150" viewBox="0 0 150 150" class="ring">
			<circle cx="75" cy="75" r={R} fill="none" stroke="var(--line)" stroke-width="3" />
			<circle
				cx="75"
				cy="75"
				r={R}
				fill="none"
				stroke="var(--accent)"
				stroke-width="3"
				stroke-linecap="round"
				stroke-dasharray={CIRC}
				stroke-dashoffset={CIRC * (1 - prog)}
				class="prog"
			/>
		</svg>
		<div class="rest-pulse pulse">
			<span class="count">{Math.ceil(left)}</span>
		</div>
	</div>

	<h2>{t('Breathe normally')}</h2>
	<p class="sub">{sub} {t('Ideally through the nose.')}</p>
	<button class="skip mono" onclick={onSkip}>{t('Skip →')}</button>
</div>

<style>
	.rest {
		gap: 0;
	}

	.dial {
		position: relative;
		width: 150px;
		height: 150px;
		margin-bottom: 36px;
	}

	.ring {
		position: absolute;
		inset: 0;
		transform: rotate(-90deg);
	}

	.prog {
		transition: stroke-dashoffset 0.1s linear;
	}

	.pulse {
		position: absolute;
		inset: 26px;
		border-radius: 50%;
		background: var(--accent-soft);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.count {
		font-family: var(--font-mono);
		font-size: 34px;
		font-weight: 500;
		color: var(--accent);
	}

	h2 {
		font-family: var(--font-display);
		font-size: 25px;
		font-weight: 700;
		color: var(--ink);
		margin: 0 0 8px;
	}

	.sub {
		font-size: 14.5px;
		line-height: 1.5;
		color: var(--muted);
		margin: 0;
		max-width: 240px;
	}

	.skip {
		margin-top: 22px;
		background: none;
		border: none;
		cursor: pointer;
		font-size: 11.5px;
		color: var(--faint);
	}
</style>
