import { test, expect } from '@playwright/test';

test('mock API – never hits the real server', async ({ page }) => {
  await page.route('**/api/v1/fruits', async route => {
    const json = [{ name: 'Strawberry', id: 21 }];
    await route.fulfill({ json });          // shortcut for JSON
    // or more explicit:
    // await route.fulfill({
    //   status: 200,
    //   contentType: 'application/json',
    //   body: JSON.stringify(json),
    // });
  });

  await page.goto('https://demo.playwright.dev/api-mocking');
  await expect(page.getByText('Strawberry')).toBeVisible();
});