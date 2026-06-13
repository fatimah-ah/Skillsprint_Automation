// TC-22 | Auth-guard | No token → dashboard access redirects to login
const { test, expect } = require('@playwright/test');
const routes = require('../../data/routes.json');

test.describe('Auth - Auth Guard', () => {
  test('TC-22 | Dashboard Blocks Guests | Should redirect unauthenticated user to login', async ({ page }) => {
    // Ensure clean session by clearing on correct origin
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    await page.goto('/dashboard.html');

    await expect(page).toHaveURL(/login\.html/, { timeout: 6000 });
  });
});
