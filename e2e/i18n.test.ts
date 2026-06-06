import { expect, test } from '@playwright/test';
import { translate } from '../src/lib/i18n/translate';

// Expected localized copy is computed via the *same* translator the app uses, so
// these assertions can never drift from the transform's output.
const leetHeading = translate('Before you begin', 'l33t');

test.describe('Internationalization', () => {
	test('?lang=l33t switches <html lang> and renders leetspeak copy', async ({ page }) => {
		await page.goto('/?lang=l33t');
		await expect(page.locator('html')).toHaveAttribute('lang', 'en-x-l33t');
		await expect(page.locator('h1')).toHaveText(leetHeading);
	});

	test('the header switcher transforms copy live and persists across reloads', async ({ page }) => {
		await page.goto('/');
		// Default locale is English — the existing suite depends on this.
		await expect(page.locator('h1')).toHaveText('Before you begin');

		await page.getByLabel('Language').selectOption('l33t');
		await expect(page.locator('h1')).toHaveText(leetHeading);
		await expect(page.locator('html')).toHaveAttribute('lang', 'en-x-l33t');

		const stored = await page.evaluate(() => window.localStorage.getItem('locale'));
		expect(stored).toBe('l33t');

		await page.reload();
		await expect(page.locator('h1')).toHaveText(leetHeading);
	});

	test('the flow still works in L33T using locale-aware selectors', async ({ page }) => {
		await page.goto('/?lang=l33t');
		// Accessible names are leeted, so derive them from the same translator
		// rather than hardcoding — selecting by role keeps the structure stable.
		await page.getByRole('checkbox').check();
		await page.getByRole('button', { name: translate('Acknowledge & continue', 'l33t') }).click();
		await expect(page.locator('h1')).toHaveCount(0);
	});

	test('an unknown ?lang= falls back to English', async ({ page }) => {
		await page.goto('/?lang=bogus');
		await expect(page.locator('html')).toHaveAttribute('lang', 'en');
		await expect(page.locator('h1')).toHaveText('Before you begin');
	});
});
