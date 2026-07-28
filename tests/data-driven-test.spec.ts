import path from "node:path";
import { test, expect } from "../fixtures/app.fixture";

import { User } from "../models/User";
import { getTestData } from "../utils/dataprovider";

test.describe("Data driven user registration tests", () => {
  const users: User[] = getTestData<User>(
    path.join(process.cwd(), "test-data", "user-data.json"),
  );

  users.forEach((user: User) => {
    test(`Should register a new user with ${user.username}`, async ({
      basePage,
      registrationPage,
    }) => {
      await basePage.navigateTo("/parabank/index.htm");
      console.log(await basePage.getUrl());
      await basePage.openMenu("Register");

      await expect(registrationPage.pageHeader).toBeVisible();

      await registrationPage.userRegistration(user);
      await expect(
        registrationPage.welcomeMessageText(user.username),
      ).toBeVisible();
      await expect(registrationPage.successMessageText).toBeVisible();
      console.log(user);
    });
  });
});
