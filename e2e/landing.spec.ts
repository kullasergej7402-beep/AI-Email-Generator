import { test, expect } from "@playwright/test";

test.describe("Landing page", () => {
  test("loads and shows hero CTA", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("link", { name: /попробовать бесплатно/i })).toBeVisible();
  });

  test("navigates to signup from hero CTA", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /попробовать бесплатно/i }).click();
    await expect(page).toHaveURL("/signup");
  });

  test("pricing page shows three plans", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page.getByText("Free")).toBeVisible();
    await expect(page.getByText("Pro")).toBeVisible();
    await expect(page.getByText("Business")).toBeVisible();
  });

  test("404 page shows not-found screen", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");
    await expect(page.getByText(/не найдена/i)).toBeVisible();
    await expect(page.getByRole("link", { name: /на главную/i })).toBeVisible();
  });
});

// Happy-path e2e (requires Supabase credentials in env):
// AI_PROVIDER=mock + real SUPABASE keys needed for auth flow.
// Run locally with: npx playwright test e2e/happy-path.spec.ts
