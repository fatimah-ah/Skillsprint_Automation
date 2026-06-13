const { test, expect } = require('../../fixtures/logged-in-user');

test.describe('Quiz System', () => {
  test('TC-26 · Each course card shows level badges (Basic, Intermediate, Advanced)', async ({ loggedInPage: page }) => {
    await page.goto('/quiz.html');

    await expect(page.locator('#loadingOverlay')).not.toHaveClass(/active/, { timeout: 10000 });

    const firstCard = page.locator('.course-card').first();
    await expect(firstCard.locator('.level-badge')).toHaveCount(3);
    await expect(firstCard.locator('.level-badge[data-level="basic"]')).toBeVisible();
    await expect(firstCard.locator('.level-badge[data-level="intermediate"]')).toBeVisible();
    await expect(firstCard.locator('.level-badge[data-level="advanced"]')).toBeVisible();
  });
});
