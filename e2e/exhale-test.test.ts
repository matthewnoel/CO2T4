import { expect, test, type Page } from '@playwright/test';

async function advanceToExhaleTest(page: Page) {
	await page.clock.install();
	await page.goto('/');
	await page.getByRole('checkbox').check();
	await page.getByRole('button', { name: 'Acknowledge and Continue' }).click();
	// Skip the initial 8 second Reset step (add some slack to make sure the
	// timer fires — `fastForward` can otherwise sit right on the tick boundary).
	await page.clock.fastForward(9000);
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

		// 3 second exhale — comfortably below the 6 second minimum.
		await page.clock.fastForward(3000);
		await page.getByRole('button', { name: 'Stop' }).click();

		// Still on the Exhale test, back to the Start state.
		await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();
		await expect(page.getByText('Breath in completely through your nose.')).toBeVisible();
	});

	test('exhales longer than 120 seconds are rejected and reset to Start', async ({ page }) => {
		await advanceToExhaleTest(page);
		await page.getByRole('button', { name: 'Start' }).click();

		// 130 second exhale — comfortably above the 120 second maximum.
		await page.clock.fastForward(130000);
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

	test('a short valid exhale just past the 6 second minimum advances the flow', async ({
		page
	}) => {
		await advanceToExhaleTest(page);
		await page.getByRole('button', { name: 'Start' }).click();
		// 10 seconds — safely inside the accepted range, covers the low end.
		await page.clock.fastForward(10000);
		await page.getByRole('button', { name: 'Stop' }).click();
		await expect(page.getByText('Breath normally for now.')).toBeVisible();
	});

	test('a long valid exhale just under the 120 second maximum advances the flow', async ({
		page
	}) => {
		await advanceToExhaleTest(page);
		await page.getByRole('button', { name: 'Start' }).click();
		// 115 seconds — safely inside the accepted range, covers the high end.
		await page.clock.fastForward(115000);
		await page.getByRole('button', { name: 'Stop' }).click();
		await expect(page.getByText('Breath normally for now.')).toBeVisible();
	});
});
