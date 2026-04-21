import { expect, test } from '@playwright/test';

async function acknowledgeWarning(page: import('@playwright/test').Page) {
	await page.goto('/');
	await page.getByRole('checkbox').check();
	await page.getByRole('button', { name: 'Acknowledge and Continue' }).click();
}

test.describe('Reset step', () => {
	test('shows the "breath normally" guidance after acknowledging the warning', async ({ page }) => {
		await acknowledgeWarning(page);
		await expect(page.getByText('Breath normally for now.')).toBeVisible();
		await expect(page.getByText('Ideally through the nose.')).toBeVisible();
	});

	test('advances to the exhale test after the 8 second rest period', async ({ page }) => {
		await page.clock.install();
		await acknowledgeWarning(page);
		await expect(page.getByText('Breath normally for now.')).toBeVisible();

		// Just under 8 seconds: still on the Reset screen.
		await page.clock.fastForward(7999);
		await expect(page.getByText('Breath normally for now.')).toBeVisible();

		// Past 8 seconds: advances to ExhaleTest.
		await page.clock.fastForward(2);
		await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();
	});
});
