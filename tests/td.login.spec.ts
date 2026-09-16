import { test, expect } from "@playwright/test";

test("should click on the Easy Web login button", {tag: ['login']},async ({ page }) => {
  await page.goto("https://www.td.com/ca/en/personal-banking");
  //await page.getByLabel("EasyWeb: Online Banking Login").click();
  await page.getByRole('link', {name: "EasyWeb: Online Banking Login"}).click();

  await expect(
    page.getByRole("heading", { name: "EasyWeb Login" }),
  ).toBeVisible();
});

test("should click on the Web broker login button",{tag: ['smoke']}, async ({ page }) => {
  await page.goto("https://www.td.com/ca/en/personal-banking");
  //await page.getByLabel("WebBroker Online Trading Login").click();
  await page.getByRole('link', {name: "WebBroker Online Trading Login"}).click();
  await expect(
    page.getByRole("heading", { name: "WebBroker Login" }),
  ).toBeVisible();
});
