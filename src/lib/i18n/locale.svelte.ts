import { isLocale, langTag, type LocaleCode } from './locales';
import { translate } from './translate';

const STORAGE_KEY = 'locale';

/** Resolve the initial locale on the client: ?lang= query → localStorage → 'en'. */
function resolveInitial(): LocaleCode {
	if (typeof window !== 'undefined') {
		const param = new URLSearchParams(window.location.search).get('lang');
		if (isLocale(param)) return param;
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (isLocale(stored)) return stored;
		} catch {
			// ignore storage failures (private mode, etc.)
		}
	}
	return 'en';
}

class Locale {
	current = $state<LocaleCode>(resolveInitial());

	/** Switch locale from a user action: persist the choice and reflect it onto the document. */
	set(code: LocaleCode) {
		this.current = code;
		this.syncDocument();
		try {
			localStorage.setItem(STORAGE_KEY, code);
		} catch {
			// ignore storage failures (private mode, etc.)
		}
	}

	/** Reflect the current locale onto <html lang> (e.g. for a deep-linked ?lang=). */
	syncDocument() {
		if (typeof document !== 'undefined') {
			document.documentElement.setAttribute('lang', langTag(this.current));
		}
	}
}

export const locale = new Locale();

/**
 * Translate an English source string into the active locale. Reading
 * `locale.current` here makes every call reactive, so switching locale
 * re-renders all `t(...)` usages.
 */
export function t(source: string): string {
	return translate(source, locale.current);
}
