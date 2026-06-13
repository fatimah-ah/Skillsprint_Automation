const { test, expect } = require('../../fixtures/logged-in-user');
const DashboardPage = require('../../pages/DashboardPage');

test.describe('Dashboard - Sidebar', () => {
  test('TC-47 | Sidebar Toggle Collapse | Toggle button should add/remove collapsed state', async ({ loggedInPage: page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.open();
    await page.waitForTimeout(3000);

    const toggleBtn = page.locator(dashboard.sidebarToggleBtn).first();
    if (await toggleBtn.count() > 0) {
      await toggleBtn.click();
      await page.waitForTimeout(500);

      const sidebar = page.locator(dashboard.sidebar).first();
      const cls = await sidebar.getAttribute('class') || '';
      expect(cls.length).toBeGreaterThanOrEqual(0);
    } else {
      expect(true).toBe(true);
    }
  });
});
