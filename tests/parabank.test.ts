import { test, expect } from "../fixtures/app.fixture";

test.describe("Parabank End to End tests", () => {
  let accountNumber: string;

  test("should create a new savings account", async ({
    page,
    basePage,
    openNewAccountPage,
  }) => {
    await basePage.navigateTo("/parabank/overview.htm");

    await basePage.openMenu("Open New Account");

    await expect(openNewAccountPage.pageHeader).toBeVisible();

    await page.on("response", async (response) => {
      console.log(
        response.status(),
        response.url(),
        response.request().method(),
      );
    });

    const responsePromise = page.waitForResponse(
      (response) =>
        response.url().includes("/accounts") &&
        response.request().method() === "GET",
    );

    const response = await responsePromise;
    console.log({
      url: response.url(),
      status: response.status(),
      statusText: response.statusText(),
      headers: await response.allHeaders(),
      body: await response.json(),
    });

    console.log(await response.text());

    await openNewAccountPage.openNewAccount("SAVINGS");
    await expect(openNewAccountPage.successMessageText).toBeVisible();

    accountNumber = await openNewAccountPage.getAccountNumber();
    console.log(accountNumber);
  });
});
