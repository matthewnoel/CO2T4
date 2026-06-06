import { expect, test } from '@playwright/test';
import { MESSAGES } from '../src/lib/i18n/messages';
import { l33t } from '../src/lib/i18n/catalogs/l33t';
import { translate } from '../src/lib/i18n/translate';

// Guards the authored L33T catalog. Completeness is also enforced at compile time
// by `Record<Message, string>`; these run the same checks at runtime and add the
// qualities the type system can't express (real translations, no orphans).

test.describe('L33T message catalog', () => {
	test('every catalogued message has an authored translation that is actually used', () => {
		const missing = MESSAGES.filter((m) => !l33t[m]);
		expect(missing).toEqual([]);

		// translate() returns the authored value, not the algorithmic fallback.
		for (const m of MESSAGES) {
			expect(translate(m, 'l33t')).toBe(l33t[m]);
		}
	});

	test('every translation differs from its English source', () => {
		const unchanged = MESSAGES.filter((m) => l33t[m] === m);
		expect(unchanged).toEqual([]);
	});

	test('the catalog has no keys outside the canonical message list', () => {
		const known = new Set<string>(MESSAGES);
		const orphans = Object.keys(l33t).filter((key) => !known.has(key));
		expect(orphans).toEqual([]);
	});
});
