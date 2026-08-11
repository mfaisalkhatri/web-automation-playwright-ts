import { test, expect } from '@playwright/test';

test('modify real API response', async ({ page }) => {
  await page.route('**/api/v1/fruits', async route => {
  
    const response = await route.fetch();
    const json = await response.json();

    json.push({ name: 'Figs', id: 100 });

    await route.fulfill({ response, json });
  });

  await page.goto('https://demo.playwright.dev/api-mocking');
  await expect(page.getByText('Figs', { exact: true })).toBeVisible();
});