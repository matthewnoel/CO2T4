import { expect, test } from '@playwright/test';

test.describe('Warning screen', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('renders the heading and protocol intro', async ({ page }) => {
		await expect(page.locator('h1')).toHaveText('Before you begin');
		await expect(page.getByText('Box Breathing')).toBeVisible();
	});

	test('links to the source research paper and opens in a new tab', async ({ page }) => {
		const paper = page.getByRole('link', { name: /Balban/i });
		await expect(paper).toHaveAttribute('href', 'https://doi.org/10.1016/j.xcrm.2022.100895');
		await expect(paper).toHaveAttribute('target', '_blank');
		await expect(paper).toHaveAttribute('rel', 'noreferrer');
	});

	test('renders the medical disclaimer with its required points', async ({ page }) => {
		await expect(page.getByText('Medical disclaimer')).toBeVisible();
		await expect(page.getByText('For educational use only. Not medical advice.')).toBeVisible();
		await expect(
			page.getByText('Consult a licensed physician before any breathing exercise.')
		).toBeVisible();
		await expect(page.getByText(/No warranty\./i)).toBeVisible();
	});

	test('terms checkbox starts unchecked and the continue button starts disabled', async ({
		page
	}) => {
		await expect(page.getByRole('checkbox')).not.toBeChecked();
		await expect(page.getByRole('button', { name: 'Acknowledge & continue' })).toBeDisabled();
	});

	test('checking the terms enables the continue button and unchecking disables it again', async ({
		page
	}) => {
		const checkbox = page.getByRole('checkbox');
		const button = page.getByRole('button', { name: 'Acknowledge & continue' });

		await checkbox.check();
		await expect(checkbox).toBeChecked();
		await expect(button).toBeEnabled();

		await checkbox.uncheck();
		await expect(checkbox).not.toBeChecked();
		await expect(button).toBeDisabled();
	});

	test('does not advance past the warning when the button is disabled', async ({ page }) => {
		// The button is disabled; forcing a click should have no effect.
		await page.getByRole('button', { name: 'Acknowledge & continue' }).click({ force: true });
		await expect(page.locator('h1')).toHaveText('Before you begin');
	});

	test('acknowledging advances past the warning screen', async ({ page }) => {
		await page.getByRole('checkbox').check();
		await page.getByRole('button', { name: 'Acknowledge & continue' }).click();
		await expect(page.locator('h1')).toHaveCount(0);
	});

	test('theme toggle is present on the warning screen', async ({ page }) => {
		await expect(page.locator('[data-theme-toggle]')).toBeVisible();
	});
});
