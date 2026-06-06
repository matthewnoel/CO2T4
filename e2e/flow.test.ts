import { expect, test } from '@playwright/test';

test.describe('Full user flow', () => {
	test('walks from warning screen all the way through a finished box breathing session', async ({
		page
	}) => {
		await page.clock.install();
		await page.goto('/');

		// --- 1. Warning screen ---
		await expect(page.locator('h1')).toHaveText('Before you begin');
		await page.getByRole('checkbox').check();
		await page.getByRole('button', { name: 'Acknowledge & continue' }).click();

		// --- 2. First Rest ---
		await expect(page.getByText('Breathe normally')).toBeVisible();
		await page.clock.fastForward(9000);

		// --- 3. Exhale test ---
		await expect(page.getByRole('button', { name: 'Start' })).toBeVisible();
		await page.getByRole('button', { name: 'Start' }).click();
		await expect(page.getByRole('button', { name: 'Stop' })).toBeVisible();
		await page.clock.fastForward(30000); // 30s exhale -> 5s intervals
		await page.getByRole('button', { name: 'Stop' }).click();

		// --- 4. Second Rest ---
		await expect(page.getByText('Breathe normally')).toBeVisible();
		await page.clock.fastForward(9000);

		// --- 5. Calibration ---
		await expect(page.getByText('Set your interval')).toBeVisible();
		await expect(page.getByTestId('interval')).toHaveText('5');
		await page.getByRole('button', { name: 'Start box breathing' }).click();

		// --- 6. Box breathing ---
		await expect(page.getByText('Inhale')).toBeVisible();
		// Run the full 2 minute protocol in per-tick chunks so each Svelte
		// re-render flushes before the next virtual tick fires.
		for (let i = 0; i < 25; i++) {
			await page.clock.fastForward(5000);
		}
		await expect(page.getByText('Great job')).toBeVisible();
	});

	test('staying on the warning screen never renders flow components', async ({ page }) => {
		await page.goto('/');
		await expect(page.getByText('Breathe normally')).toHaveCount(0);
		await expect(page.getByRole('button', { name: 'Start' })).toHaveCount(0);
		await expect(page.getByText('Set your interval')).toHaveCount(0);
		await expect(page.getByText('Great job')).toHaveCount(0);
	});

	test('no error fallback is rendered anywhere during the flow', async ({ page }) => {
		await page.clock.install();
		await page.goto('/');
		await page.getByRole('checkbox').check();
		await page.getByRole('button', { name: 'Acknowledge & continue' }).click();
		await expect(page.getByText('Oops. Something went wrong')).toHaveCount(0);

		await page.clock.fastForward(9000);
		await expect(page.getByText('Oops. Something went wrong')).toHaveCount(0);

		await page.getByRole('button', { name: 'Start' }).click();
		await page.clock.fastForward(30000);
		await page.getByRole('button', { name: 'Stop' }).click();
		await expect(page.getByText('Oops. Something went wrong')).toHaveCount(0);

		await page.clock.fastForward(9000);
		await expect(page.getByText('Oops. Something went wrong')).toHaveCount(0);

		await page.getByRole('button', { name: 'Start box breathing' }).click();
		await expect(page.getByText('Oops. Something went wrong')).toHaveCount(0);
	});
});
