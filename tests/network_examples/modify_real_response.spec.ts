import { test, expect } from '@playwright/test';

test('modify real API response', async ({ page }) => {
  await page.route('**/api/v1/fruits', async route => {
    // Let the real request go out
    const response = await route.fetch();
    const json = await response.json();

    // Patch the data
    json.push({ name: 'Loquat', id: 100 });

    // Return the modified response
    await route.fulfill({ response, json });
  });

  await page.goto('https://demo.playwright.dev/api-mocking');
  await expect(page.getByText('Loquat', { exact: true })).toBeVisible();
});