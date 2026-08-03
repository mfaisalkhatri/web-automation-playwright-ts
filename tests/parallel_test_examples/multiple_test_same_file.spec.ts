import { test } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test("Test 1", async ({ page }) => {
  console.log("Same file test one...");
});

test("Test 2", async ({ page }) => {
  console.log("Sanme file test two...");
});

test("Test 3", async ({ page }) => {
  console.log("Same file test three...");
});

test("Test 4", async ({ page }) => {
  console.log("Same file test four...");
});
