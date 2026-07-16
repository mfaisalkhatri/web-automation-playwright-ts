import { test, expect, chromium } from "@playwright/test";

test("Real time user chat", async () => {
  const browser = await chromium.launch({ headless: false });

  const johnContext = await browser.newContext();
  const janeContext = await browser.newContext();

  const johnPage = johnContext.newPage();
  const janePage = janeContext.newPage();

  
});
