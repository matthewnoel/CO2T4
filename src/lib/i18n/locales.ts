// Locale registry. Pure (no Svelte runes) so it can be imported from Playwright
// specs and any plain-Node context without the Svelte compiler.

export type LocaleCode = 'en' | 'l33t';

export interface LocaleInfo {
	/** Internal locale identifier. */
	code: LocaleCode;
	/** Name shown in the switcher, written in the locale's own form (endonym). */
	endonym: string;
	/** BCP-47 language tag applied to <html lang>. `en-x-l33t` uses a valid private-use subtag. */
	lang: string;
}

export const LOCALES: LocaleInfo[] = [
	{ code: 'en', endonym: 'English', lang: 'en' },
	{ code: 'l33t', endonym: 'L33T', lang: 'en-x-l33t' }
];

const CODES = new Set<string>(LOCALES.map((l) => l.code));

/** Narrow an unknown value (query param, storage) to a known locale code. */
export function isLocale(value: unknown): value is LocaleCode {
	return typeof value === 'string' && CODES.has(value);
}

/** The <html lang> tag for a locale (falls back to English). */
export function langTag(code: LocaleCode): string {
	return LOCALES.find((l) => l.code === code)?.lang ?? 'en';
}
