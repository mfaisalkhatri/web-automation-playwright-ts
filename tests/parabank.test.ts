import { test, expect } from "../fixtures/app.fixture"


test.describe("Parabank End to End tests", () => {

    let accountNumber: string;

    test("should create a new savings account", async ({ basePage, openNewAccountPage }) => {

        await basePage.navigateTo("/parabank/overview.htm");

        await basePage.openMenu("Open New Account");

        await expect(openNewAccountPage.pageHeader).toBeVisible();

        await openNewAccountPage.openNewAccount("SAVINGS");
        await expect(openNewAccountPage.successMessageText).toBeVisible();

        accountNumber = await openNewAccountPage.getAccountNumber();
        console.log(accountNumber);
    });
});