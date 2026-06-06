import { expect, test, type Page } from '@playwright/test';

/**
 * Walks the flow all the way to BoxBreathing with the given interval
 * (in seconds per step) selected.
 */
async function advanceToBoxBreathing(page: Page, secondsPerStep: number) {
	await page.clock.install();
	await page.goto('/');
	await page.getByRole('checkbox').check();
	await page.getByRole('button', { name: 'Acknowledge & continue' }).click();

	// First Rest — add slack past the 8s tick boundary.
	await page.clock.fastForward(9000);

	// Exhale test — produce an exhale that rounds to `secondsPerStep` via /6000.
	await page.getByRole('button', { name: 'Start' }).click();
	await page.clock.fastForward(secondsPerStep * 6000);
	await page.getByRole('button', { name: 'Stop' }).click();

	// Second Rest — same slack.
	await page.clock.fastForward(9000);

	// Calibration — kick off BoxBreathing.
	await expect(page.getByTestId('interval')).toHaveText(String(secondsPerStep));
	await page.getByRole('button', { name: 'Start box breathing' }).click();
}

test.describe('Box breathing', () => {
	test('starts on the "Inhale" phase', async ({ page }) => {
		await advanceToBoxBreathing(page, 5);
		await expect(page.getByText('Inhale')).toBeVisible();
		await expect(page.getByText('through your nose')).toBeVisible();
	});

	test('cycles through the four box breathing phases in order', async ({ page }) => {
		await advanceToBoxBreathing(page, 5);

		// Phase 1: Hold. Add slack so the 5s boundary tick definitely fires.
		await page.clock.fastForward(5100);
		await expect(page.getByText('Hold')).toBeVisible();
		await expect(page.getByText('keep it in')).toBeVisible();

		// Phase 2: Exhale
		await page.clock.fastForward(5000);
		await expect(page.getByText('Exhale')).toBeVisible();
		await expect(page.getByText('slow and steady')).toBeVisible();

		// Phase 3: Hold again
		await page.clock.fastForward(5000);
		await expect(page.getByText('Hold')).toBeVisible();
		await expect(page.getByText('stay empty')).toBeVisible();

		// Phase 4: back to Inhale
		await page.clock.fastForward(5000);
		await expect(page.getByText('Inhale')).toBeVisible();
		await expect(page.getByText('through your nose')).toBeVisible();
	});

	test('shows "Great job" after two minutes of total elapsed breathing', async ({ page }) => {
		await advanceToBoxBreathing(page, 5);

		// 120 seconds total. Fast forwards are run in chunks so every tick callback
		// is flushed through the Svelte renderer before the next virtual-time
		// advance — a single large fastForward can miss later ticks.
		for (let i = 0; i < 25; i++) {
			await page.clock.fastForward(5000);
		}

		await expect(page.getByText('Great job')).toBeVisible();
		await expect(page.getByText('Inhale')).toHaveCount(0);
	});

	test('still shows an in-progress phase well before two minutes have elapsed', async ({
		page
	}) => {
		await advanceToBoxBreathing(page, 5);
		// 100 seconds elapsed — comfortably short of completion.
		await page.clock.fastForward(100000);
		await expect(page.getByText('Great job')).toHaveCount(0);
	});
});
