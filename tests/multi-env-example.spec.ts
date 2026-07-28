import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");
  console.log(page.url());

  await expect(page).toHaveTitle("TodoMVC: React");
  console.log(process.env.PREPROD_USERNAME);
  console.log(process.env.PREPROD_PASSWORD);
});

test("Check header", async ({ page }, testInfo) => {
  await page.goto("/");
  console.log(page.url());

  await expect(page.getByRole("heading", { name: "todos" })).toBeVisible();
});
