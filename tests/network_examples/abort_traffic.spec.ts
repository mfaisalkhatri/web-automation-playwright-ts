import {test} from '@playwright/test';

test('block images, CSS and analytics', async ({ page }) => {
  // Block images
  await page.route(/(png|jpeg|jpg|svg)$/, route => route.abort());

  // Block CSS
  await page.route('**/*.css', route => route.abort());

  // Block analytics
  await page.route(/google-analytics|googletagmanager|hotjar/, route =>
    route.abort()
  );

  await page.goto('https://playwright.dev');
});