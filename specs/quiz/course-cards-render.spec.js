const { test, expect } = require('../../fixtures/logged-in-user');

test.describe('Quiz System', () => {
  test('TC-25 · Course cards are rendered in the grid', async ({ loggedInPage: page }) => {
    await page.goto('/quiz.html');

    await expect(page.locator('#loadingOverlay')).not.toHaveClass(/active/, { timeout: 10000 });

    const cards = page.locator('.course-card');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(6);
    await expect(cards.first().locator('.course-name')).toBeVisible();
  });
});
