// tests/monitor-network.spec.ts
import { test, expect } from '@playwright/test';

test('monitor all network requests & responses', async ({ page }) => {
  page.on('request', request => {
    console.log('>>', request.method(), request.url());
  });

  page.on('response', response => {
    console.log('<<', response.status(), response.url());
  });

  const responsePromise = page.waitForResponse(
    resp => resp.url().includes('/api/v1/fruits') && resp.status() === 200
  );

  await page.goto('https://demo.playwright.dev/api-mocking');

  const response = await responsePromise;
  const fruits = await response.json();

  console.log('Got fruits response:', fruits);

  await expect(page.getByText('Strawberry')).toBeVisible();
  await expect(page.getByText('Banana')).toBeVisible();
});