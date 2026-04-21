import { expect, test } from '@playwright/test';

test.describe('Full user flow', () => {
	test('walks from warning screen all the way through a finished box breathing session', async ({
		page
	}) => {
		await page.clock.install();
		await page.goto('/');

		// --- 1. Warning screen ---
		await expect(page.locator('h1')).toHaveText('Warning!');
		await page.getByRole('checkbox').check();
		await page.getByRole('button', { name: 'Acknowledge and Continue' }).click();

		// --- 2. First Reset ---
		await expect(page.getByText('Breath normally for now.')).toBeVisible();
		await page.clock.fastForward('00:08');

		// --- 3. Exhale test ---
		await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();
		await page.getByRole('button', { name: 'Start' }).click();
		await expect(page.getByRole('button', { name: 'Stop' })).toBeVisible();
		await page.clock.fastForward(30000); // 30s exhale -> 5s intervals
		await page.getByRole('button', { name: 'Stop' }).click();

		// --- 4. Second Reset ---
		await expect(page.getByText('Breath normally for now.')).toBeVisible();
		await page.clock.fastForward('00:08');

		// --- 5. Time conversion ---
		await expect(page.getByText('Second Box Breathing Interval')).toBeVisible();
		await expect(page.locator('h1')).toHaveText('5');
		await page.getByRole('button', { name: 'Start' }).click();

		// --- 6. Box breathing ---
		await expect(page.getByText('Breath in')).toBeVisible();
		// Run the full 2 minute protocol.
		await page.clock.fastForward(24 * 5000);
		await expect(page.getByText('Great job')).toBeVisible();
	});

	test('staying on the warning screen never renders flow components', async ({ page }) => {
		await page.goto('/');
		await expect(page.getByText('Breath normally for now.')).toHaveCount(0);
		await expect(page.getByRole('button', { name: 'Start' })).toHaveCount(0);
		await expect(page.getByText('Second Box Breathing Interval')).toHaveCount(0);
		await expect(page.getByText('Great job')).toHaveCount(0);
	});

	test('no error fallback is rendered anywhere during the flow', async ({ page }) => {
		await page.clock.install();
		await page.goto('/');
		await page.getByRole('checkbox').check();
		await page.getByRole('button', { name: 'Acknowledge and Continue' }).click();
		await expect(page.getByText('Oops. Something went wrong')).toHaveCount(0);

		await page.clock.fastForward('00:08');
		await expect(page.getByText('Oops. Something went wrong')).toHaveCount(0);

		await page.getByRole('button', { name: 'Start' }).click();
		await page.clock.fastForward(30000);
		await page.getByRole('button', { name: 'Stop' }).click();
		await expect(page.getByText('Oops. Something went wrong')).toHaveCount(0);

		await page.clock.fastForward('00:08');
		await expect(page.getByText('Oops. Something went wrong')).toHaveCount(0);

		await page.getByRole('button', { name: 'Start' }).click();
		await expect(page.getByText('Oops. Something went wrong')).toHaveCount(0);
	});
});
