<script>
	import ElementTile from '$lib/ElementTile.svelte';
	import Button from '$lib/Button.svelte';
	import Icon from '$lib/Icon.svelte';
	import { t } from '$lib/i18n/locale.svelte';

	let { onAccept } = $props();
	let ok = $state(false);

	// English source strings double as keys; t() is applied at the usage site so
	// the list stays the source of truth and re-renders on locale change.
	const disclaimers = [
		'For educational use only. Not medical advice.',
		'Consult a licensed physician before any breathing exercise.',
		'Not affiliated with the study’s authors. No warranty.'
	];
</script>

<div class="col between warning">
	<div class="intro">
		<div class="tiles">
			<ElementTile sym="C" num="6" name={t('A Box')} size={50} />
			<ElementTile sym="O²" num="8" name={t('Breathing')} size={50} />
			<ElementTile sym="T⁴" num="22" name={t('Tool')} size={50} />
		</div>
		<h1>{t('Before you begin')}</h1>
		<p class="lede">
			{t('A guide to the')} <strong>{t('Box Breathing')}</strong>
			{t('protocol from')}
			<a href="https://doi.org/10.1016/j.xcrm.2022.100895" target="_blank" rel="noreferrer"
				>{t('Balban et al. (2023)')}</a
			>{t('.')}
		</p>
	</div>

	<div class="disclaimer">
		<div class="dis-head">
			<Icon name="info" size={16} stroke="var(--danger)" />
			<span class="mono dis-tag">{t('Medical disclaimer')}</span>
		</div>
		{#each disclaimers as d (d)}
			<div class="bullet"><span class="dash">—</span><span>{t(d)}</span></div>
		{/each}
	</div>

	<div class="accept">
		<label class="check">
			<input type="checkbox" bind:checked={ok} />
			<span class="box"></span>
			<span class="check-text"
				>{t(
					'I understand this is an unofficial tool offered with no warranty, and I accept full responsibility for my use of it.'
				)}</span
			>
		</label>
		<Button full disabled={!ok} onclick={onAccept}>{t('Acknowledge & continue')}</Button>
		<div class="meta">
			<a href="https://github.com/matthewnoel/CO2T4" target="_blank" rel="noreferrer"
				>{t('Source code')}</a
			>
			<span aria-hidden="true">·</span>
			<a
				href="https://github.com/matthewnoel/CO2T4/blob/main/third-party-licenses.txt"
				target="_blank"
				rel="noreferrer">{t('Third-party licenses')}</a
			>
		</div>
	</div>
</div>

<style>
	.warning {
		gap: 14px;
	}

	.tiles {
		display: flex;
		gap: 9px;
		margin-bottom: 18px;
	}

	h1 {
		font-family: var(--font-display);
		font-size: 27px;
		line-height: 1.08;
		font-weight: 700;
		color: var(--ink);
		margin: 0 0 7px;
		letter-spacing: -0.02em;
	}

	.lede {
		font-size: 13.5px;
		line-height: 1.5;
		color: var(--muted);
		margin: 0;
	}

	.lede strong {
		color: var(--ink);
		font-weight: 600;
	}

	.lede a {
		color: var(--accent);
		text-decoration: none;
		border-bottom: 1px solid var(--accent-soft);
	}

	.disclaimer {
		border-radius: var(--radius);
		border: 1px solid var(--line);
		background: var(--danger-soft);
		padding: 14px 16px;
		display: flex;
		flex-direction: column;
		gap: 9px;
	}

	.dis-head {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.dis-tag {
		color: var(--danger);
		font-size: 11px;
		white-space: nowrap;
	}

	.bullet {
		display: flex;
		gap: 8px;
		font-size: 12.5px;
		line-height: 1.45;
		color: var(--ink);
	}

	.dash {
		color: var(--danger);
		font-weight: 700;
	}

	.accept {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.check {
		display: flex;
		gap: 12px;
		align-items: flex-start;
		cursor: pointer;
		user-select: none;
		position: relative;
	}

	.check input {
		position: absolute;
		top: 1px;
		left: 0;
		width: 24px;
		height: 24px;
		margin: 0;
		opacity: 0;
		cursor: pointer;
	}

	.check .box {
		flex: 0 0 auto;
		width: 24px;
		height: 24px;
		margin-top: 1px;
		border-radius: 7px;
		border: 1.5px solid var(--faint);
		background: transparent;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.15s;
		/* Purely decorative — let clicks fall through to the real <input> on top. */
		pointer-events: none;
	}

	.check input:checked ~ .box {
		border-color: var(--accent);
		background: var(--accent);
	}

	.check input:checked ~ .box::after {
		content: '';
		width: 6px;
		height: 11px;
		border: solid var(--accent-ink);
		border-width: 0 2.6px 2.6px 0;
		transform: rotate(45deg) translateY(-1px);
	}

	.check-text {
		font-size: 13px;
		line-height: 1.5;
		color: var(--muted);
	}

	.meta {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 8px;
		font-size: 11.5px;
		color: var(--line);
	}

	.meta a {
		color: var(--faint);
		text-decoration: none;
	}

	.meta a:hover {
		color: var(--accent);
	}
</style>
