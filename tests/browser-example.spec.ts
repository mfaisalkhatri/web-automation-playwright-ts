import { test, expect, chromium } from "@playwright/test";

test("browser, browsercontext and page example", async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("http://localhost:3000");
  await expect(
    page.getByRole("heading", { name: "Welcome to Live Chat Playground" }),
  ).toBeVisible();

  await context.close();
  await browser.close();
});
