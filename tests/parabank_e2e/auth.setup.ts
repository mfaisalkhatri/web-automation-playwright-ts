import { test as setup, expect } from "@playwright/test";
import { LoginPage } from "../../pages/parabank/login-page";
import { getEnv } from '../../env/envloader';

setup("Authenticate User", async ({ page }) => {
  const username:string = getEnv("PARABANK_USERNAME");
  const password:string = getEnv("PARABANK_PASSWORD");

  // const username:string = process.env.PARABANK_USERNAME
  // const password:string = process.env.PARABANK_PASSWORD

  await page.goto("/parabank/index.htm");

  const loginPage = new LoginPage(page);

  await loginPage.login(username, password);

  await expect(
    loginPage.welcomeMessageText(username, "Bonzela"),
  ).toBeVisible();

  await expect(loginPage.pageHeader).toBeVisible();

  await page.context().storageState({
    path: "playwright/.auth/user.json",
  });

});