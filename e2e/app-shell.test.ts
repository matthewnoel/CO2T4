import { expect, test } from '@playwright/test';

test.describe('Application shell', () => {
	test('serves a 200 response for the root URL', async ({ page }) => {
		const response = await page.goto('/');
		expect(response?.status()).toBe(200);
	});

	test('sets the document title', async ({ page }) => {
		await page.goto('/');
		await expect(page).toHaveTitle('Carbon Dioxide Tolerance Testing & Training Tool');
	});

	test('declares the page language as English', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('html')).toHaveAttribute('lang', 'en');
	});

	test('ships a viewport meta tag for mobile rendering', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('meta[name="viewport"]')).toHaveAttribute(
			'content',
			'width=device-width, initial-scale=1'
		);
	});

	test('serves both favicon variants', async ({ page, baseURL }) => {
		await page.goto('/');
		const pngIcon = page.locator('link[rel="icon"][href*=".png"]');
		const icoIcon = page.locator('link[rel="icon"][href*=".ico"]');
		await expect(pngIcon).toHaveCount(1);
		await expect(icoIcon).toHaveCount(1);

		// The static favicon files must be served too (verifies the static adapter build).
		const pngResponse = await page.request.get(`${baseURL}/favicon.png`);
		expect(pngResponse.status()).toBe(200);
		const icoResponse = await page.request.get(`${baseURL}/favicon.ico`);
		expect(icoResponse.status()).toBe(200);
	});

	test('does not log any browser console errors during the full happy path', async ({ page }) => {
		const errors: string[] = [];
		page.on('pageerror', (error) => errors.push(error.message));
		page.on('console', (message) => {
			if (message.type() !== 'error') return;
			// Ignore failures to fetch external resources (fonts, etc.) — they
			// come from the environment, not the app code we're regression-testing.
			if (message.text().startsWith('Failed to load resource')) return;
			errors.push(message.text());
		});

		await page.clock.install();
		await page.goto('/');
		await page.getByRole('checkbox').check();
		await page.getByRole('button', { name: 'Acknowledge & continue' }).click();
		await page.clock.fastForward(9000);
		await page.getByRole('button', { name: 'Start' }).click();
		await page.clock.fastForward(30000);
		await page.getByRole('button', { name: 'Stop' }).click();
		await page.clock.fastForward(9000);
		await page.getByRole('button', { name: 'Start box breathing' }).click();
		// Chunked advance so every BoxBreathing tick actually fires.
		for (let i = 0; i < 25; i++) {
			await page.clock.fastForward(5000);
		}
		await expect(page.getByText('Great job')).toBeVisible();

		expect(errors).toEqual([]);
	});
});
