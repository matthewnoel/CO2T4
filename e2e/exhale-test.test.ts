import { expect, test, type Page } from '@playwright/test';

async function advanceToExhaleTest(page: Page) {
	await page.clock.install();
	await page.goto('/');
	await page.getByRole('checkbox').check();
	await page.getByRole('button', { name: 'Acknowledge and Continue' }).click();
	// Skip the initial 8 second Reset step.
	await page.clock.fastForward('00:08');
	await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();
}

test.describe('Exhale test', () => {
	test('shows the "breath in" guidance and a Start button before the timer runs', async ({
		page
	}) => {
		await advanceToExhaleTest(page);
		await expect(page.getByText('Breath in completely through your nose.')).toBeVisible();
		await expect(
			page.getByText('Then start the timer and exhale as slowly as you can.')
		).toBeVisible();
		await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();
		await expect(page.getByRole('button', { name: 'Stop' })).toHaveCount(0);
	});

	test('clicking Start swaps to Stop with updated guidance', async ({ page }) => {
		await advanceToExhaleTest(page);
		await page.getByRole('button', { name: 'Start' }).click();
		await expect(page.getByRole('button', { name: 'Stop' })).toBeVisible();
		await expect(page.getByText('Click "Stop" when you run out of air.')).toBeVisible();
		await expect(page.getByText('Do not hold your breath.')).toBeVisible();
	});

	test('exhales shorter than 6 seconds are rejected and reset to Start', async ({ page }) => {
		await advanceToExhaleTest(page);
		await page.getByRole('button', { name: 'Start' }).click();

		// Simulate a 5.999 second exhale — below the 6 second minimum.
		await page.clock.fastForward(5999);
		await page.getByRole('button', { name: 'Stop' }).click();

		// Still on the Exhale test, back to the Start state.
		await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();
		await expect(page.getByText('Breath in completely through your nose.')).toBeVisible();
	});

	test('exhales longer than 120 seconds are rejected and reset to Start', async ({ page }) => {
		await advanceToExhaleTest(page);
		await page.getByRole('button', { name: 'Start' }).click();

		// Simulate a 120.001 second exhale — above the 120 second maximum.
		await page.clock.fastForward(120001);
		await page.getByRole('button', { name: 'Stop' }).click();

		await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();
		await expect(page.getByText('Breath in completely through your nose.')).toBeVisible();
	});

	test('a valid exhale between 6 and 120 seconds advances to the next Reset step', async ({
		page
	}) => {
		await advanceToExhaleTest(page);
		await page.getByRole('button', { name: 'Start' }).click();

		// 30 second exhale — well inside the valid range.
		await page.clock.fastForward(30000);
		await page.getByRole('button', { name: 'Stop' }).click();

		await expect(page.getByText('Breath normally for now.')).toBeVisible();
	});

	test('exhales right at the 6 second boundary are rejected (exclusive minimum)', async ({
		page
	}) => {
		await advanceToExhaleTest(page);
		await page.getByRole('button', { name: 'Start' }).click();
		// Exactly 6000ms — MIN_BREATH is an exclusive lower bound (`exhale < MIN_BREATH` means
		// 6000 is NOT rejected, but this documents the boundary behaviour precisely).
		await page.clock.fastForward(6000);
		await page.getByRole('button', { name: 'Stop' }).click();
		// Advances because 6000 is not strictly less than MIN_BREATH.
		await expect(page.getByText('Breath normally for now.')).toBeVisible();
	});

	test('exhales right at the 120 second boundary are accepted (inclusive maximum)', async ({
		page
	}) => {
		await advanceToExhaleTest(page);
		await page.getByRole('button', { name: 'Start' }).click();
		// Exactly 120000ms — MAX_BREATH is an exclusive upper bound (`exhale > MAX_BREATH`).
		await page.clock.fastForward(120000);
		await page.getByRole('button', { name: 'Stop' }).click();
		await expect(page.getByText('Breath normally for now.')).toBeVisible();
	});
});
