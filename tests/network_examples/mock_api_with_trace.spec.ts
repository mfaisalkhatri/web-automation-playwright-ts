import { test, expect } from "@playwright/test";

test("Mock API with tracing", async ({ context, page }) => {
  await context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true,
  });

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

  await context.tracing.stop({
    path: "test-results/api-mocking-trace.zip",
  });
});
