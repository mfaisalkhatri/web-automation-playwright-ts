import { Page, Locator } from "@playwright/test";

export class ChatPage {
  readonly userJoinedMessage: Locator;
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.userJoinedMessage = this.page.locator("#message-0");
  }

  async userJoinedMessageText(): Promise<string | null> {
    return this.userJoinedMessage.textContent();
  }
}
