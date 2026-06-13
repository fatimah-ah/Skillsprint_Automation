// TC-44 | Auth-guard | No token → dashboard redirects to login
const { test, expect } = require('@playwright/test');

test.describe('Dashboard - Auth Guard', () => {
  test('TC-44 | Dashboard Blocks Guests | Unauthenticated access should redirect to login', async ({ page }) => {
    // Ensure clean session by clearing on correct origin
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    await page.goto('/dashboard.html');

    await expect(page).toHaveURL(/login\.html/, { timeout: 5000 });
  });
});
