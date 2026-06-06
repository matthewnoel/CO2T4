<script lang="ts">
	import { locale, t } from '$lib/i18n/locale.svelte';
	import { LOCALES, isLocale } from '$lib/i18n/locales';

	function onchange(event: Event) {
		const value = (event.currentTarget as HTMLSelectElement).value;
		if (isLocale(value)) locale.set(value);
	}
</script>

<select class="lang" aria-label={t('Language')} value={locale.current} {onchange}>
	{#each LOCALES as l (l.code)}
		<option value={l.code}>{l.endonym}</option>
	{/each}
</select>

<style>
	.lang {
		appearance: none;
		border: 1px solid var(--line);
		background: transparent;
		color: var(--muted);
		font-family: var(--font-mono);
		font-size: 11px;
		border-radius: 7px;
		padding: 4px 7px;
		cursor: pointer;
		transition:
			color 0.15s,
			border-color 0.15s;
	}

	.lang:hover {
		color: var(--accent);
		border-color: var(--accent);
	}
</style>
