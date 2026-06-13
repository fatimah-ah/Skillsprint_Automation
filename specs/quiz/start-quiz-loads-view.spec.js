const { test, expect } = require('../../fixtures/logged-in-user');

test.describe('Quiz System', () => {
  test('TC-29 · Starting a quiz renders quiz view with timer', async ({ loggedInPage: page }) => {
    await page.goto('/quiz.html');

    await expect(page.locator('#loadingOverlay')).not.toHaveClass(/active/, { timeout: 10000 });

    await page.locator('.course-card').first().click();

    await page.locator('#confirm-ok-btn').click();

    await expect(page.locator('#quizView')).toHaveClass(/active/, { timeout: 8000 });
    await expect(page.locator('#quizTimer')).toBeVisible();
    await expect(page.locator('#timerDisplay')).toBeVisible();
    await expect(page.locator('#timerDisplay')).toHaveText(/\d{2}:\d{2}/);
  });
});
