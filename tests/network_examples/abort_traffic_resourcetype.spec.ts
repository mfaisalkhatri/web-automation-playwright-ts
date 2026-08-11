import { test } from "@playwright/test";

test("block images using resource type", async ({ page }) => {
  await page.route("**/*", async (route) => {
    const resourceType = route.request().resourceType();

    if (resourceType === "image") {
      await route.abort();
    } else {
      await route.continue();
    }
  });

  await page.goto("https://playwright.dev");
});