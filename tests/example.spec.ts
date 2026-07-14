import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  console.log(page.url());

  await expect(page).toHaveTitle("TodoMVC: React");

});

test('Check header', async ({ page }, testInfo) => {
  await page.goto('/');
  console.log(page.url());

  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();

});
