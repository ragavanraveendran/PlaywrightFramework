import { test, expect } from '@playwright/test';

/* test('has title', async ({ page }) => {
		await page.goto('https://playwright.dev/');
		await page.getByRole('link', { name: 'Get started' }).click();
		await expect(page).toHaveTitle(/Installation/);
		await page.getByRole('link', { name: 'MCP', exact: true }).click();
		await expect(page).toHaveTitle(/Introduction/);
}); */


test('has title', async ({ page }) => {
		await page.goto('https://www.spicejet.com/');
		await expect(page.getByText('Welcome aboard')).toBeVisible();
		await page.locator('[data-testid="to-testID-origin"] input').fill('DEL');
		await page.locator('[data-testid="to-testID-destination"] input').fill('ABU');
		await page.getByTestId('home-page-flight-cta').click();
		await expect(page.getByText('Flights', { exact: true })).toBeVisible();
		
});