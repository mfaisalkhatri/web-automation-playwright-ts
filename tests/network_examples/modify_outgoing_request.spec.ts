import { test } from "@playwright/test";

test("modify request headers / body", async ({ page }) => {
  await page.route("**/api/**", async (route) => {
    const headers = {
      ...route.request().headers(),
      Authorization: "Bearer fake-token-123",
      "X-Custom-Header": "playwright",
    };

    // Optional: change POST body
    let postData = route.request().postData();
    if (route.request().method() === "POST" && postData) {
      const body = JSON.parse(postData);
      body.testMode = true;
      postData = JSON.stringify(body);
    }

    await route.continue({ headers, postData });
  });

  await page.goto("https://example.com");
});
