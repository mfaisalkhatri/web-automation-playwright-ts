import { test, expect, chromium } from "@playwright/test";

test("browser, browsercontext and page example", async ({}) => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();

  const page = await context.newPage();

  await page.goto("http://localhost:3000");
  await expect(
    page.getByRole("heading", { name: "Welcome to Live Chat Playground" }),
  ).toBeVisible();

  await context.close();
  await browser.close();
});

test("browser example", async ({}) => {
  const browser = await chromium.launch({ headless: false });

  await browser.close();
});

test("browser context example", async ({}) => {
  const browser = await chromium.launch({ headless: false });

  const customerContext = await browser.newContext();
  const adminContext = await browser.newContext();

  await customerContext.close();
  await adminContext.close();
  await browser.close();
});

test('Multiple page in the same context', async({}) => {
const browser = await chromium.launch({headless: false});
const context = await browser.newContext();

const homePage = await context.newPage();
const docsPage = await context.newPage();

await homePage.goto("https://playwright.dev");
await docsPage.goto("https://playwright.dev/docs");
});