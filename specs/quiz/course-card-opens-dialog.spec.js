const { test, expect } = require('../../fixtures/logged-in-user');

test.describe('Quiz System', () => {
  test('TC-27 · Clicking a course card opens a confirmation dialog', async ({ loggedInPage: page }) => {
    await page.goto('/quiz.html');

    await expect(page.locator('#loadingOverlay')).not.toHaveClass(/active/, { timeout: 10000 });

    await page.locator('.course-card').first().click();

    const dialog = page.locator('#custom-confirm-modal, [role="dialog"]').first();
    await expect(dialog).toBeVisible({ timeout: 5000 });
    await expect(dialog).toContainText(/Start Quiz/i);
  });
});
