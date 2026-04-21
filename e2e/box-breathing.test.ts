import { expect, test, type Page } from '@playwright/test';

/**
 * Walks the flow all the way to BoxBreathing with the given interval
 * (in seconds per step) selected.
 */
async function advanceToBoxBreathing(page: Page, secondsPerStep: number) {
	await page.clock.install();
	await page.goto('/');
	await page.getByRole('checkbox').check();
	await page.getByRole('button', { name: 'Acknowledge and Continue' }).click();

	// First Reset.
	await page.clock.fastForward('00:08');

	// Exhale test — produce an exhale that rounds to `secondsPerStep` via /6000.
	await page.getByRole('button', { name: 'Start' }).click();
	await page.clock.fastForward(secondsPerStep * 6000);
	await page.getByRole('button', { name: 'Stop' }).click();

	// Second Reset.
	await page.clock.fastForward('00:08');

	// TimeConversion — kick off BoxBreathing.
	await expect(page.locator('h1')).toHaveText(String(secondsPerStep));
	await page.getByRole('button', { name: 'Start' }).click();
}

test.describe('Box breathing', () => {
	test('starts on the "Breath in" step with the nose emoji', async ({ page }) => {
		await advanceToBoxBreathing(page, 5);
		await expect(page.getByText('Breath in')).toBeVisible();
		await expect(page.locator('h1')).toHaveText('👃');
	});

	test('cycles through the four box breathing steps in order', async ({ page }) => {
		await advanceToBoxBreathing(page, 5);

		// Tick 1: Hold (😶)
		await page.clock.fastForward(5000);
		await expect(page.getByText('Hold')).toBeVisible();
		await expect(page.locator('h1')).toHaveText('😶');

		// Tick 2: Breath out (😮‍💨)
		await page.clock.fastForward(5000);
		await expect(page.getByText('Breath out')).toBeVisible();
		await expect(page.locator('h1')).toHaveText('😮‍💨');

		// Tick 3: Hold again (😶)
		await page.clock.fastForward(5000);
		await expect(page.getByText('Hold')).toBeVisible();
		await expect(page.locator('h1')).toHaveText('😶');

		// Tick 4: back to Breath in (👃)
		await page.clock.fastForward(5000);
		await expect(page.getByText('Breath in')).toBeVisible();
		await expect(page.locator('h1')).toHaveText('👃');
	});

	test('shows "Great job" after two minutes of total elapsed breathing', async ({ page }) => {
		await advanceToBoxBreathing(page, 5);

		// 120 seconds / 5 seconds per step = 24 ticks to reach completion.
		await page.clock.fastForward(24 * 5000);

		await expect(page.getByText('Great job')).toBeVisible();
		await expect(page.getByText('Breath in')).toHaveCount(0);
	});

	test('still shows an in-progress step just before two minutes have elapsed', async ({ page }) => {
		await advanceToBoxBreathing(page, 5);
		// 23 ticks = 115 seconds elapsed — not done yet.
		await page.clock.fastForward(23 * 5000);
		await expect(page.getByText('Great job')).toHaveCount(0);
	});
});
