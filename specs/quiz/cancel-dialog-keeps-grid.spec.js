const { test, expect } = require('../../fixtures/logged-in-user');

test.describe('Quiz System', () => {
  test('TC-28 · Cancelling the quiz dialog returns to course grid', async ({ loggedInPage: page }) => {
    await page.goto('/quiz.html');

    await expect(page.locator('#loadingOverlay')).not.toHaveClass(/active/, { timeout: 10000 });

    await page.locator('.course-card').first().click();

    const dialog = page.locator('#custom-confirm-modal, [role="dialog"]').first();
    await expect(dialog).toBeVisible({ timeout: 5000 });

    await page.locator('#confirm-cancel-btn').click();

    await expect(page.locator('#coursesView')).toBeVisible();
    await expect(page.locator('#quizView')).not.toHaveClass(/active/);
  });
});
