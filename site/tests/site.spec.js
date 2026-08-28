import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  const errors = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  page.on("pageerror", (error) => errors.push(error.message));
  page.errors = errors;
});

test.afterEach(async ({ page }) => { expect(page.errors).toEqual([]); });

async function expectNoAxeViolations(page) {
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
}

test("landing page is semantic and accessible", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("git-stage-lines — stage exact Git lines");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("main")).toHaveCount(1);
  await expect(page.locator("img[alt]")).toHaveCount(1);
  await expectNoAxeViolations(page);
});

test("@claim:demo-entry opens the isolated sample and resets it", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Try it with sample data" }).first().click();
  await expect(page).toHaveURL(/\/demo\/$/);
  await expect(page).toHaveTitle("Demo — git-stage-lines");
  await expect(page.getByText("Demo — sample data, nothing is saved")).toBeVisible();
  await expect(page.locator("h1")).toBeFocused();
  await page.getByRole("button", { name: "Reset demo" }).click();
  await expect(page.locator("#demo-output")).toBeFocused();
  await expect(page.locator("#demo-output")).toContainText("staged 2 selected lines in 1 file");
});

test("@claim:site-private demo flow stays same-origin and avoids user storage", async ({ page }) => {
  const requests = [];
  page.on("request", (request) => requests.push(request.url()));
  await page.goto("/?demo=1");
  await expect(page).toHaveURL(/\/demo\/$/);
  await page.getByRole("button", { name: "Reset demo" }).click();
  const state = await page.evaluate(async () => {
    const databases = indexedDB.databases ? await indexedDB.databases() : [];
    const opfs = navigator.storage?.getDirectory ? await navigator.storage.getDirectory() : null;
    const opfsEntries = [];
    if (opfs) for await (const name of opfs.keys()) opfsEntries.push(name);
    return { local: localStorage.length, session: sessionStorage.length, cookies: document.cookie, databases: databases.length, opfs: opfsEntries.length };
  });
  expect(state).toEqual({ local: 0, session: 0, cookies: "", databases: 0, opfs: 0 });
  expect(requests.every((url) => new URL(url).origin === new URL(page.url()).origin)).toBe(true);
});

test("@claim:offline-reload reloads visited pages without a network", async ({ page, context }) => {
  for (const route of ["/", "/demo/", "/privacy/", "/terms/"]) await page.goto(route);
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload();
  await expect.poll(() => page.evaluate(() => Boolean(navigator.serviceWorker.controller))).toBe(true);
  await context.setOffline(true);
  for (const [route, heading] of [["/", "Stage exact Git lines from a script"], ["/demo/", "See exact Git lines staged"], ["/privacy/", "Keep repository data local"], ["/terms/", "Use the software under MIT terms"]]) {
    await page.goto(route);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(heading);
  }
});

test("range builder reports errors and updates a valid command", async ({ page }) => {
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

test("installation copy uses the verified Git-source command", async ({ page }) => {
  await page.goto("/#install");
  await expect(page.getByRole("heading", { name: "Install from this repository" })).toBeVisible();
  await expect(page.locator("#install .command code")).toHaveText("cargo install --git https://github.com/B-Divyesh/sf-git-stage-lines");
  await expect(page.getByText("Install from Cargo", { exact: true })).toHaveCount(0);
  await expect(page.getByText("cargo install git-stage-lines", { exact: true })).toHaveCount(0);
});

test("keyboard path, legal routes, metadata, and history focus work", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByText("Skip to content")).toBeFocused();
  await page.getByRole("link", { name: "Privacy" }).first().click();
  await expect(page).toHaveURL(/\/privacy\/$/);
  await expect(page.locator("h1")).toHaveText("Keep repository data local");
  await expect(page.locator("h1")).toBeFocused();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://git-stage-lines.sociobot.in/privacy/");
  await page.goBack();
  await expect(page.locator("h1")).toHaveText("Stage exact Git lines from a script");
  await expect(page.locator("h1")).toBeFocused();
  await expectNoAxeViolations(page);
});

test("direct routes have unique metadata and unknown routes return the designed 404", async ({ page, request }) => {
  for (const [path, title, canonical] of [["/demo/", "Demo — git-stage-lines", "/demo/"], ["/privacy/", "Privacy — git-stage-lines", "/privacy/"], ["/terms/", "Terms — git-stage-lines", "/terms/"]]) {
    await page.goto(path);
    await expect(page).toHaveTitle(title);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://git-stage-lines.sociobot.in${canonical}`);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /og-image\.jpg$/);
  }
  const missing = await request.get("/not-a-real-route");
  expect(missing.status()).toBe(404);
  expect(await missing.text()).toContain("Find a valid page");
});

test("every public page has no axe accessibility violations in light or dark mode", async ({ page }) => {
  for (const colorScheme of ["light", "dark"]) {
    await page.emulateMedia({ colorScheme });
    for (const route of ["/", "/demo/", "/privacy/", "/terms/", "/404.html"]) {
      await page.goto(route);
      await page.waitForTimeout(600);
      await expectNoAxeViolations(page);
    }
  }
});

test("content fits a 390px viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ["/", "/demo/", "/privacy/", "/terms/"]) {
    await page.goto(route);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Try it with sample data" }).first()).toBeVisible();
});

test("every visible mobile control has a 44px touch target", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ["/", "/demo/", "/privacy/", "/terms/", "/404.html"]) {
    await page.goto(route);
    const tooSmall = await page.locator("a:visible, button:visible, input:visible").evaluateAll((elements) => elements
      .map((element) => {
        const box = element.getBoundingClientRect();
        return {
          label: element.getAttribute("aria-label") || element.textContent?.trim() || element.getAttribute("name") || element.tagName,
          width: box.width,
          height: box.height,
        };
      })
      .filter(({ width, height }) => width < 44 || height < 44));
    expect(tooSmall, `${route} has a control below 44 × 44px`).toEqual([]);
  }
});
