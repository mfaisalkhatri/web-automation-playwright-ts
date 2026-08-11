import { test, expect } from "@playwright/test";

test("simulate API failure", async ({ page }) => {
  await page.route("**/api/v1/fruits", async (route) => {
    await route.abort("failed");
  });

  await page.goto("https://demo.playwright.dev/api-mocking");
});

test("Simulate slow API response", async ({ page }) => {
  await page.route("**/api/v1/fruits", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await route.continue();
  });

  await page.goto("https://demo.playwright.dev/api-mocking");
});
