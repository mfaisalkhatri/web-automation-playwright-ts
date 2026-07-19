import { BasePage } from "./base-page";
import { Page, Locator } from "@playwright/test";
import expectedText from "../../testdata/expected-text.json";

export class OpenNewAccountPage extends BasePage {
  readonly pageHeader: Locator;
  readonly accountTypeDropdown: Locator;
  readonly fromAccountIdDropdown: Locator;
  readonly openNewAccountButton: Locator;
  readonly accountNumber: Locator;
  readonly successMessageText: Locator;

  constructor(readonly page: Page) {
    super(page);
    this.pageHeader = page.getByRole("heading", {
      name: expectedText.openNewAccountPage.heading,
      exact: true,
    });
    this.accountTypeDropdown = page.locator('[id ="type"]');
    this.fromAccountIdDropdown = page.locator('[id="fromAccountId"]');
    this.openNewAccountButton = page.getByRole("button", {
      name: "Open New Account",
    });
    this.accountNumber = this.page.locator('[id="newAccountId"]');
    this.successMessageText = this.page.getByText(
      expectedText.openNewAccountPage.successMessage,
    );
  }

  async openNewAccount(type: string) {
    await this.accountTypeDropdown.selectOption({ label: type });
    await this.fromAccountIdDropdown.selectOption({ index: 0 });
    await this.openNewAccountButton.click();
  }

  async getAccountNumber(): Promise<string> {
    return this.accountNumber.innerText();
  }
}