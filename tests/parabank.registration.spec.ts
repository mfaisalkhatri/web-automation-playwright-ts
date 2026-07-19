import { test, expect } from "../fixtures/app.fixture";


test.describe("Parabank End to End tests", () => {

    let username: string;
    let password: string;

    test.beforeAll(async ({ userData }) => {

        username = userData.username;
        password = userData.password;

    });

    test("Should register a new user", async ({ basePage, registrationPage, userData }) => {

        await basePage.navigateTo("/parabank/index.htm");
        await basePage.openMenu("Register");

        await expect(registrationPage.pageHeader).toBeVisible();

        await registrationPage.registerUser(userData, username, password);
        await expect(registrationPage.welcomeMessageText(username)).toBeVisible();
        await expect(registrationPage.successMessageText).toBeVisible();
    });

});