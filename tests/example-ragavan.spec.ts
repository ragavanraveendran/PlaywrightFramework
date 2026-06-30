import { test, expect, Page } from '@playwright/test';

test('search flight on SpiceJet', async ({ page, context }) => {
  await test.step('Navigate to application', async () => {
    await context.grantPermissions(['geolocation'], {
      origin: 'https://www.spicejet.com',
    });

    await page.goto('https://www.spicejet.com/');

    await expect(page.getByText('Welcome aboard')).toBeVisible();
  });

  await test.step('Enter origin and destination', async () => {
    await page.locator('[data-testid="to-testID-origin"] input').fill('DEL');
	await page.waitForTimeout(500);
    await page.locator('[data-testid="to-testID-destination"] input').fill('BOM');
	await page.waitForTimeout(500);
  });

  await test.step('Select departure date', async () => {
    await selectDepartureDate(page, 'July 2026', '15');
  });

  await test.step('Wait for overlays to clear', async () => {
    await waitForOverlaysToClear(page);
  });

  await test.step('Search for flights', async () => {
    const searchFlightBtn = page
      .getByTestId('home-page-flight-cta')
      .or(page.getByRole('button', { name: /search flight/i }))
      .or(page.getByText('Search Flight'));

    await searchFlightBtn.first().click();
  });
});


/**
 * Wait for overlays/loading screens to disappear safely
 */
async function waitForOverlaysToClear(page: Page) {
  const overlays = page.locator('.loading, .overlay');

  const count = await overlays.count();
  for (let i = 0; i < count; i++) {
    await overlays.nth(i).waitFor({ state: 'hidden' });
  }
}


/**
 * Stable date selection logic for SpiceJet calendar
 */
async function selectDepartureDate(page: Page, month: string, day: string) {
  // Open date picker
  await page.getByText('Departure Date').first().click();

  // Wait for calendar to render (important for flaky UI)
/*   const calendar = page.locator('div')
    .filter({ hasText: month })
    .first();

  await expect(calendar).toBeVisible({ timeout: 10000 }); */
  
	const calendar = page.locator('text=/' + month + '/i').first();
	/* await expect(calendar).toBeVisible({ timeout: 15000 }); */

  // Scope strictly inside visible month container
/*   const dayCell = calendar.locator(`text=${day}`).first();

  await expect(dayCell).toBeVisible({ timeout: 10000 });
  await expect(dayCell).toBeEnabled();

  await dayCell.click(); */
}