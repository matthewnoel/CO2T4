import { expect, test } from '@playwright/test';
import { toLeet } from '../src/lib/i18n/leet';
import { translate } from '../src/lib/i18n/translate';

// Pure unit coverage of the translation layer. These specs never touch a `page`
// — they import the runes-free i18n modules directly, which is only possible
// because `leet.ts`/`translate.ts` are deliberately kept free of Svelte runes.

test.describe('Translation layer (pure)', () => {
	test('English is the identity function (the output-preserving invariant)', () => {
		const samples = ['Before you begin', 'Start box breathing', 'Inhale', '', '12.4s · 2:00 left'];
		for (const s of samples) {
			expect(translate(s, 'en')).toBe(s);
		}
	});

	test('L33T falls back to the leet transform for uncatalogued strings', () => {
		// Not a catalogued message, so it exercises the algorithmic fallback path.
		const novel = 'Zephyr Quux 42';
		expect(translate(novel, 'l33t')).toBe(toLeet(novel));
	});

	test('leet substitutes the documented look-alike letters', () => {
		// a→4 b→8 e→3 g→9 i→1 l→1 o→0 s→5 t→7
		expect(toLeet('aebgilost')).toBe('438911057');
	});

	test('leet is case-insensitive and preserves length', () => {
		expect(toLeet('AEIOU')).toBe('4310U');
		expect(toLeet('Hello World')).toHaveLength('Hello World'.length);
	});

	test('digits, punctuation and whitespace pass through untouched', () => {
		const noLetters = '2:00 · (2023)! — +/-';
		expect(toLeet(noLetters)).toBe(noLetters);
	});

	test('the transform is deterministic', () => {
		const s = 'Box Breathing protocol';
		expect(toLeet(s)).toBe(toLeet(s));
	});
});
