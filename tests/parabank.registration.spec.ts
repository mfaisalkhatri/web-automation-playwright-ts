import { base } from "@faker-js/faker";
import { test, expect } from "../fixtures/app.fixture";
import { UserData } from "../test-data/UserData";


test.describe("Parabank End to End tests", () => {

    let username: string;
    let password: string;

    // test.beforeAll(async ({ userData }) => {

    //     username = userData.username;
    //     password = userData.password;
    //     userData = userData;

    // });

    test("Should register a new user", async ({ basePage, registrationPage, userData }) => {

        await basePage.navigateTo("/parabank/index.htm");
        console.log(await basePage.getUrl());
        await basePage.openMenu("Register");

        await expect(registrationPage.pageHeader).toBeVisible();

        username = userData.username;
        password = userData.password;
        
        console.log("username is: " +username);
        console.log("password is: " +password);
        console.log(userData);
        await registrationPage.registerUser(userData, username, password);
        await expect(registrationPage.welcomeMessageText(username)).toBeVisible();
        await expect(registrationPage.successMessageText).toBeVisible();
    });

});