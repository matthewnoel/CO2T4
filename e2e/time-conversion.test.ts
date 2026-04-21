import { expect, test, type Page } from '@playwright/test';

/**
 * Walks the flow up to the TimeConversion step with the given exhale duration
 * (in milliseconds). The conversion rounds milliseconds / 6000 to produce the
 * starting "seconds" value of the Box Breathing interval.
 *
 * `exhaleMs` must stay inside the 6000–120000 range accepted by ExhaleTest;
 * boundary values don't survive `page.clock.fastForward` precision.
 */
async function advanceToTimeConversion(page: Page, exhaleMs: number) {
	await page.clock.install();
	await page.goto('/');
	await page.getByRole('checkbox').check();
	await page.getByRole('button', { name: 'Acknowledge and Continue' }).click();

	// First Reset — allow extra slack past the 8s tick boundary.
	await page.clock.fastForward(9000);

	// Exhale test.
	await page.getByRole('button', { name: 'Start' }).click();
	await page.clock.fastForward(exhaleMs);
	await page.getByRole('button', { name: 'Stop' }).click();

	// Second Reset — same slack.
	await page.clock.fastForward(9000);

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

	test('rounds down on the low side of the halfway mark', async ({ page }) => {
		// 26000ms / 6000 ≈ 4.333 -> rounds to 4.
		await advanceToTimeConversion(page, 26000);
		await expect(page.locator('h1')).toHaveText('4');
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
		// 119s exhale -> 119000 / 6000 ≈ 19.83 -> rounds to 20, then we bump up to 20 manually
		// to exercise the maximum. Starting at 19 keeps us inside ExhaleTest bounds safely.
		await advanceToTimeConversion(page, 114000); // 19
		await expect(page.locator('h1')).toHaveText('19');
		await page.getByRole('button', { name: '+' }).click();
		await expect(page.locator('h1')).toHaveText('20');
		await expect(page.getByRole('button', { name: '+' })).toBeDisabled();
		await expect(page.getByRole('button', { name: '-' })).toBeEnabled();
	});

	test('- is disabled when the value is at the 1 second minimum', async ({ page }) => {
		// 12s exhale -> 12000 / 6000 = 2. Step down to 1 to reach the minimum.
		await advanceToTimeConversion(page, 12000);
		await expect(page.locator('h1')).toHaveText('2');
		await page.getByRole('button', { name: '-' }).click();
		await expect(page.locator('h1')).toHaveText('1');
		await expect(page.getByRole('button', { name: '-' })).toBeDisabled();
		await expect(page.getByRole('button', { name: '+' })).toBeEnabled();
	});

	test('+ cannot push the value past the 20 second maximum', async ({ page }) => {
		await advanceToTimeConversion(page, 114000); // 19
		await page.getByRole('button', { name: '+' }).click();
		await expect(page.locator('h1')).toHaveText('20');
		// Button is disabled, but even a force click must not change the value.
		await page.getByRole('button', { name: '+' }).click({ force: true });
		await expect(page.locator('h1')).toHaveText('20');
	});

	test('- cannot push the value below the 1 second minimum', async ({ page }) => {
		await advanceToTimeConversion(page, 12000); // 2
		await page.getByRole('button', { name: '-' }).click();
		await expect(page.locator('h1')).toHaveText('1');
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
