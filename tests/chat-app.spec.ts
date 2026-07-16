import { test, expect, chromium } from "@playwright/test";
import { LoginPage } from "../pages/loginpage";
import { ChatPage } from "../pages/chatpage";
import { john } from "../test-data/LoginUser";
import { jane } from "../test-data/LoginUser";

test("Real time user chat", async ({ page }) => {
  const browser = await chromium.launch({ headless: false });

  const johnContext = await browser.newContext();
  const janeContext = await browser.newContext();

  const johnPage = await johnContext.newPage();
  const janePage = await janeContext.newPage();

  await johnPage.goto("http://localhost:3000");
  await janePage.goto('http://localhost:3000');

  const johnsLoginPage = new LoginPage(johnPage);
  johnsLoginPage.loginUser(john);

  const johnsChatPage = new ChatPage(johnPage);
  const johnsMessage = await johnsChatPage.userJoinedMessageText();
  expect(johnsMessage).toContain(`${john.name} (${john.location})`);
  await johnPage.screenshot({ path: 'johnchat.png', fullPage: true });

   const janesLoginPage = new LoginPage(janePage);
   janesLoginPage.loginUser(jane);

  const janesChatPage = new ChatPage(janePage);
  const janesMessage = await janesChatPage.userJoinedMessageText();
  expect(janesMessage).toContain(`${jane.name} (${jane.location})`);

  await janePage.screenshot({ path: 'janechat.png', fullPage: true });

});
