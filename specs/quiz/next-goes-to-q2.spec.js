const { test, expect } = require('../../fixtures/logged-in-user');

test.describe('Quiz System', () => {
  test('TC-31 · Clicking "Next" navigates to question 2 and updates dots', async ({ loggedInPage: page }) => {
    await page.goto('/quiz.html');

    await expect(page.locator('#loadingOverlay')).not.toHaveClass(/active/, { timeout: 10000 });

    await page.locator('.course-card').first().click();
    await page.locator('#confirm-ok-btn').click();
    await expect(page.locator('#quizView')).toHaveClass(/active/, { timeout: 8000 });

    await page.locator('#nextBtn').click();

    await expect(page.locator('#questionNumber')).toContainText('Question 2');
    await expect(page.locator('.q-dot.current')).toHaveText('2');
  });
});
