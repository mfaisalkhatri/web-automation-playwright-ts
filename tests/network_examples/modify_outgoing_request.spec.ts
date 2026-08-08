import { test, expect } from "@playwright/test";

test("modify request headers and body", async ({ page }) => {
  await page.route("**/post", async (route) => {
    const request = route.request();

    const headers = {
      ...request.headers(),
      Authorization: "Bearer test-token-123",
      "X-Feature-Flag": "new-checkout",
    };

    let postData = request.postData();

    if (postData) {
      const body = JSON.parse(postData);
      body.testMode = true;
      postData = JSON.stringify(body);
    }

    await route.continue({
      headers,
      postData,
    });
  });

  const response = await page.request.post("https://httpbin.org/post", {
    data: {
      product: "iPhone",
      quantity: 1,
    },
  });

  const responseBody = await response.json();

  console.log(responseBody);
});