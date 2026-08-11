import { test, expect } from "@playwright/test";

test("modify headers + rename fruit + add new fruit", async ({ page }) => {
  await page.route("**/api/v1/fruits", async (route) => {
    const headers = {
      ...route.request().headers(),
      Authorization: "Bearer fake-token-123",
      "X-Custom-Header": "playwright",
    };

    const response = await route.fetch({ headers });
    const fruits = await response.json();

    const banana = fruits.find((f) => f.name === "Banana");
    if (banana) {
      banana.name = "Golden Banana";
    }

    fruits.push({
      name: "Dragon Fruit",
      id: 999,
    });

    await route.fulfill({
      response,
      json: fruits,
    });
  });

  await page.goto("https://demo.playwright.dev/api-mocking");

  await expect(page.getByText("Golden Banana", { exact: true })).toBeVisible();
  await expect(page.getByText("Dragon Fruit", { exact: true })).toBeVisible();
  await expect(page.getByText("Banana", { exact: true })).not.toBeVisible();
  await expect(page.getByText("Strawberry", { exact: true })).toBeVisible();
});
