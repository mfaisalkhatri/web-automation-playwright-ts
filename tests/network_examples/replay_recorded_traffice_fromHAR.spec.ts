import { test } from "@playwright/test";
// Record once (CLI):
// npx playwright open --save-har=network.har https://demo.playwright.dev/api-mocking

test("replay from HAR", async ({ page }) => {
  await page.routeFromHAR("network.har", {
    url: "**/api/**", 
    update: false,
  });

  await page.goto("https://demo.playwright.dev/api-mocking");
});
