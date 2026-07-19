import { BasePage } from "./base-page";
import { Page, Locator } from "@playwright/test";
import expectedText from "../../testdata/expected-text.json";

export class LoginPage extends BasePage {
  readonly pageHeader: Locator;
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(readonly page: Page) {
    super(page);
    this.pageHeader = page.getByRole("heading", {
      name: expectedText.loginPage.heading,
      exact: true,
    });
    this.userNameInput = page.locator('[name="username"]');
    this.passwordInput = page.locator('[name="password"]');
    this.loginButton = page.getByRole("button", { name: "Log In" });
  }

  welcomeMessageText(firstName: string, lastName: string): Locator {
    return this.page.getByText(`Welcome ${firstName} ${lastName}`);
  }

  async login(username: string, password: string) {
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}