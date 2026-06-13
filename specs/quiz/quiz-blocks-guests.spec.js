// TC-23 | Auth-guard | No token → quiz page redirects to login
const { test, expect } = require('@playwright/test');

test.describe('Quiz - Auth Guard', () => {
  test('TC-23 | Quiz Blocks Guests | Should redirect unauthenticated user to login', async ({ page }) => {
    // Ensure clean session by clearing on correct origin
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    await page.goto('/quiz.html');

    await expect(page).toHaveURL(/login\.html/, { timeout: 5000 });
  });
});
