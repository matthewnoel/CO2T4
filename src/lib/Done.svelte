<script>
	import ElementTile from '$lib/ElementTile.svelte';
	import Button from '$lib/Button.svelte';
	import Icon from '$lib/Icon.svelte';
	import { t } from '$lib/i18n/locale.svelte';

	let { exhaleMs, interval, onRestart } = $props();

	let stats = $derived([
		['Exhale', `${(exhaleMs / 1000).toFixed(1)}s`],
		['Interval', `${interval}s`],
		['Duration', '2:00']
	]);
</script>

<div class="col center done">
	<div class="badge"><ElementTile sym="✓" name={t('Complete')} size={64} /></div>
	<h2>{t('Great job')}</h2>
	<p class="lede">{t('You completed a full two-minute box-breathing cycle.')}</p>

	<div class="stats">
		{#each stats as [k, v] (k)}
			<div class="stat">
				<div class="stat-v">{v}</div>
				<span class="mono stat-k">{t(k)}</span>
			</div>
		{/each}
	</div>

	<Button full variant="secondary" onclick={onRestart}>
		<Icon name="restart" size={17} />
		{t('Start over')}
	</Button>
</div>

<style>
	.badge {
		margin-bottom: 26px;
	}

	h2 {
		font-family: var(--font-display);
		font-size: 28px;
		font-weight: 700;
		color: var(--ink);
		margin: 0 0 10px;
	}

	.lede {
		font-size: 14.5px;
		line-height: 1.5;
		color: var(--muted);
		margin: 0;
		max-width: 250px;
	}

	.stats {
		display: flex;
		gap: 10px;
		margin: 28px 0;
		width: 100%;
	}

	.stat {
		flex: 1;
		border-radius: var(--radius);
		border: 1px solid var(--line);
		background: var(--surface);
		padding: 12px 8px;
	}

	.stat-v {
		font-family: var(--font-display);
		font-size: 20px;
		font-weight: 700;
		color: var(--ink);
	}

	.stat-k {
		display: block;
		margin-top: 3px;
		font-size: 9.5px;
		color: var(--faint);
	}
</style>
