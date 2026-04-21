import { expect, test } from '@playwright/test';

test.describe('Warning screen', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('renders the warning heading and subheading', async ({ page }) => {
		await expect(page.locator('h1')).toHaveText('Warning!');
		await expect(page.locator('h2')).toHaveText('Read Before Continuing');
	});

	test('links to the source research paper and opens in a new tab', async ({ page }) => {
		const paper = page.getByRole('link', {
			name: /Brief Structured Respiration Practices/i
		});
		await expect(paper).toHaveAttribute('href', 'https://doi.org/10.1016/j.xcrm.2022.100895');
		await expect(paper).toHaveAttribute('target', '_blank');
		await expect(paper).toHaveAttribute('rel', 'noreferrer');
	});

	test('links to the project source and third-party licenses', async ({ page }) => {
		const source = page.getByRole('link', { name: /is available here/i }).first();
		await expect(source).toHaveAttribute('href', 'https://github.com/matthewnoel/CO2T4');
		await expect(source).toHaveAttribute('target', '_blank');

		const licenses = page.getByRole('link', { name: /are available here/i });
		await expect(licenses).toHaveAttribute(
			'href',
			'https://github.com/matthewnoel/CO2T4/blob/main/third-party-licenses.txt'
		);
		await expect(licenses).toHaveAttribute('target', '_blank');
	});

	test('renders the three required disclaimers', async ({ page }) => {
		await expect(page.getByText('This tool is intended for educational use only.')).toBeVisible();
		await expect(
			page.getByText('This tool is not affiliated with the authors of the aforementioned paper.')
		).toBeVisible();
		await expect(page.getByText(/This tool does not provide medical advice\./i)).toBeVisible();
	});

	test('terms checkbox starts unchecked and the continue button starts disabled', async ({
		page
	}) => {
		await expect(page.getByRole('checkbox')).not.toBeChecked();
		await expect(page.getByRole('button', { name: 'Acknowledge and Continue' })).toBeDisabled();
	});

	test('checking the terms enables the continue button and unchecking disables it again', async ({
		page
	}) => {
		const checkbox = page.getByRole('checkbox');
		const button = page.getByRole('button', { name: 'Acknowledge and Continue' });

		await checkbox.check();
		await expect(checkbox).toBeChecked();
		await expect(button).toBeEnabled();

		await checkbox.uncheck();
		await expect(checkbox).not.toBeChecked();
		await expect(button).toBeDisabled();
	});

	test('does not advance past the warning when the button is disabled', async ({ page }) => {
		// The button is disabled; forcing a click should have no effect.
		await page.getByRole('button', { name: 'Acknowledge and Continue' }).click({ force: true });
		await expect(page.locator('h1')).toHaveText('Warning!');
	});

	test('acknowledging advances past the warning screen', async ({ page }) => {
		await page.getByRole('checkbox').check();
		await page.getByRole('button', { name: 'Acknowledge and Continue' }).click();
		await expect(page.locator('h1')).toHaveCount(0);
	});

	test('theme toggle is present on the warning screen', async ({ page }) => {
		await expect(page.locator('[data-theme-toggle]')).toBeVisible();
	});
});
