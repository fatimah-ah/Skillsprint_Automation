const { test, expect } = require('../../fixtures/logged-in-user');

test.describe('Quiz System', () => {
  test('TC-33 · Course search filters cards by name', async ({ loggedInPage: page }) => {
    await page.goto('/quiz.html');

    await expect(page.locator('#loadingOverlay')).not.toHaveClass(/active/, { timeout: 10000 });

    await page.locator('input[placeholder*="Search"]').fill('JavaScript');
    await page.waitForTimeout(500);

    const visibleCards = page.locator('.course-card').filter({ hasText: 'JavaScript' });
    await expect(visibleCards).toHaveCount(1);
    
    const hiddenCard = page.locator('.course-card').filter({ hasText: 'MongoDB' });
    await expect(hiddenCard).toBeHidden();
  });
});
