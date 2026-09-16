import { BasePage } from "./base-page";
import { Page, Locator } from "@playwright/test";
import expectedText from "../../test-data/expected-text.json";

export class AccountsOverviewPage extends BasePage {
  readonly pageHeader: Locator;
  readonly accountTable: Locator;
  readonly oldAccountNumber: Locator;
  readonly newAccountNumber: Locator;
  readonly balance: Locator;
  readonly availableAmount: Locator;

  constructor(readonly page: Page) {
    super(page);
    this.pageHeader = page.getByRole("heading", {
      name: expectedText.accountsOverviewPage.heading,
      exact: true,
    });

    this.accountTable = page.locator('[id="accountTable"]');
    this.oldAccountNumber = this.accountTable
      .locator("tbody tr")
      .nth(0)
      .locator("td")
      .nth(0)
      .first();
    this.newAccountNumber = this.accountTable
      .locator("tbody tr")
      .nth(1)
      .locator("td")
      .nth(0)
      .first();
    this.balance = this.accountTable
      .locator("tbody tr")
      .nth(1)
      .locator("td")
      .nth(1)
      .first();
    this.availableAmount = this.accountTable
      .locator("tbody tr")
      .nth(1)
      .locator("td")
      .nth(2)
      .first();
  }

  async getOldAccountNumber(): Promise<string> {
    return this.oldAccountNumber.innerText();
  }
}
