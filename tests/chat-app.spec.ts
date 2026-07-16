import { test, expect, chromium } from "@playwright/test";
import {LoginPage} from '../pages/loginpage';
import {ChatPage} from '../pages/chatpage';
import {john} from '../test-data/LoginUser';
import {jane} from '../test-data/LoginUser';


test("Real time user chat", async ({page}) => {
  const browser = await chromium.launch({ headless: false });

  const johnContext = await browser.newContext();
  const janeContext = await browser.newContext();

  const johnPage = await johnContext.newPage();
  const janePage = await janeContext.newPage();

  await johnPage.goto('http://localhost:3000');
  await janePage.goto('http://localhost:3000');

  const johnsLoginPage = new LoginPage(johnPage);
  johnsLoginPage.loginUser(john);

  const janesLoginPage = new LoginPage(janePage);
  janesLoginPage.loginUser(jane);

  const johnsChatPage = new ChatPage(johnPage);
  expect (johnsChatPage.userJoinedMessageText).toContain(`${john.name} "("${john.location}")"`);

  const janesChatPage = new ChatPage(janePage);
  expect (janesChatPage.userJoinedMessageText).toContain(`${jane.name} "("${jane.location}")"`);

  await johnPage.close();
  await janePage.close();
  await johnContext.close();
  await janeContext.close();
  await browser.close();

});
