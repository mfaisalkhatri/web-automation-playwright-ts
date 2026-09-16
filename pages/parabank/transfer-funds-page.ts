import { BasePage } from "./base-page";
import { Page, Locator } from "@playwright/test";
import expectedText from "../../test-data/expected-text.json";

export class TransferFundsPage extends BasePage {
  readonly pageHeader: Locator;
  readonly amount: Locator;
  readonly fromAccountNumberDropdown: Locator;
  readonly toAccountNumberDropdown: Locator;
  readonly transferButton: Locator;
  readonly transferSuccessHeader: Locator;

  constructor(readonly page: Page) {
    super(page);
    this.pageHeader = page.getByRole("heading", {
      name: expectedText.transferFundsPage.heading,
      exact: true,
    });
    this.amount = page.locator('[id="amount"]');
    this.fromAccountNumberDropdown = page.locator('[id="fromAccountId"]');
    this.toAccountNumberDropdown = page.locator('[id="toAccountId"]');
    this.transferButton = page.getByRole("button", { name: "Transfer" });
    this.transferSuccessHeader = page.getByRole("heading", {
      name: "Transfer Complete!",
    });
  }

  async transferFunds(
    amount: string,
    fromAccountNumber: string,
    toAccountNumber: string,
  ) {
    await this.amount.fill(amount);
    await this.fromAccountNumberDropdown.selectOption({
      label: fromAccountNumber,
    });
    await this.toAccountNumberDropdown.selectOption({ label: toAccountNumber });
    await this.transferButton.click();
  }

  successMessageText(
    amount: string,
    fromAccountNumber: string,
    toAccountNumber: string,
  ): Locator {
    return this.page.getByText(
      `$${amount}.00 has been transferred from account #${fromAccountNumber} to account #${toAccountNumber}`,
    );
  }
}
