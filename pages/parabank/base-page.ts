import { Page } from "@playwright/test";

export class BasePage {

  constructor(readonly page: Page) {}

  async openMenu(name: string) {
    await this.page.getByRole("link", { name: name }).first().click();
  }

  async navigateTo(path: string) {
    await this.page.goto(path);
  }
}