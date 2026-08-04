import { test } from '@playwright/test';

test('monitor all network requests & responses', async ({ page }) => {
  // Log every outgoing request
  page.on('request', request => {
    console.log('>>', request.method(), request.url());
    // Optional: inspect headers / post data
    // console.log(request.headers());
    // console.log(request.postData());
  });

  // Log every response
  page.on('response', response => {
    console.log('<<', response.status(), response.url());
  });

  // Wait for a specific response
  const responsePromise = page.waitForResponse(
    resp => resp.url().includes('/api/users') && resp.status() === 200
  );

  await page.goto('https://example.com');
  const response = await responsePromise;
  console.log('Got users response:', await response.json());
});