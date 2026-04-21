import { expect, test, type Page } from '@playwright/test';

/**
 * Walks the flow up to the TimeConversion step with the given exhale duration
 * (in milliseconds). The conversion rounds milliseconds / 6000 to produce the
 * starting "seconds" value of the Box Breathing interval.
 */
async function advanceToTimeConversion(page: Page, exhaleMs: number) {
	await page.clock.install();
	await page.goto('/');
	await page.getByRole('checkbox').check();
	await page.getByRole('button', { name: 'Acknowledge and Continue' }).click();

	// First Reset — 8 seconds.
	await page.clock.fastForward('00:08');

	// Exhale test.
	await page.getByRole('button', { name: 'Start' }).click();
	await page.clock.fastForward(exhaleMs);
	await page.getByRole('button', { name: 'Stop' }).click();

	// Second Reset — 8 seconds.
	await page.clock.fastForward('00:08');

	// TimeConversion should now be visible.
	await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();
	await expect(page.getByText('Second Box Breathing Interval')).toBeVisible();
}

test.describe('Time conversion', () => {
	test('rounds the exhale duration to a sensible box breathing interval', async ({ page }) => {
		// 30s exhale -> 30000ms / 6000 = 5 seconds per side.
		await advanceToTimeConversion(page, 30000);
		await expect(page.locator('h1')).toHaveText('5');
	});

	test('rounds down just below the halfway mark', async ({ page }) => {
		// 29999ms / 6000 ≈ 4.9998 -> rounds to 5.
		await advanceToTimeConversion(page, 29999);
		await expect(page.locator('h1')).toHaveText('5');
	});

	test('rounds up past the halfway mark', async ({ page }) => {
		// 33000ms / 6000 = 5.5 -> rounds to 6.
		await advanceToTimeConversion(page, 33000);
		await expect(page.locator('h1')).toHaveText('6');
	});

	test('the + button increments the seconds value', async ({ page }) => {
		await advanceToTimeConversion(page, 30000);
		await page.getByRole('button', { name: '+' }).click();
		await expect(page.locator('h1')).toHaveText('6');
	});

	test('the - button decrements the seconds value', async ({ page }) => {
		await advanceToTimeConversion(page, 30000);
		await page.getByRole('button', { name: '-' }).click();
		await expect(page.locator('h1')).toHaveText('4');
	});

	test('+ is disabled when the value is at the 20 second maximum', async ({ page }) => {
		// 120 second exhale -> 120000 / 6000 = 20.
		await advanceToTimeConversion(page, 120000);
		await expect(page.locator('h1')).toHaveText('20');
		await expect(page.getByRole('button', { name: '+' })).toBeDisabled();
		await expect(page.getByRole('button', { name: '-' })).toBeEnabled();
	});

	test('- is disabled when the value is at the 1 second minimum', async ({ page }) => {
		// 6 second exhale -> 6000 / 6000 = 1.
		await advanceToTimeConversion(page, 6000);
		await expect(page.locator('h1')).toHaveText('1');
		await expect(page.getByRole('button', { name: '-' })).toBeDisabled();
		await expect(page.getByRole('button', { name: '+' })).toBeEnabled();
	});

	test('+ cannot push the value past the 20 second maximum', async ({ page }) => {
		await advanceToTimeConversion(page, 120000);
		// Button is disabled, but even a force click must not change the value.
		await page.getByRole('button', { name: '+' }).click({ force: true });
		await expect(page.locator('h1')).toHaveText('20');
	});

	test('- cannot push the value below the 1 second minimum', async ({ page }) => {
		await advanceToTimeConversion(page, 6000);
		await page.getByRole('button', { name: '-' }).click({ force: true });
		await expect(page.locator('h1')).toHaveText('1');
	});

	test('clicking Start advances to the box breathing step', async ({ page }) => {
		await advanceToTimeConversion(page, 30000);
		await page.getByRole('button', { name: 'Start' }).click();
		// First step of the box breathing cycle.
		await expect(page.getByText('Breath in')).toBeVisible();
		await expect(page.getByText('Second Box Breathing Interval')).toHaveCount(0);
	});
});
