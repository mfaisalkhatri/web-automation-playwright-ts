import { test, expect } from "../../fixtures/app.fixture";
import expectedText from "../../test-data/expected-text.json";

test.describe.configure({ mode: "serial" });¸¸
test.describe("Parabank End to End tests", () => {
  let accountNumber: string;
  let toAccountNumber: string;

  test("should create a new savings account", async ({
    basePage,
    openNewAccountPage,
  }) => {
    await basePage.navigateTo("/parabank/overview.htm");

    await basePage.openMenu("Open New Account");

    await expect(openNewAccountPage.pageHeader).toBeVisible();

    await openNewAccountPage.openNewAccount("SAVINGS");
    await expect(openNewAccountPage.successMessageText).toBeVisible();

    accountNumber = await openNewAccountPage.getAccountNumber();
    console.log(accountNumber);
  });

  test("should fetch the old account number from accounts overview page", async ({
    basePage,
    accountsOverviewPage,
  }) => {
    await basePage.navigateTo("/parabank/index.htm");

    await basePage.openMenu("Accounts Overview");
    await expect(accountsOverviewPage.pageHeader).toBeVisible();

    await expect(accountsOverviewPage.newAccountNumber).toHaveText(
      accountNumber,
    );

    toAccountNumber = await accountsOverviewPage.getOldAccountNumber();
  });

  test("should transfer funds to another account", async ({
    basePage,
    transferFundsPage,
  }) => {
    await basePage.navigateTo("/parabank/index.htm");
    await basePage.openMenu("Transfer Funds");

    await expect(transferFundsPage.pageHeader).toBeVisible();
    const transferAmount = expectedText.transferFundsPage.transferAmount;

    await transferFundsPage.transferFunds(
      transferAmount,
      accountNumber,
      toAccountNumber,
    );

    await expect(
      transferFundsPage.successMessageText(
        transferAmount,
        accountNumber,
        toAccountNumber,
      ),
    ).toBeVisible();
  });
});
