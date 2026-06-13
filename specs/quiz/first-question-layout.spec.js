const { test, expect } = require('../../fixtures/logged-in-user');

test.describe('Quiz System', () => {
  test('TC-30 · Question 1 shows question number label and options', async ({ loggedInPage: page }) => {
    await page.goto('/quiz.html');

    await expect(page.locator('#loadingOverlay')).not.toHaveClass(/active/, { timeout: 10000 });

    await page.locator('.course-card').first().click();
    await page.locator('#confirm-ok-btn').click();
    await expect(page.locator('#quizView')).toHaveClass(/active/, { timeout: 8000 });

    await expect(page.locator('#questionNumber')).toContainText('Question 1');
    await expect(page.locator('#questionText')).not.toBeEmpty();
    await expect(page.locator('.option-item')).toHaveCount(4);
    await expect(page.locator('#prevBtn')).toBeDisabled();
    await expect(page.locator('#nextBtn')).toBeVisible();
  });
});
