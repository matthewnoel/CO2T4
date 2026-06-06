import { toLeet } from './leet';
import { l33t } from './catalogs/l33t';
import type { LocaleCode } from './locales';

// Per-locale message catalogs keyed by the English source string. Adding a real
// language is just dropping its `Record<source, translation>` in here.
const CATALOGS: Partial<Record<LocaleCode, Record<string, string>>> = {
	l33t
};

/**
 * Resolve an English source string into the active locale.
 *
 * `en` is the identity function, which keeps the rendered English byte-identical
 * to the pre-i18n app (the e2e suite depends on this). For other locales we look
 * up the source in that locale's catalog. A missing entry falls back to the
 * English source — except L33T, a constructed language, where the algorithmic
 * leet transform fills any gap (proper nouns, punctuation, dynamic text) so it is
 * always fully rendered.
 */
export function translate(source: string, locale: LocaleCode): string {
	if (locale === 'en') return source;

	const authored = CATALOGS[locale]?.[source];
	if (authored !== undefined) return authored;

	return locale === 'l33t' ? toLeet(source) : source;
}
