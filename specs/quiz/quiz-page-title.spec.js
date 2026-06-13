const { test, expect } = require('../../fixtures/logged-in-user');

test.describe('Quiz System', () => {
  test('TC-24 · Quiz page loads with correct title after authentication', async ({ loggedInPage: page }) => {
    await page.goto('/quiz.html');
    await expect(page).toHaveTitle('Quiz & Certificates | SkillSprint');
    await expect(page.locator('#coursesView')).toBeVisible({ timeout: 8000 });
  });
});
