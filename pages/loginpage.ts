import { Page, Locator } from "@playwright/test";
import { LoginUser } from "../models/LoginUser";

export class LoginPage {
  readonly name: Locator;
  readonly location: Locator;
  readonly age: Locator;
  readonly chatRoom: Locator;
  readonly agreeTerms: Locator;
  readonly startChat: Locator;
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.name = page.getByPlaceholder("Enter your name");
    this.location = page.getByPlaceholder("Enter your location");
    this.age = page.locator("input#age");
    this.chatRoom = page.locator("input#chat-room");
    this.agreeTerms = page.locator("input#terms");
    this.startChat = page.locator("start-chat");
  }

  async loginUser(user: LoginUser) {
    await this.name.fill(user.name);
    await this.location.fill(user.location);
    await this.age.fill(user.age);
    await this.chatRoom.selectOption({ value: user.chatRoom });
    await this.page.getByRole("radio", { name: user.gender }).check();
    await this.agreeTerms.click();
    await this.startChat.click();
  }
}