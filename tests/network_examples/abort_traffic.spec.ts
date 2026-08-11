import { test } from "@playwright/test";

test("block images, CSS and analytics", async ({ page }) => {
  await page.route(/(png|jpeg|jpg|svg)$/, (route) => route.abort());

  await page.route("**/*.css", (route) => route.abort());

  await page.route(/google-analytics|googletagmanager|hotjar/, (route) =>
    route.abort(),
  );

  await page.goto("https://playwright.dev");
});
