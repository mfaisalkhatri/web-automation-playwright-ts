import { test, expect } from "@playwright/test";

test("Mock API without hitting the real server", async ({ page }) => {
  await page.route("**/api/v1/fruits", async (route) => {
    const json = [{ name: "Strawberry", id: 21 }];
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(json),
    });
  });

  await page.goto("https://demo.playwright.dev/api-mocking");
  await expect(page.getByText("Strawberry")).toBeVisible();
});
