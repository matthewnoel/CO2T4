import { expect, test, type Page } from '@playwright/test';

/**
 * Walks the flow up to the Calibration step with the given exhale duration
 * (in milliseconds). The conversion rounds milliseconds / 6000 to produce the
 * starting "seconds" value of the Box Breathing interval.
 *
 * `exhaleMs` must stay inside the 6000–120000 range accepted by ExhaleTest;
 * boundary values don't survive `page.clock.fastForward` precision.
 */
async function advanceToCalibration(page: Page, exhaleMs: number) {
	await page.clock.install();
	await page.goto('/');
	await page.getByRole('checkbox').check();
	await page.getByRole('button', { name: 'Acknowledge & continue' }).click();

	// First Rest — allow extra slack past the 8s tick boundary.
	await page.clock.fastForward(9000);

	// Exhale test.
	await page.getByRole('button', { name: 'Start' }).click();
	await page.clock.fastForward(exhaleMs);
	await page.getByRole('button', { name: 'Stop' }).click();

	// Second Rest — same slack.
	await page.clock.fastForward(9000);

	// Calibration should now be visible.
	await expect(page.getByText('Set your interval')).toBeVisible();
	await expect(page.getByRole('button', { name: 'Start box breathing' })).toBeVisible();
}

test.describe('Time conversion', () => {
	test('rounds the exhale duration to a sensible box breathing interval', async ({ page }) => {
		// 30s exhale -> 30000ms / 6000 = 5 seconds per side.
		await advanceToCalibration(page, 30000);
		await expect(page.getByTestId('interval')).toHaveText('5');
	});

	test('rounds down on the low side of the halfway mark', async ({ page }) => {
		// 26000ms / 6000 ≈ 4.333 -> rounds to 4.
		await advanceToCalibration(page, 26000);
		await expect(page.getByTestId('interval')).toHaveText('4');
	});

	test('rounds up past the halfway mark', async ({ page }) => {
		// 33000ms / 6000 = 5.5 -> rounds to 6.
		await advanceToCalibration(page, 33000);
		await expect(page.getByTestId('interval')).toHaveText('6');
	});

	test('the increase button increments the seconds value', async ({ page }) => {
		await advanceToCalibration(page, 30000);
		await page.getByRole('button', { name: 'Increase interval' }).click();
		await expect(page.getByTestId('interval')).toHaveText('6');
	});

	test('the decrease button decrements the seconds value', async ({ page }) => {
		await advanceToCalibration(page, 30000);
		await page.getByRole('button', { name: 'Decrease interval' }).click();
		await expect(page.getByTestId('interval')).toHaveText('4');
	});

	test('increase is disabled when the value is at the 20 second maximum', async ({ page }) => {
		// 114s exhale -> 114000 / 6000 = 19. Step up to 20 to reach the maximum.
		await advanceToCalibration(page, 114000); // 19
		await expect(page.getByTestId('interval')).toHaveText('19');
		await page.getByRole('button', { name: 'Increase interval' }).click();
		await expect(page.getByTestId('interval')).toHaveText('20');
		await expect(page.getByRole('button', { name: 'Increase interval' })).toBeDisabled();
		await expect(page.getByRole('button', { name: 'Decrease interval' })).toBeEnabled();
	});

	test('decrease is disabled when the value is at the 1 second minimum', async ({ page }) => {
		// 12s exhale -> 12000 / 6000 = 2. Step down to 1 to reach the minimum.
		await advanceToCalibration(page, 12000);
		await expect(page.getByTestId('interval')).toHaveText('2');
		await page.getByRole('button', { name: 'Decrease interval' }).click();
		await expect(page.getByTestId('interval')).toHaveText('1');
		await expect(page.getByRole('button', { name: 'Decrease interval' })).toBeDisabled();
		await expect(page.getByRole('button', { name: 'Increase interval' })).toBeEnabled();
	});

	test('increase cannot push the value past the 20 second maximum', async ({ page }) => {
		await advanceToCalibration(page, 114000); // 19
		await page.getByRole('button', { name: 'Increase interval' }).click();
		await expect(page.getByTestId('interval')).toHaveText('20');
		// Button is disabled, but even a force click must not change the value.
		await page.getByRole('button', { name: 'Increase interval' }).click({ force: true });
		await expect(page.getByTestId('interval')).toHaveText('20');
	});

	test('decrease cannot push the value below the 1 second minimum', async ({ page }) => {
		await advanceToCalibration(page, 12000); // 2
		await page.getByRole('button', { name: 'Decrease interval' }).click();
		await expect(page.getByTestId('interval')).toHaveText('1');
		await page.getByRole('button', { name: 'Decrease interval' }).click({ force: true });
		await expect(page.getByTestId('interval')).toHaveText('1');
	});

	test('clicking Start advances to the box breathing step', async ({ page }) => {
		await advanceToCalibration(page, 30000);
		await page.getByRole('button', { name: 'Start box breathing' }).click();
		// First step of the box breathing cycle.
		await expect(page.getByText('Inhale')).toBeVisible();
		await expect(page.getByText('Set your interval')).toHaveCount(0);
	});
});
