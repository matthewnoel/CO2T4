import { expect, test } from '@playwright/test';

async function acknowledgeWarning(page: import('@playwright/test').Page) {
	await page.goto('/');
	await page.getByRole('checkbox').check();
	await page.getByRole('button', { name: 'Acknowledge & continue' }).click();
}

test.describe('Rest step', () => {
	test('shows the "breathe normally" guidance after acknowledging the warning', async ({
		page
	}) => {
		await acknowledgeWarning(page);
		await expect(page.getByText('Breathe normally')).toBeVisible();
		await expect(page.getByText(/Ideally through the nose\./)).toBeVisible();
	});

	test('advances to the exhale test after the 8 second rest period', async ({ page }) => {
		await page.clock.install();
		await acknowledgeWarning(page);
		await expect(page.getByText('Breathe normally')).toBeVisible();

		// Comfortably short of 8 seconds: still on the Rest screen.
		await page.clock.fastForward(7000);
		await expect(page.getByText('Breathe normally')).toBeVisible();

		// Past 8 seconds: advances to ExhaleTest.
		await page.clock.fastForward(2000);
		await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();
	});
});
