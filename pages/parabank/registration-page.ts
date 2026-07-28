import { BasePage } from "./base-page";
import { Page, Locator } from "@playwright/test";
import { UserData } from "../../test-data/UserData";
import expectedText from "../../test-data/expected-text.json";

export class RegistrationPage extends BasePage {
  readonly pageHeader: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipCodeInput: Locator;
  readonly phoneNumberInput: Locator;
  readonly ssnInput: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;
  readonly successMessageText: Locator;

  constructor(readonly page: Page) {
    super(page);
    this.pageHeader = page.getByRole("heading", {
      name: expectedText.registrationPage.heading,
      exact: true,
    });

    this.firstNameInput = page.locator('[id="customer.firstName"]');
    this.lastNameInput = page.locator('[id="customer.lastName"]');
    this.addressInput = page.locator('[id= "customer.address.street"]');
    this.cityInput = page.locator('[id="customer.address.city"]');
    this.stateInput = page.locator('[id= "customer.address.state"]');
    this.zipCodeInput = page.locator('[id="customer.address.zipCode"]');
    this.phoneNumberInput = page.locator('[id="customer.phoneNumber"]');
    this.ssnInput = page.locator('[id="customer.ssn"]');
    this.usernameInput = page.locator('[id="customer.username"]');
    this.passwordInput = page.locator('[id="customer.password"]');
    this.confirmPasswordInput = page.locator('[id="repeatedPassword"]');
    this.registerButton = page.getByRole("button", { name: "Register" });
    this.successMessageText = this.page.getByText(
      expectedText.registrationPage.successMessage,
    );
  }

  async registerUser(userData: UserData, username: string, password: string) {
    await this.firstNameInput.fill(userData.firstName);
    await this.lastNameInput.fill(userData.lastName);
    await this.addressInput.fill(userData.address);
    await this.cityInput.fill(userData.city);
    await this.stateInput.fill(userData.state);
    await this.zipCodeInput.fill(userData.zipCode);
    await this.phoneNumberInput.fill(userData.phoneNumber);
    await this.ssnInput.fill(userData.ssn.toString());
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
    await this.registerButton.click();
  }

  welcomeMessageText(userName: string): Locator {
    return this.page.getByText(`Welcome ${userName}`);
  }
}