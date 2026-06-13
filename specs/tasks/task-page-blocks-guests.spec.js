// TC-34 | Auth-guard | No token → task page redirects to login
const { test, expect } = require('@playwright/test');

test.describe('Tasks - Auth Guard', () => {
  test('TC-34 | Task Page Blocks Guests | Should redirect unauthenticated user to login', async ({ page }) => {
    // Ensure clean session by clearing on correct origin
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    await page.goto('/task.html');

    await expect(page).toHaveURL(/login\.html/, { timeout: 5000 });
  });
});
