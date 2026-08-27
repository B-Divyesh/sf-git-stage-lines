import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  page.errors = errors;
});

test.afterEach(async ({ page }) => {
  expect(page.errors).toEqual([]);
});

test("landing page is semantic and accessible", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/git-stage-lines/);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("main")).toHaveCount(1);
  await expect(page.locator("img[alt]")).toHaveCount(1);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter((item) => ["serious", "critical"].includes(item.impact))).toEqual([]);
});

test("range lab reports errors and updates a valid command", async ({ page }) => {
  await page.goto("/#grammar");
  const ranges = page.getByLabel("Changed lines to stage");
  await ranges.fill("3--4");
  await expect(ranges).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByRole("alert")).toContainText("not a line or range");
  await ranges.fill("4,7");
  await expect(ranges).not.toHaveAttribute("aria-invalid", "true");
  await expect(page.locator("#assembled-command")).toHaveText("git stage-lines src/app.ts:4,7");
  await expect(page.locator("#code-lines .selected")).toHaveCount(2);
});

test("keyboard path and legal pages work", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByText("Skip to content")).toBeFocused();
  await page.getByRole("link", { name: "Privacy" }).click();
  await expect(page).toHaveURL(/\/privacy\/$/);
  await expect(page.locator("h1")).toHaveText("Privacy, by absence.");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter((item) => ["serious", "critical"].includes(item.impact))).toEqual([]);
});

test("content fits a 390px viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
