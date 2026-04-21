import { expect, test } from '@playwright/test';

test.describe('Theme toggle', () => {
	test('is rendered on the warning screen with an accessible label', async ({ page }) => {
		await page.goto('/');
		const toggle = page.locator('[data-theme-toggle]');
		await expect(toggle).toBeVisible();
		await expect(toggle).toHaveAttribute('aria-label', /theme/i);
	});

	test('clicking the toggle sets a data-theme attribute on <html>', async ({ page }) => {
		await page.goto('/');
		await page.locator('[data-theme-toggle]').click();
		await expect(page.locator('html')).toHaveAttribute('data-theme', /light|dark/);
	});

	test('clicking the toggle persists a theme selection to localStorage', async ({ page }) => {
		await page.goto('/');
		await page.locator('[data-theme-toggle]').click();
		const stored = await page.evaluate(() => window.localStorage.getItem('theme'));
		expect(stored === 'light' || stored === 'dark').toBe(true);
	});

	test('clicking the toggle twice flips between light and dark themes', async ({ page }) => {
		await page.goto('/');
		const toggle = page.locator('[data-theme-toggle]');
		const html = page.locator('html');

		await toggle.click();
		const firstTheme = await html.getAttribute('data-theme');
		expect(firstTheme === 'light' || firstTheme === 'dark').toBe(true);

		await toggle.click();
		const secondTheme = await html.getAttribute('data-theme');
		expect(secondTheme === 'light' || secondTheme === 'dark').toBe(true);
		expect(secondTheme).not.toBe(firstTheme);

		// localStorage must agree with the DOM.
		const stored = await page.evaluate(() => window.localStorage.getItem('theme'));
		expect(stored).toBe(secondTheme);
	});

	test('is still rendered after advancing past the warning screen', async ({ page }) => {
		await page.goto('/');
		await page.getByRole('checkbox').check();
		await page.getByRole('button', { name: 'Acknowledge and Continue' }).click();
		await expect(page.locator('[data-theme-toggle]')).toBeVisible();
	});
});
