import {test} from '@playwright/test';

test('simulate failure and slow network', async ({ page }) => {
  // Hard network failure
  await page.route('**/api/profile', route => route.abort('failed'));

  // Artificial delay (3 seconds)
  await page.route('**/api/orders', async route => {
    await new Promise(r => setTimeout(r, 3000));
    await route.continue();
  });

  await page.goto('https://example.com');
});