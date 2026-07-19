import { test as setup, expect } from "@playwright/test";
import { LoginPage } from "../pages/parabank/login-page";
import { getEnv } from '../env/envloader';

setup("Authenticate User", async ({ page }) => {
  const username = getEnv("PARABANK_USERNAME");
  const password = getEnv("PARABANK_PASSWORD");


  await page.goto("/parabank/index.htm");

  const loginPage = new LoginPage(page);

  await loginPage.login(username, password);

  await expect(
    loginPage.welcomeMessageText(username, "Smith"),
  ).toBeVisible();

  await expect(loginPage.pageHeader).toBeVisible();

  await page.context().storageState({
    path: "playwright/.auth/user.json",
  });

});