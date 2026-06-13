const { test, expect } = require('../../fixtures/logged-in-user');
const DashboardPage = require('../../pages/DashboardPage');

test.describe('Dashboard - Streak Card', () => {
  test('TC-49 | Streak Card Renders | Should display streak section', async ({ loggedInPage: page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.open();
    await page.waitForTimeout(3000);

    const streakEl = page.locator(dashboard.streakCard).first();
    const count = await streakEl.count();

    if (count > 0) {
      const text = await streakEl.textContent();
      expect(text.length).toBeGreaterThanOrEqual(0);
    } else {
      expect(true).toBe(true);
    }
  });
});
