import { test, expect, Locator } from "@playwright/test";

test("should search for a product from the home page", async ({ page }) => {
  await page.goto("https://ecommerce-playground.lambdatest.io/index.php");
  let productName: string = "iPhone";
  await page.getByPlaceholder("Search For Products").first().fill(productName);
  await page.getByRole("button", { name: "Search" });

  await page.getByRole("button", { name: "Search" }).click();
  let productHeading: Locator = page
    .getByRole("heading", { name: `${productName}` })
    .first();
  await expect(productHeading).toBeVisible();
  let productPrice: Locator = page.locator(".price-new").first();
  await expect(productPrice).toBeVisible();
});
